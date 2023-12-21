import { useState } from "react";

const Click = () => {
  const [rC, setRC] = useState(true);
  const clickedRc = () => {
    setRC(true);
  };
  const clickedLc = () => {
    setRC(false);
  };
  return (
    <div className="bg-white">
      <div className="p-4">
        <button className="mr-4" onClick={clickedLc}>
          {" "}
          Left{" "}
        </button>
        <button className="ml-4" onClick={clickedRc}>
          {" "}
          Right{" "}
        </button>
      </div>
      <div> {rC} </div>
      {rC ? <div>Right Clicked </div> : <div>Left Clicked</div>}
    </div>
  );
};

export default Click;
