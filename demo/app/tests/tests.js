var headsetDetection = require("nativescript-headset-detection");

describe("isConnected", function() {
    it("exists", function() {
        expect(headsetDetection.isConnected).toBeDefined();
    });
});