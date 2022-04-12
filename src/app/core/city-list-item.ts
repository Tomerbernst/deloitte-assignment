export class CityListItem {
    id: number;
    name: string;
    temperature: number;

    constructor(id:number, name:string, temperature:number ){
        this.id = id;
        this.name = name;
        this.temperature = temperature;
    }
}