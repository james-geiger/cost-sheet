const titleInsuranceData      = require('../../data/titleInsurance.json');
const moment = require('moment')

module.exports = {


  friendlyName: 'Cash Calculation',


  description: 'This helper calculates values for cash buyers.',


  inputs: {
    costsheetObject: {
      type: 'ref'
    }
  },


  exits: {

    success: {
      description: 'Cash values.',
    },

  },


  fn: async function (inputs) {
    const data = inputs.costsheetObject

    // ╔╗ ╔═╗╔═╗╔═╗   ╦  ╦╔═╗╖  ╦ ╦╔═╗╔═╗
    // ╠╩╗╠═╣╚═╗║╣    ╚╗╔╝╠═╣║  ║ ║║╣ ╚═╗
    // ╚═╝╩ ╩╚═╝╚═╝    ╚╝ ╩ ╩╚═╛╚═╝╚═╝╚═╝
    var closingDate = moment.unix( data.closingDate )
    var monthEnd = moment(closingDate).endOf('month')
    var yearEnd = moment(closingDate).endOf('year')
    var taxYearEnd = yearEnd.format('MM/DD/YYYY')
    var cashPurchasePrice = data.purchasePrice


    //  ╔═╗╦═╗╔═╗╔═╗╔═╗╦╔╦╗╔═╗
    //  ╠═╝╠╦╝║╣ ╠═╝╠═╣║ ║║╚═╗
    //  ╩  ╩╚═╚═╝╩  ╩ ╩╩═╩╝╚═╝

    /** Property Tax **/
    var taxRate = data.propertyTax / 365;
    var taxDaysOwed = yearEnd.diff(closingDate, 'days');
    var taxPrepaid = taxDaysOwed * taxRate

    /** Title Insurance **/
    var titleInsurance = await sails.helpers.getObjects(titleInsuranceData,'policyValue', ( Math.round( data.purchasePrice / 1000 ) * 1000 ) )
        titleInsurance = titleInsurance[0].cost / 2


    // CALCULATE

    var closingCostTotal = ( data.appraisalFee + data.brokerAdmin + data.settlementFee + data.endorsements + data.recordingFee + data.plotPlan + data.homeInspection + data.radonInspection + data.pestInspection + data.homeWarranty + titleInsurance )
    var prepaidsTotal = taxPrepaid
    var creditsTotal = ( data.earnestDeposit + data.sellerPaid )
    var cashToCloseTotal = cashPurchasePrice + closingCostTotal + prepaidsTotal - creditsTotal

    return {
      "closingCosts": { titleInsurance, closingCostTotal },
      "prepaids": { taxPrepaid, taxDaysOwed, taxYearEnd, prepaidsTotal },
      "credits":{ creditsTotal },
      "cashToClose": { cashPurchasePrice, closingCostTotal, prepaidsTotal, creditsTotal, cashToCloseTotal },
      "payment": {}
    }

  }


};
