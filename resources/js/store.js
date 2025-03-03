import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)
const persistedData = new createPersistedState({
    key:'Convertion', //change the name of key storage 
    storage: localStorage,
    reducer : state => ({
        userInfo    : state.userInfo,
        isLoggedIn  : state.isLoggedIn,
        darkMode    : state.darkMode,
        isConnect   : state.isConnect,
        themeColor  : state.themeColor,
        PrevID      : state.PrevID,
        PrevNo      : state.PrevNo,
        PrevStatus  : state.PrevStatus
    })
})

// import CryptoJS  from "crypto-js"
export default new Vuex.Store({
    state:{
        userInfo            : null, //use this to store the information on login
        isLoggedIn          : false, //check if its login
        darkMode            : false, //hadle darkmode
        isConnect           : true, //if its connected
        profileBackground   : null, // depense if you want a background
        appVersion          : null, // can u add appversion 
        themeColor          : '#1976D2',
        PrevID              : null,
        PrevNo              : null,
        PrevStatus          : null,

        rules: {
            constructionCodeRule: [
                (v) => (v || v == undefined || "").length > 0 || "Field is required",
                (v) => (v || v == undefined || "").length <= 12 || "Max 12 characters.",
            ],
            requireOnMultiple : [
                (v) => v.length > 0 || "Field is required"  
            ],
            required: [
                (v) => (v == 0 || !!v) || "Field is required",
            ],
            email: [
                (v) =>
                    !v ||
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "E-mail must be valid",
            ],
            password: [
                (v) => !!v || "Field is required",
                // (v) => !v || /[0-9]/.test(v) || "Must contain number",
                // (v) => !v || /[a-zA-Z]/.test(v) || "Must contain letter",
                // v => !v || /[@$!%*?&]/.test(v) || 'Must contain symbol',
                (v) => (v || "").length >= 8 || "Must contain atlest 8 characters.",
            ],
            hex: [
                (v) =>
                    !v || /[0-9A-Fa-f]{6}/.test(v) || "Must be a hex value",
            ],
            confirmpassword(temp, actual) {
                return [(v) => temp === actual || "Password must match"];
            },
            uniqueCar(list) { // you can change the name and u can use this if the getting of data is under store.js
                return [
                    (v) => !!v || "Field is required",
                    (v) => 
                        // console.log(typeof _.find(list, {name : v}) === 'object', list, v)
                        typeof _.find(list, {name : v}) === 'undefined' ||
                        "Car is already exists.",
                ];
            },

            uniqueData(list) {
                return [
                    (v) => !!v || "Field is required",
                    (v) => 
                        // console.log(typeof _.find(list, {name : v}) === 'object', list, v)
                        typeof _.find(list, {name : v}) === 'undefined' ||
                        "is already exists.",
                ];
            },

            uniqueDataEdit(list, excludeName) {
                return [
                    (v) => !!v || "Field is required",
                    (v) =>
                    typeof _.find(list, (item) => item.name === v && item.name !== excludeName) === 'undefined' ||
                    "already exists.",
                ];
            },
            array: [(v) => !v.length == 0 || "Field is required"],
            higher_number(min, max) {
                return [
                    (v) => !!v || "Field is required",
                    (v) => v > min || "Must Higher",
                    (v) => v <= max || "Too much",
                ];
            },
            positiveNumber: [
                (v) => {
                    if ( !!v  && v >= 0 && v <= 99 && !isNaN(v)) return true;
                    return "Field is required and must be a number";
                },
            ],
            uniqueRemarks(list) {
                return [
                    (v) => !!v || "Field is required",
                    (v) => 
                        // console.log(typeof _.find(list, {name : v}) === 'object', list, v)
                        typeof _.find(list, {name : v}) === 'undefined' ||
                        "Remark Already exists.",
                ];
            },
        },
    },
    actions:{
        

    },

    mutations:{
       
        CHANGE_USER_INFO: (state, data) => {
            state.userInfo = data
        },
        CHANGE_USER_LOGGING: (state, data) => {
            state.isLoggedIn = data
        },
        CHANGE_THEME: (state, data) => {
            state.darkMode = data
        },
        CHANGE_CONNECTION: (state, data) => {
            state.isConnect = data
        },
        CHANGE_THEMECOLOR: (state, data) => {
            state.themeColor = data
        },
        CHANGE_PROFILE_BACKGROUND: (state, data) => {
            state.profileBackground = data
        },
        STORE_OLD_DATA_ID: (state, data) => {
            state.PrevID = data
        },

        STORE_OLD_DATA_NO: (state, data) => {
            state.PrevNo = data
        },

        STORE_OLD_DATA_STATUS: (state, data) => {
            console.log('store',data)
            state.PrevStatus = data
        },
    },
    getters:{},
    plugins: [persistedData]
});