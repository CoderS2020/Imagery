import React from 'react';
import FooterSticky from '../../header-footer/FooterSticky';




const Quotes = () => {

    const names = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50","11","19","17"].map((name, index) => {

        return <img key={index} alt={index} className={(index % 2 === 0 ? "img card card_large" : ((index % 3 === 0) ? "img card card_medium" : "img card card_small"))}  src={require(`./quotes/${name}.jpg`).default} />
    })

    return (
        <>
            <div className="pin_containers1">
                {names}
            </div>

        
            <FooterSticky/>
        </>

    )
}

export default Quotes
