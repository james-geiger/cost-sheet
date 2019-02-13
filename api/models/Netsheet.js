/**
 * Netsheet.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    sid:{
      type: 'string',
      description: 'The short id for this resource.'
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

    commissionPercent: {
      type: 'number'
    },

    firstMortgage: {
      type: 'number',
      defaultsTo: 0,
    },

    secondMortgage: {
      type: 'number',
      defaultsTo: 0,
    },

    thirdMortgage: {
      type: 'number',
      defaultsTo: 0,
    },

    propertyTax: {
      type: 'number',
      description: 'Yearly property tax amount.',
    },

    propertyTaxIsCurrent: {
      type: 'boolean'
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

    docStampTax: {
      type: 'number',
      description: 'The documentary stamp tax assessed by the state.',
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
