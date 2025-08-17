/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

const scrollable = document.getElementById("scrollable");
if (scrollable) {
  const content = document.getElementById("scrollablecontent");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  // Get the width of a single item dynamically
  const getItemWidth = () =>
    document.querySelector("a.product-gallery__thumbnail").offsetWidth;
  // Update button visibility based on scroll position
  function updateButtonVisibility() {
    const scrollLeft = scrollable.scrollLeft;
    const maxScrollLeft = content.scrollWidth - scrollable.clientWidth;
    // Show/hide previous button
    if (scrollLeft > 0) {
      prevButton.style.display = "inline-block";
    } else {
      prevButton.style.display = "none";
    }

    // Show/hide next button
    if (scrollLeft < maxScrollLeft) {
      nextButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "none";
    }
  }

  // Scroll to the next position dynamically
  nextButton.addEventListener("click", () => {
    const itemWidth = getItemWidth();
    scrollable.scrollBy({ left: itemWidth, behavior: "smooth" });
  });

  // Scroll to the previous position dynamically
  prevButton.addEventListener("click", () => {
    const itemWidth = getItemWidth();
    scrollable.scrollBy({ left: -itemWidth, behavior: "smooth" });
  });

  // Mouse wheel scrolling
  scrollable.addEventListener("wheel", (e) => {
    e.preventDefault(); // Prevent the default scroll behavior
    scrollable.scrollBy({ left: e.deltaY, behavior: "smooth" });
  });

  // Mouse drag scrolling
  scrollable.addEventListener("mousedown", (e) => {
    isDragging = true;
    scrollable.classList.add("dragging");
    startX = e.pageX - scrollable.offsetLeft;
    scrollLeft = scrollable.scrollLeft;
  });

  scrollable.addEventListener("mouseleave", () => {
    isDragging = false;
    scrollable.classList.remove("dragging");
  });

  scrollable.addEventListener("mouseup", () => {
    isDragging = false;
    scrollable.classList.remove("dragging");
  });

  scrollable.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollable.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed by multiplying the distance
    scrollable.scrollLeft = scrollLeft - walk;
  });

  // Touch scrolling
  scrollable.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - scrollable.offsetLeft;
    scrollLeft = scrollable.scrollLeft;
  });

  scrollable.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollable.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed by multiplying the distance
    scrollable.scrollLeft = scrollLeft - walk;
  });

  scrollable.addEventListener("touchend", () => {
    isDragging = false;
  });

  // Listen to scroll event to update button visibility
  scrollable.addEventListener("scroll", updateButtonVisibility);

  // Recalculate and update on resize
  window.addEventListener("resize", updateButtonVisibility);

  // Initialize button visibility
  updateButtonVisibility();
}

function toggleSharelist() {
  const sharelists = document.getElementsByClassName("product-meta__share-buttons");
  const sharetoggles = document.getElementsByClassName("sharetoggle");
  const productmetas = document.getElementsByClassName("product-meta");
  
  for (let i = 0; i < sharelists.length; i++) {
    const sharelist = sharelists[i];
    const sharetoggle = sharetoggles[i];
    const productmeta = productmetas[i];

    if (sharelist.classList.contains("show")) {
      sharelist.classList.remove("show");
      sharetoggle.classList.remove("show");
      productmeta.classList.remove("show");
    } else {
      sharelist.classList.add("show");
      sharetoggle.classList.remove("show");
      productmeta.classList.add("show");
    }
  }
}
document.addEventListener("DOMContentLoaded", function () {
  // Select the button using its ID, class, or any other selector
  const button = document.querySelector(".product-block-list__item--description .card__collapsible-button"); // Replace with your button's ID or class
  if (button) {
    // Trigger the click event
    button.click();
  }
  $('a.popup-external-video[target="_blank"],a.notarget,a.shoppay').removeAttr('target');
  $("a.shoppay").on("click", function(){
    if($(".shopify-cleanslate div[role='button']").length > 0){
      $(".shopify-cleanslate div[role='button']").trigger("click");
    }
  });
  $("button.shopify-payment-button__buynow").on("click", function(){
    if($('body .product-form__buy-buttons .shopify-payment-button .shopify-payment-button__more-options').length > 0){
      $('body .product-form__buy-buttons .shopify-payment-button .shopify-payment-button__more-options').trigger("click");
    }
  });
});
window.onload = function() {
  $('.open-popup').magnificPopup({
    type:'iframe',
    midClick: true
  });
  $('.open-popup-inline').magnificPopup({
    type:'inline',
    midClick: true
  });
  $('a.popup-external-video[target="_blank"],a.notarget,a.shoppay').removeAttr('target');
  $('.popup-external-video').magnificPopup({
    type: 'iframe',
    iframe: {
        patterns: {
            youtube: {
                index: 'youtube.com/', // String that detects YouTube
                id: function (url) {
                    // Extract video ID from URL
                    var match = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                    return match && match[1] ? match[1] : null;
                },
                src: 'https://www.youtube.com/embed/%id%?autoplay=1&rel=0' // URL for iframe
            },
            vimeo: {
                index: 'vimeo.com/', // Vimeo URL detection
                id: function (url) {
                    var match = url.match(/vimeo.com\/(\d+)/);
                    return match && match[1] ? match[1] : null;
                },
                src: 'https://player.vimeo.com/video/%id%?autoplay=1' // Vimeo embed URL with autoplay
            }
        }
    },
    mainClass: 'mfp-fade', // Optional animation class
    removalDelay: 300,     // Delay before popup is removed
    preloader: false       // Disable preloader
});
}
