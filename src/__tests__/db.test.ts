import { beginTransaction, commit, rollback, poolGetConnection } from '../db';

describe('db', () => {
    let connection: any;
    let pool: any;
    beforeEach(() => {
        connection = {
            beginTransaction: () => {},
            rollback: () => {},
            commit: () => {},
            config: {
                queryFormat: null
            }
        };

        pool = {
            getConnection: () => {}
        };
    });

    describe('poolGetConnection', () => {
        it('ok', async () => {
            const poolGetConnectionMock = jest.spyOn(pool, 'getConnection');

            poolGetConnectionMock.mockImplementationOnce(cb => {
                cb(null, connection);
            });
            try {
                await poolGetConnection(pool);
                expect(true).toBeTruthy();
            } catch (err) {
                expect(false).toBeTruthy();
            }
            expect(poolGetConnectionMock).toHaveBeenCalled();
        });

        it('fail', async () => {
            const poolGetConnectionMock = jest.spyOn(pool, 'getConnection');

            poolGetConnectionMock.mockImplementationOnce(cb => {
                cb(new Error('error'));
            });
            try {
                await poolGetConnection(pool);
                expect(false).toBeTruthy();
            } catch (err) {
                expect(err).toBeTruthy();
            }
            expect(poolGetConnectionMock).toHaveBeenCalled();
        });
    });

    describe('beginTransaction', () => {
        it('ok', async () => {
            const beginTransactionMock = jest.spyOn(
                connection,
                'beginTransaction'
            );

            beginTransactionMock.mockImplementationOnce(cb => {
                cb(null);
            });
            try {
                await beginTransaction(connection);
                expect(true).toBeTruthy();
            } catch (err) {
                expect(false).toBeTruthy();
            }
            expect(beginTransactionMock).toHaveBeenCalled();
        });

        it('fail', async () => {
            const beginTransactionMock = jest.spyOn(
                connection,
                'beginTransaction'
            );

            beginTransactionMock.mockImplementationOnce(cb => {
                cb(new Error('error'));
            });
            try {
                await beginTransaction(connection);
                expect(false).toBeTruthy();
            } catch (err) {
                expect(err).toBeTruthy();
            }
            expect(beginTransactionMock).toHaveBeenCalled();
        });
    });

    describe('rollback', () => {
        it('ok', async () => {
            const rollbackMock = jest.spyOn(connection, 'rollback');

            rollbackMock.mockImplementationOnce(cb => {
                cb(null);
            });
            try {
                await rollback(connection);
                expect(true).toBeTruthy();
            } catch (err) {
                expect(false).toBeTruthy();
            }
            expect(rollbackMock).toHaveBeenCalled();
        });
    });

    describe('commit', () => {
        it('ok', async () => {
            const commitMock = jest.spyOn(connection, 'commit');

            commitMock.mockImplementationOnce(cb => {
                cb(null);
            });
            try {
                await commit(connection);
                expect(true).toBeTruthy();
            } catch (err) {
                expect(false).toBeTruthy();
            }
            expect(commitMock).toHaveBeenCalled();
        });

        it('fail', async () => {
            const commitMock = jest.spyOn(connection, 'commit');

            commitMock.mockImplementationOnce(cb => {
                cb(new Error('error'));
            });
            try {
                await commit(connection);
                expect(false).toBeTruthy();
            } catch (err) {
                expect(err).toBeTruthy();
            }
            expect(commitMock).toHaveBeenCalled();
        });
    });
});
