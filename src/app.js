import express from 'express';
import authRoutes from './Routes/authRoutes.js'

const app = express();

app.use(express.json());


app.use('/auth', authRoutes);



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});