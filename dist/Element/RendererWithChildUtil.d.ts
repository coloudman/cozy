import Renderer from "./Renderer";
import { Code, Data, Context, ControllerLinkingPointsManager } from "cozy_lib";
declare abstract class RendererWithChildUtil extends Renderer {
    private linkListeners;
    constructor(code: Code, data: Data, context: Context, linkingPointsManager: ControllerLinkingPointsManager);
    abstract voidLinkingPointElement(linkingPointName: string): HTMLElement;
    protected addLinkElement(linkingPointName: string): HTMLDivElement;
    protected removeLinkElement(linkingPointName: string): void;
    abstract setup(): any;
}
export default RendererWithChildUtil;
