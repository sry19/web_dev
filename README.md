# web_dev

https://tracker-ui-sry19.herokuapp.com/

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

# cookie domain for issue tracker project
127.0.0.1 api.promernstack.com ui.promernstack.com


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

Ch15:

issues and errors:
* On page 519, the book has you set the COOKIE_DOMAIN environment variable as herokuapp.com. Most browsers will not accept cookies from this domain. The result is that your deployed application will not maintain session information and authentication will be lost on a page refresh or change. Since we will not be registering custom domains for our apps, we'll run the apps in proxy mode. To do this, set the COOKIE_DOMAIN environment variable for your API Heroku app to the domain of your UI app. In my case, that means running (in the API app directory):
  heroku config:set COOKIE_DOMAIN=tracker-ui-sry19.herokuapp.com

* In order to sign out correctly, the domain should be included in the clearCookie response from the server. This is located in the API app's auth.js file under the /signout route definition. Change
  res.clearCookie('jwt')
to
    res.clearCookie('jwt', {
        domain: process.env.COOKIE_DOMAIN,
    });


# 加uri：
 https://console.developers.google.com/apis/credentials
---------------------------------------------------------------------------

# 项目使用技术：
 1. Webpack: 模块打包机(module bundler)，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式<b>供浏览器使用</b>。能打包更多不同类型的文件。public文件夹用来存放之后供浏览器读取的文件，包括使用webpack打包生成的js文件。配置文件，webpack.config.js，目前的配置主要涉及到的内容是入口文件路径(entry)和打包后文件的存放路径(output)。
 Webpack的强大功能: 
 1.生成Source Maps（使调试更容易）
开发总是离不开调试，方便的调试能极大的提高开发效率，不过有时候通过打包后的文件，你是不容易找到出错了的地方，对应的你写的代码的位置的，Source Maps就是来帮我们解决这个问题的。通过简单的配置，webpack就可以在打包时为我们生成的source maps，这为我们提供了一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试。
 2.使用webpack构建本地服务器
想不想让你的浏览器监听你的代码的修改，并自动刷新显示修改后的结果，其实Webpack提供一个可选的本地开发服务器，这个本地服务器基于node.js构建，可以实现你想要的这些功能，不过它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖
 3.对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。
 4.<b>Babel</b>其实是一个编译JavaScript的平台，它可以编译代码帮你达到以下目的：
让你能使用最新的JavaScript代码（ES6，ES7...），而不用管新标准是否被当前使用的浏览器完全支持；
让你能使用基于JavaScript进行了拓展的语言，比如React的JSX；Babel其实可以完全在 webpack.config.js 中进行配置，但是考虑到babel具有非常多的配置选项，在单一的webpack.config.js文件中进行配置往往使得这个文件显得太复杂，因此一些开发者支持把babel的配置选项放在一个单独的名为 ".babelrc" 的配置文件中。我们现在的babel的配置并不算复杂，不过之后我们会再加一些东西，因此现在我们就提取出相关部分，分两个配置文件进行配置（webpack会自动调用.babelrc里的babel配置选项）
 5.<b>Hot Module Replacement(HMR)</b>: <b>A plugin of webpack.</b>
 Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running, <b>without a full reload</b>. This can significantly speed up development in a few ways:
<b>Retain application state</b> which is lost during a full reload.
Save valuable development time by <b>only updating what's changed.</b>
Instantly update the browser when modifications are made to CSS/JS in the source code, which is almost comparable to changing styles directly in the browser's dev tools.
 6. <b>Babel</b>: Babel is a JavaScript compiler. Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards <b>compatible</b> version of JavaScript in current and <b>older browsers</b> or environments. Here are the main things Babel can do for you: Transform syntax, Polyfill features that are missing in your target environment (through @babel/polyfill), Source code transformations(codemods)
  Babel和webpack是独立的工具
  二者可以一起工作
  二者都可以通过插件拓展功能


 * <b>Why webpack</b>: To understand why you should use webpack, let's recap how we used JavaScript on the web before bundlers were a thing.There are two ways to run JavaScript in a browser. First, include a script for each functionality; this solution is hard to scale because <b>loading too many scripts can cause a network bottleneck</b>. The second option is to use a big .js file containing all your project code, but this leads to problems in scope, size, <b>readability and maintainability</b>.

* At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which <b>maps every module your project needs and generates one or more bundles</b>.Since version 4.0.0, webpack does not require a configuration file to bundle your project. Nevertheless, it is incredibly configurable to better fit your needs.

* <b>Entry</b>: An entry point indicates which module webpack should use to begin building out its internal dependency graph. webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).

* <b>Output</b>: The output property tells webpack where to emit the bundles it creates and how to name these files. It defaults to ./dist/main.js for the main output file and to the ./dist folder for any other generated file.

*<b>Loaders</b>: Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to <b>process other types of files and convert</b> them into valid modules that can be consumed by your application and added to the dependency graph.At a high level, loaders have two properties in your webpack configuration:
The <b>test</b> property identifies which <b>file</b> or files should be transformed.
The <b>use property</b> indicates which <b>loader</b> should be used to do the transforming.

*<b>Mode</b>: By setting the mode parameter to either development, production or none, you can enable webpack's built-in optimizations that correspond to each environment. The default value is <b>production</b>.

*<b>Plugins</b>: While loaders are used to transform certain types of modules, plugins can be leveraged to <b>perform a wider range of tasks</b> like bundle optimization, asset management and injection of environment variables.

*<b>Browser Compatibility</b>: webpack supports all browsers that are ES5-compliant (IE8 and below are not supported). webpack needs Promise for import() and require.ensure(). If you want to support older browsers, you will need to load a polyfill before using these expressions.

2. Proxy
https://medium.com/@bhupendra.nitt/proxy-server-to-bypass-cors-106c1884ef04
use a proxy to avoid CORS(Cross-Origin Resource Sharing)

3. Ajax
Ajax的全称是Asynchronous JavaScript and XML 中文名称定义为异步的JavaScript和XML。Ajax是Web2.0技术的核心由多种技术集合而成，使用Ajax技术不必刷新整个页面，只需对页面的局部进行更新，可以节省网络带宽，提高页面的加载速度，从而缩短用户等待时间，改善用户体验

4. React Hooks: Hooks 是一项新功能提案，可让您在不编写类的情况下使用 state(状态) 和其他 React 功能

5. power of SSR(server-side rendering)
Google's 2 way indexing : 
https://medium.com/@benjburkholder/javascript-seo-server-side-rendering-vs-client-side-rendering-bc06b8ca2383

https://medium.com/pickyourtrail-tech/slow-page-load-not-anymore-the-magic-of-server-side-rendering-f236733e1927

combine client-side rendering & server-side rendering (其实一般用csr更好，只是第一次render的时候csr download js,parse,execute and insert to DOM 更费时间)
https://books.google.com/books?id=6OjJCgAAQBAJ&pg=PT241&lpg=PT241&dq=server+side+rendering+reduce+boot+latency&source=bl&ots=gYdgpFQhw8&sig=ACfU3U1XpRoUxchdS1E2vbdqJUDxFLtPWQ&hl=en&sa=X&ved=2ahUKEwinqaLVm83qAhV5IDQIHVL1BhsQ6AEwDXoECAoQAQ#v=onepage&q=server%20side%20rendering%20reduce%20boot%20latency&f=false
-----------------------------------------------------------------------

# web知识

1. HTTP（stateless) VS HTTPS
超文本传输协议HTTP协议被用于在Web浏览器和网站服务器之间传递信息，HTTP协议以明文方式发送内容，不提供任何方式的数据加密，如果攻击者截取了Web浏览器和网站服务器之间的传输报文，就可以直接读懂其中的信息，因此，HTTP协议不适合传输一些敏感信息，比如：信用卡号、密码等支付信息。
为了解决HTTP协议的这一缺陷，需要使用另一种协议：安全套接字层超文本传输协议HTTPS，为了数据传输的安全，HTTPS在HTTP的基础上加入了<b>SSL（Secure Sockets Layer）协议</b>，SSL依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密。
SSL的作用(1）、认证用户和服务器，确保数据发送到正确的客户机和服务器；（2）、加密数据以防止数据中途被窃取；（3）、维护数据的完整性，确保数据在传输过程中不被改变。
https://juejin.im/entry/58d7635e5c497d0057fae036

2. Cookie
Cookie是客户端保存用户信息的一种机制，用来记录用户的一些信息，实际上Cookie是服务器在本地机器上存储的一小段文本，并随着每次请求发送到服务器。Cookie技术通过请求和响应报文中写入Cookie信息来控制客户端的状态。Cookie会根据响应报文里的一个叫做Set-Cookie的首部字段信息，通知客户端保存Cookie。当下客户端再向服务端发起请求时，客户端会自动在请求报文中加入Cookie值之后发送出去.之后服务端发现客户端发送过来的Cookie后，会检查是那个客户端发送过来的请求，然后对服务器上的记录，最后得到了之前的状态信息。

3. Session
上面我讲到服务端执行session机制时候会生成session的id值，这个id值会发送给客户端，客户端每次请求都会把这个id值放到http请求的头部发送给服务端，<b>而这个id值在客户端会保存下来，保存的容器就是cookie</b>，因此当我们完全禁掉浏览器的cookie的时候，服务端的session也会不能正常使用。 PHP中的Session在默认情况下是使用客户端的Cookie来保存Session ID的，所以当客户端的cookie出现问题的时候就会影响Session了。必须注意的是：<b>Session不一定必须依赖Cookie</b>，这也是Session相比Cookie的高明之处。当客户端的Cookie被禁用或出现问题时，PHP会自动把Session ID附着在URL中，这样再通过Session ID就能跨页使用Session变量了。

4. Cookie与Session的区别
cookie数据存放在客户的浏览器（客户端）上，session数据放在服务器上，但是服务端的session的实现对客户端的cookie有依赖关系的；cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗，考虑到安全应当使用session；session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能。考虑到减轻服务器性能方面，应当使用COOKIE；单个cookie在客户端的限制是3K，就是说一个站点在客户端存放的COOKIE不能超过3K；

5. 傻傻分不清之 Cookie、Session、Token、JWT
JSON Web Token（简称 JWT）是目前最流行的<b>跨域认证</b>解决方案。
是一种<b>认证授权机制</b>。
http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html
https://juejin.im/post/5e055d9ef265da33997a42cc

6. OAuth
OAuth is an authorization protocol, rather than an authentication protocol.

7. DOM
变成树状，浏览器首先将收到的html代码，通过html解析器解析构建为一颗DOM树。浏览器按从上到下，从左到右的顺序，读取DOM树的文档节点，顺序存放到一条虚拟的传送带上。传送带上的盒子就是节点，而这条流动的传送带就是文档流。如果我们读取到的节点是属于另一个节点下的子节点，那么在放入传送带的时候，就应该按顺序放到该节点盒子的内部。文档流排完之后，开始获取计算节点的坐标和大小等CSS属性，作为盒子的包装说明。
然后把盒子在仓库里一一摆放，这就将节点布局到了页面。布局完成之后，我们在页面上其实是看不到任何内容的
浏览器只是计算出了每一个节点对象应该被放到页面的哪个位置上，但并没有可视化。
因此最后一步就是将所有内容绘制出来，完成整个页面的渲染。
https://www.zhihu.com/question/34219998