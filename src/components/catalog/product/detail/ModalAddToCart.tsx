import { useUpdateCartProduct } from "@/hooks/cart/useCart";
import { Form, InputNumber, message, Modal, Select } from "antd";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

const { Option } = Select;

interface ProductVariant {
  id: number;
  color: string;
  size: string;
  stock: number;
}

interface AddToCartFormValues {
  color?: string;
  size?: string;
  quantity: number;
}

interface ModalAddToCartProps {
  visible: boolean;
  onClose: () => void;
  product: any;
  action: string;
}

const isOptionsArrayEmpty = (options: any[]) => {
  if (!Array.isArray(options)) {
    return true;
  }

  if (options.length === 0) {
    return true;
  }

  if (options.length === 1 && options[0] === "null") {
    return true;
  }

  return false;
};

const ModalAddToCart: React.FC<ModalAddToCartProps> = ({
  visible,
  onClose,
  product,
  action,
}) => {
  const [form] = Form.useForm<AddToCartFormValues>();

  const selectedColor = Form.useWatch("color", form);
  const selectedSize = Form.useWatch("size", form);

  const { doMutate: updateCartProduct } = useUpdateCartProduct();

  const availableColors = useMemo(() => {
    return Array.from(
      new Set<string>(product.variants.map((variant: ProductVariant) => variant.color))
    );
  }, [product.variants]);

  const availableSizes = useMemo<string[]>(() => {
    return product.variants
      .filter((variant: ProductVariant) => variant.color === selectedColor)
      .map((variant: ProductVariant) => variant.size);
  }, [product.variants, selectedColor]);

  const variantFromSelected = useMemo(() => {
    function isPropertyValid(
      variantSize: string,
      selectedSize?: string | null
    ) {
      if (!selectedSize || selectedSize === "null") {
        return variantSize === "null";
      }

      return variantSize === selectedSize;
    }

    return product.variants.find((variant: ProductVariant) => {
      return (
        isPropertyValid(variant.color, selectedColor) &&
        isPropertyValid(variant.size, selectedSize)
      );
    });
  }, [product.variants, selectedColor, selectedSize]);

  const availableStock = useMemo(() => {
    return variantFromSelected ? variantFromSelected.stock : 0;
  }, [variantFromSelected]);

  const router = useRouter();

  const handleOk = async () => {
    try {
      if (!selectedColor) {
        form.setFieldValue("color", "null");
      }

      if (!selectedSize) {
        form.setFieldValue("size", "null");
      }

      const values = await form.validateFields();

      if (!variantFromSelected) {
        message.error("Không tìm thấy sản phẩm");

        return;
      }

      const updateResult = await updateCartProduct({
        productId: variantFromSelected.id,
        quantity: values.quantity,
      });

      if (updateResult?.data?.error) {
        message.error(updateResult.data.error);
      } else {
        message.success("Đã thêm sản phẩm vào giỏ hàng");

        if (action === "buy") {
          router.push("/cart");
        }
      }

      onClose();
    } catch (error) {
      message.error("Thêm sản phẩm thất bại");
    } finally {
      form.resetFields();
    }
  };

  return (
    <Modal
      title={`${action === "add" ? "Thêm vào giỏ hàng" : "Mua ngay"} `}
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: "Vui lòng chọn màu!" }]}
          hidden={isOptionsArrayEmpty(availableColors)}
        >
          <Select placeholder="Hãy chọn màu">
            {
              availableColors.map((color) => (
                <Option key={color} value={color}>
                  {color}
                </Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="Size"
          name="size"
          rules={[{ required: true, message: "Vui lòng chọn size!" }]}
          hidden={isOptionsArrayEmpty(availableSizes)}
        >
          <Select placeholder="Hãy chọn size">
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
          <InputNumber min={1} max={availableStock} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddToCart;
