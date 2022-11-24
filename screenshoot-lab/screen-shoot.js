/* eslint-disable no-throw-literal */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-useless-return */
/* eslint-disable prefer-regex-literals */
/* eslint-disable no-param-reassign */
/* eslint-disable no-loop-func */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-await */
/* eslint-disable prefer-const */
/* eslint-disable space-before-function-paren */
const swithcher = require('ai-switcher-translit');
const puppeteer = require('puppeteer');

const fetch = require('node-fetch');
const DomParser = require('dom-parser');
const { readFileSync } = require('fs');
const fs = require('fs');

const WIDTH_1 = 1920;
const HEIGHT_1 = 1080;
// const WIDTH_2 = 1024;
// const HEIGHT_2 = 900;
const LINK_REPO = 'https://github.com/stepancar-web-programming/2022-fall-lab-portfolio-';

process.setMaxListeners(0);

// read the list of students
function syncReadFile (filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split('\r\n');
  return arr;
}

const LIST_STUDENTS = syncReadFile('./listStudents.txt');

// template to convert from Russian to English name
let template = {
  ь: '',
  ы: 'y',
};

// convert name
const listStudentsConverted = [];
function toEnglishName (stud) {
  let x = swithcher.getSwitch(stud, {
    type: 'translit',
    input: template,
  }).toLowerCase().split(' ').join('-');
  listStudentsConverted.push(x);
}

LIST_STUDENTS.forEach(toEnglishName);

// create folders for each individual
function createFolder (stud) {
  try {
    if (!fs.existsSync(stud)) {
      fs.mkdirSync(stud);
    }
  } catch (err) {
    console.error(err);
  }
}

listStudentsConverted.forEach(createFolder);

async function getContentFileReadme (stud) {
  let obj = {};
  let typeReadme = ['README.md', 'readme.md', 'Readme.md', 'README.MD'];
  let branch = ['main/', 'dev/', 'master/'];
  let cntLink = 0;

  for (let i = 0; i < typeReadme.length; i += 1) {
    if (cntLink === 1) {
      break;
    } else {
      for (let j = 0; j < branch.length; j += 1) {
        if (cntLink === 1) {
          break;
        } else {
          let linkReadme = `${LINK_REPO + stud}/blob/${branch[j]}${typeReadme[i]}`;
          await fetch(linkReadme)
            .then(await function (response) {
              return response.text();
            })
            .then(await function (html) {
              let parser = new DomParser();
              let doc = parser.parseFromString(html, 'text/html');
              let linkInsideArticle = [];
              if (doc.getElementsByTagName('article')[0] !== undefined) {
                linkInsideArticle = doc.getElementsByTagName('article')[0].getElementsByTagName('a');
              }
              var reHttp = new RegExp('^(http:\\/\\/)');
              var reHttps = new RegExp('^(https:\\/\\/)');
              for (let k = 0; k < linkInsideArticle.length; k += 1) {
                let link = linkInsideArticle[k].getAttribute('href');
                if (reHttps.test(link) === true) {
                  if ((String(link).includes('facebook') === false)) {
                    if ((String(link).includes('reactjs') === false)) {
                      if ((String(link).includes('githubusercontent') === false)) {
                        // console.log(stud + ': ' + link);
                        // listLinkDemo.push({ key: stud, value: link });
                        obj = { key: stud, value: link };
                        cntLink = 1;
                        return;
                      }
                    }
                  }
                }
                if (reHttp.test(link) === true) {
                  if ((String(link).includes('facebook') === false)) {
                    if ((String(link).includes('reactjs') === false)) {
                      if ((String(link).includes('githubusercontent') === false)) {
                        // console.log(stud + ': ' + link);
                        // listLinkDemo.push({ key: stud, value: link });
                        obj = { key: stud, value: link };
                        cntLink = 1;
                        return;
                      }
                    }
                  }
                }
              }
            })
            .catch(await function (err) { console.warn('Something went wrong!', err); return; });
        }
      }
    }
  }
  if (cntLink === 0) {
    // console.log(stud + ': not found!');
    obj = { key: stud, value: undefined };
  }
  return await obj;
}

// wait for the page to load
function timeout (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getAllResult () {
  let listLinkDemo = [];
  for (let i = 0; i < listStudentsConverted.length; i += 1) {
    let obj = await getContentFileReadme(listStudentsConverted[i]);
    listLinkDemo.push(obj);
  }

  return await listLinkDemo;
}

async function getNavbar (link) {
  if (link.slice(-1) === '/') {
    link = link.slice(0, -1);
  }
  let navbar = [link];
  await fetch(link)
    .then(await function (response) {
      return response.text();
    })
    .then(await function (html) {
      var parser = new DomParser();
      var doc = parser.parseFromString(html, 'text/html');
      let aInsideNavbar = [];
      if (doc.getElementsByTagName('nav')[0] !== undefined) {
        aInsideNavbar = doc.getElementsByTagName('nav')[0].getElementsByTagName('a');
      }
      for (let i = 0; i < aInsideNavbar.length; i += 1) {
        let href = aInsideNavbar[i].getAttribute('href');
        navbar.push(href);
      }
    })
    .catch(await function (err) { console.warn('Something went wrong!', err); return; });

  return await navbar;
}

async function screenShoot (stud) {
  // console.log(stud.key + ': ' + stud.value)
  let navbar = await getNavbar(stud.value);

  for (let i = 0; i < navbar.length; i += 1) {
    puppeteer
      .launch({
        defaultViewport: {
          width: WIDTH_1,
          height: HEIGHT_1,
        },
      })
      .then(async (browser) => {
        if (stud.value !== undefined) {
          const page = await browser.newPage();
          // process.on('unhandledRejection', async (reason, p) => {
          //   console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
          //   await browser.close();
          // });
          try {
            if (i === 0) {
              console.log(stud.value);
              await page.goto(stud.value, { timeout: 0 });
            } else {
              console.log(`${stud.value}/${navbar[i]}`);
              await page.goto(`${stud.value}/${navbar[i]}`, { timeout: 0 });
            }
          } catch (err) {
            await browser.close();
          }
          await timeout(10000);
          if (i === 0) {
            await page.screenshot({ path: `${stud.key}/${stud.key}.png` });
          } else {
            await page.screenshot({ path: `${stud.key}/${stud.key}-${i}.png` });
          }
          await browser.close();
        } else {
          return;
        }
      })
      .catch((err) => {
        throw (`Something wrong: ${err}`);
      });
  }
}

async function main () {
  let res = await getAllResult();
  for (let i = 0; i < res.length; i += 1) {
    if (res[i].value !== undefined) {
      screenShoot(res[i]);
    }
  }
}
main();
// setTimeout(() => {
//     console.log(res.length);
//     // listLinkDemo.forEach(screenShoot);
// }, 5000);
