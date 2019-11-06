import Renderer from "./Renderer";
import RendererWithChild from "./RendererWithChildUtil";
import { Code, Data, Context, LinkingPointsManager } from "cozy_lib";



/*
abstract class SquareBlock extends Renderer {
    private div: HTMLDivElement;
    private elements: (string | HTMLElement)[]

    private linkListeners: { // [onlink, onunlink]
        [linkingPointName : string]:[()=>any, ()=>any]
    }

    init() {
        this.div = document.createElement("div");
        this.setup();
    }

    private voidLinkingPointElement() {
        const div = document.createElement("div");
        div.style.width = "50px";
        div.style.height = "50px";
        div.style.backgroundColor = "white";
        return div;
    }

    protected addElement(element : string | HTMLElement, index = (this.elements.length-1)) {
        //일단 엘리먼트 배열에 넣음
        this.elements.splice(index, 0, element);
        if(element instanceof HTMLElement) { //엘리먼트 오브젝트면
            this.div.insertBefore(element, this.div.children[index]);
        } else { //연결점이면
            const box = document.createElement("div");
            box.style.display = "inline-block";

            //기본 렌더링(링크, 언링크 되기 전에)
            if(this.getLinked(element)) { //연결점에 연결된게 있으면
                box.appendChild((<Renderer> this.getLinked(element)).render()); //렌더링!
            } else {
                box.appendChild(this.voidLinkingPointElement()) //없으면 없는대로 처리.
            }

            //메인 div에 꽂아버립니다.
            this.div.insertBefore(box, this.div.children[index]);
            
            //그리고 링크에 대한 리스너
            this.linkListeners[element] = [() => {
                box.removeChild(box.children[0]);
                box.appendChild((<Renderer> this.getLinked(element)).render());
            }, () => {
                box.removeChild(box.children[0]);
                box.appendChild(this.voidLinkingPointElement());
            }];
            this.code.getLinkingPoint(element)
            .on("link", this.linkListeners[element][0])
            .on("unlink", this.linkListeners[element][1]);

        }
    }

    protected removeElement(index : number) {
        this.elements.splice(index, 1);
        this.div.removeChild(this.div.children[index]);
    }

    protected setBackground(background : string) {
        this.div.style.background = background;
    }

    render() {

        return this.div;
    }

    afterStop() {
        //링크 관련 리스너들 제거
        Object.entries(this.linkListeners).forEach(([linkingPointName, listeners]) => {
            this.code.getLinkingPoint(linkingPointName)
            .removeListener("link", listeners[0])
            .removeListener("unlink", listeners[1]);
        });
    }

    abstract setup():any
}
*/

abstract class SquareBlock extends RendererWithChild {
    
    constructor(code : Code, data : Data, context : Context, linkingPointsManager : LinkingPointsManager<Code>) {
        super(code, data, context, linkingPointsManager);

        //RendererWithChildUtil보다 쓰기 쉽게 구현할 예정
    }
}

export default SquareBlock;