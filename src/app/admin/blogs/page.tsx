"use client";

import LoadingFallback from "@/components/LoadingFallback";
import Link from "next/link";

export default function BlogManagement() {
  return (
    <div className="admin-page-content">
      <LoadingFallback isLoading={false} width={1000} height={800} />
      <div className="container">
        <Link href="/admin/blog/create">Create new blog</Link>
      </div>
    </div>
  );
}
