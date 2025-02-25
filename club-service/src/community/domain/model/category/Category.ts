export default class Category {

    private idCategory: string;
    private name : string;
    private icon : string;

    constructor(idCategory: string, name: string, icon: string){
        this.idCategory = idCategory;
        this.name = name;
        this.icon = icon;
    }

    public isNull = (): boolean => {
        return false
    }

    public getIdCategory(){
        return this.idCategory;
    }

    public setIdCategory(idCategory: string){
        this.idCategory = idCategory;
    }

    public getName() {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getIcon() {
        return this.icon;
    }

    public setIcon(icon: string) {
        this.icon = icon;
    }

    

}