import axios from "axios";
import {ReactSession} from "react-client-session";

// const API_HOST = "https://server.pengpengkeji.net/api";
const API_HOST = "http://localhost:3000/api";
ReactSession.setStoreType("localStorage");

export default class api {

    static async register(data) {
        return (await axios.post(`${API_HOST}/users`, (data || {}))).data;
    }

    static async login(data) {
        return (await axios.post(`${API_HOST}/users/login-pwd`, (data || {}))).data;
    }

    static async fetchDrafts() {
        return (await axios.get(`${API_HOST}/user/articles?status=2`)).data;
    }

    static async saveArticle(data) {
        return (await axios.post(`${API_HOST}/articles`, (data || {}))).data;
    }

    static async saveDraft(data) {
        return (await axios.put(`${API_HOST}/articles/${data.id}`, (data || {}))).data;
    }

    static async deleteArticle(id) {
        return (await axios.delete(`${API_HOST}/articles/${id}`)).data;
    }

    static async fetchRecommendedArticles(pageSize, rank) {
        return (await axios.get(`${API_HOST}/articles/recommend?pageSize=${pageSize}&rank=${rank}`)).data;
    }

    static async fetchArticle(id) {
        return (await axios.get(`${API_HOST}/articles/${id}`)).data;
    }

    static async likeArticle(id) {
        return (await axios.post(`${API_HOST}/articles/${id}/like`)).data;
    }

    static async unlikeArticle(id) {
        return (await axios.post(`${API_HOST}/articles/${id}/unlike`)).data;
    }

    static async submitFeedback(data) {
        return (await axios.post(`${API_HOST}/feedbackForDianDianWeb/`, (data||{}))).data;
    }
}
