import React from "react";
import styles from './Feedback.module.css';
import Close from '../images/close2@3x.png';
import api from "../utils/api";

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '0',
            contact: '',
            content: ''
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.submit = this.submit.bind(this);
    }

    async onChangeText(e, keyName) {
        this.setState({
            [keyName]: e.target.value
        })
    }

    async submit() {
        if (!this.state.contact || !this.state.content) {
            this.setState({
                hint: '缺少信息',
                color: 'red'
            })
            return;
        }
        const resp = (await api.submitFeedback({feedback: {type: this.state.type, contact: this.state.contact, content: this.state.content}}));
        if (resp.code === 1) {
            this.setState({
                hint: resp.desc,
                color: 'green',
                type: '0',
                contact: '',
                content: ''
            })
            this.props.onChangeFeedbackShow(false);
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
                         onClick={()=>this.props.onChangeFeedbackShow(false)}><img src={Close} alt=""/>
                    </div>
                    <div className={styles.title}>Feedback</div>
                    <div className={`${styles.form}`}>
                        <div className={'flex-box-vertical-center'}>
                           <div className={`${styles.key} flex-box-vertical-center`}>Category</div>
                           <div className={`${styles.value} flex-box-vertical-center`}>
                               <button value={'0'}
                                       style={{cursor: "pointer"}}
                                       onClick={e=>this.onChangeText(e, 'type')}
                                       className={(this.state.type === '0'? `${styles.selected}`: ``) + ` ${styles.button}`}>ERROR</button>
                               <button value={'1'}
                                       style={{cursor: "pointer"}}
                                       onClick={e=>this.onChangeText(e, 'type')}
                                       className={(this.state.type === '1'? `${styles.selected}`: ``) + ` ${styles.button}`}>SUGGESTION</button>
                               <button value={'2'}
                                       style={{cursor: "pointer"}}
                                       onClick={e=>this.onChangeText(e, 'type')}
                                       className={(this.state.type === '2'? `${styles.selected}`: ``) + ` ${styles.button}`}>OTHER</button>
                           </div>
                        </div>
                        <div className={'flex-box-vertical-center'}>
                           <div className={`${styles.key} flex-box-vertical-center`}>Contact</div>
                           <div className={`${styles.value} flex-box-vertical-center`}>
                               <input type="text"
                                      placeholder={'Your email, phone number or QQ number'}
                                      onChange={e => this.onChangeText(e, 'contact')}/>
                           </div>
                       </div>
                        <div className={'flex-box-vertical-center'}>
                           <div className={`${styles.key} flex-box-vertical-center`}>Content</div>
                           <div className={`${styles.value}`}>
                               <textarea rows={5}
                                         maxLength={140}
                                         placeholder={'Please enter content, no more than 140 words'}
                                         onChange={e=>this.onChangeText(e, 'content')}/>
                           </div>
                       </div>
                    </div>
                    <div className={`${styles.hint}`} style={{color: this.state.color}}>{this.state.hint}</div>
                    <div className={`${styles.submit}`}
                         style={{cursor: "pointer"}}
                         onClick={this.submit}>Submit</div>
                </div>
            </div>
        );
    };
}

export default Feedback;
