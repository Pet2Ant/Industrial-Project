// Logout.js

import React from 'react';
import Navbar from '../Navbar/Navbar';

function Logout() {
    return (
        <div>
            <Navbar />
            <div className="bg-[#143727] h-screen min-h-screen max-h-screen" >
                <div className="flex flex-row justify-around overflow-hidden items-center h-screen min-h-screen max-h-screen overflow-y-auto ">
                    <div className="hidden sm:block flex flex-col items-left gap-6 h-screen px-6 mt-14">
                    <h1 className="text-4xl  sm:text-center text-right  mt-10 text-white">
                            About WeLead
                    </h1>
                        <p className=" sm:text-center italic text-right  mt-10 text-white"> WE LEAD is an independent nonprofit organization founded by Libra Philanthropies in 2023 to create a pathway <br />
                         for women* to reach leadership positions. Starting with the technology sector, one of Greece’s  fastest growing industries and the driving <br />
                         force behind all changes around us, WE LEAD offers participants essential business and tech skills development, mentorship, job opportunities <br />and networking,
                         aiming to create equal opportunities for women to shape the future of technology. <br />

                                    *By “women” we refer to any individual who self-identifies as a woman, including cis-gendered and transgender women </p>
                    

                        <h1 className="text-4xl  sm:text-center text-right  mt-10 text-white">
                            Our Vision & Mission
                        </h1>
                        <p className=" sm:text-center italic text-right  mt-10 text-white">We envision a world where women are empowered to shape the future of everything.
                            <br /> We train, mentor and empower women to pursue leadership positions in business and technology.</p>

                        <h1 className="text-4xl  sm:text-center text-right  mt-10 text-white">
                            What We Do
                        </h1>
                        <p className=" sm:text-center italic text-right  mt-10 text-white">WE LEAD empowers women through education, networking, mentorship, and professional development opportunities. <br />
                            Participants emerge as well-rounded professionals ready to enter or re-enter the workforce and equipped to rise to leadership positions. <br />
                            On top of that, WE LEAD works alongside tech and business leaders as well as local communities and authorities to achieve <br /> greater inclusivity in workplaces and foster a culture of allyship.</p>

                    </div>

                    <div className="flex flex-col pr-12 w-full bg-[#FFCF07] sm:w-[28rem] rounded-xl items-center justify-center mr-auto ml-auto h-5/6 ">
                        <h1 className="font-bold text-4xl text-[#143727] mb-10">News</h1>
                        <p className='text-lg text-[#143727] ml-14 italic'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, modi, reprehenderit fuga
                        quibusdam laborum enim ipsa impedit unde sit, at atque quas? Nesciunt possimus obcaecati fuga quidem mollitia sit illo?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, modi, reprehenderit fuga
                        quibusdam laborum enim ipsa impedit unde sit, at atque quas? Nesciunt possimus obcaecati fuga quidem mollitia sit illo?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, modi, reprehenderit fuga
                        quibusdam laborum enim ipsa impedit unde sit, at atque quas? Nesciunt possimus obcaecati fuga quidem mollitia sit illo?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, modi, reprehenderit fuga
                        quibusdam laborum enim ipsa impedit unde sit, at atque quas? Nesciunt possimus obcaecati fuga quidem mollitia sit illo?
                       
                        </p>                   
                    </div>


                </div>
            </div>
        </div>
    );

};
export default Logout;
