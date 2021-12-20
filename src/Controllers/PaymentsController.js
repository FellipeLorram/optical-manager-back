import Payments from '../Models/PaymentsModel';

class PaymentsController {
  async index(req, res) {
    try {
      const payment = await Payments.find(req.userId, req.params.clientid, req.params.sellid);
      if (!payment) return res.json([]);
      return res.json(payment);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async show(req, res) {
    try {
      const payment = await Payments
        .findOne(req.userId, req.params.clientid, req.params.sellid, req.params.paymentid);
      if (!payment) return res.json([]);
      return res.json(payment);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async store(req, res) {
    try {
      const newPayment = new Payments(req.body);
      await newPayment.register(req.userId, req.params.clientid, req.params.sellid);
      if (newPayment.errors.length > 0) return res.json({
        errors: newPayment.errors,
      });
      return res.json(newPayment.body);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async update(req, res) {
    try {
      if (!req.params.clientid) {
        return res.status(400).json({
          errors: ['ID inválido'],
        });
      }
      const payment = new Payments(req.body);
      await payment
        .findAndUpdate(req.userId, req.params.clientid, req.params.sellid, req.params.paymentid);
      return res.json(payment.body);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.clientid) {
        return res.status(400).json({
          errors: ['ID inválido'],
        });
      }

      await Payments
        .delete(req.userId, req.params.clientid, req.params.sellid, req.params.paymentid);

      return res.json(null);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

export default new PaymentsController();
