import { AreaWithPosition } from "..";
import Renderer from "@src/Element/Renderer";


export default class AreaWithPositionRenderer {
    parentElement: HTMLElement;
    areaWithPosition: AreaWithPosition;
    rendered: HTMLElement[];
    constructor(parentElement : HTMLElement, areaWithPosition : AreaWithPosition) {
        this.parentElement = parentElement;
        this.areaWithPosition = areaWithPosition;

        this.rendered = this.areaWithPosition.area.getController("render").map((renderer : Renderer) => {
            return renderer.render();
        });

        this.rendered.forEach(element => {
            this.parentElement.appendChild(element);
        });
    }
}