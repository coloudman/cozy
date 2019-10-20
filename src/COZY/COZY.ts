
import { MixData, CodeLoader, ControllerLoaders, Area } from "cozy_lib";
import COZYData from "@src/struct/COZYData";
import BlockData from "@src/struct/BlockData";
import Compiler from "@src/Element/Compiler";

type Composer = (compilers : Compiler[]) => any;

class COZY {
    area: Area;
    cozyData: COZYData;
    parentElement: HTMLElement;
    composer: Composer
    constructor(codeLoader : CodeLoader, controllerLoaders : ControllerLoaders, cozyData : COZYData, parentElement : HTMLElement) {
        this.parentElement = parentElement;
        this.cozyData = cozyData;
        this.area = new Area(codeLoader, controllerLoaders, cozyData.blockDatas.map((blockData : BlockData) => {
            return blockData.mixData;
        }));


    }
    setComposer(composer : Composer) {
        this.composer = composer;
    }
    addBlock(blockData : BlockData) {
        this.cozyData.blockDatas.push(blockData);
        this.area.addMix(blockData.mixData);
    }

    compile() {
        return this.composer(this.area.getController("compiler"));
    }
}

export default COZY;