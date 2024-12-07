import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logo from "../../../assets/logoHCN.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="border-t-2 text-Black bg-Black"></div>
      <footer>
        <div className="container mx-auto max-w-screen-2xl xl:px-20 px-4">
          <div className="mt-10 flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="md:w-[400px]">
              <Link to={"/"}>
                <img src={logo} alt="" className="w-1/4" />
              </Link>
              <p className="my-2 text-Black/75 cursor-pointer">
                Địa chỉ cửa hàng: Hẻm 132 Đường 3/2 Phường Hưng Lợi Quận Ninh
                Kiều Thành Phố Cần Thơ
              </p>
              <p className="text-Black/75 cursor-pointer">
                Hotline: 0946633248
              </p>
              <p className="my-2 text-Black/75 cursor-pointer">
                Email: lengoc14082002@gmail.com
              </p>

              <div className="my-2 flex items-center gap-6">
                <FaFacebookF className="w-5 h-5 cursor-pointer hover:text-orange-500" />
                <FaTwitter className="w-5 h-5 cursor-pointer hover:text-orange-500" />
                <FaLinkedinIn className="w-5 h-5 cursor-pointer hover:text-orange-500" />
                <FaInstagram className="w-5 h-5 cursor-pointer hover:text-orange-500" />
              </div>
            </div>

            <div className="text-Black">
              <h4 className="font-semibold mb-3 cursor-pointer">
                DỊCH VỤ KHÁCH HÀNG
              </h4>
              <div className="space-y-2">
                <Link to="/" className="text-base block hover:text-orange-500">
                  Liên hệ với chúng tôi
                </Link>
                <Link to="/" className="text-base block hover:text-orange-500">
                  Theo dõi đơn hàng của bạn
                </Link>
                <Link to="/" className="text-base block hover:text-orange-500">
                  Chăm sóc khách hàng
                </Link>
                <Link to="/" className="text-base block hover:text-orange-500">
                  Đặt hàng tiện lợi
                </Link>
                <Link to="/" className="text-base block hover:text-orange-500">
                  Vận chuyển nhanh chóng
                </Link>
              </div>
            </div>

            <div className="text-Black">
              <h4 className="font-semibold mb-3 cursor-pointer">
                CÁC THƯƠNG HIỆU
              </h4>
              <div className="space-y-2">
                <Link to="/" className="text-base block hover:text-orange-500">
                  YODY
                </Link>
                <Link to="/" className="text-base block hover:text-orange-500">
                  FM
                </Link>
                <Link to="/" className="text-base block hover:text-orange-500">
                  TEELAB
                </Link>
                <Link to="/" className="text-base block hover:text-orange-500">
                  DIRTY COINS
                </Link>
                <Link to="/" className="text-base block hover:text-orange-500">
                  UNIQLO
                </Link>
              </div>
            </div>
            <div className="text-Black">
              <h4 className="font-semibold mb-3 cursor-pointer">CAM KẾT</h4>
              <div className="md:w-[250px]">
                <Link to="/" className="text-base block hover:text-orange-500">
                  <p className="md:w-full mb-8 text-Black ">
                    Chúng tôi cam kết mang đến dịch vụ chăm sóc khách hàng tận
                    tâm, sẵn sàng hỗ trợ bạn trong mọi trải nghiệm mua sắm thời
                    trang trực tuyến
                  </p>
                </Link>
                {/* <form className="md:w-full mx-auto text-base flex">
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email address..."
                  className="h-8 bg-transparent outline-none border-b-2 pl-2 border-black 
          md:w-2/3 w-full mb-5 placeholder:text-black/50 mr-4"
                />
                <button
                  type="submit"
                  // value={"Submit"}
                  className="bg-black text-white bg-dark-button rounded-none mb-10"
                >
                  <span className="relative z-10">Submit</span>
                </button>
              </form> */}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-Black">
          <p className="text-white text-center items-center py-3">
            © {currentYear} My Shop, LeThiHongNgoc B2005766.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
