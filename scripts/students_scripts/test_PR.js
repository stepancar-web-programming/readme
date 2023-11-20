import {Octokit} from "@octokit/core";
const octokit = new Octokit({ auth: `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` });
const owner = 'Erkobrax'; // Название вашей организации на GitHub
octokit.request(`GET /repos/${owner}/invitescript_main/pulls`)
    .then(response=>
    {
        console.log(response.data)

    })
octokit.request(`GET /repos/${owner}/invitescript_main/pulls/1/files`)
.then(response => {
    console.log(response.data)
})
