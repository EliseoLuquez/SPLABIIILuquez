var parcial;
(function (parcial) {
    var Camioneta = /** @class */ (function () {
        function Camioneta(id, marca, modelo, precio, cuatroXcuatro, tipo) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
            this.cuatroXcuatro = cuatroXcuatro;
            this.tipo = tipo;
        }
        return Camioneta;
    }());
    parcial.Camioneta = Camioneta;
})(parcial || (parcial = {}));
