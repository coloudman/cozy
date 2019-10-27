import { Area, CodeLoader, ControllerLoaders, MixData } from "cozy_lib";
import PositionedMix from "../structClass/PositionedMix";
import Position from "@src/struct/Position";

import EventEmitter from "wolfy87-eventemitter";

/*
Area의 확장이지만
무조건적으로 모든 코드가 좌표를 가지므로
Area 메서드에 대한 접근 권한은 없어야 함
즉 extends는 아님.
*/

declare interface AreaWithPosition {
    on(event : "positionedMixAdded", listener : (code : PositionedMix) => void) : this
    on(event : "positionedMixRemoved", listener : (code : PositionedMix, index : number) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "positionedMixAdded", positionedMix : PositionedMix) : this
    emit(event : "positionedMixRemoved", positionedMix : PositionedMix, index : number) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class AreaWithPosition extends EventEmitter {
    public area: Area;
    public positionedMixes: PositionedMix[];
    private positions: Position[];
    constructor(area : Area, positions : Position[]) {
        super();
        this.area = area;
        this.positions = positions;
        this.positionedMixes = this.area.mixes.map((mix, index) => {
            return new PositionedMix(mix, this.positions[index]);
        });
    }
    addPositionedMix(mixData : MixData, position:Position) : PositionedMix {
        //position
        this.positions.push(position);

        //area mix, mixData auto add
        const mix = this.area.addMix(mixData);

        //
        const positionedMix = new PositionedMix(mix, position);

        //positionedMixes
        this.positionedMixes.push(positionedMix);

        this.emit("positionedMixAdded", positionedMix);

        return positionedMix;
    }
    removePositionedMix(positionedMix : PositionedMix) {
        const index = this.positionedMixes.indexOf(positionedMix);
        //position
        this.positions.splice(index, 1);
        //area mix, mixData auto remove
        this.area.removeMix(positionedMix.mix);
        //positionedMixes
        this.positionedMixes.splice(index, 1);
        
        this.emit("positionedMixRemoved", positionedMix);
    }
}

export default AreaWithPosition;