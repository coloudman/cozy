
import Compiler from "./Compiler";

abstract class HaveNextCompiler extends Compiler {
    make(compiled : any, compileFunction : (compiled : any, nextCompiled : any) => any) {
        if(this.getLinked("next")) {
            return compileFunction(compiled, (<Compiler> this.getLinked("next")).compile());
        } else {
            return compiled;
        }
    }
}

export default HaveNextCompiler;