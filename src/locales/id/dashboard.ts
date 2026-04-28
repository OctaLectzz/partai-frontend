export default {
  pagination: {
    perPage: 'Entri per halaman',
    showing: 'Menampilkan',
    to: 'sampai',
    of: 'dari',
    entries: 'entri'
  },
  sidebar: {
    label: 'Menu Utama',
    operational: 'Operasional',
    landingPage: 'Landing Page',
    analytics: 'Analitik',
    dashboard: 'Dashboard',
    events: 'Manajemen Event',
    massData: 'Data Massa',
    councilMembers: 'Anggota Dewan',
    qrCheckin: 'Sistem QR & Check-in',
    kta: 'Digitalisasi KTA',
    councilActivityReports: 'Laporan Kegiatan Dewan',
    whatsAppBlasting: 'WhatsApp Blasting',
    socialMedia: 'Media Sosial',
    distributionMap: 'Peta Sebaran',
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
  events: {
    title: 'Manajemen Event',
    subtitle: 'Kelola event dan kegiatan Partai Golkar',
    createNew: 'Buat Event Baru',
    searchPlaceholder: 'Cari event...',
    searchCategoryPlaceholder: 'Cari kategori...',
    allCategories: 'Semua Kategori',
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
      message: 'Apakah Anda yakin ingin menghapus event ini? Tindakan ini tidak dapat dibatalkan.'
    },
    table: {
      title: 'Daftar Event',
      subtitle: 'Kelola dan monitor semua event yang telah dibuat',
      emptyMessage: 'Tidak ada event ditemukan.',
      event: 'Event',
      dateTime: 'Tanggal & Waktu',
      location: 'Lokasi',
      organizer: 'Penyelenggara',
      participants: 'Peserta',
      status: 'Status',
      actions: 'Aksi'
    },
    detail: {
      title: 'Detail Event',
      subtitle: 'Informasi detail dan link pendaftaran event.',
      dateLabel: 'Tanggal',
      timeLabel: 'Waktu',
      locationLabel: 'Lokasi',
      organizerLabel: 'Penyelenggara',
      descriptionLabel: 'Deskripsi Lengkap',
      registrationLink: {
        title: 'Link Pendaftaran',
        subtitle: 'Bagikan link ini kepada calon peserta.',
        info: 'Klik tombol di kanan untuk membuka form pendaftaran.'
      },
      participantStatus: {
        title: 'Status Peserta',
        registered: 'Terdaftar',
        capacity: 'Kapasitas'
      }
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
    response: {
      successCreateMsg: 'Event berhasil dibuat!',
      failedCreateMsg: 'Gagal membuat event.',
      successUpdateMsg: 'Event berhasil diperbarui!',
      failedUpdateMsg: 'Gagal memperbarui event.',
      successDeleteMsg: 'Event berhasil dihapus!',
      failedDeleteMsg: 'Gagal menghapus event.'
    }
  },
  participants: {
    title: 'Daftar Peserta',
    subtitle: 'Daftar semua peserta yang terdaftar pada event ini.',
    emptyMessage: 'Tidak ada peserta ditemukan.',
    searchPlaceholder: 'Cari nama, NIK, atau email...',
    code: 'Kode',
    name: 'Nama',
    nik: 'NIK',
    email: 'Email',
    whatsapp: 'WhatsApp',
    status: 'Status',
    registeredAt: 'Tgl Terdaftar',
    statusLabel: {
      registered: 'Terdaftar',
      attended: 'Hadir'
    }
  }
}
