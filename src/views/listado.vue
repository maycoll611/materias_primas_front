<template>
    <v-row class="mx-0 pt-4">
        <v-col cols="12">
            <v-row class="ma-0">
                <v-btn small rounded color="teal darken-1 white--text"  @click="nuevo_checklist()"  class="text-caption parpadea"><v-icon small>mdi-plus</v-icon> Nuevo checklist</v-btn>
                <v-spacer></v-spacer>
                <v-btn small rounded color="primary" @click="get_checklist()"  class="text-caption"><v-icon small>mdi-refresh</v-icon></v-btn>
                <a :href="host+'api/export_get_checklist'" type="button" style="text-decoration:none;" v-if="usuario.usuario_cargo == 'superadmin'">
                    <v-btn rounded color="green darken-3" small class="text-caption white--text"><v-icon>mdi-microsoft-excel</v-icon></v-btn>           
                </a>
            </v-row>
        </v-col>
        <v-col cols="6" md="6">
            <v-text-field
                v-model="buscar_checklist_id"
                label="Nro. Documento"
                append-icon="mdi-magnify"
                @click:append="ver_checklist()"
                dense
                outlined
                rounded
                type="number"
                hide-details
            ></v-text-field>
        </v-col>
        <v-col cols="6" md="6">
            <v-text-field
                v-model="buscar_checklist"
                
                label="Buscar"
                append-icon="mdi-filter-menu"
                @click:append="filtrar()"
                dense
                outlined
                rounded
                hide-details
            ></v-text-field>
        </v-col>
        
        <v-col cols="12">    
            <v-data-table
            class="elevation-2"
            style="font-size: 7px"
            item-class="pa-5"
            dense
            :items-per-page="15"
            :headers="headers"
            :items="listado_checklist"
            :search="buscar_checklist"
            mobile-breakpoint
            @click:row="ver_checklist"
            >
            <!-- <template v-slot:[`item.venta_correlativo`]="{item}">
                <v-row :class="item.venta_anulado?'text-decoration-line-through':''">
                    <span class="una_linea">{{item.venta_correlativo.length >30?item.venta_correlativo.substr(0,30)+"...":item.venta_correlativo}}</span>
                </v-row>
            </template>
            <template v-slot:[`item.empresa_razon_social`]="{item}">
                <v-row>
                    <span class="una_linea">{{item.empresa_razon_social.length >30?item.empresa_razon_social.substr(0,30)+"...":item.empresa_razon_social}}</span>
                </v-row>
            </template>
            <template v-slot:[`item.usuario_detalle_nombre`]="{item}">
                <span class="una_linea">{{item.usuario_detalle_nombre.length >25?item.usuario_detalle_nombre.substr(0,25)+"...":item.usuario_detalle_nombre}}</span>
            </template>-->
            <template v-slot:[`item.venta_fecha_registro`]="{item}">
                <span class="una_linea">{{item.venta_fecha_registro.length >10?item.venta_fecha_registro.substr(0,10)+"...":item.venta_fecha_registro}}</span>
            </template> 
                <template v-slot:[`item.actions`]="{item}">
                    <v-menu
                    class="pa-1"
                    origin="center center"
                    transition="scale-transition"
                    >
                    <template v-slot:activator="{ on, attrs }" class="pa-0">
                        
                        <v-btn small icon outlined  v-bind="attrs" v-on="on" :color="item.checklist_autorizado == 1?'teal':'warning darken-2'">
                            
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list class="pa-1" shaped>
                        <v-list-item class="pa-1 py-0">
                            <v-btn class="rounded-pill text-caption" width="auto" text color="teal" @click="ver_checklist(item)" dense> <v-icon class="pr-1">mdi-eye-plus </v-icon> Detalles</v-btn>
                        </v-list-item>
                        <v-list-item class="pa-1 py-0">
                            <v-btn class="rounded-pill text-caption" width="auto" text color="default" @click="ver_km_final(item)" dense> <v-icon class="pr-1">mdi-clock-end </v-icon> Km. Final</v-btn>
                        </v-list-item>
                        <v-list-item class="pa-1 py-0">
                            <v-btn class="rounded-pill text-caption" width="auto" text color="warning"  dense> <v-icon class="pr-1">mdi-content-copy </v-icon> Referencia</v-btn>
                        </v-list-item>
                        <!-- <v-list-item class="pa-1 py-0">
                            <v-btn  class="rounded-pill text-caption" width="auto" text color="red"   dense> <v-icon class="pr-1">mdi-trash-can</v-icon> Anular</v-btn>
                        </v-list-item> -->
                        
                    </v-list>
                    </v-menu>
                </template>
            </v-data-table>
<!-- dialogo anular -->
            <v-dialog v-model="dialog_anular_guia" max-width="500">
                <v-card >
                    <v-card-title color="teal">
                        Motivo de la anulacion
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form_anular_guia" v-model="validate_guia_anular">
                            <v-row class="mx-0 pt-3">
                                <v-col class=" pa-1 text-body-2 py-2" cols="3">
                                    <v-text-field rounded v-model="anulacion.correlativo" :readonly="true" dense outlined label="Motivo de la anulacion"></v-text-field>
                                </v-col>
                                <v-col class=" pa-1 text-body-2 py-2" cols="9">
                                    <v-text-field rounded v-model="anulacion.motivo_descripcion" dense outlined label="Motivo de la anulacion"></v-text-field>
                                </v-col>
                                <v-col class=" pa-1 text-body-2 py-2" cols="12">
                                    <v-row class="ma-0">
                                        <v-spacer></v-spacer>
                                        <!-- <v-btn rounded color="red" small @click="guardar_anular_guia">Si, anular</v-btn> -->
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog> 
            
            <v-dialog v-model="dialog_detalle_checklist" max-width="500">
                <v-card>
                    <v-card-title class="pr-1">
                        <strong>Detalle checklist </strong><v-spacer></v-spacer>
                        <v-btn
                        icon
                        outlined
                        small
                        @click="dialog_detalle_checklist = false"
                        >
                        <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                </v-card>
                <vista_checklist v-if="checklist_seleccionado" @get_data="get_checklist"></vista_checklist>
            </v-dialog>
<!-- diago filtro para formulario  -->
             <v-dialog v-model="dialog_filtro_guias" max-width="500">
                <v-card >
                    <v-card-title color="teal">
                        Filtros para consulta
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form_anular_guia" v-model="validate_form_filtro">
                            <v-row class="mx-0 pt-3">
                                <v-col class=" pa-1 text-body-2 py-2" cols="12" md="6">
                                    <v-menu
                                        ref="menu_desde"
                                        v-model="menu_desde"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="filtro_guias.desde"
                                            label="Desde Fecha"
                                            readonly
                                            clearable
                                            rounded
                                            outlined
                                            dense
                                            v-bind="attrs"
                                            v-on="on"
                                            @click:clear="filtro_guias.desde = null"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="filtro_guias.desde"
                                        no-title
                                        scrollable
                                        @input="menu_desde = false"
                                        >
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col class=" pa-1 text-body-2 py-2" cols="12" md="6">
                                    <v-menu
                                        ref="menu_hasta"
                                        v-model="menu_hasta"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="filtro_guias.hasta"
                                            label="Hasta fecha"
                                            readonly
                                            clearable
                                            rounded
                                            outlined
                                            dense
                                            v-bind="attrs"
                                            v-on="on"
                                            @click:clear="filtro_guias.hasta = null"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="filtro_guias.hasta"
                                        no-title
                                        scrollable
                                        @input="menu_hasta = false"
                                        >
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col class=" pa-1 text-body-2 py-2" cols="12" md="6">
                                    <!-- <v-combobox
                                    v-model="filtro_guias.usuario_area"
                                    :items="areas"
                                    label="Select Area"
                                    multiple
                                    chips
                                    clearable
                                    outlined
                                    dense
                                    rounded
                                    ></v-combobox> -->
                                    <!-- <v-text-field rounded v-model="anulacion.motivo_descripcion" dense outlined label="Motivo de la anulacion"></v-text-field> -->
                                </v-col>
                                <v-col class=" pa-1 text-body-2 py-2" cols="12">
                                    <v-row class="ma-0">
                                        <v-spacer></v-spacer>
                                        <!-- <v-btn rounded color="red" small @click="guardar_anular_guia">Si, anular</v-btn> -->
                                    </v-row>
                                </v-col>
                                <v-col class=" pa-1 text-body-2 py-2" cols="12">
                                    <v-row class="ma-0">
                                        <v-spacer></v-spacer>
                                        <v-btn rounded color="primary" small @click="get_checklist">Aplicar</v-btn>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
<!-- dialogo para kilometraje final  -->
            <v-dialog v-model="dialog_km_final" max-width="500">
                <v-card >
                    <v-card-title color="teal">
                        <strong>Kilometraje Final</strong><v-spacer></v-spacer>
                            <v-btn
                            icon
                            outlined
                            small
                            @click="dialog_km_final = false"
                            >
                            <v-icon>mdi-close</v-icon>
                            </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form_anular_guia" v-model="validate_form_filtro">
                            <v-row class="mx-0 pt-3">
                                <v-col class=" pa-1 text-body-2 py-2" cols="12" md="6">
                                    <p class="my-1"><strong>Descripcion:</strong> <v-chip small v-if="km_final.checklist_equipo"> {{km_final.checklist_equipo}} </v-chip> </p>
                                </v-col>
                                <v-col class=" pa-1 text-body-2 py-2" cols="12">
                                    <p class="my-1"><strong>Km. inicial: </strong> <v-chip small v-if="km_final.checklist_km_inicial"> {{km_final.checklist_km_inicial}}</v-chip></p>
                                </v-col>
                                <v-col class=" pa-1 text-body-2 py-2" cols="12">
                                    <v-text-field type="number" :disabled="estado_km_final" rounded v-model="km_final.checklist_km_final" dense outlined label="Km. Final"></v-text-field>
                                </v-col>
                                <v-col class=" pa-1 text-body-2 py-2" cols="12">
                                    <v-row class="ma-0">
                                        <v-spacer></v-spacer>
                                        <v-btn rounded color="primary" small @click="guardar_km_final">Guardar</v-btn>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>  
        </v-col>
        
    </v-row>
</template>
<script>
import moment from 'moment'
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
import vista_checklist from '@/components/vista_checklist.vue'

export default{
    components:{
        vista_checklist
    },
    data:()=>({
        estado_km_final:false,
        km_final:{
            checklist_id:"",
            checklist_equipo:"",
            checklist_km_inicial:"",
            checklist_km_final:""
        },
        ancho:false,
        menu_desde:false,
        menu_hasta:false,
        dialog_km_final:false,
        dialog_detalle_checklist:false,
        dialog_anular_guia:false,
        dialog_filtro_guias:false,
        anulacion:{correlativo:'',motivo_descripcion:''},
        parametros:{
            fecha_inicio:moment().format("dddd, DD MMMM YYYY, h:mm:ss a"),
            fecha_fin:null,
        },
        buscar_checklist_id:'',
        buscar_checklist:'',
        headers:[{text:'Op',value:'actions',align:'center',width:80},
                {text:"Doc.", value:"checklist_id",align:'left',width:80},
                {text:"Equipo",value:"equipo_descripcion",align:'left',width:350},
                {text:"Fecha",value:"checklist_fecha_hora",align:'left',width:200},
                {text:"Placa", value:"equipo_placa",align:'left',width:80},
                {text:"Usuario",value:"usuario_detalle_nombre",align:'left',width:300},  
                {text:"Area.",value:"usuario_area",align:'left',width:350},
                ],
        data_guias:[
                    // {correlativo:"007-0019597",razon_social:"YURA S.A.",ruc:"20346787349",destino:"AREQUIPA",materiales:"RETEN, TRAPO INDUSTRIAL",usuario:"EFLORES"},
                    // {correlativo:"007-0019596",razon_social:"CAL Y CEMENTO SUR S.A.",ruc:"20346787349",destino:"AREQUIPA",materiales:"RETEN, TRAPO INDUSTRIAL",usuario:"ACALSIN"},
                    // {correlativo:"007-0019595",razon_social:"CAL Y CEMENTO SUR S.A.",ruc:"20346787349",destino:"AREQUIPA",materiales:"RETEN, TRAPO INDUSTRIAL",usuario:"EFLORES"},
                    // {correlativo:"007-0019594",razon_social:"CAL Y CEMENTO SUR S.A.",ruc:"20346787349",destino:"AREQUIPA",materiales:"RETEN, TRAPO INDUSTRIAL",usuario:"ACALSIN"},
                    // {correlativo:"007-0019593",razon_social:"YURA S.A.",ruc:"20346787349",destino:"AREQUIPA",materiales:"RETEN, TRAPO INDUSTRIAL",usuario:"EFLORES"},
                    // {correlativo:"007-0019592",razon_social:"YURA S.A.",ruc:"20346787349",destino:"AREQUIPA",materiales:"RETEN, TRAPO INDUSTRIAL",usuario:"EQUISPE"},
                    // {correlativo:"007-0019591",razon_social:"YURA S.A.",ruc:"20346787349",destino:"AREQUIPA",materiales:"RETEN, TRAPO INDUSTRIAL",usuario:"EQUISPE"},
                    // {correlativo:"007-0019590",razon_social:"CAL Y CEMENTO SUR S.A.",ruc:"20346787349",destino:"AREQUIPA",materiales:"RETEN, TRAPO INDUSTRIAL",usuario:"ACALSIN"},
                    // {correlativo:"007-0019589",razon_social:"RACIONALIZACION EMPRESARIAL S.A.",ruc:"20346787349",destino:"AREQUIPA",materiales:"RETEN, TRAPO INDUSTRIAL",usuario:"EFLORES"},
                    // {correlativo:"007-0019588",razon_social:"CAL Y CEMENTO SUR S.A.",ruc:"20346787349",destino:"AREQUIPA",materiales:"RETEN, TRAPO INDUSTRIAL",usuario:"ACALSIN"},
                    // {correlativo:"007-0019587",razon_social:"YURA S.A.",ruc:"20346787349",destino:"AREQUIPA",materiales:"RETEN, TRAPO INDUSTRIAL",usuario:"EFLORES"},
                    ],
        prueba_guias:[],
        listado_checklist:[],
        validate_guia_anular:null,
        validate_form_filtro:null,
        filtro_guias:{
            desde:'2022-01-01',
            hasta:'2022-05-16',
            usuario_area:'',
            usuario_cargo:'',
            usuario_id:''
        },
        
    }),
    mounted(){
            this.filtro_guias.desde = moment().subtract(1, 'months').format('YYYY-MM-DD')
            this.filtro_guias.hasta = moment().format('YYYY-MM-DD')

            this.filtro_guias.usuario_area = this.usuario.usuario_area
            this.filtro_guias.usuario_cargo = this.usuario.usuario_cargo
            this.filtro_guias.usuario_id = this.usuario.usuario_id
            this.get_checklist()
    },
    computed:{
        ...mapState(['usuario','config_categoria','dialogo_loader','alerta_snack','guia_actual','editar','host','areas','checklist_seleccionado'])
    },
    methods:{
        ...mapMutations(['cambiar_dialogo_loader','cambiar_config_categoria','cambiar_alerta','valores_guia_actual','cambiar_editar','cambiar_checklist_seleccionado']),
        filtrar(){
            this.dialog_filtro_guias = true
            // console.log('filtrar')
        },
        guardar_km_final(){
            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/guardar_km_final',{checklist_id:this.km_final.checklist_id,kilom_final:this.km_final.checklist_km_final}).then(response => {
                console.log(response.data)
                if(response.data.affected == 1 && response.data.status == true){
                    this.cambiar_alerta({estado:true,color:'teal darken-2',texto:'Guardado Km Final correctamente...!'})
                    this.dialog_km_final = false
                    this.get_checklist()
                }else{
                    this.cambiar_alerta({estado:true,color:'red darken-2',texto:'No se pudo guardar el KM Final...!'})
                }
                
                this.cambiar_dialogo_loader()
            })
        },
        exportar_excel(){
            // console.log('exportar excel')
            // this.cambiar_dialogo_loader()
            // this.filtro_guias.api_token = this.usuario.api_token
            // this.filtro_guias.usuario_id = this.usuario.usuario_id
            // console.log(this.filtro_guias)
            // axios.post(this.host+'api/export_get_checklist',this.filtro_guias).then(response =>{
            //     // this.prueba_guias = eval(response.data)
            //     console.log(response)
            //     this.cambiar_dialogo_loader()
            //     this.dialog_filtro_guias?this.dialog_filtro_guias=false : this.dialog_filtro_guias
            // }).catch((error)=>{
            //     console.log(error)
            //     this.cambiar_dialogo_loader()
            //     this.cambiar_alerta({estado:true,color:'red darken-2',texto:'Sin Respuesta del servidor...!'})
            // })
        },
        get_checklist(){
            this.filtro_guias.api_token = this.usuario.api_token
            this.cambiar_dialogo_loader()
            this.dialog_detalle_checklist=false
            axios.post(this.host+'api/get_checklist',this.filtro_guias).then(response =>{
                this.listado_checklist = eval(response.data)
                console.log(this.listado_checklist)
                this.cambiar_dialogo_loader()
                this.dialog_filtro_guias?this.dialog_filtro_guias=false : this.dialog_filtro_guias
            }).catch((error)=>{
                console.log(error)
                this.cambiar_dialogo_loader()
                this.cambiar_alerta({estado:true,color:'red darken-2',texto:'Sin Respuesta ó sin conexion...!'})
            })
        },
        // guardar_anular_guia(){
        //     this.cambiar_dialogo_loader()
        //     axios.post(this.host+'api/anular_guia',this.anulacion).then(response =>{
        //         console.log(response)
        //         this.cambiar_dialogo_loader()
        //         this.cambiar_alerta({estado:true,color:'teal',texto:'Anulado correctamente...!'})
        //         this.get_guias()
        //     }).catch((error)=>{
        //         console.log(error)
        //         this.cambiar_dialogo_loader()
        //         this.cambiar_alerta({estado:true,color:'red darken-2',texto:'Sin Respuesta del servidor...!'})
        //     })
        // },
        // anular_guia(item){
        //     this.anulacion.correlativo = item.venta_correlativo
        //     this.dialog_anular_guia = true
        // },
        get_configuracion(){
            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/get_config_categoria_id',{categoria_id: this.checklist_seleccionado.cabecera.equipo_id}).then(response =>{
              console.log(response.data)
              this.cambiar_config_categoria(response.data)
              this.cambiar_dialogo_loader()
            }).catch((error)=>{
              console.log('error servidor')
              console.log(error)
              this.cambiar_dialogo_loader() 
              this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Sin Respuesta ó sin conexion...!!'})
            })
        },
        ver_km_final(item){
            this.km_final.checklist_id=item.checklist_id
            this.km_final.checklist_equipo=item.equipo_descripcion
            this.km_final.checklist_km_inicial=item.checklist_kilom_inicial
            this.km_final.checklist_km_final=item.checklist_kilom_final
            this.dialog_km_final = true
            if(item.checklist_kilom_final){
                this.estado_km_final = true
            }else{
                this.estado_km_final = false
            }
            // this.cambiar_dialogo_loader()
            // console.log(item)
            
        },
        ver_checklist(item){
            // alert(item)
            let data_consulta = ''
            if(item){
                data_consulta = {checklist_id:item.checklist_id}
            }else{
                data_consulta = {checklist_id:this.buscar_checklist_id}
            }

            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/get_checklist_id',data_consulta).then(response =>{
                
                console.log(response.data)
                var respuesta = response.data[0]
                
                        
                        // console.log(this.config_categoria)
                        var elementox = {
                            cabecera:{
                                checklist_id:respuesta.checklist_id,
                                equipo_id:respuesta.checklist_equipo,
                                fecha: respuesta.checklist_fecha_hora,
                                equipo_placa: respuesta.equipo_placa,
                                equipo_descripcion:respuesta.equipo_descripcion,
                                equipo_modelo:respuesta.equipo_modelo,
                                equipo_serie:respuesta.equipo_serie,
                                equipo_año:respuesta.equipo_año,
                                equipo_kminicial:respuesta.checklist_kilom_inicial,
                                equipo_kmfinal:respuesta.checklist_kilom_final,
                                equipo_tipo:respuesta.equipo_tipo,
                                equipo_categoria_id:respuesta.equipo_categoria_id,
                                turno:respuesta.checklist_turno,
                                operador:respuesta.usuario_detalle_nombre,
                                usuario_id:respuesta.checklis_usuario_id,
                                checklist_autorizado: respuesta.checklist_autorizado=='1' ?true:false,
                                checklist_usuario_id_autoriza:respuesta.checklist_usuario_id_autoriza
                            },
                            cuerpo:[
                            {"elemento_id":"1","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"CABINA DEL EQUIPO ","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"PANEL DE CONTROL ","valor":respuesta.check_1,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"2","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"CABINA DEL EQUIPO ","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"LUCES INTERIOR EXTERIOR","valor":respuesta.check_2,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"3","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"CABINA DEL EQUIPO ","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"PEDALES FRENO /ACELERADOR /EMBRAGUE","valor":respuesta.check_3,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"4","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"CABINA DEL EQUIPO ","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"CINTURONES /ESPEJOS /PLUMULLAS","valor":respuesta.check_4,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"5","elemento_parte":"2","elemento_subparte":"5","elemento_tipo":"CABINA DEL EQUIPO ","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"CLAXON /CIRCULINA","valor":respuesta.check_5,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"6","elemento_parte":"2","elemento_subparte":"6","elemento_tipo":"CABINA DEL EQUIPO ","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_6,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"7","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"LLANTAS Y AROS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"LLANTAS PRINCIPALES","valor":respuesta.check_7,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"8","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"LLANTAS Y AROS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"LLANTAS DE REPUESTO","valor":respuesta.check_8,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"9","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"LLANTAS Y AROS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"ARO /ESPARRAGOS /TUERCAS","valor":respuesta.check_9,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"10","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"LLANTAS Y AROS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_10,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"11","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"NIVELES DE FLUIDOS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"NIVELES DE ACEITES /FLUIDOS","valor":respuesta.check_11,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"12","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"NIVELES DE FLUIDOS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"LIQUIDO /ACEITE DE FRENO","valor":respuesta.check_12,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"13","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"NIVELES DE FLUIDOS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"NIVEL DE COMBUSTIBLE","valor":respuesta.check_13,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"14","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"NIVELES DE FLUIDOS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"COMPONENTES SISTEMA ELECTRICO","valor":respuesta.check_14,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"15","elemento_parte":"2","elemento_subparte":"5","elemento_tipo":"NIVELES DE FLUIDOS","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_15,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"16","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"MOTOR","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"COMPONENTES DEL MOTOR","valor":respuesta.check_16,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"17","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"MOTOR","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"COMPONENTES DE REFRIGERACION","valor":respuesta.check_17,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"18","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"MOTOR","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"COMPONENTES SISTEMA COBUSTIBLE","valor":respuesta.check_18,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"19","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"MOTOR","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_19,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"20","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"IMPLEMENTOS DE SEGURIDAD","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"EQUIPAMIENTO DE SEGURIDAD","valor":respuesta.check_20,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"21","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"IMPLEMENTOS DE SEGURIDAD","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"BOTIQUIN DE EMERGENCIA","valor":respuesta.check_21,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"22","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"IMPLEMENTOS DE SEGURIDAD","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"GATA /LLAVE DE RUEDAS","valor":respuesta.check_22,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"23","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"IMPLEMENTOS DE SEGURIDAD","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_23,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"24","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"CAMIÓN GRUA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"ESTRUCTURA PRINCIPAL DE GRUA","valor":respuesta.check_24,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"25","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"CAMIÓN GRUA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"SISTEMA HIDRAULICO","valor":respuesta.check_25,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"26","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"CAMIÓN GRUA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"MANDOS DE CONTROL","valor":respuesta.check_26,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"27","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"CAMIÓN GRUA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_27,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"28","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"CAMIÓN CISTERNA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"TANQUE PRINCIPAL","valor":respuesta.check_28,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"29","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"CAMIÓN CISTERNA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"SISTEMA DE RIEGO /CARGA","valor":respuesta.check_29,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"30","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"CAMIÓN CISTERNA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"SISTEMA NEUMATICO","valor":respuesta.check_30,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"31","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"CAMIÓN CISTERNA","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_31,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"32","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"CAMIÓN FURGON","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"ESTRUCTURA DEL FURGON","valor":respuesta.check_32,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"33","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"CAMIÓN FURGON","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"PROTECTOR INTERIOR FURGON","valor":respuesta.check_33,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"34","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"CAMIÓN FURGON","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"COMPUERTAS LATERAL /POSTERIOR","valor":respuesta.check_34,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"35","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"CAMIÓN FURGON","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_35,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"36","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"MONTACARGAS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"ESTRUCTURA DEL MASTIL","valor":respuesta.check_36,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"37","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"MONTACARGAS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"SISTEMA HIDRAULICO","valor":respuesta.check_37,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"38","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"MONTACARGAS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"PROTECTOR DEL OPERADOR","valor":respuesta.check_38,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"39","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"MONTACARGAS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_39,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"40","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"OMNIBUS /MINIBUS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"ESTRUCTURA PRINCIPAL /CARROCERIA","valor":respuesta.check_40,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"41","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"OMNIBUS /MINIBUS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"ASIENTOS /CINTURONES /PASAMANOS","valor":respuesta.check_41,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"42","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"OMNIBUS /MINIBUS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"MUELLES /FRENOS","valor":respuesta.check_42,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"43","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"OMNIBUS /MINIBUS","elemento_tipo_equipo":"SEMIPESADO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_43,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"44","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"CARGADOR FRONTAL","elemento_tipo_equipo":"PESADO","elemento_descripcion":"ESTRUCTURA PRINCIPAL","valor":respuesta.check_44,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"45","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"CARGADOR FRONTAL","elemento_tipo_equipo":"PESADO","elemento_descripcion":"IMPLEMENTOS /CUCHARA","valor":respuesta.check_45,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"46","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"CARGADOR FRONTAL","elemento_tipo_equipo":"PESADO","elemento_descripcion":"SEGMENTOS /PUNTAS /PERNOS /TUERCAS","valor":respuesta.check_46,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"47","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"CARGADOR FRONTAL","elemento_tipo_equipo":"PESADO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_47,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"48","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"TRACTOR SOBRE ORUGA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"ESTRUCTURA PRINCIPAL","valor":respuesta.check_48,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"49","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"TRACTOR SOBRE ORUGA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"BRAZOS DE EMPUJE /HOJA TOPADORA","valor":respuesta.check_49,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"50","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"TRACTOR SOBRE ORUGA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"CUCHILLAS /CANTONERAS /PERNOS /TUERCAS","valor":respuesta.check_50,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"51","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"TRACTOR SOBRE ORUGA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_51,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"52","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"EXCAVADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"ESTRUCTURA PRINCIPAL","valor":respuesta.check_52,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"53","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"EXCAVADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"IMPLEMENTOS /CUCHARA","valor":respuesta.check_53,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"54","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"EXCAVADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"SEGMENTOS /PROTECTORES /PERNOS /TUERCAS","valor":respuesta.check_54,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"55","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"EXCAVADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_55,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"56","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"MOTONIVELADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"ESTRUCTURA PRINCIPAL","valor":respuesta.check_56,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"57","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"MOTONIVELADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"IMPLEMENTOS /HOJA TOPADORA","valor":respuesta.check_57,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"58","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"MOTONIVELADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"SEGMENTOS /PROTECTORES /PERNOS /TUERCAS","valor":respuesta.check_58,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"59","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"MOTONIVELADORA","elemento_tipo_equipo":"PESADO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_59,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"60","elemento_parte":"2","elemento_subparte":"1","elemento_tipo":"ACTIVIDAD A REALIZARSE ADICIONALMENTE.","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"LAVADO INTEGRAL","valor":respuesta.check_60,"opciones":['SI','NO']},
                            {"elemento_id":"61","elemento_parte":"2","elemento_subparte":"2","elemento_tipo":"ACTIVIDAD A REALIZARSE ADICIONALMENTE.","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"ENGRASE","valor":respuesta.check_61,"opciones":['SI','NO']},
                            {"elemento_id":"62","elemento_parte":"2","elemento_subparte":"3","elemento_tipo":"ACTIVIDAD A REALIZARSE ADICIONALMENTE.","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"LIMPIEZA DE FILTROS DE AIRE","valor":respuesta.check_62,"opciones":['SI','NO']},
                            {"elemento_id":"63","elemento_parte":"2","elemento_subparte":"4","elemento_tipo":"ACTIVIDAD A REALIZARSE ADICIONALMENTE.","elemento_tipo_equipo":"TODO EQUIPO","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_63,"opciones":['SI','NO']},
                            
                            {"elemento_id":"64","elemento_parte":"16","elemento_subparte":"1","elemento_tipo":"SISTEMA DE CONTROL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"DISPLAY IC","valor":respuesta.check_64,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"65","elemento_parte":"16","elemento_subparte":"2","elemento_tipo":"SISTEMA DE CONTROL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"PERILLAS DE ARRANQUE Y CONTROL","valor":respuesta.check_65,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"66","elemento_parte":"16","elemento_subparte":"3","elemento_tipo":"SISTEMA DE CONTROL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"CONTROL DE REGULACION ALIMENTADOR","valor":respuesta.check_66,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"67","elemento_parte":"16","elemento_subparte":"4","elemento_tipo":"SISTEMA DE CONTROL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"MANDO ALAMBRICO","valor":respuesta.check_67,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"68","elemento_parte":"16","elemento_subparte":"5","elemento_tipo":"SISTEMA DE CONTROL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_68,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"69","elemento_parte":"17","elemento_subparte":"1","elemento_tipo":"MOTOR DE COMBUSTION","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"COMPONENTES DEL MOTOR","valor":respuesta.check_69,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"70","elemento_parte":"17","elemento_subparte":"2","elemento_tipo":"MOTOR DE COMBUSTION","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"COMPONENTES DE REFRIGERACION","valor":respuesta.check_70,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"71","elemento_parte":"17","elemento_subparte":"3","elemento_tipo":"MOTOR DE COMBUSTION","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"COMPONENTES SISTEMA COMBUSTIBLE","valor":respuesta.check_71,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"72","elemento_parte":"17","elemento_subparte":"4","elemento_tipo":"MOTOR DE COMBUSTION","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"COMPONENTES SISTEMA LUBRICACION","valor":respuesta.check_72,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"73","elemento_parte":"17","elemento_subparte":"5","elemento_tipo":"MOTOR DE COMBUSTION","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_73,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"74","elemento_parte":"18","elemento_subparte":"1","elemento_tipo":"NIVELES DE FLUDOS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"NIVEL ACEITE DE MOTOR","valor":respuesta.check_74,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"75","elemento_parte":"18","elemento_subparte":"2","elemento_tipo":"NIVELES DE FLUDOS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"NIVEL REFRIGERANTE","valor":respuesta.check_75,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"76","elemento_parte":"18","elemento_subparte":"3","elemento_tipo":"NIVELES DE FLUDOS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"NIVEL CAJA REDUCTOR ALIMENTADOR","valor":respuesta.check_76,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"77","elemento_parte":"18","elemento_subparte":"4","elemento_tipo":"NIVELES DE FLUDOS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"NIVEL ACEITE HIDRAULICO","valor":respuesta.check_77,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"78","elemento_parte":"18","elemento_subparte":"5","elemento_tipo":"NIVELES DE FLUDOS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_78,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"79","elemento_parte":"19","elemento_subparte":"1","elemento_tipo":"SISTEMA HIDRAULICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BOMBAS, MOTORES Y LINEAS HIDRAULICAS","valor":respuesta.check_79,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"80","elemento_parte":"19","elemento_subparte":"2","elemento_tipo":"SISTEMA HIDRAULICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"VALVULAS Y SOLENOIDES","valor":respuesta.check_80,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"81","elemento_parte":"19","elemento_subparte":"3","elemento_tipo":"SISTEMA HIDRAULICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BLOQUE DE VALVULAS","valor":respuesta.check_81,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"82","elemento_parte":"19","elemento_subparte":"4","elemento_tipo":"SISTEMA HIDRAULICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"CILINDROS HIDRAULICOS","valor":respuesta.check_82,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"83","elemento_parte":"19","elemento_subparte":"5","elemento_tipo":"SISTEMA HIDRAULICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_83,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"84","elemento_parte":"20","elemento_subparte":"1","elemento_tipo":"SISTEMA DE ELECTRICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"ARRANCADOR, ALTERNADOR, POLEAS Y CORREAS","valor":respuesta.check_84,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"85","elemento_parte":"20","elemento_subparte":"2","elemento_tipo":"SISTEMA DE ELECTRICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"HARNES, SENSORES, FUSIBLES ELECTRICOS","valor":respuesta.check_85,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"86","elemento_parte":"20","elemento_subparte":"3","elemento_tipo":"SISTEMA DE ELECTRICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"CABLE INTER LOOCK, LUNINARIAS","valor":respuesta.check_86,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"87","elemento_parte":"20","elemento_subparte":"4","elemento_tipo":"SISTEMA DE ELECTRICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BATERIAS, TERMINALES, CONECTORES","valor":respuesta.check_87,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"88","elemento_parte":"20","elemento_subparte":"5","elemento_tipo":"SISTEMA DE ELECTRICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_88,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"89","elemento_parte":"21","elemento_subparte":"1","elemento_tipo":"ALIMENTADOR TRITURADORA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"ALIMENTADOR, PARRILLAS Y MALLA FINOS","valor":respuesta.check_89,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"90","elemento_parte":"21","elemento_subparte":"2","elemento_tipo":"ALIMENTADOR TRITURADORA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"QUIJADAS, PLACAS, PERNOS Y TUERCAS","valor":respuesta.check_90,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"91","elemento_parte":"21","elemento_subparte":"3","elemento_tipo":"ALIMENTADOR TRITURADORA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BRAZO PITMAN","valor":respuesta.check_91,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"92","elemento_parte":"21","elemento_subparte":"4","elemento_tipo":"ALIMENTADOR TRITURADORA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"ACCIONAMIENTO, CORREAS Y POLEAS","valor":respuesta.check_92,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"93","elemento_parte":"21","elemento_subparte":"5","elemento_tipo":"ALIMENTADOR TRITURADORA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_93,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"94","elemento_parte":"22","elemento_subparte":"1","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA T.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BANDA DE FINOS","valor":respuesta.check_94,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"95","elemento_parte":"22","elemento_subparte":"2","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA T.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BANDA DE DESCARGA A ZARANDA","valor":respuesta.check_95,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"96","elemento_parte":"22","elemento_subparte":"3","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA T.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"POLINES DE CARGA Y DESCARGA","valor":respuesta.check_96,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"97","elemento_parte":"22","elemento_subparte":"4","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA T.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"SOPORTES Y CHUMACERAS","valor":respuesta.check_97,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"98","elemento_parte":"22","elemento_subparte":"5","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA T.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_98,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"99","elemento_parte":"23","elemento_subparte":"1","elemento_tipo":"CRIBA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"CONJUNTO DE VIBRACION","valor":respuesta.check_99,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"100","elemento_parte":"23","elemento_subparte":"2","elemento_tipo":"CRIBA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"MALLAS PRIMER, SEGUNDO, TERCER NIVEL","valor":respuesta.check_100,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"101","elemento_parte":"23","elemento_subparte":"3","elemento_tipo":"CRIBA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"SOPORTES, GOMAS, SUJETADORES","valor":respuesta.check_101,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"102","elemento_parte":"23","elemento_subparte":"4","elemento_tipo":"CRIBA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"AMORTIGUADORES CAJA VIBRANTE","valor":respuesta.check_102,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"103","elemento_parte":"23","elemento_subparte":"5","elemento_tipo":"CRIBA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_103,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"104","elemento_parte":"24","elemento_subparte":"1","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA Z.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BANDA DE RECEPCION Y ELEVACION","valor":respuesta.check_104,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"105","elemento_parte":"24","elemento_subparte":"2","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA Z.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BANDAS A, B, C Y D","valor":respuesta.check_105,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"106","elemento_parte":"24","elemento_subparte":"3","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA Z.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"POLINES DE CARGA Y DESCARGA","valor":respuesta.check_106,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"107","elemento_parte":"24","elemento_subparte":"4","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA Z.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"SOPORTES Y CHUMACERAS","valor":respuesta.check_107,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"108","elemento_parte":"24","elemento_subparte":"5","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA Z.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_108,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"109","elemento_parte":"25","elemento_subparte":"1","elemento_tipo":"ESTRUTURA PRINCIPAL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"CHASIS Y BASTIDOR PRINCIPAL","valor":respuesta.check_109,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"110","elemento_parte":"25","elemento_subparte":"2","elemento_tipo":"ESTRUTURA PRINCIPAL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"TOLVA, PROTECTORES, COBERTURAS","valor":respuesta.check_110,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"111","elemento_parte":"25","elemento_subparte":"3","elemento_tipo":"ESTRUTURA PRINCIPAL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"POLINES DE CARGA Y DESCARGA","valor":respuesta.check_111,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"112","elemento_parte":"25","elemento_subparte":"4","elemento_tipo":"ESTRUTURA PRINCIPAL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"SOPORTES Y CHUMACERAS","valor":respuesta.check_112,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"113","elemento_parte":"25","elemento_subparte":"5","elemento_tipo":"ESTRUTURA PRINCIPAL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_113,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"114","elemento_parte":"26","elemento_subparte":"1","elemento_tipo":"EQUIPOS DE SEGURIDAD","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"PARADAS DE EMERGENCIA","valor":respuesta.check_114,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"115","elemento_parte":"26","elemento_subparte":"2","elemento_tipo":"EQUIPOS DE SEGURIDAD","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"SISTEMA DE BLOQUEO","valor":respuesta.check_115,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"116","elemento_parte":"26","elemento_subparte":"3","elemento_tipo":"EQUIPOS DE SEGURIDAD","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"EXTINTOR, BOTIQUIN","valor":respuesta.check_116,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"117","elemento_parte":"26","elemento_subparte":"4","elemento_tipo":"EQUIPOS DE SEGURIDAD","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"LINEAS DE VIDA, BARANDAS","valor":respuesta.check_117,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"118","elemento_parte":"26","elemento_subparte":"5","elemento_tipo":"EQUIPOS DE SEGURIDAD","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_118,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"119","elemento_parte":"27","elemento_subparte":"1","elemento_tipo":"OTROS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"AUMENTO DE ACEITE","valor":respuesta.check_119,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"120","elemento_parte":"27","elemento_subparte":"2","elemento_tipo":"OTROS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"AUMENTO DE REFRIGERANTEREFRIGERANTE","valor":respuesta.check_120,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"121","elemento_parte":"27","elemento_subparte":"3","elemento_tipo":"OTROS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"SUMINISTRO COMBUSTIBLE","valor":respuesta.check_121,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"122","elemento_parte":"27","elemento_subparte":"4","elemento_tipo":"OTROS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"LUBRICACION PITMAN Y CHUMACERAS","valor":respuesta.check_122,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"123","elemento_parte":"27","elemento_subparte":"5","elemento_tipo":"OTROS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"LIMPIEZA INTEGRAL DE EQUIPO","valor":respuesta.check_123,"opciones":['OK','ME','F','NA']},
                            {"elemento_id":"124","elemento_parte":"27","elemento_subparte":"6","elemento_tipo":"OTROS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"OBSERVACIONES","valor":respuesta.check_124,"opciones":['OK','ME','F','NA']}

                            ]
                        }
                        // console.log(respuesta."check_"+1)
                        this.cambiar_checklist_seleccionado(elementox)
                    
                    this.dialog_detalle_checklist= true
                    console.log(this.config_categoria)
               
                
                
                this.cambiar_dialogo_loader()
            })
            .then(()=>{
                this.get_configuracion()
            })
            .catch((error)=>{
                console.log('error servidor')
                console.log(error)
                this.cambiar_dialogo_loader()
                this.cambiar_alerta({estado:true,color:'red darken-3',texto:'Sin Respuesta ó sin conexion...!'})
            })
        },
        // tomar_guia(item){
        //     this.cambiar_dialogo_loader()
        //     axios.post(this.host+'api/get_guias_id',{id:item.venta_id}).then(response =>{
        //         this.valores_guia_actual(response.data)
        //         console.log(response.data)
        //         this.cambiar_dialogo_loader()
        //         this.cambiar_editar(true)
        //         // alert("Detalles de "+item.venta_correlativo)
        //         this.$router.push({name:"guias_form"})
        //     }).catch((error)=>{
        //         console.log(error)
        //     })
        // },
        nuevo_checklist(){
            
            this.$router.push({name:"inicio"})
        },
        
    }

}
</script>
