
import { Controller, Code, Data, Context, ControllerLinkingPointsManager } from "cozy_lib";
import CodeLinkingPointWithElement from "../../structClass/CodeLinkingPointWithElement";
import Position from "../../struct/Position";
import RendererContext from "../../Context/RendererContext";

abstract class Renderer extends Controller {
    rendered: HTMLElement;
    abstract renderE() : HTMLElement; //한 번만 호출됩니다!
    abstract getCodeLinkingPointsWithElement() : CodeLinkingPointWithElement[];
    constructor(code : Code, data : Data, context : Context, linkingPointsManager : ControllerLinkingPointsManager) {
        super(code, data, context, linkingPointsManager);
    }

    render() {
        if(!this.rendered) {
            this.rendered = this.renderE();
        }
        return this.rendered;
    }
}

export default Renderer;

