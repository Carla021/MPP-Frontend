export class Review {
    private id: number;
    private monitorId: number;
    private rating: number;
    private comment: string;

    constructor(id: number, monitorId: number, rating: number, comment: string) {
        this.id = id;
        this.monitorId = monitorId;
        this.rating = rating;
        this.comment = comment;
    }

    public getId(): number {
        return this.id;
    }

    public setId(newId: number): void {
        this.id = newId;
    }

    public getMonitorId(): number {
        return this.monitorId;
    }

    public setMonitorId(newMonitorId: number): void {
        this.monitorId = newMonitorId;
    }

    public getRating(): number {
        return this.rating;
    }

    public setRating(newRating: number): void {
        this.rating = newRating;
    }

    public getComment(): string {
        return this.comment;
    }

    public setComment(newComment: string): void {
        this.comment = newComment;
    }
}
