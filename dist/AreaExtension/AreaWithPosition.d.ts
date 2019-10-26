import { Area, CodeLoader, ControllerLoaders } from "cozy_lib";
import PositionedMixData from "../struct/PositionedMixData";
import PositionedMix from "@src/struct/PositionedMix";
declare class AreaWithPosition {
    area: Area;
    private positionedMixDatas;
    private readonly mixDatas;
    positionedMixes: PositionedMix[];
    constructor(codeLoader: CodeLoader, controllerLoaders: ControllerLoaders, positionedMixDatas: PositionedMixData[]);
    addPositionedMix(positionedMixData: PositionedMixData): PositionedMix;
    removePositionedMix(positionedMix: PositionedMix): void;
}
export default AreaWithPosition;
