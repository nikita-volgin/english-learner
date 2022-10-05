import Vue from 'vue'
import VueRouter from 'vue-router'
import route from './project'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: route
})