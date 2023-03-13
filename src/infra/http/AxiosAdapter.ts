import axios from "axios";
import ApplicationError from "../../domain/errors/ApplicationError";
import HttpClient from "./HttpClient";

export default class AxiosAdapter implements HttpClient {
    async get(url: string): Promise<any> {
        try{
            const response = await axios.get(url)
            return response.data;
        } catch (error) {
            throw new ApplicationError('Something went wrong', 400)
        }
    }
}