import Renderer from "./Renderer";
import { Code, Data, Context, ControllerLinkingPointsManager, CodeLinkingPoint } from "cozy_lib";
import CodeLinkingPointWithElement from "../../structClass/CodeLinkingPointWithElement";

/*
사실상 안 쓰일 수가 없다.
Renderer의 원초적 느낌을 인간친화적으로 잡아주는 클래스

기존 Renderer의 작동에 문제를 주지 않고 대부분에서 쓰이므로
COZY의 Renderer 확장들은 이 클래스를 extends 한다.
*/

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

    //(연결점 연결시 자동 렌더링하는)엘리먼트를 만듭니다.
    protected addLinkElement(linkingPointName : string, voidLinkingPointElement : HTMLElement) {
        const linkingPoint = this.getLinkingPoint(linkingPointName);
        const box = document.createElement("div");
        box.style.pointerEvents = "none";
        box.style.display = "inline-block";

        voidLinkingPointElement.style.pointerEvents = "auto";

        //기본 렌더링(링크, 언링크 되기 전에)
        if(linkingPoint.linked) { //연결점에 연결된게 있으면
            box.appendChild((<Renderer> linkingPoint.linked).render()); //렌더링!
        } else {
            box.appendChild(voidLinkingPointElement) //없으면 없는대로 처리.
        }

        //그리고 링크에 대한 리스너
        const linkListener = this.linkListeners[linkingPointName] = [() => {
            const renderer = <Renderer> this.getLinked(linkingPointName);
            box.removeChild(box.children[0]);
            box.appendChild(renderer.render());
        }, () => {
            box.removeChild(box.children[0]);
            box.appendChild(voidLinkingPointElement);
        }];

        linkingPoint
        .on("linked", linkListener[0])
        .on("unlinked", linkListener[1]);

        return box;
    }

    protected removeLinkElement(linkingPointName : string) {
        this.code.getLinkingPoint(linkingPointName)
        .removeListener("link", this.linkListeners[linkingPointName][0])
        .removeListener("unlink", this.linkListeners[linkingPointName][1]);
    }

    protected getCodeLinkingPointsWithElementFrom(linkingPointElements : {[linkingPointName : string] : HTMLElement}) : CodeLinkingPointWithElement[] {
        let codeLinkingPointsWithElement : CodeLinkingPointWithElement[] = [];
        Object.entries(linkingPointElements).forEach(([linkingPointName, linkingPointElement]) => {
            if(this.getLinked(linkingPointName)) {
                codeLinkingPointsWithElement.push.apply(codeLinkingPointsWithElement,(<Renderer> this.getLinked(linkingPointName)).getCodeLinkingPointsWithElement());
            }
            codeLinkingPointsWithElement.push({
                element:linkingPointElement,
                linkingPoint: <CodeLinkingPoint> this.getCodeLinkingPoint(linkingPointName)
            })
        });
        return codeLinkingPointsWithElement;
    }

    protected getCodeLinkingPointsWithElementByExists() {

    }

    abstract setup():any
}

export default RendererWithChildUtil;