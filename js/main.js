const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

const toastElList = document.querySelectorAll(".toast");
const toastList = [...toastElList].map(
  (toastEl) => new bootstrap.Toast(toastEl, option)
);

function startCountdown() {
  const countdownElements = document.querySelectorAll(".countdown");
  const offerOverElements = document.querySelectorAll(".offer-over");
  let timeLeft = 0 * 3600 + 0 * 60 + 99915; // 02:45:12

  const timer = setInterval(() => {
    const hours = Math.floor(timeLeft / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");

    countdownElements.forEach(el => {
      el.textContent = `${hours}:${minutes}:${seconds}`;
      
      if (timeLeft <= 10) {
        el.style.color = "#ff0000";
        el.style.animation = "blinkAndPulse 0.5s infinite";
      }
    });

    if (timeLeft <= 0) {
      clearInterval(timer);

      // حذف انیمیشن blink از عناصر countdown
  countdownElements.forEach(el => {
    el.textContent = "زمان سفارش ویژه محصول به پایان رسیده!"; // تغییر متن
    el.style.animation = "none"; // حذف انیمیشن چشمک‌زن
    el.style.color = "#ff0000"; // رنگ قرمز ثابت
    el.style.fontSize = "1.5rem"; // تنظیم سایز مناسب برای پیغام
    el.classList.add("finished");
  });

      // اضافه کردن کلاس finished به عناصر countdown
      countdownElements.forEach(el => {
        el.classList.add("finished");
      });
      
      offerOverElements.forEach(offer => {
        // اضافه کردن کلاس blurred
        offer.classList.add("blurred");
        
        // حذف هرگونه transform از تصاویر
        const images = offer.querySelectorAll('.offer-over-image');
        images.forEach(img => {
          img.style.transform = 'none';
          img.style.transition = 'none';
        });

        // تنظیم کرسرها
        const children = offer.querySelectorAll('*');
        children.forEach(child => {
          child.style.cursor = 'default';
          if(child.classList.contains('add-to-cart-btn') || 
             child.classList.contains('clickable')) {
            child.style.cursor = 'pointer';
          }
        });
      });

      // غیرفعال کردن لینک‌های منقضی شده
      document.querySelectorAll("a.expired").forEach(link => {
        link.removeAttribute("href");
        link.style.cursor = "default";
        link.onclick = e => e.preventDefault();
      });
    }

    timeLeft--;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", startCountdown);

document.getElementById("scrollDownBtn").addEventListener("click", () => {
  window.scrollTo({
    top: document.body.scrollHeight, // اسکرول به انتهای صفحه
    behavior: "smooth", // اثر نرم و روان
  });
});
document.getElementById("scrollTopBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0, // اسکرول به ابتدای صفحه
    behavior: "smooth", // اثر نرم و روان
  });
});