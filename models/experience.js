export class Experience {
    constructor(id, company, position, description, dateStart, dateFinish, mentor) {
        this.id = id;
        this.company = company;
        this.position = position;
        this.description = description;
        this.dateStart = dateStart;
        this.dateFinish = dateFinish;
        this.mentor = mentor; // referencia al mentor
    }
}

export default Experience;