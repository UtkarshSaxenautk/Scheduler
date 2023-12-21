import Navigation from "./components/Navigation";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TimeTable from "./components/TimeTable";
import ClassTimeTable from "./components/ClassView";
import Guide from "./components/Guide";
import Click from "./components/Click";
import TeacherTimeTable from "./components/TeacherView";
import Generate from "./components/Input";
import Views from "./components/Views";
import Footer from "./components/Footer";
import { useState } from "react";
import { ReadyContext } from "./context";
import TeamSection from "./components/Contact";

const App = () => {
  const [ready, setReady] = useState(false);
  return (
    <div style={{ backgroundColor: "black" }}>
      <ReadyContext.Provider value={{ ready, setReady }}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/viewClass" element={<ClassTimeTable />} />
            <Route path="/viewTeacher" element={<TeacherTimeTable />} />
            <Route path="/viewRoom" element={<TimeTable />} />
            <Route path="/views" element={<Views />} />
            <Route path="/click" element={<Click />} />
            <Route path="/contact" element={<TeamSection />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ReadyContext.Provider>
    </div>
  );
};

export default App;
