import useMutation from "@hooks/useMutation";

export function useCreateOrder() {
  return useMutation("/order");
}
