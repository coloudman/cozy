import { Code } from "cozy_lib";
import Position from "../struct/Position";
import EventEmitter from "wolfy87-eventemitter";

declare interface PositionedCode {
    on(event : "positionChanged", listener : (position : Position) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "positionChanged", position : Position) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class PositionedCode extends EventEmitter {
    code:Code;
    position:Position;
    constructor(code : Code, position : Position) {
        super();
        this.code = code;
        this.position = position;
    }
    changePosition(x : number, y : number) {
        this.position.x = x;
        this.position.y = y;
        this.emit("positionChanged",this.position);
    }
}

export default PositionedCode;