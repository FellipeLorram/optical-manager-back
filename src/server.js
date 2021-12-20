import mongoose from 'mongoose';
import app from './app';

require('dotenv').config();

mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.emit('Conectado');
  })
  .catch((e) => console.log(e));

app.on('Conectado', () => {
  app.listen(process.env.PORT);
});
