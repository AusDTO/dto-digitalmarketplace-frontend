export default (content, helmet) => `
<!doctype html>
<html lang="en">
  <head>
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    <link rel="stylesheet" type="text/css" href="/bundle/main.css"/>
  </head>
  <body>
    <div id="root">${content}</div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run \`npm start\` in this folder.
      To create a production bundle, use \`npm run build\`.
    -->
  </body>
</html>
`;