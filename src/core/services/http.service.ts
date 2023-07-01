import axios from "axios"
import {AxiosResponse} from "axios";
import {CoinDataInterfaces} from '../types/defolt-types'
// import {responseNotificationCreator} from "./error-handler.service"

const axiosInstance = () => {
    const axiosInstanceNew = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}`,
        timeout: 10000,
        headers: AuthInterceptor()
    });
    // /*? Request-interceptor----------------*/
    // axiosInstanceNew.interceptors.request.use(function (config) {
    //     return config
    // }, function (error) {
    //     return Promise.reject(error)
    // })
    //
    // /*? Response-interceptor----------------*/
    // axiosInstanceNew.interceptors.response.use(function (response) {
    //     return response
    // }, function (error) {
    //     return Promise.reject(error)
    // })
    return axiosInstanceNew
}

function AuthInterceptor(): any {
    if (false) {
        return {
            'Authorization': `Bearer ${'token'}`,
        }
    } else {
        return {}
    }
}

function generateRequest() {
    return axiosInstance()
}


export async function getAllCoins(params: Object): Promise<AxiosResponse<CoinDataInterfaces>> {
    return await generateRequest()
        .get('/get-all-coins' + generateQueryParams(params))
}

function generateQueryParams(queryParams: Object): string {
    let index = 0,
        finalQueryParams = ''
    for (let [key, value] of Object.entries(queryParams)) {
        if (key && (value !== null || true) && index === 0) {
            finalQueryParams += `?${key}=${value}`
        }
        if (key && (value !== null || true) && index > 0) {
            finalQueryParams += `&${key}=${value}`
        }
        index++
    }
    return finalQueryParams
}
