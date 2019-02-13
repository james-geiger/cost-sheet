parasails.registerPage('costsheet-list', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    costsheets: [],

    icons: {
      trash: 'trash',
      close: 'close'
    },

    selectedCostsheet: undefined,

    // Modals which aren't linkable:
    confirmDeleteCostsheetModalOpen: false,

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',


  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.costsheets = this._marshalEntries(this.costsheets);
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    _marshalEntries: function(entries) {
      // Marshal provided array of data and return the modified version.
      return _.map(entries, (entry)=>{

        entry.type = _.capitalize( entry.type );

        if( entry.offerStatus == 1 ){
          entry.offerStatus = "Initial"
        } else if ( entry.offerStatus == 2 ) {
          entry.offerStatus = "Counter"
        } else if ( entry.offerStatus == 3 ){
          entry.offerStatus = "Accepted"
        }

        return entry;
      });
    },

    clickDeleteCostsheet: function(costsheetId) {
      console.log(costsheetId);
      this.selectedCostsheet = _.find(this.costsheets, {id: costsheetId});

      // Open the modal.
      this.confirmDeleteCostsheetModalOpen = true;
    },

    closeDeleteCostsheetModal: function() {
      this.selectedCostsheet = undefined;
      this.confirmDeleteCostsheetModalOpen = false;
      this.cloudError = '';
    },

    handleParsingDeleteCostsheetForm: function() {
      return {
        id: this.selectedCostsheet.id
      };
    },

    submittedDeleteCostsheetForm: function() {

      // Remove the thing from the list
      _.remove(this.costsheets, {id: this.selectedCostsheet.id});

      // Close the modal.
      this.selectedCostsheet = undefined;
      this.confirmDeleteCostsheetModalOpen = false;
    },


  }
});
