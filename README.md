# web_dev
Please 'npm install' && 'create .env' before run the app.
--------------------------------------
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
* routing: direct to

issues and errors:
* If I implement the 'select' button, I find that there is an error : INTERNAL_SERVER_ERROR: Variable "$id" got invalid value "2"; Int cannot represent non-integer value: "2".
It is because I use "graphql": "^15.0.0" instead of 0.13.2 because I may get another problem. Basically, the 'id' getting passed in to the graphql query is a string, and it's not being parsed into an int as it should be. We can fix this by making the following change in the loadData function in IssueDetail.jsx (ui):
const data = await graphQLFetch(query, { id: parseInt(id, 10) });

mangod: mongo server // runnning in the background all the time
mango: mongo client
object in mongodb: document
SPA: single page application
react routing: react checks out what is in this window
promise: object
call-back function: when object populated(get a promise), call that function
collection.find({}): fetch the whole collection
.then(): only be accessed when the previous step finished(get a promise)
ajax: create a  new request
jsx: gets translated to js on the server side and pass to the browser

Ch14:
* Google login error: “popup_closed_by_user”
Try clearing your browser cache.
In Chrome: Settings → Advanced → Clear browsing data → Cached images and files
 
* How do I setup the dotenv file in Node.js?I defined the ENVIRONMENT_VARIABLES in my .env file but as soon as I try to output the value in my console, I get the error that it is undefined.
 
So here is the troubleshooting list:
(1)The filename should be .env (I believe .env.test is also acceptable).
Make sure you are requiring it as early as possible in your application using this statement require('dotenv').config();
The .env file should be in the root directory of your project.
Follow the "file writing rules" like DB_HOST=localhost, no need to wrap values in double/single quotes.

(2)If you actually want to use it to supply the environment values, rename it to just .env (that's dot then env).
Environment variables can also be provided as actual operating system environment variables. The environment being "prod" or "dev" would correspond too a different environment. For example, we can set OS environment variables for the Heroku deployment, so that Heroku deployed applications use connections associated with the production environment.
.env files are also a good place to put variables that shouldn't be kept in version control. It's very common too include .env in your .gitignore list, so that sensitive values aren't shared in version control.

* webpack
the issuetracker app is running on port 8000. But the API (the service that provides data to the app) is running on 3000. So yes, you've got two servers running, and at least for Chapter 7 "run watch" is a separate command. In Chapter 8 Webpack gets introduced and things get rearranged a bit. You'll still be running UI and API from separate terminals. These have been separated into two independent, loosely coupled components of your application.

* In cookie domain section, we are asked to modify '/etc/hosts' file.
https://apple.stackexchange.com/questions/160042/why-cannot-i-edit-my-hosts-file
use 'sudo nano /etc/hosts' to edit the file, I added 

'# cookie domain for issue tracker project
127.0.0.1 api.promernstack.com ui.promernstack.com'


* mongodb atlas:
1. build your first cluster(issuetracker)
2. create your first database user -> database access
3. whitelist your ip address -> network access
4. load sample data(optional)
5. connect to your cluster

* dotenv
Right, JavaScript handles  Booleans, but your environment variables are not JavaScript variables. They're supplied by dotenv or by your operating system (which also has environment variables that can be set). You can think of this something like a command line argument. When you pass an argument to a Node (or Python, or whatever) script, it enters as a string, because that's what the OS passes to your program. It needs to be parsed from there.
Here's a little tutorial on dotenv, halfway down you'll see some parsing rules:

http://zetcode.com/javascript/dotenv/

Also, it's worth emphasizing that process.env doesn't just get values from a .env file via dotenv (which is a JS library). It will also get an environment variable from your OS if you've got one set. Google "environment variables" for your own operating system to see how these can be set.
And the JS type casting comes up here in that *if* there's no such environment variable defined *either* in a .env file *or* in an OS environment variable, then process.env.ENABLE_CORS will appear to JavaScript as undefined, which is falsy. If it has any other value (including 'false') then process.env.ENABLE_CORS will be defined (truthy) and the value will be compared to the string 'true'. If it's the same, we get a true boolean, if it's different (i.e. if it's the string 'false') then we get a false boolean.
If it's undefined, then the default will be 'true' (and thus true) thanks to that logical or operator.