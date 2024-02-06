import React, {useState} from "react";
import Table from "../Applications/ApplicationTable/ApplicationsTable";
import dataJSON from "../Applications/ApplicationTable/mockData.json";
import { Link } from "react-router-dom";

const Paragraph = ({ text }) => {
  return (
    <p className="text-center text-2xl text-[#143727] font-medium md:leading-loose leading-relaxed">
      {text}
    </p>
  );
};

const RecentFeedContainer = ({ text }) => {
  const clickHere = (
    <>
      Here you can view a summary of each user that has submitted an application. To view more, click{" "}
      <Link to="/Applications" className="text-[#8D93D9] hover:text-[#143727] cursor-pointer">
        here
      </Link>
      .
    </>
  );
  const [headerText, setHeaderText] = useState("Applications");
  const [subHeaderText, setSubHeaderText] = useState(clickHere);



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
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
  ];

  const data = dataJSON;
  return (
    <div className="items-center ">
      <Table
        header={headerText}
        subHeader={subHeaderText}
        columns={columns}
        data={data}
        pagination
      />
    </div>
  );
};

const MainPageContainer = ({ title, rows }) => {
  return (
    <div className="bg-[#e5e5e5] h-2/3 w-3/4 scrollbar-hide overflow-y-auto container flex flex-col justify-start mt-12 sm:mx-8 md:mx-12 lg:mx-24 px-8 rounded-2xl ">
      <div className="flex-1">
        <h1 className="text-4xl text-center font-bold mx-auto text-[#143727] mt-4 w-full ">
          {/* if title is Applications, do not show else show */}
          {title === "Applications" ? (
            <></>
          ) : (
            <>
              {title}
            </>
          )}
        </h1>
        {title === "News" ? (
          <div className="my-4 ">
            {rows.map((text, i) => (
              <Paragraph key={i} text={text} />
            ))}
          </div>
        ) : title === "Charts" ? (
          <></>
        ) : (
          <div className="my-4 bg-transparent">
            <RecentFeedContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPageContainer;
