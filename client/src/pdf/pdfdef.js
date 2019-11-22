import localizeImage from './localizeImage';

const getDocDefinition = templateData => {
  return {
    pageMargins: [40, 60, 40, 60],
    header: {
      columns: [
        {
          image: localizeImage,
          fit: [100, 100],
          alignment: 'right',
          margin: [10, 10, 10, 10]
        }
      ]
    },
    footer: {
      columns: [
        {
          stack: [
            // second column consists of paragraphs
            'Localize a2z, First floor, scheme 114, part 1, main road, Indore – 452010 (MP)',
            'Email: info@localizea2z.com | www.localizea2z.com'
          ],
          style: 'footer',
          alignment: 'center'
        }
      ]
    },
    content: [
      {
        text: 'Purchase Order',
        alignment: 'center',
        style: 'header',
        marginBottom: 10
      },
      {
        style: 'tableExample',
        table: {
          body: [
            ['Created Date', templateData['createdOn']],
            ['PO Number', templateData['poNumber']]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          body: [
            ['Partner Name', templateData.vendorName],
            ['Email Id', templateData.vendorMailId]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          body: [
            ['Project Manager', templateData.localizePM],
            ['Project Name', templateData.projectName],
            ['Nature of Work', templateData.workType],
            ['Language', templateData.language],
            ['Word Count', templateData.wordCount],
            ['Project Cost', templateData.vendorCost],
            ['Currency', templateData.currency]
          ]
        }
      },
      { text: 'Sincerely', style: 'boldText', marginBottom: 20 },
      { text: 'Project Manager Name' },
      { text: templateData.localizePM, style: 'boldText', pageBreak: 'after' },

      { text: 'Terms & Conditions', style: 'subheader', alignment: 'center' },
      {
        fontSize: 8,
        ol: [
          {
            text:
              'If the project volume is confirmed, PO will be assigned within 24 hours of project assignment.',
            style: 'termsFont'
          },
          {
            text:
              'If the volume of work is not confirmed during assignment, then PO will be assigned with exact word count and amount to be billed, only upon project completion and acceptance from LOCALIZE A2Z and/or Client/End user. However, a PO number will be assigned at the time of project assignment.',
            style: 'termsFont'
          },
          {
            text:
              'All instructions given during project have to be adhered to until project completion and delivery.',
            style: 'termsFont'
          },

          {
            text:
              'In case of Translation projects, price is based on per English word.',
            style: 'termsFont'
          },
          {
            text: [
              {
                text: 'Non-disclosure of Information.',
                style: 'boldText',
                fontSize: 9
              },
              'Recipient: (a) agrees not to copy, disclose or transfer information which is received from the Discloser and which is identified as information, to any other party; (b) agrees not to announce or disclose to any third party; (I) its participation in these discussions to the extent the information concerns any unannounced products, technology, services, or business transactions.'
            ],
            style: 'termsFont'
          },
          {
            text: [
              {
                text: 'Confidential Information.',
                style: 'boldText',
                fontSize: 9
              },
              'The Discloser may, during the course of these discussions, reveal certain confidential, proprietary and/or trade secret information concerning products, technology and services, some of which may not have been announced and may have not be generally available. Recipient agrees not to use or exploit the information for any purpose.'
            ],
            style: 'termsFont'
          },

          {
            text:
              'The Vendor shall deliver or return all relevant materials, data, software, systems and information relating to the services to LOCALIZE A2Z at the time of such notice.',
            style: 'termsFont'
          },
          {
            text:
              'Any corrections, comments received from client should be implemented considering as a priority task and submit the updates, at no additional charge, if found to be incorrect.',
            style: 'termsFont'
          },
          {
            text:
              'Ensure Quality of 100%. Use correct meaning, Context, Industry standard terminology and ensure that there is no text that is missing translation.',
            style: 'termsFont'
          },

          {
            text:
              'The tense (present/past) and voice (active/passive) should be as per the original source file.',
            style: 'termsFont'
          },

          [
            {
              text: [
                'Vendor should check the work thoroughly before submission to LOCALIZE A2Z. LOCALIZE A2Z reserves the right of approval for the work submitted. LOCALIZE A2Z reserves the right to withhold payment if the work is not meeting the standard expectations that are set during project assignment and to offset penalty incurred against any loss, damage, liability or claim it may have against partner (including the cost of a third party engaged to perform non-conforming services) as a result any breach by partner of this PO, SOW or SLA, including when goods and services do not meet expected standards. \n\n',
                { text: 'Error Penalty:', style: 'boldText', fontSize: 9 }
              ],
              style: 'termsFont'
            },
            {
              ul: [
                'From 2 to 5 major errors – 15% deduction on value of assigned project',
                'From 5 to 10 major errors – 30% deduction on value of assigned project',
                'More than 10 major error – No payment will be made for the assigned project\n'
              ],
              fontSize: 8
            },
            {
              text: [
                { text: '\nNote:', style: 'boldText', fontSize: 9 },
                '10 minor errors will be equal to 1 major error that would fall under major category includes missing translation, additional translation, incorrect meaning, wrong interpretation of sentence, un-translated text, literal translation, non-usage of industry standard terminology, inconsistency, non-adherence to glossary/project instruction/regional or country standards, incorrect number and units and language error which drastically affect the meaning of the sentence. Errors that would fall under minor category include spell and grammar error, punctuation error and spacing error.'
              ],
              style: 'termsFont'
            }
          ],

          {
            text:
              'If the work assigned is found to be machine translated or translation, machine voice, transcription and other linguistics service project’s with poor or sub-standard quality, the same would not be accepted and LOCALIZE A2Z would not be liable to pay the amount.',
            style: 'termsFont'
          },
          [
            {
              text: 'Late Delivery Penalties:',
              style: 'boldText',
              fontSize: 9
            },
            {
              ul: [
                '1 hour & up to 3 hours after the agreed upon delivery timeline - 10% deduction on full project value.',
                'More than 3 & up to 5 hours after the agreed upon delivery timeline - 25% deduction on full project value.',
                'More than 5 hours & less than 10 hours after the agreed upon delivery timeline – 50% deduction on full project value.',
                '10 hours or more after the agreed upon delivery timeline – No payment will be made.\n'
              ]
            },
            '\n'
          ],
          {
            text:
              'All invoices must have pre-assigned PO number & PO Date/Invoice No. /Invoice Date/Project ID/ File Name/ Words/hrs./days Count/Rate/LOCALIZE A2Z address/Project Manager Name/Self Address/Self Signature/PAN NO. / BANK details. All invoices must be current dated only.',
            style: 'termsFont'
          },
          {
            text:
              'An additional PO must be requested for any work done in addition to that stated above.',
            style: 'termsFont'
          },
          {
            text: 'Payment mode: - Cheque/PayPal/Swift Transfer/Bank Transfer.',
            style: 'termsFont'
          },
          {
            text:
              "Payment will be done 45 days from the date of invoice submission, subject to client's approval on the quality of work delivered to LOCALIZE A2Z.",
            style: 'termsFont'
          },
          {
            text:
              'LOCALIZE A2Z PO remains valid for a period of 6 months and expires thereafter. Therefore, you must submit your invoice against a PO within 6 months from the date the service has been delivered and accepted by LOCALIZE A2Z client/end user to ensure payment.',
            style: 'termsFont'
          },
          {
            text:
              'LOCALIZE A2Z is not liable to pay with respect to invoices submitted after expiration of the PO.',
            style: 'termsFont'
          },
          {
            text:
              'If you do not accept the rates, delivery date or other conditions of this PO, contact us immediately.',
            style: 'termsFont'
          }
        ]
      },

      {
        text:
          '*The content of this document is the copyright of Localize a2z. It must not be used, re-published, distributed, copied or made available to any third party without the written approval of a Director of Localize a2z.',
        style: 'termsFont'
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      footer: {
        fontSize: 8,
        color: 'gray',
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 15],
        decoration: 'underline'
      },
      boldText: {
        bold: true
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      termsFont: {
        fontSize: 8,
        marginBottom: 6
      }
    },
    defaultStyle: {
      // alignment: 'justify'
    }
  };
};
export default getDocDefinition;
