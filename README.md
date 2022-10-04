# Automatically Create Repositories In Organization  

**Please manually modify the value of organization and token before running**

## Download and Usage   

First copy the github repository link, download the github repository to the local

```xml
git clone https://github.com/spbgzh/readme.git
```

Execute the following command to download the dependencies required by the project  

```
npm install
```

Then please modify the **ORG** and **TOKEN** values in *index.html*  
Finally, open the index.html file directly through the browser.  
You just need to upload the xlsx file to the web page and the program will run automatically.

## In Addition  

*git.js* is a js script that can automatically create repositories by controlling elements on web pages.   
But I can't solve the problem that the script keeps running after the webpage refreshes.
Tried using iframe, localstorage, sessionstorage all without success, If anyone has any ideas please let me know.
