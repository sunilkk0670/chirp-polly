
export interface Lesson {
  target_text: string;
  english: string;
  phonetic_transcription: string;
  radical_breakdown?: string;
}

export interface LiarGameData {
  trap: string;
  explanation: string;
  correct_version: string;
}

export interface Module {
  id: string;
  theme: string;
  lessons: Lesson[];
  liar_game_data: LiarGameData;
}

export interface LanguageCurriculum {
  language: string;
  level: string;
  modules: Module[];
}

export type BatchData = LanguageCurriculum[];
