import { Area, CodeLoader, ControllerLoaders, CodeData } from "cozy_lib";
import PositionedCode from "../structClass/PositionedCode";
import Position from "@src/struct/Position";

import EventEmitter from "wolfy87-eventemitter";

/*
Area의 확장이지만
무조건적으로 모든 코드가 좌표를 가지므로
Area 메서드에 대한 접근 권한은 없어야 함
즉 extends는 아님.
*/

declare interface AreaWithPosition {
    on(event : "positionedCodeAdded", listener : (code : PositionedCode) => void) : this
    on(event : "positionedCodeRemoved", listener : (code : PositionedCode, index : number) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "positionedCodeAdded", positionedMix : PositionedCode) : this
    emit(event : "positionedCodeRemoved", positionedMix : PositionedCode, index : number) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class AreaWithPosition extends EventEmitter {
    public area: Area;
    public positionedCodes: PositionedCode[];
    private positions: Position[];
    constructor(area : Area, positions : Position[]) {
        super();
        this.area = area;
        this.positions = positions;
        this.positionedCodes = this.area.codes.map((code, index) => {
            return new PositionedCode(code, this.positions[index]);
        });
    }
    addPositionedCode(codeData : CodeData, position:Position) : PositionedCode {
        //position
        this.positions.push(position);

        //area code, codeData auto add
        const code = this.area.addCode(codeData);

        //생성
        const positionedCode = new PositionedCode(code, position);

        //positionedCodes
        this.positionedCodes.push(positionedCode);

        //이벤트
        this.emit("positionedCodeAdded", positionedCode);
        return positionedCode;
    }
    removePositionedCode(positionedCode : PositionedCode) {
        const index = this.positionedCodes.indexOf(positionedCode);
        //position
        this.positions.splice(index, 1);

        //area code, codeData auto remove
        this.area.removeCode(positionedCode.code);

        //positionedCodes
        this.positionedCodes.splice(index, 1);
        
        //이벤트
        this.emit("positionedCodeRemoved", positionedCode);
    }
}

export default AreaWithPosition;