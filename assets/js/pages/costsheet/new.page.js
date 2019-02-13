parasails.registerPage('new', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    newFormData: {
      client: '',
      address: '',
      type: '',
      offerStatus: undefined,
      closingDate: undefined,
      purchasePrice: undefined,
      county: undefined,
      downPaymentPercent: undefined,
      downPaymentFixed: undefined,
      earnestDeposit: undefined,
      loanType: undefined,
      interest: undefined,
      period: undefined,
      includeEscrow: undefined,
      propertyTax: undefined,
      insurance: undefined,
      associationDues: undefined,
      lenderPaid: undefined,
      sellerPaid: undefined,
      homeInspection: undefined,
      radonInspection: undefined,
      homeWarranty: undefined,
      brokerAdmin: undefined,
      originationFee: undefined,
      creditReport: undefined,
      appraisalFee: undefined,
      settlementFee: undefined,
      certifications: undefined,
      endorsements: undefined,
      recordingFee: undefined,
      plotPlan: undefined,
      pestInspection: undefined,
      insuranceImpoundMonths: undefined,
      taxImpoundMonths: undefined,
      borrowerCredit: undefined,
      borrowerDti: undefined,
      borrowerNumber: undefined,
      borrowerVaService: undefined,
      borrowerVaUsage: undefined,

    },

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

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

    submittedUploadThingForm: function(result) {
      // Redirect to a different web page on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      // this.syncing = true;
      window.location = '/costsheet';
    },

  }
});
