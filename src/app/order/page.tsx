"use client";

import ProductPartialPrice from "@/components/catalog/product/ProductPartialPrice";
import { useAuth } from "@/context/AuthContext";
import { useListOrder } from "@/hooks/admin/useOrder";
import { useCreateProductComment } from "@/hooks/catalog/useProduct";
import { Form, Image, Input, message, Modal, Rate, Skeleton, Tag } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OrderComponent = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { userInfo } = useAuth();
  const [visible, setVisible] = useState<boolean>();
  const [productSelected, setProductSelected] = useState<any>();

  const { data: orderData, isLoading, refetch } = useListOrder();
  const { doMutate: createProductComment } = useCreateProductComment();

  const listOrder = orderData?.data || [];

  const handleOk = async () => {
    try {
      const values = form.getFieldsValue();
      const data = await createProductComment({
        ...values,
        productId: productSelected.productVariant.product.id,
        userId: userInfo.id,
      });

      if (data) {
        message.success("Đã thêm đánh giá thành công!");
      }

      setVisible(false);
      form.resetFields();
      refetch();
    } catch (error) {
      message.error("Không thể thêm đánh giá! Vui lòng thử lại sau");
    }
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <div className="w-full min-h-screen">
      {isLoading ? (
        <Skeleton active loading />
      ) : (
        <div>
          <Modal
            title="Đánh giá sản phẩm"
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form form={form} layout="vertical" onFinish={handleOk}>
              <Form.Item
                name="rating"
                rules={[{ required: true, message: "Vui lòng chọn số sao" }]}
              >
                <Rate />
              </Form.Item>
              <Form.Item
                label="Đánh giá"
                name="comment"
                rules={[{ required: true, message: "Đánh giá là bắt buộc" }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Form>
          </Modal>
          <div className="mx-auto max-w-screen-sm text-center ">
            <h2 className="mb-4 mt-12 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Đơn hàng
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Sản phẩm trong đơn hàng của bạn
            </p>
          </div>
          {listOrder.length > 0 ? (
            <>
              {listOrder.map((order) => (
                <ul
                  key={order.id}
                  role="list"
                  className="m-2 px-4 rounded-lg py-4 transition-all shadow shadow-lg"
                >
                  {order.OrdersProducts.map((product) => (
                    <li
                      className="flex pb-4"
                      key={product.id}
                      onClick={() => router.push(`/product/${product.id}`)}
                    >
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
                        <div className="flex mb-2 justify-between font-medium text-gray-900">
                          <span className="text-xl">
                            <a href="#">
                              {product?.productVariant?.product.name}
                            </a>
                          </span>
                          <ProductPartialPrice
                            price={product?.productVariant?.product.price}
                            discount={product?.productVariant?.product.discount}
                            className="flex-row-reverse"
                          />
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <div className="flex gap-2">
                              {product.productVariant?.color && (
                                <div className="text-sm">
                                  <span className="text-l">Màu:&nbsp;</span>
                                  <span className="font-bold text-l">
                                    {product.productVariant?.color}
                                  </span>
                                </div>
                              )}
                              {product.productVariant?.size && (
                                <div className="text-sm">
                                  <span className="text-l">Size:&nbsp;</span>
                                  <span className="font-bold text-l">
                                    {product.productVariant?.size}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="text-sm mt-2">
                              <span className="text-l">Số lượng:&nbsp;</span>
                              <span className="font-bold text-l">
                                {product.quantity}
                              </span>
                            </div>
                          </div>
                          {order.status === "SHIPPED" && (
                            <p className="flow-root mt-4">
                              <a
                                className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setProductSelected(product);
                                  setVisible(true);
                                }}
                              >
                                Đánh giá sản phẩm
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold">Thông tin người nhận</p>
                      <p className="text-md">
                        Địa chỉ:&nbsp;
                        <span className="text-md">{order.address}</span>
                      </p>
                      <p className="text-md">
                        Số điện thoại:&nbsp;
                        <span className="text-md">{order.phone}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-md">
                        Tổng tiền:&nbsp;
                        <span className="text-md">0 đ</span>
                      </p>
                      <p className="text-md">
                        Trạng thái đơn hàng:&nbsp;
                        {order.status === "CREATED" && (
                          <Tag color="volcano">Đã tạo đơn</Tag>
                        )}
                        {order.status === "REFAUSE" && (
                          <Tag color="red">Huỷ giao hàng</Tag>
                        )}
                        {order.status === "SHIPPING" && (
                          <Tag color="blue">Đang giao hàng</Tag>
                        )}
                        {order.status === "SHIPPED" && (
                          <Tag color="green">Đã giao hàng</Tag>
                        )}
                      </p>
                    </div>
                  </div>
                </ul>
              ))}
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
      )}
    </div>
  );
};

export default OrderComponent;
