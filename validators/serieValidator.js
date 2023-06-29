const serieValidator = {
  nome: {
    required: "Campo Obrigatório!",
    minLength: {
      value: 2,
      message: "Mínimo 2 caracteres!",
    },
    maxLength: {
      value: 20,
      message: "Máximo 20 caracteres!",
    },
    pattern: {
      value: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      message: "Digite letras!",
    },
  },
  sinopse: {
    required: "Campo Obrigatório!",
    maxLength: {
      value: 300,
      message: "Máximo 300 caracteres!",
    },
  },
  faixaetaria: {
    required: "Campo Obrigatório!",
    minLength: {
      value: 1,
    },
    maxLength: {
      value: 2,
      message: "Máximo 2 caracteres!",
    },
  },
  temporadas: {
    required: "Campo Obrigatório!",
  },
};

export default serieValidator;
