"use client";

import { useCart } from "@/hooks/cart/useCart";
import { formatPrice } from "@/util";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Button, Image, Input } from "antd";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const Cart = () => {
  const router = useRouter();

  const { data: cart, isLoading, error } = useCart();

  const cartProducts = useMemo(() => {
    if (!cart || !cart?.data) {
      return [];
    }

    const items = [...(cart.data.items || [])];

    return items.map((cartItem) => {
      const variant = cartItem.productVariant;
      const product = variant.product;

      return {
        id: variant.id,
        name: product.name,
        photo: product.photo,
        description: product.description,
        price: variant.price,
        color: variant.color,
        size: variant.size,
        quantity: cartItem.quantity,
      };
    });
  }, [cart]);

  const cartTotal = useMemo(() => {
    if (!cart || !cart?.data) {
      return 0;
    }

    return cart.data.total;
  }, [cart]);

  return (
    <div>
      <div className="mx-automax-w-screen-sm text-center ">
        <h2 className="mb-4 mt-12 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Giỏ hàng
        </h2>
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Sản phẩm trong giỏ hàng của bạn
        </p>
      </div>
      {cartProducts.length > 0 ? (
        <>
          <ul role="list" className="">
            {cartProducts.map((product) => (
              <li className="flex py-6" key={product.id}>
                <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={product.photo}
                    width={192}
                    height={192}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#">{product.name}</a>
                      </h3>
                      <p className="ml-4">{formatPrice(product.price)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="relative flex items-center max-w-[8rem]">
                      <Button
                        type="default"
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
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
                        className="bg-gray-50 border-x-0 border-gray-300 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={product.quantity}
                        required
                      />
                      <Button
                        type="default"
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
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
                        Xoá
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
              Chi tiết thanh toán
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Tổng tiền hàng</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {formatPrice(cartTotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Phí vận chuyển</span>
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
                <dd className="text-sm font-medium text-gray-900">
                  {formatPrice(50000)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Tổng thanh toán
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {formatPrice(cartTotal + 50000)}
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Thanh toán ngay
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                hoặc {""}
                <span
                  className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                  onClick={() => {
                    router.push("/category/what-is-new");
                  }}
                >
                  Tiếp tục mua sắm
                </span>
              </p>
            </div>
          </section>
        </>
      ) : (
        <section className="text-center">
          Không có sản phẩm{" "}
          <span
            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
            onClick={() => {
              router.push("/category/what-is-new");
            }}
          >
            Tiếp tục mua sắm
          </span>
        </section>
      )}
    </div>
  );
};

// export default withAuth(Cart);
export default Cart;
