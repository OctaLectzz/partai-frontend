export default {
  user: {
    response: {
      successCreateMsg: 'Pengguna berhasil dibuat!',
      failedCreateMsg: 'Gagal membuat pengguna.',
      successUpdateMsg: 'Pengguna berhasil diperbarui!',
      failedUpdateMsg: 'Gagal memperbarui pengguna.',
      successDeleteMsg: 'Pengguna berhasil dihapus!',
      failedDeleteMsg: 'Gagal menghapus pengguna.'
    },
    validate: {
      nameRequired: 'Nama wajib diisi.',
      nameMax: 'Nama tidak boleh lebih dari 255 karakter.',
      usernameRequired: 'Username wajib diisi.',
      usernameMax: 'Username tidak boleh lebih dari 20 karakter.',
      emailFormat: 'Format email tidak valid.',
      passwordMinLength: 'Kata sandi minimal 8 karakter.',
      phoneNumberMax: 'Nomor telepon tidak boleh lebih dari 20 karakter.',
      confirmPasswordNotMatch: 'Konfirmasi kata sandi tidak cocok.',
      nikMax: 'NIK tidak boleh lebih dari 16 karakter.',
      placeOfBirthMax: 'Tempat lahir tidak boleh lebih dari 255 karakter.',
      professionMax: 'Profesi tidak boleh lebih dari 255 karakter.',
      rtMax: 'RT tidak boleh lebih dari 3 karakter.',
      rwMax: 'RW tidak boleh lebih dari 3 karakter.',
      postalCodeMax: 'Kode pos tidak boleh lebih dari 5 karakter.'
    }
  },
  sidebar: {
    label: 'Menu Utama',
    dashboard: 'Dashboard',
    events: 'Manajemen Event',
    reports: 'Form Laporan Dewan',
    qr: 'Sistem QR & Check-in',
    gis: 'WebGIS',
    kta: 'Digitalisasi KTA',
    wa: 'WhatsApp Blasting',
    social: 'Social Media',
    logout: 'Keluar'
  },
  navbar: {
    profile: 'Profil Saya',
    settings: 'Pengaturan'
  },
  logoutConfirm: {
    title: 'Konfirmasi Keluar',
    message: 'Apakah Anda yakin ingin keluar dari akun Anda?',
    cancel: 'Batal',
    confirm: 'Keluar'
  }
}
