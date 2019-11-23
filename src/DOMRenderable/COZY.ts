
import { CodeData, CodeLoader, ControllerLoaders, Area, Context, Controller, Package, Code, CodePackage } from "cozy_lib";
import COZYData from "../struct/COZYData";
import Compiler from "../Element/Compiler/Compiler";
import AreaWithPosition from "../AreaExtension/AreaWithPosition";
import Contexts from "cozy_lib/dist/structClass/Contexts";
import Draggable from "./Draggable";
import Renderer from "../Element/Renderer/Renderer";
import getRelativeElementPosition from "../Util/Render/getRelativeElementPosition";
import Composers from "cozy_lib/dist/structClass/Composers";

/*
COZY는..

렌더, 컴파일
을 할 수 있습니다.
*/

type Composer = (controllers : Controller[], context : Context) => any;

class COZY {
    
    cozyData: COZYData;
    parentElement: HTMLElement;
    areaWithPosition: AreaWithPosition;
    area: Area;
    draggableElement: HTMLDivElement;
    draggable: Draggable;
    toolsElement: HTMLDivElement;
    searchInput: HTMLInputElement;
    compilerControllerName: string;
    composers: Composers;

    constructor(parentElement : HTMLElement, codeLoader : CodeLoader, cozyData:COZYData, { rendererControllerName="renderer", distance=15, compilerControllerName="compiler" }:{ rendererControllerName?:string; distance?:number; compilerControllerName?:string} = {}) {
        this.parentElement = parentElement;
        this.parentElement.tabIndex = 0;
        this.parentElement.style.position = "relative";

        this.parentElement.addEventListener("keypress", event => {
            if(event.key === " ") {
                this.openTools();
            }
        });

        //이런저런 것들
        this.compilerControllerName = compilerControllerName;
        this.composers = {};

        //Draggable 영역을 위해
        const draggableElement = document.createElement("div");
        draggableElement.style.width = "100%";
        draggableElement.style.height = "100%";
        draggableElement.style.zIndex = "1";

        this.draggableElement = draggableElement;
        parentElement.appendChild(draggableElement);

        this.area = new Area(codeLoader, cozyData.codeDatas, cozyData.contexts)
        this.area.setComposers(this.composers);
        this.areaWithPosition = new AreaWithPosition(this.area, cozyData.positions);
        this.draggable = new Draggable(this.draggableElement, this.areaWithPosition, rendererControllerName, distance);


        //툴 열기 영역을 위해
        const toolsElement = document.createElement("div");
        toolsElement.style.position = "absolute";
        toolsElement.style.left = "0";
        toolsElement.style.top = "0";
        toolsElement.style.width = "100%";
        toolsElement.style.height = "100%";
        toolsElement.style.zIndex = "2";

        toolsElement.style.backgroundColor = "rgba(0,0,0,0.5)";
        toolsElement.style.display = "none";

        toolsElement.style.textAlign = "center";

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.addEventListener("keypress", (event) => {
            const searchInputValue = searchInput.value + event.key;
            searchedDiv.innerHTML = "";
            Object.entries(codeLoader.packages).forEach(([outPackageName, codePackage] : [string, CodePackage]) => {
                Object.entries(codePackage.body).forEach(([codeName, codeClass]) => {
                    //코드 만들어 보기
                    const codeData = {
                        iD:{
                            packageId:codePackage.id,
                            packageVersion:codePackage.version,
                            id:codeName
                        },
                        data:{},
                        linkingPointsData:{},
                        controllerDatas:{}
                    };
                    
                    const code = this.area.makeCode(codeData);
                    const renderedCode = (<Renderer> code.addController(rendererControllerName)).render();


                    const div = document.createElement("div");
                    div.style.position = "relative";
                    div.appendChild(document.createTextNode(searchInputValue + " ... " + codeName));

                    const renderedCodeDiv = document.createElement("div");
                    renderedCodeDiv.style.display = "inline-block";
                    renderedCodeDiv.appendChild(renderedCode);
                    
                    div.appendChild(renderedCodeDiv);

                    renderedCodeDiv.addEventListener("mousedown", event => {
                        event.stopPropagation();
                        this.draggable.dragStart(getRelativeElementPosition(renderedCode, toolsElement), {
                            x:event.clientX,
                            y:event.clientY
                        }, code);
                        toolsElement.style.display="none";
                    }, true)
                    searchedDiv.appendChild(div);
                });
            })
        });
        this.searchInput = searchInput;
        toolsElement.appendChild(searchInput);

        const searchedDiv = document.createElement("div");
        toolsElement.appendChild(searchedDiv);


        this.toolsElement = toolsElement;
        parentElement.appendChild(toolsElement);
    }

    openTools() {
        this.toolsElement.style.display = "block";
        this.searchInput.value = "";
        this.searchInput.dispatchEvent(new KeyboardEvent("keypress"));
        this.searchInput.focus();
    }


    setCompilerComposer(composer : Composer) {
        this.composers[this.compilerControllerName] = composer;
    }
    compile() {
        console.log(this.area.contexts);
        return this.area.compose(this.compilerControllerName);
    }
}

export default COZY;