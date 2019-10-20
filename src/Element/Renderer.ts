
import { Controller } from "cozy_lib";

abstract class Renderer extends Controller {
    init() {
        
    }
    abstract render() : HTMLElement
}

export default Renderer;