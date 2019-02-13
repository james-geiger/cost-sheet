/**
 * CostsheetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: 'Update netsheet',


    description: 'Update an existing netsheet.',


    inputs: {
      sid: {
        type: 'string',
        description: 'The SID of the netsheet to update'
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
      propertyTax: {
        type: 'number',
        description: 'Yearly property tax amount.',
      },
      propertyTaxIsCurrent: {
        type: 'boolean'
      },
      purchasePrice: {
        type: 'number'
      },
      county: {
        type: 'number'
      },
      firstMortgage: {
        type: 'number'
      },
      secondMortgage: {
        type: 'number'
      },
      thirdMortgage: {
        type: 'number'
      },
      sellerPaid: {
        type: 'number'
      },
      homeWarranty: {
        type: 'number'
      },
      brokerAdmin: {
        type: 'number'
      },
      settlementFee: {
        type: 'number'
      },
      offerType: {
        type: 'number',
        description: 'The type of the offer, whether VA or otherwise.',
      },
    },

    exits: {

    success: {
      outputDescription: 'The newly updated `Netsheet`.',
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

    var updatedNetsheet = await Netsheet.updateOne({ sid: inputs.sid }).set({
      client: inputs.client,
      address: inputs.address,
      offerStatus: inputs.offerStatus,
      closingDate: inputs.closingDate,
      purchasePrice: inputs.purchasePrice,
      county: inputs.county,
      propertyTax: inputs.propertyTax,
      propertyTaxIsCurrent: inputs.propertyTaxIsCurrent,
      sellerPaid: inputs.sellerPaid,
      homeWarranty: inputs.homeWarranty,
      brokerAdmin: inputs.brokerAdmin,
      settlementFee: inputs.settlementFee,
    });

    // Return the newly-updated netsheet
    return (updatedNetsheet);

  }

};
