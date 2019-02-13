module.exports = {


  friendlyName: 'View edit netsheet',


  description: 'Display "Edit netsheet" page.',

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
      viewTemplatePath: 'pages/netsheet/edit-netsheet'
    }

  },


  fn: async function ({sid}) {

    if(!sid){
      throw 'notFound';
    }

    var netsheet = await Netsheet.findOne({ sid: sid }).decrypt();

    // Ensure the thing still exists.
    if(!netsheet) {
      throw 'notFound';
    }
    // Verify permissions.
    if(netsheet.owner !== this.req.me.id) {
      throw 'forbidden';
    }


    // Respond with view.
    return {
      currentSection: 'netsheets',
      editFormData: netsheet
    };


  }


};
