import sinaisEmAcao from "@/assets/jogo-sinais-em-acao.jpg";
import quebraCabeca from "@/assets/jogo-quebra-cabeca.jpg";
import conversa from "@/assets/jogo-conversa.jpg";
import historias from "@/assets/jogo-historias.jpg";
import desafio from "@/assets/jogo-desafio.jpg";

export type Jogo = {
  numero: string;
  titulo: string;
  descricao: string;
  imagem: string;
  tom: "mint" | "lilac";
  tags: string[];
};

export const jogos: Jogo[] = [
  {
    numero: "01",
    titulo: "Sinais em Ação",
    descricao:
      "Jogo educativo que ensina Libras de forma divertida e interativa, com rodadas curtas para praticar todos os dias.",
    imagem: sinaisEmAcao,
    tom: "mint",
    tags: ["Alfabeto", "Iniciante"],
  },
  {
    numero: "02",
    titulo: "Quebra-Cabeça Libras",
    descricao:
      "Associação de sinais e imagens para ampliar o vocabulário em Libras, com níveis progressivos de dificuldade.",
    imagem: quebraCabeca,
    tom: "lilac",
    tags: ["Vocabulário", "Memória"],
  },
  {
    numero: "03",
    titulo: "Conversa em Libras",
    descricao:
      "Simulador de diálogo para praticar conversas do cotidiano em Libras: apresentar-se, pedir ajuda e combinar encontros.",
    imagem: conversa,
    tom: "mint",
    tags: ["Diálogo", "Cotidiano"],
  },
  {
    numero: "04",
    titulo: "Histórias que Conectam",
    descricao:
      "Histórias infantis contadas em Libras com atividades inclusivas para turmas de educação infantil.",
    imagem: historias,
    tom: "lilac",
    tags: ["Narrativa", "Infantil"],
  },
  {
    numero: "05",
    titulo: "Desafio dos Sinais",
    descricao:
      "Quiz interativo para testar e aprender sinais de forma desafiadora, com ranking e tempo cronometrado.",
    imagem: desafio,
    tom: "mint",
    tags: ["Quiz", "Avançado"],
  },
];
