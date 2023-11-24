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
      <div className="items-center h-full w-full pt-[35rem] lg:pt-0 sm:pt-[40rem] md:pt-[5rem] ">
        <Sidebar onCategoryChange={handleCategoryChange} />
        <div className="w-2/3 h-full flex flex-col justify-center m-auto gap-6">
            <h1 className="text-center font-bold text-[#143727] text-4xl mb-4 break-words">
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

            <div className="flex md:flex-row flex-col md:gap-12 gap-2 justify-between mx-auto w-full min-w-24 pb-12">
              <ApplyButton buttonName="Save" />
              <ApplyButton buttonName="Cancel" />
            </div>

        </div>
      </div>
    </div>
  );
}
export default Apply;
