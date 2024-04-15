import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const prefix = `${API_SERVER_HOST}/v1/member`;

export const loginPost = async (loginParam) => {
    const header = { headers: { "Content-Type": "x-www-form-urlencoded" } }
    
    // security는 FormData로 보내야함.
    const fromData = new FormData();
    fromData.append("email", loginParam.email);
    fromData.append("pw", loginParam.pw);

    const result = await axios.post(`${prefix}/login`, fromData, header)

    return result.data;
}