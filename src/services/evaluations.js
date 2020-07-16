import { get } from './base';

export const Evaluations = {
    indexEvaluationDetail: (idAssignmet) =>
      get(`/evaluations/assignment/${idAssignmet}`)
  }