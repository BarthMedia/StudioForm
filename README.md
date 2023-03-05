# Webflow Large-Scale Software Development Kit

Minimalist template repository for building rich native JavaScript/jQuery applications for Webflow

#

## How do you start? (GitHub Codespaces)

You need to click "Use this template" --> "Open in a codespace" --> Wait 30 seconds to two minutes for everything to install automatically --> Type "npm start" in terminal --> You will be taken to a bmg.studio documentation page where you need to click "Copy snippet to clipboard" --> Paste this snippet into the header code of your page/project settings --> Publish your webflow project -> Go back to the bmg.studio documentation page and press "Continue to Webflow.io"

#

## How do you start? (Desktop)

Download the file (/zip) --> Open it in Visual Studio Code --> Open the terminal --> In the terminal type "npm i" --> And then "npm start" --> You will be redirected to a bmg.studio documentation page where you need to click "copy snippet to clipboard" --> Paste this snippet in the header code of your page/project settings --> Publish your webflow project - > Go to the bmg.studio documentation page and press "Continue to Webflow.io"

(Make sure you have npm installed -> https://nodejs.org/en/download)

#

## How do I get my production code?

After you're done, type "npm run build" in the terminal --> You should get a message that an index._xyz123_.html file was created; and that a controller._xyz123_. js file has been created --> You can now push this code to GitHub with a few git commands or...

#

## How do I get a hosted production src/ url? (Manually)

Go to the "dist" folder and locate the JavaScript file that you have just created --> Now copy the code from that compressed controller JavaScript file --> Go to your GitHub repository of choice --> Click "Add file" --> "Create new file" --> Then paste the code from the compressed controller JavaScript file in the text editor --> Enter your new filename with a . js extension --> Scroll down and click "Commit new file" --> You will be redirected to the main folder of your repository; Browse for the file you just created and open it --> Take the url of that file and paste it into the input field of this landing page: https://www.jsdelivr.com/github --> Copy the JSdelivr Link --> Go to your Webflow project settings --> Replace the 'src' url of the snippet you pasted in the head embed at the beginning --> Press save & publish -> Congratulations! Your complex multi-file JavaScript/jQuery application for Webflow is now shipped to production

#

In case you want to push the file to GitHub with Git...

## Initial Git(Hub) commit information from Windows:

git init

git branch -m master main

git config --global user.name YOUR NAME

git config --global user.email YOUR_EMAIL

git add -A

git commit -m 'first commit 🚀'

git remote add origin https://github.com/USER/REPO.git

git remote set-url origin https://github.com/USER/REPO.git

git push origin main

(Make sure you have Git installed -> https://git-scm.com/downloads)
