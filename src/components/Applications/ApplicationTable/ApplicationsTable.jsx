import React from "react";
import { useState, useMemo } from "react";
import DataTable, { createTheme } from "react-data-table-component";



createTheme(
  "WeLeadTheme",
  {
    text: {
      primary: "#103022",
      secondary: "#FFFFFF",
    },
    background: {
      default: "#cccaca",
    },
    context: {
      background: "#e5e5e5",
      text: "#FFFFFF",
    },
    divider: {
      default: "#343d55",
    },
    action: {
      button: "rgba(44,111,0,.24)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "light"
);

const Table = ({ header, subHeader, data, columns, pagination }) => {
  // edit table styles
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#b0aeae",
        fontSize: "15px",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        borderRadius: "5px 5px 0 0",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
        // tracking wide
        letterSpacing: "0.5px",
      },
    },
  };

  const [searchText, setSearchText] = useState("");

  const customFilter = (rows, searchText) => {
    return rows.filter((row) => {
      return Object.keys(row).some((column) => {
        return row[column]
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
    });
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [pageLength, setPageLength] = useState(10);

  const paginatedData = useMemo(() => {
    const startIndex = currentPage * pageLength;
    const endIndex = startIndex + pageLength;
    return data.slice(startIndex, endIndex);
  }, [currentPage, pageLength, data]);

  const handlePageChange = (page) => {
    setCurrentPage(page.selected);
  };

  const handlePageLengthChange = (e) => {
    setPageLength(Number(e.target.value));
    setCurrentPage(0);
  };

  const totalPages = Math.ceil(data.length / pageLength);


  return (
    <div className="items-center flex-row bg-[#e5e5e5] sm:mt-0 -mt-12">
      <div className="block rounded-lg bg-[#cccaca]">
        <div>
          {/* Header text */}
          <h5 className="pt-6 text-xl m-6 -mb-6 font-medium leading-tight text-[#143727] text-start">
            {header}
          </h5>
          {/* Subheader text */}
          {subHeader && (
            <p className="mb-2 text-md m-6 pt-6 -mb-12 font-medium leading-tight text-[#103022] md:text-start text-center">
              {subHeader}
            </p>
          )}
        </div>

        <div className="min-h-full relative sm:pb-12 md:pl-0 mb-12">
          <div className="items-center md:px-8 px-2 md:-mb-12 sm:-mb-12 mb-0">
            <DataTable
              subHeader
              subHeaderAlign="center"
              subHeaderComponent={
                // if pagination = true, show search bar
                pagination ? (
                  <div className="flex flex-wrap gap-2 items-center sm:justify-end justify-center min-w-[99%]">
                    <label className="text-[#143727] text-sm mr-2 Arimo-Regular sm:mb-0">
                      Search:
                    </label>
                    <input
                      className="shadow-sm sm:w-max w-[99%] rounded-md focus:outline-none text-[#8c8b8b] focus:ring-2 caret-[#8c8b8b] bg-[#b0aeae] ring-0 focus:ring-[#8c8b8b] focus:bg-[#cccaca] text-sm rounded-md px-2 py-1 mb-2 md:mb-0 Arimo-Regular transition duration-500 ease-in-out"
                      type="text"
                      placeholder="Search"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                ) : (
                  ""
                )
              }
              columns={columns}
              data={customFilter(paginatedData, searchText)}
              customStyles={customStyles}
              theme="WeLeadTheme"
            />

            <hr className="border-[#343d55]" />
            <div className="flex md:flex-nowrap flex-wrap md:justify-between justify-center my-6 Arimo-Regular">
              <div className="flex flex-wrap justify-center gap-2 items-center mb-4 md:mb-0">
                <label className="text-[#143727] text-sm ">Show</label>
                <select
                  className="shadow-sm rounded-md focus:outline-none text-[#8c8b8b] focus:ring-2 caret-[#8c8b8b] bg-[#b0aeae] ring-0 focus:ring-[#8c8b8b] focus:bg-[#cccaca] text-sm rounded-md px-2 py-1  transition duration-500 ease-in-out"
                  value={pageLength}
                  onChange={handlePageLengthChange}
                >
                  {[10, 20, 30, 40, 50, 75, 100].map((length) => (
                    <option key={length} value={length}>
                      {length}
                    </option>
                  ))}
                </select>
                <label className="text-[#143727] text-sm ">entries</label>
              </div>

              {/* Showing 1 to # of # entries */}
              <label className="text-[#143727] text-sm text-center mr-2 Arimo-Regular mb-4 sm:mb-0">
                Showing {currentPage * pageLength + 1} to{" "}
                {Math.min((currentPage + 1) * pageLength, data.length)} of{" "}
                {data.length} entries
              </label>

              <div className="flex flex-wrap justify-center gap-2 items-center mb-4 md:mb-0">
                <button
                  className="mx-4 shadow-sm rounded-md focus:outline-none text-[#8c8b8b] focus:ring-2 caret-[#8c8b8b] bg-[#b0aeae] ring-0 focus:ring-[#8c8b8b] focus:bg-[#cccaca] text-sm rounded-md px-2 py-1 Arimo-Regular transition duration-500 ease-in-out"
                  onClick={() =>
                    handlePageChange({ selected: currentPage - 1 })
                  }
                  disabled={currentPage === 0}
                >
                  Previous
                </button>
                <label className="text-[#143727] text-sm Arimo-Regular flex-row flex break-keep">
                  Page {currentPage + 1} of {totalPages}
                </label>
                <button
                  className="mx-4 shadow-sm rounded-md focus:outline-none text-[#8c8b8b] focus:ring-2 caret-[#8c8b8b] bg-[#b0aeae] ring-0 focus:ring-[#8c8b8b] focus:bg-[#cccaca] text-sm rounded-md px-2 py-1 Arimo-Regular transition duration-500 ease-in-out"
                  onClick={() =>
                    handlePageChange({ selected: currentPage + 1 })
                  }
                  disabled={currentPage === totalPages - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
