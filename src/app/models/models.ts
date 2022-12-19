export interface Usuario {
    uid: string,
    nombre: string,
    apellidoPat: string,
    apellidoMat: string,
    run: number,
    dv: string,
    email: string,
    genero: "Masculino" | "Femenino" | "Otro",
    tipo: string

}

export interface Profesor extends Usuario {
    secciones: Seccion[]
}

export interface Alumno extends Usuario {
    carrera: string
    secciones: Seccion[];
}

export interface Seccion {
    nombreSec: string,
    cod: string,
    id: string,
    num: string,
    tipo: "Diurno" | "Vespertino",
    idProfesor: string,
    alumnos: Alumno[],
    asistencias: Asistencia[]
}

export interface Asistencia {
    id: string,
    fecha: Date,
    seccionId: string
}

