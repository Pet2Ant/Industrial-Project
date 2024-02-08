//Apply for a seminar page
import React, { useState, useEffect } from "react";
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
import { jwtDecode } from "jwt-decode";
import axios  from "axios";
function Apply() {
  const [userKind, setUserKind] = useState("");
  const [seminarIds, setSeminarIds] = useState([]);
  const arr = [1,2,3,4,5,6];

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
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = JSON.stringify(decodedToken.roles).slice(2, -2);
      setUserKind(role);
    }
    setSeminar(localStorage.getItem("seminar"));
  }, [localStorage.getItem("seminar")]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`/api/personalDetails/seminarId`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setSeminarIds(response.data);
        console.log("Seminars ids",seminarIds);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}, []);


  
  console.log(seminarIds)


  const sideBarFunction = (selectedCategory) => {
    console.log("selectedCategory", selectedCategory);
    // if selected category is "Personal Details",
    switch (selectedCategory) {
      case "Personal Details":
        setCurrentIndex(0);
        setSelectedCategory("");
        return <PersonalDetails />;
      case "Education":
        setCurrentIndex(1);
        setSelectedCategory("");
        return <Education />;
      case "Work Experience":
        setCurrentIndex(2);
        setSelectedCategory("");
        return <WorkPage />;
      case "Technical Skills":
        setCurrentIndex(3);
        setSelectedCategory("");
        return <TechnicalSkills />;
      case "Hobbies":
        setCurrentIndex(4);
        setSelectedCategory("");
        return <Hobbies />;
      case "Seminars & Certified Courses":
        setCurrentIndex(5);
        setSelectedCategory("");
        return <SeminarsPage />;
      case "Projects & Volunteering":
        setCurrentIndex(6);
        setSelectedCategory("");
        return <Volunteering />;
      default:
        setCurrentIndex(0);
        setSelectedCategory("");
        return <PersonalDetails />;
    }
  };

  const ShowInputs = () => {
    return (
      <>
        <Sidebar onCategoryChange={handleCategoryChange} />
        <div className="w-full h-full flex flex-col justify-start m-auto gap-6">
          <h1 className="text-center font-bold text-[#143727] text-4xl mt-24 break-words">
            {componentNames[currentIndex] ||
              (selectedCategory === "" ? "Personal Details" : selectedCategory)}
          </h1>

          {/* if selected category is clicked, then do sidebarfunction, else components[currentIndex] */}
          {selectedCategory
            ? sideBarFunction(selectedCategory)
            : components[currentIndex]}
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

  const generateCards = () => {
    return arr.filter(id => !seminarIds.includes(id)).map((id) => {
        return <Card seminarId={id} setSeminar={setSeminar} applied={true} />;
    });
  }


  const ShowCards = () => {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 grid-rows-1 px-4 gap-12 mt-48 content-center">
          {generateCards()}
        </div>
      </>
    );
  };
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'You have unsaved changes, are you sure you want to leave?';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  return (
    <div className="bg-[#e5e5e5] h-screen min-h-screen max-h-screen overflow-auto scrollbar-hide font-noi">
      <Navbar isAuthenticated={true} userKind={userKind} />
      <div className="items-center h-full w-full flex-1 justify-start">
        {seminar ? <ShowInputs /> : <ShowCards setSeminar={setSeminar} />}
      </div>
    </div>
  );
}
export default Apply;
