import React from 'react';
import "./Explore.css";

import Quote from '../Explore/ExploreImages/quotes.png'
import Art from '../Explore/ExploreImages/Arts.png'
import Photography from '../Explore/ExploreImages/photography1.png'

import { Link } from "react-router-dom";



function Explore() {
    return (
        <>

            <div class="album py-5">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div class="col">
                            <Link to="/quotes">
                                <div class="card shadow-sm hoverfade">
                                    <img src={Quote} alt="" />
                                </div>
                            </Link>
                        </div>
                        <div class="col">
                            <Link to="/art">
                                <div class="card shadow-sm hoverfade">
                                    <img src={Art} alt="" />

                                </div>
                            </Link>
                        </div>
                        <div class="col">
                            <Link to="/photography">
                                <div class="card shadow-sm hoverfade">
                                    <img src={Photography} alt="" />

                                </div>
                            </Link>
                        </div>

                    </div>


                </div>
            </div>
          


        </>

    )
}

export default Explore
