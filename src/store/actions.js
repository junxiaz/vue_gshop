import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO
} from './mutations-types'
import {
    reqAddress,
    reqFoodCategorys,
    reqShops,
    getUserInfo,
    reqUserInfo,
    reqLogout,
    reqShopGoods,
    reqShopInfo,
    reqShopRatings
} from "../api"

export default {
    async getAddress({ commit, state }) {
        const geohash = state.latitude + ',' + state.longitude;
        const result = await reqAddress(geohash);
        if (result.code === 0) {
            const addresss = result.data;
            commit(RECEIVE_ADDRESS, { address: addresss });
        }
    },
    async getCategorys({ commit }) {
        const result = await reqFoodCategorys();
        if (result.code === 0) {
            const categorys = result.data;
            commit(RECEIVE_CATEGORYS, { categorys });
        }
    },
    async getShops({ commit, state }) {
        const { longitude, latitude } = state;
        const result = await reqShops(longitude, latitude);
        if (result.code === 0) {
            const shops = result.data;
            commit(RECEIVE_SHOPS, { shops });
        }
    },

    // 同步记录用户信息
    recordUser({ commit }, userinfo) {
        commit(RECEIVE_USER_INFO, { userinfo })
        console.log(userinfo)
    },

    //异步获取用户信息
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 0) {
            const userinfo = result.data
            commit(RECEIVE_USER_INFO, { userinfo })
        }
    },

    async logout({ commit }) {
        const result = await reqLogout()
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }
    },

    // 异步获取商家信息 
    async getShopInfo({ commit }, cb) { 
        const result = await reqShopInfo() 
        if (result.code === 0) { 
            const info = result.data 
            info.score = 3.5 
            commit(RECEIVE_INFO, { info }) 
            cb && cb() 
        } 
    },
    // 异步获取商家评价列表 
    async getShopRatings({commit}, cb) {
        const result = await reqShopRatings() 
        if(result.code===0) { 
            const ratings = result.data 
            commit(RECEIVE_RATINGS, {ratings}) 
            cb && cb() 
        } 
    },
    // 异步获取商家商品列表 
    async getShopGoods({commit}, cb) { 
        const result = await reqShopGoods() 
        if(result.code===0) { 
            const goods = result.data 
            commit(RECEIVE_GOODS, {goods}) 
            // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件 
            cb && cb() 
        } 
    },
}