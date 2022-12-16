import "./App.css";
import React, { Component } from "react";
import Navbar from "./Component/Navbar";
import News from "./Component/News";
import AboutUs from "./Component/AboutUs";
// import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 9;
  apiKey = process.env.REACT_NEWS_API;
  state = {
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({
      progress:progress
    })
  }


  render() {
    return (
      <Router>
        <div className="outer">
          <Navbar />
          <div>
            <LoadingBar
              color="#f11946"
              progress={this.state.progress}
              
            />
          </div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News apiKey={this.apiKey} setProgress = {this.setProgress}  
                  key="general"
                  category="general"
                  country="in"
                  pageSize={this.pageSize}
                />
              }
            ></Route>

            <Route
              exact
              path="/business"
              element={
                <News apiKey={this.apiKey} setProgress = {this.setProgress}  
                  key="business"
                  category="business"
                  country="in"
                  pageSize={this.pageSize}
                />
              }
            ></Route>

            <Route
              exact
              path="/entertainment"
              element={
                <News apiKey={this.apiKey} setProgress = {this.setProgress}  
                  key="entertainment"
                  category="entertainment"
                  country="in"
                  pageSize={this.pageSize}
                />
              }
            ></Route>

            <Route
              exact
              path="/health"
              element={
                <News apiKey={this.apiKey} setProgress = {this.setProgress}  
                  key="health"
                  category="health"
                  country="in"
                  pageSize={this.pageSize}
                />
              }
            ></Route>
            <Route
              exact
              path="/science"
              element={
                <News apiKey={this.apiKey} setProgress = {this.setProgress}  
                  key="science"
                  category="science"
                  country="in"
                  pageSize={this.pageSize}
                />
              }
            ></Route>

            <Route
              exact
              path="/sports"
              element={
                <News apiKey={this.apiKey} setProgress = {this.setProgress}  
                  key="sports"
                  category="sports"
                  country="in"
                  pageSize={this.pageSize}
                />
              }
            ></Route>

            <Route
              exact
              path="/technology"
              element={
                <News apiKey={this.apiKey} setProgress = {this.setProgress}  
                  key="technology"
                  category="technology"
                  country="in"
                  pageSize={this.pageSize}
                />
              }
            ></Route>
            <Route exact path="/aboutus" element={<AboutUs  />} >
            </Route>
          </Routes>
        </div>
      </Router>
    );
  }
}
