export class Monitor {
    private id: number;
    private brand: string;
    private refreshRate: string;
    private pictureUrl: string;

    public constructor(id: number, brand: string, refreshRate: string, pictureUrl: string)
    {
        this.id = id;
        this.brand = brand;
        this.refreshRate = refreshRate;
        this.pictureUrl = pictureUrl;
    }

    public getId() : number {
        return this.id;
    }

    public setId(newId: number) {
        this.id = newId;
    }

    public getBrand(): string {
        return this.brand;
    }

    public setBrand(newBrand: string) {
        this.brand = newBrand;
    }

    public getRefreshRate(): string {
        return this.refreshRate;
    }

    public setRefreshRate(newRefreshRate: string) {
        this.refreshRate = newRefreshRate;
    }

    public getPictureUrl(): string {
        return this.pictureUrl;
    }

    public setPictureUrl(newPictureUrl: string) {
        this.pictureUrl = newPictureUrl;
    }
}