const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: "Bluetooth Kulaklık", price: 599, description: "Kablosuz, hızlı şarj, kaliteli ses" },
  { id: 2, name: "Dizüstü Bilgisayar", price: 17999, description: "16GB RAM, SSD, 15.6'' ekran" }
];

app.get('/products', (req, res) => {
  res.json(products);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
