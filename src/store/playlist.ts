import {create} from 'zustand';
import {IPlaylist} from '../types';

interface IStore {
  playlists: IPlaylist[];
  setPlaylists: (v: IPlaylist[]) => void;
  addPlaylist: (p: IPlaylist) => void;
  updatePlaylist: (p: IPlaylist) => void;
  deletePlaylist: (id: string) => void;
}

export const usePlaylistStore = create<IStore>(use => ({
  playlists: [
    {
      id: 'favorite',
      name: 'Любимые',
      tracks: [],
      author_id: {
        id: 'test',
        email: 'test@test.com',
        first_name: 'Тестер',
        last_name: 'Тестовый',
      },
    },
  ],
  setPlaylists: playlists => use({playlists}),
  addPlaylist: newPlaylist =>
    use(state => ({...state, playlists: [...state.playlists, newPlaylist]})),
  updatePlaylist: newPlaylist =>
    use(state => ({
      ...state,
      playlists: [...state.playlists].map(item =>
        item.id === newPlaylist.id ? {...item, ...newPlaylist} : item,
      ),
    })),
  deletePlaylist: id =>
    use(state => ({
      ...state,
      playlists: [...state.playlists].filter(item => item.id !== id),
    })),
}));
