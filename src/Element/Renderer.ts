
import { Controller, Code, Data, Context, ControllerLinkingPointsManager } from "cozy_lib";
import CodeLinkingPointWithElement from "../structClass/CodeLinkingPointWithElement";
import Position from "../struct/Position";
import RendererContext from "../Context/RendererContext";

abstract class Renderer extends Controller {
    abstract render() : HTMLElement; //한 번만 호출됩니다!
    abstract getHTMLElement() : HTMLElement //그 이후에 이 Renderer가 관리하는 HTMLElement를 빼올때 사용합니다.
    abstract getCodeLinkingPointsWithElement() : CodeLinkingPointWithElement[];
    constructor(code : Code, data : Data, context : Context, linkingPointsManager : ControllerLinkingPointsManager) {
        super(code, data, context, linkingPointsManager);
    }
}

export default Renderer;

