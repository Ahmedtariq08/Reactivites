import agent from "app/api/agent";
import { User, UserFormValues } from "app/models/user";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { router } from "app/router/Routes";

export default class UserStore {
    user: User | null = null;
    refreshTokenTimeout: any;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => {
                this.user = user;
            });
            router.navigate('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => {
                this.user = user;
            });
            router.navigate('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => {
                this.user = user;
            })
        } catch (error) {
            console.log(error)
        }
    }

    setImage = (image: string) => {
        if (this.user) {
            this.user.image = image;
        }
    }

    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.Account.refreshToken();
            runInAction(() => {
                this.user = user;
                store.commonStore.setToken(user.token);
                this.startRefreshTokenTimer(user);
            })
        } catch (error) {
            console.log(error)
        }
    }

    private startRefreshTokenTimer(user: User) {
        const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeOut = expires.getTime() - Date.now() - (30 * 1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeOut);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}