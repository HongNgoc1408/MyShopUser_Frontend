import React, { useContext, useEffect, useState } from "react";
import UserService from "../../services/UserService";
import {
  Avatar,
  Card,
  message,
  Modal,
  notification,
  Select,
  Upload,
} from "antd";
import { showError, toImageLink } from "../../services/commonService";
import { Button, Form, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AvatarContext } from "../../App";
import TextArea from "antd/es/input/TextArea";
import AddressService from "../../services/AddressService";

const Profile = () => {
  const [form] = Form.useForm();
  const { setAvatar } = useContext(AvatarContext);

  const [data, setData] = useState([]);
  const [address, setAddress] = useState([]);
  const [avt, setAvt] = useState([]);

  const [fileList, setFileList] = useState([]);

  const [provinces, setProvince] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [wards, setWard] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleOpenAvatarModal = () => {
    setIsAvatarModalOpen(true);
    setFileList([]);
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleOpenAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UserService.getProfile();
        const address = await UserService.getAddress();
        const avatar = await UserService.getAvatar();
        const result = await AddressService.getProvince();

        // console.log("1", data.data);
        // console.log("2", address.data);
        // console.log("3", avatar.data.imageURL);

        setData(data.data);
        setAddress(address.data);
        setAvt(avatar.data.imageURL);
        setProvince(result.data.data || []);
      } catch (error) {
        showError(error);
      }
    };
    fetchData();
  }, []);

  const handleProvinceChange = async (value, option) => {
    // console.log("handleProvinceChange", value);
    setSelectedProvince(value);
    try {
      const res = await AddressService.getDistrictsProvince(value);
      setDistrict(res.data.data ?? []);
      setWard([]);

      form.setFieldsValue({
        province_id: value,
        province_name: option.label,
      });
    } catch (error) {
      showError(error);
    }
  };

  const handleDistrictChange = async (value, option) => {
    // console.log("handleDistrictChange", value);
    setSelectedDistrict(value);
    try {
      const res = await AddressService.getWardsProvince(value);
      setWard(res.data.data ?? []);

      form.setFieldsValue({
        district_id: value,
        district_name: option.label,
      });
    } catch (error) {
      showError(error);
    }
  };

  const handleWardChange = (value, option) => {
    // console.log("handleWardChange", value);
    form.setFieldsValue({
      ward_id: value,
      ward_name: option.label,
    });
  };

  const handleUpdateAddress = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      // console.log(values);
      await UserService.updateAddress(values);

      notification.success({ message: "Cập nhật địa chỉ thành công." });
      setIsAddressModalOpen(false);
      setAddress(values);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log("Updated Values:", values);
      await UserService.updateProfile(values);
      message.success("Cập nhật thông tin cá nhân thành công.");
      setIsProfileModalOpen(false);
      setData({ ...data, ...values });
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
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
      setIsAvatarModalOpen(false);
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
              <div className="flex space-x-2">
                <Form.Item>
                  <Button type="primary" onClick={handleOpenAvatarModal}>
                    Cập nhật ảnh
                  </Button>

                  <Modal
                    loading={loading}
                    width={200}
                    centered
                    title="Cập nhật ảnh"
                    open={isAvatarModalOpen}
                    onCancel={() => setIsAvatarModalOpen(false)}
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
                <Form.Item>
                  <Button type="primary" onClick={handleOpenProfileModal}>
                    Cập nhật thông tin cá nhân
                  </Button>
                  <Modal
                    loading={loading}
                    width={500}
                    centered
                    title="Cập nhật thông tin"
                    open={isProfileModalOpen}
                    onCancel={() => setIsProfileModalOpen(false)}
                    onOk={handleUpdateProfile}
                  >
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleUpdateProfile}
                      initialValues={{
                        fullName: data.fullName || "",
                        phoneNumber: data.phoneNumber || "",
                      }}
                    >
                      <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập họ và tên",
                          },
                        ]}
                      >
                        <Input placeholder="Nhập họ và tên" />
                      </Form.Item>

                      <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại",
                          },
                          {
                            pattern: /^[0-9]{10}$/,
                            message: "Số điện thoại không hợp lệ.",
                          },
                        ]}
                      >
                        <Input placeholder="Nhập số điện thoại" />
                      </Form.Item>
                    </Form>
                  </Modal>
                </Form.Item>
              </div>
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
                <Button type="primary" onClick={handleOpenAddressModal}>
                  Cập nhật địa chỉ giao hàng
                </Button>
                <Modal
                  title="Địa chỉ giao hàng"
                  open={isAddressModalOpen}
                  onOk={handleUpdateAddress}
                  onCancel={() => setIsAddressModalOpen(false)}
                  loading={loading}
                >
                  <Form form={form} layout="vertical">
                    <Form.Item
                      name="name"
                      label="Họ và tên"
                      rules={[
                        {
                          required: true,
                          message: "Họ và tên không được để trống",
                        },
                      ]}
                    >
                      <Input
                        style={{ fontFamily: "serif" }}
                        className="text-sm"
                        placeholder="Nhập họ và tên"
                      />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      label="Số điện thoại"
                      rules={[
                        {
                          required: true,
                          message: "Số điện thoại không được để trống",
                        },
                      ]}
                    >
                      <Input
                        style={{ fontFamily: "serif" }}
                        className="text-sm"
                        placeholder="Nhập số điện thoại"
                      />
                    </Form.Item>
                    <Form.Item name="province_id" hidden>
                      <Input type="hidden" />
                    </Form.Item>
                    <Form.Item
                      name="province_name"
                      label="Tỉnh/Thành phố"
                      rules={[{ required: true }]}
                    >
                      <Select
                        showSearch
                        onChange={handleProvinceChange}
                        value={selectedProvince}
                        options={provinces.map((item) => ({
                          value: item.ProvinceID,
                          label: item.ProvinceName,
                        }))}
                      />
                    </Form.Item>
                    <Form.Item name="district_id" hidden>
                      <Input type="hidden" />
                    </Form.Item>
                    <Form.Item
                      name="district_name"
                      label="Quận/Huyện"
                      rules={[{ required: true }]}
                    >
                      <Select
                        showSearch
                        onChange={handleDistrictChange}
                        value={selectedDistrict}
                        options={districts.map((item) => ({
                          value: item.DistrictID,
                          label: item.DistrictName,
                        }))}
                      />
                    </Form.Item>
                    <Form.Item name="ward_id" hidden>
                      <Input type="hidden" />
                    </Form.Item>
                    <Form.Item
                      name="ward_name"
                      label="Phường/Xã"
                      rules={[{ required: true }]}
                    >
                      <Select
                        showSearch
                        onChange={handleWardChange}
                        options={wards.map((item) => ({
                          value: item.WardCode,
                          label: item.WardName,
                        }))}
                      />
                    </Form.Item>
                    <Form.Item
                      name="detail"
                      label="Địa chỉ cụ thể"
                      rules={[
                        {
                          required: true,
                          message: "Địa chỉ không được để trống",
                        },
                      ]}
                    >
                      <TextArea
                        style={{ fontFamily: "serif" }}
                        className="text-sm"
                      />
                    </Form.Item>
                  </Form>
                </Modal>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};
export default Profile;
