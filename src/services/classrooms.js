import { get, post } from './base';

export const Classrooms = {
    index: () =>
      get('/classrooms'),
    indexTeacher: () =>
      get('/classrooms?teacherOnly=true'),
    create: (params) =>
      post('/classrooms/create', params),
  }