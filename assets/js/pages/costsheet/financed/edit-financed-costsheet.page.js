parasails.registerPage('edit-financed-costsheet', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    editFormData: {
      sid: '',
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
      borrowerVaExempt: undefined,
      borrowerVaService: undefined,
      borrowerVaUsage: undefined,
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

    formattedDate: undefined,
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
    this.formattedDate = moment.unix(this.editFormData.closingDate).toDate();

  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    customFormatter: function(date) {
      this.editFormData.closingDate = moment(date).format('X');
      return moment(date).format('MM/DD/YYYY');
    },

    handleParsingEditCostsheetForm: function() {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.editFormData;

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return _.omit(argins);
    },


    submittedEditCostsheetForm: function(result) {
      // Redirect to a different web page on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      // this.syncing = true;
      window.location = '/costsheet/generate?sid='+result.sid;
    },
  }
});
