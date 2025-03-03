require('./bootstrap');
import Vue from 'vue'
import Vuetify from 'vuetify'
import Router from './router'
import store from './store'
import MyMixins from './MyMixins'
import App from './template/App';
import io from 'socket.io-client';


// const socket = io(`${window.location.protocol}//${window.location.hostname}:6969`);

// Vue.prototype.$socket = socket;
// import VueSocketIO from 'vue-socket.io'

// Vue.use(new VueSocketIO({
//     connection: io(`${window.location.protocol}//${window.location.hostname}:6969`),
//     vuex:{
//         store,
//         actionPrefix: "SOCKET_",
//         mutationPrefix: "SOCKET_"

//     }
// }))

const socket = io("https://iconntest.hrd-s.com",{
    transports: ["websocket"]
});

Vue.prototype.$socket = socket;
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
    // debug: false,
    connection: io('https://iconntest.hrd-s.com', {
        transports: ["websocket"]
    }), //options object is Optional
    vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
        }
    })
);

Vue.use(Vuetify)
Vue.use(MyMixins)

Vue.prototype.$url = window.location.origin + "/ROS"
const app = new Vue({
    el: '#app',
    store,
    router:Router,
    vuetify: new Vuetify(),
    render: h=>h(App)
});