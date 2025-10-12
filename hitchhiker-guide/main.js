// Sidebar data extracted from the essay
const sidebars = [
  {
    id: "measurement",
    title: "The Measurement Problem",
    content: `How do we even know what a neuron "means"? The standard approach: show it a bunch of inputs, see when it activates, and guess. But maybe neurons don't "mean" anything in the human sense. Maybe meaning is something we're projecting onto patterns of activation because we're pattern-seeking creatures who need things to make narrative sense. This isn't just philosophical—if neurons don't have stable meanings, our whole interpretive framework might be built on sand.`,
    triggerText: "what makes individual neurons fire",
  },
  {
    id: "atomicity",
    title: "The Atomicity Question",
    content: `Is there such a thing as an atomic, indivisible concept? Or can you always subdivide further? Your SAE might find a "Golden Gate Bridge" feature. But is that atomic, or is it composed of "bridge" + "red" + "San Francisco" + "suspension architecture"? And are those atomic, or do they subdivide further?

This isn't just abstract philosophy. If we want to surgically remove dangerous capabilities from models for safety, we need to know what level to operate at. If you remove a high-level "bioweapon knowledge" feature but the model can reconstruct it from lower-level "biology" + "chemistry" + "weapons" features, you've accomplished nothing. The atomicity question matters.`,
    triggerText: "the fundamental units of representation",
  },
  {
    id: "features-real",
    title: "Are Features Real or Convenient Fictions?",
    content: `Here's the uncomfortable question: Do SAEs discover features the model actually uses as computational units? Or do we create convenient human-interpretable projections that help reconstruction but aren't how the model "thinks"?

Maybe features are real discrete things the model manipulates, like variables in a program. Or maybe the model operates on continuous, high-dimensional manifolds, and we're imposing discrete categories that feel natural to us but don't carve reality at its joints.

This isn't just philosophical—it's deeply practical. If features aren't "real," then all our interventions (removing dangerous features, steering behavior) might be operating on the wrong ontology. We'd be adjusting dials that don't correspond to anything the model actually uses.`,
    triggerText: "we found something real",
  },
  {
    id: "feature-splitting",
    title: "The Feature Splitting Problem",
    content: `Your SAE has a "Golden Gate Bridge" feature. Great! But wait—you also find "Golden Gate Bridge at sunset" and "Golden Gate Bridge from Marin side" and "Golden Gate Bridge in fog." Are these separate features or subdivisions of one feature?

Where do you stop? Can you infinitely subdivide, finding more and more specific versions? Is there a natural level of granularity, or is it arbitrary based on your SAE's dictionary size?

This matters for safety work. If you want to remove a dangerous capability, do you need to find the "atomic" version? Or can you remove it at any level? If the model can reconstruct "how to make a bioweapon" from sub-features like "biology knowledge" + "chemistry knowledge" + "harmful intent," then removing the composite feature accomplishes nothing.`,
    triggerText: "Dictionary size is arbitrary",
  },
  {
    id: "toy-model",
    title: "The Toy Model Problem",
    content: `Almost all our validated findings come from models with less than 1 billion parameters. Production models have 100-1000x more parameters. We're literally studying GPT-2 Small and hoping the lessons transfer to GPT-4.

Sometimes they do. Induction heads appear in both small and large models. Feature hierarchies seem consistent. But phase transitions mean larger models can develop qualitatively new capabilities that simply don't exist in smaller models. There's no smooth ramp-up that would let us see them coming.

This is interpretability's biggest bet: that we're learning something relevant about the systems we actually care about. We won't know if the bet pays off until we can scale our techniques to production systems.`,
    triggerText: "studying small models",
  },
  {
    id: "completeness",
    title: "Completeness vs Minimality",
    content: `When you've found a circuit explanation for some behavior, how do you know it's complete? Maybe there are other pathways you missed. Maybe the circuit you found is part of a larger ensemble. Or maybe you've included components that aren't actually necessary and a simpler explanation exists.

This is the completeness vs minimality tradeoff. A "complete" explanation might be incredibly complex with hundreds of components and backup pathways. A "minimal" explanation might miss important redundancies that matter when the model is stressed or adversarially attacked.

Which matters more? Depends on your goal. If you're trying to understand how the model works, you probably want completeness. If you're trying to intervene to remove a dangerous capability, you might prefer minimality because simpler interventions are less likely to have unexpected side effects.`,
    triggerText: "tracing how information flows through the model",
  },
  {
    id: "emergence",
    title: "Why Emergence Matters for Alignment",
    content: `If capabilities appear discontinuously, we can't see them coming. The model might be safe at 100B parameters, then suddenly develop deceptive capabilities at 110B with no warning.

Some researchers argue that emergence might be partially a measurement artifact—we're not measuring capabilities precisely enough to see the smooth ramp-up. But even if that's true for some capabilities, phase transitions in training (like when induction heads appear) are definitely real. The alignment implications are uncomfortable either way.`,
    triggerText: "Phase transitions are real and concerning",
  },
  {
    id: "how-much",
    title: "How Much Understanding Do We Need?",
    content: `To make AI safe, do we need to fully understand every circuit? Or just the ones related to deception, dangerous capabilities, and alignment-relevant behaviors?

Full understanding would be amazing but might not be necessary. Maybe we can develop targeted interpretability tools that focus specifically on safety-relevant features and circuits. This changes what research we prioritize—less "catalog every feature in the model" and more "develop tools to detect and intervene on specific concerning patterns."

Of course, this assumes we can identify which features are safety-relevant before problems emerge. Given phase transitions and our limited understanding of large models, that's optimistic. The field is still figuring out the right approach.`,
    triggerText: "before we build systems we really need to understand",
  },
];

// Headshot click handler
function onHeadshotClick() {
  window.location.href = "../index.html";
}

// Load and parse the essay
async function loadEssay() {
  try {
    // Check if marked is available
    if (typeof marked === "undefined") {
      console.error("marked.js library not loaded");
      document.getElementById("essay-content").innerHTML =
        "<p>Loading library...</p>";
      // Wait a bit and retry
      setTimeout(loadEssay, 500);
      return;
    }

    const response = await fetch("table-of-contents.md");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const markdown = await response.text();

    // Remove sidebar blocks from the main content (and the trailing ---)
    let cleanedMarkdown = markdown.replace(
      /^>\s*\*\*SIDEBAR:.*?\n(?:^>.*?\n)*\n^---\n?/gm,
      ""
    );

    // Convert markdown to HTML
    let html = marked.parse(cleanedMarkdown);

    // Add sidebar triggers
    sidebars.forEach((sidebar) => {
      const escapedTrigger = sidebar.triggerText.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
      const regex = new RegExp(`(${escapedTrigger})`, "gi");
      html = html.replace(
        regex,
        `<span class="sidebar-trigger" data-sidebar-id="${sidebar.id}">$1</span>`
      );
    });

    document.getElementById("essay-content").innerHTML = html;

    // Add event listeners to sidebar triggers
    attachSidebarListeners();
  } catch (error) {
    console.error("Error loading essay:", error);
    document.getElementById("essay-content").innerHTML =
      "<p>Error loading essay content.</p>";
  }
}

// Attach event listeners to sidebar triggers
function attachSidebarListeners() {
  const triggers = document.querySelectorAll(".sidebar-trigger");
  const isMobile = window.innerWidth <= 850;

  triggers.forEach((trigger) => {
    const sidebarId = trigger.getAttribute("data-sidebar-id");
    const sidebar = sidebars.find((s) => s.id === sidebarId);

    if (!sidebar) return;

    if (isMobile) {
      // Mobile: click to show modal
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        showMobileModal(sidebar);
      });
    } else {
      // Desktop: hover to show popup
      let popup = null;

      trigger.addEventListener("mouseenter", () => {
        popup = createDesktopPopup(sidebar);
        document.body.appendChild(popup);
        positionPopup(trigger, popup);

        setTimeout(() => popup.classList.add("visible"), 10);
      });

      trigger.addEventListener("mouseleave", () => {
        if (popup) {
          popup.classList.remove("visible");
          setTimeout(() => {
            if (popup && popup.parentNode) {
              popup.parentNode.removeChild(popup);
            }
          }, 200);
        }
      });
    }
  });
}

// Create desktop popup
function createDesktopPopup(sidebar) {
  const popup = document.createElement("div");
  popup.className = "sidebar-popup";
  popup.innerHTML = `
    <h4>${sidebar.title}</h4>
    ${sidebar.content
      .split("\n\n")
      .map((p) => `<p>${p}</p>`)
      .join("")}
  `;
  return popup;
}

// Position popup relative to trigger
function positionPopup(trigger, popup) {
  const triggerRect = trigger.getBoundingClientRect();
  const popupWidth = 360;
  const margin = 20;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Position using rule of thirds - offset 2/3 from the trigger
  const triggerCenter = triggerRect.left + triggerRect.width / 2;
  let leftPosition = triggerCenter - (popupWidth * 2) / 3;

  // Adjust if it would go off the left edge
  if (leftPosition < margin) {
    leftPosition = margin;
  }

  // Adjust if it would go off the right edge
  if (leftPosition + popupWidth > window.innerWidth - margin) {
    leftPosition = window.innerWidth - popupWidth - margin;
  }

  popup.style.left = `${leftPosition}px`;

  // Determine vertical position - check if there's room below
  // First, temporarily show popup to measure its height
  popup.style.visibility = "hidden";
  popup.style.display = "block";
  const popupHeight = popup.offsetHeight;
  popup.style.display = "";
  popup.style.visibility = "";

  const spaceBelow = window.innerHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;

  // Position below if there's enough space, otherwise position above
  if (spaceBelow >= popupHeight + margin) {
    // Position below the trigger
    popup.style.top = `${triggerRect.bottom + scrollTop + 10}px`;
  } else if (spaceAbove >= popupHeight + margin) {
    // Position above the trigger
    popup.style.top = `${triggerRect.top + scrollTop - popupHeight - 10}px`;
  } else {
    // Not enough space either way, position below and let it scroll
    popup.style.top = `${triggerRect.bottom + scrollTop + 10}px`;
  }
}

// Show mobile modal
function showMobileModal(sidebar) {
  const overlay = document.getElementById("sidebar-modal-overlay");
  const body = document.getElementById("sidebar-modal-body");

  body.innerHTML = `
    <h4>${sidebar.title}</h4>
    ${sidebar.content
      .split("\n\n")
      .map((p) => `<p>${p}</p>`)
      .join("")}
  `;

  overlay.classList.add("visible");
  document.body.style.overflow = "hidden";
}

// Close mobile modal
function closeMobileModal() {
  const overlay = document.getElementById("sidebar-modal-overlay");
  overlay.classList.remove("visible");
  document.body.style.overflow = "";
}

// Modal event listeners
document
  .getElementById("sidebar-modal-close")
  .addEventListener("click", closeMobileModal);
document
  .getElementById("sidebar-modal-overlay")
  .addEventListener("click", (e) => {
    if (e.target.id === "sidebar-modal-overlay") {
      closeMobileModal();
    }
  });

// Handle window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Reload to adjust mobile/desktop behavior
    const newIsMobile = window.innerWidth <= 850;
    const oldIsMobile =
      document.querySelectorAll(".sidebar-trigger")[0]?.onclick !== null;

    if (newIsMobile !== oldIsMobile) {
      attachSidebarListeners();
    }
  }, 250);
});

// Load essay on page load
document.addEventListener("DOMContentLoaded", loadEssay);
