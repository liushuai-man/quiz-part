import request from '../utils/http';

export interface UserInfo {
  username: string;
  character: UserCharacter;
}

export interface UserCharacter {
  image: string;
  name: string;
  summary: string;
}

export interface UserRequest {
  username: string;
  score: number;
  name: string;
  summary: string;
  image: string;
}

export function getUserInfoList(): Promise<UserInfo[]> {
  return request.get('/api/v1.0.0/userlist');
}

export function updateUserInfo(userRequest: UserRequest) {
  return request.post('/api/v1.0.0/userinfo', userRequest);
}

export function getUserInfoByUsername(username: string): Promise<UserInfo> {
  return request.get(`/api/v1.0.0/userinfo`, { params: { username } });
}
