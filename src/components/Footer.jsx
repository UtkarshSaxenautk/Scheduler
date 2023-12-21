import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter className="text-center text-lg-left bg-[#00df9a]  ">
      <div className="text-center p-3 text-white font-medium text-base">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-dark">Shruti & Utkarsh</a>
      </div>
    </MDBFooter>
  );
}
