import { Direito } from "./Direito";

export class Jogador{
    id: number;
    nome: string;
    email: string;
    password: string;
    status: boolean; 

    constructor(id: number, nome: string, email: string, password: string, status: boolean){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.status = status;
    }
}