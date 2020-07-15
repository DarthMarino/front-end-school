import { get, post } from './base';

export const Assignments = {
    index: () =>
      get('/assignments'),
    indexIsStudent: () =>
      get('/assignments?isStudent=true'),
    indexIsTeacher: () =>
      get('/assignments?isTeacher=true'),
    create: (params) =>
      post('/assignments', params),
  }