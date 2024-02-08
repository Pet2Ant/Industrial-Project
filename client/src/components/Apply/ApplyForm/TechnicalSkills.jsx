import React from "react";
import { useState } from "react";
import ApplyInput from "../ApplyInput";
import Button from "../CalendarButton";
import axios from "axios";
import Popup from "../../Popup/Popup";

function TechnicalSkills() {
  const [technicalSkills, setTechnicalSkills] = useState("");
  const seminarId = localStorage.getItem("seminar");

  const handleTechnicalSkills = (e) => {
    e.preventDefault();
    try {
      if (technicalSkills.length < 3) {
        Popup({
          title: "Error!",
          text: "Please fill in your technical skills.",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }
      const response = axios.post("http://localhost:8080/api/technicalSkills", {
        technicalSkills,
        seminarId,
      });
      Popup({
        title: "Success!",
        text: "You have successfully added your technical skills!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Popup({
        title: "Error!",
        text: "There was an error adding your technical skills.",
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
          Please add your technical skills
        </h2>
        <ApplyInput
          name="Technical Skills"
          setName={setTechnicalSkills}
          placeholder="Add any technical skills, prioritizing the ones most relevant to the job you are applying for and the ones you have the most proficiency in."
          type="text"
          id="technicalSkills"
        />
        <div className="flex justify-center">
          <Button onClick={handleTechnicalSkills} buttonName={"Add"} />
        </div>
      </form>
    </>
  );
}

export default TechnicalSkills;
