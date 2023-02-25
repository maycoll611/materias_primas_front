<template>
    <v-row class="py-2 mx-0">
        <!-- {{usuario}} -->
        <v-col class="pa-1" cols="6">
            <v-btn color="green darken-1" @click="nueva_compra()" class="rounded-pill" small><v-icon size="20">mdi-plus</v-icon> Nuevo</v-btn>
        </v-col>
        <v-col cols="6" sm=2 md="2" lg="2"  class="pa-1" align=right>

        </v-col>
        <v-col class="px-1" cols="12">
<!-- DATATABLES ************************** -->
            <v-row class="ma-0">
                <v-col cols="12" sm="6" md="2" lg="2" class="pa-1">
                    <v-menu
                    v-model="menu_filtro_mes"
                    :close-on-content-click="false"
                    offset-y
                    bottom
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field class="rounded-pill" outlined dense hide-details v-bind="attrs" v-on="on" v-model="filtro_fecha" label="Fechas"></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="filtro_fecha"
                        range
                        no-title
                        locale="ES-es"
                        width="auto"
                        >
                            <v-spacer></v-spacer>
                            <v-btn dense text color="red" @click="menu_filtro_mes = !menu_filtro_mes">cancelar</v-btn>
                            <v-btn dense text color="blue" @click="ejecutar()">OK</v-btn>
                        </v-date-picker>
                        
                    </v-menu>
                </v-col>
                <v-col cols="12" class="pa-1" md="6" lg="6">
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        outlined
                        dense
                        hide-details
                        class="rounded-pill"
                    ></v-text-field>
                </v-col>
                
            </v-row>
            <v-data-table
            dense
            :items="filtrado"
            :headers="header"
            mobile-breakpoint
            class="my-2 elevation-4 caption"
            >
            <template #[`item.actions`]="item">
                <v-menu
                origin="center center"
                transition="scale-transition"
                >
                <template v-slot:activator="{ on, attrs }" class="pa-0">
                    <v-avatar
                        v-bind="attrs"
                        v-on="on" 
                        color="grey"
                        class="elevation-6"
                        size="28">
                        <v-icon small
                        >
                        mdi-folder-search
                        </v-icon>
                    </v-avatar>
                </template>

                <v-list class="pa-1">
                    <v-list-item class="pa-1 py-0">
                        <v-btn class="rounded-pill" text color="teal" @click="detalle_compra(item.item.compra_id)" dense> <v-icon class="pr-1">mdi-television-guide </v-icon> Detalle</v-btn>
                    </v-list-item>
                    <v-list-item class="pa-1 py-0">
                        <v-btn class="rounded-pill" text color="warning"  @click="editar_compra(item.item.compra_id)" dense> <v-icon class="pr-1">mdi-monitor-edit </v-icon> Editar</v-btn>
                    </v-list-item>
                    <v-list-item class="pa-1 py-0">
                        <v-btn class="rounded-pill" text color="red"  @click="eliminar_personal(item.item.compra_id)" dense> <v-icon class="pr-1">mdi-delete-circle-outline </v-icon> Eliminar</v-btn>
                    </v-list-item>
                </v-list>
                </v-menu>
            </template>
            <!-- <template #expanded-item="{headers,item}">
                <td :colspan="headers.length">
                    <v-col align="center">
                        {{item}}
                    </v-col>
                </td>
            </template> -->
            </v-data-table>
            <v-row class="ma-0">
                <v-col cols="12" class="pa-0" md="6" lg="6">
                    
                </v-col>
                <v-col cols="12" md="6" lg="6" class="pa-auto rounded elevation-1" align="right">
                    <span class="font-weight-black">Total S/.{{ total_total_compras}}</span> 
                </v-col>
            </v-row>
<!--DIALOGOS****************************************************************************************** -->
            <!-- dialogo para cre y editar compras y detalles de compras -->
            <v-dialog
            v-model="dialog"
            fullscreen
            width="500"
            origin="top center 0"
            >
            <v-card>
                
                <v-card-title class="px-2 py-1" color="primary">
                        <v-btn
                            icon
                            @click="show_formulario_compra = !show_formulario_compra"
                        >
                            <v-icon>{{ show_formulario_compra ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                        <v-divider vertical></v-divider>  
                        <span class="overline px-1">Compra N°: {{compra_actual.compra_codigo}}</span> 
                        <v-divider vertical></v-divider>   
    
                        <span class="caption px-1"> F: {{compra_actual.compra_fecha}}</span>
                        <v-spacer></v-spacer>
                        <v-btn x-small @click="dialog = !dialog" color="red lighten-3" fab  ><v-icon>mdi-close</v-icon> </v-btn>
                        
                </v-card-title>
                <v-card-text class="px-1 pt-0">
                    <v-divider></v-divider> 
                     <v-expand-transition>
                        <div v-show="show_formulario_compra">   
                            <v-card-text class="py-1 px-1">
                                <v-row class="ma-0">
                                            <v-col cols="6" class="px-1">
                                                <v-text-field hide-details outlined dense required color="teal" v-model="compra_actual.compra_descripcion" label="Descripcion"></v-text-field>
                                            </v-col>
                                            <v-col cols="6" class="px-1">
                                                <v-menu
                                                    ref="menu_fecha"
                                                    v-model="menu_fecha"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        v-model="compra_actual.compra_fecha"
                                                        label="Fecha"
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                    v-model="compra_actual.compra_fecha"
                                                    no-title
                                                    full-width
                                                    scrollable
                                                    >
                                                    <v-spacer></v-spacer>
                                                    <v-btn
                                                        text
                                                        color="primary"
                                                        @click="menu_fecha = false"
                                                    >
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn
                                                        text
                                                        color="primary"
                                                        @click="$refs.menu_fecha.save(compra_actual.compra_fecha)"
                                                    >
                                                        OK
                                                    </v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-col cols="6" class="px-1">
                                                <v-select hide-details v-model="compra_actual.compra_sucursal" :items="opciones_sucursal" outlined dense label="sucursal" ></v-select>                            
                                            </v-col>
                                            <v-col cols="6" class="px-1">
                                                <v-text-field hide-details outlined dense required color="teal" v-model="compra_actual.compra_empresa_nombre" label="Proveedor"></v-text-field>
                                            </v-col>
                                        </v-row>
                            </v-card-text>
                        </div>
                        </v-expand-transition>
                    
                    <v-row class="ma-0">
                        <v-btn class="rounded-pill" dense color="teal darken-1" @click="nuevo_detalle_compra" ><v-icon>mdi-plus</v-icon> Agregar</v-btn>
                    </v-row>
                    <v-row class="ma-0">
                        <v-col cols="1" class="pa-0 font-weight-black" align="right">ct</v-col>
                        <v-col cols="8" class="pa-0 font-weight-black" align="center">Descripcion</v-col>
                        <v-col cols="3" class="pa-0 font-weight-black">S.total.</v-col>
                    </v-row>
                    <v-row class="ma-0" v-for="(item ,i) of compra_detalles" :key="i">
                        <v-col cols="1" class="pa-0" align="right">{{item.dtcompra_cantidad }}</v-col>
                        <v-col cols="8" class="pa-0 font-italic caption">{{ item.dtcompra_um+'~'+item.dtcompra_descripcion +'('+ item.dtcompra_precio_unit+')'}}</v-col>
                        <v-col cols="3" class="pa-0" align="right">{{item.dtcompra_total.toFixed(2)}}</v-col>
                    </v-row>
                    <v-row class="ma-0 font-weight-black">
                        <v-col cols="4" class="pa-0" >
                            
                        </v-col>
                        <v-col cols="4" class="pa-0 " align="right">
                            <span class="">
                                Total:
                            </span>
                        </v-col>
                        <v-col cols="4" class="pa-0" align="right">S/. {{total_compra}}</v-col>
                    </v-row>
                    <v-row class="ma-0">
                        <v-col cols="4" class="pa-0">
                            <v-switch
                                class="ma-0 pa-0"
                                v-model="igv"
                                inset
                                dense
                                hide-details
                                @change="verificar_igv"
                            ></v-switch>
                        </v-col>
                        <v-col cols="4" align="right" class="pa-0">
                            Igv
                        </v-col>
                        <v-col  cols="4" align="right" class="pa-0">
                            {{calcular_igv}}
                        </v-col>    
                    </v-row>
                    <v-row class="ma-0 font-weight-black">
                        <v-col cols="8" class="pa-0">

                        </v-col>
                        <v-col class="pa-0"  align="right" cols="4">
                            S/. {{ total_con_igv}}
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        text
                        @click="dialog = false"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="guardar_compra"
                    >
                        Guardar
                    </v-btn>
                </v-card-actions>
                <!-- <span class="caption">{{compra_detalles}}</span> -->
            </v-card>
            </v-dialog>
            <!-- dialogo para detalle de compras  -->
            <v-dialog
                v-model="dialogo_detalle_compras"
            >
                <v-card>
                    <v-card-title class="overline pa-3 py-1">
                    <v-tabs
                        v-model="tabs"
                        fixed-tabs
                        >
                        <v-tabs-slider></v-tabs-slider>
                        <v-tab
                            href="#tab-1"
                            class="primary--text"
                        >
                            <v-icon>mdi-playlist-edit</v-icon>
                        </v-tab>

                        <v-tab
                            href="#tab-2"
                            class="primary--text"
                        >
                            <v-icon>mdi-heart</v-icon>
                        </v-tab>

                        <v-tab
                            href="#tab-3"
                            class="primary--text"
                        >
                            <v-icon>mdi-account-box</v-icon>
                        </v-tab>
                    </v-tabs>
                    </v-card-title>
                    <v-card-text class="pa-1">
                        <v-tabs-items v-model="tabs">
                            <v-tab-item value="tab-2">
                                <v-row class="ma-0">
                                    <v-col align="center" class="pa-0">
                                        
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card-text>
                    <v-card-actions class="px-1">
                        <v-col align="right" class="pa-1">
                            <v-btn text color="red lighten" @click="dialogo_detalle_compras=false"> Cancelar</v-btn>
                            <v-btn text color="teal lighten" @click=" dialogo_detalle_compras=false ">Guardar</v-btn>
                        </v-col>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- dialogo para formulario de detalle de compras -->
            <v-dialog v-model="dialogo_formulario" max-width="400">
                <v-card>
                    <v-card-title class="px-2 py-1" color="primary">
                        Nuevo detalle
                    </v-card-title>
                    <v-card-text class="px-1 py-2">
                        <v-row class="ma-0 rounded" outlined elevation="5">
                            <v-card outlined elevation="4">
                                <v-form class="pa-0 ma-0" @submit.prevent="agregar" >
                                    <v-row class="ma-0">
                                         
                                        <v-col cols="12" class="pa-1">
                                            <v-text-field hide-details validate-on-blur outlined dense required color="teal" v-model="formulario.dtcompra_descripcion" label="Descripcion"></v-text-field>
                                        </v-col>
                                        
                                        <v-col cols="4" class="pa-1">
                                            <v-text-field hide-details outlined dense required color="teal" type="number" @keyup="subtotal()" v-model="formulario.dtcompra_cantidad" label="Cant"></v-text-field>
                                        </v-col>
                                        <v-col cols="4" class="pa-1">
                                            <v-text-field hide-details outlined dense color="teal" type="number" required @keyup="subtotal()" v-model="formulario.dtcompra_precio_unit" label="P.Unit"></v-text-field>
                                        </v-col> 
                                        <v-col cols="4" class="pa-1">
                                            <v-text-field hide-details outlined dense color="teal" type="number"  v-model="formulario.dtcompra_total" label="S.total"></v-text-field>
                                        </v-col>
                                        <v-col cols="5" class="pa-1">
                                            <v-select class="caption" hide-details v-model="formulario.dtcompra_um" :items="opciones_um" outlined dense label="UM" ></v-select>
                                        </v-col> 
                                        <v-col cols="7" class="pa-1">
                                            <v-text-field hide-details outlined dense color="teal" v-model="formulario.dtcompra_observacion" label="Observacion"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row class="ma-0">
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="primary"
                                            text
                                            type="submit"
                                        >
                                            Guardar
                                        </v-btn>
                                    </v-row>
                                </v-form>
                            </v-card>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import {mapState } from 'vuex'
import {mapMutations} from 'vuex' 
export default {
    data:()=>({
        //busqueda en datatables
        search:"",
        filtro_fecha: [],
        menu_filtro_mes:false,
        show_formulario_compra:false,
        menu_fecha:false,
        // datos de formulario
        dialogo_formulario:false,
        formulario:{compras_compra_id:'',
                    dtcompra_cantidad: '',
                    dtcompra_descripcion:'',
                    dtcompra_observacion:'',
                    dtcompra_precio_unit: 0.00,
                    dtcompra_total: 0.00,
                    dtcompra_um:'UND'
                    },
        igv:false,
        opciones_um:['UND','JGO','TON','BLS','CJA','MET','CMT','KG','GRAM'],
        opciones_sucursal:['molino','mina','otro'],
        
        //DATATABLES
        header:[{text:"Op",value:"actions"},{text:"Id",value:"compra_codigo"},{text:"Encargado",value:"compra_encargado"},{text:"Razon",value:"compra_sucursal"},{text:"FechaEmicion.",value:"compra_fecha"},{text:'Total',value:"compra_total",align:"end"}],
        compras:[],
        //dialogo de detalle de la compra
        compra_detalles:[],
        dialog:false,
        compra_actual:{
                        compra_id:"",
                        compra_codigo: "",
                        compra_observacion: "no observacion",
                        compra_fecha: "",
                        compra_sucursal: "molino",
                        compra_total: 0.00,
                        compra_igv: 0.00,
                        compra_subtotal: 0.00,
                        compra_encargado:"",
                        compra_empresa_ruc:"12345678910",
                        compra_empresa_nombre:  "proveedor",
                        compra_cancelado: "1",
                        compra_presupuesto: 0.00,
                        compra_vuelto: 0.00,
                        compra_adelanto: 0.00,
                        usuarios_usuario_id: 1,
                        compra_moneda: "soles",
                        compra_descripcion: ""},
        dialogo_detalle_compras:false,
        menu2:false,
        message:false,
        
        tabs:null,
    }),
    computed:{
        ...mapState(['usuario']),
        total_compra(){
        let total = 0.00
            this.compra_detalles.forEach(element => {
                total = total + parseFloat(element.dtcompra_total)
            })
            return total.toFixed(2)
        },
        calcular_igv(){
            var resp
            if(this.igv){
                resp= ((this.total_compra *18)/100).toFixed(2)
            }else{
                resp = (0.00).toFixed(2)
            }
        return resp
        },
        total_con_igv(){
            return (parseFloat(this.total_compra) + parseFloat(this.calcular_igv)).toFixed(2)
        },
        total_total_compras(){
            let total1 = 0.00
            this.filtrado.forEach((element) => {
                total1 = total1 + parseFloat(element.compra_total)
                element.compra_total = parseFloat(element.compra_total).toFixed(2)
            });
            return total1.toFixed(2)
        },
        filtrado(){
                var encontrados = this.compras
                
                return encontrados = encontrados.filter((producto) => 
                        {
                            if(producto.compra_codigo.toLowerCase().includes(this.search) || producto.compra_encargado.toString().includes(this.search))
                            return producto
                        }
                    )
            }
    },
    mounted(){
        //this.listar_compras()
    },
    methods:{
        ...mapMutations(['cambiar_dialogo_loader']),
        ejecutar(){
            this.menu_filtro_mes = !this.menu_filtro_mes
            this.listar_compras()
        },
        guardar_compra(){
            console.log('guardar nueva_compra')
            // console.log(this.compra_actual)
            // console.log(this.compra_detalles)
            this.cambiar_dialogo_loader()
            axios.post('http://localhost:8000/api/guardar_compra',{
                usuario_id:this.usuario.usuario_id,
                api_token:this.usuario.api_token,
                compras:this.compra_actual,
                compra_detalle:this.compra_detalles 
            }).then(resp=>{
                console.log(resp)
                this.cambiar_dialogo_loader()
                this.dialog = false
                this.listar_compras()
            }).catch(error=>{
                console.log(error)
            })
        },
        guardar_detalle_compra(){
            axios.post('http://localhost')
        },
        //nuevo gasto  generar
        nueva_compra(){
            this.cambiar_dialogo_loader()
            axios.get('http://localhost:8000/api/nueva_compra',{params:this.usuario})
            .then(resp=>{
            this.compra_actual={
                        compra_id: "",
                        compra_codigo: "",
                        compra_observacion: "no observacion",
                        compra_fecha: "",
                        compra_sucursal: "molino",
                        compra_total: 0.00,
                        compra_igv: 0.00,
                        compra_subtotal: 0.00,
                        compra_encargado: "",
                        compra_empresa_ruc: "12345678910",
                        compra_empresa_nombre:  "proveedor",
                        compra_cancelado: "1",
                        compra_presupuesto: 0.00,
                        compra_vuelto: 0.00,
                        compra_adelanto: 0.00,
                        usuarios_usuario_id: this.usuario.usuario_id,
                        compra_moneda: "soles",
                        compra_descripcion: ""
            }
            console.log(resp)
            this.compra_actual.compra_id = resp.data.compra_id
            this.compra_actual.compra_codigo = resp.data.codigo
            this.compra_actual.compra_fecha = resp.data.fecha
            this.compra_actual.compra_encargado = this.usuario.usuario_detalle_nombre
            this.compra_actual.usuarios_usuario_id = this.usuario.usuario_id

            this.compra_actual.compra_subtotal = this.total_compra
            this.compra_actual.compra_igv = this.calcular_igv
            this.compra_actual.compra_total = this.total_con_igv
            this.compra_detalles = []
            this.cambiar_dialogo_loader()
            this.dialog = true    
            }).catch(error=>{
                console.log(error)
            })
            
        },
        //agregar un nuevo item al listado de compra
        agregar(){
            this.formulario.dtcompra_total = parseFloat(this.formulario.dtcompra_total)
            this.formulario.compras_compra_id = this.compra_actual.compra_id
            console.log(this.formulario)
            this.compra_detalles.push(this.formulario)
            this.compra_actual.compra_subtotal = this.total_compra
            this.compra_actual.compra_igv = this.calcular_igv
            this.compra_actual.compra_total = this.total_con_igv
            this.formulario= {compras_compra_id:'',
                    dtcompra_cantidad: '',
                    dtcompra_descripcion:'',
                    dtcompra_observacion:'',
                    dtcompra_precio_unit: 0.00,
                    dtcompra_total: 0.00,
                    dtcompra_um:'UND'}
            this.dialogo_formulario = false
        },
        verificar_igv(){
            if(this.igv == false){
                this.compra_actual.compra_total = this.compra_actual.compra_subtotal
                this.compra_actual.compra_igv = 0.00
            }
        },
        subtotal(){
          this.formulario.dtcompra_total =(this.formulario.dtcompra_precio_unit* this.formulario.dtcompra_cantidad).toFixed(2)
        },
        listar_compras(){
            //console.log(this.usuario)
            this.cambiar_dialogo_loader()
            console.log(typeof(this.usuario.usuario_id))
            axios.get('http://localhost:8000/api/compras_listado',
            {params:
                {
                    usuario_id:this.usuario.usuario_id.toString(),
                    api_token:this.usuario.api_token.toString(),
                    filtro_fecha:this.filtro_fecha
                }
            })
            .then(resp =>{
                //console.log(resp)
                this.compras = resp.data
            this.cambiar_dialogo_loader()
            }).catch(function(error){
                console.log(error)
            })
        },
        nuevo_detalle_compra(){
            this.dialogo_formulario = true
        },
        editar_compra(){
            this.dialog =true
        },
        //abrir el dialogo de compra con id()
        detalle_compra(id){
            console.log(id)
            axios.post('http://localhost:8000/api/compras_detalle_id',
            {
                usuario_id:this.usuario.usuario_id,
                api_token:this.usuario.api_token,
                compra_id:id
            }
            )
            .then(resp=>{
                this.compra_actual = resp.data.compra[0]

                this.compra_actual.compra_fecha = moment(resp.data.compra[0].compra_fecha).format('YYYY-MM-DD')
                this.compra_detalles = resp.data.detalle_compra
                console.log(resp)
                this.dialog =true
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }
}

</script>

<style scoped>
td.text-start{
    font-size: 5px;
    padding: 1px;
}
</style>