namespace parcial{
    export interface Vehiculo{
        id:number;
        marca: string;
        modelo: string;
        precio: number;
        tipo: any;
    }
}
namespace parcial{
    export enum Tipo{
        Auto = "Auto",
        Camioneta = "Camioneta"
    }
}

