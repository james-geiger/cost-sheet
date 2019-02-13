const titleInsuranceData      = require('../../data/titleInsurance.json');

const moment = require('moment');

module.exports = {


  friendlyName: 'Seller Calculation',


  description: 'This helper calculates values for a seller net proceeds.',


  inputs: {
    netsheetObject: {
      type: 'ref'
    }
  },


  exits: {

    success: {
      description: 'Netsheet values.',
    },

  },


  fn: async function (inputs) {
    const data = inputs.netsheetObject

    var closingDate = moment.unix( data.closingDate )
    var yearEnd = moment(closingDate).endOf('year')

    /** Title Insurance **/
    var titleInsurance = await sails.helpers.getObjects(titleInsuranceData,'policyValue', ( Math.round( data.purchasePrice / 1000 ) * 1000 ) )
        titleInsurance = titleInsurance[0].cost / 2

    var mortgageTotal = data.firstMortgage + data.secondMortgage + data.thirdMortgage
    var docStampTax = ( data.purchasePrice / 1000 ) * 2.25
    var commission = data.purchasePrice * ( data.commissionPercent / 100 )


    /** Property Tax **/
    var taxRate = data.propertyTax / 365;
    var taxDaysOwed = yearEnd.diff(closingDate, 'days');
    var taxProration = taxDaysOwed * taxRate
    var propertyTaxDue = (data.propertyTaxIsCurrent) ? 0 : data.propertyTax;

    var totalDebits = mortgageTotal + propertyTaxDue + data.settlementFee + titleInsurance + docStampTax + data.brokerAdmin + commission + data.homeWarranty + data.sellerPaid
    var totalCredits = data.purchasePrice + taxProration
    var netProceeds = totalCredits - totalDebits

    return {mortgageTotal, docStampTax, titleInsurance, commission, totalDebits, taxProration, propertyTaxDue, totalCredits, netProceeds };
  }


};
