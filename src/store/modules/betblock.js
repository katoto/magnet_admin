/**
 * Created by xiezg on 2018/4/9.
 */

import ajax from '@/utils/ajax'
import {src, platform, mapMutations, mapActions} from '@/utils/index'
import {Message} from 'element-ui'

const state = {
  withdrawList: null
};

const mutationsInfo = mapMutations({
  setWithDrawList(state, data){
    state.withdrawList = data
  },
  setNationGetRed (state, data) {
    state.nationGetRed = data
  },

}, 'betblock');

const actionsInfo = mapActions({
  async getWithDrawMsg({commit, dispatch}){
    try {
      let InfoData = await ajax.get(`http://10.0.1.167:4444/home/info`)
      console.log(InfoData);
      if (InfoData) {
        commit(mTypes.setWithDrawList, InfoData)
        Message({
          message: 'withdraw success',
          type: 'success',
          duration: 3000
        })
      }

    } catch (e) {
      console.error('home info')
      Message({
        message: e.message,
        type: 'error',
        duration: 5 * 1000
      })

    }
  },

}, 'betblock')


export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}
