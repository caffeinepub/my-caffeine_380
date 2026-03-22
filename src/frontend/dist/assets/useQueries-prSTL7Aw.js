import { u as useQuery } from "./useQuery-D3IVLfcM.js";
import { P as PERMANENT_PACKAGES } from "./permanentPackages-CnZQ-KNe.js";
import "./index-Ds0Kkum2.js";
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
