import {create} from 'zustand';
import {ISong} from '../types';

interface IMusicStore {
  songs: ISong[];

  setSongs(songs: ISong[]): void;
}

export const useMusicStore = create<IMusicStore>(use => ({
  songs: [
    {name: 'Bloody brazil', description: 'tenzo', id: 'aopmfvnweopm'},
    {name: 'never back down', description: 'NEFFEX', id: 'akfenoweno3'},
    {name: 'FPV', description: 'Lastfragment', id: 'qjr3nrfohnifio'},
    {name: 'riot', description: 'hollywood undead', id: 'qwdio2rnj3p0qw9jd'},
    {name: 'da da da', description: 'tanir', id: 'qwifnq0wfni3qf'},
    {name: 'camry 3.5', description: 'uncleFlexxx', id: 'qpwofj0q293j'},
    {name: 'clown world', description: 'tom MacDonald', id: 'qwo3rjiofrnif3'},
    {name: 'trenbolone', description: 'tom qwd', id: '3irjfpqownjonwid'},
    {name: 'love your voice', description: 'JONY', id: 'dnqorij2irhnj3'},
    {name: 'hesychia', description: 'LXNGVX', id: 'aofdkqwporjk2p'},
    {name: 'night ride', description: 'flexmorris', id: 'qoj-q9fja-fi0e'},
    {name: 'rockstar', description: 'NEFFEX', id: 'fwmogneorgn7'},
    {name: 'born a rockstar', description: 'NEFFEX', id: 'dmqpoi3jro2ij'},
  ],
  setSongs: songs => use({songs}),
}));
