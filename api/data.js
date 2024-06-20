import Cors from "cors"

import initMiddleware from '../../lib/init-middleware';

// Inicializa el middleware CORS
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: '*', // Aquí puedes especificar el origen permitido
  })
);

export default async function handler(req, res) {
  // Ejecuta el middleware CORS
  await cors(req, res);

  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hola, este es tu dato!' });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}