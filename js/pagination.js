﻿var xPagination = function(e) {
	var i = function(e, i) {
			var t = " " + e.className + " ";
			return t.indexOf(" " + i + " ") > -1
	}
		, t = function(e, i) {
			e.className += " " + i
	}
		, n = function(e, i) {
			e.className = e.className.replace(new RegExp("\\b" + i + "\\b","g"), "")
	}
		, a = function(i, t) {
			t = t || "DIV";
			var n = e.createElement(t);
			return n.className = i,
			n
	}
		, s = {
			prev: "&lt;",
			next: "&gt;",
			size: 15,
			max: 8,
			pages: 0,
			items: 0,
			curr: 1,
			info: !0,
			jump: !0
	}
		, p = function(e, i) {
			for (var t in i)
					e[t] = i[t];
			return e
	}
		, l = function(e, i) {
			e.style.display = void 0 === i ? "none" : i
	}
		, r = "page-item-active"
		, o = "page-item"
		, u = "page-item-hover"
		, c = "disable"
		, g = function() {
			var e, i, t = this, n = t.options, a = n.items -= 0, s = n.pages -= 0, p = n.max -= 0, l = [], r = t.pageList;
			for (n.size -= 0,
			a && (s = n.pages = Math.ceil(a / n.size)),
			r.innerHTML = "",
			p = Math.min(p, s),
			l.push('<li class="' + o + '" ui-page="first">1</li>'),
			e = 2; p > e; e++)
					l.push('<li class="' + o + '" ui-page="' + e + '">' + e + "</li>");
			p > 1 && l.push('<li class="' + o + '" ui-page="last">' + s + "</li>"),
			s > p && (i = '<li class="page-ellipsis" ui-page="ellipsis">...</li>',
			l.splice(1, 0, i),
			l.splice(l.length - 1, 0, i)),
			n.prev && l.unshift('<li class="page-btn-prev" ui-page="prev">' + n.prev + "</li>"),
			n.next && l.push('<li class="page-btn-next" ui-page="next">' + n.next + "</li>"),
			r.innerHTML = l.join(""),
			t.hasEllipsis = s > p
	}
		, m = function(e, l) {
			this.options = p({}, s),
			p(this.options, l);
			var r, o, c, m, f, h, v, d, M = this, x = M.options, L = x.pages -= 0, w = x.curr -= 0, N = (x.max -= 0,
			{
					last: function() {
							return x.pages
					},
					first: 1,
					next: function() {
							return x.curr >= x.pages ? x.pages : x.curr + 1
					},
					prev: function() {
							return x.curr <= 1 ? 1 : x.curr - 1
					}
			});
			if (r = e,
			e = a("page-list", "UL"),
			r.appendChild(e),
			i(r, "page-list-wrap") || t(r, "page-list-wrap"),
			this.pageList = e,
			g.call(this),
			x.onpagination && (M.onpagination = x.onpagination),
			x.showSize) {
					x.size -= 0;
					var b = a("page-list page-size", "ul")
						, T = {}
						, z = x.showSize
						, E = "";
					z.splice || (z = [x.size, 2 * x.size, 3 * x.size]);
					for (var y = 0; y < z.length; y++)
							E += '<li class="page-item">' + z[y] + "</li>",
							T[z[y]] = y;
					b.innerHTML = E,
					r.insertBefore(b, e),
					t(b.children[T[x.size]], u),
					b.onclick = function(e) {
							if (e = e || window.event,
							v = e.target || e.srcElement,
							"LI" === v.tagName && !i(v, u)) {
									var a = +v.innerHTML;
									for (M.options.size = a,
									x.items && g.call(M),
									M.go(x.curr),
									d = 0; 3 > d; d++)
											n(b.children[d], u);
									t(v, u)
							}
					}
			}
			x.info && (M.meta || (M.meta = e.parentNode.appendChild(a("page-list page-meta", "ul"))),
			o = a("page-text", "li"),
			"function" == typeof x.info ? o.innerHTML = x.info(x) : x.items ? o.innerHTML = "共" + x.items + "条" : o.innerHTML = "共" + L + "页",
			M.info = M.meta.appendChild(o)),
			x.jump && (M.meta || (M.meta = e.parentNode.appendChild(a("page-list page-meta", "ul"))),
			c = a("page-text page-input", "li"),
			c.innerHTML = '到第<span class="mid-helper"></span><input type="text" class="mid-text page-position">页',
			m = a("page-btn", "li"),
			m.innerHTML = "<button>确定</button>",
			M.meta.appendChild(c),
			c.onkeydown = function(e) {
					e = e || window.event,
					void 0 === e.which && (e.which = e.keyCode || e.button);
					var i = this.getElementsByTagName("input")[0]
						, t = parseInt(i.value, 10);
					isNaN(t) || 13 !== e.which || M.go(t)
			}
			,
			M.jump = M.meta.appendChild(m),
			M.jump.onclick = function() {
					h = this.previousSibling.getElementsByTagName("input")[0].value,
					h = parseInt(h, 10),
					isNaN(h) || "" === h || M.go(h)
			}
			),
			e.onclick = function(e) {
					w = x.curr,
					e = e || window.event,
					v = e.target || e.srcElement,
					"LI" === v.tagName && (h = v.getAttribute("ui-page"),
					h && "ellipsis" !== h && (N[h] && (f = N[h],
					h = "function" == typeof f ? f() : f),
					w !== h && M.go(+h)))
			}
			,
			M.go(x.curr)
	};
	return m.prototype.go = function(e) {
			function i(e) {
					t(e, r),
					p.currPageElement = e
			}
			function a(t) {
					t > h - m + 1 && (t = h - m + 2);
					var n, a, p, r = /\d+/, o = !0;
					for (s = 0; g > s; s++)
							a = u[s],
							n = a.getAttribute("ui-page"),
							r.test(n) ? (n != t && (a.innerHTML = t,
							a.setAttribute("ui-page", t)),
							t === e && i(a),
							t++) : "first" === n && 1 === e || "last" === n && e === h ? i(a) : "ellipsis" === n && (o ? (o = !1,
							p = e <= Math.ceil(f) ? void 0 : "",
							l(a, p)) : (p = e >= Math.ceil(h - f) ? void 0 : "",
							l(a, p)))
			}
			var s, p = this, o = p.options, u = p.pageList.children, g = (p.ellipsis,
			u.length), m = o.max, f = m / 2, h = o.pages, v = (u.first,
			u.last,
			o.prev);
			if (e = e > o.pages ? o.pages : 1 > e ? 1 : e,
			o.curr = e,
			p.currPageElement && n(p.currPageElement, r),
			p.currPageElement = null,
			!p.onpagination || p.onpagination(e, o.size) !== !1) {
					if (p.hasEllipsis) {
							var d = e - (Math.ceil(f - 1) - 1);
							e <= Math.ceil(f) ? d = 2 : e >= Math.ceil(h - f) && (d = Math.floor(h - f)),
							a(d)
					} else
							i(u[e - (v ? 0 : 1)]);
					v && (1 == e ? t : n)(u[0], c),
					o.next && (e == h ? t : n)(u[g - 1], c),
					p.jump && (p.jump.previousSibling.getElementsByTagName("input")[0].value = e),
					"function" == typeof o.info && (p.info.innerHTML = o.info(o))
			}
	}
	,
	function(e, i) {
			return new m(e,i)
	}
}(document);
var xPagination = function(e) {
	var i = function(e, i) {
			var t = " " + e.className + " ";
			return t.indexOf(" " + i + " ") > -1
	}
		, t = function(e, i) {
			e.className += " " + i
	}
		, n = function(e, i) {
			e.className = e.className.replace(new RegExp("\\b" + i + "\\b","g"), "")
	}
		, a = function(i, t) {
			t = t || "DIV";
			var n = e.createElement(t);
			return n.className = i,
			n
	}
		, s = {
			prev: "&lt;",
			next: "&gt;",
			size: 15,
			max: 8,
			pages: 0,
			items: 0,
			curr: 1,
			info: !0,
			jump: !0
	}
		, p = function(e, i) {
			for (var t in i)
					e[t] = i[t];
			return e
	}
		, l = function(e, i) {
			e.style.display = void 0 === i ? "none" : i
	}
		, r = "page-item-active"
		, o = "page-item"
		, u = "page-item-hover"
		, c = "disable"
		, g = function() {
			var e, i, t = this, n = t.options, a = n.items -= 0, s = n.pages -= 0, p = n.max -= 0, l = [], r = t.pageList;
			for (n.size -= 0,
			a && (s = n.pages = Math.ceil(a / n.size)),
			r.innerHTML = "",
			p = Math.min(p, s),
			l.push('<li class="' + o + '" ui-page="first">1</li>'),
			e = 2; p > e; e++)
					l.push('<li class="' + o + '" ui-page="' + e + '">' + e + "</li>");
			p > 1 && l.push('<li class="' + o + '" ui-page="last">' + s + "</li>"),
			s > p && (i = '<li class="page-ellipsis" ui-page="ellipsis">...</li>',
			l.splice(1, 0, i),
			l.splice(l.length - 1, 0, i)),
			n.prev && l.unshift('<li class="page-btn-prev" ui-page="prev">' + n.prev + "</li>"),
			n.next && l.push('<li class="page-btn-next" ui-page="next">' + n.next + "</li>"),
			r.innerHTML = l.join(""),
			t.hasEllipsis = s > p
	}
		, m = function(e, l) {
			this.options = p({}, s),
			p(this.options, l);
			var r, o, c, m, f, h, v, d, M = this, x = M.options, L = x.pages -= 0, w = x.curr -= 0, N = (x.max -= 0,
			{
					last: function() {
							return x.pages
					},
					first: 1,
					next: function() {
							return x.curr >= x.pages ? x.pages : x.curr + 1
					},
					prev: function() {
							return x.curr <= 1 ? 1 : x.curr - 1
					}
			});
			if (r = e,
			e = a("page-list", "UL"),
			r.appendChild(e),
			i(r, "page-list-wrap") || t(r, "page-list-wrap"),
			this.pageList = e,
			g.call(this),
			x.onpagination && (M.onpagination = x.onpagination),
			x.showSize) {
					x.size -= 0;
					var b = a("page-list page-size", "ul")
						, T = {}
						, z = x.showSize
						, E = "";
					z.splice || (z = [x.size, 2 * x.size, 3 * x.size]);
					for (var y = 0; y < z.length; y++)
							E += '<li class="page-item">' + z[y] + "</li>",
							T[z[y]] = y;
					b.innerHTML = E,
					r.insertBefore(b, e),
					t(b.children[T[x.size]], u),
					b.onclick = function(e) {
							if (e = e || window.event,
							v = e.target || e.srcElement,
							"LI" === v.tagName && !i(v, u)) {
									var a = +v.innerHTML;
									for (M.options.size = a,
									x.items && g.call(M),
									M.go(x.curr),
									d = 0; 3 > d; d++)
											n(b.children[d], u);
									t(v, u)
							}
					}
			}
			x.info && (M.meta || (M.meta = e.parentNode.appendChild(a("page-list page-meta", "ul"))),
			o = a("page-text", "li"),
			"function" == typeof x.info ? o.innerHTML = x.info(x) : x.items ? o.innerHTML = "共" + x.items + "条" : o.innerHTML = "共" + L + "页",
			M.info = M.meta.appendChild(o)),
			x.jump && (M.meta || (M.meta = e.parentNode.appendChild(a("page-list page-meta", "ul"))),
			c = a("page-text page-input", "li"),
			c.innerHTML = '到第 <span class="mid-helper"></span><input type="text" class="mid-text page-position"> 页',
			m = a("page-btn", "li"),
			m.innerHTML = "<button>确定</button>",
			M.meta.appendChild(c),
			c.onkeydown = function(e) {
					e = e || window.event,
					void 0 === e.which && (e.which = e.keyCode || e.button);
					var i = this.getElementsByTagName("input")[0]
						, t = parseInt(i.value, 10);
					isNaN(t) || 13 !== e.which || M.go(t)
			}
			,
			M.jump = M.meta.appendChild(m),
			M.jump.onclick = function() {
					h = this.previousSibling.getElementsByTagName("input")[0].value,
					h = parseInt(h, 10),
					isNaN(h) || "" === h || M.go(h)
			}
			),
			e.onclick = function(e) {
					w = x.curr,
					e = e || window.event,
					v = e.target || e.srcElement,
					"LI" === v.tagName && (h = v.getAttribute("ui-page"),
					h && "ellipsis" !== h && (N[h] && (f = N[h],
					h = "function" == typeof f ? f() : f),
					w !== h && M.go(+h)))
			}
			,
			M.go(x.curr)
	};
	return m.prototype.go = function(e) {
			function i(e) {
					t(e, r),
					p.currPageElement = e
			}
			function a(t) {
					t > h - m + 1 && (t = h - m + 2);
					var n, a, p, r = /\d+/, o = !0;
					for (s = 0; g > s; s++)
							a = u[s],
							n = a.getAttribute("ui-page"),
							r.test(n) ? (n != t && (a.innerHTML = t,
							a.setAttribute("ui-page", t)),
							t === e && i(a),
							t++) : "first" === n && 1 === e || "last" === n && e === h ? i(a) : "ellipsis" === n && (o ? (o = !1,
							p = e <= Math.ceil(f) ? void 0 : "",
							l(a, p)) : (p = e >= Math.ceil(h - f) ? void 0 : "",
							l(a, p)))
			}
			var s, p = this, o = p.options, u = p.pageList.children, g = (p.ellipsis,
			u.length), m = o.max, f = m / 2, h = o.pages, v = (u.first,
			u.last,
			o.prev);
			if (e = e > o.pages ? o.pages : 1 > e ? 1 : e,
			o.curr = e,
			p.currPageElement && n(p.currPageElement, r),
			p.currPageElement = null,
			!p.onpagination || p.onpagination(e, o.size) !== !1) {
					if (p.hasEllipsis) {
							var d = e - (Math.ceil(f - 1) - 1);
							e <= Math.ceil(f) ? d = 2 : e >= Math.ceil(h - f) && (d = Math.floor(h - f)),
							a(d)
					} else
							i(u[e - (v ? 0 : 1)]);
					v && (1 == e ? t : n)(u[0], c),
					o.next && (e == h ? t : n)(u[g - 1], c),
					p.jump && (p.jump.previousSibling.getElementsByTagName("input")[0].value = e),
					"function" == typeof o.info && (p.info.innerHTML = o.info(o))
			}
	}
	,
	function(e, i) {
			return new m(e,i)
	}
}(document);
