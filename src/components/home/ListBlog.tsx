"use client";

import { blogPosts } from "@/data";
import { Blog } from "@/types";
import { Carousel } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../styles/home.scss";

export default function ListBlog() {
  const blogData = blogPosts;
  const router = useRouter();
  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    // <section>
    //   <h2 className="text-center pt-20">BLOG DÃ NGOẠI</h2>
    //   <div className="mx-auto">
    //     <div className="flex flex-wrap gap-12 my-5">
    //       {blogData?.map((blog, i) => (
    //         <div
    //           className="flex w-[calc(30%_-_6px)] h-100 flex-wrap hover:scale-110 transition-all hover:cursor-pointer"
    //           key={i}
    //           // onClick={() => {
    //           //   router.push(`/category/${product.url_path}`);
    //           // }}
    //         >
    //           <div className="w-full p-1 pb-16">
    //             <Image
    //               alt="gallery"
    //               className="block h-full w-full rounded-lg object-cover object-center "
    //               src={blog.author.avatar}
    //               width={300}
    //               height={100}
    //             />
    //             <p className="text-center mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-white">
    //               {blog.title}
    //             </p>
    //             <p
    //               style={{
    //                 maxHeight: "50px",
    //                 overflow: "hidden",
    //                 textOverflow: "ellipsis",
    //                 whiteSpace: "nowrap",
    //               }}
    //               className="mb-5 font-light text-gray-500 dark:text-gray-400"
    //             >
    //               {blog.description}
    //             </p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
    <section>
      <h2 className="text-center pt-20">BLOG DÃ NGOẠI</h2>
      {/* <Carousel arrows infinite={false} className="custom-carousel">
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
                  >
                    <div className="relative w-full h-500 p-1 pb-16 bg-white rounded-lg border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
                      <Image
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center "
                        src={blog.author.avatar}
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
                        {blog.description}
                      </p>
                      <div className="absolute top-4 left-4 bg-white py-2 px-2 rounded-md">
                        <div className="text-center">23</div>
                        <div className="text-center">TH5</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </Carousel> */}
    </section>
  );
}
