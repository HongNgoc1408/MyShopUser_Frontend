import { Form, Input, notification, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { showError } from "../../services/commonService";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [form] = Form.useForm();
  const [loadingSendEMail, setLoadingSendEMail] = useState(false);
  const [loadingConfirmCode, setLoadingConfirmCode] = useState(false);
  const [loadingResetPW, setLoadingResetPW] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isConfirmCode, setIsConfirmCode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((preTimer) => preTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleSendCode = async () => {
    setLoadingSendEMail(true);
    try {
      await authService.codeResetPassword(form.getFieldsValue("email"));
      // console.log(res)
      notification.success({
        message: "Gửi OTP thành công",
      });
      setTimer(60);
      setIsCodeSent(true);
    } catch (error) {
      showError(error);
    } finally {
      setLoadingSendEMail(false);
    }
  };

  const handleConfirmCode = async () => {
    setLoadingConfirmCode(true);
    try {
      const email = form.getFieldValue("email");
      const code = form.getFieldValue("token");
      await authService.confirmCode({ email: email, token: code });
      notification.success({
        message: "Xác nhận OTP thành công",
      });
      setIsConfirmCode(true);
    } catch (error) {
      showError(error);
    } finally {
      setLoadingConfirmCode(false);
    }
  };

  const handleResetPassword = async () => {
    setLoadingResetPW(true);
    try {
      const email = form.getFieldValue("email");
      const code = form.getFieldValue("token");
      const items = form.getFieldsValue();
      const data = {
        email: email,
        token: code,
        ...items,
      };
      const res = await authService.resetPassword(data);
      console.log(res);
      notification.success({
        message: "Đổi mật khẩu thành công.",
      });
      navigate("/login");
    } catch (error) {
      showError(error);
      // console.log(error);
    } finally {
      setLoadingResetPW(false);
    }
  };

  return (
    <>
      <section className="py-12 xl:px-20 px-4">
        {!isCodeSent ? (
          <>
            <Form
              form={form}
              onFinish={handleSendCode}
              className="max-w-[555px] h-auto bg-white m-auto px-14 py-10 rounded-md"
            >
              <h3 className="title text-center">Đổi mật khẩu</h3>
              <div className="w-full flex flex-col">
                <Form.Item
                  name="email"
                  hasFeedback
                  rules={[
                    {
                      type: "email",
                      message: "Email không đúng định dạng",
                    },
                    {
                      required: true,
                      message: "Vui lòng nhập email!",
                    },
                  ]}
                >
                  <input
                    autoComplete="email"
                    type="email"
                    placeholder="Email"
                    className="w-full text-base text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                </Form.Item>
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  disabled={loadingSendEMail}
                  className="bg-dark-button text-base disabled:bg-gray-400 disabled:cursor-no-drop"
                >
                  <span className="relative z-10">
                    {loadingSendEMail ? <Spin /> : "Tiếp theo"}
                  </span>
                </button>
              </div>
            </Form>
          </>
        ) : !isConfirmCode ? (
          <>
            <Form
              form={form}
              onFinish={handleConfirmCode}
              className="max-w-[555px] h-auto bg-white m-auto mt-32 px-14 py-10 rounded-md"
            >
              <h3 className="title text-center">Nhập OTP</h3>
              <div className="w-full flex items-center justify-center">
                <Form.Item
                  name="token"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã xác thực!",
                    },
                  ]}
                >
                  <Input.OTP size="large" />
                </Form.Item>
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="bg-dark-button text-base disabled:bg-gray-400 disabled:cursor-no-drop"
                >
                  <span className="relative z-10">
                    {loadingConfirmCode ? <Spin /> : "Tiếp theo"}
                  </span>
                </button>
              </div>
            </Form>
          </>
        ) : (
          <Form
            form={form}
            onFinish={handleResetPassword}
            className="max-w-[555px] h-auto bg-white m-auto mt-32 px-14 py-10 rounded-md"
          >
            <h3 className="title text-center">Đổi mật khẩu</h3>
            <div className="w-full flex flex-col">
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu mới",
                  },
                ]}
              >
                <div className="relative">
                  <span
                    className="z-10 absolute top-4 right-8"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>

                  <input
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Mật khẩu mới"
                    className="w-full text-base text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                </div>
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Xác nhận mật khẩu mới!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <div className="relative">
                  <span
                    className="z-10 absolute top-4 right-8"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>

                  <input
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Xác nhận mật khẩu mới"
                    className="w-full text-base text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                </div>
              </Form.Item>
            </div>

            <div className="w-full flex flex-col my-4">
              <button className="bg-dark-button text-base disabled:bg-gray-400 disabled:cursor-no-drop">
                <span className="relative z-10">
                  {loadingResetPW ? <Spin /> : "Xác nhận"}
                </span>
              </button>
            </div>
          </Form>
        )}
      </section>
    </>
  );
};

export default ResetPassword;
