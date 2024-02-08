import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContext";
import Navbar from "../Navbar/Navbar";
import Table from "./ApplicationTable/ApplicationsTable";
import axios from "axios";
import Popup from "../Popup/Popup";
import EditPopup from "./EditPopup";
import {jwtDecode }from "jwt-decode";
const Applications = () => {
  const [userKind,setUserKind] = useState("");
 const [headerText, setHeaderText] = useState("Applications");
  
  const [subHeaderText, setSubHeaderText] = useState(
    "Here you can view all the applications that each user has submitted."
  );
  const [data, setData] = useState([]);
  const [personalDetails, setPersonalDetails] = useState({
    id: "",
    userId: "",
    firstName: "",
    lastName: "",
    country: "",
    education: "",
    email: "",
    seminarId: "",
    pronouns:"",
  });
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = JSON.stringify(decodedToken.roles).slice(2, -2);
      setUserKind(role);
    }
    handlePersonalDetails();
  }, []);

  const handlePersonalDetails = async (e) => {
    if(e) e.preventDefault();
    try {
      console.log("Adding personal details...");
      const response = await axios.get(
        "http://localhost:8080/api/personalDetails",
        {
          params: personalDetails,
        }
      );
      const details = response.data;
      const newData = details.map((detail) => ({
        id: detail.id,
        userId: detail.userId,
        firstName: detail.firstName,
        lastName: detail.lastName,
        country: detail.country,
        education: detail.education,
        email: detail.email,
        seminarId: detail.seminarId,
        pronouns: detail.pronouns,
      }));
      setData(newData);
      console.log(newData);
    } catch (error) {
      console.log("There was an error!", error);
      Popup({
        title: "Error!",
        text: "There was an error adding your personal details.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  

  
  const seminarNames = {
    1: "Placeholder Name 1",
    2: "Placeholder Name 2",
    3: "Placeholder Name 3",
    4: "Placeholder Name 4",
    5: "Placeholder Name 5",
    6: "Placeholder Name 6",
  };
    
  // Table columns
  const columns = [
    {
      name: "Seminar ",
      selector: (row) => seminarNames[row.seminarId],
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) =>
        row.firstName.charAt(0).toUpperCase() +
        row.firstName.slice(1) +
        " " +
        row.lastName.charAt(0).toUpperCase() +
        row.lastName.slice(1),

      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country.charAt(0).toUpperCase() + row.country.slice(1),
      sortable: true,
    },
    {
      name: "Pronouns",
      selector: (row) => row.pronouns,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      cell: (row) => (
        <EditPopup
          userId={row.userId}
          seminarId={row.seminarId}
        />
      ),
    },
  ];  

  return (
    <div className="min-h-screen bg-[#e5e5e5]">
      <div className="grid grid-cols-1 grid-rows-1">
        <Navbar isAuthenticated={true} userKind={userKind} />
        <div className="min-h-fit justify-center relative overflow-hidden transition-all duration-300 ease-in-out xl:mx-36 lg:mx-24">
          <div className="grid grid-cols-1 gap-2  sm:pt-24 pt-36  md:pl-0 mx-8 lg:mx-auto flex lg:flex-row flex-col items-center">
            <Table
              header={headerText}
              subHeader={subHeaderText}
              columns={columns}
              data={data}
              pagination
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export default Applications;
