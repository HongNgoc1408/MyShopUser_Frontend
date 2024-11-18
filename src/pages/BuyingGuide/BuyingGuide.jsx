import { Image } from "antd";
import React from "react";
import b1 from "../../assets/guide/b1.jpg";
import b1_1 from "../../assets/guide/b1_1.jpg";
import b1_2 from "../../assets/guide/b1_2.jpg";
import b2 from "../../assets/guide/b2.jpg";
import b2_1 from "../../assets/guide/b2_1.jpg";
import b2_2 from "../../assets/guide/b2_2.jpg";
import b2_3 from "../../assets/guide/b2_3.jpg";
import b3 from "../../assets/guide/b3.jpg";
import b4 from "../../assets/guide/b4.jpg";
import b5 from "../../assets/guide/b5.jpg";
const BuyingGuide = () => {
  return (
    <div className="bg-white text-lg p-10">
      <div className="font-bold mb-5 uppercase">* Hướng dẫn mua hàng</div>
      <div className="text-lg space-y-2">
        <p>
          Chỉ cần ngồi ở nhà bạn cũng có thể dễ dàng mua hàng chỉ với vài thao
          tác đơn giản sau:
        </p>
        <>
          <div className="font-bold text-xl">Bước 1: Đăng ký tài khoản:</div>
          <div>Bấm chọn “Đăng ký” để đăng ký tài khoản MS</div>
          <div>
            <Image src={b1} preview={false} />
          </div>
          <p>
            Sau đó bạn nhập số điện thoại và mã OTP sẽ được gửi về điện thoại
            của bạn.
            <br />
            Sau khi nhập mã OTP, bạn nhập đủ thông tin ở các mục bên dưới là bạn
            đã đăng ký thành công. Bạn nhớ lưu lại mật khẩu để đăng nhập cho lần
            sau.
          </p>
          <div>
            <Image src={b1_1} preview={false} />
          </div>
          <div>
            <Image src={b1_2} preview={false} />
          </div>
        </>
        <>
          <div className="font-bold text-xl">
            Bước 2: Tìm sản phẩm muốn mua bằng nhiều cách như:
          </div>
          <div>
            Cách 1: Ở "Trang chủ" mục "Thời trang": Để chọn sản phẩm cần mua.
            <br />
            <div>
              <Image src={b2_2} preview={false} />
            </div>
            Cách 2: Bấm vào "Sản phẩm" để chuyển đến trang sản phẩm: Để chọn sản
            phẩm cần mua.
            <br />
            <div>
              <Image src={b2_3} preview={false} />
            </div>
            Cách 3: Sử dụng ô "Tìm kiếm" ở biểu tượng kính lúp, gõ tên sản phẩm
            muốn mua. Ví dụ: “áo sơ mi nữ”. Website sẽ cho bạn những sản phẩm
            chính xác nhất với thông tin bạn tìm kiếm.
            <br />
            <div>
              <Image src={b2} preview={false} />
              <Image src={b2_1} preview={false} />
            </div>
            Khi đã chọn được sản phẩm muốn mua, bạn bấm vào sản phẩm để xem
            thông tin chi tiết.
          </div>
        </>
        <>
          <div className="font-bold text-xl">
            Bước 3: Chọn thông tin sản phẩm:
          </div>
          <div>
            Để mua sản phẩm, bạn chọn các thông tin sau: màu + size + số lượng
            sản phẩm cần đặt <br />
            <div>
              <Image src={b3} preview={false} />
            </div>
            Sau đó chọn "Thêm vào giỏ hàng"
          </div>
        </>
        <>
          <div className="font-bold text-xl">Bước 4: Đặt hàng:</div>
          <div>
            Nhập địa chỉ và thông tin nhận hàng. <br />
            <div>
              <Image src={b4} preview={false} />
            </div>
            Chọn sản phẩm tỏng giỏ hàng
            <br />
            Chọn phương thức thanh toán <br />
            Miễn phí vận chuyển nếu đơn hàng lớn hơn 500.000đ. Sau đó bấm “Mua
            hàng” và website sẽ thông báo bạn “Đã đặt hàng thành công”
          </div>
        </>
        <>
          <div className="font-bold text-xl">Bước 5: Theo dõi đơn hàng:</div>
          <div>
            Bạn vào “Đơn đặt hàng” để theo dõi hành trình đơn hàng đã đặt. Bạn
            sẽ nhận được hàng trong vòng 6 - 7 ngày kể từ ngày đặt hàng. Trường
            hợp phát sinh những vấn đề khách quan, đơn hàng có thể sẽ đến trễ
            hơn so với dự kiến. <br />
            <div>
              <Image src={b5} preview={false} />
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default BuyingGuide;
