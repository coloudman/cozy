
import { CodeData, CodeLoader, ControllerLoaders, Area, Context, Controller } from "cozy_lib";
import COZYData from "../struct/COZYData";
import Compiler from "../Element/Compiler";
import AreaWithPosition from "../AreaExtension/AreaWithPosition";
import Contexts from "cozy_lib/dist/structClass/Contexts";
import Draggable from "./Draggable";

/*
COZY는 렌더가 있습니다.
그외에는 compose라는 개념으로
여러 녀석들을 하나로 통합하는 도구를 만들수 있게 합니다.
*/

type Composer = (controllers : Controller[], context : Context) => any;

class COZY {
    
    cozyData: COZYData;
    parentElement: HTMLElement;
    composer: Composer
    areaWithPosition: AreaWithPosition;
    area: Area;
    draggableElement: HTMLDivElement;
    draggable: Draggable;
    constructor(parentElement : HTMLElement, codeLoader : CodeLoader, cozyData:COZYData, rendererControllerName : string = "renderer", distance : number = 15) {
        this.parentElement = parentElement;

        const draggableElement = document.createElement("div");
        draggableElement.style.width = "100%";
        draggableElement.style.height = "100%";

        this.draggableElement = draggableElement;

        parentElement.appendChild(draggableElement);
        
        this.area = new Area(codeLoader, cozyData.codeDatas, cozyData.contexts)
        this.areaWithPosition = new AreaWithPosition(this.area, cozyData.positions);
        this.draggable = new Draggable(this.draggableElement, this.areaWithPosition, rendererControllerName, distance);
    }


    //최종 단계임. 얘는 불러오면 바로 쓸 수 있음
}

export default COZY;