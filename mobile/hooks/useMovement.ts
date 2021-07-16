import lodash from "lodash";
import { useQuery } from "react-query";

import { FirebaseClient } from "../database/useFirebase";

const QUERY_KEY = "movement";

export interface Movement {
  id: string;
  name: string;
}
interface RawMovement {
  name?: string;
  fields?: {
    name?: {
      stringValue: string;
    };
  };
}

export const useMovements = ({ idToken }: { idToken?: string }) => {
  return useQuery<Movement[]>(
    QUERY_KEY,
    async () => {
      if (!idToken) {
        return [];
      }
      const items = await FirebaseClient.getData({
        idToken,
        key: "movement",
      });

      const processed: Movement[] = items.map((item: RawMovement) => {
        // name is id
        const id = item.name ? lodash.last(item.name?.split("/")) : "unknown";

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
