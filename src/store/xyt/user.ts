import { defineStore } from 'pinia';

export const useUserStore = defineStore('User', {
    state: ()=>{
        return {
            loginVisiabe: false,
        }
    },
    getters: {
        getLoginVisiabe: state => state.loginVisiabe,
    },
    actions: {
        changeLoginVisiabe(){
            this.loginVisiabe = !this.loginVisiabe;
        },
    }
})