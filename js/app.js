document.addEventListener('DOMContentLoaded', function(){
    //definicion de variables para inputs
    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')

    //eventos sobre inputs
    inputEmail.addEventListener('blur', validar)
    inputAsunto.addEventListener('blur', validar)
    inputMensaje.addEventListener('blur', validar)


    function validar(e){
        const posicion = e.target.parentElement //se toma el div del input que activa el evento
        if(e.target.value.trim() === ''){
            mostrarAlerta(`el campo ${e.target.id} esta vacio`, posicion)
        }else{
            limpiarAlerta(posicion)
        }
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


    function limpiarAlerta(posicion){
       const  alerta = posicion.querySelector('.bg-red-600')
        if(alerta){
            alerta.remove()
            console.log(alerta)
        }
        
    }













})