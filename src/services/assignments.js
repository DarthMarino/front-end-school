import { get, post } from './base';

export const Assignments = {
    create: (params) =>
      post('/assignments', params),
  }