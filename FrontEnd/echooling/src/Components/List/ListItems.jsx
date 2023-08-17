import React from "react";
import Syles from "../List/ListStyles.module.css"
const ListItems = ({ ListHeader, ListItems }) => {
  return (
    <div>
      <h2 className={Syles.ListHeader} color="white">{ListHeader}</h2>
      <ul>
        {ListItems?.map((item, index) => (
          <li className={Syles.ListItems} key={index}><a href="">{item}</a> </li>
        ))}
      </ul>
    </div>
  );
};

export default ListItems;
