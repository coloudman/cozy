import Renderer from "./Renderer";
import { Code, Data, Context, ControllerLinkingPointsManager } from "cozy_lib";
import DraggableRendererContext from "../Context/DraggableRendererContext";
/*
DraggableRenderer 클래스는
드래그가 가능한 클래스입니다.

드래그 시작시 자동으로 연결점에서 분리됩니다.



단순한 렌더링과는 다르게
밖에다가 드래그가 시작됨을 알릴 필요가 있음(context 이용)

mouseDown (드래그 시작) =>
this.dragStarted로 드래그 시작 호출

컨트롤러를 정지함(여기서 블록을 뗀다는 개념이 나옴.)
콘텍스트에 드래그 시작됨을 알림() =>

콘텍스트에서는 드래그를 알아서 처리함.

그 이후에 마우스를 떼건 뭘 하건.. 그건 알아서.
*/

abstract class DraggableRenderer extends Renderer {
    dragStart(position : Position) { //여기서 position은 마우스의 x,y를 나타냅니다.
        const context = <DraggableRendererContext> this.context;

        const element = this.getHTMLElement();
        context.dragStart(element, position, this.code.codeData);

        this.code.stop(); //블록을 뗍니다.


    }
}

export default DraggableRenderer;