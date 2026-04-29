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
      emailRequired: 'Email wajib diisi.',
      emailFormat: 'Format email tidak valid.',
      passwordMinLength: 'Kata sandi minimal 8 karakter.',
      phoneNumberRequired: 'Nomor telepon wajib diisi.',
      phoneNumberMax: 'Nomor telepon tidak boleh lebih dari 20 karakter.',
      confirmPasswordNotMatch: 'Konfirmasi kata sandi tidak cocok.',
      nikRequired: 'NIK wajib diisi.',
      nikLength: 'NIK harus berjumlah 16 karakter.',
      nikMax: 'NIK tidak boleh lebih dari 16 karakter.',
      dateOfBirthRequired: 'Tanggal lahir wajib diisi.',
      genderRequired: 'Jenis kelamin wajib diisi.',
      religionRequired: 'Agama wajib diisi.',
      maritalStatusRequired: 'Status pernikahan wajib diisi.',
      educationRequired: 'Pendidikan wajib diisi.',
      professionRequired: 'Pekerjaan wajib diisi.',
      professionMax: 'Profesi tidak boleh lebih dari 255 karakter.',
      placeOfBirthMax: 'Tempat lahir tidak boleh lebih dari 255 karakter.',
      rtRequired: 'RT wajib diisi.',
      rtMax: 'RT tidak boleh lebih dari 3 karakter.',
      rwRequired: 'RW wajib diisi.',
      rwMax: 'RW tidak boleh lebih dari 3 karakter.'
    }
  },
  events: {
    title: 'Manajemen Event',
    subtitle: 'Kelola event dan kegiatan Partai Golkar',
    createNew: 'Tambah Event',
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
      createTitle: 'Tambah Event',
      createSubtitle: 'Isi formulir di bawah ini untuk menambahkan event baru.',
      editTitle: 'Edit Event',
      editSubtitle: 'Perbarui informasi event yang sudah ada.',
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
      submitUpdate: 'Perbarui Event'
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
  },
  massa: {
    title: 'Data Massa',
    subtitle: 'Kelola data massa dan pendukung partai',
    createNew: 'Tambah Data Massa',
    emptyMessage: 'Tidak ada data massa ditemukan.',
    actions: 'Aksi',
    searchPlaceholder: 'Cari NIK atau Nama...',
    deleteConfirm: {
      title: 'Hapus Data Massa',
      message: 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.'
    },
    form: {
      createTitle: 'Tambah Data Massa',
      createSubtitle: 'Isi formulir di bawah ini untuk menambahkan data massa baru.',
      editTitle: 'Edit Data Massa',
      editSubtitle: 'Perbarui informasi data massa yang sudah ada.',
      identitySection: 'Data Identitas',
      addressSection: 'Alamat Lengkap',
      contactSection: 'Kontak & Status',
      nikLabel: 'NIK',
      nikDescription: 'Masukkan 16 digit NIK sesuai KTP.',
      nikPlaceholder: 'Contoh: 3201234567890123',
      fullNameLabel: 'Nama Lengkap',
      fullNameDescription: 'Nama sesuai KTP',
      fullNamePlaceholder: 'Contoh: Budi Santoso',
      placeOfBirthPlaceholder: 'Contoh: Jakarta',
      phoneNumberPlaceholder: 'Nomor WhatsApp Aktif',
      phoneNumberDescription: 'Gunakan nomor WhatsApp aktif.',
      emailPlaceholder: 'Contoh: budi@gmail.com',
      addressPlaceholder: 'Jln. Merdeka No. 123...',
      addressDescription: 'Sertakan nama jalan dan nomor rumah.',
      rtPlaceholder: '001',
      rwPlaceholder: '002',
      postalCodePlaceholder: '12345',
      placeOfBirthLabel: 'Tempat Lahir',
      dateOfBirthLabel: 'Tanggal Lahir',
      professionLabel: 'Pekerjaan',
      professionPlaceholder: 'Contoh: Karyawan Swasta',
      phoneNumberLabel: 'Nomor Telepon',
      emailLabel: 'Email',
      notesLabel: 'Catatan',
      notesPlaceholder: 'Tambahkan catatan jika diperlukan...',
      statusLabel: 'Status Keanggotaan',
      statusPlaceholder: 'Pilih Status',
      submitCreate: 'Tambah Data Massa',
      submitUpdate: 'Simpan Perubahan',
      formFooter: 'Pastikan semua data yang dimasukkan sudah benar dan sesuai dengan dokumen identitas resmi.'
    },
    validate: {
      nikRequired: 'NIK wajib diisi.',
      nikLength: 'NIK harus berjumlah 16 karakter.',
      fullNameRequired: 'Nama lengkap wajib diisi.',
      fullNameMax: 'Nama lengkap tidak boleh lebih dari 255 karakter.',
      genderRequired: 'Jenis kelamin wajib dipilih.',
      dateOfBirthRequired: 'Tanggal lahir wajib diisi.',
      placeOfBirthRequired: 'Tempat lahir wajib diisi.',
      photoRequired: 'Foto wajib diunggah.',
      positionRequired: 'Jabatan wajib diisi.',
      phoneNumberRequired: 'Nomor telepon wajib diisi.',
      emailFormat: 'Format email tidak valid.',
      addressRequired: 'Alamat wajib diisi.',
      rtRequired: 'RT wajib diisi.',
      rwRequired: 'RW wajib diisi.',
      provinceRequired: 'Provinsi wajib dipilih.',
      regencyRequired: 'Kabupaten/Kota wajib dipilih.',
      districtRequired: 'Kecamatan wajib dipilih.',
      villageRequired: 'Kelurahan/Desa wajib dipilih.',
      postalCodeRequired: 'Kode Pos wajib diisi.'
    },
    response: {
      successCreateMsg: 'Data massa berhasil ditambahkan!',
      failedCreateMsg: 'Gagal menambahkan data massa.',
      successUpdateMsg: 'Data massa berhasil diperbarui!',
      failedUpdateMsg: 'Gagal memperbarui data massa.',
      successDeleteMsg: 'Data massa berhasil dihapus!',
      failedDeleteMsg: 'Gagal menghapus data massa.'
    },
    detail: {
      title: 'Detail Data Massa',
      subtitle: 'Informasi lengkap profil dan kontak massa.',
      personalInfo: 'Informasi Pribadi',
      addressInfo: 'Informasi Alamat',
      geographicInfo: 'Lokasi Geografis',
      editData: 'Edit Data'
    }
  },
  council: {
    title: 'Anggota Dewan',
    subtitle: 'Kelola data anggota dewan dan legislatif',
    createNew: 'Tambah Anggota Dewan',
    emptyMessage: 'Tidak ada data anggota dewan ditemukan.',
    actions: 'Aksi',
    searchPlaceholder: 'Cari NIK atau Nama...',
    deleteConfirm: {
      title: 'Hapus Anggota Dewan',
      message: 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.'
    },
    form: {
      createTitle: 'Tambah Anggota Dewan',
      createSubtitle: 'Isi formulir di bawah ini untuk menambahkan anggota dewan baru.',
      editTitle: 'Edit Anggota Dewan',
      editSubtitle: 'Perbarui informasi anggota dewan yang sudah ada.',
      identitySection: 'Data Identitas',
      addressSection: 'Alamat Lengkap',
      contactSection: 'Kontak & Status',
      biodataSection: 'Data Biodata',
      nikLabel: 'NIK',
      ktaNumberLabel: 'Nomor KTA',
      nameLabel: 'Nama Lengkap',
      emailLabel: 'Email',
      passwordLabel: 'Kata Sandi',
      confirmPasswordLabel: 'Konfirmasi Kata Sandi',
      phoneNumberLabel: 'Nomor Telepon',
      placeOfBirthLabel: 'Tempat Lahir',
      dateOfBirthLabel: 'Tanggal Lahir',
      religionLabel: 'Agama',
      maritalStatusLabel: 'Status Pernikahan',
      educationLabel: 'Pendidikan Terakhir',
      professionLabel: 'Pekerjaan',
      ktpPhotoLabel: 'Foto KTP',
      submitCreate: 'Simpan Anggota Dewan',
      submitUpdate: 'Simpan Perubahan',
      nikPlaceholder: 'Masukkan 16 digit NIK',
      ktaNumberPlaceholder: 'Masukkan nomor KTA',
      namePlaceholder: 'Nama lengkap sesuai KTP',
      emailPlaceholder: 'email@contoh.com',
      passwordPlaceholder: 'Minimal 8 karakter',
      confirmPasswordPlaceholder: 'Ulangi kata sandi',
      phoneNumberPlaceholder: 'Nomor WhatsApp Aktif',
      placeOfBirthPlaceholder: 'Contoh: Jakarta',
      professionPlaceholder: 'Pekerjaan saat ini',
      addressPlaceholder: 'Alamat lengkap...',
      postalCodePlaceholder: '5 digit kode pos',
      religion: {
        islam: 'Islam',
        christian: 'Kristen',
        catholic: 'Katolik',
        hindu: 'Hindu',
        buddhist: 'Buddha',
        confucian: 'Konghucu'
      },
      maritalStatus: {
        single: 'Belum Menikah',
        married: 'Menikah',
        divorced: 'Cerai Hidup',
        widowed: 'Cerai Mati'
      },
      education: {
        high_school: 'SMA / Sederajat',
        associate_degree: 'Diploma (D3)',
        bachelors_degree: 'Sarjana (S1)',
        masters_degree: 'Magister (S2)',
        doctorate: 'Doktor (S3)'
      }
    },
    validate: {
      nikRequired: 'NIK wajib diisi.',
      nikLength: 'NIK harus berjumlah 16 karakter.',
      nameRequired: 'Nama lengkap wajib diisi.',
      phoneNumberRequired: 'Nomor telepon wajib diisi.',
      emailFormat: 'Format email tidak valid.'
    },
    response: {
      successCreateMsg: 'Anggota dewan berhasil ditambahkan!',
      failedCreateMsg: 'Gagal menambahkan anggota dewan.',
      successUpdateMsg: 'Anggota dewan berhasil diperbarui!',
      failedUpdateMsg: 'Gagal memperbarui anggota dewan.',
      successDeleteMsg: 'Anggota dewan berhasil dihapus!',
      failedDeleteMsg: 'Gagal menghapus anggota dewan.'
    },
    detail: {
      title: 'Detail Anggota Dewan',
      subtitle: 'Informasi lengkap profil dan legislatif anggota dewan.',
      personalInfo: 'Informasi Pribadi',
      addressInfo: 'Informasi Alamat',
      editData: 'Edit Data'
    }
  },
  kta: {
    title: 'Digitalisasi KTA',
    subtitle: 'Kelola data Kartu Tanda Anggota (KTA) partai',
    createNew: 'Tambah Data KTA',
    emptyMessage: 'Tidak ada data KTA ditemukan.',
    actions: 'Aksi',
    searchPlaceholder: 'Cari NIK atau Nama...',
    deleteConfirm: {
      title: 'Hapus Data KTA',
      message: 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.'
    },
    form: {
      createTitle: 'Tambah Data KTA',
      createSubtitle: 'Isi formulir di bawah ini untuk menambahkan data KTA baru.',
      editTitle: 'Edit Data KTA',
      editSubtitle: 'Perbarui informasi data KTA yang sudah ada.',
      identitySection: 'Data Identitas',
      addressSection: 'Alamat Lengkap',
      nikLabel: 'NIK',
      nameLabel: 'Nama Lengkap',
      placeOfBirthLabel: 'Tempat Lahir',
      dateOfBirthLabel: 'Tanggal Lahir',
      phoneNumberLabel: 'Nomor Telepon',
      positionLabel: 'Jabatan',
      submitCreate: 'Simpan Data KTA',
      submitUpdate: 'Simpan Perubahan',
      nikPlaceholder: 'Masukkan 16 digit NIK',
      namePlaceholder: 'Nama lengkap sesuai KTP',
      phoneNumberPlaceholder: 'Nomor WhatsApp Aktif',
      placeOfBirthPlaceholder: 'Contoh: Jakarta',
      positionPlaceholder: 'Jabatan di partai',
      addressPlaceholder: 'Alamat lengkap...',
      rtPlaceholder: '001',
      rwPlaceholder: '002',
      postalCodePlaceholder: '5 digit kode pos',
      previewHint: 'Pratinjau kartu di samping diperbarui secara otomatis saat Anda mengisi data di formulir.',
      ktaNumberNote:
        'Nomor KTA yang ditampilkan merupakan contoh format. Nomor KTA resmi akan diterbitkan secara otomatis setelah pendaftaran diproses.'
    },
    validate: {
      nikRequired: 'NIK wajib diisi.',
      nikLength: 'NIK harus berjumlah 16 karakter.',
      nameRequired: 'Nama lengkap wajib diisi.',
      phoneNumberRequired: 'Nomor telepon wajib diisi.',
      dateOfBirthRequired: 'Tanggal lahir wajib diisi.',
      placeOfBirthRequired: 'Tempat lahir wajib diisi.',
      genderRequired: 'Jenis kelamin wajib diisi.',
      positionRequired: 'Jabatan wajib diisi.',
      photoRequired: 'Foto wajib diunggah.'
    },
    response: {
      successCreateMsg: 'Data KTA berhasil ditambahkan!',
      failedCreateMsg: 'Gagal menambahkan data KTA.',
      successUpdateMsg: 'Data KTA berhasil diperbarui!',
      failedUpdateMsg: 'Gagal memperbarui data KTA.',
      successDeleteMsg: 'Data KTA berhasil dihapus!',
      failedDeleteMsg: 'Gagal menghapus data KTA.',
      successExportImage: 'Gambar KTA berhasil diunduh.',
      failedExportImage: 'Gagal mengunduh gambar KTA.',
      successExportPdf: 'PDF KTA berhasil diunduh.',
      failedExportPdf: 'Gagal mengunduh PDF KTA.'
    },
    detail: {
      title: 'Digitalisasi KTA',
      subtitle: 'Pratinjau dan unduh Kartu Tanda Anggota digital Anda.',
      personalInfo: 'Informasi Pribadi',
      addressInfo: 'Informasi Alamat',
      editData: 'Edit Data',
      saveAsImage: 'Simpan Gambar',
      saveAsPdf: 'Unduh PDF',
      readyTitle: 'Kartu Anda Siap!',
      readyDescription:
        'KTA digital Anda telah berhasil dibuat. Anda dapat menyimpannya di ponsel atau mencetaknya sebagai bukti keanggotaan resmi Partai Golkar.'
    },
    selector: {
      title: 'Pilih dari Anggota Dewan',
      searchPlaceholder: 'Cari nama atau NIK anggota dewan...'
    },
    card: {
      back: {
        termsTitle: 'TATA TERTIB ANGGOTA',
        term1: 'Kartu ini adalah bukti sah keanggotaan Partai Golkar.',
        term2: 'Anggota wajib menjunjung tinggi ideologi dan AD/ART partai.',
        term3: 'Penyalahgunaan kartu ini dapat dikenakan sanksi organisasi.',
        term4: 'Jika menemukan kartu ini, harap hubungi sekretariat terdekat.'
      }
    }
  }
}
