/**
 * CostsheetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {


   friendlyName: 'Generate one costsheet',


   description: 'Generate a costsheet.',


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
       viewTemplatePath: 'pages/costsheet/generated'
     }

   },


   fn: async function ({ sid }) {

     if(!sid){
       throw 'notFound';
     }

     var costsheet = await Costsheet.findOne({ sid: sid }).decrypt().populate('owner');

     // Ensure the thing still exists.
     if(!costsheet) {
       throw 'notFound';
     }
     // Verify permissions.
     if(costsheet.owner.id !== this.req.me.id) {
       throw 'forbidden';
     }

     costsheet.brokerAdmin = ( costsheet.loanType == 3 ) ? 0 : costsheet.brokerAdmin;
     costsheet.pestInspection = ( costsheet.loanType == 3 ) ? 0 : costsheet.pestInspection;

     var values

     // Calculate!
     if(costsheet.type == 'financed'){
       values = await sails.helpers.financed(costsheet);
     } else if (costsheet.type == 'cash') {
       values = await sails.helpers.cash(costsheet);
     }


     // Respond with view.
     return {
       currentSection: 'costsheets',
       costsheet: costsheet,
       values: values
     };

   }

 };
