export interface ISong {
  id: string;
  name: string;
  description: string;
  duration: number;
  preview_url: string;
}

export type TPositions = {[key: string]: number};
