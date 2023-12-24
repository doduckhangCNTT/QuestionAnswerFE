export interface quizQuestion{
    id: string;
    index: number;
    question: string;
    option1: QuestionOption;
    option2: QuestionOption;
    option3?: QuestionOption;
    option4?: QuestionOption;
    correctAnswerIndex: number;
    imgs: any[],
    videoLink?: string;
    selectedAnswerIndex?: number;
}

type QuestionOption = {
    index: number;
    content: string;
}


