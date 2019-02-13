/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

module.exports.session = {

  /***************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ***************************************************************************/
  secret: '74e3ad53018f9b881f2689be0b8c62d7',
  adapter: 'connect-mongodb-session',
  url: 'mongodb://costSheetUser:rb3vTSm59RO5ibKy@cost-sheet-shard-00-00-npogj.gcp.mongodb.net:27017,cost-sheet-shard-00-01-npogj.gcp.mongodb.net:27017,cost-sheet-shard-00-02-npogj.gcp.mongodb.net:27017/costSheetDb?ssl=true&replicaSet=cost-sheet-shard-0&authSource=admin&retryWrites=true',


  /***************************************************************************
  *                                                                          *
  * Customize when built-in session support will be skipped.                 *
  *                                                                          *
  * (Useful for performance tuning; particularly to avoid wasting cycles on  *
  * session management when responding to simple requests for static assets, *
  * like images or stylesheets.)                                             *
  *                                                                          *
  * https://sailsjs.com/config/session                                       *
  *                                                                          *
  ***************************************************************************/
  // isSessionDisabled: function (req){
  //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
  // },

};
