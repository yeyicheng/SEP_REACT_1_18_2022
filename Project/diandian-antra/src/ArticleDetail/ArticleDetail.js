import styles from './ArticleDetail.module.css';
import ArticleSubtitle from "./ArticleSubtitle";
import ArticleTitle from "./ArticleTitle";
import ArticleBody from "./ArticleBody";
import ArticleSidebar from "./ArticleSidebar";
import Header from "../Index/Header";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../utils/api";

function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
    const [top, setTop] = useState(false);

    useEffect(async () => {
        const resp = await api.fetchArticle(id);
        setArticle(resp.data);
        setLoading(false);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [top])

    return (
        loading?<div/>: <div>
            <Header/>
            <div
                className={styles.articleDetail + " flex-box-column flex-box-vertical-center"}>
                <div className={styles.mainWrapper}>
                    <ArticleTitle article={article}/>
                    <ArticleSubtitle article={article}/>
                    <ArticleBody setTop={setTop} article={article}/>
                    <ArticleSidebar article={article}/>
                </div>
            </div>
        </div>
    );
}

export default ArticleDetail;
