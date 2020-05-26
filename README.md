# web_dev

Ch5:
summary
* What is GraphQL: https://www.zhihu.com/question/264629587
* the nodemon tool that restarts the server on detecting changes to files by default only looks for changes to files with a .js extension. To make it watch for changes to other extensions, we need to add an -e option specifying all the extensions it needs to watch for. Since we added a file with extension .graphql, let’s specify js and graphql as the two extensions for this option.

 issues and errors:
* Initial setup of ApolloSever was repeatedly unsuccessful from pg. 97. After checking my work repeatedly, and running npm start, I kept receiving an error that read as follows: Error: Cannot find module 'graphql/validation/rules/PossibleTypeExtensions'. After cross referencing the author's repo I noted that his dependencies for apollo-server-express were set to version 2.3.1, whereas mine were only at 2.13.1. I ran npm install graphql@0 apollo-server-express@2.3 to force install the apollo server dependency to version 2.3+ instead, which solved the problem
* The function shown as validateIssue(_, { issue }) on the bottom of page 123 and on page 125 is incorrectly named and has the wrong parameters. It should be issueValidate(issue) as called at the top of page 126.