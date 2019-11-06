import { Code } from "cozy_lib";
import Position from "../struct/Position";
import EventEmitter from "wolfy87-eventemitter";
declare interface PositionedCode {
    on(event: "positionChanged", listener: (position: Position) => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
    emit(event: "positionChanged", position: Position): this;
    emit(event: string, ...args: any): this;
    emit(event: RegExp, ...args: any): this;
}
declare class PositionedCode extends EventEmitter {
    code: Code;
    position: Position;
    constructor(code: Code, position: Position);
    changePosition(x: number, y: number): void;
}
export default PositionedCode;
