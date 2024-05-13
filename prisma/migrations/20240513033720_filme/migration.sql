-- CreateTable
CREATE TABLE "Filme" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "anoLancamento" INTEGER NOT NULL,
    "disponivel" BOOLEAN NOT NULL,

    CONSTRAINT "Filme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ator" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "nacionalidade" TEXT NOT NULL,

    CONSTRAINT "Ator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FilmeAtores" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FilmeAtores_AB_unique" ON "_FilmeAtores"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmeAtores_B_index" ON "_FilmeAtores"("B");

-- AddForeignKey
ALTER TABLE "_FilmeAtores" ADD CONSTRAINT "_FilmeAtores_A_fkey" FOREIGN KEY ("A") REFERENCES "Ator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmeAtores" ADD CONSTRAINT "_FilmeAtores_B_fkey" FOREIGN KEY ("B") REFERENCES "Filme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
