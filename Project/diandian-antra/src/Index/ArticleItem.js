import styles from './ArticleItem.module.css';
import Like from "../images/dianzan2@3x.png";
import Liked from '../images/dianzan1@3x.png';
import {Link} from "react-router-dom";

function ArticleItem({article}) {
    return (
        <div className={styles.articleItem + " flex-box-column flex-box-vertical-center"}>
            <Link to={`/article/${article.id}`}>
                <div className={styles.cover}>
                    <img src={article.coverList && article.coverList.length > 0? article.coverList[0].coverPath: ''}/>
                </div>
            </Link>
            <div className={styles.desc + " flex-box-column flex-box-vertical-start"}>
                <div className={styles.title}>{article.title}</div>
                <div className="space"/>
                <div className={styles.content}>{article.desc}</div>
                <div className="space"/>
                <div className={styles.like + " flex-box-start flex-box-vertical-center"}>
                    <img src={Like} alt=""/>
                    <span>{article.likedCount}</span>
                </div>
            </div>
            <div className={styles.author + " flex-box-between flex-box-vertical-center"}>
                <div
                    className={styles.lt + " flex-box-start flex-box-vertical-center"}>
                    <div className={styles.avatar}>
                        <img className={styles.img}
                             src={article.user.avatar} alt=""/>
                    </div>
                    <div className={styles.username}>{article.user.username}</div>
                </div>
                <div className={styles.rt}>
                    <div className={styles.date}>{article.createdAt.split('T')[0]}</div>
                </div>
            </div>
        </div>
    );
}

export default ArticleItem;
