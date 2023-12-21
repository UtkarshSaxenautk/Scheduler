import { useNavigate } from "react-router-dom";
import Typed from "react-typed";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className=" text-white">
      <div className=" max-w-[800px] h-[66vh]  w-full mt-[96px] mx-auto text-center flex flex-col">
        <p className=" text-[#00df9a] font-bold p-2">And Here We Present,</p>
        <h1 className=" md:text-6xl sm:text-5xl text-4xl font-bold md:py-6">
          Scheduler...
        </h1>
        <div className=" flex justify-center items-center">
          <p className=" md:text-4xl sm:text-3xl text-xl font-bold py-4">
            It Generates Time-table which is
          </p>
          <Typed
            className=" md:text-4xl sm:text-3xl text-xl font-bold md:pl-4 pl-2"
            strings={["Fast", "Calm", "Clash-Free"]}
            typeSpeed={160}
            backSpeed={180}
            loop
          />
        </div>
        <p className=" md:text-2xl text-xl font-bold text-gray-500">
          Streamline teaching: Effortless planning, organized schedules with our
          timetable generator.
        </p>
        <button
          onClick={() => navigate("/generate")}
          className=" bg-[#00df9a] w-[200px] rounded-r-md font-medium my-6 mx-auto py-3"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
export default Home;
