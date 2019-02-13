/**
 * NetsheetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {


   friendlyName: 'Destroy one netsheet',


   description: 'Delete a netsheet that is no longer needed.',


   inputs: {

     id: {
       description: 'The id of the netsheet to destroy',
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

     var netheetToDestroy = await Netsheet.findOne({ id });

     // Ensure the thing still exists.
     if(!netsheetToDestroy) {
       throw 'notFound';
     }
     // Verify permissions.
     if(netsheetToDestroy.owner !== this.req.me.id) {
       throw 'forbidden';
     }

     // Archive the record.
     await Netsheet.archiveOne({ sid: netsheetToDestroy.sid });

   }

 };
