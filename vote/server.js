const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let candidates = [
  { id: 1, name: 'Kandidat 1', votes: 0 },
  { id: 2, name: 'Kandidat 2', votes: 0 },
  { id: 3, name: 'Kandidat 3', votes: 0 }
];

app.get('/candidates', (req, res) => {
  res.json(candidates);
});

app.post('/vote', (req, res) => {
  const candidateId = req.body.candidateId;
  const candidate = candidates.find(c => c.id === candidateId);
  
  if (candidate) {
    candidate.votes++;
    res.status(200).json({ message: 'Vote berhasil.' });
  } else {
    res.status(404).json({ message: 'Kandidat tidak ditemukan.' });
  }
});

app.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});

