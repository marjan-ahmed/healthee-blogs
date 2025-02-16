export default {
    name: 'blog',
    type: 'document',
    title: 'Blog',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title of blog article',
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug of your blog article',
            options: {
                source: 'title'
            }
        },
        {
            name: 'image',
            type: 'image',
            title: 'Title Image'
        },
        {
            name: 'smallDescription',
            type: 'string',
            title: 'Small Description'
        },
        {
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [
              {
                type: 'block',
              }
            ],
        },
        {
            name: 'buttonText',
            type: 'string',
            title: 'Button text (Read More)'
        }
    ],
}