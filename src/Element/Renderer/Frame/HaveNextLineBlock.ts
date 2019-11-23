import RendererWithChildUtil from "../RendererWithChildUtil";
import LineBlock from "./LineBlock";
import HaveNextRenderer from "../HaveNextRenderer";
import CodeLinkingPointWithElement from "../../../structClass/CodeLinkingPointWithElement";
import { CodeLinkingPoint } from "cozy_lib";

abstract class HaveNextLineBlock extends LineBlock {
    nextElement : HTMLElement;
    make = HaveNextRenderer.prototype.make;
    renderE() {
        return this.make(super.renderE());
    }
    getCodeLinkingPointsWithElement() {
        return [
            ...this.getCodeLinkingPointsWithElementFrom({next:this.nextElement}),
            ...this.getCodeLinkingPointsWithElementFrom(this.linkingPointElements)
        ];
    }
}

export default HaveNextLineBlock;