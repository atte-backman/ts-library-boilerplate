import PostModel from 'app/models/postModel';

describe('PostModel', () => {
    let model: PostModel;

    beforeEach(() => {
        model = new PostModel();
    });

    it('should have accessors to all available properties', () => {
        for (const [property, value] of [
            ['title', 'foobar'],
            ['body', 'foobar'],
            ['userId', 2],
        ]) {
            model[<string> property] = value;

            expect(value).toEqual(model.data[<string> property], property);
            expect(model[<string> property]).toEqual(model.data[<string> property]);
        }
    });

    it('should throw on incorrect property values', () => {
        const list = [
            {
                message: 'Incorrect string length',
                prop: 'title',
                values: [''],
            },
        ];

        for (const entry of list) {
            for (const value of entry.values) {
                expect(() => {
                    model[entry.prop] = value;
                }).toThrow(Error(`${entry.message} (${entry.prop}=${value})`));
            }
        }
    });
});
