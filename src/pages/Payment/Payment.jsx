import { App, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import PaymentsService from "../../services/PaymentsService";

const Payment = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState();

  useEffect(() => {
    const newParams = Object.fromEntries(searchParams.entries());
    if (
      !newParams.vnp_TmnCode ||
      !newParams.vnp_Amount ||
      !newParams.vnp_SecureHash ||
      !newParams.vnp_ResponseCode ||
      !newParams.vnp_TransactionStatus ||
      !newParams.vnp_TransactionNo ||
      Object.entries(newParams).length === 0
    ) {
      setParams(undefined);
    } else {
      setParams(newParams);
    }
  }, [searchParams]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await PaymentsService.VNPayCallback(params);
  //       notification.success({
  //         message: "Thành công",
  //         placement: "top",
  //         description: "Thanh toán thành công",
  //       });
  //     } catch (error) {
  //       notification.error({
  //         message: "Thất bại",
  //         placement: "top",
  //         description: "Thanh toán thất bại",
  //       });
  //     } finally {
  //       navigate("/order");
  //     }
  //   };
  //   if (params) {
  //     fetchData();
  //   }
  // }, [params, notification, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PaymentsService.VNPayCallback(params);

        if (
          params.vnp_ResponseCode === "00" &&
          params.vnp_TransactionStatus === "00"
        ) {
          notification.success({
            message: "Thành công",
            placement: "top",
            description: "Thanh toán thành công",
          });
        } else {
          notification.error({
            message: "Thất bại",
            placement: "top",
            description:
              "Thanh toán không thành công. Vui lòng kiểm tra lại hoặc thử lại sau.",
          });
        }
      } catch (error) {
        notification.error({
          message: "Lỗi",
          placement: "top",
          description: "Đã xảy ra lỗi khi xử lý thanh toán. Vui lòng thử lại.",
        });
      } finally {
        navigate("/order");
      }
    };

    if (params) {
      fetchData();
    }
  }, [params, notification, navigate]);

  if (!params) {
    return <NotFound />;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <Spin /> Đang xử lý thanh toán...
      </div>
    </div>
  );
};

export default Payment;
