import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Popup as FormPopup } from "reactjs-popup";
import ApplyInput from "../Apply/ApplyInput";
import Warper from "./Warper";
import Button from "../Apply/ApplyButton";
import Popup from "../Popup/Popup";

function EditPopup({
  firstName,
  lastName,
  country,
  id,
  educationLevel,
  email,
}) {
  const [headerText, setHeaderText] = useState("");
  const [serverResponse, setServerResponse] = useState(null);
  // TO DO HANDLE EDUCATION PROPERLY.
  const fetchUserDetails = () => {
    console.log("im being called")
    const endpoints = ['personalDetails', 'education', 'hobbies', 'seminars', 'technicalSkills', 'volunteering', 'work'];
    let data = {};
    Promise.all(endpoints.map(endpoint =>
      axios.get(`http://localhost:8080/api/${endpoint}/${id}`)
        .then(response => {
          data[endpoint] = response.data;
        })
    ))
      .then(() => {
        setServerResponse(data);
        console.log(data);
      })
      .catch((error) => {
        console.log("There was an error!", error);
        Popup({
          title: "Error!",
          text: "There was an error fetching the user details.",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      });
  };
  // ToDO - Add a comment box back end akoma yok, prepei n kanw k t submit handle kalitera st telos tou popup
  
  function CommentBox ({id,detailId,onSubmit}) {
    const [comment, setComment] = useState("");
    const handleSubmit = () => {
      onSubmit(id,detailId,comment);
      setComment("");
    };
    return (
      <div className="flex flex-col items-center w-full mx-auto justify-center p-6 font-noi gap-2">
        <ApplyInput
          name="Comment"
          setName={setComment}
          placeholder="Add a comment"
          type="text"
          id="addComment"
        />
        <Button buttonName="Add Comment" onClick={handleSubmit} />
      </div>
    );
  }
  function handleCommentSubmit(id,detailId,comment)
  {
    axios.post(`http://localhost:8080/api/comment/${id}`, {
      id,
      detailId,
      comment
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("There was an error!", error);
      Popup({
        title: "Error!",
        text: "There was an error adding your comment.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    });
  }


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
      onOpen={fetchUserDetails}
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

            <div className="flex flex-col justify-between mx-auto w-full break-words">
              <h1 className="text-[#103022] text-xl font-semibold">
                Server Response:
              </h1>
              {serverResponse && Object.entries(serverResponse).map(([key, value]) => (
                <div key={key}>
                  <h2 className="text-[#103022] text-lg font-semibold mr-4 mb-4">
                    {key}:
                  </h2>
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <p key={subKey} className="text-[#103022] text-lg font-light mr-4 mb-4">
                      {`${subKey}: ${subValue}`}
                    </p>
                  ))}
                   {/* TO DO comment section needs fixing from back end  */}
                  <CommentBox id={id} detailId={key} onSubmit={handleCommentSubmit} />
                </div>
              ))}
            </div>

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
                Current Country:
              </h1>
              <p className="text-[#103022] text-lg font-light mr-4">
                {country}
              </p>
            </div>
            <ApplyInput
              name="Country"
              setName={setHeaderText}
              placeholder={`Edit ${firstName + " " + lastName}'s country`}
              type="text"
              id="editCountry"
            />
            <div className="flex flex-wrap justify-between mx-auto w-full break-words">
              <h1 className="text-[#103022] text-xl font-semibold">
                Current Id:
              </h1>
              <p className="text-[#103022] text-lg font-light mr-4">
                {id}
              </p>
            </div>
            <ApplyInput
              name="Age"
              setName={setHeaderText}
              placeholder={`Edit ${firstName + " " + lastName}'s id`}
              type="text"
              id="editId"
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
              placeholder={`Edit ${firstName + " " + lastName
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
            <Button buttonName="Save Changes" />
          </form>
        </div>
      )}
    </FormPopup>
  );
}

export default EditPopup;
