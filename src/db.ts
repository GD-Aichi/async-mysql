import {
    createPool as createPoolMySQL,
    PoolConnection,
    FieldInfo,
    Pool,
    PoolConfig
} from 'mysql';

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

export const v4 = () => {
    return 'xxxxxxxx'.replace(/[xy]/g, c => {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

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
export const createPool = (option: PoolConfig): Pool => {
    return createPoolMySQL(option);
};

export const poolGetConnection = (pool: Pool): Promise<PoolConnection> => {
    return new Promise((ok, fail) => {
        pool.getConnection((err: any, connection: PoolConnection) => {
            if (err) {
                fail(err);
                return;
            }
            connection.config.queryFormat = (query, values) => {
                if (!values) return query;
                return query.replace(/\:(\w+)/g, (txt, key) => {
                    if (values.hasOwnProperty(key)) {
                        return connection.escape(values[key]);
                    }
                    return txt;
                });
            };
            ok(connection);
        });
    });
};

export const beginTransaction = (connection: PoolConnection) => {
    return new Promise((ok, fail) => {
        connection.beginTransaction((err: any) => {
            if (err) {
                fail(err);
                return;
            }
            ok();
        });
    });
};

export const rollback = (connection: PoolConnection) => {
    return new Promise(ok => {
        connection.rollback(_ => {
            ok();
        });
    });
};

export const commit = (connection: PoolConnection) => {
    return new Promise((ok, fail) => {
        connection.commit((err: any) => {
            if (err) {
                fail(err);
                return;
            }
            ok();
        });
    });
};

export const query = <T>(
    connection: PoolConnection,
    sql: string,
    values?: any
): Promise<{ results: T[] | InsertPacket; fields: FieldInfo[] }> => {
    return new Promise((ok, fail) => {
        connection.query(
            sql,
            values,
            (err: any, results: Array<T>, fields: FieldInfo[]) => {
                if (err) {
                    fail(err);
                    return;
                }
                ok({ results, fields });
            }
        );
    });
};
