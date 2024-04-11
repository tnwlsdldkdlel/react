import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const prefix = `${API_SERVER_HOST}/v1/products`;

export const postAdd = async (product) => {
    const header = { header: { 'Content-Type': 'multipart/form-data' } }
    const res = await axios.post(`${prefix}`, product, header);

    return res.data;
}

export const getList = async (pageParam) => {
    const { page, size } = pageParam;
    const res = await axios.get(`${prefix}`, { params: { page, size } });

    return res.data;
}

export const getOne = async (seq) => {
    const res = await axios.get(`${prefix}/${seq}`);

    return res.data.data;
}

export const deleteImage = async (fileName) => {
    const res = await axios.delete(`${prefix}`, fileName);

    return res.data;
}

export const putOne = async (product) => {
    const header = { header: { 'Content-Type': 'multipart/form-data' } }
    const res = await axios.put(`${prefix}`, product, header);

    return res.data;
}