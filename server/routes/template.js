import config from 'config'

export default (content, helmet) => `
<!doctype html>
<html lang="en">
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
    <script>
      WebFont.load({
        google: {
          families: ['Open+Sans:400italic,700,400:latin,latin-ext']
        }
      });
    </script>
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    <script>
        window.ga = window.ga || function () {
                (ga.q = ga.q || []).push(arguments)
            };
        ga.l = +new Date;
        ga('create', '${config.get('trackingCode')}', 'auto');
        ga('send', 'pageview');

        ga('require', 'outboundLinkTracker', {
            shouldTrackOutboundLink: function (link, parseUrl) {
                var href = link.getAttribute('href') || link.getAttribute('xlink:href');
                var url = parseUrl(href);
                var isExternal = (url.hostname != location.hostname && url.protocol.slice(0, 4) == 'http');

                // treat downloads as external links
                var exts = 'doc*|xls*|ppt*|pdf|zip|rar|exe|mp3';
                var regExt = new RegExp(".*\\.(" + exts + ")(\\?.*)?$");
                var isDownload = url.pathname.match(regExt);

                return isDownload || isExternal;
            }
        });
        ga('require', 'urlChangeTracker');
    </script>
    ${helmet.script.toString()}
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