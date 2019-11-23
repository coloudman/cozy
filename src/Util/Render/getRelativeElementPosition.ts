import Position from "../../struct/Position";

//상대좌표를 구합니다.
export default function getRelativeElementPosition(a : HTMLElement, b : HTMLElement) : Position {
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