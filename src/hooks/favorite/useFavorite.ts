import { ListFavorite } from "@/types/favorite";
import useQuery from "../useQuery";
import useDelete from "../useDelete";

export function useListFavorite() {
  return useQuery<ListFavorite[]>("/user/favorite");
}

export function useDeleteFavorite() {
  return useDelete();
}
