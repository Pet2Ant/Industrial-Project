import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Table from "./ApplicationTable/ApplicationsTable";
import dataJSON from "./ApplicationTable/mockData.json";
import EditPopup from "./EditPopup";

function Applications() {
  const currentUser = "admin";
  const [headerText, setHeaderText] = useState("Applications");
  const [subHeaderText, setSubHeaderText] = useState(
    "Here you can view all the applications that each user has submitted."
  );

  const data = dataJSON;

  // Get an array of first names
  const firstNames = data.map((row) => row.first_name);

  // Table columns
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.first_name + " " + row.last_name,
      sortable: true,
    },
    {
      name: "Pronouns",
      selector: (row) => row.pronouns,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Education Level",
      selector: (row) => row.education_level,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Interests",
      selector: (row) => row.interests,
      sortable: true,
    },
    {
      cell: (row) => (
        <EditPopup
          firstName={row.first_name} // Pass the first name as a prop
          lastName={row.last_name}
          pronouns={row.pronouns}
          age={row.age}
          educationLevel={row.education_level}
          email={row.email}
          interests={row.interests}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#e5e5e5]">
      <div className="grid grid-cols-1 grid-rows-1">
        <Navbar isAuthenticated={true} userKind="admin" />
        <div className="min-h-fit justify-center relative overflow-hidden transition-all duration-300 ease-in-out xl:mx-36 lg:mx-24">
          <div className="grid grid-cols-1 gap-2 sm:pt-24 pt-36 md:pl-0 mx-8 lg:mx-auto flex lg:flex-row flex-col items-center">
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