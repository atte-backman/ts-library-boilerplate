import Backend from 'app/backend';
import * as fetchMock from 'fetch-mock/es5/client';
import PostService from '../../../src/app/services/postService';
import PostModel from "../../../src/app/models/postModel";
import {IPost} from "../../../src/app/interfaces/post";

describe('PostService', () => {
    let service: PostService;
    const backend = Backend.instance;

    beforeEach(() => {
        service = new PostService();
        backend.url = '';

        spyOn(backend, 'call').and.callThrough();

        fetchMock.patch('begin:/posts/1', {status: 204});
        fetchMock.get('/posts/1', {body: {id: 1}, status: 200});
    });

    afterEach(() => {
        fetchMock.restore();
    });

    describe('getById', () => {
        it('should map core data correctly', (done) => {
            service.getById(1).then((u) => {
                expect(u instanceof PostModel).toBeTruthy();
                expect(u.id).toEqual(1);
            }).then(done);
        });
    });

    describe('persist', () => {
        let post: PostModel;

        beforeEach(() => {
            post = new PostModel(<IPost> {id: 1});

            spyOn(post, 'applyChanges').and.callThrough();
        });

        it('should do nothing if data change set is empty', (done) => {
            service.persist(post).then(() => {
                expect(backend.call).not.toHaveBeenCalled();
            }).then(done);
        });

        it('should do persist data to end point', (done) => {
            post.title = 'New title';

            service.persist(post).then(() => {
                expect(backend.call).toHaveBeenCalled();
                expect(post.applyChanges).toHaveBeenCalled();
            }).then(done);
        });
    });
});
