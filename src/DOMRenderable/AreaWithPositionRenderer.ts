import { AreaWithPosition } from "..";
import Renderer from "../Element/Renderer/Renderer";
import Position from "../struct/Position";
import PositionedCode from "../structClass/PositionedCode";
import CodeLinkingPointWithPosition from "../structClass/CodeLinkingPointWithPosition";
import EventEmitter from "wolfy87-eventemitter";

/*
이 친구는 렌더링 '만' 합니다.
딴거 안 합니다.

뗐다 붙였다 못 합니다. 그건 콘텍스트를 이용해서 따로 빼십쇼~
*/

export default class AreaWithPositionRenderer extends EventEmitter {
    parentElement: HTMLElement;
    areaWithPosition: AreaWithPosition;
    rendered: HTMLElement[];
    rendererControllerName: string;
    private createDiv(positionedCode : PositionedCode) {
        //DOM
        const div = document.createElement("div");
        div.style.display = "inline-block";
        div.style.pointerEvents = "none";
        
        const renderer = <Renderer> positionedCode.code.getController(this.rendererControllerName);
        div.appendChild(renderer.render());

        function changePosition(position : Position) {
            div.style.position = "absolute";
            div.style.left = position.x + "px";
            div.style.top = position.y + "px";
        }

        changePosition(positionedCode.position);
        positionedCode.on("positionChanged", changePosition);
        return div;
    }
    constructor(parentElement : HTMLElement, areaWithPosition : AreaWithPosition, rendererControllerName : string = "renderer") {
        super();
        //참고로 parentElement는 relative임
        this.parentElement = parentElement;
        this.parentElement.style.position = "relative";
        
        this.areaWithPosition = areaWithPosition;
        this.rendererControllerName = rendererControllerName;

        //기본적으로 존재하던 블록들 로드
        areaWithPosition.positionedCodes.forEach((positionedCode) => {
            this.parentElement.appendChild(this.createDiv(positionedCode));
        });

        //새 블록 추가
        areaWithPosition.on("positionedCodeAdded", positionedCode => {
            this.parentElement.appendChild(this.createDiv(positionedCode));
        });
        //블록 삭제
        areaWithPosition.on("positionedCodeRemoved", (positionedCode, index) => {
            this.parentElement.children[index].outerHTML = "";
        });
    }

    getCodeLinkingPointsWithPosition() : CodeLinkingPointWithPosition[] {
        let codeLinkingPointsWithPosition : CodeLinkingPointWithPosition[] = [];
        this.areaWithPosition.getPositionedCodes().forEach(positionedCode => {
            const renderer = <Renderer> positionedCode.code.getController(this.rendererControllerName);
            renderer.getCodeLinkingPointsWithElement().forEach(codeLinkingPointWithElement => {
                codeLinkingPointsWithPosition.push({
                    position:this.getOffset(codeLinkingPointWithElement.element),
                    linkingPoint:codeLinkingPointWithElement.linkingPoint
                });
            });
        });
        return codeLinkingPointsWithPosition;
    }

    protected getOffset(firstElement : HTMLElement) {
        let element = firstElement;
        const offset = {
            x:0,
            y:0
        };

        do {
            offset.x += element.offsetLeft;
            offset.y += element.offsetTop;
            element = <HTMLElement> element.offsetParent;
        } while(element !== this.parentElement);

        return offset;
    }
}