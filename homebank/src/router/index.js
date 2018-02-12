import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Signup from '../components/Signup'
import Login from '../components/Login'
import Mainview from '../components/Mainview'
import Addaccount from '../components/Addaccount'
import Monthly from '../components/Monthly'
import Borrowandlent from '../components/Borrowandlent'
import Importexport from '../components/Importexport'


export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'login',
    component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/mainview',
      name: 'mainview',
      component: Mainview
    },
    {
      path: '/addaccount',
      name: 'addaccount',
      component: Addaccount
    },
    {
      path: '/monthly',
      name: 'monthly',
      component: Monthly
    },
    {
      path: '/borrowandlent',
      name: 'borrowandlent',
      component: Borrowandlent
    },
    {
      path: '/importexport',
      name: 'importexport',
      component: Importexport
    }
  ]
});
