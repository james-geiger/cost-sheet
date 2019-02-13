/**
 * CostsheetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {


   friendlyName: 'Destroy one costsheet',


   description: 'Delete a costsheet that is no longer needed.',


   inputs: {

     id: {
       description: 'The id of the costsheet to destroy',
       type: 'string',
       required: true
     },

   },


   exits: {

     notFound: {
       responseType: 'notFound'
     },

     forbidden: {
       responseType: 'forbidden'
     },

   },


   fn: async function ({id}) {

     var costsheetToDestroy = await Costsheet.findOne({ id });

     // Ensure the thing still exists.
     if(!costsheetToDestroy) {
       throw 'notFound';
     }
     // Verify permissions.
     if(costsheetToDestroy.owner !== this.req.me.id) {
       throw 'forbidden';
     }

     // Archive the record.
     await Costsheet.archiveOne({ sid: costsheetToDestroy.sid });

   }

 };
