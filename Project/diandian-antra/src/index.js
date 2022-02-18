import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './App.css';
import Index from "./Index/Index";
import About from "./Index/About";
import Download from "./Index/Download";
import Footer from "./Index/Footer";
import ArticlePost from "./ArticlePost/ArticlePost";
import ArticleDetail from "./ArticleDetail/ArticleDetail";
import axios from "axios";
import {ReactSession} from "react-client-session";
import DraftBox from "./DraftBox/DraftBox";

ReactSession.setStoreType("localStorage");
axios.defaults.headers.common['Authorization'] = 'Token ' + ReactSession.get("token")

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/download" element={<Download/>}/>
                <Route path="/article/:id" element={<ArticleDetail/>}/>
                <Route path="/post" element={<ArticlePost/>}/>
                <Route path="/post/:id" element={<ArticlePost/>}/>
                <Route path="/draftbox" element={<DraftBox/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
