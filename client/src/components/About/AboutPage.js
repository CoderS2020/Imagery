import React from "react";
import ImageOne from "./AboutImages/1.jpg";
import ImageTwo from "./AboutImages/2.jpg";
import ImageThree from "./AboutImages/3.jpg";
import ImageFour from "./AboutImages/4.jpg";

import FooterSticky from "../header-footer/FooterSticky";

import "./AboutPage.css";
import FooterTwo from "../header-footer/FooterTwo";

function AboutPage() {
  return (
    <>
      <div class="px-4 text-center ">
        <h2 class="display-4 fw-bold">Curiosity meets creativity here</h2>
      </div>
      <button
        type="button"
        className="btn btn-danger joinCreamzobtn mb-5"
        data-bs-toggle="modal"
        id="clickButtonSignup"
        data-bs-target="#exampleModal"
        data-bs-whatever="@fat"
      >
        Join Imagery
      </button>

      <img src={ImageOne} className="imageOne" alt="Not found" />

      <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 ">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src={ImageTwo}
              class="d-block mx-lg-auto img-fluid imageTwo"
              alt="Bootstrap Themes"
              loading="lazy"
            />
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3">Unity in Diversity</h1>
            <p class="lead">
              We believe that everyone is unique and this uniqueness gifted by
              nature is the root of every creative process.
            </p>
          </div>
        </div>
      </div>

      <div class="container col-xxl-8 px-4 ">
        <div class="row flex-lg-row-reverse align-items-center g-5 ">
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3">Nourish creativity</h1>
            <p class="lead">
              We believe in appreciating every creative endeavour no matter how
              small.
            </p>
          </div>
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src={ImageThree}
              class="d-block mx-lg-auto img-fluid imageTwo"
              loading="lazy"
              alt="Not found"
            />
          </div>
        </div>
      </div>

      <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 ">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src={ImageFour}
              class="d-block mx-lg-auto img-fluid imageTwo"
              loading="lazy"
              alt="Not found"
            />
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3">Appreciating Talent</h1>
            <p class="lead">
              When talent meets opportunity, there is no looking back then. What
              are you waiting for? Start Now!!
            </p>
          </div>
        </div>
      </div>

      <FooterTwo />
    </>
  );
}

export default AboutPage;
