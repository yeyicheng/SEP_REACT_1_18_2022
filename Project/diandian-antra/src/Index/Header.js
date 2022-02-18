import React from "react";
import {ReactSession} from 'react-client-session';
import {Link} from 'react-router-dom';
import Post from "../images/header/fabu1@3x.png";
import DraftBox from "../images/header/cgx@3x.png";
import './Header.css';
import Login from "./Login";
import Feedback from "./Feedback";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token_key: 1
        };
    }
    render() {
        ReactSession.setStoreType("localStorage");
        const token = ReactSession.get('token');
        let today = new Date();
        today = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        return (
            <div>
                <Login show={this.props.showLogin}
                       onChangeKey={this.props.onChangeKey}
                       onChangeLoginShow={this.props.onChangeLoginShow}/>
                <Feedback show={this.props.showFeedback} onChangeFeedbackShow={this.props.onChangeFeedbackShow}/>
                <div className="navigation-bar flex-box-between flex-box-vertical-center">
                    <div className="menu flex-box-vertical-center">
                        <div className="menu-item"><Link to="/">LOGO</Link></div>
                        <div className={`${this.props.page === 'about' ? 'selected' : ''} menu-item`}>
                            <Link to="/about">About</Link>
                        </div>
                        <div className={`${this.props.page === 'download' ? 'selected' : ''} menu-item`}>
                            <Link to="/download">Download</Link>
                        </div>
                        <div className="menu-item">
                            <div onClick={e=>this.props.onChangeFeedbackShow(true)}
                                 style={{cursor: "pointer"}}
                            >Feedback</div>
                        </div>
                    </div>
                    <div key={this.state.token_key} className="login flex-box-vertical-center">
                        <div className="login-item today">{today}</div>
                        {token &&
                        <Link to="/post" ><div className="login-item flex-box-vertical-center">
                            <img className="icon"
                                 src={Post}/>
                            <div className="text">New Post</div>
                        </div></Link>
                        }
                        {token &&
                            <Link to="/draftbox" ><div className="login-item flex-box-vertical-center">
                                <img className="icon"
                                     src={DraftBox}/>
                                <div className="text">Draft</div>
                            </div></Link>
                        }
                        {token &&
                            <div className="login-item text"
                                 style={{cursor: "pointer", marginTop: '0.21vw'}}
                                 onClick={_=>{
                                     ReactSession.remove("token");
                                     this.setState({
                                        token_key: new Date().getTime()
                                     });
                                 }}>Logout</div>
                        }
                        {!token &&
                        <div className="login-item"
                             style={{cursor: "pointer"}}
                             onClick={e=>this.props.onChangeLoginShow(true)}>Login</div>
                        }
                    </div>
                </div>
            </div>
        );
    };
}

export default Header;
