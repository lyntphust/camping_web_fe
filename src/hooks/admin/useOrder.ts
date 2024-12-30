import { Order } from "@/types/order";
import useQuery from "@hooks/useQuery";
import useEdit from "../useEdit";

export function useListOrder() {
  return useQuery<Order[]>("/order");
}

export function useAllOrder() {
  return useQuery<Order[]>("/order/all");
}

export function useUpdateStatusOrder() {
  return useEdit();
}
