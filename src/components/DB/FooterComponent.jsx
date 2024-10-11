import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logo from "../../assets/logoHCN.png";
const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container mx-auto max-w-screen-2xl xl:px-20 px-4">
        <div className="mt-10 flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="md:w-[400px]">
            <Link to={"/"}>
              <img src={logo} alt="" className="w-1/4" />
            </Link>
            <p className="my-8 text-Black/75">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
            <div className="flex items-center gap-6">
              <FaFacebookF className="w-5 h-5 cursor-pointer hover:text-orange-500" />
              <FaTwitter className="w-5 h-5 cursor-pointer hover:text-orange-500" />
              <FaLinkedinIn className="w-5 h-5 cursor-pointer hover:text-orange-500" />
              <FaInstagram className="w-5 h-5 cursor-pointer hover:text-orange-500" />
            </div>
          </div>

          <div className="text-Black">
            <h4 className="font-semibold mb-3 cursor-pointer">CATALOG</h4>
            <div className="space-y-2">
              <Link to="/" className="text-base block hover:text-orange-500">
                category
              </Link>
              <Link to="/" className="text-base block hover:text-orange-500">
                category
              </Link>
              <Link to="/" className="text-base block hover:text-orange-500">
                category
              </Link>
              <Link to="/" className="text-base block hover:text-orange-500">
                category
              </Link>
              <Link to="/" className="text-base block hover:text-orange-500">
                category
              </Link>
            </div>
          </div>

          <div className="text-Black">
            <h4 className="font-semibold mb-3 cursor-pointer">
              CUSTOMER SERVICES
            </h4>
            <div className="space-y-2">
              <Link to="/" className="text-base block hover:text-orange-500">
                Contact Us
              </Link>
              <Link to="/" className="text-base block hover:text-orange-500">
                Track Your Order
              </Link>
              <Link to="/" className="text-base block hover:text-orange-500">
                Product Care & Repair
              </Link>
              <Link to="/" className="text-base block hover:text-orange-500">
                Book an Appointment
              </Link>
              <Link to="/" className="text-base block hover:text-orange-500">
                Shipping & Returns
              </Link>
            </div>
          </div>

          <div className="text-Black">
            <h4 className="font-semibold mb-3 cursor-pointer">ABOUT US</h4>
            <div className="space-y-2">
              <Link to="/" className="text-base block hover:text-orange-500">
                Our Producers
              </Link>
              <Link to="/" className="text-base block hover:text-orange-500">
                Sitemap
              </Link>
              <Link to="/" className="text-base block hover:text-orange-500">
                FAQ
              </Link>
              <Link to="/" className="text-base block hover:text-orange-500">
                About Us
              </Link>
              <Link to="/" className="text-base block hover:text-orange-500">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div className="text-Black">
            <h4 className="font-semibold mb-3 cursor-pointer">
              Subscribe for updates
            </h4>
            <div className="md:w-[250px]">
              <Link to="/" className="text-base block hover:text-orange-500">
                <p className="md:w-full my-8 text-Black ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  ut mauris eros. Nulla quis ante sed tortor efficitur
                  facilisis.
                </p>
              </Link>
              <form className="md:w-full mx-auto text-base flex">
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
                  value={"Submit"}
                  className="bg-black text-white bg-dark-button rounded-none mb-10"
                >
                  <button className="relative z-10">Submit</button>
                </button>
              </form>
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
  );
};

export default FooterComponent;
