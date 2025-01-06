"use client";

import { navigationCategories } from "@/data";
import { useCreateBlog } from "@/hooks/blog/useBlogs";
import { useListProductVariant } from "@/hooks/catalog/useProduct";
import { ProductVariant as ProductVariantType } from "@/types";
import { formatPrice } from "@/util";
import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import "@styles/blogs/create.scss";
import { Button, Form, Image, Input, message, Table, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ColumnsType, TableProps } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Blog {
  content: string;
  location?: string;
  image: string;
  productIds: number[];
  file: File;
}

interface ProductVariant extends ProductVariantType {
  key: number;
}

export default function BlogCreatePage() {
  const [form] = Form.useForm<Blog>();
  const [fileList, setFileList] = useState<any>([]);

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
    if (fileList.length > 0) {
      values.file = fileList[0].originFileObj;
    }

    const result = await createBlog({
      ...values,
      productIds: values.productIds?.map((id) => ({ id })) || [],
    });

    if (result) {
      message.success("Tạo blog thành công!");

      form.resetFields();
      form.focusField("title");
    } else {
      message.error("Có lỗi xảy ra khi tạo blog!");
    }
  };

  const { data: productVariantData, fetchData } = useListProductVariant();

  const productList = useMemo(() => {
    return (
      productVariantData?.data?.map((variant) => ({
        ...variant,
        image: variant.product?.image,
        category: variant.product?.category,
        key: variant.id,
      })) || []
    );
  }, [productVariantData]);

  const productIds = Form.useWatch("productIds", form);

  const handleProductSearch = useCallback(
    (value: string) => {
      fetchData("product/variant", {
        query: value,
      });
    },
    [fetchData]
  );

  useEffect(() => {
    fetchData("product/variant");
  }, [fetchData]);

  const columns: ColumnsType<ProductVariant> = [
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
      title: "Màu",
      dataIndex: "color",
      key: "color",
      render: (color: any) => <span>{color === "null" ? "-" : color}</span>,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size: any) => <span>{size === "null" ? "-" : size}</span>,
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
      dataIndex: "stock",
      key: "stock",
    },
  ];

  const rowSelection: TableProps<ProductVariant>["rowSelection"] = {
    selectedRowKeys: productIds,
    onChange: (selectedRowKeys: React.Key[]) => {
      form.setFieldsValue({
        productIds: selectedRowKeys as number[],
      });
    },
  };

  const handleRowClick = (record: ProductVariant) => {
    const selectedIndex = productIds.indexOf(record.key as number);
    if (selectedIndex >= 0) {
      const newSelectedRowKeys = [...productIds];
      newSelectedRowKeys.splice(selectedIndex, 1);
      form.setFieldValue("productIds", newSelectedRowKeys);
    } else {
      form.setFieldValue("productIds", [...productIds, record.key]);
    }
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
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
        onKeyDown={handleFormKeyDown}
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
                <Input autoFocus />
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
            className="text-xl mt-3 font-bold"
          >
            <Input.Search
              placeholder="Tìm kiếm sản phẩm trong trang"
              className="pt-2 pb-6"
              onSearch={handleProductSearch}
            />
            <Table
              dataSource={productList}
              columns={columns}
              rowSelection={{ ...rowSelection }}
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}
              className="font-normal"
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
