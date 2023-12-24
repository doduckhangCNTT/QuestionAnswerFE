import { create } from "zustand";

type State = {
  quizQuestions: any[];
  quizAnswer: any[],
}

type Action = {
  updateQuizQuestions: (questions: State['quizAnswer']) => void;
}

export const useAppStore = create<State & Action>((set, get) => ({
  quizQuestions: [{id:1}],
  quizAnswer: [],
  updateQuizQuestions: (questions) => set(state=> ({...state, quizQuestions: questions})),
}));
