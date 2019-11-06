import RendererWithChild from "./RendererWithChildUtil";
import { Code, Data, Context, LinkingPointsManager } from "cozy_lib";
declare abstract class SquareBlock extends RendererWithChild {
    constructor(code: Code, data: Data, context: Context, linkingPointsManager: LinkingPointsManager<Code>);
}
export default SquareBlock;
