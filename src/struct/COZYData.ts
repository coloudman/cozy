import { CodeData } from "cozy_lib";
import Contexts from "cozy_lib/dist/structClass/Contexts";
import Position from "./Position";



export default interface COZYData {
    codeDatas:CodeData[]
    contexts:Contexts
    positions:Position[]
}