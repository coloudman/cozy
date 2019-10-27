import { AreaWithPosition } from "..";
export default class AreaWithPositionRenderer {
    parentElement: HTMLElement;
    areaWithPosition: AreaWithPosition;
    rendered: HTMLElement[];
    private createDiv;
    constructor(parentElement: HTMLElement, areaWithPosition: AreaWithPosition);
}
