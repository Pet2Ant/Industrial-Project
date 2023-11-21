//Apply for a seminar page
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import ApplyInput from "./ApplyInput";
import ApplyButton from "./ApplyButton";

function Apply() {
  const userKind = "user";

  const [selectedCategory, setSelectedCategory] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [externalLinks, setExternalLinks] = useState("");
  const [education, setEducation] = useState("");
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-[#143727] h-screen min-h-screen max-h-screen overflow-y-clip">
      <Navbar isAuthenticated={true} userKind={userKind} />
      <div className="h-full flex flex-col justify-center">
        <div className="flex flex-row justify-around overflow-hidden items-stretch items-center w-full">
          <div className="flex flex-col items-center p-5 justify-center rounded-xl ml-20 gap-6 px-1 mt-1 w-1/6 bg-[#563B40] ">
            <Sidebar onCategoryChange={handleCategoryChange} />
          </div>
          <div className="w-2/3 flex flex-col justify-center">
            <h1 className="text-center font-bold text-[#e5e5e5] text-4xl mb-4">
              {/*Display Personal details first, and if selectedCategories is Personal Details, instead display the selectedCategory*/}
              {selectedCategory === "" ? "Personal Details" : selectedCategory}
            </h1>
            <div className="flex flex-col ml-10 bg-[#D1C79D] w-5/6 rounded-xl sm:mx-auto">
              {/* Content based on selected category goes here */}
              <div className="flex flex-col ">
                <div className="flex  p-4 gap-4">
                  <ApplyInput
                    name="Name"
                    setName={setFirstName}
                    placeholder="Enter your first name"
                    type="name"
                    id="name"
                  />
                  <ApplyInput
                    name="Last Name"
                    setName={setLastName}
                    placeholder="Enter your last name"
                    type="surname"
                    id="surname"
                  />
                </div>
                <div className="flex p-4 gap-4">
                  <ApplyInput
                    name="Country"
                    setName={setCountry}
                    placeholder="Enter your country"
                    type="country"
                    id="country"
                  />
                  <ApplyInput
                    name="City"
                    setName={setCity}
                    placeholder="Enter your city"
                    type="city"
                    id="city"
                  />
                </div>
                <div className="flex  p-4 gap-4">
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
                    type="phone"
                    id="phone"
                  />
                </div>
                <div className="flex s p-4 gap-4">
                  <ApplyInput
                    name="External Links"
                    setName={setExternalLinks}
                    placeholder="Add any links to external professional webpages such as Github or LinkedIn etc. (optional)."
                    type="links"
                    id="links"
                  />
                  <ApplyInput
                    name="Education"
                    setName={setEducation}
                    placeholder="Give a brief personal statement describing your studies, experience & aspirations. (optional)"
                    type="education"
                    id="education"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-12 justify-between mt-4">
              <ApplyButton buttonName="ogfdofdgk" />
              <ApplyButton buttonName="ogfdofdgk" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Apply;
