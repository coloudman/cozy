
import { Code } from "cozy_lib"

class Number extends Code {
    init() {}
    setNumber(number : number) {
        this.data.number = number;
    }
    getNumber() {
        return this.data.number;
    }
}

class BinaryOperator extends Code {
    init() {
        this.addDefaultLinkingPoints(["first","second"]);
    }
}

class Add extends BinaryOperator {};
class Subtract extends BinaryOperator {};
class Multiply extends BinaryOperator {};
class Division extends BinaryOperator {};

class Arithmetics extends BinaryOperator {
    setMode(mode : string) {
        this.data.mode = mode;
    }
    getMode() {
        return this.data.mode;
    }
}


export default {
    id:"Math",
    version:"1",
    body:{
        Number,
        
        Add,
        Subtract,
        Multiply,
        Division
    }
}