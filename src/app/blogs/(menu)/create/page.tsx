"use client";

import { navigationCategories } from "@/data";
import { useCreateBlog } from "@/hooks/blog/useBlogs";
import { useListProduct } from "@/hooks/catalog/useProduct";
import { ProductDetail } from "@/types";
import { formatPrice } from "@/util";
import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import "@styles/blogs/create.scss";
import { Button, Form, Image, Input, message, Table, Tag, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ColumnsType, TableProps } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Blog {
  content: string;
  location?: string;
  image: string;
  productIds: number[];
}

const calculateTotalStock = (product: ProductDetail) => {
  return product?.variants?.reduce(
    (acc, variant) => acc + (variant.stock || 0),
    0
  );
};

export default function BlogCreatePage() {
  const [form] = Form.useForm<Blog>();
  const [fileList, setFileList] = useState([]);

  const { doMutate: createBlog } = useCreateBlog();

  const router = useRouter();

  const handleRemoveImage = async () => {
    setFileList([]);
  };

  const handleRender = (__: any, img: any) => {
    let imgUploadUrl;

    if (!img.url) {
      imgUploadUrl = URL.createObjectURL(img.originFileObj);
    }

    return (
      <div className="img-item w-fit h-fit relative">
        <CloseCircleFilled
          className="remove-icon fz-16"
          onClick={() => handleRemoveImage()}
        />
        <Image
          rootClassName="modal-preview-img max-h-[300px]"
          className="img max-h-[300px]"
          src={img?.url || imgUploadUrl}
          preview={{
            src: img?.url,
          }}
          alt={img?.name}
        />
      </div>
    );
  };

  const handleFileChange = ({ fileList }: any) => {
    fileList = fileList.slice(-1);

    setFileList(fileList);
  };

  const onFinish = async (values: Blog) => {
    const result = await createBlog({
      ...values,
      productIds: values.productIds?.map((id) => ({ id })) || [],
    });

    if (result?.data) {
      message.success("Create blog successfully!");

      router.push("/blogs/my");
    }
  };

  const { data: productData } = useListProduct();

  const productList =
    productData?.data.map((product) => ({
      ...product,
      key: product.id,
    })) || [];

  const columns: ColumnsType<ProductDetail> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string, record) => {
        return <Image src={image} alt={`image-${record.id}`} width={50} />;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (record: any) => <div>{formatPrice(record)}</div>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (categoryId: any) => {
        const category = navigationCategories.find(
          (cat) => cat.id == categoryId
        );
        return <span>{category?.name || "-"}</span>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "id",
      key: "id",
      render: (text: Number, record: any) => {
        const total = calculateTotalStock(record);

        return <span>{total ? total : <Tag color="volcano">SOLD</Tag>}</span>;
      },
    },
  ];

  const rowSelection: TableProps<ProductDetail>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      form.setFieldsValue({
        productIds: selectedRowKeys as number[],
      });
    },
  };

  return (
    <div className="admin-page-content">
      <Button
        onClick={() => router.back()}
        className="items-center font-medium pl-8 pr-10 py-2 hover:text-blue-700"
      >
        <ArrowLeftIcon className="w-8 h-4" />
        Quay lại
      </Button>
      <Form
        form={form}
        layout="vertical"
        className="add-form pt-6"
        onFinish={onFinish}
      >
        <div className="flex flex-col w-full">
          <div className="flex w-full">
            <Form.Item
              label="Ảnh bìa"
              name="file"
              className="w-1/2 font-bold text-lg mt-3"
            >
              <Upload
                beforeUpload={() => false}
                className="upload"
                listType="picture-card"
                multiple={false}
                itemRender={handleRender}
                accept="image/png, image/jpeg"
                fileList={fileList}
                onChange={(fileList) => handleFileChange(fileList)}
              >
                <div className="btn-upload">
                  <PlusOutlined />
                  <span className="btn-text">Tải ảnh lên</span>
                </div>
              </Upload>
            </Form.Item>
            <div className="w-1/2 ml-4">
              <Form.Item
                label="Tiêu đề"
                name="title"
                className="w-full font-bold text-lg mt-3"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Địa điểm"
                name="location"
                className="w-full font-bold text-lg mt-3"
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            label="Sản phẩm gợi ý"
            name="productIds"
            className="text-lg mt-3"
          >
            <Table
              dataSource={productList}
              columns={columns}
              rowSelection={{ ...rowSelection }}
            />
          </Form.Item>
          <Form.Item
            label="Nội dung"
            name="text"
            required
            className="font-bold text-lg mt-3"
          >
            <TextArea rows={10} required />
          </Form.Item>
          <div className="flex w-full items-center">
            <Form.Item className="mx-auto">
              <Button
                type="primary"
                htmlType="submit"
                className="h-fit py-3 px-16 w-fit text-lg font-bold mx-auto"
              >
                Tạo
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}
