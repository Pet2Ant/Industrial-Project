import React, { useState } from "react";
import Calendar from "react-calendar";
import Input from "../ApplyInput";
import "react-calendar/dist/Calendar.css";
import Button from "../CalendarButton";

function WorkPage() {
  const [workPlace, setWorkPlace] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [experience, setExperience] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  const handleInputChange = (event) => {
    setWorkPlace(event.target.value);
    setShowCalendar(true);
  };

  const handleDateChange = (dateRange) => {
    setDateRange(dateRange);
  };

  return (
    <div className="">
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
            className={"mx-auto"}
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
          <Button buttonName="Add Work" />
        </div>
      )}
    </div>
  );
}

export default WorkPage;
