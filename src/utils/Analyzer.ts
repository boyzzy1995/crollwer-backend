import cherrio = require('cheerio');
import fs = require('fs');

interface Course {
  title: string;
  count: number;
}

interface CourseResult {
  timestamp: number;
  data: Course[];
}

interface Content {
  [porpName: number]: Course[];
}

export default class Analyzer {
  private static instance: Analyzer;
  static getInstance() {
    if (!Analyzer.instance) {
      return new Analyzer();
    }
    return Analyzer.instance;
  }
  anaylze(html: string, filePath: string) {
    const result = this.getCourseInfo(html);
    const fileContent = this.generateJsonData(result, filePath);
    return fileContent;
  }
  private getCourseInfo(html: string) {
    const $ = cherrio.load(html);
    const courseItems = $('.course-item');
    const courseInfos: Course[] = [];
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc');
      const title = descs.eq(0).text();
      const count = parseInt(descs.eq(1).text().split('：')[1]);
      courseInfos.push({ title, count });
    });
    return {
      timestamp: new Date().getTime(),
      data: courseInfos,
    };
  }
  private generateJsonData(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseInfo.timestamp] = courseInfo.data;
    return fileContent;
  }
  private constructor() {}
}
