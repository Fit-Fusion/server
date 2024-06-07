import mysql, { Connection } from 'mysql';
import Environment from './Environment.js';

export default class Database {
    private static connection: Connection;

    public static getConnection(): Connection {
        if (this.connection) {
            return this.connection;
        }

        this.connection = mysql.createConnection({
            host: Environment.getDatabaseHost(),
            user: Environment.getDatabaseUser(),
            password: Environment.getDatabasePassword(),
            database: Environment.getDatabaseName()
        });

        this.connection.connect();
        return this.connection;
    }

    public static async runQuery<T>(query: string): Promise<T> {
        const connection = Database.getConnection();
        return new Promise<T>((resolve, reject) => {
            connection.query(query, (err: any, results: T | PromiseLike<T>) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}