import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

// import MainPage from './components/MainPage'
// import LoginView from './components/LoginView'
import ConvertUID from './components/ConvertUID'

Vue.use(VueRouter)

const routes = 
[
    // {
    //     path: '/',
    //     name: 'LoginView',
    //     component: LoginView
    // },
    // {
    //     path: '/MainPage',
    //     name: 'MainPage',
    //     component: MainPage
    // },
    {
        path: '/',
        name: 'ConvertUID',
        component: ConvertUID
    },
]

const router = new VueRouter({
    mode: 'history',
    // base: '/ROS/',
    routes
})

// router.beforeEach((to, from ,next)=>{
//     if(to.path === '/'){

//         // if(store.state.isLoggedIn == true && store.state.userInfo != null){
//         //     next('/MainPage')
//         // }else{
//         //     next()
//         // }
//         // }else{
//         // if(store.state.userInfo!=null){
//         //     next()
//         // }else{
//         //     next('/')
//         // }
//         }
//     })

export default router