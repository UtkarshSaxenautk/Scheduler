import { useEffect, useState } from "react";
import axios from "axios";
import "./Timetable.css"; // Import a CSS file for styling
import { BookLoaderComponent } from "../util/Preloader";

const TeacherTimeTable = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [selectedName, setSelectedName] = useState("Teacher1");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTimetableData(selectedName);
  }, [selectedName]);

  const fetchTimetableData = (teacherName) => {
    setIsLoading(true);

    // Simulate fetching data using axios
    axios
      .get(`${import.meta.env.BASE_URL}/getTeacherView/${teacherName}`)
      .then((response) => {
        setTimetableData(response.data.res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  const handleRoomChange = (name) => {
    setSelectedName(name);
  };

  const handleGenerateClick = () => {
    fetchTimetableData(selectedName);
  };

  return (
    <div className="timetable-container">
      <h1>Timetable</h1>
      <div className="dropdown-container">
        <label htmlFor="roomDropdown">Select Room: </label>
        <select
          id="roomDropdown"
          value={selectedName}
          onChange={(e) => handleRoomChange(e.target.value)}
        >
          {[
            "Teacher1",
            "Teacher2",
            "Teacher3",
            "Teacher4",
            "Teacher5",
            "Teacher6",
            "Teacher7",
            "Teacher8",
            "Teacher9",
            "Teacher10",
            "Teacher11",
            "Teacher12",
            "Teacher13",
            "Teacher14",
            "Teacher15",
            "Teacher16",
            "Teacher17",
            "Teacher18",
            "Teacher19",
            "Teacher20",
            "Teacher21",
            "Teacher22",
            "Teacher23",
            "Teacher24",
            "Teacher25",
            "Teacher26",
            "Teacher27",
            "Teacher28",
            "Teacher29",
            "Teacher30",
            "Teacher31",
            "Teacher32",
            "Teacher33",
            "Teacher34",
            "Teacher35",
            "Teacher36",
            "Teacher37",
            "Teacher38",
          ].map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button onClick={handleGenerateClick}>Generate</button>
      </div>

      {isLoading ? (
        <div className="text-center flex justify-center">
          <BookLoaderComponent />
        </div>
      ) : (
        <TimetableGrid timetableData={timetableData} />
      )}
    </div>
  );
};

const TimetableGrid = ({ timetableData }) => {
  const [timetableGrid, setTimetableGrid] = useState([]);
  const days = Array.from({ length: 5 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i + 1);

  useEffect(() => {
    if (!Array.isArray(timetableData)) {
      console.log("Error: Timetable data is not in the expected format.");
      return;
    }

    const newTimetableGrid = Array.from({ length: hours.length }, () =>
      Array.from({ length: days.length }, () => null)
    );

    timetableData.forEach((item) => {
      let [r, day, hour] = item[0].split(" ").map(Number);
      if (hour < 9) {
        hour = hour + 12;
      }
      const dayIndex = days.indexOf(day);
      const hourIndex = hours.indexOf(hour);
      if (dayIndex !== -1 && hourIndex !== -1) {
        newTimetableGrid[hourIndex][dayIndex] = item;
      }
    });

    setTimetableGrid(newTimetableGrid);
  }, [timetableData]);

  return (
    <table className="timetable">
      <thead>
        <tr>
          <th></th>
          {days.map((day, index) => (
            <th key={index}>{`Day ${day}`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {hours
          .filter((hour) => hour >= 9 && hour < 17)
          .map((hour, hourIndex) => (
            <tr key={hour}>
              <td>{`${hour}:00 - ${hour + 1}:00`}</td>
              {timetableGrid[hour - 1] &&
                timetableGrid[hour - 1].map((event, dayIndex) => (
                  <td key={dayIndex}>
                    {event ? (
                      <div className="event">
                        {`${event[1].subject.Class_Name}`}
                        <br />
                        {`${event[1].subject.Subject_Name}`}
                        <br />
                        {event[1].room ? (
                          <>
                            {`${event[1].room.Room_No} : ${event[1].room.Building}`}
                          </>
                        ) : (
                          <>
                            {`${event[1].lab.Lab_Name} : ${event[1].lab.Building}`}
                          </>
                        )}
                      </div>
                    ) : (
                      "-----"
                    )}
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TeacherTimeTable;
