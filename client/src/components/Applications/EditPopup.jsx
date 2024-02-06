import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Popup as FormPopup } from "reactjs-popup";
import ApplyInput from "../Apply/ApplyInput";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import Warper from "./Warper";
import Button from "../Apply/ApplyButton";
import Popup from "../Popup/Popup";
const endpoints = ['personalDetails', 'education', 'hobbies', 'seminars', 'technicalSkills', 'volunteering', 'work'];
function EditPopup({
  userId,
  seminarId,
}) {
  console.log('EditPopup rendered');
  console.log('userId:', userId);
  console.log('seminarId:', seminarId);
  const [headerText, setHeaderText] = useState("");
  const [serverResponse, setServerResponse] = useState(null);
  // TO DO HANDLE EDUCATION PROPERLY.
  const fetchUserDetails = () => {

    const endpoints = ['personalDetails', 'education', 'hobbies', 'seminars', 'technicalSkills', 'volunteering', 'work'];
    let data = {};
    Promise.all(endpoints.map(endpoint =>
      axios.get(`http://localhost:8080/api/${endpoint}/${userId}/${seminarId}`)
        .then(response => {

          data[endpoint] = response.data

        })
    ))
      .then(() => {
        setServerResponse(data);

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

  function CommentBox({ seminarId, detailId, onSubmit }) {
    const [comment, setComment] = useState("");
    const handleSubmit = () => {
      onSubmit(seminarId, detailId, comment);
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
  const sectionMap = {
    'personalDetails': 1,
    'education': 2,
    'hobbies': 3,
    'seminars': 4,
    'technicalSkills': 5,
    'volunteering': 6,
    'work': 7
  };
  function handleCommentSubmit(seminarId, sectionId, comment) {
    if (comment === "" || comment === null) {
      Popup({
        title: "Error!",
        text: "Please fill in your comment.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    else {
      let section = sectionMap[sectionId];
      let date = new Date();
      let dateString = date.toISOString().slice(0, 19);
      let token = localStorage.getItem('token');
      axios.post(`http://localhost:8080/api/comments`, {
        seminarId,
        userId,
        comment,
        date: dateString,
        section,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          console.log(response);
          fetchComments(userId, seminarId);

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
      Popup({
        title: "Success!",
        text: "Your comment has been added.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });


    }
  }

  const [comments, setComments] = useState([]);
  useEffect(() => {
    console.log("i exist now");
    fetchComments(userId, seminarId);
  }, [userId, seminarId]);

  const fetchComments = async () => {
    try {
      console.log("fetching comments");
      const response = await axios.get(`http://localhost:8080/api/comments`, {
        params: {
          userId,
          seminarId
        }
      });
      console.log(response.data);
      setComments(response.data);
    } catch (error) {
      console.error(`Error fetching comments: ${error}`);
    }
  };


  const commentSectionMap = {
    1: 'personalDetails',
    2: 'education',
    3: 'hobbies',
    4: 'seminars',
    5: 'technicalSkills',
    6: 'volunteering',
    7: 'work'
  }


  const contentStyle = {
    maxWidth: "600px",
    width: "90%",
    // make scrollable
    maxHeight: "90vh",
    overflowY: "auto",
    overflowX: "hidden",
  };
  const endpointNames = {
    'personalDetails': 'Personal Details',
    'education': 'Education',
    'hobbies': 'Hobbies',
    'seminars': 'Seminars',
    'technicalSkills': 'Technical Skills',
    'volunteering': 'Volunteering',
    'work': 'Work'
  };
  const seminarNames =
  {
    1: "Placeholder Name 1",
    2: "Placeholder Name 2",
    3: "Placeholder Name 3",
    4: "Placeholder Name 4",
    5: "Placeholder Name 5",
    6: "Placeholder Name 6",
  }
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
          <div className="header text-[#103022] text-xl font-semibold"> Applicant's Details</div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col items-center w-full mx-auto justify-center p-6 font-noi gap-2">
            <div className="flex flex-col justify-between text-[#103022] text-lg font-light mr-4 mb-4 mx-auto w-full break-words">

              {serverResponse && endpoints.map(endpoint => {
                let value = serverResponse[endpoint];
                if (value) {
                  return (
                    <div key={endpoint}>
                      <Accordion allowZeroExpanded={true} className="mb-8">
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton className="accordion__button flex flex-row items-center mx-auto border rounded-xl">
                              <h2 className="text-[#103022] text-lg font-semibold mr-4 items-center text-center">
                                {endpointNames[endpoint]}:
                              </h2>

                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>

                            {Array.isArray(value) ? value.map((item, index) => (
                              <div key={index}>
                                {typeof item === 'object' ? Object.entries(item).map(([subKey, subValue]) => {
                                  if (subKey === 'Seminar: ') {
                                    subValue = seminarNames[subValue];
                                  }
                                  if (subValue === "" || subValue === null) {
                                    return <></>;
                                  }
                                  return (
                                    <div key={subKey}>
                                      <br />{`${subKey}: ${subValue}`}<br />
                                    </div>
                                  );
                                }) : <p>{item}</p>}
                              </div>
                            )) : Object.entries(value).map(([subKey, subValue]) => {
                              if (subKey === 'Seminar: ') {
                                subValue = seminarNames[subValue];
                              }
                              if (subValue === "" || subValue === null) {
                                return <></>;
                              }
                              return (
                                <div key={subKey}>
                                  {`${subKey} ${subValue}`}<br />
                                </div>
                              );
                            })}
                          </AccordionItemPanel>
                        </AccordionItem>
                      </Accordion>
                      {comments.map(comment => {
                        if (comment.section === sectionMap[endpoint]) {
                          // format date with time, in eu format
                          let date = new Date(comment.date);
                          let formattedDate = date.toLocaleString('en-GB');
                          return (
                            <div className="bg-gray-300 text-gray-800 text-lg font-light mr-4 mb-4 mx-auto w-full break-words rounded-lg flex flex-col p-4 gap-2"
                              key={comment.id}>

                              <div className="flex flex-row justify-between">
                                <div className="text-[#103022] text-lg font-semibold mr-4">
                                  {`${comment.username}`}
                                </div>
                                <div className="text-[#103022] text-lg font-semibold mr-4">
                                  {`${formattedDate}`}
                                </div>
                              </div>
                              <div className="border-b-2 border-[#103022]"></div>
                              <div className="text-[#103022] text-lg font-light mr-4 mb-4 justify-center flex">
                                {`${comment.comment}`}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}

                      <CommentBox seminarId={seminarId} detailId={endpoint} onSubmit={handleCommentSubmit} />

                    </div>
                  )
                }
                return null;
              })}



            </div>
          </form>
        </div>
      )}
    </FormPopup>
  );
}

export default EditPopup;
