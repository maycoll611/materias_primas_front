<template>
    <v-row class="ma-0" align="center">
        <v-col cols=12 class="text-center">
            <v-btn-toggle
            rounded
            >
                <v-btn small color="primary">
                    <v-icon>mdi-play-circle</v-icon>Iniciar
                </v-btn>
                <v-btn small color="yellow darken-1" @click="restaurar()">
                    <v-icon>mdi-restart</v-icon>Restaurar
                </v-btn>
                <v-btn @click="ver_respuestas = !ver_respuestas"  small :color="ver_respuestas?'green lighten-1':''">
                    <v-icon>{{ver_respuestas?'mdi-eye-settings':'mdi-eye-off'}}</v-icon>Ver resp.
                </v-btn>
            </v-btn-toggle>
            
        </v-col>
        
        
        <v-col class="px-3" cols="12">
            <v-card v-if="preguntas.length != 0">
                <v-card-title align="end">
                    <v-spacer></v-spacer>
                        <v-col cols="6" md="2" class="pa-0" >
                            <v-alert dense shaped outlined type="success">
                                {{ puntaje+'/200'}}
                            </v-alert>
                        </v-col>
                        <v-col cols="6" md="2" class="pa-0" >
                            <v-alert dense shaped outlined type="error">
                                {{ puntaje_error+'/200'}}
                            </v-alert>
                        </v-col>
                </v-card-title>
                <v-card-text class="font-weight-black">
                    {{(pagina) +"._"+ preguntas[pagina-1].pregunta_descripcion}}
                    <v-img
                    v-if="preguntas[pagina-1].pregunta_img"
                    height="150"
                    contain
                    :src="'img_preguntas/'+(pagina)+'.jpg'"
                    ></v-img>
                </v-card-text>
                
                <v-card-text>
                    <v-row>
                        <v-col cols=12 disabled @click="preguntas[pagina-1].marcado?'':verificar_respuesta(pagina-1,'A')" rounded 
                        :class="[
                        (preguntas[pagina-1].pregunta_clave == preguntas[pagina-1].pregunta_respuesta1[0] && ver_respuestas)||preguntas[pagina-1].correcto == preguntas[pagina-1].pregunta_respuesta1[0]?'my-1 rounded-pill green lighten-1':'my-1 rounded-pill',
                        preguntas[pagina-1].marcado == preguntas[pagina-1].pregunta_respuesta1[0]?'my-1 rounded-pill '+preguntas[pagina-1].marcado_color:'my-1 rounded-pill ']">{{preguntas[pagina-1].pregunta_respuesta1}}</v-col>
                        <v-col cols=12 disabled @click="preguntas[pagina-1].marcado?'':verificar_respuesta(pagina-1,'B')" rounded 
                        :class="[
                        (preguntas[pagina-1].pregunta_clave == preguntas[pagina-1].pregunta_respuesta2[0] && ver_respuestas)||preguntas[pagina-1].correcto == preguntas[pagina-1].pregunta_respuesta2[0]?'my-1 rounded-pill green lighten-1':'my-1 rounded-pill',
                        preguntas[pagina-1].marcado == preguntas[pagina-1].pregunta_respuesta2[0]?'my-1 rounded-pill '+preguntas[pagina-1].marcado_color:'my-1 rounded-pill ']">{{preguntas[pagina-1].pregunta_respuesta2}}</v-col>
                        <v-col cols=12 disabled @click="preguntas[pagina-1].marcado?'':verificar_respuesta(pagina-1,'C')" rounded 
                        :class="[
                        (preguntas[pagina-1].pregunta_clave == preguntas[pagina-1].pregunta_respuesta3[0] && ver_respuestas)||preguntas[pagina-1].correcto == preguntas[pagina-1].pregunta_respuesta3[0]?'my-1 rounded-pill green lighten-1':'my-1 rounded-pill',
                        preguntas[pagina-1].marcado == preguntas[pagina-1].pregunta_respuesta3[0]?'my-1 rounded-pill '+preguntas[pagina-1].marcado_color:'my-1 rounded-pill ']">{{preguntas[pagina-1].pregunta_respuesta3}}</v-col>
                        <v-col cols=12 disabled @click="preguntas[pagina-1].marcado?'':verificar_respuesta(pagina-1,'D')" rounded 
                        :class="[
                        (preguntas[pagina-1].pregunta_clave == preguntas[pagina-1].pregunta_respuesta4[0] && ver_respuestas)||preguntas[pagina-1].correcto == preguntas[pagina-1].pregunta_respuesta4[0]?'my-1 rounded-pill green lighten-1':'my-1 rounded-pill',
                        preguntas[pagina-1].marcado == preguntas[pagina-1].pregunta_respuesta4[0]?'my-1 rounded-pill '+preguntas[pagina-1].marcado_color:'my-1 rounded-pill ']">{{preguntas[pagina-1].pregunta_respuesta4}}</v-col>
                    </v-row>
                    <!-- {{preguntas[pagina-1]}} -->
                </v-card-text>
            </v-card>
        </v-col>
        <v-col class="px-3" cols="12">
             <div class="text-center mx-5">
                <v-pagination
                v-model="pagina"
                :length="200"
                circle
                ></v-pagination>
            </div>

        </v-col>    
    </v-row>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import {mapMutations} from 'vuex'
export default {
    data:()=>({
        preguntas:[
{
"pregunta_id": 1,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "ESTA PERMITIDO EN LA VIA:",
"pregunta_respuesta1": "A) RECOGER O DEJAR PASAJEROS O CARGA EN CUALQUIER LUGAR",
"pregunta_respuesta2": "B) DEJAR ANIMALES SUELTOS O SITUARLOS DE FORMA TAL QUE OBSTACULICEN SOLO UN POCO EL TRANSITO",
"pregunta_respuesta3": "C) RECOGER O DEJAR PASAJEROS EN LUGARES AUTORIZADOS.",
"pregunta_respuesta4": "D) EJERCER EL COMERCIO AMBULATORIO O ESTACIONARIO",
"pregunta_clave": "C",
"pregunta_dificultad": "1"
},
{
"pregunta_id": 2,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "RESPECTO DE LOS DISPOSITIVOS DE CONTROL O REGULACION DEL TRANSITO:",
"pregunta_respuesta1": "A) SOLO LOS PEATONES ESTAN OBLIGADOS A SU OBEDIENCIA",
"pregunta_respuesta2": "B) LOS CONDUCTORES Y LOS PEATONES ESTAN OBLIGADOS A SU OBEDIENCIA, SALVO INSTRUCCION DE LA POLICIA NACIONAL DEL PERU ASIGNADA AL TRANSITO QUE INDIQUE LO CONTRARIO",
"pregunta_respuesta3": "C) SOLO LOS CONDUCTORES ESTAN OBLIGADOS A SU OBEDIENCIA.",
"pregunta_respuesta4": "D) LOS CONDUCTORES ESTAN OBLIGADOS A SU OBEDIENCIA, AUN CUANDO LA POLICIA NACIONAL DEL PERU ASIGNADA AL TRANSITO PUEDA INDICAR LO CONTRARIO.",
"pregunta_clave": "B",
"pregunta_dificultad": "1"
},
{
"pregunta_id": 3,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA   SEÑAL   VERTICAL   REGLAMENTARIA   R-6   PROHIBIDO   VOLTEAR   A   LA IZQUIERDA, SIGNIFICA QUE:",
"pregunta_respuesta1": "A) ESTA PROHIBIDO VOLTEAR A LA IZQUIERDA Y, POR LO TANTO TAMBIEN ESTA PROHIBIDO EL GIRO EN U.",
"pregunta_respuesta2": "B) ESTA PROHIBIDO VOLTEAR A LA IZQUIERDA, SIN EMBARGO, ESTA PERMITIDO EL GIRO EN U.",
"pregunta_respuesta3": "C) EL UNICO SENTIDO DE DESPLAZAMIENTO ES CONTINUAR DE FRENTE.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "1"
},
{
"pregunta_id": 4,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SEÑAL VERTICAL REGLAMENTARIA R-3 SIGNIFICA QUE:                     ",
"pregunta_respuesta1": "A) NOS ACERCAMOS A UNA ZONA RESTRINGIDA AL TRANSITO.",
"pregunta_respuesta2": "B) ESTA PERMITIDO ADELANTAR VEHICULOS.",
"pregunta_respuesta3": "C) EL UNICO SENTIDO DE DESPLAZAMIENTO ES CONTINUAR DE FRENTE.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA",
"pregunta_clave": "C",
"pregunta_dificultad": "1"
},
{
"pregunta_id": 5,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EN   LAS   VIAS,   LAS   MARCAS   EN   EL   PAVIMENTO   QUE   SON   DEL   TIPO CENTRAL DISCONTINUA Y DE COLOR AMARILLO SIGNIFICAN QUE:",
"pregunta_respuesta1": "A) ESTA PERMITIDO CRUZAR AL OTRO CARRIL PARA EL ADELANTAMIENTO VEHICULAR, SI ES QUE ES SEGURO HACERLO.",
"pregunta_respuesta2": "B) NO ESTA PERMITIDO CRUZAR AL OTRO CARRIL PARA EL ADELANTAMIENTO VEHICULAR.",
"pregunta_respuesta3": "C) SE ESTA REDUCIENDO EL ANCHO DE LA CALZADA DE LA VIA POR DONDE SE CIRCULA.",
"pregunta_respuesta4": "D) SE ESTA FRENTE A UN LUGAR DE CRUCE PEATONAL.",
"pregunta_clave": "A",
"pregunta_dificultad": "1"
},
{
"pregunta_id": 6,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EL COLOR AMBAR O AMARILLO DEL SEMAFORO SIGNIFICA QUE:",
"pregunta_respuesta1": "A) LOS VEHICULOS DEBEN AVANZAR.",
"pregunta_respuesta2": "B) LOS VEHICULOS DEBEN DETENERSE.",
"pregunta_respuesta3": "C) LOS VEHICULOS DEBEN ACELERAR LA MARCHA.",
"pregunta_respuesta4": "D) LOS VEHICULOS DEBEN DETENERSE ANTES DE INGRESAR A LA INTERSECCION SI SU VELOCIDAD Y UBICACION LO PERMITEN,  DE LO CONTRARIO, DEBERAN CRUZAR Y DESPEJAR LA INTERSECCION.",
"pregunta_clave": "D",
"pregunta_dificultad": "1"
},
{
"pregunta_id": 7,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LOS COLORES DEL SEMAFORO TIENEN EL SIGUIENTE SIGNIFICADO: ROJO:  AMBAR O AMARILLO:           _,  VERDE:         _.",
"pregunta_respuesta1": "A) DETENCION - PREVENCION - PASO.",
"pregunta_respuesta2": "B) DETENCION - PASO CON PREVENCION - CIRCULACION RAPIDA.",
"pregunta_respuesta3": "C) DISMINUCION DE LA VELOCIDAD - PREVENCION - PASO RAPIDO.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "1"
},
{
"pregunta_id": 8,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿QUE INDICA UNA FLECHA VERDE EN UN SEMAFORO VEHICULAR?",
"pregunta_respuesta1": "A) SE PUEDE CONTINUAR CON PRECAUCION UNICAMENTE EN LA DIRECCION DE LA FLECHA Y DESDE EL CARRIL QUE ESTA FLECHA CONTROLA.",
"pregunta_respuesta2": "B) NO ESTA PERMITIDA LA CIRCULACION EN EL SENTIDO QUE INDICA LA FLECHA.",
"pregunta_respuesta3": "C) SE DEBE RESPETAR UNICAMENTE LA LUZ CIRCULAR.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "1"
},
{
"pregunta_id": 9,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL VERTICAL REGLAMENTARIA R-53: ",
"pregunta_respuesta1": "A) PROHIBE ESTACIONAR.",
"pregunta_respuesta2": "B) PROHIBE AL CONDUCTOR DETENER EL VEHICULO DENTRO DEL AREA DE LA INTERSECCION.",
"pregunta_respuesta3": "C) PROHIBE LA CARGA Y DESCARGA.",
"pregunta_respuesta4": "D) PROHIBE LA CIRCULACION DE VEHICULOS MOTORIZADOS",
"pregunta_clave": "B",
"pregunta_dificultad": "1"
},
{
"pregunta_id": 10,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI LLEGA A UNA INTERSECCION Y VISUALIZA EL SEMAFORO CON UNA FLECHA ROJA HACIA LA IZQUIERDA Y LA LUZ CIRCULAR VERDE PRENDIDAS AL MISMO TIEMPO, LA ACCION CORRECTA ES:",
"pregunta_respuesta1": "A) AVANZAR EN CUALQUIER SENTIDO, YA QUE LA LUZ CIRCULAR ESTA EN VERDE.",
"pregunta_respuesta2": "B) AVANZAR, PERO EL GIRO A LA IZQUIERDA ESTA PROHIBIDO POR LA FLECHA ROJA.",
"pregunta_respuesta3": "C) AVANZAR UNICAMENTE HACIA LA IZQUIERDA, PUES CONTINUAR DE FRENTE ESTA PROHIBIDO.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "1"
},
{
"pregunta_id": 11,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI LLEGA A UNA INTERSECCION DONDE EL SEMAFORO MUESTRA UNA LUZ INTERMITENTE, QUE AFIRMACION ES CORRECTA:",
"pregunta_respuesta1": "A) SI LA LUZ INTERMITENTE ES ROJA, ESTA ES EQUIVALENTE A UN ¿CEDA EL PASO?",
"pregunta_respuesta2": "B) SI LA LUZ INTERMITENTE ES AMBAR, TIENE PREFERENCIA, DEBIENDO REDUCIR LA VELOCIDAD Y CONTINUAR CON PRECAUCION.",
"pregunta_respuesta3": "C) SI LA LUZ INTERMITENTE ES VERDE, ESTA ES EQUIVALENTE A UN PARE.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "1"
},
{
"pregunta_id": 12,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿LA LUZ INTERMITENTE ROJA ES IGUAL QUE UNA SEÑAL DE PARE?",
"pregunta_respuesta1": "A) VERDAD.",
"pregunta_respuesta2": "B) ES VERDAD SIEMPRE Y CUANDO TAMBIEN SE ENCUENTRE UN POLICIA DE TRANSITO INDICANDO LA SEÑAL DE PARE.",
"pregunta_respuesta3": "C) FALSO",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "1"
},
{
"pregunta_id": 13,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "AL APROXIMARSE A UNA INTERSECCION CON GIRO PERMITIDO A LA IZQUIERDA, LA CONDUCTA CORRECTA ES:",
"pregunta_respuesta1": "A) GIRAR DESDE CUALQUIER CARRIL.",
"pregunta_respuesta2": "B) COLOCARSE EN EL CARRIL DERECHO, LUEGO GIRAR CON PRECAUCION.",
"pregunta_respuesta3": "C) COLOCARSE EN EL CARRIL MAS DESPEJADO DE TRAFICO, LUEGO GIRAR CON PRECAUCION.",
"pregunta_respuesta4": "D) HACER LA SEÑAL DE VOLTEO A LA IZQUIERDA CON LAS LUCES DIRECCIONALES, UBICAR CON ANTELACION EL VEHICULO EN EL CARRIL DE CIRCULACION DE LA IZQUIERDA Y GIRAR CON PRECAUCION.",
"pregunta_clave": "D",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 14,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "AL CAMBIAR DE CARRIL EN UNA VIA DE UN SOLO SENTIDO CON MULTIPLES CARRILES, ¿CUAL ES LA CONDUCTA CORRECTA?",
"pregunta_respuesta1": "A) SE DEBEN ENCENDER LAS LUCES DIRECCIONALES PRIMERO, BUSCAR UNA BRECHA Y REALIZAR EL CAMBIO DE CARRIL CON PRECAUCION.",
"pregunta_respuesta2": "B) SE DEBE ENCONTRAR UNA BRECHA, LUEGO CAMBIAR DE CARRIL CON PRECAUCION,  NO ES NECESARIO EL USO DE LUCES DIRECCIONALES PARA CAMBIOS DE CARRIL.",
"pregunta_respuesta3": "C) SE DEBE ADVERTIR UTILIZANDO EL CLAXON, IDENTIFICAR UNA BRECHA Y REALIZAR EL CAMBIO DE CARRIL CON PRECAUCION.",
"pregunta_respuesta4": "D) ESTA PROHIBIDO EL CAMBIO DE CARRIL EN VIAS DE UN SOLO SENTIDO.",
"pregunta_clave": "A",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 15,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "RESPECTO A LOS CRUCES A NIVEL CON VIAS FERREAS, SEÑALE LA AFIRMACION CORRECTA:",
"pregunta_respuesta1": "A) LOS VEHICULOS QUE TRANSITAN POR LA VIA FERREA TIENEN PREFERENCIA DE PASO SOBRE LOS QUE TRANSITAN POR LA VIA QUE LA CRUZA.",
"pregunta_respuesta2": "B) LOS VEHICULOS QUE TRANSITAN POR LA VIA QUE CRUZA LA  LINEA  FERREA TIENEN PREFERENCIA  DE PASO SOBRE LOS QUE TRANSITAN POR LA VIA FERREA.",
"pregunta_respuesta3": "C)  EL  VEHICULO  QUE   LLEGUE PRIMERO TIENE PREFERENCIA.",
"pregunta_respuesta4": "D) TIENE PREFERENCIA EL CONDUCTOR QUE VIENE POR LA DERECHA DEL OTRO.",
"pregunta_clave": "A",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 16,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "ANTE LA SEÑAL DE COLOR ROJO DEL SEMAFORO Y LA INDICACION DE CONTINUAR LA MARCHA DEL EFECTIVO DE LA POLICIA NACIONAL DEL PERU ASIGNADO AL CONTROL DEL TRANSITO, CORRESPONDE:",
"pregunta_respuesta1": "A)DETENERSE    HASTA    QUE CAMBIE A LUZ VERDE.",
"pregunta_respuesta2": "B) CONTINUAR LA MARCHA.",
"pregunta_respuesta3": "C) ESTAR PREVENIDO.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 17,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "ESTA PROHIBIDO ESTACIONAR UN VEHICULO:",
"pregunta_respuesta1": "A) EN LAS CURVAS.",
"pregunta_respuesta2": "B) DENTRO DE UNA INTERSECCION.",
"pregunta_respuesta3": "C) FRENTE A LA ENTRADA DE GARAJES Y DE RECINTOS MILITARES O POLICIALES.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "D",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 18,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL VERTICAL REGLAMENTARIA (R-29): ",
"pregunta_respuesta1": "A) PROHIBE EL USO DE LA BOCINA EN VIAS URBANAS.",
"pregunta_respuesta2": "B) PROHIBE EL USO DE LA BOCINA EN CARRETERAS.",
"pregunta_respuesta3": "C) PROHIBE EL USO DE LA BOCINA.",
"pregunta_respuesta4": "D) PROHIBE HACER RUIDO.",
"pregunta_clave": "C",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 19,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SE LE IMPONDRA EL PAGO DE UNA MULTA Y NO PODRA OBTENER LA LICENCIA DE CONDUCIR POR 3 AÑOS A LA PERSONA QUE:",
"pregunta_respuesta1": "A) CONDUZCA UN VEHICULO AUTOMOTOR SIN TENER LICENCIA DE CONDUCIR.",
"pregunta_respuesta2": "B) CONDUZCA UN VEHICULO QUE NO CUENTE CON EL EQUIPAMIENTO PARA BRINDAR UNA MAXIMA COMODIDAD A SUS OCUPANTES.",
"pregunta_respuesta3": "C) CONDUZCA UN VEHICULO SIN CONTAR CON EL SOAT.",
"pregunta_respuesta4": "D) A Y C SON CORRECTAS",
"pregunta_clave": "A",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 20,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EN EL SUPUESTO QUE SE ENCUENTRE MANEJANDO Y UN VEHICULO QUE TIENE LA INTENCION DE SOBREPASARLO O ADELANTARLO LO ALCANCE, ¿QUE DEBERIA HACER USTED?",
"pregunta_respuesta1": "A) DEBE AUMENTAR LA VELOCIDAD PARA NO DEJAR QUE EL OTRO VEHICULO LO PASE.",
"pregunta_respuesta2": "B) NO DEBE AUMENTAR LA VELOCIDAD HASTA QUE EL VEHICULO LO SOBREPASE.",
"pregunta_respuesta3": "C) DEBE DISMINUIR DRASTICAMENTE LA VELOCIDAD DE SU VEHICULO.",
"pregunta_respuesta4": "D) DEBE DETENER SU VEHICULO.",
"pregunta_clave": "B",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 21,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿CUAL DE LAS SIGUIENTES AFIRMACIONES ES CORRECTA?",
"pregunta_respuesta1": "A) EL CONDUCTOR DEBE RESPETAR LOS LIMITES MAXIMOS Y MINIMOS DE VELOCIDAD ESTABLECIDOS.",
"pregunta_respuesta2": "B) EL CONDUCTOR DEBE RESPETAR UNICAMENTE LOS LIMITES MAXIMOS DE VELOCIDAD, PUES NO EXISTEN LIMITES MINIMOS.",
"pregunta_respuesta3": "C) EL CONDUCTOR PUEDE CONDUCIR A LA VELOCIDAD QUE DESEE, SIEMPRE QUE LO HAGA DE MANERA PRUDENTE.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 22,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿QUE LUCES DEBE UTILIZAR UN CONDUCTOR QUE CIRCULA EN LAS VIAS PUBLICAS URBANAS POR LA NOCHE?",
"pregunta_respuesta1": "A) BAJAS.",
"pregunta_respuesta2": "B) ALTAS.",
"pregunta_respuesta3": "C) LUCES ALTAS EN LAS INTERSECCIONES Y BAJAS EN LAS AVENIDAS.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 23,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EN CASO DE ACCIDENTES, EL SOAT CUBRE LOS DAÑOS QUE SUFREN:",
"pregunta_respuesta1": "A) SOLO LOS OCUPANTES DEL VEHICULO.",
"pregunta_respuesta2": "B) LOS OCUPANTES Y TERCEROS NO OCUPANTES DEL VEHICULO.",
"pregunta_respuesta3": "C) SOLO TERCEROS AFECTADOS.",
"pregunta_respuesta4": "D) SOLO EL CONDUCTOR DEL VEHICULO.",
"pregunta_clave": "B",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 24,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿CUAL DE LOS SIGUIENTES SEGUROS ES EXIGIBLE PARA CONDUCIR UN VEHICULO AUTOMOTOR?",
"pregunta_respuesta1": "A) CUALQUIER TIPO DE SEGURO DE ACCIDENTES PERSONALES QUE COMERCIALICEN LAS EMPRESAS DE SEGURO.",
"pregunta_respuesta2": "B) CUALQUIER TIPO DE SEGURO VEHICULAR, SIEMPRE QUE CUBRA A LOS OCUPANTES DEL VEHICULO Y TERCEROS AFECTADOS POR UN ACCIDENTE DE TRANSITO.",
"pregunta_respuesta3": "C) EL SEGURO OBLIGATORIO DE ACCIDENTES DE TRANSITO - SOAT.",
"pregunta_respuesta4": "D) NO ES OBLIGATORIO CONTAR CON UN SEGURO.",
"pregunta_clave": "C",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 25,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "CUANDO ES OBLIGATORIO DARLE PREFERENCIA DE PASO A UN VEHICULO DE EMERGENCIA O VEHICULO OFICIAL:",
"pregunta_respuesta1": "A) CUANDO EMITA SEÑALES VISIBLES.",
"pregunta_respuesta2": "B) CUANDO EMITA SEÑALES AUDIBLES.",
"pregunta_respuesta3": "C) CUANDO EMITA SEÑALES AUDIBLES Y VISIBLES.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 26,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI POR EL CARRIL POR DONDE ESTA CONDUCIENDO SE APROXIMA A UN VEHICULO DE TRANSPORTE ESCOLAR QUE SE ENCUENTRA DETENIDO, RECOGIENDO O DEJANDO ESCOLARES ¿QUE DEBE HACER?",
"pregunta_respuesta1": "A) DETENER EL VEHICULO Y NO CONTINUAR LA MARCHA HASTA QUE HAYA CULMINADO EL ASCENSO O DESCENSO DE LOS ESCOLARES.",
"pregunta_respuesta2": "B) ADELANTAR POR EL LADO IZQUIERDO, PERO CON PRECAUCION.",
"pregunta_respuesta3": "C) TOCAR EL CLAXON PARA ALERTAR QUE ESTA PASANDO.",
"pregunta_respuesta4": "D) ADELANTAR MUY DESPACIO.",
"pregunta_clave": "A",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 27,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿QUE SIGNIFICA UN TRIANGULO ROJO DE SEGURIDAD COLOCADO EN LA CALZADA?",
"pregunta_respuesta1": "A) LA PRESENCIA DE UN VEHICULO INMOVILIZADO EN LA VIA PUBLICA POR ALGUNA CIRCUNSTANCIA.",
"pregunta_respuesta2": "B)    ZONA    DE    OBRAS    POR REPARACION EN LA CALZADA.",
"pregunta_respuesta3": "C)  QUE  EL  VEHICULO  QUE  LO ENFRENTA DEBE DETENERSE.",
"pregunta_respuesta4": "D) A Y C SON CORRECTAS.",
"pregunta_clave": "A",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 28,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL VERTICAL REGLAMENTARIA P-22C INDICA QUE: ",
"pregunta_respuesta1": "A) ESTA PERMITIDO ADELANTAR.",
"pregunta_respuesta2": "B) SE APROXIMA UN CARRIL ADICIONAL.",
"pregunta_respuesta3": "C) ESTA PERMITIDO CAMBIAR DE CARRIL.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 29,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LAS LUCES INTERMITENTES DE EMERGENCIA DEL VEHICULO DEBEN UTILIZARSE OBLIGATORIAMENTE:",
"pregunta_respuesta1": "A) PARA GIRAR EN LAS INTERSECCIONES Y PARA ADVERTIR LOS CAMBIOS DE CARRIL.",
"pregunta_respuesta2": "B) PARA INDICAR LA DETENCION, PARADA O ESTACIONAMIENTO EN ZONA PELIGROSA O LA EJECUCION DE MANIOBRAS RIESGOSAS.",
"pregunta_respuesta3": "C) DURANTE TODA LA CIRCULACION DEL VEHICULO.",
"pregunta_respuesta4": "D) EN CADA INTERSECCION.",
"pregunta_clave": "B",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 30,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EN INTERSECCIONES QUE NO TIENEN SEÑALES DE PARE, CEDA EL PASO O SEMAFORO, LAS VIAS DE DOBLE SENTIDO TIENEN PRIORIDAD DE PASO RESPECTO A LAS VIAS DE UN SOLO SENTIDO DE IGUAL CLASIFICACION?",
"pregunta_respuesta1": "A) NO.",
"pregunta_respuesta2": "B) SI.",
"pregunta_respuesta3": "C) DEPENDE DE LA INTERSECCION.",
"pregunta_respuesta4": "D)      NO      SE      ENCUENTRA REGULADO EN EL REGLAMENTO.",
"pregunta_clave": "B",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 31,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI USTED SE APROXIMA A UNA SEÑAL DE PARE COLOCADA VERTICALMENTE O PINTADA EN LA VIA, LA ACCION CORRECTA ES:",
"pregunta_respuesta1": "A) DISMINUIR SU VELOCIDAD Y CEDERLE EL PASO A LOS VEHICULOS QUE CIRCULAN POR LA TRANSVERSAL.",
"pregunta_respuesta2": "B) DISMINUIR SU VELOCIDAD Y PASAR CON CUIDADO.",
"pregunta_respuesta3": "C) SOBRE PARAR Y PASAR RAPIDAMENTE.",
"pregunta_respuesta4": "D) PARAR POR COMPLETO, CEDER EL PASO A LOS USUARIOS QUE TENGAN PREFERENCIA Y LUEGO CONTINUAR CON PRECAUCION.",
"pregunta_clave": "D",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 32,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿CUAL ES LA DIFERENCIA ENTRE LAS SEÑALES P-2A Y P-1A? ",
"pregunta_respuesta1": "A) NO HAY DIFERENCIA, SE USAN INDISTINTAMENTE.",
"pregunta_respuesta2": "B) LA SEÑAL P-2A SE UTILIZA EN SITUACIONES DE MAYOR RIESGO.",
"pregunta_respuesta3": "C) LA SEÑAL P-1A ADVIERTE LA PRESENCIA DE CURVA PRONUNCIADA A LA DERECHA MIENTRAS QUE LA P-2A ADVIERTE LA PRESENCIA DE CURVA SUAVE A LA DERECHA.",
"pregunta_respuesta4": "D) LA SEÑAL P-2A ADVIERTE LA PRESENCIA DE CURVA PRONUNCIADA A LA DERECHA MIENTRAS QUE LA P-1A ADVIERTE LA PRESENCIA DE CURVA SUAVE A LA DERECHA.",
"pregunta_clave": "C",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 33,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿QUE INDICA LA SEÑAL R-30F?",
"pregunta_respuesta1": "A) TENER PRECAUCION CON VEHICULOS LENTOS.",
"pregunta_respuesta2": "B) REGULA LA VELOCIDAD MAXIMA PERMITIDA EN CURVAS.",
"pregunta_respuesta3": "C) REGULA LA VELOCIDAD MAXIMA EN ZONAS RURALES.",
"pregunta_respuesta4": "D)      NO      SE      ENCUENTRA REGULADA EN EL REGLAMENTO.",
"pregunta_clave": "B",
"pregunta_dificultad": "2"
},
{
"pregunta_id": 34,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿QUE SEÑAL DEBE UTILIZAR EL CONDUCTOR PARA DISMINUIR LA VELOCIDAD O DETENER EL VEHICULO CUANDO ESTA EN MARCHA?",
"pregunta_respuesta1": "A) LUCES DIRECCIONALES.",
"pregunta_respuesta2": "B) SOLO EL ANTEBRAZO IZQUIERDO Y MANO EXTENDIDOS HACIA ABAJO FUERA DEL VEHICULO.",
"pregunta_respuesta3": "C) LUCES INTERMITENTES Y, EN CASO DE FUERZA MAYOR, UTILIZAR EL ANTEBRAZO IZQUIERDO Y MANO EXTENDIDOS HACIA ABAJO FUERA DEL VEHICULO, HACIENDO ANGULO RECTO CON EL BRAZO.",
"pregunta_respuesta4": "D) LUCES BAJAS.",
"pregunta_clave": "C",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 35,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI DOS VEHICULOS SE APROXIMAN SIMULTANEAMENTE A UNA INTERSECCION NO REGULADA (SIN SEÑALIZACION) PROCEDENTES DE VIAS DIFERENTES, ¿QUIEN TIENE PREFERENCIA DE PASO?",
"pregunta_respuesta1": "A) CUALQUIERA DE LOS DOS.",
"pregunta_respuesta2": "B) EL QUE SE APROXIME POR LA DERECHA DEL OTRO.",
"pregunta_respuesta3": "C) EL QUE SE APROXIME POR LA IZQUIERDA DEL OTRO.",
"pregunta_respuesta4": "D)   EL   QUE   HAGA   SONAR   LA BOCINA PRIMERO.",
"pregunta_clave": "B",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 36,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EN UNA INTERSECCION NO REGULADA (SIN SEÑALIZACION) TIENE PREFERENCIA DE PASO:",
"pregunta_respuesta1": "A)  EL  VEHICULO  QUE  INGRESO PRIMERO A LA INTERSECCION.",
"pregunta_respuesta2": "B) EL VEHICULO QUE HAGA SONAR LA BOCINA PRIMERO.",
"pregunta_respuesta3": "C) EL VEHICULO QUE HAGA CAMBIO DE LUCES PRIMERO.",
"pregunta_respuesta4": "D) CUALQUIER VEHICULO",
"pregunta_clave": "A",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 37,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EN UNA ROTONDA, TIENE PRIORIDAD DE PASO EL VEHICULO QUE:",
"pregunta_respuesta1": "A) QUIERE INGRESAR A LA ROTONDA.",
"pregunta_respuesta2": "B) CIRCULA POR ELLA.",
"pregunta_respuesta3": "C) ACELERA PRIMERO.",
"pregunta_respuesta4": "D) HACE SONAR LA BOCINA.",
"pregunta_clave": "B",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 38,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EL SOBREPASO O ADELANTAMIENTO DE UN VEHICULO EN MOVIMIENTO SE EFECTUA, SALVO EXCEPCIONES, POR LA_____________  RETORNANDO EL VEHICULO DESPUES DE LA MANIOBRA A SU CARRIL ORIGINAL.",
"pregunta_respuesta1": "A) DERECHA.",
"pregunta_respuesta2": "B) IZQUIERDA.",
"pregunta_respuesta3": "C) BERMA",
"pregunta_respuesta4": "D) POR LA DERECHA O IZQUIERDA.",
"pregunta_clave": "B",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 39,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI  UN  CONDUCTOR  ESTA  TOMANDO  MEDICAMENTOS  Y  POR  ELLO  SIENTE SUEÑO ¿QUE DEBE HACER?",
"pregunta_respuesta1": "A) MANEJAR NORMALMENTE.",
"pregunta_respuesta2": "B) MANEJAR DESPACIO.",
"pregunta_respuesta3": "C) ABSTENERSE DE MANEJAR.",
"pregunta_respuesta4": "D) MANEJAR CON UN COPILOTO.",
"pregunta_clave": "C",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 40,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SON DOCUMENTOS QUE DEBEN PORTARSE OBLIGATORIAMENTE, DURANTE LA CONDUCCION DEL VEHICULO, Y EXHIBIRSE CUANDO LA AUTORIDAD COMPETENTE LO SOLICITE:",
"pregunta_respuesta1": "A) DOCUMENTO DE IDENTIDAD, SOAT VIGENTE (PUEDE SER VIRTUAL) Y TARJETA DE IDENTIFICACION VEHICULAR.",
"pregunta_respuesta2": "B) CERTIFICADO DE INSPECCION TECNICA VEHICULAR Y CONTRATO DE COMPRAVENTA DEL VEHICULO.",
"pregunta_respuesta3": "C)             CONTRATO             DE COMPRAVENTA DEL VEHICULO.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "A",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 41,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EN LOS TRAMOS DE UNA VIA CON PENDIENTE PRONUNCIADA, QUE PERMITE LA CIRCULACION DE UN SOLO VEHICULO, SE DEBE DE TENER EN CUENTA QUE EL VEHICULO QUE ASCIENDE RESPECTO AL VEHICULO QUE DESCIENDE:",
"pregunta_respuesta1": "A) NO TIENE PREFERENCIA DE PASO.",
"pregunta_respuesta2": "B) TIENE PREFERENCIA DE PASO.",
"pregunta_respuesta3": "C) DEBE DETENERSE.",
"pregunta_respuesta4": "D) DEBE RETROCEDER.",
"pregunta_clave": "B",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 42,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "AL CAMBIAR DE DIRECCION, UN CONDUCTOR DEBE:",
"pregunta_respuesta1": "A) SEÑALIZAR TODA LA MANIOBRA HASTA SU CULMINACION.",
"pregunta_respuesta2": "B) CAMBIAR DE DIRECCION Y LUEGO SEÑALIZAR.",
"pregunta_respuesta3": "C) NO EXISTE NINGUNA OBLIGACION.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 43,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿SE PUEDE CONDUCIR UN VEHICULO CON EL MOTOR EN PUNTO NEUTRO?",
"pregunta_respuesta1": "A)   SI,   PERO   SOLO   SI   ESTA BAJANDO UNA PENDIENTE.",
"pregunta_respuesta2": "B) NO, ESTA PROHIBIDO.",
"pregunta_respuesta3": "C) SI, EN CASO DE QUE EL CONDUCTOR NO SEA NOVATO.",
"pregunta_respuesta4": "D) NO SE ENCUENTRA REGULADO EN LA NORMA.",
"pregunta_clave": "B",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 44,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "PARA GIRAR O CAMBIAR DE CARRIL HACIA LA DERECHA, EL CONDUCTOR DEBE UTILIZAR LAS LUCES DIRECCIONALES Y, EN CASOS DE FUERZA MAYOR, LA SIGUIENTE SEÑAL MANUAL:",
"pregunta_respuesta1": "A) BRAZO, ANTEBRAZO IZQUIERDO Y MANO EXTENDIDOS HACIA AFUERA DEL VEHICULO.",
"pregunta_respuesta2": "B) ANTEBRAZO IZQUIERDO Y MANO EXTENDIDOS HACIA ARRIBA FUERA DEL VEHICULO, FORMANDO UN ANGULO RECTO CON EL BRAZO.",
"pregunta_respuesta3": "C) BRAZO, ANTEBRAZO DERECHO Y MANO EXTENDIDOS HACIA AFUERA DEL VEHICULO.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 45,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI LA LICENCIA DE CONDUCIR NO SE ENCUENTRA VIGENTE, LOS VEHICULOS QUE AUTORIZA A CONDUCIR DICHA LICENCIA:",
"pregunta_respuesta1": "A) NO PODRAN SER CONDUCIDOS.",
"pregunta_respuesta2": "B) PODRAN SER CONDUCIDOS UNICAMENTE EN ZONAS URBANAS.",
"pregunta_respuesta3": "C) PODRAN SER CONDUCIDOS HASTA POR 90 DIAS POSTERIORES A LA PERDIDA DE VIGENCIA DE LA LICENCIA.",
"pregunta_respuesta4": "D) PODRAN SER CONDUCIDOS CON NORMALIDAD HASTA QUE RENUEVE SU LICENCIA.",
"pregunta_clave": "A",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 46,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "DE ACUERDO CON EL SISTEMA DE CONTROL DE LICENCIAS DE CONDUCIR POR PUNTOS:",
"pregunta_respuesta1": "A) DETERMINADAS INFRACCIONES SUMAN PUNTOS.",
"pregunta_respuesta2": "B) UNA INFRACCION PUEDE SUMAR O DISMINUIR PUNTOS, A ELECCION DEL INFRACTOR.",
"pregunta_respuesta3": "C)                      DETERMINADAS INFRACCIONES RESTAN PUNTOS.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 47,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿CUAL ES LA CONSECUENCIA DE ACUMULAR 100 PUNTOS EN LA LICENCIA DE CONDUCIR EN UN PERIODO DE 24 MESES?",
"pregunta_respuesta1": "A) SUSPENSION DE LICENCIA DE CONDUCIR.",
"pregunta_respuesta2": "B) ANULACION DE LA PLACA UNICA NACIONAL DE RODAJE.",
"pregunta_respuesta3": "C) INHABILITACION DEFINITIVA PARA OBTENER UNA LICENCIA DE CONDUCIR.",
"pregunta_respuesta4": "D) INTERNAMIENTO VEHICULAR.",
"pregunta_clave": "A",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 48,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SE ENTIENDE POR CARRIL A LA:",
"pregunta_respuesta1": "A) PARTE DE LA VIA DESTINADA A LA CIRCULACION DE PEATONES.",
"pregunta_respuesta2": "B) PARTE DE LA CALZADA DESTINADA AL TRANSITO DE UNA FILA DE VEHICULOS.",
"pregunta_respuesta3": "C) VIA RURAL DESTINADA A LA CIRCULACION DE  PEATONES Y ANIMALES.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "B",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 49,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SE ENTIENDE POR LINEA DE PARADA A:",
"pregunta_respuesta1": "A) LA LINEA TRANSVERSAL MARCADA EN LA CALZADA ANTES DE LA INTERSECCION, QUE INDICA AL CONDUCTOR EL LIMITE PARA DETENER EL VEHICULO.",
"pregunta_respuesta2": "B) LAS LINEAS QUE SE ENCUENTRAN EN LOS LUGARES DEL ESTACIONAMIENTO.",
"pregunta_respuesta3": "C) EL LUGAR UTILIZADO PARA EMBARCAR Y DESEMBARCAR PASAJEROS.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "A",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 50,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL VERTICAL REGLAMENTARIA P-17A, INDICA:                      ",
"pregunta_respuesta1": "A) REDUCCION DE LA CALZADA AL LADO DERECHO.",
"pregunta_respuesta2": "B) REDUCCION DE LA CALZADA AL LADO IZQUIERDO.",
"pregunta_respuesta3": "C) REDUCCION DE LA CALZADA EN AMBOS LADOS.",
"pregunta_respuesta4": "D) ENSANCHAMIENTO DE LA CALZADA EN AMBOS LADOS.",
"pregunta_clave": "C",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 51,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EN CASO DE ENCONTRAR MARCACION DE DOBLE LINEA AMARILLA COMPUESTA POR UN TRAZO CONTINUO Y OTRO TRAZO DISCONTINUO EN UNA VIA DE DOBLE SENTIDO, ¿QUE SE DEBE HACER?",
"pregunta_respuesta1": "A) SE PUEDE ADELANTAR EN AMBOS SENTIDOS.",
"pregunta_respuesta2": "B) NO ESTA PERMITIDO ADELANTAR EN NINGUN SENTIDO.",
"pregunta_respuesta3": "C) RESPETAR LA LINEA QUE ESTA DE SU LADO (SI ES CONTINUA, NO ADELANTAR,  SI ES DISCONTINUA, ESTA PERMITIDO ADELANTAR).",
"pregunta_respuesta4": "D) RESPETAR LA LINEA QUE ESTA DE SU LADO (SI ES DISCONTINUA, NO ADELANTAR,  SI      ES      CONTINUA,      ESTA PERMITIDO ADELANTAR)",
"pregunta_clave": "C",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 52,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SE DEFINE COMO ZONA RIGIDA AL:",
"pregunta_respuesta1": "A) AREA DONDE SE PROHIBE LA CIRCULACION DE VEHICULOS.",
"pregunta_respuesta2": "B) AREA DONDE SE PROHIBE LA CIRCULACION DE PEATONES.",
"pregunta_respuesta3": "C) AREA DE LA VIA EN LA QUE SE PROHIBE EL ESTACIONAMIENTO DE VEHICULOS.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "C",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 53,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA POSICION DE FRENTE O DE ESPALDAS EJECUTADA POR EL EFECTIVO DE LA POLICIA NACIONAL DEL PERU ASIGNADO AL CONTROL DE TRANSITO SIGNIFICA:",
"pregunta_respuesta1": "A) OBLIGACION DE DETENERSE DE QUIEN ASI LO ENFRENTE.",
"pregunta_respuesta2": "B) CONTINUAR LA  MARCHA POR EL CARRIL IZQUIERDO DE LA CALZADA.",
"pregunta_respuesta3": "C) CONTINUAR LA MARCHA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 54,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SIEMPRE QUE NO EXISTA UNA SEÑAL DE LIMITE DE VELOCIDAD, EN ZONAS URBANAS EL LIMITE MAXIMO DE VELOCIDAD EN CALLES Y JIRONES ES DE:",
"pregunta_respuesta1": "A) 30KM/H.",
"pregunta_respuesta2": "B) 40KM/H.",
"pregunta_respuesta3": "C) 60KM/H.",
"pregunta_respuesta4": "D) 80KM/H.",
"pregunta_clave": "B",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 55,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SIEMPRE QUE NO EXISTA UNA SEÑAL DE LIMITE DE VELOCIDAD, EN ZONAS URBANAS EL LIMITE MAXIMO DE VELOCIDAD EN AVENIDAS ES DE:",
"pregunta_respuesta1": "A) 30KM/H.",
"pregunta_respuesta2": "B) 40KM/H.",
"pregunta_respuesta3": "C) 60KM/H.",
"pregunta_respuesta4": "D) 80KM/H.",
"pregunta_clave": "C",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 56,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SIEMPRE QUE NO EXISTA UNA SEÑAL DE LIMITE DE VELOCIDAD, EN ZONAS URBANAS EL LIMITE MAXIMO DE VELOCIDAD EN VIAS EXPRESAS ES DE:",
"pregunta_respuesta1": "A) 60KM/H.",
"pregunta_respuesta2": "B) 70KM/H.",
"pregunta_respuesta3": "C) 80KM/H.",
"pregunta_respuesta4": "D) 100KM/H.",
"pregunta_clave": "C",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 57,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SIEMPRE QUE NO EXISTA UNA SEÑAL DE LIMITE DE VELOCIDAD EN ZONAS URBANAS, EL LIMITE MAXIMO DE VELOCIDAD EN ZONA ESCOLAR ES DE:",
"pregunta_respuesta1": "A) 20KM/H.",
"pregunta_respuesta2": "B) 30KM/H.",
"pregunta_respuesta3": "C) 35KM/H.",
"pregunta_respuesta4": "D) 50KM/H.",
"pregunta_clave": "B",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 58,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SIEMPRE QUE NO EXISTA UNA SEÑAL DE LIMITE DE VELOCIDAD EN CARRETERAS, EL LIMITE MAXIMO DE VELOCIDAD PARA AUTOMOVILES, CAMIONETAS Y MOTOCICLETAS ES DE:",
"pregunta_respuesta1": "A) 80KM/H.",
"pregunta_respuesta2": "B) 90KM/H.",
"pregunta_respuesta3": "C) 100KM/H.",
"pregunta_respuesta4": "D) 110KM/H.",
"pregunta_clave": "C",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 59,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SIEMPRE QUE NO EXISTA UNA SEÑAL DE LIMITE DE VELOCIDAD MINIMA, EL LIMITE MINIMO DE VELOCIDAD EN ZONA URBANA Y EN CARRETERAS ES DE:",
"pregunta_respuesta1": "A) 30KM/H.",
"pregunta_respuesta2": "B) LA MITAD DE LA VELOCIDAD MAXIMA ESTABLECIDA PARA CADA TIPO DE VIA.",
"pregunta_respuesta3": "C) 20 KM/H.",
"pregunta_respuesta4": "D) 15 KM/H.",
"pregunta_clave": "B",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 60,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿CUAL ES LA SANCION POR CONDUCIR CON PRESENCIA DE ALCOHOL EN LA SANGRE EN PROPORCION MAYOR A LO PREVISTO EN EL CODIGO PENAL, O BAJO LOS EFECTOS DE ESTUPEFACIENTES, NARCOTICOS Y/O ALUCINOGENOS COMPROBADOS CON EL EXAMEN RESPECTIVO, O POR NEGARSE AL MISMO Y QUE HAYA PARTICIPADO EN UN ACCIDENTE DE TRANSITO?",
"pregunta_respuesta1": "A) MULTA.",
"pregunta_respuesta2": "B) CANCELACION DE LICENCIA DE CONDUCIR.",
"pregunta_respuesta3": "C) SUSPENSION DE LA LICENCIA DE CONDUCIR.",
"pregunta_respuesta4": "D) MULTA, CANCELACION DE LA LICENCIA DE CONDUCIR E INHABILITACION DEFINITIVA PARA OBTENER UNA LICENCIA DE CONDUCIR.",
"pregunta_clave": "D",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 61,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿CUAL ES LA SANCION SI EN UN OPERATIVO DE ALCOHOLEMIA USTED ES INTERVENIDO Y SE COMPRUEBA QUE HA CONSUMIDO ALCOHOL POR ENCIMA DEL LIMITE LEGAL, O ESTA CONDUCIENDO BAJO LOS EFECTOS DE ESTUPEFACIENTES, NARCOTICOS Y/O ALUCINOGENOS COMPROBADA CON EL EXAMEN RESPECTIVO?",
"pregunta_respuesta1": "A) UNA MULTA",
"pregunta_respuesta2": "B) LA SUSPENSION DE LA LICENCIA DE CONDUCIR.",
"pregunta_respuesta3": "C) MULTA Y SUSPENSION DE LA LICENCIA DE CONDUCIR POR 3 AÑOS.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "3"
},
{
"pregunta_id": 62,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA FRECUENCIA DE LA INSPECCION TECNICA DE UN VEHICULO PARTICULAR ES:",
"pregunta_respuesta1": "A) CADA MEDIO AÑO.",
"pregunta_respuesta2": "B) CADA AÑO.",
"pregunta_respuesta3": "C) CADA DOS AÑOS.",
"pregunta_respuesta4": "D) CADA TRES AÑOS.",
"pregunta_clave": "B",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 63,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿A PARTIR DE QUE AÑO DE ANTIGUEDAD DEBE REALIZARSE LA INSPECCION TECNICA DE UN VEHICULO PARTICULAR PARA TRANSPORTE DE PERSONAS DE HASTA 9 ASIENTOS INCLUIDO EL CONDUCTOR DE LA CATEGORIA M1?",
"pregunta_respuesta1": "A) A PARTIR DEL SEGUNDO AÑO CONTADO DESDE EL AÑO SIGUIENTE DE SU FABRICACION.",
"pregunta_respuesta2": "B) A PARTIR DEL CUARTO AÑO CONTADO DESDE EL AÑO SIGUIENTE DE SU FABRICACION.",
"pregunta_respuesta3": "C) A PARTIR DEL QUINTO AÑO CONTADO DESDE EL AÑO SIGUIENTE DE SU FABRICACION.",
"pregunta_respuesta4": "D)     NO     ESTA     SUJETO     A INSPECCION TECNICA.",
"pregunta_clave": "B",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 64,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿CUAL ES EL PLAZO DE VIGENCIA DEL SOAT?",
"pregunta_respuesta1": "A) 1 AÑO.",
"pregunta_respuesta2": "B) 6 MESES.",
"pregunta_respuesta3": "C) 4 AÑOS.",
"pregunta_respuesta4": "D) 2 AÑOS.",
"pregunta_clave": "A",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 65,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI OCURRE UN ACCIDENTE DE TRANSITO, ¿QUE OBLIGACION TIENE EL CONDUCTOR, EL PROPIETARIO DEL VEHICULO O EL PRESTADOR DEL SERVICIO DE TRANSPORTE?",
"pregunta_respuesta1": "A) DAR AVISO A LOS BOMBEROS.",
"pregunta_respuesta2": "B)   DAR   AVISO   SOLO   A   LA COMPAÑIA DE SEGUROS.",
"pregunta_respuesta3": "C) DAR AVISO A LA COMPAÑIA DE SEGUROS Y DEJAR CONSTANCIA EN LA DELEGACION DE LA POLICIA NACIONAL DEL PERU MAS CERCANA.",
"pregunta_respuesta4": "D) DAR AVISO UNICAMENTE A LA POLICIA NACIONAL DEL PERU.",
"pregunta_clave": "C",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 66,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI UNA LICENCIA DE CONDUCIR CONSIGA ALGUNA RESTRICCION, ES CORRECTO AFIRMAR QUE:",
"pregunta_respuesta1": "A) DICHA RESTRICCION ES MERAMENTE INFORMATIVA.",
"pregunta_respuesta2": "B) ES UNA OBLIGACION CUMPLIR CON LA RESTRICCION.",
"pregunta_respuesta3": "C) INCUMPLIR LA RESTRICCION NO GENERA UN RIESGO PARA LA SEGURIDAD VIAL.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 67,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SEÑAL PREVENTIVA P-33A, SIGNIFICA:",
"pregunta_respuesta1": "A) SEÑAL DE CURVA SINUOSA.",
"pregunta_respuesta2": "B) SEÑAL DE PROXIMIDAD A UN BADEN.",
"pregunta_respuesta3": "C) SEÑAL DE PROXIMIDAD DE UN REDUCTOR DE VELOCIDAD TIPO RESALTO.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 68,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI SU VEHICULO DEJA DE FUNCIONAR O COMIENZA A TENER PROBLEMAS Y USTED TRATA DE MOVERLO AL COSTADO DE LA AUTOPISTA, DEBE:",
"pregunta_respuesta1": "A) ACTIVAR LAS LUCES INTERMITENTES DE EMERGENCIA.",
"pregunta_respuesta2": "B) PARAR EN SU POSICION ACTUAL.",
"pregunta_respuesta3": "C) SALIR DEL VEHICULO RAPIDAMENTE.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 69,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿ESTA PERMITIDO USAR LA BOCINA DE SU VEHICULO PARA ADVERTIR AL CONDUCTOR DEL VEHICULO QUE CIRCULA DELANTE, QUE SERA ADELANTADO?",
"pregunta_respuesta1": "A) SI, SIEMPRE Y CUANDO EL SONIDO NO SEA ESTRIDENTE.",
"pregunta_respuesta2": "B) SI, SALVO PROHIBICION EXPRESA   MEDIANTE   LA CORRESPONDIENTE  SEÑAL.",
"pregunta_respuesta3": "C) NO, ESTA PROHIBIDO.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 70,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI OBSERVA QUE SE APROXIMA UNA AMBULANCIA SIN LAS LUCES ESPECIALES ENCENDIDAS Y SIN SIRENA, ES CORRECTO AFIRMAR QUE:",
"pregunta_respuesta1": "A) NO ESTAMOS OBLIGADOS A DARLE PREFERENCIA DE PASO.",
"pregunta_respuesta2": "B) ESTAMOS OBLIGADOS A DARLE PRIORIDAD DE PASO POR SER UNA AMBULANCIA.",
"pregunta_respuesta3": "C) ESTA INFORMANDO QUE ESTA EN SERVICIO DE URGENCIA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 71,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI SE ENCUENTRA EN UNA INTERSECCION Y SE ENCIENDE LA LUZ VERDE DEL SEMAFORO Y OBSERVA QUE EN LA CALLE TRANSVERSAL HAY VEHICULOS O PERSONAS DESPEJANDO LA INTERSECCION, ¿que DEBE HACER?",
"pregunta_respuesta1": "A) NO INICIAR LA MARCHA HASTA QUE EL VEHICULO O LAS PERSONAS TERMINEN DE CRUZAR.",
"pregunta_respuesta2": "B) TOCAR EL CLAXON PARA QUE SE APUREN EN PASAR.",
"pregunta_respuesta3": "C) BAJAR DEL VEHICULO Y RECLAMAR LA FALTA AL INFRACTOR.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 72,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EN SEÑALETICA VIAL, EL COLOR _  __EN EL PAVIMENTO ES UTILIZADO PARA CARRILES DE TRAFICO EN SENTIDO OPUESTO Y EL COLOR ______ EN EL PAVIMENTO ES UTILIZADO COMO SEPARADOR DE CARRILES DE TRAFICO EN EL MISMO SENTIDO.",
"pregunta_respuesta1": "A) AMARILLO - BLANCO.",
"pregunta_respuesta2": "B) BLANCO - AMARILLO.",
"pregunta_respuesta3": "C) AZUL - ROJO.",
"pregunta_respuesta4": "D) ROJO - AMARILLO.",
"pregunta_clave": "A",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 73,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI UNA FILA DE ESCOLARES CRUZA LA CALZADA FUERA DEL CRUCERO PEATONAL, ¿que ACCION SE DEBE TOMAR?",
"pregunta_respuesta1": "A) ADVERTIR CON EL CLAXON.",
"pregunta_respuesta2": "B) ADVERTIR A VIVA VOZ.",
"pregunta_respuesta3": "C) PARAR Y CEDER EL PASO.",
"pregunta_respuesta4": "D) CONTINUAR LA MARCHA LENTAMENTE.",
"pregunta_clave": "C",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 74,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI SE APROXIMA A UNA ZONA ESCOLAR, ¿que ACCION DEBE REALIZAR?",
"pregunta_respuesta1": "A) NO TIENE NINGUNA OBLIGACION SI NO HAY SEÑALIZACION.",
"pregunta_respuesta2": "B) DISMINUIR LA VELOCIDAD A 40 KM/H.",
"pregunta_respuesta3": "C) DISMINUIR LA VELOCIDAD A 30 KM/H.",
"pregunta_respuesta4": "D) DISMINUIR LA VELOCIDAD A 35 KM/H.",
"pregunta_clave": "C",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 75,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "TIENEN  EL  OBJETIVO  DE  NOTIFICAR  A  LOS  USUARIOS  LAS  LIMITACIONES, PROHIBICIONES O RESTRICCIONES EN EL USO DE LA VIA.",
"pregunta_respuesta1": "A) SEÑALES REGULADORAS O DE REGLAMENTACION.",
"pregunta_respuesta2": "B) SEÑALES PREVENTIVAS.",
"pregunta_respuesta3": "C) SEÑALES INFORMATIVAS.",
"pregunta_respuesta4": "D) SEÑALES HORIZONTALES.",
"pregunta_clave": "A",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 76,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "TIENEN EL PROPOSITO DE ADVERTIR A LOS USUARIOS SOBRE LA EXISTENCIA Y NATURALEZA DE UN PELIGRO EN LA VIA.",
"pregunta_respuesta1": "A) SEÑALES REGULADORAS O DE REGLAMENTACION.",
"pregunta_respuesta2": "B) SEÑALES PREVENTIVAS.",
"pregunta_respuesta3": "C) SEÑALES INFORMATIVAS.",
"pregunta_respuesta4": "D) SEÑALES HORIZONTALES.",
"pregunta_clave": "B",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 77,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "ES UNA INFRACCION DE TRANSITO:",
"pregunta_respuesta1": "A) NO DETENERSE TOTALMENTE EN UNA SEÑAL DE PARE.",
"pregunta_respuesta2": "B) ARROJAR, DEPOSITAR O ABANDONAR OBJETOS O SUSTANCIAS EN LA VIA PUBLICA QUE DIFICULTEN LA CIRCULACION.",
"pregunta_respuesta3": "C) UTILIZAR LA BOCINA PARA LLAMAR LA ATENCION EN FORMA INNECESARIA.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "D",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 78,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿QUE DEBERIA HACER EL CONDUCTOR AL ACERCARSE A UNA SEÑAL DE CEDA EL PASO EN UNA INTERSECCION?",
"pregunta_respuesta1": "A)   CEDER   EL   PASO   A   LOS VEHICULOS DE EMERGENCIA.",
"pregunta_respuesta2": "B) MANTENER LA VELOCIDAD Y AVANZAR CON CUIDADO.",
"pregunta_respuesta3": "C) DISMINUIR LA VELOCIDAD, PARAR SI ES NECESARIO Y CEDER EL PASO A LOS PEATONES O VEHICULOS QUE CIRCULAN POR LA VIA TRANSVERSAL.",
"pregunta_respuesta4": "D) PARAR TOTALMENTE Y LUEGO AVANZAR CON CUIDADO.",
"pregunta_clave": "C",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 79,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "NO SE DEBE CONDUCIR UN VEHICULO:",
"pregunta_respuesta1": "A) SI NO SE CUENTA CON EL SOAT.",
"pregunta_respuesta2": "B) EN RETROCESO, SALVO LAS EXCEPCIONES  QUE ESTABLECE LA NORMA.",
"pregunta_respuesta3": "C) SI NO SE TIENE LA LICENCIA PARA EL TIPO DE VEHICULO QUE SE QUIERE CONDUCIR.",
"pregunta_respuesta4": "D) TODAS SON CORRECTAS.",
"pregunta_clave": "D",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 80,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿QUE DEBE HACER SI SE APROXIMA A UNA INTERSECCION SIN SEMAFORO Y SIN PRESENCIA DE LA POLICIA DE TRANSITO, Y OBSERVA QUE UN PEATON ESTA CRUZANDO POR EL PASO PEATONAL?",
"pregunta_respuesta1": "A) DISMINUIR LA VELOCIDAD Y PASAR CON CUIDADO.",
"pregunta_respuesta2": "B) DETENER EL VEHICULO Y CEDER EL PASO AL PEATON.",
"pregunta_respuesta3": "C)  CONTINUAR  PORQUE  USTED TIENE LA PRIORIDAD.",
"pregunta_respuesta4": "D) INCREMENTAR LA VELOCIDAD PARA ADELANTAR EL CRUCE EL PEATON.",
"pregunta_clave": "B",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 81,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SOBRE  EL  USO  DEL  CINTURON  DE  SEGURIDAD  EN  LOS  VEHICULOS  QUE SE ENCUENTRAN EN CIRCULACION, ES CORRECTO AFIRMAR QUE:",
"pregunta_respuesta1": "A) EL USO DEL CINTURON DE SEGURIDAD ES OBLIGATORIO PARA LAS PERSONAS QUE OCUPEN LOS ASIENTOS DELANTEROS.",
"pregunta_respuesta2": "B) EN LOS ASIENTOS POSTERIORES EL USO DEL CINTURON DE SEGURIDAD ES OBLIGATORIO EN TODOS LOS VEHICULOS CUANDO LOS TENGAN INCORPORADOS DE FABRICA Y EN LOS CASOS EN QUE, DE ACUERDO A LAS NORMAS SE ENCUENTREN OBLIGADOS A TENERLOS.",
"pregunta_respuesta3": "C) EL USO DEL CINTURON DE SEGURIDAD NO SOLO ES OBLIGATORIO PARA EL CONDUCTOR.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "D",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 82,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI EN UNA VIA DE DOS CARRILES CON TRANSITO EN UN MISMO SENTIDO USTED SE DESPLAZA LENTAMENTE EN SU VEHICULO, DEBE CIRCULAR POR EL CARRIL DE LA   _____       Y LOS VEHICULOS QUE CIRCULEN A MAYOR VELOCIDAD DEBEN HACERLO POR EL CARRIL DE LA ___",
"pregunta_respuesta1": "A) IZQUIERDA / DERECHA.",
"pregunta_respuesta2": "B) DERECHA / DERECHA.",
"pregunta_respuesta3": "C) DERECHA / IZQUIERDA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 83,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SOBRE EL USO DE LA BOCINA DEL VEHICULO, ES CORRECTO AFIRMAR QUE:",
"pregunta_respuesta1": "A) EL CONDUCTOR DEBE TRATAR DE NO UTILIZAR LA BOCINA PARA LLAMAR LA ATENCION EN FORMA INNECESARIA.",
"pregunta_respuesta2": "B) EL USO DE LA BOCINA PARA LLAMAR LA ATENCION EN FORMA INNECESARIA NO ES UNA INFRACCION AL TRANSITO.",
"pregunta_respuesta3": "C) EL CONDUCTOR UNICAMENTE    DEBE UTILIZAR LA BOCINA PARA EVITAR SITUACIONES PELIGROSAS.",
"pregunta_respuesta4": "D) A Y B SON CORRECTAS.",
"pregunta_clave": "C",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 84,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "UNA LINEA BLANCA CONTINUA EN EL SENTIDO LONGITUDINAL DE UNA VIA, QUE SE COLOCA EN EL PAVIMENTO, LE INDICA AL CONDUCTOR:",
"pregunta_respuesta1": "A) QUE SE PUEDE ADELANTAR, DEBIDO A QUE LA LINEA NO ES AMARILLA CONTINUA.",
"pregunta_respuesta2": "B) QUE ESTA PROHIBIDO CRUZAR LA LINEA Y NO HAY EXCEPCIONES.",
"pregunta_respuesta3": "C) QUE ESTA PROHIBIDO PASAR AL OTRO LADO DE LA LINEA CON ALGUNAS EXCEPCIONES.",
"pregunta_respuesta4": "D) QUE ES ZONA DE PEATONES.",
"pregunta_clave": "C",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 85,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿CUAL ES EL NUMERO MAXIMO DE PERSONAS QUE PUEDE TRANSPORTAR UN VEHICULO PARTICULAR?",
"pregunta_respuesta1": "A) ES IGUAL AL NUMERO DE ASIENTOS SEÑALADOS EN LA TARJETA DE IDENTIFICACION VEHICULAR, CON LA EXCEPCION DE NIÑOS EN BRAZOS EN LOS ASIENTOS POSTERIORES.",
"pregunta_respuesta2": "B) NO EXISTE PROHIBICION SOBRE UN NUMERO MAXIMO DE PERSONAS QUE SE PUEDE TRANSPORTAR.",
"pregunta_respuesta3": "C) LA RESTRICCION SOBRE UN NUMERO MAXIMO DE PERSONAS QUE SE PUEDE TRANSPORTAR SE APLICA PARA LOS ASIENTOS DELANTEROS, PARA LOS ASIENTOS POSTERIORES NO HAY RESTRICCION.",
"pregunta_respuesta4": "D) SE PUEDE TRANSPORTAR A TODAS LAS PERSONAS QUE ENTREN EN EL VEHICULO, SIN RESTRICCION, SIEMPRE Y CUANDO NO OBSTACULICEN LA VISIBILIDAD DEL CONDUCTOR Y TODOS SEAN DE LA MISMA FAMILIA.",
"pregunta_clave": "A",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 86,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA ACCION CORRECTA AL ABASTECER DE COMBUSTIBLE SU VEHICULO, ES:",
"pregunta_respuesta1": "A) ASEGURARSE DE QUE TODOS LOS PASAJEROS PERMANEZCAN A BORDO DEL VEHICULO.",
"pregunta_respuesta2": "B) ABSTENERSE DE FUMAR TANTO EL CONDUCTOR COMO SUS ACOMPAÑANTES.",
"pregunta_respuesta3": "C) MANTENER ENCENDIDO EL MOTOR DEL VEHICULO.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "B",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 87,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "MIENTRAS USTED ESTA CONDUCIENDO SU VEHICULO AUTOMOTOR, ¿PUEDE LLEVAR SUJETO A SU AUTO AL CONDUCTOR DE UNA BICICLETA MIENTRAS ESTE LA CONDUCE?",
"pregunta_respuesta1": "A) SI, SIEMPRE Y CUANDO EL CONDUCTOR DE LA BICICLETA SE SUJETE A LA PARTE POSTERIOR DEL AUTO, PERO NUNCA A LA PARTE LATERAL DE ESTE.",
"pregunta_respuesta2": "B) SI, SIEMPRE Y CUANDO SE PREVEAN TODAS LAS MEDIDAS DE SEGURIDAD RESPECTIVAS.",
"pregunta_respuesta3": "C) SI, SIEMPRE Y CUANDO ESTA ACCION SEA REALIZADA A UNA VELOCIDAD NO MAYOR A",
"pregunta_respuesta4": "D) NO, ES UNA ACCION PROHIBIDA Y QUIEN LA COMETA PUEDE SER SANCIONADO CON UNA MULTA.",
"pregunta_clave": "D",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 88,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI  USTED  DESEA  REALIZAR  UNA  COMPETENCIA  DE  CARRERAS  ENTRE  SU VEHICULO Y OTRO VEHICULO MOTORIZADO,  PARA ELLO PUEDE UTILIZAR:",
"pregunta_respuesta1": "A) LAS VIAS ALEDAÑAS DEL PARQUE DEL DISTRITO EN EL CUAL RESIDE, EN EL HORARIO DE 11:00 PM. A 5:00 AM.",
"pregunta_respuesta2": "B) UN CIRCUITO DE CARRERA, AUTODROMO O PISTA DE ACELERACION AUTORIZADO POR LA AUTORIDAD COMPETENTE.",
"pregunta_respuesta3": "C) LAS VIAS ALEDAÑAS DEL PARQUE DEL DISTRITO EN EL CUAL RESIDE, SIEMPRE Y CUANDO TENGA EL PERMISO MUNICIPAL CORRESPONDIENTE.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "B",
"pregunta_dificultad": "4"
},
{
"pregunta_id": 89,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SEÑALE CUALES DE LAS SIGUIENTES CONDUCTAS CONSTITUYE UNA INFRACCION AL TRANSITO:",
"pregunta_respuesta1": "A) TENER LA PUERTA, CAPOT O MALETERA DEL VEHICULO ABIERTA, CUANDO EL VEHICULO ESTA EN MARCHA.",
"pregunta_respuesta2": "B) CONDUCIR UN VEHICULO LENTAMENTE POR EL CARRIL DE LA IZQUIERDA CAUSANDO CONGESTION.",
"pregunta_respuesta3": "C) CONDUCIR UN VEHICULO CON EL MOTOR EN PUNTO NEUTRO O APAGADO.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 90,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA MARCAS EN EL PAVIMENTO CONSTITUYEN UN ELEMENTO INDISPENSABLE PARA LA OPERACION VEHICULAR, PUES SU FUNCION ES:",
"pregunta_respuesta1": "A) REEMPLAZAR A LA SEÑALIZACION VERTICAL CUANDO ESTA NO SE ENCUENTRA EN LA VIA, POR TAL MOTIVO SON COLOCADAS DONDE NO EXISTE SEÑALES VERTICALES.",
"pregunta_respuesta2": "B) GUIAR A LOS USUARIOS UNICAMENTE EN LAS VIAS QUE PRESENTAN PELIGROS.",
"pregunta_respuesta3": "C) REGLAMENTAR LA CIRCULACION, ASI COMO ADVERTIR Y GUIAR A LOS USUARIOS DE LA VIA.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 91,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LAS MARCAS EN EL PAVIMENTO  DE COLOR  ______  COMPLEMENTAN LAS SEÑALES INFORMATIVAS, COMO POR EJEMPLO LAS ZONAS DE ESTACIONAMIENTO PARA PERSONAS CON MOVILIDAD REDUCIDA.",
"pregunta_respuesta1": "A) BLANCO.",
"pregunta_respuesta2": "B) AZUL.",
"pregunta_respuesta3": "C) ROJO.",
"pregunta_respuesta4": "D) GRIS.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 92,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA LINEA CENTRAL DE COLOR AMARILLO EN EL PAVIMENTO ES CONTINUA CUANDO:",
"pregunta_respuesta1": "A) NO ESTA PERMITIDO CRUZAR AL OTRO CARRIL.",
"pregunta_respuesta2": "B) ESTA PERMITIDO CRUZAR AL OTRO CARRIL PARA EL ADELANTAMIENTO.",
"pregunta_respuesta3": "C) SE TRATA DE UNA VIA DE DOBLE SENTIDO DE CIRCULACION, QUE PERMITE CRUZAR AL OTRO CARRIL.",
"pregunta_respuesta4": "D) SEPARA CORRIENTES DE TRAFICO EN EL MISMO SENTIDO.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 93,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI UN CONDUCTOR QUE CIRCULA POR EL CARRIL DERECHO DE UNA VIA SE ENCUENTRA CON LAS FLECHAS INCLINADAS QUE SE MUESTRAN EN LA FIGURA, SU CONDUCTA CORRECTA ES: ",
"pregunta_respuesta1": "A) CONTINUAR LA CIRCULACION POR EL CARRIL EN QUE SE ENCUENTRA.",
"pregunta_respuesta2": "B) ADELANTAR AL VEHICULO QUE SE ENCUENTRA DELANTE DE EL  Y QUE CIRCULA POR EL CARRIL IZQUIERDO.",
"pregunta_respuesta3": "C) NO ADELANTAR AL VEHICULO QUE TIENE ADELANTE Y QUE CIRCULA POR EL CARRIL IZQUIERDO Y CONTINUAR POR SU CARRIL.",
"pregunta_respuesta4": "D) CAMBIARSE AL CARRIL IZQUIERDO CON PRECAUCION.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 94,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI DURANTE LA CONDUCCION VEHICULAR, UN EFECTIVO DE LA POLICIA DE TRANSITO LE SOLICITA AL CONDUCTOR SOMETERSE A UNA PRUEBA DE ALCOHOLEMIA,  LA ACCION CORRECTA DEL CONDUCTOR ES:",
"pregunta_respuesta1": "A) SOMETERSE A LA PRUEBA DE ALCOHOLEMIA, YA QUE ESTA OBLIGADO A ELLO ANTE LA SOLICITUD DEL EFECTIVO DE LA POLICIA DE TRANSITO.",
"pregunta_respuesta2": "B) SOMETERSE O NEGARSE A LA PRUEBA DE ALCOHOLEMIA, YA QUE NO CONSTITUYE UNA OBLIGACION DEL CONDUCTOR REALIZARSE DICHA PRUEBA.",
"pregunta_respuesta3": "C) NEGARSE A LA PRUEBA DE ALCOHOLEMIA, YA QUE UNICAMENTE ES EXIGIBLE SI HA PARTICIPADO EN UN ACCIDENTE DE TRANSITO.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 95,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿CUAL DE LAS SIGUIENTES CONDUCTAS NO ES UNA INFRACCION DE TRANSITO?",
"pregunta_respuesta1": "A) LLEVAR LAS PLACAS DE RODAJE EN EL LUGAR QUE NO CORRESPONDE.",
"pregunta_respuesta2": "B) SEGUIR A LOS VEHICULOS DE EMERGENCIA Y VEHICULOS OFICIALES PARA AVANZAR MAS RAPIDAMENTE.",
"pregunta_respuesta3": "C) ARROJAR OBJETOS EN LA VIA PUBLICA QUE DIFICULTEN LA CIRCULACION.",
"pregunta_respuesta4": "D) DETENERSE TOTALMENTE EN UNA SEÑAL DE PARE CUANDO NO HAY PEATONES Y/O VEHICULOS CIRCULANDO POR LA VIA TRANSVERSAL.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 96,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI UN CONDUCTOR SALE DE SU PROPIEDAD Y TIENE QUE CRUZAR LA ACERA E INGRESAR A UNA VIA, LA CONDUCTA CORRECTA ES:",
"pregunta_respuesta1": "A) DAR PREFERENCIA DE PASO SOLO A LOS VEHICULOS QUE CIRCULAN POR LA VIA, PERO NO A LOS PEATONES.",
"pregunta_respuesta2": "B) DAR PREFERENCIA DE PASO A LOS VEHICULOS QUE CIRCULAN POR LA VIA Y A LOS PEATONES QUE CIRCULAN POR LA ACERA.",
"pregunta_respuesta3": "C) TOCAR EL CLAXON PARA ADVERTIR A LOS PEATONES QUE CIRCULEN POR LA ACERA, QUE SE DETENGAN.",
"pregunta_respuesta4": "D) SALIR RAPIDAMENTE, A FIN DE EVITAR ACCIDENTES.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 97,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿QUE SIGNIFICA UNA LINEA CONTINUA BLANCA PINTADA ENTRE EL CARRIL DE LA DERECHA Y LA BERMA DE UNA CARRETERA?",
"pregunta_respuesta1": "A) UN CARRIL PARA MOTOCICLETAS.",
"pregunta_respuesta2": "B) UNA LINEA QUE DIVIDE EL AREA PEATONAL Y EL AREA DE VEHICULOS.",
"pregunta_respuesta3": "C) UNA LINEA QUE PUEDE CRUZARSE PARA REBASAR EN CASO DE CONGESTION.",
"pregunta_respuesta4": "D) QUE NO SE DEBE CONDUCIR ATRAVESANDOLA, AL MENOS QUE HAYA UNA SITUACION DE EMERGENCIA.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 98,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI MANEJA DE NOCHE, HUBIERA NEBLINA Y TUVIERA LUCES ROMPENIEBLAS, DEBE UTILIZAR:",
"pregunta_respuesta1": "A) LAS LUCES BAJAS JUNTO CON LAS ROMPENIEBLAS.",
"pregunta_respuesta2": "B) SOLO LAS LUCES ALTAS.",
"pregunta_respuesta3": "C) SOLO LAS LUCES BAJAS.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 99,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EN EL CASO REPRESENTADO EN EL SIGUIENTE GRAFICO ¿EL VEHICULO ROJO PUEDE REBASAR AL AZUL?",
"pregunta_respuesta1": "A) PUEDE HACERLO SI NO VIENE UN VEHICULO EN EL SENTIDO CONTRARIO.",
"pregunta_respuesta2": "B) PUEDE HACERLO SOLO SI, EL VEHICULO EN SENTIDO CONTRARIO ESTA LEJOS Y ALCANZA HACER LA MANIOBRA CON SEGURIDAD.",
"pregunta_respuesta3": "C) NO PUEDE HACERLO.",
"pregunta_respuesta4": "D) PUEDE HACERLO POR LA IZQUIERDA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 100,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (R-17), SIGNIFICA: ",
"pregunta_respuesta1": "A) PROHIBIDO ESTACIONAR.",
"pregunta_respuesta2": "B) PROHIBIDA LA CIRCULACION DE VEHICULOS AUTOMOTORES.",
"pregunta_respuesta3": "C) PROHIBIDA LA CIRCULACION DE AUTOS PARTICULARES.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 101,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI USTED SE ENCUENTRA CONDUCIENDO SU VEHICULO POR UNA VIA Y ANTES DE CRUZAR LA INTERSECCION SE ENCUENTRA CON LA SEÑAL R-4, ESTA LE INDICA:",
"pregunta_respuesta1": "A) QUE LA CALLE ESTA CLAUSURADA.",
"pregunta_respuesta2": "B) QUE ESTA POR INGRESAR A UNA VIA DE SENTIDO CONTRARIO Y NO DEBE ENTRAR.",
"pregunta_respuesta3": "C) QUE DEBE PARAR TOTALMENTE ANTES DE PODER INGRESAR.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 102,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P- 36), SIGNIFICA:",
"pregunta_respuesta1": "A) PROXIMIDAD DE UN TUNEL.",
"pregunta_respuesta2": "B) SUPERFICIE DESLIZANTE.",
"pregunta_respuesta3": "C) PRENDER LAS LUCES BAJAS.",
"pregunta_respuesta4": "D) MANTENER LA DISTANCIA ENTRE VEHICULOS POR SEGURIDAD.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 103,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (R- 14), SIGNIFICA:",
"pregunta_respuesta1": "A) CIRCULAR POR EL CARRIL DE LA DERECHA.",
"pregunta_respuesta2": "B) CIRCULAR POR EL CARRIL CENTRAL.",
"pregunta_respuesta3": "C) CIRCULAR SOLO EN EL SENTIDO INDICADO POR LA FLECHA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 104,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI USTED CIRCULA POR UNA VIA Y SE ENCUENTRA CON LA SEÑAL (R-11A) , ESTA LE INDICA:",
"pregunta_respuesta1": "A) QUE ES UNA VIA DE TRES CARRILES DE UN SOLO SENTIDO.",
"pregunta_respuesta2": "B) QUE ES UNA VIA DE TRES CARRILES Y USTED PUEDE UTILIZAR SOLO UNO DE ELLOS.",
"pregunta_respuesta3": "C) QUE ES UNA VIA DE TRES CARRILES Y USTED PUEDE UTILIZAR LOS DOS DE LA DERECHA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 105,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (R-30C) , SIGNIFICA:",
"pregunta_respuesta1": "A) QUE LA VELOCIDAD MAXIMA DE LA VIA ES DE 50 KM/H.",
"pregunta_respuesta2": "B) QUE LA VELOCIDAD MINIMA DE LA VIA ES DE 50 KM/H.",
"pregunta_respuesta3": "C) QUE AL SALIR DE LA VIA POR DONDE ESTA CIRCULANDO, LA VELOCIDAD MAXIMA ES 50 KM/H.",
"pregunta_respuesta4": "D) QUE AL SALIR DE LA VIA POR DONDE ESTA CIRCULANDO, LA VELOCIDAD MINIMA ES 50 KM/H.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 106,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (R-5-4), SIGNIFICA:",
"pregunta_respuesta1": "A) QUE LA VIA NO CONTINUA Y LOS CONDUCTORES DEBEN GIRAR A LA IZQUIERDA.",
"pregunta_respuesta2": "B) QUE LA INTERSECCION CONTEMPLA GIROS TANGENTES A LA IZQUIERDA EN AMBOS SENTIDOS.",
"pregunta_respuesta3": "C) QUE LA INTERSECCION ESTA EN MANTENIMIENTO Y QUE POR EL MOMENTO SOLO SE PUEDE GIRAR A LA IZQUIERDA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 107,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (R-9), SIGNIFICA: ",
"pregunta_respuesta1": "A) QUE NO ESTA PERMITIDO GIRAR EN U.",
"pregunta_respuesta2": "B)  QUE  ESTA  PERMITIDO  EL GIRO EN U.",
"pregunta_respuesta3": "C) QUE SI DESEA PUEDE GIRAR A LA IZQUIERDA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 108,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (R-5-2), SIGNIFICA: ",
"pregunta_respuesta1": "A) QUE LA VIA SOLO PERMITE GIRAR A LA IZQUIERDA.",
"pregunta_respuesta2": "B) PREVENCION POR BIFURCACION DE LA VIA.",
"pregunta_respuesta3": "C) QUE EL CARRIL POR DONDE CIRCULA PERMITE GIRAR A LA IZQUIERDA O SEGUIR DE FRENTE.",
"pregunta_respuesta4": "D) NO ES UNA SEÑAL VALIDA EN EL PERU.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 109,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (R-20), SIGNIFICA: ",
"pregunta_respuesta1": "A) QUE EL PEATON ANTES DE CRUZAR DEBE MIRAR SI SE ACERCAN AUTOS POR LA DERECHA.",
"pregunta_respuesta2": "B) QUE EL CONDUCTOR QUE VIENE POR LA DERECHA DEBE TENER CUIDADO CON LOS PEATONES.",
"pregunta_respuesta3": "C) QUE LOS PEATONES DEBEN CIRCULAR POR LA IZQUIERDA.",
"pregunta_respuesta4": "D) QUE LOS PEATONES DEBEN CIRCULAR POR LA DERECHA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 110,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (R-40), SIGNIFICA:",
"pregunta_respuesta1": "A) CRUCERO TIPO CEBRA.",
"pregunta_respuesta2": "B) CONTROL POLICIAL.",
"pregunta_respuesta3": "C) PAVIMENTO DESLIZANTE.",
"pregunta_respuesta4": "D) CIRCULAR CON LUCES BAJAS.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 111,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (R-48), SIGNIFICA: ",
"pregunta_respuesta1": "A) LOS PEATONES DEBEN CIRCULAR POR LA DERECHA Y LOS CAMIONES POR LA IZQUIERDA",
"pregunta_respuesta2": "B) LOS PEATONES DEBEN TENER CUIDADO CON LOS CAMIONES.",
"pregunta_respuesta3": "C) ZONA DE CARGA Y DESCARGA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 112,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (R-49), SIGNIFICA: ",
"pregunta_respuesta1": "A) ESTA PERMITIDO CAMBIAR DE CARRIL POR LA IZQUIERDA Y POR LA DERECHA.",
"pregunta_respuesta2": "B)  SE  DEBE  MANTENER LA        DISTANCIA        DE SEGURIDAD             ENTRE VEHICULOS.",
"pregunta_respuesta3": "C) ESTA PERMITIDO CAMBIAR DE CARRIL POR LA IZQUIERDA PARA ADELANTAR.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 113,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (R-50), SIGNIFICA:",
"pregunta_respuesta1": "A) QUE SI SOLO HAY UN CARRIL TIENE PREFERENCIA DE PASO EL CONDUCTOR QUE LLEGO PRIMERO.",
"pregunta_respuesta2": "B) QUE SI SOLO HAY UN CARRIL TIENE PREFERENCIA EL CONDUCTOR QUE ESTA MIRANDO LA SEÑAL.",
"pregunta_respuesta3": "C) QUE SI SOLO HAY UN CARRIL NO TIENE PREFERENCIA EL QUE ESTA MIRANDO LA SEÑAL Y DEBE DARLE PASO AL DEL SENTIDO CONTRARIO.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 114,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SEÑAL (R-5-1), ES:",
"pregunta_respuesta1": "A) UNA SEÑAL INFORMATIVA.",
"pregunta_respuesta2": "B) UNA SEÑAL PREVENTIVA.",
"pregunta_respuesta3": "C) UNA SEÑAL DE OBLIGACION.",
"pregunta_respuesta4": "D) NO ES UNA SEÑAL VALIDA EN EL PERU.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 115,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SEÑAL (P-3A) , LE INDICA AL CONDUCTOR QUE: ",
"pregunta_respuesta1": "A) HAY UNA CURVA Y CONTRACURVA A LA IZQUIERDA.",
"pregunta_respuesta2": "B) HAY UNA CURVA Y CONTRACURVA A LA DERECHA.",
"pregunta_respuesta3": "C) HAY UNA CURVA Y CONTRACURVA PRONUNCIADA A LA DERECHA.",
"pregunta_respuesta4": "D) HAY UNA CURVA Y CONTRACURVA PRONUNCIADA A LA IZQUIERDA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 116,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-5-1A) , LE ADVIERTE AL CONDUCTOR QUE: ",
"pregunta_respuesta1": "A) SE APROXIMA A UNA CURVA Y CONTRA-CURVA A LA IZQUIERDA.",
"pregunta_respuesta2": "B) SE APROXIMA A UNA CURVA Y CONTRA-CURVA A LA DERECHA.",
"pregunta_respuesta3": "C) SE APROXIMA A UN CAMINO SINUOSO A LA DERECHA.",
"pregunta_respuesta4": "D) SE APROXIMA A UN CAMINO SINUOSO A LA IZQUIERDA.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 117,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-61), LE ADVIERTE AL CONDUCTOR QUE: ",
"pregunta_respuesta1": "A) EL SENTIDO DEL TRANSITO ES EL QUE INDICA LA FLECHA.",
"pregunta_respuesta2": "B) SE APROXIMA A UNA REDUCCION DE LA VIA EN AMBOS SENTIDOS.",
"pregunta_respuesta3": "C)  ESTA  CIRCULANDO  POR  UNA CURVA HORIZONTAL.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 118,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-34), LE ADVIERTE AL CONDUCTOR QUE:",
"pregunta_respuesta1": "A) LA VIA ESTA EN MAL ESTADO Y TIENE BACHES.",
"pregunta_respuesta2": "B) SE APROXIMA A UN RESALTO.",
"pregunta_respuesta3": "C) SE APROXIMA A UN ROMPE MUELLES.",
"pregunta_respuesta4": "D) SE APROXIMA A UN BADEN.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 119,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-60), ES: ",
"pregunta_respuesta1": "A) UNA SEÑAL TURISTICA.",
"pregunta_respuesta2": "B) UNA SEÑAL INFORMATIVA.",
"pregunta_respuesta3": "C) UNA SEÑAL PREVENTIVA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 120,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-46), INDICA: ",
"pregunta_respuesta1": "A) EXISTENCIA DE UNA CICLOVIA.",
"pregunta_respuesta2": "B) AUTORIZACION PARA EL CRUCE DE CICLISTAS.",
"pregunta_respuesta3": "C) CICLISTAS EN LA VIA.",
"pregunta_respuesta4": "D) CERCANIA DE UNA CICLOVIA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 121,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-46-A) , INDICA:",
"pregunta_respuesta1": "A) QUE LOS CICLISTAS DEBEN USAR LA CICLOVIA.",
"pregunta_respuesta2": "B) QUE NOS APROXIMAMOS A UN CRUCE DE CICLOVIA.",
"pregunta_respuesta3": "C) QUE LA CICLOVIA ES SOLO PARA LOS CICLISTAS.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 122,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P- 46B) , INDICA:",
"pregunta_respuesta1": "A) QUE LOS CICLISTAS DEBEN DETENERSE EN ESE PUNTO.",
"pregunta_respuesta2": "B) QUE NOS APROXIMAMOS A UN CRUCE DE CICLOVIA.",
"pregunta_respuesta3": "C) QUE LA CICLOVIA ES SOLO PARA LOS CICLISTAS.",
"pregunta_respuesta4": "D) LA UBICACION DE UN CRUCE DE CICLISTAS.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 123,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-48), INDICA: ",
"pregunta_respuesta1": "A) VIA ES DE USO EXCLUSIVO DE LOS PEATONES.",
"pregunta_respuesta2": "B) ZONA CON PRESENCIA DE PEATONES.",
"pregunta_respuesta3": "C) UBICACION DE UN CRUCE ESCOLAR.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 124,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-48A) , INDICA:",
"pregunta_respuesta1": "A) VIA ES DE USO EXCLUSIVO DE PEATONES.",
"pregunta_respuesta2": "B) PROXIMIDAD A UN CRUCE PEATONAL.",
"pregunta_respuesta3": "C) UBICACION DE UN CRUCE ESCOLAR.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 125,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-48-B) , INDICA: ",
"pregunta_respuesta1": "A) UBICACION DE UN CRUCE ESCOLAR.",
"pregunta_respuesta2": "B) PROXIMIDAD A UNA CALZADA.",
"pregunta_respuesta3": "C) UBICACION DE UN CRUCE PEATONAL.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 126,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-49), INDICA:",
"pregunta_respuesta1": "A) ZONA ESCOLAR.",
"pregunta_respuesta2": "B) PROXIMIDAD A UN CRUCE PEATONAL.",
"pregunta_respuesta3": "C) ZONA TRANSITADA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 127,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P- 49A) , INDICA:",
"pregunta_respuesta1": "A) ZONA ESCOLAR.",
"pregunta_respuesta2": "B) PROXIMIDAD A UN CRUCE ESCOLAR.",
"pregunta_respuesta3": "C) UBICACION DE UN CRUCE ESCOLAR.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 128,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-49B) , INDICA:",
"pregunta_respuesta1": "A) ZONA TRANSITADA.",
"pregunta_respuesta2": "B) PROXIMIDAD A UN CRUCE PEATONAL.",
"pregunta_respuesta3": "C) UBICACION DE UN CRUCE ESCOLAR",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 129,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-50), INDICA:",
"pregunta_respuesta1": "A) ZONA DE DEPORTES.",
"pregunta_respuesta2": "B) PROXIMIDAD A CAMPO DEPORTIVO.",
"pregunta_respuesta3": "C) PROXIMIDAD A ZONA URBANA.",
"pregunta_respuesta4": "D) NIÑOS JUGANDO.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 130,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P- 51), INDICA:",
"pregunta_respuesta1": "A)   ZONA   DE   PARQUEO VEHICULOS PESADOS.",
"pregunta_respuesta2": "B) PROXIMIDAD A ZONA RURAL.",
"pregunta_respuesta3": "C) MAQUINARIA AGRICOLA EN LA VIA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 131,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-53), INDICA: ",
"pregunta_respuesta1": "A) PROXIMIDAD A UN ESTABLO.",
"pregunta_respuesta2": "B) PROXIMIDAD A ZONA AGRICOLA.",
"pregunta_respuesta3": "C) ANIMALES EN LA VIA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 132,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-55), INDICA: ",
"pregunta_respuesta1": "A) SEMAFORO MALOGRADO.",
"pregunta_respuesta2": "B) PROXIMIDAD A UN SEMAFORO.",
"pregunta_respuesta3": "C) SEMAFOROS EN OLA VERDE.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 133,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-58), LE INDICA: ",
"pregunta_respuesta1": "A) QUE USTED SE APROXIMA A UNA SEÑAL DE PARE.",
"pregunta_respuesta2": "B)  QUE  USTED  DEBE  PARAR DONDE ESTA LA SEÑAL P-58.",
"pregunta_respuesta3": "C) QUE SE TRATA DE UN PARE, PERO PUEDE SEGUIR ADELANTE.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 134,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-59), LE INDICA:",
"pregunta_respuesta1": "A) QUE USTED SE APROXIMA A UNA SEÑAL DE CEDA EL PASO.",
"pregunta_respuesta2": "B) QUE USTED DEBE CEDER EL PASO DONDE ESTA LA SEÑAL P59.",
"pregunta_respuesta3": "C) QUE SE TRATA DE UN PARE, PERO PUEDE SEGUIR ADELANTE.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 135,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-41), LE INDICA:",
"pregunta_respuesta1": "A) QUE USTED SE APROXIMA A UNA ZONA DE CAMIONES.",
"pregunta_respuesta2": "B) QUE USTED DEBE ENCENDER SUS LUCES PUES SE APROXIMA A UNA ZONA CON POCA VISIBILIDAD.",
"pregunta_respuesta3": "C) QUE USTED SE APROXIMA A UN TUNEL.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 136,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-45), INDICA:",
"pregunta_respuesta1": "A) PROXIMIDAD A UN AEROPUERTO.",
"pregunta_respuesta2": "B)  PROXIMIDAD  A  UNA  PISTA DE AVIONES.",
"pregunta_respuesta3": "C) VUELO DE AVIONES A BAJA ALTURA.",
"pregunta_respuesta4": "D) AVIONES QUE GENERAN RUIDO.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 137,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P- 52), LE INDICA:",
"pregunta_respuesta1": "A) QUE USTED DEBE DAR PRIORIDAD DE PASO A LAS AMBULANCIAS.",
"pregunta_respuesta2": "B) QUE USTED DEBE DAR PRIORIDAD DE PASO A LOS BOMBEROS.",
"pregunta_respuesta3": "C) QUE SE APROXIMA A UNA SALIDA DE VEHICULOS DE BOMBEROS.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 138,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P- 66), LE INDICA:",
"pregunta_respuesta1": "A) QUE SE APROXIMA UN DESIERTO.",
"pregunta_respuesta2": "B) QUE SE APROXIMA UNA ZONA DONDE HAY RAFAGAS DE VIENTO LATERAL.",
"pregunta_respuesta3": "C) QUE SE ACERCA A UNA ZONA DE ARENAMIENTO EN LA VIA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 139,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-66A) , LE INDICA: ",
"pregunta_respuesta1": "A) QUE SE APROXIMA UNA TORMENTA.",
"pregunta_respuesta2": "B) QUE ESTA PASANDO POR UNA ZONA DONDE HAY RAFAGAS DE VIENTO LATERAL.",
"pregunta_respuesta3": "C) QUE SE ACERCA A UNA ZONA DE ARENAMIENTO EN LA VIA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 140,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI AL CONDUCIR SU VEHICULO SE ENCUENTRA CON LA SEÑAL VERTICAL QUE SE MUESTRA, USTED DEBE ENTENDER QUE:",
"pregunta_respuesta1": "A) LA VIA ESTA INTERRUMPIDA Y DEBE TOMAR EL CAMINO ALTERNATIVO QUE MUESTRA LA SEÑAL.",
"pregunta_respuesta2": "B) EN LA SIGUIENTE INTERSECCION ESTA PROHIBIDO GIRAR A LA IZQUIERDA Y POR LO TANTO, SI DESEA SEGUIR ESA RUTA DEBE TOMAR EL CAMINO ALTERNATIVO QUE MUESTRA LA SEÑAL.",
"pregunta_respuesta3": "C) EN LA SIGUIENTE INTERSECCION ESTA PROHIBIDO GIRAR A LA DERECHA Y POR LO TANTO, SI DESEA SEGUIR ESA RUTA DEBE TOMAR EL CAMINO ALTERNATIVO QUE MUESTRA LA SEÑAL.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 141,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI AL CONDUCIR SU VEHICULO SE ENCUENTRA CON LA SEÑAL VERTICAL QUE SE MUESTRA, USTED        DEBE ENTENDER QUE:                             ",
"pregunta_respuesta1": "A) SI QUIERE GIRAR A LA IZQUIERDA DEBE PASAR LA INTERSECCION Y DAR LA VUELTA A LA MANZANA.",
"pregunta_respuesta2": "B) EN LA SIGUIENTE INTERSECCION ESTA PROHIBIDO GIRAR A LA IZQUIERDA Y POR LO TANTO, SI DESEA SEGUIR ESA RUTA DEBE HACERLO UNA CUADRA ANTES.",
"pregunta_respuesta3": "C) EN ESA DIRECCION HAY UNA ZONA DE PARQUEO.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 142,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (I-14), SIGNIFICA: ",
"pregunta_respuesta1": "A) SEÑAL DE HOSTAL.",
"pregunta_respuesta2": "B) SEÑAL DE HOSPEDAJE.",
"pregunta_respuesta3": "C) SEÑAL DE HOSPITAL.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 143,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (I-31), SIGNIFICA:",
"pregunta_respuesta1": "A) PROXIMIDAD DE UNA BAHIA DE TAXIS.",
"pregunta_respuesta2": "B)      PROXIMIDAD      A      UN ESTACIONAMIENTO PERMITIDO.",
"pregunta_respuesta3": "C) PROXIMIDAD DE UNA ZONA DE PARQUEO PARA VECINOS.",
"pregunta_respuesta4": "D) PROXIMIDAD DE UN ESTACIONAMIENTO  PARA EMERGENCIAS.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 144,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (I-9), SIGNIFICA: ",
"pregunta_respuesta1": "A) ZONA DE CONTROL POLICIAL.",
"pregunta_respuesta2": "B) ZONA DE CONTROL DE ADUANAS.",
"pregunta_respuesta3": "C) ZONA MILITAR.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 145,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (I- INDICAR: 18), SE UTILIZA PARA",
"pregunta_respuesta1": "A) CERCANIA A UNA FERRETERIA.",
"pregunta_respuesta2": "B) CERCANIA A UN SERVICIO MECANICO.",
"pregunta_respuesta3": "C) CERCANIA A UN GRIFO.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 146,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (I- INDICAR: 19), SE UTILIZA PARA",
"pregunta_respuesta1": "A) CERCANIA A UN SERVICIO MECANICO.",
"pregunta_respuesta2": "B) CERCANIA A UNA TIENDA.",
"pregunta_respuesta3": "C) CERCANIA A UN GRIFO.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 147,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (I-20), SE UTILIZA PARA INDICAR:",
"pregunta_respuesta1": "A) CERCANIA A UN SERVICIO MECANICO.",
"pregunta_respuesta2": "B) CERCANIA A UNA ZONA DONDE DEBE CIRCULAR CON CADENAS EN LAS LLANTAS.",
"pregunta_respuesta3": "C) CERCANIA A UN GRIFO.",
"pregunta_respuesta4": "D) CERCANIA A UNA LLANTERIA.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 148,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (R-16A) , SE UTILIZA PARA INDICAR:",
"pregunta_respuesta1": "A) FIN DE LA RESTRICCION DE CIRCULACION DE AUTOMOTORES.",
"pregunta_respuesta2": "B) FIN DE LA RESTRICCION DE PROHIBIDO ADELANTAR.",
"pregunta_respuesta3": "C) FIN DE LA RESTRICCION DE CIRCULACION EN DOBLE SENTIDO.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 149,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EL COMPORTAMIENTO DEL CONDUCTOR COMO USUARIO DE LA VIA, DEBE ESTAR ORIENTADO A:",
"pregunta_respuesta1": "A) VALOR POR LA VIDA.",
"pregunta_respuesta2": "B) RESPETO POR LA INTEGRIDAD FISICA DEL RESTO DE LOS USUARIOS.",
"pregunta_respuesta3": "C) RESPETO A LA AUTORIDAD ENCARGADA DE LA VIGILANCIA Y DISCIPLINA DE TRAFICO.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 150,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SON CONSIDERADOS USUARIOS VULNERABLES DE LA VIA Y POR TANTO MERECEN ESPECIAL PROTECCION:",
"pregunta_respuesta1": "A) PEATONES, NIÑOS, ADULTOS MAYORES, PERSONAS CON MOVILIDAD REDUCIDA, CICLISTAS.",
"pregunta_respuesta2": "B) UNICAMENTE LOS PEATONES Y CICLISTAS.",
"pregunta_respuesta3": "C) UNICAMENTE LOS PEATONES Y NIÑOS.",
"pregunta_respuesta4": "D) TODAS LAS ALTERNATIVAS SON CORRECTAS, CON EXCEPCION DE  LOS CICLISTAS.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 151,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-61), MUESTRA:",
"pregunta_respuesta1": "A)   FLECHAS   RETROREFLECTIVAS QUE INDICAN PELIGRO.",
"pregunta_respuesta2": "B) DELINEADORES DE CURVA, QUE GUIAN AL CONDUCTOR.",
"pregunta_respuesta3": "C) ADVERTENCIA AL CONDUCTOR SOBRE LA PROXIMIDAD DE UN PUENTE.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 152,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI USTED ES TITULAR DE UNA LICENCIA PARTICULAR A-I, ESTA AUTORIZADO A CONDUCIR EL SIGUIENTE VEHICULO:",
"pregunta_respuesta1": "A) CAMION, TIPO VOLQUETE.",
"pregunta_respuesta2": "B) OMNIBUS, TIPO PANORAMICO.",
"pregunta_respuesta3": "C) MOTOTAXI.",
"pregunta_respuesta4": "D) AUTOMOVIL, TIPO SEDAN.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 153,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "MIENTRAS LA PERSONA CONDUCE, LE ESTA PERMITIDO:",
"pregunta_respuesta1": "A) COMPARTIR SU ASIENTO CON UN NIÑO, SIEMPRE Y CUANDO ESTE SEA MENOR DE UN AÑO DE EDAD.",
"pregunta_respuesta2": "B) QUE OTRA PERSONA TOME EL CONTROL DE LA DIRECCION DEL VEHICULO, SIEMPRE Y",
"pregunta_respuesta3": "C) CONDUCIR CON UNA MANO SOBRE EL VOLANTE DE DIRECCION, CUANDO ES NECESARIO ACCIONAR ALGUN COMANDO DEL VEHICULO, COMO REALIZAR LOS CAMBIOS DE VELOCIDAD.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 154,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EL CONDUCTOR ESTA                   A                      _ A LAS PRUEBAS QUE LE SOLICITE EL EFECTIVO DE LA POLICIA NACIONAL DEL PERU, ASIGNADO AL CONTROL DEL TRANSITO, PARA DETERMINAR SU ESTADO DE INTOXICACION POR ALCOHOL, DROGAS, ESTUPEFACIENTES U OTROS TOXICOS",
"pregunta_respuesta1": "A) EN SU DERECHO - NEGARSE.",
"pregunta_respuesta2": "B) FACULTADO - RECHAZAR.",
"pregunta_respuesta3": "C) OBLIGADO - SOMETERSE.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 155,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "ANTE UN CONDUCTOR CON EVIDENTE DISCAPACIDAD FISICA, LA CUAL NO FIGURA EN EL RUBRO DE RESTRICCIONES DE SU LICENCIA DE CONDUCIR, PROCEDE:",
"pregunta_respuesta1": "A) QUE LA POLICIA DE TRANSITO INTERVENGA A DICHO CONDUCTOR Y QUE LA AUTORIDAD QUE EXPIDIO LA LICENCIA DE CONDUCIR ORDENE SU REEXAMINACION.",
"pregunta_respuesta2": "B) QUE LA AUTORIDAD COMPETENTE EXPIDA UN PERMISO EXCEPCIONAL PARA DICHO CONDUCTOR.",
"pregunta_respuesta3": "C) QUE LA POLICIA DE TRANSITO EXPIDA UN PERMISO EXCEPCIONAL PARA DICHO CONDUCTOR.",
"pregunta_respuesta4": "D) QUE LA POLICIA DE TRANSITO OTORGUE A DICHO CONDUCTOR UN PLAZO PRUDENCIAL PARA QUE CONTINUE CONDUCIENDO.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 156,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿UNA PERSONA CON DISCAPACIDAD FISICA PUEDE OBTENER UNA LICENCIA DE CONDUCIR PARTICULAR?",
"pregunta_respuesta1": "A) SI, SIEMPRE Y CUANDO DICHA DISCAPACIDAD PUEDA SER SUPERADA CON ALGUN CORRECTOR QUE ESTABLEZCA ALGUNA DE LAS RESTRICCIONES QUE PREVE LA NORMA VIGENTE.",
"pregunta_respuesta2": "B) NO, ESTA TERMINANTEMENTE PROHIBIDO.",
"pregunta_respuesta3": "C) DEPENDE DEL CRITERIO DEL CENTRO DE EMISION DE LA LICENCIA DE CONDUCIR.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 157,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿PUEDE UNA PERSONA MENOR DE EDAD CONDUCIR UN VEHICULO?",
"pregunta_respuesta1": "A) NUNCA.",
"pregunta_respuesta2": "B) SI, SIEMPRE Y CUANDO VAYA ACOMPAÑADA DE UNA PERSONAS MAYOR DE EDAD Y TITULAR DE UNA LICENCIA DE CONDUCIR.",
"pregunta_respuesta3": "C) NO, SALVO QUE CONDUZCA UN VEHICULO DE DIMENSION REDUCIDA.",
"pregunta_respuesta4": "D) SI, SIEMPRE Y CUANDO SEA MAYOR DE 16 AÑOS Y CUENTE CON LICENCIA DE CONDUCIR O PERMISO PROVISIONAL, CONFORME A LO DISPUESTO EN EL REGLAMENTO NACIONAL DEL SISTEMA DE EMISION DE LICENCIAS DE CONDUCIR.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 158,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "ES UNA OBLIGACION GENERAL DE TRANSITO QUE, LOS ____ CIRCULEN RESPETANDO LOS MENSAJES DE    _____, LAS INSTRUCCIONES DE LOS EFECTIVOS DE LA POLICIA DE TRANSITO Y EL MANDATO DE LAS NORMAS LEGALES Y REGLAMENTARIAS CORRESPONDIENTES.",
"pregunta_respuesta1": "A) PEATONES - LOS LETREROS INSTALADOS EN LAS VIAS PUBLICAS.",
"pregunta_respuesta2": "B) LOS USUARIOS DE LA VIA PUBLICA - LOS DISPOSITIVOS DE CONTROL DE TRANSITO.",
"pregunta_respuesta3": "C) VEHICULOS - LOS MEDIOS DE COMUNICACION.",
"pregunta_respuesta4": "D)  MENORES  DE  EDAD  -  LOS ADULTOS MAYORES.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 159,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "MARQUE LA AFIRMACION INCORRECTA:",
"pregunta_respuesta1": "A) ESTA PROHIBIDO ARROJAR, DEPOSITAR O ABANDONAR OBJETOS EN LA VIA PUBLICA, O CUALQUIER OTRO OBSTACULO QUE PUEDA DIFICULTAR LA CIRCULACION.",
"pregunta_respuesta2": "B) EL CONDUCTOR DEBE MANTENER EL VEHICULO QUE CONDUCE CON EL COMBUSTIBLE NECESARIO PARA EVITAR DETENCIONES EN LA VIA.",
"pregunta_respuesta3": "C) LOS VEHICULOS DEBEN CIRCULAR EN VIAS URBANAS CON LAS LUCES BAJAS LAS 24 HORAS DEL DIA.",
"pregunta_respuesta4": "D) EN CASO DE HABER AGUA EN LA CALZADA, EL CONDUCTOR DE UN VEHICULO DEBE TOMAR LAS PRECAUCIONES, PARA EVITAR QUE ESTA PUEDA MOJAR LA ACERA Y LOS PEATONES.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 160,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿SI AL CONDUCIR POR UNA AVENIDA SE ENCUENTRA CON UNA SEÑAL EN LA VIA QUE INDICA UN LIMITE MAXIMO DE 50 KM/H, SIN EMBARGO, CONFORME A LO DISPUESTO EN LA NORMA EL LIMITE MAXIMO DE VELOCIDAD EN DICHA VIA ES DE 60 KM/H,  USTED:",
"pregunta_respuesta1": "A) DEBE OBEDECER LA SEÑAL DE VELOCIDAD INSTALADA EN LA VIA.",
"pregunta_respuesta2": "B) PUEDE IR A UNA VELOCIDAD MAXIMA DE 60 KM/H.",
"pregunta_respuesta3": "C) DEBE IR A UNA VELOCIDAD MAXIMA DE 60 KM/H.",
"pregunta_respuesta4": "D) DEBE IR A UNA VELOCIDAD ENTRE 50 Y 60 KM/H.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 161,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SOBRE LA CONDUCCION EN RETROCESO, MARQUE LA OPCION CORRECTA:",
"pregunta_respuesta1": "A) ESTA PROHIBIDA, SALVO EN CASOS ESTRICTAMENTE JUSTIFICADOS.",
"pregunta_respuesta2": "B) NUNCA DEBE REALIZARSE.",
"pregunta_respuesta3": "C) ESTA PERMITIDA",
"pregunta_respuesta4": "D) ESTA PERMITIDA, SALVO EN CARRETERAS.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 162,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EL USO DE LA LUZ                         ES OBLIGATORIO EN                       , DEBIENDO CAMBIAR POR LUZ                           MOMENTOS PREVIOS AL CRUCE CON OTRO VEHICULO QUE CIRCULE EN SENTIDO CONTRARIO.",
"pregunta_respuesta1": "A) BAJA - CARRETERAS - ALTA.",
"pregunta_respuesta2": "B) ALTA - VIAS URBANAS - BAJA.",
"pregunta_respuesta3": "C) ROMPENIEBLAS - CARRETERAS - BAJA.",
"pregunta_respuesta4": "D) ALTA - CARRETERERAS - BAJA.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 163,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "INDIQUE LA CONDUCTA PERMITIDA:",
"pregunta_respuesta1": "A) EL ESTACIONAMIENTO DE UN VEHICULO A LA SALIDA DE SALAS DE ESPECTACULOS EN FUNCIONAMIENTO.",
"pregunta_respuesta2": "B) EL ESTACIONAMIENTO DE UN VEHICULO DE EMERGENCIA EN UN LUGAR NO PERMITIDO, SI ELLO FUERA IMPRESCINDIBLE.",
"pregunta_respuesta3": "C) EL ESTACIONAMIENTO DE UN VEHICULO DESPUES DE 1 METRO DE UN PASO PEATONAL.",
"pregunta_respuesta4": "D) EL ESTACIONAMIENTO DE UN VEHICULO SOBRE LAS ACERAS.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 164,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SE CONSIDERA EL ABANDONO DE UN VEHICULO CUANDO:",
"pregunta_respuesta1": "A) EL VEHICULO ESTA ESTACIONADO EN UN LUGAR PERMITIDO EN LA VIA PUBLICA, PERO SIN CONDUCTOR POR UN TIEMPO MAYOR DE 72 HORAS.",
"pregunta_respuesta2": "B) EL VEHICULO ESTA ESTACIONADO EN UN LUGAR PERMITIDO EN LA VIA PUBLICA, PERO SIN CONDUCTOR POR UN TIEMPO MAYOR DE 96 HORAS.",
"pregunta_respuesta3": "C) EL VEHICULO ESTA ESTACIONADO EN UN LUGAR PERMITIDO EN LA VIA PUBLICA, PERO SIN CONDUCTOR Y POR UN TIEMPO MAYOR DE 48 HORAS.",
"pregunta_respuesta4": "D) LA NORMA DE  TRANSITO NO ESTABLECE NADA  SOBRE EL ABANDONO DEL VEHICULO.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 165,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "AL TRANSPORTAR CARGA EN SU VEHICULO, USTED DEBE:",
"pregunta_respuesta1": "A) ASEGURARSE, EN CASO LA CARGA SOBRESALGA LATERALMENTE DE LA CARROCERIA, ESTE BIEN SUJETA.",
"pregunta_respuesta2": "B) EVITAR TODO RIESGO DE CAIDA DE LA CARGA QUE SOBRESALE LATERALMENTE DE LA CARROCERIA.",
"pregunta_respuesta3": "C) TRATAR QUE LA CARGA NO SEA ARRASTRADA.",
"pregunta_respuesta4": "D) ASEGURARSE QUE LA CARGA NO SOBREPASE LAS DIMENSIONES DE LA CARROCERIA.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 166,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SOBRE LA EMISION VEHICULAR DE SUSTANCIAS CONTAMINANTES, MARQUE LA OPCION CORRECTA:",
"pregunta_respuesta1": "A) ESTA PERMITIDA.",
"pregunta_respuesta2": "B)  ESTA  PROHIBIDA,   EN UN INDICE SUPERIOR AL LIMITE MAXIMO QUE PERMITE LA NORMA.",
"pregunta_respuesta3": "C)   ESTA   PROHIBIDA   EN   EL AMBITO URBANO.",
"pregunta_respuesta4": "D)   LA   NORMA   NO   REGULA SOBRE ELLO.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 167,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA AUTORIDAD COMPETENTE,                             _ PUEDE PROHIBIR O RESTRINGIR                                               EN DETERMINADAS VIAS PUBLICAS.",
"pregunta_respuesta1": "A) CUANDO LA SITUACION LO JUSTIFIQUE - LA CIRCULACION O ESTACIONAMIENTO DE VEHICULOS.",
"pregunta_respuesta2": "B) AUN CUANDO LA SITUACION LO JUSTIFIQUE NO - CIRCULACION O ESTACIONAMIENTO DE VEHICULOS.",
"pregunta_respuesta3": "C) NO SE ENCUENTRA FACULTADA NI - CIRCULACION DE VEHICULOS",
"pregunta_respuesta4": "D) UNICAMENTE CON EL CONSENTIMIENTO DEL CONDUCTOR - CIRCULACION DE VEHICULOS.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 168,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI AL CONDUCIR EN UNA CARRETERA DE NOCHE SE APROXIMA UN VEHICULO EN SENTIDO CONTRARIO,  USTED DEBE:",
"pregunta_respuesta1": "A) CAMBIAR DE LUCES BAJAS A LUCES ALTAS",
"pregunta_respuesta2": "B) ENCENDER LAS LUCES DE EMERGENCIA.",
"pregunta_respuesta3": "C) CAMBIAR DE LUCES ALTAS A LUCES BAJAS.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 169,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA DETENCION DE UN VEHICULO DEBE EFECTUARSE:",
"pregunta_respuesta1": "A) EN EL SENTIDO CONTRARIO A LA CIRCULACION Y EN EL CARRIL IZQUIERDO DE LA VIA.",
"pregunta_respuesta2": "B) EN EL SENTIDO DE LA CIRCULACION Y EN EL CARRIL DERECHO DE LA VIA, UTILIZANDO LAS LUCES ALTAS.",
"pregunta_respuesta3": "C) EN EL SENTIDO DE LA CIRCULACION Y EN EL CARRIL IZQUIERDO DE LA VIA, UTILIZANDO LAS LUCES INTERMITENTES.",
"pregunta_respuesta4": "D) EN EL SENTIDO DE LA CIRCULACION Y EN EL CARRIL DERECHO DE LA VIA, UTILIZANDO LAS LUCES INTERMITENTES.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 170,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EN  CASO  DE  UN  ACCIDENTE  DE  TRANSITO  CON  DAÑOS  PERSONALES  Y/O MATERIALES LOS PARTICIPANTES DEBEN:",
"pregunta_respuesta1": "A) ACUDIR A LA ESTACION DE BOMBEROS.",
"pregunta_respuesta2": "B) LLAMAR A UN FAMILIAR.",
"pregunta_respuesta3": "C) SOLICITAR LA INTERVENCION DE LA AUTORIDAD POLICIAL.",
"pregunta_respuesta4": "D) ABANDONAR EL LUGAR DONDE OCURRIO EL ACCIDENTE.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 171,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EL CONDUCTOR ANTES DE INICIAR LA CONDUCCION DE UN VEHICULO NO ESTA OBLIGADO A:",
"pregunta_respuesta1": "A) PORTAR LA TARJETA DE IDENTIFICACION   VEHICULAR DEL VEHICULO QUE CONDUCE.",
"pregunta_respuesta2": "B) PORTAR Y EXHIBIR LA PLACA UNICA DE RODAJE.",
"pregunta_respuesta3": "C) CONSTATAR QUE EL VEHICULO TIENE SOAT VIGENTE.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 172,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA                              FACULTA Y AUTORIZA LA CIRCULACION DEL VEHICULO POR LA VIA PUBLICA, IDENTIFICA EL BIEN, Y, POR ENDE, AL TITULAR RESPONSABLE DE LAS ACCIONES QUE DERIVEN DE SU PROPIEDAD.",
"pregunta_respuesta1": "A) TARJETA DE IDENTIFICACION VEHICULAR.",
"pregunta_respuesta2": "B) MUNICIPALIDAD PROVINCIAL.",
"pregunta_respuesta3": "C) LA SUPERINTENDENCIA NACIONAL DE ADUANAS Y DE ADMINISTRACION TRIBUTARIA - SUNAT.",
"pregunta_respuesta4": "D) PLACA UNICA NACIONAL DE RODAJE.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 173,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "A FIN DE DETERMINAR LA PRESENCIA DE ALCOHOL O SUSTANCIAS ESTUPEFACIENTES EN EL CONDUCTOR, EL EFECTIVO DE LA POLICIA DE TRANSITO PUEDE EXIGIRLE AL MOMENTO DE LA INTERVENCION:",
"pregunta_respuesta1": "A)  QUE  REALICE  PRUEBAS  DE COORDINACION Y EQUILIBRIO.",
"pregunta_respuesta2": "B) USO DEL ALCOHOLIMETRO.",
"pregunta_respuesta3": "C) PRUEBA DE ALCOHOLEMIA.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 174,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿EL REGLAMENTO NACIONAL DE TRANSITO CONSIDERA LA REINCIDENCIA EN LAS INFRACCIONES DE TRANSITO?",
"pregunta_respuesta1": "A) NO, EL CONDUCTOR PUEDE COMETER LA MISMA INFRACCION VARIAS VECES Y LA SANCION SERA LA MISMA.",
"pregunta_respuesta2": "B) SI, CUANDO EL CONDUCTOR COMETE LA MISMA INFRACCION DENTRO DE LOS 12 MESES SERA SANCIONADO CON EL DOBLE DE LA MULTA.",
"pregunta_respuesta3": "C) SOLO EN LOS CASOS EN QUE SE COMETAN INFRACCIONES GRAVISIMAS.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 175,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿DESPUES DE QUE TIEMPO DE HABER COMETIDO LA MISMA INFRACCION SE LLAMA REINCIDENCIA Y ES SANCIONADA CON EL DOBLE DE LA MULTA ESTABLECIDA?",
"pregunta_respuesta1": "A) 06 MESES.",
"pregunta_respuesta2": "B) 12 MESES.",
"pregunta_respuesta3": "C) 24 MESES.",
"pregunta_respuesta4": "D) 35 MESES.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 176,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI A UN CONDUCTOR INFRACTOR LE SUSPENDIERON SU LICENCIA DE CONDUCIR, ESTE SE ENCUENTRA FACULTADO PARA:",
"pregunta_respuesta1": "A) TRAMITAR EL DUPLICADO DE SU LICENCIA DE CONDUCIR.",
"pregunta_respuesta2": "B) TRAMITAR LA REVALIDACION DE SU LICENCIA DE CONDUCIR.",
"pregunta_respuesta3": "C) TRAMITAR LA RECATEGORIZACION DE SU LICENCIA DE CONDUCIR.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 177,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LAS                                        TIENEN POR FUNCION INFORMAR A LOS USUARIOS SOBRE LOS SERVICIOS GENERALES EXISTENTES PROXIMOS A LA VIA, TALES COMO TELEFONO, HOSPEDAJE, RESTAURANTE, PRIMEROS AUXILIOS, ESTACION DE COMBUSTIBLES, TALLERES, Y OTROS.",
"pregunta_respuesta1": "A) SEÑALES DE LOCALIZACION.",
"pregunta_respuesta2": "B) SEÑALES DE SALIDA INMEDIATA.",
"pregunta_respuesta3": "C) SEÑALES DE SERVICIOS GENERALES.",
"pregunta_respuesta4": "D) SEÑALES ORDINARIAS",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 178,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿CONSTITUYE UNA INFRACCION TRAMITAR EL DUPLICADO DE UNA LICENCIA DE CONDUCIR QUE SE ENCUENTRA RETENIDA?",
"pregunta_respuesta1": "A) NO CONSTITUYE UNA INFRACCION.",
"pregunta_respuesta2": "B) SOLO CUANDO LA LICENCIA DE CONDUCIR HA SIDO RETENIDA POR LA COMISION DE UNA INFRACCION MUY GRAVE.",
"pregunta_respuesta3": "C) SI, CONSTITUYE UNA INFRACCION.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 179,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LAS MARCAS EN EL PAVIMENTO CONSTITUYEN LA SEÑALIZACION ______Y SE EMPLEAN PARA                               LA CIRCULACION.",
"pregunta_respuesta1": "A) HORIZONTAL - REGLAMENTAR.",
"pregunta_respuesta2": "B) VERTICAL - REGLAMENTAR.",
"pregunta_respuesta3": "C) MAS IMPORTANTE - MEJORAR.",
"pregunta_respuesta4": "D) MENOS IMPORTANTE - ADORNAR.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 180,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "CICLISTA ES A CICLOVIA COMO:",
"pregunta_respuesta1": "A) CONDUCTOR - ACERA.",
"pregunta_respuesta2": "B) CONDUCTOR - CALZADA.",
"pregunta_respuesta3": "C) CONDUCTOR - BERMA.",
"pregunta_respuesta4": "D) PEATON - AUTOPISTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 181,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-15), SE UTILIZA PARA ADVERTIR AL CONDUCTOR:",
"pregunta_respuesta1": "A) LA PROXIMIDAD A UNA VIA DE TRES CARRILES.",
"pregunta_respuesta2": "B) LA PROXIMIDAD A UN HURACAN.",
"pregunta_respuesta3": "C) LA PROXIMIDAD A UN CAMINO SINUOSO.",
"pregunta_respuesta4": "D) LA PROXIMIDAD  DE UNA INTERSECCION ROTATORIA (OVALO O ROTONDA).",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 182,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA SIGUIENTE SEÑAL (P-31A) , INDICA:",
"pregunta_respuesta1": "A)  LA  PROXIMIDAD  DEL  FINAL DE LA VIA.",
"pregunta_respuesta2": "B) LA PROXIMIDAD DE UNA VIA ASFALTADA.",
"pregunta_respuesta3": "C) LA PROXIMIDAD DE UNA PENDIENTE LEVE.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 183,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "ES UNA LINEA TRANSVERSAL A LA CALZADA, QUE INDICA AL CONDUCTOR QUE DEBE DETENER COMPLETAMENTE EL VEHICULO, NO DEBIENDO SOBREPASAR EL INICIO DE LA INDICADA LINEA:",
"pregunta_respuesta1": "A) LINEA DE CARRIL.",
"pregunta_respuesta2": "B) LINEA DE BORDE DE CALZADA.",
"pregunta_respuesta3": "C) LINEA DE PARE.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 184,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LOS SEMAFOROS SON:",
"pregunta_respuesta1": "A) DISPOSITIVOS DE CONTROL DEL TRANSITO QUE TIENEN POR FINALIDAD REGULAR Y CONTROLAR EL TRANSITO VEHICULAR, MOTORIZADO Y NO MOTORIZADO, Y EL PEATONAL, A TRAVES DE LAS INDICACIONES DE LAS LUCES RESPECTIVAS.",
"pregunta_respuesta2": "B) DISPOSITIVOS DE CONTROL DEL TRANSITO QUE TIENEN POR FINALIDAD REGULAR Y CONTROLAR UNICAMENTE EL TRANSITO VEHICULAR MOTORIZADO Y PEATONAL, A TRAVES DE LAS INDICACIONES DE LUCES.",
"pregunta_respuesta3": "C) SEÑALES DE COLOR ROJO, VERDE Y AMARILLO, QUE TIENEN COMO UNICO FIN REGULAR LA CORRIENTE VEHICULAR.",
"pregunta_respuesta4": "D) ARTEFACTOS QUE EMITEN LUCES DE COLORES Y CUYO UNICO FIN ES REGULAR LA CORRIENTE DE VEHICULOS MOTORIZADOS Y PEATONES.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 185,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA CONDUCCION REQUIERE UN ALTO NIVEL DE ATENCION, PUES EXISTEN DISTRACCIONES QUE PUEDEN OCASIONAR ACCIDENTES DE TRANSITO, COMO POR EJEMPLO:",
"pregunta_respuesta1": "A) PREOCUPACIONES.",
"pregunta_respuesta2": "B) USO DEL TELEFONO CELULAR.",
"pregunta_respuesta3": "C) MANIPULACION DE LA RADIO MIENTRAS SE CONDUCE.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 186,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿INFLUYE LA SOMNOLENCIA EN LA CAPACIDAD DE CONDUCIR?",
"pregunta_respuesta1": "A) SI, PUES EL CONDUCTOR TOMARA DECISIONES LENTAS QUE LO INDUCIRAN A COMETER ERRORES.",
"pregunta_respuesta2": "B) SI, YA QUE EL CONDUCTOR ESTA DE MAL GENIO.",
"pregunta_respuesta3": "C) NO, SIEMPRE QUE LA CONDUCCION SEA REALIZADA LENTAMENTE.",
"pregunta_respuesta4": "D) NO, SIEMPRE Y CUANDO LA CONDUCCION SEA REALIZADA CON UN ACOMPAÑANTE.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 187,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿CUAL  ES  LA  ACCION  CORRECTA DEL CONDUCTOR,  SEGUN  LAS  NORMAS  DE TRANSITO,   EN LA                                                                     SITUACION QUE PLANTEA           EL                                                                             SIGUIENTE GRAFICO?",
"pregunta_respuesta1": "A) GIRAR RAPIDAMENTE A LA DERECHA ANTES QUE EL PEATON CRUCE LA CALZADA.",
"pregunta_respuesta2": "B) DAR PREFERENCIA DE PASO AL PEATON PARA QUE CRUCE LA CALZADA.",
"pregunta_respuesta3": "C) GIRAR LENTAMENTE A LA DERECHA ANTES QUE EL PEATON CRUCE LA CALZADA.",
"pregunta_respuesta4": "D) TOCAR EL CLAXON PARA QUE EL PEATON NO CRUCE LA CALZADA",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 188,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "¿EN CUAL DE LAS SIGUIENTES OPCIONES, LOS FACTORES MENCIONADOS CONTRIBUYEN A UNA COLISION VEHICULAR?",
"pregunta_respuesta1": "A) PAVIMENTO SECO, SOMNOLENCIA, FRENOS DESGASTADOS.",
"pregunta_respuesta2": "B)  PAVIMENTO  HUMEDO, NEUMATICOS  DESGASTADOS, CANSANCIO.",
"pregunta_respuesta3": "C) REDUCTORES DE VELOCIDAD, FALTA DE ATENCION, USO DEL TELEFONO CELULAR.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 189,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA  ____  ES LA PARTE DE UNA CARRETERA O CAMINO CONTIGUA A LA CALZADA, NO HABILITADA PARA LA CIRCULACION DE VEHICULOS Y DESTINADA EVENTUALMENTE A LA DETENCION DE VEHICULOS EN EMERGENCIA Y CIRCULACION DE PEATONES.",
"pregunta_respuesta1": "A) BERMA.",
"pregunta_respuesta2": "B) AUTOPISTA.",
"pregunta_respuesta3": "C) ACERA.",
"pregunta_respuesta4": "D) DEMARCACION.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 190,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "ES UNA PARTE DE LA VIA DESTINADA A LA CIRCULACION DE VEHICULOS Y EVENTUALMENTE AL CRUCE DE PEATONES Y ANIMALES.",
"pregunta_respuesta1": "A) LA CALZADA.",
"pregunta_respuesta2": "B) LA ACERA.",
"pregunta_respuesta3": "C) LA BERMA.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 191,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "ES UNA PARTE DE LA VIA DESTINADA AL USO DE PEATONES",
"pregunta_respuesta1": "A) LA ACERA.",
"pregunta_respuesta2": "B) LA CALZADA.",
"pregunta_respuesta3": "C) LA BERMA.",
"pregunta_respuesta4": "D) LA AUTOPISTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 192,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SON SEÑALES QUE REGULAN EL TRANSITO:",
"pregunta_respuesta1": "A) LAS BOCINAS Y LAS MARCAS EN LA CALZADA O SEÑALES HORIZONTALES.",
"pregunta_respuesta2": "B) LAS BOCINAS Y LAS SEÑALES VERTICALES.",
"pregunta_respuesta3": "C) LAS SEÑALES VERTICALES, LAS MARCAS EN LA CALZADA O SEÑALES HORIZONTALES Y LAS BOCINAS.",
"pregunta_respuesta4": "D) LAS SEÑALES VERTICALES Y LAS MARCAS EN LA CALZADA O SEÑALES HORIZONTALES.",
"pregunta_clave": "D",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 193,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LOS VEHICULOS DEBEN SER CONDUCIDOS CON:",
"pregunta_respuesta1": "A) PUERTAS Y CAPOT CERRADOS, PERMITIENDOSE LA MALETERA ENTREABIERTA PARA CASOS ESPECIALES.",
"pregunta_respuesta2": "B) PUERTAS, CAPOT Y MALETERA CERRADOS.",
"pregunta_respuesta3": "C) PUERTAS, CAPOT Y MALETERA CERRADOS, SALVO AUTORIZACION ESPECIAL.",
"pregunta_respuesta4": "D) CAPOT Y MALETERA CERRADOS, PERMITIENDOSE DOS PUERTAS ENTREABIERTAS PARA CASOS ESPECIALES.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 194,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EL CONDUCTOR QUE EN UNA VIA URBANA VA A GIRAR A LA IZQUIERDA, A LA DERECHA O EN U DEBE HACER LA SEÑAL RESPECTIVA CON LA LUZ DIRECCIONAL, POR LO MENOS:",
"pregunta_respuesta1": "A)   2   SEGUNDOS   ANTES   DE REALIZAR LA MANIOBRA.",
"pregunta_respuesta2": "B) 1 METRO ANTES DE REALIZAR LA MANIOBRA.",
"pregunta_respuesta3": "C)    20   METROS    ANTES    DE REALIZAR LA MANIOBRA.",
"pregunta_respuesta4": "D)    3    METROS    ANTES    DE REALIZAR LA MANIOBRA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 195,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI USTED ESTA CONDUCIENDO POR UNA CARRETERA Y VA GIRAR A LA  IZQUIERDA, DEBE REALIZAR LA SEÑAL RESPECTIVA CON LA LUZ DIRECCIONAL POR LO MENOS:",
"pregunta_respuesta1": "A)   2   SEGUNDOS   ANTES   DE REALIZAR LA MANIOBRA.",
"pregunta_respuesta2": "B)    2    METROS    ANTES    DE REALIZAR LA MANIOBRA.",
"pregunta_respuesta3": "C)    30   METROS    ANTES    DE REALIZAR LA MANIOBRA.",
"pregunta_respuesta4": "D) 1 METRO ANTES DE REALIZAR LA MANIOBRA.",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 196,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LA LICENCIA PARTICULAR DE LA CLASE Y CATEGORIA A-I, PERMITE CONDUCIR MOTOS?",
"pregunta_respuesta1": "A) SI.",
"pregunta_respuesta2": "B) NO",
"pregunta_respuesta3": "C) UNICAMENTE EN EL AMBITO URBANO.",
"pregunta_respuesta4": "D) UNICAMENTE EN CARRETERAS.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 197,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "EL SIGUIEN TE GRAFICO MUESTR A:",
"pregunta_respuesta1": "A) SEÑALIZACION DE TRANSITO VERTICAL Y HORIZONTAL EN UNA ZONA ESCOLAR.",
"pregunta_respuesta2": "B)  UNICAMENTE SEÑALIZACION DE TRANSITO VERTICAL EN UNA ZONA ESCOLAR.",
"pregunta_respuesta3": "C)  UNICAMENTE SEÑALIZACION DE TRANSITO HORIZONTAL EN UNA ZONA ESCOLAR.",
"pregunta_respuesta4": "D) NINGUNA DE LAS ALTERNATIVAS ES CORRECTA.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 198,
"pregunta_img": 0,
"pregunta_categoria": "AI",
"pregunta_descripcion": "LAS  _CANALIZADORAS, TIENE POR FUNCION CONFORMAR LAS ISLAS CANALIZADORAS DEL TRANSITO AUTOMOTOR EN UNA                    .",
"pregunta_respuesta1": "A) ISLAS CANALIZADORAS - VIA.",
"pregunta_respuesta2": "B) LINEAS - INTERSECCION.",
"pregunta_respuesta3": "C) VIAS - INTERSECCION.",
"pregunta_respuesta4": "D)   TODAS   LAS   ALTERNATIVAS SON CORRECTAS.",
"pregunta_clave": "B",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 199,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "SI AL CONDUCIR EN UNA INTERSECCION SE ENCUENTRA CON LAS SIGUIENTES MARCAS EN EL PAVIMENTO (MALLA ORTOGONAL DE COLOR AMARILLO), SIGNIFICA:      ",
"pregunta_respuesta1": "A) QUE NO PUEDE DETENER EL VEHICULO DENTRO DEL AREA DE INTERSECCION.",
"pregunta_respuesta2": "B) QUE SE ESTAN REALIZANDO TRABAJOS DE EMERGENCIA EN EL AREA DEMARCADA.",
"pregunta_respuesta3": "C) QUE UNICAMENTE PUEDE DETENER EL VEHICULO DENTRO DEL AREA DE INTERSECCION.",
"pregunta_respuesta4": "D) QUE ES UNA ISLA DE REFUGIO PEATONAL.",
"pregunta_clave": "A",
"pregunta_dificultad": "5"
},
{
"pregunta_id": 200,
"pregunta_img": 1,
"pregunta_categoria": "AI",
"pregunta_descripcion": "DE ACUERDO AL SIGUIENTE GRAFICO, ES CORRECTO AFIRMAR QUE: ",
"pregunta_respuesta1": "A) LA ZONA QUE PERMITE ADELANTAR INICIA CON LAS LINEAS AMARILLAS CONTINUAS.",
"pregunta_respuesta2": "B) LOS CONDUCTORES PUEDEN ESTACIONARSE AL EMPEZAR LAS LINEAS CONTINUAS.",
"pregunta_respuesta3": "C) LA ZONA DE NO ADELANTAR INICIA      CON      LAS      LINEAS AMARILLAS CONTINUAS.",
"pregunta_respuesta4": "D) EL CONDUCTOR DEL CAMION PUEDE ESTACIONARSE ANTES DE EMPEZAR LAS LINEAS CONTINUAS",
"pregunta_clave": "C",
"pregunta_dificultad": "5"
}
],
        pagina:50,
        puntaje:0,
        puntaje_error:0,
        ver_respuestas:false,
        estado_iniciado:false
    }),
    methods:{
        ...mapMutations(['cambiar_dialogo_loader']),
        restaurar(){
            
            this.$route.push({name:'preguntas'})
        },
        verificar_respuesta(indice,letra){
            if(this.preguntas[indice].pregunta_clave == letra){
                console.log('correcto')
                this.preguntas[indice].marcado = letra
                this.preguntas[indice].marcado_color = 'blue lighten-2'
                this.puntaje = this.puntaje + 1 
            }else{
                console.log('incorrecto')
                this.preguntas[indice].marcado = letra
                this.preguntas[indice].marcado_color = 'red lighten-2'
                this.preguntas[indice].correcto = this.preguntas[indice].pregunta_clave
                this.puntaje_error = this.puntaje_error + 1
            }
            
        },
        listar_preguntas(){
            this.cambiar_dialogo_loader()
            axios.get('http://localhost:8000/api/get_preguntas',{params:this.usuario})
            .then(resp =>{
                console.log(resp)
                this.preguntas = resp.data
                // this.compras = resp.data.compras
                // this.compra_detalles = resp.data.detalle_compras
                this.cambiar_dialogo_loader()
            }).catch(error=>{
                console.log(error)
            })       
        }
    },
    mounted(){
        // this.listar_preguntas()
    },
    computed:{
        ...mapState(['usuario'])
    }

}

</script>

<style scoped>
td.text-start{
    font-size: 5px;
    padding: 1px;
}
</style>