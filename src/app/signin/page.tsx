"use client";

import MyModal from "@/components/MyModal";
import { useAuth } from "@/context/AuthContext";
import authApi from "@/services/auth";
import "@/styles/register.scss";
import { default as IconSuccess } from "@public/icon/icon-success.svg";
import { Button, Col, Input, message } from "antd";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [empty, setEmpty] = useState(false);
  const [modalForgotPassword, setModalForgotPassword] = useState(false);
  const [loadingSendEmail, setLoadingSendEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { accessToken, updateAccessToken, userInfo, updateUserInfo } =
    useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
      try {
        const response = await authApi.signin({ email, password });
        if (response.status === 201) {
          updateAccessToken(response.data.accessToken);
          updateUserInfo(response.data.user);
          message.success("Đăng nhập thành công!");
          router.push("/");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            message.error("Email không tồn tại! Vui lòng thử lại.");
          } else if (error.response?.data.message === "Incorrect password") {
            message.error("Mật khẩu không đúng! Vui lòng thử lại.");
          } else message.error("Đăng nhập không thành công! Vui lòng thử lại.");
        }
      }
    }
  };

  const handleSendEmail = async () => {
    setLoadingSendEmail(true);
    setEmailSent(true);
    setTimeout(() => setLoadingSendEmail(false), 3000);
  };

  return (
    <div className="flex">
      <Col span={12}>
        <div className="signup-container mx-auto w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-8 border-gray-100">
          <h1 className="text-5xl font-semibold">Chào mừng trở lại</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Chào mừng trở lại! Hãy đăng nhập ngay để nhận ưu đãi.
          </p>
          <div className="mt-8">
            <div className="flex flex-col">
              <label className="text-lg font-medium">Email</label>
              <Input
                className=" border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Nhập email của bạn"
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium">Mật khẩu</label>
              <Input
                className=" border-2 border-gray-100 rounded-xl p-4 mt-1 "
                placeholder="Nhập mật khẩu của bạn"
                type={"password"}
                onChange={handlePasswordChange}
              />
              {empty && (
                <p style={{ color: "red" }}>Vui lòng nhập email và mật khẩu.</p>
              )}
            </div>
            <div className="mt-8 flex justify-between items-center">
              <div>
                <input type="checkbox" id="remember" />
                <label
                  className="ml-2 font-medium text-base"
                  htmlFor="remember"
                >
                  Lưu tài khoản 30 ngày
                </label>
              </div>
              <label
                className="font-medium text-base text-blue-600 hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  setModalForgotPassword(true);
                }}
              >
                Bạn quên mật khẩu?
              </label>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <Button
                style={{
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                type="primary"
                className=" active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-customBlue rounded-xl text-white font-bold text-lg"
                onClick={handleSubmit}
              >
                Đăng nhập ngay
              </Button>
              <Button
                style={{ height: 50 }}
                className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 "
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                    fill="#34A853"
                  />
                  <path
                    d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                    fill="#4A90E2"
                  />
                  <path
                    d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                    fill="#FBBC05"
                  />
                </svg>
                Sign in with Google
              </Button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base pr-2">
                Bạn chưa có tài khoản?
              </p>
              <p
                className="font-medium text-base text-blue-600 hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  window.location.href = "/signup";
                }}
              >
                Đăng ký
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col span={12} style={{ height: "100vh" }}>
        <Image src="/glamping.jpg" width={749} height={937} alt="Ảnh mô tả" />
      </Col>
      <MyModal
        setShowModal={setModalForgotPassword}
        showModal={modalForgotPassword}
        handleOk={!emailSent ? handleSendEmail : () => {}}
        handleCancel={() => {
          if (emailSent) {
            setEmailSent(false);
          }
          setModalForgotPassword(false);
        }}
        {...(!emailSent && {
          textConfirm: "Reset password",
          dataConfirm: "Enter your email to receive a password reset email!",
          textBtnOk: "Send email",
          textArea: "Enter your email",
          isEditArea: true,
          inputType: "email",
        })}
        {...(emailSent && {
          textConfirm: "Send email success",
          dataConfirm: "Check your email to reset password!",
          icon: <IconSuccess />,
        })}
        customClass="detai-create-modal"
        loading={loadingSendEmail}
      />
    </div>
  );
};

export default SignIn;
