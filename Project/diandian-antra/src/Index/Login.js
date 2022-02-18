import React from "react";
import styles from './Login.module.css';
import QQ from '../images/QQ@3x.png';
import WeChat from '../images/weixin@3x.png';
import Close from '../images/close2@3x.png';
import api from "../utils/api";
import {ReactSession} from "react-client-session";
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '18351258351',
            password: '123456',
            hint: '',
            email: 'ye.yicheng123@gmail.com',
            username: 'YichengYe'
        }
    }

    componentDidMount() {
        ReactSession.setStoreType("localStorage");
    }

     onChangeText = async (e, keyName) => {
        this.setState({
            [keyName]: e.target.value
        })
    }

    login = async () => {
        const resp = (await api.login({user: {phone: this.state.phone, password: this.state.password}}));
        if (resp.code === 1) {
            ReactSession.set('token', resp.data.token);
            ReactSession.set('userId', resp.data.userID);

            axios.defaults.headers.common['Authorization'] = 'Token ' + resp.data.token;

            this.setState({
                hint: resp.desc,
                color: 'green'
            })
            this.props.onChangeLoginShow(false);
            this.props.onChangeKey();
        } else {
            this.setState({
                hint: resp.desc,
                color: 'red'
            })
        }
    }

    register = async () => {
        const resp = (await api.register({user: {
            phone: this.state.phone, password: this.state.password, email: this.state.email, username: this.state.username}}));
        if (resp.code === 1) {
            this.setState({
                hint: resp.desc,
                color: 'green'
            });
        } else {
            this.setState({
                hint: resp.desc,
                color: 'red'
            })
        }
    }

    render() {
        return (
            <div className={styles.modal} style={{display: this.props.show? 'block': 'none'}}>
                <div
                    className={`${styles.window} flex-box-column flex-box-vertical-center`}>
                    <div className={styles.close}
                         style={{cursor: "pointer"}}
                         onClick={()=>this.props.onChangeLoginShow(false)}>
                        <img src={Close} alt=""/>
                    </div>
                    <div className={styles.title}>Login</div>
                    <div className={`${styles.form} flex-box-vertical-center flex-box-column`}>
                        <div className={`${styles.formItem} username flex-box-vertical-center`}>
                            <input type="text" defaultValue={this.state.username}
                                   onChange={e => this.onChangeText(e, 'username')} placeholder={"Please enter username"}/>
                        </div>
                        <div className={`${styles.formItem} email flex-box-vertical-center`}>
                            <input type="text" defaultValue={this.state.email}
                                   onChange={e => this.onChangeText(e, 'email')} placeholder={"Please enter email"}/>
                        </div>
                        <div
                            className={`${styles.formItem} phone flex-box-vertical-center`}>
                            <input type="text" defaultValue={this.state.phone}
                                   onChange={e => this.onChangeText(e, 'phone')}
                                   placeholder={"Please enter your phone number"}/>
                        </div>
                        <div className={`${styles.formItem} code flex-box-vertical-center`}>
                            <input type="password" defaultValue={this.state.password}
                                   onChange={e => this.onChangeText(e, 'password')} placeholder={"Please enter password"}/>
                        </div>
                    </div>
                    <div className={`${styles.hint}`} style={{color: this.state.color}}>{this.state.hint}</div>
                    <div>
                        <div className={`${styles.submit}`}
                             style={{cursor: "pointer"}}
                             onClick={this.login}>Login</div>
                        <div className={`${styles.submit}`}
                             style={{cursor: "pointer"}}
                             onClick={this.register}>Register</div>
                    </div>
                    <div
                        className={`${styles.social} flex-box-center flex-box-vertical-center`}>
                        <div className={`${styles.socialItem} wechat`}>
                            <img src={WeChat} alt=""/>
                        </div>
                        <div className={`${styles.socialItem} qq`}>
                            <img src={QQ} alt=""/>
                        </div>
                    </div>
                    <div className={styles.agreement}>
                        By logging in you consent to&nbsp;&nbsp;<a href={"/"}>Privacy Policy</a>&nbsp;&nbsp;and&nbsp;&nbsp;
                        <a href={"/"}>User Agreement</a>
                    </div>
                </div>
            </div>
        );
    };
}

export default Login;
