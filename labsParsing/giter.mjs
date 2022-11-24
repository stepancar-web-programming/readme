import tr from 'transliteration';
import fs from 'node:fs';
import path from 'node:path';
import fetch from 'node-fetch';
import { Builder } from 'selenium-webdriver';

const FOLDERNAMEPREFIX = '2022-fall-lab-portfolio-';
const BRANCH = 'dev';

const STUDENTS_LIST_FILE_NAME = 'studs.txt';
let HEIGHT = 1080;
let WIDTH = 1920;

process.argv.forEach((val) => {
  const argParts = val.split('=');
  if (argParts.length === 2) {
    if (argParts[0] === 'width') {
      WIDTH = parseInt(argParts[1], 10);
    }
    if (argParts[0] === 'height') {
      HEIGHT = parseInt(argParts[1], 10);
    }
  }
});

const fsp = fs.promises;
const PROJECT_DIR_NAME = path.resolve();
const studsPath = path.join(PROJECT_DIR_NAME, STUDENTS_LIST_FILE_NAME); // путь до списка студентов
const projectsNames = [];
const RESULTSROOT = path.join(PROJECT_DIR_NAME, 'results');

const STUDENT_DEMO_TIMEOUT = 2000;
const GITHUB_API_ERROR_MSG = '404: Not Found';

const STUDENT_README_FILENAME = 'README.md';

async function getReadmeContent(name) {
  const url = `https://raw.githubusercontent.com/stepancar-web-programming/2022-fall-lab-portfolio-${name}/dev/README.md`;
  return fetch(url).then((response) => response.text()).catch((e) => {
    console.log(`Branch ${BRANCH} does not contain README for student ${name}. Error: ${e}`);
  });
}

function extractLink(text) {
  const urlRegex = /(https?:\/\/[^)">\s]+)/g;
  text.replace(/(\r\n|\n|\r)/gm, '');
  return text.match(urlRegex)[0];
}

fsp.readFile(studsPath, { encoding: 'utf-8' })
  .then((data) => {
    const studs = data.split('\n');

    studs.forEach((rawStudentName) => {
      const trname = tr.transliterate(rawStudentName).trim().toLowerCase();
      const finalname = trname.split(' ').join('-');
      projectsNames.push(finalname); // имя владельца
    });
  })
  .catch((err) => { console.log(err); });

const driver = await new Builder().forBrowser('chrome').build();
try {
  // eslint-disable-next-line no-restricted-syntax
  for (const name of projectsNames) {
    /* eslint-disable no-await-in-loop */
    const dirpath = path.join(RESULTSROOT, FOLDERNAMEPREFIX + name); // папка для каждого студента
    fs.mkdirSync(dirpath, { recursive: true });

    const readmeText = await getReadmeContent(name);
    if (readmeText === GITHUB_API_ERROR_MSG) {
      console.log(`Branch ${BRANCH} does not contain README for student ${name}.`);
      // eslint-disable-next-line no-continue
      continue;
    }

    let demoLink;
    try {
      demoLink = extractLink(readmeText);
      console.log(`Extracted ${demoLink} for ${name}`);
    } catch {
      // eslint-disable-next-line no-continue
      continue;
    }

    const dlUrl = new URL(demoLink);
    let dlPath = dlUrl.pathname === '/' ? 'index' : dlUrl.pathname;
    if (dlPath[dlPath.length - 1] === '/') {
      dlPath = dlPath.slice(0, -1);
    }
    dlPath = dlPath.split('/').map((el) => el.replace(/[/\\?%*:|"<>]/g, '-')).join('/');
    const fileParentDirs = dlPath.split('/');
    fileParentDirs.pop();
    if (fileParentDirs.length > 0) {
      fs.mkdir(path.join(dirpath, ...fileParentDirs), { recursive: true }, () => {});
    }

    fs.writeFileSync(path.join(dirpath, STUDENT_README_FILENAME), readmeText);

    await driver.get(demoLink);
    await driver.manage().window().setRect({ height: HEIGHT, width: WIDTH });
    await new Promise((r) => {
      setTimeout(r, STUDENT_DEMO_TIMEOUT);
    });
    const screenShotFileName = `${dlPath}${WIDTH}x${HEIGHT}`;
    await driver.takeScreenshot().then((pic) => {
      fs.writeFile(path.join(dirpath, `${screenShotFileName}.png`), pic, 'base64', (screenShotError) => {
        if (screenShotError) {
          console.log(screenShotError);
        }
      });
    });
    /* eslint-enable no-await-in-loop */
  }
} finally {
  await driver.quit();
}
