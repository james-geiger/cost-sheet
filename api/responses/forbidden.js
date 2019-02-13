/**
 * forbidden.js
 *
 * A custom response that content-negotiates the current request to either:
 *  • log out the current user and redirect them to the login page
 *  • or send back 400 (Forbidden) with no response body.
 *
 * Example usage:
 * ```
 *     return res.forbidden();
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       forbidden: {
 *         description: 'The user does not have access to the requested resource.',
 *         responseType: 'forbidden'
 *       }
 *     }
 * ```
 */
module.exports = function forbidden() {

  var req = this.req;
  var res = this.res;

  sails.log.verbose('Ran custom response: res.forbidden()');

  if (req.wantsJSON) {
    return res.sendStatus(400);
  }
  // Or log them out (if necessary) and then redirect to the login page.
  else {

    if (req.session.userId) {
      delete req.session.userId;
    }

    return res.redirect('/login');
  }

};
