"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = void 0;
var getUserId = function (event) {
    // 開発側で自明のため、アサーションしている。
    var cognitoIdentity = event.identity;
    var userId = null;
    if (cognitoIdentity) {
        userId = cognitoIdentity.claims["cognito:username"];
    }
    if (!userId) {
        throw new Error("No userName Found");
    }
    return userId;
};
exports.getUserId = getUserId;
