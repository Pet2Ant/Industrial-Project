//Apply for a seminar page
import React, {useState} from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

function Apply() 
{
    const userKind = "user";
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };
    
    return (
        <div>
          <Navbar isAuthenticated={true} userKind={userKind}/>
          <div className="bg-[#143727] h-screen min-h-screen flex flex-col py-8 ">
            <h1 className='text-center  font-bold text-[#e5e5e5] text-4xl mb-4'>{selectedCategory}</h1>
            <div className="flex flex-row justify-around overflow-hidden items-stretch w-full items-center w-full">
              <div className='flex flex-col items-center justify-center rounded-xl ml-20 gap-6  px-1 mt-1 w-1/6 bg-[#FFCF07] '>
                <Sidebar onCategoryChange={handleCategoryChange}/>
              </div>
              <div className="flex flex-col pr-12 ml-10 bg-[#FFCF07] w-2/3 rounded-xl items-center justify-center sm:mr-auto sm:ml-auto ">
                {/* Content based on selected category goes here */}
              </div>
            </div>
          </div>
        </div>
      );
    
      
      
      
      
      
      

};
export default Apply;


