import styles from './ArticleDetail.module.css';
import ArticleGoToTop from "./ArticleGoToTop";

function ArticleBody({article, setTop}) {
    return (
        <div className={styles.body + " relative"}>
            <div dangerouslySetInnerHTML={{ __html: new Buffer(article.content, 'base64').toString('utf-8') }} />
            <ArticleGoToTop setTop={setTop}/>
        </div>
    );
}

export default ArticleBody;
