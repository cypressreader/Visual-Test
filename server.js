import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const docsPath = path.join(__dirname, 'docs');

// Redirect root to /app/
app.get('/', (req, res) => {
  res.redirect('/app/');
});

app.get('/index.html', (req, res) => {
  res.redirect('/app/');
});

// Serve static assets from docs directory
app.use(express.static(docsPath));

// Fallback for /app SPA sub-routes
app.use('/app', (req, res, next) => {
  if (req.accepts('html')) {
    res.sendFile(path.join(docsPath, 'app', 'index.html'));
  } else {
    next();
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CyPress server listening on http://0.0.0.0:${PORT}`);
});
