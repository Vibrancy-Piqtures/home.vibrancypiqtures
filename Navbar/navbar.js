function includeNavbar() {
  const navbarElement = document.getElementById("navbar");
  if (!navbarElement) return;

  navbarElement.innerHTML = `
    <nav class="navbar" id="mainNavbar">
      <div class="menu-toggle" id="hamburgerBtn">
        <svg viewBox="0 0 120 100" width="25" height="25" fill="#FFFFFF">
          <rect x="10" y="10" width="100" height="15" rx="7" ry="7"></rect>
          <rect x="10" y="40" width="100" height="15" rx="7" ry="7"></rect>
          <rect x="10" y="70" width="100" height="15" rx="7" ry="7"></rect>
        </svg>
      </div>

      <ul class="menu" id="menuList">
        <li><a href="/">Home</a></li>
        <li><a href="/gallery">Gallery</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact-us">Contact</a></li>
      </ul>

      <div class="search-container" id="searchWrapper">
        <input type="text" placeholder="Search..." id="search-input">
        <button type="button" id="search-button" aria-label="Search">
          <svg viewBox="0 0 515.9 728.5" width="22" height="22">
            <path fill="#FFFFFF" d="M472.8,653.9c-34.2-35.4-69.1-70.4-103.6-105.8c-12.2-12.2-23-25.4-41.9-30c-16.7-4.3-19.5-19.7-10.8-34.7c14.7-25,23.7-51.5,23.4-81.2c-0.7-9.7-0.3-19.3-2.4-28.2c-13.6-66.1-52.3-109.4-116.2-125.5c-64.2-16.4-124.5,8.6-162.9,64.4c-40.8,59-33.5,144.8,16.4,197c51.3,53.3,138.5,62.9,196.4,20.4c10.5-7.9,15.3-5.7,24.1,2.9c11.2,11.1,8.7,27.5,19.9,38.6c40.8,40,80.2,81.2,120.3,121.6c15.3,15.4,30.3,16.1,42.6,3.2C488.8,683.6,487.8,669.7,472.8,653.9z M184.3,523.4c-67.3-0.4-121-55.1-121-123.3c0-68.6,55.1-124.1,123.1-123c66.3,0.7,121.4,57.6,120.7,124.4C306.4,469.1,251.3,523.8,184.3,523.4z"/>
          </svg>
        </button>
      </div>
    </nav>
  `;

  const searchBtn = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const searchWrapper = document.getElementById("searchWrapper");
  const hamburger = document.getElementById("hamburgerBtn");
  const menuList = document.getElementById("menuList");

  // --- Search Logic ---
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query === "") {
      searchWrapper.classList.toggle("active");
      if (searchWrapper.classList.contains("active")) {
        searchInput.focus();
      }
    } else {
      // Clean URLs for Vercel - no .html extension
      window.location.href = `/gallery?search=${encodeURIComponent(query)}`;
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `/gallery?search=${encodeURIComponent(query)}`;
      }
    }
  });

  // --- Mobile Menu Logic ---
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    menuList.classList.toggle("show-menu");
  });

  document.addEventListener("click", (e) => {
    if (!menuList.contains(e.target) && e.target !== hamburger) {
      menuList.classList.remove("show-menu");
    }
  });

  // Close menu on window resize if desktop view
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      menuList.classList.remove("show-menu");
    }
  });
}

document.addEventListener("DOMContentLoaded", includeNavbar);