
import { CodeData, CodeLoader, ControllerLoaders, Area } from "cozy_lib";
import COZYData from "../struct/COZYData";
import Compiler from "../Element/Compiler";
import AreaWithPosition from "../AreaExtension/AreaWithPosition";
import PositionedMixData from "../struct/PositionedCodeData";

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


    //최종 단계임. 얘는 불러오면 바로 쓸 수 있음
}

export default COZY;