!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(1);class s extends i.Controller{constructor(e,t,n,i){super(e,t,n,i),this.on("stop",()=>{Object.values(this.getLinkingPoints()).forEach(e=>{e.linked&&e.linked.stop()})})}}t.default=s},function(e,t){!function(e,t){for(var n in t)e[n]=t[n]}(t,function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){var i;
/*!
 * EventEmitter v5.2.8 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */!function(t){"use strict";function s(){}var r=s.prototype,o=t.EventEmitter;function u(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function a(e){return function(){return this[e].apply(this,arguments)}}r.getListeners=function(e){var t,n,i=this._getEvents();if(e instanceof RegExp)for(n in t={},i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n]);else t=i[e]||(i[e]=[]);return t},r.flattenListeners=function(e){var t,n=[];for(t=0;t<e.length;t+=1)n.push(e[t].listener);return n},r.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&((t={})[e]=n),t||n},r.addListener=function(e,t){if(!function e(t){return"function"==typeof t||t instanceof RegExp||!(!t||"object"!=typeof t)&&e(t.listener)}(t))throw new TypeError("listener must be a function");var n,i=this.getListenersAsObject(e),s="object"==typeof t;for(n in i)i.hasOwnProperty(n)&&-1===u(i[n],t)&&i[n].push(s?t:{listener:t,once:!1});return this},r.on=a("addListener"),r.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},r.once=a("addOnceListener"),r.defineEvent=function(e){return this.getListeners(e),this},r.defineEvents=function(e){for(var t=0;t<e.length;t+=1)this.defineEvent(e[t]);return this},r.removeListener=function(e,t){var n,i,s=this.getListenersAsObject(e);for(i in s)s.hasOwnProperty(i)&&-1!==(n=u(s[i],t))&&s[i].splice(n,1);return this},r.off=a("removeListener"),r.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},r.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},r.manipulateListeners=function(e,t,n){var i,s,r=e?this.removeListener:this.addListener,o=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)r.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(s=t[i])&&("function"==typeof s?r.call(this,i,s):o.call(this,i,s));return this},r.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if(e instanceof RegExp)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},r.removeAllListeners=a("removeEvent"),r.emitEvent=function(e,t){var n,i,s,r,o=this.getListenersAsObject(e);for(r in o)if(o.hasOwnProperty(r))for(n=o[r].slice(0),s=0;s<n.length;s++)!0===(i=n[s]).once&&this.removeListener(e,i.listener),i.listener.apply(this,t||[])===this._getOnceReturnValue()&&this.removeListener(e,i.listener);return this},r.trigger=a("emitEvent"),r.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},r.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},r._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},r._getEvents=function(){return this._events||(this._events={})},s.noConflict=function(){return t.EventEmitter=o,s},void 0===(i=function(){return s}.call(t,n,t,e))||(e.exports=i)}("undefined"!=typeof window?window:this||{})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e){this.packages=e}}},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(3)),r=i(n(0));class o extends r.default{constructor(){super(),this.linkingPoints={}}addLinkingPoint(e){const t=this.linkingPoints[e]=new s.default;return this.emit("added",e),t}removeLinkingPoint(e){delete this.linkingPoints[e],this.emit("removed",e)}link(e,t){this.linkingPoints[e].link(t)}unlink(e){this.linkingPoints[e].unlink()}getLinkingPoint(e){return this.linkingPoints[e]}getLinked(e){return this.linkingPoints[e].linked}}t.default=o},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(0));class r extends s.default{constructor(e){super(),this.linked=e}link(e){this.linked=e,this.emit("linked",e)}unlink(){this.linked=void 0,this.emit("unlinked",this.linked)}}t.default=r},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(5));t.Code=s.default;const r=i(n(6));t.Controller=r.default;const o=i(n(1));t.Loader=o.default;const u=i(n(7));t.CodeLoader=u.default;const a=i(n(8));t.ControllerLoader=a.default;const l=i(n(3));t.LinkingPoint=l.default;const c=i(n(9));t.Context=c.default;const d=i(n(10));t.Area=d.default;const f=i(n(2));t.LinkingPointsManager=f.default},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(2));t.default=class{constructor(e,t,n,i){this.codeLoader=e,this.controllerLoaders=t,this.codeData=n,this.contexts=i,this.controllers={},this.codeLinkingPointsManager=new s.default,this.controllerLinkingPointsManagers={},this.data=n.data,Object.entries(n.linkingPointsData).forEach(([e,n])=>{this.codeLinkingPointsManager.addLinkingPoint(e),this.codeLinkingPointsManager.link(e,this.codeLoader.load(t,n,i))}),this.init()}runOnExistLinkingPoints(e){Object.entries(this.codeLinkingPointsManager.linkingPoints).forEach(([t,n])=>{n.linked&&e(t,n.linked)})}addController(e){const t=this.controllerLinkingPointsManagers[e]=new s.default;Object.entries(this.codeLinkingPointsManager.linkingPoints).forEach(([n,i])=>{t.addLinkingPoint(n),i.linked&&t.link(n,i.linked.addController(e))});const n=this.codeData.controllerDatas[e]||(this.codeData.controllerDatas[e]={}),i=this.controllerLoaders[e].load(this,this.codeData.iD,n,this.contexts[e],t);return this.controllers[e]=i,i}removeController(e,t=!1){this.runOnExistLinkingPoints((t,n)=>{n.removeController(e)}),delete this.controllerLinkingPointsManagers[e],this.controllers[e].stop(),delete this.controllers[e],t&&delete this.codeData.controllerDatas[e]}addLinkingPoint(e){const t=this.codeLinkingPointsManager.addLinkingPoint(e);return Object.values(this.controllerLinkingPointsManagers).forEach(t=>{t.addLinkingPoint(e)}),t}removeLinkingPoint(e){this.codeLinkingPointsManager.removeLinkingPoint(e),Object.values(this.controllerLinkingPointsManagers).forEach(t=>{t.removeLinkingPoint(e)})}addDefaultLinkingPoints(e){e.forEach(e=>{this.codeLinkingPointsManager.linkingPoints[e]||this.addLinkingPoint(e)})}link(e,t){const n=this.codeLoader.load(this.controllerLoaders,t,this.contexts);this.codeLinkingPointsManager.link(e,n),Object.entries(this.controllerLinkingPointsManagers).forEach(([t,i])=>{i.link(e,n.addController(t))}),this.codeData.linkingPointsData[e]=t}unlink(e){this.codeLinkingPointsManager.unlink(e),Object.values(this.controllerLinkingPointsManagers).forEach(t=>{t.unlink(e)}),delete this.codeData.linkingPointsData[e]}getLinkingPoints(){return this.codeLinkingPointsManager.linkingPoints}getLinkingPoint(e){return this.codeLinkingPointsManager.getLinkingPoint(e)}getLinked(e){return this.codeLinkingPointsManager.getLinked(e)}}},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(0));class r extends s.default{constructor(e,t,n,i){super(),this.code=e,this.linkingPointsManager=i,this.data=t,this.context=n,this.emit("init")}getLinkingPoints(){return this.linkingPointsManager.linkingPoints}getLinkingPoint(e){return this.linkingPointsManager.getLinkingPoint(e)}getLinked(e){return this.linkingPointsManager.getLinked(e)}stop(){this.emit("stop")}}t.default=r},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(1));class r extends s.default{load(e,t,n){return new(0,Object.values(this.packages).find(e=>t.iD.packageId===e.id&&t.iD.packageVersion===e.version).body[t.iD.id])(this,e,t,n)}}t.default=r},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(1));class r extends s.default{load(e,t,n,i,s){return new(0,Object.values(this.packages).find(e=>t.packageId===e.for_id&&t.packageVersion===e.for_version).body[t.id])(e,n,i,s)}}t.default=r},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(0));class r extends s.default{constructor(e){super(),this.data=e}}t.default=r},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(0));class r extends s.default{constructor(e,t,n,i){super(),this.codeLoader=e,this.controllerLoaders=t,this.contexts=i,this.codes=[],this.controllerNames=[],this.codeDatas=n,n.forEach(e=>{this.addCode(e)})}addCode(e){const t=this.codeLoader.load(this.controllerLoaders,e,this.contexts);return this.controllerNames.forEach(e=>{t.addController(e)}),this.codes.push(t),this.codeDatas.push(e),this.emit("codeAdded",t),t}removeCode(e){const t=this.codes.indexOf(e);this.codes.splice(t,1),this.codeDatas.splice(t,1),this.emit("codeRemoved",e)}getController(e){const t=[];return this.codes.forEach(n=>{t.push(n.controllers[e])}),t}addController(e){this.codes.forEach(t=>{t.addController(e)}),this.controllerNames.push(e)}}t.default=r}]))},function(e,t,n){var i;
/*!
 * EventEmitter v5.2.8 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */!function(t){"use strict";function s(){}var r=s.prototype,o=t.EventEmitter;function u(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function a(e){return function(){return this[e].apply(this,arguments)}}r.getListeners=function(e){var t,n,i=this._getEvents();if(e instanceof RegExp)for(n in t={},i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n]);else t=i[e]||(i[e]=[]);return t},r.flattenListeners=function(e){var t,n=[];for(t=0;t<e.length;t+=1)n.push(e[t].listener);return n},r.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&((t={})[e]=n),t||n},r.addListener=function(e,t){if(!function e(t){return"function"==typeof t||t instanceof RegExp||!(!t||"object"!=typeof t)&&e(t.listener)}(t))throw new TypeError("listener must be a function");var n,i=this.getListenersAsObject(e),s="object"==typeof t;for(n in i)i.hasOwnProperty(n)&&-1===u(i[n],t)&&i[n].push(s?t:{listener:t,once:!1});return this},r.on=a("addListener"),r.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},r.once=a("addOnceListener"),r.defineEvent=function(e){return this.getListeners(e),this},r.defineEvents=function(e){for(var t=0;t<e.length;t+=1)this.defineEvent(e[t]);return this},r.removeListener=function(e,t){var n,i,s=this.getListenersAsObject(e);for(i in s)s.hasOwnProperty(i)&&-1!==(n=u(s[i],t))&&s[i].splice(n,1);return this},r.off=a("removeListener"),r.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},r.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},r.manipulateListeners=function(e,t,n){var i,s,r=e?this.removeListener:this.addListener,o=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)r.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(s=t[i])&&("function"==typeof s?r.call(this,i,s):o.call(this,i,s));return this},r.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if(e instanceof RegExp)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},r.removeAllListeners=a("removeEvent"),r.emitEvent=function(e,t){var n,i,s,r,o=this.getListenersAsObject(e);for(r in o)if(o.hasOwnProperty(r))for(n=o[r].slice(0),s=0;s<n.length;s++)!0===(i=n[s]).once&&this.removeListener(e,i.listener),i.listener.apply(this,t||[])===this._getOnceReturnValue()&&this.removeListener(e,i.listener);return this},r.trigger=a("emitEvent"),r.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},r.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},r._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},r._getEvents=function(){return this._events||(this._events={})},s.noConflict=function(){return t.EventEmitter=o,s},void 0===(i=function(){return s}.call(t,n,t,e))||(e.exports=i)}("undefined"!=typeof window?window:this||{})},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(0));class r extends s.default{constructor(e,t,n,i){super(e,t,n,i),this.linkListeners={},this.on("stop",()=>{Object.keys(this.linkListeners).forEach(e=>{this.removeLinkElement(e)})})}addLinkElement(e){const t=document.createElement("div");t.style.display="inline-block",this.getLinked(e)?t.appendChild(this.getLinked(e).render()):t.appendChild(this.voidLinkingPointElement(e));const n=this.linkListeners[e]=[()=>{t.removeChild(t.children[0]),t.appendChild(this.getLinked(e).render())},()=>{t.removeChild(t.children[0]),t.appendChild(this.voidLinkingPointElement(e))}];return this.getLinkingPoint(e).on("linked",n[0]).on("unlinked",n[1]),t}removeLinkElement(e){this.code.getLinkingPoint(e).removeListener("link",this.linkListeners[e][0]).removeListener("unlink",this.linkListeners[e][1])}}t.default=r},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(5));t.COZY=s.default;const r=i(n(0));t.Renderer=r.default;const o=i(n(6));t.Compiler=o.default;const u=i(n(7));t.AreaWithPosition=u.default;const a=i(n(9));t.AreaWithPositionRenderer=a.default;const l=i(n(10));t.SquareBlock=l.default;const c=i(n(3));t.RendererWithChildUtil=c.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(1);class s extends i.Controller{}t.default=s},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(8)),r=i(n(2));class o extends r.default{constructor(e,t){super(),this.area=e,this.positions=t,this.positionedCodes=this.area.codes.map((e,t)=>new s.default(e,this.positions[t]))}addPositionedCode(e,t){this.positions.push(t);const n=this.area.addCode(e),i=new s.default(n,t);return this.positionedCodes.push(i),this.emit("positionedCodeAdded",i),i}removePositionedCode(e){const t=this.positionedCodes.indexOf(e);this.positions.splice(t,1),this.area.removeCode(e.code),this.positionedCodes.splice(t,1),this.emit("positionedCodeRemoved",e)}}t.default=o},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(2));class r extends s.default{constructor(e,t){super(),this.code=e,this.position=t}changePosition(e,t){this.position.x=e,this.position.y=t,this.emit("positionChanged",this.position)}}t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t){this.parentElement=e,this.areaWithPosition=t,t.positionedCodes.forEach(e=>{this.parentElement.appendChild(this.createDiv(e))}),t.on("positionedCodeAdded",e=>{this.parentElement.appendChild(this.createDiv(e))}),t.on("positionedCodeRemoved",(e,t)=>{this.parentElement.children[t].outerHTML=""})}createDiv(e){const t=document.createElement("div");t.style.display="inline-block";const n=e.code.controllers.renderer;function i(e){t.style.position="absolute",t.style.left=e.x+"px",t.style.top=e.y+"px"}return t.appendChild(n.render()),i(e.position),e.on("positionChanged",i),t}}},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(3));class r extends s.default{constructor(e,t,n,i){super(e,t,n,i)}}t.default=r}]));