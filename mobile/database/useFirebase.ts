import { useQuery } from "react-query";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import {
  ApiResponse,
  DelegateBearerAuthClient,
  HttpClient,
} from "@hardcodet/httpclient";
import Constants from "expo-constants";

const FIREBASE_LOGIN_KEY = "firebase_auth";

type User = any;

export class FirebaseClient {
  /**
   * Creates a simple API client to use with Firestore.
   * We don't want to use the JS package's implementation since it has issues with
   * long-running timers - see https://github.com/firebase/firebase-js-sdk/issues/97
   * @param idToken The user's ID token as retrieved through firebase auth
   */
  private static getFirestoreClient(idToken: string) {
    const projectId = Constants?.manifest?.extra?.projectId;
    const baseUri = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/`;

    const authClient = new DelegateBearerAuthClient(async () => idToken);
    return new HttpClient(baseUri, { authClient });
  }

  /**
   * Use firebase auth for login etc. because lazy.
   */
  public static async userLogin(
    email: string,
    password: string
  ): Promise<User> {
    try {
      const credentials: firebase.auth.UserCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return credentials.user;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public static async getData<T>({
    // public static async getData<T extends { documents: any }>({
    idToken,
    key,
  }: {
    key: string;
    idToken: string;
  }): Promise<any> {
    const client: HttpClient = FirebaseClient.getFirestoreClient(idToken);

    const result = await client.getAs<T>(
      `${key}?key=${Constants?.manifest?.extra?.apiKey}`
    );

    if (result.success) {
      console.log("result", result);
      const json = result.value;
      console.log("json", json);
      return json.documents || [];
    }

    throw result.createError();
  }

  public static async updatData<T, K>({
    idToken,
    key,
    value,
  }: {
    idToken: string;
    key: T;
    value: K;
  }): Promise<boolean | Error> {
    // again, just do an HTTP post, use the firebase user ID as the document key
    const client: HttpClient = FirebaseClient.getFirestoreClient(idToken);

    // userData?documentId=${key}
    const result: ApiResponse = await client.patch(
      `${key}?updateMask.fieldPaths=active&currentDocument.exists=true&key=${Constants?.manifest?.extra?.apiKey}`,
      value
    );

    return this.createResult(result);
  }

  public static async writeData<T, K>({
    idToken,
    key,
    value,
  }: {
    idToken: string;
    key: T;
    value: K;
  }): Promise<boolean | Error> {
    const client: HttpClient = FirebaseClient.getFirestoreClient(idToken);
    const result: ApiResponse = await client.post(
      `${key}?key=${Constants?.manifest?.extra?.apiKey}`,
      value
    );

    return this.createResult(result);
  }

  public static async deleteData({
    idToken,
    key,
  }: {
    idToken: string;
    key: string;
  }): Promise<boolean | Error> {
    const client: HttpClient = FirebaseClient.getFirestoreClient(idToken);
    const result: ApiResponse = await client.delete(
      `${key}?key=${Constants?.manifest?.extra?.apiKey}`
    );

    return this.createResult(result);
  }

  private static createResult(result: ApiResponse) {
    if (result.success) {
      return true;
    } else {
      throw result.createError();
    }
  }

  /**
   * Gets the currently logged in user, if any.
   */
  public static getCurrentUser(): User {
    return firebase.auth().currentUser;
  }

  /**
   * Clears the current user from the session.
   */
  public static async signOut() {
    await firebase.auth().signOut();
  }
}

export const useFirebase = () => {
  return useQuery<string>(FIREBASE_LOGIN_KEY, async () => {
    const firebaseConfig = {
      apiKey: Constants?.manifest?.extra?.apiKey,
      authDomain: Constants?.manifest?.extra?.authDomain,
      projectId: Constants?.manifest?.extra?.projectId,
      storageBucket: Constants?.manifest?.extra?.storageBucket,
      messagingSenderId: Constants?.manifest?.extra?.messagingSenderId,
      appId: Constants?.manifest?.extra?.appId,
      measurementId: Constants?.manifest?.extra?.measurementId,
    };

    !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app();

    const currentUser = FirebaseClient.getCurrentUser();

    if (currentUser) {
      return currentUser.getIdToken(false);
    }

    const user: User = await FirebaseClient.userLogin(
      Constants?.manifest?.extra?.user,
      Constants?.manifest?.extra?.pass
    );
    const idToken = await user.getIdToken(false);
    // consol,e.log("idToken", idToken);

    return idToken;
  });
};
