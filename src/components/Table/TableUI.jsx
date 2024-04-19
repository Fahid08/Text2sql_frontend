import React from "react";
import { Empty } from "antd";
function TableUI({ headers, rows }) {

  if (headers.length === 0 || rows.length === 0) {
    // Render Empty component if either headers or rows is empty
    return <Empty />;
  }

  return (
    <div className="w-full overflow-auto bg-[#121212]">
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 title-font tracking-wider font-bold text-white text-base bg- rounded-tl rounded-bl"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-white">
          {rows.map((row_value, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-[#282828]" : "bg-[#1d1d1d]"}>
              {row_value.map((cell_value, index) => (
                <td
                  key={index}
                  className="border-t-2 border-[#363434] px-4 py-2 text-sm"
                >
                  {cell_value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableUI;
