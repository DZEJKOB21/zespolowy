class InterviewStatus {
    id?: number;
    submissionDate?: any
    notes: string;
    result: boolean;

    constructor(notes: string, result: boolean, submissionDate?: any, id?: number) {
        this.id = id;
        this.notes = notes;
        this.result = result;
        this.submissionDate = submissionDate;
    }
}

export default InterviewStatus