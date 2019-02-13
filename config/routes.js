/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                              { action: 'view-homepage-or-redirect' },
  'GET /dashboard':                     { action: 'dashboard/view-dashboard' },

  'GET /faq':                           { view:   'pages/faq' },
  'GET /legal/terms':                   { view:   'pages/legal/terms' },
  'GET /legal/privacy':                 { view:   'pages/legal/privacy' },
  'GET /contact':                       { view:   'pages/contact' },

  'GET /signup':                        { action: 'entrance/view-signup' },
  'GET /email/confirm':                 { action: 'entrance/confirm-email' },
  'GET /email/confirmed':               { view:   'pages/entrance/confirmed-email' },

  'GET /login':                         { action: 'entrance/view-login', locals: { layout: 'layouts/login' } },
  'GET /password/forgot':               { action: 'entrance/view-forgot-password' },
  'GET /password/new':                  { action: 'entrance/view-new-password' },

  'GET /account':                       { action: 'account/view-account-overview' },
  'GET /account/password':              { action: 'account/view-edit-password' },
  'GET /account/profile':               { action: 'account/view-edit-profile' },

  'GET /costsheet':                     { action: 'costsheet/view-list' },
  'GET /costsheet/financed/:sid':       { action: 'costsheet/financed/edit-financed-costsheet'},
  'GET /costsheet/cash/:sid':           { action: 'costsheet/cash/edit-cash-costsheet'},
  'GET /costsheet/generate':            { action: 'costsheet/view-generated' },
  'GET /new-costsheet/financed':        { action: 'costsheet/financed/view-new-financed-costsheet' },
  'GET /new-costsheet/cash':            { action: 'costsheet/cash/view-new-cash-costsheet' },

  'GET /new-netsheet':                  { action: 'netsheet/view-new-netsheet' },
  'GET /netsheet':                      { action: 'netsheet/view-list' },
  'GET /netsheet/:sid':                 { action: 'netsheet/view-edit-netsheet' },
  'GET /netsheet/generate':             { action: 'netsheet/view-generated' },


  'GET /admin/users/create':            { action: 'admin/users/view-create' },



  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/terms':                             '/legal/terms',
  '/logout':                            '/api/v1/account/logout',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/account/logout':                                 { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':                  { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':                   { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':              { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                           { action: 'entrance/login' },
  //'POST  /api/v1/entrance/signup':                        { action: 'entrance/signup' },
  'POST  /api/v1/entrance/new-user':                        { action: 'entrance/new-user' },
  'POST  /api/v1/entrance/send-password-recovery-email':    { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':       { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':             { action: 'deliver-contact-form-message' },

  'POST  /api/v1/costsheet':                                { action: 'costsheet/new-costsheet' },
  'PUT /api/v1/costsheet':                                  { action: 'costsheet/update-costsheet'},
  'DELETE  /api/v1/costsheet/:id':                          { action: 'costsheet/destroy-one-costsheet' },

  'POST /api/v1/netsheet':                                  { action: 'netsheet/new-netsheet'},
  'PUT /api/v1/netsheet':                                  { action: 'netsheet/update-netsheet'},
  'DELETE  /api/v1/netsheet/:id':                          { action: 'netsheet/destroy-one-netsheet' },
};
