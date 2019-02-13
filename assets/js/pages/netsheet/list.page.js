parasails.registerPage('netsheet-list', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    netsheets: [],

    icons: {
      trash: 'trash',
      close: 'close'
    },

    selectedNetsheet: undefined,

    // Modals which aren't linkable:
    confirmDeleteNetsheetModalOpen: false,

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
    this.netsheets = this._marshalEntries(this.netsheets);
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

        clickDeleteNetsheet: function(netsheetId) {
          this.selectedNetsheet = _.find(this.netsheets, {id: netsheetId});

          // Open the modal.
          this.confirmDeleteNetsheetModalOpen = true;
        },

        closeDeleteNetsheetModal: function() {
          this.selectedNetsheet = undefined;
          this.confirmDeleteNetsheetModalOpen = false;
          this.cloudError = '';
        },

        handleParsingDeleteNetsheetForm: function() {
          return {
            id: this.selectedNetsheet.id
          };
        },

        submittedDeleteNetsheetForm: function() {

          // Remove the thing from the list
          _.remove(this.netsheets, {id: this.selectedNetsheet.id});

          // Close the modal.
          this.selectedNetsheet = undefined;
          this.confirmDeleteNetsheetModalOpen = false;
        },
  }
});
