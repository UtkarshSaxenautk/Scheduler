import { useEffect, useState } from "react";
import axios from "axios";
import "./Timetable.css"; // Import a CSS file for styling
import { BookLoaderComponent } from "../util/Preloader";

const TimeTable = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTimetableData(selectedRoomId);
  }, [selectedRoomId]);

  const fetchTimetableData = (roomId) => {
    setIsLoading(true);

    // Simulate fetching data using axios
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/getRoomView/${roomId}`)
      .then((response) => {
        setTimetableData(response.data.res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  const handleRoomChange = (roomId) => {
    setSelectedRoomId(roomId);
  };

  const handleGenerateClick = () => {
    fetchTimetableData(selectedRoomId);
  };

  return (
    <div className="timetable-container">
      <h1>Timetable</h1>
      <div className="dropdown-container">
        <label htmlFor="roomDropdown">Select Room: </label>
        <select
          id="roomDropdown"
          value={selectedRoomId}
          onChange={(e) => handleRoomChange(e.target.value)}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((roomId) => (
            <option key={roomId} value={roomId}>
              Room {roomId}
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
  const [roomName, setRoomName] = useState("");

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
        setRoomName(item[1].room.Room_No);
        newTimetableGrid[hourIndex][dayIndex] = item;
      }
    });

    setTimetableGrid(newTimetableGrid);
  }, [timetableData]);

  return (
    <div>
      <h1 className="text-teal-600 text-3xl text-center">{roomName}</h1>

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
    </div>
  );
};

export default TimeTable;
