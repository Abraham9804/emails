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
    const btnReset = document.querySelector('#formulario button[type=reset]')

    //eventos sobre inputs
    inputEmail.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)

    btnReset.addEventListener('click', function(e){
        e.preventDefault()
        Swal.fire({
            title: "Está seguro?",
            text: "El formulario se reiniciará",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar!",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
            formulario.reset()
              Swal.fire({
                title: "confirmado!",
                text: "Los datos han sido borrados",
                icon: "success"
              });
            }else{
                Swal.fire({
                    title: "Cancelado!",
                    text: "Los datos no han sido borrados",
                    icon: "error"
                  });
            }
          });
        //
    })


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