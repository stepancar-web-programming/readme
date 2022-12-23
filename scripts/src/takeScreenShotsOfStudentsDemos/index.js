import tr from 'transliteration';
import fs from 'node:fs';
import path from 'node:path';
import fetch from 'node-fetch';
import { Builder } from 'selenium-webdriver';

const ORG_NAME = 'stepancar-web-programming';
const SEASON = '2022-fall';
const PROJECT_TYPE = 'lab-portfolio';
const GIT_API_HOSTNAME = 'https://raw.githubusercontent.com';
const GIT_BRANCHES_API = 'https://api.github.com/repos';
const FILE_WITH_DEMO_LINK = 'package.json';
const README_NAME = 'README.md';
const API_NOT_FOUND_MESSAGE = '404: Not Found';


let studsPath; // путь до списка студентов

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
    if (argParts[0] === 'studListPath') {
        studsPath = argParts[1];
    }
  }
});

const fsp = fs.promises;
const PROJECT_DIR_NAME = path.resolve();
const projectsInfo = [];
const RESULTSROOT = path.join(PROJECT_DIR_NAME, 'results');
const PAGE_LOADED_SCRIPTS_EXECUTED_DELAY = 1000;

const STUDENT_README_FILENAME = 'README.md';

function getRepoName(season, studentProjectType, studentName) {
  const transliteratedStudentName = tr.transliterate(studentName).trim().toLowerCase();
  const finalStudentName = transliteratedStudentName.split(' ').join('-');
  return `${season}-${studentProjectType}-${finalStudentName}`;
}

async function getGitFileContent(fileLocation, readFileName, branch) {
  const url = `${fileLocation}/${branch}/${readFileName}`;
  const apiAnswer = await fetch(url).then((response) => response.text()).catch((e) => {
    console.log(`Reading ${readFileName} in ${fileLocation} on branch ${branch} caused an error: ${e}`);
    return null;
  });
  if ((apiAnswer === API_NOT_FOUND_MESSAGE) || (apiAnswer === null)) {
    console.log(`No ${readFileName} found in ${fileLocation} on branch ${branch}`);
    return null;
  }
  return apiAnswer;
}

async function getDefaultBranch(organizationName, repositoryName) {
    const url = `${GIT_BRANCHES_API}/${organizationName}/${repositoryName}`;
    const apiAnswer = await fetch(url).then((response) => response.json()).catch((e) => {
      console.log(`Can't extract ${repositoryName} info from API. Error: ${e}`);
      return 'master';
    });
    return apiAnswer['default_branch'];
  }

function getRepositoryAPI(apiHost, organizationName, repositoryName) {
  const linkToRepository = `${apiHost}/${organizationName}/${repositoryName}`;
  return {
    linkToRepository,
    repositoryName,
    readFileFromBranch: async (fileName, branch = 'master') => getGitFileContent(linkToRepository, fileName, branch),
    getDefaultBranch: async () => getDefaultBranch(organizationName, repositoryName),
  };
}

async function getHomePageForRepository(repository) {
  const repoDefaultBranch = await repository.getDefaultBranch();
  const packageJsonContent = await repository.readFileFromBranch(FILE_WITH_DEMO_LINK, repoDefaultBranch)
    .then((an) => an)
    .catch((er) => {
      console.log(`Error ${er} occured getting ${FILE_WITH_DEMO_LINK} for repo ${repository.repositoryName} on branch ${repoDefaultBranch}`);
      return null;
    });
  if (packageJsonContent === null) return null;
  let packageAsJson;
  try {
    packageAsJson = JSON.parse(packageJsonContent);
    return packageAsJson.homepage;
  } catch {
    console.log(`Incorrect format for ${FILE_WITH_DEMO_LINK} for repo ${repository.repositoryName} on branch ${repoDefaultBranch}`);
  }
  return null;
}

async function getReadMeForRepository(repository) {
  const repoDefaultBranch = await repository.getDefaultBranch();
  const readMeContent = await repository.readFileFromBranch(README_NAME, repoDefaultBranch)
    .then((an) => an)
    .catch((er) => {
      console.log(`Error ${er} occured getting ${README_NAME} for repo ${repository.repositoryName} on branch ${repoDefaultBranch}`);
      return null;
    });
  return readMeContent;
}

if ((studsPath !== null) && (studsPath !== undefined)) {
    fsp.readFile(studsPath, { encoding: 'utf-8' })
    .then((data) => {
        const studs = data.split('\n');

        studs.forEach(async (rawStudentName) => {
        const repoName = getRepoName(SEASON, PROJECT_TYPE, rawStudentName);
        console.log(`Getting repo ${repoName} information...`);
        projectsInfo.push(getRepositoryAPI(GIT_API_HOSTNAME, ORG_NAME, repoName));
        });
    })
    .catch((err) => {
        console.log(err);
    });

    const driver = await new Builder().forBrowser('chrome').build();
    try {
    // eslint-disable-next-line no-restricted-syntax
    for (const project of projectsInfo) {
        /* eslint-disable no-await-in-loop */

        const demoLink = await getHomePageForRepository(project);
        const readMeContent = await getReadMeForRepository(project);
        if ((demoLink === null) || (demoLink === undefined) || (readMeContent === null)) {
        console.log(`Finished processing ${project.repositoryName} as required files were not found`);
        // eslint-disable-next-line no-continue
        continue;
        }

        const dirpath = path.join(RESULTSROOT, project.repositoryName); // папка для каждого студента
        fs.mkdirSync(dirpath, { recursive: true });

        const dlUrl = new URL(demoLink);
        let dlPath = dlUrl.pathname === '/' ? 'index' : dlUrl.pathname;
        if (dlPath[dlPath.length - 1] === '/') {
        dlPath = dlPath.slice(0, -1);
        }
        dlPath = dlPath.split('/').map((el) => el.replace(/[/\\?%*:|"<>]/g, '-')).join('/');
        // https://site.com/a/b/c.html сохранится, как /a/b/c.html
        const fileParentDirs = dlPath.split('/');
        fileParentDirs.pop();
        if (fileParentDirs.length > 0) {
        fs.mkdir(path.join(dirpath, ...fileParentDirs), { recursive: true }, () => {});
        }

        fs.writeFileSync(path.join(dirpath, STUDENT_README_FILENAME), readMeContent);

        await driver.get(demoLink);
        await driver.manage().window().setRect({ height: HEIGHT, width: WIDTH });
        const screenShotFileName = `${dlPath}${WIDTH}x${HEIGHT}`;
        await new Promise((r) => { setTimeout(r, PAGE_LOADED_SCRIPTS_EXECUTED_DELAY); });
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
}
else {
    console.log('No students list file was provided');
}
