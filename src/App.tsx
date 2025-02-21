import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import './index.scss'
import "./App.scss";
import DatePicker from "./lib/components/atoms/DatePickerInput";
import DatePicker2 from "./lib/components/atoms/DatePickerInput2";

const App: React.FC = () => {

  return (
    <>
      <div className="test">
        <div className=""><DatePicker /></div>
        <div className="pt-5"><DatePicker2 /></div>
      </div>
    </>
  );
};

export default App;