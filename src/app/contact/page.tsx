"use client";

import { InboxIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Input } from "antd";

const Contact = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-screen-xl lg:py-6 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Contact us about the problem you encounter
          </p>
        </div>
        <section className="pb-10 my-auto dark:bg-gray-900">
          <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
            <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-8 rounded-xl h-fit self-center dark:bg-gray-800/40">
              <div className="">
                <form>
                  <div className="flex lg:flex-row mb-4 ">
                    <div className="w-full mr-6">
                      <label className=" dark:text-gray-300">User Name</label>
                      <Input
                        type="text"
                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        placeholder="User name"
                      />
                    </div>
                    <div className="w-full">
                      <label className=" dark:text-gray-300">Phone</label>
                      <Input
                        type="text"
                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        placeholder="Phone"
                      />
                    </div>
                  </div>
                  <div className="w-full  mb-4 ">
                    <label className=" dark:text-gray-300">Email</label>
                    <Input
                      type="email"
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Email"
                    />
                  </div>
                  <div className="w-full  mb-4 ">
                    <label className=" dark:text-gray-300">Message</label>
                    <Input.TextArea
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Enter your message"
                    />
                  </div>

                  <div className="flex mt-2">
                    <a className="w-full px-4 py-3 text-center cursor-pointer text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                      Send Message
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <div className=" grid gap-8 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
            <div
              style={{
                display: "flex",
                gap: 10,
                flexDirection: "column",
              }}
            >
              <MapPinIcon className="h-10 w-10" />
              <span>HaNoi University of science and technology, Vietnam</span>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
            <div
              style={{
                display: "flex",
                gap: 10,
                flexDirection: "column",
              }}
            >
              <InboxIcon className="h-10 w-10" />
              <a href="mailto: wildnest2024@gmail.com">
                wildnest2024@gmail.com
              </a>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
            <div
              style={{
                display: "flex",
                gap: 10,
                flexDirection: "column",
              }}
            >
              <PhoneIcon className="h-10 w-10" />
              <span>(123) 456-7890</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
