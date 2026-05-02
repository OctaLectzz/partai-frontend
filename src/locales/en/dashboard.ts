export default {
  overview: {
    welcome: 'Welcome back, {{name}}!',
    subtitle: "Here's a summary of your party management dashboard.",
    emptyState: 'No data available yet.',
    summary: {
      totalEvents: 'Total Events',
      totalMassa: 'Total Mass Data',
      totalCouncils: 'Council Members',
      totalKta: 'KTA Cards',
      totalReports: 'Activity Reports',
      approvedReports: 'Approved Reports'
    },
    quickActions: {
      title: 'Quick Actions',
      events: 'Event Management',
      eventsDesc: 'Create and manage party events and activities',
      massData: 'Mass Data',
      massDataDesc: 'Manage supporter and mass data records',
      council: 'Council Members',
      councilDesc: 'Manage council and legislative members',
      kta: 'KTA Digitalization',
      ktaDesc: 'Generate and manage digital membership cards',
      reports: 'Activity Reports',
      reportsDesc: 'View and manage council activity reports',
      map: 'Distribution Map',
      mapDesc: 'Visualize mass data distribution across regions'
    },
    recentEvents: {
      title: 'Recent Events',
      subtitle: 'Latest events created in the system'
    },
    recentReports: {
      title: 'Recent Reports',
      subtitle: 'Latest council activity reports'
    },
    distribution: {
      genderTitle: 'Gender Distribution',
      genderSubtitle: 'Mass data breakdown by gender',
      male: 'Male',
      female: 'Female',
      total: 'Total',
      eventStatusTitle: 'Event Status',
      eventStatusSubtitle: 'Event distribution by current status'
    },
    latestMembers: {
      ktaTitle: 'Latest KTA Members',
      ktaSubtitle: 'Recently registered membership cards',
      councilTitle: 'Latest Council Members',
      councilSubtitle: 'Recently added council members'
    },
    charts: {
      memberGrowthTitle: 'Member Growth Trend',
      memberGrowthSubtitle: 'Monthly registration trend over the last 6 months',
      massaLabel: 'Mass Data',
      ktaLabel: 'KTA Members',
      reportTypeTitle: 'Report Type Distribution',
      reportTypeSubtitle: 'Council activity reports breakdown by type',
      totalLabel: 'Total',
      eventParticipationTitle: 'Event Participation',
      eventParticipationSubtitle: 'Top events by participant registration',
      registeredLabel: 'Registered',
      targetLabel: 'Target',
      noEventData: 'No event participation data available.',
      ageDistributionTitle: 'Age Distribution',
      ageDistributionSubtitle: 'Mass data breakdown by age groups',
      ageGroups: {
        '17-25': '17-25',
        '26-35': '26-35',
        '36-45': '36-45',
        '46-55': '46-55',
        '56-65': '56-65',
        '65plus': '65+'
      },
      massaStatusTitle: 'Membership Status',
      massaStatusSubtitle: 'Active vs inactive mass data members',
      activeLabel: 'Active',
      inactiveLabel: 'Inactive'
    }
  },
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
    qrCheckin: 'QR System & Check-in',
    kta: 'KTA Digitalization',
    councilActivityReports: 'Council Activity Reports',
    whatsAppBlasting: 'WhatsApp Blasting',
    socialMedia: 'Social Media',
    distributionMap: 'Distribution Map',
    logout: 'Logout'
  },
  navbar: {
    profile: 'My Profile',
    settings: 'Settings'
  },
  logoutConfirm: {
    title: 'Confirm Logout',
    message: 'Are you sure you want to logout from your account?',
    cancel: 'Cancel',
    confirm: 'Logout'
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
      emailRequired: 'Email is required.',
      emailFormat: 'Invalid email format.',
      passwordMinLength: 'Password must be at least 8 characters.',
      phoneNumberRequired: 'Phone number is required.',
      phoneNumberMax: 'Phone number must not exceed 20 characters.',
      confirmPasswordNotMatch: 'Password confirmation does not match.',
      nikRequired: 'NIK is required.',
      nikLength: 'NIK must be exactly 16 characters.',
      nikMax: 'NIK must not exceed 16 characters.',
      dateOfBirthRequired: 'Date of birth is required.',
      genderRequired: 'Gender is required.',
      religionRequired: 'Religion is required.',
      maritalStatusRequired: 'Marital status is required.',
      educationRequired: 'Education is required.',
      professionRequired: 'Profession is required.',
      professionMax: 'Profession must not exceed 255 characters.',
      placeOfBirthMax: 'Place of birth must not exceed 255 characters.',
      rtRequired: 'RT is required.',
      rtMax: 'RT must not exceed 3 characters.',
      rwRequired: 'RW is required.',
      rwMax: 'RW must not exceed 3 characters.'
    }
  },
  events: {
    title: 'Event Management',
    subtitle: 'Manage Golkar Party events and activities',
    createNew: 'Add Event',
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
      subtitle: 'Detailed information and event registration link.',
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
        title: 'Participant Status',
        registered: 'Registered',
        capacity: 'Capacity'
      }
    },
    form: {
      createTitle: 'Create Event',
      createSubtitle: 'Fill in the form below to add a new event.',
      editTitle: 'Edit Event',
      editSubtitle: 'Update existing event information.',
      nameLabel: 'Event Name',
      namePlaceholder: 'Example: Regional Coordination Meeting',
      descriptionLabel: 'Event Description',
      descriptionPlaceholder: 'Explain purpose and agenda details...',
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
      submitUpdate: 'Update Event'
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
      failedDeleteMsg: 'Failed to delete event.',
      successRegisterMsg: 'Registration successful!',
      failedRegisterMsg: 'Failed to register.',
      successUpdateStatusMsg: 'Status updated successfully!',
      failedUpdateStatusMsg: 'Failed to update status.',
      successScanMsg: 'QR scan successful!',
      failedScanMsg: 'Failed to scan QR.',
      successDownloadTicketMsg: 'Ticket downloaded successfully.',
      failedDownloadTicketMsg: 'Failed to download ticket.'
    }
  },
  participants: {
    title: 'Participant List',
    subtitle: 'List of all participants registered for this event.',
    emptyMessage: 'No participants found.',
    searchPlaceholder: 'Search name...',
    code: 'Code',
    name: 'Name',
    nik: 'NIK',
    email: 'Email',
    whatsapp: 'WhatsApp',
    status: 'Status',
    registeredAt: 'Reg. Date',
    statusLabel: {
      registered: 'Registered',
      attended: 'Attended'
    },
    attendance: 'Attendance',
    notYet: 'Not Yet',
    actions: 'Actions'
  },
  massa: {
    title: 'Mass Data',
    subtitle: 'Manage support and party mass data',
    createNew: 'Add Mass Data',
    emptyMessage: 'No mass data found.',
    actions: 'Actions',
    searchPlaceholder: 'Search NIK or Name...',
    deleteConfirm: {
      title: 'Delete Mass Data',
      message: 'Are you sure you want to delete this data? This action cannot be undone.'
    },
    form: {
      createTitle: 'Add Mass Data',
      createSubtitle: 'Fill in the form below to add new mass support data.',
      editTitle: 'Edit Mass Data',
      editSubtitle: 'Update existing mass support information.',
      identitySection: 'Identity Data',
      addressSection: 'Complete Address',
      contactSection: 'Contact & Status',
      nikLabel: 'NIK',
      nikDescription: '16 digit National Identity Number',
      nikPlaceholder: 'Enter 16 digit NIK',
      fullNameLabel: 'Full Name',
      fullNameDescription: 'Full name according to ID card',
      fullNamePlaceholder: 'Enter full name',
      placeOfBirthPlaceholder: 'Example: Jakarta',
      phoneNumberPlaceholder: 'Active WhatsApp Number',
      phoneNumberDescription: 'Use active WhatsApp number.',
      emailPlaceholder: 'Example: budi@gmail.com',
      addressPlaceholder: 'Merdeka St. No. 123...',
      addressDescription: 'Include street name and house number.',
      rtPlaceholder: '001',
      rwPlaceholder: '002',
      postalCodePlaceholder: '12345',
      placeOfBirthLabel: 'Place of Birth',
      dateOfBirthLabel: 'Date of Birth',
      professionLabel: 'Profession',
      professionPlaceholder: 'Example: Private Employee',
      phoneNumberLabel: 'Phone Number',
      emailLabel: 'Email',
      notesLabel: 'Notes',
      notesPlaceholder: 'Add notes if necessary...',
      statusLabel: 'Membership Status',
      statusPlaceholder: 'Select Status',
      submitCreate: 'Add Mass Data',
      submitUpdate: 'Save Changes',
      formFooter: 'Ensure all entered data is correct and matches official identity documents.'
    },
    validate: {
      nikRequired: 'NIK is required.',
      nikLength: 'NIK must be 16 characters.',
      fullNameRequired: 'Full name is required.',
      fullNameMax: 'Full name must not exceed 255 characters.',
      genderRequired: 'Gender must be selected.',
      dateOfBirthRequired: 'Date of birth is required.',
      phoneNumberRequired: 'Phone number is required.',
      emailFormat: 'Invalid email format.',
      addressRequired: 'Address is required.',
      rtRequired: 'RT is required.',
      rwRequired: 'RW is required.',
      provinceRequired: 'Province is required.',
      regencyRequired: 'Regency is required.',
      districtRequired: 'District is required.',
      villageRequired: 'Village is required.',
      postalCodeRequired: 'Postal code is required.'
    },
    response: {
      successCreateMsg: 'Mass data created successfully!',
      failedCreateMsg: 'Failed to create mass data.',
      successUpdateMsg: 'Mass data updated successfully!',
      failedUpdateMsg: 'Failed to update mass data.',
      successDeleteMsg: 'Mass data deleted successfully!',
      failedDeleteMsg: 'Failed to delete mass data.'
    },
    detail: {
      title: 'Mass Data Detail',
      subtitle: 'Complete profile and mass contact information.',
      personalInfo: 'Personal Information',
      addressInfo: 'Address Information',
      geographicInfo: 'Geographic Location',
      editData: 'Edit Data'
    }
  },
  council: {
    title: 'Council Members',
    subtitle: 'Manage council and legislative member data',
    createNew: 'Add Council Member',
    emptyMessage: 'No council member data found.',
    actions: 'Actions',
    searchPlaceholder: 'Search NIK or Name...',
    deleteConfirm: {
      title: 'Delete Council Member',
      message: 'Are you sure you want to delete this data? This action cannot be undone.'
    },
    form: {
      createTitle: 'Add Council Member',
      createSubtitle: 'Fill in the form below to add a new council member.',
      editTitle: 'Edit Council Member',
      editSubtitle: 'Update existing council member information.',
      identitySection: 'Identity Data',
      addressSection: 'Complete Address',
      contactSection: 'Contact & Status',
      biodataSection: 'Biodata Data',
      nikLabel: 'NIK',
      ktaNumberLabel: 'KTA Number',
      nameLabel: 'Full Name',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm Password',
      phoneNumberLabel: 'Phone Number',
      placeOfBirthLabel: 'Place of Birth',
      dateOfBirthLabel: 'Date of Birth',
      religionLabel: 'Religion',
      maritalStatusLabel: 'Marital Status',
      educationLabel: 'Education',
      professionLabel: 'Profession',
      ktpPhotoLabel: 'ID Photo (KTP)',
      submitCreate: 'Save Council Member',
      submitUpdate: 'Save Changes',
      nikPlaceholder: 'Enter 16 digit ID number',
      ktaNumberPlaceholder: 'Enter KTA number',
      namePlaceholder: 'Full name according to ID',
      emailPlaceholder: 'email@example.com',
      passwordPlaceholder: 'Minimum 8 characters',
      confirmPasswordPlaceholder: 'Repeat password',
      phoneNumberPlaceholder: 'Active WhatsApp Number',
      placeOfBirthPlaceholder: 'Example: Jakarta',
      professionPlaceholder: 'Current profession',
      addressPlaceholder: 'Complete address...',
      postalCodePlaceholder: '5 digit postal code',
      religion: {
        islam: 'Islam',
        christian: 'Christian',
        catholic: 'Catholic',
        hindu: 'Hindu',
        buddhist: 'Buddhist',
        confucian: 'Confucian'
      },
      maritalStatus: {
        single: 'Single',
        married: 'Married',
        divorced: 'Divorced',
        widowed: 'Widowed'
      },
      education: {
        high_school: 'High School / Equivalent',
        associate_degree: "Associate's Degree (D3)",
        bachelors_degree: "Bachelor's Degree (S1)",
        masters_degree: "Master's Degree (S2)",
        doctorate: 'Doctorate (S3)'
      }
    },
    validate: {
      nikRequired: 'NIK is required.',
      nikLength: 'NIK must be 16 characters.',
      nameRequired: 'Full name is required.',
      phoneNumberRequired: 'Phone number is required.',
      emailFormat: 'Invalid email format.'
    },
    response: {
      successCreateMsg: 'Council member created successfully!',
      failedCreateMsg: 'Failed to create council member.',
      successUpdateMsg: 'Council member updated successfully!',
      failedUpdateMsg: 'Failed to update council member.',
      successDeleteMsg: 'Council member deleted successfully!',
      failedDeleteMsg: 'Failed to delete council member.'
    },
    detail: {
      title: 'Council Member Detail',
      subtitle: 'Complete profile and council member information.',
      personalInfo: 'Personal Information',
      biodataInfo: 'Biodata Information',
      addressInfo: 'Address Information',
      contactInfo: 'Contact Information',
      editData: 'Edit Data'
    }
  },
  kta: {
    title: 'KTA Digitalization',
    subtitle: 'Manage digital membership cards for members.',
    createNew: 'Create New KTA',
    searchPlaceholder: 'Search name or NIK...',
    actions: 'Actions',
    deleteConfirm: {
      title: 'Delete KTA',
      message: 'Are you sure you want to delete this KTA data? This action cannot be undone.'
    },
    form: {
      createTitle: 'Create Digital KTA',
      createSubtitle: 'Fill in the form below to generate a new digital KTA.',
      editTitle: 'Edit KTA Data',
      editSubtitle: 'Update existing KTA data information.',
      identitySection: 'Identity Data',
      addressSection: 'Complete Address',
      nikLabel: 'NIK',
      nameLabel: 'Full Name',
      placeOfBirthLabel: 'Place of Birth',
      dateOfBirthLabel: 'Date of Birth',
      phoneNumberLabel: 'Phone Number',
      positionLabel: 'Position',
      submitCreate: 'Save KTA Data',
      submitUpdate: 'Save Changes',
      nikPlaceholder: 'Enter 16 digit ID number',
      namePlaceholder: 'Full name according to ID',
      phoneNumberPlaceholder: 'Active WhatsApp Number',
      placeOfBirthPlaceholder: 'Example: Jakarta',
      positionPlaceholder: 'Position in the party',
      addressPlaceholder: 'Complete address...',
      rtPlaceholder: '001',
      rwPlaceholder: '002',
      postalCodePlaceholder: '5 digit postal code',
      previewHint: 'The card preview on the side is automatically updated as you fill in the data in the form.',
      ktaNumberNote:
        'The KTA number displayed is a format sample. The official KTA number will be issued automatically after the registration is processed.'
    },
    validate: {
      nikRequired: 'NIK is required.',
      nikLength: 'NIK must be 16 characters.',
      nameRequired: 'Full name is required.',
      phoneNumberRequired: 'Phone number is required.',
      dateOfBirthRequired: 'Date of birth is required.',
      placeOfBirthRequired: 'Place of birth is required.',
      genderRequired: 'Gender is required.',
      positionRequired: 'Position is required.',
      photoRequired: 'Photo is required.'
    },
    response: {
      successCreateMsg: 'KTA data added successfully!',
      failedCreateMsg: 'Failed to add KTA data.',
      successUpdateMsg: 'KTA data updated successfully!',
      failedUpdateMsg: 'Failed to update KTA data.',
      successDeleteMsg: 'KTA data deleted successfully!',
      failedDeleteMsg: 'Failed to delete KTA data.',
      successExportImage: 'KTA images downloaded successfully.',
      failedExportImage: 'Failed to download KTA images.',
      successExportPdf: 'KTA PDF downloaded successfully.',
      failedExportPdf: 'Failed to download KTA PDF.'
    },
    detail: {
      title: 'KTA Digitalization',
      subtitle: 'Preview and download your digital membership card.',
      personalInfo: 'Personal Information',
      addressInfo: 'Address Information',
      editData: 'Edit Data',
      saveAsImage: 'Save as Image',
      saveAsPdf: 'Download PDF',
      readyTitle: 'Your Card is Ready!',
      readyDescription:
        'Your digital KTA has been successfully created. You can save it to your phone or print it as official proof of Golkar Party membership.'
    },
    selector: {
      title: 'Select from Council Members',
      searchPlaceholder: 'Search council member name or NIK...'
    },
    card: {
      back: {
        termsTitle: 'MEMBER TERMS & CONDITIONS',
        term1: 'This card is valid proof of Golkar Party membership.',
        term2: 'Members must uphold the party ideology and AD/ART.',
        term3: 'Misuse of this card is subject to organizational sanctions.',
        term4: 'If found, please return to the nearest secretariat office.'
      }
    }
  },
  distributionMap: {
    title: 'Distribution Map',
    subtitle: 'Visualization of mass data distribution across regions',
    summary: {
      totalMassa: 'Total Massa',
      visibleOnMap: 'Visible on Map',
      provincesCovered: 'Provinces Covered',
      totalEvents: 'Total Events'
    },
    filter: {
      title: 'Filter Data',
      allProvinces: 'All Provinces',
      allRegencies: 'All Regencies',
      provincePlaceholder: 'Select Province',
      regencyPlaceholder: 'Select Regency'
    },
    popup: {
      coordinates: 'Coordinates'
    },
    distribution: {
      title: 'Regional Distribution',
      subtitle: 'Mass data distribution by province and percentage',
      province: 'Province',
      total: 'Total',
      chart: 'Distribution',
      totalAll: 'Grand Total'
    },
    guide: {
      title: 'Map Guide',
      subtitle: 'How to use the distribution map',
      zoomTitle: 'Zoom In/Out',
      zoomDescription: 'Use scroll wheel or +/- buttons to zoom in and see individual data points or zoom out to see clusters.',
      clickTitle: 'Click Marker',
      clickDescription: 'Click any individual marker to see detailed mass data information including address and contact.',
      clusterTitle: 'Cluster Behavior',
      clusterDescription: 'Markers are grouped into clusters. The number shows total massa in that area. Click to zoom into the cluster.',
      filterTitle: 'Region Filter',
      filterDescription: 'Use province and regency filters above the map to focus on specific regions of interest.',
      distributionTitle: 'Distribution Table',
      distributionDescription: 'Use the table on the right to view the mass distribution percentage by province or regency.',
      autoCenterTitle: 'Auto Centering',
      autoCenterDescription: 'When selecting a province or regency in the filter, the map will automatically center on that region.',
      statsTitle: 'Summary Stats',
      statsDescription: 'Keep an eye on the summary cards above to monitor total data, spread, and event count in real-time.',
      popupTitle: 'Popup Information',
      popupDescription: 'Each marker features an interactive popup displaying the name, area, and member validation status.'
    }
  },
  councilReport: {
    title: 'Council Activity Reports',
    subtitle: 'Manage activity reports from council members',
    createNew: 'Add Report',
    emptyMessage: 'No reports found.',
    searchPlaceholder: 'Search title or location...',
    allReportTypes: 'All Report Types',
    searchReportTypePlaceholder: 'Search report type...',
    status: {
      draft: 'Draft',
      submitted: 'Submitted',
      approved: 'Approved',
      rejected: 'Rejected'
    },
    reportType: {
      meeting: 'Meeting',
      visit: 'Visit',
      socialization: 'Socialization',
      supervision: 'Supervision',
      aspiration: 'Aspiration',
      other: 'Other'
    },
    summary: {
      totalReports: 'Total Reports',
      approved: 'Approved',
      submitted: 'Pending Review',
      draft: 'Draft'
    },
    deleteConfirm: {
      title: 'Delete Report',
      message: 'Are you sure you want to delete this report? This action cannot be undone.'
    },
    table: {
      tableTitle: 'Report List',
      tableSubtitle: 'Manage and monitor all council activity reports',
      title: 'Report',
      reportType: 'Type',
      activityDate: 'Activity Date',
      location: 'Location',
      media: 'Media',
      status: 'Status',
      actions: 'Actions'
    },
    form: {
      createTitle: 'Create Report',
      createSubtitle: 'Fill in the form below to add a new council activity report.',
      editTitle: 'Edit Report',
      editSubtitle: 'Update existing council activity report information.',
      titleLabel: 'Report Title',
      titlePlaceholder: 'Example: Regional Coordination Meeting',
      descriptionLabel: 'Activity Description',
      descriptionPlaceholder: 'Describe the activity in detail...',
      activityDateLabel: 'Activity Date',
      startTimeLabel: 'Start Time',
      endTimeLabel: 'End Time',
      locationLabel: 'Location',
      locationPlaceholder: 'Enter activity location...',
      agendaLabel: 'Agenda',
      agendaPlaceholder: 'List of agenda items discussed...',
      resultLabel: 'Result',
      resultPlaceholder: 'Describe the results and outcomes...',
      recommendationLabel: 'Recommendation',
      recommendationPlaceholder: 'Suggestions and recommendations...',
      reportTypeLabel: 'Report Type',
      reportTypePlaceholder: 'Select Report Type',
      participantsCountLabel: 'Participants Count',
      participantsCountPlaceholder: 'Number of participants',
      statusLabel: 'Status',
      statusPlaceholder: 'Select Status',
      rejectionNoteLabel: 'Rejection Note',
      rejectionNotePlaceholder: 'Reason for rejection...',
      mediaLabel: 'Documentation Media',
      mediaDescription: 'Upload images, videos, or documents (max 50MB each)',
      submitCreate: 'Save Report',
      submitUpdate: 'Update Report'
    },
    validate: {
      titleRequired: 'Report title is required.',
      titleMax: 'Title must not exceed 255 characters.',
      descriptionRequired: 'Description is required.',
      reportTypeRequired: 'Report type is required.',
      activityDateRequired: 'Activity date is required.',
      locationRequired: 'Location is required.',
      locationMax: 'Location must not exceed 255 characters.',
      statusRequired: 'Status is required.'
    },
    response: {
      successCreateMsg: 'Report created successfully!',
      failedCreateMsg: 'Failed to create report.',
      successUpdateMsg: 'Report updated successfully!',
      failedUpdateMsg: 'Failed to update report.',
      successDeleteMsg: 'Report deleted successfully!',
      failedDeleteMsg: 'Failed to delete report.',
      successDeleteMediaMsg: 'Media deleted successfully!',
      failedDeleteMediaMsg: 'Failed to delete media.'
    },
    detail: {
      title: 'Report Detail',
      subtitle: 'Complete council activity report information.',
      dateLabel: 'Activity Date',
      timeLabel: 'Time',
      locationLabel: 'Location',
      participantsLabel: 'Participants',
      agendaLabel: 'Agenda',
      resultLabel: 'Result',
      recommendationLabel: 'Recommendation',
      descriptionLabel: 'Full Description',
      reportInfoTitle: 'Report Information',
      reportTypeLabel: 'Report Type',
      submitterLabel: 'Submitted By',
      createdAtLabel: 'Created At',
      rejectionNoteLabel: 'Rejection Note',
      editReport: 'Edit Report',
      mediaTitle: 'Documentation Media',
      photosLabel: 'Photos',
      videosLabel: 'Videos',
      documentsLabel: 'Documents'
    }
  }
}
