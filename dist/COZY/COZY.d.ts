import { CodeLoader, ControllerLoaders, Area } from "cozy_lib";
import COZYData from "@src/struct/COZYData";
import BlockData from "@src/struct/BlockData";
import Compiler from "@src/Element/Compiler";
declare type Composer = (compilers: Compiler[]) => any;
declare class COZY {
    area: Area;
    cozyData: COZYData;
    parentElement: HTMLElement;
    composer: Composer;
    constructor(codeLoader: CodeLoader, controllerLoaders: ControllerLoaders, cozyData: COZYData, parentElement: HTMLElement);
    setComposer(composer: Composer): void;
    addBlock(blockData: BlockData): void;
    compile(): any;
}
export default COZY;
