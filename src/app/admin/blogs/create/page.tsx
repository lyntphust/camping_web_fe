"use client";

import { useCreateBlog } from "@/hooks/blog/useBlogs";
import { PlusOutlined } from "@ant-design/icons";
import "@styles/admin/blogs/create.scss";
import { Button, Form, Image, Input, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { useState } from "react";

interface Blog {
  content: string;
  location?: string;
  image: string;
}

export default function BlogCreatePage() {
  const [form] = Form.useForm<Blog>();
  const [fileList, setFileList] = useState([]);

  const { mutate: createBlog } = useCreateBlog();

  const router = useRouter();

  const handleRender = (__: any, img: any) => {
    let imgUploadUrl;

    if (!img.url) {
      imgUploadUrl = URL.createObjectURL(img.originFileObj);
    }

    return (
      <div className="img-item w-fit h-fit relative">
        <Image
          rootClassName="modal-preview-img"
          className="img"
          src={img?.url || imgUploadUrl}
          height={384}
          width={800}
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

      router.push("/admin/blogs");
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<Blog>) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="admin-page-content">
      <Form
        form={form}
        layout="vertical"
        className="add-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Ảnh bìa" name="file">
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
        <Form.Item label="Nội dung" name="text">
          <TextArea rows={10} required />
        </Form.Item>
        <Form.Item label="Địa điểm" name="location">
          <Input />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Tạo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
