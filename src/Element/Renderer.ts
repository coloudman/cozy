
import { Controller, LinkingPointsManager, Code, Data, Context } from "cozy_lib";

abstract class Renderer extends Controller {
    abstract render() : HTMLElement;
    constructor(code : Code, data : Data, context : Context, linkingPointsManager : LinkingPointsManager<Code>) {
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

