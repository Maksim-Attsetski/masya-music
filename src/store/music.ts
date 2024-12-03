import {create} from 'zustand';
import {ISong} from '../types';

interface IMusicStore {
  songs: ISong[];
  isPlaying: boolean;
  activeSong: ISong | null;
  setIsPlaying(v?: boolean): void;
  setActiveSong(song: ISong | null): void;
  playMusic(): void;
  closeMusic(): void;
  setSongs(songs: ISong[]): void;
}

export const useMusicStore = create<IMusicStore>(use => ({
  songs: [
    {
      name: 'Bloody brazil',
      description: 'tenzo',
      id: 'aopmfvnweopm',
      duration: 180,
      preview_url: 'https://sefon.pro/img/artist_photos/miyagi.jpg',
    },
    {
      name: 'never back down',
      description: 'NEFFEX',
      id: 'akfenoweno3',
      duration: 180,
      preview_url: 'https://sefon.pro/img/artist_photos/miyagi.jpg',
    },
    {
      name: 'FPV',
      description: 'Lastfragment',
      id: 'qjr3nrfohnifio',
      duration: 180,
      preview_url: 'https://sefon.pro/img/artist_photos/miyagi.jpg',
    },
    {
      name: 'riot',
      description: 'hollywood undead',
      id: 'qwdio2rnj3p0qw9jd',
      duration: 180,
      preview_url: 'https://sefon.pro/img/artist_photos/miyagi.jpg',
    },
    {
      name: 'da da da',
      description: 'tanir',
      id: 'qwifnq0wfni3qf',
      duration: 180,
      preview_url: 'https://sefon.pro/img/artist_photos/miyagi.jpg',
    },
    {
      name: 'camry 3.5',
      description: 'uncleFlexxx',
      id: 'qpwofj0q293j',
      duration: 180,
      preview_url: 'https://sefon.pro/img/artist_photos/miyagi.jpg',
    },
    {
      name: 'clown world',
      description: 'tom MacDonald',
      id: 'qwo3rjiofrnif3',
      duration: 180,
      preview_url: 'https://sefon.pro/img/artist_photos/miyagi.jpg',
    },
    {
      name: 'trenbolone',
      description: 'tom qwd',
      id: '3irjfpqownjonwid',
      duration: 180,
      preview_url: 'https://sefon.pro/img/artist_photos/miyagi.jpg',
    },
    {
      name: 'love your voice',
      description: 'JONY',
      id: 'dnqorij2irhnj3',
      duration: 180,
      preview_url: 'https://sefon.pro/img/artist_photos/miyagi.jpg',
    },
    {
      name: 'hesychia',
      description: 'LXNGVX',
      id: 'aofdkqwporjk2p',
      duration: 180,
      preview_url: 'https://sefon.pro/img/artist_photos/miyagi.jpg',
    },
    {
      name: 'night ride',
      description: 'flexmorris',
      id: 'qoj-q9fja-fi0e',
      duration: 180,
      preview_url: 'https://sefon.pro/img/artist_photos/miyagi.jpg',
    },
    {
      name: 'rockstar',
      description: 'NEFFEX',
      id: 'fwmogneorgn7',
      duration: 180,
      preview_url: 'https://sefon.pro/img/artist_photos/miyagi.jpg',
    },
    {
      name: 'born a rockstar',
      description: 'NEFFEX',
      id: 'dmqpoi3jro2ij',
      duration: 180,
      preview_url: 'https://sefon.pro/img/artist_photos/miyagi.jpg',
    },
  ],
  isPlaying: false,
  activeSong: null,
  setSongs: songs => use({songs}),
  setIsPlaying: v => use(s => ({...s, isPlaying: v ?? !s.isPlaying})),
  setActiveSong: activeSong =>
    use(s => ({
      ...s,
      activeSong: activeSong ? {...s, ...activeSong} : activeSong,
    })),
  playMusic: () => use(s => ({...s, activeSong: s.songs[0], isPlaying: true})),
  closeMusic: () => use(s => ({...s, activeSong: null, isPlaying: false})),
}));
