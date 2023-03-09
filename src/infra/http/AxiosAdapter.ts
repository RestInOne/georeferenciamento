import axios from "axios";
import HttpClient from "./httpClient";

export default class AxiosAdapter implements HttpClient {
    async get(url: string): Promise<any> {
        const response = await axios.get(url)
        return response.data;
    }
}