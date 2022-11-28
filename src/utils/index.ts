const formatCnpj = (cnpj: string) => {
  const format = cnpj.replace('.', '')
  const format2 = format.replace('/', '')
  const format3 = format2.replace('-', '')
  const format4 = format3.replace('.', '')
  return format4
}

const formatCep = (cep: string) => {
  const format = cep.replace('.', '')
  const format2 = format.replace('-', '')
  return format2
}

export {
  formatCnpj,
  formatCep
}
