"use client";

import { useChangePassword } from "@/hooks/user/useUserInfo";
import { Input } from "antd";
import { useEffect, useState } from "react";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(true);
  const [changedPassword, setChangedPassword] = useState(false);

  const { putData: changePassword } = useChangePassword();

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleChangePassword = () => {
    changePassword({ currentPassword: oldPassword, newPassword: password })
      .then(() => {
        setChangedPassword(true);
      })
      .catch((error) => {
        console.error("Failed to change password:", error);
      });
  };

  useEffect(() => {
    setPasswordMismatch(password !== confirmPassword);
  }, [password, confirmPassword]);

  return (
    <section className="py-10 my-auto dark:bg-gray-900">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-8 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div className="">
            <form>
              <h2 className="text-center mt-1 font-semibold dark:text-gray-300">
                Thay đổi mật khẩu
              </h2>
              {!changedPassword && (
                <div>
                  <div className="w-full mb-4">
                    <label className="dark:text-gray-300">Mật khẩu cũ</label>
                    <Input.Password
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Mật khẩu cũ"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="w-full mb-4">
                    <label className="dark:text-gray-300">Mật khẩu mới</label>
                    <Input.Password
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Mật khẩu mới"
                      onChange={handleNewPasswordChange}
                    />
                  </div>
                  <div className="w-full mb-4">
                    <label className="dark:text-gray-300">
                      Xác nhận mật khẩu mới
                    </label>
                    <Input.Password
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Xác nhận mật khẩu mới"
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>
                  {passwordMismatch && (
                    <span
                      style={{
                        color: "red",
                        padding: "13px 10px",
                        marginBottom: "10px",
                      }}
                    >
                      Mật khẩu không trùng khớp
                    </span>
                  )}
                  <div className="flex mt-2">
                    <a
                      className={`w-full px-4 py-3 text-center cursor-pointer text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl ${
                        passwordMismatch ||
                        !oldPassword ||
                        !password ||
                        !confirmPassword
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() =>
                        !passwordMismatch &&
                        oldPassword &&
                        password &&
                        confirmPassword &&
                        handleChangePassword()
                      }
                    >
                      Lưu
                    </a>
                  </div>
                </div>
              )}
              {changedPassword && (
                <div className="text-center my-16">
                  Ban đã thay đổi mật khẩu thành công!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
