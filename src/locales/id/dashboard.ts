export default {
  common: {
    pagination: {
      perPage: 'Entri per halaman',
      showing: 'Menampilkan',
      to: 'sampai',
      of: 'dari',
      entries: 'entri'
    }
  },
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
  },
  events: {
    title: 'Manajemen Event',
    subtitle: 'Kelola event dan kegiatan Partai Golkar',
    createNew: 'Buat Event Baru',
    response: {
      successCreateMsg: 'Event berhasil dibuat!',
      failedCreateMsg: 'Gagal membuat event.',
      successUpdateMsg: 'Event berhasil diperbarui!',
      failedUpdateMsg: 'Gagal memperbarui event.',
      successDeleteMsg: 'Event berhasil dihapus!',
      failedDeleteMsg: 'Gagal menghapus event.'
    },
    form: {
      nameLabel: 'Nama Event',
      namePlaceholder: 'Contoh: Rapat Koordinasi Wilayah',
      descriptionLabel: 'Deskripsi Event',
      descriptionPlaceholder: 'Jelaskan detail tujuan dan agenda event...',
      startDateLabel: 'Tanggal Mulai',
      startTimeLabel: 'Waktu Mulai',
      endDateLabel: 'Tanggal Selesai',
      endTimeLabel: 'Waktu Selesai',
      locationLabel: 'Lokasi',
      locationPlaceholder: 'Cari lokasi atau masukkan alamat...',
      organizerLabel: 'Penyelenggara',
      organizerPlaceholder: 'DPD Jakarta Pusat',
      targetParticipantsLabel: 'Target Peserta',
      targetParticipantsPlaceholder: 'Jumlah peserta (misal: 100)',
      categoryLabel: 'Kategori Event',
      categoryPlaceholder: 'Pilih Kategori',
      statusLabel: 'Status Awal',
      statusPlaceholder: 'Pilih Status',
      submitCreate: 'Simpan Event',
      submitUpdate: 'Perbarui Event',
      backToList: 'Kembali ke Daftar Event',
      editTitle: 'Edit Event',
      createTitle: 'Buat Event Baru',
      createSubtitle: 'Isi formulir di bawah ini untuk menambahkan event baru.',
      editSubtitle: 'Perbarui informasi event yang sudah ada.'
    },
    validate: {
      categoryRequired: 'Kategori wajib diisi.',
      nameRequired: 'Nama event wajib diisi.',
      nameMax: 'Nama event tidak boleh lebih dari 255 karakter.',
      descriptionRequired: 'Deskripsi wajib diisi.',
      organizerRequired: 'Penyelenggara wajib diisi.',
      organizerMax: 'Penyelenggara tidak boleh lebih dari 255 karakter.',
      targetParticipantsRequired: 'Target peserta wajib diisi.',
      targetParticipantsMin: 'Target peserta minimal 1.',
      startDateRequired: 'Tanggal mulai wajib diisi.',
      startTimeRequired: 'Waktu mulai wajib diisi.',
      endDateRequired: 'Tanggal selesai wajib diisi.',
      endTimeRequired: 'Waktu selesai wajib diisi.',
      locationRequired: 'Lokasi wajib diisi.',
      locationMax: 'Lokasi tidak boleh lebih dari 255 karakter.',
      statusRequired: 'Status wajib diisi.'
    },
    filter: {
      searchPlaceholder: 'Cari event...',
      searchStatusPlaceholder: 'Cari status...',
      searchCategoryPlaceholder: 'Cari kategori...',
      allStatuses: 'Semua Status',
      allCategories: 'Semua Kategori'
    },
    status: {
      draft: 'Draf',
      published: 'Dipublikasi',
      completed: 'Selesai',
      cancelled: 'Dibatalkan'
    },
    summary: {
      totalEvents: 'Total Event',
      upcoming: 'Akan Datang',
      totalParticipants: 'Total Peserta',
      avgAttendance: 'Avg. Kehadiran'
    },
    deleteConfirm: {
      title: 'Hapus Event',
      message: 'Apakah Anda yakin ingin menghapus event ini? Tindakan ini tidak dapat dibatalkan.',
      confirm: 'Ya, Hapus',
      cancel: 'Batal'
    },
    table: {
      title: 'Daftar Event',
      subtitle: 'Kelola dan monitor semua event yang telah dibuat',
      emptyMessage: 'Tidak ada event ditemukan.',
      headers: {
        event: 'Event',
        dateTime: 'Tanggal & Waktu',
        location: 'Lokasi',
        organizer: 'Penyelenggara',
        participants: 'Peserta',
        status: 'Status',
        actions: 'Aksi'
      }
    }
  }
}
