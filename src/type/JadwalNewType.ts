import { ResepType } from "./ResepType";

export type JadwalResepType = {
    id: number, title: string, resep: ResepType
}
export type JadwalMakananType = {
    id: number
    title: string
    reseps: JadwalResepType[]
};
export type JadwalNewType = {
    id: number
    title: string
    makanans: JadwalMakananType[]
};