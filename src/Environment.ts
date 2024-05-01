import dotenv from 'dotenv';
dotenv.config();

export default class Environment {
    public static getDatabaseHost(): string | undefined {
        return process.env.DB_HOST;
    }

    public static getDatabaseUser(): string | undefined {
        return process.env.DB_USER;
    }

    public static getDatabasePassword(): string | undefined {
        return process.env.DB_PASSWORD;
    }

    public static getDatabaseName(): string | undefined {
        return process.env.DB_NAME;
    }
}