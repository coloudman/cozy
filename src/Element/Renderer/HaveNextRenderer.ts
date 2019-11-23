import Renderer from "./Renderer";
import { Code, Data, Context, ControllerLinkingPointsManager } from "cozy_lib";
import DraggableRendererContext from "../../Context/DraggableRendererContext";
import RendererWithChildUtil from "./RendererWithChildUtil";

/*
next 를 가지는 Code의 Renderer 도우미 클래스 입니다.
console.log("a"); 처럼 뒤에 추가적 코드가 더 올 수 있는 블록을 처리해 줍니다.

RendererWithChildUtil을 사용합니다.
*/

abstract class HaveNextRenderer extends RendererWithChildUtil {
    nextElement : HTMLElement;
    make(mainElement : HTMLElement) {
        const parentDiv = document.createElement("div");

        const mainElementDiv = document.createElement("div");
        mainElementDiv.appendChild(mainElement);
        parentDiv.appendChild(mainElementDiv);

        const voidNextElementDiv = document.createElement("div");
        //voidNextElementDiv.style.display = "inline-block";
        voidNextElementDiv.style.cssFloat = "left";

        const nextElementDiv = document.createElement("div");
        nextElementDiv.style.cssFloat = "left";
        this.nextElement = this.addLinkElement("next", voidNextElementDiv);
        this.nextElement.style.cssFloat = "left";

        nextElementDiv.appendChild(this.nextElement);
        parentDiv.appendChild(nextElementDiv);

        return parentDiv;
    }
}

export default HaveNextRenderer;