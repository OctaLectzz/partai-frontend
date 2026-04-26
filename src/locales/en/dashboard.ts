export default {
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
  sidebar: {
    label: 'Main Menu',
    dashboard: 'Dashboard',
    events: 'Event Management',
    reports: 'Council Reports',
    qr: 'QR & Check-in System',
    gis: 'WebGIS',
    kta: 'Digital KTA',
    wa: 'WhatsApp Blasting',
    social: 'Social Media',
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
  }
}
