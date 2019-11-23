import { Code, CodeLoader, ControllerLoaders, CodeData } from "cozy_lib";
import Contexts from "cozy_lib/dist/structClass/Contexts";

class HaveNextCode extends Code {
    constructor(codeLoader : CodeLoader, controllerLoaders : ControllerLoaders, codeData : CodeData, contexts : Contexts) {
        super(codeLoader, controllerLoaders, codeData, contexts);
        this.addDefaultLinkingPoints(["next"]);
    }
}

export default HaveNextCode;