"use client";

import Image from "next/image";

export default function DetailBlog() {
  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="w-full flex justify-between items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <div className="inline-flex items-center">
                    <Image
                      className="mr-4 w-16 h-16 rounded-full"
                      src="/user_default.png"
                      width={192}
                      height={192}
                      alt="Jese Leos"
                    />
                    <div>
                      <a
                        href="#"
                        rel="author"
                        className="text-xl font-bold text-gray-900 dark:text-white"
                      >
                        User name
                      </a>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        User@gmail.com
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        <time dateTime="2022-02-08" title="February 8th, 2022">
                          Feb. 8, 2024
                        </time>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 6.75v14.25l-5.25-3.75-5.25 3.75V6.75a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                Tiêu đề blog
              </h1>
            </header>
            <h2>Địa điểm</h2>
            <p>
              Nội dung blog. First of all you need to understand how Flowbite
              works. This library is not another framework. Rather, it is a set
              of components based on Tailwind CSS that you can just copy-paste
              from the documentation.
            </p>
            <div className="mt-6 flex justify-center">
              <Image
                src="/about_img.png"
                width={600}
                height={400}
                alt="blog-image"
              />
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
