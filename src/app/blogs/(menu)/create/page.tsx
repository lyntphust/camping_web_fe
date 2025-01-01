"use client";

import ProductPartialPrice from "@/components/catalog/product/ProductPartialPrice";
import { useCreateBlog } from "@/hooks/blog/useBlogs";
import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import "@styles/blogs/create.scss";
import { Button, Form, Image, Input, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Blog {
  content: string;
  location?: string;
  image: string;
}

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
    const result = await createBlog(values);

    if (result?.data) {
      message.success("Create blog successfully!");

      router.push("/blogs/my");
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
            name="text"
            className="font-bold text-lg mt-3"
          >
            <Input.Search
              placeholder="Tìm kiếm sản phẩm trong trang"
              // suffix={SearchOutlined}
            />
          </Form.Item>
          {[1, 2, 3].map((index) => (
            <li
              className=" m-2 px-4 rounded-lg flex py-4 transition-all shadow shadow-lg "
              key={index}
            >
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                  src="/about_img.png"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">name</a>
                    </h3>
                    <ProductPartialPrice
                      price={100}
                      discount={20}
                      className="flex-row-reverse"
                    />
                  </div>
                </div>
              </div>
              <div>
                <XMarkIcon height={24} width={24} />
              </div>
            </li>
          ))}
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
