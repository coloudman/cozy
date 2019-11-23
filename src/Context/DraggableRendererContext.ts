import RendererContext from "./RendererContext";
import { Code, CodeData } from "cozy_lib";
import Position from "../struct/Position";

export default abstract class DraggableRendererContext extends RendererContext {
    abstract dragStart(position : Position, code: Code): void
}