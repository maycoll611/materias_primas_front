import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    meta:{protegido:false}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../login.vue'),
    meta:{protegido:false}
  },
  {
    path: '/',
    name: 'app',
    component: () => import(/* webpackChunkName: "about" */ '../App.vue'),
    meta:{protegido:true},
    children:[
      {
        path: '/inicio',
        name: 'inicio',
        component: () => import(/* webpackChunkName: "about" */ '../views/inicio.vue'),
        meta:{protegido:true}
      },
      {
        path: '/listado',
        name: 'listado',
        component: () => import(/* webpackChunkName: "about" */ '../views/listado.vue'),
        meta:{protegido:true}
      },
      {
        path: '/listado_volquete',
        name: 'listado_volquete',
        component: () => import(/* webpackChunkName: "about" */ '../views/listado_volquete.vue'),
        meta:{protegido:true}
      },
      {
        path: '/eka2',
        name: 'eka2',
        component: () => import(/* webpackChunkName: "about" */ '../views/eka2.vue'),
        meta:{protegido:true}
      },
      {
        path: '/guias_form',
        name: 'guias_form',
        component: () => import(/* webpackChunkName: "about" */ '../views/guias_form.vue'),
        meta:{protegido:true}
      },
      {
        path: 'configuracion',
        name: 'configuracion',
        component: () => import(/* webpackChunkName: "about" */ '../views/configuracion.vue'),
        meta:{protegido:true},
      },
      {
        path: 'config_checklist',
        name: 'config_checklist',
        component: () => import(/* webpackChunkName: "about" */ '../views/config_checklist.vue'),
        meta:{protegido:true},
      },
      {
        path: 'config_usuario',
        name: 'config_usuario',
        component: () => import(/* webpackChunkName: "about" */ '../views/config_usuario.vue'),
        meta:{protegido:true},
      },
      {
        path: 'preguntas',
        name: 'preguntas',
        component: () => import(/* webpackChunkName: "about" */ '../views/preguntas.vue'),
        meta:{protegido:false}
      },
      {
        path: 'inventario',
        name: 'inventario',
        component: () => import(/* webpackChunkName: "about" */ '../views/inventario.vue'),
        meta:{protegido:false}
      }
    ]
    },
  ]

const router= new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import store from '@/store'
//verificar las rutas protegidas por "navigation guards"
router.beforeEach((to,from,next) =>{
  if(to.matched.some(route => route.meta.protegido)){
    if(!store.state.estado_sesion){
      next({name:'login'})
    }else{
      next()
    }
  }else{
    next()
  }
  // if(to.meta.protegido && store.state.usuario.api_token == ''){
  //     next({name:'login'})
  //   }else{
    
  //   next()
  // }
})

export default router
