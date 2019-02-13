module.exports = {


  friendlyName: 'View generated',


  description: 'Display a generated netsheet.',

  inputs: {

    sid: {
      description: 'The sid of the netsheet to generate',
      type: 'string'
    },

  },


  exits: {

    notFound: {
      description: 'The requested resource does not exist.',
      responseType: 'notFound'
    },

    forbidden: {
      description: 'The user does not have access to the requested resource.',
      responseType: 'forbidden'
    },

    success: {
      viewTemplatePath: 'pages/netsheet/generated'
    }

  },

  fn: async function ({ sid }) {

    // Ensure an id was provided to the route
    if(!sid){
      throw 'notFound';
    }

    // Lookup the requested netsheet
    var netsheet = await Netsheet.findOne({ sid: sid }).decrypt().populate('owner');

    // Ensure the thing still exists.
    if(!netsheet) {
      throw 'notFound';
    }

    // Verify permissions.
    if(netsheet.owner.id !== this.req.me.id) {
      throw 'forbidden';
    }

    // Calculate!
    var values = await sails.helpers.netsheet(netsheet);

    // Respond with view.
    return {
      currentSection: 'netsheets',
      netsheet: netsheet,
      values: values
    };

  }


};
