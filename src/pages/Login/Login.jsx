import { Form, notification, Spin } from "antd";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import AuthAction from "../../services/AuthAction";
import { showError } from "../../services/commonService";
import { useAuth } from "../../App";
const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuth();
  // const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = form.getFieldsValue();
      await authService.login(data);
      dispatch(AuthAction.LOGIN());
      notification.success({
        message: "Đăng nhập thành công",
        placement: "top",
      });

      window.location.replace("/");
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <>
      <section className="py-12 xl:px-20 px-4">
        <Form
          form={form}
          initialValues={{
            username: "",
            password: "",
          }}
          onFinish={handleLogin}
          className="max-w-[555px] h-auto bg-white m-auto px-14 py-10 rounded-md"
        >
          <h3 className="title text-center">Đăng nhập</h3>
          <div className="w-full flex flex-col">
            <Form.Item
              name="username"
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
                  placeholder="Mật khẩu"
                  className="w-full text-base text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </div>
            </Form.Item>
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2"
                checked
                readOnly
              />
              <p className="text-base">Ghi nhớ mật khẩu</p>
            </div>
            <div>
              <Link
                to="/reset-password"
                className="text-base font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"
              >
                Quên mật khẩu ?
              </Link>
            </div>
          </div>

          <div className="w-full flex flex-col my-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-dark-button text-base py-2 rounded-md ${
                loading ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
            >
              <span className="relative z-10">
                {loading ? <Spin /> : "Đăng nhập"}
              </span>
            </button>
          </div>
        </Form>
      </section>
    </>
  );
};

export default Login;
