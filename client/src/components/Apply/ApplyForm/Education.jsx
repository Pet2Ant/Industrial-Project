import React from "react";
import { useState, useEffect } from "react";
import RadioButton from "../ApplyRadio";
import ApplyButton from "../ApplyButton";
import Input from "../ApplyInput";
import axios from "axios";
import Popup from "../../Popup/Popup";

function Education() {
  // State variable for selected value
  const [education, setEducation] = useState("");

  // State variable for showing inputs
  const [showInputs, setShowInputs] = useState(false);

  // State variables for input values
  const [schoolName, setSchoolName] = useState("");
  const [schoolLocation, setSchoolLocation] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [universityLocation, setUniversityLocation] = useState("");
  const [degreeName, setDegreeName] = useState("");
  const [degreeYear, setDegreeYear] = useState("");
  const [thesisTitle, setThesisTitle] = useState("");
  const [dissertationTitle, setDissertationTitle] = useState("");
 
 
  // Function to handle change event
  const handleChange = (e) => {
    setEducation(e.target.value);
  };

  // Effect to update showInputs based on education
  useEffect(() => {
    if (education) {
      setShowInputs(true);
    } else {
      setShowInputs(false);
    }
  }, [education]);
  
  const handleEducation = async (e) => {
    e.preventDefault();
    function showErrorPopup() {
      Popup({
        title: "Error!",
        text: "Please fill in all the required fields.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
    
    const educationFields = {
      "High School": ["schoolName", "schoolLocation", "graduationYear"],
      "Bachelor's Degree": ["universityName", "universityLocation", "degreeName", "degreeYear"],
      "Master's Degree": ["universityName", "universityLocation", "degreeName", "degreeYear", "thesisTitle"],
      "PhD": ["universityName", "universityLocation", "degreeName", "degreeYear", "dissertationTitle"],
    };
    
    const requiredFields = educationFields[education];
    const seminarId = localStorage.getItem("seminar");
    
    if (requiredFields) {
      const missingField = requiredFields.find(field => !eval(field));
      if (missingField) {
        showErrorPopup();
        return;
      }
    }
    try {
      const response = await axios.post("http://localhost:8080/api/education", {
        education,
        schoolName,
        schoolLocation,
        graduationYear,
        universityName,
        universityLocation,
        degreeName,
        degreeYear,
        thesisTitle,
        dissertationTitle,
        seminarId,
      }
      
      );
      console.log(response);
      Popup({
        title: "Success!",
        text: "You have successfully added your education!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log("There was an error!", error);
      Popup({
        title: "Error!",
        text: "There was an error adding your education.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };


  return (
    <div className="md:grid grid-cols-12 gap-3 pb-4 w-3/4 mx-auto ">
      <h2 className="text-xl font-bold text-center col-span-12">
        Please enter your highest level of education
      </h2>
      <div className="col-span-6">
        <RadioButton
          id="default-radio-1"
          value="High School"
          name="education"
          label="High School"
          checked={education === "High School"}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-6">
        <RadioButton
          id="default-radio-2"
          value="Bachelor's Degree"
          name="education"
          label="Bachelor's Degree"
          checked={education === "Bachelor's Degree"}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-6">
        <RadioButton
          id="default-radio-3"
          value="Master's Degree"
          name="education"
          label="Master's Degree"
          checked={education === "Master's Degree"}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-6">
        <RadioButton
          id="default-radio-4"
          value="PhD"
          name="education"
          label="PhD"
          checked={education === "PhD"}
          onChange={handleChange}
        />
      </div>
      {/* Conditional rendering of inputs based on showInputs */}
      {showInputs && (
        <form className="col-span-12">
          <h2 className="text-xl font-bold text-center mt-8 mb-4">
            Please provide more details about your education
          </h2>
          {/* Switch case to render different inputs based on education */}
          {(() => {
            switch (education) {
              case "High School":
                return (
                  <div className="flex flex-col gap-2">
                    <Input
                      name="school-name"
                      setName={setSchoolName}
                      placeholder="Name of your school"
                      type="text"
                      id="school-name"
                    />
                    <Input
                      name="school-location"
                      setName={setSchoolLocation}
                      placeholder="Location of your school"
                      type="text"
                      id="school-location"
                    />
                    <Input
                      name="graduation-year"
                      setName={setGraduationYear}
                      placeholder="Year of graduation"
                      type="year"
                      id="year"
                    />
                  </div>
                );
              case "Bachelor's Degree":
                return (
                  <div className="flex flex-col gap-2">
                    <Input
                      name="university-name"
                      setName={setUniversityName}
                      placeholder="Name of your university"
                      type="text"
                      id="school-name"
                    />
                    <Input
                      name="university-location"
                      setName={setUniversityLocation}
                      placeholder="Location of your university"
                      type="text"
                      id="school-location"
                    />
                    <Input
                      name="degree-name"
                      setName={setDegreeName}
                      placeholder="Name of your degree"
                      type="text"
                      id="degree-name"
                    />
                    <Input
                      name="degree-year"
                      setName={setDegreeYear}
                      placeholder="Year of completion"
                      type="number"
                      id="year"
                    />
                  </div>
                );
              case "Master's Degree":
                return (
                  <div className="flex flex-col gap-2">
                    <Input
                      name="university-name"
                      setName={setUniversityName}
                      placeholder="Name of your university"
                      type="text"
                      id="school-name"
                    />
                    <Input
                      name="university-location"
                      setName={setUniversityLocation}
                      placeholder="Location of your university"
                      type="text"
                      id="school-location"
                    />
                    <Input
                      name="degree-name"
                      setName={setDegreeName}
                      placeholder="Name of your degree"
                      type="text"
                      id="degree-name"
                    />
                    <Input
                      name="degree-year"
                      setName={setDegreeYear}
                      placeholder="Year of completion"
                      type="number"
                      id="year"
                    />
                    <Input
                      name="thesis-title"
                      setName={setThesisTitle}
                      placeholder="Title of your thesis"
                      type="text"
                      id="thesis-title"
                    />
                  </div>
                );
              case "PhD":
                return (
                  <div className="flex flex-col gap-2">
                    <Input
                      name="university-name"
                      setName={setUniversityName}
                      placeholder="Name of your university"
                      type="text"
                      id="school-name"
                    />
                    <Input
                      name="university-location"
                      setName={setUniversityLocation}
                      placeholder="Location of your university"
                      type="text"
                      id="school-location"
                    />
                    <Input
                      name="degree-name"
                      setName={setDegreeName}
                      placeholder="Name of your degree"
                      type="text"
                      id="degree-name"
                    />
                    <Input
                      name="degree-year"
                      setName={setDegreeYear}
                      placeholder="Year of completion"
                      type="number"
                      id="year"
                    />
                    <Input
                      name="dissertation-title"
                      setName={setDissertationTitle}
                      placeholder="Title of your dissertation"
                      type="text"
                      id="dissertation-title"
                    />
                  </div>
                );
              default:
                return null;
            }
          })()}
          <div className="flex md:flex-row flex-col md:gap-12 gap-2 justify-between mx-auto w-1/2 min-w-24 pb-12">
          <ApplyButton onClick={handleEducation} buttonName="Save" />
            <ApplyButton onClick={() => window.location.reload()} buttonName="Cancel" />
          </div>
        </form>
      )}
    </div>
  );
}

export default Education;
