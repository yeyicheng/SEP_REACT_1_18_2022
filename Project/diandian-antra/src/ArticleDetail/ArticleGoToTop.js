import styles from './ArticleDetail.module.css';

function ArticleGoToTop({setTop}) {
    return (
        <div className={styles.gotoTop + " absolute"} onClick={e=>setTop(new Date().getTime())}>

        </div>
    );
}

export default ArticleGoToTop;
