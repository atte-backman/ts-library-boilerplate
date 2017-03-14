import Backend from 'app/backend';
/* tslint:disable-next-line:ordered-imports */
import * as fetchMock from 'fetch-mock/es5/client';
import BackendException from 'app/exceptions/backendException';

describe('Backend', () => {
    let backend: Backend;

    beforeEach(() => {
        backend = Backend.instance;
        backend.url = 'http://endpoint';

        fetchMock.get(`${backend.url}/api`, {status: 200, body: {status: 'ok'}}, {
            name: 'test_ok',
        });

        fetchMock.get(`${backend.url}/api/fail`, {status: 500, body: {error: 'fail'}}, {
            name: 'test_nok',
        });
    });

    afterEach(() => {
        fetchMock.restore();
    });

    it('should not allow create new instance', () => {
        expect(() => {
            return new Backend(Symbol());
        }).toThrow(SyntaxError('Cannot construct singleton'));
    });

    it('should return instance to the class itself', () => {
        expect(backend instanceof Backend).toBeTruthy();
    });

    it('should only live in one instance only', () => {
        expect(backend).toEqual(Backend.instance);
    });

    it('should add default HTTP headers and inclusive CORS per request', (done) => {
        backend.call('/api', {method: 'GET'}).then(() => {
            /* tslint:disable-next-line:no-string-literal */
            expect(fetchMock.lastOptions('test_ok')['headers']).toEqual(jasmine.objectContaining({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }));

            expect(fetchMock.lastOptions('test_ok')).toEqual(jasmine.objectContaining({
                credentials: 'include',
                mode: 'cors',
            }));

            done();
        });
    });

    it('should process response headers accordingly', (done) => {
        backend.call('/api/fail', {method: 'GET'}).then(() => {
            done.fail('Did not throw');
        }).catch((e) => {
            expect(e instanceof BackendException).toBeTruthy();

            /* tslint:disable-next-line:no-string-literal */
            expect(JSON.parse(e.message)['data']).toEqual(jasmine.objectContaining({
                error: 'fail',
            }));

            done();
        });
    });
});
