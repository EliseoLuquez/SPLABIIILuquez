namespace parcial{
    export class Auto implements Vehiculo{
        id: number;
        marca: string;
        modelo: string;
        precio: number;
        cantPuertas: number;
        tipo: Tipo;
        
        constructor(id: number, marca?:string, modelo?:string, precio?:number, cantPuertas?: number, tipo?: Tipo){
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
            this.cantPuertas = cantPuertas;
            this.tipo = tipo;
        }
    }

}