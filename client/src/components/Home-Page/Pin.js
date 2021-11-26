import React, { useState, useEffect } from "react";
import "./Pin.css";
import FooterSticky from "../header-footer/FooterSticky";
import FooterTwo from "../header-footer/FooterTwo";

function Pin() {
  var loading = false;

  const names = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
    "61",
    "62",
    "64",
    "66",
    "2",
    "35",
    "17",
    "37",
    "8",
    "29",
  ].map((name, index) => {
    return (
      <img
        key={index}
        className={
          index % 2 === 0
            ? "img card card_large"
            : index % 3 === 0
            ? "img card card_medium"
            : "img card card_small"
        }
        alt={index}
        src={require(`../images/${name}.jpg`).default}
      />
    );
  });
  loading = true;

  // useEffect(() => {
  //     document.onreadystatechange = function() {
  //         if (document.readyState !== "complete") {
  //             document.querySelector(
  //               "#pintttt").style.visibility = "hidden";
  //             document.querySelector(
  //                 "#pintttt").style.display = "none";
  //             document.querySelector(
  //               "#loader").style.visibility = "visible";
  //               setLoading(true);
  //         } else {
  //             document.querySelector(
  //               "#loader").style.display = "none";
  //             document.querySelector(
  //               "body").style.visibility = "visible";
  //         }
  //     };

  // }, [loading])

  return (
    <>
      <main>
        <div className="pin_containers1" id="#pintttt">
          {names}
        </div>
      </main>
      <FooterSticky />
      {/* <FooterTwo/> */}
    </>
  );
}

export default Pin;
