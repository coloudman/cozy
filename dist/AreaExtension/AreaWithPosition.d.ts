import { Area, MixData } from "cozy_lib";
import PositionedMix from "@src/struct/PositionedMix";
import Position from "@src/struct/Position";
declare class AreaWithPosition {
    area: Area;
    positionedMixes: PositionedMix[];
    private positions;
    constructor(area: Area, positions: Position[]);
    addPositionedMix(mixData: MixData, position: Position): PositionedMix;
    removePositionedMix(positionedMix: PositionedMix): void;
}
export default AreaWithPosition;
