import { CodeLoader, ControllerLoaders } from "cozy_lib";
import COZYData from "@src/struct/COZYData";
import Compiler from "@src/Element/Compiler";
import AreaWithPosition from "../AreaExtension/AreaWithPosition";
import PositionedMixData from "@src/struct/PositionedMixData";
declare type Composer = (compilers: Compiler[]) => any;
declare class COZY {
    cozyData: COZYData;
    parentElement: HTMLElement;
    composer: Composer;
    areaWithPosition: AreaWithPosition;
    constructor(codeLoader: CodeLoader, controllerLoaders: ControllerLoaders, cozyData: COZYData, parentElement: HTMLElement);
    setComposer(composer: Composer): void;
    addPositionedMixData(positionedMixData: PositionedMixData): void;
    compile(): any;
}
export default COZY;
