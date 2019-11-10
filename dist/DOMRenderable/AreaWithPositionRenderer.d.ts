import { AreaWithPosition } from "..";
export default class AreaWithPositionRenderer {
    parentElement: HTMLElement;
    areaWithPosition: AreaWithPosition;
    rendered: HTMLElement[];
    rendererControllerName: string;
    private createDiv;
    constructor(parentElement: HTMLElement, areaWithPosition: AreaWithPosition, rendererControllerName?: string);
    getCodeLinkingPointsWithPosition(): {
        position: {
            x: number;
            y: number;
        };
        linkingPoint: import("cozy_lib/dist/LinkingPoint/CodeLinkingPoint").default;
    }[][];
    private getOffset;
}
