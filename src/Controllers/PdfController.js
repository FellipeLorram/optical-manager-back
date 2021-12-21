import PDF from '../CreatePdf/Index';
import pdfMake from '../pdfmake/pdfmake';
import vfsFonts from '../pdfmake/vfs_fonts';

pdfMake.vfs = vfsFonts.pdfMake.vfs;

class PdfController {
  async index(req, res) {
    try {
      const dd = new PDF(req.body);

      const pdfDoc = pdfMake.createPdf(dd.pdf);
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
      return res.json([{
        error: e,
      }]);
    }
  }
}

export default new PdfController();
