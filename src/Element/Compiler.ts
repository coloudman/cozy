
import { Controller } from "cozy_lib";

abstract class Compiler extends Controller {
    abstract compile() : any
}

export default Compiler;