import './About.css';
import Header from "./Header";
import React from "react";

class About extends React.Component {
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
        return (
            <div className="about">
                <Header showLogin={this.state.showLogin}
                        showFeedback={this.state.showFeedback}
                        onChangeFeedbackShow={this.onChangeFeedbackShow}
                        onChangeLoginShow={this.onChangeLoginShow}
                        page="about"/>
                <div className="main-wrapper flex-box-vertical-center">
                    <div className="main flex-box-vertical-center flex-box-center">
                        <div className="lt">
                            <p>Placeholder</p>
                            <p>Placeholder</p>
                            <p>Placeholder</p>
                            <p>Placeholder</p>
                        </div>
                        <div className="rt">
                            <img src="" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
