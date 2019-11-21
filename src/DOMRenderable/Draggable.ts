import AreaWithPositionRenderer from "./AreaWithPositionRenderer";
import AreaWithPosition from "../AreaExtension/AreaWithPosition";
import Position from "../struct/Position";
import { CodeData } from "cozy_lib";
import CodeLinkingPointWithPosition from "../structClass/CodeLinkingPointWithPosition";

//상대좌표를 구합니다.
function getRelativeElementPosition(a : HTMLElement, b : HTMLElement) : Position {
    let now = a;
    let offset = {x:0,y:0};
    do {
        offset.x += now.offsetLeft;
        offset.y += now.offsetTop;
        now = <HTMLElement> now.offsetParent;
    }
    while(now !== b);

    return offset;
}


/*
드래그가 가능해 집니다.
*/

class Draggable extends AreaWithPositionRenderer {
    blocksParentElement: HTMLDivElement;
    tempBlocksParentElement: HTMLDivElement;
    constructor(parentElement : HTMLElement, areaWithPosition : AreaWithPosition, rendererControllerName : string = "renderer", distance : number = 15) {
        parentElement.style.position = "relative";

        const blocksParentElement = document.createElement("div");
        blocksParentElement.style.width = "100%";
        blocksParentElement.style.height = "100%";
        blocksParentElement.style.zIndex = "1";
        parentElement.appendChild(blocksParentElement);

        super(blocksParentElement, areaWithPosition, rendererControllerName);

        /*
        Draggable에서는 렌더러 콘텍스트에
        drag 관련된 함수들을 추가해 줍니다.
        (콘텍스트 개조)
        */
        const _this = this;
        (<any> areaWithPosition.area.contexts[this.rendererControllerName]).dragStart = function dragStart(element : HTMLElement, clickPosition : Position, codeData : CodeData) {
            const position = getRelativeElementPosition(element, blocksParentElement);

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

            div.appendChild(element.cloneNode(true));

            //뜬 블럭이 위쪽에 보이도록
            tempBlocksParentElement.style.zIndex = "2";
            tempBlocksParentElement.appendChild(div);

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
                    return(linkingPointWithPosition.position.x - position.x) **2 + (linkingPointWithPosition.position.y - position.y)**2 <= distance**2;
                });
                if(linkingPointWithPosition) { //연결할 곳 있다
                    const linkingPoint = linkingPointWithPosition.linkingPoint;
                    if(linkingPoint.linked) { //이미 연결된 놈 있다
                        const linkedCodeData = linkingPoint.linked.codeData;
                        linkingPoint.linked.stop();
                        areaWithPosition.addPositionedCode(linkedCodeData, {
                            x:position.x + 2*distance,
                            y:position.y + 2*distance
                        });
                    }
                    linkingPointWithPosition.linkingPoint.link(codeData);
                } else { //없다..
                    areaWithPosition.addPositionedCode(codeData, position);
                }
                //끄읕내.
                div.outerHTML = "";
                tempBlocksParentElement.removeEventListener("mousemove", drag);
                tempBlocksParentElement.removeEventListener("mouseup", dragEnd);
                tempBlocksParentElement.style.zIndex = "0";
            }

            tempBlocksParentElement.addEventListener("mousemove", drag);
            tempBlocksParentElement.addEventListener("mouseup", dragEnd);
        };

        this.blocksParentElement = blocksParentElement;
        
        const tempBlocksParentElement = document.createElement("div");
        tempBlocksParentElement.style.width = "100%";
        tempBlocksParentElement.style.height = "100%";
        tempBlocksParentElement.style.position = "absolute";
        tempBlocksParentElement.style.left = "0px";
        tempBlocksParentElement.style.top = "0px";
        tempBlocksParentElement.style.zIndex = "0";
        parentElement.appendChild(tempBlocksParentElement);
        this.tempBlocksParentElement = tempBlocksParentElement;


    }
}

export default Draggable;