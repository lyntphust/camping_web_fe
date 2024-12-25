"use client";

import { useAuth } from "@/context/AuthContext";
import { useUpdateUserInfo, useUserInfo } from "@/hooks/user/useUserInfo";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";

const Profile = () => {
  const [form] = Form.useForm();
  const { userInfo } = useAuth();

  const { data: userInfoData } = useUserInfo(userInfo?.id);
  const { putData: updateUserInfo } = useUpdateUserInfo();

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (userInfoData && userInfoData.data) {
      form.setFieldsValue({
        surname: userInfoData.data.surname,
        name: userInfoData.data.name,
        email: userInfoData.data.email,
        phoneNumber: userInfoData.data.phoneNumber,
        address: userInfoData.data.address,
      });
    }
  }, [userInfoData, form]);

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    updateUserInfo(values);
    setIsEdit(false);
  };

  const handleChangeMode = () => {
    setIsEdit(true);
  };

  return (
    <section className="py-10 my-auto dark:bg-gray-900">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div className="">
            <form>
              <div className="w-full items-center">
                <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat">
                  <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                    <input
                      type="file"
                      name="profile"
                      id="upload_profile"
                      hidden
                      required
                    />

                    <label>
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 text-blue-700"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <input
                    type="file"
                    name="profile"
                    id="upload_cover"
                    hidden
                    required
                  />
                </div>
              </div>
              <h2 className="text-center mt-1 font-semibold dark:text-gray-300">
                Cập nhật thông tin cá nhân
              </h2>
              <div>
                <Form form={form} layout="vertical" className="add-form">
                  <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    <div className="w-full">
                      <Form.Item label="Họ và tên" name="surname">
                        <Input
                          type="text"
                          className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                          placeholder="Họ và tên"
                          disabled={!isEdit}
                        />
                      </Form.Item>
                    </div>
                    <div className="w-full">
                      <Form.Item label="Username" name="name">
                        <Input
                          type="text"
                          className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                          placeholder="Username"
                          disabled={!isEdit}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    <div className="w-full">
                      <Form.Item label="Email" name="email">
                        <Input
                          type="text"
                          className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                          placeholder="Email"
                          disabled
                        />
                      </Form.Item>
                    </div>
                    <div className="w-full">
                      <Form.Item label="Số điện thoại" name="phoneNumber">
                        <Input
                          type="text"
                          className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                          placeholder="Số điện thoại"
                          disabled={!isEdit}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="w-full  mb-4 ">
                    <Form.Item label="Địa chỉ" name="address">
                      <Input
                        type="text"
                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        placeholder="Địa chỉ"
                        disabled={!isEdit}
                      />
                    </Form.Item>
                  </div>
                </Form>

                <div
                  className="flex mt-2"
                  onClick={isEdit ? handleSubmit : handleChangeMode}
                >
                  <a className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                    {isEdit ? "Lưu" : "Chỉnh sửa thông tin"}
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
