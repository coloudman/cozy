import { Area, MixData } from "cozy_lib";
import PositionedMix from "../structClass/PositionedMix";
import Position from "@src/struct/Position";
import EventEmitter from "wolfy87-eventemitter";
declare interface AreaWithPosition {
    on(event: "positionedMixAdded", listener: (code: PositionedMix) => void): this;
    on(event: "positionedMixRemoved", listener: (code: PositionedMix, index: number) => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
    emit(event: "positionedMixAdded", positionedMix: PositionedMix): this;
    emit(event: "positionedMixRemoved", positionedMix: PositionedMix, index: number): this;
    emit(event: string, ...args: any): this;
    emit(event: RegExp, ...args: any): this;
}
declare class AreaWithPosition extends EventEmitter {
    area: Area;
    positionedMixes: PositionedMix[];
    private positions;
    constructor(area: Area, positions: Position[]);
    addPositionedMix(mixData: MixData, position: Position): PositionedMix;
    removePositionedMix(positionedMix: PositionedMix): void;
}
export default AreaWithPosition;
