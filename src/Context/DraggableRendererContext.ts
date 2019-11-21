import RendererContext from "./RendererContext";
import { Code, CodeData } from "cozy_lib";

export default abstract class DraggableRendererContext extends RendererContext {
    abstract dragStart(element : HTMLElement, position : Position, codeData: CodeData): void
}