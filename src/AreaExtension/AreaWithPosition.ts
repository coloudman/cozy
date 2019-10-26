import { Area, CodeLoader, ControllerLoaders, MixData } from "cozy_lib";
import PositionedMixData from "../struct/PositionedMixData";
import PositionedMix from "@src/struct/PositionedMix";
import Position from "@src/struct/Position";

/*
Area의 확장이지만
무조건적으로 모든 코드가 좌표를 가지므로
Area 메서드에 대한 접근 권한은 없어야 함
즉 extends는 아님.
*/
class AreaWithPosition {
    public area: Area;
    public positionedMixes: PositionedMix[];
    private positions: Position[];
    constructor(area : Area, positions : Position[]) {
        this.area = area;
        this.positions = positions;
        this.positionedMixes = this.area.mixes.map((mix, index) => {
            return {
                mix: mix,
                position: this.positions[index]
            };
        });
    }
    addPositionedMix(mixData : MixData, position:Position) : PositionedMix {
        //position
        this.positions.push(position);

        //area mix, mixData auto add
        const mix = this.area.addMix(mixData);

        //
        const positionedMix = {
            mix:mix,
            position:position
        }

        //positionedMixes
        this.positionedMixes.push(positionedMix);

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
    }
}

export default AreaWithPosition;