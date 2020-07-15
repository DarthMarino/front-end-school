import { get, post } from './base';

export const Rubrics = {
    index: () =>
      get('/rubrics'),
    create: (params) =>
      post('/rubrics', params),
  }