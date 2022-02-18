import './Download.css';
import Android from '../images/Android@3x.png';
import Iphone from '../images/iphone@3x.png';
import Header from "./Header";
import React from "react";

class Download extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false
        }
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

    render() {
        return (<div className="download">
            <Header showLogin={this.state.showLogin}
                    showFeedback={this.state.showFeedback}
                    onChangeFeedbackShow={this.onChangeFeedbackShow}
                    onChangeLoginShow={this.onChangeLoginShow}
                    page="download"/>
            <div className="main-wrapper flex-box-vertical-center">
                <div className="main flex-box-vertical-center flex-box-center">
                    <div
                        className="lt flex-box-column flex-box-vertical-center flex-box-center">
                        <div className="logo">LOGO</div>
                        <div
                            className="download flex-box-column flex-box-vertical-center">
                            <div className="qr"></div>
                            <p className="qr-msg">Scan QRCode</p>
                        </div>
                        <div className="button flex-box-center">
                            <div className="button-item flex-box-vertical-center">
                                <img src={Iphone} alt=""/>
                                <div>iPhone</div>
                            </div>
                            <div className="button-item flex-box-vertical-center">
                                <img src={Android} alt=""/>
                                <div>Android</div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="rt flex-box-column flex-box-vertical-center flex-box-center">
                        <p>Placeholder</p>
                        <img className="logo" src="f" alt=""/>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Download;
