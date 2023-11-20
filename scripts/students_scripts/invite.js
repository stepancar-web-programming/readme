import {Octokit} from "@octokit/core";
import axios from "axios";
const octokit = new Octokit({ auth: 'ВАШ API КЛЮЧ' });
const org = 'stepancar-web-programming'; // Название вашей организации на GitHub
const repoOwner = 'stepancar'; // Имя пользователя, владельца репозитория
const repoName = 'readme'; // Название репозитория
const filePath = 'scripts/students_scripts/usernames.json'; // Путь к JSON файлу в репозитории

octokit.request(`GET /repos/${org}/${repoName}/contents/${filePath}`)
    .then(response =>{
        const users = JSON.parse(JSON.stringify(response.data));
        inviteUsers(users);
    });
function inviteUsers(users) {
    users.forEach(user => {
        if (user.github) {
            axios.get(`https://api.github.com/users/${user.github}`)
                .then(response => {
                    const profileuser = JSON.parse(JSON.stringify(response.data))
                    const user_id = profileuser.id // Может высылать инвайты только по почте или id, по никнему не может
                    octokit.request(`POST /orgs/${org}/invitations`, {
                        invitee_id: user_id,
                        role: 'direct_member',
                    })
                        .then(() => console.log(`Приглашение отправлено пользователю ${user.github}`))
                        .catch(error => {
                            console.error('Ошибка при отправке приглашения:', error);
                        });
                });
        }
    });
}
