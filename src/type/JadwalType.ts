export type JadwalType = {
    id: number;
    title: string
    resep: string
};
export type JadwalDayType = {
    id: number;
    jadwals: JadwalType[]
};