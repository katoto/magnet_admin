import request from '@/utils/request'
import { src, platform } from '@/utils/index'
import md5 from 'md5'

export function login(username, password) {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function newLogin(username, password) {
  console.log( username )
  console.log( password )
  return request({
    url: '/user/login?email='+username+'&password='+md5 ( password )+'&platform=pc',
    method: 'get',
  })
}

// export function newLogin(username, password) {
//   console.log( username )
//   console.log( password )
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data: {
//       email:username,
//       password: md5 (password ) ,
//       platform:src,
//     }
//   })
// }

export function newgetInfo(ck) {
  return request({
    url: '/user/info?ck='+ck,
    method: 'get'
  })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}
