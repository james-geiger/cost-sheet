module.exports = {


  friendlyName: 'View edit',


  description: 'Display "Edit" page.',

  inputs: {

    sid: {
      description: 'The sid of the costsheet to generate',
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
      viewTemplatePath: 'pages/costsheet/financed/edit-financed-costsheet'
    }

  },


  fn: async function ({sid}) {

    if(!sid){
      throw 'notFound';
    }

    var costsheet = await Costsheet.findOne({ sid: sid }).decrypt();

    // Ensure the thing still exists.
    if(!costsheet) {
      throw 'notFound';
    }
    // Verify permissions.
    if(costsheet.owner !== this.req.me.id) {
      throw 'forbidden';
    }


    // Respond with view.
    return {
      currentSection: 'costsheets',
      editFormData: costsheet
    };

  }


};
