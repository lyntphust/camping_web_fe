"use client";

import { homeFeaturedProducts } from "@/data";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FeaturedProducts() {
  const productsData = homeFeaturedProducts;
  const router = useRouter();

  return (
    <section>
      <h2 className="text-center pt-20">DANH MỤC NỔI BẬT</h2>
      <div className="mx-auto">
        <div className="flex flex-wrap justify-center gap-8 my-10">
          {productsData?.items.map((product, i) => (
            <div
              className="flex w-[calc(20%_-_46px)] h-100 flex-wrap"
              key={i}
              onClick={() => {
                router.push(`/category/${product.url_path}`);
              }}
            >
              <div className="w-full p-1 pb-16">
                <Image
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center hover:scale-110 transition-all hover:cursor-pointer"
                  src={product.image.url}
                  width={300}
                  height={100}
                />
                <p className="text-center">{product.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
