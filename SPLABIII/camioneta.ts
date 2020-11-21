namespace parcial{
    export class Camioneta implements Vehiculo{
        id: number;
        marca: string;
        modelo: string;
        precio: number;
        cuatroXcuatro: string;
        tipo: Tipo
        
        constructor(id: number, marca?:string, modelo?:string, precio?:number, cuatroXcuatro?: string, tipo?:Tipo){
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
            this.cuatroXcuatro = cuatroXcuatro;
            this.tipo = tipo;
        }
    }

}