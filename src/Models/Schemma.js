import mongoose from 'mongoose';

const ExamsSchemma = new mongoose.Schema({
  anaminese: { type: String, required: false, default: '' },

  oftOd: { type: String, required: false, default: '' },
  oftOe: { type: String, required: false, default: '' },

  tonoOd: { type: String, required: false, default: '' },
  tonoOe: { type: String, required: false, default: '' },

  motilidade: { type: String, required: false, default: '' },
  PPC: { type: String, required: false, default: '' },
  PPA: { type: String, required: false, default: '' },

  LsEsfOd: { type: String, required: false, default: '' },
  LsCilOd: { type: String, required: false, default: '' },
  LsEixoOd: { type: String, required: false, default: '' },

  LsEsfOe: { type: String, required: false, default: '' },
  LsCilOe: { type: String, required: false, default: '' },
  LsEixoOe: { type: String, required: false, default: '' },
  LsAdd: { type: String, required: false, default: '' },

  rxEsfOd: { type: String, required: false, default: '' },
  rxCilOd: { type: String, required: false, default: '' },
  rxEixoOd: { type: String, required: false, default: '' },

  rxEsfOe: { type: String, required: false, default: '' },
  rxCilOe: { type: String, required: false, default: '' },
  rxEixoOe: { type: String, required: false, default: '' },
  rxAdd: { type: String, required: false, default: '' },
  atendido: { type: String, required: false, default: '' },

  CriadoEm: { type: Date, default: Date.now },
});

const PaymentSchemma = new mongoose.Schema({
  type: { type: String, required: false, default: '' },
  value: { type: String, required: false, default: '' },
  receiveBy: { type: String, required: false, default: '' },
  PaidIn: { type: Date, default: Date.now },
});

const SellsSchemma = new mongoose.Schema({
  os: { type: String, required: false, default: '' },

  esfOd: { type: String, required: false, default: '' },
  cilOd: { type: String, required: false, default: '' },
  eixoOd: { type: String, required: false, default: '' },

  esfOe: { type: String, required: false, default: '' },
  cilOe: { type: String, required: false, default: '' },
  eixoOe: { type: String, required: false, default: '' },

  adicao: { type: String, required: false, default: '' },

  dnpOd: { type: String, required: false, default: '' },
  alturaOd: { type: String, required: false, default: '' },

  dnpOe: { type: String, required: false, default: '' },
  alturaOe: { type: String, required: false, default: '' },

  armacao: { type: String, krequired: false, default: '' },
  valorArm: { type: String, required: false, default: '' },

  lente: { type: String, required: false, default: '' },
  valorLen: { type: String, required: false, default: '' },

  lenteContato: { type: String, required: false, default: '' },
  valorLenContato: { type: String, required: false, default: '' },

  total: { type: String, required: false, default: '' },

  pago: { type: String, required: false, default: '' },
  entregue: { type: String, required: false, default: '' },

  resta: { type: String, required: false, default: '' },

  payment: [PaymentSchemma],
  CriadoEm: { type: Date, default: Date.now },
});

const ConcertsSchemma = new mongoose.Schema({
  tipo: { type: String, required: false, default: '' },
  valor: { type: String, required: false, default: false },
  pago: { type: Boolean, required: false, default: false },
  entregue: { type: Boolean, required: false, default: '' },
  CriadoEm: { type: Date, default: Date.now },
});

const ClientSchemma = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: String, required: false, default: '' },
  endereço: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  cpf: { type: String, required: false, default: '' },
  observacoes: { type: String, required: false, default: '' },
  emFila: { type: Boolean, required: false, default: false },

  sells: [SellsSchemma],
  exams: [ExamsSchemma],
  concerts: [ConcertsSchemma],

  CriadoEm: { type: Date, default: Date.now },
});

const SellersSchemma = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: String, required: false, default: '' },
  endereço: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  cpf: { type: String, required: false, default: '' },
  sells: { qtt: 0, agregateValue: 0 },
  observacoes: { type: String, required: false, default: '' },
});

const FramesSchemma = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: false, default: '' },
  ref: { type: String, required: false, default: '' },
  sexo: { type: String, required: false, default: '' },
});

const LensSchemma = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: false, default: '' },
  type: { type: String, required: false, default: '' },
});

const UserSchemma = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  adminPassword: { type: String, required: true },
  adminName: { type: String, required: true },
  clients: [ClientSchemma],
  sellers: [SellersSchemma],
  frames: [FramesSchemma],
  lens: [LensSchemma],
  CriadoEm: { type: Date, default: Date.now },
});

const UserModel = mongoose.model('User', UserSchemma);
export default UserModel;
