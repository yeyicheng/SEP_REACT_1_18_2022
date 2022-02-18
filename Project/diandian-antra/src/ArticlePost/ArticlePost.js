import styles from './ArticlePost.module.css';
import Header from "../Index/Header";
import React from 'react';
import {ReactSession} from "react-client-session";
import E from 'wangeditor'
import Audio from './audio/index'
import AddCover from '../images/article_post/tjtp@3x.png';
import Close from '../images/article_post/cloose1@3x.png';
import api from "../utils/api";
import {useParams} from "react-router-dom";
import i18next from "i18next";

const OSS = require("ali-oss");
const {uuid} = require('uuidv4');

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ArticlePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            count: 0,
            cur: 0,
            links: [],
            audio: '',
            id: props.params.id
        }
        this.save = this.save.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeLoginShow = this.onChangeLoginShow.bind(this);
        this.onChangeFeedbackShow = this.onChangeFeedbackShow.bind(this);
    }

    onChangeLoginShow(show) {
        this.setState({
            showLogin: show
        })
    }
    onChangeFeedbackShow(show) {
        this.setState({
            showFeedback: show
        })
    }

    // 具体值需要去阿里云控制台获取
    client_image = new OSS({
        accessKeyId: 'LTAI4G3mJiTLpYpekSTdkBxE',
        accessKeySecret: '55HUPceg7xBxF4dY2XL7RDhBzc7xwc',
        // stsToken: data.securityToken,
        region: 'oss-cn-beijing', // oss地区
        bucket: 'reader-draftbox-article-images'
    });

    client_voice = new OSS({
        accessKeyId: 'LTAI4G3mJiTLpYpekSTdkBxE',
        accessKeySecret: '55HUPceg7xBxF4dY2XL7RDhBzc7xwc',
        // stsToken: data.securityToken,
        region: 'oss-cn-beijing', // oss地区
        bucket: 'reader-draftbox-article-voices'
    });
    
    token;
    editor;

    onChangeText(e, keyName) {
        this.setState({
            [keyName]: e.target.value
        });
    }

    async componentDidMount() {
        ReactSession.setStoreType("localStorage");
        this.token = ReactSession.get('token');

        this.editor = new E('#div1');

        this.editor.config.height = 400;
        this.editor.config.uploadImgServer = '/';
        this.editor.config.uploadVideoAccept = ['mp3', 'wav'];
        this.editor.config.zIndex = 100
        this.editor.config.placeholder = 'Start your article...';
        const videoIndex = this.editor.config.menus.indexOf('video');
        this.editor.menus.extend('uploadAudio', Audio);
        this.editor.config.menus.splice(videoIndex, 1, 'uploadAudio');
        this.editor.config.lang = 'en';
        this.editor.i18next = i18next;
        this.editor.create();

        if (this.state.id) {
            this.setState({
                article: (await api.fetchArticle(this.state.id)).data
            }, () => {
                this.editor.txt.html(new Buffer(this.state.article.content, 'base64').toString('utf-8'));
                this.setState({
                    links: this.state.article && this.state.article.coverList.map(c=>c.coverPath) || [],
                    cur: this.state.article && this.state.article.coverList.length || 0,
                })
            });
        }

        this.editor.config.customUploadImg = (resultFiles, insertImgFn) => {
            // resultFiles 是 input 中选中的文件列表
            // insertImgFn 是获取图片 url 后，插入到编辑器的方法
            this.client_image.put(`${ReactSession.get('userId')}_${uuid()}`, resultFiles[0])
                .then(function (res) {
                    // 上传图片，返回结果，将图片插入到编辑器中
                    insertImgFn(res.url)
                }).catch(function (err) {
                console.log(err)
            });
        }

        this.editor.config.customUploadVideo =  (resultFiles, insertVideoFn) => {
            // resultFiles 是 input 中选中的文件列表
            // insertVideoFn 是获取视频 url 后，插入到编辑器的方法
            this.client_voice.put(`${ReactSession.get('userId')}_${uuid()}`, resultFiles[0])
                .then((res) => {
                    // 上传视频，返回结果，将视频插入到编辑器中
                    insertVideoFn(res.url);
                    this.setState({
                        audio: res.url
                    });
                }).catch(function (err) {
                console.log(err)
            })
        }
    }

    async save(status) {
        let resp;
        if (this.state.article) {
            resp = (await api.saveDraft({
                id: this.state.article.id,
                article: {
                    "title": this.state.article.title,
                    "content": Buffer.from(this.editor.txt.html().toString()).toString('base64'),
                    "voicePath": this.state.article.audio,
                    "status": status,
                    "coverList": this.state.links.map(l => {
                        return {"coverPath": l};
                    }),
                    "wordCount": this.editor.txt.text().toString().length,
                    "desc": this.editor.txt.text().substring(0, 40),
                    "tags": (this.state.article && this.state.article.tagList.map(t=>t.name).join(",") || '').replaceAll(' ', '')
                }
            }))
        } else {
            resp = (await api.saveArticle({
                article: {
                    "title": this.state.title,
                    "content": Buffer.from(this.editor.txt.html().toString()).toString('base64'),
                    "voicePath": this.state.audio,
                    "status": status,
                    "coverList": this.state.links.map(l => {
                        return {"coverPath": l};
                    }),
                    "wordCount": this.editor.txt.text().toString().length,
                    "desc": this.editor.txt.text().substring(0, 40),
                    "tags": (this.state.tags || '').replaceAll(' ', '')
                }
            }))
        }
        console.log(resp)
    }

    //create your forceUpdate hook
    render() {
        const upload = () => {
            this.refs.fileTag.click()
        }

        const previewFile = () => {
            const file = this.refs.fileTag.files[0]
            this.client_image.put(`${ReactSession.get('userId')}_${uuid()}`, file).then(result => {
                const links = this.state.links;
                links.push(result.url);
                this.setState({
                    cur: this.state.cur + 1,
                    links: links
                })
            });
        }

        const removeImage = (i) => {
            const links = this.state.links;
            links.splice(i, 1);
            this.setState({
                links: links,
                cur: this.state.cur - 1
            })
        }

        const generatePreview = () => {
            const list = [];
            for (let i = 0; i < this.state.cur; i++) {
                list.push(<div key={i} className={'relative ' + styles.coverWrapper}>
                    <img className={'absolute ' + styles.close} onClick={() => {
                        removeImage(i);
                    }} src={Close} alt={''}/><img
                    src={this.state.links[i]} className={styles.cover} id={'preview_' + i}/></div>)
            }
            return list;
        }

        return (
            <div>
                <Header showLogin={this.state.showLogin}
                        showFeedback={this.state.showFeedback}
                        onChangeFeedbackShow={this.onChangeFeedbackShow}
                        onChangeLoginShow={this.onChangeLoginShow}
                        page="download"/>
                <div
                    className={styles.articlePost + " flex-box-column flex-box-vertical-center"}>
                    <div className={styles.mainWrapper}>
                        <div className={styles.btns + ' flex-box-end flex-box-vertical-center'}>
                            <div className={'flex-box-vertical-center flex-box-center ' + styles.btn + ' ' + styles.btnDraft}
                                 onClick={() => this.save(2)}>Save
                            </div>
                            <div className={'flex-box-vertical-center flex-box-center ' + styles.btn + ' ' + styles.btnPublish}
                                 onClick={() => this.save(0)}>Submit
                            </div>
                        </div>
                        <div className={styles.bodyArea}>
                            <div className={styles.title + ' flex-box-start flex-box-vertical-center'}>
                                <div style={{width: '5vw', fontSize: '1.35vw', marginBottom: '1vw'}}>Title</div>
                                <input type="text" name="title"
                                       defaultValue={this.state.article && this.state.article.title}
                                       onChange={e=>this.onChangeText(e, 'title')}
                                       placeholder="Add a title..."/>
                            </div>
                            <div className={styles.body + ' flex-box-start flex-box-vertical-center'}>
                                <div style={{width: '5vw', fontSize: '1.35vw'}}>Body</div>
                                <div id="div1" style={{width: '93%'}}/>
                            </div>
                            <div className={styles.tags + ' flex-box-start flex-box-vertical-center'}>
                                <div style={{width: '5vw', fontSize: '1.35vw', marginBottom: '1vw'}}>Tags</div>
                                <input type="text" placeholder={'Separate by comma...'}
                                       defaultValue={this.state.article && this.state.article.tagList.map(t=>t.name).join(",")}
                                       onChange={e=>this.onChangeText(e, 'tags')}/>
                            </div>
                        </div>
                        <div className={styles.coverCount + " flex-box-vertical-center flex-box-start"}>
                            <div style={{width: '6vw', fontSize: '1.35vw'}}>Cover</div>
                            <div className={'flex-box-vertical-center'}>
                                <div className={styles.btnCover} onClick={() => {
                                    this.setState({count: 0, cur: 0, links: []})
                                }}>No cover
                                </div>
                                <div className={styles.btnCover} onClick={() => {
                                    if (this.state.cur > 1) {
                                        this.state.links.splice(1, 2);
                                    }
                                    this.setState({count: 1, cur: Math.min(this.state.cur, 1), links: this.state.links})
                                }}>One cover
                                </div>
                                <div className={styles.btnCover} onClick={() => {
                                    this.setState({count: 3})
                                }}>Three covers
                                </div>
                            </div>
                        </div>
                        <div className={styles.coverArea + ' flex-box-vertical-center'}>
                            {
                                generatePreview()
                            }
                            <input ref="fileTag" type="file" className={styles.coverAdd}
                                   onChange={() => previewFile(this.state.cur)}/>
                            <img src={AddCover} alt="" className={styles.coverAddImg} onClick={() => upload()}
                                 style={{display: this.state.cur < this.state.count ? 'block' : 'none'}}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(ArticlePost);
