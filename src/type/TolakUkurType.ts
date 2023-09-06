export type TolakUkurJawaban = {
    id: number,
    title: string
}
export type TolakUkurType = {
    id: string;
    soal: string,
    sound: string,
    jawabans: TolakUkurJawaban[]
};