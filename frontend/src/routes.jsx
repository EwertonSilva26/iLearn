import React from 'react';


import { Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
import HomeTeacher from "./components/HomeTeacher/HomeTeacher";
import HomeStudent from "./components/HomeStudent/HomeStudent";
import ClassList from "./components/ClassList/ClassList";
import NotFound from "./components/NotFound/NotFound";
import Question from "./components/Question/Question";
import QuestionTable from "./components/QuestionTable/QuestionTable";


const routes = () => {

    return (

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/teacher/:id" element={<HomeTeacher />} />
            <Route path="/student/:id" element={<HomeStudent />} />
            <Route path="/classes/student/:id" element={<ClassList />} />
            <Route path="/questions/class/:code" element={<QuestionTable />} />
            <Route path="/question/:id/class/:code" element={<Question />} />
            <Route path="*" element={<NotFound />} />
        </Routes>

    );
}

export default routes;