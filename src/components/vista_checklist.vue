<template>
    <div class="pa-0 ma-0">
        <!-- {{config_categoria}} -->
        <v-card
            class="pa-1 ma-0"
            color="grey lighten-5"
        >
        
        <v-row class="ma-0">
            <v-col cols="12" class="pa-1">
            <v-card outlined class="pa-1 mb-2 text-caption" >
                <v-row class="ma-0">
                    <v-chip outlined :color="checklist_seleccionado.cabecera.checklist_autorizado?'teal lighten-2':'warning lighten-2'">{{checklist_seleccionado.cabecera.checklist_autorizado?'Autorizado : us_'+checklist_seleccionado.cabecera.checklist_usuario_id_autoriza:'No Autorizado'}}</v-chip>
                    <v-spacer></v-spacer>
                    <v-switch
                    v-if="(usuario.usuario_cargo == 'administrador' || usuario.usuario_cargo == 'superadmin') && !checklist_seleccionado.cabecera.checklist_autorizado"
                    class="ma-0"
                    dense
                    v-model="autorizado_valor"
                    label="Autorizar"
                    color="info"
                    value="1"
                    inset
                    :disabled="checklist_seleccionado.cabecera.checklist_autorizado?true:false"
                    hide-details
                    @change="dialog_confirmar_autorizacion = true"
                    ></v-switch>
                    <v-spacer></v-spacer> 
                    <v-chip><strong>Nro: {{checklist_seleccionado.cabecera.checklist_id}}</strong> </v-chip> 
                </v-row>
                    <p class="my-1"><strong>Fecha: </strong> <v-chip small v-if="checklist_seleccionado.cabecera.fecha"> {{checklist_seleccionado.cabecera.fecha}}</v-chip> </p>
                    <p class="my-1"><strong>Descripcion:</strong> <v-chip small v-if="checklist_seleccionado.cabecera.equipo_descripcion"> {{checklist_seleccionado.cabecera.equipo_descripcion}} </v-chip> </p>
                    <p class="my-1"><strong>Modelo: </strong> <v-chip small v-if="checklist_seleccionado.cabecera.equipo_modelo"> {{checklist_seleccionado.cabecera.equipo_modelo}}</v-chip> , <strong>Serie: </strong> <v-chip small v-if="checklist_seleccionado.cabecera.equipo_serie"> {{checklist_seleccionado.cabecera.equipo_serie}} </v-chip> ,<strong>Año: </strong> <v-chip small v-if="checklist_seleccionado.cabecera.equipo_año"> {{checklist_seleccionado.cabecera.equipo_año}} </v-chip></p>
                    <p class="my-1"><strong>Operador: </strong> <v-chip small v-if="checklist_seleccionado.cabecera.operador"> {{checklist_seleccionado.cabecera.operador}}</v-chip> </p>
                    <p class="my-1"><strong>Kilom. Inicial: </strong> <v-chip small v-if="checklist_seleccionado.cabecera.equipo_kminicial"> {{checklist_seleccionado.cabecera.equipo_kminicial}} </v-chip><strong>kilom. final: </strong> <v-chip small v-if="checklist_seleccionado.cabecera.equipo_kmfinal">{{checklist_seleccionado.cabecera.equipo_kmfinal}}</v-chip>  </p>

            </v-card>
            <!-- {{checklist_seleccionado.cabecera}} -->
            <v-row class="text-caption pa-0 ma-0" v-if="checklist_seleccionado.cuerpo && config_categoria" >
                <v-col cols="12" v-for="(item,i) in auxiliar_elementos"
                    :key="i"
                    class="pa-0">
                <v-card outlined class="pa-1 mb-2 text-caption" 
                    v-if="config_categoria[i].ce_valor"
                >
                    <v-card-title class="pa-1">
                        <p  class="text-caption py-0 px-2 ma-0"> <strong>{{item.elemento_tipo}}</strong> ({{item.elemento_tipo_equipo}})</p>
                    </v-card-title>
                    
                    <div v-for="(item1,i) in checklist_seleccionado.cuerpo" :key="i" >
                        <v-row v-if="item1.elemento_tipo == item.elemento_tipo" class="ma-0">
                        <p class="mt-1 mb-0 text-italic">{{item1.elemento_descripcion}} : <v-chip small v-if="item1.valor" :color="item1.valor == 'OK' ? 'teal':item1.valor == 'ME' ? 'warning':item1.valor == 'F' ? 'red':''" >{{item1.valor}} </v-chip></p>
                        </v-row>
                    </div>
                </v-card>
            </v-col>
            </v-row>
            </v-col>
        </v-row>
        </v-card>
            <v-dialog
            v-model="dialog_confirmar_autorizacion"
            max-width="290"
            >
            <v-card>
                <v-card-title class="">
                    <p class="my-1">¿Seguro desea autorizar checklist ?</p>                 
                </v-card-title>
                <v-card-text>
                    <p class="my-1 text-caption">Nro checlist:<strong>{{checklist_seleccionado.cabecera.checklist_id}} </strong> </p>
                    <p class="my-1 text-caption">Autoriza:<strong>{{usuario.usuario_detalle_nombre}} </strong> </p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                <v-btn
                    color="grey lighten-1"
                    
                    @click="dialog_confirmar_autorizacion = false"
                    rounded
                >
                    Cancelar
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    
                    @click="guardar_autorizacion"
                    rounded
                >
                    Aceptar
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
// import moment from 'moment'
import axios from 'axios'

export default {
    data:()=>({
        dialog_confirmar_autorizacion:false,
        autorizado_valor: false,
        
    }),
    mounted() {
        this.autorizado_valor = this.checklist_seleccionado.cabecera.checklist_autorizado
        // this.get_configuracion()
    },
    methods:{
        ...mapMutations(['cambiar_dialogo_loader','cambiar_alerta','valores_guia_actual','cambiar_editar','cambiar_estado_sesion','cambiar_checklist_seleccionado','cambiar_autorizado_checklist_seleccionado']),
        // get_configuracion(){
        //     this.cambiar_dialogo_loader()
        //     axios.post(this.host+'api/get_config_categoria_id',{categoria_id: this.checklist_seleccionado.cabecera.equipo_id}).then(response =>{
        //       console.log(response.data)
        //       this.config_categoria = response.data
        //       this.cambiar_dialogo_loader()
        //     }).catch((error)=>{
        //       console.log('error servidor')
        //       console.log(error)
        //       this.cambiar_dialogo_loader()
        //       this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Problemas de conexion Server!'})
        //     })
        // },
        guardar_autorizacion(){
            // this.cambiar_autorizado_checklist_seleccionado(true)

            this.cambiar_dialogo_loader()
           
            axios.post(this.host+'api/autorizar_checklist',{checklist_id:this.checklist_seleccionado.cabecera.checklist_id,usuario_autorizante:this.usuario.usuario_id}).then(response =>{
                console.log(response.data)
                if(response.data.affected == 1 && response.data.status){
                    this.dialog_confirmar_autorizacion = false
                    this.autorizado_valor = null
                    this.$emit('get_data')
                    this.cambiar_alerta({estado:true,color:'teal darken-1',texto:'Autorizacion realizada con exito...!'})
                }else{
                    this.cambiar_alerta({estado:true,color:'red darken-2',texto:'No se pudo realizar la autorizacion...!'})
                }
                this.cambiar_dialogo_loader()
            }).catch((error)=>{
                console.log(error)
                this.cambiar_dialogo_loader()
                this.cambiar_alerta({estado:true,color:'red darken-2',texto:'Sin Respuesta del servidor...!'})
            })

        },
        iniciar_checklist(){
            // console.log(this.checklist_seleccionado)
           
        },
        asignar_valores(){
            this.cambiar_data_usuario({
            usuario_id:'001', //int(11) AI PK 
            usuario_nombre:'maycoll123', //varchar(45) 
            usuario_pw:'123456', //varchar(50) 
            usuario_detalle_nombre:'maycoll quijo condori', //varchar(100) 
            usuario_dni:'72039966', //char(8) 
            usuario_fecha:'1995-12-06', //varchar(45) 
            usuario_correo:'maycollqujocondori@gmail.com', //varchar(100) 
            usuario_cargo:'administrador', //enum('administrador','empleado','gerente') 
            usuario_area:'logistica', //varchar(45) 
        })
        }
    },
    computed:{
        ...mapState(['usuario','dialogo_loader','config_categoria','alerta_snack','guia_actual','editar','host','areas','checklist_seleccionado','auxiliar_elementos'])
    }
}
</script>

<style lang="scss" scoped>

</style>