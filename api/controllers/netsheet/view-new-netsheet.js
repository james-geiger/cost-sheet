module.exports = {


  friendlyName: 'View new netsheet',


  description: 'Display "New netsheet" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/netsheet/new-netsheet'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
