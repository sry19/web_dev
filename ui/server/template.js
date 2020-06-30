import serialize from 'serialize-javascript';

export default function template(body, initialData, userData) {
    return `<!DOCTYPE HTML>
    <html>
    
    <head>
        <meta charset="utf-8">
        <title>Pro MERN Stack</title>
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" >
        <meta name="viewport" content="width=device-width, initial-scale=1.0" >

        <script src="https://apis.google.com/js/api:client.js"></script>
          
         <!--Babel: a compiler that transforms JSX into regulare JS based React.createElement() calls-->
         <!--we'll no longer need the runtime transformer to be loaded in index.html, so we can get rid of the babel-core script library specification-->
         <!--polyfill: old browser-->
         <!--the polyfill is required only for Internet explorer and older versions of other browsers. all latest versions of popular browsers—such as Chrome, Firefox, safari, edge, and Opera—support fetch() natively.-->
    
         <style>
             table.table-hover tr {cursor: pointer;}
             .panel-title a {display: block; width: 100%; cursor: pointer;}
         </style>
    </head>
    
    <body>
        <!-- Page generated from template. -->
        <!--a division or a section in an HTML document. The <div> element is often used as a container for other HTML elements to style them with CSS or to perform certain tasks with JavaScript.-->
        <div id="contents">${body}</div>
        <script>
            window.__INITIAL_DATA__ = ${serialize(initialData)}
            window.__USER_DATA__ = ${serialize(userData)}
        </script>

        <!--tells babel to transform this script-->
        <!--in order to transform JSX to plain js, we need to install core Babel library and a command-line interface-->
        <script src="/env.js"></script>
        <script src="/vendor.bundle.js"></script>
        <script src="/app.bundle.js"></script>    
    </body>
    
    </html>
    `;
}
