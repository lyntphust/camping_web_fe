"use client";

import { useState } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Tag,
} from "antd";
import { useListUsers } from "@/hooks/admin/useUser";
import authApi from "@/services/auth";
import usersApi from "@/services/users";
import axios from "axios";
// import usersApi from "../../services/users";

const UserMangement = () => {
  const [filterCategory, setFilterCategory] = useState("");

  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUsertId, setSelectedUserId] = useState<any>(null);

  const { data: usersData, isLoading, refetch } = useListUsers();

  const showModal = (record: any) => {
    setIsModalVisible(true);
    setSelectedUserId(record);
  };

  const handleOkDelete = async () => {
    try {
      await usersApi.deleteUsers(selectedUsertId.id);
      message.success("Delete user successfully!");
      setIsModalVisible(false);
      refetch();
    } catch (error) {
      message.error("Delete user failed!");
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };
  const handleOk = async () => {
    const values = form.getFieldsValue();
    console.log("values", values);

    try {
      const response = await authApi.signup({
        ...values,
        roleName: "admin",
      });
      if (response.status === 201) {
        message.success("Tạo admin thành công!");
        setVisible(false);
        form.resetFields();
        refetch();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.data.message === "User with this email already exists"
        ) {
          message.error("Email đã tồn tại! Vui lòng chọn email khác.");
        } else message.error("Tạo admin thất bại! Vui lòng thử lại.");
      }
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [form] = Form.useForm();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ và tên",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (record: any) =>
        record.name === "admin" ? (
          <Tag color="volcano">ADMIN</Tag>
        ) : (
          <Tag color="blue">USER</Tag>
        ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (record: any) => record !== "/0" && <div>{record}</div>,
    },
    {
      title: "Thao tác",
      key: "id",
      render: (record: any) => (
        <Space size="middle">
          {record.role.name === "admin" ? null : (
            <>
              <Button type="primary" danger onClick={() => showModal(record)}>
                Xóa user
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const handleCategoryChange = (value: any) => {
    setFilterCategory(value);
  };

  const filteredUser = usersData?.data.filter(
    (user: any) => filterCategory === "" || user.role.name === filterCategory
  );

  return (
    <div className="admin-page-content">
      <div className="container">
        <a
          className="w-full px-4 py-3 mr-4 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
          onClick={() => setVisible(true)}
        >
          Thêm mới admin
        </a>
        <Select
          style={{ width: 200, marginBottom: 16, height: 40 }}
          placeholder="Filter by Category"
          onChange={handleCategoryChange}
          value={filterCategory}
        >
          <Select.Option value="">Tất cả</Select.Option>
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
        <Table
          className="custom-table"
          columns={columns}
          dataSource={filteredUser}
          pagination={{ pageSize: 8 }}
        />
        <Modal
          title="Thêm mới Admin"
          open={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form}>
            <Form.Item
              label="Họ và tên"
              name="surname"
              rules={[{ required: true, message: "Họ và tên là bắt buộc" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="User Name"
              name="name"
              rules={[{ required: true, message: "User Name là bắt buộc" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Email là bắt buộc" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[{ required: true, message: "Số điện thoại là bắt buộc" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Mật khẩu là bắt buộc" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Xác nhận xóa user"
          open={isModalVisible}
          onOk={() => handleOkDelete()}
          onCancel={handleCancelDelete}
        >
          <p>
            Bạn có chắc chắn muốn xóa user?
            <div>{selectedUsertId?.name}</div>
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default UserMangement;
