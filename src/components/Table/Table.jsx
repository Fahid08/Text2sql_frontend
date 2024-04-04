import React from "react";
import { CSVLink } from "react-csv";
import { Spin, Empty } from "antd";
import TableUI from "./TableUI";
import "./style.css";

function Table({ query, headers, rows, csvData, loading, error }) {
  return (
    <div className="bg-[#242424] table-height">
      {query ? (
        <section className="text-gray-600 body-font overflow-auto result-container">
          {!error && (
            <div className="flex w-full justify-between lg:mt-0 result-header">
              <h1>Result</h1>
              <CSVLink
                data={csvData}
                filename={new Date().getTime().toString() + ".csv"}
                className="p-2"
              >
                <button className="flex mx-auto text-white  border-0 py-2 h-11 px-4 focus:outline-none rounded justify-center items-center">
                  <span className="pl-2 font-semibold">Export CSV</span>
                </button>
              </CSVLink>
            </div>
          )}
          {/* This code block is a conditional rendering in the React component `Table`. It checks the
          value of the `loading` prop to determine what to render. */}

          {loading ? ( // Render Spin component if loading is true
            <div className="loading-spinner justify-center text-center">
              <Spin size="large" />
            </div>
          ) : (
            <TableUI headers={error ? [] : headers} rows={error ? [] : rows} />
          )}
        </section>
      ) : (
        <div className="w-full query-results flex text-center h-[450px] bg-[#242424] text-white items-center justify-center font-bold font-mono text-2xl px-6">
          {loading ? ( // Render Spin component if loading is true
            <div className="absolute bottom-[120px]">
              <Spin size="large" />
            </div>
          ) : error ? (
              <Empty />
          ) : (
            <h1 className="-mt-16">Run Query to See Results</h1>
          )}
        </div>
      )}
    </div>
  );
}

export default Table;
