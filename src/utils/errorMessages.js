const errorMessages = {
  userName: {
    required: 'Поле "Имя" обязательно для заполнения',
    minLength: 'Минимальная длина имени должна быть не короче 2 символов',
    isCorrect: 'Имя может содержать буквы, пробелы и дефис',
    capitalLetter: 'Имя должно начинаться с большой буквы'
  },
  userEmail: {
    required: 'Поле "Email" обязательно для заполнения',
    isEmail: 'Введите валидный email'
  },
  userPassword: {
    required: 'Поле "Пароль" обязательно для заполнения'
  }
};

export default errorMessages;
    