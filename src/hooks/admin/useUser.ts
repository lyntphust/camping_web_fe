import { UserInfoData } from "@/types/user/userInfo";
import useQuery from "@hooks/useQuery";

export function useListUsers() {
  return useQuery<UserInfoData[]>("/user/all");
}
