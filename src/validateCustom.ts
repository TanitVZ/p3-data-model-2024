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
