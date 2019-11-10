import { Area, CodeData } from "cozy_lib";
import PositionedCode from "../structClass/PositionedCode";
import Position from "@src/struct/Position";
import EventEmitter from "wolfy87-eventemitter";
declare interface AreaWithPosition {
    on(event: "positionedCodeAdded", listener: (code: PositionedCode) => void): this;
    on(event: "positionedCodeRemoved", listener: (code: PositionedCode, index: number) => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
    emit(event: "positionedCodeAdded", positionedMix: PositionedCode): this;
    emit(event: "positionedCodeRemoved", positionedMix: PositionedCode, index: number): this;
    emit(event: string, ...args: any): this;
    emit(event: RegExp, ...args: any): this;
}
declare class AreaWithPosition extends EventEmitter {
    area: Area;
    positionedCodes: PositionedCode[];
    private positions;
    constructor(area: Area, positions: Position[]);
    addPositionedCode(codeData: CodeData, position: Position): PositionedCode;
    removePositionedCode(positionedCode: PositionedCode): void;
    getPositionedCodes(): PositionedCode[];
}
export default AreaWithPosition;
