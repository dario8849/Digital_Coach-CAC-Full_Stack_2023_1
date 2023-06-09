const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input'); //esta constante almacenará un arraeglo de todos los inputs y ahora accedo a ellos


const expresiones = {
	nombreApellido: /^[a-zA-ZÀ-ÿ\s]{3,30}$/,    // Letras y espacios, pueden llevar acentos.
	email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, //  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    edad: /^\d{1,2}$/,                   // 1 a 2 dígitos.
	dir: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ0-9!#$%&'*+/=?^_`{|}~-]{3,30}$/,  // Letras y espacios, pueden llevar acentos, y no puede terminar con un espacio en blanco.
    telefono: /^\d{7,14}$/              // 7 a 14 numeros.
};

// Inicializamos los campos con false por defecto 
const campos = {
    nombre: false,
    apellido: false,
    email: false,
    edad: false,
    dir: false,
    telefono: false,
    formacion: false
}

const elegirFormacion = document.querySelector('#formacion');

console.log(elegirFormacion.value);
console.log("No hay una opcion elegida, el Usuario no ha ingresado a este campo !");
console.log(campos.formacion);

elegirFormacion.addEventListener('change', (event) => {
    console.log(elegirFormacion.value);
    console.log("El usuario eligió la formación: " + event.target.value);
    campos.formacion = true;
    console.log("El Usuario Cambió la formación por defecto!!Ha seleccionado opcion: " + event.target.value);
    console.log(campos.formacion);
});

elegirFormacion.addEventListener('blur', event => {
    console.log(event.target.value + "El usuario salió del campo formación")
    if(event.target.value == 'Elige tu preferido...'){
        document.getElementById('formacion').classList.add('formulario__campos-error-select');
        console.log("El Usuario No sa seleccionado opcion: " + event.target.value);
        console.log(campos.formacion)
    }else {
        document.getElementById('formacion').classList.remove('formulario__campos-error-select');
        console.log("El Usuario Cambió la formación por defecto!!Ha seleccionado opcion: " + event.target.value);
        console.log(campos.formacion)
    }
});

let checkbox1 = document.getElementById('cbox1');
let checkbox2 = document.getElementById('cbox2');
let checkbox3 = document.getElementById('cbox3');
let checkbox4 = document.getElementById('cbox4');

checkbox1.addEventListener("change", validaCheckbox, false);
checkbox2.addEventListener("change", validaCheckbox, false);
checkbox3.addEventListener("change", validaCheckbox, false);
checkbox4.addEventListener("change", validaCheckbox, false);

let checkboxValidado = false

function validaCheckbox(){
  let tildado1 = checkbox1.checked;
  let tildado2 = checkbox2.checked;
  let tildado3 = checkbox3.checked;
  let tildado4 = checkbox4.checked;

  if(tildado1 || tildado2 || tildado3 || tildado4){
    //alert('checkbox esta seleccionado');
    checkboxValidado = true;
  }
  return checkboxValidado
};

const validarFormulario = (e) => {
    //para identificar cuál es el campo que queremos validar oportunamente
    switch(e.target.name){
        case "nombre":
            validarCampo(expresiones.nombreApellido, e.target, 'nombre');            
        break;
        case "apellido":
            validarCampo(expresiones.nombreApellido, e.target, 'apellido');  
        break;
        case "email":
            validarCampo(expresiones.email, e.target, 'email');
        break;
        case "edad":
            validarCampo(expresiones.edad, e.target, 'edad');
        break;
        case "dir":
            validarCampo(expresiones.dir, e.target, 'dir');
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
    };
};

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){   // acá se evalua si la expresión ingresada por el usurio es válida
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__campos-error'); //Esto es para que remueva la clase de error el el input luedo de haber habido un error(o sea es para "resetear el estado del campo" y mantiene lo actualizado para cada vez que borremos información que haya sido erronea en el enput y no tener que andar actualizando continuamente el navegador)
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__mensaje-activo');
        campos[campo] = true;
        console.log(campos);
    } else {  // esto ocurrirá si la expresión ingresada por el usuario NO es válida
        document.getElementById(`grupo__${campo}`).classList.add('formulario__campos-error'); 
        document.getElementById(`grupo__${campo}`).classList.add('formulario__mensaje-activo'); 
        campos[campo] = false;
        console.log(campos);
    }
};

//esta función se ejecutará por cada uno de los inputs de nuestra página. Es para comprobar cuando el usuario se encuentre escribiendo adentro de un input y salga del input o dé un click afuera del input.
//cuando el usuario eté ingresado datos en los input y levante deje de apretar la tecla se ejecutará la funcion validar formulario. O sea se ejecutará por cada letra que apriete o click que haga afuera de los campos(salga afuera de los mismos).
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario); 
    input.addEventListener('blur', validarFormulario);
    console.log("pasó por acá!!");
});


formulario.addEventListener('submit', (e)=> {
    e.preventDefault();    ////esta funcion es para que el usurio no envíe los datos dejando campos sin completar. Lo que hace es evitar que el formulario envíe los datos al apretar el boton si no se han completado todos los campos. O sea no deja que se envíen los datos al apretar el botón tipo submit
    if( campos.nombre && campos.apellido && campos.email && campos.edad && campos.dir && campos.telefono && campos.formacion && checkboxValidado==true ) {
        formulario.reset()
        console.log("Se validó todo con éxito  !!!!");
        document.getElementById('formulario__mensaje-error').classList.remove('formulario__mensaje-error-texto-activo');
        document.getElementById('formulario-msj-exito').classList.add('formulario-msj-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario-msj-exito').style.display = 'none';
        }, 3000);
    } else {
        console.log(" Algo no se validó correctante  !!!!");
        document.getElementById('formulario-msj-exito').classList.remove('formulario-msj-exito-activo');
        document.getElementById('formulario__mensaje-error').classList.add('formulario__mensaje-error-texto-activo');
    }
});