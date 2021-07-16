import last from "lodash/last";
import { useQuery } from "react-query";

import { FirebaseClient } from "../database/useFirebase";

export const QUERY_KEY_IMPLEMENTS = "implements";

export interface Implement {
  id: string;
  name: string;
}
interface RawImplement {
  name?: string;
  fields?: {
    name?: {
      stringValue: string;
    };
  };
}

export const useImplements = ({ idToken }: { idToken?: string }) => {
  return useQuery<Implement[]>(
    QUERY_KEY_IMPLEMENTS,
    async () => {
      if (!idToken) {
        return [];
      }
      const items = await FirebaseClient.getData({
        idToken,
        key: "implements",
      });

      const processed: Implement[] = items.map((item: RawImplement) => {
        // name is id
        const id = item.name ? last(item.name?.split("/")) : "unknown";

        return {
          id,
          name: item.fields?.name?.stringValue,
        };
      });

      return processed;
    },
    {
      staleTime: Infinity,
    }
  );
};
