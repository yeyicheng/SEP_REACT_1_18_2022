import styles from './ArticleDetail.module.css';

function ArticleTitle({article}) {
    return (
        <div
            className={styles.title + " flex-box-vertical-center"}>
            {article.title}
        </div>
    );
}

export default ArticleTitle;
