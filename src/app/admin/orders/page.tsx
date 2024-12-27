"use client";

import {
  Button,
  message,
  Modal,
  Select,
  Skeleton,
  Space,
  Table,
  Tag,
} from "antd";
import { useMemo, useState } from "react";

import { useAllOrder, useUpdateStatusOrder } from "@/hooks/admin/useOrder";
import { useListUsers } from "@/hooks/admin/useUser";
import { formatPrice } from "@/util";
import { OrderStatus } from "@/types/order";
// import orderApi from "../../services/oder";

const OrderManagement = () => {
  const [filterCategory, setFilterCategory] = useState("");
  const [isModalVisibleDeliver, setIsModalVisibleDeliver] = useState(false);
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const [orderIdSelected, setOrderIdSelected] = useState<number>(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const {
    data: orderList,
    isLoading: getListIsLoading,
    refetch,
  } = useAllOrder();

  const { data: listUser } = useListUsers();

  const orderListData = useMemo(
    () =>
      orderList?.data?.map((order: any) => ({
        ...order,
        key: order.id,
      })),
    [orderList]
  );

  const { doEdit: updateStatusOrder, isLoading: updateStatusIsLoading } =
    useUpdateStatusOrder();

  const handleViewDetails = (record: any) => {
    setIsModalVisible(true);
    setOrderDetails(record.OrdersProducts);
  };
  const handleOkDetails = () => {
    setIsModalVisible(false);
  };

  const handleCancelDetails = () => {
    setIsModalVisible(false);
  };

  // Delivered order
  const handleDeliver = (record: any) => {
    setOrderDetails(record.OrdersProducts);
    setIsModalVisibleDeliver(true);
    setOrderIdSelected(record.id);
  };

  const handleOkDeliver = async () => {
    try {
      await updateStatusOrder(
        `/order/${orderIdSelected}/${OrderStatus.SHIPPING}`
      );
      message.success("Đã giao cho đơn vị vận chuyển!");
      setIsModalVisibleDeliver(false);
      refetch();
    } catch (error) {
      message.error("Không thể hoàn tất đơn hàng! Vui lòng thử lại");
    }
  };
  const handleCancelDeliver = () => {
    setIsModalVisibleDeliver(false);
  };

  // Delivered done order
  const handleDeliverDone = async () => {
    try {
      await updateStatusOrder(
        `/order/${orderIdSelected}/${OrderStatus.SHIPPED}`
      );
      message.success("Đơn hàng đã được giao thành công!");
      setIsModalVisibleDeliver(false);
      refetch();
    } catch (error) {
      message.error("Không thể hoàn tất đơn hàng! Vui lòng thử lại");
    }
  };

  // Delete order
  const handleDelete = async (record: any) => {
    setOrderDetails(record.OrdersProducts);
    setIsModalVisibleDelete(true);
    setOrderIdSelected(record.id);
  };

  const handleOkDelete = async () => {
    try {
      await updateStatusOrder(
        `/order/${orderIdSelected}/${OrderStatus.REFAUSE}`
      );
      message.success("Từ chối giao hàng thành công!");
      setIsModalVisibleDelete(false);
      refetch();
    } catch (error) {
      message.error("Không thể hoàn tất đơn hàng! Vui lòng thử lại");
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisibleDelete(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Sản phẩm",
      dataIndex: "id",
      key: "id",
      render: (text: number, record: any) => {
        return (
          <div
            style={{ color: "#1677ff", cursor: "pointer" }}
            onClick={() => {
              handleViewDetails(record);
            }}
          >
            Xem chi tiết
          </div>
        );
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "price",
      key: "price",
      render: (record: any) => <div>{formatPrice(record)}</div>,
    },
    {
      title: "Người đặt",
      key: "oder_by",
      render: (record: any) => {
        const user = listUser?.data?.find(
          (user: any) => user.id === record.userId
        );
        return <div>{user ? user.name : "User không xác định"}</div>;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (record: any) => (
        <>
          {record && <div style={{ width: "250px" }}>{record}</div>}
          {!record && (
            <div style={{ width: "250px" }}>KTX Đại Học Bách Khoa Hà Nội</div>
          )}
        </>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng thái đơn",
      dataIndex: "status",
      key: "status",
      render: (record: any) => (
        <>
          {record === "CREATED" && <Tag color="volcano">Đã tạo đơn</Tag>}
          {record === "REFAUSE" && <Tag color="red">Huỷ giao hàng</Tag>}
          {record === "SHIPPING" && <Tag color="blue">Đang giao hàng</Tag>}
          {record === "SHIPPED" && <Tag color="green">Đã giao hàng</Tag>}
        </>
      ),
    },
    {
      title: "Giao đơn ngay",
      key: "action",
      dataIndex: "id",
      render: (text: any, record: any) => (
        <Space size="middle">
          {record.status === "CREATED" && (
            <>
              <Button type="primary" onClick={() => handleDeliver(record)}>
                Giao Hàng
              </Button>
              <Button onClick={() => handleDelete(record)} danger>
                Từ Chối Giao Hàng
              </Button>
            </>
          )}
          {record.status === "SHIPPING" && (
            <Button
              type="primary"
              onClick={() => {
                setOrderIdSelected(record.id);
                setTimeout(() => {
                  handleDeliverDone();
                }, 1000);
              }}
            >
              Hoàn tất giao hàng
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const columnsOrderDetail = [
    {
      title: "ID Sản phẩm",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: ["productVariant", "product", "name"],
      key: "id",
    },
    {
      title: "Màu sắc",
      dataIndex: ["productVariant", "color"],
      key: "color",
    },
    {
      title: "Kích thước",
      dataIndex: ["productVariant", "size"],
      key: "size",
      render: (record: any) => <div>{record === "null" ? "" : record}</div>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng tiền",
      dataIndex: ["productVariant", "product", "price"],
      key: "price",
      render: (record: any) => <div>{formatPrice(record)}</div>,
    },
  ];

  const handleCategoryChange = (value: any) => {
    setFilterCategory(value);
  };

  const filteredProducts = orderListData?.filter(
    (product: any) => filterCategory === "" || product.status === filterCategory
  );

  if (getListIsLoading || updateStatusIsLoading) {
    return <Skeleton />;
  }

  return (
    <div className="admin-page-content">
      <div className="container">
        <Select
          style={{ width: 200, marginBottom: 16, height: 40 }}
          placeholder="Filter by Category"
          onChange={handleCategoryChange}
          value={filterCategory}
        >
          <Select.Option value="">Tất cả</Select.Option>
          <Select.Option value="REFAUSE">Huỷ giao hàng</Select.Option>
          <Select.Option value="CREATED">Đã tạo đơn</Select.Option>
          <Select.Option value="SHIPPING">Đang giao hàng</Select.Option>
          <Select.Option value="SHIPPED">Đã giao hàng</Select.Option>
        </Select>
        <Table
          columns={columns}
          dataSource={filteredProducts}
          pagination={{ pageSize: 8 }}
        />
      </div>
      <Modal
        title="Chi tiết đơn hàng"
        open={isModalVisible}
        onOk={handleOkDetails}
        onCancel={handleCancelDetails}
      >
        <Table columns={columnsOrderDetail} dataSource={orderDetails} />
      </Modal>
      <Modal
        title="Chi tiết đơn hàng"
        open={isModalVisibleDeliver}
        onOk={() => handleOkDeliver()}
        onCancel={handleCancelDeliver}
      >
        <Table columns={columnsOrderDetail} dataSource={orderDetails} />
      </Modal>
      <Modal
        title="Từ chối đơn hàng"
        open={isModalVisibleDelete}
        onOk={() => handleOkDelete()}
        onCancel={handleCancelDelete}
      >
        <div>Bạn muốn từ chối giao đơn hàng này?</div>
        <Table columns={columnsOrderDetail} dataSource={orderDetails} />
      </Modal>
    </div>
  );
};

export default OrderManagement;
