//Apply for a seminar page
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import ApplyInput from "./ApplyInput";
import ApplyButton from "./ApplyButton";
import PersonalDetails from "./ApplyForm/PersonalDetails";
import Education from "./ApplyForm/Education";
import WorkPage from "./ApplyForm/Work";
import TechnicalSkills from "./ApplyForm/TechnicalSkills";
import Hobbies from "./ApplyForm/Hobbies";
import SeminarsPage from "./ApplyForm/Seminars";
import Volunteering from "./ApplyForm/Volunteering";

function Apply() {
  const userKind = "user";

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-[#e5e5e5] h-screen min-h-screen max-h-screen overflow-auto scrollbar-hide font-noi">
      <Navbar isAuthenticated={true} userKind={userKind} />
      <div className="items-center h-full w-full flex-1 justify-start">
        <Sidebar onCategoryChange={handleCategoryChange} />
        <div className="w-full h-full flex flex-col justify-start m-auto gap-6">
          <h1 className="text-center font-bold text-[#143727] text-4xl mt-24 break-words">
            {selectedCategory === "" ? "Personal Details" : selectedCategory}
          </h1>
          {selectedCategory === "Personal Details" ? (
            <PersonalDetails />
          ) : selectedCategory === "Education" ? (
            <Education />
          ) : selectedCategory === "Work Experience" ? (
            <WorkPage />
          ) : selectedCategory === "Technical Skills" ? (
            <TechnicalSkills />
          ) : selectedCategory === "Hobbies" ? (
            <Hobbies />
          ) : selectedCategory === "Seminars & Certified Courses" ? (
            <SeminarsPage />
          ) : selectedCategory === "Projects & Volunteering" ? (
            <Volunteering />
          ) : (
            <PersonalDetails />
          )}
        </div>
      </div>
    </div>
  );
}
export default Apply;
