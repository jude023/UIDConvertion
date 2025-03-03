import {
    mapState,
    mapMutations
} from 'vuex'
import CryptoJS  from "crypto-js"
// import isDevToolsOpen  from "devtools-detect"
const myPlugins = {
    install(Vue) {
        Vue.mixin({
            data: () => ({
                // isDevToolsOpen : false,
                // themeColor: '#1976D2',
                // darkMode: false,
                ConvertedData : '',

            }),
            computed: {
                ...mapState([
                    'userInfo', 
                    'isLoggedIn', 
                    'darkMode', 
                    'isEmpEdit',
                    'isConnect',
                    'themeColor',
                    'PrevID',
                    'PrevNo',
                    'PrevStatus',
                    'profileBackground'

                ]),
            },
            created(){
                // this.isDevToolsOpen = devtools.isOpen

                // window.addEventListener('devtoolschange', event => {
                //     this.isDevToolsOpen = event.detail.isOpen
                // })

                
                // var bytes = CryptoJS.AES.decrypt(this.userInfo, 'ApJWeITHbzZP8eZu5Dq4W1AmAvkEh0jQVwkJirF1g1TFNBU77iUqs1YZ0p2u11nw')   
                // var finaldata = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                // this.ConvertedData = finaldata
            },
            methods: {
                ...mapMutations([
                    'CHANGE_USER_INFO', 
                    'CHANGE_USER_LOGGING', 
                    'CHANGE_THEME', 
                    'CHANGE_EMP_EDIT',
                    'CHANGE_CONNECTION',
                    'CHANGE_THEMECOLOR',
                    'CHANGE_PROFILE_BACKGROUND',
                    'STORE_OLD_DATA_ID',
                    'STORE_OLD_DATA_NO',
                    'STORE_OLD_DATA_STATUS',

                ]),
                EncryptData(data){
                    // console.log('EncryptData',this.userInfo.key)
                    return CryptoJS.AES.encrypt(data , 'ApJWeITHbzZP8eZu5Dq4W1AmAvkEh0jQVwkJirF1g1TFNBU77iUqs1YZ0p2u11nw').toString();
                },
                DecryptData(data){
                    var bytes = CryptoJS.AES.decrypt(data, 'ApJWeITHbzZP8eZu5Dq4W1AmAvkEh0jQVwkJirF1g1TFNBU77iUqs1YZ0p2u11nw')   
                    var finaldata = bytes.toString(CryptoJS.enc.Utf8);
                    return finaldata
                }
            }
        })
    }
}

export default myPlugins