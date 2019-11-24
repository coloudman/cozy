import RendererContext from "./RendererContext";
import { Code, CodeData } from "cozy_lib";
import Position from "../struct/Position";

declare interface DraggableRendererContext {
    on(event : "dragStart", listener : (position : Position, code : Code) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "dragStart", position:Position, code:Code) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class DraggableRendererContext extends RendererContext {
    dragStart(position : Position, code: Code) {
        this.emit("dragStart", position, code);
    }
}

export default DraggableRendererContext