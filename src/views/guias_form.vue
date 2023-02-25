<template>
    <v-row class="mx-0">
        <v-col cols="12" md="5">
            <v-row class="mx-0">
                <v-col cols="12" md="12" class="pb-1">
                    <v-row class="ma-0">
                        <v-card class="my-1">
                            <v-card-text class="pa-1">
                                <p class="mb-0"><span class="font-weight-black">{{"("+guia.id+") "}}GR: {{guia.serie + '-' + guia.correlativo}} </span>  </p>
                            </v-card-text>
                        </v-card>
                        <v-spacer></v-spacer>
                       
                        <v-btn rounded small color="red darken-1 white--text" class="mt-1" @click="pdf_prueba"><v-icon>mdi-file-pdf</v-icon></v-btn>
                         <v-btn-toggle
                        
                        rounded
                        >
                            <v-btn rounded small color="green darken-1 white--text" :disabled="guia.id != ''?true:false " class="mt-1" @click="confirmar_guardar_documento()">Guardar Doc</v-btn>
                            <v-btn rounded small color="green darken-1 white--text" :disabled="(guia.correlativo == '' && usuario.usuario_cargo == 'administrador')?false:true " class="mt-1" @click="confirmar_guardar_guia">Generar GR</v-btn>
                            <!-- <v-btn rounded small color="red darken-2 white--text" class="mt-1" @click="pdf_prueba"><v-icon>mdi-file-pdf</v-icon></v-btn>
                            <v-btn rounded small color="primary" :disabled="guia.id != ''?true:false " class="mt-1" @click="guardar_documento">Guardar Doc</v-btn>
                            <v-btn rounded small color="green darken-1" :disabled="(guia.correlativo == '' && usuario.usuario_cargo == 'administrador')?false:true " class="mt-1" @click="generar_guia">Generar GR</v-btn> -->
                        </v-btn-toggle>    
                    </v-row>
                </v-col>
                <v-dialog
                    v-model="dialog_confirm_documento"
                    persistent
                    max-width="400"
                    >
                    <v-card>
                        <v-card-title class="text-h5">
                        Realmente desea crear el documento...?
                        </v-card-title>
                        <v-card-text>
                            Recordar que los datos principales como DATOS DESTINO, DIRECCION, MOTIVO, TIPO PAQUETE, MATERIALES, RESPONSABLE.No podran ser modificados.  
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red darken-1"
                            small
                            rounded
                            @click="dialog_confirm_documento = false"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            small
                            rounded
                            @click="guardar_documento()"
                        >
                            Aceptar
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialog_confirm_guia"
                    persistent
                    max-width="400"
                    >
                    <v-card>
                        <v-card-title class="text-h5">
                        Realmente desea crear la GUIA DE REMISION...?
                        </v-card-title>
                        <v-card-text>
                            Recordar que los datos principales como DATOS DESTINO, DIRECCION, MOTIVO, TIPO PAQUETE, MATERIALES, RESPONSABLE.No podran ser modificados.
                            Solamente podran ser asignados datos de transportista si ahun no estan asignados.  
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red darken-1"
                            small
                            rounded
                            @click="dialog_confirm_guia = false"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            small
                            rounded
                            @click="generar_guia()"
                        >
                            Aceptar
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialog_pdf" max-width="900">
                    <v-card>
                        <v-card-title>Vista de impresion de PDF</v-card-title>
                        <v-card-text>
                            <iframe :src="pdf_data" class="border-round" width="100%" height="700"></iframe>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" small @click="dialog_pdf = !dialog_pdf">OK</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-col cols="12" md="6" class="pb-1">
                   
                    <!-- <v-text-field append-icon="mdi-arrow-right-bold-circle" counter="11" outlined dense label="Ruc" class="text-body-2"></v-text-field> -->
                </v-col> 
<!-- proveedor  -->
                <v-dialog v-model="dialog_proveedor_nuevo" max-width="1000" min-hight="800" >
                    <v-card>
                        <v-card-title>
                            Proveedor nuevo de SUNAT
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="form_nuevo_proveedor" v-model="valid_nuevo_proveedor" lazy-validation>
                                <v-row class="mx-0 pt-3">
                                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="5">
                                        <v-text-field rounded :rules="requiredRules" v-model="proveedor_nuevo.razon_social" counter maxlength="80" required dense outlined label="RAZON SOCIAL"></v-text-field>                                                                                                               
                                    </v-col>
                                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="10" md="4">
                                        <v-text-field rounded :rules="rucRules" v-model="proveedor_nuevo.ruc" counter="11"  dense outlined label="RUC"></v-text-field>
                                    </v-col>
                                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="3" md="1">
                                        <v-switch inset dense label="Transporte" class="my-auto" v-model="proveedor_nuevo.transporte"></v-switch>
                                    </v-col>
                                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="6">
                                        <v-text-field rounded :rules="requiredRules" v-model="proveedor_nuevo.direccion" dense counter="100" outlined label="DIRECCION FISCAL"></v-text-field>
                                    </v-col>
                                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="6" md="3">
                                        <v-text-field rounded v-model="proveedor_nuevo.numero" dense counter="10" outlined label="NUMERO"></v-text-field>
                                    </v-col>
                                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="6" md="3">
                                        <v-text-field rounded v-model="proveedor_nuevo.zona" dense counter="45" outlined label="ZONA"></v-text-field>
                                    </v-col>
                                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="4">
                                        <v-text-field rounded :rules="requiredRules" v-model="proveedor_nuevo.distrito" dense counter="45" outlined label="DISTRITO"></v-text-field>
                                    </v-col>
                                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="4">
                                        <v-text-field rounded :rules="requiredRules" v-model="proveedor_nuevo.provincia" dense counter="45" outlined label="PROVINCIA"></v-text-field>
                                    </v-col>
                                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="4">
                                        <v-text-field rounded :rules="requiredRules" v-model="proveedor_nuevo.departamento" dense counter="45" outlined label="DEPARTAMENTO"></v-text-field>
                                    </v-col>
                                    <v-col class=" py-0 px-1 text-body-2 py-2 " cols="12" md="12">
                                        <v-row class="mx-0" >
                                            <v-btn color="primary" class="ml-auto" rounded dense :disabled="!valid_nuevo_proveedor" @click="guardar_proveedor_nuevo"><v-icon>mdi-save</v-icon>Guardar</v-btn>
                                        </v-row>                                        
                                    </v-col>

                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <v-col cols="12" md="12" class="py-0">
                    <v-card class="my-1">
                        <v-card-title class="py-1 px-3 teal lighten-3 text-body-2">
                            <span>Destino  Fecha: {{guia.fecha_hoy}}</span> <v-spacer></v-spacer>
                            <v-btn @click="get_proveedor()"  small color="orange lighten-2" rounded :disabled="!editar?true:false"><v-icon>mdi-pencil</v-icon></v-btn>
                            <!-- proveedor dialogo -->
                            <v-dialog v-model="dialog_destinatario" max-width="1000" min-hight="800" >
                                <v-card>
                                    <v-tabs
                                    v-model="tab"
                                    background-color="teal"
                                    centered
                                    dark
                                    icons-and-text
                                    >
                                    <v-tabs-slider></v-tabs-slider>
                                    <!-- <v-tab href="#tab-1">
                                        Editar Proveedor.
                                        <v-icon>mdi-newspaper-plus</v-icon>
                                    </v-tab> -->
                                    <v-tab href="#tab-1">
                                        Buscar en mi DB
                                        <v-icon>mdi-clock</v-icon>
                                    </v-tab>

                                    </v-tabs>
                                    <v-tabs-items v-model="tab">
                                        <!-- <v-tab-item value="tab-1">
                                            <v-card >
                                                <v-card-title color="teal">
                                                    Datos de Proveedor
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-form ref="form_nuevo_proveedor" v-model="valid_nuevo_proveedor" lazy-validation>
                                                        <v-row class="mx-0 pt-3">
                                                            <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="6">
                                                                <v-text-field rounded :rules="requiredRules" v-model="guia.destinatario.razon_social" counter maxlength="10" required dense outlined label="RAZON SOCIAL"></v-text-field>                                                                                                               
                                                            </v-col>
                                                            <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="6">
                                                                <v-text-field rounded :rules="rucRules" v-model="guia.destinatario.ruc" counter="11"  dense outlined label="RUC"></v-text-field>
                                                            </v-col>
                                                            <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="6">
                                                                <v-text-field rounded :rules="requiredRules" v-model="guia.destinatario.direccion" dense outlined label="DIRECCION FISCAL"></v-text-field>
                                                            </v-col>
                                                            <v-col class=" py-0 px-1 text-body-2 py-2" cols="6" md="3">
                                                                <v-text-field rounded v-model="guia.datos_llegada.nro" dense outlined label="NUMERO"></v-text-field>
                                                            </v-col>
                                                            <v-col class=" py-0 px-1 text-body-2 py-2" cols="6" md="3">
                                                                <v-text-field rounded v-model="guia.datos_llegada.zona" dense outlined label="ZONA"></v-text-field>
                                                            </v-col>
                                                            <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="4">
                                                                <v-text-field rounded :rules="requiredRules" v-model="guia.datos_llegada.distrito" dense outlined label="DISTRITO"></v-text-field>
                                                            </v-col>
                                                            <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="4">
                                                                <v-text-field rounded :rules="requiredRules" v-model="guia.datos_llegada.provincia" dense outlined label="PROVINCIA"></v-text-field>
                                                            </v-col>
                                                            <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="4">
                                                                <v-text-field rounded :rules="requiredRules" v-model="guia.datos_llegada.departamento" dense outlined label="DEPARTAMENTO"></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                    </v-form>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color=""  small @click="prueba_reset()">Reset valores</v-btn>
                                                    <v-btn color="primary" :disabled="!valid_nuevo_proveedor" small @click="guardar_proveedor_nuevo()">Guardar</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                            
                                        </v-tab-item> -->
                                        <v-tab-item value="tab-1">
                                            <v-card>
                                                <v-card-title>
                                                Proveedores
                                                <v-spacer></v-spacer>
                                                <!-- {{proveedores1}} -->
                                                <v-text-field
                                                    v-model="buscar_proveedor"
                                                    append-icon="mdi-magnify"
                                                    label="Buscar"
                                                    dense
                                                    outlined
                                                    hide-details
                                                ></v-text-field>
                                                </v-card-title>

                                                <v-data-table
                                                class="elevation-2 text-caption"
                                                dense
                                                mobile-breakpoint
                                                style="font-size: 8px"
                                                item-class="pa-5"
                                                light
                                                :headers="headers"
                                                :items="proveedores1"
                                                :search="buscar_proveedor"
                                                @click:row="proveedor_row"
                                                >
                                                </v-data-table>
                                            </v-card>

                                        </v-tab-item>
                                        
                                    </v-tabs-items>
                                </v-card>

                            </v-dialog> 
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text> 
                            <v-row class="mx-0">
                                <v-col cols="12" class="pa-0">
                                    <v-card class="px-1">
                                        <v-card-text class="text-caption pa-1">
                                            <v-form ref="form_buscar_proveedor_sunat" @submit.prevent="buscar_sunat" v-model="valid_buscar_proveedor_sunat" lazy-validation>
                                                <v-row class="mx-0 px-1">
                                                    <v-col cols="9"  class="px-1">
                                                        <v-text-field :disabled="!editar" clear-icon="mdi-close-circle" rounded counter="11" clearable :rules="rucRules" v-model="data_buscar_sunat_ruc" dense outlined label="Ruc" required></v-text-field>
                                                    </v-col>
                                                    <v-col cols="3" class="px-1 pt-5 text-center" align-items="center">
                                                        <v-btn color="teal" rounded :disabled="!valid_buscar_proveedor_sunat || !editar" small @click="buscar_sunat"><v-icon>mdi-magnify</v-icon><span class="d-sm-none d-none d-md-flex">Buscar</span></v-btn>
                                                    </v-col>
                                                </v-row>
                                                
                                            </v-form>
                                            <p class="text-caption font-italic mb-1"><span class="font-weight-black">Razon social: </span>{{guia.destinatario.razon_social}}</p>
                                            <p class="text-caption font-italic mb-1"><span class="font-weight-black">Direccion Fiscal: </span>{{guia.destinatario.direccion}}</p>
                                            <p class="text-caption font-italic mb-1"><span class="font-weight-black">Ruc: </span>{{guia.destinatario.ruc}}</p>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
<!-- direccion partida y llegada  -->
                <v-col cols="12" md="12" class="py-1">
                    <v-card class="my-1">
                        <v-card-title class="py-1 px-3 teal lighten-3 text-body-2">
                            <span>Partida / Llegada  Fecha de traslado: 26/06/2021</span> <v-spacer></v-spacer>
                             
                            <v-btn @click="punto_llegada()"  small color="orange lighten-2" rounded :disabled="!editar"><v-icon>mdi-pencil</v-icon></v-btn>
                            <!-- proveedor dialogo -->
                            <v-dialog v-model="dialog_punto_entrega" max-width="1000" min-hight="800" >
                                <v-card>
                                    <v-tabs
                                    v-model="tab"
                                    background-color="teal"
                                    centered
                                    dark
                                    icons-and-text
                                    >
                                    <v-tabs-slider></v-tabs-slider>

                                    <v-tab href="#tab-1">
                                        Formulario
                                        <v-icon>mdi-newspaper</v-icon>
                                    </v-tab>

                                    </v-tabs>
                                    <v-tabs-items v-model="tab">
                                        <v-tab-item value="tab-1">
                                            <v-row class="mx-0">
                                                <v-col cols=12 md="6">
                                                    <v-card class="my-2">
                                                        <v-card-title class="px-2">
                                                            <!-- <v-spacer></v-spacer> -->
                                                            Punto de partida
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <v-row class="mx-0">
                                                                <v-col cols="12" md=12 class="px-1 py-0"><v-text-field disabled v-model="guia.datos_partida.direccion" dense label="Direccion" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="12" md="6" class="px-1 py-0"><v-text-field disabled v-model="guia.datos_partida.nro" dense label="Nro" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="12" md="6" class="px-1 py-0"><v-text-field disabled v-model="guia.datos_partida.zona" dense label="Zona/ Urb" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="12" md="4" class="px-1 py-0"><v-text-field disabled v-model="guia.datos_partida.distrito" dense label="Distrito" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="12" md="4" class="px-1 py-0"><v-text-field disabled v-model="guia.datos_partida.provincia" dense label="Provincia" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="12" md="4" class="px-1 py-0"><v-text-field disabled v-model="guia.datos_partida.departamento" dense label="Departamento" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="12" md="12" class="px-1 py-0">
                                                                    <v-combobox
                                                                    @change="verificar()"
                                                                    v-model="guia.usuario_envia"
                                                                    :items="usuarios"
                                                                    item-text="usuario_detalle_nombre"
                                                                    rounded
                                                                    outlined
                                                                    dense
                                                                    label="Usuario Envia"
                                                                    >
                                                                    </v-combobox>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>
                                                <v-col cols=12 md=6>
                                                   <v-card class="my-2">
                                                        <v-card-title class="px-2">
                                                            <!-- <v-spacer></v-spacer> -->
                                                            Punto de Llegada /Datos destino
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <v-row class="mx-0">
                                                                <v-col cols="12" md=12 class="px-1 py-0"><v-text-field counter="80" v-model="guia.datos_llegada.direccion" dense label="Direccion" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="6" md="6" class="px-1 py-0"><v-text-field counter="20" v-model="guia.datos_llegada.nro" dense label="Nro" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="6" md="6" class="px-1 py-0"><v-text-field counter="50" v-model="guia.datos_llegada.zona" dense label="Zona/ Urb" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="12" md="4" class="px-1 py-0"><v-text-field counter="50" v-model="guia.datos_llegada.distrito" dense label="Distrito" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="12" md="4" class="px-1 py-0"><v-text-field counter="50" v-model="guia.datos_llegada.provincia" dense label="Provincia" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="12" md="4" class="px-1 py-0"><v-text-field counter="50" v-model="guia.datos_llegada.departamento" dense label="Departamento" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="12" md="6" class="px-1 py-0"><v-text-field counter="60" v-model="guia.datos_llegada.contacto_nombre" dense label="Contacto Nombre" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="12" md="6" class="px-1 py-0"><v-text-field counter="9" v-model="guia.datos_llegada.contacto_numero" dense label="Contacto Celular/ Telefono" outlined rounded></v-text-field></v-col>
                                                                <v-col cols="12" md="6" class="px-1 py-0"><v-text-field counter="45" v-model="guia.datos_llegada.contacto_correo" dense label="Contacto E-mail" outlined rounded></v-text-field></v-col>
                                                            </v-row>
                                                        </v-card-text>
                                                    </v-card> 
                                                </v-col>
                                            </v-row>
                                            

                                        </v-tab-item>
                                        <v-tab-item value="tab-2">
                                            <!-- buscar en la sunat  -->
                                           
                                        </v-tab-item>
                                        <v-tab-item value="tab-3">
                                            <!-- formulario proveedor -->
                                           
                                            
                                        </v-tab-item>
                                    </v-tabs-items>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" small @click="dialog_punto_entrega = !dialog_punto_entrega">OK</v-btn>
                                    </v-card-actions>
                                </v-card>

                            </v-dialog> 
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <!-- <v-text-field outlined dense label="Ruc" class="text-body-2"></v-text-field> -->
                            <v-row class="mx-0">
                                <v-col cols="12" class="pa-0">
                                    <v-card>
                                        <v-card-text class="text-caption pa-1">
                                            <p class="text-caption font-italic mb-1"><span class="font-weight-black">Punto partida: </span>{{guia.datos_partida.direccion}}</p>
                                            <p class="text-caption font-italic mb-1">
                                                <span class="font-weight-black">N°: </span>{{guia.datos_partida.nro}}
                                                <span class="font-weight-black">Zona: </span>{{guia.datos_partida.zona}}
                                            </p>
                                            <p>
                                                <span class="font-weight-black">Dist: </span>{{guia.datos_partida.distrito}}
                                                <span class="font-weight-black">Prov: </span>{{guia.datos_partida.provincia}}
                                                <span class="font-weight-black">Dep: </span>{{guia.datos_partida.departamento}}
                                            </p>
                                            <p>
                                                <span class="font-weight-black">Envía: </span>{{guia.usuario_envia.usuario_detalle_nombre}}
                                            </p>
                                            <p class="text-caption font-italic mb-1"><span class="font-weight-black">Punto llegada: </span>{{guia.datos_llegada.direccion}}</p>
                                            <p class="text-caption font-italic mb-1">
                                                <span class="font-weight-black">N°: </span>{{guia.datos_llegada.nro}}
                                                <span class="font-weight-black">Zona: </span>{{guia.datos_llegada.zona}}
                                            </p>
                                            <p>
                                                <span class="font-weight-black">Dit: </span>{{guia.datos_llegada.distrito}}
                                                <span class="font-weight-black">Prov: </span>{{guia.datos_llegada.provincia}}
                                                <span class="font-weight-black">Dep: </span>{{guia.datos_llegada.departamento}}
                                            </p>
                                            <p class="text-caption font-italic mb-1">
                                                <span class="font-weight-black">Contacto:</span>{{guia.datos_llegada.contacto_nombre}}
                                                <span class="font-weight-black">Cel:</span>{{guia.datos_llegada.contacto_numero}}
                                                <span class="font-weight-black">E-mail:</span>{{guia.datos_llegada.contacto_correo}}
                                            </p>                                            
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
<!-- tipo de paquete -->
                <v-col cols="12" md="12" class="py-0">
                    <v-card class="my-1">
                        <v-card-title class="py-1 px-3 teal lighten-3 text-body-2">
                            <span>Tipo de paquete</span> <v-spacer></v-spacer><v-btn small color="orange lighten-2" rounded :disabled="!editar"><v-icon>mdi-pencil</v-icon></v-btn>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text> 
                            <v-row class="mx-0">
                                <v-col cols="12" class="pa-0 ">
                                    <v-card class="py-2">
                                        <v-card-text class="text-caption pa-1">
                                            <v-row class="mx-0">                        
                                                <v-col cols=4 class="pa-1">
                                                    <v-text-field :disabled="!editar" v-model="guia.paquete.cantidad_tipo" dense label="Cantidad y tipo" outlined rounded hide-details></v-text-field>
                                                </v-col>
                                                <v-col cols=4 class="pa-1">
                                                    <v-text-field :disabled="!editar" v-model="guia.paquete.peso" dense label="Peso" outlined rounded hide-details></v-text-field>
                                                </v-col>
                                                <v-col cols=4 class="pa-1">
                                                    <v-text-field :disabled="!editar" v-model="guia.paquete.medidas" dense label="Medidas" outlined rounded hide-details></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-divider class="mt-3"></v-divider>                               
                                            <p class="text-caption font-italic mb-1"><span class="font-weight-black">Cantidad y tipo: </span>{{guia.paquete.cantidad_tipo}}</p>
                                            <p class="text-caption font-italic mb-1"><span class="font-weight-black">Peso aprox: </span>{{guia.paquete.peso}}</p>
                                            <p class="text-caption font-italic mb-1"><span class="font-weight-black">Medidas: </span>{{guia.paquete.medidas}}</p>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        
        <v-col cols="12" md="7" class="px-1">
            <v-row class="mx-0">
<!-- transportista -->
                <v-col cols="12" md="6" class="py-1">
                    <v-card class="my-1">
                            <v-card-title class="py-1 px-3 teal lighten-3 text-body-2">
                                <span>Transportista</span><v-btn :disabled="!editar" small @click="limpiar_transportista" rounded pill><v-icon> mdi-close-circle</v-icon></v-btn><v-spacer></v-spacer>
                                <v-btn @click="get_transportita" rounded small color="orange lighten-2" :disabled="guia.transportista.ruc == '' || editar ==true ?false:true">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <!-- dialogo motivo -->
                                <v-dialog v-model="dialog_transportista" max-width="1200">
                                    <v-card class="px-0">
                                    
                                        <v-card-text class="pa-1">
                                            <v-row class="mx-0 pt-3">
                                                <v-col class=" px-0 text-body-2 py-2" cols="12">
                                                        <v-row class="mx-0">
                                                            <v-col cols="12" md="4" class="pa-1">
                                                                <v-card class="px-0">
                                                                    <v-card-title class="pa-2 teal lighten-2"  rounded><span>1. EMPRESA</span> </v-card-title>
                                                                    <v-card-text class="px-1">
                                                                        <p class="text-caption font-italic mb-1"><span class="font-weight-black">Razon social: </span>{{guia.transportista.razon_social}}</p>
                                                                        <p class="text-caption font-italic mb-1"><span class="font-weight-black">Ruc: </span>{{guia.transportista.ruc}}</p>
                                                                        <v-text-field
                                                                            v-model="buscar_transportista"
                                                                            append-icon="mdi-magnify"
                                                                            label="Buscar"
                                                                            dense
                                                                            rounded
                                                                            outlined
                                                                            hide-details
                                                                        ></v-text-field>
                                                                        <v-data-table
                                                                            class="elevation-2 text-caption"
                                                                            dense
                                                                            mobile-breakpoint
                                                                            style="font-size: 8px"
                                                                            item-class="pa-5"
                                                                            light
                                                                            :headers="headers_transportista"
                                                                            :items="transportistas"
                                                                            :search="buscar_transportista"
                                                                            @click:row="transportista_row"
                                                                        >
                                                                        </v-data-table>
                                                                    </v-card-text>
                                                                </v-card>
                                                            </v-col>
                                                            <v-col cols="12" md="4" class="pa-1" :hidden="estado_conductor_carro">
                                                                <v-card>
                                                                    <v-card-title class="pa-2 teal lighten-2"  rounded>
                                                                        <span>2. CONDUCTOR</span>
                                                                        <v-spacer></v-spacer>
                                                                        <v-btn rounded color="teal" @click="dialog_conductor_nuevo = !dialog_conductor_nuevo" small><v-icon >mdi-plus</v-icon></v-btn>
                                                                        <v-dialog v-model="dialog_conductor_nuevo" max-width="700">
                                                                            <v-card>
                                                                                <v-card-title>
                                                                                    Nuevo conductor
                                                                                </v-card-title>
                                                                                <v-card-text>
                                                                                    <v-form ref="form_conductor_nuevo" v-model="valid_conductor_nuevo">
                                                                                        <v-row class="mx-0">
                                                                                            <v-col cols=12 md=4 class="pa-1">
                                                                                                <v-text-field :rules="requiredRules" v-model="conductor_nuevo.licencia" outlined dense rounded label="Licencia" counter="50" required ></v-text-field>
                                                                                            </v-col>
                                                                                            <v-col cols=12 md=4 class="pa-1">
                                                                                                <v-text-field :rules="requiredRules" v-model="conductor_nuevo.nombre_conductor" outlined dense rounded label="Nombre" counter="15" required ></v-text-field>
                                                                                            </v-col>
                                                                                            <v-col cols=12 md=4 class="pa-1">
                                                                                                <v-text-field  v-model="conductor_nuevo.telefono" outlined dense rounded label="Celular" counter="9" required ></v-text-field>
                                                                                            </v-col>
                                                                                           
                                                                                            <v-col cols=12>
                                                                                                <v-row class="mx-0">
                                                                                                    <v-spacer></v-spacer>
                                                                                                    <v-btn color="primary" dense rounded @click="guardar_conductor_nuevo" ><v-icon>mdi-content-save-all</v-icon> Guardar</v-btn>
                                                                                                </v-row>
                                                                                                
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                    </v-form>
                                                                                </v-card-text>
                                                                            </v-card>
                                                                        </v-dialog>
                                                                    </v-card-title>
                                                                    <v-card-text>
                                                                        <p class="text-caption font-italic mb-1"><span class="font-weight-black">Nombre: </span>{{guia.transportista.nombre_conductor}}</p>
                                                                        <p class="text-caption font-italic mb-1"><span class="font-weight-black">Licencia: </span>{{guia.transportista.licencia}} <span class="font-weight-black">Telefono: </span>{{guia.transportista.telefono}}</p>
                                                                        <v-text-field
                                                                            v-model="buscar_conductor"
                                                                            append-icon="mdi-magnify"
                                                                            label="Buscar"
                                                                            dense
                                                                            rounded
                                                                            outlined
                                                                            hide-details
                                                                        ></v-text-field>
                                                                        <v-data-table
                                                                            class="elevation-2 text-caption"
                                                                            dense
                                                                            mobile-breakpoint
                                                                            style="font-size: 8px"
                                                                            item-class="pa-5"
                                                                            light
                                                                            :headers="headers_conductor"
                                                                            :items="conductores"
                                                                            :search="buscar_conductor"
                                                                            @click:row="conductor_row"
                                                                        >
                                                                        </v-data-table>
                                                                    </v-card-text>
                                                                </v-card>
                                                                
                                                            </v-col>
                                                            <v-col cols="12" md="4" class="pa-1" :hidden="estado_conductor_carro">
                                                                <v-card>
                                                                    <v-card-title class="pa-2 teal lighten-2"  rounded>
                                                                        <span>3. UNIDAD VEHICULAR </span>    
                                                                        <v-spacer></v-spacer>
                                                                        <v-btn rounded color="teal" @click="dialog_carro_nuevo = !dialog_carro_nuevo" small><v-icon >mdi-plus</v-icon></v-btn>
                                                                        <v-dialog v-model="dialog_carro_nuevo" max-width="700">
                                                                            <v-card>
                                                                                <v-card-title>
                                                                                    Nueva unidad Vehicular
                                                                                </v-card-title>
                                                                                <v-card-text>
                                                                                    <v-form ref="form_carro_nuevo" v-model="valid_carro_nuevo">
                                                                                        <v-row class="mx-0">
                                                                                            <v-col cols=12 md=4 class="pa-1">
                                                                                                <v-text-field :rules="requiredRules" v-model="carro_nuevo.placa_t" outlined dense rounded label="Placa T" counter="7" required ></v-text-field>
                                                                                            </v-col>
                                                                                            <v-col cols=12 md=4 class="pa-1">
                                                                                                <v-text-field :rules="requiredRules" v-model="carro_nuevo.marca_t" outlined dense rounded label="Marca T" counter="30" required ></v-text-field>
                                                                                            </v-col>
                                                                                            <v-col cols=12 md=4 class="pa-1">
                                                                                                <v-text-field :rules="requiredRules" v-model="carro_nuevo.mtc_t" outlined dense rounded label="Mtc Tracto" counter="10" required ></v-text-field>
                                                                                            </v-col>
                                                                                            <v-col cols=12 md=4 class="pa-1">
                                                                                                <v-text-field  v-model="carro_nuevo.placa_p" outlined dense rounded label="Placa C" counter="7" required ></v-text-field>
                                                                                            </v-col>
                                                                                            <v-col cols=12 md=4 class="pa-1">
                                                                                                <v-text-field  v-model="carro_nuevo.marca_p" outlined dense rounded label="Marca C" counter="30" required ></v-text-field>
                                                                                            </v-col>
                                                                                            <v-col cols=12 md=4 class="pa-1">
                                                                                                <v-text-field v-model="carro_nuevo.mtc_p" outlined dense rounded label="Mtc carreta" counter="10" required ></v-text-field>
                                                                                            </v-col>
                                                                                            <v-col cols=12>
                                                                                                <v-row class="mx-0">
                                                                                                    <v-spacer></v-spacer>
                                                                                                    <v-btn color="primary" dense rounded @click="guardar_carro_nuevo" ><v-icon>mdi-content-save-all</v-icon> Guardar</v-btn>
                                                                                                </v-row>
                                                                                                
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                    </v-form>
                                                                                </v-card-text>
                                                                            </v-card>
                                                                        </v-dialog>
                                                                    </v-card-title>
                                                                    <v-card-text>
                                                                        <p class="text-caption font-italic mb-1"><span class="font-weight-black">Placa T: </span> {{guia.transportista.placa_t}}<span class="font-weight-black">MTC T: </span>{{guia.transportista.mtc_t}}<span class="font-weight-black">Marca T: </span>{{guia.transportista.marca_t}}</p>
                                                                        <p class="text-caption font-italic mb-1"><span class="font-weight-black">Placa P: </span> {{guia.transportista.placa_p}}<span class="font-weight-black">MTC P: </span>{{guia.transportista.mtc_p}}<span class="font-weight-black">Marca T: </span>{{guia.transportista.marca_p}}</p>
                                                                        <v-text-field
                                                                            v-model="buscar_carro"
                                                                            append-icon="mdi-magnify"
                                                                            label="Buscar"
                                                                            dense
                                                                            rounded
                                                                            outlined
                                                                            hide-details
                                                                        ></v-text-field>
                                                                        <v-data-table
                                                                            class="elevation-2 text-caption"
                                                                            dense
                                                                            mobile-breakpoint
                                                                            style="font-size: 8px"
                                                                            item-class="pa-5"
                                                                            light
                                                                            :headers="headers_carro"
                                                                            :items="carros"
                                                                            :search="buscar_carro"
                                                                            @click:row="carro_row"
                                                                        >
                                                                        </v-data-table>
                                                                    </v-card-text>
                                                                </v-card>
                                                                
                                                            </v-col>  
                                                        </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" small @click="asignar_transportista()">Asignar</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text class="text-caption pa-1">
                                <p class="text-caption font-italic mb-1"><span class="font-weight-black">Razon social: </span>{{guia.transportista.razon_social}}</p>
                                <p class="text-caption font-italic mb-1"><span class="font-weight-black">Ruc: </span>{{guia.transportista.ruc}}</p>
                                <p class="text-caption font-italic mb-1"><span class="font-weight-black">Nombre: </span>{{guia.transportista.nombre_conductor}}</p>
                                <p class="text-caption font-italic mb-1"><span class="font-weight-black">Licencia: </span>{{guia.transportista.licencia}} <span class="font-weight-black">Telefono: </span>{{guia.transportista.telefono}}</p>
                                <p class="text-caption font-italic mb-1"><span class="font-weight-black">Placa T: </span> {{guia.transportista.placa_t}}<span class="font-weight-black">MTC T: </span>{{guia.transportista.mtc_t}}<span class="font-weight-black">Marca T: </span>{{guia.transportista.marca_t}}</p>
                                <p class="text-caption font-italic mb-1"><span class="font-weight-black">Placa P: </span> {{guia.transportista.placa_p}}<span class="font-weight-black">MTC P: </span>{{guia.transportista.mtc_p}}<span class="font-weight-black">Marca T: </span>{{guia.transportista.marca_p}}</p>                        
                            </v-card-text>
                        </v-card>
                </v-col>
<!-- motivo del traslado -->
                <v-col cols="12" md="6" class="py-1">
                    <v-card class="my-1">
                            <v-card-title class="py-1 px-3 teal lighten-3 text-body-2">
                                <span>Motivo</span> <v-spacer></v-spacer>
                                <v-btn @click="dialog_motivo = !dialog_motivo" rounded small color="orange lighten-2" :disabled="!editar">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <!-- dialogo motivo -->
                                <v-dialog v-model="dialog_motivo" max-width="500">
                                    <v-card >
                                        <v-card-title color="teal">
                                            Motivo del Traslado
                                        </v-card-title>
                                        <v-card-text>
                                            <v-row class="mx-0 pt-3">
                                                <v-col class=" pa-1 text-body-2 py-2" cols="12">
                                                    <v-combobox
                                                        v-model="guia.motivo"
                                                        :items="motivo_items"
                                                        label="Motivo"
                                                        outlined
                                                        dense
                                                        rounded 
                                                    >
                                                    </v-combobox>
                                                    <v-text-field rounded v-model="guia.motivo_detalle" dense outlined label="Descripcion motivo"></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn rounded color="primary" small @click="dialog_motivo = !dialog_motivo">OK</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog> 
                            </v-card-title>
                            <v-card-text>
                                <v-row class="mx-0 pt-3">
                                    <v-col class=" pa-1 text-body-2 py-2" cols="12">
                                        <v-combobox
                                            rounded
                                            v-model="guia.motivo"
                                            :items="motivo_items"
                                            label="Motivo"
                                            outlined
                                            dense
                                            hide-details
                                            :disabled="!editar"
                                        >
                                        </v-combobox>
                                        <p class="text-caption font-italic mb-1"><span class="font-weight-black">Motivo: {{ guia.motivo}}</span> {{guia.motivo_detalle}}</p>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                </v-col>
            </v-row>
<!-- Listado de materiales  -->
            <v-col cols="12" md="12" class="py-1">
                    <v-card class="my-1">
                        <v-card-title class="py-1 px-1 teal lighten-3 text-caption">
                                <v-col cols="12">
                                    <v-row class="mx-0 ">
                                        <span>MATERIALES</span>
                                            <v-spacer></v-spacer>
                                            <v-btn @click="dialog_materiales = !dialog_materiales" small color="orange lighten-2" rounded :disabled="!editar">
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                    
                                        <v-dialog v-model="dialog_materiales" max-width="950">
                                            <v-card>
                                                <v-tabs
                                                v-model="tab"
                                                background-color="teal"
                                                centered
                                                dark
                                                icons-and-text
                                                >
                                                <v-tabs-slider></v-tabs-slider>

                                                <v-tab href="#tab-1">
                                                    Materiales 
                                                    <v-icon>mdi-grid</v-icon>
                                                </v-tab>

                                                <v-tab href="#tab-2">
                                                    Export
                                                    <v-icon>mdi-heart</v-icon>
                                                </v-tab>
                                                </v-tabs>
                                                <v-tabs-items v-model="tab">
                                                    <v-tab-item value="tab-1">
                                                        <v-card>
                                                            <v-card-text>
                                                                <v-form ref="form_material" class="" v-model="valid_material">
                                                                    <v-card outlined rounded class="pa-0 pt-2">
                                                                        <v-row class="mx-0 rounded pt-2 mb-2" outlined elevation="5">
                                                                            <v-col cols="6" md="2" class="py-0">
                                                                                <v-text-field rounded v-model="material.codigo" label="Codigo" dense outlined
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="6" md="2" class="py-0">
                                                                                <v-text-field :rules="requiredRules" rounded v-model="material.cantidad" label="Cantidad" dense outlined
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="6" md="2" class="py-0">
                                                                                <v-text-field :rules="requiredRules"  rounded v-model="material.um" label="U. Medida" dense outlined
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="12" md="6" class="py-0">
                                                                                <v-text-field :rules="requiredRules" counter="80"  rounded v-model="material.descripcion" label="Material descripcion" dense outlined
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="6" md="2" class="py-0">
                                                                                <v-switch
                                                                                class="ma-0"
                                                                                v-model="material.con_retorno"
                                                                                inset
                                                                                dense                                                                        
                                                                                label="Retorno"
                                                                                ></v-switch>
                                                                            </v-col>
                                                                            <v-col cols="6" md="2" class="py-0">
                                                                                <v-text-field rounded v-model="material.marca" label="Marca" dense outlined 
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="6" md="2" class="py-0">
                                                                                <v-text-field rounded v-model="material.modelo" label="Modelo" dense outlined 
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="6" md="2" class="py-0">
                                                                                <v-text-field rounded v-model="material.serie" label="Serie" dense outlined 
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="6" md="2" class="py-0">
                                                                                <v-text-field rounded v-model="material.peso" label="Peso" dense outlined 
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                            
                                                                            <v-col cols="2" class="py-0 align-items-end">
                                                                                <v-btn :disabled="!valid_material" rounded color="primary" @click="agregar_material" ><v-icon>mdi-plus</v-icon> Add</v-btn>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-card>
                                                                </v-form>
                                                                
                                                                <v-divider class="my-1"></v-divider>
                                                                <v-row class="mx-0">
                                                                    <v-col cols="3" class="px-1">
                                                                        <v-row class="mx-0 my-0">
                                                                            <span>Codigo</span><v-spacer></v-spacer><span>Cant</span><span>~UN.MED</span>
                                                                        </v-row> 
                                                                    </v-col>
                                                                    <v-col cols="9" class="px-1">
                                                                        <span>DESCRIPCIOON ~ retorno</span> 
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row class="ma-0" v-if="(this.guia.materiales).length == 0">
                                                                    <v-col cols=12 class="text-center">
                                                                        <span> Ningun elemento asignado.. !!</span>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row class="mx-0" v-for="(item,index) of guia.materiales" :key="index">
                                                                    <v-col cols="3" class="px-1">
                                                                        <v-row class="mx-0 my-0">
                                                                        <v-icon @click="eliminar_material(index)">mdi-close-circle</v-icon><span>{{item.codigo}}</span><v-spacer></v-spacer><span>{{item.cantidad}}</span><span>~{{item.um}}</span>
                                                                        </v-row> 
                                                                    </v-col>
                                                                    <v-col cols="9" class="px-1 detalle-item"  @click="editar_material(index)">
                                                                        <v-row class="ma-0">
                                                                            <span>{{item.descripcion}}</span>  
                                                                            <span v-if="item.marca">~MA: {{item.marca}}</span>
                                                                            <span v-if="item.modelo">~MO: {{item.modelo}}</span>
                                                                            <span v-if="item.serie">~SE: {{item.serie}}</span>                                
                                                                            <v-spacer></v-spacer>
                                                                            <span v-if="item.peso">{{item.peso}}</span>
                                                                            <span>{{item.con_retorno?"true":"false"}}</span>                                       
                                                                        </v-row>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row class="ma-0 blue-grey lighten-4 rounded">
                                                                    <v-col cols="3" class="pa-1">
                                                                        <v-row class="ma-0 my-0">
                                                                            <span>TOTAL: </span><v-spacer></v-spacer><span>{{total_materiales}}</span><span>UND</span>
                                                                        </v-row> 
                                                                    </v-col>
                                                                </v-row>  
                                                            </v-card-text>
                                                            <v-divider class="my-1"></v-divider>
                                                            <v-card-actions>
                                                                <v-menu
                                                                    ref="menu_f_retorno"
                                                                    v-model="menu_f_retorno"
                                                                    :close-on-content-click="false"
                                                                    transition="scale-transition"
                                                                    offset-y
                                                                    min-width="auto"
                                                                >
                                                                    <template v-slot:activator="{ on, attrs }">
                                                                    <v-text-field
                                                                        v-model="guia.f_retorno"
                                                                        label="Fecha retorno"
                                                                        readonly
                                                                        clearable
                                                                        rounded
                                                                        outlined
                                                                        dense
                                                                        v-bind="attrs"
                                                                        v-on="on"
                                                                        @click:clear="guia.f_retorno = null"
                                                                    ></v-text-field>
                                                                    </template>
                                                                    <v-date-picker
                                                                    v-model="guia.f_retorno"
                                                                    no-title
                                                                    scrollable
                                                                    @input="menu_f_retorno = false"
                                                                    >
                                                                    <v-spacer></v-spacer>
                                                                    <!-- <v-btn
                                                                        text
                                                                        color="primary"
                                                                        @click="menu_f_retorno = false"
                                                                    >
                                                                        Cancel
                                                                    </v-btn>
                                                                    <v-btn
                                                                        text
                                                                        color="primary"
                                                                        @click="$refs.menu_f_retorno.save(guia.f_retorno)"
                                                                    >
                                                                        OK
                                                                    </v-btn> -->
                                                                    </v-date-picker>
                                                                </v-menu>
                                                                
                                                                <v-text-field counter="80"  rounded v-model="guia.descripcion" label="Textos adicionales" dense outlined
                                                                ></v-text-field>
                                                                <v-spacer></v-spacer>

                                                                <v-btn color="primary" rounded md @click="dialog_materiales = !dialog_materiales">OK</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-tab-item>
                                                    <v-tab-item value="tab-2">
                                                        <v-card>
                                                            <v-card-title>
                                                            Export Excel
                                                            
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <v-textarea v-model="material_textarea" rounded dense rows="6" outlined label="Excel">                                                    
                                                                </v-textarea>
                                                                <!-- {{material_textarea = material_textarea.replace(/(\t)/, "enter")}} -->
                                                            </v-card-text>
                                                        </v-card>

                                                    </v-tab-item>
                                                </v-tabs-items>
                                            </v-card>
                                        </v-dialog>
                                    </v-row>
                                </v-col>
                        </v-card-title>
                        <v-divider></v-divider>
                        
                        <v-card-text class="pa-1 text-caption">
                            <v-row class="mx-0 font-weight-black">
                                <v-col cols="3" class="px-1">
                                    <v-row class="mx-0 my-0">
                                        <span>Codigo</span><v-spacer></v-spacer><span>Cant</span><span>~UN.MED</span>
                                    </v-row> 
                                </v-col>
                                <v-col cols="9" class="px-1">
                                    <span>DESCRIPCIOON ~ retorno</span> 
                                </v-col>
                            </v-row>
                            <v-row class="ma-0" v-if="(this.guia.materiales).length == 0">
                                <v-col cols=12 class="text-center rounded-pill">
                                    <span> Ningun elemento asignado.. !!</span>
                                </v-col>
                            </v-row>
                            <v-row class="mx-0" v-for="(item,k) of guia.materiales" :key="k">
                                <v-col cols="3" class="px-1">
                                    <v-row class="mx-0 my-0">
                                        <span>{{item.codigo}}</span><v-spacer></v-spacer><span>{{item.cantidad}}</span><span>{{item.um}}</span>
                                    </v-row> 
                                </v-col>
                                <v-col cols="9" class="px-1">
                                    <v-row class="ma-0">
                                        <span>{{item.descripcion}}</span>  
                                        <span v-if="item.marca">~MA: {{item.marca}}</span>
                                        <span v-if="item.modelo">~MO: {{item.modelo}}</span>
                                        <span v-if="item.serie">~SE: {{item.serie}}</span>                                
                                        <v-spacer></v-spacer>
                                        <span v-if="item.peso">{{item.peso}}</span>
                                        <span>{{item.con_retorno?"true":"false"}}</span>                                       
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row class="ma-0 blue-grey lighten-4 rounded">
                                <v-col cols="3" class="pa-1">
                                    <v-row class="ma-0 my-0">
                                        <span>TOTAL: </span><v-spacer></v-spacer><span>{{total_materiales}}</span><span>UND</span>
                                    </v-row> 
                                </v-col>
                            </v-row>                         
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text class="pa-1">
                            <v-row class="ma-0">
                                <p class="text-caption font-italic mb-1">
                                    <span class="font-weight-black">F-retorno:</span>{{guia.f_retorno}}
                                </p>
                                <p class="text-caption font-italic mb-1">
                                    <span class="font-weight-black">Texto adicionales:</span>{{guia.descripcion}}
                                </p>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
        </v-col> 
    </v-row>
</template>

<script>
import {jsPDF} from "jspdf"
import moment from 'moment'
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'

// const testFont = import('fonts_maycoll/Sanseriffic.otf');


moment.locale('es')
export default {
    data:()=>({
        menu_f_retorno:false,
        material_textarea:null,
        respuesta_sunat:null,
        pdf_data:null,
        tab:null,
        data_buscar_sunat_ruc:'',
        estado_conductor_carro:true,
        //dialogos
        dialog_confirm_documento:false,
        dialog_confirm_guia:false,
        dialog_pdf:false,
        dialog_punto_entrega:false,
        dialog_motivo:false,
        dialog_destinatario:false,
        dialog_materiales:false,
        dialog_transportista:false,
        //selects
        motivo_select:[],
        motivo_items:["1. venta","2. venta sujeta a confirmacion del comprador",
                "3. compra","4. consignacion","5. devolucion",
                "6. traslado entre establecimientos de una misma empresa",
                "7. traslado de bienes para su transformacion",
                "8. recojo de bienes transformados",
                "9. traslado por emisor itinerante de comprobante de pago ",
                "10. traslado zona primaria",
                "11. importacion","12. exportacion","13. otros"],
        motivo_descripcion:"",
        material:{codigo:"05476320",
                    cantidad:4.00,
                    um:"UND",
                    descripcion:"big bag con liner de 123cm x 198cm / 1.5 TM ROYCA ASA PUENTE",
                    con_retorno:false,
                    marca:"TRUPAL",
                    modelo:"KN2341",
                    serie:"MNDF819238",
                    observacion:"",
                    peso:"15.00"},
        //data formulario proveedor 
        proveedores_select:[],
        buscar_proveedor:'',
        buscar_transportista:'',
        buscar_conductor:'',
        buscar_carro:'',
        //nuevos
        dialog_carro_nuevo:false,
        dialog_proveedor_nuevo:false,
        dialog_conductor_nuevo:false,
        conductor_nuevo:{
                nombre_conductor:'maycoll qujo condori',
                telefono:'923289173',
                licencia:'u-12331231',
                ruc:''
        },
        carro_nuevo:{
                placa_t:'ALO-390',
                mtc_t:'1587123876',
                marca_t:'NTERNATIONAL',
                placa_p:'ALA-231',
                mtc_p:'156237283',
                marca_p:'FAMECA',
                ruc:'',
        },
        proveedor_nuevo:{
                razon_social:'CAL Y CEMENTO SUR S.A.',
                direccion:'CAR. JULIACA - PUNO KM. 11 HACIENDA YUNGURA',
                ruc:'20115039262',
                numero:'S/N',
                zona:'HACIENDA YUNGURA',
                distrito:'CARACOTO',
                provincia:'SAN ROMAN',
                departamento:'PUNO',
                transporte:false
        },
        headers_carro:[{text:"placa",value:"carro_placa",width:""},
                {text:"MTC",value:"carro_mtc"},
                {text:"Marca",value:"carro_marca"}
                ],
        headers_conductor:[{text:"Licencia",value:"conductor_licencia",width:""},
                {text:"Nombres",value:"conductor_nombre"},
                {text:"Telefono",value:"conductor_telefono"}
                ],
        headers_transportista:[{text:"Ruc",value:"empresa_ruc",width:""},
                {text:"Razon social",value:"empresa_razon_social"}
                ],
        headers:[{text:"Razon social",value:"empresa_razon_social",width:""},
                {text:"Ruc",value:"empresa_ruc"},
                {text:"Direccion fiscal",value:"empresa_direccion",width:""},
                {text:"Departamento",value:"empresa_departamento"},
                {text:"Provincia",value:"empresa_provincia"},
                {text:"Distrito",value:"empresa_distrito"},
                ],
        proveedores:[
                        // {razon_social:"Cal y cemento sur S.A.1",ruc:"20115039261",direccion:"Carr. Puno-Juliaca Km-11",numero:"S/N",zona:"f. yungura",departamento:"PUNO1",distrito:"CARACOTO1",provincia:"SAN ROMAN1"},
                        {razon_social:"ADECO PERU S.A.",ruc:"20382984537",direccion:"Av. Abelardo Quiñones M-B L-8 Urb. Valencia",numero:"S/N",zona:"Urb. Valencia",departamento:"AREQUIPA",distrito:"YANAHUARA",provincia:"AREQUIPA"},
                        // {razon_social:"YURA S.A.",ruc:"20312372895",direccion:"CAR.CARRETERA A YURA KM. 26 (ESTACION YURA)",numero:"S/N",zona:"ESTACION YURA",departamento:"AREQUIPA",distrito:"YURA",provincia:"AREQUIPA"}
                    ],
        proveedores1:[],
        //datos generales de guia
        guia:{
            id:'',
            serie:'007',
            correlativo:'',
            // fecha_hoy: moment().format("dddd, DD MMMM YYYY, h:mm:ss a"),
            fecha_hoy: moment().format('Y-MM-D hh:mm:ss'),
            motivo:'',
            motivo_detalle:'',
            destinatario:{
                razon_social:'',
                direccion:'',
                ruc:'', 
            },
            datos_partida:{
                ruc:'20115039262',
                direccion:'CAR. JULIACA - PUNO KM. 11 HACIENDA YUNGURA',
                nro:'S/N',
                zona:'SIN ZONA',
                distrito:'CARACOTO',
                provincia:'SAN ROMAN',
                departamento:' PUNO'
            },
            datos_llegada:{
                direccion:'',
                nro:'',
                zona:'',
                distrito:'',
                provincia:'',
                departamento:'',
                contacto_nombre:'',
                contacto_telefono:'',
                contacto_correo:''
            },
            transportista:{
                razon_social:' ',
                ruc:'',
                nombre_conductor:'',
                telefono:'',
                licencia:'',
                placa_t:'',
                mtc_t:'',
                marca_t:'',
                placa_p:'', 
                mtc_p:'',
                marca_p:'',
            },
            materiales:[
                // {codigo:"05476320",cantidad:3.00,um:"UND",descripcion:"big bag con liner de 123cm x 198cm / 1.5 TM ROYCA ASA PUENTE",con_retorno:true,marca:"",modelo:"",serie:"",observacion:""},
                // {codigo:"05476320",cantidad:3.00,um:"UND",descripcion:"big bag con liner de 123cm x 198cm / 1.5 TM ROYCA ASA PUENTE",con_retorno:true,marca:"",modelo:"",serie:"",observacion:""},
                // {codigo:"05476320",cantidad:3.00,um:"UND",descripcion:"big bag con liner de 123cm x 198cm / 1.5 TM ROYCA ASA PUENTE",con_retorno:true,marca:"",modelo:"",serie:"",observacion:""},
                // {codigo:"05476320",cantidad:3.00,um:"UND",descripcion:"big bag con liner de 123cm x 198cm / 1.5 TM ROYCA ASA PUENTE",con_retorno:false,marca:"",modelo:"",serie:"",observacion:""},
                // {codigo:"05476320",cantidad:3.00,um:"UND",descripcion:"big bag con liner de 123cm x 198cm / 1.5 TM ROYCA ASA PUENTE",con_retorno:true,marca:"",modelo:"",serie:"",observacion:""},
                // {codigo:"05476320",cantidad:3.00,um:"UND",descripcion:"big bag con liner de 123cm x 198cm / 1.5 TM ROYCA ASA PUENTE",con_retorno:true,marca:"",modelo:"",serie:"",observacion:""}
            ],
            paquete:{
                cantidad_tipo:"",
                peso:'',
                medidas:''
            },
            retorno:false,
            f_retorno:'',
            cantidad_total:0,
            peso_total:0,
            usuario_envia:{usuario_id:"",usuario_detalle_nombre:""},
            descripcion:'',
            
        },
        transportistas:[],
        conductores:[],
        carros:[],
        usuarios:[],
        valid_buscar_proveedor_sunat:false,
        valid_nuevo_proveedor:false,
        valid_carro_nuevo:false,
        valid_conductor_nuevo:false,
        valid_material:false,
        rucRules:[
            v => !!v || 'Campo Ruc requerido',
            v => (v && v.length == 11) || 'Ruc valido de 11 caracteres',
        ],
        requiredRules:[
            v => !!v || 'Campo requerido',
        ]
    }),
    computed:{
        ...mapState(['usuario','dialogo_loader','alerta_snack','guia_actual','editar','host']),
        total_materiales:function(){
            let total=0.00
            if(this.guia.materiales){ 
                this.guia.materiales.forEach(element => {
                    total = total + parseFloat(element.cantidad)
                })
            this.asignar(total.toFixed(2))
            }
            return total.toFixed(2)
        },
    },
    watch: {
        cantidad_total: function () {
        this.guia.cantidad_total = this.total_materiales
        }
    },
    mounted(){
        // console.log(this.guia_actual)
        this.get_usuarios()
        this.asignar_valores_guia()
        console.log(this.guia)
        console.log(this.usuario)
    },
    methods:{
        ...mapMutations(['cambiar_dialogo_loader','cambiar_alerta','valores_guia_actual','cambiar_editar']),
        validar_datos_guia(){
            if(!this.guia.destinatario.ruc || this.guia.destinatario.ruc == ''){
                return false
            }
            if(!this.guia.usuario_envia || this.guia.usuario_envia.usuario_id == ''){
                return false
            }
            if(!this.guia.motivo || this.guia.motivo == ''){
                return false
            }
            return
        },
        generar_guia(){
            this.guia.usuario = this.usuario.usuario_id
            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/generar_guia',this.guia).then(resp =>{
                console.log(resp)
                this.cambiar_alerta({estado:true,color:'teal',texto:'Generado corectamente...!'})
                this.limpiar_guia()
                this.cambiar_dialogo_loader()
                 this.$router.push({name:"guias"})
            }).catch((error)=>{
                console.log(error)
                this.cambiar_dialogo_loader()
                this.cambiar_alerta({estado:true,color:'red darken-2',texto:'No guardado error servidor...!'})
            })
        },
        asignar(val){
            this.guia.cantidad_total = val
        },
        verificar(){
            console.log(this.guia.usuario_envia)
        },
        get_usuarios(){
            this.cambiar_dialogo_loader()
            
            axios.post(this.host+'api/get_usuarios').then(response => {
                let usuarios1 = response.data.data
                if(usuarios1){
                    usuarios1.forEach(element => {
                        this.usuarios.push({usuario_id:element.usuario_id,usuario_detalle_nombre:element.usuario_detalle_nombre})
                    })
                }
                this.cambiar_dialogo_loader()
            }).catch((error)=>{
                alert(error)
                this.cambiar_dialogo_loader()
                 this.cambiar_alerta({estado:true,color:'red darken-2',texto:'no usuarios servidor...!'})
            })            
        },
        asignar_transportista(){
           this.cambiar_dialogo_loader()
            if(this.guia.id||this.guia.id != ''){
                axios.post(this.host+'api/asignar_transportista',this.guia).then(response => {
                    console.log(response.data)
                    if(response.data.status == true){
                    this.cambiar_alerta({estado:true,color:'teal',texto:'Transportista asignado Doc: '+this.guia.id})
                    }else{
                    this.cambiar_alerta({estado:true,color:'red darken-2',texto:'problemas conexion servidor...!'})                        
                    }
                    this.dialog_transportista = !this.dialog_transportista
                    this.cambiar_dialogo_loader()
                }).catch((error)=>{
                    alert(error)
                    this.cambiar_dialogo_loader()
                    this.cambiar_alerta({estado:true,color:'red darken-2',texto:'problemas conexion servidor...!'})
                })
            }
            else
            {
                this.dialog_transportista = !this.dialog_transportista
            } 
        },
        asignar_valores_guia(){

            this.limpiar_guia()
            console.log(this.guia_actual)
            if(this.guia_actual){
            this.guia.id = !this.editar?this.guia_actual.venta.venta_id:''
            this.guia.serie = '007'
            this.guia.correlativo = !this.editar?this.guia_actual.venta.venta_correlativo:''
            this.guia.fecha_hoy = !this.editar?this.guia_actual.venta.venta_fecha_registro:moment().format('Y-MM-D hh:mm:ss')
            this.guia.motivo = this.guia_actual.venta.venta_motivo_nro
            this.guia.motivo_detalle = this.guia_actual.venta.venta_motivo_detalle
            this.guia.destinatario.razon_social = this.guia_actual.cliente.empresa_razon_social
            this.guia.destinatario.ruc = this.guia_actual.cliente.empresa_ruc
            this.guia.destinatario.direccion = this.guia_actual.cliente.empresa_direccion
            this.guia.datos_partida.ruc = this.guia_actual.empresa_origen.empresa_ruc
            this.guia.datos_partida.direccion = this.guia_actual.empresa_origen.empresa_direccion
            this.guia.datos_partida.nro = this.guia_actual.empresa_origen.empresa_numero
            this.guia.datos_partida.zona = this.guia_actual.empresa_origen.empresa_zona
            this.guia.datos_partida.distrito = this.guia_actual.empresa_origen.empresa_distrito
            this.guia.datos_partida.provincia = this.guia_actual.empresa_origen.empresa_provincia
            this.guia.datos_partida.departamento = this.guia_actual.empresa_origen.empresa_departamento
            this.guia.datos_llegada.direccion = this.guia_actual.venta.venta_llegada_direccion
            this.guia.datos_llegada.nro = this.guia_actual.venta.venta_llegada_nro
            this.guia.datos_llegada.zona = this.guia_actual.venta.venta_llegada_zona
            this.guia.datos_llegada.distrito = this.guia_actual.venta.venta_llegada_distrito
            this.guia.datos_llegada.provincia = this.guia_actual.venta.venta_llegada_provincia
            this.guia.datos_llegada.departamento = this.guia_actual.venta.venta_llegada_departamento
            this.guia.datos_llegada.contacto_nombre = this.guia_actual.venta.venta_contacto_nombre
            this.guia.datos_llegada.contacto_telefono = this.guia_actual.venta.venta_contacto_telefono
            this.guia.datos_llegada.contacto_correo = this.guia_actual.venta.venta_contacto_correo
            
            this.guia.transportista.razon_social = this.guia_actual.empresa_transporte?this.guia_actual.empresa_transporte.empresa_razon_social:''
            this.guia.transportista.ruc = this.guia_actual.empresa_transporte?this.guia_actual.empresa_transporte.empresa_ruc:''
            this.guia.transportista.nombre_conductor = this.guia_actual.conductor?this.guia_actual.conductor.conductor_nombre:''
            this.guia.transportista.telefono = this.guia_actual.conductor?this.guia_actual.conductor.conductor_telefono:''
            this.guia.transportista.licencia = this.guia_actual.conductor?this.guia_actual.conductor.conductor_licencia:''
            this.guia.transportista.placa_t = this.guia_actual.carro? this.guia_actual.carro.carro_placa:''
            this.guia.transportista.mtc_t = this.guia_actual.carro? this.guia_actual.carro.carro_mtc:''
            this.guia.transportista.marca_t = this.guia_actual.carro? this.guia_actual.carro.carro_marca:''
            this.guia.transportista.placa_p = this.guia_actual.carro? this.guia_actual.carro.carro_placa2:''
            this.guia.transportista.mtc_p = this.guia_actual.carro? this.guia_actual.carro.carro_mtc2:''
            this.guia.transportista.marca_p = this.guia_actual.carro? this.guia_actual.carro.carro_marca2:''
            this.guia_actual.materiales?
            this.guia_actual.materiales.forEach(element => {
                this.guia.materiales.push({codigo:element.dtventa_codigo,
                                                cantidad:element.dtventa_cantidad,
                                                um:element.dtventa_um,
                                                descripcion:element.dtventa_descripcion,
                                                con_retorno:element.dtventa_con_retorno,
                                                marca:element.dtventa_marca,
                                                modelo:element.dtventa_modelo,
                                                serie:element.dtventa_serie,
                                                peso:element.dtventa_peso,
                                                observacion:element.dtventa_observacion})
            })
            :[]

            this.guia.paquete.cantidad_tipo = this.guia_actual.venta.venta_paquete_cantidad_tipo
            this.guia.paquete.peso = this.guia_actual.venta.venta_paquete_peso
            this.guia.paquete.medidas = this.guia_actual.venta.venta_paquete_medidas
            this.guia.f_retorno = this.guia_actual.venta.venta_f_retorno
            this.guia.cantidad_total = this.guia_actual.venta.venta_cantidad_total
            this.guia.peso_total = this.guia_actual.venta.venta_peso_total
            this.guia.usuario_envia = this.guia_actual.usuario_envia
            this.guia.descripcion = this.guia_actual.venta.venta_descripcion
            }else{
                console.log(this.guia_actual)
            }
        },
        limpiar_guia(){
            if(this.guia_actual){
            this.guia.id = ''
            this.guia.serie = '007'
            this.guia.correlativo = ''
            this.guia.fecha_hoy = moment().format('Y-MM-D hh:mm:ss')
            this.guia.motivo = ''
            this.guia.motivo_detalle = ''
            this.guia.destinatario.razon_social = ''
            this.guia.destinatario.ruc = ''
            this.guia.destinatario.direccion = ''
            this.guia.datos_partida.ruc = '20115039262',
            this.guia.datos_partida.direccion = 'CAR. JULIACA - PUNO KM. 11 HACIENDA YUNGURA'
            this.guia.datos_partida.nro = 'S/N'
            this.guia.datos_partida.zona = ' HACIENDA YUNGURA'
            this.guia.datos_partida.distrito = 'CARACOTO'
            this.guia.datos_partida.provincia = 'SAN ROMAN'
            this.guia.datos_partida.departamento = 'PUNO'
            this.guia.datos_llegada.direccion = ''
            this.guia.datos_llegada.nro = ''
            this.guia.datos_llegada.zona = ''
            this.guia.datos_llegada.distrito = ''
            this.guia.datos_llegada.provincia = ''
            this.guia.datos_llegada.departamento = ''
            this.guia.datos_llegada.contacto_nombre = ''
            this.guia.datos_llegada.contacto_telefono = ''
            this.guia.datos_llegada.contacto_correo = ''
            this.guia.transportista.razon_social = ''
            this.guia.transportista.ruc = ''
            this.guia.transportista.nombre_conductor = ''
            this.guia.transportista.telefono = ''
            this.guia.transportista.licencia = ''
            this.guia.transportista.placa_t = ''
            this.guia.transportista.mtc_t = ''
            this.guia.transportista.marca_t = ''
            this.guia.transportista.placa_p = ''
            this.guia.transportista.mtc_p = ''
            this.guia.transportista.marca_p = ''

            this.guia.materiales = []
            this.guia.paquete.cantidad_tipo = ''
            this.guia.paquete.peso = ''
            this.guia.paquete.medidas = ''
            this.guia.f_retorno = ''
            this.guia.cantidad_total = ''
            this.guia.peso_total = ''
            this.guia.usuario_envia = ''
            this.guia.descripcion = ''
            }
        },
        confirmar_guardar_documento(){
            this.dialog_confirm_documento = true
        },
        confirmar_guardar_guia(){
            this.dialog_confirm_guia=true
        },
        guardar_documento(){
            
            this.guia.usuario = this.usuario.usuario_id
            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/guardar_documento',this.guia).then(resp =>{
                console.log(resp)
                this.cambiar_alerta({estado:true,color:'teal',texto:'Guardado corectamente...!'})
                this.limpiar_guia()
                this.cambiar_dialogo_loader()
                this.dialog_confirm_documento = false
                 this.$router.push({name:"guias"})
            }).catch((error)=>{
                console.log(error)
                this.cambiar_dialogo_loader()
                this.dialog_confirm_documento = false
                this.cambiar_alerta({estado:true,color:'red darken-2',texto:'No se puede guardar error servidor...!'})
            })
        },
        eliminar_material(index){
            this.guia.materiales.splice(index,1)
        },
        editar_material(index){
            // this.material=this.guia.materiales[index]
            console.log(this.guia.materiales[index])
        },
        agregar_material(){
            let mi_promesa = new Promise((resolve,reject)=>{
                try {
                    this.guia.materiales.push({codigo:this.material.codigo,
                                                cantidad:this.material.cantidad,
                                                um:this.material.um,
                                                descripcion:this.material.descripcion,
                                                con_retorno:this.material.con_retorno,
                                                marca:this.material.marca,
                                                modelo:this.material.modelo,
                                                serie:this.material.serie,
                                                peso:this.material.peso,
                                                observacion:this.material.observacion})
                    resolve()
                } catch (error) {
                    reject()
                }
            })
            mi_promesa.then(()=>{
                    this.$refs.form_material.reset()
            })
            
        },
        
        guardar_carro_nuevo(){
            this.carro_nuevo.ruc = this.guia.transportista.ruc
            
            console.log(this.carro_nuevo)
            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/guardar_carro_nuevo',this.carro_nuevo)
            .then(resp =>{
                console.log(resp)
                this.get_conductores_carros()
                let mi_promesa = new Promise((resolve, reject)=>{
                    try {
                        this.guia.transportista.placa_t = this.carro_nuevo.placa_t
                        this.guia.transportista.mtc_t = this.carro_nuevo.mtc_t
                        this.guia.transportista.marca_t =this.carro_nuevo.marca_t
                        this.guia.transportista.placa_p =this.carro_nuevo.placa_p
                        this.guia.transportista.mtc_p =this.carro_nuevo.mtc_p
                        this.guia.transportista.marca_p = this.carro_nuevo.marca_p
                        console.log("primero")  
                        resolve()
                    } catch (error) {
                        reject(error)
                    }
                })
                mi_promesa.then(()=>{
                    console.log("formulario limpiado") 
                    this.$refs.form_carro_nuevo.reset()
                }).catch((error)=>{
                    console.log(error)
                })
                  
                // this.dialog_proveedor_nuevo=false
                this.cambiar_alerta({estado:true,color:'teal',texto:'Guardado correctamente...!'})
                this.cambiar_dialogo_loader()
                
            })
            .catch(error =>{
                console.log(error)
                this.cambiar_dialogo_loader()
                 this.cambiar_alerta({estado:true,color:'red darken-2',texto:'Problemas con el servidor ...!'})
            })
        },
        guardar_conductor_nuevo(){
            this.conductor_nuevo.ruc = this.guia.transportista.ruc
            console.log(this.conductor_nuevo)
            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/guardar_conductor_nuevo',this.conductor_nuevo).then(resp =>{
                console.log(resp)
                this.get_conductores_carros()
                let mi_promesa = new Promise((resolve,reject)=>{
                    try {
                        this.guia.transportista.nombre_conductor = this.conductor_nuevo.nombre_conductor
                        this.guia.transportista.telefono = this.conductor_nuevo.telefono
                        this.guia.transportista.licencia = this.conductor_nuevo.licencia
                        resolve()
                    } catch (error) {
                        reject(error)
                    }   
                })

                mi_promesa.then(()=>{
                    this.$refs.form_conductor_nuevo.reset()
                })
                // this.dialog_proveedor_nuevo=false
                this.cambiar_alerta({estado:true,color:'teal',texto:'Guardado conductor correctamente...!'})
                this.cambiar_dialogo_loader()
            }).catch((error)=>{
                console.log(error)
                this.cambiar_dialogo_loader()
                this.cambiar_alerta({estado:true,color:'red darken-2',texto:'Sin Respuesta del servidor(conductor)...!'})
            })
        },
        get_transportita(){
            this.cambiar_dialogo_loader()
            
            axios.get(this.host+'api/transportistas').then(response => {
                this.transportistas = response.data
                this.dialog_transportista = !this.dialog_transportista
                console.log(response.data)
                this.cambiar_dialogo_loader()
            }).catch((error)=>{
                console.log(error)
                this.cambiar_dialogo_loader()
                this.cambiar_alerta({estado:true,color:'red darken-2',texto:'Sin Respuesta del servidor(transportista)...!'})
            })
        },
        prueba_reset(){
            this.$refs.form_nuevo_proveedor.reset()
        },
        buscar_sunat(){
            // this.$refs.form_buscar_proveedor_sunat.validate()
            this.cambiar_dialogo_loader()
            // let conexion = axios.crate()
            axios.post(this.host+'api/prueba_sunat',{ruc:this.data_buscar_sunat_ruc}).then(resp =>{
                this.cambiar_dialogo_loader()
                this.respuesta_sunat = resp.data.datos
                console.log(resp)
                if(resp.data.lugar == "interna"){
                     this.cambiar_alerta({estado:true,color:'teal',texto:'Elemento asignado desde BD ...!'})
                    this.guia.destinatario.razon_social = this.respuesta_sunat.empresa_razon_social
                    this.guia.destinatario.direccion = this.respuesta_sunat.empresa_direccion
                    this.guia.destinatario.ruc = this.respuesta_sunat.empresa_ruc
                    this.guia.datos_llegada.direccion = this.respuesta_sunat.empresa_direccion
                    this.guia.datos_llegada.nro = this.respuesta_sunat.empresa_numero
                    this.guia.datos_llegada.zona = this.respuesta_sunat.empresa_zona
                    this.guia.datos_llegada.distrito = this.respuesta_sunat.empresa_distrito
                    this.guia.datos_llegada.provincia = this.respuesta_sunat.empresa_provincia
                    this.guia.datos_llegada.departamento = this.respuesta_sunat.empresa_departamento
                    //ASIGNACION PARA NUEVO PROVEEDOR
                    // this.proveedor_nuevo.razon_social = this.respuesta_sunat.empresa_razon_social
                    // this.proveedor_nuevo.direccion = this.respuesta_sunat.empresa_direccion
                    // this.proveedor_nuevo.ruc = this.respuesta_sunat.empresa_ruc
                    // this.proveedor_nuevo.direccion = this.respuesta_sunat.empresa_direccion
                    // this.proveedor_nuevo.numero = this.respuesta_sunat.empresa_numero
                    // this.proveedor_nuevo.zona = this.respuesta_sunat.empresa_zona
                    // this.proveedor_nuevo.distrito = this.respuesta_sunat.empresa_distrito
                    // this.proveedor_nuevo.provincia = this.respuesta_sunat.empresa_provincia
                    // this.proveedor_nuevo.departamento = this.respuesta_sunat.empresa_departamento
                    this.$refs.form_buscar_proveedor_sunat.reset()
                        this.$refs.form_buscar_proveedor_sunat.resetValidation()
                } else{
                    if(this.respuesta_sunat.error){
                        this.cambiar_alerta({estado:true,color:'red darken-2',texto:this.respuesta_sunat.error})
                    }else{
                        this.cambiar_alerta({estado:true,color:'teal',texto:'Elemento asignado desde sunat ...!'})
                        this.guia.destinatario.razon_social = this.respuesta_sunat.nombre
                        this.guia.destinatario.direccion = this.respuesta_sunat.direccion
                        this.guia.destinatario.ruc = this.respuesta_sunat.numeroDocumento
                        this.guia.datos_llegada.direccion = this.respuesta_sunat.direccion
                        this.guia.datos_llegada.nro = this.respuesta_sunat.numero
                        this.guia.datos_llegada.zona = this.respuesta_sunat.zonaTipo
                        this.guia.datos_llegada.distrito = this.respuesta_sunat.distrito
                        this.guia.datos_llegada.provincia = this.respuesta_sunat.provincia
                        this.guia.datos_llegada.departamento = this.respuesta_sunat.departamento
                        this.$refs.form_buscar_proveedor_sunat.reset()
                        this.$refs.form_buscar_proveedor_sunat.resetValidation()
                        //asignacaion para proveedor nuevo 
                        this.proveedor_nuevo.razon_social = this.respuesta_sunat.nombre
                        this.proveedor_nuevo.direccion = this.respuesta_sunat.direccion
                        this.proveedor_nuevo.ruc = this.respuesta_sunat.numeroDocumento
                        this.proveedor_nuevo.direccion = this.respuesta_sunat.direccion
                        this.proveedor_nuevo.numero = this.respuesta_sunat.numero
                        this.proveedor_nuevo.zona = this.respuesta_sunat.zonaTipo
                        this.proveedor_nuevo.distrito = this.respuesta_sunat.distrito
                        this.proveedor_nuevo.provincia = this.respuesta_sunat.provincia
                        this.proveedor_nuevo.departamento = this.respuesta_sunat.departamento
                        this.dialog_proveedor_nuevo = true
                    }
                } 
                
            }).catch((error)=>{
                console.log(error)
                this.cambiar_dialogo_loader()
                this.cambiar_alerta({estado:true,color:'red darken-2',texto:'Sin Respuesta del servidor(Buscar Sunat)...!'})
            })
        },
        guardar_proveedor_nuevo(){
            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/nueva_empresa',this.proveedor_nuevo).then(resp =>{
                console.log(resp)
                this.guia.destinatario.razon_social = this.proveedor_nuevo.razon_social
                this.guia.destinatario.direccion = this.proveedor_nuevo.direccion
                this.guia.destinatario.ruc = this.proveedor_nuevo.ruc
                this.guia.datos_llegada.direccion = this.proveedor_nuevo.direccion
                this.guia.datos_llegada.nro = this.proveedor_nuevo.numero
                this.guia.datos_llegada.zona = this.proveedor_nuevo.zona
                this.guia.datos_llegada.distrito = this.proveedor_nuevo.distrito
                this.guia.datos_llegada.provincia = this.proveedor_nuevo.provincia
                this.guia.datos_llegada.departamento = this.proveedor_nuevo.departamento
                this.$refs.form_nuevo_proveedor.reset()
                this.dialog_proveedor_nuevo=false

                this.cambiar_alerta({estado:true,color:'teal',texto:'Guardado correctamente...!'})
                this.cambiar_dialogo_loader()
            }).catch(error =>{
                console.log(error)
                this.cambiar_dialogo_loader()
                this.cambiar_alerta({estado:true,color:'red darken-2',texto:'Sin Respuesta del servidor(Proveedor Nuevo)...!'})
            })
        },
        carro_row(item){

                this.guia.transportista.placa_t=item.carro_placa
                this.guia.transportista.mtc_t=item.carro_mtc
                this.guia.transportista.marca_t=item.carro_marca
                this.guia.transportista.placa_p=item.carro_placa2
                this.guia.transportista.mtc_p=item.carro_mtc2
                this.guia.transportista.marca_p=item.carro_marca2
        }
        ,
        conductor_row(item){
            console.log(item)
            this.guia.transportista.nombre_conductor=item.conductor_nombre
            this.guia.transportista.telefono=item.conductor_telefono
            this.guia.transportista.licencia=item.conductor_licencia
        },
        limpiar_transportista(){
                this.guia.transportista.razon_social = ''
                this.guia.transportista.ruc = ''
                this.guia.transportista.nombre_conductor = ''
                this.guia.transportista.telefono = ''
                this.guia.transportista.licencia = ''
                this.guia.transportista.placa_t = ''
                this.guia.transportista.mtc_t = ''
                this.guia.transportista.marca_t = ''
                this.guia.transportista.placa_p = '',
                this.guia.transportista.mtc_p = ''
                this.guia.transportista.marca_p = ''
        },
        transportista_row(item){
            this.limpiar_transportista()
            this.guia.transportista.razon_social = item.empresa_razon_social
            this.guia.transportista.ruc = item.empresa_ruc
            this.get_conductores_carros()
        },
        get_conductores_carros(){
            this.cambiar_dialogo_loader()
            axios.post(this.host+'api/conductores_carros',{empresa_ruc:this.guia.transportista.ruc}).then(response => {
                this.conductores = response.data.conductores
                this.carros = response.data.carros

                this.estado_conductor_carro=false
                this.cambiar_dialogo_loader()
            }).catch((error)=>{
                console.log(error)
                this.cambiar_dialogo_loader()
                this.cambiar_alerta({estado:true,color:'red darken-2',texto:'Sin Respuesta del servidor(Buscar Sunat)...!'})
            })
        },
        proveedor_row(item){
            console.log(item)
            this.guia.destinatario.razon_social=item.empresa_razon_social
            this.guia.destinatario.ruc = item.empresa_ruc
            this.guia.destinatario.direccion = item.empresa_direccion

            this.guia.datos_llegada.direccion=item.empresa_direccion,
            this.guia.datos_llegada.nro=item.empresa_numero
            this.guia.datos_llegada.zona=item.empresa_zona
            this.guia.datos_llegada.distrito=item.empresa_distrito
            this.guia.datos_llegada.provincia=item.empresa_provincia
            this.guia.datos_llegada.departamento=item.empresa_departamento
                
            this.dialog_destinatario = !this.dialog_destinatario
            this.cambiar_alerta({estado:true,color:'teal',texto:'Elemento asignado ...!'})
        },
        prueba(item){
            alert(item.razon_social)
        },
        get_proveedor(){
            this.cambiar_dialogo_loader()
            axios.get(this.host+'api/Empresas').then(response => {
                this.proveedores1 = (eval(response.data))
                console.log(response.data)
                this.dialog_destinatario = !this.dialog_destinatario
                this.cambiar_dialogo_loader()
            }).catch((error)=>{
                console.log(error)
                this.cambiar_dialogo_loader()
                this.cambiar_alerta({estado:true,color:'red darken-2',texto:'Sin Respuesta del servidor(Get proveedor)...!'})
            })
            
        },
        punto_llegada(){
            this.dialog_punto_entrega = true
        },
        pdf_prueba(){
            var x = 10
            var y = 10 
            this.dialog_pdf = true
            const doc = new jsPDF()
            // doc.getFontList({'times':['normal', 'italic',''], 'arial':['normal', 'bold',''] })
            // doc.addFont('ComicSansMS', 'Comic Sans', 'normal');
            // doc.setFont('Comic Sans');

            // doc.addFileToVFS("testFont.ttf", testFont);
            // doc.addFont("testFont.ttf", "testFont", "normal");
            // doc.setFont("testFont");
            // doc.setFont('Courier','courier','normal')
            doc.setFontSize('9')
            doc.text("G: 007-"+this.guia.correlativo,150+x,20+y)
            //DATOS DE DESTINATARIO
            doc.text(this.guia.fecha_hoy,15+x,15+y)
            doc.text(this.guia.destinatario.razon_social,10+x,20+y)
            doc.text(this.guia.destinatario.direccion,10+x,25+y)
            doc.text(this.guia.destinatario.ruc,10+x,30+y)
            //DATOS DE TRANSPORTISTA. 
            doc.text(this.guia.transportista.razon_social,130+x,28+y)
            doc.text(this.guia.transportista.ruc,130+x,33+y) 
            // PUNTO DE PARTIDA Y PUNTO DE LLEGADA 
            doc.text(this.guia.datos_partida.direccion,20+x,40+y)
            doc.text(this.guia.datos_partida.nro,30+x,45+y)
            doc.text(this.guia.datos_partida.zona,50+x,45+y)
            doc.text(this.guia.datos_partida.distrito,10+x,50+y)
            doc.text(this.guia.datos_partida.provincia,45+x,50+y)
            doc.text(this.guia.datos_partida.departamento,80+x,50+y)
            doc.text(this.guia.datos_llegada.direccion,20+x,57+y)
            doc.text(this.guia.datos_llegada.nro,30+x,62+y)
            doc.text(this.guia.datos_llegada.zona,50+x,62+y)
            doc.text(this.guia.datos_llegada.distrito,10+x,67+y, {align: 'justify',maxWidth:0})
            doc.text(this.guia.datos_llegada.provincia,45+x,67+y)
            doc.text(this.guia.datos_llegada.departamento,80+x,67+y)
            //DATOS DE VEHICULO Y CONDUCTOR
            doc.text(this.guia.transportista.nombre_conductor,15+x,75+y)
            doc.text(this.guia.transportista.licencia,15+x,80+y)
            doc.text(this.guia.transportista.placa_t,15+x,85+y)
            doc.text(this.guia.transportista.mtc_t,60+x,90+y)
            doc.text(this.guia.transportista.marca_t,15+x,95+y)
            
            doc.text(this.guia.transportista.placa_p?this.guia.transportista.placa_p:"",15+x,105+y)
            doc.text(this.guia.transportista.mtc_p?this.guia.transportista.mtc_p:"",60+x,105+y)
            doc.text(this.guia.transportista.marca_p?this.guia.transportista.marca_p:"",15+x,110+y)
            //MOTIVO DEL TRASLADO
            doc.setFontSize('8')    
            doc.text(this.guia.motivo.substring(0,3)+this.guia.motivo_detalle,110+x,110+y)
            doc.setFontSize('10')
            //LISTADO DE MATERIALES
            // codigo:"05476320",
            //         cantidad:4.00,
            //         um:"UND",
            //         descripcion:"big bag con liner de 123cm x 198cm / 1.5 TM ROYCA ASA PUENTE",
            //         con_retorno:false,
            //         marca:"TRUPAL",
            //         modelo:"KN2341",
            //         serie:"MNDF819238",
            //         observacion:"",
            //         peso:"15.00"},
            if(this.guia.materiales){
                let materiales_y = 120
                this.guia.materiales.forEach(element => {
                    materiales_y +=5
                    doc.text(element.codigo? element.codigo + '':"",15+x,materiales_y)
                    doc.text(element.cantidad? element.cantidad + '':"",40+x,materiales_y)
                    doc.text(element.um? element.um + '':"",45+x,materiales_y)
                    doc.text(element.descripcion? element.descripcion + '':"",55+x,materiales_y,{maxWidth:300,lineHeightFactor:.8,charSpace:-.2})
                     
                })
            }


            // doc.text(this.guia.datos_llegada.direccion,20+x,40+y)
            // doc.text(this.guia.datos_llegada.nro,40+x,50+y)
            // doc.text(this.guia.datos_llegada.zona,40+x,80+y)
             
            // doc.text("Hello world! Lorem ipsum dolor sit, amet consectetur adipisicing elit. At error nihil corrupti neque delectus beatae quisquam tenetur officiis mollitia totam dolore ipsam, consectetur quam, voluptatibus veniam alias id sed nisi!", 10+x,50+y,
            // {maxWidth:50,lineHeightFactor:.8,charSpace:-.1})
            // doc.autoPrint({variant: 'non-conform'});
            // doc.save('autoprint.pdf');

            // doc.createAnnotation({
            //     type: 'text',
            //     title: 'note',
            //     bounds: {
            //         x: 0,
            //         y: 0,
            //         w: 200,
            //         h: 80
            //     },
            //     contents: 'This is text annotation (closed by default)',
            //     open: false
            // });
            // doc.save('GR:'+this.guia.id+'007-'+this.guia.correlativo+'.pdf')
            this.pdf_data =  doc.output('dataurlstring',{filename: 'GR:'+this.guia.id+'007-'+this.guia.correlativo+'.pdf'})
        }
    }
}  

</script>

<style lang="scss" scoped>
.detalle_item:hover{
        background-color: rgba(0,128,128,.5);
    }
</style>
