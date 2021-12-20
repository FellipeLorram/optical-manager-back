"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Index = require('../CreatePdf/Index'); var _Index2 = _interopRequireDefault(_Index);
var _pdfmake = require('../pdfmake/pdfmake'); var _pdfmake2 = _interopRequireDefault(_pdfmake);
var _vfs_fonts = require('../pdfmake/vfs_fonts'); var _vfs_fonts2 = _interopRequireDefault(_vfs_fonts);

_pdfmake2.default.vfs = _vfs_fonts2.default.pdfMake.vfs;

class PdfController {
  async index(req, res) {
    try {
      const dd = new (0, _Index2.default)(req.body);

      const pdfDoc = _pdfmake2.default.createPdf(dd.SellPdf());
      pdfDoc.getBase64((data) => {
        res.writeHead(200,
          {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename="${req.body.sellsInformation.clientName}.pdf"`,
          });

        const download = Buffer.from(data.toString('utf-8'), 'base64');
        return res.end(download);
      });
      return null;
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

exports. default = new PdfController();
