export class Quiz {
    id: number;
    title: string;
    checked: Boolean;

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
        this.checked = false;
    }
}
