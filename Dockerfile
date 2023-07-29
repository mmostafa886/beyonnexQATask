#This docker file is sued to execute all the scripts in the 'test' folder on chromium (both in headless & GUI modes)
#As the base image doesn't have GUI, we need to take care of 2 points 
# (1-taking screenshots should be commented as it is not possible to be done in a system without GUI)
#To run excute the test scripts using this docker image, you need to do the following
    # - Rename this dile to be 'Dockerfile'
    # - Execute the command (docker build -t <image_Name> .) to build the image & copy the test file to it
    # - Execute the command (docker run --rm <image_Name>) to run the tests then remove the image
# Base image with Node.js and npm pre-installed
FROM testcafe/testcafe

# Copy the TestCafe tests into the image
COPY . .

# Start TestCafe in headless mode by default
CMD [ "chromium", "test/*.js" ]
