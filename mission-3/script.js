document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu Footer
  const groups = document.querySelectorAll(".link-group");
  groups.forEach((group) => {
    const toggle = group.querySelector("[data-dropdown]");
    if (toggle) {
      toggle.addEventListener("click", () => {
        groups.forEach((g) => g !== group && g.classList.remove("active"));
        group.classList.toggle("active");
      });
    }
  });

  // Mobile menu Header
  const mobileMenu = document.getElementById("mobileMenu");
  const toggleBtn = document.getElementById("mobileToggle");
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("open");
    });
    document.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  }

  // Courses Section
  const courses = [
    {
      img: "https://static.vecteezy.com/system/resources/previews/070/677/567/non_2x/financial-analyst-working-on-laptop-with-graphs-and-calculator-analyzing-market-data-for-investment-decisions-photo.jpeg",
      title: "Big 4 Auditor: Dasar-Dasar Financial Analysis",
      desc: "Pelajari teknik analisis laporan keuangan dari auditor Big 4, cocok untuk pemula yang ingin karir di finance.",
      instructor: "Jenna Ortega",
      job: "Senior Accountant di Gojek",
      rating: 3.5,
      reviews: 86,
      price: "300K",
      category: "bisnis",
    },
    {
      img: "https://static.vecteezy.com/system/resources/previews/067/396/613/non_2x/male-financial-analyst-works-late-at-a-brick-wall-office-desk-reviewing-documents-and-stock-data-on-his-laptop-the-night-setting-creates-a-focused-workspace-for-analyzing-financial-trends-photo.jpg",
      title: "Financial Analyst Professional dari Big 4",
      desc: "Transformasi karir dengan materi mendalam tentang forecasting dan valuation dari praktisi berpengalaman.",
      instructor: "Jenna Ortega",
      job: "Senior Accountant di Gojek",
      rating: 3.5,
      reviews: 86,
      price: "300K",
      category: "bisnis",
    },
    {
      img: "https://images.stockcake.com/public/1/c/6/1c6d2ee5-6183-4e1c-a497-dec4d19862c3_large/financial-analysis-setup-stockcake.jpg",
      title: "Big 4 Auditor: Analisis Laporan Keuangan Lanjutan",
      desc: "Kuasai audit internal dan eksternal dengan studi kasus real dari perusahaan besar.",
      instructor: "Jenna Ortega",
      job: "Senior Accountant di Gojek",
      rating: 3.5,
      reviews: 86,
      price: "300K",
      category: "pengembangan",
    },
    {
      img: "https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg",
      title: "Financial Modeling untuk Pemula",
      desc: "Belajar membuat model keuangan yang akurat dan berguna untuk pengambilan keputusan.",
      instructor: "Michael B. Jordan",
      job: "Financial Consultant di Tokopedia",
      rating: 3.5,
      reviews: 86,
      price: "300K",
      category: "pengembangan",
    },
    {
      img: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg",
      title: "Analisis Risiko Investasi",
      desc: "Pelajari cara menilai risiko dan peluang investasi menggunakan metode profesional.",
      instructor: "Sofia Vergara",
      job: "Investment Manager di Mandiri",
      rating: 3.5,
      reviews: 86,
      price: "300K",
      category: "bisnis",
    },
    {
      img: "https://images.pexels.com/photos/4386394/pexels-photo-4386394.jpeg",
      title: "Forecasting & Budgeting Perusahaan",
      desc: "Belajar menyusun anggaran dan proyeksi perusahaan dengan metode profesional.",
      instructor: "Tom Holland",
      job: "Financial Analyst di Shopee",
      rating: 3.5,
      reviews: 86,
      price: "300K",
      category: "pengembangan",
    },
    {
      img: "https://images.pexels.com/photos/4386397/pexels-photo-4386397.jpeg",
      title: "Strategi Pajak untuk Perusahaan",
      desc: "Pelajari pengelolaan pajak perusahaan agar efisien dan sesuai regulasi.",
      instructor: "Robert Downey Jr.",
      job: "Tax Consultant di KPMG",
      rating: 3.5,
      reviews: 86,
      price: "300K",
      category: "pengembangan",
    },
    {
      img: "https://images.pexels.com/photos/4386401/pexels-photo-4386401.jpeg",
      title: "Financial Dashboard & Data Visualization",
      desc: "Belajar membuat dashboard keuangan interaktif untuk manajemen keputusan.",
      instructor: "Leonardo DiCaprio",
      job: "Data Analyst di Bukalapak",
      rating: 3.5,
      reviews: 86,
      price: "300K",
      category: "pengembangan",
    },
    {
      img: "https://images.pexels.com/photos/4386405/pexels-photo-4386405.jpeg",
      title: "Advanced Financial Reporting & Analysis",
      desc: "Pelajari teknik lanjutan analisis laporan keuangan untuk profesional.",
      instructor: "Will Smith",
      job: "CFO di Grab",
      rating: 3.5,
      reviews: 86,
      price: "300K",
      category: "pengembangan",
    },
  ];

  const grid = document.getElementById("coursesGrid");
  if (!grid) return;

  function renderCourses(filtered = courses) {
    grid.innerHTML = "";

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "no-courses";
      empty.textContent = "Belum ada course di kategori ini.";
      grid.appendChild(empty);
      return;
    }

    filtered.forEach((course) => {
      const card = document.createElement("div");
      card.className = "course-card";
      card.innerHTML = `
        <img src="${course.img}" alt="${course.title}" class="course-img">
        <div class="course-body">
          <h3 class="course-title">${course.title}</h3>
          <p class="course-desc">${course.desc}</p>
          <div class="instructor">
            <img src="https://placehold.co/40x40?text=JO" alt="Instructor" class="instructor-avatar">
            <div class="instructor-info">
              <h4>${course.instructor}</h4>
              <p>${course.job}</p>
            </div>
          </div>
          <div class="course-footer">
            <div class="rating">
              <span>★★★★☆</span>
              <span>${course.rating} (${course.reviews})</span>
            </div>
            <div class="price">Rp ${course.price}</div>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // Render awal
  renderCourses();

  // Tab switching
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;
      if (category === "all") {
        renderCourses(courses);
      } else {
        const filtered = courses.filter(
          (course) => course.category === category
        );
        renderCourses(filtered);
      }
    });
  });
});
