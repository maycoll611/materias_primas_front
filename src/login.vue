<template>
  <v-col>
    <v-row class="justify-center">
      <v-col md="3" sm="8">
        <v-form @submit.prevent="iniciar()" ref="form_login" v-model="form_login_model" >
          <v-card class="rounded" elevation="8">
            <!-- <v-col>
                <qrcode-stream class="mb-2" v-if="camera == 'auto'" :camera="camera" @decode="onDecode" >
                  <img src="qr_borde.png" alt="" width="100%" height="100%" style="padding: 20px;" />
                 <div v-if="validationSuccess" class="validation-success">
                    This is a URL
                  </div>

                  <div v-if="validationFailure" class="validation-failure">
                    This is NOT a URL!
                  </div>

                  <div v-if="validationPending" class="validation-pending">
                    Long validation in progress...
                  </div>
                </qrcode-stream>
              <v-btn small color="success"  rounded @click="iniciar_qr "><v-icon small>mdi-qrcode-scan </v-icon> Escanear</v-btn>
              <v-btn small color="warning" rounded @click="detener "><v-icon small>mdi-qrcode-remove </v-icon> Cancelar</v-btn>
            </v-col> -->
            <v-col class="pb-0" align="center">
                <v-alert color="teal lighten-2" translate="no"> REPORTE - VOLQUETES</v-alert>
             <!-- <v-img src="logotipo.png" width="300"></v-img> -->
            </v-col>
            <v-col class="pb-0" align="center">
              <v-icon x-large>mdi-account-circle</v-icon>
            </v-col>
            <v-col class="pb-0">
              <v-text-field :rules="[
                    v => !!v || 'Campo Dni requerido',
                    v => (v && v.length == 8) || 'DNI valido de 8 caracteres',
                ]" 
                clearable outlined rounded dense required="required" color="teal darken-1" v-model="usuario.usuario_dni" label="Numero DNI" counter="8" >
              </v-text-field>
            </v-col>
            <v-col class="py-0">
              <v-text-field clearable outlined rounded dense required="required" autocomplete="on" color="teal darken-1" v-model="usuario.usuario_pw" type="password" label="password"></v-text-field>
            </v-col>
            <v-col align="end" class="mb-5">
              <!-- <v-btn @click="prueba" color="red lighten-1" text-color="white" > prueba</v-btn> -->
              <v-btn type="submit" rounded color="teal lighten-1" text-color="white" > Entrar</v-btn>
            </v-col>
            <v-col>
              <!-- <v-snackbar v-model="estado_sesion" absolute color="red"><v-icon>mdi-alert</v-icon> Datos incorrectos...!!!</v-snackbar> -->
              <!-- <v-alert  transition="scale-transition" origin="center center" v-if="estado_sesion == false" outlined dense type="error" size="sm">Datos incorrectos...!!!</v-alert> -->
            </v-col>
          </v-card>
        </v-form>
      </v-col>       
    </v-row>
  </v-col>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
// import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: 'App',
  // components: { QrcodeStream },
  data: () => ({
        isValid: undefined,
        camera: 'off',
        result: null,



      form_login_model:null
    }),
    methods:{
      ...mapMutations(['cambiar_datos_usuario','cambiar_dialogo_loader','cambiar_estado_sesion','cambiar_alerta']),
      iniciar_qr(){
      this.camera = 'auto'
    },
    detener(){
      this.camera = 'off'
      this.result = null
    },
    resetValidationState () {
      this.isValid = undefined
    },

    onDecode (content) {
      this.result = content
      this.cambiar_dialogo_loader()
      console.log('entrando')
      axios.post(this.host+'api/login_qr',{qr: content}).then(response =>{
        // console.log(response.data)
        if(response.data.cantidad == 1){
                 let valor =  {
                  usuario_id:response.data.resp[0].usuario_id,
                  // usuario_nombre:"",
                  usuario_pw:"",
                  usuario_dni:"",
                  usuario_detalle_nombre:response.data.resp[0].usuario_detalle_nombre,
                  usuario_area: response.data.resp[0].usuario_area,
                  api_token:response.data.resp[0].api_token,
                  usuario_cargo:response.data.resp[0].usuario_cargo
                  }
          // console.log(valor)
          this.camera = 'off'
          this.cambiar_datos_usuario(valor)
          // console.log(state.usuario)
          this.cambiar_estado_sesion(true)
          this.$router.replace({name:'listado_volquete'})
          // router.replace({name:'guias'})
          this.cambiar_dialogo_loader()
        }else{  
         this.cambiar_estado_sesion(false)
         this.cambiar_dialogo_loader()
         this.cambiar_alerta({estado:true,color:'red darken-3',texto:'El codigo qr es incorrecto...!'})
        }
      }).catch((error)=>{
        console.log('error servidor')
        console.log(error)
        this.cambiar_dialogo_loader()
        this.cambiar_estado_sesion(false)
        this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Sin Respuesta ó sin conexion...!'})
      })
    },
        prueba(){
        this.$router.push({name:'guias'})
      },
      iniciar(){
      this.cambiar_dialogo_loader()
      axios.post(this.host+'api/login',this.usuario).then(response =>{
        // console.log(response.data)
        if(response.data.cantidad == 1){
                 let valor =  {
                  usuario_id:response.data.resp[0].usuario_id,
                  // usuario_nombre:"",
                  usuario_pw:"",
                  usuario_dni:"",
                  usuario_detalle_nombre:response.data.resp[0].usuario_detalle_nombre,
                  usuario_area: response.data.resp[0].usuario_area,
                  api_token:response.data.resp[0].api_token,
                  usuario_cargo:response.data.resp[0].usuario_cargo
                  }
          // console.log(valor)
          this.cambiar_datos_usuario(valor)
          // console.log(state.usuario)
          this.cambiar_estado_sesion(true)
          this.$router.replace({name:'listado_volquete'})
          // router.replace({name:'guias'})
          this.cambiar_dialogo_loader()
        }else{  
         this.cambiar_estado_sesion(false)
         this.cambiar_dialogo_loader()
         this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Credenciales incorrectas...!'})
        }
      }).catch((error)=>{
        console.log('error servidor')
        console.log(error)
        this.cambiar_dialogo_loader()
        this.cambiar_estado_sesion(false)
        this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Sin Respuesta ó sin conexion...!'})
      })
      }

    },
    computed:{
      ...mapState(['usuario','estado_sesion','host'])
    }
}
</script>