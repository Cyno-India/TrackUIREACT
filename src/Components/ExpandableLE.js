
import React, { useState } from "react";
import { FaBeer, FaChevronDown, FaChevronUp } from "react-icons/fa";

const ExpandableLE=({item}) =>{
    const [visible, setVisible] = useState(false);
  return (
    <>
    {visible ? (
      <>
        <th onClick={() => setVisible(!visible)}>
          {item["tracking_info"][0].Date} {"|| "}
          {item["tracking_info"][0].StatusDescription}
          {"||"}
          {item["tracking_info"][0].Details}
          <FaChevronUp />
        </th>
      </>
    ) : (
      <>
        <th onClick={() => setVisible(!visible)}>
          {item["tracking_info"][0].StatusDescription}
          <FaChevronDown />
        </th>
      </>
    )}
  </>
  )
}
export default ExpandableLE
