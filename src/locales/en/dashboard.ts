export default {
  pagination: {
    perPage: 'Entries per page',
    showing: 'Showing',
    to: 'to',
    of: 'of',
    entries: 'entries'
  },
  sidebar: {
    label: 'Main Menu',
    operational: 'Operational',
    landingPage: 'Landing Page',
    analytics: 'Analytics',
    dashboard: 'Dashboard',
    events: 'Event Management',
    massData: 'Mass Data',
    councilMembers: 'Council Members',
    qrCheckin: 'QR & Check-in System',
    kta: 'Digital Membership Card (KTA)',
    councilActivityReports: 'Council Activity Reports',
    whatsAppBlasting: 'WhatsApp Blasting',
    socialMedia: 'Social Media',
    distributionMap: 'Distribution Map',
    logout: 'Logout'
  },
  navbar: {
    profile: 'Profile',
    settings: 'Settings'
  },
  logoutConfirm: {
    title: 'Confirm Logout',
    message: 'Are you sure you want to log out of your account?',
    cancel: 'Cancel',
    confirm: 'Log Out'
  },
  user: {
    response: {
      successCreateMsg: 'User created successfully!',
      failedCreateMsg: 'Failed to create user.',
      successUpdateMsg: 'User updated successfully!',
      failedUpdateMsg: 'Failed to update user.',
      successDeleteMsg: 'User deleted successfully!',
      failedDeleteMsg: 'Failed to delete user.'
    },
    validate: {
      nameRequired: 'Name is required.',
      nameMax: 'Name must not exceed 255 characters.',
      usernameRequired: 'Username is required.',
      usernameMax: 'Username must not exceed 20 characters.',
      emailFormat: 'Invalid email format.',
      passwordMinLength: 'Password must be at least 8 characters.',
      phoneNumberMax: 'Phone number must not exceed 20 characters.',
      confirmPasswordNotMatch: 'Passwords do not match.',
      nikMax: 'NIK must not exceed 16 characters.',
      placeOfBirthMax: 'Place of birth must not exceed 255 characters.',
      professionMax: 'Profession must not exceed 255 characters.',
      rtMax: 'RT must not exceed 3 characters.',
      rwMax: 'RW must not exceed 3 characters.',
      postalCodeMax: 'Postal code must not exceed 5 characters.'
    }
  },
  events: {
    title: 'Event Management',
    subtitle: 'Manage Golkar Party events and activities',
    createNew: 'Create New Event',
    searchPlaceholder: 'Search events...',
    searchCategoryPlaceholder: 'Search category...',
    allCategories: 'All Categories',
    status: {
      draft: 'Draft',
      published: 'Published',
      completed: 'Completed',
      cancelled: 'Cancelled'
    },
    summary: {
      totalEvents: 'Total Events',
      upcoming: 'Upcoming',
      totalParticipants: 'Total Participants',
      avgAttendance: 'Avg. Attendance'
    },
    deleteConfirm: {
      title: 'Delete Event',
      message: 'Are you sure you want to delete this event? This action cannot be undone.'
    },
    table: {
      title: 'Event List',
      subtitle: 'Manage and monitor all created events',
      emptyMessage: 'No events found.',
      event: 'Event',
      dateTime: 'Date & Time',
      location: 'Location',
      organizer: 'Organizer',
      participants: 'Participants',
      status: 'Status',
      actions: 'Actions'
    },
    detail: {
      title: 'Event Detail',
      subtitle: 'Detail information and event registration link.',
      dateLabel: 'Date',
      timeLabel: 'Time',
      locationLabel: 'Location',
      organizerLabel: 'Organizer',
      descriptionLabel: 'Full Description',
      registrationLink: {
        title: 'Registration Link',
        subtitle: 'Share this link with potential participants.',
        info: 'Click the button on the right to open the registration form.'
      },
      participantStatus: {
        title: 'Status Participants',
        registered: 'Registered',
        capacity: 'Capacity'
      }
    },
    form: {
      nameLabel: 'Event Name',
      namePlaceholder: 'Example: Regional Coordination Meeting',
      descriptionLabel: 'Event Description',
      descriptionPlaceholder: 'Describe the purpose and agenda of the event...',
      startDateLabel: 'Start Date',
      startTimeLabel: 'Start Time',
      endDateLabel: 'End Date',
      endTimeLabel: 'End Time',
      locationLabel: 'Location',
      locationPlaceholder: 'Search location or enter address...',
      organizerLabel: 'Organizer',
      organizerPlaceholder: 'DPD Jakarta Pusat',
      targetParticipantsLabel: 'Target Participants',
      targetParticipantsPlaceholder: 'Number of participants (e.g., 100)',
      categoryLabel: 'Event Category',
      categoryPlaceholder: 'Select Category',
      statusLabel: 'Initial Status',
      statusPlaceholder: 'Select Status',
      submitCreate: 'Save Event',
      submitUpdate: 'Update Event',
      backToList: 'Back to Event List',
      editTitle: 'Edit Event',
      createTitle: 'Create New Event',
      createSubtitle: 'Fill in the form below to add a new event.',
      editSubtitle: 'Update existing event information.'
    },
    validate: {
      categoryRequired: 'Category is required.',
      nameRequired: 'Event name is required.',
      nameMax: 'Event name must not exceed 255 characters.',
      descriptionRequired: 'Description is required.',
      organizerRequired: 'Organizer is required.',
      organizerMax: 'Organizer must not exceed 255 characters.',
      targetParticipantsRequired: 'Target participants is required.',
      targetParticipantsMin: 'Target participants must be at least 1.',
      startDateRequired: 'Start date is required.',
      startTimeRequired: 'Start time is required.',
      endDateRequired: 'End date is required.',
      endTimeRequired: 'End time is required.',
      locationRequired: 'Location is required.',
      locationMax: 'Location must not exceed 255 characters.',
      statusRequired: 'Status is required.'
    },
    response: {
      successCreateMsg: 'Event created successfully!',
      failedCreateMsg: 'Failed to create event.',
      successUpdateMsg: 'Event updated successfully!',
      failedUpdateMsg: 'Failed to update event.',
      successDeleteMsg: 'Event deleted successfully!',
      failedDeleteMsg: 'Failed to delete event.'
    }
  },
  participants: {
    title: 'Participant List',
    subtitle: 'List of all participants registered for this event.',
    emptyMessage: 'No participants found.',
    searchPlaceholder: 'Search name, NIK, or email...',
    code: 'Code',
    name: 'Name',
    nik: 'NIK',
    email: 'Email',
    whatsapp: 'WhatsApp',
    status: 'Status',
    registeredAt: 'Reg. At',
    statusLabel: {
      registered: 'Registered',
      attended: 'Attended'
    }
  }
}
