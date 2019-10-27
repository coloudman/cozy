import { Controller } from "cozy_lib";
declare abstract class Compiler extends Controller {
    abstract compile(): any;
}
export default Compiler;
