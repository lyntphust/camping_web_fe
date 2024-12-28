import { Blog, BlogStatus } from "@/types";
import Link from "next/link";
import { Tag } from "antd";
import dayjs from "dayjs";

interface Props {
  blogs: Blog[];
  hiddenBookMark?: boolean;
}

export default function BlogList({ blogs, hiddenBookMark }: Props) {
  return (
    <div className=" grid gap-8 lg:grid-cols-2">
      {blogs.map((blog) => (
        <article
          key={blog.id}
          className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex justify-between items-center mb-2 text-gray-500">
            <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
              <svg
                className="mr-1 w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
              {blog.location}
            </span>
            {hiddenBookMark ? (
              <span>
                {blog.status === BlogStatus.PENDING && (
                  <Tag color="blue">Chờ duyệt</Tag>
                )}
                {blog.status === BlogStatus.APPROVED && (
                  <Tag color="green">Đã duyệt</Tag>
                )}
                {blog.status === BlogStatus.REJECTED && (
                  <Tag color="red">Từ chối</Tag>
                )}
              </span>
            ) : (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75v14.25l-5.25-3.75-5.25 3.75V6.75a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25z"
                  />
                </svg>
              </span>
            )}
          </div>
          <span className="text-sm">
            {dayjs(blog.createdAt).format("DD/MM/YYYY")}
          </span>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a href="#">{blog.title}</a>
          </h2>
          <p
            style={{
              maxHeight: "50px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            className="mb-5 font-light text-gray-500 dark:text-gray-400"
          >
            {/* {blog.description} */}
            {blog.text}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="font-medium dark:text-white">
                {blog.user.name}
              </span>
            </div>
            <Link
              href={`/detailblog/${blog.id}`}
              className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
            >
              Đọc thêm
              <svg
                className="ml-2 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
