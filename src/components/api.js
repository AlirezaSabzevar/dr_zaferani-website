

export async function getHome() {
    const response = await fetch(
        `${API_URL}/api/home/`
    );

    if (!response.ok) {
        throw new Error(
            `خطا در دریافت اطلاعات صفحه اصلی: ${response.status}`
        );
    }

    return response.json();
}






const API_URL = import.meta.env.VITE_API_URL;

export async function getServices() {
  const response = await fetch(`${API_URL}/api/services/`);

  if (!response.ok) {
    throw new Error(
      `خطا در دریافت خدمات: ${response.status}`
    );
  }

  return response.json();
}







export async function getAbout() {
    const response = await fetch(
        `${API_URL}/api/about/`
    );

    if (!response.ok) {
        throw new Error(
            `خطا در دریافت اطلاعات پزشک: ${response.status}`
        );
    }

    return response.json();
}



export async function getAppointment() {
  const response = await fetch(
    `${API_URL}/api/appointment/`
  );

  if (!response.ok) {
    throw new Error(
      `خطا در دریافت اطلاعات نوبت‌دهی: ${response.status}`
    );
  }

  return response.json();
}






export async function getArticles() {
    const response = await fetch(
        `${API_URL}/api/articles/`
    );

    if (!response.ok) {
        throw new Error(
            `خطا در دریافت مقالات: ${response.status}`
        );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
        throw new Error("ساختار اطلاعات مقالات نامعتبر است.");
    }

    return data;
}

export async function getArticlesSettings() {
    const response = await fetch(
        `${API_URL}/api/articles/settings/`
    );

    if (!response.ok) {
        throw new Error(
            `خطا در دریافت تنظیمات مقالات: ${response.status}`
        );
    }

    return response.json();
}



export async function getArticleDetail(slug) {
    const response = await fetch(
        `${API_URL}/api/articles/${encodeURIComponent(slug)}/`
    );

    if (!response.ok) {
        const error = new Error(
            response.status === 404
                ? "مقاله موردنظر پیدا نشد."
                : `خطا در دریافت جزئیات مقاله: ${response.status}`
        );

        error.status = response.status;
        throw error;
    }

    return response.json();
}







export async function getTestimonials() {
    const response = await fetch(
        `${API_URL}/api/testimonials/`
    );

    if (!response.ok) {
        throw new Error(
            `خطا در دریافت نظرات: ${response.status}`
        );
    }

    const data = await response.json();

    if (!Array.isArray(data.testimonials)) {
        throw new Error("ساختار اطلاعات نظرات نامعتبر است.");
    }

    return data;
}



export async function submitTestimonial(payload) {
  const response = await fetch(`${API_URL}/api/testimonials/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const details = Object.values(data)
      .flat()
      .filter((value) => typeof value === "string")
      .join(" ");

    throw new Error(
      details || data.detail || `خطا در ثبت نظر: ${response.status}`
    );
  }

  return data;
}





export async function getGallery() {
    const response = await fetch(
        `${API_URL}/api/gallery/`
    );

    if (!response.ok) {
        throw new Error(
            `خطا در دریافت گالری: ${response.status}`
        );
    }

    const data = await response.json();

    if (!Array.isArray(data.images)) {
        throw new Error("ساختار اطلاعات گالری نامعتبر است.");
    }

    return data;
}





export async function getFAQ() {
    const response = await fetch(
        `${API_URL}/api/faq/`
    );

    if (!response.ok) {
        throw new Error(
            `خطا در دریافت سوالات متداول: ${response.status}`
        );
    }

    const data = await response.json();

    if (!Array.isArray(data.faqs)) {
        throw new Error(
            "ساختار اطلاعات سوالات متداول نامعتبر است."
        );
    }

    return data;
}





export async function getContact() {
  const response = await fetch(`${API_URL}/api/contact/`);

  if (!response.ok) {
    throw new Error(
      `خطا در دریافت اطلاعات تماس: ${response.status}`
    );
  }

  const data = await response.json();

  if (!data || typeof data.info !== "object" || data.info === null) {
    throw new Error("ساختار اطلاعات تماس نامعتبر است.");
  }

  return data;
}
