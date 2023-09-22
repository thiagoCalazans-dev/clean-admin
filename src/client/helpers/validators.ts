export const normalizeCnpjNumber = (value: String | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const normalizeDate = (value: string) => {
  if (!value) return "";

  const numericValue = value.replace(/[\D]/g, ""); // Remove caracteres não numéricos

  const day = numericValue.slice(0, 2);
  const month = numericValue.slice(2, 4);
  const year = numericValue.slice(4, 8);

  let formattedValue = "";

  if (day) {
    formattedValue += day;
    if (day.length === 2) formattedValue += "/";
  }

  if (month) {
    formattedValue += month;
    if (month.length === 2) formattedValue += "/";
  }

  if (year) {
    formattedValue += year;
  }

  return formattedValue;
};

export function formatDateToBrazilianDateString(date: Date) {
  // Extrair os componentes de data (dia, mês e ano)
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0"); // Mês é base 0
  const ano = date.getFullYear();

  // Formatar a data como DD/MM/YYYY
  const FormatedDateString = `${dia}/${mes}/${ano}`;

  return FormatedDateString;
}

export function formatDateToInputDateString(date: Date) {
  // Extrair os componentes de data (dia, mês e ano)
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0"); // Mês é base 0
  const ano = date.getFullYear();

  // Formatar a data como DD/MM/YYYY
  const FormatedDateString = `${dia}-${mes}-${ano}`;

  return FormatedDateString;
}

export function formatBrDateToNewDateFormat(date: string) {
  // Separa os componentes da data
  const [dd, mm, yyyy] = date.split("/");

  // Converte os componentes da data para números
  let day = parseInt(dd);
  let month = parseInt(mm) - 1; // O mês começa em 0 no JavaScript
  let year = parseInt(yyyy);

  // Instancia um objeto Date com os componentes convertidos
  return new Date(year, month, day);
}

export const normalizeZipCode = (value: String | undefined) => {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
    .replace(/(-\d{3})(\d+?)/, "$1");
};
