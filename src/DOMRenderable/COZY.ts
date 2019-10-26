
import { MixData, CodeLoader, ControllerLoaders, Area } from "cozy_lib";
import COZYData from "@src/struct/COZYData";
import Compiler from "@src/Element/Compiler";
import AreaWithPosition from "../AreaExtension/AreaWithPosition";
import PositionedMixData from "@src/struct/PositionedMixData";

type Composer = (compilers : Compiler[]) => any;

class COZY {
    /*
    cozyData: COZYData;
    parentElement: HTMLElement;
    composer: Composer
    areaWithPosition: AreaWithPosition;
    constructor(codeLoader : CodeLoader, controllerLoaders : ControllerLoaders, cozyData : COZYData, parentElement : HTMLElement) {
        this.parentElement = parentElement;
        this.cozyData = cozyData;
        this.areaWithPosition = new AreaWithPosition(codeLoader, controllerLoaders, cozyData.positionedMixDatas);


    }
    setComposer(composer : Composer) {
        this.composer = composer;
    }
    addPositionedMixData(positionedMixData : PositionedMixData) {
        this.areaWithPosition.addPositionedMix(positionedMixData);
    }

    compile() {
        return this.composer(this.areaWithPosition.area.getController("compiler"));
    }
    */
}

export default COZY;