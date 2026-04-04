import { J as useQuery } from "./index-C7L7qdp1.js";
import { P as PERMANENT_PACKAGES } from "./permanentPackages-CnZQ-KNe.js";
function usePackages() {
  return useQuery({
    queryKey: ["packages"],
    queryFn: async () => PERMANENT_PACKAGES,
    staleTime: Number.POSITIVE_INFINITY
  });
}
export {
  usePackages as u
};
