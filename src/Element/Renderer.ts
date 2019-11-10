
import { Controller, Code, Data, Context, ControllerLinkingPointsManager } from "cozy_lib";
import CodeLinkingPointWithElement from "@src/structClass/CodeLinkingPointWithElement";

abstract class Renderer extends Controller {
    abstract render() : HTMLElement;
    abstract getCodeLinkingPointsWithElement() : CodeLinkingPointWithElement[];
    constructor(code : Code, data : Data, context : Context, linkingPointsManager : ControllerLinkingPointsManager) {
        super(code, data, context, linkingPointsManager);
        this.on("stop", ()=>{Object.values(this.getLinkingPoints()).forEach(linkingPoint => { //연결점에 연결되어 있는 다른 렌더러들도 모두 스탑함
                if(linkingPoint.linked) {
                    linkingPoint.linked.stop();
                }
            });
        });
    }
}

export default Renderer;

