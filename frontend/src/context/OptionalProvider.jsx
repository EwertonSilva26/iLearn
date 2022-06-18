import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const OptionalContext = React.createContext();

const OptionalProveder = (props) => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  
  return (
    <OptionalContext.Provider
      value={{
        // classes: classes
      }}>
      {props.children}
    </OptionalContext.Provider>
  );
};
export default OptionalProveder;