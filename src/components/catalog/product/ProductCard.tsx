import ProductPartialPrice from "@/components/catalog/product/ProductPartialPrice";
import { ProductDetail } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
  product: ProductDetail;
  className?: string;
}

export default function ProductCard({ product, className = "" }: Props) {
  const router = useRouter();

  const totalSold = useMemo(() => {
    return product.variants.reduce(
      (acc: number, variant: { sold: number }) => acc + variant.sold,
      0
    );
  }, [product.variants]);
  product.totalSold = totalSold;

  return (
    <div
      className={`cursor-pointer hover:scale-105 transition-all shadow hover:shadow-lg border rounded-xl px-6 pt-4 pb-8 flex flex-col justify-between gap-4 ${className}`}
      onClick={() => {
        router.push(`/product/${product.id}`);
      }}
    >
      <Image src={product.image} alt={product.name} width={280} height={400} />
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
          {product.name}
        </p>
        <div className="my-2">
          {/* <ProductRating
            ratingSummary={product.rating_summary}
            reviewCount={product.review_count}
          /> */}
        </div>
        <div className="mt-6">
          <ProductPartialPrice
            className="inline-flex"
            price={product.price}
            discount={product.discount}
          />
        </div>
        <p className="text-gray-500" style={{ fontSize: 14 }}>
          Đã bán: {product.totalSold}
        </p>
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
