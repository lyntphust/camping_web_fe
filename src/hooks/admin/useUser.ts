import useQuery from "@hooks/useQuery";

export function useListUsers() {
  return useQuery("/user/all");
}
