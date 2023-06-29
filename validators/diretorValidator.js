const diretorValidator = {
  nome: {
    required: "Campo Obrigatório!",
    minLength: {
      value: 1,
      message: "Mínimo 1 caractere!",
    },
    maxLength: {
      value: 100,
      message: "Máximo 100 caracteres!",
    },
    pattern: {
      value: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      message: "É permitido somente letras!",
    },
  },
  estudio: {
    required: "Campo Obrigatório!",
  },
  datanascimento: {
    required: "Campo Obrigatório!",
  },
  filme: {
    required: "Campo Obrigatório!",
    maxLength: {
      value: 1,
    },
  },
};

export default diretorValidator;
