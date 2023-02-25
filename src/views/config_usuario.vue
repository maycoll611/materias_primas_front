<template>
    <v-col>
        <v-row class="justify-center">
            <v-col cols="12" md="4" sm="8" class="px-1 pb-0">
               <!-- {{categorias}} -->
                <v-form @submit.prevent="buscar_usuario_dni" lazy-validation>
                    <v-card>
                        <v-card-title>Config usuario</v-card-title>
                        <v-card-text>
                            
                                <v-row class="ma-0">
                                    <v-col cols="12" class="pa-1">
                                        <v-text-field v-model="valor_dni" rounded label="Ingresa DNI" dense outlined counter="8" max="8" class="text-caption"></v-text-field>
                                    </v-col>
                                </v-row>
                            
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary darken-1"
                                small
                                type="submit"
                                rounded
                            >
                                Buscar y configurar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialog_config_usuario"
            max-width="290"
            >
            <v-card v-if="usuario_config">
                <v-card-title class="">
                    <p class="my-1 text-justify text-caption">Config de usuario con DNI {{usuario_config.usuario_dni}}</p>                 
                </v-card-title>
                    <v-card-text class="pa-2">
                        <v-card class="elevation-4 p-3">
                            <v-row class="ma-0 pa-2">
                                <p class="my-1 text-caption">Nombre: <v-chip small v-if="usuario_config.usuario_detalle_nombre">{{usuario_config.usuario_detalle_nombre}}</v-chip> </p>
                                <p class="my-1 text-caption">Dni : <v-chip small v-if="usuario_config.usuario_dni">{{usuario_config.usuario_dni}}</v-chip> </p>
                                <v-col cols="12" class="pa-1 pt-3">
                                    <v-select
                                    v-model="usuario_config.usuario_cargo"
                                    :items="tipos_usuario"
                                    label="Tipo de usuario"
                                    rounded
                                    outlined
                                    dense
                                    required
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" class="pa-1">
                                    <v-select
                                    v-model="usuario_config.usuario_area"
                                    :items="tipos_areas"
                                    label="Area de trabajo"
                                    rounded
                                    outlined
                                    dense
                                    required
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" class="pa-1">

                                </v-col>
                            </v-row>
                        </v-card>

                    <p class="my-1 text-caption">Config. por: <strong>{{usuario.usuario_detalle_nombre}} </strong></p>
                    
                            
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                <v-btn
                    color="grey lighten-1"
                    small
                    @click="dialog_config_usuario = false"
                    rounded
                >
                    Cancelar
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    small
                    @click="dialog_confirm_guardar_usuario = true"
                    rounded
                >
                    Guardar
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            <v-dialog
            v-model="dialog_confirm_guardar_usuario"
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
                    @click="dialog_confirm_guardar_usuario = false"
                    rounded
                >
                    Cancelar
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    small
                    @click="guardar_configuracion_usuario"
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
        dialog_confirm_guardar_usuario:false,
        tipos_usuario:['empleado','administrador','superadmin'],
        tipos_areas: [ 
        'MANTENIMIENTO - MECANICO',
        'PRODUCCION',
        'MANTENIMIENTO - ELECTR',
        'INGEMIN',
        'LOGISTICA',
        'PLANIFICACION DE OPERACIONES',
        'GESTION HUMANA',
        'PLANEAMIENTO Y CONTROL',
        'OPTIMIZACION DE PROCESOS',
        'LABORATORIO',
        'MANTENIMIENTO - EQUIPO MOVIL',
        'SEGURIDAD INTEGRAL',
        'MATERIAS PRIMAS - EXPLOTACION',
        'CORP EJECUTIVOS CESUR',
        'MEDIO AMBIENTE',
        'SERVICIOS GENERALES',
        'PLANIFICACION DE DEMANDA',
        'SUPERINTENDENCIA OPERACIONES',
        'SISTEMAS INTEGRADO DE GESTION',
        'MATERIAS PRIMAS',
        'CONTABILIDAD',
        'SOPORTE TECNICO',
        'GERENCIA GENERAL',
        'MARKETING',
        'LEGAL',
        ]
        ,
        valor_dni:null,
        categorias:null,
        config_categorias_elementos:null,
        usuario_config:null,
        panels:[0,1,2,3,4,5,6,7],
        dialog_config_usuario: null,
    }),
    mounted() {
        
    },
    methods:{
        ...mapMutations(['cambiar_dialogo_loader','cambiar_alerta','valores_guia_actual','cambiar_editar','cambiar_estado_sesion','cambiar_checklist_seleccionado','cambiar_autorizado_checklist_seleccionado']),
        guardar_configuracion_usuario(){
            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/guardar_configuracion_usuario',{data_config:this.usuario_config,usuario:this.usuario}).then(response =>{
              console.log(response.data)
              if(response.data.affected == 1 && response.data.status){
                this.dialog_config_usuario = false
                this.dialog_confirm_guardar_usuario = false
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
              this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Sin Respuesta ó sin conexion...!'})
            })  
        },
        buscar_usuario_dni(){
            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/buscar_usuario_dni',{dni:this.valor_dni}).then(response =>{
              console.log(response.data)
              if(response.data){
                this.cambiar_dialogo_loader()
                this.dialog_config_usuario = true
                this.usuario_config = response.data
              } else{
                this.cambiar_dialogo_loader()
                this.cambiar_alerta({estado:true,color:'red darken-3',texto:'DNI no encontrado!'})
              }   
            }).catch((error)=>{
              console.log('error servidor')
              console.log(error)
              this.cambiar_dialogo_loader()
              this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Sin Respuesta ó sin conexion...!'})
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
              this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Sin Respuesta ó sin conexion...!'})
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