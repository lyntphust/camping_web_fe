"use client";

import { useAdminBlogs } from "@/hooks/blog/useAdminBlogs";
import { Blog, BlogStatus } from "@/types";
import { Button, Image, message, Skeleton, Table, Tag } from "antd";
import { useMemo } from "react";

export default function BlogManagement() {
  const {
    approveBlog,
    rejectBlog,
    getAllBlogs,
    isLoading: actionIsLoading,
  } = useAdminBlogs();

  const {
    data: listBlog,
    refetch,
    isLoading: getAllBlogsIsLoading,
  } = getAllBlogs();

  const isLoading = getAllBlogsIsLoading || actionIsLoading;

  const listBlogData = useMemo(
    () =>
      listBlog?.data?.map((blog) => ({
        key: blog.id,
        ...blog,
      })) || [],
    [listBlog]
  );

  const handleApprove = async (id: number) => {
    const result = await approveBlog(id);

    if (result?.data.message) {
      message.success(result.data.message);
    } else {
      message.error("Duyệt blog thất bại");
    }

    refetch();
  };

  const handleReject = async (id: number) => {
    const result = await rejectBlog(id);

    if (result?.data.message) {
      message.success(result.data.message);
    } else {
      message.error("Từ chối blog thất bại");
    }

    refetch();
  };

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
          <Button
            type="primary"
            onClick={() => {
              handleApprove(record.id);
            }}
          >
            Duyệt
          </Button>
          <Button danger onClick={() => handleReject(record.id)}>
            Từ chối
          </Button>
          <Button danger onClick={() => {}}>
            Xem
          </Button>
        </div>
      ),
      width: 120,
    },
  ];

  return (
    <div className="admin-page-content">
      <div className="container">
        <Skeleton loading={isLoading} />
        {!isLoading && <Table columns={columns} dataSource={listBlogData} />}
      </div>
    </div>
  );
}
