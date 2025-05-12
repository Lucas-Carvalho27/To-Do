import { pool } from "./db";

interface Tasks {
    nome: string;
    desc: string;
    complete: boolean;
}

export async function insertTask(tasks: Tasks){
    const sql = 'INSERT INTO Tasks (name, description, complete) VALUES (?,?,?)';
    const [result] = await pool.execute(sql, [tasks.nome, tasks.desc, tasks.complete]);

    console.log('Usuario inserido', result);
}