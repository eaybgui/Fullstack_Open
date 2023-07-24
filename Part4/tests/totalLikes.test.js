const list_helper = require('../utils/list_helper')

describe('total likes', () => {
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
        }
    ]

    test('of empty list is zero', () => {
        const blogs = []
        const result = list_helper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = list_helper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = list_helper.totalLikes(blogs)
        expect(result).toBe(22)
    })
})