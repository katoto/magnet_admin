/**
 * Created by xiezg on 2018/4/9.
 */

import ajax from '@/utils/ajax'
import { src, platform, namespace } from '@/utils/index'

const ns = namespace('betblock');

const state = {
  matchList_hot: null, // 热门赛事
  matchList_play: null // 直播中

}

export const actionTypes = {
  getcrazyMainInfo: ns('getcrazyMainInfo'),
  getFootballMatchList: ns('getFootballMatchList')

}
export const mutationTypes = {
  homeInfo: ns('homeInfo'),
  matchList_hot: ns('matchList_hot')

}
const mutations = {

  [mutationTypes.homeInfo](state, data) {
    if (data.banner) {
      if (data.banner.length) {
        data.banner && data.banner.push('恭喜小土豆**抽到<strong>iPhone7 (红)</strong>')
        data.banner && data.banner.push('恭喜yan**抽到<strong>100元联通话费卡</strong>')
        state.crazymainScrollData = data.banner
      } else {
        state.crazymainScrollData = []
        state.crazymainScrollData.push('恭喜小土豆**抽到<strong>iPhone7 (红)</strong>')
        state.crazymainScrollData.push('恭喜yan**抽到<strong>100元联通话费卡</strong>')
        state.crazymainScrollData.push('恭喜小土豆**抽到<strong>500元京东卡</strong>')
      }
    }
    if (data.playnum) {
      state.scrollNumber = data.playnum
    }
  },

  [mutationTypes.matchHotData](state, data) {
    state.matchHotData = data
  }

}
const actions = {

  async [actionTypes.getcrazyMainInfo]({ commit, dispatch }) {
    try {
      const homeInfo = await ajax.get(`/home/info?location=home&src=${src}&platform=${platform}`)
      commit(mutationTypes.homeInfo, homeInfo)
    } catch (e) {
      dispatch('showToast', e.message)
    }
  }

}

export default { state, mutations, actions }
