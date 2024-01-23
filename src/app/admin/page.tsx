"use client";

import {
  HeartIcon,
  ShoppingCartIcon,
  SquaresPlusIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Layout, Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { useState } from "react";
import "../../styles/admin.scss";
import OrderManagement from "./OderManagement";
import ProductAdminPage from "./ProductManagement";
import UserMangement from "./UserMangement";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [selectedKey, setSelectedKey] = useState("products");
  const handleMenuClick = (e: MenuInfo) => {
    setSelectedKey(e.key);
  };
  return (
    <div className="bg-gray-100 font-family-karla flex admin-page">
      <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
          <a className=" text-3xl font-semibold uppercase hover:text-gray-300">
            Admin
          </a>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["products"]}
          onClick={handleMenuClick}
          className="text-base font-semibold pt-3"
        >
          <Menu.Item
            key="about"
            className="h-60 flex items-center active-nav-link py-4 pl-6 nav-item"
          >
            About
          </Menu.Item>
          <Menu.Item
            key="products"
            className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
            icon={<SquaresPlusIcon className="h-8 w-8 mr-2" />}
          >
            Products
          </Menu.Item>
          <Menu.Item
            key="order"
            className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
            icon={<ShoppingCartIcon className="h-8 w-8 mr-2" />}
          >
            Order
          </Menu.Item>
          <Menu.Item
            key="user"
            className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
            icon={<UserIcon className="h-8 w-8 mr-2" />}
          >
            User
          </Menu.Item>
          <Menu.Item
            key="blog"
            className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
            icon={<HeartIcon className="h-8 w-8 mr-2" />}
          >
            Blog
          </Menu.Item>
        </Menu>
      </aside>

      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <main className="static w-full flex-grow l-0">
          <Content
            className="site-layout-content"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {selectedKey === "products" && <ProductAdminPage />}
            {selectedKey === "order" && <OrderManagement />}
            {selectedKey === "user" && <UserMangement />}
          </Content>
        </main>
      </div>
    </div>
  );
};

export default Admin;
