/**
 * Created by xiezg on 2018/4/9.
 */

import ajax from '@/utils/ajax'
import {src, platform, mapMutations, mapActions} from '@/utils/index'
import {Message} from 'element-ui'

import {getCK, setCK, removeCK} from '@/utils/auth'

const state = {
  withdrawList: null,
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
  async getWithDrawMsg({commit, dispatch}, pageData){
    try {
      let InfoData = null;
      if (pageData) {
        InfoData = await ajax.get(`http://10.0.1.167:4444/account/withdraw/approvelist?pageno=${pageData.pageNumber}&rangeno=${ pageData.pageSize }&src=${src}`);
      } else {
        InfoData = await ajax.get(`http://10.0.1.167:4444/account/withdraw/approvelist`);
      }
      if (InfoData) {
        commit(mTypes.setWithDrawList, InfoData);
        Message({
          message: '提款审核列表更新成功',
          type: 'success',
          duration: 3000
        })
      }
      return InfoData
    } catch (e) {
      Message({
        message: e.message,
        type: 'error',
        duration: 5 * 1000
      })

    }
  },

  async setWithDraw({commit, dispatch}, val){
    try {

      let InfoData = await ajax.get(`http://10.0.1.167:4444/account/withdraw/approve?ck=${getCK()}&drawid=${val.drawid}&result=${val.isAgree}&remark=${val.remark}`)
      // let InfoData
      if (InfoData) {
        Message({
          message: '操作成功!',
          type: 'success',
          duration: 2000
        })
      }
      return InfoData
    } catch (e) {
      Message({
        message: e.message,
        type: 'error',
        duration: 5 * 1000
      })
      return 0
    }
  },
}, 'betblock')


export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}
