<template>
    <v-col>
        <v-row class="justify-center">
            <v-col cols="12" md="4" sm="8" class="px-1 pb-0">
               <!-- {{categorias}} -->
                <v-card v-if="categorias"> 
                    <!-- {{config_categorias_elementos[0].ce_valor}} -->
                    <v-row class="ma-0" v-for="(item,i) in config_categorias_elementos" :key="i">
                        <v-col cols="12" class="pa-0 px-2 grey lighten-2" v-if="item.ce_elemento_id == 1">
                            {{categorias[item.ce_categoria_id - 1].categoria_descripcion}}
                        </v-col>
                        <v-col cols="12" class="pa-0 px-2 text-caption  ">
                            <v-row class="ma-0"> 
                            <v-col cols="2" class="pa-1">
                                <v-checkbox
                                v-model="item.ce_valor"
                                :value="item.ce_valor"
                                :label="item.ce_elemento_id+''"
                                dense
                                hide-details
                                class="ma-0 pa-0"
                                ></v-checkbox>
                                <!-- <v-switch
                                    v-model="item.ce_valor"
                                    :value="item.ce_valor"
                                    :label="item.ce_elemento_id+''"
                                    hide-details
                                    small
                                    ></v-switch> -->
                            </v-col>
                            <v-col cols="10" class="pa-1" > 
                                <p class="ma-0">{{auxiliar_elementos[item.ce_elemento_id - 1].elemento_tipo }}</p>
                                 
                            </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
                <v-col class="pa-2">
                    <v-row class="ma-0">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" rounded small @click="dialog_confirmar_autorizacion = true">Guardar</v-btn>
                    </v-row>
                </v-col>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialog_confirmar_autorizacion"
            max-width="290"
            >
            <v-card>
                <v-card-title class="">
                    <p class="my-1 text-justify text-caption">¿Seguro desea guardar configuracion... ?</p>                 
                </v-card-title>
                <v-card-text>
                    <p class="my-1 text-caption">usuario que realiza la configuracion: </p>
                    <p class="my-1 text-caption"><strong>{{usuario.usuario_detalle_nombre}} </strong></p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                <v-btn
                    color="grey lighten-1"
                    small
                    @click="dialog_confirmar_autorizacion = false"
                    rounded
                >
                    Cancelar
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    small
                    @click="guardar_configuracion"
                    rounded
                >
                    Aceptar
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
    </v-col>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
// import moment from 'moment'
import axios from 'axios'

export default {
    data:()=>({
        categorias:null,
        config_categorias_elementos:null,
        panels:[0,1,2,3,4,5,6,7],
        dialog_confirmar_autorizacion: null,
    }),
    mounted() {
        this.get_categorias()
        this.get_config_categorias_elementos()
    },
    methods:{
        ...mapMutations(['cambiar_dialogo_loader','cambiar_alerta','valores_guia_actual','cambiar_editar','cambiar_estado_sesion','cambiar_checklist_seleccionado','cambiar_autorizado_checklist_seleccionado']),
        guardar_configuracion(){
            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/guardar_configuracion',{data_config:this.config_categorias_elementos,usuario:this.usuario}).then(response =>{
              console.log(response.data)
              if(response.data.affected == 216 && response.data.status){
                this.dialog_confirmar_autorizacion = false
                this.cambiar_alerta({estado:true,color:'teal',texto:'Guardado configuracion por: '+ this.usuario.usuario_detalle_nombre})
              }else{
                this.cambiar_alerta({estado:true,color:'red darken-3',texto:'No se pudo guargar la configuracion!'})
              }
            //   this.categorias = response.data
              this.cambiar_dialogo_loader()
            }).catch((error)=>{
              console.log('error servidor')
              console.log(error)
              this.cambiar_dialogo_loader()
              this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Problemas de conexion Server!'})
            })  
        },
        get_categorias(){
            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/get_categorias',this.usuario).then(response =>{
              console.log(response.data)
              this.categorias = response.data
              this.cambiar_dialogo_loader()
            }).catch((error)=>{
              console.log('error servidor')
              console.log(error)
              this.cambiar_dialogo_loader()
              this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Problemas de conexion Server!'})
            })  
        },
        get_config_categorias_elementos(){
            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/get_config_categorias_elementos',this.usuario).then(response =>{
              console.log(response.data)
              this.config_categorias_elementos = response.data
              this.cambiar_dialogo_loader()
            }).catch((error)=>{
              console.log('error servidor')
              console.log(error)
              this.cambiar_dialogo_loader()
              this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Problemas de conexion Server!'})
            })  
        }
    },
    computed:{
        ...mapState(['usuario','dialogo_loader','alerta_snack','guia_actual','editar','host','areas','checklist_seleccionado','auxiliar_elementos'])
    }
}
</script>

<style lang="scss" scoped>

</style>