
import { CodeData, CodeLoader, ControllerLoaders, Area, Context, Controller, Package, Code, CodePackage, ContextLoader, Composer, ComposerLoader } from "cozy_lib";
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
    search: () => void;
    contextLoaders: { [controllerName: string]: ContextLoader; };
    composerLoaders: { [controllerName: string]: ComposerLoader; };
    onKeyUp: any;
    onKeyPress: any;

    exportCOZYData() : COZYData {
        return {
            areaData:this.area.exportAreaData(),
            positions:this.areaWithPosition.exportAreaWithPositionPositions()
        }
    }

    constructor(
        parentElement : HTMLElement,
        codeLoader : CodeLoader,
        contextLoaders:{[controllerName:string]:ContextLoader},
        composerLoaders:{[controllerName:string]:ComposerLoader},
        cozyData:COZYData,
        defaultContexts : string[] = [],
        defaultComposers : string[] = [],
        { rendererControllerName="renderer", distance=15, compilerControllerName="compiler" }:{ rendererControllerName?:string; distance?:number; compilerControllerName?:string} = {})
        {
        this.parentElement = parentElement;
        this.parentElement.innerHTML = "";
        this.parentElement.tabIndex = 0;
        this.parentElement.style.position = "relative";

        /* 리스너 */
        this.onKeyPress = (function onKeyPress(event : KeyboardEvent) {
            if(event.key === " ") {
                event.preventDefault();
                this.openTools();
            }
        }).bind(this);
        this.onKeyUp = (function onKeyUp(event : KeyboardEvent) {
            if(event.key === "Delete") {
                event.preventDefault();
                this.draggable.deleteMode = !this.draggable.deleteMode;
            }
        }).bind(this);
        
        this.parentElement.addEventListener("keypress", this.onKeyPress);
        this.parentElement.addEventListener("keydown", this.onKeyUp);

        //이런저런 것들
        this.compilerControllerName = compilerControllerName;
        this.composers = {};
        this.contextLoaders = contextLoaders;
        this.composerLoaders = composerLoaders;

        //Draggable 영역을 위해
        const draggableElement = document.createElement("div");
        draggableElement.style.width = "100%";
        draggableElement.style.height = "100%";
        draggableElement.style.zIndex = "1";

        this.draggableElement = draggableElement;
        parentElement.appendChild(draggableElement);
        this.area = new Area(codeLoader, cozyData.areaData, this.contextLoaders, this.composerLoaders, [rendererControllerName,...defaultContexts], defaultComposers);
        this.area.addController("renderer");
        this.areaWithPosition = new AreaWithPosition(this.area, cozyData.positions);
        this.draggable = new Draggable(this.draggableElement, this.areaWithPosition, rendererControllerName, distance);
        this.draggable.on("dragEnded", () => {
            this.parentElement.focus();
            this.draggable.deleteMode = false;
        });

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
        toolsElement.style.overflow = "scroll";

        this.search = function search() {
            const searchInputValue = this.searchInput.value;
            searchedDiv.innerHTML = "";
            Object.entries(codeLoader.packages).forEach(([outPackageName, codePackage] : [string, CodePackage]) => {
                Object.entries(codePackage.body).forEach(([codeName, codeClass]) => {
                    if(codePackage.id.toLowerCase().indexOf(searchInputValue.toLowerCase()) != -1 || codeName.toLowerCase().indexOf(searchInputValue.toLowerCase()) != -1) {
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
                        div.style.margin = "7px 0px 7px 0px";
                        div.style.display = "flex";
                        div.style.alignItems = "center";
                        div.style.justifyContent = "center";

                        const span = document.createElement("span");
                        span.style.marginRight = "15px";
                        span.appendChild(document.createTextNode(`${codePackage.id} - ${codeName}`));
                        div.appendChild(span);

                        const renderedCodeDiv = document.createElement("div");
                        renderedCodeDiv.style.display = "inline-block";
                        renderedCodeDiv.appendChild(renderedCode);
                        
                        div.appendChild(renderedCodeDiv);

                        renderedCodeDiv.addEventListener("mousedown", event => {
                            event.stopPropagation();
                            const relativeElementPosition = getRelativeElementPosition(renderedCode, toolsElement);
                            this.draggable.dragStart(
                            {
                                x:relativeElementPosition.x - toolsElement.scrollLeft,
                                y:relativeElementPosition.y - toolsElement.scrollTop
                            }, {
                                x:event.clientX,// - toolsElement.scrollTop,
                                y:event.clientY// - toolsElement.scrollLeft
                            }
                            , code);
                            toolsElement.style.display="none";
                        }, true)
                        searchedDiv.appendChild(div);
                    }
                });
            })
        }

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.addEventListener("input", this.search.bind(this));

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
        this.search();
        this.searchInput.focus();
    }


    setCompilerComposer(composer : Composer) {
        this.composers[this.compilerControllerName] = composer;
    }

    compile() {
        return this.area.compose(this.compilerControllerName, "compile");
    }


    stop() {
        this.parentElement.removeEventListener("keypress", this.onKeyPress);
        this.parentElement.removeEventListener("keyup", this.onKeyUp);
        this.parentElement.innerHTML = "";
    }
}

export default COZY;