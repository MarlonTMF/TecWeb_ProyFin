

export interface ProductModel {
    nombre?: string;
    caja?: string;
    precio?:number;
    stock?: number;
    movimiento?: string;
    descripcion?: string;
    imagen_url?:string;
    material_pulsera?:string;
    categoria?:string;
    id?: number;
    mostrarDescripcion?: boolean; // Nueva propiedad para controlar la descripción

}
