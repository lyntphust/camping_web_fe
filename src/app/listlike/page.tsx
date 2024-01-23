"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Button, Image, Pagination, Skeleton } from "antd";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$9.00",
    quantity: 1,
    save: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$13.00",
    quantity: 1,
    save: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
];

const ListLike = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <h2 className="mb-4 mt-12 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Favourite List
        </h2>
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Discover new tourist destinations and useful information here
        </p>
      </div>
      <ul role="list" className="">
        {products?.length === 0 && (
          <section className="text-center">
            Emty list{" "}
            <span
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              onClick={() => {
                router.push("/category/what-is-new");
              }}
            >
              Continue Shopping
            </span>
          </section>
        )}
        {products?.map((product) => (
          <li
            className=" m-2 px-4 rounded-lg flex py-4 transition-all shadow shadow-lg "
            key={product.id}
          >
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <Image
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href="#">{product.name}</a>
                  </h3>
                  <p className="ml-4">{product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <HeartIcon
                  className={`h-10 w-10 flex-shrink-0 text-gray-400 group-hover:text-gray-500 ${
                    product.save ? "text-red-500 cursor-pointer" : ""
                  }`}
                />
                <div className="mr-4 flow-root lg:ml-6">
                  <a
                    href="/"
                    className="w-full text-center text-blue-600 lg:w-1/2 rounded-xl"
                  >
                    Them vao gio hang
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {products.length > 0 && (
        <div className="text-center mt-12">
          <Pagination current={1} pageSize={5} total={10} />
        </div>
      )}
    </div>
  );
};

export default ListLike;
