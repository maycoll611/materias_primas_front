<template>
<v-row class="mx-0" translate="no">
    <v-app-bar app color="teal lighten-1" class="" height="35"  dense>
      <v-app-bar-nav-icon app dense small @click.stop="drawer = !drawer" dark></v-app-bar-nav-icon>
      <!-- <v-img src="logotipo.png" class="ml-1" width="150" height="30"></v-img> -->
      
      <v-spacer></v-spacer>
      
      <v-menu right>
        
        <template v-slot:activator="{ on, attrs }">
          
          <v-btn icon small>
            <v-avatar v-bind="attrs"
            v-on="on" color="teal darken-2" class="white--text" size="30">{{usuario.usuario_detalle_nombre[0]}}</v-avatar>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item class="pa-1 py-0">
            <v-col cols="12 text-center" class="py-0" >
              <v-icon x-large>mdi-account-circle</v-icon>
            </v-col>
          </v-list-item>
          <v-list-item class="pa-1 py-0">
            <v-col cols="12 text-center" class="py-0" >
              <span class="text-caption py-0"><v-chip small color="grey lighten-2">{{(usuario.usuario_detalle_nombre)}}</v-chip> </span>
            </v-col>
          </v-list-item>
          <v-list-item class="pa-1 py-0">
            <v-col cols="12 text-center" class="py-0" >
              <span class="text-caption py-0"><v-chip small color="grey lighten-2">{{usuario.usuario_area.substr(0,17) +(usuario.usuario_cargo == 'administrador' ? '[Admin]':usuario.usuario_cargo == 'superadmin' ? '[S-admin]':'[Usuario]')}}</v-chip> </span>
            </v-col>
          </v-list-item>
          <v-list-item class="pa-1 py-0">
            <v-col class="pa-0">
              <v-btn class="rounded-pill" text color="" small block outlined> <v-icon class="pr-1" small>mdi-account-circle </v-icon> Usuario</v-btn>
            </v-col>
            </v-list-item>
          <v-list-item class="pa-1 py-0">
              <v-btn class="rounded-pill" text color=""   small block outlined> <v-icon class="pr-1" small>mdi-account-box-multiple </v-icon> Cambiar</v-btn>
          </v-list-item>
          <v-list-item class="pa-1 py-0">
              <v-btn class="rounded-pill" text color=""  @click="cerrar_sesion()" small block outlined> <v-icon class="pr-1" small>mdi-account-remove </v-icon> Salir</v-btn>
          </v-list-item>
          <v-list-item>
            <v-spacer></v-spacer>Inactive:<v-idle class="text-caption" @idle="cerrar_sesion" :duration="600"/>
          </v-list-item>
          
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
     
      temporary
    >
      <v-list-item dense>
        <v-list-item-content dense>
          <v-list-item-title>~ MENU</v-list-item-title>
          <!-- <v-list-item-title><v-img src="logotipo.png"></v-img> </v-list-item-title> -->
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <!-- <v-list shaped>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        dense
        color="teal darken-5"
      >
        <template v-slot:activator>
          <v-list-item 
          :to="{name:item.ruta}"
          dense
          >
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list> -->
      <v-list shaped>
        
        <v-list-item-group
          v-model="selecionado"
          color="teal darken-5"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="{name:item.ruta}"
            dense
          >
            <v-list-item-icon v-if="!item.estado">
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content v-if="!item.estado">
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon v-if="item.estado && usuario.usuario_cargo == 'superadmin'">
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content v-if="item.estado && usuario.usuario_cargo == 'superadmin'">
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
        </v-list-item-group>
        
      </v-list>
    </v-navigation-drawer>
    <v-main app >
      <router-view class="mt-2"></router-view>
    </v-main>
  </v-row>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import axios from 'axios'
// import {mapMutation} from 'vuex'
export default {
  name: 'App',
  data: () => ({
    admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      selecionado:1,
      drawer: null,
      opciones:[{label:"Salir",icon:"mdi-close",action:""}],
      items:[],
      tiempo_sesion:0
  }),
  mounted() {
    
   
    if(this.usuario.usuario_cargo == "superadmin"){
      this.items = [
        {title: 'Reporte Volquete', ruta:'listado_volquete',icon:'mdi-car-3-plus',estado:false,active:false},
        { title: 'Configuracion', ruta:'configuracion', icon: 'mdi-cogs',estado:false,active:false},
        // { title: 'Conf-Checklist', ruta:'config_checklist', icon: 'mdi-file-cog-outline',estado:true,active:false},
      ]
    }else{
      this.items = [
        {title: 'Reporte Volquete', ruta:'listado_volquete',icon:'mdi-car-3-plus',estado:false,active:false},
        { title: 'Configuracion', ruta:'configuracion', icon: 'mdi-cogs',estado:false,active:false},
        // { title: 'Conf-Checklist', ruta:'config_checklist', icon: 'mdi-file-cog-outline',estado:true,active:false},
      ]
    }
  //  this.loop_sesion()
    
  },
  methods:{
    ...mapMutations(['cambiar_datos_usuario','cambiar_dialogo_loader','cambiar_estado_sesion']),
    loop_sesion(){
      
      var aux = this
      if(this.estado_sesion){
        let inactivo = setInterval(function(){
          console.log(aux.tiempo_sesion)
          if(window.event){
            aux.tiempo_sesion = 0
          }
          if(aux.tiempo_sesion >= 10){
            aux.cerrar_sesion()
            clearInterval(inactivo)
          }
          aux.tiempo_sesion++
        },1000)
      }
    },
    cerrar_sesion(){

      this.cambiar_dialogo_loader()
        axios.post(this.host+'api/cerrar_sesion',this.usuario).then(response =>{
          console.log(response.data)
          if(response.data.afectado == 1){
                  let valor =  {
                    usuario_id:'',
                    usuario_nombre:"",
                    usuario_pw:"",
                    usuario_detalle_nombre:'',
                    usuario_area: '',
                    api_token:''
                    }
            this.cambiar_datos_usuario(valor)
            // console.log(state.usuario)
            this.cambiar_estado_sesion(false)
            this.$router.replace({name:'login'})
            // router.replace({name:'guias'})
            this.cambiar_dialogo_loader()
          }else{
          this.cambiar_estado_sesion(true)
          this.cambiar_dialogo_loader()
          }
        }).catch((error)=>{
          console.log(error)
        })
      
    }
  },
  computed:{
    ...mapState(['usuario','dialogo_loader','estado_sesion','host'])
  }
};
</script>
<style>
.una_linea{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
}
</style>
