const filmeValidator = {
    nome: {
      required: "Campo Obrigatório!",
      minLength: {
        value: 1,
        message: "Mínimo 1 caractere!",
      },
      maxLength: {
        value: 30,
        message: "Máximo 30 caracteres!",
      },
      pattern: {
        value: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        message: "É permitido somente letras!",
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
    generos: {
      required: "Campo Obrigatório!",
    },
    duracao: {
      required: "Campo Obrigatório!",
    },
  };
  
  export default filmeValidator;
  