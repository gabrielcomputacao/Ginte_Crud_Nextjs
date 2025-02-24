export const applyPhoneMask = (value: string) => {
  // Remover caracteres não numéricos
  const numericValue = value.replace(/\D/g, "");

  const limitedValue = numericValue.slice(0, 11);

  let maskedValue = "";

  if (limitedValue.length > 0) {
    maskedValue = `(${limitedValue.slice(0, 2)}`;

    if (limitedValue.length > 2) {
      maskedValue += `) ${limitedValue.slice(2, 7)}`;

      if (limitedValue.length > 7) {
        maskedValue += `-${limitedValue.slice(7, 11)}`;
      }
    }
  }

  return maskedValue;
};

export const applyBirthDate = (value: string) => {
  let valor = value.replace(/\D/g, "");

  if (valor.length > 8) {
    valor = valor.substring(0, 8);
  }

  let result = "";

  if (valor.length > 4) {
    result = valor.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1-$2-$3");
  } else if (valor.length > 2) {
    result = valor.replace(/(\d{2})(\d{0,2})/, "$1-$2");
  } else {
    result = valor;
  }

  return result;
};

export const formatPhone = (phone: string) => {
  return phone.replace(/[\s\(\)\-]/g, "");
};

export const invertedDateToEua = (value: string) => {
  let partData = value.split("-");

  let invertedDate = partData[2] + "-" + partData[1] + "-" + partData[0];

  return invertedDate;
};

export const invertedDateToBr = (value: string) => {
  let partData = value.split("-");

  let invertedDateBr = partData[2] + "-" + partData[1] + "-" + partData[0];

  return invertedDateBr;
};
