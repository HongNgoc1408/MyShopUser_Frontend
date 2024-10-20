import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { Avatar, Card } from "antd";
import { showError } from "../../services/commonService";
import { Button, Form, Input } from "antd";

const Profile = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UserService.getProfile();
        const address = await UserService.getAddress();

        console.log("1", data.data);
        console.log("2", address.data);

        setData(data.data);
        setAddress(address.data);
      } catch (error) {
        showError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto max-lg:px-8 px-20 my-10 w-full">
        <div className="flex space-x-5">
          {/* <ConfigProvider
            theme={{
              components: {
                Card: {
                  headerHeight: "50px",
                  headerFontSize: "20px",
                },
              },
              token: {
                fontSize: "16px",
                padding: 5,
              },
            }}
          > */}
          <Card style={{ width: "30%" }} title="Thông tin cá nhân">
            <Form layout="vertical" form={form}>
              <div className="flex items-center justify-center">
                <Avatar
                  src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/b94eafde-25f5-41ff-a6c4-63786bf80377/5602cc0f-4caf-460b-8b30-84eb53ad6527.png"
                  size={175}
                  fontWeight={800}
                />
              </div>

              <Form.Item label="Email">
                <Input value={data.email} disabled />
              </Form.Item>
              <Form.Item label="Họ và tên">
                <Input defaultValue={data.fullname} value={data.fullname} />
              </Form.Item>
              <Form.Item label="Số điện thoại">
                <Input
                  defaultValue={data.phoneNumber}
                  value={data.phoneNumber}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary">Cập nhật</Button>
              </Form.Item>
            </Form>
          </Card>
          <Card style={{ width: "70%" }} title="Thông tin giao hàng">
            <Form layout="vertical" form={form}>
              <div className="flex gap-5">
                <div className="w-full">
                  <Form.Item label="Họ và tên">
                    <Input defaultValue={address.name} value={address.name} />
                  </Form.Item>
                </div>
                <div className="w-full">
                  <Form.Item label="Số điện thoại">
                    <Input
                      defaultValue={address.phoneNumber}
                      value={address.phoneNumber}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full">
                <Form.Item label="Tỉnh/Thành phố">
                  <Input
                    defaultValue={address.province_name}
                    value={address.province_name}
                  />
                </Form.Item>
                <Form.Item label="Quận/Huyện">
                  <Input
                    defaultValue={address.district_name}
                    value={address.district_name}
                  />
                </Form.Item>
                <Form.Item label="Phường/Xã">
                  <Input
                    defaultValue={address.ward_name}
                    value={address.ward_name}
                  />
                </Form.Item>
                <Form.Item label="Địa chỉ chi tiết">
                  <Input defaultValue={address.detail} value={address.detail} />
                </Form.Item>
              </div>
              <Form.Item>
                <Button type="primary">Cập nhật</Button>
              </Form.Item>
            </Form>
          </Card>
          {/* </ConfigProvider> */}
        </div>
      </div>
    </>
  );
};
export default Profile;
