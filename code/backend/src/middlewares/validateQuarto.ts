import { Request, Response, NextFunction } from 'express';

export function validateQuarto(req: Request, res: Response, next: NextFunction) {
  const { numero, capacidade, tipo, precoPorDiaria, frigobar, cafeDaManha, arCondicionado, tv, camas } = req.body;
  if (
    typeof numero !== 'number' ||
    typeof capacidade !== 'number' ||
    typeof tipo !== 'string' ||
    typeof precoPorDiaria !== 'number' ||
    typeof frigobar !== 'boolean' ||
    typeof cafeDaManha !== 'boolean' ||
    typeof arCondicionado !== 'boolean' ||
    typeof tv !== 'boolean' ||
    !Array.isArray(camas)
  ) {
    return res.status(400).json({ message: 'Dados inválidos para cadastro/edição de quarto.' });
  }
  next();
}
