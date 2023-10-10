const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#boton-enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineTrough = 'line-trough'
let id = 0;
const LIST=[]

const FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'short', day:'numeric'})

function agregarTarea (tarea,id,realizado,eliminado) {
    if(eliminado){
        return;
    }
    const REALIZADO = realizado ?check :uncheck;
    const LINE = realizado?lineTrough : '';
    const elemento =   `<li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                        </li>
                        `
    lista.insertAdjacentHTML("beforeend", elemento)
}

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineTrough)
    console.log(LIST[element.id].realizado)
    LIST[element.id].realizado = LIST[element.id].realizado ?false:true
    console.log(LIST)
    console.log(LIST[element.id])
    console.log(LIST[element.id].realizado)
    
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
}






botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre: tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
    }
    input.value='';
    id++;
    console.log(LIST)
})

document.addEventListener('keyup', function(event){
    if(event.key=='Enter'){
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea,id,false,false)
        }
        input.value='';
        id++;
        console.log(LIST)
    }
})

lista.addEventListener('click',function(event){
    const element = event.target;
    const elementData = element.attributes.data.value;
    if(elementData==='realizado'){
        tareaRealizada(element)
    }
    else if(elementData==='eliminado'){
        tareaEliminada(element)
    }
})