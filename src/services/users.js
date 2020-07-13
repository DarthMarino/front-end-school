import { post} from './base';

export const Users = {
    create: (params) =>
      post('/users/signUp', params),
  }