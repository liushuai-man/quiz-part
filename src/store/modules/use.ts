import { defineStore } from 'pinia';
import { Character } from '@/api/characters';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '默认123',
    character: null as Character | null,
  }),
  actions: {
    setUsername(username: string) {
      this.username = username;
      localStorage.setItem('username', username);
    },
    setCharacter(character: Character) {
      this.character = character;
      localStorage.setItem('character', JSON.stringify(character));
    },
    clearUser() {
      this.username = '';
      this.character = null;
      localStorage.removeItem('username');
      localStorage.removeItem('character');
    },
    loadUserFromLocalStorage() {
      const savedUsername = localStorage.getItem('username');
      const savedCharacter = localStorage.getItem('character');
      if (savedUsername) {
        this.username = savedUsername;
      }
      if (savedCharacter) {
        this.character = JSON.parse(savedCharacter);
      }
    },
  },
});
