declare module 'mysql' {
    export interface ConnectionParams {
        host: string | undefined,
        user: string | undefined,
        password: string | undefined,
        database: string | undefined
    }

    export interface Connection {
        [x: string]: any
        connect: () => void,
        awaitQuery: <T>(query: string) => Promise<T>
    }
    
    export function createConnection(params: ConnectionParams): Connection;
}