import React from "react";
import Navbar from "../Navbar/Navbar";
import MainPageContainer from "./MainPageContainer";

function MainPage() {
  const userKind = ["admin", "user", "guest"];

  const currentUser = userKind[2];
  return (
    <div className="w-screen h-screen bg-[#143727]">
      <Navbar isAuthenticated={true} userKind={currentUser} />
      <div className="flex flex-col items-center justify-center  h-screen w-screen">
        <h1 className="text-3xl text-center font-bold mx-auto text-[#e5e5e5] w-full mt-20">
          {/* if user is admin, show Administator Panel else if user is user show User Panel else show Welcome to WeLead! */}
          {currentUser === "admin" ? (
            <>
              Administrator Panel
            </>
          ) : currentUser === "user" ? (
            <>
              User Panel
            </>
          ) : (
            <>
              Welcome to WeLead!
            </>
          )}
        </h1>
      <div className="-mt-20 m-auto  h-screen w-screen flex md:flex-row flex-col md:py-0 py-12 overflow-y-auto overflow-x-hidden items-center mx-auto ">
        {currentUser === "user" ? (
          <>
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
              title="Recent Feeds"
              rows={[
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              ]}
            />
          </>
        ) : currentUser === "admin" ? (
          <>
            <MainPageContainer />
            <MainPageContainer title="Charts"/>
          </>
        ) : (
          <>
            {/* About us */}
            <div className="bg-transparent h-2/3 w-4/5 scrollbar-hide overflow-hidden overflow-y-auto container flex flex-col justify-start mt-12 mx-2 sm:mx-8 md:mx-12 lg:mx-16 rounded-2xl">
              <div className="">
                <h1 className="text-5xl text-left font-bold mx-auto text-[#e5e5e5] w-full">
                  <span className="text-7xl">A</span>bout Us
                </h1>
                <div className="my-4">
                  <p className="text-left text-2xl text-[#e5e5e5] font-medium md:leading-loose leading-relaxed">
                    WE LEAD is an independent nonprofit organization founded by
                    Libra Philanthropies in 2023 to create a pathway for women*
                    to reach leadership positions. Starting with the technology
                    sector, one of Greece’s fastest growing industries and the
                    driving force behind all changes around us, WE LEAD offers
                    participants essential business and tech skills development,
                    mentorship, job opportunities and networking, aiming to
                    create equal opportunities for women to shape the future of
                    technology.
                  </p>
                  <ul className="text-left text-xl text-[#e5e5e5] font-medium md:leading-loose leading-relaxed list-inside list-disc mt-12">
                    <li>
                      We train, mentor and empower women to pursue leadership
                      positions in business and technology.
                    </li>
                    <li>
                      Develop tech skills that are in high demand; advanced and
                      beginner programs.
                    </li>
                    <li>
                      Master key transferrable skills for long-term career
                      success.
                    </li>
                  </ul>
                  <div className="text-sm text-[#e5e5e5] mt-24">
                    <span className="font-bold text-lg">* </span>
                    By “women” we refer to any individual who self-identifies as
                    a woman, including cis-gendered and transgender women
                  </div>
                </div>
              </div>
            </div>

            <MainPageContainer
              title="News"
              rows={[
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              ]}
            />
          </>
        )}
      </div>
      </div>
    </div>
  );
}
export default MainPage;
