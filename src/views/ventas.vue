<template>
    <v-row class="mx-0 mt-1">
        <v-col cols="12" sm="8" md="9" lg="9" class="px-1">
            <v-row class="mx-0 mt-1">
                <v-spacer></v-spacer>
                <v-text-field
                    label="Buscar"
                    outlined
                    rounded
                    dense
                    hide-details
                    class=""
                ></v-text-field>
            </v-row>
            <v-row class="mx-0 py-1">
                <v-col cols="6" sm="4" md="3" lg="2" v-for="(i,y) in 20" :key="y" class="">
                    <v-card >
                        <v-card-title class="pa-0">
                            <v-chip class="" @click="detalle_producto(i)" small color="teal darken-1">
                                <v-icon small class="">mdi-cogs</v-icon>
                            </v-chip>
                            <v-spacer></v-spacer>
                            <v-chip small color="cyan ligthen-1">S/ 108.50</v-chip>
                        </v-card-title>
                        <v-card-text class="px-0 pb-1">
                            <v-img
                            src="img_productos/1.jpg"
                            ></v-img>
                        </v-card-text>
                        <v-row class="mx-0">
                            <v-col cols="12" class="pa-0">
                                <v-textarea  persistent-hint rows="2" hide-details class="text-caption font-italic pa-0" v-model="productos[0].producto_nombre"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" sm="4" md="3" lg="3" class="pa-1 py-3">
            <v-card class="pa-0">
                <v-card-title class="pa-2">Ticket N° <span>1-002332</span></v-card-title>
                <v-divider></v-divider>
                <v-card-text class="px-1">
                    <v-row class="mx-0">
                        <v-col cols="12" class="px-0">
                            <v-row class="mx-0">
                                <v-col cols="12" class="pa-1 px-0">
                                    <v-card class="pa-0">
                                        <v-card-text class="py-2 px-1 text-black" align="end"><v-spacer></v-spacer> Total: S/.1230.50</v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>    
                        </v-col>    
                    </v-row>
                    <v-row class="mx-0 pt-3 font-weight-black font-italic mb-1">
                        <v-col cols="9" class="pa-0 pl-1">cnt Descripcion</v-col>
                        <v-col cols="3" class="pa-0 pr-1" align="right">subTotl</v-col>
                    </v-row>
                    <v-row class="detalle_item mx-0 my-1 font-italic text-caption" v-for="(i,y) in 20" :key="y" @click="detalle_item_venta(i)">
                        <v-col cols="9" class="pa-0 pl-1"><p class="mb-0">1843.00~Descripcion del material de la valvula derecha</p></v-col>
                        <v-col cols="3" class="pa-0 pr-1" align="right">2345.50</v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>

    </v-row>
</template>

<script>
export default {
    data:()=>({
        productos:[{producto_id:"00241",producto_nombre:"producto_1_descripcion del producto number one de ",producto_precio:124.50,producto_stock:130,producto_um:"UND"}]
    }),
    methods:{
        detalle_producto(i){
            alert("detalle de : "+i)
        },
        detalle_item_venta(i){
            alert("detalle de : "+i)
        }
    }
}
</script>

<style  scoped>
    .detalle_item:hover{
        background-color: rgba(0,128,128,.5);
    }
    textarea{
        line-height:5px;
    }
</style>