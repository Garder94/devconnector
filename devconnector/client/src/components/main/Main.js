import React, { Component } from "react";
import MainForm from "./MainForm";
import MainFeed from "./MainFeed";
import MainCategory from "./MainCategory";

class Main extends Component {
  render() {
    return (
      <div>
        <MainForm />
        <div className="row">
          <div className="col-12">
            {" "}
            <button type="button" className="btn btn-info btn-block">
              New projects at the Makerspace, Link
            </button>
          </div>
        </div>
        <MainFeed />
        <div className="row">
          <div className="col-12">
            <button type="button" className="btn btn-info btn-block">
              Explore by category
            </button>
          </div>
        </div>
        <MainCategory />
      </div>
    );
  }
}

export default Main;
