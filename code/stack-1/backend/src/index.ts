import express from 'express';
import quartoRoutes from './routes/quartoRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const port = 3000;

app.use(express.json());

// Rotas de quartos
app.use('/quartos', quartoRoutes);

// Middleware global de tratamento de erros
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});