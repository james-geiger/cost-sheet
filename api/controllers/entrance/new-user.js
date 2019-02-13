module.exports = {


  friendlyName: 'Create new user',


  description: 'Administrator creation of a new user account.',


  extendedDescription:
`This creates a new user record in the database, and
(if emailing with Mailgun is enabled) sends an account verification email.

If a verification email is sent, the new user's account is put in an "unconfirmed" state
until they confirm they are using a legitimate email address (by clicking the link in
the account verification message.)`,


  inputs: {

    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    password: {
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },

    fullName:  {
      required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.',
    },

    organization: {
      required: true,
      type: 'string',
    }

  },


  exits: {

    success: {
      description: 'New user account was created successfully.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
      'parameters should have been validated/coerced _before_ they were sent.'
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function (inputs) {

    var newEmailAddress = inputs.emailAddress.toLowerCase();
    var password = ( !inputs.password ) ? await sails.helpers.strings.random() : inputs.password;
    var token = await sails.helpers.strings.random('url-friendly');

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newUserRecord = await User.create(_.extend({
      emailAddress: newEmailAddress,
      password: await sails.helpers.passwords.hashPassword(password),
      fullName: inputs.fullName,
      emailStatus: 'confirmed',
      organization: inputs.organization
    }, !inputs.password? {
      passwordResetToken: token,
      passwordResetTokenExpiresAt: Date.now() + sails.config.custom.accountCreationTokenTTL,
      }:{}))
    .intercept('E_UNIQUE', 'emailAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    // If billing feaures are enabled, save a new customer entry in the Stripe API.
    // Then persist the Stripe customer id in the database.
    if (sails.config.custom.enableBillingFeatures) {
      let stripeCustomerId = await sails.helpers.stripe.saveBillingInfo.with({
        emailAddress: newEmailAddress
      }).timeout(5000).retry();
      await User.updateOne(newUserRecord.id)
      .set({
        stripeCustomerId
      });
    }

    // Store the user's new id in their session.
    // this.req.session.userId = newUserRecord.id;

if(!inputs.password){
  // Send recovery email
  await sails.helpers.sendTemplateEmail.with({
    to: newUserRecord.emailAddress,
    subject: 'An account has been created for you!',
    template: 'email-new-account-password',
    templateData: {
      fullName: newUserRecord.fullName,
      token: token
    }
  });
} else {
  await sails.helpers.sendTemplateEmail.with({
    to: newUserRecord.emailAddress,
    subject: 'An account has been created for you!',
    template: 'email-new-account',
    templateData: {
      fullName: newUserRecord.fullName
    }
  });
}


  }

};
