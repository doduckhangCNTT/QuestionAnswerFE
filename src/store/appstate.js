import { create } from "zustand";
import {
  createQuestionsTracNghiem,
  createQuestionsTuLuan,
  createQuizTracNghiem,
} from "../services/tracNghiem.service";
import { shuffleArray } from "../pages/quiz/helper";
import { getApi } from "../services/fetchData";
import { AnswerEnum } from "../config/Enum/Question";

export const useAppStore = create((set, get) => ({
  //fe
  listQuestions: [],
  randomQuestionTracNghiemSet: (data) => {
    const randomArr = shuffleArray(data).slice(0, 15);
    set({ listQuestions: randomArr });
  },
  updateQuestionTracNghiemAnswer: (questionId, curAnswerVal) =>
    set((state) => ({
      ...state,
      listQuestions: state.listQuestions?.map((question) => {
        if (questionId === question._id) {
          return {
            ...question,
            selectedAnswerIndex: curAnswerVal,
          };
        }
        return question;
      }),
    })),

  listQuestionsTuLuan: [],
  randomQuestionTuLuanSet: (data) => {
    const randomArr = shuffleArray(data).slice(0, 15);
    set({ listQuestionsTuLuan: randomArr });
  },
  updateTuLuanAnswer: (questionId, curAnswerVal) =>
    set((state) => ({
      ...state,
      listQuestionsTuLuan: state.listQuestionsTuLuan.map((question) => {
        if (questionId === question?.id) {
          return {
            ...question,
            currentAnswer: curAnswerVal,
          };
        }
        return question;
      }),
    })),

  //api
  quiz: {},
  createQuizTracNghiemSet: async (data) => {
    console.log(data);
    const newData = await createQuizTracNghiem(data);
    if (newData.status === 201) {
      set({ quiz: newData?.data });
    }
  },
  getQuizTracNghiemSet: async (data) => {
    // const newData = await getTracNghiem(data);
    // if (newData.status === 200) {
    //   set({ quiz: newData?.data });
    // }
    try {
      const result = await getApi(`question/${data}`);
      if (result && result.data) {
        set({ quiz: result.data });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getQuizTuLuanSet: async (data) => {
    try {
      const result = await getApi(`question/${data}`);
      if (result && result.data) {
        set({ quiz: result.data });
      }
    } catch (error) {
      console.log(error);
    }
  },

  questions: [],
  createQuestionsTracNghiemSet: async (data) => {
    const newData = await createQuestionsTracNghiem({
      quizId: data?.quizId,
      questions: data?.questions,
    });
    console.log(newData);
  },

  listQuiz: [],
  getListTracNghiemSet: async () => {
    try {
      const result = await getApi("questions");
      if (result && result.data) {
        set({ listQuiz: result?.data });
      }
    } catch (error) {
      console.log(error);
    }
  },

  //giai ma kho bau tu luan
  questionstuLuan: [],
  createQuestionsTuLuanSet: async (data) => {
    const newData = await createQuestionsTuLuan({
      quizId: data?.quizId,
      questions: data?.questions,
    });
    console.log(newData);
  },

  listQuizTuLuan: [],
  getListTuLuanSet: async () => {
    // const newData = await getListTuLuan();
    // console.log(newData);
    // if (newData?.status === 200) {
    //   set({ listQuizTuLuan: newData?.data });
    // }
    try {
      const result = await getApi(`questions`);
      if (result && result.data) {
        const data = result.data.filter(
          (item) => item.typeAnswer === AnswerEnum.EnterAnswer
        );
        set({ listQuizTuLuan: data });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
