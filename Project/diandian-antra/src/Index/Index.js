import styles from './Index.module.css';
import Banner from '../images/BG@3x.png';
import ArticleItem from "./ArticleItem";
import Header from "./Header";
import React, {useEffect, useState} from "react";
import api from "../utils/api";
import ReactPaginate from "react-paginate";
import {ReactSession} from "react-client-session";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            loading: true,
            key: 1
        };
    }

    onChangeKey = async () => {
        const resp = (await api.fetchRecommendedArticles(12, 0));
        this.setState({
            articles: resp.data,
            totalItems: resp.paging.totalCount
        }, () => {
            this.setState({
                loading: false,
                key: new Date().getTime()
            });
        })
    }

    onChangeLoginShow = (show) => {
        this.setState({
            showLogin: show
        })
    }
    onChangeFeedbackShow = (show) => {
        this.setState({
            showFeedback: show
        })
    }
    async componentDidMount() {
        if (ReactSession.get('token')) {
            const resp = (await api.fetchRecommendedArticles(12, 0));
            await this.setState({
                articles: resp.data,
                totalItems: resp.paging.totalCount
            }, () => {
                this.setState({
                    loading: false,
                });
            })
        }
    }

    render() {
        return (
            <div>
                <Header showLogin={this.state.showLogin}
                        showFeedback={this.state.showFeedback}
                        onChangeFeedbackShow={this.onChangeFeedbackShow}
                        onChangeLoginShow={this.onChangeLoginShow}
                        onChangeKey={this.onChangeKey}/>
                <div className={styles.banner}>
                    <img src={Banner} alt=""/>
                </div>
                <div className={styles.mainWrapper}>
                    <div className={styles.main}>
                        <div
                            className={styles.nav + " flex-box-start"}>
                            <div style={{cursor: 'pointer'}}
                                 className={styles.navItem + " flex-box-column flex-box-vertical-center"}>
                                <div>Recommended Articles</div>
                                <div className={this.state.selected === 0 ? styles.selected : ''}/>
                            </div>
                        </div>
                        {this.state.loading?<div/>: <div>
                            <PaginatedItems key={this.state.key} itemsPerPage={12} totalCount={this.state.totalItems}/>
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    };
}

function Articles({articles, totalCount, page, totalPage}) {
    return <div className={styles.article + " flex-box-vertical-center flex-box-center flex-box-wrap"}>
        {
            articles.map(a => <ArticleItem key={a.id} article={a}/>)
        }
        {
            ((+totalCount % 12 === 1 || +totalCount % 12 === 4 || +totalCount % 12 === 7 ||
                    +totalCount % 12 === 10)&& +page === (Math.ceil(totalPage) - 1) &&
                <div style={{display:"flex", visibility: "hidden"}}>
                    <ArticleItem key={1} article={{user: {}, createdAt:""}}/>
                    <ArticleItem key={3} article={{user:{}, createdAt:""}}/>
                </div>) ||
            ((+totalCount % 12 === 2 || +totalCount % 12 === 5 || +totalCount % 12 === 8 ||
                    +totalCount % 12 === 11)&& +page === (Math.ceil(totalPage) - 1) &&
                <div style={{display:"flex", visibility: "hidden"}}>
                    <ArticleItem key={2} article={{user: {}, createdAt:""}}/>
                </div>)
        }
    </div>
}

function PaginatedItems({ itemsPerPage, totalCount }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState([]);
    const [rank, setRank] = useState(0);
    const [page, setPage] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.

    useEffect( async () => {
        // Fetch items from another resources.
        const resp = await api.fetchRecommendedArticles(12, rank);
        setCurrentItems(resp.data || []);
    },  [rank]);

    // Invoke when user click to request another page.
    const handlePageClick = async (event) => {
        const page = event.selected
        setRank(page * itemsPerPage);
        setPage(page);
    };

    return (
        <>
            <Articles articles={currentItems || []} totalCount={totalCount} page={page} totalPage={totalCount / itemsPerPage}/>
            <ReactPaginate
                previousLabel="Prev"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={totalCount / itemsPerPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
            />
        </>
    );
}


export default Index;
