import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import './index.scss'
import "./App.scss";

import { Form } from "./lib/components/molecules/Form";

const App: React.FC = () => {

  return (
    <>
      <div className="test">
        <Form></Form>
      </div>
    </>
  );
};

export default App;