"use client";

import { blogPosts } from "@/data";
import { Blog } from "@/types";
import { Carousel } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../styles/home.scss";

interface ListBlogProps {
  blogData: Blog[];
}

export default function ListBlog({ blogData }: ListBlogProps) {
  const router = useRouter();

  return (
    <section>
      <h2 className="text-center pt-20">BLOG DÃ NGOẠI</h2>
      <Carousel arrows infinite={false} className="custom-carousel">
        {blogData
          ?.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / 4);

            if (!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = []; // start a new chunk
            }

            resultArray[chunkIndex].push(item);

            return resultArray;
          }, [] as Blog[][])
          .map((blogs, i) => (
            <div className="mx-auto" key={i}>
              <div className="flex justify-center	gap-12 my-5">
                {blogs.map((blog, j) => (
                  <div
                    className="flex w-[calc(24%_-_46px)] h-600 flex-wrap hover:scale-110 transition-all hover:cursor-pointer"
                    key={j}
                    onClick={() => router.push(`/blogs/${blog.id}`)}
                  >
                    <div className="relative w-full h-500 p-1 pb-16 bg-white rounded-lg border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
                      <Image
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center "
                        src="/about_img.png"
                        width={150}
                        height={50}
                      />
                      <p className="mb-2 mt-1 text-m font-bold tracking-tight text-gray-900 dark:text-white">
                        {blog.title}
                      </p>
                      <p
                        style={{
                          maxHeight: "50px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        className="mt-2 font-light text-gray-500 dark:text-gray-400"
                      >
                        {blog.text}
                      </p>
                      <div className="absolute top-4 left-4 bg-white py-2 px-2 rounded-md">
                        <div className="text-center">28</div>
                        <div className="text-center">TH12</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </Carousel>
    </section>
  );
}
