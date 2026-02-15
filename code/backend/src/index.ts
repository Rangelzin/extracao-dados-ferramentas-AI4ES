import express, { Request, Response } from 'express';
import QuartoController from '../controllers/QuartoController';

const app = express();
const port = 3000;

app.use(express.json());

// Rotas para gestão de quartos
app.post('/quartos', (req: Request, res: Response) => {
  const { numero, capacidade, tipo, precoPorDiaria, frigobar, cafeDaManha, arCondicionado, tv, camas } = req.body;
  const novoQuarto = QuartoController.cadastrarQuarto(
    numero,
    capacidade,
    tipo,
    precoPorDiaria,
    frigobar,
    cafeDaManha,
    arCondicionado,
    tv,
    camas
  );
  res.status(201).json(novoQuarto);
});

app.get('/quartos', (req: Request, res: Response) => {
  const quartos = QuartoController.listarQuartos();
  res.json(quartos);
});

app.put('/quartos/:numero', (req: Request, res: Response) => {
  const numero = parseInt(req.params.numero as string, 10);
  const dadosAtualizados = req.body;
  const quartoAtualizado = QuartoController.editarQuarto(numero, dadosAtualizados);
  if (quartoAtualizado) {
    res.json(quartoAtualizado);
  } else {
    res.status(404).json({ message: 'Quarto não encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});