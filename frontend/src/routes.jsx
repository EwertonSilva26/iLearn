import React from 'react';


import { Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
import HomeTeacher from "./components/HomeTeacher/HomeTeacher";
import HomeStudent from "./components/HomeStudent/HomeStudent";
import ClassList from "./components/ClassList/ClassList";
import NotFound from "./components/NotFound/NotFound";

const routes = () => {

    return (

        <Routes>
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/" element={<HomeTeacher />} />
            <Route path="/home" element={<HomeTeacher />} />
            <Route path="/classes" element={<ClassList />} />
            <Route path="*" element={<NotFound />} />
        </Routes>


    );
}

export default routes;