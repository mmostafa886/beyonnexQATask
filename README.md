# QA-Task
## Introduction
- As described in the shared QA-task description, it is requested to automate a Testcase at which the user is supposed to browse to the website (<https://weathershopper.pythonanywhere.com/>) then based on the instructions provided in each of the website pages, the site workflow continues.
- ‘Testcafe’ has been used as a web test automation framework using Javascript to prepare the needed scripts(s).
## Environment Needs
   1. Node.js
   2. VSCode (IDE).
   3. Testcafe
   4. Web browsers (at least one of: Chrome, Firefox, Edge)
   5. Docker
And of course internet connectivity
## How to Run the scripts
   We have different ways to execute the prepared script
   1. On a local machine [OS independent]
      1. Clone the repo code to a local folder.
      1. Open the terminal in this folder.
      1. ` `Run the command (npm install) to install all the project dependencies.
      1. The 2 previous steps can be done from inside the VSCode.
      1. Run the command (testacafe <Browser> test) to execute the script [where <Browser> is any of Chrome, Firefox, Edge or a mix of them]
      1. Examples of the execution command: (testcafe chrome test), (testcafe firefox test), (testcafe chrome, firefox test), (testcafe all test)
   2. On Docker(a)
      1. Clone the repo.
      1. Clone the testcafe official docker run the command (docker pull testcafe/testcafe)
      1. Run the command (docker run -it --rm -v $PWD:/app  testcafe/testcafe <Browser> app/test) on Terminal (System or VSCode).
      1. This command runs a container from the image pulled in the previous step, copies the project contents there, executes the script and finally removes the container after the test execution completes.
      1. Where <Browser> can be (chromium) or (chromium:headless)
   3. On Docker(b)
      1. Using one of the 2 files in the project root directory (Dockerfile\_Chromium & Dockerfile\_Firefox) & we can follow the same steps for either of them.
      1. Rename the file to be ‘Dockerfile’ only without extension.
      1. This file contains a set of steps on (base/initial docker image, what needs to be installed, set the working directory, copy the project contents,................)
      1. On the Terminal, run the command (docker build -t <dock\_image> .) to create a new image as per the configuration provided in the used ‘Dockerfile [where <dock\_image> is any name of small letters to be given for the new image]’.
      1. Run the command (docker run --rm -it <dock\_image>) to create a container from the image created in the previous step, execute the script then remove this container.
      1. The file ‘Dockerfile\_Chromium’ can be used to run the script with ‘chromium’ & the other one ‘Dockerfile\_Firefox’ can be used to run the script with ‘firefox:headless’.
   4. On Github Actions 
      1. The project is configured to run a ‘Github Action Workflow’ every time there is a code push (and of course it can be executed on demand).
      1. This workflow is using ‘Chrome’ as a browser on both the latest Windows & Linux-Ubuntu.
## Notes
   1. There are some comments provided on the script for clarification & highlighting of some points.
   2. The parts related to screenshots in the script were commented as they can’t be executed (in case of docker a or b) but they can be uncommented to work normally when running locally or with Github Actions.
   3. In the case of Docker-desktop, make sure of the network configuration on the host machine as it may cause connection issues (& hence script failure) if not properly configured.
   4. The Dockerfiles in the project are examples but for sure they can be configured as per need.
   5. Although the configured Github Actions workflow runs in case of code push, we can configure it or  another workflow to run also periodically and in both cases, it can be executed on demand.
## Possible Optimizations
   1. Convert the script to be driven & minimize the use of hard coded variables.
   2. We can create config file containing all the needed executions' configurations.
   3. Preparing a docker image where it can be used to execute scripts with GUI & headless for Chrome & Firefox with the possibility to take screenshots.
   4. Optimize the Github Action workflow to contain different types & versions of browsers and operating systems.
   5. Optimize the script to use a ‘Reporting utility’ or ‘Report Portal’ for better (execution results, history & statistics) display.
