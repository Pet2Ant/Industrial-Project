import Calendar from "react-calendar";
import { useState } from "react";
import Input from "../ApplyInput";
import "react-calendar/dist/Calendar.css";
import Button from "../CalendarButton";

function SeminarsPage() {
  const [seminar, setSeminar] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleInputChange = (event) => {
    setSeminar(event.target.value);
    setShowCalendar(true);
  };

  const handleDateChange = (dateRange) => {
    setDateRange(dateRange);
  };

  return (
    <div>
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
      {dateRange[0] && dateRange[1] && (
        <Button buttonName={"Add"} />
      )}
    </div>
  );
}

export default SeminarsPage;
