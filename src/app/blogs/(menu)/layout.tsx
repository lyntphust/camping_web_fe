"use client";

import { useAuth } from "@/context/AuthContext";
import BlogMenuContextProvider, {
  useBlogMenuContext,
} from "@/context/blog/BlogMenuContext";
import { BlogMenuKey } from "@/types";
import { Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children?: React.ReactNode;
}

function BlogComponent({ children }: Props) {
  const { accessToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const tabs = accessToken
    ? [
        { label: "Tất cả", key: BlogMenuKey.ALL },
        { label: "Đã lưu", key: BlogMenuKey.SAVED },
        { label: "Của tôi", key: BlogMenuKey.MY },
      ]
    : [{ label: "Tất cả", key: BlogMenuKey.ALL }];

  const { activeKey, setActiveKey } = useBlogMenuContext();

  useEffect(() => {
    const key = pathname.replace("/blogs/", "").split("/")[0];

    if (Object.values(BlogMenuKey).includes(key as BlogMenuKey)) {
      setActiveKey(key as BlogMenuKey);
    } else {
      setActiveKey("");
    }
  }, [pathname, setActiveKey]);

  const onChange = (key: string) => {
    router.push(`/blogs/${key}`);
  };

  return (
    <div className="header">
      <Tabs
        onChange={onChange}
        type="card"
        items={tabs}
        activeKey={activeKey}
      />
      {children}
    </div>
  );
}

export default function BlogLayout({ children }: Props) {
  return (
    <BlogMenuContextProvider>
      <div className="lg:py-6 lg:px-6">
        <BlogComponent>{children}</BlogComponent>
      </div>
    </BlogMenuContextProvider>
  );
}
