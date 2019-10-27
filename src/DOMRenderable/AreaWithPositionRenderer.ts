import { AreaWithPosition } from "..";
import Renderer from "@src/Element/Renderer";
import Position from "../struct/Position";
import PositionedMix from "@src/structClass/PositionedMix";


export default class AreaWithPositionRenderer {
    parentElement: HTMLElement;
    areaWithPosition: AreaWithPosition;
    rendered: HTMLElement[];
    private createDiv(positionedMix : PositionedMix) {
        //DOM
        const div = document.createElement("div");
        div.style.display = "inline-block";
        
        const renderer : any = positionedMix.mix.controllers.renderer;
        div.appendChild(renderer.render());

        function changePosition(position : Position) {
            div.style.position = "absolute";
            div.style.left = position.x + "px";
            div.style.top = position.y + "px";
        }

        changePosition(positionedMix.position);
        positionedMix.on("positionChanged", changePosition);
        return div;
    }
    constructor(parentElement : HTMLElement, areaWithPosition : AreaWithPosition) {
        this.parentElement = parentElement;
        this.areaWithPosition = areaWithPosition;

        //기본적으로 존재하던 블록들 로드
        areaWithPosition.positionedMixes.forEach((positionedMix) => {
            this.parentElement.appendChild(this.createDiv(positionedMix));
        });

        //새 블록 추가
        areaWithPosition.on("positionedMixAdded", positionedMix => {
            this.parentElement.appendChild(this.createDiv(positionedMix));
        });
        //블록 삭제
        areaWithPosition.on("positionedMixRemoved", (positionedMix, index) => {
            this.parentElement.children[index].outerHTML = "";
        });
    }
}