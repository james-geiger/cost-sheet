module.exports = {


  friendlyName: 'View dashboard/welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/view-dashboard',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function () {

    return {};

  }


};
