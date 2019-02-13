parasails.registerPage('new-netsheet', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    newFormData: {
      client: '',
      address: '',
      offerStatus: 0,
      closingDate: undefined,
      purchasePrice: undefined,
      county: 0,
      commissionPercent: undefined,
      firstMortgage: undefined,
      secondMortgage: undefined,
      thirdMortgage: undefined,
      propertyTax: undefined,
      propertyTaxIsCurrent: true,
      sellerPaid: undefined,
      homeWarranty: undefined,
      brokerAdmin: 395.00,
      settlementFee: 300.00,
    },

    icons: {
            percent: 'percent',
            dollar: 'dollar',
            info: 'info'
        },

    formData: {},

    // A set of validation rules for our form.
    // > The form will not be submitted if these are invalid.
    formRules: {
      client: { required: true },
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',
  },

  components: {
    vuejsDatepicker
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.newFormData.brokerAdmin = this.me.defaultBrokerAdmin

  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    customFormatter: function(date) {
      this.newFormData.closingDate = moment(date).format('X');
      return moment(date).format('MM/DD/YYYY');
    },
    submittedNewNetsheetForm: function(result) {
      // Redirect to a different web page on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      // this.syncing = true;
      window.location = '/netsheet';
    },
  }
});
