        function lv(n, f) { var s = ""; for (var i = 0; i < n; i++)s += f(i); return s }
        var ART = {
            1: function () { return '<path d="M4 30 Q50 22 96 30" stroke="#2f6a2a" stroke-width="3" fill="none"/>' + lv(10, function (i) { var x = 8 + i * 9; return '<path d="M' + x + ' 28 Q' + (x + 2) + ' 16 ' + (x + 7) + ' 6 M' + x + ' 29 Q' + (x + 2) + ' 42 ' + (x + 7) + ' 54" stroke="#3f9a3a" stroke-width="2.6" fill="none" stroke-linecap="round"/>' }) },
            2: function () { return lv(3, function (i) { var y = 4 + i * 19; return '<rect x="2" y="' + y + '" width="96" height="13" rx="6" fill="#cdb86b" stroke="#8a7a30"/><path d="M26 ' + y + 'v13M52 ' + y + 'v13M76 ' + y + 'v13" stroke="#8a7a30" stroke-width="2"/>' }) },
            3: function () { return '<path d="M3 32 L97 27" stroke="#5a3a1a" stroke-width="3"/>' + lv(15, function (i) { var x = 7 + i * 6; return '<path d="M' + x + ' ' + (32 - i * .05 * 5) + ' l3 -17 M' + x + ' ' + (32 - i * .05 * 5) + ' l3 17" stroke="#1f5a2a" stroke-width="2.2"/>' }) },
            4: function () { return '<rect x="0" y="4" width="100" height="52" fill="#9aa3ab"/>' + lv(13, function (i) { return '<path d="M' + (i * 8) + ' 4v52" stroke="#6f7880" stroke-width="2"/>' }) },
            5: function () { return '<rect x="0" y="4" width="100" height="52" fill="#2f6fb5"/><path d="M0 4h40L10 56H0z" fill="#5a9be0" opacity=".5"/>' },
            6: function () { return '<rect x="0" y="4" width="100" height="52" fill="#9fd0f2" opacity=".35" stroke="#bfe3fa" stroke-width="2"/><path d="M15 4L0 30M45 4L15 56M80 4L50 56" stroke="#fff" stroke-width="3" opacity=".6"/>' },
            7: function () { return '<path d="M5 40Q50 -12 95 40Z" fill="#c62828"/><path d="M50 6L20 40M50 6V40M50 6L80 40" stroke="#7f1414" stroke-width="1.5"/><path d="M50 40V54q0 5 -6 5" stroke="#444" stroke-width="3" fill="none"/>' },
            8: function () { return '<rect x="0" y="14" width="16" height="46" fill="#6b4423"/><path d="M4 60l-4 0M8 60l-3 6M13 60l3 6" stroke="#6b4423" stroke-width="2"/><path d="M16 30L97 24" stroke="#5a3a1a" stroke-width="3.5"/>' + lv(8, function (i) { var x = 24 + i * 10; return '<ellipse cx="' + x + '" cy="' + (21 + (i % 2 ? 9 : -9)) + '" rx="7" ry="4" fill="#3f9a3a"/>' }) },
            9: function () { return lv(5, function (i) { return '<rect x="0" y="' + (1 + i * 11.6) + '" width="100" height="11" fill="' + (i % 2 ? '#9a6830' : '#ad7a3e') + '" stroke="#6e4520"/>' }) + '<ellipse cx="30" cy="12" rx="3" ry="1.5" fill="#6e4520"/><ellipse cx="70" cy="36" rx="3" ry="1.5" fill="#6e4520"/>' },
            10: function () { return '<rect width="100" height="60" fill="#f4efe2"/><path d="M20 0Q26 30 18 60M50 0Q44 30 52 60M80 0Q86 30 78 60" stroke="#d6cdb5" stroke-width="3" fill="none"/>' },
            11: function () { return '<rect width="100" height="60" fill="#6b7a3a"/><rect x="3" y="3" width="94" height="54" fill="none" stroke="#e8e2b8" stroke-dasharray="4 3"/>' + '<circle cx="8" cy="8" r="2.5" fill="#333"/><circle cx="92" cy="8" r="2.5" fill="#333"/><circle cx="8" cy="52" r="2.5" fill="#333"/><circle cx="92" cy="52" r="2.5" fill="#333"/>' },
            12: function () { return '<rect width="100" height="60" fill="#c9a06a"/>' + lv(10, function (i) { return '<path d="M0 ' + (3 + i * 6) + 'h100" stroke="#b58a52" stroke-width="1.5"/>' }) + '<rect x="44" width="12" height="60" fill="#e8d9b0" opacity=".8"/>' }
        };
        var ITEMS = [
            { id: 1, n: "Ramas de palmera", t: "roof", ok: 1 }, { id: 2, n: "Cañas de bambú", t: "roof", ok: 1 }, { id: 3, n: "Ramas de pino cortadas", t: "roof", ok: 1 },
            { id: 4, n: "Chapa de metal", t: "roof", ok: 0, why: "No es vegetal." }, { id: 5, n: "Lona de plástico", t: "roof", ok: 0, why: "No es vegetal y tapa las estrellas." },
            { id: 6, n: "Vidrio", t: "roof", ok: 0, why: "No es vegetal." }, { id: 7, n: "Paraguas grande", t: "roof", ok: 0, why: "No es vegetal y tapa las estrellas." },
            { id: 8, n: "Rama unida al árbol", t: "roof", ok: 0, why: "El schach tiene que estar cortado, no unido a algo que crece del suelo." },
            { id: 9, n: "Madera", t: "walls", ok: 1 }, { id: 10, n: "Sábana gruesa", t: "walls", ok: 1 }, { id: 11, n: "Lona", t: "walls", ok: 1 }, { id: 12, n: "Cartón firme", t: "walls", ok: 1 }];
        var S = { roof: [0, 0, 0, 0], walls: [0, 0, 0] }, M = {}, sel = 0, drag = 0;
        var $ = function (i) { return document.getElementById(i) };
        function find(id) { return ITEMS.filter(function (i) { return i.id == id })[0] }
        function svg(id) { return '<svg viewBox="0 0 100 60" preserveAspectRatio="none">' + ART[id]() + '</svg>' }
        function stars() { var s = '<svg class="st" viewBox="0 0 300 200" preserveAspectRatio="none">'; for (var i = 0; i < 45; i++) { s += '<circle cx="' + ((i * 97) % 300) + '" cy="' + ((i * 53) % 150) + '" r="' + (0.8 + (i % 3) * .5) + '" fill="#fff" opacity="' + (0.5 + (i % 4) * .15) + '"/>' } return s + '</svg>' }
        function draw() {
            $("pal").innerHTML = ITEMS.map(function (it) { return '<div class="tile' + (sel == it.id ? ' sel' : '') + '" draggable="true" data-id="' + it.id + '">' + svg(it.id) + it.n + '</div>' }).join("");
            var h = stars();
            ["roof", "walls"].forEach(function (z) { h += '<div class="row ' + z + '">' + S[z].map(function (id, i) { var m = M[z + i]; return '<div class="slot' + (id ? ' f' : '') + (m === 1 ? ' ok' : m === 0 ? ' bad' : '') + '" data-z="' + z + '" data-i="' + i + '">' + (id ? svg(id) : (z == "roof" ? "Techo" : "Pared")) + '</div>' }).join("") + '</div>' });
            $("scene").innerHTML = h
        }
        function put(z, i, id) { S[z][i] = id; M = {}; sel = 0; drag = 0; $("res").style.display = "none"; draw() }
        $("pal").onclick = function (e) { var t = e.target.closest(".tile"); if (!t) return; var id = +t.dataset.id; sel = sel == id ? 0 : id; draw() };
        $("pal").ondragstart = function (e) { var t = e.target.closest(".tile"); if (t) { drag = +t.dataset.id; e.dataTransfer.setData("text/plain", drag) } };
        $("scene").onclick = function (e) { var s = e.target.closest(".slot"); if (!s) return; var z = s.dataset.z, i = +s.dataset.i; if (sel) put(z, i, sel); else if (S[z][i]) put(z, i, 0) };
        $("scene").ondragover = function (e) { e.preventDefault() };
        $("scene").ondrop = function (e) { e.preventDefault(); var s = e.target.closest(".slot"); if (s && drag) put(s.dataset.z, +s.dataset.i, drag) };
        $("rst").onclick = function () { S = { roof: [0, 0, 0, 0], walls: [0, 0, 0] }; M = {}; sel = 0; $("res").style.display = "none"; draw() };
        $("chk").onclick = function () {
            var out = [], good = true, r = 0, w = 0; M = {};
            S.roof.forEach(function (id, i) {
                if (!id) return; var it = find(id);
                if (it.t != "roof") { M["roof" + i] = 0; good = false; out.push(it.n + " es material de pared, no de techo.") }
                else if (!it.ok) { M["roof" + i] = 0; good = false; out.push(it.n + ": " + it.why) }
                else { M["roof" + i] = 1; r++ }
            });
            S.walls.forEach(function (id, i) {
                if (!id) return; var it = find(id);
                if (it.t != "walls") { M["walls" + i] = 0; good = false; out.push(it.n + " no sirve como pared.") } else { M["walls" + i] = 1; w++ }
            });
            if (r < 2) { good = false; out.push("Al techo le faltan piezas válidas (hay " + r + ", hacen falta 2 o más).") }
            if (w < 2) { good = false; out.push("Faltan paredes (hay " + w + ", hacen falta 2 o más).") }
            var R = $("res"); R.className = good ? "win" : "lose"; R.style.display = "block";
            R.innerHTML = good ? "<b>Sucá válida.</b> Techo vegetal, suelto, y se ven las estrellas." : "<b>Perdiste la sucá.</b> Corregí esto:<ul><li>" + out.join("</li><li>") + "</li></ul>";
            draw()
        };
        draw();
