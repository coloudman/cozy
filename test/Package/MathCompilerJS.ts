
import Compiler from "../Element/Compiler";
import Math from "./Math";



class Number extends Compiler {
    compile() {
        return this.code.getNumber();
    }
}