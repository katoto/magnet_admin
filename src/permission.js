import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getCK } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    console.log( getCK() )
    console.log( '========' )
    if (getCK()) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            // if (store.getters.roles.length === 0) {
            if ( 1 ) {
                store.dispatch('GetInfo').then(res => { // 拉取用户信息
                    next()
                }).catch(() => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error('取用户信息失败,请重新登录')
                        next({ path: '/login' })
                    })
                })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login');
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
