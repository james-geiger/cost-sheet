/**
 * NetsheetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const shortid = require('shortid')
module.exports = {
  friendlyName: 'Create netsheet',
  description: 'Create a new netsheet for a seller.',
  inputs: {

    client: {
      type: 'string',
      description: 'The name of the client associated with the cost sheet.',
    },

    address: {
      type: 'string',
      description: 'The property address associated with the cost sheet.',
    },

    offerStatus: {
      type: 'number',
      description: 'The status of the purchase; whether 1 for initial, 2 for counter, or 3 for accepted',
    },

    closingDate: {
      type: 'number',
      description: 'The date of closing in UNIX epoch format.',
    },

    purchasePrice: {
      type: 'number',
      description: 'The contract purchase price of the property.',
    },

    county: {
      type: 'number',
      description: 'The county code; whether 1 for Douglas/Sarpy, 2 for all others.',
    },

    propertyTax: {
      type: 'number',
      description: 'Yearly property tax amount.',
    },

    propertyTaxIsCurrent: {
      type: 'boolean'
    },

    commissionPercent: {
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
      type: 'number',
      description: 'Seller paid costs, if any.',
    },

    homeWarranty: {
      type: 'number',
      description: 'Home warranty cost, if paid at closing.',
    },

    brokerAdmin: {
      type: 'number',
      description: 'The broker administration fee assessed at closing.',
    },

    settlementFee: {
      type: 'number',
      description: 'The fee for the settlement fee assessed by the escrow closing agency.',
    },

    offerType: {
      type: 'number',
      description: 'The type of the offer, whether VA or otherwise.',
    },
  },

    exits: {

    success: {
      outputDescription: 'The newly created `Costsheet`.',
      outputExample: {}
    }

    },

    fn: async function ({ client, address, offerStatus, closingDate, purchasePrice, county, commissionPercent, propertyTax, propertyTaxIsCurrent, firstMortgage, secondMortgage, thirdMortgage, sellerPaid, homeWarranty, brokerAdmin, settlementFee }, exits) {
      var newNetsheet = await Netsheet.create({
        sid: shortid.generate(),
        client,
        address,
        offerStatus,
        closingDate,
        purchasePrice,
        county,
        propertyTax,
        propertyTaxIsCurrent,
        commissionPercent,
        firstMortgage,
        secondMortgage,
        thirdMortgage,
        sellerPaid,
        homeWarranty,
        brokerAdmin,
        settlementFee,
        owner: this.req.me.id
      }).fetch();


      // Return the newly-created costsheet
      return exits.success({
        newNetsheet
      });
  },

};
