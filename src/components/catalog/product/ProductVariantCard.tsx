import { ProductVariant } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductPartialPrice from "./ProductPartialPrice";

interface Props {
  variant: ProductVariant;
  className?: string;
}

export default function ProductVariantCard({ variant, className = "" }: Props) {
  const router = useRouter();

  return (
    <div
      className={`cursor-pointer hover:scale-105 transition-all shadow hover:shadow-lg border rounded-xl px-6 pt-4 pb-8 flex flex-col justify-between gap-4 ${className}`}
      onClick={() => {
        router.push(`/product/${variant.product?.id}`);
      }}
    >
      <Image
        src={variant.product?.image || ""}
        alt={variant.product?.name || ""}
        width={280}
        height={280}
      />
      <div className="p-4">
        <p
          className="pb-4 font-semibold text-xl"
          style={{
            maxWidth: "294px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {variant?.product?.name}
        </p>
        <div className="mt-6">
          <ProductPartialPrice className="inline-flex" price={variant.price} />
        </div>
      </div>
      <button
        type="submit"
        aria-label="Shop now"
        className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 rounded-lg font-bold py-3 text-center focus:ring-0 capitalize"
      >
        Mua sắm ngay
      </button>
    </div>
  );
}
