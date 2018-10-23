import { beginTransaction, commit, rollback } from '../db';

describe('db', () => {
    let connection: any;
    beforeEach(() => {
        connection = {
            beginTransaction: () => {},
            rollback: () => {},
            commit: () => {}
        };
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
            } catch (err) {}
            expect(beginTransactionMock).toHaveBeenCalled();
        });

        it('fail', async () => {
            const beginTransactionMock = jest.spyOn(
                connection,
                'beginTransaction'
            );

            beginTransactionMock.mockImplementationOnce(cb => {
                cb(true);
            });
            try {
                await beginTransaction(connection);
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
            } catch (err) {}
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
            } catch (err) {}
            expect(commitMock).toHaveBeenCalled();
        });

        it('fail', async () => {
            const commitMock = jest.spyOn(connection, 'commit');

            commitMock.mockImplementationOnce(cb => {
                cb(true);
            });
            try {
                await commit(connection);
            } catch (err) {
                expect(err).toBeTruthy();
            }
            expect(commitMock).toHaveBeenCalled();
        });
    });
});
