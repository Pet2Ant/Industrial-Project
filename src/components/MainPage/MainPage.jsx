import React from "react";
import Navbar from "../Navbar/Navbar";
import MainPageContainer from "./MainPageContainer";

function MainPage() {
  const userKind = ["admin", "user", "guest"];
  return (
    <div className="w-screen h-screen">
      <Navbar isAuthenticated={true} userKind={userKind[2]} />
      <div className="bg-[#143727] h-screen m-auto flex sm:flex-row flex-col md:py-0 py-12 overflow-y-auto overflow-x-hidden items-center mx-auto ">
        
        <MainPageContainer
          title="News"
          rows={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          ]}
        />
        <MainPageContainer
          title="Recent Feed"
          rows={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          ]}
        />
      </div>
    </div>
  );
}
export default MainPage;
