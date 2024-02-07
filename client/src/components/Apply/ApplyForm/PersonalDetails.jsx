import React from "react";
import { useState, useEffect } from "react";
import ApplyInput from "../ApplyInput";
import ApplyButton from "../ApplyButton";
import axios from "axios";
import Popup from "../../Popup/Popup";
import { COUNTRIES } from "./Countries/countries";

function PersonalDetails({ setIsLoading }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [externalLinks, setExternalLinks] = useState("");
  const [education, setEducation] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const seminarId = localStorage.getItem("seminar");

  const phoneRegex = /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);


  const handlePersonalDetails = async (e) => {
    e.preventDefault();
    function showErrorPopup(title, text) {
      Popup({
        title: "Error!",
        text,
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    const inputs = {
      firstName: {
        value: firstName.trim(),
        rule: (value) => value.length > 2,
        message: "Please enter a valid name.",
      },
      lastName: {
        value: lastName.trim(),
        rule: (value) => value.length > 2,
        message: "Please enter a valid name.",
      },
      country: {
        value: country.trim(),
        rule: (value) =>
          COUNTRIES.some(
            (countryObj) =>
              countryObj.title.toLowerCase() === value.toLowerCase()
          ),
        message: "Please enter a valid country.",
      },
      city: {
        value: city.trim(),
        rule: (value) => value.length > 2,
        message: "Please enter a valid city.",
      },
      email: {
        value: email.trim(),
        rule: (value) => emailRegex.test(value),
        message: "Please enter a valid email address.",
      },
      phone: {
        value: phone.trim(),
        rule: (value) => phoneRegex.test(value),
        message: "Please enter a valid phone number.",
      },
    };

    let isValid = true;

    for (let key in inputs) {
      const { value, rule, message } = inputs[key];
      if (!value || !rule(value)) {
        showErrorPopup("Error!", `${message}`);
        isValid = false;
        return;
      }
    }

    if (isValid) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/personalDetails",
          {
            firstName,
            lastName,
            country,
            city,
            email,
            phone,
            externalLinks,
            education,
            seminarId,
          }
        );
        Popup({
          title: "Success!",
          text: "You have successfully added your personal details!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Popup({
          title: "Error!",
          text: "There was an error adding your personal details.",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    };
    }

    

  return (
    <form>
      <h2 className="text-xl font-bold text-center">
        Please add your personal details
      </h2>
      <div className="w-3/4 mx-auto flex md:flex-row flex-col p-4 gap-4">
        <ApplyInput
          name="Name"
          setName={setFirstName}
          placeholder="Enter your first name"
          type="text"
          id="name"
        />
        <ApplyInput
          name="Last Name"
          setName={setLastName}
          placeholder="Enter your last name"
          type="text"
          id="surname"
        />
      </div>
      <div className="w-3/4 mx-auto flex md:flex-row flex-col p-4 gap-4">
        <ApplyInput
          name="Country"
          setName={setCountry}
          placeholder="Enter your country"
          type="text"
          id="country"
        />
        <ApplyInput
          name="City"
          setName={setCity}
          placeholder="Enter your city"
          type="text"
          id="city"
        />
      </div>
      <div className="w-3/4 mx-auto flex md:flex-row flex-col p-4 gap-4">
        <ApplyInput
          name="Email"
          setName={setEmail}
          placeholder="Enter your email"
          type="email"
          id="email"
        />
        <ApplyInput
          name="Phone"
          setName={setPhone}
          placeholder="Enter your phone number"
          type="number"
          id="phone"
        />
      </div>
      <div className="w-3/4 mx-auto flex md:flex-row flex-col p-4 gap-4">
        <ApplyInput
          name="External Links"
          setName={setExternalLinks}
          placeholder="Add any links to external professional webpages such as Github or LinkedIn etc. (optional)."
          type="text"
          id="links"
        />
        <ApplyInput
          name="Education"
          setName={setEducation}
          placeholder="Give a brief personal statement describing your studies, experience & aspirations. (optional)"
          type="text"
          id="education"
        />
      </div>

      <div className="flex md:flex-row flex-col md:gap-12 gap-2 justify-between mx-auto w-1/2 min-w-24 pb-12">
        <ApplyButton onClick={handlePersonalDetails} buttonName="Save" />

      </div>
    </form>
  );
}

export default PersonalDetails;
