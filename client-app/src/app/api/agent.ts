import { PaginatedResult } from "app/models/pagination";
import { Photo, Profile } from "app/models/profile";
import { User, UserFormValues } from "app/models/user";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity, ActivityFormValues } from "../models/activity";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { EventPredicate, UserEvent } from "app/models/event";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

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
    //handle pagination
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
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
            // toast.error("Unauthorized");
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
    Activities: '/activities',
    Account: '/account',
    Profiles: '/profiles',
    Photos: '/photos',
    Follow: '/follow'
}

const Activities = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Activity[]>>(EndPoints.Activities, { params: params }).then(responseBody),
    details: (id: string) => requests.get<Activity>(`${EndPoints.Activities}/${id}`),
    create: (activity: ActivityFormValues) => requests.post<void>(EndPoints.Activities, activity),
    update: (activity: ActivityFormValues) => requests.put<void>(`${EndPoints.Activities}/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`${EndPoints.Activities}/${id}`),
    attend: (activityId: string) => requests.post<void>(`${EndPoints.Activities}/${activityId}/attend`, {})
}

const Account = {
    current: () => requests.get<User>(EndPoints.Account),
    login: (user: UserFormValues) => requests.post<User>(`${EndPoints.Account}/login`, user),
    register: (user: UserFormValues) => requests.post<User>(`${EndPoints.Account}/register`, user)
}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`${EndPoints.Profiles}/${username}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('photos', formData, {
            headers: { 'Content-Type': 'Content-Type' }
        })
    },
    setMainPhoto: (photoId: string) => requests.post(`${EndPoints.Photos}/${photoId}/setMain`, {}),
    deletePhoto: (photoId: string) => requests.del(`${EndPoints.Photos}/${photoId}`),
    updateAbout: (profile: Profile) => requests.put<void>(`${EndPoints.Profiles}/${profile.username}`, profile),
    updateFollowing: (username: string) => requests.post(`${EndPoints.Follow}/${username}`, {}),
    listFollowings: (username: string, predicate: "followers" | "following") => requests.get<Profile[]>(`${EndPoints.Follow}/${username}?predicate=${predicate}`),
    listUserActivities: (username: string, predicate: EventPredicate) => requests.get<UserEvent[]>(`${EndPoints.Profiles}/${username}/activities?predicate=${predicate}`)
}

const agent = {
    Activities,
    Account,
    Profiles
}

export default agent;