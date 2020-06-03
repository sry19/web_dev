# web_dev

* React life cycle: https://flaviocopes.com/react-lifecycle-events/#:~:text=React%20class%20components%20can%20have,hook%20and%20provide%20custom%20functionality.

Ch5:

summary
* What is GraphQL: https://www.zhihu.com/question/264629587
* What is GraphQL: https://juejin.im/post/5c87b1776fb9a049ac7a0247
* the nodemon tool that restarts the server on detecting changes to files by default only looks for changes to files with a .js extension. To make it watch for changes to other extensions, we need to add an -e option specifying all the extensions it needs to watch for. Since we added a file with extension .graphql, let’s specify js and graphql as the two extensions for this option.

issues and errors:
* Initial setup of ApolloSever was repeatedly unsuccessful from pg. 97. After checking my work repeatedly, and running npm start, I kept receiving an error that read as follows: Error: Cannot find module 'graphql/validation/rules/PossibleTypeExtensions'. After cross referencing the author's repo I noted that his dependencies for apollo-server-express were set to version 2.3.1, whereas mine were only at 2.13.1. I ran npm install graphql@0 apollo-server-express@2.3 to force install the apollo server dependency to version 2.3+ instead, which solved the problem
* The function shown as validateIssue(_, { issue }) on the bottom of page 123 and on page 125 is incorrectly named and has the wrong parameters. It should be issueValidate(issue) as called at the top of page 126.

Ch7:

issues and errors:
* gyp: No Xcode or CLT version detected. 
 solution: Reinstall command-line tools by removing the previously installed version
 https://medium.com/flawless-app-stories/gyp-no-xcode-or-clt-version-detected-macos-catalina-anansewaa-38b536389e8d
 step1: First, get the location of the installed command-line tools by running the command below:
    xcode-select --print-path
    the result of the above command /Library/Developer/CommandLineTools
step2: Knowing the path to the currently installed command-line tools from the previous step,   You can now go ahead and remove it from the system. For the next set of commands, you need sudo privileges to run successfully.
    sudo rm -r -f /Library/Developer/CommandLineTools
step3: Click on install and follow the rest of the instructions in prompt to reinstall command  line developer tools. If for some reasons, you do not get the prompt right after uninstalling your previous command line developer tools, no need to panic. Run the following command to get the prompt.
    xcode-select --install
* Error: Cannot find module 'graphql/validation/rules/PossibleTypeExtensions'
    This issue is related to the version of graphql, so I uninstalled graphql and reinstalled the lastest version.

issues have not solved:
* (Multiple Environments) cannot use the environment variable to change the port number

Ch8:

summary:
* What is webpack: https://www.jianshu.com/p/42e11515c10f

Ch9:

summary:
* What is route and router: https://blog.csdn.net/jigetage/article/details/80938700