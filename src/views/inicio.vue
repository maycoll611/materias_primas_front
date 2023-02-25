<template>
    <v-col>
      <v-row class="justify-center">
        <v-col cols="12" md="4" sm="8" class="px-1 pb-0">
          <v-stepper v-model="e1" class="pa-0" >
            <v-stepper-header class="pa-0" >
              <v-stepper-step
                :complete="e1 > 1"
                step="1"
              >
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2"
              :complete="e1 > 2">
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items class="pa-0 pb-0" >
              <v-stepper-content step="1" class="pa-0" >
                <v-card
                  class="pa-1 ma-1"
                  color="grey lighten-5"
                >
                <v-row class="ma-0">
                  <v-col cols="12" class="pa-1">
                    <v-row class="ma-0">
                     <strong> Placa vehiculo:</strong> <v-chip small v-if="checklist.cabecera.equipo_placa"> {{checklist.cabecera.equipo_placa}}</v-chip> <v-spacer></v-spacer> 
                      <v-btn rounded small color="teal darken-1 white--text" class="mt-1 parpadea" @click="get_equipos ">
                        <v-badge
                        :value="valor_pestañeo"
                        color="success accent-4"
                        bordered
                        overlap
                      >
                        <v-icon small>mdi-magnify</v-icon> Equipos
                      </v-badge>
                      </v-btn>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="pa-1">
                    <v-card outlined class="pa-1 mb-2 text-caption" >
                        <p class="my-1"><strong>Fecha: </strong> <v-chip small v-if="checklist.cabecera.fecha"> {{checklist.cabecera.fecha}}</v-chip> </p>
                        <p class="my-1"><strong>Descripcion:</strong> <v-chip small v-if="checklist.cabecera.equipo_descripcion"> {{checklist.cabecera.equipo_descripcion}} </v-chip> </p>
                        <p class="my-1"><strong>Modelo: </strong> <v-chip small v-if="checklist.cabecera.equipo_modelo"> {{checklist.cabecera.equipo_modelo}}</v-chip> , <strong>Serie: </strong> <v-chip small v-if="checklist.cabecera.equipo_serie"> {{checklist.cabecera.equipo_serie}} </v-chip> ,<strong>Año: </strong> <v-chip small v-if="checklist.cabecera.equipo_año"> {{checklist.cabecera.equipo_año}} </v-chip></p>
                        <p class="my-1"><strong>Operador: </strong> <v-chip small v-if="checklist.cabecera.operador"> {{checklist.cabecera.operador}}</v-chip> </p>
                        <v-row class="ma-0">
                          <v-col cols="6" class="pa-1 text-caption">
                            
                            <v-text-field type="number" v-model="checklist.cabecera.equipo_kminicial" rounded label="Kilom. Inicial" dense outlined counter="15" max="15" rows="2" class="text-caption"></v-text-field>
                          </v-col>
                          <v-col cols="6" class="pa-1 text-caption">
                            <v-combobox
                              v-model="checklist.cabecera.turno"
                              dense
                              rounded
                              outlined
                              solo
                              :items="items_turno"
                              label="Seleccionar Turno"
                              class="text-caption"
                            ></v-combobox>
                            <!-- <v-text-field v-model="checklist.cabecera.equipo_kmfinal" rounded label="Kilom. Final" dense outlined counter="15" max="15" rows="2" class="text-caption"></v-text-field> -->
                          </v-col>
                          <v-col cols="12" class="pa-1 text-caption">
                            
                            <!-- <v-text-field v-model="checklist.cabecera.turno" rounded label="Turno" dense outlined counter="20" max="20" rows="2" class="text-caption"></v-text-field> -->
                          </v-col>
                        </v-row>
                    </v-card>
                   
                  </v-col>
                  <v-col cols="6"></v-col>
                  <v-col cols="6"></v-col>
                </v-row>
                </v-card>
                <v-row class="ma-0 py-2">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="next_2"
                    rounded
                    small
                  >
                    Siguiente
                  </v-btn>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="2" class="pa-0" height="300" >
               
                <v-card
                  class="pa-1 ma-1"
                  color="grey lighten-3"
                  style="height: calc(100vh - 150px); overflow-y: auto; "
                >
                <v-expansion-panels   accordion class="contenedor text-caption pa-0" v-if="checklist.cuerpo && config_categoria" v-model="panels" multiple >
                    <v-expansion-panel
                      class="pa-0"
                      v-for="(item,i) in auxiliar_elementos"
                      :key="i"
                    >
                      <v-expansion-panel-header color="grey lighten-3" v-if="config_categoria[i].ce_valor" class="text-caption py-0 px-2 ma-0"> <strong>{{item.elemento_tipo}}</strong> ({{item.elemento_tipo_equipo}})</v-expansion-panel-header>
                      <v-expansion-panel-content v-if="config_categoria[i].ce_valor" class="pa-0 ma-0 ">
                        <v-row class="ma-0">
                            <v-col cols="7"  class="pa-0"></v-col>
                            <v-col cols="5"  class="pa-0">
                              <v-row class="ma-0" v-if="item.opciones[1] == 'ME'">
                                
                                <v-spacer></v-spacer>
                                <p class="pa-0 ma-0 text-left">
                                  <strong class="px-2">OK</strong>
                                  <strong class="px-2">ME</strong>
                                  <strong class="px-2">F</strong>
                                  <strong class="px-2">NA</strong></p>
                              </v-row>
                              <v-row class="ma-0" v-if="item.opciones[1] == 'NO'">
                                  <v-spacer></v-spacer>
                                  <p class="pa-0 ma-0 text-left">
                                    <strong class="px-2">SI</strong>
                                    <strong class="px-2">NO</strong>
                                  </p>
                              </v-row>
                            </v-col>
                        </v-row>
                        <div v-for="(item1,i) in checklist.cuerpo" :key="i" >
                          <v-row v-if="item1.elemento_tipo == item.elemento_tipo" class="ma-0">
                            <v-col  class="pa-0" cols="7" v-if="item1.elemento_descripcion != 'OBSERVACIONES'" >
                             
                                <span  style="font-size:9px;" class="font-italic text-sm-left">
                                  {{item1.elemento_descripcion}} 
                                </span>                           
                                
                            </v-col> 
                            <v-col class="pa-0 text-center" cols="5" v-if="item1.elemento_descripcion != 'OBSERVACIONES'" >
                              <v-row class="ma-0">
                                <v-spacer></v-spacer>
                              <v-radio-group
                                v-model="item1.valor" 
                                row
                                dense
                                class="pa-0 ma-0 text-caption"
                                hide-details
                                outlined
                                rounded
                                
                              >
                                <v-radio
                                  v-for="(valor,i) of item1.opciones"
                                  :key="i"
                                  :value="valor"
                                  class="ma-0 text-caption"
                                ></v-radio>
                              </v-radio-group>
                            </v-row>
                            </v-col>
                            <v-col cols="12" class="pa-0 pt-2" v-if="item1.elemento_descripcion == 'OBSERVACIONES'">
                              <v-text-field v-model="item1.valor" rounded label="Observaciones" dense outlined counter="200" max="200" class="text-caption"></v-text-field>
                            </v-col>
                          </v-row>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
              </v-card>
                <v-row class="ma-0 py-2">
                  <v-spacer></v-spacer>
                  <v-btn
                    color=""
                    @click="e1 = 1"
                    rounded
                    small
                  >
                    Anterior
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="e1 = 3"
                    rounded
                    small
                  >
                    Siguiente
                  </v-btn>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="3" class="pa-0">
                <v-card
                  class="pa-1 ma-1"
                  color="grey lighten-5"
                  style="height: calc(100vh - 150px); overflow-y: auto; "
                >
                <v-row class="ma-0">
                  <v-col cols="12" class="pa-1">
                    <v-card outlined class="pa-1 mb-2 text-caption" >
                        <p class="my-1"><strong>Fecha: </strong> {{checklist.cabecera.fecha}} </p>
                        <p class="my-1"><strong>Descripcion:</strong><v-chip small oultlined> {{checklist.cabecera.equipo_descripcion}} </v-chip> </p>
                        <p class="my-1"><strong>Modelo: </strong> {{checklist.cabecera.equipo_modelo}}, <strong>tipo: </strong> {{checklist.cabecera.equipo_tipo}} ,<strong>AÑO: </strong> {{checklist.cabecera.equipo_año}}</p>
                        <p class="my-1"><strong>Kilom. Inicial: </strong><v-chip small v-if="checklist.cabecera.equipo_kminicial">{{checklist.cabecera.equipo_kminicial}}</v-chip>  <strong>kilom. final: </strong> {{checklist.cabecera.equipo_kmfinal}} </p>
                        <p class="my-1"><strong>Operador: </strong> <v-chip small v-if="checklist.cabecera.operador"> {{checklist.cabecera.operador}}</v-chip> <strong>Turno: </strong> {{checklist.cabecera.turno}}</p>
                        <p class="my-1"> </p>
                    </v-card>
                    <v-row class="text-caption pa-0 ma-0" v-if="checklist.cuerpo && config_categoria" >
                      <v-col cols="12" v-for="(item,i) in auxiliar_elementos"
                          :key="i"
                          class="pa-0">
                        <v-card outlined class="pa-1 mb-2 text-caption" 
                          v-if="config_categoria[i].ce_valor"
                        >
                            <v-card-title class="pa-1">
                              <p  class="text-caption py-0 px-2 ma-0"> <strong>{{item.elemento_tipo}}</strong> ({{item.elemento_tipo_equipo}})</p>
                            </v-card-title>
                            
                            <div v-for="(item1,i) in checklist.cuerpo" :key="i" >
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
                <v-row class="ma-0 py-2">
                  <v-spacer></v-spacer>
                  <v-btn
                    color=""
                    @click="e1 = 2"
                    rounded
                    small
                  >
                    Anterior
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="guardar_checklist"
                    rounded
                    small
                  >
                    Guardar
                  </v-btn>
                </v-row>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
          
        </v-col>       
      </v-row>
      <v-dialog v-model="dialog_buscar_placa" max-width="1000" min-hight="800" >
        <v-card class="pa-2">  
          <v-card-title class="pr-1 pl-1 py-1">
            <strong>Buscar Equipo</strong><v-spacer></v-spacer>
              <v-btn
              icon
              outlined
              small
              @click="dialog_buscar_placa = false"
              ref="cerrar_buscar_placa"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-row class="ma-0">  
            <v-col cols="6" class="pa-1">
              <v-text-field
                v-model="buscar_equipos"
                append-icon="mdi-magnify"
                label="Buscar Equipo"
                dense
                outlined
                rounded
                hide-details
                class="text-caption"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="pa-1">
              <v-select
                v-model="categoria_seleccionada"
                :items="equipo_categorias"
                label="Categoria"
                outlined
                rounded
                dense
                hide-details
                
                @change="get_equipos"
              ></v-select>
            </v-col>
          </v-row> 

          <v-data-table
          class="elevation-5 text-caption pt-1"
          dense
          mobile-breakpoint
          item-class="pa-5"
          light
          height="350px"
          :headers="headers_equipos"
          :items="equipos"
          :items-per-page="20"
          :search="buscar_equipos"
          @click:row="equipos_row"
          >
          </v-data-table>
        
        </v-card>

    </v-dialog>
    </v-col>
  </template>
  
  <script>
  import axios from 'axios'
  import moment from 'moment'
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'
  export default {
    name: 'App',
  
    data: () => ({
      valor_pestañeo:0,
      solo:true,
        items_turno:['Diurno','Turnista'],
        dialog_buscar_placa:false,
        form_login_model:null,
        buscar_equipos:null,
        panels:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
        e1:1,
        fecha_hora_hoy: moment().format('Y-MM-D HH:mm:ss'),
        categoria_seleccionada:'TODOS LOS EQUIPOS',
        equipo_categorias:[
                          'TODOS LOS EQUIPOS',
                          'CAL - PLANTA TRITURACION MOVIL',
                          'CENTROS_AUX - SUM_ENERGIA',
                          'EQUIPO_MOVIL - M_PESADA',
                          'EQUIPO_MOVIL - V_PESADO',
                          'EQUIPO_MOVIL - V_LIGERO',
                          'EQUIPO_MOVIL - MONTACARGAS Y BARREDORAS',
                          'EQUIPO_MOVIL - COMPRES_PORT',
                          'EQUIPO_MOVIL - PERFORADORAS'
                          ],
        equipos:[],
        headers_equipos:[
                      {text:"N°",value:"equipo_id", width:30,class:"font-weight-black font-italic text-uppercase"},
                      {text:"Descripcion",value:"equipo_descripcion", align:"left",width:300,class:"font-weight-black font-italic text-uppercase"},
                      {text:"Modelo",value:"equipo_modelo",width:150,class:"font-weight-black font-italic text-uppercase"},
                      {text:"Marca",value:"equipo_marca", align:"left",width:150,class:"font-weight-black font-italic text-uppercase"},
                      {text:"Tipo",value:"equipo_tipo", align:"left",width:80,class:"font-weight-black font-italic text-uppercase"},
                      {text:"Placa",value:"equipo_placa", width:95,class:"font-weight-black font-italic text-uppercase"}
                ],
        checklist:{
            cabecera:{
              equipo_id:"",
              fecha: moment().format('Y-MM-D HH:mm:ss'),
              equipo_placa:"",
              equipo_descripcion:"",
              equipo_modelo:"",
              equipo_serie:"",
              equipo_año:"",
              equipo_kminicial:"",
              equipo_kmfinal:"",
              equipo_tipo:"",
              turno:"",
              operador:"",
              usuario_id:""
            },
            cuerpo:[
          {"elemento_id":"1","elemento_parte":"1","elemento_subparte":"1","elemento_tipo":"CABINA DEL EQUIPO ","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"PANEL DE CONTROL ","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"2","elemento_parte":"1","elemento_subparte":"2","elemento_tipo":"CABINA DEL EQUIPO ","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"LUCES INTERIOR EXTERIOR","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"3","elemento_parte":"1","elemento_subparte":"3","elemento_tipo":"CABINA DEL EQUIPO ","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"PEDALES FRENO /ACELERADOR /EMBRAGUE","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"4","elemento_parte":"1","elemento_subparte":"4","elemento_tipo":"CABINA DEL EQUIPO ","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"CINTURONES /ESPEJOS /PLUMULLAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"5","elemento_parte":"1","elemento_subparte":"5","elemento_tipo":"CABINA DEL EQUIPO ","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"CLAXON /CIRCULINA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"6","elemento_parte":"1","elemento_subparte":"6","elemento_tipo":"CABINA DEL EQUIPO ","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"7","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"LLANTAS Y AROS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"LLANTAS PRINCIPALES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"8","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"LLANTAS Y AROS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"LLANTAS DE REPUESTO","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"9","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"LLANTAS Y AROS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"ARO /ESPARRAGOS /TUERCAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"10","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"LLANTAS Y AROS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"11","elemento_parte":"3","elemento_subparte":"1","elemento_tipo":"NIVELES DE FLUIDOS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"NIVELES DE ACEITES /FLUIDOS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"12","elemento_parte":"3","elemento_subparte":"2","elemento_tipo":"NIVELES DE FLUIDOS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"LIQUIDO /ACEITE DE FRENO","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"13","elemento_parte":"3","elemento_subparte":"3","elemento_tipo":"NIVELES DE FLUIDOS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"NIVEL DE COMBUSTIBLE","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"14","elemento_parte":"3","elemento_subparte":"4","elemento_tipo":"NIVELES DE FLUIDOS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"COMPONENTES SISTEMA ELECTRICO","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"15","elemento_parte":"3","elemento_subparte":"5","elemento_tipo":"NIVELES DE FLUIDOS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"16","elemento_parte":"4","elemento_subparte":"1","elemento_tipo":"MOTOR","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"COMPONENTES DEL MOTOR","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"17","elemento_parte":"4","elemento_subparte":"2","elemento_tipo":"MOTOR","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"COMPONENTES DE REFRIGERACION","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"18","elemento_parte":"4","elemento_subparte":"3","elemento_tipo":"MOTOR","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"COMPONENTES SISTEMA COMBUSTIBLE","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"19","elemento_parte":"4","elemento_subparte":"4","elemento_tipo":"MOTOR","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"20","elemento_parte":"5","elemento_subparte":"1","elemento_tipo":"IMPLEMENTOS DE SEGURIDAD","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"EQUIPAMIENTO DE SEGURIDAD","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"21","elemento_parte":"5","elemento_subparte":"2","elemento_tipo":"IMPLEMENTOS DE SEGURIDAD","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"BOTIQUIN DE EMERGENCIA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"22","elemento_parte":"5","elemento_subparte":"3","elemento_tipo":"IMPLEMENTOS DE SEGURIDAD","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"GATA /LLAVE DE RUEDAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"23","elemento_parte":"5","elemento_subparte":"4","elemento_tipo":"IMPLEMENTOS DE SEGURIDAD","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"24","elemento_parte":"6","elemento_subparte":"1","elemento_tipo":"CAMIÓN GRUA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"ESTRUCTURA PRINCIPAL DE GRUA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"25","elemento_parte":"6","elemento_subparte":"2","elemento_tipo":"CAMIÓN GRUA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"SISTEMA HIDRAULICO","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"26","elemento_parte":"6","elemento_subparte":"3","elemento_tipo":"CAMIÓN GRUA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"MANDOS DE CONTROL","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"27","elemento_parte":"6","elemento_subparte":"4","elemento_tipo":"CAMIÓN GRUA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"28","elemento_parte":"7","elemento_subparte":"1","elemento_tipo":"CAMIÓN CISTERNA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"TANQUE PRINCIPAL","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"29","elemento_parte":"7","elemento_subparte":"2","elemento_tipo":"CAMIÓN CISTERNA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"SISTEMA DE RIEGO /CARGA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"30","elemento_parte":"7","elemento_subparte":"3","elemento_tipo":"CAMIÓN CISTERNA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"SISTEMA NEUMATICO","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"31","elemento_parte":"7","elemento_subparte":"4","elemento_tipo":"CAMIÓN CISTERNA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"32","elemento_parte":"8","elemento_subparte":"1","elemento_tipo":"CAMIÓN FURGON","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"ESTRUCTURA DEL FURGON","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"33","elemento_parte":"8","elemento_subparte":"2","elemento_tipo":"CAMIÓN FURGON","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"PROTECTOR INTERIOR FURGON","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"34","elemento_parte":"8","elemento_subparte":"3","elemento_tipo":"CAMIÓN FURGON","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"COMPUERTAS LATERAL /POSTERIOR","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"35","elemento_parte":"8","elemento_subparte":"4","elemento_tipo":"CAMIÓN FURGON","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"36","elemento_parte":"9","elemento_subparte":"1","elemento_tipo":"MONTACARGAS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"ESTRUCTURA DEL MASTIL","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"37","elemento_parte":"9","elemento_subparte":"2","elemento_tipo":"MONTACARGAS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"SISTEMA HIDRAULICO","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"38","elemento_parte":"9","elemento_subparte":"3","elemento_tipo":"MONTACARGAS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"PROTECTOR DEL OPERADOR","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"39","elemento_parte":"9","elemento_subparte":"4","elemento_tipo":"MONTACARGAS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"40","elemento_parte":"10","elemento_subparte":"1","elemento_tipo":"OMNIBUS /MINIBUS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"ESTRUCTURA PRINCIPAL /CARROCERIA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"41","elemento_parte":"10","elemento_subparte":"2","elemento_tipo":"OMNIBUS /MINIBUS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"ASIENTOS /CINTURONES /PASAMANOS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"42","elemento_parte":"10","elemento_subparte":"3","elemento_tipo":"OMNIBUS /MINIBUS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"MUELLES /FRENOS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"43","elemento_parte":"10","elemento_subparte":"4","elemento_tipo":"OMNIBUS /MINIBUS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"44","elemento_parte":"11","elemento_subparte":"1","elemento_tipo":"CARGADOR FRONTAL","elemento_tipo_equipo":"PESADO","elemento_descripcion":"ESTRUCTURA PRINCIPAL","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"45","elemento_parte":"11","elemento_subparte":"2","elemento_tipo":"CARGADOR FRONTAL","elemento_tipo_equipo":"PESADO","elemento_descripcion":"IMPLEMENTOS /CUCHARA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"46","elemento_parte":"11","elemento_subparte":"3","elemento_tipo":"CARGADOR FRONTAL","elemento_tipo_equipo":"PESADO","elemento_descripcion":"SEGMENTOS /PUNTAS /PERNOS /TUERCAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"47","elemento_parte":"11","elemento_subparte":"4","elemento_tipo":"CARGADOR FRONTAL","elemento_tipo_equipo":"PESADO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"48","elemento_parte":"12","elemento_subparte":"1","elemento_tipo":"TRACTOR SOBRE ORUGA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"ESTRUCTURA PRINCIPAL","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"49","elemento_parte":"12","elemento_subparte":"2","elemento_tipo":"TRACTOR SOBRE ORUGA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"BRAZOS DE EMPUJE /HOJA TOPADORA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"50","elemento_parte":"12","elemento_subparte":"3","elemento_tipo":"TRACTOR SOBRE ORUGA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"CUCHILLAS /CANTONERAS /PERNOS /TUERCAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"51","elemento_parte":"12","elemento_subparte":"4","elemento_tipo":"TRACTOR SOBRE ORUGA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"52","elemento_parte":"13","elemento_subparte":"1","elemento_tipo":"EXCAVADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"ESTRUCTURA PRINCIPAL","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"53","elemento_parte":"13","elemento_subparte":"2","elemento_tipo":"EXCAVADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"IMPLEMENTOS /CUCHARA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"54","elemento_parte":"13","elemento_subparte":"3","elemento_tipo":"EXCAVADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"SEGMENTOS /PROTECTORES /PERNOS /TUERCAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"55","elemento_parte":"13","elemento_subparte":"4","elemento_tipo":"EXCAVADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"56","elemento_parte":"14","elemento_subparte":"1","elemento_tipo":"MOTONIVELADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"ESTRUCTURA PRINCIPAL","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"57","elemento_parte":"14","elemento_subparte":"2","elemento_tipo":"MOTONIVELADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"IMPLEMENTOS /HOJA TOPADORA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"58","elemento_parte":"14","elemento_subparte":"3","elemento_tipo":"MOTONIVELADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"SEGMENTOS /PROTECTORES /PERNOS /TUERCAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"59","elemento_parte":"14","elemento_subparte":"4","elemento_tipo":"MOTONIVELADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"60","elemento_parte":"15","elemento_subparte":"1","elemento_tipo":"ACTIVIDAD A REALIZARSE ADICIONALMENTE.","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"LAVADO INTEGRAL","valor":"","opciones":['SI','NO']},
          {"elemento_id":"61","elemento_parte":"15","elemento_subparte":"2","elemento_tipo":"ACTIVIDAD A REALIZARSE ADICIONALMENTE.","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"ENGRASE","valor":"","opciones":['SI','NO']},
          {"elemento_id":"62","elemento_parte":"15","elemento_subparte":"3","elemento_tipo":"ACTIVIDAD A REALIZARSE ADICIONALMENTE.","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"LIMPIEZA DE FILTROS DE AIRE","valor":"","opciones":['SI','NO']},
          {"elemento_id":"63","elemento_parte":"15","elemento_subparte":"4","elemento_tipo":"ACTIVIDAD A REALIZARSE ADICIONALMENTE.","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['SI','NO']},
          {"elemento_id":"64","elemento_parte":"16","elemento_subparte":"1","elemento_tipo":"SISTEMA DE CONTROL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"DISPLAY IC","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"65","elemento_parte":"16","elemento_subparte":"2","elemento_tipo":"SISTEMA DE CONTROL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"PERILLAS DE ARRANQUE Y CONTROL","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"66","elemento_parte":"16","elemento_subparte":"3","elemento_tipo":"SISTEMA DE CONTROL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"CONTROL DE REGULACION ALIMENTADOR","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"67","elemento_parte":"16","elemento_subparte":"4","elemento_tipo":"SISTEMA DE CONTROL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"MANDO ALAMBRICO","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"68","elemento_parte":"16","elemento_subparte":"5","elemento_tipo":"SISTEMA DE CONTROL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"69","elemento_parte":"17","elemento_subparte":"1","elemento_tipo":"MOTOR DE COMBUSTION","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"COMPONENTES DEL MOTOR","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"70","elemento_parte":"17","elemento_subparte":"2","elemento_tipo":"MOTOR DE COMBUSTION","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"COMPONENTES DE REFRIGERACION","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"71","elemento_parte":"17","elemento_subparte":"3","elemento_tipo":"MOTOR DE COMBUSTION","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"COMPONENTES SISTEMA COMBUSTIBLE","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"72","elemento_parte":"17","elemento_subparte":"4","elemento_tipo":"MOTOR DE COMBUSTION","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"COMPONENTES SISTEMA LUBRICACION","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"73","elemento_parte":"17","elemento_subparte":"5","elemento_tipo":"MOTOR DE COMBUSTION","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"74","elemento_parte":"18","elemento_subparte":"1","elemento_tipo":"NIVELES DE FLUDOS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"NIVEL ACEITE DE MOTOR","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"75","elemento_parte":"18","elemento_subparte":"2","elemento_tipo":"NIVELES DE FLUDOS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"NIVEL REFRIGERANTE","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"76","elemento_parte":"18","elemento_subparte":"3","elemento_tipo":"NIVELES DE FLUDOS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"NIVEL CAJA REDUCTOR ALIMENTADOR","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"77","elemento_parte":"18","elemento_subparte":"4","elemento_tipo":"NIVELES DE FLUDOS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"NIVEL ACEITE HIDRAULICO","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"78","elemento_parte":"18","elemento_subparte":"5","elemento_tipo":"NIVELES DE FLUDOS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"79","elemento_parte":"19","elemento_subparte":"1","elemento_tipo":"SISTEMA HIDRAULICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BOMBAS, MOTORES Y LINEAS HIDRAULICAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"80","elemento_parte":"19","elemento_subparte":"2","elemento_tipo":"SISTEMA HIDRAULICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"VALVULAS Y SOLENOIDES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"81","elemento_parte":"19","elemento_subparte":"3","elemento_tipo":"SISTEMA HIDRAULICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BLOQUE DE VALVULAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"82","elemento_parte":"19","elemento_subparte":"4","elemento_tipo":"SISTEMA HIDRAULICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"CILINDROS HIDRAULICOS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"83","elemento_parte":"19","elemento_subparte":"5","elemento_tipo":"SISTEMA HIDRAULICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"84","elemento_parte":"20","elemento_subparte":"1","elemento_tipo":"SISTEMA DE ELECTRICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"ARRANCADOR, ALTERNADOR, POLEAS Y CORREAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"85","elemento_parte":"20","elemento_subparte":"2","elemento_tipo":"SISTEMA DE ELECTRICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"HARNES, SENSORES, FUSIBLES ELECTRICOS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"86","elemento_parte":"20","elemento_subparte":"3","elemento_tipo":"SISTEMA DE ELECTRICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"CABLE INTER LOOCK, LUNINARIAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"87","elemento_parte":"20","elemento_subparte":"4","elemento_tipo":"SISTEMA DE ELECTRICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BATERIAS, TERMINALES, CONECTORES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"88","elemento_parte":"20","elemento_subparte":"5","elemento_tipo":"SISTEMA DE ELECTRICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"89","elemento_parte":"21","elemento_subparte":"1","elemento_tipo":"ALIMENTADOR TRITURADORA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"ALIMENTADOR, PARRILLAS Y MALLA FINOS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"90","elemento_parte":"21","elemento_subparte":"2","elemento_tipo":"ALIMENTADOR TRITURADORA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"QUIJADAS, PLACAS, PERNOS Y TUERCAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"91","elemento_parte":"21","elemento_subparte":"3","elemento_tipo":"ALIMENTADOR TRITURADORA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BRAZO PITMAN","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"92","elemento_parte":"21","elemento_subparte":"4","elemento_tipo":"ALIMENTADOR TRITURADORA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"ACCIONAMIENTO, CORREAS Y POLEAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"93","elemento_parte":"21","elemento_subparte":"5","elemento_tipo":"ALIMENTADOR TRITURADORA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"94","elemento_parte":"22","elemento_subparte":"1","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA T.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BANDA DE FINOS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"95","elemento_parte":"22","elemento_subparte":"2","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA T.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BANDA DE DESCARGA A ZARANDA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"96","elemento_parte":"22","elemento_subparte":"3","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA T.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"POLINES DE CARGA Y DESCARGA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"97","elemento_parte":"22","elemento_subparte":"4","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA T.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"SOPORTES Y CHUMACERAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"98","elemento_parte":"22","elemento_subparte":"5","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA T.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"99","elemento_parte":"23","elemento_subparte":"1","elemento_tipo":"CRIBA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"CONJUNTO DE VIBRACION","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"100","elemento_parte":"23","elemento_subparte":"2","elemento_tipo":"CRIBA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"MALLAS PRIMER, SEGUNDO, TERCER NIVEL","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"101","elemento_parte":"23","elemento_subparte":"3","elemento_tipo":"CRIBA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"SOPORTES, GOMAS, SUJETADORES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"102","elemento_parte":"23","elemento_subparte":"4","elemento_tipo":"CRIBA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"AMORTIGUADORES CAJA VIBRANTE","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"103","elemento_parte":"23","elemento_subparte":"5","elemento_tipo":"CRIBA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"104","elemento_parte":"24","elemento_subparte":"1","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA Z.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BANDA DE RECEPCION Y ELEVACION","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"105","elemento_parte":"24","elemento_subparte":"2","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA Z.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BANDAS A, B, C Y D","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"106","elemento_parte":"24","elemento_subparte":"3","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA Z.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"POLINES DE CARGA Y DESCARGA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"107","elemento_parte":"24","elemento_subparte":"4","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA Z.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"SOPORTES Y CHUMACERAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"108","elemento_parte":"24","elemento_subparte":"5","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA Z.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"109","elemento_parte":"25","elemento_subparte":"1","elemento_tipo":"ESTRUTURA PRINCIPAL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"CHASIS Y BASTIDOR PRINCIPAL","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"110","elemento_parte":"25","elemento_subparte":"2","elemento_tipo":"ESTRUTURA PRINCIPAL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"TOLVA, PROTECTORES, COBERTURAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"111","elemento_parte":"25","elemento_subparte":"3","elemento_tipo":"ESTRUTURA PRINCIPAL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"POLINES DE CARGA Y DESCARGA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"112","elemento_parte":"25","elemento_subparte":"4","elemento_tipo":"ESTRUTURA PRINCIPAL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"SOPORTES Y CHUMACERAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"113","elemento_parte":"25","elemento_subparte":"5","elemento_tipo":"ESTRUTURA PRINCIPAL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"114","elemento_parte":"26","elemento_subparte":"1","elemento_tipo":"EQUIPOS DE SEGURIDAD","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"PARADAS DE EMERGENCIA","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"115","elemento_parte":"26","elemento_subparte":"2","elemento_tipo":"EQUIPOS DE SEGURIDAD","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"SISTEMA DE BLOQUEO","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"116","elemento_parte":"26","elemento_subparte":"3","elemento_tipo":"EQUIPOS DE SEGURIDAD","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"EXTINTOR, BOTIQUIN","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"117","elemento_parte":"26","elemento_subparte":"4","elemento_tipo":"EQUIPOS DE SEGURIDAD","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"LINEAS DE VIDA, BARANDAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"118","elemento_parte":"26","elemento_subparte":"5","elemento_tipo":"EQUIPOS DE SEGURIDAD","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"119","elemento_parte":"27","elemento_subparte":"1","elemento_tipo":"OTROS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"AUMENTO DE ACEITE","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"120","elemento_parte":"27","elemento_subparte":"2","elemento_tipo":"OTROS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"AUMENTO DE REFRIGERANTEREFRIGERANTE","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"121","elemento_parte":"27","elemento_subparte":"3","elemento_tipo":"OTROS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"SUMINISTRO COMBUSTIBLE","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"122","elemento_parte":"27","elemento_subparte":"4","elemento_tipo":"OTROS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"LUBRICACION PITMAN Y CHUMACERAS","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"123","elemento_parte":"27","elemento_subparte":"5","elemento_tipo":"OTROS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"LIMPIEZA INTEGRAL DE EQUIPO","valor":"","opciones":['OK','ME','F','NA']},
          {"elemento_id":"124","elemento_parte":"27","elemento_subparte":"6","elemento_tipo":"OTROS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":"","opciones":['OK','ME','F','NA']}

          ],
        }
      }),
      updated(){
        // this.pestañeos()
      },
      mounted() {
        this.checklist.cabecera.usuario_id = this.usuario.usuario_id
          this.checklist.cabecera.operador = this.usuario.usuario_detalle_nombre
        // this.get_checklist_vacio()
        // this.buscar_placa()
        // this.get_ip()
        // this.pestañeos()
      },
      methods:{
        ...mapMutations(['cambiar_datos_usuario','cambiar_config_categoria','cambiar_dialogo_loader','cambiar_estado_sesion','cambiar_alerta']),
        pestañeos(){
          var i = 0 
          var valor_bucle = setInterval(function(){
            // console.log(i)
            if(i>= 20){
              clearInterval(valor_bucle)
              this.valor_pestañeo = 0
            }
            // numeros impares
            if(i % 2 == 1){
              this.valor_pestañeo = "teal"
            }else{
              this.valor_pestañeo = "default"
            }
            console.log(this.valor_pestañeo)
            i++
          },1000)

        },
        get_ip(){
            axios.get('https://api.ipify.org?format=json').then(response =>{
              console.log(response);
            }).catch(error=>{
              console.log(error)
            })
        },
        next_2(){
          if(this.checklist.cabecera.equipo_descripcion && this.checklist.cabecera.equipo_kminicial){
            this.e1 = 2
          }else{
            this.cambiar_alerta({estado:true,color:'warning darken-2',texto:'Seleccionar Equipo y Kilometraje'})
          }
          
        },
        limpiar_formulario(){
          
              this.checklist.cabecera.equipo_id=""
              this.checklist.cabecera.fecha= moment().format('Y-MM-D HH:mm:ss')
              this.checklist.cabecera.equipo_placa=""
              this.checklist.cabecera.equipo_descripcion=""
              this.checklist.cabecera.equipo_modelo=""
              this.checklist.cabecera.equipo_serie=""
              this.checklist.cabecera.equipo_año=""
              this.checklist.cabecera.equipo_kminicial=""
              this.checklist.cabecera.equipo_kmfinal=""
              this.checklist.cabecera.equipo_tipo=""
              this.checklist.cabecera.turno=""
              this.checklist.cuerpo.forEach(element => {
                element.valor = ""
              });
              

        },
        guardar_checklist(){
          
          this.cambiar_dialogo_loader()
          if(this.checklist.cabecera.equipo_id != '' && this.checklist.cabecera.equipo_kminicial != ''){
            axios.post(this.host+'api/guardar_checklist',this.checklist).then(response =>{
              // console.log(response.data)
              if(response.data.status){
                this.cambiar_alerta({estado:true,color:'teal darken-2',texto:'CheckList: '+response.data.id+' guardado con exito!'})
                this.limpiar_formulario()
                this.$router.push({name:'listado'})
              }else{
                this.cambiar_alerta({estado:true,color:'red darken-2',texto:'No se pudo guardar el registro!'})
              }
              this.cambiar_dialogo_loader()
              
            }).catch((error)=>{
              console.log('error servidor')
              console.log(error)
              this.cambiar_dialogo_loader()
              
              this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Sin Respuesta ó sin conexion...!'})
            })  
          }else{
            this.cambiar_dialogo_loader()
            this.cambiar_alerta({estado:true,color:'warning darken-3',texto:'Sin kilomentraje || ningun equipo seleccionado!'})
          }
          },
        get_equipos(){   
          //hola mundo versiones
          this.buscar_equipos = ''
          this.cambiar_dialogo_loader()
          axios.post(this.host+'api/get_equipos',{equipo_categoria:this.categoria_seleccionada}).then(response =>{
            // console.log(response.data)
            this.dialog_buscar_placa = true
            this.equipos = response.data
            this.cambiar_dialogo_loader()
            // this.$refs.cerrar_buscar_placa.$el.focus()
            // this.$refs.cerrar_buscar_placa.focus()
          }).catch((error)=>{
            console.log('error servidor')
            console.log(error)
            this.cambiar_dialogo_loader()
            this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Sin Respuesta ó sin conexion...!'})
          })
        },

        equipos_row(item){
          this.limpiar_formulario()
          console.log(this.checklist)
          this.cambiar_dialogo_loader()
            axios.post(this.host+'api/get_config_categoria_id',{categoria_id: item.equipo_id}).then(response =>{
              console.log(response.data)
              this.cambiar_config_categoria(response.data)

              this.checklist.cabecera.equipo_id=item.equipo_id
              this.checklist.cabecera.equipo_placa=item.equipo_placa
              this.checklist.cabecera.equipo_descripcion=item.equipo_descripcion
              this.checklist.cabecera.equipo_modelo=item.equipo_modelo
              this.checklist.cabecera.equipo_serie=item.equipo_serie
              this.checklist.cabecera.equipo_año=item.equipo_año
              this.checklist.cabecera.equipo_tipo=item.equipo_tipo
              this.dialog_buscar_placa = false
              this.cambiar_dialogo_loader()
            }).catch((error)=>{
              console.log('error servidor')
              console.log(error)
              this.cambiar_dialogo_loader()
              this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Sin Respuesta ó sin conexion...!'})
            })

        },
        get_checklist_vacio(){
          this.checklist.cabecera.usuario_id = this.usuario.usuario_id
          this.checklist.cabecera.operador = this.usuario.usuario_detalle_nombre
          this.cambiar_dialogo_loader()
          axios.post(this.host+'api/get_checklist_vacio',this.usuario).then(response =>{
            var data1 = eval(response.data)
            this.cambiar_dialogo_loader()
            data1.forEach(element => {
              
              if(element.elemento_id < 60){
                element.opciones=['OK','ME','F','NA']
              }else{
                element.opciones=['SI','NO']
              }
              element.elemento_valor=" "

              if(element.elemento_subparte == 1){
                this.auxiliar_elementos.push(element)
              }
              // this.checklist.cuerpo.push(element)
            })
            console.log(this.auxiliar_elementos)
            // console.log(this.auxiliar_elementos)
          }).catch((error)=>{
            console.log('error servidor')
            console.log(error)
            this.cambiar_dialogo_loader()
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
                    usuario_id:response.data.resp[0].usuario_id ,
                    usuario_nombre:"",
                    usuario_pw:"",
                    usuario_detalle_nombre:response.data.resp[0].usuario_detalle_nombre,
                    usuario_area: response.data.resp[0].usuario_area,
                    api_token:response.data.resp[0].api_token,
                    usuario_cargo:response.data.resp[0].usuario_cargo
                    }
            // console.log(valor)
            this.cambiar_datos_usuario(valor)
            // console.log(state.usuario)
            this.cambiar_estado_sesion(true)
            this.$router.push({name:'guias'})
            // router.replace({name:'guias'})
            this.cambiar_dialogo_loader()
          }else{
           
           this.cambiar_dialogo_loader()
           this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Credenciales incorrectas...!'})
          }
        }).catch((error)=>{
          console.log('error servidor')
          console.log(error)
          this.cambiar_dialogo_loader()
          
          this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Sin Respuesta ó sin conexion...!'})
        })
        }
  
      },
      computed:{
        ...mapState(['usuario','estado_sesion','host','auxiliar_elementos','config_categoria'])
      }
  }
  </script>
  
  <style >
    .v-expansion-panel-content__wrap {
        padding: 0 10px 10px !important;
        flex: 1 1 auto;
        max-width: 100%;
    }
.v-expansion-panel--active > .v-expansion-panel-header {
    min-height: 50px !important;
}
.v-text-field input {
    flex: 1 1 auto;
    line-height: 10px;
    padding: 5px 0 5px;
    max-width: 100%;
    min-width: 0px;
    width: 100%;
}
.contenedor::-webkit-scrollbar:vertical {
    width:5px;
}
.v-slide-group__next, .v-slide-group__prev {
    align-items: center;
    display: flex;
    flex: 0 1 25px !important;
    justify-content: center;
    min-width: 25px !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
    padding: 0 8px !important;
    font-size: 11px !important;
}

.parpadea {
  
  animation-name: parpadeo;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: 7;

  -webkit-animation-name:parpadeo;
  -webkit-animation-duration: 2s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: 7;
}

@-moz-keyframes parpadeo{  
  0% { opacity: 1.0; }
  50% { opacity: 0.5; }
  100% { opacity: 1.0; }
}

@-webkit-keyframes parpadeo {  
  0% { opacity: 1.0; }
  50% { opacity: 0.5; }
   100% { opacity: 1.0; }
}

@keyframes parpadeo {  
  0% { opacity: 1.0; }
   50% { opacity: 0.5; }
  100% { opacity: 1.0; }
}
  </style>