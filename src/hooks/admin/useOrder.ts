import { Order } from "@/types/order";
import useQuery from "@hooks/useQuery";
import usePatch from "../usePatch";

export function useListOrder() {
  return useQuery<Order[]>("/order");
}

export function useUpdateStatusOrder(id: number, status: string) {
  return usePatch(`/order/${id}/${status}`);
}
