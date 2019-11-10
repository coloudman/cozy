import { Controller, Code, Data, Context, ControllerLinkingPointsManager } from "cozy_lib";
import CodeLinkingPointWithElement from "../structClass/CodeLinkingPointWithElement";
declare abstract class Renderer extends Controller {
    abstract render(): HTMLElement;
    abstract getCodeLinkingPointsWithElement(): CodeLinkingPointWithElement[];
    constructor(code: Code, data: Data, context: Context, linkingPointsManager: ControllerLinkingPointsManager);
}
export default Renderer;
