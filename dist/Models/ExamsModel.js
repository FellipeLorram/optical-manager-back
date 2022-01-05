"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Schemma = require('./Schemma'); var _Schemma2 = _interopRequireDefault(_Schemma);

 class Exams {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.exam = null;
  }

  static async index(userId, clientId) {
    const user = await _Schemma2.default.findOne({ _id: userId, 'clients._id': clientId }, { 'clients.$': 1, _id: 0 });
    return user.clients[0].exams;
  }

  static async findLastExam(userId, clientId) {
    const exams = await Exams.index(userId, clientId);
    const lastExam = exams.sort((a, b) => b.CriadoEm - a.CriadoEm)[0];
    return lastExam;
  }

  static async getAllExams(userId) {
    const response = await _Schemma2.default.findOne({ _id: userId }, {
      'clients.exams': 1, 'clients.nome': 1, 'clients._id': 1, _id: 0,
    });

    if (response.length < 1) return null;

    let unformatExams = response.clients.filter((client) => client.exams.length > 0);

    unformatExams.forEach((clientExam) => {
      clientExam.exams.reverse();
    });

    unformatExams = unformatExams.map((unformatExam) => unformatExam.exams.map((s) => {
      const examObj = { nome: unformatExam.nome, _id: unformatExam._id, exam: s };
      return examObj;
    }));

    const exams = [];

    unformatExams.forEach((examArr) => examArr.forEach((exa) => exams.push(exa)));

    return exams.sort((a, b) => b.exam.CriadoEm - a.exam.CriadoEm);
  }

  static async LastExams(userId) {
    const response = await Exams.getAllExams(userId);

    if (response.length < 1) return null;
    if (response.length > 6) return response.slice(0, 6);
    return response;
  }

  async register(userId, clientId) {
    if (this.errors.length > 0) return;
    this.exam = await _Schemma2.default.updateOne({ _id: userId, 'clients._id': clientId }, {
      $push: {
        'clients.$.exams': this.body,
      },
    });
  }

  static async delete(userId, clientId, examId) {
    return await _Schemma2.default.updateOne({
      _id: userId,
      clients: {
        $elemMatch: {
          _id: clientId,
        },
      },
    }, { $pull: { 'clients.$.exams': { _id: examId } } });
  }

  static async find(userId, clientId, examId) {
    const exams = await _Schemma2.default.findOne({ _id: userId, 'clients._id': clientId }, { 'clients.$': 1, _id: 0 });
    return exams.clients[0].exams.filter((exam) => exam._id.toString() === examId);
  }

  async findAndUpdate(userId, clientId, examId) {
    return await _Schemma2.default.updateOne({
      _id: userId,
      clients: {
        $elemMatch: {
          _id: clientId, 'exams._id': examId,
        },
      },
    },
    {
      $set:
        {
          'clients.$.exams.$[inner].oftOd': this.body.oftOd,
          'clients.$.exams.$[inner].oftOe': this.body.oftOe,
          'clients.$.exams.$[inner].tonoOd': this.body.tonoOd,
          'clients.$.exams.$[inner].tonoOe': this.body.tonoOe,
          'clients.$.exams.$[inner].motilidade': this.body.motilidade,
          'clients.$.exams.$[inner].PPC': this.body.PPC,
          'clients.$.exams.$[inner].PPA': this.body.PPA,
          'clients.$.exams.$[inner].LsEsfOd': this.body.LsEsfOd,
          'clients.$.exams.$[inner].LsCilOd': this.body.LsCilOd,
          'clients.$.exams.$[inner].LsEixoOd': this.body.LsEixoOd,
          'clients.$.exams.$[inner].LsEsfOe': this.body.LsEsfOe,
          'clients.$.exams.$[inner].LsCilOe': this.body.LsCilOe,
          'clients.$.exams.$[inner].LsEixoOe': this.body.LsEixoOe,
          'clients.$.exams.$[inner].LsAdd': this.body.LsAdd,
          'clients.$.exams.$[inner].rxEsfOd': this.body.rxEsfOd,
          'clients.$.exams.$[inner].rxCilOd': this.body.rxCilOd,
          'clients.$.exams.$[inner].rxEixoOd': this.body.rxEixoOd,
          'clients.$.exams.$[inner].rxEsfOe': this.body.rxEsfOe,
          'clients.$.exams.$[inner].rxCilOe': this.body.rxCilOe,
          'clients.$.exams.$[inner].rxEixoOe': this.body.rxEixoOe,
          'clients.$.exams.$[inner].rxAdd': this.body.rxAdd,
          'clients.$.exams.$[inner].atendido': this.body.atendido,
        },
    },
    {
      arrayFilters: [
        { 'inner._id': examId },
      ],
    });
  }
} exports.default = Exams;
