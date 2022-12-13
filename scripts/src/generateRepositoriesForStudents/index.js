import github from 'octonode';
import tr from 'transliteration';
import fs from 'node:fs/promises';
import path from 'node:path';

const OAUTHKEY = process.env.OAUTHKEY;
const ORGNAME = 'belebeba';
const REPONAMEPREFIX = "2022-fall-lab-portfolio-";
const REPODESCRIPTION = "Лабораторная работа по Веб-технологиям";
const STUDENTSLISTFILENAME = 'studs.txt'

const client = github.client(OAUTHKEY);
const githubOrganization = client.org(ORGNAME);

// TODO принять файл не важнл где он лежит
const studsPath = path.join(path.resolve(), STUDENTSLISTFILENAME);


const data = await fs.readFile(studsPath, { encoding: 'utf-8' });
try {
    const studs = data.split('\n');

    for (const name of studs) {
        const translatedName = tr.transliterate(name).trim().toLowerCase();
        const repositoryName = `${REPONAMEPREFIX}${translatedName.split(' ').join('-')}`;
        console.log(repositoryName);

        githubOrganization.repo({
            name: repositoryName,
            description: REPODESCRIPTION,
            private: false,
        }, (err, data, headers) => {
            if (err != null) {
                console.log("error: " + err);
            }
        });
    }
} catch (err) {
    console.error(err)
}