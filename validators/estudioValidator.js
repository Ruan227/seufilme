const filmeValidator = {
    nome: {
      required: "Campo Obrigatório!",
      minLength: {
        value: 2,
        message: "Mínimo 2 caracteres!",
      },
      maxLength: {
        value: 30,
        message: "Máximo 30 caracteres!",
      },
      pattern: {
        value: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        message: "Digite letras!",
      },
    },
    pais: {
      required: "Campo Obrigatório!",
      maxLength: {
        value: 20,
        message: "Máximo 20 caracteres!",
      },
    },
    descricao: {
      required: "Campo Obrigatório!",
      minLength: {
        value: 10,
      },
      maxLength: {
        value: 100,
        message: "Máximo 100 caracteres!",
      },
    },
    data: {
      required: "Campo Obrigatório!",
    },
  };
  
  export default filmeValidator;
  