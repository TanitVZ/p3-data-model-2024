import cors from "cors";
import express from "express";
import morgan from "morgan";

import socisRouter from './socis';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/socis", socisRouter);


const { PORT} = process.env;

app.listen(PORT, () => {

    console.log(`API socis http://localhost:${PORT}`);
});



