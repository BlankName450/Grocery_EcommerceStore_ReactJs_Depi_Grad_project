import React, { Component, Fragment } from "react";
import Title from "../common/SectionTitle";
import SubTitle from "../common/SubTitle";
import Card1 from "../common/card1";
import { faCreditCard,faNewspaper,faMoneyCheckDollar,faIdCard } from "@fortawesome/free-solid-svg-icons";

const Section1 = () => {
  return (
    <div id="About"
      style={{ backgroundColor: "#ede8e8" }}
      className="text-center d-flex flex-column justify-content-center align-items-center py-4"
    >
      <Title title="Apply Online" />
      <SubTitle title="Apply online now for cards and loans with ease" />

      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ minHeight: "200px" }}>
          <div className="col-12 col-md-4 mb-4 d-flex justify-content-center">
            <Card1 icon={faIdCard} title="Apply for a New Account" />
          </div>

          <div className="col-12 col-md-4 mb-4 d-flex justify-content-center">
            <Card1 icon={faCreditCard} title="Apply for a Credit Card" />
          </div>

          <div className="col-12 col-md-4 mb-4 d-flex justify-content-center">
            <Card1 icon={faMoneyCheckDollar} title="Apply for a Loan or overdraft" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;