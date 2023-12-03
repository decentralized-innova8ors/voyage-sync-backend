import 'dotenv/config';
import app from './src/app.js';

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
