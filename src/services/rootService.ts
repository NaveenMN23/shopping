import axios from "axios"
import { appConfig } from "../config";
import { EndPoints } from "./apiConfig";

//Constructs API BASE URL
const getBaseUrl = () => {
    let apiUrl = appConfig.API_BASE_URL
    return apiUrl;
}

//Method to create a axios instance
const getAxiosInstance = () => {
    const instance = axios.create();
    return instance;
}

//Get all Product details from DB
export const APIService = async (endPoint: EndPoints) => {

    const instance = getAxiosInstance();
    let url: string = `${getBaseUrl()}/${endPoint}`;

    try {
        const response = await instance.get(url);
        return response;
    }
    catch (err) {
        console.log(err);
    }
}