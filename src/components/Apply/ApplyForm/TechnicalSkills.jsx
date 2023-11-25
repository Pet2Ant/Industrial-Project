import React from "react";
import { useState } from "react";
import ApplyInput from "../ApplyInput";
import Button from "../CalendarButton";
import ApplyButton from "../ApplyButton";

function TechnicalSkills() {
  const [technicalSkills, setTechnicalSkills] = useState("");

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
        <Button buttonName={"Add"} />
      </form>
    </>
  );
}

export default TechnicalSkills;
