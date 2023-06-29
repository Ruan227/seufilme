const avaliacaoValidator = {
  filme: {
    required: "Campo Obrigatório!",
  },
  nome: {
    required: "Campo Obrigatório!",
    minLength: {
      value: 3,
      message: "Mínimo 3 caracteres!",
    },
    maxLength: {
      value: 100,
      message: "Máximo 100 caracteres!",
    },
    pattern: {
        value: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        message: "Digite letras!",
      },
  },
  avaliacao: {
    required: "Campo Obrigatório!",
  },
  comentario: {
    required: "Campo Obrigatório!",
    minLength: {
      value: 10,
      message: "Mínimo 10 caracteres!",
    },
    maxLength: {
      value: 200,
      message: "Máximo 200 caracteres!",
    },
  },
};

export default avaliacaoValidator;
