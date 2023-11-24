import React from "react";
import { useState } from "react";
import ApplyInput from "../ApplyInput";
import Button from "../CalendarButton";

function TechnicalSkills() {
    const [technicalSkills, setTechnicalSkills] = useState("");


    return (
        <>
            <div className="flex flex-col p-4 gap-4 w-1/2 mx-auto">
                <ApplyInput
                    name="Technical Skills"
                    setName={setTechnicalSkills}
                    placeholder="Add any technical skills, prioritizing the ones most relevant to the job you are applying for and the ones you have the most proficiency in."
                    type="text"
                    id="technicalSkills"
                />
                <Button 
                buttonName={"Add"}
                />
            </div>
        </>
    )

}

export default TechnicalSkills;
