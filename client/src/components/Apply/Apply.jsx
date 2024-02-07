//Apply for a seminar page
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContext";
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
import Button from "./ApplyButton";
import Card from "./ApplyForm/Card";

function Apply() {
  const userKind = useContext(AppContext);

  const userKindString = JSON.stringify(userKind);
  const parsedUserKind = JSON.parse(userKindString);
  const extractedValue = parsedUserKind.user;

  const components = [
    <PersonalDetails />,
    <Education />,
    <WorkPage />,
    <TechnicalSkills />,
    <Hobbies />,
    <SeminarsPage />,
    <Volunteering />,
  ];
  const componentNames = [
    "Personal Details",
    "Education",
    "Work Experience",
    "Technical Skills",
    "Hobbies",
    "Seminars & Certified Courses",
    "Projects & Volunteering",
  ];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const [seminar, setSeminar] = useState(localStorage.getItem("seminar"));

  useEffect(() => {
    setSeminar(localStorage.getItem("seminar"));
  }, [localStorage.getItem("seminar")]);

  const ShowInputs = () => {
    return (
    <>
      <Sidebar onCategoryChange={handleCategoryChange} />
      <div className="w-full h-full flex flex-col justify-start m-auto gap-6">
        <h1 className="text-center font-bold text-[#143727] text-4xl mt-24 break-words">
          {componentNames[currentIndex]}
        </h1>
        {components[currentIndex]}
        <div className="w-2/6 mx-auto font-bold justify-center flex flex-row gap-16">
          <Button
            buttonName={"Previous"}
            onClick={() =>
              setCurrentIndex(
                (currentIndex - 1 + components.length) % components.length
              )
            }
          />
          <Button
            buttonName={"Next"}
            onClick={() =>
              setCurrentIndex((currentIndex + 1) % components.length)
            }
          />
        </div>
      </div>
    </>
    );
  };

  const ShowCards = () => {
    return (
      <>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:grid-rows-2 px-4 gap-12 my-24">
          <Card seminarId="1" setSeminar={setSeminar}/>
          <Card seminarId="2" setSeminar={setSeminar}/>
          <Card seminarId="3" setSeminar={setSeminar}/>
          <Card seminarId="4" setSeminar={setSeminar}/>
          <Card seminarId="5" setSeminar={setSeminar}/>
          <Card seminarId="6" setSeminar={setSeminar}/>
        </div>
      </>
    );
  };

  return (
    <div className="bg-[#e5e5e5] h-screen min-h-screen max-h-screen overflow-auto scrollbar-hide font-noi">
      <Navbar isAuthenticated={true} userKind={extractedValue} />
      <div className="items-center h-full w-full flex-1 justify-start">
        {seminar ? <ShowInputs /> : <ShowCards setSeminar={setSeminar} />}
      </div>
    </div>
  );
}
export default Apply;
