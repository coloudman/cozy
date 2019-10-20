import { Controller } from "cozy_lib";
declare abstract class Renderer extends Controller {
    init(): void;
    abstract render(): HTMLElement;
}
export default Renderer;
