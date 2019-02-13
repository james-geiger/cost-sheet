parasails.registerPage('new-financed-costsheet', {

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    newFormData: {
      client: '',
      address: '',
      type: 'financed',
      offerStatus: 0,
      closingDate: undefined,
      purchasePrice: undefined,
      county: 0,
      downPaymentPercent: undefined,
      downPaymentFixed: undefined,
      earnestDeposit: undefined,
      loanType: 0,
      interest: undefined,
      period: 0,
      includeEscrow: true,
      propertyTax: undefined,
      insurance: undefined,
      associationDues: undefined,
      lenderPaid: undefined,
      sellerPaid: undefined,
      homeInspection: undefined,
      radonInspection: undefined,
      homeWarranty: undefined,
      brokerAdmin: undefined,
      originationFee: 700.00,
      creditReport: 35.00,
      appraisalFee: 450.00,
      settlementFee: 500.00,
      certifications: 67.00,
      endorsements: 50.00,
      recordingFee: 150.00,
      plotPlan: 85.00,
      pestInspection: 85.00,
      insuranceImpoundMonths: 4,
      taxImpoundMonths: 0,
      borrowerCredit: 3,
      borrowerDti: 1,
      borrowerNumber: 2,
      borrowerVaExempt: false,
      borrowerVaService: 1,
      borrowerVaUsage: 1,
      type: "financed"
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
    //
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
      window.location = '/costsheet/generate?sid='+result.sid;
    },

  }
});
