import { defineStore } from 'pinia';
import type {UserInfoType} from '@/api/xyt/type'
import { GET_XYT_TOKEN } from '@/utils/token';

export const useUserStore = defineStore('User', {
    state: ()=>{
        return {
            loginVisiabe: false,
            userInfa: JSON.parse(GET_XYT_TOKEN() as string) as UserInfoType || <UserInfoType>{
                name: '',
                token: '',
            }
        }
    },
    getters: {
        getLoginVisiabe: state => state.loginVisiabe,
        getUserInfa: state => state.userInfa,
    },
    actions: {
        changeLoginVisiabe(){
            this.loginVisiabe = !this.loginVisiabe;
        },
        setUserInfo(value:UserInfoType){
            this.userInfa = value;
        },
    }
})