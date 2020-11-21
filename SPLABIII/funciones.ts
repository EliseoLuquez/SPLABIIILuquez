namespace parcial {
    var select;
    var lista: Array<Vehiculo> = new Array<Vehiculo>();
    var listaFiltrada: Array<Vehiculo> = new Array<Vehiculo>();
    var frmDatos;
    var frm;
    var btnCerrar;
    var thead;
    var btnModificar;
    var btnBaja;
    var filtrarTipo;  
    var promediotxt;  


    window.addEventListener('load', () => {
        frm = document.forms[0];
        frmDatos = document.getElementById('formDatos');
        btnCerrar = document.getElementById('btnCerrar');
        btnModificar = document.getElementById('btnModificar');
        btnBaja = document.getElementById('btnBaja');
        thead = document.getElementById('thead');
        filtrarTipo = document.getElementById('filtrarTipo');
        promediotxt = document.getElementById('promedio');
        thead.hidden = true;
        Cerrar();
        ocultarCampos();
        cargarSelect();
        cargarSelectFiltro();
        seleccionarTipo();
        if(lista.length < 0)
        {
            CrearTabla(lista);
        }
        //let boton = document.getElementById('btnHacerRuido');
        //boton.addEventListener('click', animalHaceRuido);

        btnCerrar.addEventListener('click', function (e) {
            Cerrar();
        });

        btnModificar.addEventListener('click', function (e) {
            modificar();
            Cerrar();
            CrearTabla(lista);
        });

        btnBaja.addEventListener('click', function (e) {
            Cerrar();
            baja();
            CrearTabla(lista);
        });

        filtrarTipo.addEventListener('change', function (e) {
            
            let tipo = e.target.value.toLowerCase();
            listaFiltrada = lista.filter(function (item) {
               var  t = item.tipo.toLowerCase();
                return (t == tipo)
            });

            var promedio = lista
                .map(function (item) {
                    return item.precio;
                })
                .reduce(function (previo, actual) {
                    console.log(previo);
                    console.log(actual);
                    return (previo + actual) / (listaFiltrada.length);
                })
                promediotxt.value = promedio;

           CrearTabla(listaFiltrada);
        
        });
     


    });

    export function seleccionarTipo() {
        let selectTipo = (<HTMLElement>document.getElementById('tipoVehitxt'));
        selectTipo.addEventListener('change', filtrarCamposVehiculo);

    }

    export function ocultarCampos() {
        var divAuto = (<HTMLElement>document.getElementById('auto'));
        var divCamio = (<HTMLElement>document.getElementById('camioneta'));
        divAuto.hidden = true;
        divCamio.hidden = true;
    }

    export function filtrarCamposVehiculo(e) {

        var btnAgregarAuto = (<HTMLInputElement>document.getElementById('btnAltaAuto'));
        var btnAgregarCamio = (<HTMLInputElement>document.getElementById('btnAltaCamio'));
        var divAuto = (<HTMLElement>document.getElementById('auto'));
        var divCamio = (<HTMLElement>document.getElementById('camioneta'));

        if (e.target.value == Tipo.Auto) {
            divAuto.hidden = false;
            divCamio.hidden = true;
            btnAgregarAuto.addEventListener('click', altaAuto);
        }
        else if (e.target.value == Tipo.Camioneta) {
            divAuto.hidden = true;
            divCamio.hidden = false;
            btnAgregarCamio.addEventListener('click', altaCamio);
        }
        else 
        {
            ocultarCampos();
        }
    }

    export function altaAuto() {
        var marca = (<HTMLInputElement>document.getElementById('marcatxt')).value;
        var modelo = (<HTMLInputElement>document.getElementById('modelotxt')).value;
        var precio = (<HTMLInputElement>document.getElementById('preciotxt')).value;
        var cantPuertas = (<HTMLInputElement>document.getElementById('puertastxt')).value;
        var id = idVehiculos();
        let vehiculo: Auto = new Auto(id, marca, modelo, parseFloat(precio), parseInt(cantPuertas), Tipo.Auto);
        lista.push(vehiculo);
        CrearTabla(lista);
    };

    export function altaCamio() {
        var marca = (<HTMLInputElement>document.getElementById('marcaCtxt')).value;
        var modelo = (<HTMLInputElement>document.getElementById('modeloCtxt')).value;
        var precio = (<HTMLInputElement>document.getElementById('precioCtxt')).value;
        var cuatroXcuatro = (<HTMLInputElement>document.getElementById('cuatroXcuatrotxt')).value;
        var id = idVehiculos();
        let vehiculo: Camioneta = new Camioneta(id, marca, modelo, parseFloat(precio), cuatroXcuatro, Tipo.Camioneta);
        lista.push(vehiculo);
        CrearTabla(lista);
    };

    export function baja() {
        var baja = obtenerDato(frm);
        lista.forEach((item) => {
            if (baja.id == item.id) {
                let pos = lista.indexOf(item);
                lista.splice(pos, 1);
                
                console.log("Vehiculo Eliminado");
            };
        });
        console.log(lista);
    }

    export function modificar() {
        var modif = obtenerDato(frm);
        console.log(modif);
        lista.forEach((item) => {
            if (modif.id == item.id) {
                item.marca = modif.marca;
                item.modelo = modif.modelo;
                item.precio = modif.precio;
                if (item.tipo == Tipo.Auto) {
                    (<Auto>item).cantPuertas = modif.cantPuertas;
                    item.tipo = Tipo.Auto;
                }
                else if (item.tipo == Tipo.Camioneta) {
                    (<Camioneta>item).cuatroXcuatro = modif.cuatroXcuatro;
                    item.tipo = Tipo.Camioneta;
                }
                console.log(item);
                console.log("Vehiculo modificado");
            };
        });
    };

    export function cargarSelect() {
        select = (<HTMLTableElement>document.getElementById('tipoVehitxt'));
        for (const key in Tipo) {
            if (isNaN(Number(key))) {
                var option = document.createElement('option');
                let texto = document.createTextNode(key);
                option.appendChild(texto);
                option.setAttribute('value', key);
                select.add(option);
                //filtrarTipo.appendChild(option);              
            }
        }
    }
    export function cargarSelectFiltro() {
        filtrarTipo = (<HTMLTableElement>document.getElementById('filtrarTipo'));
        for (const key in Tipo) {
            if (isNaN(Number(key))) {
                var option = document.createElement('option');
                let texto = document.createTextNode(key);
                option.appendChild(texto);
                option.setAttribute('value', key);
                select.add(option);
                filtrarTipo.appendChild(option);              
            }
        }
    }

    //TABLA
    export function CrearTabla(lista: Array<Vehiculo>) {
        var divTabla = (<HTMLElement>document.getElementById("cuerpoTabla"));

        try {
            while (divTabla.hasChildNodes()) {
                divTabla.removeChild(divTabla.childNodes[0]);
            }

            thead.hidden = false;


            lista.forEach((item: Vehiculo) => {
                var auxVehiculo;
                var row = document.createElement('tr');
                let tdMarca;
                var datoMarca;
                let tdModelo;
                var datoModelo;
                let tdPrecio;
                var datoPrecio;
                let tdTipo;
                var datoTipo;
                var tdId;
                var datoId;
                
                if (item.tipo == Tipo.Auto) {
                    auxVehiculo = <Auto>item;
                    
                    tdId = document.createElement('td');
                    datoId = document.createTextNode(auxVehiculo.id);
                    tdId.addEventListener('dblclick', cargarFormulario);
                    tdId.appendChild(datoId);
                    row.appendChild(tdId);
                    
                    tdMarca = document.createElement('td');
                    datoMarca = document.createTextNode(auxVehiculo.marca);
                    tdMarca.addEventListener('dblclick', cargarFormulario);
                    tdMarca.appendChild(datoMarca);
                    row.appendChild(tdMarca);

                    tdModelo = document.createElement('td');
                    datoModelo = document.createTextNode(auxVehiculo.modelo);
                    tdModelo.addEventListener('dblclick', cargarFormulario);
                    tdModelo.appendChild(datoModelo);
                    row.appendChild(tdModelo);

                    tdPrecio = document.createElement('td');
                    datoPrecio = document.createTextNode(auxVehiculo.precio);
                    tdPrecio.addEventListener('dblclick', cargarFormulario);
                    tdPrecio.appendChild(datoPrecio);
                    row.appendChild(tdPrecio);
                    
                    let tdPuertas = document.createElement('td');
                    var datosPuertas = document.createTextNode(auxVehiculo.cantPuertas);
                    tdPuertas.addEventListener('dblclick', cargarFormulario);
                    tdPuertas.appendChild(datosPuertas);
                    row.appendChild(tdPuertas);

                    tdTipo = document.createElement('td');
                    datoTipo = document.createTextNode(auxVehiculo.tipo);
                    tdTipo.addEventListener('dblclick', cargarFormulario);
                    tdTipo.appendChild(datoTipo);
                    row.appendChild(tdTipo);

                    divTabla.appendChild(row);
                }
                if (item.tipo == Tipo.Camioneta) {
                    auxVehiculo = <Camioneta>item;
                    
                    tdId = document.createElement('td');
                    datoId = document.createTextNode(auxVehiculo.id);
                    tdId.addEventListener('dblclick', cargarFormulario);
                    tdId.appendChild(datoId);
                    row.appendChild(tdId);

                    tdMarca = document.createElement('td');
                    datoMarca = document.createTextNode(auxVehiculo.marca);
                    tdMarca.addEventListener('dblclick', cargarFormulario);
                    tdMarca.appendChild(datoMarca);
                    row.appendChild(tdMarca);
                    
                    tdModelo = document.createElement('td');
                    datoModelo = document.createTextNode(auxVehiculo.modelo);
                    tdModelo.addEventListener('dblclick', cargarFormulario);
                    tdModelo.appendChild(datoModelo);
                    row.appendChild(tdModelo);

                    tdPrecio = document.createElement('td');
                    datoPrecio = document.createTextNode(auxVehiculo.precio);
                    tdPrecio.addEventListener('dblclick', cargarFormulario);
                    tdPrecio.appendChild(datoPrecio);
                    row.appendChild(tdPrecio);
                    let tdCuatro = document.createElement('td');
                    var datoCuatro = document.createTextNode(auxVehiculo.cuatroXcuatro);
                    tdCuatro.addEventListener('dblclick', cargarFormulario);
                    tdCuatro.appendChild(datoCuatro);
                    row.appendChild(tdCuatro);

                    tdTipo = document.createElement('td');
                    datoTipo = document.createTextNode(auxVehiculo.tipo);
                    tdTipo.addEventListener('dblclick', cargarFormulario);
                    tdTipo.appendChild(datoTipo);
                    row.appendChild(tdTipo);

                    divTabla.appendChild(row);
                }
            });
        }
        catch
        {
            console.log("error en tabla")
        }

        return divTabla;
    }

    export function cargarFormulario(e) {
        let tr = e.target.parentElement;
        let nodes = tr.childNodes;
        let dato;
        if (nodes[5].textContent == Tipo.Auto) {
            dato = new Auto(nodes[0].textContent, nodes[1].textContent, nodes[2].textContent, nodes[3].textContent, nodes[4].textContent, nodes[5].textContent);
        }
        else if (nodes[5].textContent == Tipo.Camioneta) {
            dato = new Camioneta(nodes[0].textContent, nodes[1].textContent, nodes[2].textContent, nodes[3].textContent, nodes[4].textContent, nodes[5].textContent);
        }
        cargarForm(dato);
        Abrir();
    }

    export function cargarForm(dato) {
        var id = (<HTMLInputElement>document.getElementById('txtId'));
        var marca = (<HTMLInputElement>document.getElementById('txtMarca'));
        var modelo = (<HTMLInputElement>document.getElementById('txtModelo'));
        var precio = (<HTMLInputElement>document.getElementById('precioA'));
        var tipo = (<HTMLInputElement>document.getElementById('tipotxt'));
        detalle(dato);
        id.value = dato.id;
        marca.value = dato.marca;
        modelo.value = dato.modelo;
        console.log(dato.modelo );
        precio.value = dato.precio;
        tipo.value = dato.tipo;
    }

    export function detalle(dato) {
        var auto: HTMLElement = (<HTMLElement>document.getElementById('txtPuertas'));
        var camio: HTMLElement = (<HTMLElement>document.getElementById('txtcuatroXcuatro'));

        var puertas = (<HTMLInputElement>document.getElementById('puertasA'));
        var cXc = (<HTMLInputElement>document.getElementById('4x4'));

        if (dato.tipo == Tipo.Auto) {
            auto.hidden = false;
            camio.hidden = true;
            puertas.value = dato.cantPuertas;
        }
        else if (dato.tipo == Tipo.Camioneta) {
            auto.hidden = true;
            camio.hidden = false;
            cXc.value = dato.cuatroXcuatro;
        }
    }

    export function obtenerDato(frm) {
        var id;
        var vehiculo;
        var marca;
        var modelo;
        var precio;
        var puertas;
        var cXc;
        var tipo;

        for (let index = 0; index < frm.length; index++) {
            const element = frm[index];
            switch (element.name) {
                case 'id':
                    id = element.value;
                    break;
                case 'vMarca':
                    marca = element.value;
                    break;
                case 'vModelo':
                        modelo = element.value;
                    break;
                case 'vPrecio':
                        precio = element.value;
                    break;
                case 'aPuertas':
                    if (element.value != null) {
                        puertas = element.value;
                    }
                    break;
                case 'cCuatroXcuatro':
                    if (element.value != null) {
                        cXc = element.value;
                    }
                        break;
                case 'tipo':
                    tipo = element.value;
                    break;
            }
        }
        if (tipo == Tipo.Auto) {
            vehiculo = new Auto(id, marca, modelo, precio, puertas, tipo);
        }
        else if (tipo == Tipo.Camioneta) {
            vehiculo = new Camioneta(id, marca, modelo, precio, cXc, tipo);
        }
        return vehiculo;
    }

    export function Abrir() {
        var form = document.getElementById('formDatos');
        var overlay = document.getElementById('overlay');
        overlay.classList.add('active');
        form.hidden = false;
    }

    export function Cerrar() {
        var form = document.getElementById('formDatos');
        var overlay = document.getElementById('overlay');
        overlay.classList.remove('active');
        form.hidden = true;
    }

    export function idVehiculos(){
        return lista.reduce((id)=>{
            return id = id + 1;
          },0);
    }
}

