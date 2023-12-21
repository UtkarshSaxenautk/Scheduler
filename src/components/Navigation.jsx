import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
const Navigation = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(true);
  const handelnav = () => {
    setNav(!nav);
  };
  return (
    <div className=" flex justify-between items-center h-24 max-w-full mx-auth bg-[#00df9a] text-white ...">
      <h1
        onClick={() => navigate("/")}
        className=" w-full text-3xl font-bold text-teal-700 ml-8"
      >
        SCHEDULER
      </h1>
      <ul className=" hidden md:flex  pr-80">
        <li
          onClick={() => navigate("/")}
          className=" p-4 font-bold text-2xl text-teal-700"
        >
          Home
        </li>
        <li
          onClick={() => navigate("/guide")}
          className=" p-4 font-bold text-2xl text-teal-700"
        >
          Guide
        </li>
        <li
          onClick={() => navigate("/generate")}
          className=" p-4 font-bold text-2xl text-teal-700"
        >
          Generate
        </li>
        <li
          onClick={() => navigate("/views")}
          className=" p-4 font-bold text-2xl text-teal-700"
        >
          Views
        </li>
        <li
          onClick={() => navigate("/contact")}
          className=" p-4 font-bold text-2xl text-teal-700"
        >
          Contact
        </li>
      </ul>
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="logo"
        className=" md:w-24  sm:w-16 w-14 mr-20"
      />
      <div onClick={handelnav} className=" block md:hidden mr-8">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[48%] h-full border-r border-r-teal-900 bg-teal-900 z-50"
            : "fixed left-[-100%] ease-in-out duration-700 z-50"
        }
      >
        <h1
          onClick={() => navigate("/")}
          className=" w-full text-3xl font-bold m-4 text-green-300"
        >
          SCHEDULER
        </h1>
        <ul className=" p-4 uppercase ">
          <li
            onClick={() => navigate("/")}
            className=" p-4 border-b border-green-300"
          >
            Home
          </li>
          <li
            onClick={() => navigate("/guide")}
            className=" p-4 border-b border-green-300"
          >
            Guide
          </li>
          <li
            onClick={() => navigate("/generate")}
            className=" p-4 border-b border-green-300"
          >
            Generate
          </li>
          <li onClick={() => navigate("/views")} className="p-4">
            Views
          </li>
          <li onClick={() => navigate("/contact")} className="p-4">
            Contact
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
