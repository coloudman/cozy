import Renderer from "./Renderer";
import { Code, Data, Context, ControllerLinkingPointsManager } from "cozy_lib";


abstract class RendererWithChildUtil extends Renderer {

    private linkListeners: { // [onlink, onunlink]
        [linkingPointName : string]:[()=>any, ()=>any]
    }

    
    constructor(code : Code, data : Data, context : Context, linkingPointsManager : ControllerLinkingPointsManager) {
        super(code, data, context, linkingPointsManager);
        this.linkListeners = {};
        this.on("stop", ()=>{
            //리스너들 제거
            Object.keys(this.linkListeners).forEach((linkingPointName) => {
                this.removeLinkElement(linkingPointName);
            });
        });
    }

    abstract voidLinkingPointElement(linkingPointName : string) : HTMLElement;

    //(연결점 연결시 자동 렌더링하는)엘리먼트를 만듭니다.
    protected addLinkElement(linkingPointName : string) {
        const box = document.createElement("div");
        box.style.display = "inline-block";

        //기본 렌더링(링크, 언링크 되기 전에)
        if(this.getLinked(linkingPointName)) { //연결점에 연결된게 있으면
            box.appendChild((<Renderer> this.getLinked(linkingPointName)).render()); //렌더링!
        } else {
            box.appendChild(this.voidLinkingPointElement(linkingPointName)) //없으면 없는대로 처리.
        }

        //그리고 링크에 대한 리스너
        const linkListener = this.linkListeners[linkingPointName] = [() => {
            box.removeChild(box.children[0]);
            box.appendChild((<Renderer> this.getLinked(linkingPointName)).render());
        }, () => {
            box.removeChild(box.children[0]);
            box.appendChild(this.voidLinkingPointElement(linkingPointName));
        }];

        this.getLinkingPoint(linkingPointName)
        .on("linked", linkListener[0])
        .on("unlinked", linkListener[1]);

        return box;
    }

    protected removeLinkElement(linkingPointName : string) {
        this.code.getLinkingPoint(linkingPointName)
        .removeListener("link", this.linkListeners[linkingPointName][0])
        .removeListener("unlink", this.linkListeners[linkingPointName][1]);
    }

    abstract setup():any
}

export default RendererWithChildUtil;