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
    deskTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})