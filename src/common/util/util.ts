export class Util {
    static removeMaskCpf(cpf: string) {
        return cpf.replace(/[^\d]+/g,'')
    }
}