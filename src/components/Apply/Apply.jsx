//Apply for a seminar page
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import ApplyInput from "./ApplyInput";
import ApplyButton from "./ApplyButton";
import PersonalDetails from "./ApplyForm/PersonalDetails";
import Education from "./ApplyForm/Education";
import Work from "./ApplyForm/Work";
import TechnicalSkills from "./ApplyForm/TechnicalSkills";
import Hobbies from "./ApplyForm/Hobbies";
import Seminars from "./ApplyForm/Seminars";
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
      <div className="flex flex-row justify-around  items-stretch items-center w-full">
        <div className="flex flex-col justify-center rounded-xl m-12 bg-[#563B40] md:flex hidden">
          <Sidebar onCategoryChange={handleCategoryChange} />
        </div>
        <div className="w-2/3 h-4/5 mt-24 flex flex-col justify-center m-auto">
          <h1 className="text-center font-bold text-[#143727] text-4xl mb-4">
            {selectedCategory === "" ? "Personal Details" : selectedCategory}
          </h1>
          <div className="flex flex-col justify-center ml-10 bg-transparent w-5/6 rounded-xl sm:mx-auto">
            {/* Content based on selected category goes here */}
            <div className="flex flex-col justify-center rounded-xl m-12 bg-[#563B40] md:hidden">
              <Sidebar onCategoryChange={handleCategoryChange} />
            </div>

{/* if selectedCategory === Personal Details show <PersonalDetails />, else if selectedCategory === "Education" show <Education />, else if selectedCategory === "Work Experience" show <Work />, else if selectedCategory === "Technical Skills" show <TechnicalSkills />, else if selectedCategory === "Hobbies" show <Hobbies />, else if selectedCategory === "Seminars & Certified Courses" show <Seminars />, else if selectedCategory === "Projects & Volunteering" show <Volunteering /> */}
            {selectedCategory === "Personal Details" ? (
              <PersonalDetails />
            ) : selectedCategory === "Education" ? (
              <Education />
            ) : selectedCategory === "Work Experience" ? (
              <Work />
            ) : selectedCategory === "Technical Skills" ? (
              <TechnicalSkills />
            ) : selectedCategory === "Hobbies" ? (
              <Hobbies />
            ) : selectedCategory === "Seminars & Certified Courses" ? (
              <Seminars />
            ) : selectedCategory === "Projects & Volunteering" ? (
              <Volunteering />
            ) : (
              <PersonalDetails />
            )}


          </div>
          <div className="flex flex-row gap-12 justify-between mt-4 mx-auto w-3/4 pb-12">
            <ApplyButton buttonName="Save" />
            <ApplyButton buttonName="Cancel" />
          </div>
        </div>
      </div>

    </div>
  );
}
export default Apply;
