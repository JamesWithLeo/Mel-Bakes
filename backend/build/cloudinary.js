"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetInfo = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinaryConfigure = () => {
    cloudinary_1.v2.config({
        cloud_name: "dupzzryrz",
        api_key: "267777685656854",
        api_secret: "Veky4CcT0jwKbpDLF2APg9EATRg",
    });
};
exports.default = cloudinaryConfigure;
const getAssetInfo = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    // Return colors in the response
    const options = {
        colors: true,
    };
    try {
        // Get details about the asset
        const result = yield cloudinary_1.v2.api.resource(publicId, options);
        return result.url;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAssetInfo = getAssetInfo;
