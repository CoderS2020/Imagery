import React, { useEffect, useContext } from 'react';
import './Home.css'
import Pin from './Pin';
import { UserContext } from "../../App";


function Home() {
    const { state, dispatch } = useContext(UserContext);
    const callUserData = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                dispatch({ type: "USER", payload: true });
            }

            if (!res.status === 200 || res.status === 401) {
                return;
            }

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);

        }


    }

    useEffect(() => {
        callUserData();
    }, [])

    return (
        <>
            <Pin />



        </>
    )
}

export default Home;

