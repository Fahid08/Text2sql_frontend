import React, { useState } from "react";
import toast from "react-hot-toast";
import { Spin } from "antd";
import GetTableInfo from "../Table/GetTableInfo";
import { Input, Form, Select } from "antd";
import "./style.css";
// const baseUrl = "http://127.0.0.1:8000/invocations/executesql";
const baseUrl = "https://uj7fyddl6oea72cu576ogfu6vu0qxhmu.lambda-url.us-east-1.on.aws/executequery";
const { Option } = Select;
function Buttons({
  setCSVData,
  setQuery,
  setError,
  setValue,
  setHeaders,
  setRows,
  setDefaults,
  value,
  showSideBar,
  selectedDatabase,
  setLoading,
  handleDbSelect,
  databaseNames,
}) {
  const runQuery = async () => {
    setError(false);
    try {
      setLoading(true); // Set loading to true while making the API call

      // Fetch data from the backend
      const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: value,
          db_name: selectedDatabase,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const data = await response.json();
      if (data?.detail) {
        toast.error(data?.detail);
        setError(true);
        setLoading(false); // Set loading to false if there's an error
        return;
      }
      setQuery(value);
      // Extract table headers and rows from the backend response using GetTableInfo
      const { tableHeaders, tableRows } = GetTableInfo(data.prediction);

      // Set the headers and rows in the state
      setHeaders(tableHeaders);
      setRows(tableRows);

      // Set CSV data
      setCSVData([tableHeaders, ...tableRows]);

      setLoading(false); // Set loading to false after setting the state

      // Show success toast
      toast.success("Query run Successfully");
    } catch (error) {
      setLoading(false); // Set loading to false if there's an error
      // Show error toast if something went wrong
      toast.error("Failed to run the query");
      console.error(error);
    }
  };

  const handleChangeDatabase = (value) => {
    handleDbSelect(value); // Call the handleDbSelect method with the selected value
  };

  const reset = () => {
    setError(false);
    setQuery("");
    setValue("select * from Apartment_Bookings limit 2;");
    setDefaults(1);
    setHeaders([]);
    setRows([]);
    setCSVData([]);
  };

  return (
    // <div
    //   className={`flex ${
    //     !isOpen ? "flex-col md:flex-row" : "flex-col lg:flex-row"
    //   }   bg-[#1f1f1ff0] items-center`}
    // >
    <div className="flex bg-[#1f1f1ff0] items-center flex-wrap pb-2 btn-container">
      <div className="p-2  text-center">
        <button
          onClick={reset}
          className="mx-auto text-white border-0 py-2 h-11 px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="30"
            viewBox="0 0 30 37.243"
          >
            <g
              id="Icon_feather-repeat"
              data-name="Icon feather-repeat"
              transform="translate(-3 0.621)"
            >
              <path
                id="Path_22"
                data-name="Path 22"
                d="M25.5,1.5l6,6-6,6"
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <path
                id="Path_23"
                data-name="Path 23"
                d="M4.5,16.5v-3a6,6,0,0,1,6-6h21"
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <path
                id="Path_24"
                data-name="Path 24"
                d="M10.5,34.5l-6-6,6-6"
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <path
                id="Path_25"
                data-name="Path 25"
                d="M31.5,19.5v3a6,6,0,0,1-6,6H4.5"
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            </g>
          </svg>
        </button>
      </div>
      <div className="p-2 ">
        <button
          onClick={runQuery}
          className="flex mx-auto text-white border-0 py-2 h-11 px-4 justify-center items-center"
        >
          <div className="pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="21"
              viewBox="0 0 31.499 36.001"
              className="fill-current"
            >
              <path
                id="Icon_awesome-play"
                data-name="Icon awesome-play"
                d="M29.841,15.1,5.091.464A3.356,3.356,0,0,0,0,3.368V32.625a3.372,3.372,0,0,0,5.091,2.9L29.841,20.9a3.372,3.372,0,0,0,0-5.808Z"
                transform="translate(0 -0.002)"
              />
            </svg>
          </div>
          <div className="font-bold font-mono">Run Query</div>
        </button>
      </div>
      <div className="p-2 ">
        <button
          onClick={showSideBar}
          className="flex mx-auto text-white  border-0 py-2 h-11 px-4 justify-center items-center"
        >
          <div className="pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="21"
              viewBox="0 0 31.499 36.001"
              className="fill-current"
            >
              <path
                id="Icon_awesome-play"
                data-name="Icon awesome-play"
                d="M29.841,15.1,5.091.464A3.356,3.356,0,0,0,0,3.368V32.625a3.372,3.372,0,0,0,5.091,2.9L29.841,20.9a3.372,3.372,0,0,0,0-5.808Z"
                transform="translate(0 -0.002)"
              />
            </svg>
          </div>
          <div className="font-bold font-mono">Generative SQL</div>
        </button>
      </div>
      <div className="p-2 ">
        <Form.Item name="databaseDropdown" className="-mb-2 text-white">
          <Select
            defaultValue={selectedDatabase}
            onChange={handleChangeDatabase}
            className="w-full"
          >
            {databaseNames.map((dbName) => (
              <Option key={dbName} value={dbName}>
                {dbName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </div>
  );
}

export default Buttons;
