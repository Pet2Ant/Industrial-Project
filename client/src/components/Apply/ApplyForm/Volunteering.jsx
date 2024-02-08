import Calendar from "react-calendar";
import { useState } from "react";
import Input from "../ApplyInput";
import "react-calendar/dist/Calendar.css";
import Button from "../CalendarButton";
import axios from "axios";
import Popup from "../../Popup/Popup";
import { useNavigate } from "react-router-dom";

function Volunteering() {
  const [volunteer, setVolunteer] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [showCalendar, setShowCalendar] = useState(false);
  const seminarId = localStorage.getItem("seminar");
  const navigate = useNavigate();

  const startDate = dateRange[0];
  const endDate = dateRange[1];
  const handleInputChange = (event) => {
    setVolunteer(event.target.value);
    if (event.target.value.length > 0) {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
    }
  };

  const endpoints = [
    "personalDetails",
    "education",
    "hobbies",
    "seminars",
    "technicalSkills",
    "volunteering",
    "work",
  ];

  const handleDateChange = (dateRange) => {
    setDateRange(dateRange);
  };

  const handleVolunteering = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/volunteering",
        {
          volunteer,
          startDate,
          endDate,
          seminarId,
        }
      );
      Popup({
        title: "Success!",
        text: "You have successfully added your volunteering work!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Popup({
        title: "Error!",
        text: "There was an error adding your volunteering work.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const deleteVolunteering = async (e) => {


    let headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    let params = {
      seminarId: seminarId,
    };

    let data = {};
    try {
      await Promise.all(
        endpoints.map((endpoint) =>
          axios
            .delete(`http://localhost:8080/api/${endpoint}/delete`, {
              headers,
              params,
            })
            .then((response) => {
              data[endpoint] = response.data;
            })
        )
      );
      Popup({
        title: "Success!",
        text: "You have successfully cancelled your application.",
        icon: "success",
        showConfirmButton: true,
        showCloseButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showDenyButton: true,
        confirmButtonText: "Try Again",
        denyButtonText: "Go to Main Page",
        confirmFunction: () => {
          localStorage.removeItem("seminar");
          location.reload();
        },
        cancelFunction: () => {
          localStorage.removeItem("seminar");
          navigate("/");
        },
        anotherFunction: () => {
          return;
        },
      });
    } catch (error) {
      console.log(error);
      Popup({
        title: "Error!",
        text: "There was an error deleting your volunteering work.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
      
    }
  };

  const updateDetails = (updatedData) => {
    
    let headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    let params = {
      seminarId: seminarId,
    };


    Promise.all(
      endpoints.map((endpoint) =>
        axios.put(`http://localhost:8080/api/${endpoint}/update`, updatedData, {
          headers,
          params,
        })
        .then((response) => {
          localStorage.removeItem("seminar");
          Popup({
            title: "Success!",
            text: "Your application was completed successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        })
      )
    )
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
      Popup({
        title: "Error!",
        text: "There was an error submitting your application.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    });
  };

  return (
    <div>
      <div className="w-3/4 mx-auto">
        <h2 className="text-xl font-bold text-center mt-8 mb-4">
          Please enter any project or volunteering work you may have done.
          (optional)
        </h2>
        <Input
          name="volunteer"
          setName={setVolunteer}
          placeholder="Enter any project or volunteering work you may have done. (optional)"
          handleWorkChange={handleInputChange}
          type="text"
          id="volunteer"
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
        <div className="flex justify-center">
          {startDate && endDate && (
            <Button onClick={handleVolunteering} buttonName={"Add"} />
          )}
        </div>
        <div className="flex flex-row justify-center items-center md:gap-16 gap-4">
          <Button
            id="submit"
            className=""
            buttonName={"Submit"}
            onClick={() => updateDetails()}
          />
          <Button
            id="delete"
            className=""
            buttonName={"Cancel"}
            onClick={() => deleteVolunteering()}
          />
        </div>
      </div>
    </div>
  );
}

export default Volunteering;
