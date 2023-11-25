import React from "react";

const Paragraph = ({ text }) => {
  return (
    <p className="text-center text-2xl text-[#143727] font-medium md:leading-loose leading-relaxed">
      {text}
    </p>
  );
};

const RecentFeedContainer = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-center text-2xl text-[#143727] font-medium md:leading-loose leading-relaxed">
        {text}
      </p>
      <p className="text-center text-2xl text-[#143727] font-medium md:leading-loose leading-relaxed">
        {text}
      </p>
    </div>
  );
};

const MainPageContainer = ({ title, rows }) => {
  return (
    <div className="bg-[#e5e5e5] h-2/3 w-3/4 scrollbar-hide overflow-hidden overflow-y-auto container flex flex-col justify-start mt-12 sm:mx-8 md:mx-12 lg:mx-24 px-8 rounded-2xl ">
      <div className="flex-1">
        <h1 className="text-4xl text-center font-bold mx-auto text-[#143727] mt-4 w-full ">
          {title}
        </h1>
        {title === "News" ? (
          <div className="my-4 ">
            {rows.map((text, i) => (
              <Paragraph key={i} text={text} />
            ))}
          </div>
        ) : (
          <div className="my-4 ">
            {rows.map((text, i) => (
              <RecentFeedContainer key={i} text={text} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPageContainer;
