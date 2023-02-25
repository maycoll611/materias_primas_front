<template>
    <v-row class="py-1 mx-0">
        <v-col class="px-1">
            <v-data-table
            dense
            :single-expand="false"
            
            :items="items"
            :headers="header"
            mobile-breakpoint
            class="elevation-4 my-2">
            <template #[`item.actions`]="{item}">
                <v-menu
                origin="center center"
                transition="scale-transition"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-avatar
                        v-bind="attrs"
                        v-on="on" 
                        color="grey"
                        class="elevation-6"
                        size="30">
                        <v-icon small
                        >
                        mdi-folder-search
                        </v-icon>
                    </v-avatar>
                </template>

                <v-list class="pa-1">
                    <v-list-item class="pa-1 py-0">
                        <v-btn class="rounded-pill" text color="teal" @click="detalle_personal(item.id)" dense> <v-icon class="pr-1">mdi-television-guide </v-icon> Detalle</v-btn>
                    </v-list-item>
                    <v-list-item class="pa-1 py-0">
                        <v-btn class="rounded-pill" text color="warning"  @click="editar_personal(item.id)" dense> <v-icon class="pr-1">mdi-monitor-edit </v-icon> Editar</v-btn>
                    </v-list-item>
                    <v-list-item class="pa-1 py-0">
                        <v-btn class="rounded-pill" text color="red"  @click="eliminar_personal(item.id)" dense> <v-icon class="pr-1">mdi-delete-circle-outline </v-icon> Eliminar</v-btn>
                    </v-list-item>
                </v-list>
                </v-menu>
            </template>
            <!-- <template #expanded-item="{headers,item}">
                <td :colspan="headers.length">
                    <v-col align="center">
                        <v-date-picker
                            locale="es-MX"
                            header-color="teal"
                            color="primary lighten-1"
                            v-model="dates"
                            multiple
                        ></v-date-picker>
                        <v-alert color="teal lighten-3">
                            Total:{{dates.length + 'Dias * '+ item.pago +'.00 Soles'}}  S/. {{dates.length * item.pago+'.00'}}
                        </v-alert>
                    </v-col>
                </td>
            </template> -->
            </v-data-table>
            <!-- dialogo detalle de  personal -->
            <v-dialog
            v-model="dialogo_detalle"
            max-width="400"
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
                            <v-icon>mdi-phone</v-icon>
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
                                        <v-alert color="teal lighten-4" class="mb-1 font-weight-black"  >
                                            Total:{{dates.length + 'Dias * '+ 45 +'.00 Soles'}}  S/. {{dates.length * 45+'.00'}}
                                        </v-alert>
                                        <v-date-picker
                                            locale="es-MX"
                                            header-color="teal lighten-1"
                                            color="primary lighten-1"
                                            v-model="dates"
                                            no-title
                                            multiple
                                            small
                                        ></v-date-picker>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card-text>
                    <v-card-actions class="px-1">
                        <v-col align="right" class="pa-1">
                            <v-btn text color="red lighten" @click="dialogo_detalle=false"> Cancelar</v-btn>
                            <v-btn text color="teal lighten" @click=" dialogo_detalle=false ">Guardar</v-btn>
                        </v-col>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data:()=>({
        tabs:null,
        dialogo_detalle:false,
        header:[{text:"Id",value:"id",align:"d-none d-md-flex"},{text:"Nombres",value:"nombre"},{text:"Diario",value:"pago"},{text:"Op",value:"actions"}],
        items:[{id:1,nombre:"alejandro asqui",pago:40,cargo:"obrero"},
                {id:2,nombre:"Alicia santos",pago:45,cargo:"obrero"},
                {id:3,nombre:"romel agustin",pago:40,cargo:"obrero"},
                {id:4,nombre:"ronal mamamni",pago:45,cargo:"obrero"}],
        dates:["2021-02-01", "2021-02-02", "2021-02-03", "2021-02-04", "2021-02-05", "2021-02-06", "2021-02-07", "2021-02-08", "2021-02-09"],
        
    }),
    computed:{
        total(){
            return this.dates.length * 40
        }
    },
    methods:{
        detalle_personal(){
            this.dialogo_detalle=true
        }
    }
}
</script>

<style>

</style>