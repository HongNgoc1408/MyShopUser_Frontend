import React from "react";

const FormEmail = () => {
  return (
    <section className="bg-primaryBG py-12 xl:px-20 px-4">
      <form className="max-w-[555px] h-auto bg-white m-auto mt-32 px-14 py-10 rounded-md">
        <h3 className="title">REGISTER</h3>
        <div className="w-full flex flex-col">
          <div>
            <input
              //   value={email}
              //   onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>
        </div>

        <div className="w-full flex items-center">
          <input checked type="checkbox" className="w-4 h-4 mr-2" />
          <p className="text-sm">
            I want to receive MyShop&apos;s newsletter via email
          </p>
        </div>

        <div className="w-full flex items-center">
          <input checked type="checkbox" className="w-4 h-4 mr-2" />
          <p className="text-sm">I accept the privacy statement</p>
        </div>

        <div className="w-full flex flex-col my-4">
          <button
            // disabled={!email.length}
            // onClick={handleSendCode}
            className="bg-dark-button disabled:bg-gray-400 disabled:cursor-no-drop"
          >
            <span className="relative z-10">Create account</span>
          </button>
        </div>

        <div className="w-full flex items-center justify-center relative py-2">
          <div className="w-full h-[1px] bg-black"></div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm cursor-pointer">
            Do you already have an account?
            <a
              href="/login"
              className="text-sm font-medium cursor-pointer hover:underline hover:underline-offset-2"
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </section>
  );
};

export default FormEmail;
