import React from 'react';


import { Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
import HomeTeacher from "./components/HomeTeacher/HomeTeacher";
import HomeStudent from "./components/HomeStudent/HomeStudent";
import ClassList from "./components/ClassList/ClassList";
import Optional from "./components/Optional/Optional";
import NotFound from "./components/NotFound/NotFound";
import QuestionList from "./components/QuestionList/QuestionList";

const routes = () => {

    return (

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Login />} />
            <Route path="/teacher/:id" element={<HomeTeacher />} />
            <Route path="/student/:id" element={<HomeStudent />} />
            <Route path="/classes" element={<ClassList />} />
            <Route path="/classe/:id" element={<ClassList />} />
            <Route path="/choice" element={<Optional />} />
            <Route path="/questions" element={<QuestionList />} />
            <Route path="*" element={<NotFound />} />
        </Routes>


    );
}

export default routes;