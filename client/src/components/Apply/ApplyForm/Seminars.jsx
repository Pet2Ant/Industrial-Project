import Calendar from "react-calendar";
import { useState } from "react";
import Input from "../ApplyInput";
import "react-calendar/dist/Calendar.css";
import Button from "../CalendarButton";
import axios from "axios";
import Popup from "../../Popup/Popup";

function SeminarsPage() {
  const [seminar, setSeminar] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [showCalendar, setShowCalendar] = useState(false);
  const seminarId = localStorage.getItem("seminar");

  const startDate = dateRange[0];
  const endDate = dateRange[1];
  const handleInputChange = (event) => {
    setSeminar(event.target.value);
    if (event.target.value.length > 0) {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
    }
  };

  const handleDateChange = (dateRange) => {
    setDateRange(dateRange);
  };

  // save inputs to local storage
  const saveInputsToLocalStorage = () => {
    localStorage.setItem("seminarName", seminar);
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
  };

  const handleSeminars = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/seminars", {
        seminar,
        startDate,
        endDate,
        seminarId,
      });
      console.log(response);
      Popup({
        title: "Success!",
        text: "You have successfully added your seminars!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log("There was an error!", error);
      Popup({
        title: "Error!",
        text: "There was an error adding your seminars.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <form className="w-3/4 mx-auto">
        <h2 className="text-xl font-bold text-center mt-8 mb-4">
          Please enter any seminars or certified courses you may have
          participated in. (optional)
        </h2>
        <Input
          name="seminar"
          setName={setSeminar}
          placeholder="Enter any seminar or certified course you may have participated in. (optional)"
          handleWorkChange={handleInputChange}
          type="text"
          id="seminar"
        />
        {showCalendar && (
          <div>
            <h2 className="text-xl font-bold text-center mt-8 mb-4">
              Please select the date range for which you participated:
            </h2>
            <Calendar
              selectRange
              minDetail="year"
              maxDetail="month"
              next2Label={null}
              prev2Label={null}
              nextLabel={null}
              prevLabel={null}
              className={"mx-auto my-calendar"}
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
        {startDate && endDate && (
          <Button onClick={handleSeminars} buttonName={"Add"} />
        )}
      </form>
    </div>
  );
}

export default SeminarsPage;
