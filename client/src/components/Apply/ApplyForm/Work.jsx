import React, { useState } from "react";
import Calendar from "react-calendar";
import Input from "../ApplyInput";
import "react-calendar/dist/Calendar.css";
import Button from "../CalendarButton";
import axios from "axios";
import Popup from "../../Popup/Popup";

function WorkPage() {
  const [workPlace, setWorkPlace] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [experience, setExperience] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  const handleInputChange = (event) => {
    setWorkPlace(event.target.value);
    if (event.target.value.length >= 3) {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
    }
  };

  const handleDateChange = (dateRange) => {
    setDateRange(dateRange);
  };

  const handleWork = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/work", {
        workPlace,
        dateRange,
        experience,
        responsibilities,
      });
      console.log(response);
      Popup({
        title: "Success!",
        text: "You have successfully added your work experience!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log("There was an error!", error);
      Popup({
        title: "Error!",
        text: "There was an error adding your work experience.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="">
      <div className="w-3/4 mx-auto ">
        <h2 className="text-xl font-bold text-center mt-8 mb-4">
          Please enter your previous workplace
        </h2>
        <Input
          name="workPlace"
          setName={setWorkPlace}
          placeholder="Enter your workplace"
          handleWorkChange={handleInputChange}
          type="text"
          id="workPlace"
        />
        {showCalendar && (
          <div>
            <h2 className="text-xl font-bold text-center mt-8 mb-4">
              Please select the date range for which you worked:
            </h2>
            <Calendar
              selectRange
              minDetail="year"
              maxDetail="month"
              next2Label={null}
              prev2Label={null}
              className={"mx-auto my-calendar mb-4"}
              formatShortWeekday={(locale, value) => {
                if (window.innerWidth < 640) {
                  return ["S", "M", "T", "W", "T", "F", "S"][value.getDay()];
                } else {
                  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                    value.getDay()
                  ];
                }
              }}
              value={dateRange}
              onChange={handleDateChange}
            />
          </div>
        )}

        {dateRange[0] && dateRange[1] && (
          <div>
            <h2 className="text-xl font-bold text-center mt-8 mb-4">
              Please provide more details about your work experience
            </h2>
            <Input
              name="experience"
              setName={setExperience}
              placeholder="Enter any work experience related roles or responsibilities you had in your previous workspace that are relevant to the position you are applying for. (optional)"
              type="text"
              id="experience"
            />
            <h2 className="text-xl font-bold text-center mt-8 mb-4">
              Please provide more details about your responsibilities
            </h2>
            <Input
              name="responsibilities"
              setName={setResponsibilities}
              placeholder="Mention 2-3 key responsibilities that are relevant to the vacancy, company or industry you are applying for."
              type="text"
              id="responsibilities"
            />
            <Button onClick={handleWork} buttonName="Add" />
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkPage;
