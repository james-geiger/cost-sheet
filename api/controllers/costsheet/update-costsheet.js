/**
 * CostsheetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: 'Update costsheet',


    description: 'Update an existing costsheet.',


    inputs: {
      sid: {
        type: 'string',
        description: 'The SID of the costsheet to update'
      },
      client: {
        type: 'string',
        description: 'The name of the client.'
      },
      address: {
        type: 'string'
      },
      offerStatus: {
        type: 'number'
      },
      closingDate: {
        type: 'number'
      },
      purchasePrice: {
        type: 'number'
      },
      county: {
        type: 'number'
      },
      downPaymentPercent: {
        type: 'number',
        allowNull: true
      },
      downPaymentFixed: {
        type: 'number',
        allowNull: true
      },
      earnestDeposit: {
        type: 'number'
      },
      loanType: {
        type: 'number'
      },
      interest: {
        type: 'number'
      },
      period: {
        type: 'number'
      },
      includeEscrow: {
        type: 'boolean'
      },
      propertyTax: {
        type: 'number'
      },
      insurance: {
        type: 'number'
      },
      associationDues: {
        type: 'number'
      },
      lenderPaid: {
        type: 'number'
      },
      sellerPaid: {
        type: 'number'
      },
      homeInspection: {
        type: 'number'
      },
      radonInspection: {
        type: 'number'
      },
      homeWarranty: {
        type: 'number'
      },
      brokerAdmin: {
        type: 'number'
      },
      originationFee: {
        type: 'number'
      },
      creditReport: {
        type: 'number'
      },
      appraisalFee: {
        type: 'number'
      },
      settlementFee: {
        type: 'number'
      },
      certifications: {
        type: 'number'
      },
      endorsements: {
        type: 'number'
      },
      recordingFee: {
        type: 'number'
      },
      plotPlan: {
        type: 'number'
      },
      pestInspection: {
        type: 'number'
      },
      insuranceImpoundMonths: {
        type: 'number'
      },
      taxImpoundMonths: {
        type: 'number'
      },
      borrowerCredit: {
        type: 'number'
      },
      borrowerDti: {
        type: 'number'
      },
      borrowerNumber: {
        type: 'number'
      },
      borrowerVaExempt: {
        type: 'boolean'
      },
      borrowerVaService: {
        type: 'number'
      },
      borrowerVaUsage: {
        type: 'number'
      }
    },

    exits: {

    success: {
      outputDescription: 'The newly updated `Costsheet`.',
      outputExample: {}
    },

    notFound: {
      responseType: 'notFound'
    },

    forbidden: {
      responseType: 'forbidden'
    },

  },

  fn: async function (inputs) {



    var updatedCostsheet = await Costsheet.updateOne({ sid: inputs.sid }).set({
      client: inputs.client,
      address: inputs.address,
      offerStatus: inputs.offerStatus,
      closingDate: inputs.closingDate,
      purchasePrice: inputs.purchasePrice,
      county: inputs.county,
      downPaymentPercent: inputs.downPaymentPercent,
      earnestDeposit: inputs.earnestDeposit,
      loanType: inputs.loanType,
      interest: inputs.interest,
      period: inputs.period,
      includeEscrow: inputs.includeEscrow,
      propertyTax: inputs.propertyTax,
      insurance: inputs.insurance,
      associationDues: inputs.associationDues,
      lenderPaid: inputs.lenderPaid,
      sellerPaid: inputs.sellerPaid,
      homeInspection: inputs.homeInspection,
      radonInspection: inputs.radonInspection,
      homeWarranty: inputs.homeWarranty,
      brokerAdmin: inputs.brokerAdmin,
      originationFee: inputs.originationFee,
      creditReport: inputs.creditReport,
      appraisalFee: inputs.appraisalFee,
      settlementFee: inputs.settlementFee,
      certifications: inputs.certifications,
      endorsements: inputs.endorsements,
      recordingFee: inputs.recordingFee,
      plotPlan: inputs.plotPlan,
      pestInspection: inputs.pestInspection,
      insuranceImpoundMonths: inputs.insuranceImpoundMonths,
      taxImpoundMonths: inputs.taxImpoundMonths,
      borrowerCredit: inputs.borrowerCredit,
      borrowerDti: inputs.borrowerDti,
      borrowerNumber: inputs.borrowerNumber,
      borrowerVaExempt: inputs.borrowerVaExempt,
      borrowerVaService: inputs.borrowerVaService,
      borrowerVaUsage: inputs.borrowerVaUsage
    });

    // Return the newly-created costsheet
    return (updatedCostsheet);

  }

};
