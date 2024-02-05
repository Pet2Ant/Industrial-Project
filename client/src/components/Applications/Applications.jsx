import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Table from "./ApplicationTable/ApplicationsTable";
import axios from "axios";
import Popup from "../Popup/Popup";
import EditPopup from "./EditPopup";

const Applications = () => {
  const currentUser = "admin";
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
  });
  
  useEffect(() => {
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
  

  
    console.log(data);
    
  // Table columns
  const columns = [
    {
      name: "ID",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) =>
      row.firstName + " " + row.lastName,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "Education Level",
      selector: (row) => row.education,
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
        <Navbar isAuthenticated={true} userKind="admin" />
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
