import { PoolConnection, FieldInfo, Pool, PoolConfig } from 'mysql';
export interface InsertPacket {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}
export declare const v4: () => string;
/**
 * {
 *   connectionLimit: 3,
 *   host: process.env.DATABASE_HOST,
 *   user: process.env.DATABASE_USER,
 *   password: process.env.DATABASE_PASSWORD,
 *   database: process.env.DATABASE_DATABASE
 * }
 * @param option
 */
export declare const createPool: (option: PoolConfig) => Pool;
export declare const poolGetConnection: (pool: Pool) => Promise<PoolConnection>;
export declare const beginTransaction: (connection: PoolConnection) => Promise<{}>;
export declare const rollback: (connection: PoolConnection) => Promise<{}>;
export declare const commit: (connection: PoolConnection) => Promise<{}>;
export declare const query: <T>(connection: PoolConnection, sql: string, values?: any) => Promise<{
    results: InsertPacket | T[];
    fields: FieldInfo[];
}>;
