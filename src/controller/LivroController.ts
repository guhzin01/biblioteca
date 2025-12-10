import { Request, Response } from "express";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroController {
    async criar(req: Request, res: Response) {
        const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

        if (!titulo || !autor || !isbn) {
            return res.status(400).json({ erro: "Campos obrigatórios não enviados" });
        }

        const livro = LivroRepository.create({
            titulo,
            autor,
            isbn,
            anoPublicacao,
            disponivel,
        });

        await LivroRepository.save(livro);
        return res.status(201).json(livro);
    }

    async listar(req: Request, res: Response) {
        const livros = await LivroRepository.find();
        return res.json(livros);
    }

    async buscarPorId(req: Request, res: Response) {
        const { id } = req.params;
        const livro = await LivroRepository.findOneBy({ id: Number(id) });

        if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

        return res.json(livro);
    }

    async atualizar(req: Request, res: Response) {
        const { id } = req.params;
        const dados = req.body;

        const livro = await LivroRepository.findOneBy({ id: Number(id) });
        if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

        LivroRepository.merge(livro, dados);
        await LivroRepository.save(livro);

        return res.json(livro);
    }

    async deletar(req: Request, res: Response) {
        const { id } = req.params;

        const livro = await LivroRepository.findOneBy({ id: Number(id) });
        if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

        await LivroRepository.remove(livro);
        return res.json({ mensagem: "Livro removido com sucesso" });
    }
}
