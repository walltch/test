import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MemberRegistration from "./views/MemberRegistration";
import GymSelection from "./views/GymSelection";
import MachineSelection from "./views/MachineSelection";
import ReservationConfirmation from "./views/ReservationConfirmation";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MemberRegistration />}></Route>
        <Route path="/gym" element={<GymSelection />}></Route>
        <Route path="/machine" element={<MachineSelection />}></Route>
        <Route
          path="/reservation/confirmation"
          element={<ReservationConfirmation />}
        ></Route>
      </Routes>
    </Router>
  );
}
