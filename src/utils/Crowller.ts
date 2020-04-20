import superagent = require('superagent');
import path = require('path');
import fs = require('fs');

interface Anaylzer {
  anaylze: (html: string, filePath: string) => {};
}

export default class Crowller {
  private rawHtml = '';
  private filePath = path.resolve(__dirname, '../../data/course.json');
  constructor(private url: string, private analyzer: Anaylzer) {
    this.initSpiderProcess();
  }
  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.anaylze(html, this.filePath);
    this.writeFile(JSON.stringify(fileContent));
  }
  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }
  private writeFile(fileContent: string) {
    fs.writeFileSync(this.filePath, fileContent);
  }
}
