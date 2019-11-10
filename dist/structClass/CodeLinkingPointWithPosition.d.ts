import Position from "../struct/Position";
import { CodeLinkingPoint } from "cozy_lib";
export default interface CodeLinkingPointWithPosition {
    position: Position;
    linkingPoint: CodeLinkingPoint;
}
