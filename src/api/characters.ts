import request from '../utils/http';

export interface Character {
    image?: string;
    minimumScore?: number;
    name?: string;
    summary?: string;
}
export const getCharacters = async () => {
  return await request.get<Character[]>('/api/characters.json');
}

