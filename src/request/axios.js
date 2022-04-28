import axios from "axios";

export function get(url, params){
    return axios.get(url, {
        params,
        contentType: "application/x-www-form-urlencoded"
    })
}

export function post(url, data){
    return axios.post(url, data)
}

