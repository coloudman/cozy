import { AreaWithPosition } from "..";
import Renderer from "../Element/Renderer";
import Position from "../struct/Position";
import PositionedCode from "../structClass/PositionedCode";
import CodeLinkingPointWithPosition from "../structClass/CodeLinkingPointWithPosition";


export default class AreaWithPositionRenderer {
    parentElement: HTMLElement;
    areaWithPosition: AreaWithPosition;
    rendered: HTMLElement[];
    rendererControllerName: string;
    private createDiv(positionedCode : PositionedCode) {
        //DOM
        const div = document.createElement("div");
        div.style.display = "inline-block";
        
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

    getCodeLinkingPointsWithPosition() {
        return this.areaWithPosition.getPositionedCodes().map(positionedCode => {
            const renderer = <Renderer> positionedCode.code.getController("renderer");
            const codeLinkingPointsWithPosition = renderer.getCodeLinkingPointsWithElement().map(codeLinkingPointWithPosition => {
                return ({
                    position:this.getOffset(codeLinkingPointWithPosition.element),
                    linkingPoint:codeLinkingPointWithPosition.linkingPoint
                });
            });
            return codeLinkingPointsWithPosition;
        });
    }

    private getOffset(element : HTMLElement) {
        const offset = {
            x:0,
            y:0
        };

        do {
            offset.x += element.offsetLeft;
            offset.y += element.offsetTop;
        } while(element.offsetParent !== this.parentElement);

        return offset;
    }
}