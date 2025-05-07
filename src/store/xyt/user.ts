import { defineStore } from 'pinia';
import type {UserInfoType} from '@/api/xyt/type'
import { GET_XYT_TOKEN,SET_XYT_TOKEN,REMOVE_XYT_TOKEN } from '@/utils/token';

export const useUserStore = defineStore('User', {
    state: ()=>{
        return {
            loginVisiabe: false,
            userInfo: JSON.parse(GET_XYT_TOKEN() as string) as UserInfoType || <UserInfoType>{
                name: '',
                userId: '',
                token: '',
            }
        }
    },
    getters: {
    },
    actions: {
        changeLoginVisiabe(){
            this.loginVisiabe = !this.loginVisiabe;
        },
        setUserInfo(value:UserInfoType){
            if(value.name=='' || value.userId=='' || value.token==''){
                REMOVE_XYT_TOKEN();
            }else{
                SET_XYT_TOKEN(JSON.stringify(value));
            }
            this.userInfo = value;
        },
    }
})