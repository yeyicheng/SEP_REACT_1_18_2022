import styles from './ArticleDetail.module.css';
import timestampFormat from "../utils/timestampFormat";

function ArticleSubtitle({article}) {
    return (
        <div
            className={styles.subtitle + " flex-box-between" +
            " flex-box-vertical-center"}>
            <div className="author flex-box-vertical-center">
                <div className={styles.avatar}>
                    <img className={styles.img} src={article.user.avatar} alt=""/>
                </div>
                <div className="username">{article.user.username}</div>
            </div>
            <div className={styles.stats + " flex-box-vertical-center"}>
                <div className="wordCount">Word Count：{article.wordCount}</div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="updatedAt">{timestampFormat(new Date(article.createdAt)) + ' 创建'}</div>
            </div>
        </div>
    );
}

export default ArticleSubtitle;
