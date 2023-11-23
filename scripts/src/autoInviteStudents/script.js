const octonode = require('octonode');
const fs = require('fs/promises');


const OAUTHKEY = process.env.OAUTHKEY;
const PATHSTUDENTS = 'scripts/src/autoInviteStudents/students.json'; //Предполагается разместить в корне репозитория 'students.json'
const REPOOWNER = "CoolOwnerName";
const REPONAME = "CoolRepoNameOfCoolRepoOwner";

const DEFAULTPERMISSIONS = "push";


async function inviteStudents() {
  try {

    const client = octonode.client(OAUTHKEY);
	
    const data = await fs.readFile(PATHSTUDENTS, 'utf-8');
    const students = JSON.parse(data);

    for (const student of students) {
      const username = student.nickname;

      const repository = client.repo(`${REPOOWNER}/${REPONAME}`);
      const invitationOptions = {
        permission: DEFAULTPERMISSIONS,
      };


      repository.invite(username, invitationOptions, (error, response) => {
        if (!error && response.statusCode === 201) {
          console.log(`Приглашение успешно отправлено студенту ${student.firstName} ${student.lastName}`);
        } else {
          console.error(`Не удалось отправить приглашение студенту ${student.firstName} ${student.lastName}`);
          console.error(`Статус код: ${response.statusCode}`);
        }
      });
    }
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}



inviteStudents();
