document.addEventListener('DOMContentLoaded', function(){
    const correo = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    

    //definicion de variables para inputs
    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')
    const btnEnviar = document.querySelector('#botones').children[0]
    
    //eventos sobre inputs
    inputEmail.addEventListener('blur', validar)
    inputAsunto.addEventListener('blur', validar)
    inputMensaje.addEventListener('blur', validar)


    function validar(e){
        //se toma el div del input que activa el evento
        const posicion = e.target.parentElement 

        //comprueba campos vacios, muestra un mensaje y establece como vacio su campo en el objeto correo
        if(e.target.value.trim() === ''){
            mostrarAlerta(`el campo ${e.target.id} esta vacio`, posicion)
            correo[e.target.id] = ''
             //comprobacion de objeto correo en cada iteracion
             comprobarCorreo()
            return
        }

        //comprueba que el id sea email y que contenga un formato de correo valido
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('el correo no es valido', posicion)
            correo[e.target.id] = ''
             //comprobacion de objeto correo 
             comprobarCorreo()
            return
        }

        
            limpiarAlerta(posicion)

            //asignar valores dinamicamente al objeto correo
            correo[e.target.id] = e.target.value.trim().toLowerCase()
            
            comprobarCorreo()
            console.log(correo)
    }

    function mostrarAlerta(mensaje, posicion){
        //funcion para mostrar solo una alerta por input
        limpiarAlerta(posicion)

        //funcion para generar la alerta en el input vacio
        const alerta = document.createElement('P')
        alerta.textContent = mensaje
        alerta.classList.add('bg-red-600','text-white','p-2', 'text-center')
        posicion.appendChild(alerta)
      
    }

    //funcion que limpia la alerta de campo vacio
    function limpiarAlerta(posicion){
       const  alerta = posicion.querySelector('.bg-red-600')
        if(alerta){
            alerta.remove()
            console.log(alerta)
        }
        
    }

    //valida que el correo tenga un formato valido
    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        resultado = regex.test(email)
        return resultado
    }


    //comprueba que no haya campos vacios y activa el btn enviar
    function comprobarCorreo(){
       if(Object.values(correo).includes('')){
            btnEnviar.classList.add('opacity-50')
            btnEnviar.disabled = true
            return
        }
            //activa el btn enviar si ya no hay campos vacios en el formulario
            btnEnviar.classList.remove('opacity-50')
            btnEnviar.disabled = false
            console.log('desde else')
    }









})