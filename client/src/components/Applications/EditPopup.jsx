import React, { useState } from "react";
import {Popup as FormPopup} from "reactjs-popup";
import ApplyInput from "../Apply/ApplyInput";
import Warper from "./Warper";
import Button from "../Apply/ApplyButton";
import Popup from "../Popup/Popup";

function EditPopup({
  firstName,
  lastName,
  pronouns,
  age,
  educationLevel,
  email,
  interests,
}) {
  const [headerText, setHeaderText] = useState("");
  const contentStyle = {
    maxWidth: "600px",
    width: "90%",
    // make scrollable
    maxHeight: "90vh",
    overflowY: "auto",
    overflowX: "hidden",
  };

  const saveChanges = () => {
    return (
      Popup({
        title: "Success!",
        text: `You have successfully edited ${firstName + " " + lastName}'s information!`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      })
    )
  };


  return (
    <FormPopup
      trigger={
        <button className="bg-[#143727] text-[#e5e5e5] p-3 my-2 rounded-md w-28 text-center min-w-max font-oni transition duration-500 ease-in-out hover:scale-105 hover:bg-[#ffcf07] hover:text-[#143727] focus:bg-[#ffcf07] focus:text-[#143727]">
          Edit User
        </button>
      }
      modal
      lockScroll={true}
      contentStyle={contentStyle}
      nested
    >
      {(close) => (
        <div className="modal">
          <div className="absolute -top-0.5 right-4 text-2xl select-none cursor-pointer" onClick={close}>
            &times;
          </div>
          <div className="header"> Edit User Information </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              saveChanges();
              close();
            }}
          className="flex flex-col items-center w-full mx-auto justify-center p-6 font-noi gap-2">
            <div className="flex flex-wrap justify-between mx-auto w-full break-words">
              <h1 className="text-[#103022] text-xl font-semibold">
                Current Name:
              </h1>
              <p className="text-[#103022] text-lg font-light mr-4">
                {firstName + " " + lastName}
              </p>
            </div>
            <ApplyInput
              name="Name"
              setName={setHeaderText}
              placeholder={`Edit ${firstName + " " + lastName}'s name`}
              type="text"
              id="editName"
            />
            <div className="flex flex-wrap justify-between mx-auto w-full break-words">
              <h1 className="text-[#103022] text-xl font-semibold">
                Current Pronouns:
              </h1>
              <p className="text-[#103022] text-lg font-light mr-4">
                {pronouns}
              </p>
            </div>
            <ApplyInput
              name="Pronouns"
              setName={setHeaderText}
              placeholder={`Edit ${firstName + " " + lastName}'s pronouns`}
              type="text"
              id="editPronouns"
            />
            <div className="flex flex-wrap justify-between mx-auto w-full break-words">
              <h1 className="text-[#103022] text-xl font-semibold">
                Current Age:
              </h1>
              <p className="text-[#103022] text-lg font-light mr-4">
                {age}
              </p>
            </div>
            <ApplyInput
              name="Age"
              setName={setHeaderText}
              placeholder={`Edit ${firstName + " " + lastName}'s age`}
              type="text"
              id="editAge"
            />
            <div className="flex flex-wrap justify-between mx-auto w-full break-words">
              <h1 className="text-[#103022] text-xl font-semibold">
                Current Education Level:
              </h1>
              <p className="text-[#103022] text-lg font-light mr-4">
                {educationLevel}
              </p>
            </div>
            <ApplyInput
              name="Education Level"
              setName={setHeaderText}
              placeholder={`Edit ${
                firstName + " " + lastName
              }'s education level`}
              type="text"
              id="editEducationLevel"
            />
            <div className="flex flex-wrap justify-between mx-auto w-full break-words">
              <h1 className="text-[#103022] text-xl font-semibold">
                Current Email:
              </h1>
              <p className="text-[#103022] text-lg font-light mr-4">
                {email}
              </p>
            </div>
            <ApplyInput
              name="Email"
              setName={setHeaderText}
              placeholder={`Edit ${firstName + " " + lastName}'s email`}
              type="text"
              id="editEmail"
            />
            <div className="flex flex-wrap justify-between mx-auto w-full break-words">
              <h1 className="text-[#103022] text-xl font-semibold">
                Current Interests:
              </h1>
              <p className="text-[#103022] text-lg font-light mr-4">
                {interests}
              </p>
            </div>
            <ApplyInput
              name="Interests"
              setName={setHeaderText}
              placeholder={`Edit ${firstName + " " + lastName}'s interests`}
              type="text"
              id="editInterests"
            />
            <Button buttonName="Save Changes" />
          </form>
        </div>
      )}
    </FormPopup>
  );
}

export default EditPopup;
