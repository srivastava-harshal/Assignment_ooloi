import moment from "moment";
import uuid from "./uuid";

export default function (data, config = {}) {
  const { columns: columnConfig = {} } = config;

  // create row data array
  const rows = [];
  for (let i = 0; i < data.length; i++) {
    let row = { id: uuid() };
    const employee = data[i];
    Object.keys(columnConfig).forEach((key) => {
      if (key === "name") {
        row = {
          ...row,
          ...employee.person,
        };
      } else if (key === "joiningDate") {
        row[key] = moment(employee[key], "DD/MM/YYYY").valueOf();
      } else {
        row[key] = employee[key] || "";
      }
    });
    rows.push(row);
  }

  // create column config array
  const columns = Object.entries(columnConfig).map(([key, value]) => {
    return {
      ...value,
      dataIndex: key,
    };
  });

  return { columns, rows };
}
