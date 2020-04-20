"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cherrio = require("cheerio");
var fs = require("fs");
var Analyzer = /** @class */ (function () {
    function Analyzer() {
    }
    Analyzer.getInstance = function () {
        if (!Analyzer.instance) {
            return new Analyzer();
        }
        return Analyzer.instance;
    };
    Analyzer.prototype.anaylze = function (html, filePath) {
        var result = this.getCourseInfo(html);
        var fileContent = this.generateJsonData(result, filePath);
        return fileContent;
    };
    Analyzer.prototype.getCourseInfo = function (html) {
        var $ = cherrio.load(html);
        var courseItems = $('.course-item');
        var courseInfos = [];
        courseItems.map(function (index, element) {
            var descs = $(element).find('.course-desc');
            var title = descs.eq(0).text();
            var count = parseInt(descs.eq(1).text().split('：')[1]);
            courseInfos.push({ title: title, count: count });
        });
        return {
            timestamp: new Date().getTime(),
            data: courseInfos,
        };
    };
    Analyzer.prototype.generateJsonData = function (courseInfo, filePath) {
        var fileContent = {};
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseInfo.timestamp] = courseInfo.data;
        return fileContent;
    };
    return Analyzer;
}());
exports.default = Analyzer;
