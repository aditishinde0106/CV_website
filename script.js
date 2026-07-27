const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".disabled-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

document.querySelectorAll("details").forEach((detail) => {
  detail.open = true;
  const summary = detail.querySelector("summary");
  if (summary) {
    summary.addEventListener("click", (event) => {
      event.preventDefault();
      detail.open = true;
    });
  }
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get("name")?.toString().trim() || "Visitor";
    const message = data.get("message")?.toString().trim() || "";
    const contactMethod = data.get("contactMethod")?.toString() || "whatsapp";
    const preparedMessage = `Hello Aditi, my name is ${name}.\n\n${message}`;
    const encodedMessage = encodeURIComponent(preparedMessage);
    const contactLinks = {
      whatsapp: {
        url: `https://api.whatsapp.com/send?phone=917058941803&text=${encodedMessage}`,
        status: "WhatsApp opened with your message ready to send.",
      },
      email: {
        url: `mailto:shindeaditi0106@gmail.com?subject=${encodeURIComponent("Portfolio contact")}&body=${encodedMessage}`,
        status: "Email opened with your message ready to send.",
      },
      linkedin: {
        url: "https://www.linkedin.com/in/aditi-shinde-b4384239a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        status: "LinkedIn opened. You can send your message there.",
      },
    };
    const selectedLink = contactLinks[contactMethod] || contactLinks.whatsapp;
    window.open(selectedLink.url, "_blank", "noopener");
    formStatus.textContent = selectedLink.status;
  });
}

const resumeAnswers = {
  summary:
    "Aditi Prashant Shinde is an AI and Analytics enthusiast with hands-on experience in RAG pipelines, AI chatbots, data ingestion, analytics dashboards, LLMs, NLP, prompt engineering, and data visualization.",
  education:
    "Aditi is pursuing B.Tech in Computer Science Engineering - AI and Analytics from MIT ADT University, Pune, with a CGPA of 8.96. Passing year: 2026. She completed HSC in 2022 with 65.67% and SSC in 2020 with 92.60%.",
  internship:
    "During the AI Internship at Sagitec Solutions, Aditi built a scalable data ingestion pipeline for 10+ document formats, worked on AI-driven knowledge base creation, evaluated local Ollama models, and validated document-based queries for relevance and hallucination detection.",
  rag:
    "Aditi has worked on Retrieval-Augmented Generation by combining document parsing, embeddings, Qdrant vector search, and local LLM evaluation to produce context-aware answers from enterprise knowledge bases.",
  chatbot:
    "Aditi developed an AI-powered chatbot using semantic search and structured knowledge bases to deliver accurate, context-aware responses from enterprise documents.",
  metricmind:
    "MetricMind is an AI-powered analytics dashboard that automates data visualization and report generation from CSV and Excel datasets. It processed 50,000+ rows, 24+ columns, integrated 5 local LLMs, and supported 5+ interactive visualizations.",
  campus:
    "Campus Connect is a smart-campus platform with 8 student service modules for academic collaboration, budgeting, navigation, and campus engagement. It also included an AI chatbot using a structured knowledge base and document ingestion pipeline.",
  pmpml:
    "PMPML Digital Transit Hub is an Android prototype based on a survey of 50+ daily commuters. It focused on route planning, digital ticket booking, navigation, OTP authentication, and a user-friendly commuter journey.",
  skills:
    "Aditi's key skills include Python, SQL, C, Machine Learning, Deep Learning, LLMs, NLP, prompt engineering, data preprocessing, data ingestion, Power BI, Tableau, MySQL, MongoDB, Qdrant, HTML, CSS, Figma, Canva, Postman, GitHub, Ollama, and MS Excel.",
  certificates:
    "Aditi has certificates in Power BI Data Analyst Associate, AI LLM Developer Program by HCL Tech, AWS Academy Cloud Foundations, Foundation of AI, Networking Basics, Python for Data Science, Tableau Visualization, and Data Visualising in R.",
  achievements:
    "Aditi was Class Representative at MIT ADT University from 2022 to 2025, volunteered in event management and guest liaison, founded Dil Se Desserts, and is leading the digital presence of a startup perfume brand from 2026.",
  creative:
    "Video editing strengthens Aditi's profile because it shows communication, storytelling, visual clarity, brand thinking, and the ability to present technical work in a way people can quickly understand.",
  whyhire:
    "Aditi brings a useful mix of AI knowledge, analytics skills, project execution, dashboard building, chatbot experience, and creative communication. She can work on both technical implementation and clear presentation of the final output.",
};

const projectPoints = {
  metricmind: [
    "Problem: Manual analysis of CSV and Excel data is slow and difficult for non-technical users.",
    "Solution: I built an AI-powered analytics dashboard that automates profiling, visualization, and report generation.",
    "Impact: It handled 50,000+ rows, 24+ columns, 5 local LLMs, and 5+ interactive chart types.",
    "What I can explain: data ingestion, automated visualization, local LLM insights, filtering, and decision support.",
  ],
  campus: [
    "Problem: Students need one place for academic collaboration, budgeting, navigation, and campus engagement.",
    "Solution: I helped build a modular smart-campus platform with 8 student service modules.",
    "Impact: Evaluation showed 78% adoption, 81% task efficiency, and 84% user satisfaction.",
    "What I can explain: modular design, chatbot assistance, knowledge base structure, and student-centered workflows.",
  ],
  pmpml: [
    "Problem: PMPML commuters face difficulties with route planning, ticket booking, and public transport navigation.",
    "Solution: I surveyed 50+ commuters and developed an Android prototype with authentication and core transit modules.",
    "Impact: The project connected user research with practical features like route planning, digital tickets, and navigation.",
    "What I can explain: survey-based design, Android prototyping, OTP login, and commuter journey validation.",
  ],
};

const resumePromptButtons = document.querySelectorAll("#resume-prompts button");
const resumeAnswer = document.querySelector("#resume-answer");

if (resumePromptButtons.length && resumeAnswer) {
  resumePromptButtons.forEach((button) => {
    button.addEventListener("click", () => {
      resumePromptButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      resumeAnswer.textContent = resumeAnswers[button.dataset.answer];
    });
  });
}

const projectButtons = document.querySelectorAll("#project-switcher button");
const talkingPoints = document.querySelector("#talking-points");

function renderProjectPoints(projectKey) {
  if (!talkingPoints) return;
  const points = projectPoints[projectKey] || [];
  talkingPoints.innerHTML = points.map((point) => `<li>${point}</li>`).join("");
}

if (projectButtons.length && talkingPoints) {
  projectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      projectButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderProjectPoints(button.dataset.project);
    });
  });
  renderProjectPoints("metricmind");
}

const videoModal = document.querySelector("#video-modal");
const videoPlayer = document.querySelector("#creative-video-player");
const videoTitle = document.querySelector("#video-modal-title");
const videoClose = document.querySelector("#video-close");
const videoCards = document.querySelectorAll(".video-card");

function closeCreativeVideo() {
  if (!videoModal || !videoPlayer) return;
  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();
  videoModal.classList.remove("open");
  videoModal.setAttribute("aria-hidden", "true");
}

if (videoModal && videoPlayer && videoTitle && videoCards.length) {
  videoCards.forEach((card) => {
    card.addEventListener("click", () => {
      videoTitle.textContent = card.dataset.videoTitle || "AI Creative Video";
      videoPlayer.src = card.dataset.videoSrc;
      videoPlayer.muted = false;
      videoPlayer.controls = true;
      videoModal.classList.add("open");
      videoModal.setAttribute("aria-hidden", "false");
      videoPlayer.play().catch(() => {
        videoPlayer.controls = true;
      });
    });
  });
}

if (videoClose) {
  videoClose.addEventListener("click", closeCreativeVideo);
}

if (videoModal) {
  videoModal.addEventListener("click", (event) => {
    if (event.target === videoModal) {
      closeCreativeVideo();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCreativeVideo();
  }
});

const aiCanvas = document.querySelector("#robot-video-bg");

if (aiCanvas) {
  const ctx = aiCanvas.getContext("2d");
  const points = [];
  let animationFrame;

  function resizeCanvas() {
    const rect = aiCanvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    aiCanvas.width = Math.max(1, Math.floor(rect.width * ratio));
    aiCanvas.height = Math.max(1, Math.floor(rect.height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    points.length = 0;
    const count = Math.max(36, Math.floor((rect.width * rect.height) / 18000));
    for (let index = 0; index < count; index += 1) {
      points.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }

  function drawRobotBackground() {
    const rect = aiCanvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "rgba(3, 8, 18, 0.95)");
    gradient.addColorStop(0.5, "rgba(6, 18, 32, 0.86)");
    gradient.addColorStop(1, "rgba(20, 8, 20, 0.92)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    points.forEach((point) => {
      point.x += point.vx;
      point.y += point.vy;
      point.pulse += 0.03;
      if (point.x < 0 || point.x > rect.width) point.vx *= -1;
      if (point.y < 0 || point.y > rect.height) point.vy *= -1;
    });

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const distance = Math.hypot(dx, dy);
        if (distance < 135) {
          ctx.strokeStyle = `rgba(94, 234, 212, ${0.34 * (1 - distance / 135)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }

    points.forEach((point) => {
      const radius = 3.5 + Math.sin(point.pulse) * 1.4;
      ctx.fillStyle = "rgba(94, 234, 212, 0.74)";
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(114, 167, 255, 0.22)";
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius * 3.2, 0, Math.PI * 2);
      ctx.fill();
    });

    const time = Date.now() / 1000;
    const robotX = rect.width * 0.72;
    const robotY = rect.height * 0.47;
    const armSwing = Math.sin(time * 2.3) * 14;
    const screenGlow = 0.48 + Math.sin(time * 3) * 0.12;

    ctx.save();
    ctx.translate(robotX, robotY);

    ctx.fillStyle = "rgba(12, 22, 38, 0.92)";
    ctx.strokeStyle = "rgba(94, 234, 212, 0.58)";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.roundRect(-58, -88, 116, 86, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(1, 8, 18, 0.92)";
    ctx.beginPath();
    ctx.roundRect(-36, -66, 72, 30, 10);
    ctx.fill();

    ctx.fillStyle = "#7df9ff";
    ctx.beginPath();
    ctx.arc(-18, -51, 5 + Math.sin(time * 5) * 1.2, 0, Math.PI * 2);
    ctx.arc(18, -51, 5 + Math.cos(time * 5) * 1.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(125, 245, 255, 0.62)";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(0, -2);
    ctx.lineTo(0, 54);
    ctx.stroke();

    ctx.fillStyle = "rgba(12, 22, 38, 0.92)";
    ctx.strokeStyle = "rgba(94, 234, 212, 0.5)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(-64, 54, 128, 126, 24);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(94, 234, 212, 0.18)";
    ctx.beginPath();
    ctx.arc(0, 108, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(94, 234, 212, 0.6)";
    ctx.beginPath();
    ctx.moveTo(-16, 108);
    ctx.lineTo(16, 108);
    ctx.moveTo(0, 92);
    ctx.lineTo(0, 124);
    ctx.stroke();

    ctx.strokeStyle = "rgba(125, 245, 255, 0.5)";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-58, 82);
    ctx.lineTo(-116, 118 + armSwing);
    ctx.lineTo(-154, 164);
    ctx.moveTo(58, 82);
    ctx.lineTo(116, 118 - armSwing);
    ctx.lineTo(160, 158);
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 154, 98, 0.9)";
    ctx.beginPath();
    ctx.arc(-154, 164, 13, 0, Math.PI * 2);
    ctx.arc(160, 158, 13, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    ctx.save();
    ctx.translate(rect.width * 0.61, rect.height * 0.63);
    ctx.fillStyle = "rgba(1, 8, 18, 0.94)";
    ctx.beginPath();
    ctx.roundRect(-170, -84, 250, 148, 14);
    ctx.fill();
    ctx.fillStyle = `rgba(94, 234, 212, ${screenGlow})`;
    ctx.fillRect(-148, -58, 206, 92);
    ctx.strokeStyle = "rgba(255, 154, 98, 0.78)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-126, 10);
    ctx.lineTo(-86, -22 + Math.sin(time * 2) * 8);
    ctx.lineTo(-38, 6);
    ctx.lineTo(12, -32 + Math.cos(time * 2) * 7);
    ctx.lineTo(42, -10);
    ctx.stroke();
    ctx.fillStyle = "rgba(114, 167, 255, 0.78)";
    for (let bar = 0; bar < 5; bar += 1) {
      const height = 22 + Math.sin(time * 2 + bar) * 10 + bar * 5;
      ctx.fillRect(-132 + bar * 32, 26 - height, 18, height);
    }
    ctx.restore();

    animationFrame = window.requestAnimationFrame(drawRobotBackground);
  }

  resizeCanvas();
  drawRobotBackground();
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("beforeunload", () => window.cancelAnimationFrame(animationFrame));
}
