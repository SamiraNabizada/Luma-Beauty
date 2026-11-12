gsap.registerPlugin(ScrollTrigger);

// ========================================
// 1. اطلاعات محصولات
// ========================================

const bestProducts = [
  {
    id: 1,
    name: "عطر زنانه لوکس",
    category: "عطر و خوشبوکننده",
    price: 1200,
    image: "https://pngimg.com/uploads/perfume/perfume_PNG10280.png"
  },
  {
    id: 2,
    name: "رژ لب مخملی",
    category: "آرایش لب",
    price: 350,
    image: "https://pngimg.com/uploads/lipstick/lipstick_PNG5.png"
  },
  {
    id: 3,
    name: "کریم مرطوب‌کننده",
    category: "مراقبت از پوست",
    price: 550,
    image: "https://static.vecteezy.com/system/resources/thumbnails/086/723/203/small_2x/rose-gold-makeup-powder-compact-mirror-open-on-transparent-background-png.png"
  },
  {
    id: 4,
    name: "ریمل حجم‌دهنده",
    category: "آرایش چشم",
    price: 400,
    image: "https://pngimg.com/uploads/mascara/mascara_PNG20.png"
  },
  {
    id: 5,
    name: "لاک ناخن رنگی",
    category: "زیبایی ناخن",
    price: 250,
    image: "https://pngimg.com/uploads/nail_polish/nail_polish_PNG24.png"
  }
];

const otherProducts = [
  {
    id: 6,
    name: " پالت چهار رنگ",
    category: "آرایش چشم",
    price: 650,
    image: "https://static.vecteezy.com/system/resources/thumbnails/074/083/835/small_2x/elegant-eyeshadow-palette-four-neutral-shades-in-a-compact-with-mirror-png.png"
  },
  {
    id: 7,
    name: "پالت سایه چشم",
    category: "آرایش چشم",
    price: 700,
    image: "https://static.vecteezy.com/system/resources/thumbnails/027/850/022/small_2x/eyeshadow-pallete-isolated-png.png"
  },
  {
    id: 8,
    name: "عطر زنانه خاص",
    category: "عطر و خوشبوکننده",
    price: 900,
    image: "https://pngimg.com/uploads/perfume/perfume_PNG10300.png"
  },
  {
    id: 9,
    name: "پنکیک صورت",
    category: "آرایش صورت",
    price: 450,
    image: "https://static.vecteezy.com/system/resources/thumbnails/082/056/171/small_2x/3d-black-compact-powder-with-sponge-and-mirror-realistic-beauty-skincare-face-foundation-isolated-on-white-makeup-beauty-cosmetic-product-3d-render-png.png"
  },
  {
    id: 10,
    name: "لاک ناخن قرمز",
    category: "زیبایی ناخن",
    price: 200,
    image: "https://pngimg.com/uploads/nail_polish/nail_polish_PNG25.png"
  },
  {
    id: 11,
    name: "رژ لب کلاسیک",
    category: "آرایش لب",
    price: 300,
    image: "https://pngimg.com/uploads/lipstick/lipstick_PNG5.png"
  },
  {
    id: 12,
    name: "ست کامل برس ",
    category: "آرایش چشم و صورت",
    price: 550,
    image: "https://static.vecteezy.com/system/resources/thumbnails/059/246/419/small_2x/elegant-makeup-brush-set-free-png.png"
  },
  {
    id: 13,
    name: "ریمل حجم‌دهنده",
    category: "آرایش چشم",
    price: 400,
    image: "https://pngimg.com/uploads/mascara/mascara_PNG20.png"
  },
  {
    id: 14,
    name: "عطر روزانه",
    category: "عطر و خوشبوکننده",
    price: 750,
    image: "https://pngimg.com/uploads/perfume/perfume_PNG10236.png"
  },
  {
    id: 15,
    name: " رژ لب صورتی مابع ",
    category: "زیبایی لب",
    price: 220,
    image: "https://static.vecteezy.com/system/resources/thumbnails/067/219/178/small_2x/lipstick-bottle-with-a-blue-cap-isolated-against-a-transparent-background-free-png.png"
  }
];

const allProducts = [...bestProducts, ...otherProducts];


// ========================================
// 2. تنظیم قیمت‌ها
// ========================================

const numberFormat = new Intl.NumberFormat("fa-AF");

function formatMoney(amount) {
  return `${numberFormat.format(amount)} افغانی`;
}


// ========================================
// 3. انیمیشن پنج محصول Hero
// ========================================

let productTimeline = null;
let flyingProducts = [];
let animationResizeTimer = null;
let animationReady = false;


// موقعیت تصویری در صفحه نمایش
function getViewportPosition(element) {
  const rect = element.getBoundingClientRect();

  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height
  };
}


// هماهنگ‌سازی تصاویر Hero و کارت‌های مقصد
function synchronizeBestImages() {

  for (let id = 1; id <= 5; id++) {

    const source = document.querySelector(
      `.hero-product[data-product="${id}"] img`
    );

    const target = document.querySelector(
      `.best-product-image[data-product="${id}"]`
    );

    if (!source || !target) continue;

    const sourceURL = source.currentSrc || source.src;

    if (sourceURL && target.src !== sourceURL) {
      target.src = sourceURL;
    }

    target.loading = "eager";
    target.decoding = "async";

  }

}


// انتظار برای بارگذاری تصاویر
function waitForImage(img) {

  if (img.complete && img.naturalWidth > 0) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {

    const timeout = setTimeout(() => {
      resolve(false);
    }, 10000);

    function finish(success) {
      clearTimeout(timeout);
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
      resolve(success);
    }

    function onLoad() {
      finish(img.naturalWidth > 0);
    }

    function onError() {
      finish(false);
    }

    img.addEventListener("load", onLoad, { once: true });
    img.addEventListener("error", onError, { once: true });

  });

}


// انتظار برای تصاویر موردنیاز
async function waitForImages() {

  const images = document.querySelectorAll(
    ".hero-product img, .best-product-image"
  );

  await Promise.all(
    [...images].map((img) => waitForImage(img))
  );

}


// ========================================
// 4. پاک کردن انیمیشن قبلی
// ========================================

function removeHeroAnimation() {

  if (productTimeline) {

    if (productTimeline.scrollTrigger) {
      productTimeline.scrollTrigger.kill();
    }

    productTimeline.kill();
    productTimeline = null;

  }

  flyingProducts.forEach((item) => {

    item.clone.remove();

    item.source.style.visibility = "visible";
    item.target.style.visibility = "visible";

  });

  flyingProducts = [];

}


// ========================================
// 5. حرکت و نمایش تصاویر
// ========================================

function syncProductVisibility(progress) {

  const p = Math.max(0, Math.min(1, progress));

  flyingProducts.forEach((item) => {

    const start = getViewportPosition(item.source);
    const end = getViewportPosition(item.target);

    const x =
      start.left + (end.left - start.left) * p;

    const y =
      start.top + (end.top - start.top) * p;

    const width =
      start.width + (end.width - start.width) * p;

    const height =
      start.height + (end.height - start.height) * p;

    gsap.set(item.clone, {
      x,
      y,
      width,
      height
    });

    // ابتدای انیمیشن: فقط تصویر Hero
    if (p <= 0.001) {

      item.source.style.visibility = "visible";
      item.target.style.visibility = "hidden";
      item.clone.style.visibility = "hidden";

    }

    // پایان انیمیشن: فقط تصویر کارت
    else if (p >= 0.999) {

      item.source.style.visibility = "hidden";
      item.target.style.visibility = "visible";
      item.clone.style.visibility = "hidden";

    }

    // هنگام حرکت: فقط تصویر شناور
    else {

      item.source.style.visibility = "hidden";
      item.target.style.visibility = "hidden";
      item.clone.style.visibility = "visible";

    }

  });

}



// ========================================
// 6. ساخت انیمیشن محصولات
// ========================================

function createHeroAnimation() {

  removeHeroAnimation();

  const bestSection = document.querySelector("#best-sellers");

  if (!bestSection) {
    console.warn("بخش best-sellers پیدا نشد.");
    return;
  }


  for (let id = 1; id <= 5; id++) {

    const source = document.querySelector(
      `.hero-product[data-product="${id}"] img`
    );

    const target = document.querySelector(
      `.best-product-image[data-product="${id}"]`
    );

    if (!source || !target) {

      console.warn(`محصول شماره ${id} پیدا نشد.`);
      continue;

    }


    if (
      !source.complete ||
      source.naturalWidth === 0 ||
      !target.complete ||
      target.naturalWidth === 0
    ) {

      console.warn(`تصویر شماره ${id} هنوز آماده نیست.`);
      continue;

    }


    const start = getViewportPosition(source);
    const end = getViewportPosition(target);


    if (
      start.width <= 0 ||
      start.height <= 0 ||
      end.width <= 0 ||
      end.height <= 0
    ) {

      console.warn(`اندازه تصویر شماره ${id} معتبر نیست.`);
      continue;

    }


    // ساخت تصویر شناور
    const clone = document.createElement("img");

    clone.src = source.currentSrc || source.src;
    clone.alt = source.alt || "";
    clone.className = "flying-product";
    clone.setAttribute("aria-hidden", "true");


    Object.assign(clone.style, {

      position: "fixed",
      left: "0px",
      top: "0px",

      width: `${start.width}px`,
      height: `${start.height}px`,

      objectFit: "contain",
      objectPosition: "center",

      pointerEvents: "none",
      visibility: "hidden",

      zIndex: "150",

      margin: "0",
      padding: "0",

      maxWidth: "none",
      maxHeight: "none"

    });


    document.body.appendChild(clone);


    flyingProducts.push({

      id,
      source,
      target,
      clone

    });

  }


  if (flyingProducts.length === 0) {

    console.error("هیچ تصویری برای انیمیشن آماده نیست.");
    return;

  }


  console.log(
    `انیمیشن فعال شد: ${flyingProducts.length} محصول`
  );


  const animationState = {
    progress: 0
  };


  syncProductVisibility(0);


  // انیمیشن متصل به اسکرول
  productTimeline = gsap.to(animationState, {

    progress: 1,

    ease: "none",

    scrollTrigger: {

      trigger: bestSection,

      start: "top bottom",

      end: "top 20%",

      scrub: 0.8,

      invalidateOnRefresh: true,

      onUpdate: (self) => {

        animationState.progress = self.progress;

        syncProductVisibility(self.progress);

      },

      onRefresh: (self) => {

        animationState.progress = self.progress;

        syncProductVisibility(self.progress);

      }

    }

  });


  ScrollTrigger.refresh();

  animationReady = true;

}


// ========================================
// 7. راه‌اندازی انیمیشن
// ========================================

async function initializeHeroAnimation() {

  if (animationReady) return;

  synchronizeBestImages();

  await waitForImages();

  requestAnimationFrame(() => {

    createHeroAnimation();

  });

}


window.addEventListener("load", initializeHeroAnimation);


// تغییر اندازه صفحه
window.addEventListener("resize", () => {

  clearTimeout(animationResizeTimer);

  animationResizeTimer = setTimeout(async () => {

    animationReady = false;

    synchronizeBestImages();

    await waitForImages();

    createHeroAnimation();

  }, 400);

});


// هماهنگی با فونت‌ها
if (document.fonts && document.fonts.ready) {

  document.fonts.ready.then(() => {

    if (document.readyState === "complete") {

      ScrollTrigger.refresh();

    }

  });

}


// ========================================
// 8. عناصر محصولات
// ========================================

const productsGrid = document.getElementById("all-products-grid");
const searchInput = document.getElementById("product-search");
const searchResult = document.getElementById("search-result");
const noProducts = document.getElementById("no-products");


// ========================================
// 9. ساخت کارت محصولات
// ========================================

function createProductCard(product) {

  const card = document.createElement("article");
  card.className = "product-card";

  const visual = document.createElement("div");
  visual.className = "product-visual";

  const image = document.createElement("img");

  image.src = product.image;
  image.alt = product.name;
  image.loading = "lazy";

  image.addEventListener("error", () => {
    image.style.display = "none";
  });


  visual.appendChild(image);


  const info = document.createElement("div");
  info.className = "product-info";

  const category = document.createElement("span");
  category.className = "product-category";
  category.textContent = product.category;

  const name = document.createElement("h3");
  name.textContent = product.name;


  const bottom = document.createElement("div");
  bottom.className = "product-bottom";

  const price = document.createElement("strong");
  price.textContent = formatMoney(product.price);

  const addButton = document.createElement("button");

  addButton.className = "add-button";
  addButton.textContent = "+";

  addButton.setAttribute(
    "data-cart-id",
    String(product.id)
  );

  addButton.setAttribute(
    "aria-label",
    `افزودن ${product.name} به سبد خرید`
  );


  bottom.append(price, addButton);

  info.append(category, name, bottom);

  card.append(visual, info);

  return card;

}


// ========================================
// 10. نمایش محصولات
// ========================================

function renderProducts(products) {

  if (!productsGrid) return;

  productsGrid.innerHTML = "";

  products.forEach((product) => {

    productsGrid.appendChild(
      createProductCard(product)
    );

  });


  if (searchResult) {

    searchResult.textContent =
      `${numberFormat.format(products.length)} محصول پیدا شد`;

  }

  if (noProducts) {

    noProducts.hidden = products.length !== 0;

  }

}


renderProducts(otherProducts);


// ========================================
// 11. جستجوی محصولات
// ========================================

if (searchInput) {

  searchInput.addEventListener("input", () => {

    const searchText = searchInput.value
      .trim()
      .toLocaleLowerCase();

    const filteredProducts = otherProducts.filter((product) => {

      const name = product.name.toLocaleLowerCase();
      const category = product.category.toLocaleLowerCase();

      return (
        name.includes(searchText) ||
        category.includes(searchText)
      );

    });

    renderProducts(filteredProducts);

  });

}


// ========================================
// 12. عناصر سبد خرید
// ========================================

let cart = [];

const cartToggle = document.getElementById("cart-toggle");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const closeCartButton = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

const checkoutButton = document.getElementById("checkout-button");


// ========================================
// 13. باز کردن سبد خرید
// ========================================

function openCart() {

  if (!cartDrawer || !cartOverlay) return;

  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");

  document.body.classList.add("cart-open");

}


// بستن سبد خرید
function closeCart() {

  if (!cartDrawer || !cartOverlay) return;

  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");

  document.body.classList.remove("cart-open");

}


cartToggle?.addEventListener("click", openCart);

closeCartButton?.addEventListener("click", closeCart);

cartOverlay?.addEventListener("click", closeCart);


// ========================================
// 14. افزودن محصول به سبد خرید
// ========================================

function addToCart(productId) {

  const product = allProducts.find(
    (item) => item.id === Number(productId)
  );

  if (!product) return;

  const existing = cart.find(
    (item) => item.id === product.id
  );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }


  updateCart();

  openCart();

}


// ========================================
// 15. تشخیص دکمه خرید
// ========================================

document.addEventListener("click", (event) => {

  const button = event.target.closest(".add-button");

  if (!button) return;

  const cartId = button.getAttribute("data-cart-id");
  const bestId = button.getAttribute("data-best-id");

  const productId = cartId || bestId;

  if (!productId) return;

  addToCart(productId);

});


// ========================================
// 16. تغییر تعداد محصولات
// ========================================

function changeQuantity(productId, amount) {

  const product = cart.find(
    (item) => item.id === Number(productId)
  );

  if (!product) return;

  product.quantity += amount;


  if (product.quantity <= 0) {

    cart = cart.filter(
      (item) => item.id !== Number(productId)
    );

  }


  updateCart();

}


// ========================================
// 17. حذف محصول از سبد
// ========================================

function removeFromCart(productId) {

  cart = cart.filter(
    (item) => item.id !== Number(productId)
  );

  updateCart();

}


// ========================================
// 18. ساخت آیتم سبد خرید
// ========================================

function createCartItem(product) {

  const item = document.createElement("div");
  item.className = "cart-item";

  const image = document.createElement("img");

  image.src = product.image;
  image.alt = product.name;

  image.addEventListener("error", () => {
    image.style.visibility = "hidden";
  });


  const info = document.createElement("div");
  info.className = "cart-item-info";

  const name = document.createElement("h4");
  name.textContent = product.name;

  const price = document.createElement("p");

  price.textContent = formatMoney(
    product.price * product.quantity
  );


  const controls = document.createElement("div");
  controls.className = "quantity-controls";


  const increase = document.createElement("button");

  increase.textContent = "+";
  increase.setAttribute("data-action", "increase");
  increase.setAttribute("data-id", String(product.id));


  const quantity = document.createElement("span");

  quantity.textContent = numberFormat.format(product.quantity);


  const decrease = document.createElement("button");

  decrease.textContent = "−";
  decrease.setAttribute("data-action", "decrease");
  decrease.setAttribute("data-id", String(product.id));


  controls.append(increase, quantity, decrease);

  info.append(name, price, controls);


  const remove = document.createElement("button");

  remove.className = "remove-item";
  remove.textContent = "×";

  remove.setAttribute("data-action", "remove");
  remove.setAttribute("data-id", String(product.id));


  item.append(image, info, remove);

  return item;

}


// ========================================
// 19. به‌روزرسانی سبد خرید
// ========================================

function updateCart() {

  if (!cartItems) return;

  cartItems.innerHTML = "";

  let totalPrice = 0;
  let totalQuantity = 0;


  if (cart.length === 0) {

    const empty = document.createElement("p");

    empty.className = "empty-cart";
    empty.textContent = "سبد خرید شما خالی است.";

    cartItems.appendChild(empty);

  }


  cart.forEach((product) => {

    totalPrice += product.price * product.quantity;
    totalQuantity += product.quantity;

    cartItems.appendChild(
      createCartItem(product)
    );

  });


  if (cartCount) {
    cartCount.textContent = numberFormat.format(totalQuantity);
  }

  if (cartTotal) {
    cartTotal.textContent = formatMoney(totalPrice);
  }

  if (checkoutButton) {
    checkoutButton.disabled = cart.length === 0;
  }

}


// ========================================
// 20. دکمه‌های سبد خرید
// ========================================

if (cartItems) {

  cartItems.addEventListener("click", (event) => {

    const button = event.target.closest("[data-action]");

    if (!button) return;

    const id = button.getAttribute("data-id");
    const action = button.getAttribute("data-action");


    if (action === "increase") {
      changeQuantity(id, 1);
    }

    if (action === "decrease") {
      changeQuantity(id, -1);
    }

    if (action === "remove") {
      removeFromCart(id);
    }

  });

}


// ========================================
// 21. تکمیل سفارش
// ========================================

checkoutButton?.addEventListener("click", () => {

  if (cart.length === 0) return;

  const orderLines = cart.map((product) => {

    return `${product.name} × ${numberFormat.format(product.quantity)}`;

  });


  const total = cart.reduce((sum, product) => {

    return sum + product.price * product.quantity;

  }, 0);


  const message = [
    "خلاصه سفارش شما:",
    "",
    ...orderLines,
    "",
    `مجموع قابل پرداخت: ${formatMoney(total)}`,
    "",
    "برای ثبت نهایی سفارش، لطفاً با فروشگاه تماس بگیرید."
  ].join("\n");


  alert(message);

});


// ========================================
// 22. منوی موبایل
// ========================================

const menuButton = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");


menuButton?.addEventListener("click", () => {

  mainNav?.classList.toggle("mobile-open");

});


mainNav?.querySelectorAll("a").forEach((link) => {

  link.addEventListener("click", () => {

    mainNav.classList.remove("mobile-open");

  });

});


// ========================================
// 23. بستن با کلید Escape
// ========================================

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    closeCart();

    mainNav?.classList.remove("mobile-open");

  }

});


// ========================================
// 24. شروع فروشگاه
// ========================================

updateCart();

console.log("LUMA BEAUTY Store is running successfully!");