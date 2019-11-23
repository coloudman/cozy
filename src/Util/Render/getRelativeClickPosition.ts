export default function getRelativeClickPosition(e : MouseEvent) {
    // e = Mouse click event.
    var rect = (<HTMLElement>e.target).getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.

    return {x, y};
};