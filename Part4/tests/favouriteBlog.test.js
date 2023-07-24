const list_helper = require('../utils/list_helper')

describe('favourite blog', () => {
    const listWithOneBlog = [{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }]

    const blogs = [{
            _id: '123412341234',
            title: 'test1',
            author: 'Elies',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 12,
            __v: 0
        },
        {
            _id: '22222',
            title: 'test2',
            author: 'Elies',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
        },
        {
            _id: '33433333',
            title: 'test3',
            author: 'Elies',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 12,
        }
    ]

    test('of empty list is nothing', () => {
        const blogs = []
        const result = list_helper.favouriteBlog(blogs)
        expect(result).toEqual({})
    })

    test('when list has only one blog, returns that blog', () => {
        const result = list_helper.favouriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })

    test('of a bigger list return a blog with max likes', () => {
        const result = list_helper.favouriteBlog(blogs)
        expect(result.likes).toEqual(12)
    })
})