"use client";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Button, Image, Input, InputNumber, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import withAuth from "../withAuth";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$9.00",
    quantity: 1,
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
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
];

const Cart = () => {
  const router = useRouter();

  // useEffect(() => {
  //   // const totalPrice = products.map(product);
  // }, [products]);

  return (
    <div>
      <div className="mx-automax-w-screen-sm text-center ">
        <h2 className="mb-4 mt-12 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Shopping Cart
        </h2>
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Items in your shopping cart
        </p>
      </div>
      {products.length > 0 ? (
        <>
          <ul role="list" class="">
            {products?.map((product) => (
              <li class="flex py-6" key={product.id}>
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#">{product.name}</a>
                      </h3>
                      <p class="ml-4">{product.price}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <div class="flex flex-1 items-end justify-between text-sm">
                    <div class="relative flex items-center max-w-[8rem]">
                      <Button
                        type="button"
                        class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          class="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </Button>
                      <Input
                        type="text"
                        data-input-counter-min="1"
                        data-input-counter-max="50"
                        class="bg-gray-50 border-x-0 border-gray-300 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value="1"
                        required
                      />
                      <Button
                        type="button"
                        class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          class="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </Button>
                    </div>
                    <div className="ml-4 flow-root lg:ml-6">
                      <a
                        href="/"
                        className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                      >
                        Remove
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <section className="total-order">
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">$22.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how shipping is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$5.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">$27.00</dd>
              </div>
            </dl>
            <div class="mt-6">
              <a
                href="#"
                class="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Checkout
              </a>
            </div>
            <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or {""}
                <span
                  class="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                  onClick={() => {
                    router.push("/category/what-is-new");
                  }}
                >
                  Continue Shopping
                </span>
              </p>
            </div>
          </section>
        </>
      ) : (
        <section className="text-center">
          Emty cart{" "}
          <span
            class="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
            onClick={() => {
              router.push("/category/what-is-new");
            }}
          >
            Continue Shopping
          </span>
        </section>
      )}
    </div>
  );
};

// export default withAuth(Cart);
export default Cart;
