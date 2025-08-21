import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schema'
import { ENV } from './lib/env'

export default defineConfig({
  name: 'default',
  title: 'Neo Portfolio',

  projectId: ENV.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: ENV.NEXT_PUBLIC_SANITY_DATASET,

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Projects')
              .id('projects')
              .child(
                S.documentTypeList('project')
                  .title('Projects')
                  .defaultOrdering([
                    { field: 'featured', direction: 'desc' },
                    { field: '_createdAt', direction: 'desc' }
                  ])
              ),
          ])
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Custom actions for documents
    actions: (prev, context) => {
      return prev.map((originalAction) => {
        // Customize publish action
        if (originalAction.action === 'publish') {
          return {
            ...originalAction,
            label: 'Publish Project',
            tone: 'positive'
          }
        }
        return originalAction
      })
    }
  },

  // Studio customization
  studio: {
    components: {
      // Custom logo component could go here
    }
  },

  // Form configuration
  form: {
    // Custom input components
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource.name !== 'unsplash')
      }
    }
  }
})