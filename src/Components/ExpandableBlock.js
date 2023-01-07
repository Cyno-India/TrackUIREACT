import React, { useState } from "react";
import { FaBeer, FaChevronDown, FaChevronUp } from "react-icons/fa";
const ExpandableBlock = ({ item }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {visible ? (
        <>
          <th
            style={{
              fontWeight: "normal",
              color: "black",
              fontSize: 12,
              borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
              borderRight: "1px solid rgba(0, 0, 0, 0.15)",
              padding: "5px",
            }}
            onClick={() => setVisible(!visible)}
          >
            {item["tracking_info"][0].Date} {"|| "}
            {item["tracking_info"][0].StatusDescription}
            {"||"}
            {item["tracking_info"][0].Details}
            <FaChevronUp color="red" />
          </th>
        </>
      ) : (
        <>
          <th
            style={{
              color: "black",
              fontSize: 12,
              fontWeight: "normal",
              borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
              borderRight: "1px solid rgba(0, 0, 0, 0.15)",
              padding: "5px",
            }}
            onClick={() => setVisible(!visible)}
          >
            {item["tracking_info"][0].StatusDescription}
            <FaChevronDown color="green" />
          </th>
        </>
      )}
    </>
  );
};

export default ExpandableBlock;
