const validators = {
    userName: {
        required: (value) => {
            return value === '';
        },
        minLength: (value) => {
            return value.length < 2;
        },
        isCorrect: (value) => {
            return !/^[A-Za-zа-яёА-ЯЁ-\s]+$/.test(value);
        },
        capitalLetter: (value) => {
            return !/^[A-ZА-ЯЁ]/.test(value);
        }
    },
    userEmail: {
        required: (value) => {
            return value === '';
        },
        isEmail: (value) => {
            return !/^\w+@\w+\.\w+$/.test(value);
        }
    },
    userPassword: {
        required: (value) => {
            return value === '';
        },
    }
};

export default validators;
