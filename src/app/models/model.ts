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

    constructor(id: number, title: string) {
        this.checked = false;

        this.id = id;
        this.title = title;
        this.answerList = [];
    }
}
