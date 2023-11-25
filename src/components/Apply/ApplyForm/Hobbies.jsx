import React from "react";
import { useState } from "react";
import ApplyInput from "../ApplyInput";
import Button from "../CalendarButton";
import ApplyButton from "../ApplyButton";

function Hobbies() {
  const [hobbies, setHobbies] = useState("");
  const [achievements, setAchievements] = useState("");

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
        <Button buttonName={"Add"} />
      </form>
    </>
  );
}

export default Hobbies;
