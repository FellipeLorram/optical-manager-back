export default class PDF {
  constructor(body) {
    this.opticaInformation = body.opticaInformation;
    this.sellsInformation = body.sellsInformation;
    this.clientInformation = body.clientInformation;
    this.examInformation = body.examInformation;
    this.errors = [];
    this.sell = null;
  }

  SellPdf() {
    return {
      content: [
        {
          columns: [
            [
              {
                text: this.opticaInformation.opticalName,
                color: '#333333',
                width: '*',
                fontSize: 28,
                bold: true,
                alignment: 'Left',
                margin: [0, 0, 0, 0],
              }],
            {
              stack: [
                {
                  columns: [
                    {
                      text: 'Código do serviço: ',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: this.sellsInformation.os,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Data',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: this.sellsInformation.CriadoEm,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
              ],
            },

          ],
        },
        '\n',
        {
          columns: [
            {
              layout: {
                defaultBorder: false,
                hLineWidth: function (i, node) {
                  return 1;
                },
                vLineWidth: function (i, node) {
                  return 1;
                },
                hLineColor: function (i, node) {
                  if (i === 1 || i === 0) {
                    return '#bfdde8';
                  }
                  return '#eaeaea';
                },
                vLineColor: function (i, node) {
                  return '#bfdde8';
                },
                hLineStyle: function (i, node) {
                  // if (i === 0 || i === node.table.body.length) {
                  return null;
                  //}
                },
                // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                paddingLeft: function (i, node) {
                  return 10;
                },
                paddingRight: function (i, node) {
                  return 10;
                },
                paddingTop: function (i, node) {
                  return 2;
                },
                paddingBottom: function (i, node) {
                  return 2;
                },
                fillColor: function (rowIndex, node, columnIndex) {
                  return '#fff';
                },
              },
              table: {
                headerRows: 1,
                widths: ['80%', '25%'],
                body: [
                  [
                    {
                      text: 'DESCRIÇÃO',
                      fillColor: '#eaf2f5',
                      alignment: 'right',
                      border: [true, true, false, true],
                      margin: [0, 5, 0, 5],
                      textTransform: 'uppercase',
                    },
                    {
                      text: '',
                      border: [false, true, true, true],
                      alignment: 'right',
                      fillColor: '#eaf2f5',
                      margin: [0, 5, 0, 5],
                      textTransform: 'uppercase',
                    },
                  ],
                  [
                    {
                      text: 'ARMAÇAO',
                      border: [false, false, false, true],
                      margin: [0, 5, 0, 5],
                      alignment: 'left',
                    },
                    {
                      border: [false, false, false, true],
                      text: this.sellsInformation.valorArm,
                      fillColor: '#f5f5f5',
                      alignment: 'right',
                      margin: [0, 5, 0, 5],
                    },
                  ],
                  [
                    {
                      text: 'LENTE',
                      border: [false, false, false, true],
                      margin: [0, 5, 0, 5],
                      alignment: 'left',
                    },
                    {
                      text: this.sellsInformation.valorLen,
                      border: [false, false, false, true],
                      fillColor: '#f5f5f5',
                      alignment: 'right',
                      margin: [0, 5, 0, 5],
                    },
                  ],
                  [
                    {
                      text: 'TOTAL',
                      border: [false, false, false, true],
                      margin: [0, 5, 0, 5],
                      alignment: 'left',
                    },
                    {
                      text: this.sellsInformation.total,
                      border: [false, false, false, true],
                      fillColor: '#f5f5f5',
                      alignment: 'right',
                      margin: [0, 5, 0, 5],
                    },
                  ],
                ],
              },
            },
            {
              layout: {
                defaultBorder: false,
                hLineWidth: function (i, node) {
                  return 1;
                },
                vLineWidth: function (i, node) {
                  return 1;
                },
                hLineColor: function (i, node) {
                  if (i === 1 || i === 0) {
                    return '#bfdde8';
                  }
                  return '#eaeaea';
                },
                vLineColor: function (i, node) {
                  return '#bfdde8';
                },
                hLineStyle: function (i, node) {
                  // if (i === 0 || i === node.table.body.length) {
                  return null;
                  //}
                },
                // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                paddingLeft: function (i, node) {
                  return 5;
                },
                paddingRight: function (i, node) {
                  return 10;
                },
                paddingTop: function (i, node) {
                  return 2;
                },
                paddingBottom: function (i, node) {
                  return 2;
                },
                fillColor: function (rowIndex, node, columnIndex) {
                  return '#fff';
                },
              },
              table: {
                headerRows: 1,
                widths: ['80%', '25%'],
                body: [
                  [
                    {
                      text: 'PAGAMENTO',
                      alignment: 'right',
                      fillColor: '#eaf2f5',
                      border: [true, true, false, true],
                      margin: [0, 5, 0, 5],
                      textTransform: 'uppercase',
                    },
                    {
                      text: '',
                      border: [false, true, true, true],
                      alignment: 'right',
                      fillColor: '#eaf2f5',
                      margin: [0, 5, 0, 5],
                      textTransform: 'uppercase',
                    },
                  ],
                  [
                    {
                      text: 'TOTAL',
                      border: [true, true, false, true],
                      alignment: 'left',
                      fillColor: '#fff',
                      margin: [0, 5, 0, 5],
                      textTransform: 'uppercase',
                    },
                    {
                      border: [false, false, true, true],
                      text: this.sellsInformation.total,
                      fillColor: '#f5f5f5',
                      alignment: 'right',
                      margin: [0, 5, 0, 5],
                    },
                  ],
                  [
                    {
                      text: 'PAGO',
                      border: [true, true, false, true],
                      alignment: 'left',
                      fillColor: '#fff',
                      margin: [0, 5, 0, 5],
                      textTransform: 'uppercase',
                    },
                    {
                      text: this.sellsInformation.pago,
                      border: [false, false, true, true],
                      fillColor: '#f5f5f5',
                      alignment: 'right',
                      margin: [0, 5, 0, 5],
                    },
                  ],
                  [
                    {
                      text: 'RESTA',
                      border: [true, true, false, true],
                      margin: [0, 5, 0, 5],
                      alignment: 'left',
                    },
                    {
                      text: this.sellsInformation.resta,
                      border: [false, false, true, true],
                      fillColor: '#f5f5f5',
                      alignment: 'right',
                      margin: [0, 5, 0, 5],
                    },
                  ],
                ],
              },
            }
          ],
        },
        '\n',
        '..................................................................................................................................................................',
        {
          columns: [
            [
              {
                text: this.opticaInformation.opticalName,
                color: '#333333',
                width: 200,
                fontSize: 20,
                bold: true,
                alignment: 'Left',
                margin: [0, 10, 0, 10],
              }],
            {
              stack: [
                {
                  margin: [0, 10, 0, 10],
                  columns: [
                    {
                      text: 'Cliente: ',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 10,
                      alignment: 'right',
                    },
                    {
                      text: this.clientInformation.clientName,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  margin: [0, 0, 0, 10],
                  columns: [
                    {
                      text: 'Telefone',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 10,
                      alignment: 'right',
                    },
                    {
                      text: this.clientInformation.telefone,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
              ],
            },
            {
              stack: [
                {
                  margin: [0, 10, 0, 10],
                  columns: [
                    {
                      text: 'OS: ',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 10,
                      alignment: 'right',
                    },
                    {
                      text: this.sellsInformation.os,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Data',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 10,
                      alignment: 'right',
                    },
                    {
                      text: this.sellsInformation.CriadoEm,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
              ],
            },

          ],
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'tableExample',
              color: '#444',
              table: {
                widths: [24, 40, 40, 40, 40, 40],
                heights: [1, 20, 20, 20],
                headerRows: 2,
                // keepWithHeaderRows: 1,
                body: [
                  [
                    { text: '', style: 'tableHeader', alignment: 'center' },
                    { text: 'ESF', style: 'tableHeader', alignment: 'center' },
                    { text: 'CIL', style: 'tableHeader', alignment: 'center' },
                    { text: 'EX', style: 'tableHeader', alignment: 'center' },
                    { text: 'DNP', style: 'tableHeader', alignment: 'center' },
                    { text: 'ALT', style: 'tableHeader', alignment: 'center' },
                  ],
                  ['OD', this.examInformation.esfOd, this.examInformation.cilOd, this.examInformation.eixoOd, this.examInformation.dnpOd, this.examInformation.alturaOd],
                  ['OE', this.examInformation.esfOe, this.examInformation.cilOe, this.examInformation.eixoOe, this.examInformation.dnpOe, this.examInformation.alturaOe],
                  [{ text: 'ADD', style: 'tableHeader', alignment: 'center' }, { text: this.examInformation.adicao, style: 'tableHeader', colSpan: 5, alignment: 'left' }, {}],

                ]
              }
            },
            {
              color: '#444',
              table: {
                widths: ['auto', 160],
                heights: [20, 50],

                // keepWithHeaderRows: 1,
                body: [
                  [
                    { text: 'ARMAÇÂO', style: 'tableHeader', alignment: 'center' },
                    { text: this.sellsInformation.armacao, style: 'tableHeader', alignment: 'left' },
                  ],
                  [
                    { text: 'LENTE', style: 'tableHeader', alignment: 'left' },
                    { text: this.sellsInformation.lente, style: 'tableHeader', alignment: 'left' },
                  ],
                ]
              }
            },
          ]
        },

      ],

      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [50, 0, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 15,
        //font: 'Quicksand',
      },
    };
  }
}
