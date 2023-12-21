import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReadyContext } from "../context";

const Views = () => {
  const [completed, setCompleted] = useState(false);
  const { ready, setReady } = useContext(ReadyContext);
  const navigate = useNavigate();

  const handleProcess = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/ready`)
      .then((response) => {
        setCompleted(true);
        setReady(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCompleted(false);
        setReady(false);
      });
  };

  return (
    <div className="bg-teal-50 min-h-screen ">
      <div className="flex justify-center text-black pt-24">
        <div className="p-8 bg-teal-100 rounded-md shadow-lg md:w-1/2 lg:w-1/3 py-20">
          {ready ? (
            <div>
              <p className="text-4xl font-bold text-teal-400 mb-8">
                You've completed the Steps!
              </p>
              <div className="flex flex-col space-y-4">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ bgcolor: "teal" }}
                  onClick={() => navigate("/viewClass")}
                >
                  Class-View
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ bgcolor: "teal" }}
                  onClick={() => navigate("/viewTeacher")}
                >
                  Teacher-View
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ bgcolor: "teal" }}
                  onClick={() => navigate("/viewRoom")}
                >
                  Room-View
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-4xl font-bold text-teal-400 mb-8">
                You've not completed the Steps!
              </p>
              <div className="mt-4 mb-6">
                If Completed, click the button below to process your data:
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleProcess}
                sx={{ bgcolor: "teal" }}
                className="mt-4 rounded-lg"
              >
                Process Data
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Views;
