module.exports = {


  friendlyName: 'View create',


  description: 'Display "Create" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/users/create'
    }

  },


  fn: async function () {

    var organizations = await Organization.find();

    // Respond with view.
    return {
      organizations: organizations
    };

  }


};
