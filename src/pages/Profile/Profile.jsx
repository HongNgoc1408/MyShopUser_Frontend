import React, { useContext, useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { Avatar, Card, Modal, notification, Upload } from "antd";
import { showError, toImageLink } from "../../services/commonService";
import { Button, Form, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AvatarContext } from "../../App";

const Profile = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [address, setAddress] = useState([]);
  const { setAvatar } = useContext(AvatarContext);
  const [avt, setAvt] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UserService.getProfile();
        const address = await UserService.getAddress();
        const avatar = await UserService.getAvatar();

        // console.log("1", data.data);
        // console.log("2", address.data);
        // console.log("3", avatar.data.imageURL);

        setData(data.data);
        setAddress(address.data);
        setAvt(avatar.data.imageURL);
      } catch (error) {
        showError(error);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleUpdateClick = () => {
    setIsModalOpen(true);
    setFileList([]);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setFileList([]);
  };

  const handleAvatarUpdate = async () => {
    if (fileList.length === 0) {
      notification.error({
        message: "Vui lòng chọn ảnh.",
        placement: "top",
      });
      return;
    }

    const formData = new FormData();
    formData.append("avatar", fileList[0].originFileObj);

    try {
      const res = await UserService.updateAvatar(formData);

      notification.success({
        message: "Cập nhật ảnh đại diện thành công.",
        placement: "top",
      });

      setAvt(res.data.imageURL);
      setAvatar(res.data.imageURL);
      setIsModalOpen(false);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <div className="container mx-auto max-lg:px-8 px-20 my-10 w-full">
        <div className="flex space-x-5">
          <Card style={{ width: "30%" }} title="Thông tin cá nhân">
            <Form layout="vertical" form={form}>
              <div className="flex items-center justify-center">
                <Avatar src={toImageLink(avt)} size={175} fontWeight={800} />
              </div>

              <Form.Item label="Email">
                <Input value={data.email} readOnly />
              </Form.Item>
              <Form.Item label="Họ và tên">
                <Input defaultValue={data.fullName} value={data.fullName} />
              </Form.Item>
              <Form.Item label="Số điện thoại">
                <Input
                  defaultValue={data.phoneNumber}
                  value={data.phoneNumber}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={handleUpdateClick}>
                  Cập nhật
                </Button>

                <Modal
                  width={200}
                  centered
                  title="Cập nhật ảnh"
                  open={isModalOpen}
                  onCancel={handleModalCancel}
                  onOk={handleAvatarUpdate}
                >
                  <Form.Item
                    className="mx-auto"
                    name="imageUrl"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ảnh.",
                      },
                    ]}
                  >
                    <Upload
                      name="file"
                      beforeUpload={() => false}
                      listType="picture-circle"
                      fileList={fileList}
                      accept="image/png, image/gif, image/jpeg, image/svg"
                      maxCount={1}
                      onChange={handleFileChange}
                      showUploadList={{ showPreviewIcon: false }}
                    >
                      {fileList.length >= 1 ? null : (
                        <button type="button">
                          <UploadOutlined />
                          <div>Chọn ảnh</div>
                        </button>
                      )}
                    </Upload>
                  </Form.Item>
                </Modal>
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
        </div>
      </div>
    </>
  );
};
export default Profile;
