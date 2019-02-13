const moment = require('moment');

module.exports = {


  friendlyName: 'Tax impound',


  description: 'This helper provides the number of months to impound for property taxes given a closing date.',


  inputs: {
    closingDate: {
      description: 'The closing date in UNIX timestamp format.',
      example: 1544814574,
      type: 'number',
      required: true
    },
  },


  exits: {

    success: {
      description: 'Number of months to impound taxes.',
    },

  },


  fn: async function ({ closingDate }, exits) {

    const firstPaymentMonth = moment.unix(closingDate).endOf('month').add(2, 'months').month();

      const impoundMonths = ((date) => {
        switch(date){
          case 0:
            return 7
            break;
          case 1:
            return 8
            break;
          case 2:
            return 9
            break;
          case 3:
            return 4
            break;
          case 4:
            return 5
            break;
          case 5:
            return 6
            break;
          case 6:
            return 7
            break;
          case 7:
            return 2
            break;
          case 8:
            return 3
            break;
          case 9:
            return 4
            break;
          case 10:
            return 5
            break;
          case 11:
            return 6
            break;
        default:  null
      }})(firstPaymentMonth);


  return exits.success( impoundMonths );

}

}
