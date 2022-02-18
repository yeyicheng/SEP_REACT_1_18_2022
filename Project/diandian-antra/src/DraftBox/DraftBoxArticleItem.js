import React, {useState} from 'react'
import styles from "./DraftBox.module.css";
import {Link} from "react-router-dom";

function DraftBoxArticleItem({article, setWarning, setId}) {
    return (
        <div className={styles.articleItem + ' flex-box-vertical-center flex-box-between'}>
            <div className={styles.lt}>
                <div className={styles.title}>{article.title || '未命名'}</div>
                <div className={styles.subtitle}>{article.createdAt.split('T')[0]}</div>
            </div>
            <div className={styles.rt + " flex-box-vertical-center"}>
                <div onClick={async () => {
                    setWarning(true);
                    setId(article.id);
                }} className={`${styles.btn} ${styles.btnDel}`}>Delete</div>
                <Link to={'/post/' + article.id} className={`${styles.btn} ${styles.btnEdit}`}>Edit</Link>
            </div>
        </div>
    );
}

export default DraftBoxArticleItem;
