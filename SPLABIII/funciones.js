var parcial;
(function (parcial) {
    var select;
    var lista = new Array();
    var listaFiltrada = new Array();
    var frmDatos;
    var frm;
    var btnCerrar;
    var thead;
    var btnModificar;
    var btnBaja;
    var filtrarTipo;
    var promediotxt;
    window.addEventListener('load', function () {
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
        if (lista.length < 0) {
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
            var tipo = e.target.value.toLowerCase();
            listaFiltrada = lista.filter(function (item) {
                var t = item.tipo.toLowerCase();
                return (t == tipo);
            });
            var promedio = lista
                .map(function (item) {
                return item.precio;
            })
                .reduce(function (previo, actual) {
                console.log(previo);
                console.log(actual);
                return (previo + actual) / (listaFiltrada.length);
            });
            promediotxt.value = promedio;
            CrearTabla(listaFiltrada);
        });
    });
    function seleccionarTipo() {
        var selectTipo = document.getElementById('tipoVehitxt');
        selectTipo.addEventListener('change', filtrarCamposVehiculo);
    }
    parcial.seleccionarTipo = seleccionarTipo;
    function ocultarCampos() {
        var divAuto = document.getElementById('auto');
        var divCamio = document.getElementById('camioneta');
        divAuto.hidden = true;
        divCamio.hidden = true;
    }
    parcial.ocultarCampos = ocultarCampos;
    function filtrarCamposVehiculo(e) {
        var btnAgregarAuto = document.getElementById('btnAltaAuto');
        var btnAgregarCamio = document.getElementById('btnAltaCamio');
        var divAuto = document.getElementById('auto');
        var divCamio = document.getElementById('camioneta');
        if (e.target.value == parcial.Tipo.Auto) {
            divAuto.hidden = false;
            divCamio.hidden = true;
            btnAgregarAuto.addEventListener('click', altaAuto);
        }
        else if (e.target.value == parcial.Tipo.Camioneta) {
            divAuto.hidden = true;
            divCamio.hidden = false;
            btnAgregarCamio.addEventListener('click', altaCamio);
        }
        else {
            ocultarCampos();
        }
    }
    parcial.filtrarCamposVehiculo = filtrarCamposVehiculo;
    function altaAuto() {
        var marca = document.getElementById('marcatxt').value;
        var modelo = document.getElementById('modelotxt').value;
        var precio = document.getElementById('preciotxt').value;
        var cantPuertas = document.getElementById('puertastxt').value;
        var id = idVehiculos();
        var vehiculo = new parcial.Auto(id, marca, modelo, parseFloat(precio), parseInt(cantPuertas), parcial.Tipo.Auto);
        lista.push(vehiculo);
        CrearTabla(lista);
    }
    parcial.altaAuto = altaAuto;
    ;
    function altaCamio() {
        var marca = document.getElementById('marcaCtxt').value;
        var modelo = document.getElementById('modeloCtxt').value;
        var precio = document.getElementById('precioCtxt').value;
        var cuatroXcuatro = document.getElementById('cuatroXcuatrotxt').value;
        var id = idVehiculos();
        var vehiculo = new parcial.Camioneta(id, marca, modelo, parseFloat(precio), cuatroXcuatro, parcial.Tipo.Camioneta);
        lista.push(vehiculo);
        CrearTabla(lista);
    }
    parcial.altaCamio = altaCamio;
    ;
    function baja() {
        var baja = obtenerDato(frm);
        lista.forEach(function (item) {
            if (baja.id == item.id) {
                var pos = lista.indexOf(item);
                lista.splice(pos, 1);
                console.log("Vehiculo Eliminado");
            }
            ;
        });
        console.log(lista);
    }
    parcial.baja = baja;
    function modificar() {
        var modif = obtenerDato(frm);
        console.log(modif);
        lista.forEach(function (item) {
            if (modif.id == item.id) {
                item.marca = modif.marca;
                item.modelo = modif.modelo;
                item.precio = modif.precio;
                if (item.tipo == parcial.Tipo.Auto) {
                    item.cantPuertas = modif.cantPuertas;
                    item.tipo = parcial.Tipo.Auto;
                }
                else if (item.tipo == parcial.Tipo.Camioneta) {
                    item.cuatroXcuatro = modif.cuatroXcuatro;
                    item.tipo = parcial.Tipo.Camioneta;
                }
                console.log(item);
                console.log("Vehiculo modificado");
            }
            ;
        });
    }
    parcial.modificar = modificar;
    ;
    function cargarSelect() {
        select = document.getElementById('tipoVehitxt');
        for (var key in parcial.Tipo) {
            if (isNaN(Number(key))) {
                var option = document.createElement('option');
                var texto = document.createTextNode(key);
                option.appendChild(texto);
                option.setAttribute('value', key);
                select.add(option);
                //filtrarTipo.appendChild(option);              
            }
        }
    }
    parcial.cargarSelect = cargarSelect;
    function cargarSelectFiltro() {
        filtrarTipo = document.getElementById('filtrarTipo');
        for (var key in parcial.Tipo) {
            if (isNaN(Number(key))) {
                var option = document.createElement('option');
                var texto = document.createTextNode(key);
                option.appendChild(texto);
                option.setAttribute('value', key);
                select.add(option);
                filtrarTipo.appendChild(option);
            }
        }
    }
    parcial.cargarSelectFiltro = cargarSelectFiltro;
    //TABLA
    function CrearTabla(lista) {
        var divTabla = document.getElementById("cuerpoTabla");
        try {
            while (divTabla.hasChildNodes()) {
                divTabla.removeChild(divTabla.childNodes[0]);
            }
            thead.hidden = false;
            lista.forEach(function (item) {
                var auxVehiculo;
                var row = document.createElement('tr');
                var tdMarca;
                var datoMarca;
                var tdModelo;
                var datoModelo;
                var tdPrecio;
                var datoPrecio;
                var tdTipo;
                var datoTipo;
                var tdId;
                var datoId;
                if (item.tipo == parcial.Tipo.Auto) {
                    auxVehiculo = item;
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
                    var tdPuertas = document.createElement('td');
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
                if (item.tipo == parcial.Tipo.Camioneta) {
                    auxVehiculo = item;
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
                    var tdCuatro = document.createElement('td');
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
        catch (_a) {
            console.log("error en tabla");
        }
        return divTabla;
    }
    parcial.CrearTabla = CrearTabla;
    function cargarFormulario(e) {
        var tr = e.target.parentElement;
        var nodes = tr.childNodes;
        var dato;
        if (nodes[5].textContent == parcial.Tipo.Auto) {
            dato = new parcial.Auto(nodes[0].textContent, nodes[1].textContent, nodes[2].textContent, nodes[3].textContent, nodes[4].textContent, nodes[5].textContent);
        }
        else if (nodes[5].textContent == parcial.Tipo.Camioneta) {
            dato = new parcial.Camioneta(nodes[0].textContent, nodes[1].textContent, nodes[2].textContent, nodes[3].textContent, nodes[4].textContent, nodes[5].textContent);
        }
        cargarForm(dato);
        Abrir();
    }
    parcial.cargarFormulario = cargarFormulario;
    function cargarForm(dato) {
        var id = document.getElementById('txtId');
        var marca = document.getElementById('txtMarca');
        var modelo = document.getElementById('txtModelo');
        var precio = document.getElementById('precioA');
        var tipo = document.getElementById('tipotxt');
        detalle(dato);
        id.value = dato.id;
        marca.value = dato.marca;
        modelo.value = dato.modelo;
        console.log(dato.modelo);
        precio.value = dato.precio;
        tipo.value = dato.tipo;
    }
    parcial.cargarForm = cargarForm;
    function detalle(dato) {
        var auto = document.getElementById('txtPuertas');
        var camio = document.getElementById('txtcuatroXcuatro');
        var puertas = document.getElementById('puertasA');
        var cXc = document.getElementById('4x4');
        if (dato.tipo == parcial.Tipo.Auto) {
            auto.hidden = false;
            camio.hidden = true;
            puertas.value = dato.cantPuertas;
        }
        else if (dato.tipo == parcial.Tipo.Camioneta) {
            auto.hidden = true;
            camio.hidden = false;
            cXc.value = dato.cuatroXcuatro;
        }
    }
    parcial.detalle = detalle;
    function obtenerDato(frm) {
        var id;
        var vehiculo;
        var marca;
        var modelo;
        var precio;
        var puertas;
        var cXc;
        var tipo;
        for (var index = 0; index < frm.length; index++) {
            var element = frm[index];
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
        if (tipo == parcial.Tipo.Auto) {
            vehiculo = new parcial.Auto(id, marca, modelo, precio, puertas, tipo);
        }
        else if (tipo == parcial.Tipo.Camioneta) {
            vehiculo = new parcial.Camioneta(id, marca, modelo, precio, cXc, tipo);
        }
        return vehiculo;
    }
    parcial.obtenerDato = obtenerDato;
    function Abrir() {
        var form = document.getElementById('formDatos');
        var overlay = document.getElementById('overlay');
        overlay.classList.add('active');
        form.hidden = false;
    }
    parcial.Abrir = Abrir;
    function Cerrar() {
        var form = document.getElementById('formDatos');
        var overlay = document.getElementById('overlay');
        overlay.classList.remove('active');
        form.hidden = true;
    }
    parcial.Cerrar = Cerrar;
    function idVehiculos() {
        return lista.reduce(function (id) {
            return id = id + 1;
        }, 0);
    }
    parcial.idVehiculos = idVehiculos;
})(parcial || (parcial = {}));
