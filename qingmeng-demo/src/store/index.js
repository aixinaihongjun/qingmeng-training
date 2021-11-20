import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

import { setToken, setUserInfo, addRoutes } from "@/utils/auth";
import { employerRoutes, developerRoutes } from "@/router";
import router from "../router";

export default new Vuex.Store({
  state: {
    hasLogin: false,
    token: "",
    userInfo: {
      username: "",
      avatar: "",
    },
    routes: [],
  },
  getters: {
    hasLogin(state) {
      return !!state.token;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      setToken({ token });
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      setUserInfo(userInfo);
    },
    setRoutes(state, routes) {
      state.routes = routes;
    },
  },
  actions: {
    login({ commit, dispatch }, token) {
      commit("setToken", token);
      dispatch("getUserInfo");
    },
    getUserInfo({ commit, dispatch }, userId) {
      axios.get("/user/getUserInfo").then((res) => {
        commit("setUserInfo", {
          username: res.username,
          avatar: res.icon
        });
        dispatch("addDynamicRoutes", res.roles);
      });
    },
    addDynamicRoutes({ commit, state }, roles) {
      if (roles.includes('employer')) {
        commit("setRoutes", employerRoutes);
        addRoutes(employerRoutes);
      } else {
        commit("setRoutes", developerRoutes);
        addRoutes(developerRoutes);
      }
    },
  },
  modules: {},
});
