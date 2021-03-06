/**
 * Costsheet.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    sid: {
      type: 'string',
      description: 'The short id for this resource'
    },

    client: {
      type: 'string',
      description: 'The name of the client associated with the cost sheet.',
      encrypt: true,
    },

    address: {
      type: 'string',
      description: 'The property address associated with the cost sheet.',
      example: '123 Oak St'
    },

    type: {
      type: 'string',
      description: 'The type of purchase; whether financed or cash.',
    },

    offerStatus: {
      type: 'number',
      description: 'The status of the purchase; whether 1 for initial, 2 for counter, or 3 for accepted',
    },

    closingDate: {
      type: 'number',
      description: 'The date of closing in UNIX epoch format.',
      example: 773366400
    },

    purchasePrice: {
      type: 'number',
      description: 'The contract purchase price of the property.',
      example: 250000,
    },

    county: {
      type: 'number',
      description: 'The county code; whether 1 for Douglas/Sarpy, 2 for all others.',
    },

    downPaymentPercent: {
      type: 'number',
      allowNull: true,
      description: 'If borrower will be placing a certain percent down, that value; otherwise null.',
    },

    downPaymentFixed: {
      type: 'number',
      allowNull: true,
      description: 'If borrower will be placing a certain fixed amount down, that value; otherwise null.',
    },

    earnestDeposit: {
      type: 'number',
      description: 'The contract earnest deposit.',
    },

    loanType: {
      type: 'number',
      description: 'The type of loan secured by the borrower; whether conventional, fha, or va.',
    },

    interest: {
      type: 'number',
      description: 'The borrower\'s interest rate as a percent.',
    },

    period: {
      type: 'number',
      description: 'The term of the loan in months.',
    },

    includeEscrow: {
      type: 'boolean',
      description: 'Whether to include tax and insurance escrows in monthly payment value.',
    },

    propertyTax: {
      type: 'number',
      description: 'Yearly property tax amount.',
    },

    insurance: {
      type: 'number',
      description: 'Yearly insurance amount.',
    },

    associationDues: {
      type: 'number',
      description: 'Yearly association dues.',
    },

    lenderPaid: {
      type: 'number',
      description: 'Lender paid costs, if any.',
    },

    sellerPaid: {
      type: 'number',
      description: 'Seller paid costs, if any.',
    },

    homeInspection: {
      type: 'number',
      description: 'Home inspection cost, if paid at closing.',
    },

    radonInspection: {
      type: 'number',
      description: 'Radon inspection cost, if paid at closing.',
    },

    homeWarranty: {
      type: 'number',
      description: 'Home warranty cost, if paid at closing.',
    },

    brokerAdmin: {
      type: 'number',
      description: 'The broker administration fee assessed at closing.',
    },

    originationFee: {
      type: 'number',
      description: 'The lender\'s origination fee assessed at closing.',
    },

    creditReport: {
      type: 'number',
      description: 'The fee for the borrwer\'s credit report.',
    },

    appraisalFee: {
      type: 'number',
      description: 'The fee for the borrwer\'s property appraisal.',
    },

    settlementFee: {
      type: 'number',
      description: 'The fee for the settlement fee assessed by the escrow closing agency.',
    },

    certifications: {
      type: 'number',
      description: 'The fee for any certifications, if any.',
    },

    endorsements: {
      type: 'number',
      description: 'The fee for any ALTA endorsements, if any.',
    },

    recordingFee: {
      type: 'number',
      description: 'The recording fee assessed by the county for deed recording.',
    },

    plotPlan: {
      type: 'number',
      description: 'The fee for the survey/plot plan, if any.',
    },

    pestInspection: {
      type: 'number',
      description: 'The pest inspection fee.',
    },

    insuranceImpoundMonths: {
      type: 'number',
      description: 'The number of months to hold back insurance.',
    },

    taxImpoundMonths: {
      type: 'number',
      description: 'The number of months to hold back property tax.',
    },

    borrowerCredit: {
      type: 'number',
      description: 'The borrower\'s credit ',
    },

    borrowerDti: {
      type: 'number',
      description: 'The borrower\'s debt-to-income ratio; whether 1 for [] or 2 for [].',
    },

    borrowerNumber: {
      type: 'number',
      description: 'The number of borrowers; whether 1 for One or 2 for Two or More.',
    },

    borrowerVaExempt: {
      type: 'boolean',
      description: 'If borrower is using a VA loan, whether or not they are exempt from the funding fee.'
    },

    borrowerVaService: {
      type: 'number',
      description: 'If borrower is using a VA loan, the type of service; whether 1 for General or 2 for Reserves. ',
    },

    borrowerVaUsage: {
      type: 'number',
      description: 'If borrower is using a VA loan, the number of times they\'ve used it previously; whether 1 for First usage, or 2 for Second or greater usages.',
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    owner: { model: 'User', description: 'The user who uploaded this item.' },

  },

};
