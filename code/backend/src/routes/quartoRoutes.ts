import { Router, Request, Response } from 'express';
import QuartoController from '../controllers/QuartoController';
import { validateQuarto } from '../middlewares/validateQuarto';

const router = Router();

// Cadastro de quarto
router.post('/', validateQuarto, (req: Request, res: Response) => {
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

// Listagem de quartos
router.get('/', (req: Request, res: Response) => {
  const quartos = QuartoController.listarQuartos();
  res.json(quartos);
});

// Edição de quarto
router.put('/:numero', validateQuarto, (req: Request, res: Response) => {
  const numero = parseInt(req.params.numero as string, 10);
  const dadosAtualizados = req.body;
  const quartoAtualizado = QuartoController.editarQuarto(numero, dadosAtualizados);
  if (quartoAtualizado) {
    res.json(quartoAtualizado);
  } else {
    res.status(404).json({ message: 'Quarto não encontrado' });
  }
});

export default router;
