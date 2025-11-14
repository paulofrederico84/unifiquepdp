// Servidor alternativo para desenvolvimento sem Vite HMR
// Usa build em watch e entrega arquivos estáticos.

const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

const app = express();
const distDir = path.join(__dirname, 'frontend', 'dist');

app.use(compression());
app.use(express.static(distDir, { extensions: ['html'] }));

app.get('*', (req, res) => {
    const indexPath = path.join(distDir, 'index.html');
    if (!fs.existsSync(indexPath)) {
        return res.status(503).send('Build em andamento. Recarregue em alguns segundos.');
    }
    res.sendFile(indexPath);
});

const port = process.env.PORT || 5175;
app.listen(port, () => {
    console.log(`Servidor alternativo em http://127.0.0.1:${port}`);
});
