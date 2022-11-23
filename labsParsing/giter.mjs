import tr from 'transliteration';
import fs from 'node:fs';
import path from 'node:path';
import fetch from 'node-fetch';
import {Builder, By} from 'selenium-webdriver';

const REPONAMEPREFIX = "https://github.com/stepancar-web-programming/2022-fall-lab-portfolio-";
const FOLDERNAMEPREFIX = "2022-fall-lab-portfolio-";
const BRANCH = "dev";

const STUDENTS_LIST_FILE_NAME = "studs.txt"
var HEIGHT = 1080;
var WIDTH = 1920;

process.argv.forEach(function (val, index, array) {
  const argParts = val.split("=");
  if(argParts.length == 2) {
    if(argParts[0] == "width") WIDTH = parseInt(argParts[1], 10);
    if(argParts[0] == "height") WIDTH = parseInt(argParts[1], 10);
  }
});

const fsp = fs.promises;
const __dirname = path.resolve();
const studsPath = path.join(__dirname, STUDENTS_LIST_FILE_NAME);  // собираю путь до файла со списком студентов
var links = [];
const RESULTSROOT = path.join(__dirname, "results");

const STUDENT_DEMO_TIMEOUT = 2000;
const GITHUB_API_ERROR_MSG = "404: Not Found";

const STUDENT_README_FILENAME = "README.md"

function getRepoLink(repositoryName) {
  return REPONAMEPREFIX + repositoryName;
}

async function getReadmeContent(name) {
  const url = `https://raw.githubusercontent.com/stepancar-web-programming/2022-fall-lab-portfolio-${name}/dev/README.md`;
  return fetch(url).then(function(response) {
    return response.text();
  }).catch(function(e) {
    console.log(`Branch ${BRANCH} does not contain README for student ${name}`);
  });
}

function extractLink(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  text.replace(/(\r\n|\n|\r)/gm, "");
  return text.match(urlRegex)[0];
}

fsp.readFile(studsPath, { encoding: 'utf-8' })
  .then((data) => {
      const studs = data.split('\n');
      
      for(const name of studs) {
        var trname = tr.transliterate(name).trim().toLowerCase();
        var finalname = trname.split(' ').join('-');
        links.push([getRepoLink(finalname), finalname]);  // заполняю список парами из ссылки  на репозиторий и имени владельца
      }
    }
  )
  .catch((err) => { console.log(err); });

(async function walkRepos() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    for(const link_and_name of links) {
      const link = link_and_name[0];
      const name = link_and_name[1];
      const dirpath = path.join(RESULTSROOT, FOLDERNAMEPREFIX + name);  // папка для каждого студента
      fs.mkdirSync(dirpath, { recursive: true });

      const readmeText = await getReadmeContent(name);
      if(readmeText === GITHUB_API_ERROR_MSG) continue;

      let demoLink;
      try {
        demoLink = extractLink(readmeText);
      }
      catch {
        continue;
      }

      const dlUrl = new URL(demoLink);
      var dlPath = dlUrl.pathname == "/" ? "index" : dlUrl.pathname;
      if(dlPath[dlPath.length - 1] == "/") dlPath = dlPath.slice(0, -1);
      const fileParentDirs = dlPath.split("/");
      fileParentDirs.pop();
      if(fileParentDirs.length > 0) {
        fs.mkdirSync(path.join(dirpath, ...fileParentDirs), { recursive: true });  // переношу пути из pathname в файловую систему
      }

      console.log(extractLink(readmeText));
      fs.writeFileSync(path.join(dirpath, STUDENT_README_FILENAME), readmeText);

      await driver.get(demoLink);
      await driver.manage().window().setRect({"height": HEIGHT, "width": WIDTH});
      await new Promise (r => setTimeout(r, STUDENT_DEMO_TIMEOUT));
      driver.takeScreenshot().then(function(pic){
        fs.writeFile(path.join(dirpath, dlPath + WIDTH + "x" + HEIGHT + ".png"), pic, 'base64', function(pic_err) {
             if(pic_err) console.log(pic_err);
        });
      });
    }
  } finally {
    await driver.quit();
  }
})();

