var parcial;
(function (parcial) {
    var Auto = /** @class */ (function () {
        function Auto(id, marca, modelo, precio, cantPuertas, tipo) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
            this.cantPuertas = cantPuertas;
            this.tipo = tipo;
        }
        return Auto;
    }());
    parcial.Auto = Auto;
})(parcial || (parcial = {}));
