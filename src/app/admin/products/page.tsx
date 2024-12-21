"use client";

import { navigationCategories } from "@/data";
import {
  useCreateProduct,
  useListProduct,
  useUpdateProduct,
} from "@/hooks/catalog/useProduct";
import productApi from "@/services/product";
import { formatPrice } from "@/util";
import {
  CloseCircleFilled,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
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

interface Variant {
  color: string;
  size: string;
  stock: number;
  price: number;
  sold: number;
}

interface TransformedVariants {
  [color: string]: Array<{
    size: string;
    stock: number;
    price: number;
    sold: number;
  }>;
}
interface TransformedVariantHaveColorSize {
  size: string;
  quantity: string;
}

interface TransformedResponseHaveColorSize {
  color: string;
  list: TransformedVariantHaveColorSize[];
}

const ProductAdminPage = () => {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCategoryId, setFilterCategoryId] = useState<string | number>("");
  const [filterCategoryForAction, setFilterCategoryForAction] =
    useState<number>(1);
  const [categoryRecord, setCategoryRecord] = useState<number>(1);

  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const {
    data: productList,
    isLoading: getListIsLoading,
    refetch,
  } = useListProduct();
  const { isLoading: createProductIsLoading, doMutate: createProduct } =
    useCreateProduct();

  const { isLoading: updateProductIsLoading, patch: updateProduct } =
    useUpdateProduct(selectedProductId ?? 0);

  const productListData = useMemo(
    () =>
      productList?.data?.map((product) => ({
        ...product,
        key: product.id,
      })) || [],
    [productList]
  );

  const [fileList, setFileList] = useState<any>([]);

  const filteredProducts = productListData?.filter(
    (product: any) =>
      filterCategoryId == "" || product.category == filterCategoryId
  );

  const findCategory = navigationCategories.find(
    (cat) => cat.id == categoryRecord
  );

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
      variants: "",
      list: [],
      quantity: "",
    });
    setFileList([]);
  };

  const resetEditForm = () => {
    editForm.setFieldsValue({
      id: "",
      category: "",
      name: "",
      price: "",
      size: "",
      discount: 0,
      color: "",
      img: "",
      description: "",
      variants: "",
      list: [],
      quantity: "",
    });
    setFileList([]);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (fileList.length > 0) {
      values.file = fileList[0].originFileObj;
    }
    if (values.variants) {
      const flatVariants = values.variants.flatMap(
        (variant: { list: any[]; color: any }) =>
          variant.list
            ? variant.list.map((item) => ({
                color: variant.color,
                size: item.size,
                quantity: item.quantity,
              }))
            : []
      );
      values.variants = JSON.stringify(flatVariants);
    }
    if (values.list) {
      const flatVariants = values.list.map(
        (variant: { color: any; quantity: any }) => ({
          color: variant.color,
          quantity: variant.quantity,
          size: "null",
        })
      );
      values.variants = JSON.stringify(flatVariants);
      delete values.list;
    }

    if (values.quantity) {
      values.variants = JSON.stringify([
        {
          color: "null",
          size: "null",
          quantity: values.quantity,
        },
      ]);
      delete values.quantity;
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
    editForm.setFieldsValue(record);
    setCategoryRecord(record.category);

    const transformVariants = (variants: Variant[]): TransformedVariants => {
      const result: TransformedVariants = {};

      variants.forEach((variant) => {
        if (!result[variant.color]) {
          result[variant.color] = [];
        }
        result[variant.color].push({
          size: variant.size,
          stock: variant.stock,
          price: variant.price,
          sold: variant.sold,
        });
      });

      return result;
    };

    const transformedVariants = transformVariants(record.variants);

    const list = Object.keys(transformedVariants).map((color) => ({
      color,
      quantity: transformedVariants[color].reduce(
        (acc, item) => acc + item.stock,
        0
      ),
    }));

    const transformResponseHaveColorSize = (
      variants: Variant[]
    ): TransformedResponseHaveColorSize[] => {
      const result: { [color: string]: TransformedVariantHaveColorSize[] } = {};

      variants.forEach((variant) => {
        if (!result[variant.color]) {
          result[variant.color] = [];
        }
        result[variant.color].push({
          size: variant.size,
          quantity: variant.stock.toString(),
        });
      });

      return Object.keys(result).map((color) => ({
        color,
        list: result[color],
      }));
    };

    const transformedVariantsHaveColorSize = transformResponseHaveColorSize(
      record.variants
    );

    if (record.category == 1 || record.category == 5) {
      editForm.setFieldsValue({ list });
    }
    if (record.category == 2) {
      editForm.setFieldsValue({ quantity: record.variants[0].stock });
    }
    if (record.category == 3 || record.category == 4) {
      editForm.setFieldsValue({ variants: transformedVariantsHaveColorSize });
    }
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
    const values = await editForm.validateFields();

    if (fileList.length > 0) {
      values.file = fileList[0].originFileObj;
    }

    if (values.variants) {
      const flatVariants = values.variants.flatMap(
        (variant: { list: any[]; color: any }) =>
          variant.list
            ? variant.list.map((item) => ({
                color: variant.color,
                size: item.size,
                quantity: Number.parseInt(item.quantity),
              }))
            : []
      );
      values.variants = flatVariants;
    }
    if (values.list) {
      const flatVariants = values.list.map(
        (variant: { color: any; quantity: any }) => ({
          color: variant.color,
          quantity: variant.quantity,
          size: "null",
        })
      );
      values.variants = JSON.stringify(flatVariants);
      delete values.list;
    }

    if (values.quantity) {
      values.variants = JSON.stringify([
        {
          color: "null",
          size: "null",
          quantity: values.quantity,
        },
      ]);
      delete values.quantity;
    }

    console.log("values", values);
    console.log("selectedProductId", selectedProductId);

    try {
      const data = await updateProduct({
        ...values,
        discount: String(values.discount),
      });

      // if (data) {
      //   setVisible(false);
      //   message.success("Đã sửa sản phẩm thành công!");
      // }

      // refetch();
      // resetEditForm();
    } catch (error) {
      if ((error as any).response.data.message === "image is not allowed") {
        message.error("Vui lòng chọn hình ảnh sản phẩm!");
      }
      message.error("Không thể thêm sản phẩm! Vui lòng thử lại sau");
    }
  };

  const handleCancelEdit = () => {
    setVisibleEdit(false);
  };

  const handleCategoryChange = (value: any) => {
    setFilterCategory(value);
    const selectedCategory = navigationCategories.find(
      (category) => category.name === value
    );
    setFilterCategoryId(selectedCategory ? selectedCategory.id : "");

    console.log("selectedCategory", selectedCategory);
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
        dataSource={filteredProducts}
        pagination={{ pageSize: 8 }}
      />
      <Modal
        title="Thêm mới sản phẩm"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" className="add-form">
          <Form.Item label="Category" name="category">
            <Select
              style={{ width: 250 }}
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
          <Form.Item label="Tên sản phẩm" name="name">
            <Input />
          </Form.Item>
          <div className="flex flex-row justify-between">
            <Form.Item label="Giá" name="price" style={{ width: "48%" }}>
              <InputNumber
                className="w-full"
                formatter={(value) => formatPrice(Number(value) ?? 0)}
                controls={false}
              />
            </Form.Item>
            <Form.Item
              label="Giảm giá"
              name="discount"
              style={{ width: "48%" }}
            >
              <Input />
            </Form.Item>
          </div>
          {(filterCategoryForAction === 1 || filterCategoryForAction == 5) && (
            <Form.Item label="Danh sách màu sắc" name="variants">
              <Form.List name="list">
                {(subFields, subOpt) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: 16,
                    }}
                  >
                    {subFields.map((subField) => (
                      <Space key={subField.key}>
                        <Form.Item noStyle name={[subField.name, "color"]}>
                          <Input placeholder="Màu sắc" />
                        </Form.Item>
                        <Form.Item noStyle name={[subField.name, "quantity"]}>
                          <Input placeholder="Số lượng" />
                        </Form.Item>
                        <CloseOutlined
                          onClick={() => {
                            subOpt.remove(subField.name);
                          }}
                        />
                      </Space>
                    ))}
                    <Button type="dashed" onClick={() => subOpt.add()} block>
                      + Thêm màu sắc sản phẩm
                    </Button>
                  </div>
                )}
              </Form.List>
            </Form.Item>
          )}

          {filterCategoryForAction === 2 && (
            <Form.Item label="Số lượng" name="quantity">
              <Input />
            </Form.Item>
          )}

          {(filterCategoryForAction === 3 || filterCategoryForAction === 4) && (
            <Form.Item label="Danh sách màu sắc" name="variants">
              <Form.List name="variants">
                {(fields, { add, remove }) => (
                  <div
                    style={{
                      display: "flex",
                      rowGap: 16,
                      flexDirection: "column",
                    }}
                  >
                    {fields.map((field) => (
                      <Card
                        size="small"
                        key={field.key}
                        extra={
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        }
                      >
                        <Form.Item label="Màu sắc" name={[field.name, "color"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label="Danh sách size"
                          name={[field.name, "list"]}
                        >
                          <Form.List name={[field.name, "list"]}>
                            {(subFields, subOpt) => (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  rowGap: 16,
                                }}
                              >
                                {subFields.map((subField, index) => (
                                  <Space key={subField.key}>
                                    <Form.Item
                                      noStyle
                                      name={[subField.name, "size"]}
                                    >
                                      <Input placeholder="Size" />
                                    </Form.Item>
                                    <Form.Item
                                      noStyle
                                      name={[subField.name, "quantity"]}
                                    >
                                      <Input placeholder="Số lượng" />
                                    </Form.Item>
                                    <CloseOutlined
                                      onClick={() => {
                                        subOpt.remove(subField.name);
                                      }}
                                    />
                                  </Space>
                                ))}
                                {subFields.length < 4 && (
                                  <Button
                                    type="dashed"
                                    onClick={() => subOpt.add()}
                                    block
                                  >
                                    + Thêm size sản phẩm
                                  </Button>
                                )}
                              </div>
                            )}
                          </Form.List>
                        </Form.Item>
                      </Card>
                    ))}

                    <Button type="dashed" onClick={() => add()} block>
                      + Thêm màu sắc sản phẩm
                    </Button>
                  </div>
                )}
              </Form.List>
            </Form.Item>
          )}

          <Form.Item label="Hình ảnh" name="file">
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
        title="Chỉnh sửa sản phẩm"
        open={visibleEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        <Form form={editForm} layout="vertical" className="add-form">
          <Form.Item label="Category">
            <Select
              value={findCategory?.name}
              style={{ width: 250 }}
              disabled
            />
          </Form.Item>
          <Form.Item label="Tên sản phẩm" name="name">
            <Input />
          </Form.Item>
          <div className="flex flex-row justify-between">
            <Form.Item label="Giá" name="price" style={{ width: "48%" }}>
              <InputNumber
                className="w-full"
                formatter={(value) => formatPrice(Number(value) ?? 0)}
                controls={false}
              />
            </Form.Item>
            <Form.Item
              label="Giảm giá"
              name="discount"
              style={{ width: "48%" }}
            >
              <Input />
            </Form.Item>
          </div>
          {(categoryRecord == 1 || categoryRecord == 5) && (
            <Form.Item label="Danh sách màu sắc" name="variants">
              <Form.List name="list">
                {(subFields, subOpt) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: 16,
                    }}
                  >
                    {subFields.map((subField) => (
                      <Space key={subField.key}>
                        <Form.Item noStyle name={[subField.name, "color"]}>
                          <Input placeholder="Màu sắc" />
                        </Form.Item>
                        <Form.Item noStyle name={[subField.name, "quantity"]}>
                          <Input placeholder="Số lượng" />
                        </Form.Item>
                        <CloseOutlined
                          onClick={() => {
                            subOpt.remove(subField.name);
                          }}
                        />
                      </Space>
                    ))}
                    <Button type="dashed" onClick={() => subOpt.add()} block>
                      + Thêm màu sắc sản phẩm
                    </Button>
                  </div>
                )}
              </Form.List>
            </Form.Item>
          )}

          {categoryRecord == 2 && (
            <Form.Item label="Số lượng" name="quantity">
              <Input />
            </Form.Item>
          )}

          {(categoryRecord == 3 || categoryRecord == 4) && (
            <Form.Item label="Danh sách màu sắc" name="variants">
              <Form.List name="variants">
                {(fields, { add, remove }) => (
                  <div
                    style={{
                      display: "flex",
                      rowGap: 16,
                      flexDirection: "column",
                    }}
                  >
                    {fields.map((field) => (
                      <Card
                        size="small"
                        key={field.key}
                        extra={
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        }
                      >
                        <Form.Item label="Màu sắc" name={[field.name, "color"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label="Danh sách size"
                          name={[field.name, "list"]}
                        >
                          <Form.List name={[field.name, "list"]}>
                            {(subFields, subOpt) => (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  rowGap: 16,
                                }}
                              >
                                {subFields.map((subField, index) => (
                                  <Space key={subField.key}>
                                    <Form.Item
                                      noStyle
                                      name={[subField.name, "size"]}
                                    >
                                      <Input placeholder="Size" />
                                    </Form.Item>
                                    <Form.Item
                                      noStyle
                                      name={[subField.name, "quantity"]}
                                    >
                                      <Input placeholder="Số lượng" />
                                    </Form.Item>
                                    <CloseOutlined
                                      onClick={() => {
                                        subOpt.remove(subField.name);
                                      }}
                                    />
                                  </Space>
                                ))}
                                {subFields.length < 4 && (
                                  <Button
                                    type="dashed"
                                    onClick={() => subOpt.add()}
                                    block
                                  >
                                    + Thêm size sản phẩm
                                  </Button>
                                )}
                              </div>
                            )}
                          </Form.List>
                        </Form.Item>
                      </Card>
                    ))}

                    <Button type="dashed" onClick={() => add()} block>
                      + Thêm màu sắc sản phẩm
                    </Button>
                  </div>
                )}
              </Form.List>
            </Form.Item>
          )}
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
        title="Xoá sản phẩm"
        open={isModalVisible}
        onOk={() => handleDelete(selectedRecord?.id as any)}
        onCancel={() => handleCancelDelete()}
      >
        <p>
          Bạn có chắc chắn muốn xoá sản phẩm
          <div>{selectedRecord?.name || ""} ?</div>
        </p>
      </Modal>
    </div>
  );
};

export default ProductAdminPage;
