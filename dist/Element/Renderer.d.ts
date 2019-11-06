import { Controller, LinkingPointsManager, Code, Data, Context } from "cozy_lib";
declare abstract class Renderer extends Controller {
    abstract render(): HTMLElement;
    constructor(code: Code, data: Data, context: Context, linkingPointsManager: LinkingPointsManager<Code>);
}
export default Renderer;
