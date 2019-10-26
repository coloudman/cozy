import { MixData } from "cozy_lib";
import Position from "./Position";
export default interface PositionedMixData {
    mixData: MixData;
    position: Position;
}
