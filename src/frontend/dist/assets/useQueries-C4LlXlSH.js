import { u as useQuery } from "./useQuery-5mpBbnj1.js";
import { P as PERMANENT_PACKAGES } from "./permanentPackages-CnZQ-KNe.js";
import "./index-vIdg1x08.js";
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
