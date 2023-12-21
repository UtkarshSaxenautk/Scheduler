import { useEffect, useState } from "react";
import axios from "axios";
import "./Timetable.css"; // Import a CSS file for styling
import { BookLoaderComponent } from "../util/Preloader";

const ClassTimeTable = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [selectedName, setSelectedName] = useState("B.Tech-CSE-2(I)");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTimetableData(selectedName);
  }, [selectedName]);

  const fetchTimetableData = (className) => {
    setIsLoading(true);

    // Simulate fetching data using axios
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/getClassView/${className}`)
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
            "B.Tech-CSE-2(I)",
            "B.Tech-CSE-2(II)",
            "B.Tech-CSE-4(II)",
            "B.Tech-CSE-4(I)",
            "MCA-4",
            "MCA-2",
            "BCA-4(II)",
            "BCA-4(I)",
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
  console.log(timetableData);
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
  console.log(timetableGrid);

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

export default ClassTimeTable;
