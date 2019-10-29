figma.showUI(__html__);
figma.ui.resize(600, 800);
getFramesList(figma.currentPage);
figma.ui.onmessage = msg => {
    switch (msg.type) {
        case 'get-inner-text':
            getInnerText(msg.id);
            break;
        case 'cancel':
            figma.closePlugin("plugin closed successfully!");
            break;
        case 'get-frame-list':
            getFramesList(figma.currentPage);
            break;
    }
};
function getFramesList(currentPage) {
    var elements = currentPage.children;
    var frames = {};
    elements.forEach(element => {
        if (element.type === "FRAME") {
            frames[element.id] = element.name;
        }
    });
    postToUi('update-frame-list', frames);
}
function postToUi(msgType, response) {
    var postMsg = { type: msgType, value: response };
    figma.ui.postMessage(postMsg);
}
function getInnerText(frameID) {
    const el = figma.getNodeById(frameID);
    var textNodes = el.findAll(n => n.type === "TEXT");
    var texts = [];
    // const childs = el.children;
    textNodes.forEach(el => {
        texts.push(el.characters);
    });
    postToUi("update-frame-text", texts);
}
