import AreaWithPositionRenderer from "./AreaWithPositionRenderer";
import AreaWithPosition from "../AreaExtension/AreaWithPosition";
import Position from "../struct/Position";
import { CodeData, Code } from "cozy_lib";
import CodeLinkingPointWithPosition from "../structClass/CodeLinkingPointWithPosition";
import getRelativeElementPosition from "../Util/Render/getRelativeElementPosition";
import Renderer from "../Element/Renderer/Renderer";
import DraggableRendererContext from "../Context/DraggableRendererContext";

/*
드래그가 가능해 집니다.
*/

declare interface Draggable {
    on(event : "dragStart", listener : (position : Position, code : Code) => void) : this
    on(event : "dragEnded", listener : (code : Code, position? : Position) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "dragStart", position:Position, code:Code) : this
    emit(event : "dragEnded", code:Code, position? : Position) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class Draggable extends AreaWithPositionRenderer {
    blocksParentElement: HTMLDivElement;
    tempBlocksParentElement: HTMLDivElement;
    distance: number;
    deleteMode: boolean;
    constructor(parentElement : HTMLElement, areaWithPosition : AreaWithPosition, rendererControllerName : string = "renderer", distance : number = 15) {
        parentElement.style.position = "relative";

        const blocksParentElement = document.createElement("div");
        blocksParentElement.style.width = "100%";
        blocksParentElement.style.height = "100%";
        blocksParentElement.style.zIndex = "1";
        parentElement.appendChild(blocksParentElement);

        super(blocksParentElement, areaWithPosition, rendererControllerName);
        this.blocksParentElement = blocksParentElement;
        
        //tempBlock (블럭 공중에 띄우는 것)
        const tempBlocksParentElement = document.createElement("div");
        tempBlocksParentElement.style.width = "100%";
        tempBlocksParentElement.style.height = "100%";
        tempBlocksParentElement.style.position = "absolute";
        tempBlocksParentElement.style.left = "0px";
        tempBlocksParentElement.style.top = "0px";
        tempBlocksParentElement.style.zIndex = "2";
        tempBlocksParentElement.style.display = "none";
        parentElement.appendChild(tempBlocksParentElement);
        this.tempBlocksParentElement = tempBlocksParentElement;

        this.distance = distance;

        /*
        Draggable에서는 렌더러 콘텍스트에
        drag 관련된 함수들을 추가해 줍니다.
        (콘텍스트 개조)
        */
       const _this = this;
        (<DraggableRendererContext> areaWithPosition.area.contexts[this.rendererControllerName]).on("dragStart", function dragStart(clickPosition : Position, code : Code) {
            _this.emit("dragStart", clickPosition, code);
            return _this.dragStart(getRelativeElementPosition((<Renderer>code.getController(_this.rendererControllerName)).rendered, _this.blocksParentElement), clickPosition, code);
        });
    }
    dragStart( _position : Position, clickPosition : Position, code : Code) {
        if(this.deleteMode) {
            code.stop();
            this.emit("dragEnded", code);
            return;
        }
        const _this = this;
            const position = {
                ..._position
            };

            //'전' 마우스 위치 입니다.
            const mousePosition = {
                x : (position.x + clickPosition.x),
                y : (position.y + clickPosition.y)
            };

            const div = document.createElement("div");
            div.style.display = "inline-block";
            div.style.position = "absolute";

            function repositionDiv() {
                div.style.left = position.x + "px";
                div.style.top = position.y + "px";
            }
            repositionDiv();

            div.appendChild((<Renderer>code.getController(_this.rendererControllerName)).render().cloneNode(true));

            //뜬 블럭이 위쪽에 보이도록
            this.tempBlocksParentElement.style.display = "block";
            this.tempBlocksParentElement.appendChild(div);

            let firstDrag = true;
            let linkingPointsWithPosition : CodeLinkingPointWithPosition[];
            function drag(event : MouseEvent) {
                if(firstDrag) {
                    linkingPointsWithPosition = _this.getCodeLinkingPointsWithPosition();
                    firstDrag = false;
                }

                /*
                position.x += event.offsetX - mousePosition.x;
                position.y += event.offsetY - mousePosition.y;
                mousePosition.x = event.offsetX;
                mousePosition.y = event.offsetY;
                */
                position.x += event.movementX;
                position.y += event.movementY;
                mousePosition.x += event.movementX;
                mousePosition.y += event.movementY

                div.style.left = position.x + "px";
                div.style.top = position.y + "px";

                repositionDiv();
            }

            function dragEnd(event : MouseEvent) {
                //안 움직였으면 그냥 링킹포인트들 로드 해 주자.
                if(firstDrag) {
                    linkingPointsWithPosition = _this.getCodeLinkingPointsWithPosition();
                }

                //딱 연결할만할 놈을 찾습니다
                const linkingPointWithPosition = linkingPointsWithPosition.find(linkingPointWithPosition => {
                    return (linkingPointWithPosition.position.x - position.x) **2 + (linkingPointWithPosition.position.y - position.y)**2 <= _this.distance**2;
                });
                if(linkingPointWithPosition && !(<any>code).onlystart) { //연결할 곳 있다
                    const linkingPoint = linkingPointWithPosition.linkingPoint;
                    if(linkingPoint.linked) { //이미 연결된 놈 있다
                        const linkedCode = linkingPoint.linked;
                        linkingPoint.linked.unlinkSelf();
                        _this.areaWithPosition.addPositionedCode(linkedCode, {
                            x:position.x + 2*_this.distance,
                            y:position.y + 2*_this.distance
                        });
                    }
                    linkingPointWithPosition.linkingPoint.link(code);
                    _this.emit("dragEnded", code);
                } else { //없다..
                    _this.areaWithPosition.addPositionedCode(code, position);
                    _this.emit("dragEnded", code, position);
                }
                //끄읕내.
                div.outerHTML = "";
                _this.tempBlocksParentElement.removeEventListener("mousemove", drag);
                _this.tempBlocksParentElement.removeEventListener("mouseup", dragEnd);
                _this.tempBlocksParentElement.style.display = "none";

            }

            this.tempBlocksParentElement.addEventListener("mousemove", drag);
            this.tempBlocksParentElement.addEventListener("mouseup", dragEnd);
    }
}

export default Draggable;