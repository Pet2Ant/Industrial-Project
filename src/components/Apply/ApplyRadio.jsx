import React from "react";

function ApplyRadioButton({ name, value, setValue }) {

    return (
        <div class="md:grid grid-cols-12 gap-3 pb-4 w-full">
            <div className="col-span-6">
                <div class="w-full">
                    <input id="default-radio-1" type="radio" value={value} name={name} class="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
                    <label for="default-radio-1" class="flex cursor-pointer bg-gray-300 justify-center items-center h-10 w-full peer-checked:bg-rose-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300 ease-linear transition-all duration-150 peer-hover:ring-2 peer-hover:ring-offset-2 peer-hover:ring-rose-500 rounded-xl">High School</label>
                </div>
            </div>
            <div className="col-span-6">
                <div class="w-full">
                    <input id="default-radio-2" type="radio" value={value} name={name} class="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
                    <label for="default-radio-2" class="flex cursor-pointer  bg-gray-300 justify-center items-center h-10 w-full peer-checked:bg-rose-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300 ease-linear transition-all duration-150 peer-hover:ring-2 peer-hover:ring-offset-2 peer-hover:ring-rose-500 rounded-xl">Bachelor's Degree</label>
                </div>
            </div>
            <div className="col-span-6">
                <div class="w-full">
                    <input id="default-radio-3" type="radio" value={value} name={name} class="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
                    <label for="default-radio-3" class="flex cursor-pointer  bg-gray-300 justify-center items-center h-10 w-full peer-checked:bg-rose-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300 ease-linear transition-all duration-150 peer-hover:ring-2 peer-hover:ring-offset-2 peer-hover:ring-rose-500 rounded-xl">Master's Degree</label>
                </div>
            </div>
            <div className="col-span-6">
                <div class="w-full">
                    <input id="default-radio-4" type="radio" value={value} name={name} class="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
                    <label for="default-radio-4" class="flex cursor-pointer bg-gray-300 justify-center items-center h-10 w-full peer-checked:bg-rose-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300 ease-linear transition-all duration-150 peer-hover:ring-2 peer-hover:ring-offset-2 peer-hover:ring-rose-500 rounded-xl">PhD</label>
                </div>
            </div>
        </div>



    );
}

export default ApplyRadioButton;