import tr from 'transliteration';
import fs from 'node:fs';
import path from 'node:path';
import {Builder, By} from 'selenium-webdriver';

const REPONAMEPREFIX = "https://github.com/stepancar-web-programming/2022-fall-lab-portfolio-";
const FOLDERNAMEPREFIX = "2022-fall-lab-portfolio-";
const BRANCHES = ["main", "dev", "master"];

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

const GITHUB_TIMEOUT = 500;
const STUDENT_DEMO_TIMEOUT = 2000;

const STUDENT_README_FILENAME = "README.md"

function getRepoLink(repositoryName) {
  return REPONAMEPREFIX + repositoryName;
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
      
      var readmeContainer = null;
      var demoLink = null;

      for(const branch of BRANCHES) {
        try {
          await driver.get(link + "/tree/" + branch);
          await new Promise (r => setTimeout(r, GITHUB_TIMEOUT));
          readmeContainer = await driver.findElement(By.id('readme'));

          const possibleLinks = await readmeContainer.findElement(By.css('article')).findElements(By.css('a'));
          for(const pl of possibleLinks) {
            if(!(await pl.getAttribute("href")).includes("stepancar")) {
              demoLink = pl;
              break;
            }
          }
          demoLink = await demoLink.getAttribute("href");
          break;
        }
        catch {
          readmeContainer = null;
        }
      }

      if(!readmeContainer) {
        console.log("No README found for " + name);
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

      const readmeText = await readmeContainer.findElement(By.css('article')).getText();
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

