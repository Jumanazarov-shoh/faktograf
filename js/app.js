/**
 * FaktorGraf — Application Script
 * Restrained Financial Research & Practical Risk Workspace Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initFAQAccordion();
  initDemoForm();
  initShowcase();
  initPricingCalculator();
  initStressSimulation();
  initFooterYear();
});

/* ==========================================================================
   1. Navigation & Accessible Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links .nav-link, .mobile-nav-drawer .btn');

  let previousActiveElement = null;

  function openDrawer() {
    previousActiveElement = document.activeElement;
    mobileDrawer.classList.add('is-open');
    if (mobileBackdrop) mobileBackdrop.classList.add('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');

    // Focus first focusable link
    const firstFocusable = mobileDrawer.querySelector('a, button');
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 50);
    }
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('is-open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeDrawer);
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Keyboard Trap and Esc handler
    document.addEventListener('keydown', (e) => {
      if (!mobileDrawer.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeDrawer();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = Array.from(mobileDrawer.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }
}

/* ==========================================================================
   2. FAQ Accordion
   ========================================================================== */
function initFAQAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const entry = btn.closest('.faq-entry');
      const isOpen = entry.classList.contains('is-open');

      document.querySelectorAll('.faq-entry').forEach(e => {
        if (e !== entry) {
          e.classList.remove('is-open');
          const trigger = e.querySelector('.faq-trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        entry.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        entry.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   3. Demo Request Form (Rigorous Validation & Transparent Prototype Behavior)
   ========================================================================== */
function initDemoForm() {
  const form = document.getElementById('demoForm');
  const outputBox = document.getElementById('demoOutputPayload');
  const jsonPreview = document.getElementById('payloadJson');
  const submitBtn = document.getElementById('btnSubmitDemo');

  if (!form) return;

  const fFullName = document.getElementById('fullName');
  const fCompany = document.getElementById('company');
  const fEmail = document.getElementById('email');
  const fRole = document.getElementById('role');
  const fInterest = document.getElementById('interest');
  const fMessage = document.getElementById('message');

  const errFullName = document.getElementById('errFullName');
  const errCompany = document.getElementById('errCompany');
  const errEmail = document.getElementById('errEmail');
  const errRole = document.getElementById('errRole');
  const errInterest = document.getElementById('errInterest');

  function clearErrors() {
    [fFullName, fCompany, fEmail, fRole, fInterest].forEach(input => {
      if (input) {
        input.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
      }
    });
    [errFullName, errCompany, errEmail, errRole, errInterest].forEach(err => {
      if (err) err.classList.remove('is-visible');
    });
  }

  function validateEmail(emailStr) {
    // Standard RFC-compliant practical email pattern
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return re.test(String(emailStr).trim());
  }

  // Clear individual field error on user input
  [fFullName, fCompany, fRole].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        if (input.value.trim().length > 1) {
          input.classList.remove('is-invalid');
          const err = form.querySelector(`#err${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`);
          if (err) err.classList.remove('is-visible');
        }
      });
    }
  });

  if (fEmail) {
    fEmail.addEventListener('input', () => {
      if (validateEmail(fEmail.value)) {
        fEmail.classList.remove('is-invalid');
        if (errEmail) errEmail.classList.remove('is-visible');
      }
    });
  }

  if (fInterest) {
    fInterest.addEventListener('change', () => {
      if (fInterest.value) {
        fInterest.classList.remove('is-invalid');
        if (errInterest) errInterest.classList.remove('is-visible');
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;
    let firstInvalidInput = null;

    if (!fFullName.value.trim() || fFullName.value.trim().length < 2) {
      isValid = false;
      fFullName.classList.add('is-invalid');
      fFullName.setAttribute('aria-invalid', 'true');
      if (errFullName) errFullName.classList.add('is-visible');
      if (!firstInvalidInput) firstInvalidInput = fFullName;
    }

    if (!fCompany.value.trim() || fCompany.value.trim().length < 2) {
      isValid = false;
      fCompany.classList.add('is-invalid');
      fCompany.setAttribute('aria-invalid', 'true');
      if (errCompany) errCompany.classList.add('is-visible');
      if (!firstInvalidInput) firstInvalidInput = fCompany;
    }

    if (!fEmail.value.trim() || !validateEmail(fEmail.value)) {
      isValid = false;
      fEmail.classList.add('is-invalid');
      fEmail.setAttribute('aria-invalid', 'true');
      if (errEmail) errEmail.classList.add('is-visible');
      if (!firstInvalidInput) firstInvalidInput = fEmail;
    }

    if (!fRole.value.trim() || fRole.value.trim().length < 2) {
      isValid = false;
      fRole.classList.add('is-invalid');
      fRole.setAttribute('aria-invalid', 'true');
      if (errRole) errRole.classList.add('is-visible');
      if (!firstInvalidInput) firstInvalidInput = fRole;
    }

    if (!fInterest.value) {
      isValid = false;
      fInterest.classList.add('is-invalid');
      fInterest.setAttribute('aria-invalid', 'true');
      if (errInterest) errInterest.classList.add('is-visible');
      if (!firstInvalidInput) firstInvalidInput = fInterest;
    }

    if (!isValid) {
      if (firstInvalidInput) firstInvalidInput.focus();
      return;
    }

    // Generate prototype payload representation
    const payload = {
      timestamp: new Date().toISOString(),
      namoyishHolati: "Forma prototipi (Haqiqiy backend/server ulanmagan)",
      yuborilganKiritmalar: {
        ismFamiliya: fFullName.value.trim(),
        tashkilotNomi: fCompany.value.trim(),
        ishchiEmail: fEmail.value.trim(),
        lavozimYokiJamoa: fRole.value.trim(),
        qiziqtirganYonalish: fInterest.value,
        izohXabari: fMessage ? fMessage.value.trim() || "(Bo‘sh qoldirilgan)" : "(Bo‘sh)"
      },
      auditEslatmasi: "Ushbu ma’lumotlar serverga jo‘natilmadi. Real integratsiyada tashkilot CRM yoki webhook endpointi ulanadi."
    };

    if (jsonPreview && outputBox) {
      jsonPreview.textContent = JSON.stringify(payload, null, 2);
      outputBox.classList.add('active');
      outputBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (submitBtn) {
      submitBtn.textContent = "Namuna so‘rovi shakllantirildi (Demo)";
      submitBtn.disabled = true;
      submitBtn.style.backgroundColor = "var(--text-muted)";
      submitBtn.style.borderColor = "var(--text-muted)";
    }
  });
}

/* ==========================================================================
   4. Showcase: Synchronous Multi-Block Scenario Switcher
   ========================================================================== */
let activeCaseId = 'case1';
let currentStressKey = 'base';

function initShowcase() {
  const btnCase1 = document.getElementById('btnCase1');
  const btnCase2 = document.getElementById('btnCase2');

  function selectCase(caseKey) {
    activeCaseId = caseKey;
    currentStressKey = 'base'; // reset stress test to base scenario

    if (caseKey === 'case1') {
      btnCase1.classList.add('btn-primary');
      btnCase1.classList.remove('btn-secondary');
      btnCase2.classList.remove('btn-primary');
      btnCase2.classList.add('btn-secondary');
    } else {
      btnCase2.classList.add('btn-primary');
      btnCase2.classList.remove('btn-secondary');
      btnCase1.classList.remove('btn-primary');
      btnCase1.classList.add('btn-secondary');
    }

    renderAllScenarioBlocks();
  }

  if (btnCase1 && btnCase2) {
    btnCase1.addEventListener('click', () => selectCase('case1'));
    btnCase2.addEventListener('click', () => selectCase('case2'));
    selectCase('case1');
  }
}

function renderAllScenarioBlocks() {
  const data = window.SYNTHETIC_DATASETS[activeCaseId];
  if (!data) return;

  // 1. Update Hero Preview Block
  const heroFileLabel = document.getElementById('heroFileLabel');
  const heroFileStats = document.getElementById('heroFileStats');
  const heroInvoiceId = document.getElementById('heroInvoiceId');
  const heroInvoiceSum = document.getElementById('heroInvoiceSum');
  const heroInvoiceBuyer = document.getElementById('heroInvoiceBuyer');
  const heroInvoiceDueDate = document.getElementById('heroInvoiceDueDate');
  const heroInvoiceStatusBadge = document.getElementById('heroInvoiceStatusBadge');
  const heroInvoiceCheckNote = document.getElementById('heroInvoiceCheckNote');
  const heroWaterfallContainer = document.getElementById('heroWaterfallContainer');

  if (heroFileLabel) heroFileLabel.textContent = data.fileLabel;
  if (heroFileStats) heroFileStats.textContent = `(${data.invoiceCount} ta invoice • ${data.totalTurnover})`;

  if (data.heroSelectedInvoice) {
    if (heroInvoiceId) heroInvoiceId.textContent = data.heroSelectedInvoice.id;
    if (heroInvoiceSum) heroInvoiceSum.textContent = data.heroSelectedInvoice.sum;
    if (heroInvoiceBuyer) heroInvoiceBuyer.textContent = data.heroSelectedInvoice.buyer;
    if (heroInvoiceDueDate) heroInvoiceDueDate.textContent = data.heroSelectedInvoice.dueDate;
    if (heroInvoiceStatusBadge) {
      heroInvoiceStatusBadge.textContent = data.heroSelectedInvoice.statusText;
      heroInvoiceStatusBadge.className = `badge ${data.heroSelectedInvoice.statusClass}`;
    }
    if (heroInvoiceCheckNote) heroInvoiceCheckNote.textContent = data.heroSelectedInvoice.checkNote;
  }

  if (heroWaterfallContainer && data.heroWaterfall) {
    heroWaterfallContainer.innerHTML = data.heroWaterfall.map(row => `
      <div class="mini-waterfall-row ${row.type === 'final' ? 'final' : ''}">
        <span style="${row.type === 'final' ? 'font-weight:700;' : 'color: var(--text-muted);'}">${row.label}</span>
        <span class="mono" style="${row.type === 'final' ? 'font-size:1rem;' : row.type === 'deduct' ? 'color: var(--status-flag-text);' : ''}">${row.amount}</span>
      </div>
    `).join('');
  }

  // Draw Hero Graph for active case
  renderHeroGraph(data.graph);

  // 2. Render Main SVG Graph & Inspector
  renderMainGraph(data.graph);

  // 3. Render Invoices Table
  renderInvoices(data.sampleInvoices);

  // 4. Render Explainable Limit Waterfall & Reasons
  renderWaterfall(data.limitWaterfall, data.whyLimitNotHigher);

  // 5. Update Risk Passport Metrics
  const qEl = document.getElementById('metricDataQuality');
  const cEl = document.getElementById('metricCoverage');
  const concEl = document.getElementById('metricConcentration');
  const patEl = document.getElementById('metricPatterns');

  if (qEl) qEl.textContent = data.dataQualityScore;
  if (cEl) cEl.textContent = data.evidenceCoverageScore;
  if (concEl) concEl.textContent = data.concentrationStatus;
  if (patEl) {
    const cycleCount = data.patterns.filter(p => p.id === 'p1' && p.status === 'danger').length;
    const recipCount = data.patterns.filter(p => p.id === 'p2' && p.status === 'danger').length;
    patEl.textContent = `${cycleCount} ta sikl, ${recipCount > 0 ? 'o‘zaro savdo signali mavjud' : 'toza'}`;
  }

  // 6. Update Stress Testing Display
  updateStressTestDisplay();

  // 7. Update Decision Memo
  const memoSubyekt = document.getElementById('memoSubyekt');
  const memoLimitVal = document.getElementById('memoLimitVal');
  const memoReviewerNote = document.getElementById('memoReviewerNote');

  if (memoSubyekt) memoSubyekt.textContent = `${data.title} (STIR: ${data.stir})`;
  if (memoLimitVal) memoLimitVal.textContent = data.recommendedLimit;
  if (memoReviewerNote) memoReviewerNote.textContent = data.summaryDescription;
}

/* ==========================================================================
   5. Hero Preview Mini-Graph (Synchronized & Keyboard Accessible)
   ========================================================================== */
function renderHeroGraph(graphData) {
  const container = document.getElementById('heroGraphViewport');
  if (!container || !graphData) return;

  const supplier = graphData.nodes.find(n => n.type === 'supplier') || graphData.nodes[0];
  const buyers = graphData.nodes.filter(n => n.type === 'buyer');

  let pathsHtml = '';
  let nodesHtml = '';

  const buyerPositions = [
    { x: 335, y: 55 },
    { x: 350, y: 135 },
    { x: 330, y: 215 }
  ];

  buyers.slice(0, 3).forEach((b, idx) => {
    const pos = buyerPositions[idx] || { x: 330, y: 100 + idx * 60 };
    const strokeColor = b.status === 'danger' ? '#b91c1c' : b.status === 'warning' ? '#b45309' : '#0f4c3a';
    const isDashed = b.status === 'danger' || b.status === 'warning';

    pathsHtml += `
      <path d="M 110 135 L ${pos.x} ${pos.y}" stroke="${strokeColor}" stroke-width="${idx === 0 ? '2' : '1.6'}" ${isDashed ? 'stroke-dasharray="4,4"' : ''} marker-end="url(#heroMarker)"/>
    `;

    nodesHtml += `
      <g class="graph-node" tabindex="0" role="button" aria-label="Xaridor: ${b.label}, Hajmi: ${b.volume}" transform="translate(${pos.x}, ${pos.y})">
        <circle r="${idx === 0 ? '20' : '18'}" fill="#ffffff" stroke="${strokeColor}" stroke-width="1.8"/>
        <text text-anchor="middle" dy="4" fill="#121824" font-size="9" font-weight="600">${idx === 0 ? 'Xaridor A' : idx === 1 ? 'Xaridor B' : 'Xaridor C'}</text>
        <text text-anchor="middle" dy="${idx === 0 ? '30' : '28'}" fill="${strokeColor}" font-size="8">${b.volume.length > 15 ? b.volume.slice(0, 14) + '…' : b.volume}</text>
      </g>
    `;
  });

  container.innerHTML = `
    <svg width="100%" height="100%" viewBox="0 0 460 270" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="heroMarker" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#0f4c3a"/>
        </marker>
      </defs>

      <!-- Connections -->
      ${pathsHtml}

      <!-- Supplier Node -->
      <g class="graph-node" tabindex="0" role="button" aria-label="Yetkazib beruvchi: ${supplier.label}, Jami aylanma: ${supplier.volume}" transform="translate(110, 135)">
        <circle r="30" fill="#ffffff" stroke="#0f4c3a" stroke-width="2.5"/>
        <text text-anchor="middle" dy="4" fill="#121824" font-size="10" font-weight="700">Yetkazib beruvchi</text>
        <text text-anchor="middle" dy="44" fill="#0f4c3a" font-size="9" font-family="monospace">${supplier.volume}</text>
      </g>

      <!-- Buyers -->
      ${nodesHtml}
    </svg>
  `;
}

/* ==========================================================================
   6. Main Capability Graph (Click & Keyboard Interaction)
   ========================================================================== */
function renderMainGraph(graphData) {
  const svg = document.getElementById('mainGraphSvg');
  if (!svg || !graphData) return;

  svg.innerHTML = '';

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <marker id="arrowForest" viewBox="0 0 10 10" refX="26" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#0f4c3a"/>
    </marker>
    <marker id="arrowWarn" viewBox="0 0 10 10" refX="26" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#b45309"/>
    </marker>
    <marker id="arrowFlag" viewBox="0 0 10 10" refX="26" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#b91c1c"/>
    </marker>
  `;
  svg.appendChild(defs);

  const edgesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  svg.appendChild(edgesGroup);
  svg.appendChild(nodesGroup);

  const nodeMap = {};
  graphData.nodes.forEach(n => {
    nodeMap[n.id] = n;
  });

  // Draw Edges
  graphData.edges.forEach(edge => {
    const fromNode = nodeMap[edge.from];
    const toNode = nodeMap[edge.to];
    if (!fromNode || !toNode) return;

    let strokeColor = '#0f4c3a';
    let markerId = 'arrowForest';
    let strokeDash = 'none';

    if (edge.status === 'warning') {
      strokeColor = '#b45309';
      markerId = 'arrowWarn';
      strokeDash = '4,4';
    } else if (edge.status === 'danger') {
      strokeColor = '#b91c1c';
      markerId = 'arrowFlag';
      strokeDash = '5,3';
    }

    const midX = (fromNode.x + toNode.x) / 2;
    const midY = (fromNode.y + toNode.y) / 2 + (edge.reciprocal ? -25 : 0);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY} ${toNode.x} ${toNode.y}`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', strokeColor);
    path.setAttribute('stroke-width', '1.8');
    path.setAttribute('stroke-dasharray', strokeDash);
    path.setAttribute('marker-end', `url(#${markerId})`);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', midX);
    text.setAttribute('y', midY - 6);
    text.setAttribute('fill', strokeColor);
    text.setAttribute('font-size', '9.5');
    text.setAttribute('font-family', 'monospace');
    text.setAttribute('text-anchor', 'middle');
    text.textContent = edge.label;

    edgesGroup.appendChild(path);
    edgesGroup.appendChild(text);
  });

  // Draw Nodes with Keyboard Accessibility
  graphData.nodes.forEach(node => {
    const nodeG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    nodeG.setAttribute('transform', `translate(${node.x}, ${node.y})`);
    nodeG.setAttribute('class', 'graph-node');
    nodeG.setAttribute('tabindex', '0');
    nodeG.setAttribute('role', 'button');
    nodeG.setAttribute('aria-label', `Kontragent: ${node.label}, Roli: ${node.role}, Aylanmasi: ${node.volume}`);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', node.type === 'supplier' ? '28' : '20');
    circle.setAttribute('fill', '#ffffff');

    let strokeColor = '#0f4c3a';
    if (node.status === 'warning') strokeColor = '#b45309';
    if (node.status === 'danger') strokeColor = '#b91c1c';

    circle.setAttribute('stroke', strokeColor);
    circle.setAttribute('stroke-width', node.type === 'supplier' ? '2.5' : '1.8');

    const textIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textIcon.setAttribute('text-anchor', 'middle');
    textIcon.setAttribute('dy', '4');
    textIcon.setAttribute('fill', '#121824');
    textIcon.setAttribute('font-size', node.type === 'supplier' ? '11' : '9');
    textIcon.setAttribute('font-weight', '700');
    textIcon.textContent = node.type === 'supplier' ? 'SUPPLIER' : 'BUYER';

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dy', node.type === 'supplier' ? '42' : '34');
    label.setAttribute('fill', '#434c5e');
    label.setAttribute('font-size', '10');
    label.setAttribute('font-weight', '600');
    label.textContent = node.label.length > 20 ? node.label.substring(0, 19) + '…' : node.label;

    nodeG.appendChild(circle);
    nodeG.appendChild(textIcon);
    nodeG.appendChild(label);
    nodesGroup.appendChild(nodeG);

    // Mouse click
    nodeG.addEventListener('click', () => {
      inspectNode(node);
    });

    // Keyboard selection (Enter or Space)
    nodeG.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        inspectNode(node);
      }
    });
  });

  // Select supplier by default
  if (graphData.nodes.length > 0) {
    inspectNode(graphData.nodes[0]);
  }
}

function inspectNode(node) {
  const nameEl = document.getElementById('inspectNodeName');
  const roleEl = document.getElementById('inspectNodeRole');
  const stirEl = document.getElementById('inspectNodeStir');
  const volumeEl = document.getElementById('inspectNodeVolume');
  const dsoEl = document.getElementById('inspectNodeDSO');
  const statusEl = document.getElementById('inspectNodeStatus');

  if (nameEl) nameEl.textContent = node.label;
  if (roleEl) roleEl.textContent = node.role;
  if (stirEl) stirEl.textContent = node.stir || '—';
  if (volumeEl) volumeEl.textContent = node.volume || '—';
  if (dsoEl) dsoEl.textContent = node.dso || 'Bosh subyekt';

  if (statusEl) {
    statusEl.className = 'badge';
    if (node.status === 'active' || node.status === 'eligible') {
      statusEl.classList.add('badge-status-eligible');
      statusEl.textContent = 'Yaroqli / Barqaror';
    } else if (node.status === 'warning') {
      statusEl.classList.add('badge-status-review');
      statusEl.textContent = 'Ko‘rik talab';
    } else {
      statusEl.classList.add('badge-status-flag');
      statusEl.textContent = 'E’tibor signali';
    }
  }
}

/* ==========================================================================
   7. Render Invoices Table
   ========================================================================== */
function renderInvoices(invoices) {
  const tbody = document.getElementById('invoiceTableBody');
  if (!tbody || !invoices) return;

  tbody.innerHTML = invoices.map(inv => {
    let badgeClass = 'badge-status-eligible';
    if (inv.statusClass === 'status-warning') badgeClass = 'badge-status-review';
    if (inv.statusClass === 'status-danger') badgeClass = 'badge-status-flag';

    return `
      <tr>
        <td class="mono" style="font-weight:600; color:var(--accent-forest);">${inv.id}</td>
        <td style="font-weight:600; color:var(--text-primary);">${inv.buyer}</td>
        <td class="mono" style="font-weight:600;">${inv.sum}</td>
        <td class="mono" style="font-size:0.8rem; color:var(--text-muted);">${inv.date}</td>
        <td><span class="badge ${badgeClass}">${inv.status}</span></td>
        <td style="font-size:0.82rem; color:var(--text-secondary);">${inv.check}</td>
      </tr>
    `;
  }).join('');
}

/* ==========================================================================
   8. Render Waterfall Steps
   ========================================================================== */
function renderWaterfall(steps, reasons) {
  const container = document.getElementById('waterfallContainer');
  const reasonsList = document.getElementById('whyLimitNotHigherList');

  if (container && steps) {
    container.innerHTML = steps.map(s => {
      const isFinal = s.type === 'final';
      const isDeduct = s.type === 'deduct';
      return `
        <div style="display:flex; justify-content:space-between; align-items:baseline; padding:6px 0; border-bottom:1px solid var(--border-light); font-size:0.84rem; ${isFinal ? 'font-weight:700; border-top:1px dashed var(--border-strong); padding-top:10px; color:var(--accent-forest); font-size:0.95rem;' : ''}">
          <span style="color:${isFinal ? 'var(--accent-forest)' : 'var(--text-secondary)'};">${s.step}</span>
          <span class="mono" style="color:${isDeduct ? 'var(--status-flag-text)' : isFinal ? 'var(--accent-forest)' : 'var(--text-primary)'};">${s.amount}</span>
        </div>
      `;
    }).join('');
  }

  if (reasonsList && reasons) {
    reasonsList.innerHTML = reasons.map(r => `
      <li style="display:flex; align-items:flex-start; gap:6px;">
        <span style="color:var(--status-review-text); font-weight:700;">•</span>
        <span>${r}</span>
      </li>
    `).join('');
  }
}

/* ==========================================================================
   9. Pricing Calculator (Reactive to Slider Rates & APR display)
   ========================================================================== */
function initPricingCalculator() {
  const sInvoice = document.getElementById('sliderInvoice');
  const sAdvance = document.getElementById('sliderAdvance');
  const sDays = document.getElementById('sliderDays');
  const sRate = document.getElementById('sliderRate');

  const vInvoice = document.getElementById('sliderValInvoice');
  const vAdvance = document.getElementById('sliderValAdvance');
  const vDays = document.getElementById('sliderValDays');
  const vRate = document.getElementById('sliderValRate');

  const netPayoutEl = document.getElementById('calcNetPayout');
  const advanceAmountEl = document.getElementById('calcAdvanceAmount');
  const reserveAmountEl = document.getElementById('calcReserveAmount');
  const feeAmountEl = document.getElementById('calcFeeAmount');
  const annualizedRateEl = document.getElementById('calcAnnualizedRate');

  function fmt(num) {
    return new Intl.NumberFormat('uz-UZ').format(Math.round(num)) + ' UZS';
  }

  function update() {
    if (!sInvoice) return;

    const invoiceSum = parseFloat(sInvoice.value);
    const advanceRate = parseFloat(sAdvance.value);
    const days = parseFloat(sDays.value);
    const annualRate = parseFloat(sRate.value);

    // Badges
    if (vInvoice) vInvoice.textContent = fmt(invoiceSum);
    if (vAdvance) vAdvance.textContent = `${advanceRate} %`;
    if (vDays) vDays.textContent = `${days} kun`;
    if (vRate) vRate.textContent = `${annualRate} % (yillik)`;

    // Factoring Math
    const advanceAmount = invoiceSum * (advanceRate / 100);
    const reserveAmount = invoiceSum - advanceAmount;
    const discountFee = advanceAmount * (annualRate / 100) * (days / 365);
    const netPayout = advanceAmount - discountFee;

    // Output Displays
    if (netPayoutEl) netPayoutEl.textContent = fmt(netPayout);
    if (advanceAmountEl) advanceAmountEl.textContent = fmt(advanceAmount);
    if (reserveAmountEl) reserveAmountEl.textContent = fmt(reserveAmount);
    if (feeAmountEl) feeAmountEl.textContent = fmt(discountFee);
    if (annualizedRateEl) annualizedRateEl.textContent = `${annualRate.toFixed(1)}% APR`;
  }

  if (sInvoice) {
    [sInvoice, sAdvance, sDays, sRate].forEach(s => {
      if (s) s.addEventListener('input', update);
    });
    update();
  }
}

/* ==========================================================================
   10. Stress Testing Simulation (Linked to Active Dataset)
   ========================================================================== */
function initStressSimulation() {
  const btnBase = document.getElementById('btnStressBase');
  const btnDelay = document.getElementById('btnStressDelay');
  const btnExit = document.getElementById('btnStressExit');

  const buttons = [btnBase, btnDelay, btnExit];

  function setScenario(scenKey) {
    currentStressKey = scenKey;
    buttons.forEach(b => {
      if (b) {
        b.classList.remove('btn-primary');
        b.classList.add('btn-secondary');
      }
    });

    const activeBtn = scenKey === 'base' ? btnBase : scenKey === 'delay' ? btnDelay : btnExit;
    if (activeBtn) {
      activeBtn.classList.add('btn-primary');
      activeBtn.classList.remove('btn-secondary');
    }

    updateStressTestDisplay();
  }

  if (btnBase && btnDelay && btnExit) {
    btnBase.addEventListener('click', () => setScenario('base'));
    btnDelay.addEventListener('click', () => setScenario('delay'));
    btnExit.addEventListener('click', () => setScenario('exit'));
  }
}

function updateStressTestDisplay() {
  const data = window.SYNTHETIC_DATASETS[activeCaseId];
  if (!data || !data.stressScenarios) return;

  const heading = document.getElementById('stressScenarioHeading');
  const detail = document.getElementById('stressScenarioDetail');
  const capacityVal = document.getElementById('stressCapacityVal');

  const scen = data.stressScenarios[currentStressKey] || data.stressScenarios.base;

  if (heading) heading.textContent = scen.heading;
  if (detail) detail.textContent = scen.detail;
  if (capacityVal) {
    capacityVal.textContent = scen.capacityVal;
    capacityVal.style.color = scen.capacityColor;
  }
}

/* ==========================================================================
   11. Dynamic Year Update
   ========================================================================== */
function initFooterYear() {
  // Can dynamically ensure the current year is maintained
  const legalText = document.querySelector('.site-footer .footer-bottom div:first-child');
  if (legalText) {
    const currentYear = new Date().getFullYear();
    legalText.textContent = `© ${currentYear} FaktorGraf. Barcha huquqlar himoyalangan.`;
  }
}
