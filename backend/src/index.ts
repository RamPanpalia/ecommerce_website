import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.routes.js';
import { productRouter } from './routes/product.routes.js';
import { addressRouter } from './routes/address.routes.js';
import { orderRouter } from './routes/order.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/addresses', addressRouter);
app.use('/api/orders', orderRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});