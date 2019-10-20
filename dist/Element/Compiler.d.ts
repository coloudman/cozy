import { Controller } from "cozy_lib";
declare abstract class Compiler extends Controller {
    init(): void;
    abstract compile(): any;
}
export default Compiler;
