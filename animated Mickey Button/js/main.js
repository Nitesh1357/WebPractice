document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const mickeyContainer = document.querySelector(".mickey-container");
  const button = document.querySelector(".mickey-button");

  button.addEventListener("mouseenter", () => {
    mickeyContainer.classList.add("hovered");
    addFloatingDots();
  });

  button.addEventListener("mouseleave", () => {
    mickeyContainer.classList.remove("hovered");
    removeFloatingDots();
  });

  button.addEventListener("click", (e) => {
    mickeyContainer.classList.add("pressed");
    setTimeout(() => mickeyContainer.classList.remove("pressed"), 200);

    createSparkles(e);
  });

  function createSparkles(e) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const numSparkles = 8;

    for (let i = 0; i < numSparkles; i++) {
      const sparkle = document.createElement("i");
      sparkle.setAttribute("data-lucide", "sparkles");
      sparkle.classList.add("sparkle");
      lucide.createIcons({ icons: { sparkles: lucide.icons.sparkles } });

      const angle = (i * 45) * (Math.PI / 180);
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.setProperty("--tx", `${Math.cos(angle) * 60}px`);
      sparkle.style.setProperty("--ty", `${Math.sin(angle) * 60}px`);

      button.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 600);
    }
  }

  function addFloatingDots() {
    if (document.querySelector(".float-dot")) return;

    const dots = [
      { class: "dot1" },
      { class: "dot2" },
      { class: "dot3" },
    ];

    dots.forEach(({ class: className }) => {
      const dot = document.createElement("div");
      dot.className = `float-dot ${className}`;
      mickeyContainer.appendChild(dot);
    });
  }

  function removeFloatingDots() {
    document.querySelectorAll(".float-dot").forEach(dot => dot.remove());
  }
});