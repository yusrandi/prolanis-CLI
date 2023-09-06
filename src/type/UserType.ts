export type UserType = {
    id: string
    nama: string
    usia: string
    jk: string
    pekerjaan: string
    berat: string
    tinggi: string
    penyakit: string
    telepon: string
    email: string
    role: string
    status: string
    online: boolean
};

export const emptUser: UserType = {
    id: "",
    email: "",
    online: false,
    nama: "",
    usia: "",
    jk: "",
    pekerjaan: "",
    berat: "",
    tinggi: "",
    penyakit: "",
    telepon: "",
    role: "",
    status: ""
}

