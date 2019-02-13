module.exports = {


  friendlyName: 'View new',


  description: 'Display "New" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/costsheet/cash/new-cash-costsheet'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
