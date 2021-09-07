import React from 'react';
import FooterSticky from '../header-footer/FooterSticky';
import "../Home-Page/Pin.css";


const Popular = () => {
    const images = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "2", "7"].map((name, index) => {

        return <img key={index} className={(index % 2 === 0 ? "img card card_large" : ((index % 3 === 0) ? "img card card_medium" : "img card card_small"))} alt="Uploading" src={require(`./ExploreImages/${name}.jpg`).default} />
    })
    return (
        <>
            <div className="pin_containers1">
                {images}



            </div>

           <FooterSticky/>
        </>
    )
}

export default Popular
