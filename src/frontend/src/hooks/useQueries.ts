import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Customer,
  Node,
  Package,
  Payment,
  ServiceStatus,
} from "../backend";
import { useActor } from "./useActor";

export function useCustomers() {
  const { actor, isFetching } = useActor();
  return useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCustomers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCustomer(id: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<Customer>({
    queryKey: ["customer", id.toString()],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getCustomer(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useNodes() {
  const { actor, isFetching } = useActor();
  return useQuery<Node[]>({
    queryKey: ["nodes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNodes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePackages() {
  const { actor, isFetching } = useActor();
  return useQuery<Package[]>({
    queryKey: ["packages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePayments() {
  const { actor, isFetching } = useActor();
  return useQuery<Payment[]>({
    queryKey: ["payments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPayments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export type { Customer, Node, Package, Payment, ServiceStatus };
