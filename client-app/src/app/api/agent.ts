import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

//we can use the try catch block like the one that is given below
//it will detect any unsuccessfull responses in catch
// axios.interceptors.response.use(async response => {
//     try {
//         await sleep(1000);
//         return response;
//     } catch (error) {
//         console.log(error);
//         return await Promise.reject(error);
//     }
// })

//OR we can use the sequence call back function to handle responses
axios.interceptors.response.use(async response => {
    //handle success here
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    //handle error here
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error("Unauthorized");
            break;
        case 403:
            toast.error("Forbidden resource");
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
        default:
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const EndPoints = {
    Activities: '/activities'
}

const Activities = {
    list: () => requests.get<Activity[]>(EndPoints.Activities),
    details: (id: string) => requests.get<Activity>(`${EndPoints.Activities}/${id}`),
    create: (activity: Activity) => requests.post<void>(EndPoints.Activities, activity),
    update: (activity: Activity) => requests.put<void>(`${EndPoints.Activities}/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`${EndPoints.Activities}/${id}`)
}

const agent = {
    Activities
}

export default agent;