export const validarDNI = (dni: string) => {
  const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;

  if (!dniRegex.test(dni)) {
    return false;
  }

  const lletresDNI = "TRWAGMYFPDXBNJZSQVHLCKE";
  const numero = parseInt(dni.slice(0, 8));
  console.log(`num: ${numero}`);
  const dc = dni.slice(-1);
  console.log(`dc: ${dc}`);
  const dcValidar = lletresDNI.charAt(numero % 23);

  if (dc !== dcValidar) {
    return false;
  }

  return true;
};

export const validarIBAN = (iban: string) => {
  iban = iban.replace(/\s+/g, "").toUpperCase();

  if (iban.length < 4 || iban.length > 34) {
    return false;
  }

  if (!/^[A-Z]{2}\d{2}[A-Z\d]+$/.test(iban)) {
    return false;
  }

  const ibanFormat = iban.slice(4) + iban.slice(0, 4);

  const ibanNum = [...ibanFormat]
    .map((char) => {
      return char.match(/[A-Z]/) ? char.charCodeAt(0) - 55 : char;
    })
    .join("");

  const mod97 = BigInt(ibanNum) % 97n;

  return mod97 === 1n;
};
