import { Area, CodeLoader, ControllerLoaders, MixData } from "cozy_lib";
import PositionedMixData from "../struct/PositionedMixData";
import PositionedMix from "@src/struct/PositionedMix";

/*
Area의 확장이지만
무조건적으로 모든 코드가 좌표를 가지므로
Area 메서드에 대한 접근 권한은 없어야 함
즉 extends는 아님.
*/
class AreaWithPosition {
    public area: Area;
    private positionedMixDatas: PositionedMixData[];
    private readonly mixDatas: MixData[];
    public positionedMixes: PositionedMix[];
    constructor(codeLoader : CodeLoader, controllerLoaders : ControllerLoaders, positionedMixDatas:PositionedMixData[]) {
        this.positionedMixDatas = positionedMixDatas;
        this.mixDatas = positionedMixDatas.map(positionedMixData => positionedMixData.mixData);
        this.area = new Area(codeLoader, controllerLoaders, this.mixDatas);
        this.positionedMixes = this.area.mixes.map((mix, index) => {
            return {
                mix: mix,
                position: this.positionedMixDatas[index].position
            };
        });
    }
    addPositionedMix(positionedMixData : PositionedMixData) : PositionedMix {
        //positionedMixData
        this.positionedMixDatas.push(positionedMixData);
        //area mix, mixData auto add
        const mix = this.area.addMix(positionedMixData.mixData);

        //
        const positionedMix = {
            mix:mix,
            position:positionedMixData.position
        }

        //positionedMixes
        this.positionedMixes.push(positionedMix);

        return positionedMix;
    }
    removePositionedMix(positionedMix : PositionedMix) {
        const index = this.positionedMixes.indexOf(positionedMix);
        //positionedMixData
        this.positionedMixDatas.splice(index, 1);
        //area mix, mixData auto remove
        this.area.removeMix(positionedMix.mix);
        //positionedMixes
        this.positionedMixes.splice(index, 1);
    }
}

export default AreaWithPosition;