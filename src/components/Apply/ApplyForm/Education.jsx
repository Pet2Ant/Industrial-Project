import React from "react";
import { useState } from "react";
import ApplyRadioButton from "../ApplyRadio";

function PersonalDetails() {
    const [education, setEducation] = useState("");
    

    return (
        <div className="flex flex-col">
            <h1 className="text-center font-semibold text-[#143727] text-xl mb-4">
                Please choose your highest level of education
            </h1>
            <div className="flex md:flex-row justify-center gap-4">
                <ApplyRadioButton
                    name="High School"
                    value={education}
                    setValue={setEducation}
                />
                
                </div>
        </div>
    )

}

export default PersonalDetails;
