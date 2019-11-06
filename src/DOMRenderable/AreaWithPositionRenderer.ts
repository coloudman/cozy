import { AreaWithPosition } from "..";
import Renderer from "@src/Element/Renderer";
import Position from "../struct/Position";
import PositionedCode from "@src/structClass/PositionedCode";


export default class AreaWithPositionRenderer {
    parentElement: HTMLElement;
    areaWithPosition: AreaWithPosition;
    rendered: HTMLElement[];
    private createDiv(positionedCode : PositionedCode) {
        //DOM
        const div = document.createElement("div");
        div.style.display = "inline-block";
        
        const renderer : any = positionedCode.code.controllers.renderer;
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
    constructor(parentElement : HTMLElement, areaWithPosition : AreaWithPosition) {
        this.parentElement = parentElement;
        this.areaWithPosition = areaWithPosition;

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
}