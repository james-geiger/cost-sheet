module.exports = {


  friendlyName: 'View list',


  description: 'Display "List" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/costsheet/list'
    }

  },


  fn: async function () {

    // Get the list of things this user can see.
    var costsheets = await Costsheet.find({
      // my costsheets
      owner: this.req.me.id
    })
    .populate('owner')
    .decrypt();

    // Respond with view.
    return {
      currentSection: 'costsheets',
      costsheets: costsheets,
    };

  }


};
