import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import VueRouter from 'vue-router'

import usuarios_store from './../modules/usuarios_store'
// Vue.use(VueRouter)
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    config_categoria:null,
    auxiliar_elementos:[
      { "elemento_id": "1", "elemento_parte": "1", "elemento_subparte": "1", "elemento_tipo": "CABINA DEL EQUIPO ", "elemento_tipo_equipo": "TODO EQUIPO", "elemento_descripcion": "PANEL DE CONTROL ", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " }, 
      { "elemento_id": "7", "elemento_parte": "2", "elemento_subparte": "1", "elemento_tipo": "LLANTAS Y AROS", "elemento_tipo_equipo": "TODO EQUIPO", "elemento_descripcion": "LLANTAS PRINCIPALES", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " },
      { "elemento_id": "11", "elemento_parte": "3", "elemento_subparte": "1", "elemento_tipo": "NIVELES DE FLUIDOS", "elemento_tipo_equipo": "TODO EQUIPO", "elemento_descripcion": "NIVELES DE ACEITES/FLUIDOS", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " }, 
      { "elemento_id": "16", "elemento_parte": "4", "elemento_subparte": "1", "elemento_tipo": "MOTOR", "elemento_tipo_equipo": "TODO EQUIPO", "elemento_descripcion": "COMPONENTES DEL MOTOR", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " },
      { "elemento_id": "20", "elemento_parte": "5", "elemento_subparte": "1", "elemento_tipo": "IMPLEMENTOS DE SEGURIDAD", "elemento_tipo_equipo": "TODO EQUIPO", "elemento_descripcion": "EQUIPAMIENTO DE SEGURIDAD", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " },
      { "elemento_id": "24", "elemento_parte": "6", "elemento_subparte": "1", "elemento_tipo": "CAMIÓN GRUA", "elemento_tipo_equipo": "SEMIPESADO", "elemento_descripcion": "ESTRUCTURA PRINCIPAL DE GRUA", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " },
      { "elemento_id": "28", "elemento_parte": "7", "elemento_subparte": "1", "elemento_tipo": "CAMIÓN CISTERNA", "elemento_tipo_equipo": "SEMIPESADO", "elemento_descripcion": "TANQUE PRINCIPAL", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " },
      { "elemento_id": "32", "elemento_parte": "8", "elemento_subparte": "1", "elemento_tipo": "CAMIÓN FURGON", "elemento_tipo_equipo": "SEMIPESADO", "elemento_descripcion": "ESTRUCTURA DEL FURGON", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " },
      { "elemento_id": "36", "elemento_parte": "9", "elemento_subparte": "1", "elemento_tipo": "MONTACARGAS", "elemento_tipo_equipo": "SEMIPESADO", "elemento_descripcion": "ESTRUCTURA DEL MASTIL", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " },
      { "elemento_id": "40", "elemento_parte": "10", "elemento_subparte": "1", "elemento_tipo": "OMNIBUS /MINIBUS", "elemento_tipo_equipo": "SEMIPESADO", "elemento_descripcion": "ESTRUCTURA PRINCIPAL/CARROCERIA", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " },
      { "elemento_id": "44", "elemento_parte": "11", "elemento_subparte": "1", "elemento_tipo": "CARGADOR FRONTAL", "elemento_tipo_equipo": "PESADO", "elemento_descripcion": "ESTRUCTURA PRINCIPAL", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " },
      { "elemento_id": "48", "elemento_parte": "12", "elemento_subparte": "1", "elemento_tipo": "TRACTOR SOBRE ORUGA", "elemento_tipo_equipo": "PESADO", "elemento_descripcion": "ESTRUCTURA PRINCIPAL", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " },
      { "elemento_id": "52", "elemento_parte": "13", "elemento_subparte": "1", "elemento_tipo": "EXCAVADORA", "elemento_tipo_equipo": "PESADO", "elemento_descripcion": "ESTRUCTURA PRINCIPAL", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " },
      { "elemento_id": "56", "elemento_parte": "14", "elemento_subparte": "1", "elemento_tipo": "MOTONIVELADORA", "elemento_tipo_equipo": "PESADO", "elemento_descripcion": "ESTRUCTURA PRINCIPAL", "opciones": [ "OK", "ME", "F", "NA" ], "elemento_valor": " " },
      { "elemento_id": "60", "elemento_parte": "15", "elemento_subparte": "1", "elemento_tipo": "ACTIVIDAD A REALIZARSE ADICIONALMENTE.", "elemento_tipo_equipo": "TODO EQUIPO", "elemento_descripcion": "LAVADO INTEGRAL", "opciones": [ "SI", "NO" ], "elemento_valor": " " },
      {"elemento_id":"64","elemento_parte":"16","elemento_subparte":"1","elemento_tipo":"SISTEMA DE CONTROL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"DISPLAY IC","valor":"","opciones":['OK','ME','F','NA']},
      {"elemento_id":"69","elemento_parte":"17","elemento_subparte":"1","elemento_tipo":"MOTOR DE COMBUSTION","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"COMPONENTES DEL MOTOR","valor":"","opciones":['OK','ME','F','NA']},
      {"elemento_id":"74","elemento_parte":"18","elemento_subparte":"1","elemento_tipo":"NIVELES DE FLUDOS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"NIVEL ACEITE DE MOTOR","valor":"","opciones":['OK','ME','F','NA']},
      {"elemento_id":"79","elemento_parte":"19","elemento_subparte":"1","elemento_tipo":"SISTEMA HIDRAULICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BOMBAS, MOTORES Y LINEAS HIDRAULICAS","valor":"","opciones":['OK','ME','F','NA']},
      {"elemento_id":"84","elemento_parte":"20","elemento_subparte":"1","elemento_tipo":"SISTEMA DE ELECTRICO","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"ARRANCADOR, ALTERNADOR, POLEAS Y CORREAS","valor":"","opciones":['OK','ME','F','NA']},
      {"elemento_id":"89","elemento_parte":"21","elemento_subparte":"1","elemento_tipo":"ALIMENTADOR TRITURADORA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"ALIMENTADOR, PARRILLAS Y MALLA FINOS","valor":"","opciones":['OK','ME','F','NA']},
      {"elemento_id":"94","elemento_parte":"22","elemento_subparte":"1","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA T.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BANDA DE FINOS","valor":"","opciones":['OK','ME','F','NA']},
      {"elemento_id":"99","elemento_parte":"23","elemento_subparte":"1","elemento_tipo":"CRIBA","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"CONJUNTO DE VIBRACION","valor":"","opciones":['OK','ME','F','NA']},
      {"elemento_id":"104","elemento_parte":"24","elemento_subparte":"1","elemento_tipo":"BANDAS ALIMENTACION Y DESCARGA Z.","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"BANDA DE RECEPCION Y ELEVACION","valor":"","opciones":['OK','ME','F','NA']},
      {"elemento_id":"109","elemento_parte":"25","elemento_subparte":"1","elemento_tipo":"ESTRUTURA PRINCIPAL","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"CHASIS Y BASTIDOR PRINCIPAL","valor":"","opciones":['OK','ME','F','NA']},
      {"elemento_id":"114","elemento_parte":"26","elemento_subparte":"1","elemento_tipo":"EQUIPOS DE SEGURIDAD","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"PARADAS DE EMERGENCIA","valor":"","opciones":['OK','ME','F','NA']},
      {"elemento_id":"119","elemento_parte":"27","elemento_subparte":"1","elemento_tipo":"OTROS","elemento_tipo_equipo":"TRITURADORAS","elemento_descripcion":"AUMENTO DE ACEITE","valor":"","opciones":['OK','ME','F','NA']},
      ],
    // areas:['LOGISTICA','PRODUCCION','RECURSOS HUMANOS','MANT. MECANICO','MANT. ELECTRICO','EQUIPO MOVIL','CONTROL CALIDAD','SIG','SISTEMAS','GERENCIA','ENVASE Y DESPACHO','INGENIERIA','MATERIAS PRIMAS','SEGURIDAD','PLANIFICACION','OTROS'],
    usuario:{
      usuario_id:"",
      usuario_nombre:"",
      usuario_pw:"",
      usuario_detalle_nombre:"",
      usuario_area:'',
      usuario_dni:'',
      usuario_cargo:'',
      api_token:""
    },
    // para proyecto de anthony 
    usuario_1:{
      usuario_id:"",
                  usuario_nombre:"",
                  usuario_pw:"",
                  usuario_correo:""
    },
    estado_sesion:null,
    dialogo_loader:false,
    alerta_snack:{
      estado:null,
      color:"",
      texto:""
    },
    guia_actual:null,
    checklist_seleccionado:{
          cabecera:{
            checklist_id:"",
            equipo_id:"",
            fecha: "",
            equipo_placa: "",
            equipo_descripcion:"",
            equipo_modelo:"",
            equipo_serie:"",
            equipo_año:"",
            equipo_kminicial:"",
            equipo_kmfinal:"",
            equipo_tipo:"",
            equipo_categoria_id:"",
            turno:"",
            operador:"",
            usuario_id:"",
            checklist_autorizado: "",
            checklist_usuario_id_autoriza:""
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
      },
    editar:false,
    // host:'https://apiemovil1234.herokuapp.com/',
    // host: 'https://apisecure.app-peru.com/',
    host: 'http://localhost:8000/'
  },
  mutations: {
    cambiar_editar(state,bool){
      state.editar = bool
    },
    cambiar_autorizado_checklist_seleccionado(state,valor){
      state.checklist_seleccionado.cabecera.checklist_autorizado = valor
    },
    cambiar_checklist_seleccionado(state,valor){
      state.checklist_seleccionado = valor
    },
    cambiar_config_categoria(state,valor){
      state.config_categoria = valor
    },
    cambiar_dialogo_loader(state){
      state.dialogo_loader = !state.dialogo_loader
    },
    cambiar_alerta(state,attr){
      state.alerta_snack.estado = attr.estado
      state.alerta_snack.color = attr.color
      state.alerta_snack.texto = attr.texto
    }
    ,
    cambiar_datos_usuario(state,valor){
      state.usuario = valor
    },
    cambiar_datos_usuario_1(state,valor){
      state.usuario_1 = valor
    },
    cambiar_estado_sesion(state,valor){
      state.estado_sesion = valor
    }
    
      // if(state.usuario.usuario_nombre == "admin" && state.usuario.usuario_pw == "admin"){
      //   state.estado_sesion=true
      //   router.replace({name:'guias'})
      //   state.dialogo_loader = !state.dialogo_loader
      // }else{
      //   state.dialogo_loader = !state.dialogo_loader
      //   state.estado_sesion=false
      // }
  },
  actions: {
    
  },
  modules: {
    usuarios_store
  }
})
