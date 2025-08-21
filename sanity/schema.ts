import { defineField, defineType } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(80)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.max(300)
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      validation: Rule => Rule.required().uri({
        allowRelative: false,
        scheme: ['https']
      }).custom((url) => {
        if (url && !url.includes('github.com')) {
          return 'Must be a GitHub URL'
        }
        return true
      })
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      description: 'Featured projects will be highlighted on the homepage'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.max(10)
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      featured: 'featured'
    },
    prepare(selection) {
      const { title, subtitle, featured } = selection
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: subtitle || 'No description'
      }
    }
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: '_createdAt', direction: 'desc' }]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ]
})

export const schemaTypes = [projectSchema]