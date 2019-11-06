import Renderer from "./Renderer";
import { Code, Data, Context, LinkingPointsManager } from "cozy_lib";
declare abstract class RendererWithChild extends Renderer {
    private linkListeners;
    constructor(code: Code, data: Data, context: Context, linkingPointsManager: LinkingPointsManager<Code>);
    abstract voidLinkingPointElement(linkingPointName: string): HTMLElement;
    protected addLinkElement(linkingPointName: string): HTMLDivElement;
    protected removeLinkElement(linkingPointName: string): void;
    abstract setup(): any;
}
export default RendererWithChild;
