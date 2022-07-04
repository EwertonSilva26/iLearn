import React from 'react';


import { Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
import HomeTeacher from "./components/HomeTeacher/HomeTeacher";
import HomeStudent from "./components/HomeStudent/HomeStudent";
import ClassList from "./components/ClassList/ClassList";
import Optional from "./components/Optional/Optional";
import NotFound from "./components/NotFound/NotFound";
// import QuestionList from "./components/QuestionList/QuestionList";
import QuestionTable from "./components/QuestionTable/QuestionTable";


const routes = () => {

    return (

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Login />} />
            <Route path="/teacher/:id" element={<HomeTeacher />} />
            <Route path="/student/:id" element={<HomeStudent />} />
            <Route path="/classes/:id" element={<ClassList />} />
            <Route path="/classes" element={<ClassList />} />
            <Route path="/optional/class/:code" element={<Optional />} />
            <Route path="/class/questions/:code" element={<QuestionTable />} />
            <Route path="class/question/:id_question" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
        </Routes>


    );
}

export default routes;