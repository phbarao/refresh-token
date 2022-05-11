import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes';

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use(router);
app.use((error: Error, _: Request, response: Response, next: NextFunction) => {
  return response.status(500).json({
    status: 'Error',
    message: error.message,
  });
});

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
