import React from 'react';


import { Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";

const routes = () => {

    return (

        <Routes>
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>


    );
}

export default routes;