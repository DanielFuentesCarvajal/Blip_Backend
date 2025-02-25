import Rules from "./Rules";

export default class NullRule extends Rules {
    constructor() {
        super('0', 'No rule defined');
    }
}