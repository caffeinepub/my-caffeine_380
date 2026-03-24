import { u as useQuery } from "./useQuery-ByVvLWbi.js";
import { P as PERMANENT_PACKAGES } from "./permanentPackages-CnZQ-KNe.js";
import "./index-Cqep3MYd.js";
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
