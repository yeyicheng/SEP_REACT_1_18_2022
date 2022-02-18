import styles from './ArticleDetail.module.css';
import Liked from '../images/dianzan1@3x.png';
import Like from '../images/dianzan2@3x.png';
import LikeHover from '../images/dianzan3@3x.png';
import Share from '../images/article_detail/fenxiang@3x.png';
import React from "react";
import api from "../utils/api";

class ArticleSubtitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHover: false,
            liked: this.props.article.likeStatus,
            likedCount: this.props.article.likedCount
        }
        this.updateHover = this.updateHover.bind(this);
        this.updateLike = this.updateLike.bind(this);
    }

    async updateLike(like) {
        if (like) {
            await api.likeArticle(this.props.article.id);
        } else {
            await api.unlikeArticle(this.props.article.id);
        }
        this.setState({
            liked: like,
            likedCount: like? this.state.likedCount + 1: this.state.likedCount - 1
        });
    }

    updateHover(bool) {
        this.setState({
            isHover: bool
        })
    }

    render() {
        return (
            <div className={styles.sidebar}>
                <div onClick={e => this.state.liked? this.updateLike(false): this.updateLike(true)}
                     className={styles.sidebarItem + " flex-box-vertical-center " + (this.state.liked && styles.liked)}>
                    <div className={styles.icon}>
                        <img src={this.state.liked? Liked:LikeHover} alt="" />
                    </div>
                    <div className={styles.text + " " + (this.state.liked && styles.liked)}>{this.state.likedCount}</div>
                </div>
                <div className={styles.sidebarItem + " flex-box-vertical-center"}>
                    <div className={styles.icon}>
                        <img src={Share} alt=""/>
                    </div>
                    <div className={styles.text}>WechatShare</div>
                </div>
                <div className={styles.sidebarItem + " flex-box-vertical-center"}>
                    <div className={styles.icon}>
                        <img src={Share} alt=""/>
                    </div>
                    <div className={styles.text}>QQshare</div>
                </div>
            </div>
        );
    }
}

export default ArticleSubtitle;
