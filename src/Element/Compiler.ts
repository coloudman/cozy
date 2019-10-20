
import { Controller } from "cozy_lib";

abstract class Compiler extends Controller {
    init() {
        
    }
    abstract compile() : any
}

export default Compiler;