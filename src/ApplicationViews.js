import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomeView } from "./Components/HomeView"



const ApplicationViews = () => {
    // VARIABLES
    //----------------------------------------------------------------


    // USE STATES
    //----------------------------------------------------------------


    // USE EFFECTS
    //----------------------------------------------------------------

    return (
        <>
            <Routes>
                <Route exact path="/" element={<HomeView />} />
            </Routes>
        </>
    )


}

export default ApplicationViews