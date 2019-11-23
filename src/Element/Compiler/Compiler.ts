
import { Controller } from "cozy_lib";

abstract class Compiler extends Controller {
    abstract compile() : any
    abstract getRequiresE() : any
    getChildRequires() {
        const requires = {};
        Object.values(this.getLinkingPoints()).forEach(linkingPoint => {
            if(linkingPoint.linked) {
                Object.assign(requires, (<Compiler>linkingPoint.linked).getRequires())
            }
        });
        return requires;
    }
    getRequires() {
        return Object.assign(this.getChildRequires(), this.getRequiresE());
    }
}

export default Compiler;