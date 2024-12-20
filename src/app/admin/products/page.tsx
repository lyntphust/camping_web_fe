"use client";

import { navigationCategories } from "@/data";
import { useCreateProduct, useListProduct } from "@/hooks/catalog/useProduct";
import productApi from "@/services/product";
import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Skeleton,
  Space,
  Table,
  Tag,
  Upload,
} from "antd";
import { useMemo, useState } from "react";

const ProductAdminPage = () => {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCategoryForAction, setFilterCategoryForAction] = useState("");

  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const {
    data: productList,
    isLoading: getListIsLoading,
    refetch,
  } = useListProduct();
  const { isLoading: createProductIsLoading, mutate: createProduct } =
    useCreateProduct();

  const productListData = useMemo(
    () =>
      productList?.data?.map((product) => ({
        ...product,
        key: product.id,
      })) || [],
    [productList]
  );

  const [fileList, setFileList] = useState<any>([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Quantity",
      dataIndex: "stock",
      key: "quantity",
      render: (record: any) => (
        <span>{record ? record : <Tag color="volcano">SOLD</Tag>}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => showModalDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const showModalDelete = (record: any) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: any) => {
    try {
      await productApi.deleteProduct(id);
      setIsModalVisible(false);
      message.success("Đã xóa sản phẩm thành công!");
    } catch (error) {
      message.error("Sản phẩm không thể bị xóa! Vui lòng thử lại sau");
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  const openAddForm = () => {
    resetForm();
    setVisible(true);
  };

  const resetForm = () => {
    form.setFieldsValue({
      id: "",
      category: "",
      name: "",
      price: "",
      size: "",
      discount: 0,
      color: "",
      img: "",
      description: "",
    });
    setFileList([]);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (fileList.length > 0) {
      values.file = fileList[0].originFileObj;
    }
    try {
      const data = await createProduct(values);

      if (data) {
        setVisible(false);
        message.success("Đã thêm sản phẩm thành công!");
      }

      refetch();
      resetForm();
    } catch (error) {
      if ((error as any).response.data.message === "image is not allowed") {
        message.error("Vui lòng chọn hình ảnh sản phẩm!");
      }
      message.error("Không thể thêm sản phẩm! Vui lòng thử lại sau");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const fillDataToForm = async (record: any) => {
    form.setFieldsValue(record);

    setFileList([
      {
        url: record.image,
      },
    ]);

    setVisibleEdit(true);
  };

  const handleEdit = async (record: any) => {
    fillDataToForm(record);
    setSelectedProductId(record.id);
  };

  const handleOkEdit = async () => {
    const values = await form.validateFields();
    if (fileList.length > 0) {
      values.img = fileList[0].originFileObj;
    }
  };

  const handleCancelEdit = () => {
    setVisibleEdit(false);
  };

  const handleCategoryChange = (value: any) => {
    setFilterCategory(value);
  };

  const handleCategoryChangeForAction = (value: any) => {
    setFilterCategoryForAction(value);
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handleRemoveImage = async () => {
    setFileList([]);
  };

  const handleRender = (__: any, img: any) => {
    let imgUploadUrl;
    if (!img.url) {
      imgUploadUrl = URL.createObjectURL(img.originFileObj);
    }

    return (
      <div className="img-item">
        <CloseCircleFilled
          className="remove-icon fz-16"
          onClick={() => handleRemoveImage()}
        />
        <div className="image-container">
          <Image
            rootClassName="modal-preview-img"
            className="img"
            src={img?.thumb?.url || img?.url || imgUploadUrl}
            preview={{
              src: img?.url,
            }}
            alt={img?.name}
          />
        </div>
      </div>
    );
  };
  if (getListIsLoading || createProductIsLoading) return <Skeleton />;
  return (
    <div className="container">
      <a
        className="w-full px-4 py-3 mr-4 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
        onClick={() => openAddForm()}
      >
        Add product
      </a>
      <Select
        style={{ width: 200, marginBottom: 16, height: 40 }}
        placeholder="Filter by Category"
        onChange={handleCategoryChange}
        value={filterCategory}
      >
        <Select.Option value="">All</Select.Option>
        {navigationCategories.map((category) => (
          <Select.Option value={category.name} key={category.id}>
            {category.name}
          </Select.Option>
        ))}
      </Select>
      <Table
        columns={columns}
        dataSource={productListData}
        pagination={{ pageSize: 8 }}
      />
      <Modal
        title="Add Product"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" className="add-form">
          <Form.Item label="Category" name="category">
            <Select
              style={{ width: 200, marginBottom: 16 }}
              placeholder="Select Category"
              onChange={handleCategoryChangeForAction}
              value={filterCategoryForAction}
            >
              {navigationCategories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input />
          </Form.Item>
          <Form.Item label="Discount" name="discount">
            <Input />
          </Form.Item>
          <Form.Item label="Quantity" name="size">
            <Input />
          </Form.Item>
          <Form.Item label="Color" name="color">
            <Input />
          </Form.Item>
          <Form.Item label="Image" name="file">
            <Upload
              beforeUpload={() => false}
              className="upload"
              listType="picture-card"
              itemRender={handleRender}
              accept="image/png, image/jpeg"
              fileList={fileList}
              onChange={(fileList) => handleFileChange(fileList)}
            >
              <div className="btn-upload">
                <PlusOutlined />
                <span className="btn-text">Upload</span>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Product"
        open={visibleEdit}
        onOk={() => handleOkEdit()}
        onCancel={handleCancelEdit}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="ID Category" name="categoryId">
            <Select
              style={{ width: 200, marginBottom: 16 }}
              placeholder="Select Category"
              onChange={handleCategoryChangeForAction}
              value={filterCategoryForAction}
            >
              {navigationCategories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Tên" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Giá cả" name="price">
            <Input />
          </Form.Item>
          <Form.Item label="Giảm giá(%)" name="discount">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Số lượng" name="weight">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Đã bán" name="weight">
            <InputNumber readOnly disabled={true} />
          </Form.Item>
          <Form.Item label="Hình ảnh" name="img">
            <Upload
              beforeUpload={() => false}
              className="upload"
              listType="picture-card"
              itemRender={handleRender}
              accept="image/png, image/jpeg"
              fileList={fileList}
              onChange={(fileList) => handleFileChange(fileList)}
            >
              <div className="btn-upload">
                <PlusOutlined />
                <span className="btn-text">Upload</span>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Confirm Delete"
        open={isModalVisible}
        onOk={() => handleDelete(selectedRecord?.id as any)}
        onCancel={() => handleCancelDelete()}
      >
        <p>
          Are you sure you want to delete this product
          <div>{selectedRecord?.name || ""} ?</div>
        </p>
      </Modal>
    </div>
  );
};

export default ProductAdminPage;
