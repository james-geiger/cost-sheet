module.exports = {


  friendlyName: 'View new financed costsheet',


  description: 'Display "New financed costsheet" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/costsheet/financed/new-financed-costsheet'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
