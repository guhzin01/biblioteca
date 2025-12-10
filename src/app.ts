import express from "express";
import { AppDataSource } from "./data-source";
import { LivroController } from "./controller/LivroController";

const app = express();
app.use(express.json());

const controller = new LivroController();

app.post("/api/livros", controller.criar);
app.get("/api/livros", controller.listar);
app.get("/api/livros/:id", controller.buscarPorId);
app.put("/api/livros/:id", controller.atualizar);
app.delete("/api/livros/:id", controller.deletar);

AppDataSource.initialize().then(() => {
    console.log("Banco conectado com sucesso!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});
