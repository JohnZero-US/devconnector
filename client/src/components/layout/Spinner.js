//
import React, { Fragment } from "react";
import spinner from "./spinner.gif";

//读取中的图片
export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: "200px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);
