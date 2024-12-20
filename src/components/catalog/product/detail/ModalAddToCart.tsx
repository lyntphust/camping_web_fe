import { useUpdateCartProduct } from "@/hooks/cart/useCart";
import { Form, InputNumber, message, Modal, Select } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const { Option } = Select;

interface ProductVariant {
  id: number;
  color: string;
  size: string;
  stock: number;
}

interface ModalAddToCartProps {
  visible: boolean;
  onClose: () => void;
  product: any;
  action: string;
}

const ModalAddToCart: React.FC<ModalAddToCartProps> = ({
  visible,
  onClose,
  product,
  action,
}) => {
  const [form] = Form.useForm();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [availableStock, setAvailableStock] = useState(0);

  const { doMutate: updateCartProduct } = useUpdateCartProduct();

  const router = useRouter();

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const sizes = product.variants
      .filter((variant: ProductVariant) => variant.color === color)
      .map((variant: ProductVariant) => variant.size);
    setAvailableSizes(sizes);
    form.setFieldsValue({ size: undefined });
    setAvailableStock(0);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const stock = product.variants.find(
      (variant: ProductVariant) =>
        variant.color === selectedColor && variant.size === size
    )?.stock;
    setAvailableStock(stock || 0);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const selectedVariant = product.variants.find(
        (variant: ProductVariant) =>
          variant.color === values.color && variant.size === values.size
      );
      if (selectedVariant) {
        await updateCartProduct({
          productId: selectedVariant.id,
          quantity: values.quantity,
        });
      } else {
        message.error("Không tìm thấy sản phẩm");
      }
      // Add logic to add the product to the cart
      if (action === "add") {
        message.success("Đã thêm sản phẩm vào giỏ hàng");
      } else if (action === "buy") {
        message.success("Đã thêm sản phẩm vào giỏ hàng, chuyển đến giỏ hàng");
        router.push("/cart");
      }

      onClose();
    } catch (error) {
      message.error("Failed to add product to cart");
    } finally {
      form.resetFields();
      setSelectedColor(null);
      setSelectedSize(null);
    }
  };

  return (
    <Modal
      title={`${action === "add" ? "Thêm vào giỏ hàng" : "Mua ngay"} `}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Màu sắc"
          name="color"
          rules={[{ required: true, message: "Vui lòng chọn màu sắc!" }]}
        >
          <Select placeholder="Hãy chọn màu sắc" onChange={handleColorChange}>
            {Array.from(
              new Set(
                product.variants.map((variant: ProductVariant) => variant.color)
              )
            ).map((color) => (
              <Option key={color as string} value={color as string}>
                {color as string}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Size"
          name="size"
          rules={[{ required: true, message: "Vui lòng chọn size!" }]}
        >
          <Select
            placeholder="Hãy chọn size"
            disabled={!selectedColor}
            onChange={handleSizeChange}
          >
            {availableSizes.map((size) => (
              <Option key={size} value={size}>
                {size}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: "Vui lòng chọn số lượng!" }]}
        >
          <InputNumber
            min={1}
            max={availableStock}
            disabled={!selectedColor || !selectedSize}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddToCart;
