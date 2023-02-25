export default{
    namespaced:true,
    state:{
        usuario:{
            usuario_id:'', //int(11) AI PK 
            usuario_nombre:'', //varchar(45) 
            usuario_pw:'', //varchar(50) 
            usuario_detalle_nombre:'', //varchar(100) 
            usuario_dni:'', //char(8) 
            usuario_fecha:'', //varchar(45) 
            usuario_correo:'', //varchar(100) 
            usuario_cargo:'', //enum('administrador','empleado','gerente') 
            usuario_area:'', //varchar(45) 
        }
    },
    mutations: {
        cambiar_data_usuario(state,valor){
            state.usuario.usuario_id=valor.usuario_id //int(11) AI PK 
            state.usuario.usuario_nombre=valor.usuario_nombre //varchar(45) 
            state.usuario.usuario_pw=valor.usuario_pw //varchar(50) 
            state.usuario.usuario_detalle_nombre=valor.usuario_detalle //varchar(100) 
            state.usuario.usuario_dni=valor.usuario_dni //char(8) 
            state.usuario.usuario_fecha=valor.usuario_fecha //varchar(45) 
            state.usuario.usuario_correo=valor.usuario_correo //varchar(100) 
            state.usuario.usuario_cargo=valor.usuario_cargo //enum('administrador','empleado','gerente') 
            state.usuario.usuario_area=valor.usuario_area //varchar(45) 
        }
    },
    actions: {},
    modules: {}
}