// @ts-check
const { test, expect } = require('@playwright/test');

// ===============================================================
// 1. KIỂM TRA CẤU TRÚC HTML & SEO
// ===============================================================
test.describe('Cấu trúc HTML & SEO', () => {

  test('có title đúng', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Thông Báo Tuyển Sinh 2026/);
  });

  test('có meta description', async ({ page }) => {
    await page.goto('/');
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content', /tuyển sinh/i);
  });

  test('có favicon', async ({ page }) => {
    await page.goto('/');
    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute('href', /Logo\.png/);
  });

  test('chỉ có 1 thẻ h1', async ({ page }) => {
    await page.goto('/');
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('h1 chứa nội dung tuyển sinh', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('THÔNG BÁO TUYỂN SINH');
  });

  test('có lang="vi"', async ({ page }) => {
    await page.goto('/');
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('vi');
  });

  test('tải Google Fonts', async ({ page }) => {
    await page.goto('/');
    const fontStylesheet = page.locator('link[rel="stylesheet"][href*="fonts.googleapis.com"]');
    await expect(fontStylesheet).toBeAttached();
  });
});

// ===============================================================
// 2. KIỂM TRA CÁC SECTION CHÍNH
// ===============================================================
test.describe('Các section chính', () => {

  test('có header với logo và navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#header')).toBeVisible();
    await expect(page.locator('.header-logo img')).toBeVisible();
    await expect(page.locator('.header-nav')).toBeAttached();
  });

  test('có hero section với năm 2026', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('.hero-year')).toContainText('2026');
  });

  test('có section Thông tin chung', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#thong-tin-chung')).toBeVisible();
  });

  test('có section Xét tuyển', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#xet-tuyen')).toBeVisible();
  });

  test('có section Timeline tuyển sinh', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#timeline')).toBeVisible();
  });

  test('có section Cao đẳng', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#cao-dang')).toBeVisible();
  });

  test('có section Trung cấp', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#trung-cap')).toBeVisible();
  });

  test('có section Quyền lợi', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#quyen-loi')).toBeVisible();
  });

  test('có section Liên hệ', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#lien-he')).toBeVisible();
  });

  test('có footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.site-footer')).toBeVisible();
    await expect(page.locator('.site-footer')).toContainText('2026');
  });
});

// ===============================================================
// 3. KIỂM TRA NỘI DUNG NGÀNH NGHỀ CAO ĐẲNG
// ===============================================================
test.describe('Ngành nghề Cao đẳng', () => {

  const nganhCaoDang = [
    { ten: 'Chế biến và bảo quản thủy sản', ma: '6620302', chiTieu: '60' },
    { ten: 'Công nghệ ô tô', ma: '6510216', chiTieu: '70' },
    { ten: 'Cơ điện tử', ma: '6520263', chiTieu: '35' },
    { ten: 'Công nghệ thông tin', ma: '6480202', chiTieu: '35' },
    { ten: 'Điện công nghiệp', ma: '6520227', chiTieu: '35' },
    { ten: 'Kỹ thuật máy lạnh và điều hòa không khí', ma: '6520205', chiTieu: '70' },
    { ten: 'Vận hành, sửa chữa thiết bị lạnh', ma: '6520255', chiTieu: '35' },
  ];

  test('hiển thị đủ 7 ngành Cao đẳng', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('#cao-dang .career-card');
    await expect(cards).toHaveCount(7);
  });

  test('tổng chỉ tiêu Cao đẳng là 340', async ({ page }) => {
    await page.goto('/');
    const quotaText = page.locator('#cao-dang .level-info-item .info-value', { hasText: '340' });
    await expect(quotaText).toBeVisible();
  });

  for (const nganh of nganhCaoDang) {
    test(`hiển thị ngành ${nganh.ten} với mã ${nganh.ma}`, async ({ page }) => {
      await page.goto('/');
      const section = page.locator('#cao-dang');
      await expect(section.locator(`.career-card-code`, { hasText: nganh.ma })).toBeVisible();
    });
  }
});

// ===============================================================
// 4. KIỂM TRA NỘI DUNG NGÀNH NGHỀ TRUNG CẤP
// ===============================================================
test.describe('Ngành nghề Trung cấp', () => {

  const nganhTrungCap = [
    { ten: 'Chế biến và bảo quản thủy sản', ma: '5620302', chiTieu: '35' },
    { ten: 'Công nghệ thông tin', ma: '5480202', chiTieu: '35' },
    { ten: 'Điện công nghiệp', ma: '5520227', chiTieu: '35' },
    { ten: 'Kỹ thuật máy lạnh và điều hòa không khí', ma: '5520205', chiTieu: '35' },
    { ten: 'Vận hành, sửa chữa thiết bị lạnh', ma: '5520255', chiTieu: '35' },
  ];

  test('hiển thị đủ 5 ngành Trung cấp', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('#trung-cap .career-card');
    await expect(cards).toHaveCount(5);
  });

  test('tổng chỉ tiêu Trung cấp là 175', async ({ page }) => {
    await page.goto('/');
    const quotaText = page.locator('#trung-cap .level-info-item .info-value', { hasText: '175' });
    await expect(quotaText).toBeVisible();
  });

  for (const nganh of nganhTrungCap) {
    test(`hiển thị ngành ${nganh.ten} với mã ${nganh.ma}`, async ({ page }) => {
      await page.goto('/');
      const section = page.locator('#trung-cap');
      await expect(section.locator(`.career-card-code`, { hasText: nganh.ma })).toBeVisible();
    });
  }
});

// ===============================================================
// 5. KIỂM TRA THÔNG TIN TUYỂN SINH
// ===============================================================
test.describe('Thông tin tuyển sinh', () => {

  test('điều kiện xét tuyển: điểm >= 3.5', async ({ page }) => {
    await page.goto('/');
    const xettuyen = page.locator('#xet-tuyen');
    await expect(xettuyen).toContainText('3,5 điểm trở lên');
  });

  test('lệ phí xét tuyển: 30.000 đồng', async ({ page }) => {
    await page.goto('/');
    const xettuyen = page.locator('#xet-tuyen');
    await expect(xettuyen).toContainText('30.000 đồng');
  });

  test('công thức tính ĐXT đầy đủ', async ({ page }) => {
    await page.goto('/');
    const formulaBox = page.locator('.formula-box');
    await expect(formulaBox).toContainText('ĐXT');
    await expect(formulaBox).toContainText('Điểm môn 1');
  });

  test('tổ hợp xét tuyển TC: Toán + Ngữ văn + Ngoại ngữ (lớp 9)', async ({ page }) => {
    await page.goto('/');
    const xettuyen = page.locator('#xet-tuyen');
    await expect(xettuyen).toContainText('điểm TB cả năm lớp 9');
  });

  test('tổ hợp xét tuyển CĐ: Toán + Ngữ văn + Ngoại ngữ (lớp 12)', async ({ page }) => {
    await page.goto('/');
    const xettuyen = page.locator('#xet-tuyen');
    await expect(xettuyen).toContainText('điểm TB cả năm lớp 12');
  });
});

// ===============================================================
// 6. KIỂM TRA TIMELINE TUYỂN SINH
// ===============================================================
test.describe('Lịch tuyển sinh', () => {

  test('có 2 cột timeline (Đợt 1 và Đợt 2)', async ({ page }) => {
    await page.goto('/');
    const cols = page.locator('#timeline .timeline-column');
    await expect(cols).toHaveCount(2);
  });

  test('Đợt 1 - Trung cấp: nộp hồ sơ trước 15/6', async ({ page }) => {
    await page.goto('/');
    const dot1 = page.locator('#timeline .timeline-column').first();
    await expect(dot1).toContainText('15/6/2026');
  });

  test('Đợt 2 - Cao đẳng: nộp hồ sơ trước 31/7', async ({ page }) => {
    await page.goto('/');
    const dot2 = page.locator('#timeline .timeline-column').last();
    await expect(dot2).toContainText('31/7/2026');
  });

  test('ngày bắt đầu khóa học 07/9/2026', async ({ page }) => {
    await page.goto('/');
    const timeline = page.locator('#timeline');
    await expect(timeline).toContainText('07/9/2026');
  });
});

// ===============================================================
// 7. KIỂM TRA HỒ SƠ DỰ TUYỂN
// ===============================================================
test.describe('Hồ sơ dự tuyển', () => {

  test('có phiếu đăng ký dự tuyển', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#thong-tin-chung');
    await expect(section).toContainText('Phiếu đăng ký dự tuyển');
  });

  test('có sơ yếu lý lịch', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#thong-tin-chung');
    await expect(section).toContainText('Sơ yếu lý lịch');
  });

  test('có nút download hồ sơ mẫu', async ({ page }) => {
    await page.goto('/');
    const downloadLinks = page.locator('.download-icon');
    const count = await downloadLinks.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('lưu ý mang bản chính để đối chiếu', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#thong-tin-chung');
    await expect(section).toContainText('mang bản chính theo để đối chiếu');
  });
});

// ===============================================================
// 8. KIỂM TRA QUYỀN LỢI
// ===============================================================
test.describe('Quyền lợi khi học', () => {

  test('hiển thị đủ 5 quyền lợi', async ({ page }) => {
    await page.goto('/');
    const benefits = page.locator('#quyen-loi .benefit-card');
    await expect(benefits).toHaveCount(5);
  });

  const dsQuyenLoi = ['Bằng chính quy', 'Liên thông', 'Nội trú', 'Vay vốn', 'Việc làm'];
  for (const ql of dsQuyenLoi) {
    test(`có quyền lợi: ${ql}`, async ({ page }) => {
      await page.goto('/');
      const section = page.locator('#quyen-loi');
      await expect(section).toContainText(ql);
    });
  }
});

// ===============================================================
// 9. KIỂM TRA THÔNG TIN LIÊN HỆ
// ===============================================================
test.describe('Thông tin liên hệ', () => {

  test('có số điện thoại', async ({ page }) => {
    await page.goto('/');
    const contact = page.locator('#lien-he');
    await expect(contact).toContainText('02903.592.101');
  });

  test('có email tuyển sinh', async ({ page }) => {
    await page.goto('/');
    const emailLink = page.locator('#lien-he a[href="mailto:tuyensinh@camauvkc.edu.vn"]');
    await expect(emailLink).toBeVisible();
  });

  test('có địa chỉ trường', async ({ page }) => {
    await page.goto('/');
    const contact = page.locator('#lien-he');
    await expect(contact).toContainText('đường Mậu Thân');
    await expect(contact).toContainText('Cà Mau');
  });

  test('có link website, fanpage, zalo', async ({ page }) => {
    await page.goto('/');
    const contact = page.locator('#lien-he');
    await expect(contact.locator('a', { hasText: 'Website' })).toBeVisible();
    await expect(contact.locator('a', { hasText: 'Fanpage' })).toBeVisible();
    await expect(contact.locator('a', { hasText: 'Zalo' })).toBeVisible();
  });
});

// ===============================================================
// 10. KIỂM TRA BADGE HỌC PHÍ
// ===============================================================
test.describe('Badge học phí', () => {

  test('các ngành CĐ có badge "Giảm 70% học phí" đúng', async ({ page }) => {
    await page.goto('/');
    const cdSection = page.locator('#cao-dang');
    const discountBadges = cdSection.locator('.badge-discount');
    const count = await discountBadges.count();
    // Chế biến thủy sản, Công nghệ ô tô, Điện CN, Máy lạnh = 4 ngành giảm 70%
    expect(count).toBe(4);
  });

  test('tất cả ngành TC đều miễn học phí', async ({ page }) => {
    await page.goto('/');
    const tcSection = page.locator('#trung-cap');
    const freeBadges = tcSection.locator('.badge-free');
    const count = await freeBadges.count();
    expect(count).toBe(5);
  });
});

// ===============================================================
// 11. KIỂM TRA NAVIGATION (ANCHOR LINKS)
// ===============================================================
test.describe('Navigation', () => {

  test('click "Cao đẳng" scroll đến section Cao đẳng', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Nav links ẩn trên mobile');
    await page.goto('/');
    await page.locator('.nav-link', { hasText: 'Cao đẳng' }).click();
    await page.waitForTimeout(800);
    const section = page.locator('#cao-dang');
    await expect(section).toBeInViewport();
  });

  test('click "Trung cấp" scroll đến section Trung cấp', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Nav links ẩn trên mobile');
    await page.goto('/');
    await page.locator('.nav-link', { hasText: 'Trung cấp' }).click();
    await page.waitForTimeout(800);
    const section = page.locator('#trung-cap');
    await expect(section).toBeInViewport();
  });

  test('click "Lịch tuyển sinh" scroll đến timeline', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Nav links ẩn trên mobile');
    await page.goto('/');
    await page.locator('.nav-link', { hasText: 'Lịch tuyển sinh' }).click();
    await page.waitForTimeout(800);
    const section = page.locator('#timeline');
    await expect(section).toBeInViewport();
  });
});

// ===============================================================
// 12. KIỂM TRA LINKS NGÀNH CHI TIẾT
// ===============================================================
test.describe('Links trang chi tiết ngành', () => {

  const detailPages = [
    { href: 'details/cd-che-bien-thuy-san.html', ten: 'CĐ Chế biến thủy sản' },
    { href: 'details/cd-cong-nghe-o-to.html', ten: 'CĐ Công nghệ ô tô' },
    { href: 'details/cd-co-dien-tu.html', ten: 'CĐ Cơ điện tử' },
    { href: 'details/cd-cntt.html', ten: 'CĐ CNTT' },
    { href: 'details/cd-dien-cong-nghiep.html', ten: 'CĐ Điện công nghiệp' },
    { href: 'details/cd-ky-thuat-may-lanh.html', ten: 'CĐ Máy lạnh' },
    { href: 'details/cd-van-hanh-thiet-bi-lanh.html', ten: 'CĐ Thiết bị lạnh' },
    { href: 'details/tc-che-bien-thuy-san.html', ten: 'TC Chế biến thủy sản' },
    { href: 'details/tc-cntt.html', ten: 'TC CNTT' },
    { href: 'details/tc-dien-cong-nghiep.html', ten: 'TC Điện công nghiệp' },
    { href: 'details/tc-ky-thuat-may-lanh.html', ten: 'TC Máy lạnh' },
    { href: 'details/tc-van-hanh-thiet-bi-lanh.html', ten: 'TC Thiết bị lạnh' },
  ];

  for (const dp of detailPages) {
    test(`link "${dp.ten}" trỏ đến file tồn tại`, async ({ page }) => {
      await page.goto('/');
      const link = page.locator(`a.btn-detail[href="${dp.href}"]`);
      await expect(link).toBeAttached();
    });
  }

  test('tất cả 12 nút "Xem chi tiết" đều có', async ({ page }) => {
    await page.goto('/');
    const btns = page.locator('a.btn-detail');
    await expect(btns).toHaveCount(12);
  });
});

// ===============================================================
// 13. KIỂM TRA TRANG CHI TIẾT NGÀNH
// ===============================================================
test.describe('Trang chi tiết ngành (sample)', () => {

  test('trang CĐ CNTT tải được và có nội dung đúng', async ({ page }) => {
    await page.goto('/details/cd-cntt.html');
    await expect(page).toHaveTitle(/Công nghệ thông tin/);
    await expect(page.locator('.level-tag')).toContainText('Cao đẳng');
    await expect(page.locator('.detail-h1').first()).toContainText('Công nghệ thông tin');
    await expect(page.locator('.detail-h2', { hasText: '6480202' })).toBeVisible();
  });

  test('trang chi tiết có nút quay lại và nút đăng ký', async ({ page }) => {
    await page.goto('/details/cd-cntt.html');
    await expect(page.locator('.back-btn')).toBeVisible();
    await expect(page.locator('.fab-register')).toBeAttached();
  });

  test('click "Quay lại" trở về trang chính', async ({ page }) => {
    await page.goto('/details/cd-cntt.html');
    await page.locator('.back-btn').click();
    await page.waitForLoadState('load');
    await expect(page).toHaveTitle(/Thông Báo Tuyển Sinh 2026/);
  });
});

// ===============================================================
// 14. KIỂM TRA EXTERNAL LINKS
// ===============================================================
test.describe('External Links', () => {

  test('nút "Đăng ký trực tuyến" header có href đúng', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('.btn-register-header');
    await expect(btn).toHaveAttribute('href', 'https://camauvkc.edu.vn/dangkyxettuyen');
    await expect(btn).toHaveAttribute('target', '_blank');
    await expect(btn).toHaveAttribute('rel', /noopener/);
  });

  test('FAB đăng ký có href đúng', async ({ page }) => {
    await page.goto('/');
    const fab = page.locator('#fabRegister');
    await expect(fab).toHaveAttribute('href', 'https://camauvkc.edu.vn/dangkyxettuyen');
    await expect(fab).toHaveAttribute('target', '_blank');
  });

  test('link Quy chế tuyển sinh có href đúng', async ({ page }) => {
    await page.goto('/');
    const qcLink = page.locator('.nav-link.qc-link');
    await expect(qcLink).toHaveAttribute('href', 'https://camauvkc.edu.vn/qctuyensinh');
    await expect(qcLink).toHaveAttribute('target', '_blank');
  });

  test('download hồ sơ mẫu trỏ đến URL đúng', async ({ page }) => {
    await page.goto('/');
    const downloadLinks = page.locator('.download-icon');
    const count = await downloadLinks.count();
    for (let i = 0; i < count; i++) {
      await expect(downloadLinks.nth(i)).toHaveAttribute('href', 'https://camauvkc.edu.vn/mauhoso');
    }
  });
});

// ===============================================================
// 15. KIỂM TRA FAB (FLOATING ACTION BUTTON)
// ===============================================================
test.describe('Floating Action Button', () => {

  test('FAB ẩn khi ở đầu trang, hiện khi scroll xuống', async ({ page }) => {
    await page.goto('/');
    const fab = page.locator('#fabRegister');
    // Ban đầu FAB bị ẩn (opacity 0)
    await page.waitForTimeout(500);
    const initialOpacity = await fab.evaluate(el => getComputedStyle(el).opacity);
    expect(initialOpacity).toBe('0');

    // Scroll xuống
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(600);
    const afterOpacity = await fab.evaluate(el => getComputedStyle(el).opacity);
    expect(afterOpacity).toBe('1');
  });
});

// ===============================================================
// 16. KIỂM TRA HÌNH ẢNH
// ===============================================================
test.describe('Hình ảnh', () => {

  test('logo hiển thị không bị lỗi', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('.header-logo img');
    await expect(logo).toBeVisible();
    const naturalWidth = await logo.evaluate(img => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test('tất cả ảnh ngành nghề tải được', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('.career-card-img');
    const count = await images.count();
    expect(count).toBe(12);
    for (let i = 0; i < count; i++) {
      const nw = await images.nth(i).evaluate(img => img.naturalWidth);
      expect(nw).toBeGreaterThan(0);
    }
  });
});

// ===============================================================
// 17. KIỂM TRA SCROLL ANIMATION
// ===============================================================
test.describe('Scroll Animation', () => {

  test('career cards bắt đầu ẩn (opacity 0) và visible khi scroll', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    // Card đầu tiên ở section Cao đẳng (ngoài viewport ban đầu) nên opacity = 0
    const firstCard = page.locator('#cao-dang .career-card').first();
    const initialOpacity = await firstCard.evaluate(el => getComputedStyle(el).opacity);

    // Scroll vào view
    await firstCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    const afterOpacity = await firstCard.evaluate(el => getComputedStyle(el).opacity);
    expect(afterOpacity).toBe('1');
  });
});

// ===============================================================
// 18. KIỂM TRA CSS DESIGN TOKENS
// ===============================================================
test.describe('Design Tokens', () => {

  test('primary color là #0f4c81', async ({ page }) => {
    await page.goto('/');
    const color = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
    );
    expect(color).toBe('#0f4c81');
  });

  test('accent color là #f7a325', async ({ page }) => {
    await page.goto('/');
    const color = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
    );
    expect(color).toBe('#f7a325');
  });

  test('font body là Inter', async ({ page }) => {
    await page.goto('/');
    const font = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--font-body').trim()
    );
    expect(font).toContain('Inter');
  });
});
