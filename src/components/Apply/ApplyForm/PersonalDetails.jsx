import React from "react";
import { useState } from "react";
import ApplyInput from "../ApplyInput";

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
        <>
            <div className="flex md:flex-row flex-col p-4 gap-4">
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
            <div className="flex md:flex-row flex-col p-4 gap-4">
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
            <div className="flex md:flex-row flex-col p-4 gap-4">
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
            <div className="flex md:flex-row flex-col p-4 gap-4">
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
        </>
    )

}

export default PersonalDetails;
