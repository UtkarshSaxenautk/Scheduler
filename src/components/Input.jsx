import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    label: `Create Teacher Endpoint: "api/v1/createTeacher"`,
    description: `            Json POST Request:
    {
        "id": 1,
        "name": "teacherName",
        "fathers_name": "TeacherFName",
        "mobile_no": "776765657",
        "email": "xyz@gmail.com",
        "department": "CSE"
    }

    `,
  },
  {
    label: `Create Subject Endpoint: "api/v1/createInputSubject"`,
    description: `            Json POST Request:
    {
        "id": 1,
        "name": "subjectName",
        "course": "courseName",
        "code": "BTCS 705-17",
        "lecture": 2,
        "tutorial": 2,
        "practical": 0
    }

    `,
  },
  {
    label: `Create Class Endpoint: "api/v1/createClass"`,
    description: `            Json POST Request:
    {
        "id": 1,
        "name": "CSE-7",
        "program": "B.Tech",
        "semester": 7,
        "strength": 60,
    }

    `,
  },
  {
    label: `Create Room Endpoint: "api/v1/createRoom"`,
    description: `            Json POST Request:
    {
        "room_id": 1,
        "room_no": 511,
        "capacity": 60,
        "floor": 5,
        "building": "AB1,
    }

    `,
  },
  {
    label: `Create Lab Endpoint: "api/v1/createLab"`,
    description: `            Json POST Request:
    {
        "lab_id": 1,
        "lab_name": "cc1",
        "capacity": 90,
        "floor": 2,
        "building": "computer center",
    }

    `,
  },
];

export default function Generate() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const finish = () => {
    navigate("/views");
  };

  return (
    <div className="bg-teal-50 min-h-screen flex pt-10 pb-48 justify-center">
      <div className="bg-teal-50 shadow-green-200/80 flex flex-col items-center justify-center p-8  rounded shadow-md">
        <h1 className="mt-4 text-2xl font-semibold text-teal-400">
          Follow the steps and send data to API endpoints
        </h1>
        <Box
          sx={{
            maxWidth: 400,
            flexGrow: 1,
            width: "100%",
            marginTop: "2rem",
          }}
        >
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "background.default",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          >
            <Typography
              sx={{ display: "flex", justifyContent: "center" }}
              className="text-teal-700 font-extrabold text-center"
            >
              {steps[activeStep].label}
            </Typography>
          </Paper>
          <pre
            style={{
              height: 255,
              maxWidth: 400,
              width: "100%",
              p: 2,
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
              border: "1px solid #e0e0e0",
            }}
          >
            {steps[activeStep].description}
          </pre>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              activeStep === maxSteps - 1 ? (
                <Button size="small" onClick={finish}>
                  Finish {<KeyboardArrowRight />}
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {<KeyboardArrowRight />}
                </Button>
              )
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {<KeyboardArrowLeft />}
                Back
              </Button>
            }
          />
        </Box>
      </div>
    </div>
  );
}
