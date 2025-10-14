const buttonStyles = {
  1: `/* Neon Glow Button */
.btn-1 {
    padding: 15px 40px;
    font-size: 16px;
    background: #000;
    color: #0ff;
    border: 2px solid #0ff;
    border-radius: 5px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff;
}

.btn-1:hover {
    background: #0ff;
    color: #000;
    box-shadow: 0 0 20px #0ff, 0 0 40px #0ff, 0 0 60px #0ff;
}`,
  2: `/* Gradient Slide Button */
.btn-2 {
    padding: 15px 40px;
    font-size: 16px;
    background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: bold;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.btn-2::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
    transition: all 0.5s ease;
}

.btn-2:hover::before {
    left: 0;
}

.btn-2 span {
    position: relative;
    z-index: 1;
}`,
  3: `/* Border Expand Button */
.btn-3 {
    padding: 15px 40px;
    font-size: 16px;
    background: transparent;
    color: #e74c3c;
    border: 3px solid #e74c3c;
    border-radius: 0;
    cursor: pointer;
    position: relative;
    transition: all 0.4s ease;
}

.btn-3::before,
.btn-3::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    transition: all 0.4s ease;
}

.btn-3::before {
    top: -3px;
    left: -3px;
    border-top: 3px solid #e74c3c;
    border-left: 3px solid #e74c3c;
}

.btn-3::after {
    bottom: -3px;
    right: -3px;
    border-bottom: 3px solid #e74c3c;
    border-right: 3px solid #e74c3c;
}

.btn-3:hover::before,
.btn-3:hover::after {
    width: calc(100% + 6px);
    height: calc(100% + 6px);
}

.btn-3:hover {
    color: white;
    background: #e74c3c;
}`,
  4: `/* 3D Push Button */
.btn-4 {
    padding: 15px 40px;
    font-size: 16px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 8px 0 #2980b9, 0 10px 20px rgba(0,0,0,0.3);
    transition: all 0.1s ease;
}

.btn-4:hover {
    box-shadow: 0 6px 0 #2980b9, 0 8px 15px rgba(0,0,0,0.3);
    transform: translateY(2px);
}

.btn-4:active {
    box-shadow: 0 2px 0 #2980b9, 0 4px 10px rgba(0,0,0,0.3);
    transform: translateY(6px);
}`,
  5: `/* Ripple Effect Button */
.btn-5 {
    padding: 15px 40px;
    font-size: 16px;
    background: #9b59b6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    position: relative;
    overflow: hidden;
}

.btn-5::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.btn-5:hover::after {
    width: 300px;
    height: 300px;
}`,
  6: `/* Rotate and Scale Button */
.btn-6 {
    padding: 15px 40px;
    font-size: 16px;
    background: #e67e22;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.btn-6:hover {
    transform: rotate(5deg) scale(1.1);
    background: #d35400;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}`,
  7: `/* Flip Animation Button */
.btn-7 {
    padding: 15px 40px;
    font-size: 16px;
    background: #16a085;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.5s ease;
    transform-style: preserve-3d;
}

.btn-7:hover {
    transform: rotateX(360deg);
    background: #1abc9c;
}`,
  8: `/* Slide Border Button */
.btn-8 {
    padding: 15px 40px;
    font-size: 16px;
    background: white;
    color: #c0392b;
    border: 2px solid #c0392b;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.4s ease;
}

.btn-8::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #c0392b;
    transition: left 0.4s ease;
    z-index: -1;
}

.btn-8:hover {
    color: white;
}

.btn-8:hover::before {
    left: 0;
}`,
  9: `/* Bounce Effect Button */
.btn-9 {
    padding: 15px 40px;
    font-size: 16px;
    background: #f39c12;
    color: white;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
}

.btn-9:hover {
    animation: bounce 0.6s ease;
    background: #f1c40f;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-10px); }
    50% { transform: translateY(-5px); }
    75% { transform: translateY(-8px); }
}`,
  10: `/* Split Fill Button */
.btn-10 {
    padding: 15px 40px;
    font-size: 16px;
    background: transparent;
    color: #2c3e50;
    border: 3px solid #2c3e50;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.5s ease;
}

.btn-10::before,
.btn-10::after {
    content: '';
    position: absolute;
    top: 0;
    width: 0;
    height: 100%;
    background: #2c3e50;
    transition: width 0.5s ease;
    z-index: -1;
}

.btn-10::before {
    left: 50%;
}

.btn-10::after {
    right: 50%;
}

.btn-10:hover {
    color: white;
}

.btn-10:hover::before,
.btn-10:hover::after {
    width: 50%;
}`,
};

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showToast();
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

document.querySelectorAll("[data-btn]").forEach((button) => {
  button.addEventListener("click", function () {
    const btnNumber = this.getAttribute("data-btn");
    const cssCode = buttonStyles[btnNumber];
    copyToClipboard(cssCode);
  });
});
