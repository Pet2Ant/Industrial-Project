import React, { useState } from "react";
import Popup from "reactjs-popup";
import ApplyInput from "../Apply/ApplyInput";
import Warper from "./Warper";
import Button from "../Apply/ApplyButton";

function EditPopup() {
  const [headerText, setHeaderText] = useState("");
  const contentStyle = {
    maxWidth: "600px",
    width: "90%",
  };

  return (
    <Popup
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
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Edit User Information </div>
          <form className="flex flex-col items-center w-full mx-auto justify-center p-6">
            <h1 className="text-[#103022] text-lg font-bold">Name</h1>
            <ApplyInput
              name="Name"
              setName={setHeaderText}
              placeholder="Edit $user's name"
              type="text"
              id="editName"
            />
            <p className="text-[#103022] text-lg font-bold">Pronouns</p>
            <ApplyInput
              name="Pronouns"
              setName={setHeaderText}
              placeholder="Edit $user's pronouns"
              type="text"
              id="editPronouns"
            />
            <p className="text-[#103022] text-lg font-bold">Age</p>
            <ApplyInput
              name="Age"
              setName={setHeaderText}
              placeholder="Edit $user's age"
              type="text"
              id="editAge"
            />
            <p className="text-[#103022] text-lg font-bold">Education Level</p>
            <ApplyInput
              name="Education Level"
              setName={setHeaderText}
              placeholder="Edit $user's education level"
              type="text"
              id="editEducationLevel"
            />
            <p className="text-[#103022] text-lg font-bold">Email</p>
            <ApplyInput
              name="Email"
              setName={setHeaderText}
              placeholder="Edit $user's email"
              type="text"
              id="editEmail"
            />
            <p className="text-[#103022] text-lg font-bold">Interests</p>
            <ApplyInput
              name="Interests"
              setName={setHeaderText}
              placeholder="Edit $user's interests"
              type="text"
              id="editInterests"
            />
            <Button buttonName="Save Changes" />
          </form>
        </div>
      )}
    </Popup>
  );
}

export default EditPopup;
