import React from "react";
import { useState } from "react";
import ApplyInput from "../ApplyInput";
import ApplyButton from "../ApplyButton";

function PersonalDetails() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [externalLinks, setExternalLinks] = useState("");
  const [education, setEducation] = useState("");

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
            <ApplyButton buttonName="Save" />
            <ApplyButton buttonName="Cancel" />
          </div>
    </form>
  );
}

export default PersonalDetails;
