import { Divider, Form, Input, notification, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { showError } from "../../services/commonService";
import authService from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined, MailOutlined } from "@ant-design/icons";

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [form] = Form.useForm();
  const [loadingSendEMail, setLoadingSendEMail] = useState(false);
  const [loadingConfirmCode, setLoadingConfirmCode] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpEmail, setOTPEmail] = useState([]);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isConfirmCode, setIsConfirmCode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendCode = async () => {
    setLoadingSendEMail(true);
    try {
      await authService.sendCodeRegister(form.getFieldsValue("email"));

      notification.success({
        message: "Gửi OTP thành công",
        placement: "top",
      });
      setTimer(300);
      setIsCodeSent(true);
      setOTPEmail(form.getFieldsValue("email").email);
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
        placement: "top",
      });
      setIsConfirmCode(true);
    } catch (error) {
      showError(error);
    } finally {
      setLoadingConfirmCode(false);
    }
  };

  const handleRegister = async () => {
    setLoadingRegister(true);
    try {
      const email = form.getFieldValue("email");
      const code = form.getFieldValue("token");
      const items = form.getFieldsValue();
      const data = {
        email: email,
        token: code,
        ...items,
      };

      await authService.register(data);

      // console.log(res);

      notification.success({
        message: "Đăng ký tài khoản thành công",
        placement: "top",
      });
      navigate("/login");
    } catch (error) {
      showError(error);
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <>
      <section className="py-12 xl:px-20 px-4">
        {!isCodeSent ? (
          <>
            <Form
              form={form}
              initialValues={{
                email: "",
              }}
              onFinish={handleSendCode}
              className="max-w-[555px] h-auto bg-white m-auto px-14 py-10 rounded-md"
            >
              <h3 className="title text-center">Đăng ký</h3>
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
                  size="large"
                  disabled={loadingSendEMail}
                  className="bg-dark-button text-base disabled:bg-gray-400 disabled:cursor-no-drop"
                >
                  <span className="relative z-10">
                    {loadingSendEMail ? <Spin /> : "Tiếp theo"}
                  </span>
                </button>
              </div>

              <Divider plain>Hoặc</Divider>

              <div className="w-full flex items-center justify-center">
                <div className="w-full flex flex-col ml-0 m-4 items-center justify-center">
                  <button className="px-12 py-2 border-2 text-base disabled:bg-gray-400 disabled:cursor-no-drop hover:bg-gray-100">
                    <span className="flex">
                      <img
                        src="https://freepnglogo.com/images/all_img/facebook-circle-logo-png.png"
                        alt="Facebook logo"
                        className="w-6 h-6 mr-2"
                      />
                      {/* <FaFacebook size={30} color="blue" /> */}
                      <p className="my-auto mx-2">Facebook</p>
                    </span>
                  </button>
                </div>
                <div className="w-full flex flex-col mr-0 m-4 items-center justify-center">
                  <button className="px-12 py-2 border-2 text-base disabled:bg-gray-400 disabled:cursor-no-drop hover:bg-gray-100">
                    <span className="flex">
                      <img
                        src="https://i.pinimg.com/originals/74/65/f3/7465f30319191e2729668875e7a557f2.png"
                        alt="Google logo"
                        className="w-6 h-6"
                      />
                      {/* <FaGoogle size={30} color="red" /> */}
                      <p className="my-auto mx-2">Google</p>
                    </span>
                  </button>
                </div>
              </div>
              <div className="w-full flex items-center justify-center relative py-2">
                <div className="w-full h-[1px] bg-black"></div>
              </div>

              <div className="w-full flex items-center justify-center">
                <p className="text-base cursor-pointer flex">
                  <p className="mr-1">Bạn đã có tài khoản chưa? </p>
                  <Link
                    to={"/login"}
                    className="text-base font-medium cursor-pointer hover:underline hover:underline-offset-2"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </Form>
          </>
        ) : !isConfirmCode ? (
          <>
            <Form
              form={form}
              initialValues={{
                email: "",
              }}
              onFinish={handleConfirmCode}
              className="max-w-[555px] h-auto bg-white m-auto px-14 py-10 rounded-md"
            >
              <Link to={"/register"} onClick={() => setIsCodeSent(false)}>
                <p className="flex text-lg">
                  <LeftOutlined />
                  <p>Trở về</p>
                </p>
              </Link>
              <h3 className="title text-center">Nhập mã xác thực</h3>
              <div className="text-base text-center items-center justify-center">
                <p>Mã xác thực sẽ được gửi qua Email đến</p>
                <p>
                  <MailOutlined className="mr-2 text-orange-600" />
                  {otpEmail}
                </p>
              </div>
              <div className="w-full flex items-center justify-center mt-8">
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
              <div className="text-base flex text-center items-center justify-center">
                {timer > 0 ? (
                  <>
                    <p>Mã xác thực hết hạn trong </p>
                    <p className="text-red-600 ml-1">
                      {Math.floor(timer / 60)} phút {timer % 60} giây
                    </p>
                  </>
                ) : (
                  <p>Mã đã hết hạn</p>
                )}
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  type="primary"
                  size="large"
                  className="bg-dark-button text-base disabled:bg-gray-400 disabled:cursor-no-drop"
                  disabled={timer === 0}
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
            initialValues={{
              fullName: "",
              phoneNumber: "",
              password: "",
              confirm: "",
            }}
            onFinish={handleRegister}
            className="max-w-[555px] h-auto bg-white m-auto px-14 py-10 rounded-md"
          >
            <h3 className="title text-center">Thông tin đăng ký</h3>
            <div className="w-full flex flex-col">
              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên!",
                  },
                ]}
              >
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full text-base text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                  {
                    pattern: /^\+?\d{9,15}$/,
                    message: "Số điện thoại không hợp lệ! (VD: +84123456789)",
                  },
                ]}
              >
                <input
                  type="number"
                  placeholder="Số điện thoại"
                  className="w-full text-base text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu",
                  },
                ]}
              >
                <div className="relative">
                  <span
                    className="z-10 absolute top-6 right-5"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>

                  <input
                    autoComplete="new-password"
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full text-base text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                </div>
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Xác nhận mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <div className="relative">
                  <span
                    className="z-10 absolute top-6 right-5"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>

                  <input
                    autoComplete="new-password"
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Xác nhận mật khẩu"
                    className="w-full text-base text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                </div>
              </Form.Item>
            </div>

            <div className="w-full flex flex-col my-4">
              <button className="bg-dark-button text-base disabled:bg-gray-400 disabled:cursor-no-drop">
                <span className="relative z-10">
                  {loadingRegister ? <Spin /> : "Đăng ký"}
                </span>
              </button>
            </div>
          </Form>
        )}
      </section>
    </>
  );
};

export default Register;
