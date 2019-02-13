const titleInsuranceData      = require('../../data/titleInsurance.json');
const pmiConventional30       = require('../../data/pmiConventional30.json');
const pmiConventional15       = require('../../data/pmiConventional15.json');
const pmiFha30                = require('../../data/pmiFha30.json');
const pmiFha15                = require('../../data/pmiFha15.json');
const pmiAdjustments          = require('../../data/pmiAdjustments.json');
const vaFundingFeeData            = require('../../data/vaFundingFee.json');
const moment = require('moment')

module.exports = {


  friendlyName: 'Financed Calculation',


  description: 'This helper calculates the values for a financed buyers.',


  inputs: {
    costsheetObject: {
      type: 'ref'
    }
  },


  exits: {

    success: {
      description: 'Financed values.',
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
    var downPayment = ( data.downPaymentFixed !== null ) ? data.downPaymentFixed : ( ( data.downPaymentPercent / 100 ) * data.purchasePrice )
    var principal = ( data.purchasePrice - downPayment )
    var loanToValue = principal / data.purchasePrice
    let ltvBracket,
        pmiAdjustment;
    var pmi = 0,
        mip = 0,
        mipUpfront = 0;

    if ( data.loanType == 1 ) {

      if ( loanToValue >= .9501 ){
        ltvBracket                  = "97"
      } else if ( loanToValue >= .9001 && loanToValue < .9501 ){
        ltvBracket                  = "95"
      } else if ( loanToValue >= .8501 && loanToValue < .9001 ){
        ltvBracket                  = "90"
      } else if ( loanToValue >= .8001 && loanToValue < .8501 ){
        ltvBracket                  = "85"
      }
    } else if ( data.loanType == 2 ){

      // ╔══╗ ╔╔═╗
      // ╠═ ╠═╣╠═╣
      // ╝  ╝ ╚╩ ╩

      var fhaLoanAmountCode = ( principal < 625500.00 ) ? 1 : 2 ;
      var fhaPeriodCode = ( data.period > 241 ) ? 1 : 2 ;

      if ( fhaPeriodCode == 1 ) {
        ltvBracket = ( loanToValue >= .9501 ) ? "95" : "0";
      } else {
        if ( loanAmount == 1 ){
          ltvBracket = ( loanToValue >= .9001 ) ? "90" : "0";
        } else {
          if ( loanToValue >= .9001 ){
            ltvBracket                  = "90"
          } else if ( loanToValue >= .7801 && loanToValue < .9001 ){
            ltvBracket                  = "78"
          } else {
            ltvBracket                  = "0"
          }
        }
      }

      mipUpfront = ( principal * 0.0175 )
      principal += mipUpfront

    } else if ( data.loanType == 3 ) {

      // ╦  ╦╔═╗
      // ╚╗╔╝╠═╣
      //  ╚╝ ╩ ╩

      if ( loanToValue >= .9501 ){
        ltvBracket                  = "100"
      } else if ( loanToValue >= .9001 && loanToValue < .9501 ){
        ltvBracket                  = "95"
      } else if ( loanToValue < .9001 ){
        ltvBracket                  = "90"
      }

      var vaFundingFee = await sails.helpers.getObjects( vaFundingFeeData,'service', data.borrowerVaService );
      vaFundingFee = vaFundingFee[0].ltvRatios[ltvBracket][data.borrowerVaUsage];
      vaFundingFee = vaFundingFee * principal;
      vaFundingFee = ( data.borrowerVaExempt ) ? 0 : vaFundingFee
      principal += vaFundingFee;

    }


    //  ╔═╗╦╔╦╗╦
    //  ╠═╝║ ║ ║
    //  ╩  ╩ ╩ ╩
    var mortgagePayment = ( principal * ( ( ( ( data.interest / 100 ) / 12 )) * ( ( 1 + ( data.interest / 100 ) ) ** data.period ) ) / ( ( ( 1 + ( data.interest / 100 ) ) ** data.period ) - 1 ) )
    var associationFee = data.associationDues / 12;

    //  ╔═╗╔═╗╔═╗╦═╗╔═╗╗ ╔╔═╗
    //  ║╣ ╚═╗║  ╠╦╝║ ║║║║╚═╗
    //  ╚═╝╚═╝╚═╝╩╚═╚═╝╚╩╝╚═╝
    var taxEscrow = ( data.includeEscrow ) ? ( data.propertyTax / 12 ) : 0 ;
    var insuranceEscrow = ( data.includeEscrow ) ? ( data.insurance / 12 ) : 0;

    //  ╔═╗╔╦╗╦   ╦  ╔╦╗╦╔═╗
    //  ╠═╝║║║║  ╔╝  ║║║║╠═╝
    //  ╩  ╩ ╩╩  ╝   ╩ ╩╩╩
    if ( data.loanType == 1 && loanToValue > 0.80) {
      /** Base PMI Cost based on loan term, borrower credit, and loan-to-value **/
      if ( data.period > 241 ) {
        pmi = await sails.helpers.getObjects( pmiConventional30, 'creditBracket', data.borrowerCredit )
        pmi = pmi[0].ltvRatios[ltvBracket]
      } else {
        pmi = await sails.helpers.getObjects( pmiConventional15,'creditBracket', data.borrowerCredit )
        pmi = pmi[0].ltvRatios[ltvBracket]
      }

      /** Determine any PMI rate adjustments for borrower number **/
      if ( data.borrowerNumber == 2 ){
        var borrowerNumberAdjustment = await sails.helpers.getObjects( pmiAdjustments,'adjustmentType', 'borrowerNumber' );
        pmiAdjustment = borrowerNumberAdjustment[0].data[data.borrowerCredit - 1].ltvRatios[ltvBracket];
      }

      /** Determine any PMI rate adjustments for borrower debt-to-income ratio **/
      if ( data.borrowerDti == 2 ){
        var borrowerDtiAdjustment = await sails.helpers.getObjects( pmiAdjustments,'adjustmentType', 'borrowerDti' );
        pmiAdjustment = pmiAdjustment + borrowerDtiAdjustment[0].data[data.borrowerCredit - 1].ltvRatios[ltvBracket];
      }

      pmi += pmiAdjustment;
      pmi = ( ( pmi * principal ) / 12 )

    } else if ( data.loanType == 2 ) {
      if ( data.period > 241 ){
        mip = await sails.helpers.getObjects( pmiFha30, 'loanAmount', fhaLoanAmountCode )
        mip = mip[0].ltvRatios[ltvBracket]
      } else {
        mip = await sails.helpers.getObjects( pmiFha15, 'loanAmount', fhaLoanAmountCode )
        mip = mip[0].ltvRatios[ltvBracket]
      }

      mip = ( ( mip * principal ) / 12 )

    }

    //  ╔═╗╦═╗╔═╗╔═╗╔═╗╦╔╦╗╔═╗
    //  ╠═╝╠╦╝║╣ ╠═╝╠═╣║ ║║╚═╗
    //  ╩  ╩╚═╚═╝╩  ╩ ╩╩═╩╝╚═╝

    /** Interest **/
    var interestDaysOwed = moment.duration(monthEnd.diff(closingDate, 'days')).add(1)
    var interestPrepaid = ( ( ( data.interest / 100 ) / 365 ) * principal ) * interestDaysOwed

    /** Property Tax **/
    var taxRate = data.propertyTax / 365;
    var taxDaysOwed = yearEnd.diff(closingDate, 'days');
    var taxPrepaid = taxDaysOwed * taxRate


    /** Title Insurance **/
    var titleInsurance = await sails.helpers.getObjects(titleInsuranceData,'policyValue', ( Math.round( data.purchasePrice / 1000 ) * 1000 ) )
        titleInsurance = titleInsurance[0].cost / 2


    //  ╦╔╦╗╔═╗╔═╗╦ ╦╔╗╔╔╦╗╔═╗
    //  ║║║║╠═╝║ ║║ ║║║║ ║║╚═╗
    //  ╩╩ ╩╩  ╚═╝╚═╝╝╚╝═╩╝╚═╝

    /** Homeowner's Insurance **/
    var insuranceImpound = ( ( data.insurance / 12 ) * data.insuranceImpoundMonths )

    /** Property Tax **/
    var taxImpoundMonths = await sails.helpers.taxImpound( data.closingDate )
    var taxImpound = ( ( data.propertyTax / 12 ) * taxImpoundMonths );


    // totals
    var paymentTotal = mortgagePayment + taxEscrow + insuranceEscrow + pmi + mip + associationFee
    var closingCostTotal = ( data.originationFee + data.creditReport + data.appraisalFee + data.brokerAdmin + data.settlementFee + data.certifications + data.endorsements + data.recordingFee + data.plotPlan + data.homeInspection + data.radonInspection + data.pestInspection + data.homeWarranty + titleInsurance )
    var creditsTotal = ( data.earnestDeposit + data.lenderPaid + data.sellerPaid )
    var prepaidsTotal = data.insurance + interestPrepaid + insuranceImpound + taxPrepaid + taxImpound
    var cashToCloseTotal = downPayment + closingCostTotal + prepaidsTotal - creditsTotal

    return {
      principal,
      "closingCosts": { titleInsurance, mipUpfront, vaFundingFee, closingCostTotal },
      "prepaids": { interestPrepaid, insuranceImpound, taxPrepaid, taxImpound, taxDaysOwed, taxYearEnd, taxImpoundMonths, prepaidsTotal },
      "credits":{ creditsTotal },
      "cashToClose": { downPayment, closingCostTotal, prepaidsTotal, creditsTotal, cashToCloseTotal },
      "payment":{ mortgagePayment, taxEscrow, insuranceEscrow, pmi, mip, associationFee, paymentTotal }
    }
  }


};
//      ,taxYearEnd
