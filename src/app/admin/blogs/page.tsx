"use client";

import LoadingFallback from "@/components/LoadingFallback";
import { useAuth } from "@/context/AuthContext";
import {
  useDeleteBlog,
  useListBlogAll,
  useUpdateBlog,
} from "@/hooks/blog/useBlogs";
import { Blog, BlogStatus } from "@/types";
import { parseJwt } from "@/util";
import { Button, Image, Table, Tag, Modal, Tooltip } from "antd";
import { useEffect, useMemo, useState } from "react";

export default function BlogManagement() {
  const { accessToken } = useAuth();
  const [isModalVisibleReject, setIsModalVisibleReject] = useState(false);
  const [isModalVisibleApprove, setIsModalVisibleApprove] = useState(false);
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  const { data: listBlog, isLoading, refetch } = useListBlogAll();
  const { doEdit: updateBlog } = useUpdateBlog();

  const { doDelete: deleteBlog } = useDeleteBlog();

  const listBlogData = useMemo(
    () =>
      listBlog?.data?.map((blog) => ({
        key: blog.id,
        ...blog,
      })) || [],
    [listBlog]
  );

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
      render: (text: string) => {
        if (text.length > 200) {
          return (
            <Tooltip title={text} style={{ width: 500 }}>
              <span>{text.slice(0, 200)}...</span>
            </Tooltip>
          );
        }
        return text;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (record: BlogStatus) => {
        switch (record) {
          case BlogStatus.PENDING:
            return <Tag color="blue">Chờ duyệt</Tag>;
          case BlogStatus.APPROVED:
            return <Tag color="green">Đã duyệt</Tag>;
          case BlogStatus.REJECTED:
            return <Tag color="red">Từ chối</Tag>;
          default:
            return null;
        }
      },
      width: 120,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record: Blog) => {
        if (record.status === BlogStatus.PENDING) {
          return (
            <div className="flex justify-center space-x-2">
              <Button
                type="primary"
                onClick={() => {
                  setSelectedId(record.id);
                  setIsModalVisibleApprove(true);
                }}
              >
                Duyệt
              </Button>
              <Button
                danger
                onClick={() => {
                  setSelectedId(record.id);
                  setIsModalVisibleReject(true);
                }}
              >
                Từ chối
              </Button>
            </div>
          );
        } else if (record.status === BlogStatus.APPROVED) {
          return (
            <Button
              danger
              onClick={() => {
                setSelectedId(record.id);
                setIsModalVisibleDelete(true);
              }}
            >
              Xóa
            </Button>
          );
        }
        return null;
      },
      width: 200,
    },
  ];

  // Reject blog
  const handleOkReject = async () => {
    await updateBlog(
      `/blog/admin/update-status/${selectedId}/${BlogStatus.REJECTED}`
    );
    setIsModalVisibleReject(false);
    refetch();
  };

  const handleCancelReject = () => {
    setIsModalVisibleReject(false);
  };

  // Approve blog
  const handleOkApprove = async () => {
    await updateBlog(
      `/blog/admin/update-status/${selectedId}/${BlogStatus.APPROVED}`
    );
    setIsModalVisibleApprove(false);
    refetch();
  };

  const handleCancelApprove = () => {
    setIsModalVisibleApprove(false);
  };

  // Delete blog
  const handleOkDelete = async () => {
    await deleteBlog(`/blog/${selectedId}`);
    setIsModalVisibleDelete(false);
    refetch();
  };

  const handleCancelDelete = () => {
    setIsModalVisibleDelete(false);
  };

  return (
    <div className="admin-page-content">
      <Modal
        title="Từ chối blog"
        open={isModalVisibleReject}
        onOk={() => handleOkReject()}
        onCancel={handleCancelReject}
      >
        <div>Bạn muốn từ chối blog này?</div>
        <div style={{ color: "#ff4d4f", fontSize: 12 }}>
          Sau khi từ chối bạn sẽ không thể khôi phục lại blog!
        </div>
      </Modal>
      <Modal
        title="Duyệt blog"
        open={isModalVisibleApprove}
        onOk={() => handleOkApprove()}
        onCancel={handleCancelApprove}
      >
        <div>Bạn muốn duyệt blog này?</div>
      </Modal>
      <Modal
        title="Xóa blog"
        open={isModalVisibleDelete}
        onOk={() => handleOkDelete()}
        onCancel={handleCancelDelete}
      >
        <div>Bạn muốn xóa blog này?</div>
        <div style={{ color: "#ff4d4f", fontSize: 12 }}>
          Sau khi xóa bạn sẽ không thể khôi phục lại blog!
        </div>
      </Modal>
      <LoadingFallback isLoading={isLoading} width={1000} height={800} />
      <div className="container">
        <Table columns={columns} dataSource={listBlogData} />
      </div>
    </div>
  );
}
