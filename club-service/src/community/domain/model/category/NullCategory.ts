import Category from "./Category";

export default class NullCategory extends Category {
    constructor() {
        super('0', 'Unknown', 'Unknown');
    }

    public override isNull = (): boolean => {
        return true
    }
    
    public override setIdCategory = (_idCategory: string): void => {
        return
    }

    public override setName = (_name: string): void => {
        return
    }
    
    public override setIcon = (_icon: string): void => {
        return
    }

}