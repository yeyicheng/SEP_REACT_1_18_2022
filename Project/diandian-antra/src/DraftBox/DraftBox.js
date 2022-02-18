import React, {useEffect, useState} from 'react';
import Header from "../Index/Header";
import styles from "./DraftBox.module.css";
import DraftBoxGoToTop from "./DraftGoToTop";
import api from "../utils/api";
import DraftBoxArticleItem from "./DraftBoxArticleItem";

function DraftBox() {
    const [articles, setArticles] = useState({});
    const [loading, setLoading] = useState(true);
    const [top, setTop] = useState(false);
    const [warning, setWarning] = useState(false);
    const [id, setId] = useState(null);
    const [del, setDel] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(async () => {
        const resp = await api.fetchDrafts();
        setArticles(resp.data);
        setLoading(false);
    }, []);

    useEffect(async () => {
        if (del) {
            await api.deleteArticle(id);
            setDel(false);
            setWarning(false);
            setArticles(articles.filter(a => a.id !== id));
        }
    }, [del]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [top])

    return (
        <div className={'relative'}>
            <Header showLogin={showLogin}
                    showFeedback={showFeedback}
                    onChangeFeedbackShow={setShowFeedback}
                    onChangeLoginShow={setShowLogin} />
            <div className={styles.draftBox + " flex-box-column flex-box-vertical-center"}>
                <div className={styles.mainWrapper + " flex-box-vertical-center"}>
                    <div className={styles.body + ' relative'}>
                        {loading ? <div/> : articles.map((a) => {
                            return (<DraftBoxArticleItem article={a} setId={setId} setWarning={setWarning}/>);
                        })}
                        <DraftBoxGoToTop setTop={setTop}/>
                    </div>
                </div>
            </div>

            <div className={styles.modal + ' flex-box-vertical-center'} style={{display: warning ? 'block' : 'none'}}>
                <div style={{display: warning? 'flex': 'none', inset: 0, margin: 'auto', width: '30%'}}
                     className={styles.warningBox + ' flex-box-column flex-box-vertical-center flex-box-center absolute'}>
                    <div className={styles.first}>
                        This operation will delete the draft permanently, continue?
                    </div>
                    <div className={styles.second+  ' flex-box-vertical-center'}>
                        <div className={styles.btn} onClick={() => setWarning(false)}>Cancel</div>
                        <div className={`${styles.btn} ${styles.btnConfirm}`} onClick={() => setDel(true)}>Confirm</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DraftBox;
