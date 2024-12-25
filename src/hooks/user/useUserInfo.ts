"use client";

import useQuery from "@hooks/useQuery";
import { UserInfoData } from "@/types/user/userInfo";
import usePut from "../usePut";

export function useUserInfo(userId: number) {
  return useQuery<UserInfoData>(`user/${userId}`);
}

export function useUpdateUserInfo() {
  return usePut("user/update");
}
