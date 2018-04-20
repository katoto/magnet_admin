import { logout,newLogin ,newgetInfo} from '@/api/login'
import { getCK,setCK,removeCK } from '@/utils/auth'
import {Message} from 'element-ui'

const user = {
    state: {
        name: '',
        ck:null,
        email:null
    },

    mutations: {
        SET_CK: (state, ck) => {
          state.ck = ck
        },
        SET_Email:(state,email) =>{
          state.email = email
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
    },
    actions: {
    // 登录
        Login({ commit }, userInfo) {
          const username = userInfo.username.trim()
          console.log(userInfo);
          return new Promise((resolve, reject) => {
              newLogin(username, userInfo.password).then(response => {
                    const data = response.data
                    setCK(data.ck)
                    commit('SET_CK', data.ck)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
              newgetInfo( getCK() ).then(response => {
                    const data = response.data
                    commit('SET_Email', data.email)
                    commit('SET_NAME', data.username)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit, state }) {
          commit('SET_CK', '')
          removeCK()
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_CK', '')
                removeCK()
                resolve()
            })
        }
    }
}

export default user
