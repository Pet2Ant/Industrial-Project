import React from "react";
import { useState } from "react";
import ApplyInput from "../ApplyInput";
import Button from "../CalendarButton";
import axios from "axios";
import Popup from "../../Popup/Popup";

function Hobbies() {
  const [hobbies, setHobbies] = useState("");
  const [achievements, setAchievements] = useState("");
  const seminarId = localStorage.getItem("seminar");

  const handleHobbies = (e) => {
    e.preventDefault();
    try {
      const response = axios.post("http://localhost:8080/api/hobbies", {
        hobbies,
        achievements,
        seminarId,
      });
      Popup({
        title: "Success!",
        text: "You have successfully added your hobbies and achievements!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Popup({
        title: "Error!",
        text: "There was an error adding your hobbies and achievements.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <form className="flex flex-col p-4 gap-4 w-3/4 mx-auto">
        <h2 className="text-xl font-bold text-center mt-8">
          Please add your hobbies and achievements. (optional)
        </h2>
        <ApplyInput
          name="Hobbies"
          setName={setHobbies}
          placeholder="Mention 1-2 hobbies that are relevant to the industry you wish to work for. (optional)"
          type="text"
          id="hobbies"
        />
        <ApplyInput
          name="Achievements"
          setName={setAchievements}
          placeholder="Describe your role and actions, in context of your achievements. (optional)"
          type="text"
          id="achievements"
        />
        <div className="flex justify-center">
          <Button onClick={handleHobbies} buttonName={"Add"} />
        </div>
      </form>
    </>
  );
}

export default Hobbies;
