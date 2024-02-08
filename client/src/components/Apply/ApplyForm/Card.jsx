import React from "react";

function Card({ seminarId, setSeminar }) {
    const handleAssignSeminar = (seminarId) => {
      localStorage.setItem("seminar", seminarId);
      setSeminar(seminarId);  // Update the state variable
    };
    
    
  return (
    <div id={seminarId} className="flex flex-col sm:flex-row lg:flex-col w-full">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <a href="/programs/tech-skills/we-lead-bootcamps-front-end-back-end-development">
            <img
              src="https://www.joinwelead.org/images/programs/welead_bootcamp.jpg"
              alt="WE LEAD Bootcamps: Front-End & Back-End Development"
              className="w-full h-48 object-cover"
            />
          </a>
          <div className="absolute top-0 right-0 flex flex-row items-center gap-2 p-2">
            <span className="bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-xl">
              free
            </span>
            <span className="bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-xl">
              applications closed
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">
            <a href="/programs/tech-skills/we-lead-bootcamps-front-end-back-end-development">
              WE LEAD Bootcamps: Front-End & Back-End Development
            </a>
          </h3>
          <div className="text-gray-600 mb-2">Oct 16, 2023 - Feb 11, 2024</div>
          <div className="text-gray-800 mb-4">
            Are you interested in launching a successful career in tech but
            don't know where to start? Look no further! Join WE LEAD's free
            training programs on front-end or back-end development and get ready
            to pave your way to landing your dream tech job.
          </div>
          
          <ul className="mb-4 p-4 list-disc">
            <li>Free of charge</li>
            <li>15 weeks</li>
            <li>100% online</li>
            <li>Beginner level</li>
            <li>Shareable certificate</li>
            <li>Limited seats available</li>
          </ul>
          <div className="flex space-x-2 mb-4 ">
            <p
              className="bg-gray-300 text-gray-800 text-sm font-bold px-2 py-1 rounded-full"
            >
              Tech skills
            </p>
          </div>
          <div className="flex flex-wrap space-x-2 mb-4">
            <img
              src="https://www.joinwelead.org/images/programs/angular.png"
              alt="Tech skills"
              className="w-8 h-8"
            />
            <img
              src="https://www.joinwelead.org/images/programs/css.png"
              alt="Tech skills"
              className="w-8 h-8"
            />
            <img
              src="https://www.joinwelead.org/images/programs/html.png"
              alt="Tech skills"
              className="w-8 h-8"
            />
            <img
              src="https://www.joinwelead.org/images/programs/java.png"
              alt="Tech skills"
              className="w-8 h-8"
            />
            <img
              src="https://www.joinwelead.org/images/programs/JavaScript.png"
              alt="Tech skills"
              className="w-8 h-8"
            />
            <img
              src="https://www.joinwelead.org/images/programs/spring.png"
              alt="Tech skills"
              className="w-8 h-8"
            />
          </div>
          <button
            onClick={() => handleAssignSeminar(seminarId)}
            className="bg-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-purple-700"
          >
            Apply now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
