import RendererWithChild from "./RendererWithChildUtil";
import { Code, Data, Context, ControllerLinkingPointsManager } from "cozy_lib";
declare abstract class SquareBlock extends RendererWithChild {
    constructor(code: Code, data: Data, context: Context, linkingPointsManager: ControllerLinkingPointsManager);
}
export default SquareBlock;
