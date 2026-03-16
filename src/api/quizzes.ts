import request from '../utils/http';

export interface Data {
  list?: List[];
}

export interface List {
  currectAnswer?: number;
  items?: ListItem[];
  response?: ListResponse;
  title?: string;
}

export interface ListItem {
  id?: number;
  title?: string;
}

export interface ListResponse {
  lose?: string;
  win?: string;
}

export interface ResponseItem {
  id?: number;
  title?: string;
}

export interface ResponseResponse {
  lose?: string;
  win?: string;
}

export const getQuizzes = async () => {
  return await request.get<Data>('/api/quizzes');
}