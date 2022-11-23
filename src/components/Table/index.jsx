import React, { useState } from "react";
import moment from "moment";

import Arrows from "../Arrows";
import Images from "../../assets/Images";

import generateTableData from "../../utils/generateTableData";

import "./styles.css";

const Table = ({ data, config }) => {
  const { width = "100%" } = config;
  const { columns, rows } = generateTableData(data, config);
  const [sortOrder, setSortOrder] = useState(1);
  const [sortColumn, setSortColumn] = useState("");

  const handleSort = (dataIndex) => {
    if (sortColumn === dataIndex) {
      setSortOrder((prev) => (prev === 1 ? -1 : 1));
    } else {
      setSortColumn(dataIndex);
      setSortOrder(1);
    }
  };

  const compareFn = (a, b) => {
    let result = 0;
    if (a[sortColumn] < b[sortColumn]) result = -1;
    if (a[sortColumn] > b[sortColumn]) result = 1;
    return sortOrder * result;
  };

  const getText = (type, text, dataIndex) => {
    if (dataIndex === "name") {
      return (
        <div>
          <div className="avatar">
            <img src={Images.AVATAR} />
          </div>
          <span>{text}</span>
        </div>
      );
    }
    if (type === "email") return <a href={`mailto: ${text}`}>{text}</a>;
    if (type === "date") {
      return moment(text).format("DD/MM/YYYY");
    }
    return text;
  };

  const rowsJSX = () => {
    return rows.sort(compareFn).map((row) => (
      <tr key={row.id}>
        {columns.map(({ dataIndex, type = "text" }) => {
          const key = row.id + dataIndex;
          const text = row[dataIndex];
          return <td key={key}>{getText(type, text, dataIndex)}</td>;
        })}
      </tr>
    ));
  };

  return (
    <div className="table-wrapper" style={{ width }}>
      <table>
        <thead>
          <tr>
            {columns.map(({ title, isSortable, dataIndex, style }) => (
              <td key={title} style={style}>
                <div>
                  <p>{title}</p>
                  {isSortable && (
                    <div
                      className={sortColumn === dataIndex ? "sort-active" : ""}
                      onClick={() => handleSort(dataIndex)}
                    >
                      <Arrows />
                    </div>
                  )}
                </div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>{rowsJSX()}</tbody>
      </table>
    </div>
  );
};

export default Table;
