export enum QuizType {
    CHOICE_QUIZ,
    SENTENCE_QUIZ

}
export class Quiz {
    id: number;
    title: string;
    checked: Boolean;
    type: QuizType;

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
        this.checked = false;
    }
}
