---
title: Using TypeScript and Composition API with Nuxt and Netlify CMS
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---

I've been using Nuxt.js a lot recently, taking advantage of how simple it is to configure with a variety of headless CMS solutions to generate static content. I recently started a new project with Netlify CMS and the [Nuxt & Netlify CMS Boilerplate](https://templates.netlify.com/template/nuxt-starter-netlify-cms/) and had a few issues while migrating it to Vue3 and Typescript. Here's a walkthrough of the steps needed to get you up and running:

### 1 (Optional) Install nuxt-vite
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

To start this project I decided to get away from Webpack and try the [nuxt-vite package](https://vite.nuxtjs.org) (still experimental). It sped up the build process significantly and I'm quite happy with the results:

```bash
$ npm i nuxt-vite -D
```

```js
// nuxt.config-.js
export default {
  buildModules: [
    'nuxt-vite'
  ]
}
```

### 2 Install nuxt-typescript and ESLINT packages
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

The [nuxt-typescript](https://typescript.nuxtjs.org) package provides great tooling to get up and running with TS. First, add the dependencies:

```bash
$ npm i @nuxt/typescript-build @nuxt/types -D
```

Then add the the build package to the Nuxt configuration:

```js
// nuxt.config-.js
export default {
  buildModules: [
    '@nuxt/typescript-build'
  ]
}
```

Now we need to help our IDE understand what `.vue` files are by adding the type declarations. Create a `vue-shim.d.ts` file in the root folder with the following configuration:

```js
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}
```

We also need to install the correct ESLint packages and add them to `.eslintrc.js`:

```bash
$ npm i @vue/eslint-config-standard @vue/eslint-config-typescript eslint-plugin-vue -D
```

```js
// .eslintrc.js
module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
  ],
  ignorePatterns: ['./docs/**/*.*'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/indent': ['error', 2],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single', {
        'allowTemplateLiterals': true,
      },
    ],
    'semi': [
      'error',
      'never',
    ],
    'space-before-function-paren': [
      'error',
      'always',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'eol-last': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'never',
      },
    ],
  },
}
```

Finally, create a `tsconfig.json` file in the root folder:
```json
{
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "moduleResolution": "Node",
    "lib": [
      "ESNext",
      "ESNext.AsyncIterable",
      "DOM"
    ],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./*"
      ]
    },
    "types": [
      "@types/node",
      "@nuxt/types",
      "@nuxt/content"
    ]
  },
  "exclude": [
    "node_modules"
  ]
}
```

Now you can add the `<script lang="ts">` tag inside all of your Vue components.

### 3 Add the Composition API package
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Nuxt doesn't currently provide native support for Vue3, but it does provide a great [Composition API package](https://composition-api.nuxtjs.org) that makes it easy to work with components the Vue3 way:

```bash
$ npm i @nuxtjs/composition-api -D
```

```js
// nuxt.config-.js
export default {
  buildModules: [
    '@nuxtjs/composition-api/module'
  ]
}
```

### 4 Fetching Netlify CMS data
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

The Netlify CMS boilerplate fetches data for all routes using the Nuxt `asyncData` hook, which is not compatible with Vue3's Composition API and `defineComponent` which provides great IDE tooling support.

To mitigate this issue, Nuxt Composition API provides another utility: the `useAsync` function:

```js
// _project.vue
<script lang="ts">

import {
  defineComponent,
  useContext,
  useAsync,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Project',

  setup () {
    const { params, $content } = useContext()

    const project = useAsync(async () => await $content('projects', params.value.project).fetch<any>(), params.value.project)

    return {
      project,
    }
  },
})
</script>
}
```

### 5 Making it type safe
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Up to this moment, we're leveraging some TypeScript features but that also means a lot of TS warnings will arise. The main problem is that Netlify CMS doesn't provide a consistent interface for understanding the data that's coming from its API. The `nuxt-content` package doesn't have any visibility on these shapes either. We'll fix this by adding some type declarations:

```ts
import { Ref } from '@nuxtjs/composition-api'
import { Route } from '../node_modules/vue-router'
import { $content } from '@nuxt/content'

// this should match your Netlify CMS data structure
export type Project = {
  body: {
    children: [],
  },
  category: string,
  cover: string,
  createdAt: string,
  description: string,
  dir: string,
  extension: string,
  gallery: string[],
  path: string,
  slug: string,
  title: string,
  toc: [],
  updatedAt: string,
}

// we extend the useContext return type and add $content to it
export interface UseContextReturn {
  route: Ref<Route>
  query: Ref<Route['query']>
  from: Ref<any['from']>
  params: Ref<Route['params']>
  $content: typeof $content
}
```

```ts
// _project.vue

import type { Ref } from '@nuxtjs/composition-api'
import type { Project, UseContextReturn } from '../../models/types'

export default defineComponent({
  name: 'Project',

  setup () {
    const { params, $content } = useContext() as UseContextReturn

    const project = useAsync(async () => await $content('projects', params.value.project).fetch<Project>(), params.value.project) as Ref<Project>

    return {
      project,
    }
  },

  head: {},
```

By this point, you should be up and running with TS and Composition API support on your Nuxt + Netlify CMS project!
