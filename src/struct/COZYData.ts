import { CodeData } from "cozy_lib";
import Contexts from "cozy_lib/dist/structClass/Contexts";
import Position from "./Position";
import AreaData from "cozy_lib/dist/struct/AreaData";



export default interface COZYData {
    areaData:AreaData
    positions:Position[]
}