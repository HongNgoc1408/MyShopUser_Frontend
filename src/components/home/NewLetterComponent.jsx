import React from "react";
import { Link } from "react-router-dom";
import TitleComponent from "./TitleComponent";

const NewLetterComponent = () => {
  return (
    <>
      <TitleComponent title="Or subscribe to the newsletter" />
      <form className="md:w-1/2 mx-auto text-base flex justify-center">
        <input
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
          <button className=" relative z-10">Submit</button>
        </button>
      </form>
    </>
  );
};

export default NewLetterComponent;
