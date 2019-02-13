parasails.registerPage('new-cash-costsheet', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    newFormData: {
      client: '',
      address: '',
      type: 'cash',
      offerStatus: undefined,
      closingDate: undefined,
      purchasePrice: undefined,
      county: undefined,
      earnestDeposit: undefined,
      propertyTax: undefined,
      associationDues: undefined,
      sellerPaid: undefined,
      homeInspection: undefined,
      radonInspection: undefined,
      homeWarranty: undefined,
      brokerAdmin: 395.00,
      appraisalFee: 0.00,
      settlementFee: 300.00,
      certifications: 67.00,
      recordingFee: 12.00,
      plotPlan: 85.00,
      pestInspection: 85.00,

    },

    icons: {
      percent: 'percent',
      dollar: 'dollar',
      info: 'info'
    },

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

    handleParsingNewCostsheetForm: function() {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.newFormData;

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return _.omit(argins);
    },

    submittedNewCostsheetForm: function(result) {
      // Redirect to a different web page on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      // this.syncing = true;
      window.location = '/costsheet';
    },

  }
});
