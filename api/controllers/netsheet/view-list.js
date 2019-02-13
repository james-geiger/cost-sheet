module.exports = {


  friendlyName: 'View list',


  description: 'Display "List" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/netsheet/list'
    }

  },


  fn: async function () {
    // Get the list of things this user can see.
    var netsheets = await Netsheet.find({
      owner: this.req.me.id
    })
    .populate('owner')
    .decrypt();

    // Respond with view.
    return {

      currentSection: 'netsheets',
      netsheets: netsheets,
    };
  }


};
