document.addEventListener('DOMContentLoaded', function(){
    
    //definicion de variables para inputs
    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')
    const btnEnviar = document.querySelector('#botones').children[0]
    const btnReset = document.querySelector('#formulario button[type=reset]')
    const spinner = document.querySelector('#spinner')
    const inputCc = document.querySelector('#cc')
    //Inicializacion del objeto correo
    const correo = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: ''
    }

    //eventos sobre inputs
    inputEmail.addEventListener('input', validar)
    inputCc.addEventListener('input', validar)
    inputAsunto.addEventListener('blur', validar)
    inputMensaje.addEventListener('blur', validar)


    //Funcion para activar spinner y reiniciar formulario despues de su envio
    formulario.addEventListener('submit', function(e){
        e.preventDefault()
        spinner.classList.remove('hidden')
        spinner.classList.add('flex')
        console.log(spinner)
        setTimeout(() =>{
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')
            resetFormulario()
            Swal.fire({
                title: "El correo fue enviado con exito",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
              });
        }, 3000)
    })

    //Funcion para btn reset en formulario
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
                resetFormulario()
                console.log(correo)
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
    })


    //Funcion para validar inputs
    function validar(e){
        //se toma el div del input que activa el evento
        const posicion = e.target.parentElement  

        //comprueba campos vacios, muestra un mensaje y establece como vacio su campo en el objeto correo
        if(e.target.value.trim() === ''){
            mostrarAlerta(`el campo ${e.target.id} esta vacio`, posicion)
            correo[e.target.id] = ''
             comprobarCorreo() //comprobacion de objeto correo en cada iteracion
            return
        }

        //comprueba que el id sea email y que contenga un formato de correo valido
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('el correo no es valido', posicion)
            correo[e.target.id] = ''
            comprobarCorreo()
            return
        }

        //comprueba que el id sea cc y que contenga un formato de correo valido
        if(e.target.id === 'cc' && !validarEmail(e.target.value)){
            mostrarAlerta('el correo no es valido', posicion)
            correo[e.target.id] = ''
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

    //reinicia los inputs del formulario y establece vacios los campos del objeto correo
    function resetFormulario(){
        correo.email = '',
        correo.cc = '',
        correo.asunto = '',
        correo.mensaje = '',
        formulario.reset()
        comprobarCorreo()
    }






})