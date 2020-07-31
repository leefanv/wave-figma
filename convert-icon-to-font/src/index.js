var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getSelectedNodes, exportGlyphs, hasDuplicatedNames } from './utils/fetch';
import { convertGlyphToData, getFontConfig } from "./utils/convert";
function convertIconToFont(nodes, fontName = 'WaveIcon') {
    return __awaiter(this, void 0, void 0, function* () {
        const glyphs = yield exportGlyphs(nodes);
        const glyphData = convertGlyphToData(glyphs, nodes);
        const fontConfig = getFontConfig(glyphData, fontName);
    });
}
function onSave(fontName = 'WaveIcon') {
    return __awaiter(this, void 0, void 0, function* () {
        const nodes = getSelectedNodes();
        if (hasDuplicatedNames(nodes)) {
            figma.ui.postMessage({
                type: 'err: duplicated-names'
            });
            figma.notify('⚠️ ERR: There are duplicated names in your selected nodes');
            return;
        }
        // const [fontBuffer, fontConfig] = await convertIconToFont(nodes, fontName);
    });
}
function onMessage({ type, data }) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (type) {
            case 'req: save':
                yield onSave();
                break;
            case 'req: done':
                break;
            default:
                figma.notify('⚠️ ERR: Unknown message type');
        }
    });
}
function init() {
    figma.showUI(__html__);
    figma.ui.onmessage = onMessage;
}
init();
