const express = require("express");

const routes = express.Router();
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();


//Criação filmes
routes.post("/filmes",async (req, res) => {
    try {
        const { titulo, anoLancamento, disponivel, atores } = req.body;

        const filme = await prisma.filme.create({
            data: {
                titulo,
                anoLancamento,
                disponivel,
            },
        });

        if (atores && atores.length > 0) {
            for (const atorId of atores) {
                await prisma.filmeAtor.create({
                    data: {
                        filmeId: filme.id,
                        atorId,
                    },
                });
            }
        }

        return res.status(201).json(filme);
    } catch (error) {
        console.error("Erro ao criar filme:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});

//Lista filmes
routes.get("/filmes", async (req, res) => {
    try {
        const filmes = await prisma.filme.findMany();
        return res.status(200).json(filmes);
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        return res.status(500).json({ error: "Erro ao buscar filmes" });
    }
});


//Editar filmes
routes.put("/editarFilmes", async (req, res) => {
    try {
        const { id, titulo, anoLancamento, disponivel, atores } = req.body;

        if (!id){
            return res.status(400).json("Id é obrigatório")
        }

        const filmeExiste = await prisma.filme.findUnique({where: {id} });

        if (!filmeExiste) {
            return res.status(404).json("Filme não encontrado")
        }

        const filme = await prisma.filme.update({
            where: {
                id,
            },
            data:{
                titulo,
                anoLancamento,
                disponivel,
                atores: {
                    set: atores 
                }
            },
            include: {
                atores: true 
            }
        });
        
        return res.status(200).json(filme);
    } catch (error) {
        console.error("Erro ao editar filme:", error);
        return res.status(500).json({ error: "Erro ao editar filme" });
    }
});

//Excluir filme
routes.delete("/deletarFilme/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const intId = parseInt(id);

        if (!intId){
            return res.status(400).json("Id é obrigatório")
        }

        const filmeExiste = await prisma.filme.findUnique({ where: { id: intId } });

        if (!filmeExiste) {
            return res.status(404).json("Filme não encontrado");
        }

        await prisma.filme.delete({ where: { id: intId } });
        return res.status(200).json("Filme deletado com sucesso");
    } catch (error) {
        console.error("Erro ao deletar filme:", error);
        return res.status(500).json({ error: "Erro ao deletar filme" });
    }
});


//Criação atores
routes.post("/atores", async (req, res) => {
    try {
        const { nome, dataNascimento, nacionalidade, filmes } = req.body;

        const ator = await prisma.ator.create({
            data: {
                nome,
                dataNascimento,
                nacionalidade,
            },
        });

        if (filmes && filmes.length > 0) {
            for (const filmeId of filmes) {
                await prisma.filmeAtor.create({
                    data: {
                        filmeId,
                        atorId: ator.id,
                    },
                });
            }
        }

        return res.status(201).json(ator);
    } catch (error) {
        console.error("Erro ao criar ator:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});

//Lista atores
routes.get("/atores", async (req, res) => {
    try {
        const atores = await prisma.ator.findMany();
        return res.status(200).json(atores);
    } catch (error) {
        console.error("Erro ao buscar atores:", error);
        return res.status(500).json({ error: "Erro ao buscar atores" });
    }
});

//Editar atores
routes.put("/editarAtores", async (req, res) => {
    try {
        const { nome, dataNascimento, nacionalidade, filmes } = req.body;

        if (!id){
            return res.status(400).json("Id é obrigatório")
        }

        const atorExiste = await prisma.ator.findUnique({where: {id} });

        if (!atorExiste) {
            return res.status(404).json("Ator não encontrado")
        }

        const ator = await prisma.ator.update({
            where: {
                id,
            },
            data:{
                nome,
                dataNascimento,
                nacionalidade,
                filmes: {
                    set: filmes 
                }
            },
            include: {
                filmes: true 
            }
        });
        
        return res.status(200).json(ator);
    } catch (error) {
        console.error("Erro ao editar Ator:", error);
        return res.status(500).json({ error: "Erro ao editar ator" });
    }
});

//Excluir ator
routes.delete("/deletarAtor/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const intId = parseInt(id);

        if (!intId){
            return res.status(400).json("Id é obrigatório")
        }

        const atorExiste = await prisma.ator.findUnique({ where: { id: intId } });

        if (!atorExiste) {
            return res.status(404).json("Ator não encontrado");
        }

        await prisma.ator.delete({ where: { id: intId } });
        return res.status(200).json("Ator deletado com sucesso");
    } catch (error) {
        console.error("Erro ao deletar ator:", error);
        return res.status(500).json({ error: "Erro ao deletar ator" });
    }
});

module.exports = routes;