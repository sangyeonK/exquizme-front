export enum QuizType {
    CHOICE_QUIZ,
    SENTENCE_QUIZ

}
export class Quiz {
    checked: Boolean;

    id: number;
    title: string;
    type: QuizType;
    correctAnswer: string;
    answerList:string[];
    expandShowAnswer:boolean;

    constructor(id: number, title: string, type:QuizType, correctAnswer:string, answerList:string[]) {
        this.checked = false;
        this.expandShowAnswer = false;

        this.id = id;
        this.title = title;
        this.type = type;
        this.correctAnswer = correctAnswer;
        this.answerList = answerList;
    }
}
