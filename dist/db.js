"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
exports.v4 = () => {
    return 'xxxxxxxx'.replace(/[xy]/g, c => {
        var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
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
exports.createPool = (option) => {
    return mysql_1.createPool(option);
};
exports.poolGetConnection = (pool) => {
    return new Promise((ok, fail) => {
        pool.getConnection((err, connection) => {
            if (err) {
                fail(err);
                return;
            }
            connection.config.queryFormat = (query, values) => {
                if (!values)
                    return query;
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
exports.beginTransaction = (connection) => {
    return new Promise((ok, fail) => {
        connection.beginTransaction((err) => {
            if (err) {
                fail(err);
                return;
            }
            ok();
        });
    });
};
exports.rollback = (connection) => {
    return new Promise(ok => {
        connection.rollback(_ => {
            ok();
        });
    });
};
exports.commit = (connection) => {
    return new Promise((ok, fail) => {
        connection.commit((err) => {
            if (err) {
                fail(err);
                return;
            }
            ok();
        });
    });
};
exports.query = (connection, sql, values) => {
    return new Promise((ok, fail) => {
        connection.query(sql, values, (err, results, fields) => {
            if (err) {
                fail(err);
                return;
            }
            ok({ results, fields });
        });
    });
};
//# sourceMappingURL=db.js.map