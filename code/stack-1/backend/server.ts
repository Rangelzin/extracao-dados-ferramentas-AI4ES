import express from 'express';
import cors from 'cors';
import { QuartoRepositoryMemory, GestaoQuartosService } from './gestao-quartos.js';

const app = express();
app.use(cors());
app.use(express.json());

const quartoRepo = new QuartoRepositoryMemory();
const gestaoQuartos = new GestaoQuartosService(quartoRepo);

// Rotas de Quartos
app.get('/api/quartos', async (req, res) => {
  try {
    const quartos = await gestaoQuartos.listarParaExibicao();
    res.json(quartos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/quartos', async (req, res) => {
  try {
    const novoQuarto = await gestaoQuartos.cadastrar(req.body);
    res.status(201).json(novoQuarto);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/quartos/:numero', async (req, res) => {
  try {
    const quartoAtualizado = await gestaoQuartos.editar(req.params.numero, req.body);
    res.json(quartoAtualizado);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
