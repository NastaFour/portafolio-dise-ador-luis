    var H_PAD = 14;
    var V_PAD = 6;

    function carveTextLineSlots(base, blocked) {
      var slots = [base];
      for (var bi = 0; bi < blocked.length; bi++) {
        var iv = blocked[bi];
        var next = [];
        for (var si = 0; si < slots.length; si++) {
          var s = slots[si];
          if (iv.right <= s.left || iv.left >= s.right) { next.push(s); continue; }
          if (iv.left > s.left) next.push({ left: s.left, right: iv.left });
          if (iv.right < s.right) next.push({ left: iv.right, right: s.right });
        }
        slots = next;
      }
      return slots.filter(function(s) { return s.right - s.left >= 20; });
    }

    function circleIntervalForBand(cx, cy, r, bandTop, bandBottom, hPad, vPad) {
      var top = bandTop - vPad, bottom = bandBottom + vPad;
      if (top >= cy + r || bottom <= cy - r) return null;
      var minDy = (cy >= top && cy <= bottom) ? 0 : (cy < top ? top - cy : cy - bottom);
      if (minDy >= r) return null;
      var maxDx = Math.sqrt(r * r - minDy * minDy);
      return { left: cx - maxDx - hPad, right: cx + maxDx + hPad };
    }

    var reflowTargets = [];
    function buildReflowTarget(container) {
      if (!container || container._reflowBuilt) return;
      // Skip very narrow containers that would break layout
      if (container.clientWidth < 80) return;
      // Exclude large titles to prevent "tosco" look
      var style = getComputedStyle(container);
      if (parseFloat(style.fontSize) > 22) return;

      var text = container.innerText.trim();
      if (container.id === 'manifesto-dropcap') {
        text = text.replace(/\n/g, ''); // Fix newline after floated dropcap
      }
      if (!text) return;

      container._reflowBuilt = true;
      var computedColor = style.color;
      var strongText = null, strongStart = -1, strongEnd = -1, strongColor = '', strongWeight = '';
      
      var strong = container.querySelector('strong');
      if (strong) {
        strongText = strong.textContent.trim();
        strongStart = text.indexOf(strongText);
        strongEnd = strongStart + strongText.length;
        strongColor = getComputedStyle(strong).color;
        strongWeight = getComputedStyle(strong).fontWeight;
      }
      
      var font = style.fontWeight + ' ' + style.fontSize + ' ' + style.fontFamily;
      
      var prepared = prepareWithSegments(text, font, {
        letterSpacing: parseFloat(style.letterSpacing) * 16 || 0,
        whiteSpace: 'pre-wrap'
      });
      var lh = style.lineHeight;
      var lineH = lh === 'normal' ? parseFloat(style.fontSize) * 1.6 : parseFloat(lh);
      
      var overlay = document.createElement('div');
      // overflow:hidden prevents reflow lines bleeding outside the paragraph box
      overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:auto;min-height:100%;pointer-events:none;z-index:4;overflow:hidden;display:none;';
      
      if (style.position === 'static') {
        container.style.position = 'relative';
      }
      container.appendChild(overlay);
      
      reflowTargets.push({ 
        container: container, 
        fullText: text,
        prepared: prepared, 
        font: font, 
        lineH: lineH, 
        overlay: overlay, 
        linePool: [], 
        active: false,
        origColor: container.style.color,
        computedColor: computedColor,
        strongText: strongText,
        strongStart: strongStart,
        strongEnd: strongEnd,
        strongColor: strongColor,
        strongWeight: strongWeight
      });
    }

    // Apply to major blocks (p, h1, h2, h3).
    document.querySelectorAll('p, h1, h2, h3').forEach(function(el) {
      // Exclude hero title since it uses its own fitting logic
      if (el.id === 'hero-name') return;
      buildReflowTarget(el);
    });

    function syncLinePool(target, count) {
      while (target.linePool.length < count) {
        var span = document.createElement('span');
        span.style.cssText = 'position:absolute;white-space:pre;pointer-events:none;';
        target.overlay.appendChild(span);
        target.linePool.push(span);
      }
      for (var i = 0; i < target.linePool.length; i++) {
        target.linePool[i].style.display = i < count ? '' : 'none';
      }
    }

    function reflowTextAroundObstacle(target, obsLocalX, obsLocalY, obsRadius, obsShape, obsEl) {
      var containerW = target.container.clientWidth;
      if (containerW < 30) return;
      // Get actual element dimensions for rect obstacle
      var obsW = obsEl ? obsEl.getBoundingClientRect().width  : obsRadius * 2;
      var obsH = obsEl ? obsEl.getBoundingClientRect().height : obsRadius * 2;
      var totalLines = [];
      var cursor = { segmentIndex: 0, graphemeIndex: 0 };
      var lineY = 0;
      var lineH = target.lineH;
      var textDone = false;
      var safety = 0;
      // Allow text to flow downwards until completely rendered (max 500 lines to prevent infinite loop)
      while (!textDone && safety < 500) {
        safety++;
        var blocked = [];
        var iv;
        if (obsShape === 'rect') {
          // Rectangular exclusion (AABB)
          var rLeft  = obsLocalX - obsW / 2 - H_PAD;
          var rRight = obsLocalX + obsW / 2 + H_PAD;
          var rTop   = obsLocalY - obsH / 2 - V_PAD;
          var rBot   = obsLocalY + obsH / 2 + V_PAD;
          if (lineY < rBot && lineY + lineH > rTop)
            iv = { left: rLeft, right: rRight };
          else
            iv = null;
        } else {
          // Circular exclusion
          iv = circleIntervalForBand(obsLocalX, obsLocalY, obsRadius, lineY, lineY + lineH, H_PAD, V_PAD);
        }
        if (iv !== null) blocked.push(iv);
        // Add dropcap exclusion
        if (target.container.id === 'manifesto-dropcap' && lineY < 55) {
          blocked.push({ left: 0, right: 60 });
        }
        var slots = carveTextLineSlots({ left: 0, right: containerW }, blocked);
        if (slots.length === 0) { lineY += lineH; continue; }
        slots.sort(function(a, b) { return a.left - b.left; });
        for (var si = 0; si < slots.length; si++) {
          var slot = slots[si];
          var range = layoutNextLineRange(target.prepared, cursor, slot.right - slot.left);
          if (range === null) { textDone = true; break; }
          var line = materializeLineRange(target.prepared, range);
          totalLines.push({ x: slot.left, y: lineY, text: line.text, width: line.width });
          cursor = range.end;
        }
        lineY += lineH;
      }
      syncLinePool(target, totalLines.length);
      target.lastSearchIdx = 0;
      for (var i = 0; i < totalLines.length; i++) {
        var l = totalLines[i];
        var sp = target.linePool[i];
        var lineHtml = l.text;
        
        if (target.strongText && target.strongStart !== -1) {
             var lineIdx = target.fullText.indexOf(l.text.trim(), target.lastSearchIdx);
             if (lineIdx !== -1) {
                 target.lastSearchIdx = lineIdx + l.text.trim().length;
                 var overlapStart = Math.max(lineIdx, target.strongStart);
                 var overlapEnd = Math.min(lineIdx + l.text.length, target.strongEnd);
                 if (overlapStart < overlapEnd) {
                     var localStart = overlapStart - lineIdx;
                     var localEnd = overlapEnd - lineIdx;
                     lineHtml = l.text.substring(0, localStart) + 
                                '<span style="color:' + target.strongColor + '; font-weight:' + target.strongWeight + '">' + 
                                l.text.substring(localStart, localEnd) + '</span>' + 
                                l.text.substring(localEnd);
                 }
             }
        }
        sp.innerHTML = lineHtml;
        sp.style.left = l.x + 'px';
        sp.style.top = l.y + 'px';
        sp.style.font = target.font;
        sp.style.color = target.computedColor; // Override inherited transparent color
        sp.style.lineHeight = lineH + 'px';
        sp.style.width = (l.width + 4) + 'px';
      }
    }

    // ============================================================
    // PHYSICS ENGINE v4 — Spring drag + inertia + Pretext reflow
    //
    // FIX #2: Spring drag.
    //   pointermove only sets obj.targetX/Y (the desired position).
    //   The rAF tick moves obj.x/y toward target via spring (k=0.18).
    //   This recreates the "slow slide" lag feel.
    //
    // FIX #3: Release velocity.
    //   obj.vx/vy are now set in tick as the spring delta (actual
    //   movement per frame), so release inertia feels natural.
    //
    // FIX #4: Re-grab without stutter.
    //   pointerdown stores CURRENT spring position as origin.
    //   targetX/Y start at that same position, so no snap occurs.
    // ============================================================
    (function physicsEngine() {
      var BOOK    = document.getElementById('raun-book');
      var PROFILE = document.getElementById('profile-photo');
      if (!BOOK && !PROFILE) return;

      var SPRING_K     = 0.18;  // spring stiffness — lower = more lag/slow-slide
      var FRICTION     = 0.90;  // glide friction per frame
      var BOUNCE       = 0.15;  // velocity inversion on wall hit - lowered for softer bounce
      var EDGE_PAD     = 30;
      var REFLOW_RANGE = 600;

      var objects = [];
      if (BOOK)    objects.push({ id: 'book',    el: BOOK,    x: 0, y: 0, vx: 0, vy: 0, vr: 0, r: 0, targetX: 0, targetY: 0, radius: 130, shape: 'rect',   returning: false, timer: null, timerActive: false });
      if (PROFILE) objects.push({ id: 'profile', el: PROFILE, x: 0, y: 0, vx: 0, vy: 0, vr: 0, r: 0, targetX: 0, targetY: 0, radius: 75,  shape: 'circle', returning: false, timer: null, timerActive: false });

      var animFrame = null;

      function startLoop() {
        if (!animFrame) animFrame = requestAnimationFrame(tick);
      }

      function objScreenCenter(obj) {
        var r = obj.el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      }

      function applyTransform(obj) {
        obj.el.style.transform = 'translate(' + obj.x + 'px,' + obj.y + 'px) rotate(' + obj.r + 'deg)';
      }

      function tick() {
        var anyMoving = false;

        objects.forEach(function(obj) {
          if (obj._dragging) {
            // "?"? Spring drag: follow target with lag (slow slide feel) "?"?
            var prevX = obj.x, prevY = obj.y;
            obj.x += (obj.targetX - obj.x) * SPRING_K;
            obj.y += (obj.targetY - obj.y) * SPRING_K;
            // Track actual spring velocity ?' used as release inertia
            obj.vx = obj.x - prevX;
            obj.vy = obj.y - prevY;
            // Tilt proportional to horizontal spring velocity
            var tiltTarget = obj.vx * 1.4;
            obj.r += (tiltTarget - obj.r) * 0.12;
            anyMoving = true;

          } else if (obj.returning) {
            // "?"? Lerp back to origin "?"?
            obj.x += (0 - obj.x) * 0.05;
            obj.y += (0 - obj.y) * 0.05;
            obj.r += (0 - obj.r) * 0.05;
            obj.vx = 0; obj.vy = 0;
            if (Math.abs(obj.x) < 0.4 && Math.abs(obj.y) < 0.4) {
              obj.x = 0; obj.y = 0; obj.r = 0; obj.returning = false;
            } else { anyMoving = true; }

          } else {
            // "?"? Glide inertia + wall bounce "?"?
            if (Math.abs(obj.vx) > 0.08 || Math.abs(obj.vy) > 0.08 || Math.abs(obj.vr) > 0.05) {
              obj.x += obj.vx; obj.y += obj.vy; obj.r += obj.vr;
              obj.vx *= FRICTION; obj.vy *= FRICTION; obj.vr *= FRICTION;
              var rect = obj.el.getBoundingClientRect();
              if (rect.left   < EDGE_PAD)                        { obj.x += EDGE_PAD - rect.left;                         obj.vx *= -BOUNCE; }
              if (rect.right  > window.innerWidth  - EDGE_PAD)   { obj.x -= rect.right  - (window.innerWidth  - EDGE_PAD); obj.vx *= -BOUNCE; }
              if (rect.top    < EDGE_PAD)                        { obj.y += EDGE_PAD - rect.top;                          obj.vy *= -BOUNCE; }
              if (rect.bottom > window.innerHeight - EDGE_PAD)   { obj.y -= rect.bottom - (window.innerHeight - EDGE_PAD); obj.vy *= -BOUNCE; }
              anyMoving = true;
            } else if (Math.abs(obj.x) > 1 || Math.abs(obj.y) > 1) {
              // Start return-to-origin countdown
              if (!obj.timerActive) {
                obj.timerActive = true;
                clearTimeout(obj.timer);
                obj.timer = setTimeout(function() {
                  obj.returning = true; obj.timerActive = false; startLoop();
                }, 10000);
              }
            }
          }

          applyTransform(obj);
        });

        // "?"? Pretext reflow at 60fps "?"?
        updateReflow();

        if (anyMoving || reflowTargets.some(function(t) { return t.active; })) {
          animFrame = requestAnimationFrame(tick);
        } else {
          animFrame = null;
        }
      }

      function updateReflow() {
        var anyActive = objects.some(function(obj) {
          return obj._dragging || Math.abs(obj.vx) > 0.05 || Math.abs(obj.x) > 2 || Math.abs(obj.y) > 2;
        });
        reflowTargets.forEach(function(t) {
          var cr = t.container.getBoundingClientRect();
          // Find the nearest obstacle that actually overlaps this container
          var nearestObs = null;
          var nearestLocalX = 0, nearestLocalY = 0;
          var minDist = Infinity;

          objects.forEach(function(obj) {
            if (obj.returning) return;
            // Limit functionality: Profile only affects elements ABOVE the RAUN section. Book affects RAUN and BELOW.
            if (obj.id === 'profile' && t.container.closest('#raun, .raun-detail, .about, .contact, .footer')) return;
            if (obj.id === 'book' && t.container.closest('.hero, .manifesto, .profile, .specialties')) return;
            
            var oc = objScreenCenter(obj);
            var r = obj.radius + 150; // larger buffer to prevent snapping when text is pushed down
            // Distance from obstacle center to nearest point on card bounds
            var nearX = Math.max(cr.left, Math.min(cr.right,  oc.x));
            var nearY = Math.max(cr.top,  Math.min(cr.bottom, oc.y));
            var dx = oc.x - nearX;
            var dy = oc.y - nearY;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < r && dist < minDist) {
              minDist = dist;
              nearestObs = obj;
              nearestLocalX = oc.x - cr.left;
              nearestLocalY = oc.y - cr.top;
            }
          });

          if (nearestObs && anyActive) {
            if (!t.active) { 
              t.overlay.style.display = 'block'; 
              t.container.style.color = 'transparent'; // Hides original text cleanly
              // Hide inner spans/strongs so they don't overlap the reflowed text
              Array.from(t.container.childNodes).forEach(function(n) {
                if (n !== t.overlay && n.nodeType === 1) {
                  if (!n.classList.contains('dropcap__letter')) n.style.opacity = '0';
                }
              });
              t.active = true; 
            }
            reflowTextAroundObstacle(t, nearestLocalX, nearestLocalY, nearestObs.radius, nearestObs.shape, nearestObs.el);
          } else if (t.active) {
            t.overlay.style.display = 'none'; 
            t.container.style.color = t.origColor; // Restore original color
            Array.from(t.container.childNodes).forEach(function(n) {
              if (n !== t.overlay && n.nodeType === 1) n.style.opacity = '';
            });
            t.active = false;
          }
        });
      }

      // "?"? Pointer events "?"?
      objects.forEach(function(obj) {
        obj.el.addEventListener('pointerdown', function(e) {
          e.preventDefault();
          obj._dragging = true;
          obj.returning = false; obj.timerActive = false; clearTimeout(obj.timer);
          obj._sx = e.clientX; obj._sy = e.clientY;
          // Store CURRENT spring position — prevents snap when grabbing mid-glide
          obj._ox = obj.x; obj._oy = obj.y;
          obj.targetX = obj.x; obj.targetY = obj.y;
          obj.el.classList.add('dragging');
          obj.el.style.transition = 'none';
          obj.el.setPointerCapture(e.pointerId);
          startLoop();
        });
        obj.el.addEventListener('dragstart', function(e) { e.preventDefault(); });
      });

      window.addEventListener('pointermove', function(e) {
        objects.forEach(function(obj) {
          if (!obj._dragging) return;
          // Only update the TARGET — spring in tick() moves the actual element
          obj.targetX = obj._ox + (e.clientX - obj._sx);
          obj.targetY = obj._oy + (e.clientY - obj._sy);
        });
      });

      window.addEventListener('pointerup', function() {
        objects.forEach(function(obj) {
          if (!obj._dragging) return;
          obj._dragging = false;
          obj.el.classList.remove('dragging');
          // vx/vy already hold the spring velocity from last tick — perfect for inertia
          obj.vx *= 1.6; obj.vy *= 1.6;  // amplify slightly for satisfying glide
          obj.vr = obj.vx * 0.08;
          startLoop();
        });
      });
    })();
