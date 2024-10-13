import express from 'express';
import { renderToString } from './src/trifusion/ssr.js';
import App from './src/App.js';

const app = express();
const port = 3000;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  const appHtml = renderToString(App);
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TriFusion App</title>
      </head>
      <body>
        <div id="app">${appHtml}</div>
        <script type="module" src="/src/main.ts"></script>
      </body>
    </html>
  `;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});