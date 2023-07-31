# QA-Task

## Introduction

- As described in the shared QA-task description, it is requested to automate a Testcase at which the user is supposed to browse to the website (<https://weathershopper.pythonanywhere.com/>) then based on the instructions provided in each of the website pages, the site workflow continues.
- ‘Testcafe’ has been used as a web test automation framework using Javascript to prepare the needed scripts(s).

## Environment Needs
1.  Node.js
2.  VSCode (IDE).
3.  Testcafe
4.  Web browsers (at least one of: Chrome, Firefox, Edge)
5.  Docker
    And of course internet connectivity

## How to Run the scripts
We have different ways to execute the prepared script
1.  On a local machine [OS independent]
    1. Clone the repo code to a local folder.
    2. Open the terminal in this folder.
    3. Run the below command to install all the project dependencies:

       `$ npm install`

    4. The 2 previous steps can be done from inside the VSCode.
    5. Run the command (npx testacafe <Browser> test) to execute the script [where <Browser> is any of Chrome, Firefox, Edge or a mix of them].
    6. Examples of the execution command:
       
       `$ npx testcafe chrome test`

       `$ npx testcafe firefox test`

       `$ npx testcafe chrome, firefox test`

       `$ npx testcafe all test`
 
    7. In case it is needed to generate a report, the user can run the command (testacafe <Browser> test --reporter html:./reports/report*$(date +"%Y-%m-%d*%H-%M-%S").html) whis will create <report_currentDate/Time>.html file in the 'reports' folder in the project root directory & the user can open by the preferred browser.
2.  On Docker(a)
    1. Clone the repo.
    2. Clone the testcafe official docker run the command (docker pull testcafe/testcafe)
    3. Run the command (docker run -it --rm -v $PWD:/app testcafe/testcafe <Browser> app/test) on Terminal (System or VSCode).
    4. This command runs a container from the image pulled in the previous step, copies the project contents there, executes the script and finally removes the container after the test execution completes.
    5. Where <Browser> can be (chromium) or (chromium:headless)
    6. Currently reports are not working with this execution configuration.
3.  On Docker(b)
    1. Using one of the 2 files in the project root directory (Dockerfile_Chromium & Dockerfile_Firefox) & we can follow the same steps for either of them.
    2. Rename the file to be ‘Dockerfile’ only without extension.
    3. This file contains a set of steps on (base/initial docker image, what needs to be installed, set the working directory, copy the project contents,................)
    4. On the Terminal, run the command (docker build -t <dock_image> .) to create a new image as per the configuration provided in the used ‘Dockerfile [where <dock\_image> is any name of small letters to be given for the new image]’.
    5. Run the command (docker run --rm -it <dock_image>) to create a container from the image created in the previous step, execute the script then remove this container.
    6. The file ‘Dockerfile_Chromium’ can be used to run the script with ‘chromium’ & the other one ‘Dockerfile_Firefox’ can be used to run the script with ‘firefox:headless’.
    7. Currently reports are not working with this execution configuration.
4.  On Github Actions
    1. The project is configured to run a ‘Github Action Workflow’ every time there is a code push (and of course it can be executed on demand).
    2. This workflow is using ‘Chrome’ as a browser on both the latest Windows & Linux-Ubuntu.
    3. After the workflow finishes the execution, a report for each execution is generated and it can be found in the commpressed file in the "Artifacts" section of the workflow "Summary".

## Notes
1.  There are some comments provided on the script for clarification & highlighting of some points.
2.  The data provided to the test script (For any used variable) can be found under the directory(./data/testData.json) so that the script is data driven which helps in minimizing the need for code maintenance when the test data is chnaged.
3.  The parts related to screenshots in the script needs to be commented (in case of docker a or b) as they can’t be executed there, but they can they can work normally when running locally or with Github Actions [Those parts can be found in ./pages/ItemPage & ./pages/PayPage].
4.  In the case of Docker-desktop, make sure of the network configuration on the host machine as it may cause connection issues (& hence script failure) if not properly configured.
5.  The Dockerfiles in the project are examples but for sure they can be configured as per need.
6.  Although the configured Github Actions workflow runs in case of code push, we can configure it or another workflow to run also periodically and in both cases, it can be executed on demand.

## Possible Optimizations
1.  A config file containing all the needed executions' configurations may be created to minimize the need for cutomizing the executin command everytime the script is executed.
2.  Preparing a docker image where it can be used to execute scripts with GUI & headless for Chrome & Firefox with the possibility to take screenshots.
3.  Include 'Safari' in my testing scope (as the task includes IFrames which may caus issues when trying to manipulate from Safari).
4.  Optimize the Github Action workflow to contain different types & versions of browsers and operating systems.
5.  Optimize the script to use a ‘Reporting utility’ or ‘Report Portal’ for better (execution results, history & statistics) display (Currently we can generate html report file but without keeping the history and also not availale for the docker execution).
