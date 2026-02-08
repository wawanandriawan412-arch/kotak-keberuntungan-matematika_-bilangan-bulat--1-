
export type BoxType = 'question' | 'bonus' | 'zonk';

export interface Question {
  id: number;
  type: BoxType;
  title: string;
  description: string;
  answer?: number | string;
  points: number;
  hint?: string;
}

export interface Group {
  id: number;
  name: string;
  score: number;
  turnsUsed: number;
  color: string;
}

export interface GameState {
  groups: Group[];
  currentGroupIndex: number;
  openedBoxes: number[];
  currentQuestion: Question | null;
  status: 'setup' | 'playing' | 'gameover';
  maxTurnsPerGroup: number;
}
