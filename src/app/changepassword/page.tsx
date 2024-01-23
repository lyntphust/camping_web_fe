"use client";

import { Input } from "antd";
import { useEffect, useState } from "react";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(true);
  const [changedPassword, setChangedPassword] = useState(false);

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
    setChangedPassword(true);
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
                Change your password
              </h2>
              {!changedPassword && (
                <div>
                  <div className="w-full  mb-4 ">
                    <label className=" dark:text-gray-300">Old password</label>
                    <Input.Password
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Old password"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="w-full  mb-4 ">
                    <label className=" dark:text-gray-300">New password</label>
                    <Input.Password
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="New password"
                      onChange={handleNewPasswordChange}
                    />
                  </div>
                  <div className="w-full  mb-4 ">
                    <label className=" dark:text-gray-300">
                      Confirm new password
                    </label>
                    <Input.Password
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Confirm new password"
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
                      Password mismatch!
                    </span>
                  )}
                  <div
                    className="flex mt-2"
                    onClick={() => handleChangePassword()}
                  >
                    <a className="w-full px-4 py-3 text-center cursor-pointer text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                      Change Password
                    </a>
                  </div>
                </div>
              )}
              {changedPassword && (
                <div className="text-center my-16">
                  Ban da thay đổi mật khẩu thành công!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
