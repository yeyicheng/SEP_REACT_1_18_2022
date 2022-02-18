import React from "react";
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div
            className="footer flex-box-center flex-box-column flex-box-vertical-center">
            <div>Privacy Policy&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;User Agreement</div>
            <span>Copyright © 2021 Yicheng Ye</span>
            {/*<span>苏公网安备 32****号</span>*/}
        </div>
        );
    };
}

export default Footer;
