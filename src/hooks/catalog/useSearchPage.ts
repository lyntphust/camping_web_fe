import { ProductDetail } from "@/types";
import useLazyQuery from "../useLazyQuery";

export default function useSearchPage() {
  return useLazyQuery<ProductDetail[]>();
}
