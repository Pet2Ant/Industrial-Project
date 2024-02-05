import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Popup as FormPopup } from "reactjs-popup";
import ApplyInput from "../Apply/ApplyInput";
import Warper from "./Warper";
import Button from "../Apply/ApplyButton";
import Popup from "../Popup/Popup";
const endpoints = ['personalDetails', 'education', 'hobbies', 'seminars', 'technicalSkills', 'volunteering', 'work'];
function EditPopup({
  userId,
  id,
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

  function CommentBox({ id, detailId, onSubmit }) {
    const [comment, setComment] = useState("");
    const handleSubmit = () => {
      onSubmit(id, detailId, comment);
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
  function handleCommentSubmit(id, sectionId, comment) {
    console.log(id, sectionId, comment);

    let applicationId = id;
    let section = sectionMap[sectionId];
    let date = new Date();
    let dateString = date.toISOString().slice(0, 19);
    let token = localStorage.getItem('token');
    console.log(token);
    axios.post(`http://localhost:8080/api/comments`, {
      applicationId,
      userId,
      comment,
      date: dateString,
      section,
    }, {
      headers: {
        Authorization: `Bearer ${token}` // replace `token` with your actual token
      }
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
  const commentSectionMap ={
    1: 'personalDetails',
    2: 'education',
    3: 'hobbies',
    4: 'seminars',
    5: 'technicalSkills',
    6: 'volunteering',
    7: 'work'
  }
  const [commentsBySection, setCommentsBySection] = useState({});
  const fetchComments = async (userId, applicationId) => {
    let token = localStorage.getItem('token');
    console.log(`Fetching comments for userId=${userId}, applicationId=${applicationId}`);
    let response = await axios.get(`http://localhost:8080/api/comments`, {
      params: {
        userId,
        applicationId,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.data || response.data.length === 0) {
      console.log('No comments found');
      return;
    }
    console.log(`Fetched ${response.data.length} comments`);
    let categorizedComments = {};
    response.data.forEach(comment => {
      let endpoint = commentSectionMap[comment.section];
      if (!categorizedComments[endpoint]) {
          categorizedComments[endpoint] = [];
      }
      categorizedComments[endpoint].push(comment);
  });

    setCommentsBySection(categorizedComments);
    console.log(categorizedComments);
};

useEffect(() => {
  console.log('fetching comments');
  endpoints.forEach(endpoint => {
    fetchComments(userId, id, endpoint)
      .catch(error => console.error(error));
  });
}, [userId, id]);


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
            }}
            className="flex flex-col items-center w-full mx-auto justify-center p-6 font-noi gap-2">
            <div className="flex flex-col justify-between mx-auto w-full break-words">
              <h1 className="text-[#103022] text-xl font-semibold">
                Server Response:
              </h1>
              {serverResponse && endpoints.map(endpoint => {
                let value = serverResponse[endpoint];
                if (value) {
                  return (
                    <div key={endpoint}>
                      <h2 className="text-[#103022] text-lg font-semibold mr-4 mb-4">
                        {endpointNames[endpoint]}:
                      </h2>
                      {Object.entries(value).map(([subKey, subValue]) => (
                        <p key={subKey} className="text-[#103022] text-lg font-light mr-4 mb-4">
                          {`${subKey} ${subValue}`}
                        </p>
                      ))}
                      {commentsBySection[endpoint] && commentsBySection[endpoint].map(comment => (
                        
                        <p key={comment.id}>{comment.text}</p>
                        
                      ))}
                      {/* TO DO comment section needs fixing from back end  */}
                      <CommentBox id={id} detailId={endpoint} onSubmit={handleCommentSubmit} />
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
