"use client";

import {
  HeartIcon,
  ShoppingCartIcon,
  SquaresPlusIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import "@styles/admin.scss";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Content } = Layout;

const menus = [
  {
    key: "products",
    label: <Link href={`/admin/products`}>Products</Link>,
    icon: <SquaresPlusIcon className="h-8 w-8 mr-2" />,
  },
  {
    key: "orders",
    label: <Link href={`/admin/orders`}>Orders</Link>,
    icon: <ShoppingCartIcon className="h-8 w-8 mr-2" />,
  },
  {
    key: "users",
    label: <Link href={`/admin/users`}>Users</Link>,
    icon: <UserIcon className="h-8 w-8 mr-2" />,
  },
  {
    key: "blogs",
    label: <Link href={`/admin/blogs`}>Blogs</Link>,
    icon: <HeartIcon className="h-8 w-8 mr-2" />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const selectedKey = pathname.split("/").pop() || menus[0].key;

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
          defaultSelectedKeys={[selectedKey]}
          className="text-base font-semibold pt-3"
          items={menus}
        ></Menu>
      </aside>

      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <main className="static w-full flex-grow l-0">
          <Content className="site-layout-content m-6 min-h-72">
            {children}
          </Content>
        </main>
      </div>
    </div>
  );
}
