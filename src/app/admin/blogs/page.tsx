"use client";

import LoadingFallback from "@/components/LoadingFallback";
import { useAuth } from "@/context/AuthContext";
import { useListBlog } from "@/hooks/blog/useBlogs";
import { Blog, BlogStatus } from "@/types";
import { parseJwt } from "@/util";
import { Button, Image, Table, Tag } from "antd";
import { useEffect, useMemo } from "react";

export default function BlogManagement() {
  const { accessToken } = useAuth();

  const { data: listBlog, fetchData, isLoading } = useListBlog();

  const listBlogData = useMemo(
    () =>
      listBlog?.data?.map((blog) => ({
        key: blog.id,
        ...blog,
      })) || [],
    [listBlog]
  );

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const { id } = parseJwt(accessToken);

    fetchData(`/blog/admin?userId=${id}`);
  }, [fetchData, accessToken]);

  const columns = [
    {
      title: "Ảnh bìa",
      dataIndex: "image",
      key: "image",
      render: (value: string, record: Blog) => {
        const imageUrl = value || record.image;

        return (
          <Image src={imageUrl} width={64} height={64} alt="blog-thumbnail" />
        );
      },
      width: 100,
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      width: 240,
    },
    {
      title: "Nội dung",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (record: BlogStatus) => {
        switch (record) {
          case BlogStatus.PENDING:
            return <Tag color="blue">Pending</Tag>;
          case BlogStatus.APPROVED:
            return <Tag color="green">Approved</Tag>;
          case BlogStatus.REJECTED:
            return <Tag color="red">Rejected</Tag>;
          default:
            return null;
        }
      },
      width: 120,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record: Blog) => (
        <div className="flex justify-center space-x-2">
          <Button type="primary" onClick={() => {}}>
            Sửa
          </Button>
          <Button danger onClick={() => {}}>
            Xoá
          </Button>
        </div>
      ),
      width: 120,
    },
  ];

  return (
    <div className="admin-page-content">
      <LoadingFallback isLoading={isLoading} width={1000} height={800} />
      <div className="container">
        <Table columns={columns} dataSource={listBlogData} />
      </div>
    </div>
  );
}
