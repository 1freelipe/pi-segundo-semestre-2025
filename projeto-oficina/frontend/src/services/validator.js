import * as yup from 'yup';
import { cpf } from 'cpf-cnpj-validator';

const clienteSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),

  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),

  telefone: yup
    .string()
    .transform((value, originalValue) =>
      originalValue ? originalValue.replace(/[^\d]/g, '') : originalValue
    )
    .min(11, 'Telefone inválido'),

  cpf: yup
    .string()
    .required('O CPF é obrigatório')
    .transform((value, originalValue) =>
      originalValue ? originalValue.replace(/[^\d]/g, '') : originalValue
    )
    .min(11, 'O CPF deve ter 11 dígitos')
    .max(11, 'O CPF deve ter 11 dígitos')
    .test('is-cpf', 'CPF inválido', (value) => {
      if (!value) return false;
      return cpf.isValid(value);
    }),
});

export const clienteUpSchema = yup.object().shape({
  CLI_NOME: yup.string().required('O nome é obrigatório'),

  CLI_EMAIL: yup
    .string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),

  CLI_TELEFONE: yup
    .string()
    .transform((value, originalValue) =>
      originalValue ? originalValue.replace(/[^\d]/g, '') : originalValue
    )
    .min(11, 'Telefone inválido'),

  CLI_CPF: yup
    .string()
    .required('O CPF é obrigatório')
    .transform((value, originalValue) =>
      originalValue ? originalValue.replace(/[^\d]/g, '') : originalValue
    )
    .min(11, 'O CPF deve ter 11 dígitos')
    .max(11, 'O CPF deve ter 11 dígitos')
    .test('is-cpf', 'CPF inválido', (value) => {
      if (!value) return false;
      return cpf.isValid(value);
    }),
});

export const motosSchema = yup.object().shape({
  placa: yup
    .string()
    .required('A placa é obrigatória')
    .min(7, 'A placa deve conter 7 digítos')
    .max(7, 'A placa deve conter 7 dígitos'),

  modelo: yup.string().required('O modelo deve ser preenchido'),

  cpf: yup
    .string()
    .required('O CPF do cliente é obrigatório')
    .transform((value, originalValue) =>
      originalValue ? originalValue.replace(/[^\d]/g, '') : originalValue
    )
    .test('is-cpf', 'CPF inválido', (value) => {
      if (!value) return false;
      return cpf.isValid(value);
    }),
});

export const motosUpdateSchema = yup.object().shape({
  MOTO_PLACA: yup.string().required('A placa é obrigatória'),

  MODELO_NOME: yup.string().required('O modelo deve ser preenchido'),

  CLI_CPF: yup
    .string()
    .required('O CPF do cliente é obrigatório')
    .transform((value, originalValue) =>
      originalValue ? originalValue.replace(/[^\d]/g, '') : originalValue
    )
    .test('is-cpf', 'CPF inválido', (value) => {
      if (!value) return false;
      return cpf.isValid(value);
    }),

  MOTO_ANO: yup.string().nullable(),
  MARCA_NOME: yup.string().nullable(),
  COR_NOME: yup.string().nullable(),
  MOTO_OBSERVACAO: yup.string().nullable(),
  MOTO_ATIVO: yup.mixed().nullable(),
});

export const agendamentosSchema = yup.object().shape({
  placa: yup.string().required('A placa é obrigatória.'),

  funcionario: yup.string().required('O campo mecânico deve ser preenchido.'),

  cliente: yup
    .string()
    .required('O CPF do cliente é obrigatório.')
    .transform((value, originalValue) =>
      originalValue ? originalValue.replace(/[^\d]/g, '') : originalValue
    )
    .test('is-CPF', 'CPF inválido', (value) => {
      if (!value) return false;
      return cpf.isValid(value);
    }),
});

export const ordensSchema = yup.object().shape({
  placa: yup
    .string()
    .required('A placa da moto é obrigatória')
    .min(7, 'A placa deve conter 7 dígitos')
    .max(7, 'A placa deve conter 7 dígitos'),

  valor: yup.string().required('O valor da ordem é obrigatório.'),

  funcionario: yup
    .string()
    .required('O campo mecânico é obrigatório ser preenchido.'),

  cliente: yup
    .string()
    .required('O CPF do cliente é obrigatório.')
    .transform((value, originalValue) =>
      originalValue ? originalValue.replace(/[^\d]/g, '') : originalValue
    )
    .test('is-CPF', 'CPF inválido', (value) => {
      if (!value) return false;
      return cpf.isValid(value);
    }),
});

export const estoqueSchema = yup.object().shape({
  nome: yup.string().required('O nome da peça é obrigatório'),

  categoria: yup.string().required('A categoria é obrigatória'),

  quantidade: yup
    .number()
    .typeError('A quantidade deve ser um número válido.')
    .required('A quantidade de peças deve ser informada.')
    .min(1, 'A quantidade informada deve ser maior que 0'),

  preco_venda: yup.string().required('O preço de venda é obrigatório'),
});

export default clienteSchema;
