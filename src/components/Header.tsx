"use client";

import { useAuth } from "@/context/AuthContext";
import {
  LogoutOutlined,
  SettingFilled,
  SmileOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import type { MenuProps } from "antd";
import { Dropdown, Input, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { accessToken, updateAccessToken, userInfo, updateUserInfo } =
    useAuth();

  const handleLogout = () => {
    updateAccessToken(null);
    updateUserInfo(null);
    router.push("/signin");
    window.location.reload();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Hi! {userInfo?.name}
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Change Infomation
        </a>
      ),
      icon: <UserOutlined />,
      onClick: () => {
        router.push("/profile");
      },
    },
    {
      key: "3",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Change Password
        </a>
      ),
      icon: <SettingFilled />,
      onClick: () => {
        router.push("/changepassword");
      },
    },
    ...(userInfo?.role?.name === "admin"
      ? [
          {
            key: "5",
            label: <a>Admin</a>,
            icon: <UsergroupAddOutlined />,
            onClick: () => {
              router.push("/admin");
            },
          },
        ]
      : []),
    {
      key: "4",
      danger: true,
      label: <a>Logout</a>,
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];
  return (
    <div className="flex items-center justify-center">
      <Input.Search
        placeholder="Tìm kiếm sản phẩm"
        style={{ width: 500 }}
        size="large"
      />

      {/* Cart */}
      {accessToken ? (
        <>
          <div className="ml-4 flow-root lg:ml-6">
            <Link href="/cart" className="group -m-2 flex items-center p-2">
              <ShoppingBagIcon
                className="h-10 w-10 pb-2 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="ml-4 flow-root lg:ml-6">
            <Link href="/listlike" className="group -m-2 flex items-center p-2">
              <HeartIcon className="h-10 w-10 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            </Link>
          </div>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <UserIcon
                  className="h-10 w-10 p-2 text-gray-400 hover:text-gray-500"
                  aria-hidden="true"
                />
              </Space>
            </a>
          </Dropdown>
        </>
      ) : (
        <>
          <div className="ml-4 flow-root lg:ml-6">
            <Link
              href="/signup"
              className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
            >
              Creat Account
            </Link>
          </div>
          <div className="mr-4 flow-root lg:ml-6">
            <Link
              href="/signin"
              className="w-full text-center text-blue-600 lg:w-1/2 rounded-xl"
            >
              Sign In
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
