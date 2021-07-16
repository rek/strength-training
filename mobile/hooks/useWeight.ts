import last from "lodash/last";
import { useQuery } from "react-query";

import { FirebaseClient } from "../database/useFirebase";

const QUERY_KEY = "weight";

export interface Weight {
  id: string;
  name: string;
}
interface RawWeight {
  name?: string;
  fields?: {
    name?: {
      stringValue: string;
    };
  };
}

export const useWeights = ({ idToken }: { idToken?: string }) => {
  return useQuery<Weight[]>(
    QUERY_KEY,
    async () => {
      if (!idToken) {
        return [];
      }
      const items = await FirebaseClient.getData({
        idToken,
        key: "weight",
      });

      const processed: Weight[] = items.map((item: RawWeight) => {
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
