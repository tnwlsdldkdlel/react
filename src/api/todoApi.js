import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/v1/todo`;

export const getOne = async (seq) => {
    const res = await jwtAxios.get(`${prefix}/${seq}`);

    return res.data.data;
}

export const getList = async (pageParam) => {
    const { page, size } = pageParam;
    const res = await jwtAxios.get(`${prefix}/list`, { params: { page, size } });

    return res.data;
}

export const postAdd = async (todoObj) => {
    const res = await axios.post(`${prefix}`, todoObj)

    return res.data;
}

export const deleteOne = async (seq) => {
    const res = await axios.delete(`${prefix}/${seq}`)

    return res.data;
}

export const putOne = async (todoObj) => {
    const res = await axios.put(`${prefix}`, todoObj)

    return res.data;
}