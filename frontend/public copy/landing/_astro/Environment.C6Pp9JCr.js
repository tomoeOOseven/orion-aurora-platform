import {r as Q, a as Of} from "./index.BA4EfN95.js";
import {l as Vu, g as wa, m as qu, f as hs, n as zo, o as Nf, p as kf, q as Uf, N as Jf, r as Kf, W as $u, C as Qf, b as vs, V as pt, s as zf, h as Ra, t as ds, u as bo, v as sn, d as Cr, U as As, w as Gn, x as bf, y as jf, z as ga, D as ec, F as tc, G as Bs, I as Xf, j as Fa, H as nc, J as ms, K as _a, X as Vn, Y as Dn, Z as xn, _ as Wf, $ as Yf, a0 as Zf, a1 as Vf, Q as rc, O as ic, a2 as qf, a3 as $f, i as Vr, a4 as ed, a5 as sc, a6 as td, a7 as nd, a8 as rd, e as _t, a9 as id, aa as va, ab as sd, ac as An, ad as od, ae as ad, af as oc, ag as mr, ah as ld, ai as ud, aj as cd, ak as fd, al as dd, k as pd, am as jo, M as hd, an as Ad, ao as md, ap as ac, aq as gd, ar as vd, as as Bd, at as Cd, au as gu, av as yd, aw as Ed, ax as Md, ay as Sd, az as Id, aA as lc, aB as Ht, aC as on, aD as gr, aE as wd, aF as Ta, aG as Rd, aH as uc, aI as gs, aJ as Fd, aK as Ba, aL as _d, aM as Td, aN as Dd, aO as Gd, aP as xd, aQ as vu, aR as Hd, aS as Ld, aT as Pd, aU as Od, aV as Nd, aW as kd} from "./three.module.DT35w0d6.js";
import {g as cc} from "./_commonjsHelpers.CqkleIqs.js";
var Xo = {
    exports: {}
}
  , In = {};
/**
 * @license React
 * react-reconciler-constants.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bu;
function Ud() {
    return Bu || (Bu = 1,
    In.ConcurrentRoot = 1,
    In.ContinuousEventPriority = 4,
    In.DefaultEventPriority = 16,
    In.DiscreteEventPriority = 1,
    In.IdleEventPriority = 536870912,
    In.LegacyRoot = 0),
    In
}
var Cu;
function Jd() {
    return Cu || (Cu = 1,
    Xo.exports = Ud()),
    Xo.exports
}
var vr = Jd();
function Kd(o) {
    let r;
    const s = new Set
      , u = (v, h) => {
        const A = typeof v == "function" ? v(r) : v;
        if (A !== r) {
            const B = r;
            r = h ? A : Object.assign({}, r, A),
            s.forEach(E => E(r, B))
        }
    }
      , l = () => r
      , f = (v, h=l, A=Object.is) => {
        console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");
        let B = h(r);
        function E() {
            const M = h(r);
            if (!A(B, M)) {
                const D = B;
                v(B = M, D)
            }
        }
        return s.add(E),
        () => s.delete(E)
    }
      , p = {
        setState: u,
        getState: l,
        subscribe: (v, h, A) => h || A ? f(v, h, A) : (s.add(v),
        () => s.delete(v)),
        destroy: () => s.clear()
    };
    return r = o(u, l, p),
    p
}
const Qd = typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent)
  , yu = Qd ? Q.useEffect : Q.useLayoutEffect;
function fc(o) {
    const r = typeof o == "function" ? Kd(o) : o
      , s = (u=r.getState, l=Object.is) => {
        const [,f] = Q.useReducer(w => w + 1, 0)
          , c = r.getState()
          , g = Q.useRef(c)
          , p = Q.useRef(u)
          , v = Q.useRef(l)
          , h = Q.useRef(!1)
          , A = Q.useRef();
        A.current === void 0 && (A.current = u(c));
        let B, E = !1;
        (g.current !== c || p.current !== u || v.current !== l || h.current) && (B = u(c),
        E = !l(A.current, B)),
        yu( () => {
            E && (A.current = B),
            g.current = c,
            p.current = u,
            v.current = l,
            h.current = !1
        }
        );
        const M = Q.useRef(c);
        yu( () => {
            const w = () => {
                try {
                    const T = r.getState()
                      , R = p.current(T);
                    v.current(A.current, R) || (g.current = T,
                    A.current = R,
                    f())
                } catch {
                    h.current = !0,
                    f()
                }
            }
              , I = r.subscribe(w);
            return r.getState() !== M.current && w(),
            I
        }
        , []);
        const D = E ? B : A.current;
        return Q.useDebugValue(D),
        D
    }
    ;
    return Object.assign(s, r),
    s[Symbol.iterator] = function() {
        console.warn("[useStore, api] = create() is deprecated and will be removed in v4");
        const u = [s, r];
        return {
            next() {
                const l = u.length <= 0;
                return {
                    value: u.shift(),
                    done: l
                }
            }
        }
    }
    ,
    s
}
var Wo = {
    exports: {}
}
  , Yo = {
    exports: {}
}
  , Zo = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Eu;
function zd() {
    return Eu || (Eu = 1,
    function(o) {
        function r(G, j) {
            var K = G.length;
            G.push(j);
            e: for (; 0 < K; ) {
                var re = K - 1 >>> 1
                  , le = G[re];
                if (0 < l(le, j))
                    G[re] = j,
                    G[K] = le,
                    K = re;
                else
                    break e
            }
        }
        function s(G) {
            return G.length === 0 ? null : G[0]
        }
        function u(G) {
            if (G.length === 0)
                return null;
            var j = G[0]
              , K = G.pop();
            if (K !== j) {
                G[0] = K;
                e: for (var re = 0, le = G.length, ye = le >>> 1; re < ye; ) {
                    var Ue = 2 * (re + 1) - 1
                      , qe = G[Ue]
                      , me = Ue + 1
                      , $e = G[me];
                    if (0 > l(qe, K))
                        me < le && 0 > l($e, qe) ? (G[re] = $e,
                        G[me] = K,
                        re = me) : (G[re] = qe,
                        G[Ue] = K,
                        re = Ue);
                    else if (me < le && 0 > l($e, K))
                        G[re] = $e,
                        G[me] = K,
                        re = me;
                    else
                        break e
                }
            }
            return j
        }
        function l(G, j) {
            var K = G.sortIndex - j.sortIndex;
            return K !== 0 ? K : G.id - j.id
        }
        if (typeof performance == "object" && typeof performance.now == "function") {
            var f = performance;
            o.unstable_now = function() {
                return f.now()
            }
        } else {
            var c = Date
              , g = c.now();
            o.unstable_now = function() {
                return c.now() - g
            }
        }
        var p = []
          , v = []
          , h = 1
          , A = null
          , B = 3
          , E = !1
          , M = !1
          , D = !1
          , w = typeof setTimeout == "function" ? setTimeout : null
          , I = typeof clearTimeout == "function" ? clearTimeout : null
          , T = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function R(G) {
            for (var j = s(v); j !== null; ) {
                if (j.callback === null)
                    u(v);
                else if (j.startTime <= G)
                    u(v),
                    j.sortIndex = j.expirationTime,
                    r(p, j);
                else
                    break;
                j = s(v)
            }
        }
        function U(G) {
            if (D = !1,
            R(G),
            !M)
                if (s(p) !== null)
                    M = !0,
                    He(b);
                else {
                    var j = s(v);
                    j !== null && ke(U, j.startTime - G)
                }
        }
        function b(G, j) {
            M = !1,
            D && (D = !1,
            I(X),
            X = -1),
            E = !0;
            var K = B;
            try {
                for (R(j),
                A = s(p); A !== null && (!(A.expirationTime > j) || G && !J()); ) {
                    var re = A.callback;
                    if (typeof re == "function") {
                        A.callback = null,
                        B = A.priorityLevel;
                        var le = re(A.expirationTime <= j);
                        j = o.unstable_now(),
                        typeof le == "function" ? A.callback = le : A === s(p) && u(p),
                        R(j)
                    } else
                        u(p);
                    A = s(p)
                }
                if (A !== null)
                    var ye = !0;
                else {
                    var Ue = s(v);
                    Ue !== null && ke(U, Ue.startTime - j),
                    ye = !1
                }
                return ye
            } finally {
                A = null,
                B = K,
                E = !1
            }
        }
        var k = !1
          , Y = null
          , X = -1
          , z = 5
          , oe = -1;
        function J() {
            return !(o.unstable_now() - oe < z)
        }
        function ue() {
            if (Y !== null) {
                var G = o.unstable_now();
                oe = G;
                var j = !0;
                try {
                    j = Y(!0, G)
                } finally {
                    j ? Ae() : (k = !1,
                    Y = null)
                }
            } else
                k = !1
        }
        var Ae;
        if (typeof T == "function")
            Ae = function() {
                T(ue)
            }
            ;
        else if (typeof MessageChannel < "u") {
            var _e = new MessageChannel
              , Re = _e.port2;
            _e.port1.onmessage = ue,
            Ae = function() {
                Re.postMessage(null)
            }
        } else
            Ae = function() {
                w(ue, 0)
            }
            ;
        function He(G) {
            Y = G,
            k || (k = !0,
            Ae())
        }
        function ke(G, j) {
            X = w(function() {
                G(o.unstable_now())
            }, j)
        }
        o.unstable_IdlePriority = 5,
        o.unstable_ImmediatePriority = 1,
        o.unstable_LowPriority = 4,
        o.unstable_NormalPriority = 3,
        o.unstable_Profiling = null,
        o.unstable_UserBlockingPriority = 2,
        o.unstable_cancelCallback = function(G) {
            G.callback = null
        }
        ,
        o.unstable_continueExecution = function() {
            M || E || (M = !0,
            He(b))
        }
        ,
        o.unstable_forceFrameRate = function(G) {
            0 > G || 125 < G ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : z = 0 < G ? Math.floor(1e3 / G) : 5
        }
        ,
        o.unstable_getCurrentPriorityLevel = function() {
            return B
        }
        ,
        o.unstable_getFirstCallbackNode = function() {
            return s(p)
        }
        ,
        o.unstable_next = function(G) {
            switch (B) {
            case 1:
            case 2:
            case 3:
                var j = 3;
                break;
            default:
                j = B
            }
            var K = B;
            B = j;
            try {
                return G()
            } finally {
                B = K
            }
        }
        ,
        o.unstable_pauseExecution = function() {}
        ,
        o.unstable_requestPaint = function() {}
        ,
        o.unstable_runWithPriority = function(G, j) {
            switch (G) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                G = 3
            }
            var K = B;
            B = G;
            try {
                return j()
            } finally {
                B = K
            }
        }
        ,
        o.unstable_scheduleCallback = function(G, j, K) {
            var re = o.unstable_now();
            switch (typeof K == "object" && K !== null ? (K = K.delay,
            K = typeof K == "number" && 0 < K ? re + K : re) : K = re,
            G) {
            case 1:
                var le = -1;
                break;
            case 2:
                le = 250;
                break;
            case 5:
                le = 1073741823;
                break;
            case 4:
                le = 1e4;
                break;
            default:
                le = 5e3
            }
            return le = K + le,
            G = {
                id: h++,
                callback: j,
                priorityLevel: G,
                startTime: K,
                expirationTime: le,
                sortIndex: -1
            },
            K > re ? (G.sortIndex = K,
            r(v, G),
            s(p) === null && G === s(v) && (D ? (I(X),
            X = -1) : D = !0,
            ke(U, K - re))) : (G.sortIndex = le,
            r(p, G),
            M || E || (M = !0,
            He(b))),
            G
        }
        ,
        o.unstable_shouldYield = J,
        o.unstable_wrapCallback = function(G) {
            var j = B;
            return function() {
                var K = B;
                B = j;
                try {
                    return G.apply(this, arguments)
                } finally {
                    B = K
                }
            }
        }
    }(Zo)),
    Zo
}
var Mu;
function bd() {
    return Mu || (Mu = 1,
    Yo.exports = zd()),
    Yo.exports
}
/**
 * @license React
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vo, Su;
function jd() {
    return Su || (Su = 1,
    Vo = function(r) {
        var s = {}
          , u = Of()
          , l = bd()
          , f = Object.assign;
        function c(e) {
            for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
                t += "&args[]=" + encodeURIComponent(arguments[n]);
            return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
        }
        var g = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
          , p = Symbol.for("react.element")
          , v = Symbol.for("react.portal")
          , h = Symbol.for("react.fragment")
          , A = Symbol.for("react.strict_mode")
          , B = Symbol.for("react.profiler")
          , E = Symbol.for("react.provider")
          , M = Symbol.for("react.context")
          , D = Symbol.for("react.forward_ref")
          , w = Symbol.for("react.suspense")
          , I = Symbol.for("react.suspense_list")
          , T = Symbol.for("react.memo")
          , R = Symbol.for("react.lazy")
          , U = Symbol.for("react.offscreen")
          , b = Symbol.iterator;
        function k(e) {
            return e === null || typeof e != "object" ? null : (e = b && e[b] || e["@@iterator"],
            typeof e == "function" ? e : null)
        }
        function Y(e) {
            if (e == null)
                return null;
            if (typeof e == "function")
                return e.displayName || e.name || null;
            if (typeof e == "string")
                return e;
            switch (e) {
            case h:
                return "Fragment";
            case v:
                return "Portal";
            case B:
                return "Profiler";
            case A:
                return "StrictMode";
            case w:
                return "Suspense";
            case I:
                return "SuspenseList"
            }
            if (typeof e == "object")
                switch (e.$$typeof) {
                case M:
                    return (e.displayName || "Context") + ".Consumer";
                case E:
                    return (e._context.displayName || "Context") + ".Provider";
                case D:
                    var t = e.render;
                    return e = e.displayName,
                    e || (e = t.displayName || t.name || "",
                    e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
                    e;
                case T:
                    return t = e.displayName || null,
                    t !== null ? t : Y(e.type) || "Memo";
                case R:
                    t = e._payload,
                    e = e._init;
                    try {
                        return Y(e(t))
                    } catch {}
                }
            return null
        }
        function X(e) {
            var t = e.type;
            switch (e.tag) {
            case 24:
                return "Cache";
            case 9:
                return (t.displayName || "Context") + ".Consumer";
            case 10:
                return (t._context.displayName || "Context") + ".Provider";
            case 18:
                return "DehydratedFragment";
            case 11:
                return e = t.render,
                e = e.displayName || e.name || "",
                t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
            case 7:
                return "Fragment";
            case 5:
                return t;
            case 4:
                return "Portal";
            case 3:
                return "Root";
            case 6:
                return "Text";
            case 16:
                return Y(t);
            case 8:
                return t === A ? "StrictMode" : "Mode";
            case 22:
                return "Offscreen";
            case 12:
                return "Profiler";
            case 21:
                return "Scope";
            case 13:
                return "Suspense";
            case 19:
                return "SuspenseList";
            case 25:
                return "TracingMarker";
            case 1:
            case 0:
            case 17:
            case 2:
            case 14:
            case 15:
                if (typeof t == "function")
                    return t.displayName || t.name || null;
                if (typeof t == "string")
                    return t
            }
            return null
        }
        function z(e) {
            var t = e
              , n = e;
            if (e.alternate)
                for (; t.return; )
                    t = t.return;
            else {
                e = t;
                do
                    t = e,
                    (t.flags & 4098) !== 0 && (n = t.return),
                    e = t.return;
                while (e)
            }
            return t.tag === 3 ? n : null
        }
        function oe(e) {
            if (z(e) !== e)
                throw Error(c(188))
        }
        function J(e) {
            var t = e.alternate;
            if (!t) {
                if (t = z(e),
                t === null)
                    throw Error(c(188));
                return t !== e ? null : e
            }
            for (var n = e, i = t; ; ) {
                var a = n.return;
                if (a === null)
                    break;
                var d = a.alternate;
                if (d === null) {
                    if (i = a.return,
                    i !== null) {
                        n = i;
                        continue
                    }
                    break
                }
                if (a.child === d.child) {
                    for (d = a.child; d; ) {
                        if (d === n)
                            return oe(a),
                            e;
                        if (d === i)
                            return oe(a),
                            t;
                        d = d.sibling
                    }
                    throw Error(c(188))
                }
                if (n.return !== i.return)
                    n = a,
                    i = d;
                else {
                    for (var y = !1, F = a.child; F; ) {
                        if (F === n) {
                            y = !0,
                            n = a,
                            i = d;
                            break
                        }
                        if (F === i) {
                            y = !0,
                            i = a,
                            n = d;
                            break
                        }
                        F = F.sibling
                    }
                    if (!y) {
                        for (F = d.child; F; ) {
                            if (F === n) {
                                y = !0,
                                n = d,
                                i = a;
                                break
                            }
                            if (F === i) {
                                y = !0,
                                i = d,
                                n = a;
                                break
                            }
                            F = F.sibling
                        }
                        if (!y)
                            throw Error(c(189))
                    }
                }
                if (n.alternate !== i)
                    throw Error(c(190))
            }
            if (n.tag !== 3)
                throw Error(c(188));
            return n.stateNode.current === n ? e : t
        }
        function ue(e) {
            return e = J(e),
            e !== null ? Ae(e) : null
        }
        function Ae(e) {
            if (e.tag === 5 || e.tag === 6)
                return e;
            for (e = e.child; e !== null; ) {
                var t = Ae(e);
                if (t !== null)
                    return t;
                e = e.sibling
            }
            return null
        }
        function _e(e) {
            if (e.tag === 5 || e.tag === 6)
                return e;
            for (e = e.child; e !== null; ) {
                if (e.tag !== 4) {
                    var t = _e(e);
                    if (t !== null)
                        return t
                }
                e = e.sibling
            }
            return null
        }
        var Re = Array.isArray, He = r.getPublicInstance, ke = r.getRootHostContext, G = r.getChildHostContext, j = r.prepareForCommit, K = r.resetAfterCommit, re = r.createInstance, le = r.appendInitialChild, ye = r.finalizeInitialChildren, Ue = r.prepareUpdate, qe = r.shouldSetTextContent, me = r.createTextInstance, $e = r.scheduleTimeout, bt = r.cancelTimeout, Sr = r.noTimeout, qn = r.isPrimaryRenderer, It = r.supportsMutation, $n = r.supportsPersistence, ht = r.supportsHydration, ni = r.getInstanceFromNode, ri = r.preparePortalMount, Cs = r.getCurrentEventPriority, ys = r.detachDeletedInstance, Es = r.supportsMicrotasks, Ms = r.scheduleMicrotask, Hn = r.supportsTestSelectors, Ss = r.findFiberRoot, Is = r.getBoundingRect, ii = r.getTextContent, Ln = r.isHiddenSubtree, Ir = r.matchAccessibilityRole, ws = r.setFocusIfFocusable, Rs = r.setupIntersectionObserver, si = r.appendChild, er = r.appendChildToContainer, Fs = r.commitTextUpdate, _s = r.commitMount, Ts = r.commitUpdate, Pn = r.insertBefore, At = r.insertInContainerBefore, oi = r.removeChild, mn = r.removeChildFromContainer, yt = r.resetTextContent, at = r.hideInstance, Ds = r.hideTextInstance, se = r.unhideInstance, On = r.unhideTextInstance, Gs = r.clearContainer, xs = r.cloneInstance, ai = r.createContainerChildSet, li = r.appendChildToContainerChildSet, Hs = r.finalizeContainerChildren, ui = r.replaceContainerChildren, ci = r.cloneHiddenInstance, fi = r.cloneHiddenTextInstance, Ls = r.canHydrateInstance, Ps = r.canHydrateTextInstance, Os = r.canHydrateSuspenseInstance, Nn = r.isSuspenseInstancePending, wr = r.isSuspenseInstanceFallback, kn = r.registerSuspenseInstanceRetry, jt = r.getNextHydratableSibling, Fe = r.getFirstHydratableChild, di = r.getFirstHydratableChildWithinContainer, Ns = r.getFirstHydratableChildWithinSuspenseInstance, m = r.hydrateInstance, C = r.hydrateTextInstance, S = r.hydrateSuspenseInstance, H = r.getNextHydratableInstanceAfterSuspenseInstance, P = r.commitHydratedContainer, O = r.commitHydratedSuspenseInstance, Z = r.clearSuspenseBoundary, W = r.clearSuspenseBoundaryFromContainer, ee = r.shouldDeleteUnhydratedTailInstances, $ = r.didNotMatchHydratedContainerTextInstance, te = r.didNotMatchHydratedTextInstance, q;
        function Ke(e) {
            if (q === void 0)
                try {
                    throw Error()
                } catch (n) {
                    var t = n.stack.trim().match(/\n( *(at )?)/);
                    q = t && t[1] || ""
                }
            return `
` + q + e
        }
        var ce = !1;
        function de(e, t) {
            if (!e || ce)
                return "";
            ce = !0;
            var n = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            try {
                if (t)
                    if (t = function() {
                        throw Error()
                    }
                    ,
                    Object.defineProperty(t.prototype, "props", {
                        set: function() {
                            throw Error()
                        }
                    }),
                    typeof Reflect == "object" && Reflect.construct) {
                        try {
                            Reflect.construct(t, [])
                        } catch (V) {
                            var i = V
                        }
                        Reflect.construct(e, [], t)
                    } else {
                        try {
                            t.call()
                        } catch (V) {
                            i = V
                        }
                        e.call(t.prototype)
                    }
                else {
                    try {
                        throw Error()
                    } catch (V) {
                        i = V
                    }
                    e()
                }
            } catch (V) {
                if (V && i && typeof V.stack == "string") {
                    for (var a = V.stack.split(`
`), d = i.stack.split(`
`), y = a.length - 1, F = d.length - 1; 1 <= y && 0 <= F && a[y] !== d[F]; )
                        F--;
                    for (; 1 <= y && 0 <= F; y--,
                    F--)
                        if (a[y] !== d[F]) {
                            if (y !== 1 || F !== 1)
                                do
                                    if (y--,
                                    F--,
                                    0 > F || a[y] !== d[F]) {
                                        var N = `
` + a[y].replace(" at new ", " at ");
                                        return e.displayName && N.includes("<anonymous>") && (N = N.replace("<anonymous>", e.displayName)),
                                        N
                                    }
                                while (1 <= y && 0 <= F);
                            break
                        }
                }
            } finally {
                ce = !1,
                Error.prepareStackTrace = n
            }
            return (e = e ? e.displayName || e.name : "") ? Ke(e) : ""
        }
        var ve = Object.prototype.hasOwnProperty
          , Ee = []
          , xe = -1;
        function Te(e) {
            return {
                current: e
            }
        }
        function ge(e) {
            0 > xe || (e.current = Ee[xe],
            Ee[xe] = null,
            xe--)
        }
        function Me(e, t) {
            xe++,
            Ee[xe] = e.current,
            e.current = t
        }
        var De = {}
          , ze = Te(De)
          , Se = Te(!1)
          , je = De;
        function mt(e, t) {
            var n = e.type.contextTypes;
            if (!n)
                return De;
            var i = e.stateNode;
            if (i && i.__reactInternalMemoizedUnmaskedChildContext === t)
                return i.__reactInternalMemoizedMaskedChildContext;
            var a = {}, d;
            for (d in n)
                a[d] = t[d];
            return i && (e = e.stateNode,
            e.__reactInternalMemoizedUnmaskedChildContext = t,
            e.__reactInternalMemoizedMaskedChildContext = a),
            a
        }
        function nt(e) {
            return e = e.childContextTypes,
            e != null
        }
        function ft() {
            ge(Se),
            ge(ze)
        }
        function Je(e, t, n) {
            if (ze.current !== De)
                throw Error(c(168));
            Me(ze, t),
            Me(Se, n)
        }
        function st(e, t, n) {
            var i = e.stateNode;
            if (t = t.childContextTypes,
            typeof i.getChildContext != "function")
                return n;
            i = i.getChildContext();
            for (var a in i)
                if (!(a in t))
                    throw Error(c(108, X(e) || "Unknown", a));
            return f({}, n, i)
        }
        function Qe(e) {
            return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || De,
            je = ze.current,
            Me(ze, e),
            Me(Se, Se.current),
            !0
        }
        function Le(e, t, n) {
            var i = e.stateNode;
            if (!i)
                throw Error(c(169));
            n ? (e = st(e, t, je),
            i.__reactInternalMemoizedMergedChildContext = e,
            ge(Se),
            ge(ze),
            Me(ze, e)) : ge(Se),
            Me(Se, n)
        }
        var Ye = Math.clz32 ? Math.clz32 : Zt
          , ln = Math.log
          , Et = Math.LN2;
        function Zt(e) {
            return e >>>= 0,
            e === 0 ? 32 : 31 - (ln(e) / Et | 0) | 0
        }
        var pi = 64
          , hi = 4194304;
        function Rr(e) {
            switch (e & -e) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 4:
                return 4;
            case 8:
                return 8;
            case 16:
                return 16;
            case 32:
                return 32;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
                return e & 4194240;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
                return e & 130023424;
            case 134217728:
                return 134217728;
            case 268435456:
                return 268435456;
            case 536870912:
                return 536870912;
            case 1073741824:
                return 1073741824;
            default:
                return e
            }
        }
        function Ai(e, t) {
            var n = e.pendingLanes;
            if (n === 0)
                return 0;
            var i = 0
              , a = e.suspendedLanes
              , d = e.pingedLanes
              , y = n & 268435455;
            if (y !== 0) {
                var F = y & ~a;
                F !== 0 ? i = Rr(F) : (d &= y,
                d !== 0 && (i = Rr(d)))
            } else
                y = n & ~a,
                y !== 0 ? i = Rr(y) : d !== 0 && (i = Rr(d));
            if (i === 0)
                return 0;
            if (t !== 0 && t !== i && (t & a) === 0 && (a = i & -i,
            d = t & -t,
            a >= d || a === 16 && (d & 4194240) !== 0))
                return t;
            if ((i & 4) !== 0 && (i |= n & 16),
            t = e.entangledLanes,
            t !== 0)
                for (e = e.entanglements,
                t &= i; 0 < t; )
                    n = 31 - Ye(t),
                    a = 1 << n,
                    i |= e[n],
                    t &= ~a;
            return i
        }
        function Wc(e, t) {
            switch (e) {
            case 1:
            case 2:
            case 4:
                return t + 250;
            case 8:
            case 16:
            case 32:
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
                return t + 5e3;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
                return -1;
            case 134217728:
            case 268435456:
            case 536870912:
            case 1073741824:
                return -1;
            default:
                return -1
            }
        }
        function Yc(e, t) {
            for (var n = e.suspendedLanes, i = e.pingedLanes, a = e.expirationTimes, d = e.pendingLanes; 0 < d; ) {
                var y = 31 - Ye(d)
                  , F = 1 << y
                  , N = a[y];
                N === -1 ? ((F & n) === 0 || (F & i) !== 0) && (a[y] = Wc(F, t)) : N <= t && (e.expiredLanes |= F),
                d &= ~F
            }
        }
        function ks(e) {
            return e = e.pendingLanes & -1073741825,
            e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
        }
        function Us(e) {
            for (var t = [], n = 0; 31 > n; n++)
                t.push(e);
            return t
        }
        function Fr(e, t, n) {
            e.pendingLanes |= t,
            t !== 536870912 && (e.suspendedLanes = 0,
            e.pingedLanes = 0),
            e = e.eventTimes,
            t = 31 - Ye(t),
            e[t] = n
        }
        function Zc(e, t) {
            var n = e.pendingLanes & ~t;
            e.pendingLanes = t,
            e.suspendedLanes = 0,
            e.pingedLanes = 0,
            e.expiredLanes &= t,
            e.mutableReadLanes &= t,
            e.entangledLanes &= t,
            t = e.entanglements;
            var i = e.eventTimes;
            for (e = e.expirationTimes; 0 < n; ) {
                var a = 31 - Ye(n)
                  , d = 1 << a;
                t[a] = 0,
                i[a] = -1,
                e[a] = -1,
                n &= ~d
            }
        }
        function Js(e, t) {
            var n = e.entangledLanes |= t;
            for (e = e.entanglements; n; ) {
                var i = 31 - Ye(n)
                  , a = 1 << i;
                a & t | e[i] & t && (e[i] |= t),
                n &= ~a
            }
        }
        var Pe = 0;
        function Ua(e) {
            return e &= -e,
            1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1
        }
        var Ks = l.unstable_scheduleCallback
          , Ja = l.unstable_cancelCallback
          , Vc = l.unstable_shouldYield
          , qc = l.unstable_requestPaint
          , lt = l.unstable_now
          , Qs = l.unstable_ImmediatePriority
          , $c = l.unstable_UserBlockingPriority
          , zs = l.unstable_NormalPriority
          , ef = l.unstable_IdlePriority
          , mi = null
          , Vt = null;
        function tf(e) {
            if (Vt && typeof Vt.onCommitFiberRoot == "function")
                try {
                    Vt.onCommitFiberRoot(mi, e, void 0, (e.current.flags & 128) === 128)
                } catch {}
        }
        function nf(e, t) {
            return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
        }
        var qt = typeof Object.is == "function" ? Object.is : nf
          , un = null
          , gi = !1
          , bs = !1;
        function Ka(e) {
            un === null ? un = [e] : un.push(e)
        }
        function rf(e) {
            gi = !0,
            Ka(e)
        }
        function $t() {
            if (!bs && un !== null) {
                bs = !0;
                var e = 0
                  , t = Pe;
                try {
                    var n = un;
                    for (Pe = 1; e < n.length; e++) {
                        var i = n[e];
                        do
                            i = i(!0);
                        while (i !== null)
                    }
                    un = null,
                    gi = !1
                } catch (a) {
                    throw un !== null && (un = un.slice(e + 1)),
                    Ks(Qs, $t),
                    a
                } finally {
                    Pe = t,
                    bs = !1
                }
            }
            return null
        }
        var sf = g.ReactCurrentBatchConfig;
        function vi(e, t) {
            if (qt(e, t))
                return !0;
            if (typeof e != "object" || e === null || typeof t != "object" || t === null)
                return !1;
            var n = Object.keys(e)
              , i = Object.keys(t);
            if (n.length !== i.length)
                return !1;
            for (i = 0; i < n.length; i++) {
                var a = n[i];
                if (!ve.call(t, a) || !qt(e[a], t[a]))
                    return !1
            }
            return !0
        }
        function of(e) {
            switch (e.tag) {
            case 5:
                return Ke(e.type);
            case 16:
                return Ke("Lazy");
            case 13:
                return Ke("Suspense");
            case 19:
                return Ke("SuspenseList");
            case 0:
            case 2:
            case 15:
                return e = de(e.type, !1),
                e;
            case 11:
                return e = de(e.type.render, !1),
                e;
            case 1:
                return e = de(e.type, !0),
                e;
            default:
                return ""
            }
        }
        function Xt(e, t) {
            if (e && e.defaultProps) {
                t = f({}, t),
                e = e.defaultProps;
                for (var n in e)
                    t[n] === void 0 && (t[n] = e[n]);
                return t
            }
            return t
        }
        var Bi = Te(null)
          , Ci = null
          , tr = null
          , js = null;
        function Xs() {
            js = tr = Ci = null
        }
        function Qa(e, t, n) {
            qn ? (Me(Bi, t._currentValue),
            t._currentValue = n) : (Me(Bi, t._currentValue2),
            t._currentValue2 = n)
        }
        function Ws(e) {
            var t = Bi.current;
            ge(Bi),
            qn ? e._currentValue = t : e._currentValue2 = t
        }
        function Ys(e, t, n) {
            for (; e !== null; ) {
                var i = e.alternate;
                if ((e.childLanes & t) !== t ? (e.childLanes |= t,
                i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t),
                e === n)
                    break;
                e = e.return
            }
        }
        function nr(e, t) {
            Ci = e,
            js = tr = null,
            e = e.dependencies,
            e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Gt = !0),
            e.firstContext = null)
        }
        function Lt(e) {
            var t = qn ? e._currentValue : e._currentValue2;
            if (js !== e)
                if (e = {
                    context: e,
                    memoizedValue: t,
                    next: null
                },
                tr === null) {
                    if (Ci === null)
                        throw Error(c(308));
                    tr = e,
                    Ci.dependencies = {
                        lanes: 0,
                        firstContext: e
                    }
                } else
                    tr = tr.next = e;
            return t
        }
        var en = null
          , gn = !1;
        function Zs(e) {
            e.updateQueue = {
                baseState: e.memoizedState,
                firstBaseUpdate: null,
                lastBaseUpdate: null,
                shared: {
                    pending: null,
                    interleaved: null,
                    lanes: 0
                },
                effects: null
            }
        }
        function za(e, t) {
            e = e.updateQueue,
            t.updateQueue === e && (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects
            })
        }
        function cn(e, t) {
            return {
                eventTime: e,
                lane: t,
                tag: 0,
                payload: null,
                callback: null,
                next: null
            }
        }
        function vn(e, t) {
            var n = e.updateQueue;
            n !== null && (n = n.shared,
            rt !== null && (e.mode & 1) !== 0 && (we & 2) === 0 ? (e = n.interleaved,
            e === null ? (t.next = t,
            en === null ? en = [n] : en.push(n)) : (t.next = e.next,
            e.next = t),
            n.interleaved = t) : (e = n.pending,
            e === null ? t.next = t : (t.next = e.next,
            e.next = t),
            n.pending = t))
        }
        function yi(e, t, n) {
            if (t = t.updateQueue,
            t !== null && (t = t.shared,
            (n & 4194240) !== 0)) {
                var i = t.lanes;
                i &= e.pendingLanes,
                n |= i,
                t.lanes = n,
                Js(e, n)
            }
        }
        function ba(e, t) {
            var n = e.updateQueue
              , i = e.alternate;
            if (i !== null && (i = i.updateQueue,
            n === i)) {
                var a = null
                  , d = null;
                if (n = n.firstBaseUpdate,
                n !== null) {
                    do {
                        var y = {
                            eventTime: n.eventTime,
                            lane: n.lane,
                            tag: n.tag,
                            payload: n.payload,
                            callback: n.callback,
                            next: null
                        };
                        d === null ? a = d = y : d = d.next = y,
                        n = n.next
                    } while (n !== null);
                    d === null ? a = d = t : d = d.next = t
                } else
                    a = d = t;
                n = {
                    baseState: i.baseState,
                    firstBaseUpdate: a,
                    lastBaseUpdate: d,
                    shared: i.shared,
                    effects: i.effects
                },
                e.updateQueue = n;
                return
            }
            e = n.lastBaseUpdate,
            e === null ? n.firstBaseUpdate = t : e.next = t,
            n.lastBaseUpdate = t
        }
        function Ei(e, t, n, i) {
            var a = e.updateQueue;
            gn = !1;
            var d = a.firstBaseUpdate
              , y = a.lastBaseUpdate
              , F = a.shared.pending;
            if (F !== null) {
                a.shared.pending = null;
                var N = F
                  , V = N.next;
                N.next = null,
                y === null ? d = V : y.next = V,
                y = N;
                var ae = e.alternate;
                ae !== null && (ae = ae.updateQueue,
                F = ae.lastBaseUpdate,
                F !== y && (F === null ? ae.firstBaseUpdate = V : F.next = V,
                ae.lastBaseUpdate = N))
            }
            if (d !== null) {
                var Be = a.baseState;
                y = 0,
                ae = V = N = null,
                F = d;
                do {
                    var he = F.lane
                      , be = F.eventTime;
                    if ((i & he) === he) {
                        ae !== null && (ae = ae.next = {
                            eventTime: be,
                            lane: 0,
                            tag: F.tag,
                            payload: F.payload,
                            callback: F.callback,
                            next: null
                        });
                        e: {
                            var pe = e
                              , Ct = F;
                            switch (he = t,
                            be = n,
                            Ct.tag) {
                            case 1:
                                if (pe = Ct.payload,
                                typeof pe == "function") {
                                    Be = pe.call(be, Be, he);
                                    break e
                                }
                                Be = pe;
                                break e;
                            case 3:
                                pe.flags = pe.flags & -65537 | 128;
                            case 0:
                                if (pe = Ct.payload,
                                he = typeof pe == "function" ? pe.call(be, Be, he) : pe,
                                he == null)
                                    break e;
                                Be = f({}, Be, he);
                                break e;
                            case 2:
                                gn = !0
                            }
                        }
                        F.callback !== null && F.lane !== 0 && (e.flags |= 64,
                        he = a.effects,
                        he === null ? a.effects = [F] : he.push(F))
                    } else
                        be = {
                            eventTime: be,
                            lane: he,
                            tag: F.tag,
                            payload: F.payload,
                            callback: F.callback,
                            next: null
                        },
                        ae === null ? (V = ae = be,
                        N = Be) : ae = ae.next = be,
                        y |= he;
                    if (F = F.next,
                    F === null) {
                        if (F = a.shared.pending,
                        F === null)
                            break;
                        he = F,
                        F = he.next,
                        he.next = null,
                        a.lastBaseUpdate = he,
                        a.shared.pending = null
                    }
                } while (!0);
                if (ae === null && (N = Be),
                a.baseState = N,
                a.firstBaseUpdate = V,
                a.lastBaseUpdate = ae,
                t = a.shared.interleaved,
                t !== null) {
                    a = t;
                    do
                        y |= a.lane,
                        a = a.next;
                    while (a !== t)
                } else
                    d === null && (a.shared.lanes = 0);
                fr |= y,
                e.lanes = y,
                e.memoizedState = Be
            }
        }
        function ja(e, t, n) {
            if (e = t.effects,
            t.effects = null,
            e !== null)
                for (t = 0; t < e.length; t++) {
                    var i = e[t]
                      , a = i.callback;
                    if (a !== null) {
                        if (i.callback = null,
                        i = n,
                        typeof a != "function")
                            throw Error(c(191, a));
                        a.call(i)
                    }
                }
        }
        var Xa = new u.Component().refs;
        function Vs(e, t, n, i) {
            t = e.memoizedState,
            n = n(i, t),
            n = n == null ? t : f({}, t, n),
            e.memoizedState = n,
            e.lanes === 0 && (e.updateQueue.baseState = n)
        }
        var Mi = {
            isMounted: function(e) {
                return (e = e._reactInternals) ? z(e) === e : !1
            },
            enqueueSetState: function(e, t, n) {
                e = e._reactInternals;
                var i = St()
                  , a = yn(e)
                  , d = cn(i, a);
                d.payload = t,
                n != null && (d.callback = n),
                vn(e, d),
                t = Ut(e, a, i),
                t !== null && yi(t, e, a)
            },
            enqueueReplaceState: function(e, t, n) {
                e = e._reactInternals;
                var i = St()
                  , a = yn(e)
                  , d = cn(i, a);
                d.tag = 1,
                d.payload = t,
                n != null && (d.callback = n),
                vn(e, d),
                t = Ut(e, a, i),
                t !== null && yi(t, e, a)
            },
            enqueueForceUpdate: function(e, t) {
                e = e._reactInternals;
                var n = St()
                  , i = yn(e)
                  , a = cn(n, i);
                a.tag = 2,
                t != null && (a.callback = t),
                vn(e, a),
                t = Ut(e, i, n),
                t !== null && yi(t, e, i)
            }
        };
        function Wa(e, t, n, i, a, d, y) {
            return e = e.stateNode,
            typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, d, y) : t.prototype && t.prototype.isPureReactComponent ? !vi(n, i) || !vi(a, d) : !0
        }
        function Ya(e, t, n) {
            var i = !1
              , a = De
              , d = t.contextType;
            return typeof d == "object" && d !== null ? d = Lt(d) : (a = nt(t) ? je : ze.current,
            i = t.contextTypes,
            d = (i = i != null) ? mt(e, a) : De),
            t = new t(n,d),
            e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null,
            t.updater = Mi,
            e.stateNode = t,
            t._reactInternals = e,
            i && (e = e.stateNode,
            e.__reactInternalMemoizedUnmaskedChildContext = a,
            e.__reactInternalMemoizedMaskedChildContext = d),
            t
        }
        function Za(e, t, n, i) {
            e = t.state,
            typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i),
            typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i),
            t.state !== e && Mi.enqueueReplaceState(t, t.state, null)
        }
        function qs(e, t, n, i) {
            var a = e.stateNode;
            a.props = n,
            a.state = e.memoizedState,
            a.refs = Xa,
            Zs(e);
            var d = t.contextType;
            typeof d == "object" && d !== null ? a.context = Lt(d) : (d = nt(t) ? je : ze.current,
            a.context = mt(e, d)),
            a.state = e.memoizedState,
            d = t.getDerivedStateFromProps,
            typeof d == "function" && (Vs(e, t, d, n),
            a.state = e.memoizedState),
            typeof t.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (t = a.state,
            typeof a.componentWillMount == "function" && a.componentWillMount(),
            typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(),
            t !== a.state && Mi.enqueueReplaceState(a, a.state, null),
            Ei(e, n, a, i),
            a.state = e.memoizedState),
            typeof a.componentDidMount == "function" && (e.flags |= 4194308)
        }
        var rr = []
          , ir = 0
          , Si = null
          , Ii = 0
          , Pt = []
          , Ot = 0
          , Un = null
          , fn = 1
          , dn = "";
        function Jn(e, t) {
            rr[ir++] = Ii,
            rr[ir++] = Si,
            Si = e,
            Ii = t
        }
        function Va(e, t, n) {
            Pt[Ot++] = fn,
            Pt[Ot++] = dn,
            Pt[Ot++] = Un,
            Un = e;
            var i = fn;
            e = dn;
            var a = 32 - Ye(i) - 1;
            i &= ~(1 << a),
            n += 1;
            var d = 32 - Ye(t) + a;
            if (30 < d) {
                var y = a - a % 5;
                d = (i & (1 << y) - 1).toString(32),
                i >>= y,
                a -= y,
                fn = 1 << 32 - Ye(t) + a | n << a | i,
                dn = d + e
            } else
                fn = 1 << d | n << a | i,
                dn = e
        }
        function $s(e) {
            e.return !== null && (Jn(e, 1),
            Va(e, 1, 0))
        }
        function eo(e) {
            for (; e === Si; )
                Si = rr[--ir],
                rr[ir] = null,
                Ii = rr[--ir],
                rr[ir] = null;
            for (; e === Un; )
                Un = Pt[--Ot],
                Pt[Ot] = null,
                dn = Pt[--Ot],
                Pt[Ot] = null,
                fn = Pt[--Ot],
                Pt[Ot] = null
        }
        var Tt = null
          , Dt = null
          , Ze = !1
          , _r = !1
          , Wt = null;
        function qa(e, t) {
            var n = Jt(5, null, null, 0);
            n.elementType = "DELETED",
            n.stateNode = t,
            n.return = e,
            t = e.deletions,
            t === null ? (e.deletions = [n],
            e.flags |= 16) : t.push(n)
        }
        function $a(e, t) {
            switch (e.tag) {
            case 5:
                return t = Ls(t, e.type, e.pendingProps),
                t !== null ? (e.stateNode = t,
                Tt = e,
                Dt = Fe(t),
                !0) : !1;
            case 6:
                return t = Ps(t, e.pendingProps),
                t !== null ? (e.stateNode = t,
                Tt = e,
                Dt = null,
                !0) : !1;
            case 13:
                if (t = Os(t),
                t !== null) {
                    var n = Un !== null ? {
                        id: fn,
                        overflow: dn
                    } : null;
                    return e.memoizedState = {
                        dehydrated: t,
                        treeContext: n,
                        retryLane: 1073741824
                    },
                    n = Jt(18, null, null, 0),
                    n.stateNode = t,
                    n.return = e,
                    e.child = n,
                    Tt = e,
                    Dt = null,
                    !0
                }
                return !1;
            default:
                return !1
            }
        }
        function to(e) {
            return (e.mode & 1) !== 0 && (e.flags & 128) === 0
        }
        function no(e) {
            if (Ze) {
                var t = Dt;
                if (t) {
                    var n = t;
                    if (!$a(e, t)) {
                        if (to(e))
                            throw Error(c(418));
                        t = jt(n);
                        var i = Tt;
                        t && $a(e, t) ? qa(i, n) : (e.flags = e.flags & -4097 | 2,
                        Ze = !1,
                        Tt = e)
                    }
                } else {
                    if (to(e))
                        throw Error(c(418));
                    e.flags = e.flags & -4097 | 2,
                    Ze = !1,
                    Tt = e
                }
            }
        }
        function el(e) {
            for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
                e = e.return;
            Tt = e
        }
        function Tr(e) {
            if (!ht || e !== Tt)
                return !1;
            if (!Ze)
                return el(e),
                Ze = !0,
                !1;
            if (e.tag !== 3 && (e.tag !== 5 || ee(e.type) && !qe(e.type, e.memoizedProps))) {
                var t = Dt;
                if (t) {
                    if (to(e)) {
                        for (e = Dt; e; )
                            e = jt(e);
                        throw Error(c(418))
                    }
                    for (; t; )
                        qa(e, t),
                        t = jt(t)
                }
            }
            if (el(e),
            e.tag === 13) {
                if (!ht)
                    throw Error(c(316));
                if (e = e.memoizedState,
                e = e !== null ? e.dehydrated : null,
                !e)
                    throw Error(c(317));
                Dt = H(e)
            } else
                Dt = Tt ? jt(e.stateNode) : null;
            return !0
        }
        function sr() {
            ht && (Dt = Tt = null,
            _r = Ze = !1)
        }
        function ro(e) {
            Wt === null ? Wt = [e] : Wt.push(e)
        }
        function Dr(e, t, n) {
            if (e = n.ref,
            e !== null && typeof e != "function" && typeof e != "object") {
                if (n._owner) {
                    if (n = n._owner,
                    n) {
                        if (n.tag !== 1)
                            throw Error(c(309));
                        var i = n.stateNode
                    }
                    if (!i)
                        throw Error(c(147, e));
                    var a = i
                      , d = "" + e;
                    return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === d ? t.ref : (t = function(y) {
                        var F = a.refs;
                        F === Xa && (F = a.refs = {}),
                        y === null ? delete F[d] : F[d] = y
                    }
                    ,
                    t._stringRef = d,
                    t)
                }
                if (typeof e != "string")
                    throw Error(c(284));
                if (!n._owner)
                    throw Error(c(290, e))
            }
            return e
        }
        function wi(e, t) {
            throw e = Object.prototype.toString.call(t),
            Error(c(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
        }
        function tl(e) {
            var t = e._init;
            return t(e._payload)
        }
        function nl(e) {
            function t(x, _) {
                if (e) {
                    var L = x.deletions;
                    L === null ? (x.deletions = [_],
                    x.flags |= 16) : L.push(_)
                }
            }
            function n(x, _) {
                if (!e)
                    return null;
                for (; _ !== null; )
                    t(x, _),
                    _ = _.sibling;
                return null
            }
            function i(x, _) {
                for (x = new Map; _ !== null; )
                    _.key !== null ? x.set(_.key, _) : x.set(_.index, _),
                    _ = _.sibling;
                return x
            }
            function a(x, _) {
                return x = Mn(x, _),
                x.index = 0,
                x.sibling = null,
                x
            }
            function d(x, _, L) {
                return x.index = L,
                e ? (L = x.alternate,
                L !== null ? (L = L.index,
                L < _ ? (x.flags |= 2,
                _) : L) : (x.flags |= 2,
                _)) : (x.flags |= 1048576,
                _)
            }
            function y(x) {
                return e && x.alternate === null && (x.flags |= 2),
                x
            }
            function F(x, _, L, ie) {
                return _ === null || _.tag !== 6 ? (_ = Jo(L, x.mode, ie),
                _.return = x,
                _) : (_ = a(_, L),
                _.return = x,
                _)
            }
            function N(x, _, L, ie) {
                var fe = L.type;
                return fe === h ? ae(x, _, L.props.children, ie, L.key) : _ !== null && (_.elementType === fe || typeof fe == "object" && fe !== null && fe.$$typeof === R && tl(fe) === _.type) ? (ie = a(_, L.props),
                ie.ref = Dr(x, _, L),
                ie.return = x,
                ie) : (ie = rs(L.type, L.key, L.props, null, x.mode, ie),
                ie.ref = Dr(x, _, L),
                ie.return = x,
                ie)
            }
            function V(x, _, L, ie) {
                return _ === null || _.tag !== 4 || _.stateNode.containerInfo !== L.containerInfo || _.stateNode.implementation !== L.implementation ? (_ = Ko(L, x.mode, ie),
                _.return = x,
                _) : (_ = a(_, L.children || []),
                _.return = x,
                _)
            }
            function ae(x, _, L, ie, fe) {
                return _ === null || _.tag !== 7 ? (_ = Wn(L, x.mode, ie, fe),
                _.return = x,
                _) : (_ = a(_, L),
                _.return = x,
                _)
            }
            function Be(x, _, L) {
                if (typeof _ == "string" && _ !== "" || typeof _ == "number")
                    return _ = Jo("" + _, x.mode, L),
                    _.return = x,
                    _;
                if (typeof _ == "object" && _ !== null) {
                    switch (_.$$typeof) {
                    case p:
                        return L = rs(_.type, _.key, _.props, null, x.mode, L),
                        L.ref = Dr(x, null, _),
                        L.return = x,
                        L;
                    case v:
                        return _ = Ko(_, x.mode, L),
                        _.return = x,
                        _;
                    case R:
                        var ie = _._init;
                        return Be(x, ie(_._payload), L)
                    }
                    if (Re(_) || k(_))
                        return _ = Wn(_, x.mode, L, null),
                        _.return = x,
                        _;
                    wi(x, _)
                }
                return null
            }
            function he(x, _, L, ie) {
                var fe = _ !== null ? _.key : null;
                if (typeof L == "string" && L !== "" || typeof L == "number")
                    return fe !== null ? null : F(x, _, "" + L, ie);
                if (typeof L == "object" && L !== null) {
                    switch (L.$$typeof) {
                    case p:
                        return L.key === fe ? N(x, _, L, ie) : null;
                    case v:
                        return L.key === fe ? V(x, _, L, ie) : null;
                    case R:
                        return fe = L._init,
                        he(x, _, fe(L._payload), ie)
                    }
                    if (Re(L) || k(L))
                        return fe !== null ? null : ae(x, _, L, ie, null);
                    wi(x, L)
                }
                return null
            }
            function be(x, _, L, ie, fe) {
                if (typeof ie == "string" && ie !== "" || typeof ie == "number")
                    return x = x.get(L) || null,
                    F(_, x, "" + ie, fe);
                if (typeof ie == "object" && ie !== null) {
                    switch (ie.$$typeof) {
                    case p:
                        return x = x.get(ie.key === null ? L : ie.key) || null,
                        N(_, x, ie, fe);
                    case v:
                        return x = x.get(ie.key === null ? L : ie.key) || null,
                        V(_, x, ie, fe);
                    case R:
                        var Ie = ie._init;
                        return be(x, _, L, Ie(ie._payload), fe)
                    }
                    if (Re(ie) || k(ie))
                        return x = x.get(L) || null,
                        ae(_, x, ie, fe, null);
                    wi(_, ie)
                }
                return null
            }
            function pe(x, _, L, ie) {
                for (var fe = null, Ie = null, Ce = _, Oe = _ = 0, ct = null; Ce !== null && Oe < L.length; Oe++) {
                    Ce.index > Oe ? (ct = Ce,
                    Ce = null) : ct = Ce.sibling;
                    var Ne = he(x, Ce, L[Oe], ie);
                    if (Ne === null) {
                        Ce === null && (Ce = ct);
                        break
                    }
                    e && Ce && Ne.alternate === null && t(x, Ce),
                    _ = d(Ne, _, Oe),
                    Ie === null ? fe = Ne : Ie.sibling = Ne,
                    Ie = Ne,
                    Ce = ct
                }
                if (Oe === L.length)
                    return n(x, Ce),
                    Ze && Jn(x, Oe),
                    fe;
                if (Ce === null) {
                    for (; Oe < L.length; Oe++)
                        Ce = Be(x, L[Oe], ie),
                        Ce !== null && (_ = d(Ce, _, Oe),
                        Ie === null ? fe = Ce : Ie.sibling = Ce,
                        Ie = Ce);
                    return Ze && Jn(x, Oe),
                    fe
                }
                for (Ce = i(x, Ce); Oe < L.length; Oe++)
                    ct = be(Ce, x, Oe, L[Oe], ie),
                    ct !== null && (e && ct.alternate !== null && Ce.delete(ct.key === null ? Oe : ct.key),
                    _ = d(ct, _, Oe),
                    Ie === null ? fe = ct : Ie.sibling = ct,
                    Ie = ct);
                return e && Ce.forEach(function(Sn) {
                    return t(x, Sn)
                }),
                Ze && Jn(x, Oe),
                fe
            }
            function Ct(x, _, L, ie) {
                var fe = k(L);
                if (typeof fe != "function")
                    throw Error(c(150));
                if (L = fe.call(L),
                L == null)
                    throw Error(c(151));
                for (var Ie = fe = null, Ce = _, Oe = _ = 0, ct = null, Ne = L.next(); Ce !== null && !Ne.done; Oe++,
                Ne = L.next()) {
                    Ce.index > Oe ? (ct = Ce,
                    Ce = null) : ct = Ce.sibling;
                    var Sn = he(x, Ce, Ne.value, ie);
                    if (Sn === null) {
                        Ce === null && (Ce = ct);
                        break
                    }
                    e && Ce && Sn.alternate === null && t(x, Ce),
                    _ = d(Sn, _, Oe),
                    Ie === null ? fe = Sn : Ie.sibling = Sn,
                    Ie = Sn,
                    Ce = ct
                }
                if (Ne.done)
                    return n(x, Ce),
                    Ze && Jn(x, Oe),
                    fe;
                if (Ce === null) {
                    for (; !Ne.done; Oe++,
                    Ne = L.next())
                        Ne = Be(x, Ne.value, ie),
                        Ne !== null && (_ = d(Ne, _, Oe),
                        Ie === null ? fe = Ne : Ie.sibling = Ne,
                        Ie = Ne);
                    return Ze && Jn(x, Oe),
                    fe
                }
                for (Ce = i(x, Ce); !Ne.done; Oe++,
                Ne = L.next())
                    Ne = be(Ce, x, Oe, Ne.value, ie),
                    Ne !== null && (e && Ne.alternate !== null && Ce.delete(Ne.key === null ? Oe : Ne.key),
                    _ = d(Ne, _, Oe),
                    Ie === null ? fe = Ne : Ie.sibling = Ne,
                    Ie = Ne);
                return e && Ce.forEach(function(Pf) {
                    return t(x, Pf)
                }),
                Ze && Jn(x, Oe),
                fe
            }
            function Kt(x, _, L, ie) {
                if (typeof L == "object" && L !== null && L.type === h && L.key === null && (L = L.props.children),
                typeof L == "object" && L !== null) {
                    switch (L.$$typeof) {
                    case p:
                        e: {
                            for (var fe = L.key, Ie = _; Ie !== null; ) {
                                if (Ie.key === fe) {
                                    if (fe = L.type,
                                    fe === h) {
                                        if (Ie.tag === 7) {
                                            n(x, Ie.sibling),
                                            _ = a(Ie, L.props.children),
                                            _.return = x,
                                            x = _;
                                            break e
                                        }
                                    } else if (Ie.elementType === fe || typeof fe == "object" && fe !== null && fe.$$typeof === R && tl(fe) === Ie.type) {
                                        n(x, Ie.sibling),
                                        _ = a(Ie, L.props),
                                        _.ref = Dr(x, Ie, L),
                                        _.return = x,
                                        x = _;
                                        break e
                                    }
                                    n(x, Ie);
                                    break
                                } else
                                    t(x, Ie);
                                Ie = Ie.sibling
                            }
                            L.type === h ? (_ = Wn(L.props.children, x.mode, ie, L.key),
                            _.return = x,
                            x = _) : (ie = rs(L.type, L.key, L.props, null, x.mode, ie),
                            ie.ref = Dr(x, _, L),
                            ie.return = x,
                            x = ie)
                        }
                        return y(x);
                    case v:
                        e: {
                            for (Ie = L.key; _ !== null; ) {
                                if (_.key === Ie)
                                    if (_.tag === 4 && _.stateNode.containerInfo === L.containerInfo && _.stateNode.implementation === L.implementation) {
                                        n(x, _.sibling),
                                        _ = a(_, L.children || []),
                                        _.return = x,
                                        x = _;
                                        break e
                                    } else {
                                        n(x, _);
                                        break
                                    }
                                else
                                    t(x, _);
                                _ = _.sibling
                            }
                            _ = Ko(L, x.mode, ie),
                            _.return = x,
                            x = _
                        }
                        return y(x);
                    case R:
                        return Ie = L._init,
                        Kt(x, _, Ie(L._payload), ie)
                    }
                    if (Re(L))
                        return pe(x, _, L, ie);
                    if (k(L))
                        return Ct(x, _, L, ie);
                    wi(x, L)
                }
                return typeof L == "string" && L !== "" || typeof L == "number" ? (L = "" + L,
                _ !== null && _.tag === 6 ? (n(x, _.sibling),
                _ = a(_, L),
                _.return = x,
                x = _) : (n(x, _),
                _ = Jo(L, x.mode, ie),
                _.return = x,
                x = _),
                y(x)) : n(x, _)
            }
            return Kt
        }
        var or = nl(!0)
          , rl = nl(!1)
          , Gr = {}
          , Nt = Te(Gr)
          , xr = Te(Gr)
          , ar = Te(Gr);
        function tn(e) {
            if (e === Gr)
                throw Error(c(174));
            return e
        }
        function io(e, t) {
            Me(ar, t),
            Me(xr, e),
            Me(Nt, Gr),
            e = ke(t),
            ge(Nt),
            Me(Nt, e)
        }
        function lr() {
            ge(Nt),
            ge(xr),
            ge(ar)
        }
        function il(e) {
            var t = tn(ar.current)
              , n = tn(Nt.current);
            t = G(n, e.type, t),
            n !== t && (Me(xr, e),
            Me(Nt, t))
        }
        function so(e) {
            xr.current === e && (ge(Nt),
            ge(xr))
        }
        var Ve = Te(0);
        function Ri(e) {
            for (var t = e; t !== null; ) {
                if (t.tag === 13) {
                    var n = t.memoizedState;
                    if (n !== null && (n = n.dehydrated,
                    n === null || Nn(n) || wr(n)))
                        return t
                } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
                    if ((t.flags & 128) !== 0)
                        return t
                } else if (t.child !== null) {
                    t.child.return = t,
                    t = t.child;
                    continue
                }
                if (t === e)
                    break;
                for (; t.sibling === null; ) {
                    if (t.return === null || t.return === e)
                        return null;
                    t = t.return
                }
                t.sibling.return = t.return,
                t = t.sibling
            }
            return null
        }
        var oo = [];
        function ao() {
            for (var e = 0; e < oo.length; e++) {
                var t = oo[e];
                qn ? t._workInProgressVersionPrimary = null : t._workInProgressVersionSecondary = null
            }
            oo.length = 0
        }
        var Fi = g.ReactCurrentDispatcher
          , kt = g.ReactCurrentBatchConfig
          , ur = 0
          , et = null
          , gt = null
          , ut = null
          , _i = !1
          , Hr = !1
          , Lr = 0
          , af = 0;
        function vt() {
            throw Error(c(321))
        }
        function lo(e, t) {
            if (t === null)
                return !1;
            for (var n = 0; n < t.length && n < e.length; n++)
                if (!qt(e[n], t[n]))
                    return !1;
            return !0
        }
        function uo(e, t, n, i, a, d) {
            if (ur = d,
            et = t,
            t.memoizedState = null,
            t.updateQueue = null,
            t.lanes = 0,
            Fi.current = e === null || e.memoizedState === null ? ff : df,
            e = n(i, a),
            Hr) {
                d = 0;
                do {
                    if (Hr = !1,
                    Lr = 0,
                    25 <= d)
                        throw Error(c(301));
                    d += 1,
                    ut = gt = null,
                    t.updateQueue = null,
                    Fi.current = pf,
                    e = n(i, a)
                } while (Hr)
            }
            if (Fi.current = Hi,
            t = gt !== null && gt.next !== null,
            ur = 0,
            ut = gt = et = null,
            _i = !1,
            t)
                throw Error(c(300));
            return e
        }
        function co() {
            var e = Lr !== 0;
            return Lr = 0,
            e
        }
        function pn() {
            var e = {
                memoizedState: null,
                baseState: null,
                baseQueue: null,
                queue: null,
                next: null
            };
            return ut === null ? et.memoizedState = ut = e : ut = ut.next = e,
            ut
        }
        function nn() {
            if (gt === null) {
                var e = et.alternate;
                e = e !== null ? e.memoizedState : null
            } else
                e = gt.next;
            var t = ut === null ? et.memoizedState : ut.next;
            if (t !== null)
                ut = t,
                gt = e;
            else {
                if (e === null)
                    throw Error(c(310));
                gt = e,
                e = {
                    memoizedState: gt.memoizedState,
                    baseState: gt.baseState,
                    baseQueue: gt.baseQueue,
                    queue: gt.queue,
                    next: null
                },
                ut === null ? et.memoizedState = ut = e : ut = ut.next = e
            }
            return ut
        }
        function Kn(e, t) {
            return typeof t == "function" ? t(e) : t
        }
        function Ti(e) {
            var t = nn()
              , n = t.queue;
            if (n === null)
                throw Error(c(311));
            n.lastRenderedReducer = e;
            var i = gt
              , a = i.baseQueue
              , d = n.pending;
            if (d !== null) {
                if (a !== null) {
                    var y = a.next;
                    a.next = d.next,
                    d.next = y
                }
                i.baseQueue = a = d,
                n.pending = null
            }
            if (a !== null) {
                d = a.next,
                i = i.baseState;
                var F = y = null
                  , N = null
                  , V = d;
                do {
                    var ae = V.lane;
                    if ((ur & ae) === ae)
                        N !== null && (N = N.next = {
                            lane: 0,
                            action: V.action,
                            hasEagerState: V.hasEagerState,
                            eagerState: V.eagerState,
                            next: null
                        }),
                        i = V.hasEagerState ? V.eagerState : e(i, V.action);
                    else {
                        var Be = {
                            lane: ae,
                            action: V.action,
                            hasEagerState: V.hasEagerState,
                            eagerState: V.eagerState,
                            next: null
                        };
                        N === null ? (F = N = Be,
                        y = i) : N = N.next = Be,
                        et.lanes |= ae,
                        fr |= ae
                    }
                    V = V.next
                } while (V !== null && V !== d);
                N === null ? y = i : N.next = F,
                qt(i, t.memoizedState) || (Gt = !0),
                t.memoizedState = i,
                t.baseState = y,
                t.baseQueue = N,
                n.lastRenderedState = i
            }
            if (e = n.interleaved,
            e !== null) {
                a = e;
                do
                    d = a.lane,
                    et.lanes |= d,
                    fr |= d,
                    a = a.next;
                while (a !== e)
            } else
                a === null && (n.lanes = 0);
            return [t.memoizedState, n.dispatch]
        }
        function Di(e) {
            var t = nn()
              , n = t.queue;
            if (n === null)
                throw Error(c(311));
            n.lastRenderedReducer = e;
            var i = n.dispatch
              , a = n.pending
              , d = t.memoizedState;
            if (a !== null) {
                n.pending = null;
                var y = a = a.next;
                do
                    d = e(d, y.action),
                    y = y.next;
                while (y !== a);
                qt(d, t.memoizedState) || (Gt = !0),
                t.memoizedState = d,
                t.baseQueue === null && (t.baseState = d),
                n.lastRenderedState = d
            }
            return [d, i]
        }
        function sl() {}
        function ol(e, t) {
            var n = et
              , i = nn()
              , a = t()
              , d = !qt(i.memoizedState, a);
            if (d && (i.memoizedState = a,
            Gt = !0),
            i = i.queue,
            Or(ul.bind(null, n, i, e), [e]),
            i.getSnapshot !== t || d || ut !== null && ut.memoizedState.tag & 1) {
                if (n.flags |= 2048,
                Pr(9, ll.bind(null, n, i, a, t), void 0, null),
                rt === null)
                    throw Error(c(349));
                (ur & 30) !== 0 || al(n, t, a)
            }
            return a
        }
        function al(e, t, n) {
            e.flags |= 16384,
            e = {
                getSnapshot: t,
                value: n
            },
            t = et.updateQueue,
            t === null ? (t = {
                lastEffect: null,
                stores: null
            },
            et.updateQueue = t,
            t.stores = [e]) : (n = t.stores,
            n === null ? t.stores = [e] : n.push(e))
        }
        function ll(e, t, n, i) {
            t.value = n,
            t.getSnapshot = i,
            cl(t) && Ut(e, 1, -1)
        }
        function ul(e, t, n) {
            return n(function() {
                cl(t) && Ut(e, 1, -1)
            })
        }
        function cl(e) {
            var t = e.getSnapshot;
            e = e.value;
            try {
                var n = t();
                return !qt(e, n)
            } catch {
                return !0
            }
        }
        function fo(e) {
            var t = pn();
            return typeof e == "function" && (e = e()),
            t.memoizedState = t.baseState = e,
            e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Kn,
                lastRenderedState: e
            },
            t.queue = e,
            e = e.dispatch = cf.bind(null, et, e),
            [t.memoizedState, e]
        }
        function Pr(e, t, n, i) {
            return e = {
                tag: e,
                create: t,
                destroy: n,
                deps: i,
                next: null
            },
            t = et.updateQueue,
            t === null ? (t = {
                lastEffect: null,
                stores: null
            },
            et.updateQueue = t,
            t.lastEffect = e.next = e) : (n = t.lastEffect,
            n === null ? t.lastEffect = e.next = e : (i = n.next,
            n.next = e,
            e.next = i,
            t.lastEffect = e)),
            e
        }
        function fl() {
            return nn().memoizedState
        }
        function Gi(e, t, n, i) {
            var a = pn();
            et.flags |= e,
            a.memoizedState = Pr(1 | t, n, void 0, i === void 0 ? null : i)
        }
        function xi(e, t, n, i) {
            var a = nn();
            i = i === void 0 ? null : i;
            var d = void 0;
            if (gt !== null) {
                var y = gt.memoizedState;
                if (d = y.destroy,
                i !== null && lo(i, y.deps)) {
                    a.memoizedState = Pr(t, n, d, i);
                    return
                }
            }
            et.flags |= e,
            a.memoizedState = Pr(1 | t, n, d, i)
        }
        function po(e, t) {
            return Gi(8390656, 8, e, t)
        }
        function Or(e, t) {
            return xi(2048, 8, e, t)
        }
        function dl(e, t) {
            return xi(4, 2, e, t)
        }
        function pl(e, t) {
            return xi(4, 4, e, t)
        }
        function hl(e, t) {
            if (typeof t == "function")
                return e = e(),
                t(e),
                function() {
                    t(null)
                }
                ;
            if (t != null)
                return e = e(),
                t.current = e,
                function() {
                    t.current = null
                }
        }
        function Al(e, t, n) {
            return n = n != null ? n.concat([e]) : null,
            xi(4, 4, hl.bind(null, t, e), n)
        }
        function ho() {}
        function ml(e, t) {
            var n = nn();
            t = t === void 0 ? null : t;
            var i = n.memoizedState;
            return i !== null && t !== null && lo(t, i[1]) ? i[0] : (n.memoizedState = [e, t],
            e)
        }
        function gl(e, t) {
            var n = nn();
            t = t === void 0 ? null : t;
            var i = n.memoizedState;
            return i !== null && t !== null && lo(t, i[1]) ? i[0] : (e = e(),
            n.memoizedState = [e, t],
            e)
        }
        function lf(e, t) {
            var n = Pe;
            Pe = n !== 0 && 4 > n ? n : 4,
            e(!0);
            var i = kt.transition;
            kt.transition = {};
            try {
                e(!1),
                t()
            } finally {
                Pe = n,
                kt.transition = i
            }
        }
        function vl() {
            return nn().memoizedState
        }
        function uf(e, t, n) {
            var i = yn(e);
            n = {
                lane: i,
                action: n,
                hasEagerState: !1,
                eagerState: null,
                next: null
            },
            Bl(e) ? Cl(t, n) : (yl(e, t, n),
            n = St(),
            e = Ut(e, i, n),
            e !== null && El(e, t, i))
        }
        function cf(e, t, n) {
            var i = yn(e)
              , a = {
                lane: i,
                action: n,
                hasEagerState: !1,
                eagerState: null,
                next: null
            };
            if (Bl(e))
                Cl(t, a);
            else {
                yl(e, t, a);
                var d = e.alternate;
                if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = t.lastRenderedReducer,
                d !== null))
                    try {
                        var y = t.lastRenderedState
                          , F = d(y, n);
                        if (a.hasEagerState = !0,
                        a.eagerState = F,
                        qt(F, y))
                            return
                    } catch {} finally {}
                n = St(),
                e = Ut(e, i, n),
                e !== null && El(e, t, i)
            }
        }
        function Bl(e) {
            var t = e.alternate;
            return e === et || t !== null && t === et
        }
        function Cl(e, t) {
            Hr = _i = !0;
            var n = e.pending;
            n === null ? t.next = t : (t.next = n.next,
            n.next = t),
            e.pending = t
        }
        function yl(e, t, n) {
            rt !== null && (e.mode & 1) !== 0 && (we & 2) === 0 ? (e = t.interleaved,
            e === null ? (n.next = n,
            en === null ? en = [t] : en.push(t)) : (n.next = e.next,
            e.next = n),
            t.interleaved = n) : (e = t.pending,
            e === null ? n.next = n : (n.next = e.next,
            e.next = n),
            t.pending = n)
        }
        function El(e, t, n) {
            if ((n & 4194240) !== 0) {
                var i = t.lanes;
                i &= e.pendingLanes,
                n |= i,
                t.lanes = n,
                Js(e, n)
            }
        }
        var Hi = {
            readContext: Lt,
            useCallback: vt,
            useContext: vt,
            useEffect: vt,
            useImperativeHandle: vt,
            useInsertionEffect: vt,
            useLayoutEffect: vt,
            useMemo: vt,
            useReducer: vt,
            useRef: vt,
            useState: vt,
            useDebugValue: vt,
            useDeferredValue: vt,
            useTransition: vt,
            useMutableSource: vt,
            useSyncExternalStore: vt,
            useId: vt,
            unstable_isNewReconciler: !1
        }
          , ff = {
            readContext: Lt,
            useCallback: function(e, t) {
                return pn().memoizedState = [e, t === void 0 ? null : t],
                e
            },
            useContext: Lt,
            useEffect: po,
            useImperativeHandle: function(e, t, n) {
                return n = n != null ? n.concat([e]) : null,
                Gi(4194308, 4, hl.bind(null, t, e), n)
            },
            useLayoutEffect: function(e, t) {
                return Gi(4194308, 4, e, t)
            },
            useInsertionEffect: function(e, t) {
                return Gi(4, 2, e, t)
            },
            useMemo: function(e, t) {
                var n = pn();
                return t = t === void 0 ? null : t,
                e = e(),
                n.memoizedState = [e, t],
                e
            },
            useReducer: function(e, t, n) {
                var i = pn();
                return t = n !== void 0 ? n(t) : t,
                i.memoizedState = i.baseState = t,
                e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: t
                },
                i.queue = e,
                e = e.dispatch = uf.bind(null, et, e),
                [i.memoizedState, e]
            },
            useRef: function(e) {
                var t = pn();
                return e = {
                    current: e
                },
                t.memoizedState = e
            },
            useState: fo,
            useDebugValue: ho,
            useDeferredValue: function(e) {
                var t = fo(e)
                  , n = t[0]
                  , i = t[1];
                return po(function() {
                    var a = kt.transition;
                    kt.transition = {};
                    try {
                        i(e)
                    } finally {
                        kt.transition = a
                    }
                }, [e]),
                n
            },
            useTransition: function() {
                var e = fo(!1)
                  , t = e[0];
                return e = lf.bind(null, e[1]),
                pn().memoizedState = e,
                [t, e]
            },
            useMutableSource: function() {},
            useSyncExternalStore: function(e, t, n) {
                var i = et
                  , a = pn();
                if (Ze) {
                    if (n === void 0)
                        throw Error(c(407));
                    n = n()
                } else {
                    if (n = t(),
                    rt === null)
                        throw Error(c(349));
                    (ur & 30) !== 0 || al(i, t, n)
                }
                a.memoizedState = n;
                var d = {
                    value: n,
                    getSnapshot: t
                };
                return a.queue = d,
                po(ul.bind(null, i, d, e), [e]),
                i.flags |= 2048,
                Pr(9, ll.bind(null, i, d, n, t), void 0, null),
                n
            },
            useId: function() {
                var e = pn()
                  , t = rt.identifierPrefix;
                if (Ze) {
                    var n = dn
                      , i = fn;
                    n = (i & ~(1 << 32 - Ye(i) - 1)).toString(32) + n,
                    t = ":" + t + "R" + n,
                    n = Lr++,
                    0 < n && (t += "H" + n.toString(32)),
                    t += ":"
                } else
                    n = af++,
                    t = ":" + t + "r" + n.toString(32) + ":";
                return e.memoizedState = t
            },
            unstable_isNewReconciler: !1
        }
          , df = {
            readContext: Lt,
            useCallback: ml,
            useContext: Lt,
            useEffect: Or,
            useImperativeHandle: Al,
            useInsertionEffect: dl,
            useLayoutEffect: pl,
            useMemo: gl,
            useReducer: Ti,
            useRef: fl,
            useState: function() {
                return Ti(Kn)
            },
            useDebugValue: ho,
            useDeferredValue: function(e) {
                var t = Ti(Kn)
                  , n = t[0]
                  , i = t[1];
                return Or(function() {
                    var a = kt.transition;
                    kt.transition = {};
                    try {
                        i(e)
                    } finally {
                        kt.transition = a
                    }
                }, [e]),
                n
            },
            useTransition: function() {
                var e = Ti(Kn)[0]
                  , t = nn().memoizedState;
                return [e, t]
            },
            useMutableSource: sl,
            useSyncExternalStore: ol,
            useId: vl,
            unstable_isNewReconciler: !1
        }
          , pf = {
            readContext: Lt,
            useCallback: ml,
            useContext: Lt,
            useEffect: Or,
            useImperativeHandle: Al,
            useInsertionEffect: dl,
            useLayoutEffect: pl,
            useMemo: gl,
            useReducer: Di,
            useRef: fl,
            useState: function() {
                return Di(Kn)
            },
            useDebugValue: ho,
            useDeferredValue: function(e) {
                var t = Di(Kn)
                  , n = t[0]
                  , i = t[1];
                return Or(function() {
                    var a = kt.transition;
                    kt.transition = {};
                    try {
                        i(e)
                    } finally {
                        kt.transition = a
                    }
                }, [e]),
                n
            },
            useTransition: function() {
                var e = Di(Kn)[0]
                  , t = nn().memoizedState;
                return [e, t]
            },
            useMutableSource: sl,
            useSyncExternalStore: ol,
            useId: vl,
            unstable_isNewReconciler: !1
        };
        function Ao(e, t) {
            try {
                var n = ""
                  , i = t;
                do
                    n += of(i),
                    i = i.return;
                while (i);
                var a = n
            } catch (d) {
                a = `
Error generating stack: ` + d.message + `
` + d.stack
            }
            return {
                value: e,
                source: t,
                stack: a
            }
        }
        function mo(e, t) {
            try {
                console.error(t.value)
            } catch (n) {
                setTimeout(function() {
                    throw n
                })
            }
        }
        var hf = typeof WeakMap == "function" ? WeakMap : Map;
        function Ml(e, t, n) {
            n = cn(-1, n),
            n.tag = 3,
            n.payload = {
                element: null
            };
            var i = t.value;
            return n.callback = function() {
                Zi || (Zi = !0,
                Ho = i),
                mo(e, t)
            }
            ,
            n
        }
        function Sl(e, t, n) {
            n = cn(-1, n),
            n.tag = 3;
            var i = e.type.getDerivedStateFromError;
            if (typeof i == "function") {
                var a = t.value;
                n.payload = function() {
                    return i(a)
                }
                ,
                n.callback = function() {
                    mo(e, t)
                }
            }
            var d = e.stateNode;
            return d !== null && typeof d.componentDidCatch == "function" && (n.callback = function() {
                mo(e, t),
                typeof i != "function" && (Bn === null ? Bn = new Set([this]) : Bn.add(this));
                var y = t.stack;
                this.componentDidCatch(t.value, {
                    componentStack: y !== null ? y : ""
                })
            }
            ),
            n
        }
        function Il(e, t, n) {
            var i = e.pingCache;
            if (i === null) {
                i = e.pingCache = new hf;
                var a = new Set;
                i.set(t, a)
            } else
                a = i.get(t),
                a === void 0 && (a = new Set,
                i.set(t, a));
            a.has(n) || (a.add(n),
            e = Ff.bind(null, e, t, n),
            t.then(e, e))
        }
        function wl(e) {
            do {
                var t;
                if ((t = e.tag === 13) && (t = e.memoizedState,
                t = t !== null ? t.dehydrated !== null : !0),
                t)
                    return e;
                e = e.return
            } while (e !== null);
            return null
        }
        function Rl(e, t, n, i, a) {
            return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128,
            n.flags |= 131072,
            n.flags &= -52805,
            n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = cn(-1, 1),
            t.tag = 2,
            vn(n, t))),
            n.lanes |= 1),
            e) : (e.flags |= 65536,
            e.lanes = a,
            e)
        }
        function rn(e) {
            e.flags |= 4
        }
        function Fl(e, t) {
            if (e !== null && e.child === t.child)
                return !0;
            if ((t.flags & 16) !== 0)
                return !1;
            for (e = t.child; e !== null; ) {
                if ((e.flags & 12854) !== 0 || (e.subtreeFlags & 12854) !== 0)
                    return !1;
                e = e.sibling
            }
            return !0
        }
        var Nr, kr, Li, Pi;
        if (It)
            Nr = function(e, t) {
                for (var n = t.child; n !== null; ) {
                    if (n.tag === 5 || n.tag === 6)
                        le(e, n.stateNode);
                    else if (n.tag !== 4 && n.child !== null) {
                        n.child.return = n,
                        n = n.child;
                        continue
                    }
                    if (n === t)
                        break;
                    for (; n.sibling === null; ) {
                        if (n.return === null || n.return === t)
                            return;
                        n = n.return
                    }
                    n.sibling.return = n.return,
                    n = n.sibling
                }
            }
            ,
            kr = function() {}
            ,
            Li = function(e, t, n, i, a) {
                if (e = e.memoizedProps,
                e !== i) {
                    var d = t.stateNode
                      , y = tn(Nt.current);
                    n = Ue(d, n, e, i, a, y),
                    (t.updateQueue = n) && rn(t)
                }
            }
            ,
            Pi = function(e, t, n, i) {
                n !== i && rn(t)
            }
            ;
        else if ($n) {
            Nr = function(e, t, n, i) {
                for (var a = t.child; a !== null; ) {
                    if (a.tag === 5) {
                        var d = a.stateNode;
                        n && i && (d = ci(d, a.type, a.memoizedProps, a)),
                        le(e, d)
                    } else if (a.tag === 6)
                        d = a.stateNode,
                        n && i && (d = fi(d, a.memoizedProps, a)),
                        le(e, d);
                    else if (a.tag !== 4) {
                        if (a.tag === 22 && a.memoizedState !== null)
                            d = a.child,
                            d !== null && (d.return = a),
                            Nr(e, a, !0, !0);
                        else if (a.child !== null) {
                            a.child.return = a,
                            a = a.child;
                            continue
                        }
                    }
                    if (a === t)
                        break;
                    for (; a.sibling === null; ) {
                        if (a.return === null || a.return === t)
                            return;
                        a = a.return
                    }
                    a.sibling.return = a.return,
                    a = a.sibling
                }
            }
            ;
            var _l = function(e, t, n, i) {
                for (var a = t.child; a !== null; ) {
                    if (a.tag === 5) {
                        var d = a.stateNode;
                        n && i && (d = ci(d, a.type, a.memoizedProps, a)),
                        li(e, d)
                    } else if (a.tag === 6)
                        d = a.stateNode,
                        n && i && (d = fi(d, a.memoizedProps, a)),
                        li(e, d);
                    else if (a.tag !== 4) {
                        if (a.tag === 22 && a.memoizedState !== null)
                            d = a.child,
                            d !== null && (d.return = a),
                            _l(e, a, !0, !0);
                        else if (a.child !== null) {
                            a.child.return = a,
                            a = a.child;
                            continue
                        }
                    }
                    if (a === t)
                        break;
                    for (; a.sibling === null; ) {
                        if (a.return === null || a.return === t)
                            return;
                        a = a.return
                    }
                    a.sibling.return = a.return,
                    a = a.sibling
                }
            };
            kr = function(e, t) {
                var n = t.stateNode;
                if (!Fl(e, t)) {
                    e = n.containerInfo;
                    var i = ai(e);
                    _l(i, t, !1, !1),
                    n.pendingChildren = i,
                    rn(t),
                    Hs(e, i)
                }
            }
            ,
            Li = function(e, t, n, i, a) {
                var d = e.stateNode
                  , y = e.memoizedProps;
                if ((e = Fl(e, t)) && y === i)
                    t.stateNode = d;
                else {
                    var F = t.stateNode
                      , N = tn(Nt.current)
                      , V = null;
                    y !== i && (V = Ue(F, n, y, i, a, N)),
                    e && V === null ? t.stateNode = d : (d = xs(d, V, n, y, i, t, e, F),
                    ye(d, n, i, a, N) && rn(t),
                    t.stateNode = d,
                    e ? rn(t) : Nr(d, t, !1, !1))
                }
            }
            ,
            Pi = function(e, t, n, i) {
                n !== i ? (e = tn(ar.current),
                n = tn(Nt.current),
                t.stateNode = me(i, e, n, t),
                rn(t)) : t.stateNode = e.stateNode
            }
        } else
            kr = function() {}
            ,
            Li = function() {}
            ,
            Pi = function() {}
            ;
        function Ur(e, t) {
            if (!Ze)
                switch (e.tailMode) {
                case "hidden":
                    t = e.tail;
                    for (var n = null; t !== null; )
                        t.alternate !== null && (n = t),
                        t = t.sibling;
                    n === null ? e.tail = null : n.sibling = null;
                    break;
                case "collapsed":
                    n = e.tail;
                    for (var i = null; n !== null; )
                        n.alternate !== null && (i = n),
                        n = n.sibling;
                    i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null
                }
        }
        function Bt(e) {
            var t = e.alternate !== null && e.alternate.child === e.child
              , n = 0
              , i = 0;
            if (t)
                for (var a = e.child; a !== null; )
                    n |= a.lanes | a.childLanes,
                    i |= a.subtreeFlags & 14680064,
                    i |= a.flags & 14680064,
                    a.return = e,
                    a = a.sibling;
            else
                for (a = e.child; a !== null; )
                    n |= a.lanes | a.childLanes,
                    i |= a.subtreeFlags,
                    i |= a.flags,
                    a.return = e,
                    a = a.sibling;
            return e.subtreeFlags |= i,
            e.childLanes = n,
            t
        }
        function Af(e, t, n) {
            var i = t.pendingProps;
            switch (eo(t),
            t.tag) {
            case 2:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
                return Bt(t),
                null;
            case 1:
                return nt(t.type) && ft(),
                Bt(t),
                null;
            case 3:
                return i = t.stateNode,
                lr(),
                ge(Se),
                ge(ze),
                ao(),
                i.pendingContext && (i.context = i.pendingContext,
                i.pendingContext = null),
                (e === null || e.child === null) && (Tr(t) ? rn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024,
                Wt !== null && (Oo(Wt),
                Wt = null))),
                kr(e, t),
                Bt(t),
                null;
            case 5:
                so(t),
                n = tn(ar.current);
                var a = t.type;
                if (e !== null && t.stateNode != null)
                    Li(e, t, a, i, n),
                    e.ref !== t.ref && (t.flags |= 512,
                    t.flags |= 2097152);
                else {
                    if (!i) {
                        if (t.stateNode === null)
                            throw Error(c(166));
                        return Bt(t),
                        null
                    }
                    if (e = tn(Nt.current),
                    Tr(t)) {
                        if (!ht)
                            throw Error(c(175));
                        e = m(t.stateNode, t.type, t.memoizedProps, n, e, t, !_r),
                        t.updateQueue = e,
                        e !== null && rn(t)
                    } else {
                        var d = re(a, i, n, e, t);
                        Nr(d, t, !1, !1),
                        t.stateNode = d,
                        ye(d, a, i, n, e) && rn(t)
                    }
                    t.ref !== null && (t.flags |= 512,
                    t.flags |= 2097152)
                }
                return Bt(t),
                null;
            case 6:
                if (e && t.stateNode != null)
                    Pi(e, t, e.memoizedProps, i);
                else {
                    if (typeof i != "string" && t.stateNode === null)
                        throw Error(c(166));
                    if (e = tn(ar.current),
                    n = tn(Nt.current),
                    Tr(t)) {
                        if (!ht)
                            throw Error(c(176));
                        if (e = t.stateNode,
                        i = t.memoizedProps,
                        (n = C(e, i, t, !_r)) && (a = Tt,
                        a !== null))
                            switch (d = (a.mode & 1) !== 0,
                            a.tag) {
                            case 3:
                                $(a.stateNode.containerInfo, e, i, d);
                                break;
                            case 5:
                                te(a.type, a.memoizedProps, a.stateNode, e, i, d)
                            }
                        n && rn(t)
                    } else
                        t.stateNode = me(i, e, n, t)
                }
                return Bt(t),
                null;
            case 13:
                if (ge(Ve),
                i = t.memoizedState,
                Ze && Dt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) {
                    for (e = Dt; e; )
                        e = jt(e);
                    return sr(),
                    t.flags |= 98560,
                    t
                }
                if (i !== null && i.dehydrated !== null) {
                    if (i = Tr(t),
                    e === null) {
                        if (!i)
                            throw Error(c(318));
                        if (!ht)
                            throw Error(c(344));
                        if (e = t.memoizedState,
                        e = e !== null ? e.dehydrated : null,
                        !e)
                            throw Error(c(317));
                        S(e, t)
                    } else
                        sr(),
                        (t.flags & 128) === 0 && (t.memoizedState = null),
                        t.flags |= 4;
                    return Bt(t),
                    null
                }
                return Wt !== null && (Oo(Wt),
                Wt = null),
                (t.flags & 128) !== 0 ? (t.lanes = n,
                t) : (i = i !== null,
                n = !1,
                e === null ? Tr(t) : n = e.memoizedState !== null,
                i && !n && (t.child.flags |= 8192,
                (t.mode & 1) !== 0 && (e === null || (Ve.current & 1) !== 0 ? ot === 0 && (ot = 3) : ko())),
                t.updateQueue !== null && (t.flags |= 4),
                Bt(t),
                null);
            case 4:
                return lr(),
                kr(e, t),
                e === null && ri(t.stateNode.containerInfo),
                Bt(t),
                null;
            case 10:
                return Ws(t.type._context),
                Bt(t),
                null;
            case 17:
                return nt(t.type) && ft(),
                Bt(t),
                null;
            case 19:
                if (ge(Ve),
                a = t.memoizedState,
                a === null)
                    return Bt(t),
                    null;
                if (i = (t.flags & 128) !== 0,
                d = a.rendering,
                d === null)
                    if (i)
                        Ur(a, !1);
                    else {
                        if (ot !== 0 || e !== null && (e.flags & 128) !== 0)
                            for (e = t.child; e !== null; ) {
                                if (d = Ri(e),
                                d !== null) {
                                    for (t.flags |= 128,
                                    Ur(a, !1),
                                    e = d.updateQueue,
                                    e !== null && (t.updateQueue = e,
                                    t.flags |= 4),
                                    t.subtreeFlags = 0,
                                    e = n,
                                    i = t.child; i !== null; )
                                        n = i,
                                        a = e,
                                        n.flags &= 14680066,
                                        d = n.alternate,
                                        d === null ? (n.childLanes = 0,
                                        n.lanes = a,
                                        n.child = null,
                                        n.subtreeFlags = 0,
                                        n.memoizedProps = null,
                                        n.memoizedState = null,
                                        n.updateQueue = null,
                                        n.dependencies = null,
                                        n.stateNode = null) : (n.childLanes = d.childLanes,
                                        n.lanes = d.lanes,
                                        n.child = d.child,
                                        n.subtreeFlags = 0,
                                        n.deletions = null,
                                        n.memoizedProps = d.memoizedProps,
                                        n.memoizedState = d.memoizedState,
                                        n.updateQueue = d.updateQueue,
                                        n.type = d.type,
                                        a = d.dependencies,
                                        n.dependencies = a === null ? null : {
                                            lanes: a.lanes,
                                            firstContext: a.firstContext
                                        }),
                                        i = i.sibling;
                                    return Me(Ve, Ve.current & 1 | 2),
                                    t.child
                                }
                                e = e.sibling
                            }
                        a.tail !== null && lt() > xo && (t.flags |= 128,
                        i = !0,
                        Ur(a, !1),
                        t.lanes = 4194304)
                    }
                else {
                    if (!i)
                        if (e = Ri(d),
                        e !== null) {
                            if (t.flags |= 128,
                            i = !0,
                            e = e.updateQueue,
                            e !== null && (t.updateQueue = e,
                            t.flags |= 4),
                            Ur(a, !0),
                            a.tail === null && a.tailMode === "hidden" && !d.alternate && !Ze)
                                return Bt(t),
                                null
                        } else
                            2 * lt() - a.renderingStartTime > xo && n !== 1073741824 && (t.flags |= 128,
                            i = !0,
                            Ur(a, !1),
                            t.lanes = 4194304);
                    a.isBackwards ? (d.sibling = t.child,
                    t.child = d) : (e = a.last,
                    e !== null ? e.sibling = d : t.child = d,
                    a.last = d)
                }
                return a.tail !== null ? (t = a.tail,
                a.rendering = t,
                a.tail = t.sibling,
                a.renderingStartTime = lt(),
                t.sibling = null,
                e = Ve.current,
                Me(Ve, i ? e & 1 | 2 : e & 1),
                t) : (Bt(t),
                null);
            case 22:
            case 23:
                return No(),
                i = t.memoizedState !== null,
                e !== null && e.memoizedState !== null !== i && (t.flags |= 8192),
                i && (t.mode & 1) !== 0 ? (xt & 1073741824) !== 0 && (Bt(t),
                It && t.subtreeFlags & 6 && (t.flags |= 8192)) : Bt(t),
                null;
            case 24:
                return null;
            case 25:
                return null
            }
            throw Error(c(156, t.tag))
        }
        var mf = g.ReactCurrentOwner
          , Gt = !1;
        function Mt(e, t, n, i) {
            t.child = e === null ? rl(t, null, n, i) : or(t, e.child, n, i)
        }
        function Tl(e, t, n, i, a) {
            n = n.render;
            var d = t.ref;
            return nr(t, a),
            i = uo(e, t, n, i, d, a),
            n = co(),
            e !== null && !Gt ? (t.updateQueue = e.updateQueue,
            t.flags &= -2053,
            e.lanes &= ~a,
            hn(e, t, a)) : (Ze && n && $s(t),
            t.flags |= 1,
            Mt(e, t, i, a),
            t.child)
        }
        function Dl(e, t, n, i, a) {
            if (e === null) {
                var d = n.type;
                return typeof d == "function" && !Uo(d) && d.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15,
                t.type = d,
                Gl(e, t, d, i, a)) : (e = rs(n.type, null, i, t, t.mode, a),
                e.ref = t.ref,
                e.return = t,
                t.child = e)
            }
            if (d = e.child,
            (e.lanes & a) === 0) {
                var y = d.memoizedProps;
                if (n = n.compare,
                n = n !== null ? n : vi,
                n(y, i) && e.ref === t.ref)
                    return hn(e, t, a)
            }
            return t.flags |= 1,
            e = Mn(d, i),
            e.ref = t.ref,
            e.return = t,
            t.child = e
        }
        function Gl(e, t, n, i, a) {
            if (e !== null && vi(e.memoizedProps, i) && e.ref === t.ref)
                if (Gt = !1,
                (e.lanes & a) !== 0)
                    (e.flags & 131072) !== 0 && (Gt = !0);
                else
                    return t.lanes = e.lanes,
                    hn(e, t, a);
            return go(e, t, n, i, a)
        }
        function xl(e, t, n) {
            var i = t.pendingProps
              , a = i.children
              , d = e !== null ? e.memoizedState : null;
            if (i.mode === "hidden")
                if ((t.mode & 1) === 0)
                    t.memoizedState = {
                        baseLanes: 0,
                        cachePool: null
                    },
                    Me(cr, xt),
                    xt |= n;
                else if ((n & 1073741824) !== 0)
                    t.memoizedState = {
                        baseLanes: 0,
                        cachePool: null
                    },
                    i = d !== null ? d.baseLanes : n,
                    Me(cr, xt),
                    xt |= i;
                else
                    return e = d !== null ? d.baseLanes | n : n,
                    t.lanes = t.childLanes = 1073741824,
                    t.memoizedState = {
                        baseLanes: e,
                        cachePool: null
                    },
                    t.updateQueue = null,
                    Me(cr, xt),
                    xt |= e,
                    null;
            else
                d !== null ? (i = d.baseLanes | n,
                t.memoizedState = null) : i = n,
                Me(cr, xt),
                xt |= i;
            return Mt(e, t, a, n),
            t.child
        }
        function Hl(e, t) {
            var n = t.ref;
            (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512,
            t.flags |= 2097152)
        }
        function go(e, t, n, i, a) {
            var d = nt(n) ? je : ze.current;
            return d = mt(t, d),
            nr(t, a),
            n = uo(e, t, n, i, d, a),
            i = co(),
            e !== null && !Gt ? (t.updateQueue = e.updateQueue,
            t.flags &= -2053,
            e.lanes &= ~a,
            hn(e, t, a)) : (Ze && i && $s(t),
            t.flags |= 1,
            Mt(e, t, n, a),
            t.child)
        }
        function Ll(e, t, n, i, a) {
            if (nt(n)) {
                var d = !0;
                Qe(t)
            } else
                d = !1;
            if (nr(t, a),
            t.stateNode === null)
                e !== null && (e.alternate = null,
                t.alternate = null,
                t.flags |= 2),
                Ya(t, n, i),
                qs(t, n, i, a),
                i = !0;
            else if (e === null) {
                var y = t.stateNode
                  , F = t.memoizedProps;
                y.props = F;
                var N = y.context
                  , V = n.contextType;
                typeof V == "object" && V !== null ? V = Lt(V) : (V = nt(n) ? je : ze.current,
                V = mt(t, V));
                var ae = n.getDerivedStateFromProps
                  , Be = typeof ae == "function" || typeof y.getSnapshotBeforeUpdate == "function";
                Be || typeof y.UNSAFE_componentWillReceiveProps != "function" && typeof y.componentWillReceiveProps != "function" || (F !== i || N !== V) && Za(t, y, i, V),
                gn = !1;
                var he = t.memoizedState;
                y.state = he,
                Ei(t, i, y, a),
                N = t.memoizedState,
                F !== i || he !== N || Se.current || gn ? (typeof ae == "function" && (Vs(t, n, ae, i),
                N = t.memoizedState),
                (F = gn || Wa(t, n, F, i, he, N, V)) ? (Be || typeof y.UNSAFE_componentWillMount != "function" && typeof y.componentWillMount != "function" || (typeof y.componentWillMount == "function" && y.componentWillMount(),
                typeof y.UNSAFE_componentWillMount == "function" && y.UNSAFE_componentWillMount()),
                typeof y.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof y.componentDidMount == "function" && (t.flags |= 4194308),
                t.memoizedProps = i,
                t.memoizedState = N),
                y.props = i,
                y.state = N,
                y.context = V,
                i = F) : (typeof y.componentDidMount == "function" && (t.flags |= 4194308),
                i = !1)
            } else {
                y = t.stateNode,
                za(e, t),
                F = t.memoizedProps,
                V = t.type === t.elementType ? F : Xt(t.type, F),
                y.props = V,
                Be = t.pendingProps,
                he = y.context,
                N = n.contextType,
                typeof N == "object" && N !== null ? N = Lt(N) : (N = nt(n) ? je : ze.current,
                N = mt(t, N));
                var be = n.getDerivedStateFromProps;
                (ae = typeof be == "function" || typeof y.getSnapshotBeforeUpdate == "function") || typeof y.UNSAFE_componentWillReceiveProps != "function" && typeof y.componentWillReceiveProps != "function" || (F !== Be || he !== N) && Za(t, y, i, N),
                gn = !1,
                he = t.memoizedState,
                y.state = he,
                Ei(t, i, y, a);
                var pe = t.memoizedState;
                F !== Be || he !== pe || Se.current || gn ? (typeof be == "function" && (Vs(t, n, be, i),
                pe = t.memoizedState),
                (V = gn || Wa(t, n, V, i, he, pe, N) || !1) ? (ae || typeof y.UNSAFE_componentWillUpdate != "function" && typeof y.componentWillUpdate != "function" || (typeof y.componentWillUpdate == "function" && y.componentWillUpdate(i, pe, N),
                typeof y.UNSAFE_componentWillUpdate == "function" && y.UNSAFE_componentWillUpdate(i, pe, N)),
                typeof y.componentDidUpdate == "function" && (t.flags |= 4),
                typeof y.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof y.componentDidUpdate != "function" || F === e.memoizedProps && he === e.memoizedState || (t.flags |= 4),
                typeof y.getSnapshotBeforeUpdate != "function" || F === e.memoizedProps && he === e.memoizedState || (t.flags |= 1024),
                t.memoizedProps = i,
                t.memoizedState = pe),
                y.props = i,
                y.state = pe,
                y.context = N,
                i = V) : (typeof y.componentDidUpdate != "function" || F === e.memoizedProps && he === e.memoizedState || (t.flags |= 4),
                typeof y.getSnapshotBeforeUpdate != "function" || F === e.memoizedProps && he === e.memoizedState || (t.flags |= 1024),
                i = !1)
            }
            return vo(e, t, n, i, d, a)
        }
        function vo(e, t, n, i, a, d) {
            Hl(e, t);
            var y = (t.flags & 128) !== 0;
            if (!i && !y)
                return a && Le(t, n, !1),
                hn(e, t, d);
            i = t.stateNode,
            mf.current = t;
            var F = y && typeof n.getDerivedStateFromError != "function" ? null : i.render();
            return t.flags |= 1,
            e !== null && y ? (t.child = or(t, e.child, null, d),
            t.child = or(t, null, F, d)) : Mt(e, t, F, d),
            t.memoizedState = i.state,
            a && Le(t, n, !0),
            t.child
        }
        function Pl(e) {
            var t = e.stateNode;
            t.pendingContext ? Je(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Je(e, t.context, !1),
            io(e, t.containerInfo)
        }
        function Ol(e, t, n, i, a) {
            return sr(),
            ro(a),
            t.flags |= 256,
            Mt(e, t, n, i),
            t.child
        }
        var Oi = {
            dehydrated: null,
            treeContext: null,
            retryLane: 0
        };
        function Ni(e) {
            return {
                baseLanes: e,
                cachePool: null
            }
        }
        function Nl(e, t, n) {
            var i = t.pendingProps, a = Ve.current, d = !1, y = (t.flags & 128) !== 0, F;
            if ((F = y) || (F = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0),
            F ? (d = !0,
            t.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1),
            Me(Ve, a & 1),
            e === null)
                return no(t),
                e = t.memoizedState,
                e !== null && (e = e.dehydrated,
                e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : wr(e) ? t.lanes = 8 : t.lanes = 1073741824,
                null) : (a = i.children,
                e = i.fallback,
                d ? (i = t.mode,
                d = t.child,
                a = {
                    mode: "hidden",
                    children: a
                },
                (i & 1) === 0 && d !== null ? (d.childLanes = 0,
                d.pendingProps = a) : d = is(a, i, 0, null),
                e = Wn(e, i, n, null),
                d.return = t,
                e.return = t,
                d.sibling = e,
                t.child = d,
                t.child.memoizedState = Ni(n),
                t.memoizedState = Oi,
                e) : Bo(t, a));
            if (a = e.memoizedState,
            a !== null) {
                if (F = a.dehydrated,
                F !== null) {
                    if (y)
                        return t.flags & 256 ? (t.flags &= -257,
                        ki(e, t, n, Error(c(422)))) : t.memoizedState !== null ? (t.child = e.child,
                        t.flags |= 128,
                        null) : (d = i.fallback,
                        a = t.mode,
                        i = is({
                            mode: "visible",
                            children: i.children
                        }, a, 0, null),
                        d = Wn(d, a, n, null),
                        d.flags |= 2,
                        i.return = t,
                        d.return = t,
                        i.sibling = d,
                        t.child = i,
                        (t.mode & 1) !== 0 && or(t, e.child, null, n),
                        t.child.memoizedState = Ni(n),
                        t.memoizedState = Oi,
                        d);
                    if ((t.mode & 1) === 0)
                        t = ki(e, t, n, null);
                    else if (wr(F))
                        t = ki(e, t, n, Error(c(419)));
                    else if (i = (n & e.childLanes) !== 0,
                    Gt || i) {
                        if (i = rt,
                        i !== null) {
                            switch (n & -n) {
                            case 4:
                                d = 2;
                                break;
                            case 16:
                                d = 8;
                                break;
                            case 64:
                            case 128:
                            case 256:
                            case 512:
                            case 1024:
                            case 2048:
                            case 4096:
                            case 8192:
                            case 16384:
                            case 32768:
                            case 65536:
                            case 131072:
                            case 262144:
                            case 524288:
                            case 1048576:
                            case 2097152:
                            case 4194304:
                            case 8388608:
                            case 16777216:
                            case 33554432:
                            case 67108864:
                                d = 32;
                                break;
                            case 536870912:
                                d = 268435456;
                                break;
                            default:
                                d = 0
                            }
                            i = (d & (i.suspendedLanes | n)) !== 0 ? 0 : d,
                            i !== 0 && i !== a.retryLane && (a.retryLane = i,
                            Ut(e, i, -1))
                        }
                        ko(),
                        t = ki(e, t, n, Error(c(421)))
                    } else
                        Nn(F) ? (t.flags |= 128,
                        t.child = e.child,
                        t = _f.bind(null, e),
                        kn(F, t),
                        t = null) : (n = a.treeContext,
                        ht && (Dt = Ns(F),
                        Tt = t,
                        Ze = !0,
                        Wt = null,
                        _r = !1,
                        n !== null && (Pt[Ot++] = fn,
                        Pt[Ot++] = dn,
                        Pt[Ot++] = Un,
                        fn = n.id,
                        dn = n.overflow,
                        Un = t)),
                        t = Bo(t, t.pendingProps.children),
                        t.flags |= 4096);
                    return t
                }
                return d ? (i = Ul(e, t, i.children, i.fallback, n),
                d = t.child,
                a = e.child.memoizedState,
                d.memoizedState = a === null ? Ni(n) : {
                    baseLanes: a.baseLanes | n,
                    cachePool: null
                },
                d.childLanes = e.childLanes & ~n,
                t.memoizedState = Oi,
                i) : (n = kl(e, t, i.children, n),
                t.memoizedState = null,
                n)
            }
            return d ? (i = Ul(e, t, i.children, i.fallback, n),
            d = t.child,
            a = e.child.memoizedState,
            d.memoizedState = a === null ? Ni(n) : {
                baseLanes: a.baseLanes | n,
                cachePool: null
            },
            d.childLanes = e.childLanes & ~n,
            t.memoizedState = Oi,
            i) : (n = kl(e, t, i.children, n),
            t.memoizedState = null,
            n)
        }
        function Bo(e, t) {
            return t = is({
                mode: "visible",
                children: t
            }, e.mode, 0, null),
            t.return = e,
            e.child = t
        }
        function kl(e, t, n, i) {
            var a = e.child;
            return e = a.sibling,
            n = Mn(a, {
                mode: "visible",
                children: n
            }),
            (t.mode & 1) === 0 && (n.lanes = i),
            n.return = t,
            n.sibling = null,
            e !== null && (i = t.deletions,
            i === null ? (t.deletions = [e],
            t.flags |= 16) : i.push(e)),
            t.child = n
        }
        function Ul(e, t, n, i, a) {
            var d = t.mode;
            e = e.child;
            var y = e.sibling
              , F = {
                mode: "hidden",
                children: n
            };
            return (d & 1) === 0 && t.child !== e ? (n = t.child,
            n.childLanes = 0,
            n.pendingProps = F,
            t.deletions = null) : (n = Mn(e, F),
            n.subtreeFlags = e.subtreeFlags & 14680064),
            y !== null ? i = Mn(y, i) : (i = Wn(i, d, a, null),
            i.flags |= 2),
            i.return = t,
            n.return = t,
            n.sibling = i,
            t.child = n,
            i
        }
        function ki(e, t, n, i) {
            return i !== null && ro(i),
            or(t, e.child, null, n),
            e = Bo(t, t.pendingProps.children),
            e.flags |= 2,
            t.memoizedState = null,
            e
        }
        function Jl(e, t, n) {
            e.lanes |= t;
            var i = e.alternate;
            i !== null && (i.lanes |= t),
            Ys(e.return, t, n)
        }
        function Co(e, t, n, i, a) {
            var d = e.memoizedState;
            d === null ? e.memoizedState = {
                isBackwards: t,
                rendering: null,
                renderingStartTime: 0,
                last: i,
                tail: n,
                tailMode: a
            } : (d.isBackwards = t,
            d.rendering = null,
            d.renderingStartTime = 0,
            d.last = i,
            d.tail = n,
            d.tailMode = a)
        }
        function Kl(e, t, n) {
            var i = t.pendingProps
              , a = i.revealOrder
              , d = i.tail;
            if (Mt(e, t, i.children, n),
            i = Ve.current,
            (i & 2) !== 0)
                i = i & 1 | 2,
                t.flags |= 128;
            else {
                if (e !== null && (e.flags & 128) !== 0)
                    e: for (e = t.child; e !== null; ) {
                        if (e.tag === 13)
                            e.memoizedState !== null && Jl(e, n, t);
                        else if (e.tag === 19)
                            Jl(e, n, t);
                        else if (e.child !== null) {
                            e.child.return = e,
                            e = e.child;
                            continue
                        }
                        if (e === t)
                            break e;
                        for (; e.sibling === null; ) {
                            if (e.return === null || e.return === t)
                                break e;
                            e = e.return
                        }
                        e.sibling.return = e.return,
                        e = e.sibling
                    }
                i &= 1
            }
            if (Me(Ve, i),
            (t.mode & 1) === 0)
                t.memoizedState = null;
            else
                switch (a) {
                case "forwards":
                    for (n = t.child,
                    a = null; n !== null; )
                        e = n.alternate,
                        e !== null && Ri(e) === null && (a = n),
                        n = n.sibling;
                    n = a,
                    n === null ? (a = t.child,
                    t.child = null) : (a = n.sibling,
                    n.sibling = null),
                    Co(t, !1, a, n, d);
                    break;
                case "backwards":
                    for (n = null,
                    a = t.child,
                    t.child = null; a !== null; ) {
                        if (e = a.alternate,
                        e !== null && Ri(e) === null) {
                            t.child = a;
                            break
                        }
                        e = a.sibling,
                        a.sibling = n,
                        n = a,
                        a = e
                    }
                    Co(t, !0, n, null, d);
                    break;
                case "together":
                    Co(t, !1, null, null, void 0);
                    break;
                default:
                    t.memoizedState = null
                }
            return t.child
        }
        function hn(e, t, n) {
            if (e !== null && (t.dependencies = e.dependencies),
            fr |= t.lanes,
            (n & t.childLanes) === 0)
                return null;
            if (e !== null && t.child !== e.child)
                throw Error(c(153));
            if (t.child !== null) {
                for (e = t.child,
                n = Mn(e, e.pendingProps),
                t.child = n,
                n.return = t; e.sibling !== null; )
                    e = e.sibling,
                    n = n.sibling = Mn(e, e.pendingProps),
                    n.return = t;
                n.sibling = null
            }
            return t.child
        }
        function gf(e, t, n) {
            switch (t.tag) {
            case 3:
                Pl(t),
                sr();
                break;
            case 5:
                il(t);
                break;
            case 1:
                nt(t.type) && Qe(t);
                break;
            case 4:
                io(t, t.stateNode.containerInfo);
                break;
            case 10:
                Qa(t, t.type._context, t.memoizedProps.value);
                break;
            case 13:
                var i = t.memoizedState;
                if (i !== null)
                    return i.dehydrated !== null ? (Me(Ve, Ve.current & 1),
                    t.flags |= 128,
                    null) : (n & t.child.childLanes) !== 0 ? Nl(e, t, n) : (Me(Ve, Ve.current & 1),
                    e = hn(e, t, n),
                    e !== null ? e.sibling : null);
                Me(Ve, Ve.current & 1);
                break;
            case 19:
                if (i = (n & t.childLanes) !== 0,
                (e.flags & 128) !== 0) {
                    if (i)
                        return Kl(e, t, n);
                    t.flags |= 128
                }
                var a = t.memoizedState;
                if (a !== null && (a.rendering = null,
                a.tail = null,
                a.lastEffect = null),
                Me(Ve, Ve.current),
                i)
                    break;
                return null;
            case 22:
            case 23:
                return t.lanes = 0,
                xl(e, t, n)
            }
            return hn(e, t, n)
        }
        function vf(e, t) {
            switch (eo(t),
            t.tag) {
            case 1:
                return nt(t.type) && ft(),
                e = t.flags,
                e & 65536 ? (t.flags = e & -65537 | 128,
                t) : null;
            case 3:
                return lr(),
                ge(Se),
                ge(ze),
                ao(),
                e = t.flags,
                (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128,
                t) : null;
            case 5:
                return so(t),
                null;
            case 13:
                if (ge(Ve),
                e = t.memoizedState,
                e !== null && e.dehydrated !== null) {
                    if (t.alternate === null)
                        throw Error(c(340));
                    sr()
                }
                return e = t.flags,
                e & 65536 ? (t.flags = e & -65537 | 128,
                t) : null;
            case 19:
                return ge(Ve),
                null;
            case 4:
                return lr(),
                null;
            case 10:
                return Ws(t.type._context),
                null;
            case 22:
            case 23:
                return No(),
                null;
            case 24:
                return null;
            default:
                return null
            }
        }
        var Ui = !1
          , Qn = !1
          , Bf = typeof WeakSet == "function" ? WeakSet : Set
          , ne = null;
        function Ji(e, t) {
            var n = e.ref;
            if (n !== null)
                if (typeof n == "function")
                    try {
                        n(null)
                    } catch (i) {
                        Ft(e, t, i)
                    }
                else
                    n.current = null
        }
        function yo(e, t, n) {
            try {
                n()
            } catch (i) {
                Ft(e, t, i)
            }
        }
        var Ql = !1;
        function Cf(e, t) {
            for (j(e.containerInfo),
            ne = t; ne !== null; )
                if (e = ne,
                t = e.child,
                (e.subtreeFlags & 1028) !== 0 && t !== null)
                    t.return = e,
                    ne = t;
                else
                    for (; ne !== null; ) {
                        e = ne;
                        try {
                            var n = e.alternate;
                            if ((e.flags & 1024) !== 0)
                                switch (e.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    break;
                                case 1:
                                    if (n !== null) {
                                        var i = n.memoizedProps
                                          , a = n.memoizedState
                                          , d = e.stateNode
                                          , y = d.getSnapshotBeforeUpdate(e.elementType === e.type ? i : Xt(e.type, i), a);
                                        d.__reactInternalSnapshotBeforeUpdate = y
                                    }
                                    break;
                                case 3:
                                    It && Gs(e.stateNode.containerInfo);
                                    break;
                                case 5:
                                case 6:
                                case 4:
                                case 17:
                                    break;
                                default:
                                    throw Error(c(163))
                                }
                        } catch (F) {
                            Ft(e, e.return, F)
                        }
                        if (t = e.sibling,
                        t !== null) {
                            t.return = e.return,
                            ne = t;
                            break
                        }
                        ne = e.return
                    }
            return n = Ql,
            Ql = !1,
            n
        }
        function zn(e, t, n) {
            var i = t.updateQueue;
            if (i = i !== null ? i.lastEffect : null,
            i !== null) {
                var a = i = i.next;
                do {
                    if ((a.tag & e) === e) {
                        var d = a.destroy;
                        a.destroy = void 0,
                        d !== void 0 && yo(t, n, d)
                    }
                    a = a.next
                } while (a !== i)
            }
        }
        function Jr(e, t) {
            if (t = t.updateQueue,
            t = t !== null ? t.lastEffect : null,
            t !== null) {
                var n = t = t.next;
                do {
                    if ((n.tag & e) === e) {
                        var i = n.create;
                        n.destroy = i()
                    }
                    n = n.next
                } while (n !== t)
            }
        }
        function Eo(e) {
            var t = e.ref;
            if (t !== null) {
                var n = e.stateNode;
                switch (e.tag) {
                case 5:
                    e = He(n);
                    break;
                default:
                    e = n
                }
                typeof t == "function" ? t(e) : t.current = e
            }
        }
        function zl(e, t, n) {
            if (Vt && typeof Vt.onCommitFiberUnmount == "function")
                try {
                    Vt.onCommitFiberUnmount(mi, t)
                } catch {}
            switch (t.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
                if (e = t.updateQueue,
                e !== null && (e = e.lastEffect,
                e !== null)) {
                    var i = e = e.next;
                    do {
                        var a = i
                          , d = a.destroy;
                        a = a.tag,
                        d !== void 0 && ((a & 2) !== 0 || (a & 4) !== 0) && yo(t, n, d),
                        i = i.next
                    } while (i !== e)
                }
                break;
            case 1:
                if (Ji(t, n),
                e = t.stateNode,
                typeof e.componentWillUnmount == "function")
                    try {
                        e.props = t.memoizedProps,
                        e.state = t.memoizedState,
                        e.componentWillUnmount()
                    } catch (y) {
                        Ft(t, n, y)
                    }
                break;
            case 5:
                Ji(t, n);
                break;
            case 4:
                It ? Zl(e, t, n) : $n && $n && (t = t.stateNode.containerInfo,
                n = ai(t),
                ui(t, n))
            }
        }
        function bl(e, t, n) {
            for (var i = t; ; )
                if (zl(e, i, n),
                i.child === null || It && i.tag === 4) {
                    if (i === t)
                        break;
                    for (; i.sibling === null; ) {
                        if (i.return === null || i.return === t)
                            return;
                        i = i.return
                    }
                    i.sibling.return = i.return,
                    i = i.sibling
                } else
                    i.child.return = i,
                    i = i.child
        }
        function jl(e) {
            var t = e.alternate;
            t !== null && (e.alternate = null,
            jl(t)),
            e.child = null,
            e.deletions = null,
            e.sibling = null,
            e.tag === 5 && (t = e.stateNode,
            t !== null && ys(t)),
            e.stateNode = null,
            e.return = null,
            e.dependencies = null,
            e.memoizedProps = null,
            e.memoizedState = null,
            e.pendingProps = null,
            e.stateNode = null,
            e.updateQueue = null
        }
        function Xl(e) {
            return e.tag === 5 || e.tag === 3 || e.tag === 4
        }
        function Wl(e) {
            e: for (; ; ) {
                for (; e.sibling === null; ) {
                    if (e.return === null || Xl(e.return))
                        return null;
                    e = e.return
                }
                for (e.sibling.return = e.return,
                e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
                    if (e.flags & 2 || e.child === null || e.tag === 4)
                        continue e;
                    e.child.return = e,
                    e = e.child
                }
                if (!(e.flags & 2))
                    return e.stateNode
            }
        }
        function Yl(e) {
            if (It) {
                e: {
                    for (var t = e.return; t !== null; ) {
                        if (Xl(t))
                            break e;
                        t = t.return
                    }
                    throw Error(c(160))
                }
                var n = t;
                switch (n.tag) {
                case 5:
                    t = n.stateNode,
                    n.flags & 32 && (yt(t),
                    n.flags &= -33),
                    n = Wl(e),
                    So(e, n, t);
                    break;
                case 3:
                case 4:
                    t = n.stateNode.containerInfo,
                    n = Wl(e),
                    Mo(e, n, t);
                    break;
                default:
                    throw Error(c(161))
                }
            }
        }
        function Mo(e, t, n) {
            var i = e.tag;
            if (i === 5 || i === 6)
                e = e.stateNode,
                t ? At(n, e, t) : er(n, e);
            else if (i !== 4 && (e = e.child,
            e !== null))
                for (Mo(e, t, n),
                e = e.sibling; e !== null; )
                    Mo(e, t, n),
                    e = e.sibling
        }
        function So(e, t, n) {
            var i = e.tag;
            if (i === 5 || i === 6)
                e = e.stateNode,
                t ? Pn(n, e, t) : si(n, e);
            else if (i !== 4 && (e = e.child,
            e !== null))
                for (So(e, t, n),
                e = e.sibling; e !== null; )
                    So(e, t, n),
                    e = e.sibling
        }
        function Zl(e, t, n) {
            for (var i = t, a = !1, d, y; ; ) {
                if (!a) {
                    a = i.return;
                    e: for (; ; ) {
                        if (a === null)
                            throw Error(c(160));
                        switch (d = a.stateNode,
                        a.tag) {
                        case 5:
                            y = !1;
                            break e;
                        case 3:
                            d = d.containerInfo,
                            y = !0;
                            break e;
                        case 4:
                            d = d.containerInfo,
                            y = !0;
                            break e
                        }
                        a = a.return
                    }
                    a = !0
                }
                if (i.tag === 5 || i.tag === 6)
                    bl(e, i, n),
                    y ? mn(d, i.stateNode) : oi(d, i.stateNode);
                else if (i.tag === 18)
                    y ? W(d, i.stateNode) : Z(d, i.stateNode);
                else if (i.tag === 4) {
                    if (i.child !== null) {
                        d = i.stateNode.containerInfo,
                        y = !0,
                        i.child.return = i,
                        i = i.child;
                        continue
                    }
                } else if (zl(e, i, n),
                i.child !== null) {
                    i.child.return = i,
                    i = i.child;
                    continue
                }
                if (i === t)
                    break;
                for (; i.sibling === null; ) {
                    if (i.return === null || i.return === t)
                        return;
                    i = i.return,
                    i.tag === 4 && (a = !1)
                }
                i.sibling.return = i.return,
                i = i.sibling
            }
        }
        function Io(e, t) {
            if (It) {
                switch (t.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                    zn(3, t, t.return),
                    Jr(3, t),
                    zn(5, t, t.return);
                    return;
                case 1:
                    return;
                case 5:
                    var n = t.stateNode;
                    if (n != null) {
                        var i = t.memoizedProps;
                        e = e !== null ? e.memoizedProps : i;
                        var a = t.type
                          , d = t.updateQueue;
                        t.updateQueue = null,
                        d !== null && Ts(n, d, a, e, i, t)
                    }
                    return;
                case 6:
                    if (t.stateNode === null)
                        throw Error(c(162));
                    n = t.memoizedProps,
                    Fs(t.stateNode, e !== null ? e.memoizedProps : n, n);
                    return;
                case 3:
                    ht && e !== null && e.memoizedState.isDehydrated && P(t.stateNode.containerInfo);
                    return;
                case 12:
                    return;
                case 13:
                    Ki(t);
                    return;
                case 19:
                    Ki(t);
                    return;
                case 17:
                    return
                }
                throw Error(c(163))
            }
            switch (t.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
                zn(3, t, t.return),
                Jr(3, t),
                zn(5, t, t.return);
                return;
            case 12:
                return;
            case 13:
                Ki(t);
                return;
            case 19:
                Ki(t);
                return;
            case 3:
                ht && e !== null && e.memoizedState.isDehydrated && P(t.stateNode.containerInfo);
                break;
            case 22:
            case 23:
                return
            }
            e: if ($n) {
                switch (t.tag) {
                case 1:
                case 5:
                case 6:
                    break e;
                case 3:
                case 4:
                    t = t.stateNode,
                    ui(t.containerInfo, t.pendingChildren);
                    break e
                }
                throw Error(c(163))
            }
        }
        function Ki(e) {
            var t = e.updateQueue;
            if (t !== null) {
                e.updateQueue = null;
                var n = e.stateNode;
                n === null && (n = e.stateNode = new Bf),
                t.forEach(function(i) {
                    var a = Tf.bind(null, e, i);
                    n.has(i) || (n.add(i),
                    i.then(a, a))
                })
            }
        }
        function yf(e, t) {
            for (ne = t; ne !== null; ) {
                t = ne;
                var n = t.deletions;
                if (n !== null)
                    for (var i = 0; i < n.length; i++) {
                        var a = n[i];
                        try {
                            var d = e;
                            It ? Zl(d, a, t) : bl(d, a, t);
                            var y = a.alternate;
                            y !== null && (y.return = null),
                            a.return = null
                        } catch (fe) {
                            Ft(a, t, fe)
                        }
                    }
                if (n = t.child,
                (t.subtreeFlags & 12854) !== 0 && n !== null)
                    n.return = t,
                    ne = n;
                else
                    for (; ne !== null; ) {
                        t = ne;
                        try {
                            var F = t.flags;
                            if (F & 32 && It && yt(t.stateNode),
                            F & 512) {
                                var N = t.alternate;
                                if (N !== null) {
                                    var V = N.ref;
                                    V !== null && (typeof V == "function" ? V(null) : V.current = null)
                                }
                            }
                            if (F & 8192)
                                switch (t.tag) {
                                case 13:
                                    if (t.memoizedState !== null) {
                                        var ae = t.alternate;
                                        (ae === null || ae.memoizedState === null) && (Go = lt())
                                    }
                                    break;
                                case 22:
                                    var Be = t.memoizedState !== null
                                      , he = t.alternate
                                      , be = he !== null && he.memoizedState !== null;
                                    if (n = t,
                                    It) {
                                        e: if (i = n,
                                        a = Be,
                                        d = null,
                                        It)
                                            for (var pe = i; ; ) {
                                                if (pe.tag === 5) {
                                                    if (d === null) {
                                                        d = pe;
                                                        var Ct = pe.stateNode;
                                                        a ? at(Ct) : se(pe.stateNode, pe.memoizedProps)
                                                    }
                                                } else if (pe.tag === 6) {
                                                    if (d === null) {
                                                        var Kt = pe.stateNode;
                                                        a ? Ds(Kt) : On(Kt, pe.memoizedProps)
                                                    }
                                                } else if ((pe.tag !== 22 && pe.tag !== 23 || pe.memoizedState === null || pe === i) && pe.child !== null) {
                                                    pe.child.return = pe,
                                                    pe = pe.child;
                                                    continue
                                                }
                                                if (pe === i)
                                                    break;
                                                for (; pe.sibling === null; ) {
                                                    if (pe.return === null || pe.return === i)
                                                        break e;
                                                    d === pe && (d = null),
                                                    pe = pe.return
                                                }
                                                d === pe && (d = null),
                                                pe.sibling.return = pe.return,
                                                pe = pe.sibling
                                            }
                                    }
                                    if (Be && !be && (n.mode & 1) !== 0) {
                                        ne = n;
                                        for (var x = n.child; x !== null; ) {
                                            for (n = ne = x; ne !== null; ) {
                                                i = ne;
                                                var _ = i.child;
                                                switch (i.tag) {
                                                case 0:
                                                case 11:
                                                case 14:
                                                case 15:
                                                    zn(4, i, i.return);
                                                    break;
                                                case 1:
                                                    Ji(i, i.return);
                                                    var L = i.stateNode;
                                                    if (typeof L.componentWillUnmount == "function") {
                                                        var ie = i.return;
                                                        try {
                                                            L.props = i.memoizedProps,
                                                            L.state = i.memoizedState,
                                                            L.componentWillUnmount()
                                                        } catch (fe) {
                                                            Ft(i, ie, fe)
                                                        }
                                                    }
                                                    break;
                                                case 5:
                                                    Ji(i, i.return);
                                                    break;
                                                case 22:
                                                    if (i.memoizedState !== null) {
                                                        $l(n);
                                                        continue
                                                    }
                                                }
                                                _ !== null ? (_.return = i,
                                                ne = _) : $l(n)
                                            }
                                            x = x.sibling
                                        }
                                    }
                                }
                            switch (F & 4102) {
                            case 2:
                                Yl(t),
                                t.flags &= -3;
                                break;
                            case 6:
                                Yl(t),
                                t.flags &= -3,
                                Io(t.alternate, t);
                                break;
                            case 4096:
                                t.flags &= -4097;
                                break;
                            case 4100:
                                t.flags &= -4097,
                                Io(t.alternate, t);
                                break;
                            case 4:
                                Io(t.alternate, t)
                            }
                        } catch (fe) {
                            Ft(t, t.return, fe)
                        }
                        if (n = t.sibling,
                        n !== null) {
                            n.return = t.return,
                            ne = n;
                            break
                        }
                        ne = t.return
                    }
            }
        }
        function Ef(e, t, n) {
            ne = e,
            Vl(e)
        }
        function Vl(e, t, n) {
            for (var i = (e.mode & 1) !== 0; ne !== null; ) {
                var a = ne
                  , d = a.child;
                if (a.tag === 22 && i) {
                    var y = a.memoizedState !== null || Ui;
                    if (!y) {
                        var F = a.alternate
                          , N = F !== null && F.memoizedState !== null || Qn;
                        F = Ui;
                        var V = Qn;
                        if (Ui = y,
                        (Qn = N) && !V)
                            for (ne = a; ne !== null; )
                                y = ne,
                                N = y.child,
                                y.tag === 22 && y.memoizedState !== null ? eu(a) : N !== null ? (N.return = y,
                                ne = N) : eu(a);
                        for (; d !== null; )
                            ne = d,
                            Vl(d),
                            d = d.sibling;
                        ne = a,
                        Ui = F,
                        Qn = V
                    }
                    ql(e)
                } else
                    (a.subtreeFlags & 8772) !== 0 && d !== null ? (d.return = a,
                    ne = d) : ql(e)
            }
        }
        function ql(e) {
            for (; ne !== null; ) {
                var t = ne;
                if ((t.flags & 8772) !== 0) {
                    var n = t.alternate;
                    try {
                        if ((t.flags & 8772) !== 0)
                            switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                Qn || Jr(5, t);
                                break;
                            case 1:
                                var i = t.stateNode;
                                if (t.flags & 4 && !Qn)
                                    if (n === null)
                                        i.componentDidMount();
                                    else {
                                        var a = t.elementType === t.type ? n.memoizedProps : Xt(t.type, n.memoizedProps);
                                        i.componentDidUpdate(a, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate)
                                    }
                                var d = t.updateQueue;
                                d !== null && ja(t, d, i);
                                break;
                            case 3:
                                var y = t.updateQueue;
                                if (y !== null) {
                                    if (n = null,
                                    t.child !== null)
                                        switch (t.child.tag) {
                                        case 5:
                                            n = He(t.child.stateNode);
                                            break;
                                        case 1:
                                            n = t.child.stateNode
                                        }
                                    ja(t, y, n)
                                }
                                break;
                            case 5:
                                var F = t.stateNode;
                                n === null && t.flags & 4 && _s(F, t.type, t.memoizedProps, t);
                                break;
                            case 6:
                                break;
                            case 4:
                                break;
                            case 12:
                                break;
                            case 13:
                                if (ht && t.memoizedState === null) {
                                    var N = t.alternate;
                                    if (N !== null) {
                                        var V = N.memoizedState;
                                        if (V !== null) {
                                            var ae = V.dehydrated;
                                            ae !== null && O(ae)
                                        }
                                    }
                                }
                                break;
                            case 19:
                            case 17:
                            case 21:
                            case 22:
                            case 23:
                                break;
                            default:
                                throw Error(c(163))
                            }
                        Qn || t.flags & 512 && Eo(t)
                    } catch (Be) {
                        Ft(t, t.return, Be)
                    }
                }
                if (t === e) {
                    ne = null;
                    break
                }
                if (n = t.sibling,
                n !== null) {
                    n.return = t.return,
                    ne = n;
                    break
                }
                ne = t.return
            }
        }
        function $l(e) {
            for (; ne !== null; ) {
                var t = ne;
                if (t === e) {
                    ne = null;
                    break
                }
                var n = t.sibling;
                if (n !== null) {
                    n.return = t.return,
                    ne = n;
                    break
                }
                ne = t.return
            }
        }
        function eu(e) {
            for (; ne !== null; ) {
                var t = ne;
                try {
                    switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        var n = t.return;
                        try {
                            Jr(4, t)
                        } catch (N) {
                            Ft(t, n, N)
                        }
                        break;
                    case 1:
                        var i = t.stateNode;
                        if (typeof i.componentDidMount == "function") {
                            var a = t.return;
                            try {
                                i.componentDidMount()
                            } catch (N) {
                                Ft(t, a, N)
                            }
                        }
                        var d = t.return;
                        try {
                            Eo(t)
                        } catch (N) {
                            Ft(t, d, N)
                        }
                        break;
                    case 5:
                        var y = t.return;
                        try {
                            Eo(t)
                        } catch (N) {
                            Ft(t, y, N)
                        }
                    }
                } catch (N) {
                    Ft(t, t.return, N)
                }
                if (t === e) {
                    ne = null;
                    break
                }
                var F = t.sibling;
                if (F !== null) {
                    F.return = t.return,
                    ne = F;
                    break
                }
                ne = t.return
            }
        }
        var Qi = 0
          , zi = 1
          , bi = 2
          , ji = 3
          , Xi = 4;
        if (typeof Symbol == "function" && Symbol.for) {
            var Kr = Symbol.for;
            Qi = Kr("selector.component"),
            zi = Kr("selector.has_pseudo_class"),
            bi = Kr("selector.role"),
            ji = Kr("selector.test_id"),
            Xi = Kr("selector.text")
        }
        function wo(e) {
            var t = ni(e);
            if (t != null) {
                if (typeof t.memoizedProps["data-testname"] != "string")
                    throw Error(c(364));
                return t
            }
            if (e = Ss(e),
            e === null)
                throw Error(c(362));
            return e.stateNode.current
        }
        function Ro(e, t) {
            switch (t.$$typeof) {
            case Qi:
                if (e.type === t.value)
                    return !0;
                break;
            case zi:
                e: {
                    t = t.value,
                    e = [e, 0];
                    for (var n = 0; n < e.length; ) {
                        var i = e[n++]
                          , a = e[n++]
                          , d = t[a];
                        if (i.tag !== 5 || !Ln(i)) {
                            for (; d != null && Ro(i, d); )
                                a++,
                                d = t[a];
                            if (a === t.length) {
                                t = !0;
                                break e
                            } else
                                for (i = i.child; i !== null; )
                                    e.push(i, a),
                                    i = i.sibling
                        }
                    }
                    t = !1
                }
                return t;
            case bi:
                if (e.tag === 5 && Ir(e.stateNode, t.value))
                    return !0;
                break;
            case Xi:
                if ((e.tag === 5 || e.tag === 6) && (e = ii(e),
                e !== null && 0 <= e.indexOf(t.value)))
                    return !0;
                break;
            case ji:
                if (e.tag === 5 && (e = e.memoizedProps["data-testname"],
                typeof e == "string" && e.toLowerCase() === t.value.toLowerCase()))
                    return !0;
                break;
            default:
                throw Error(c(365))
            }
            return !1
        }
        function Fo(e) {
            switch (e.$$typeof) {
            case Qi:
                return "<" + (Y(e.value) || "Unknown") + ">";
            case zi:
                return ":has(" + (Fo(e) || "") + ")";
            case bi:
                return '[role="' + e.value + '"]';
            case Xi:
                return '"' + e.value + '"';
            case ji:
                return '[data-testname="' + e.value + '"]';
            default:
                throw Error(c(365))
            }
        }
        function tu(e, t) {
            var n = [];
            e = [e, 0];
            for (var i = 0; i < e.length; ) {
                var a = e[i++]
                  , d = e[i++]
                  , y = t[d];
                if (a.tag !== 5 || !Ln(a)) {
                    for (; y != null && Ro(a, y); )
                        d++,
                        y = t[d];
                    if (d === t.length)
                        n.push(a);
                    else
                        for (a = a.child; a !== null; )
                            e.push(a, d),
                            a = a.sibling
                }
            }
            return n
        }
        function _o(e, t) {
            if (!Hn)
                throw Error(c(363));
            e = wo(e),
            e = tu(e, t),
            t = [],
            e = Array.from(e);
            for (var n = 0; n < e.length; ) {
                var i = e[n++];
                if (i.tag === 5)
                    Ln(i) || t.push(i.stateNode);
                else
                    for (i = i.child; i !== null; )
                        e.push(i),
                        i = i.sibling
            }
            return t
        }
        var Mf = Math.ceil
          , Wi = g.ReactCurrentDispatcher
          , To = g.ReactCurrentOwner
          , tt = g.ReactCurrentBatchConfig
          , we = 0
          , rt = null
          , it = null
          , dt = 0
          , xt = 0
          , cr = Te(0)
          , ot = 0
          , Qr = null
          , fr = 0
          , Yi = 0
          , Do = 0
          , zr = null
          , wt = null
          , Go = 0
          , xo = 1 / 0;
        function dr() {
            xo = lt() + 500
        }
        var Zi = !1
          , Ho = null
          , Bn = null
          , Vi = !1
          , Cn = null
          , qi = 0
          , br = 0
          , Lo = null
          , $i = -1
          , es = 0;
        function St() {
            return (we & 6) !== 0 ? lt() : $i !== -1 ? $i : $i = lt()
        }
        function yn(e) {
            return (e.mode & 1) === 0 ? 1 : (we & 2) !== 0 && dt !== 0 ? dt & -dt : sf.transition !== null ? (es === 0 && (e = pi,
            pi <<= 1,
            (pi & 4194240) === 0 && (pi = 64),
            es = e),
            es) : (e = Pe,
            e !== 0 ? e : Cs())
        }
        function Ut(e, t, n) {
            if (50 < br)
                throw br = 0,
                Lo = null,
                Error(c(185));
            var i = ts(e, t);
            return i === null ? null : (Fr(i, t, n),
            ((we & 2) === 0 || i !== rt) && (i === rt && ((we & 2) === 0 && (Yi |= t),
            ot === 4 && En(i, dt)),
            Rt(i, n),
            t === 1 && we === 0 && (e.mode & 1) === 0 && (dr(),
            gi && $t())),
            i)
        }
        function ts(e, t) {
            e.lanes |= t;
            var n = e.alternate;
            for (n !== null && (n.lanes |= t),
            n = e,
            e = e.return; e !== null; )
                e.childLanes |= t,
                n = e.alternate,
                n !== null && (n.childLanes |= t),
                n = e,
                e = e.return;
            return n.tag === 3 ? n.stateNode : null
        }
        function Rt(e, t) {
            var n = e.callbackNode;
            Yc(e, t);
            var i = Ai(e, e === rt ? dt : 0);
            if (i === 0)
                n !== null && Ja(n),
                e.callbackNode = null,
                e.callbackPriority = 0;
            else if (t = i & -i,
            e.callbackPriority !== t) {
                if (n != null && Ja(n),
                t === 1)
                    e.tag === 0 ? rf(ru.bind(null, e)) : Ka(ru.bind(null, e)),
                    Es ? Ms(function() {
                        we === 0 && $t()
                    }) : Ks(Qs, $t),
                    n = null;
                else {
                    switch (Ua(i)) {
                    case 1:
                        n = Qs;
                        break;
                    case 4:
                        n = $c;
                        break;
                    case 16:
                        n = zs;
                        break;
                    case 536870912:
                        n = ef;
                        break;
                    default:
                        n = zs
                    }
                    n = du(n, nu.bind(null, e))
                }
                e.callbackPriority = t,
                e.callbackNode = n
            }
        }
        function nu(e, t) {
            if ($i = -1,
            es = 0,
            (we & 6) !== 0)
                throw Error(c(327));
            var n = e.callbackNode;
            if (Xn() && e.callbackNode !== n)
                return null;
            var i = Ai(e, e === rt ? dt : 0);
            if (i === 0)
                return null;
            if ((i & 30) !== 0 || (i & e.expiredLanes) !== 0 || t)
                t = ns(e, i);
            else {
                t = i;
                var a = we;
                we |= 2;
                var d = ou();
                (rt !== e || dt !== t) && (dr(),
                bn(e, t));
                do
                    try {
                        wf();
                        break
                    } catch (F) {
                        su(e, F)
                    }
                while (!0);
                Xs(),
                Wi.current = d,
                we = a,
                it !== null ? t = 0 : (rt = null,
                dt = 0,
                t = ot)
            }
            if (t !== 0) {
                if (t === 2 && (a = ks(e),
                a !== 0 && (i = a,
                t = Po(e, a))),
                t === 1)
                    throw n = Qr,
                    bn(e, 0),
                    En(e, i),
                    Rt(e, lt()),
                    n;
                if (t === 6)
                    En(e, i);
                else {
                    if (a = e.current.alternate,
                    (i & 30) === 0 && !Sf(a) && (t = ns(e, i),
                    t === 2 && (d = ks(e),
                    d !== 0 && (i = d,
                    t = Po(e, d))),
                    t === 1))
                        throw n = Qr,
                        bn(e, 0),
                        En(e, i),
                        Rt(e, lt()),
                        n;
                    switch (e.finishedWork = a,
                    e.finishedLanes = i,
                    t) {
                    case 0:
                    case 1:
                        throw Error(c(345));
                    case 2:
                        jn(e, wt);
                        break;
                    case 3:
                        if (En(e, i),
                        (i & 130023424) === i && (t = Go + 500 - lt(),
                        10 < t)) {
                            if (Ai(e, 0) !== 0)
                                break;
                            if (a = e.suspendedLanes,
                            (a & i) !== i) {
                                St(),
                                e.pingedLanes |= e.suspendedLanes & a;
                                break
                            }
                            e.timeoutHandle = $e(jn.bind(null, e, wt), t);
                            break
                        }
                        jn(e, wt);
                        break;
                    case 4:
                        if (En(e, i),
                        (i & 4194240) === i)
                            break;
                        for (t = e.eventTimes,
                        a = -1; 0 < i; ) {
                            var y = 31 - Ye(i);
                            d = 1 << y,
                            y = t[y],
                            y > a && (a = y),
                            i &= ~d
                        }
                        if (i = a,
                        i = lt() - i,
                        i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * Mf(i / 1960)) - i,
                        10 < i) {
                            e.timeoutHandle = $e(jn.bind(null, e, wt), i);
                            break
                        }
                        jn(e, wt);
                        break;
                    case 5:
                        jn(e, wt);
                        break;
                    default:
                        throw Error(c(329))
                    }
                }
            }
            return Rt(e, lt()),
            e.callbackNode === n ? nu.bind(null, e) : null
        }
        function Po(e, t) {
            var n = zr;
            return e.current.memoizedState.isDehydrated && (bn(e, t).flags |= 256),
            e = ns(e, t),
            e !== 2 && (t = wt,
            wt = n,
            t !== null && Oo(t)),
            e
        }
        function Oo(e) {
            wt === null ? wt = e : wt.push.apply(wt, e)
        }
        function Sf(e) {
            for (var t = e; ; ) {
                if (t.flags & 16384) {
                    var n = t.updateQueue;
                    if (n !== null && (n = n.stores,
                    n !== null))
                        for (var i = 0; i < n.length; i++) {
                            var a = n[i]
                              , d = a.getSnapshot;
                            a = a.value;
                            try {
                                if (!qt(d(), a))
                                    return !1
                            } catch {
                                return !1
                            }
                        }
                }
                if (n = t.child,
                t.subtreeFlags & 16384 && n !== null)
                    n.return = t,
                    t = n;
                else {
                    if (t === e)
                        break;
                    for (; t.sibling === null; ) {
                        if (t.return === null || t.return === e)
                            return !0;
                        t = t.return
                    }
                    t.sibling.return = t.return,
                    t = t.sibling
                }
            }
            return !0
        }
        function En(e, t) {
            for (t &= ~Do,
            t &= ~Yi,
            e.suspendedLanes |= t,
            e.pingedLanes &= ~t,
            e = e.expirationTimes; 0 < t; ) {
                var n = 31 - Ye(t)
                  , i = 1 << n;
                e[n] = -1,
                t &= ~i
            }
        }
        function ru(e) {
            if ((we & 6) !== 0)
                throw Error(c(327));
            Xn();
            var t = Ai(e, 0);
            if ((t & 1) === 0)
                return Rt(e, lt()),
                null;
            var n = ns(e, t);
            if (e.tag !== 0 && n === 2) {
                var i = ks(e);
                i !== 0 && (t = i,
                n = Po(e, i))
            }
            if (n === 1)
                throw n = Qr,
                bn(e, 0),
                En(e, t),
                Rt(e, lt()),
                n;
            if (n === 6)
                throw Error(c(345));
            return e.finishedWork = e.current.alternate,
            e.finishedLanes = t,
            jn(e, wt),
            Rt(e, lt()),
            null
        }
        function iu(e) {
            Cn !== null && Cn.tag === 0 && (we & 6) === 0 && Xn();
            var t = we;
            we |= 1;
            var n = tt.transition
              , i = Pe;
            try {
                if (tt.transition = null,
                Pe = 1,
                e)
                    return e()
            } finally {
                Pe = i,
                tt.transition = n,
                we = t,
                (we & 6) === 0 && $t()
            }
        }
        function No() {
            xt = cr.current,
            ge(cr)
        }
        function bn(e, t) {
            e.finishedWork = null,
            e.finishedLanes = 0;
            var n = e.timeoutHandle;
            if (n !== Sr && (e.timeoutHandle = Sr,
            bt(n)),
            it !== null)
                for (n = it.return; n !== null; ) {
                    var i = n;
                    switch (eo(i),
                    i.tag) {
                    case 1:
                        i = i.type.childContextTypes,
                        i != null && ft();
                        break;
                    case 3:
                        lr(),
                        ge(Se),
                        ge(ze),
                        ao();
                        break;
                    case 5:
                        so(i);
                        break;
                    case 4:
                        lr();
                        break;
                    case 13:
                        ge(Ve);
                        break;
                    case 19:
                        ge(Ve);
                        break;
                    case 10:
                        Ws(i.type._context);
                        break;
                    case 22:
                    case 23:
                        No()
                    }
                    n = n.return
                }
            if (rt = e,
            it = e = Mn(e.current, null),
            dt = xt = t,
            ot = 0,
            Qr = null,
            Do = Yi = fr = 0,
            wt = zr = null,
            en !== null) {
                for (t = 0; t < en.length; t++)
                    if (n = en[t],
                    i = n.interleaved,
                    i !== null) {
                        n.interleaved = null;
                        var a = i.next
                          , d = n.pending;
                        if (d !== null) {
                            var y = d.next;
                            d.next = a,
                            i.next = y
                        }
                        n.pending = i
                    }
                en = null
            }
            return e
        }
        function su(e, t) {
            do {
                var n = it;
                try {
                    if (Xs(),
                    Fi.current = Hi,
                    _i) {
                        for (var i = et.memoizedState; i !== null; ) {
                            var a = i.queue;
                            a !== null && (a.pending = null),
                            i = i.next
                        }
                        _i = !1
                    }
                    if (ur = 0,
                    ut = gt = et = null,
                    Hr = !1,
                    Lr = 0,
                    To.current = null,
                    n === null || n.return === null) {
                        ot = 1,
                        Qr = t,
                        it = null;
                        break
                    }
                    e: {
                        var d = e
                          , y = n.return
                          , F = n
                          , N = t;
                        if (t = dt,
                        F.flags |= 32768,
                        N !== null && typeof N == "object" && typeof N.then == "function") {
                            var V = N
                              , ae = F
                              , Be = ae.tag;
                            if ((ae.mode & 1) === 0 && (Be === 0 || Be === 11 || Be === 15)) {
                                var he = ae.alternate;
                                he ? (ae.updateQueue = he.updateQueue,
                                ae.memoizedState = he.memoizedState,
                                ae.lanes = he.lanes) : (ae.updateQueue = null,
                                ae.memoizedState = null)
                            }
                            var be = wl(y);
                            if (be !== null) {
                                be.flags &= -257,
                                Rl(be, y, F, d, t),
                                be.mode & 1 && Il(d, V, t),
                                t = be,
                                N = V;
                                var pe = t.updateQueue;
                                if (pe === null) {
                                    var Ct = new Set;
                                    Ct.add(N),
                                    t.updateQueue = Ct
                                } else
                                    pe.add(N);
                                break e
                            } else {
                                if ((t & 1) === 0) {
                                    Il(d, V, t),
                                    ko();
                                    break e
                                }
                                N = Error(c(426))
                            }
                        } else if (Ze && F.mode & 1) {
                            var Kt = wl(y);
                            if (Kt !== null) {
                                (Kt.flags & 65536) === 0 && (Kt.flags |= 256),
                                Rl(Kt, y, F, d, t),
                                ro(N);
                                break e
                            }
                        }
                        d = N,
                        ot !== 4 && (ot = 2),
                        zr === null ? zr = [d] : zr.push(d),
                        N = Ao(N, F),
                        F = y;
                        do {
                            switch (F.tag) {
                            case 3:
                                F.flags |= 65536,
                                t &= -t,
                                F.lanes |= t;
                                var x = Ml(F, N, t);
                                ba(F, x);
                                break e;
                            case 1:
                                d = N;
                                var _ = F.type
                                  , L = F.stateNode;
                                if ((F.flags & 128) === 0 && (typeof _.getDerivedStateFromError == "function" || L !== null && typeof L.componentDidCatch == "function" && (Bn === null || !Bn.has(L)))) {
                                    F.flags |= 65536,
                                    t &= -t,
                                    F.lanes |= t;
                                    var ie = Sl(F, d, t);
                                    ba(F, ie);
                                    break e
                                }
                            }
                            F = F.return
                        } while (F !== null)
                    }
                    lu(n)
                } catch (fe) {
                    t = fe,
                    it === n && n !== null && (it = n = n.return);
                    continue
                }
                break
            } while (!0)
        }
        function ou() {
            var e = Wi.current;
            return Wi.current = Hi,
            e === null ? Hi : e
        }
        function ko() {
            (ot === 0 || ot === 3 || ot === 2) && (ot = 4),
            rt === null || (fr & 268435455) === 0 && (Yi & 268435455) === 0 || En(rt, dt)
        }
        function ns(e, t) {
            var n = we;
            we |= 2;
            var i = ou();
            rt === e && dt === t || bn(e, t);
            do
                try {
                    If();
                    break
                } catch (a) {
                    su(e, a)
                }
            while (!0);
            if (Xs(),
            we = n,
            Wi.current = i,
            it !== null)
                throw Error(c(261));
            return rt = null,
            dt = 0,
            ot
        }
        function If() {
            for (; it !== null; )
                au(it)
        }
        function wf() {
            for (; it !== null && !Vc(); )
                au(it)
        }
        function au(e) {
            var t = fu(e.alternate, e, xt);
            e.memoizedProps = e.pendingProps,
            t === null ? lu(e) : it = t,
            To.current = null
        }
        function lu(e) {
            var t = e;
            do {
                var n = t.alternate;
                if (e = t.return,
                (t.flags & 32768) === 0) {
                    if (n = Af(n, t, xt),
                    n !== null) {
                        it = n;
                        return
                    }
                } else {
                    if (n = vf(n, t),
                    n !== null) {
                        n.flags &= 32767,
                        it = n;
                        return
                    }
                    if (e !== null)
                        e.flags |= 32768,
                        e.subtreeFlags = 0,
                        e.deletions = null;
                    else {
                        ot = 6,
                        it = null;
                        return
                    }
                }
                if (t = t.sibling,
                t !== null) {
                    it = t;
                    return
                }
                it = t = e
            } while (t !== null);
            ot === 0 && (ot = 5)
        }
        function jn(e, t) {
            var n = Pe
              , i = tt.transition;
            try {
                tt.transition = null,
                Pe = 1,
                Rf(e, t, n)
            } finally {
                tt.transition = i,
                Pe = n
            }
            return null
        }
        function Rf(e, t, n) {
            do
                Xn();
            while (Cn !== null);
            if ((we & 6) !== 0)
                throw Error(c(327));
            var i = e.finishedWork
              , a = e.finishedLanes;
            if (i === null)
                return null;
            if (e.finishedWork = null,
            e.finishedLanes = 0,
            i === e.current)
                throw Error(c(177));
            e.callbackNode = null,
            e.callbackPriority = 0;
            var d = i.lanes | i.childLanes;
            if (Zc(e, d),
            e === rt && (it = rt = null,
            dt = 0),
            (i.subtreeFlags & 2064) === 0 && (i.flags & 2064) === 0 || Vi || (Vi = !0,
            du(zs, function() {
                return Xn(),
                null
            })),
            d = (i.flags & 15990) !== 0,
            (i.subtreeFlags & 15990) !== 0 || d) {
                d = tt.transition,
                tt.transition = null;
                var y = Pe;
                Pe = 1;
                var F = we;
                we |= 4,
                To.current = null,
                Cf(e, i),
                yf(e, i),
                K(e.containerInfo),
                e.current = i,
                Ef(i),
                qc(),
                we = F,
                Pe = y,
                tt.transition = d
            } else
                e.current = i;
            if (Vi && (Vi = !1,
            Cn = e,
            qi = a),
            d = e.pendingLanes,
            d === 0 && (Bn = null),
            tf(i.stateNode),
            Rt(e, lt()),
            t !== null)
                for (n = e.onRecoverableError,
                i = 0; i < t.length; i++)
                    n(t[i]);
            if (Zi)
                throw Zi = !1,
                e = Ho,
                Ho = null,
                e;
            return (qi & 1) !== 0 && e.tag !== 0 && Xn(),
            d = e.pendingLanes,
            (d & 1) !== 0 ? e === Lo ? br++ : (br = 0,
            Lo = e) : br = 0,
            $t(),
            null
        }
        function Xn() {
            if (Cn !== null) {
                var e = Ua(qi)
                  , t = tt.transition
                  , n = Pe;
                try {
                    if (tt.transition = null,
                    Pe = 16 > e ? 16 : e,
                    Cn === null)
                        var i = !1;
                    else {
                        if (e = Cn,
                        Cn = null,
                        qi = 0,
                        (we & 6) !== 0)
                            throw Error(c(331));
                        var a = we;
                        for (we |= 4,
                        ne = e.current; ne !== null; ) {
                            var d = ne
                              , y = d.child;
                            if ((ne.flags & 16) !== 0) {
                                var F = d.deletions;
                                if (F !== null) {
                                    for (var N = 0; N < F.length; N++) {
                                        var V = F[N];
                                        for (ne = V; ne !== null; ) {
                                            var ae = ne;
                                            switch (ae.tag) {
                                            case 0:
                                            case 11:
                                            case 15:
                                                zn(8, ae, d)
                                            }
                                            var Be = ae.child;
                                            if (Be !== null)
                                                Be.return = ae,
                                                ne = Be;
                                            else
                                                for (; ne !== null; ) {
                                                    ae = ne;
                                                    var he = ae.sibling
                                                      , be = ae.return;
                                                    if (jl(ae),
                                                    ae === V) {
                                                        ne = null;
                                                        break
                                                    }
                                                    if (he !== null) {
                                                        he.return = be,
                                                        ne = he;
                                                        break
                                                    }
                                                    ne = be
                                                }
                                        }
                                    }
                                    var pe = d.alternate;
                                    if (pe !== null) {
                                        var Ct = pe.child;
                                        if (Ct !== null) {
                                            pe.child = null;
                                            do {
                                                var Kt = Ct.sibling;
                                                Ct.sibling = null,
                                                Ct = Kt
                                            } while (Ct !== null)
                                        }
                                    }
                                    ne = d
                                }
                            }
                            if ((d.subtreeFlags & 2064) !== 0 && y !== null)
                                y.return = d,
                                ne = y;
                            else
                                e: for (; ne !== null; ) {
                                    if (d = ne,
                                    (d.flags & 2048) !== 0)
                                        switch (d.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            zn(9, d, d.return)
                                        }
                                    var x = d.sibling;
                                    if (x !== null) {
                                        x.return = d.return,
                                        ne = x;
                                        break e
                                    }
                                    ne = d.return
                                }
                        }
                        var _ = e.current;
                        for (ne = _; ne !== null; ) {
                            y = ne;
                            var L = y.child;
                            if ((y.subtreeFlags & 2064) !== 0 && L !== null)
                                L.return = y,
                                ne = L;
                            else
                                e: for (y = _; ne !== null; ) {
                                    if (F = ne,
                                    (F.flags & 2048) !== 0)
                                        try {
                                            switch (F.tag) {
                                            case 0:
                                            case 11:
                                            case 15:
                                                Jr(9, F)
                                            }
                                        } catch (fe) {
                                            Ft(F, F.return, fe)
                                        }
                                    if (F === y) {
                                        ne = null;
                                        break e
                                    }
                                    var ie = F.sibling;
                                    if (ie !== null) {
                                        ie.return = F.return,
                                        ne = ie;
                                        break e
                                    }
                                    ne = F.return
                                }
                        }
                        if (we = a,
                        $t(),
                        Vt && typeof Vt.onPostCommitFiberRoot == "function")
                            try {
                                Vt.onPostCommitFiberRoot(mi, e)
                            } catch {}
                        i = !0
                    }
                    return i
                } finally {
                    Pe = n,
                    tt.transition = t
                }
            }
            return !1
        }
        function uu(e, t, n) {
            t = Ao(n, t),
            t = Ml(e, t, 1),
            vn(e, t),
            t = St(),
            e = ts(e, 1),
            e !== null && (Fr(e, 1, t),
            Rt(e, t))
        }
        function Ft(e, t, n) {
            if (e.tag === 3)
                uu(e, e, n);
            else
                for (; t !== null; ) {
                    if (t.tag === 3) {
                        uu(t, e, n);
                        break
                    } else if (t.tag === 1) {
                        var i = t.stateNode;
                        if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (Bn === null || !Bn.has(i))) {
                            e = Ao(n, e),
                            e = Sl(t, e, 1),
                            vn(t, e),
                            e = St(),
                            t = ts(t, 1),
                            t !== null && (Fr(t, 1, e),
                            Rt(t, e));
                            break
                        }
                    }
                    t = t.return
                }
        }
        function Ff(e, t, n) {
            var i = e.pingCache;
            i !== null && i.delete(t),
            t = St(),
            e.pingedLanes |= e.suspendedLanes & n,
            rt === e && (dt & n) === n && (ot === 4 || ot === 3 && (dt & 130023424) === dt && 500 > lt() - Go ? bn(e, 0) : Do |= n),
            Rt(e, t)
        }
        function cu(e, t) {
            t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = hi,
            hi <<= 1,
            (hi & 130023424) === 0 && (hi = 4194304)));
            var n = St();
            e = ts(e, t),
            e !== null && (Fr(e, t, n),
            Rt(e, n))
        }
        function _f(e) {
            var t = e.memoizedState
              , n = 0;
            t !== null && (n = t.retryLane),
            cu(e, n)
        }
        function Tf(e, t) {
            var n = 0;
            switch (e.tag) {
            case 13:
                var i = e.stateNode
                  , a = e.memoizedState;
                a !== null && (n = a.retryLane);
                break;
            case 19:
                i = e.stateNode;
                break;
            default:
                throw Error(c(314))
            }
            i !== null && i.delete(t),
            cu(e, n)
        }
        var fu;
        fu = function(e, t, n) {
            if (e !== null)
                if (e.memoizedProps !== t.pendingProps || Se.current)
                    Gt = !0;
                else {
                    if ((e.lanes & n) === 0 && (t.flags & 128) === 0)
                        return Gt = !1,
                        gf(e, t, n);
                    Gt = (e.flags & 131072) !== 0
                }
            else
                Gt = !1,
                Ze && (t.flags & 1048576) !== 0 && Va(t, Ii, t.index);
            switch (t.lanes = 0,
            t.tag) {
            case 2:
                var i = t.type;
                e !== null && (e.alternate = null,
                t.alternate = null,
                t.flags |= 2),
                e = t.pendingProps;
                var a = mt(t, ze.current);
                nr(t, n),
                a = uo(null, t, i, e, a, n);
                var d = co();
                return t.flags |= 1,
                typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1,
                t.memoizedState = null,
                t.updateQueue = null,
                nt(i) ? (d = !0,
                Qe(t)) : d = !1,
                t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null,
                Zs(t),
                a.updater = Mi,
                t.stateNode = a,
                a._reactInternals = t,
                qs(t, i, e, n),
                t = vo(null, t, i, !0, d, n)) : (t.tag = 0,
                Ze && d && $s(t),
                Mt(null, t, a, n),
                t = t.child),
                t;
            case 16:
                i = t.elementType;
                e: {
                    switch (e !== null && (e.alternate = null,
                    t.alternate = null,
                    t.flags |= 2),
                    e = t.pendingProps,
                    a = i._init,
                    i = a(i._payload),
                    t.type = i,
                    a = t.tag = Gf(i),
                    e = Xt(i, e),
                    a) {
                    case 0:
                        t = go(null, t, i, e, n);
                        break e;
                    case 1:
                        t = Ll(null, t, i, e, n);
                        break e;
                    case 11:
                        t = Tl(null, t, i, e, n);
                        break e;
                    case 14:
                        t = Dl(null, t, i, Xt(i.type, e), n);
                        break e
                    }
                    throw Error(c(306, i, ""))
                }
                return t;
            case 0:
                return i = t.type,
                a = t.pendingProps,
                a = t.elementType === i ? a : Xt(i, a),
                go(e, t, i, a, n);
            case 1:
                return i = t.type,
                a = t.pendingProps,
                a = t.elementType === i ? a : Xt(i, a),
                Ll(e, t, i, a, n);
            case 3:
                e: {
                    if (Pl(t),
                    e === null)
                        throw Error(c(387));
                    i = t.pendingProps,
                    d = t.memoizedState,
                    a = d.element,
                    za(e, t),
                    Ei(t, i, null, n);
                    var y = t.memoizedState;
                    if (i = y.element,
                    ht && d.isDehydrated)
                        if (d = {
                            element: i,
                            isDehydrated: !1,
                            cache: y.cache,
                            transitions: y.transitions
                        },
                        t.updateQueue.baseState = d,
                        t.memoizedState = d,
                        t.flags & 256) {
                            a = Error(c(423)),
                            t = Ol(e, t, i, n, a);
                            break e
                        } else if (i !== a) {
                            a = Error(c(424)),
                            t = Ol(e, t, i, n, a);
                            break e
                        } else
                            for (ht && (Dt = di(t.stateNode.containerInfo),
                            Tt = t,
                            Ze = !0,
                            Wt = null,
                            _r = !1),
                            n = rl(t, null, i, n),
                            t.child = n; n; )
                                n.flags = n.flags & -3 | 4096,
                                n = n.sibling;
                    else {
                        if (sr(),
                        i === a) {
                            t = hn(e, t, n);
                            break e
                        }
                        Mt(e, t, i, n)
                    }
                    t = t.child
                }
                return t;
            case 5:
                return il(t),
                e === null && no(t),
                i = t.type,
                a = t.pendingProps,
                d = e !== null ? e.memoizedProps : null,
                y = a.children,
                qe(i, a) ? y = null : d !== null && qe(i, d) && (t.flags |= 32),
                Hl(e, t),
                Mt(e, t, y, n),
                t.child;
            case 6:
                return e === null && no(t),
                null;
            case 13:
                return Nl(e, t, n);
            case 4:
                return io(t, t.stateNode.containerInfo),
                i = t.pendingProps,
                e === null ? t.child = or(t, null, i, n) : Mt(e, t, i, n),
                t.child;
            case 11:
                return i = t.type,
                a = t.pendingProps,
                a = t.elementType === i ? a : Xt(i, a),
                Tl(e, t, i, a, n);
            case 7:
                return Mt(e, t, t.pendingProps, n),
                t.child;
            case 8:
                return Mt(e, t, t.pendingProps.children, n),
                t.child;
            case 12:
                return Mt(e, t, t.pendingProps.children, n),
                t.child;
            case 10:
                e: {
                    if (i = t.type._context,
                    a = t.pendingProps,
                    d = t.memoizedProps,
                    y = a.value,
                    Qa(t, i, y),
                    d !== null)
                        if (qt(d.value, y)) {
                            if (d.children === a.children && !Se.current) {
                                t = hn(e, t, n);
                                break e
                            }
                        } else
                            for (d = t.child,
                            d !== null && (d.return = t); d !== null; ) {
                                var F = d.dependencies;
                                if (F !== null) {
                                    y = d.child;
                                    for (var N = F.firstContext; N !== null; ) {
                                        if (N.context === i) {
                                            if (d.tag === 1) {
                                                N = cn(-1, n & -n),
                                                N.tag = 2;
                                                var V = d.updateQueue;
                                                if (V !== null) {
                                                    V = V.shared;
                                                    var ae = V.pending;
                                                    ae === null ? N.next = N : (N.next = ae.next,
                                                    ae.next = N),
                                                    V.pending = N
                                                }
                                            }
                                            d.lanes |= n,
                                            N = d.alternate,
                                            N !== null && (N.lanes |= n),
                                            Ys(d.return, n, t),
                                            F.lanes |= n;
                                            break
                                        }
                                        N = N.next
                                    }
                                } else if (d.tag === 10)
                                    y = d.type === t.type ? null : d.child;
                                else if (d.tag === 18) {
                                    if (y = d.return,
                                    y === null)
                                        throw Error(c(341));
                                    y.lanes |= n,
                                    F = y.alternate,
                                    F !== null && (F.lanes |= n),
                                    Ys(y, n, t),
                                    y = d.sibling
                                } else
                                    y = d.child;
                                if (y !== null)
                                    y.return = d;
                                else
                                    for (y = d; y !== null; ) {
                                        if (y === t) {
                                            y = null;
                                            break
                                        }
                                        if (d = y.sibling,
                                        d !== null) {
                                            d.return = y.return,
                                            y = d;
                                            break
                                        }
                                        y = y.return
                                    }
                                d = y
                            }
                    Mt(e, t, a.children, n),
                    t = t.child
                }
                return t;
            case 9:
                return a = t.type,
                i = t.pendingProps.children,
                nr(t, n),
                a = Lt(a),
                i = i(a),
                t.flags |= 1,
                Mt(e, t, i, n),
                t.child;
            case 14:
                return i = t.type,
                a = Xt(i, t.pendingProps),
                a = Xt(i.type, a),
                Dl(e, t, i, a, n);
            case 15:
                return Gl(e, t, t.type, t.pendingProps, n);
            case 17:
                return i = t.type,
                a = t.pendingProps,
                a = t.elementType === i ? a : Xt(i, a),
                e !== null && (e.alternate = null,
                t.alternate = null,
                t.flags |= 2),
                t.tag = 1,
                nt(i) ? (e = !0,
                Qe(t)) : e = !1,
                nr(t, n),
                Ya(t, i, a),
                qs(t, i, a, n),
                vo(null, t, i, !0, e, n);
            case 19:
                return Kl(e, t, n);
            case 22:
                return xl(e, t, n)
            }
            throw Error(c(156, t.tag))
        }
        ;
        function du(e, t) {
            return Ks(e, t)
        }
        function Df(e, t, n, i) {
            this.tag = e,
            this.key = n,
            this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
            this.index = 0,
            this.ref = null,
            this.pendingProps = t,
            this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
            this.mode = i,
            this.subtreeFlags = this.flags = 0,
            this.deletions = null,
            this.childLanes = this.lanes = 0,
            this.alternate = null
        }
        function Jt(e, t, n, i) {
            return new Df(e,t,n,i)
        }
        function Uo(e) {
            return e = e.prototype,
            !(!e || !e.isReactComponent)
        }
        function Gf(e) {
            if (typeof e == "function")
                return Uo(e) ? 1 : 0;
            if (e != null) {
                if (e = e.$$typeof,
                e === D)
                    return 11;
                if (e === T)
                    return 14
            }
            return 2
        }
        function Mn(e, t) {
            var n = e.alternate;
            return n === null ? (n = Jt(e.tag, t, e.key, e.mode),
            n.elementType = e.elementType,
            n.type = e.type,
            n.stateNode = e.stateNode,
            n.alternate = e,
            e.alternate = n) : (n.pendingProps = t,
            n.type = e.type,
            n.flags = 0,
            n.subtreeFlags = 0,
            n.deletions = null),
            n.flags = e.flags & 14680064,
            n.childLanes = e.childLanes,
            n.lanes = e.lanes,
            n.child = e.child,
            n.memoizedProps = e.memoizedProps,
            n.memoizedState = e.memoizedState,
            n.updateQueue = e.updateQueue,
            t = e.dependencies,
            n.dependencies = t === null ? null : {
                lanes: t.lanes,
                firstContext: t.firstContext
            },
            n.sibling = e.sibling,
            n.index = e.index,
            n.ref = e.ref,
            n
        }
        function rs(e, t, n, i, a, d) {
            var y = 2;
            if (i = e,
            typeof e == "function")
                Uo(e) && (y = 1);
            else if (typeof e == "string")
                y = 5;
            else
                e: switch (e) {
                case h:
                    return Wn(n.children, a, d, t);
                case A:
                    y = 8,
                    a |= 8;
                    break;
                case B:
                    return e = Jt(12, n, t, a | 2),
                    e.elementType = B,
                    e.lanes = d,
                    e;
                case w:
                    return e = Jt(13, n, t, a),
                    e.elementType = w,
                    e.lanes = d,
                    e;
                case I:
                    return e = Jt(19, n, t, a),
                    e.elementType = I,
                    e.lanes = d,
                    e;
                case U:
                    return is(n, a, d, t);
                default:
                    if (typeof e == "object" && e !== null)
                        switch (e.$$typeof) {
                        case E:
                            y = 10;
                            break e;
                        case M:
                            y = 9;
                            break e;
                        case D:
                            y = 11;
                            break e;
                        case T:
                            y = 14;
                            break e;
                        case R:
                            y = 16,
                            i = null;
                            break e
                        }
                    throw Error(c(130, e == null ? e : typeof e, ""))
                }
            return t = Jt(y, n, t, a),
            t.elementType = e,
            t.type = i,
            t.lanes = d,
            t
        }
        function Wn(e, t, n, i) {
            return e = Jt(7, e, i, t),
            e.lanes = n,
            e
        }
        function is(e, t, n, i) {
            return e = Jt(22, e, i, t),
            e.elementType = U,
            e.lanes = n,
            e.stateNode = {},
            e
        }
        function Jo(e, t, n) {
            return e = Jt(6, e, null, t),
            e.lanes = n,
            e
        }
        function Ko(e, t, n) {
            return t = Jt(4, e.children !== null ? e.children : [], e.key, t),
            t.lanes = n,
            t.stateNode = {
                containerInfo: e.containerInfo,
                pendingChildren: null,
                implementation: e.implementation
            },
            t
        }
        function xf(e, t, n, i, a) {
            this.tag = t,
            this.containerInfo = e,
            this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
            this.timeoutHandle = Sr,
            this.callbackNode = this.pendingContext = this.context = null,
            this.callbackPriority = 0,
            this.eventTimes = Us(0),
            this.expirationTimes = Us(-1),
            this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
            this.entanglements = Us(0),
            this.identifierPrefix = i,
            this.onRecoverableError = a,
            ht && (this.mutableSourceEagerHydrationData = null)
        }
        function pu(e, t, n, i, a, d, y, F, N) {
            return e = new xf(e,t,n,F,N),
            t === 1 ? (t = 1,
            d === !0 && (t |= 8)) : t = 0,
            d = Jt(3, null, null, t),
            e.current = d,
            d.stateNode = e,
            d.memoizedState = {
                element: i,
                isDehydrated: n,
                cache: null,
                transitions: null
            },
            Zs(d),
            e
        }
        function hu(e) {
            if (!e)
                return De;
            e = e._reactInternals;
            e: {
                if (z(e) !== e || e.tag !== 1)
                    throw Error(c(170));
                var t = e;
                do {
                    switch (t.tag) {
                    case 3:
                        t = t.stateNode.context;
                        break e;
                    case 1:
                        if (nt(t.type)) {
                            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                            break e
                        }
                    }
                    t = t.return
                } while (t !== null);
                throw Error(c(171))
            }
            if (e.tag === 1) {
                var n = e.type;
                if (nt(n))
                    return st(e, n, t)
            }
            return t
        }
        function Au(e) {
            var t = e._reactInternals;
            if (t === void 0)
                throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","),
                Error(c(268, e)));
            return e = ue(t),
            e === null ? null : e.stateNode
        }
        function mu(e, t) {
            if (e = e.memoizedState,
            e !== null && e.dehydrated !== null) {
                var n = e.retryLane;
                e.retryLane = n !== 0 && n < t ? n : t
            }
        }
        function Qo(e, t) {
            mu(e, t),
            (e = e.alternate) && mu(e, t)
        }
        function Hf(e) {
            return e = ue(e),
            e === null ? null : e.stateNode
        }
        function Lf() {
            return null
        }
        return s.attemptContinuousHydration = function(e) {
            if (e.tag === 13) {
                var t = St();
                Ut(e, 134217728, t),
                Qo(e, 134217728)
            }
        }
        ,
        s.attemptHydrationAtCurrentPriority = function(e) {
            if (e.tag === 13) {
                var t = St()
                  , n = yn(e);
                Ut(e, n, t),
                Qo(e, n)
            }
        }
        ,
        s.attemptSynchronousHydration = function(e) {
            switch (e.tag) {
            case 3:
                var t = e.stateNode;
                if (t.current.memoizedState.isDehydrated) {
                    var n = Rr(t.pendingLanes);
                    n !== 0 && (Js(t, n | 1),
                    Rt(t, lt()),
                    (we & 6) === 0 && (dr(),
                    $t()))
                }
                break;
            case 13:
                var i = St();
                iu(function() {
                    return Ut(e, 1, i)
                }),
                Qo(e, 1)
            }
        }
        ,
        s.batchedUpdates = function(e, t) {
            var n = we;
            we |= 1;
            try {
                return e(t)
            } finally {
                we = n,
                we === 0 && (dr(),
                gi && $t())
            }
        }
        ,
        s.createComponentSelector = function(e) {
            return {
                $$typeof: Qi,
                value: e
            }
        }
        ,
        s.createContainer = function(e, t, n, i, a, d, y) {
            return pu(e, t, !1, null, n, i, a, d, y)
        }
        ,
        s.createHasPseudoClassSelector = function(e) {
            return {
                $$typeof: zi,
                value: e
            }
        }
        ,
        s.createHydrationContainer = function(e, t, n, i, a, d, y, F, N) {
            return e = pu(n, i, !0, e, a, d, y, F, N),
            e.context = hu(null),
            n = e.current,
            i = St(),
            a = yn(n),
            d = cn(i, a),
            d.callback = t ?? null,
            vn(n, d),
            e.current.lanes = a,
            Fr(e, a, i),
            Rt(e, i),
            e
        }
        ,
        s.createPortal = function(e, t, n) {
            var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
            return {
                $$typeof: v,
                key: i == null ? null : "" + i,
                children: e,
                containerInfo: t,
                implementation: n
            }
        }
        ,
        s.createRoleSelector = function(e) {
            return {
                $$typeof: bi,
                value: e
            }
        }
        ,
        s.createTestNameSelector = function(e) {
            return {
                $$typeof: ji,
                value: e
            }
        }
        ,
        s.createTextSelector = function(e) {
            return {
                $$typeof: Xi,
                value: e
            }
        }
        ,
        s.deferredUpdates = function(e) {
            var t = Pe
              , n = tt.transition;
            try {
                return tt.transition = null,
                Pe = 16,
                e()
            } finally {
                Pe = t,
                tt.transition = n
            }
        }
        ,
        s.discreteUpdates = function(e, t, n, i, a) {
            var d = Pe
              , y = tt.transition;
            try {
                return tt.transition = null,
                Pe = 1,
                e(t, n, i, a)
            } finally {
                Pe = d,
                tt.transition = y,
                we === 0 && dr()
            }
        }
        ,
        s.findAllNodes = _o,
        s.findBoundingRects = function(e, t) {
            if (!Hn)
                throw Error(c(363));
            t = _o(e, t),
            e = [];
            for (var n = 0; n < t.length; n++)
                e.push(Is(t[n]));
            for (t = e.length - 1; 0 < t; t--) {
                n = e[t];
                for (var i = n.x, a = i + n.width, d = n.y, y = d + n.height, F = t - 1; 0 <= F; F--)
                    if (t !== F) {
                        var N = e[F]
                          , V = N.x
                          , ae = V + N.width
                          , Be = N.y
                          , he = Be + N.height;
                        if (i >= V && d >= Be && a <= ae && y <= he) {
                            e.splice(t, 1);
                            break
                        } else if (i !== V || n.width !== N.width || he < d || Be > y) {
                            if (!(d !== Be || n.height !== N.height || ae < i || V > a)) {
                                V > i && (N.width += V - i,
                                N.x = i),
                                ae < a && (N.width = a - V),
                                e.splice(t, 1);
                                break
                            }
                        } else {
                            Be > d && (N.height += Be - d,
                            N.y = d),
                            he < y && (N.height = y - Be),
                            e.splice(t, 1);
                            break
                        }
                    }
            }
            return e
        }
        ,
        s.findHostInstance = Au,
        s.findHostInstanceWithNoPortals = function(e) {
            return e = J(e),
            e = e !== null ? _e(e) : null,
            e === null ? null : e.stateNode
        }
        ,
        s.findHostInstanceWithWarning = function(e) {
            return Au(e)
        }
        ,
        s.flushControlled = function(e) {
            var t = we;
            we |= 1;
            var n = tt.transition
              , i = Pe;
            try {
                tt.transition = null,
                Pe = 1,
                e()
            } finally {
                Pe = i,
                tt.transition = n,
                we = t,
                we === 0 && (dr(),
                $t())
            }
        }
        ,
        s.flushPassiveEffects = Xn,
        s.flushSync = iu,
        s.focusWithin = function(e, t) {
            if (!Hn)
                throw Error(c(363));
            for (e = wo(e),
            t = tu(e, t),
            t = Array.from(t),
            e = 0; e < t.length; ) {
                var n = t[e++];
                if (!Ln(n)) {
                    if (n.tag === 5 && ws(n.stateNode))
                        return !0;
                    for (n = n.child; n !== null; )
                        t.push(n),
                        n = n.sibling
                }
            }
            return !1
        }
        ,
        s.getCurrentUpdatePriority = function() {
            return Pe
        }
        ,
        s.getFindAllNodesFailureDescription = function(e, t) {
            if (!Hn)
                throw Error(c(363));
            var n = 0
              , i = [];
            e = [wo(e), 0];
            for (var a = 0; a < e.length; ) {
                var d = e[a++]
                  , y = e[a++]
                  , F = t[y];
                if ((d.tag !== 5 || !Ln(d)) && (Ro(d, F) && (i.push(Fo(F)),
                y++,
                y > n && (n = y)),
                y < t.length))
                    for (d = d.child; d !== null; )
                        e.push(d, y),
                        d = d.sibling
            }
            if (n < t.length) {
                for (e = []; n < t.length; n++)
                    e.push(Fo(t[n]));
                return `findAllNodes was able to match part of the selector:
  ` + (i.join(" > ") + `

No matching component was found for:
  `) + e.join(" > ")
            }
            return null
        }
        ,
        s.getPublicRootInstance = function(e) {
            if (e = e.current,
            !e.child)
                return null;
            switch (e.child.tag) {
            case 5:
                return He(e.child.stateNode);
            default:
                return e.child.stateNode
            }
        }
        ,
        s.injectIntoDevTools = function(e) {
            if (e = {
                bundleType: e.bundleType,
                version: e.version,
                rendererPackageName: e.rendererPackageName,
                rendererConfig: e.rendererConfig,
                overrideHookState: null,
                overrideHookStateDeletePath: null,
                overrideHookStateRenamePath: null,
                overrideProps: null,
                overridePropsDeletePath: null,
                overridePropsRenamePath: null,
                setErrorHandler: null,
                setSuspenseHandler: null,
                scheduleUpdate: null,
                currentDispatcherRef: g.ReactCurrentDispatcher,
                findHostInstanceByFiber: Hf,
                findFiberByHostInstance: e.findFiberByHostInstance || Lf,
                findHostInstancesForRefresh: null,
                scheduleRefresh: null,
                scheduleRoot: null,
                setRefreshHandler: null,
                getCurrentFiber: null,
                reconcilerVersion: "18.0.0-fc46dba67-20220329"
            },
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
                e = !1;
            else {
                var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
                if (t.isDisabled || !t.supportsFiber)
                    e = !0;
                else {
                    try {
                        mi = t.inject(e),
                        Vt = t
                    } catch {}
                    e = !!t.checkDCE
                }
            }
            return e
        }
        ,
        s.isAlreadyRendering = function() {
            return !1
        }
        ,
        s.observeVisibleRects = function(e, t, n, i) {
            if (!Hn)
                throw Error(c(363));
            e = _o(e, t);
            var a = Rs(e, n, i).disconnect;
            return {
                disconnect: function() {
                    a()
                }
            }
        }
        ,
        s.registerMutableSourceForHydration = function(e, t) {
            var n = t._getVersion;
            n = n(t._source),
            e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, n] : e.mutableSourceEagerHydrationData.push(t, n)
        }
        ,
        s.runWithPriority = function(e, t) {
            var n = Pe;
            try {
                return Pe = e,
                t()
            } finally {
                Pe = n
            }
        }
        ,
        s.shouldError = function() {
            return null
        }
        ,
        s.shouldSuspend = function() {
            return !1
        }
        ,
        s.updateContainer = function(e, t, n, i) {
            var a = t.current
              , d = St()
              , y = yn(a);
            return n = hu(n),
            t.context === null ? t.context = n : t.pendingContext = n,
            t = cn(d, y),
            t.payload = {
                element: e
            },
            i = i === void 0 ? null : i,
            i !== null && (t.callback = i),
            vn(a, t),
            e = Ut(a, y, d),
            e !== null && yi(e, a, y),
            y
        }
        ,
        s
    }
    ),
    Vo
}
var Iu;
function Xd() {
    return Iu || (Iu = 1,
    Wo.exports = jd()),
    Wo.exports
}
var Wd = Xd();
const Yd = cc(Wd);
var qo = {
    exports: {}
}
  , $o = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wu;
function Zd() {
    return wu || (wu = 1,
    function(o) {
        function r(G, j) {
            var K = G.length;
            G.push(j);
            e: for (; 0 < K; ) {
                var re = K - 1 >>> 1
                  , le = G[re];
                if (0 < l(le, j))
                    G[re] = j,
                    G[K] = le,
                    K = re;
                else
                    break e
            }
        }
        function s(G) {
            return G.length === 0 ? null : G[0]
        }
        function u(G) {
            if (G.length === 0)
                return null;
            var j = G[0]
              , K = G.pop();
            if (K !== j) {
                G[0] = K;
                e: for (var re = 0, le = G.length, ye = le >>> 1; re < ye; ) {
                    var Ue = 2 * (re + 1) - 1
                      , qe = G[Ue]
                      , me = Ue + 1
                      , $e = G[me];
                    if (0 > l(qe, K))
                        me < le && 0 > l($e, qe) ? (G[re] = $e,
                        G[me] = K,
                        re = me) : (G[re] = qe,
                        G[Ue] = K,
                        re = Ue);
                    else if (me < le && 0 > l($e, K))
                        G[re] = $e,
                        G[me] = K,
                        re = me;
                    else
                        break e
                }
            }
            return j
        }
        function l(G, j) {
            var K = G.sortIndex - j.sortIndex;
            return K !== 0 ? K : G.id - j.id
        }
        if (typeof performance == "object" && typeof performance.now == "function") {
            var f = performance;
            o.unstable_now = function() {
                return f.now()
            }
        } else {
            var c = Date
              , g = c.now();
            o.unstable_now = function() {
                return c.now() - g
            }
        }
        var p = []
          , v = []
          , h = 1
          , A = null
          , B = 3
          , E = !1
          , M = !1
          , D = !1
          , w = typeof setTimeout == "function" ? setTimeout : null
          , I = typeof clearTimeout == "function" ? clearTimeout : null
          , T = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function R(G) {
            for (var j = s(v); j !== null; ) {
                if (j.callback === null)
                    u(v);
                else if (j.startTime <= G)
                    u(v),
                    j.sortIndex = j.expirationTime,
                    r(p, j);
                else
                    break;
                j = s(v)
            }
        }
        function U(G) {
            if (D = !1,
            R(G),
            !M)
                if (s(p) !== null)
                    M = !0,
                    He(b);
                else {
                    var j = s(v);
                    j !== null && ke(U, j.startTime - G)
                }
        }
        function b(G, j) {
            M = !1,
            D && (D = !1,
            I(X),
            X = -1),
            E = !0;
            var K = B;
            try {
                for (R(j),
                A = s(p); A !== null && (!(A.expirationTime > j) || G && !J()); ) {
                    var re = A.callback;
                    if (typeof re == "function") {
                        A.callback = null,
                        B = A.priorityLevel;
                        var le = re(A.expirationTime <= j);
                        j = o.unstable_now(),
                        typeof le == "function" ? A.callback = le : A === s(p) && u(p),
                        R(j)
                    } else
                        u(p);
                    A = s(p)
                }
                if (A !== null)
                    var ye = !0;
                else {
                    var Ue = s(v);
                    Ue !== null && ke(U, Ue.startTime - j),
                    ye = !1
                }
                return ye
            } finally {
                A = null,
                B = K,
                E = !1
            }
        }
        var k = !1
          , Y = null
          , X = -1
          , z = 5
          , oe = -1;
        function J() {
            return !(o.unstable_now() - oe < z)
        }
        function ue() {
            if (Y !== null) {
                var G = o.unstable_now();
                oe = G;
                var j = !0;
                try {
                    j = Y(!0, G)
                } finally {
                    j ? Ae() : (k = !1,
                    Y = null)
                }
            } else
                k = !1
        }
        var Ae;
        if (typeof T == "function")
            Ae = function() {
                T(ue)
            }
            ;
        else if (typeof MessageChannel < "u") {
            var _e = new MessageChannel
              , Re = _e.port2;
            _e.port1.onmessage = ue,
            Ae = function() {
                Re.postMessage(null)
            }
        } else
            Ae = function() {
                w(ue, 0)
            }
            ;
        function He(G) {
            Y = G,
            k || (k = !0,
            Ae())
        }
        function ke(G, j) {
            X = w(function() {
                G(o.unstable_now())
            }, j)
        }
        o.unstable_IdlePriority = 5,
        o.unstable_ImmediatePriority = 1,
        o.unstable_LowPriority = 4,
        o.unstable_NormalPriority = 3,
        o.unstable_Profiling = null,
        o.unstable_UserBlockingPriority = 2,
        o.unstable_cancelCallback = function(G) {
            G.callback = null
        }
        ,
        o.unstable_continueExecution = function() {
            M || E || (M = !0,
            He(b))
        }
        ,
        o.unstable_forceFrameRate = function(G) {
            0 > G || 125 < G ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : z = 0 < G ? Math.floor(1e3 / G) : 5
        }
        ,
        o.unstable_getCurrentPriorityLevel = function() {
            return B
        }
        ,
        o.unstable_getFirstCallbackNode = function() {
            return s(p)
        }
        ,
        o.unstable_next = function(G) {
            switch (B) {
            case 1:
            case 2:
            case 3:
                var j = 3;
                break;
            default:
                j = B
            }
            var K = B;
            B = j;
            try {
                return G()
            } finally {
                B = K
            }
        }
        ,
        o.unstable_pauseExecution = function() {}
        ,
        o.unstable_requestPaint = function() {}
        ,
        o.unstable_runWithPriority = function(G, j) {
            switch (G) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                G = 3
            }
            var K = B;
            B = G;
            try {
                return j()
            } finally {
                B = K
            }
        }
        ,
        o.unstable_scheduleCallback = function(G, j, K) {
            var re = o.unstable_now();
            switch (typeof K == "object" && K !== null ? (K = K.delay,
            K = typeof K == "number" && 0 < K ? re + K : re) : K = re,
            G) {
            case 1:
                var le = -1;
                break;
            case 2:
                le = 250;
                break;
            case 5:
                le = 1073741823;
                break;
            case 4:
                le = 1e4;
                break;
            default:
                le = 5e3
            }
            return le = K + le,
            G = {
                id: h++,
                callback: j,
                priorityLevel: G,
                startTime: K,
                expirationTime: le,
                sortIndex: -1
            },
            K > re ? (G.sortIndex = K,
            r(v, G),
            s(p) === null && G === s(v) && (D ? (I(X),
            X = -1) : D = !0,
            ke(U, K - re))) : (G.sortIndex = le,
            r(p, G),
            M || E || (M = !0,
            He(b))),
            G
        }
        ,
        o.unstable_shouldYield = J,
        o.unstable_wrapCallback = function(G) {
            var j = B;
            return function() {
                var K = B;
                B = j;
                try {
                    return G.apply(this, arguments)
                } finally {
                    B = K
                }
            }
        }
    }($o)),
    $o
}
var Ru;
function Vd() {
    return Ru || (Ru = 1,
    qo.exports = Zd()),
    qo.exports
}
var Fu = Vd();
const qd = o => typeof o == "object" && typeof o.then == "function"
  , Zn = [];
function dc(o, r, s= (u, l) => u === l) {
    if (o === r)
        return !0;
    if (!o || !r)
        return !1;
    const u = o.length;
    if (r.length !== u)
        return !1;
    for (let l = 0; l < u; l++)
        if (!s(o[l], r[l]))
            return !1;
    return !0
}
function pc(o, r=null, s=!1, u={}) {
    r === null && (r = [o]);
    for (const f of Zn)
        if (dc(r, f.keys, f.equal)) {
            if (s)
                return;
            if (Object.prototype.hasOwnProperty.call(f, "error"))
                throw f.error;
            if (Object.prototype.hasOwnProperty.call(f, "response"))
                return u.lifespan && u.lifespan > 0 && (f.timeout && clearTimeout(f.timeout),
                f.timeout = setTimeout(f.remove, u.lifespan)),
                f.response;
            if (!s)
                throw f.promise
        }
    const l = {
        keys: r,
        equal: u.equal,
        remove: () => {
            const f = Zn.indexOf(l);
            f !== -1 && Zn.splice(f, 1)
        }
        ,
        promise: (qd(o) ? o : o(...r)).then(f => {
            l.response = f,
            u.lifespan && u.lifespan > 0 && (l.timeout = setTimeout(l.remove, u.lifespan))
        }
        ).catch(f => l.error = f)
    };
    if (Zn.push(l),
    !s)
        throw l.promise
}
const $d = (o, r, s) => pc(o, r, !1, s)
  , ep = (o, r, s) => void pc(o, r, !0, s)
  , tp = o => {
    if (o === void 0 || o.length === 0)
        Zn.splice(0, Zn.length);
    else {
        const r = Zn.find(s => dc(o, s.keys, s.equal));
        r && r.remove()
    }
}
  , Da = {}
  , hc = o => void Object.assign(Da, o);
function np(o, r) {
    function s(h, {args: A=[], attach: B, ...E}, M) {
        let D = `${h[0].toUpperCase()}${h.slice(1)}`, w;
        if (h === "primitive") {
            if (E.object === void 0)
                throw new Error("R3F: Primitives without 'object' are invalid!");
            const I = E.object;
            w = hr(I, {
                type: h,
                root: M,
                attach: B,
                primitive: !0
            })
        } else {
            const I = Da[D];
            if (!I)
                throw new Error(`R3F: ${D} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);
            if (!Array.isArray(A))
                throw new Error("R3F: The args prop must be an array!");
            w = hr(new I(...A), {
                type: h,
                root: M,
                attach: B,
                memoizedProps: {
                    args: A
                }
            })
        }
        return w.__r3f.attach === void 0 && (w instanceof Ra ? w.__r3f.attach = "geometry" : w instanceof ds && (w.__r3f.attach = "material")),
        D !== "inject" && na(w, E),
        w
    }
    function u(h, A) {
        let B = !1;
        if (A) {
            var E, M;
            (E = A.__r3f) != null && E.attach ? ta(h, A, A.__r3f.attach) : A.isObject3D && h.isObject3D && (h.add(A),
            B = !0),
            B || (M = h.__r3f) == null || M.objects.push(A),
            A.__r3f || hr(A, {}),
            A.__r3f.parent = h,
            ya(A),
            Ar(A)
        }
    }
    function l(h, A, B) {
        let E = !1;
        if (A) {
            var M, D;
            if ((M = A.__r3f) != null && M.attach)
                ta(h, A, A.__r3f.attach);
            else if (A.isObject3D && h.isObject3D) {
                A.parent = h,
                A.dispatchEvent({
                    type: "added"
                }),
                h.dispatchEvent({
                    type: "childadded",
                    child: A
                });
                const w = h.children.filter(T => T !== A)
                  , I = w.indexOf(B);
                h.children = [...w.slice(0, I), A, ...w.slice(I)],
                E = !0
            }
            E || (D = h.__r3f) == null || D.objects.push(A),
            A.__r3f || hr(A, {}),
            A.__r3f.parent = h,
            ya(A),
            Ar(A)
        }
    }
    function f(h, A, B=!1) {
        h && [...h].forEach(E => c(A, E, B))
    }
    function c(h, A, B) {
        if (A) {
            var E, M, D;
            if (A.__r3f && (A.__r3f.parent = null),
            (E = h.__r3f) != null && E.objects && (h.__r3f.objects = h.__r3f.objects.filter(U => U !== A)),
            (M = A.__r3f) != null && M.attach)
                xu(h, A, A.__r3f.attach);
            else if (A.isObject3D && h.isObject3D) {
                var w;
                h.remove(A),
                (w = A.__r3f) != null && w.root && up(ps(A), A)
            }
            const T = (D = A.__r3f) == null ? void 0 : D.primitive
              , R = !T && (B === void 0 ? A.dispose !== null : B);
            if (!T) {
                var I;
                f((I = A.__r3f) == null ? void 0 : I.objects, A, R),
                f(A.children, A, R)
            }
            if (delete A.__r3f,
            R && A.dispose && A.type !== "Scene") {
                const U = () => {
                    try {
                        A.dispose()
                    } catch {}
                }
                ;
                typeof IS_REACT_ACT_ENVIRONMENT > "u" ? Fu.unstable_scheduleCallback(Fu.unstable_IdlePriority, U) : U()
            }
            Ar(h)
        }
    }
    function g(h, A, B, E) {
        var M;
        const D = (M = h.__r3f) == null ? void 0 : M.parent;
        if (!D)
            return;
        const w = s(A, B, h.__r3f.root);
        if (h.children) {
            for (const I of h.children)
                I.__r3f && u(w, I);
            h.children = h.children.filter(I => !I.__r3f)
        }
        h.__r3f.objects.forEach(I => u(w, I)),
        h.__r3f.objects = [],
        h.__r3f.autoRemovedBeforeAppend || c(D, h),
        w.parent && (w.__r3f.autoRemovedBeforeAppend = !0),
        u(D, w),
        w.raycast && w.__r3f.eventCount && ps(w).getState().internal.interaction.push(w),
        [E, E.alternate].forEach(I => {
            I !== null && (I.stateNode = w,
            I.ref && (typeof I.ref == "function" ? I.ref(w) : I.ref.current = w))
        }
        )
    }
    const p = () => console.warn("Text is not allowed in the R3F tree! This could be stray whitespace or characters.");
    return {
        reconciler: Yd({
            createInstance: s,
            removeChild: c,
            appendChild: u,
            appendInitialChild: u,
            insertBefore: l,
            supportsMutation: !0,
            isPrimaryRenderer: !1,
            supportsPersistence: !1,
            supportsHydration: !1,
            noTimeout: -1,
            appendChildToContainer: (h, A) => {
                if (!A)
                    return;
                const B = h.getState().scene;
                B.__r3f && (B.__r3f.root = h,
                u(B, A))
            }
            ,
            removeChildFromContainer: (h, A) => {
                A && c(h.getState().scene, A)
            }
            ,
            insertInContainerBefore: (h, A, B) => {
                if (!A || !B)
                    return;
                const E = h.getState().scene;
                E.__r3f && l(E, A, B)
            }
            ,
            getRootHostContext: () => null,
            getChildHostContext: h => h,
            finalizeInitialChildren(h) {
                var A;
                return !!((A = h?.__r3f) != null ? A : {}).handlers
            },
            prepareUpdate(h, A, B, E) {
                var M;
                if (((M = h?.__r3f) != null ? M : {}).primitive && E.object && E.object !== h)
                    return [!0];
                {
                    const {args: w=[], children: I, ...T} = E
                      , {args: R=[], children: U, ...b} = B;
                    if (!Array.isArray(w))
                        throw new Error("R3F: the args prop must be an array!");
                    if (w.some( (Y, X) => Y !== R[X]))
                        return [!0];
                    const k = yc(h, T, b, !0);
                    return k.changes.length ? [!1, k] : null
                }
            },
            commitUpdate(h, [A,B], E, M, D, w) {
                A ? g(h, E, D, w) : na(h, B)
            },
            commitMount(h, A, B, E) {
                var M;
                const D = (M = h.__r3f) != null ? M : {};
                h.raycast && D.handlers && D.eventCount && ps(h).getState().internal.interaction.push(h)
            },
            getPublicInstance: h => h,
            prepareForCommit: () => null,
            preparePortalMount: h => hr(h.getState().scene),
            resetAfterCommit: () => {}
            ,
            shouldSetTextContent: () => !1,
            clearContainer: () => !1,
            hideInstance(h) {
                var A;
                const {attach: B, parent: E} = (A = h.__r3f) != null ? A : {};
                B && E && xu(E, h, B),
                h.isObject3D && (h.visible = !1),
                Ar(h)
            },
            unhideInstance(h, A) {
                var B;
                const {attach: E, parent: M} = (B = h.__r3f) != null ? B : {};
                E && M && ta(M, h, E),
                (h.isObject3D && A.visible == null || A.visible) && (h.visible = !0),
                Ar(h)
            },
            createTextInstance: p,
            hideTextInstance: p,
            unhideTextInstance: p,
            getCurrentEventPriority: () => r ? r() : vr.DefaultEventPriority,
            beforeActiveInstanceBlur: () => {}
            ,
            afterActiveInstanceBlur: () => {}
            ,
            detachDeletedInstance: () => {}
            ,
            now: typeof performance < "u" && Xe.fun(performance.now) ? performance.now : Xe.fun(Date.now) ? Date.now : () => 0,
            scheduleTimeout: Xe.fun(setTimeout) ? setTimeout : void 0,
            cancelTimeout: Xe.fun(clearTimeout) ? clearTimeout : void 0
        }),
        applyProps: na
    }
}
var _u, Tu;
const ea = o => "colorSpace"in o || "outputColorSpace"in o
  , Ac = () => {
    var o;
    return (o = Da.ColorManagement) != null ? o : null
}
  , mc = o => o && o.isOrthographicCamera
  , rp = o => o && o.hasOwnProperty("current")
  , ei = typeof window < "u" && ((_u = window.document) != null && _u.createElement || ((Tu = window.navigator) == null ? void 0 : Tu.product) === "ReactNative") ? Q.useLayoutEffect : Q.useEffect;
function gc(o) {
    const r = Q.useRef(o);
    return ei( () => void (r.current = o), [o]),
    r
}
function ip({set: o}) {
    return ei( () => (o(new Promise( () => null)),
    () => o(!1)), [o]),
    null
}
class vc extends Q.Component {
    constructor(...r) {
        super(...r),
        this.state = {
            error: !1
        }
    }
    componentDidCatch(r) {
        this.props.set(r)
    }
    render() {
        return this.state.error ? null : this.props.children
    }
}
vc.getDerivedStateFromError = () => ({
    error: !0
});
const Bc = "__default"
  , Du = new Map
  , sp = o => o && !!o.memoized && !!o.changes;
function Cc(o) {
    var r;
    const s = typeof window < "u" ? (r = window.devicePixelRatio) != null ? r : 2 : 1;
    return Array.isArray(o) ? Math.min(Math.max(o[0], s), o[1]) : o
}
const jr = o => {
    var r;
    return (r = o.__r3f) == null ? void 0 : r.root.getState()
}
;
function ps(o) {
    let r = o.__r3f.root;
    for (; r.getState().previousRoot; )
        r = r.getState().previousRoot;
    return r
}
const Xe = {
    obj: o => o === Object(o) && !Xe.arr(o) && typeof o != "function",
    fun: o => typeof o == "function",
    str: o => typeof o == "string",
    num: o => typeof o == "number",
    boo: o => typeof o == "boolean",
    und: o => o === void 0,
    arr: o => Array.isArray(o),
    equ(o, r, {arrays: s="shallow", objects: u="reference", strict: l=!0}={}) {
        if (typeof o != typeof r || !!o != !!r)
            return !1;
        if (Xe.str(o) || Xe.num(o))
            return o === r;
        const f = Xe.obj(o);
        if (f && u === "reference")
            return o === r;
        const c = Xe.arr(o);
        if (c && s === "reference")
            return o === r;
        if ((c || f) && o === r)
            return !0;
        let g;
        for (g in o)
            if (!(g in r))
                return !1;
        if (f && s === "shallow" && u === "shallow") {
            for (g in l ? r : o)
                if (!Xe.equ(o[g], r[g], {
                    strict: l,
                    objects: "reference"
                }))
                    return !1
        } else
            for (g in l ? r : o)
                if (o[g] !== r[g])
                    return !1;
        if (Xe.und(g)) {
            if (c && o.length === 0 && r.length === 0 || f && Object.keys(o).length === 0 && Object.keys(r).length === 0)
                return !0;
            if (o !== r)
                return !1
        }
        return !0
    }
};
function op(o) {
    const r = {
        nodes: {},
        materials: {}
    };
    return o && o.traverse(s => {
        s.name && (r.nodes[s.name] = s),
        s.material && !r.materials[s.material.name] && (r.materials[s.material.name] = s.material)
    }
    ),
    r
}
function ap(o) {
    o.dispose && o.type !== "Scene" && o.dispose();
    for (const r in o)
        r.dispose == null || r.dispose(),
        delete o[r]
}
function hr(o, r) {
    const s = o;
    return s.__r3f = {
        type: "",
        root: null,
        previousAttach: null,
        memoizedProps: {},
        eventCount: 0,
        handlers: {},
        objects: [],
        parent: null,
        ...r
    },
    o
}
function Ca(o, r) {
    let s = o;
    if (r.includes("-")) {
        const u = r.split("-")
          , l = u.pop();
        return s = u.reduce( (f, c) => f[c], o),
        {
            target: s,
            key: l
        }
    } else
        return {
            target: s,
            key: r
        }
}
const Gu = /-\d+$/;
function ta(o, r, s) {
    if (Xe.str(s)) {
        if (Gu.test(s)) {
            const f = s.replace(Gu, "")
              , {target: c, key: g} = Ca(o, f);
            Array.isArray(c[g]) || (c[g] = [])
        }
        const {target: u, key: l} = Ca(o, s);
        r.__r3f.previousAttach = u[l],
        u[l] = r
    } else
        r.__r3f.previousAttach = s(o, r)
}
function xu(o, r, s) {
    var u, l;
    if (Xe.str(s)) {
        const {target: f, key: c} = Ca(o, s)
          , g = r.__r3f.previousAttach;
        g === void 0 ? delete f[c] : f[c] = g
    } else
        (u = r.__r3f) == null || u.previousAttach == null || u.previousAttach(o, r);
    (l = r.__r3f) == null || delete l.previousAttach
}
function yc(o, {children: r, key: s, ref: u, ...l}, {children: f, key: c, ref: g, ...p}={}, v=!1) {
    var h;
    const A = (h = o?.__r3f) != null ? h : {}
      , B = Object.entries(l)
      , E = [];
    if (v) {
        const D = Object.keys(p);
        for (let w = 0; w < D.length; w++)
            l.hasOwnProperty(D[w]) || B.unshift([D[w], Bc + "remove"])
    }
    B.forEach( ([D,w]) => {
        var I;
        if ((I = o.__r3f) != null && I.primitive && D === "object" || Xe.equ(w, p[D]))
            return;
        if (/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/.test(D))
            return E.push([D, w, !0, []]);
        let T = [];
        D.includes("-") && (T = D.split("-")),
        E.push([D, w, !1, T]);
        for (const R in l) {
            const U = l[R];
            R.startsWith(`${D}-`) && E.push([R, U, !1, R.split("-")])
        }
    }
    );
    const M = {
        ...l
    };
    return A.memoizedProps && A.memoizedProps.args && (M.args = A.memoizedProps.args),
    A.memoizedProps && A.memoizedProps.attach && (M.attach = A.memoizedProps.attach),
    {
        memoized: M,
        changes: E
    }
}
function na(o, r) {
    var s, u, l;
    const f = (s = o.__r3f) != null ? s : {}
      , c = f.root
      , g = (u = c == null || c.getState == null ? void 0 : c.getState()) != null ? u : {}
      , {memoized: p, changes: v} = sp(r) ? r : yc(o, r)
      , h = f.eventCount;
    o.__r3f && (o.__r3f.memoizedProps = p);
    for (let B = 0; B < v.length; B++) {
        let[E,M,D,w] = v[B];
        if (ea(o)) {
            const U = "srgb"
              , b = "srgb-linear";
            E === "encoding" ? (E = "colorSpace",
            M = M === 3001 ? U : b) : E === "outputEncoding" && (E = "outputColorSpace",
            M = M === 3001 ? U : b)
        }
        let I = o
          , T = I[E];
        if (w.length && (T = w.reduce( (R, U) => R[U], o),
        !(T && T.set))) {
            const [R,...U] = w.reverse();
            I = U.reverse().reduce( (b, k) => b[k], o),
            E = R
        }
        if (M === Bc + "remove")
            if (I.constructor) {
                let R = Du.get(I.constructor);
                R || (R = new I.constructor,
                Du.set(I.constructor, R)),
                M = R[E]
            } else
                M = 0;
        if (D)
            M ? f.handlers[E] = M : delete f.handlers[E],
            f.eventCount = Object.keys(f.handlers).length;
        else if (T && T.set && (T.copy || T instanceof bo)) {
            if (Array.isArray(M))
                T.fromArray ? T.fromArray(M) : T.set(...M);
            else if (T.copy && M && M.constructor && T.constructor === M.constructor)
                T.copy(M);
            else if (M !== void 0) {
                const R = T instanceof Gn;
                !R && T.setScalar ? T.setScalar(M) : T instanceof bo && M instanceof bo ? T.mask = M.mask : T.set(M),
                !Ac() && !g.linear && R && T.convertSRGBToLinear()
            }
        } else if (I[E] = M,
        I[E]instanceof sn && I[E].format === Cr && I[E].type === As) {
            const R = I[E];
            ea(R) && ea(g.gl) ? R.colorSpace = g.gl.outputColorSpace : R.encoding = g.gl.outputEncoding
        }
        Ar(o)
    }
    if (f.parent && o.raycast && h !== f.eventCount) {
        const B = ps(o).getState().internal
          , E = B.interaction.indexOf(o);
        E > -1 && B.interaction.splice(E, 1),
        f.eventCount && B.interaction.push(o)
    }
    return !(v.length === 1 && v[0][0] === "onUpdate") && v.length && (l = o.__r3f) != null && l.parent && ya(o),
    o
}
function Ar(o) {
    var r, s;
    const u = (r = o.__r3f) == null || (s = r.root) == null || s.getState == null ? void 0 : s.getState();
    u && u.internal.frames === 0 && u.invalidate()
}
function ya(o) {
    o.onUpdate == null || o.onUpdate(o)
}
function Ec(o, r) {
    o.manual || (mc(o) ? (o.left = r.width / -2,
    o.right = r.width / 2,
    o.top = r.height / 2,
    o.bottom = r.height / -2) : o.aspect = r.width / r.height,
    o.updateProjectionMatrix(),
    o.updateMatrixWorld())
}
function ss(o) {
    return (o.eventObject || o.object).uuid + "/" + o.index + o.instanceId
}
function lp() {
    var o;
    const r = typeof self < "u" && self || typeof window < "u" && window;
    if (!r)
        return vr.DefaultEventPriority;
    switch ((o = r.event) == null ? void 0 : o.type) {
    case "click":
    case "contextmenu":
    case "dblclick":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
        return vr.DiscreteEventPriority;
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "pointerenter":
    case "pointerleave":
    case "wheel":
        return vr.ContinuousEventPriority;
    default:
        return vr.DefaultEventPriority
    }
}
function Mc(o, r, s, u) {
    const l = s.get(r);
    l && (s.delete(r),
    s.size === 0 && (o.delete(u),
    l.target.releasePointerCapture(u)))
}
function up(o, r) {
    const {internal: s} = o.getState();
    s.interaction = s.interaction.filter(u => u !== r),
    s.initialHits = s.initialHits.filter(u => u !== r),
    s.hovered.forEach( (u, l) => {
        (u.eventObject === r || u.object === r) && s.hovered.delete(l)
    }
    ),
    s.capturedMap.forEach( (u, l) => {
        Mc(s.capturedMap, r, u, l)
    }
    )
}
function cp(o) {
    function r(p) {
        const {internal: v} = o.getState()
          , h = p.offsetX - v.initialClick[0]
          , A = p.offsetY - v.initialClick[1];
        return Math.round(Math.sqrt(h * h + A * A))
    }
    function s(p) {
        return p.filter(v => ["Move", "Over", "Enter", "Out", "Leave"].some(h => {
            var A;
            return (A = v.__r3f) == null ? void 0 : A.handlers["onPointer" + h]
        }
        ))
    }
    function u(p, v) {
        const h = o.getState()
          , A = new Set
          , B = []
          , E = v ? v(h.internal.interaction) : h.internal.interaction;
        for (let I = 0; I < E.length; I++) {
            const T = jr(E[I]);
            T && (T.raycaster.camera = void 0)
        }
        h.previousRoot || h.events.compute == null || h.events.compute(p, h);
        function M(I) {
            const T = jr(I);
            if (!T || !T.events.enabled || T.raycaster.camera === null)
                return [];
            if (T.raycaster.camera === void 0) {
                var R;
                T.events.compute == null || T.events.compute(p, T, (R = T.previousRoot) == null ? void 0 : R.getState()),
                T.raycaster.camera === void 0 && (T.raycaster.camera = null)
            }
            return T.raycaster.camera ? T.raycaster.intersectObject(I, !0) : []
        }
        let D = E.flatMap(M).sort( (I, T) => {
            const R = jr(I.object)
              , U = jr(T.object);
            return !R || !U ? I.distance - T.distance : U.events.priority - R.events.priority || I.distance - T.distance
        }
        ).filter(I => {
            const T = ss(I);
            return A.has(T) ? !1 : (A.add(T),
            !0)
        }
        );
        h.events.filter && (D = h.events.filter(D, h));
        for (const I of D) {
            let T = I.object;
            for (; T; ) {
                var w;
                (w = T.__r3f) != null && w.eventCount && B.push({
                    ...I,
                    eventObject: T
                }),
                T = T.parent
            }
        }
        if ("pointerId"in p && h.internal.capturedMap.has(p.pointerId))
            for (let I of h.internal.capturedMap.get(p.pointerId).values())
                A.has(ss(I.intersection)) || B.push(I.intersection);
        return B
    }
    function l(p, v, h, A) {
        const B = o.getState();
        if (p.length) {
            const E = {
                stopped: !1
            };
            for (const M of p) {
                const D = jr(M.object) || B
                  , {raycaster: w, pointer: I, camera: T, internal: R} = D
                  , U = new pt(I.x,I.y,0).unproject(T)
                  , b = oe => {
                    var J, ue;
                    return (J = (ue = R.capturedMap.get(oe)) == null ? void 0 : ue.has(M.eventObject)) != null ? J : !1
                }
                  , k = oe => {
                    const J = {
                        intersection: M,
                        target: v.target
                    };
                    R.capturedMap.has(oe) ? R.capturedMap.get(oe).set(M.eventObject, J) : R.capturedMap.set(oe, new Map([[M.eventObject, J]])),
                    v.target.setPointerCapture(oe)
                }
                  , Y = oe => {
                    const J = R.capturedMap.get(oe);
                    J && Mc(R.capturedMap, M.eventObject, J, oe)
                }
                ;
                let X = {};
                for (let oe in v) {
                    let J = v[oe];
                    typeof J != "function" && (X[oe] = J)
                }
                let z = {
                    ...M,
                    ...X,
                    pointer: I,
                    intersections: p,
                    stopped: E.stopped,
                    delta: h,
                    unprojectedPoint: U,
                    ray: w.ray,
                    camera: T,
                    stopPropagation() {
                        const oe = "pointerId"in v && R.capturedMap.get(v.pointerId);
                        if ((!oe || oe.has(M.eventObject)) && (z.stopped = E.stopped = !0,
                        R.hovered.size && Array.from(R.hovered.values()).find(J => J.eventObject === M.eventObject))) {
                            const J = p.slice(0, p.indexOf(M));
                            f([...J, M])
                        }
                    },
                    target: {
                        hasPointerCapture: b,
                        setPointerCapture: k,
                        releasePointerCapture: Y
                    },
                    currentTarget: {
                        hasPointerCapture: b,
                        setPointerCapture: k,
                        releasePointerCapture: Y
                    },
                    nativeEvent: v
                };
                if (A(z),
                E.stopped === !0)
                    break
            }
        }
        return p
    }
    function f(p) {
        const {internal: v} = o.getState();
        for (const h of v.hovered.values())
            if (!p.length || !p.find(A => A.object === h.object && A.index === h.index && A.instanceId === h.instanceId)) {
                const B = h.eventObject.__r3f
                  , E = B?.handlers;
                if (v.hovered.delete(ss(h)),
                B != null && B.eventCount) {
                    const M = {
                        ...h,
                        intersections: p
                    };
                    E.onPointerOut == null || E.onPointerOut(M),
                    E.onPointerLeave == null || E.onPointerLeave(M)
                }
            }
    }
    function c(p, v) {
        for (let h = 0; h < v.length; h++) {
            const A = v[h].__r3f;
            A == null || A.handlers.onPointerMissed == null || A.handlers.onPointerMissed(p)
        }
    }
    function g(p) {
        switch (p) {
        case "onPointerLeave":
        case "onPointerCancel":
            return () => f([]);
        case "onLostPointerCapture":
            return v => {
                const {internal: h} = o.getState();
                "pointerId"in v && h.capturedMap.has(v.pointerId) && requestAnimationFrame( () => {
                    h.capturedMap.has(v.pointerId) && (h.capturedMap.delete(v.pointerId),
                    f([]))
                }
                )
            }
        }
        return function(h) {
            const {onPointerMissed: A, internal: B} = o.getState();
            B.lastEvent.current = h;
            const E = p === "onPointerMove"
              , M = p === "onClick" || p === "onContextMenu" || p === "onDoubleClick"
              , w = u(h, E ? s : void 0)
              , I = M ? r(h) : 0;
            p === "onPointerDown" && (B.initialClick = [h.offsetX, h.offsetY],
            B.initialHits = w.map(R => R.eventObject)),
            M && !w.length && I <= 2 && (c(h, B.interaction),
            A && A(h)),
            E && f(w);
            function T(R) {
                const U = R.eventObject
                  , b = U.__r3f
                  , k = b?.handlers;
                if (b != null && b.eventCount)
                    if (E) {
                        if (k.onPointerOver || k.onPointerEnter || k.onPointerOut || k.onPointerLeave) {
                            const Y = ss(R)
                              , X = B.hovered.get(Y);
                            X ? X.stopped && R.stopPropagation() : (B.hovered.set(Y, R),
                            k.onPointerOver == null || k.onPointerOver(R),
                            k.onPointerEnter == null || k.onPointerEnter(R))
                        }
                        k.onPointerMove == null || k.onPointerMove(R)
                    } else {
                        const Y = k[p];
                        Y ? (!M || B.initialHits.includes(U)) && (c(h, B.interaction.filter(X => !B.initialHits.includes(X))),
                        Y(R)) : M && B.initialHits.includes(U) && c(h, B.interaction.filter(X => !B.initialHits.includes(X)))
                    }
            }
            l(w, h, I, T)
        }
    }
    return {
        handlePointer: g
    }
}
const fp = ["set", "get", "setSize", "setFrameloop", "setDpr", "events", "invalidate", "advance", "size", "viewport"]
  , Sc = o => !!(o != null && o.render)
  , Ga = Q.createContext(null)
  , dp = (o, r) => {
    const s = fc( (g, p) => {
        const v = new pt
          , h = new pt
          , A = new pt;
        function B(I=p().camera, T=h, R=p().size) {
            const {width: U, height: b, top: k, left: Y} = R
              , X = U / b;
            T instanceof pt ? A.copy(T) : A.set(...T);
            const z = I.getWorldPosition(v).distanceTo(A);
            if (mc(I))
                return {
                    width: U / I.zoom,
                    height: b / I.zoom,
                    top: k,
                    left: Y,
                    factor: 1,
                    distance: z,
                    aspect: X
                };
            {
                const oe = I.fov * Math.PI / 180
                  , J = 2 * Math.tan(oe / 2) * z
                  , ue = J * (U / b);
                return {
                    width: ue,
                    height: J,
                    top: k,
                    left: Y,
                    factor: U / ue,
                    distance: z,
                    aspect: X
                }
            }
        }
        let E;
        const M = I => g(T => ({
            performance: {
                ...T.performance,
                current: I
            }
        }))
          , D = new vs;
        return {
            set: g,
            get: p,
            gl: null,
            camera: null,
            raycaster: null,
            events: {
                priority: 1,
                enabled: !0,
                connected: !1
            },
            xr: null,
            scene: null,
            invalidate: (I=1) => o(p(), I),
            advance: (I, T) => r(I, T, p()),
            legacy: !1,
            linear: !1,
            flat: !1,
            controls: null,
            clock: new zf,
            pointer: D,
            mouse: D,
            frameloop: "always",
            onPointerMissed: void 0,
            performance: {
                current: 1,
                min: .5,
                max: 1,
                debounce: 200,
                regress: () => {
                    const I = p();
                    E && clearTimeout(E),
                    I.performance.current !== I.performance.min && M(I.performance.min),
                    E = setTimeout( () => M(p().performance.max), I.performance.debounce)
                }
            },
            size: {
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                updateStyle: !1
            },
            viewport: {
                initialDpr: 0,
                dpr: 0,
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                aspect: 0,
                distance: 0,
                factor: 0,
                getCurrentViewport: B
            },
            setEvents: I => g(T => ({
                ...T,
                events: {
                    ...T.events,
                    ...I
                }
            })),
            setSize: (I, T, R, U, b) => {
                const k = p().camera
                  , Y = {
                    width: I,
                    height: T,
                    top: U || 0,
                    left: b || 0,
                    updateStyle: R
                };
                g(X => ({
                    size: Y,
                    viewport: {
                        ...X.viewport,
                        ...B(k, h, Y)
                    }
                }))
            }
            ,
            setDpr: I => g(T => {
                const R = Cc(I);
                return {
                    viewport: {
                        ...T.viewport,
                        dpr: R,
                        initialDpr: T.viewport.initialDpr || R
                    }
                }
            }
            ),
            setFrameloop: (I="always") => {
                const T = p().clock;
                T.stop(),
                T.elapsedTime = 0,
                I !== "never" && (T.start(),
                T.elapsedTime = 0),
                g( () => ({
                    frameloop: I
                }))
            }
            ,
            previousRoot: void 0,
            internal: {
                active: !1,
                priority: 0,
                frames: 0,
                lastEvent: Q.createRef(),
                interaction: [],
                hovered: new Map,
                subscribers: [],
                initialClick: [0, 0],
                initialHits: [],
                capturedMap: new Map,
                subscribe: (I, T, R) => {
                    const U = p().internal;
                    return U.priority = U.priority + (T > 0 ? 1 : 0),
                    U.subscribers.push({
                        ref: I,
                        priority: T,
                        store: R
                    }),
                    U.subscribers = U.subscribers.sort( (b, k) => b.priority - k.priority),
                    () => {
                        const b = p().internal;
                        b != null && b.subscribers && (b.priority = b.priority - (T > 0 ? 1 : 0),
                        b.subscribers = b.subscribers.filter(k => k.ref !== I))
                    }
                }
            }
        }
    }
    )
      , u = s.getState();
    let l = u.size
      , f = u.viewport.dpr
      , c = u.camera;
    return s.subscribe( () => {
        const {camera: g, size: p, viewport: v, gl: h, set: A} = s.getState();
        if (p.width !== l.width || p.height !== l.height || v.dpr !== f) {
            var B;
            l = p,
            f = v.dpr,
            Ec(g, p),
            h.setPixelRatio(v.dpr);
            const E = (B = p.updateStyle) != null ? B : typeof HTMLCanvasElement < "u" && h.domElement instanceof HTMLCanvasElement;
            h.setSize(p.width, p.height, E)
        }
        g !== c && (c = g,
        A(E => ({
            viewport: {
                ...E.viewport,
                ...E.viewport.getCurrentViewport(g)
            }
        })))
    }
    ),
    s.subscribe(g => o(g)),
    s
}
;
let os, pp = new Set, hp = new Set, Ap = new Set;
function ra(o, r) {
    if (o.size)
        for (const {callback: s} of o.values())
            s(r)
}
function Xr(o, r) {
    switch (o) {
    case "before":
        return ra(pp, r);
    case "after":
        return ra(hp, r);
    case "tail":
        return ra(Ap, r)
    }
}
let ia, sa;
function oa(o, r, s) {
    let u = r.clock.getDelta();
    for (r.frameloop === "never" && typeof o == "number" && (u = o - r.clock.elapsedTime,
    r.clock.oldTime = r.clock.elapsedTime,
    r.clock.elapsedTime = o),
    ia = r.internal.subscribers,
    os = 0; os < ia.length; os++)
        sa = ia[os],
        sa.ref.current(sa.store.getState(), u, s);
    return !r.internal.priority && r.gl.render && r.gl.render(r.scene, r.camera),
    r.internal.frames = Math.max(0, r.internal.frames - 1),
    r.frameloop === "always" ? 1 : r.internal.frames
}
function mp(o) {
    let r = !1, s = !1, u, l, f;
    function c(v) {
        l = requestAnimationFrame(c),
        r = !0,
        u = 0,
        Xr("before", v),
        s = !0;
        for (const A of o.values()) {
            var h;
            f = A.store.getState(),
            f.internal.active && (f.frameloop === "always" || f.internal.frames > 0) && !((h = f.gl.xr) != null && h.isPresenting) && (u += oa(v, f))
        }
        if (s = !1,
        Xr("after", v),
        u === 0)
            return Xr("tail", v),
            r = !1,
            cancelAnimationFrame(l)
    }
    function g(v, h=1) {
        var A;
        if (!v)
            return o.forEach(B => g(B.store.getState(), h));
        (A = v.gl.xr) != null && A.isPresenting || !v.internal.active || v.frameloop === "never" || (h > 1 ? v.internal.frames = Math.min(60, v.internal.frames + h) : s ? v.internal.frames = 2 : v.internal.frames = 1,
        r || (r = !0,
        requestAnimationFrame(c)))
    }
    function p(v, h=!0, A, B) {
        if (h && Xr("before", v),
        A)
            oa(v, A, B);
        else
            for (const E of o.values())
                oa(v, E.store.getState());
        h && Xr("after", v)
    }
    return {
        loop: c,
        invalidate: g,
        advance: p
    }
}
function xa() {
    const o = Q.useContext(Ga);
    if (!o)
        throw new Error("R3F: Hooks can only be used within the Canvas component!");
    return o
}
function an(o=s => s, r) {
    return xa()(o, r)
}
function Ic(o, r=0) {
    const s = xa()
      , u = s.getState().internal.subscribe
      , l = gc(o);
    return ei( () => u(l, r, s), [r, u, s]),
    null
}
const Hu = new WeakMap;
function wc(o, r) {
    return function(s, ...u) {
        let l = Hu.get(s);
        return l || (l = new s,
        Hu.set(s, l)),
        o && o(l),
        Promise.all(u.map(f => new Promise( (c, g) => l.load(f, p => {
            p.scene && Object.assign(p, op(p.scene)),
            c(p)
        }
        , r, p => g(new Error(`Could not load ${f}: ${p?.message}`))))))
    }
}
function Mr(o, r, s, u) {
    const l = Array.isArray(r) ? r : [r]
      , f = $d(wc(s, u), [o, ...l], {
        equal: Xe.equ
    });
    return Array.isArray(r) ? f : f[0]
}
Mr.preload = function(o, r, s) {
    const u = Array.isArray(r) ? r : [r];
    return ep(wc(s), [o, ...u])
}
;
Mr.clear = function(o, r) {
    const s = Array.isArray(r) ? r : [r];
    return tp([o, ...s])
}
;
const yr = new Map
  , {invalidate: Lu, advance: Pu} = mp(yr)
  , {reconciler: $r, applyProps: Fn} = np(yr, lp)
  , pr = {
    objects: "shallow",
    strict: !1
}
  , gp = (o, r) => {
    const s = typeof o == "function" ? o(r) : o;
    return Sc(s) ? s : new $u({
        powerPreference: "high-performance",
        canvas: r,
        antialias: !0,
        alpha: !0,
        ...o
    })
}
;
function vp(o, r) {
    const s = typeof HTMLCanvasElement < "u" && o instanceof HTMLCanvasElement;
    if (r) {
        const {width: u, height: l, top: f, left: c, updateStyle: g=s} = r;
        return {
            width: u,
            height: l,
            top: f,
            left: c,
            updateStyle: g
        }
    } else if (typeof HTMLCanvasElement < "u" && o instanceof HTMLCanvasElement && o.parentElement) {
        const {width: u, height: l, top: f, left: c} = o.parentElement.getBoundingClientRect();
        return {
            width: u,
            height: l,
            top: f,
            left: c,
            updateStyle: s
        }
    } else if (typeof OffscreenCanvas < "u" && o instanceof OffscreenCanvas)
        return {
            width: o.width,
            height: o.height,
            top: 0,
            left: 0,
            updateStyle: s
        };
    return {
        width: 0,
        height: 0,
        top: 0,
        left: 0
    }
}
function Bp(o) {
    const r = yr.get(o)
      , s = r?.fiber
      , u = r?.store;
    r && console.warn("R3F.createRoot should only be called once!");
    const l = typeof reportError == "function" ? reportError : console.error
      , f = u || dp(Lu, Pu)
      , c = s || $r.createContainer(f, vr.ConcurrentRoot, null, !1, null, "", l, null);
    r || yr.set(o, {
        fiber: c,
        store: f
    });
    let g, p = !1, v;
    return {
        configure(h={}) {
            let {gl: A, size: B, scene: E, events: M, onCreated: D, shadows: w=!1, linear: I=!1, flat: T=!1, legacy: R=!1, orthographic: U=!1, frameloop: b="always", dpr: k=[1, 2], performance: Y, raycaster: X, camera: z, onPointerMissed: oe} = h
              , J = f.getState()
              , ue = J.gl;
            J.gl || J.set({
                gl: ue = gp(A, o)
            });
            let Ae = J.raycaster;
            Ae || J.set({
                raycaster: Ae = new Vu
            });
            const {params: _e, ...Re} = X || {};
            if (Xe.equ(Re, Ae, pr) || Fn(Ae, {
                ...Re
            }),
            Xe.equ(_e, Ae.params, pr) || Fn(Ae, {
                params: {
                    ...Ae.params,
                    ..._e
                }
            }),
            !J.camera || J.camera === v && !Xe.equ(v, z, pr)) {
                v = z;
                const K = z instanceof Qf
                  , re = K ? z : U ? new wa(0,0,0,0,.1,1e3) : new qu(75,0,.1,1e3);
                K || (re.position.z = 5,
                z && Fn(re, z),
                !J.camera && !(z != null && z.rotation) && re.lookAt(0, 0, 0)),
                J.set({
                    camera: re
                }),
                Ae.camera = re
            }
            if (!J.scene) {
                let K;
                E instanceof hs ? K = E : (K = new hs,
                E && Fn(K, E)),
                J.set({
                    scene: hr(K)
                })
            }
            if (!J.xr) {
                var He;
                const K = (ye, Ue) => {
                    const qe = f.getState();
                    qe.frameloop !== "never" && Pu(ye, !0, qe, Ue)
                }
                  , re = () => {
                    const ye = f.getState();
                    ye.gl.xr.enabled = ye.gl.xr.isPresenting,
                    ye.gl.xr.setAnimationLoop(ye.gl.xr.isPresenting ? K : null),
                    ye.gl.xr.isPresenting || Lu(ye)
                }
                  , le = {
                    connect() {
                        const ye = f.getState().gl;
                        ye.xr.addEventListener("sessionstart", re),
                        ye.xr.addEventListener("sessionend", re)
                    },
                    disconnect() {
                        const ye = f.getState().gl;
                        ye.xr.removeEventListener("sessionstart", re),
                        ye.xr.removeEventListener("sessionend", re)
                    }
                };
                typeof ((He = ue.xr) == null ? void 0 : He.addEventListener) == "function" && le.connect(),
                J.set({
                    xr: le
                })
            }
            if (ue.shadowMap) {
                const K = ue.shadowMap.enabled
                  , re = ue.shadowMap.type;
                if (ue.shadowMap.enabled = !!w,
                Xe.boo(w))
                    ue.shadowMap.type = zo;
                else if (Xe.str(w)) {
                    var ke;
                    const le = {
                        basic: Uf,
                        percentage: kf,
                        soft: zo,
                        variance: Nf
                    };
                    ue.shadowMap.type = (ke = le[w]) != null ? ke : zo
                } else
                    Xe.obj(w) && Object.assign(ue.shadowMap, w);
                (K !== ue.shadowMap.enabled || re !== ue.shadowMap.type) && (ue.shadowMap.needsUpdate = !0)
            }
            const G = Ac();
            G && ("enabled"in G ? G.enabled = !R : "legacyMode"in G && (G.legacyMode = R)),
            p || Fn(ue, {
                outputEncoding: I ? 3e3 : 3001,
                toneMapping: T ? Jf : Kf
            }),
            J.legacy !== R && J.set( () => ({
                legacy: R
            })),
            J.linear !== I && J.set( () => ({
                linear: I
            })),
            J.flat !== T && J.set( () => ({
                flat: T
            })),
            A && !Xe.fun(A) && !Sc(A) && !Xe.equ(A, ue, pr) && Fn(ue, A),
            M && !J.events.handlers && J.set({
                events: M(f)
            });
            const j = vp(o, B);
            return Xe.equ(j, J.size, pr) || J.setSize(j.width, j.height, j.updateStyle, j.top, j.left),
            k && J.viewport.dpr !== Cc(k) && J.setDpr(k),
            J.frameloop !== b && J.setFrameloop(b),
            J.onPointerMissed || J.set({
                onPointerMissed: oe
            }),
            Y && !Xe.equ(Y, J.performance, pr) && J.set(K => ({
                performance: {
                    ...K.performance,
                    ...Y
                }
            })),
            g = D,
            p = !0,
            this
        },
        render(h) {
            return p || this.configure(),
            $r.updateContainer(Q.createElement(Cp, {
                store: f,
                children: h,
                onCreated: g,
                rootElement: o
            }), c, null, () => {}
            ),
            f
        },
        unmount() {
            Rc(o)
        }
    }
}
function Cp({store: o, children: r, onCreated: s, rootElement: u}) {
    return ei( () => {
        const l = o.getState();
        l.set(f => ({
            internal: {
                ...f.internal,
                active: !0
            }
        })),
        s && s(l),
        o.getState().events.connected || l.events.connect == null || l.events.connect(u)
    }
    , []),
    Q.createElement(Ga.Provider, {
        value: o
    }, r)
}
function Rc(o, r) {
    const s = yr.get(o)
      , u = s?.fiber;
    if (u) {
        const l = s?.store.getState();
        l && (l.internal.active = !1),
        $r.updateContainer(null, u, null, () => {
            l && setTimeout( () => {
                try {
                    var f, c, g, p;
                    l.events.disconnect == null || l.events.disconnect(),
                    (f = l.gl) == null || (c = f.renderLists) == null || c.dispose == null || c.dispose(),
                    (g = l.gl) == null || g.forceContextLoss == null || g.forceContextLoss(),
                    (p = l.gl) != null && p.xr && l.xr.disconnect(),
                    ap(l),
                    yr.delete(o)
                } catch {}
            }
            , 500)
        }
        )
    }
}
function yp(o, r, s) {
    return Q.createElement(Ep, {
        key: r.uuid,
        children: o,
        container: r,
        state: s
    })
}
function Ep({state: o={}, children: r, container: s}) {
    const {events: u, size: l, ...f} = o
      , c = xa()
      , [g] = Q.useState( () => new Vu)
      , [p] = Q.useState( () => new vs)
      , v = Q.useCallback( (A, B) => {
        const E = {
            ...A
        };
        Object.keys(A).forEach(D => {
            (fp.includes(D) || A[D] !== B[D] && B[D]) && delete E[D]
        }
        );
        let M;
        if (B && l) {
            const D = B.camera;
            M = A.viewport.getCurrentViewport(D, new pt, l),
            D !== A.camera && Ec(D, l)
        }
        return {
            ...E,
            scene: s,
            raycaster: g,
            pointer: p,
            mouse: p,
            previousRoot: c,
            events: {
                ...A.events,
                ...B?.events,
                ...u
            },
            size: {
                ...A.size,
                ...l
            },
            viewport: {
                ...A.viewport,
                ...M
            },
            ...f
        }
    }
    , [o])
      , [h] = Q.useState( () => {
        const A = c.getState();
        return fc( (E, M) => ({
            ...A,
            scene: s,
            raycaster: g,
            pointer: p,
            mouse: p,
            previousRoot: c,
            events: {
                ...A.events,
                ...u
            },
            size: {
                ...A.size,
                ...l
            },
            ...f,
            set: E,
            get: M,
            setEvents: D => E(w => ({
                ...w,
                events: {
                    ...w.events,
                    ...D
                }
            }))
        }))
    }
    );
    return Q.useEffect( () => {
        const A = c.subscribe(B => h.setState(E => v(B, E)));
        return () => {
            A(),
            h.destroy()
        }
    }
    , []),
    Q.useEffect( () => {
        h.setState(A => v(c.getState(), A))
    }
    , [v]),
    Q.createElement(Q.Fragment, null, $r.createPortal(Q.createElement(Ga.Provider, {
        value: h
    }, r), h, null))
}
$r.injectIntoDevTools({
    bundleType: 0,
    rendererPackageName: "@react-three/fiber",
    version: Q.version
});
function Er() {
    return Er = Object.assign ? Object.assign.bind() : function(o) {
        for (var r = 1; r < arguments.length; r++) {
            var s = arguments[r];
            for (var u in s)
                Object.prototype.hasOwnProperty.call(s, u) && (o[u] = s[u])
        }
        return o
    }
    ,
    Er.apply(this, arguments)
}
var aa, Ou;
function Mp() {
    if (Ou)
        return aa;
    Ou = 1;
    function o(r, s, u) {
        var l, f, c, g, p;
        s == null && (s = 100);
        function v() {
            var A = Date.now() - g;
            A < s && A >= 0 ? l = setTimeout(v, s - A) : (l = null,
            u || (p = r.apply(c, f),
            c = f = null))
        }
        var h = function() {
            c = this,
            f = arguments,
            g = Date.now();
            var A = u && !l;
            return l || (l = setTimeout(v, s)),
            A && (p = r.apply(c, f),
            c = f = null),
            p
        };
        return h.clear = function() {
            l && (clearTimeout(l),
            l = null)
        }
        ,
        h.flush = function() {
            l && (p = r.apply(c, f),
            c = f = null,
            clearTimeout(l),
            l = null)
        }
        ,
        h
    }
    return o.debounce = o,
    aa = o,
    aa
}
var Sp = Mp();
const Nu = cc(Sp);
function Ip(o) {
    let {debounce: r, scroll: s, polyfill: u, offsetSize: l} = o === void 0 ? {
        debounce: 0,
        scroll: !1,
        offsetSize: !1
    } : o;
    const f = u || (typeof window > "u" ? class {
    }
    : window.ResizeObserver);
    if (!f)
        throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");
    const [c,g] = Q.useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0
    })
      , p = Q.useRef({
        element: null,
        scrollContainers: null,
        resizeObserver: null,
        lastBounds: c
    })
      , v = r ? typeof r == "number" ? r : r.scroll : null
      , h = r ? typeof r == "number" ? r : r.resize : null
      , A = Q.useRef(!1);
    Q.useEffect( () => (A.current = !0,
    () => void (A.current = !1)));
    const [B,E,M] = Q.useMemo( () => {
        const T = () => {
            if (!p.current.element)
                return;
            const {left: R, top: U, width: b, height: k, bottom: Y, right: X, x: z, y: oe} = p.current.element.getBoundingClientRect()
              , J = {
                left: R,
                top: U,
                width: b,
                height: k,
                bottom: Y,
                right: X,
                x: z,
                y: oe
            };
            p.current.element instanceof HTMLElement && l && (J.height = p.current.element.offsetHeight,
            J.width = p.current.element.offsetWidth),
            Object.freeze(J),
            A.current && !_p(p.current.lastBounds, J) && g(p.current.lastBounds = J)
        }
        ;
        return [T, h ? Nu(T, h) : T, v ? Nu(T, v) : T]
    }
    , [g, l, v, h]);
    function D() {
        p.current.scrollContainers && (p.current.scrollContainers.forEach(T => T.removeEventListener("scroll", M, !0)),
        p.current.scrollContainers = null),
        p.current.resizeObserver && (p.current.resizeObserver.disconnect(),
        p.current.resizeObserver = null)
    }
    function w() {
        p.current.element && (p.current.resizeObserver = new f(M),
        p.current.resizeObserver.observe(p.current.element),
        s && p.current.scrollContainers && p.current.scrollContainers.forEach(T => T.addEventListener("scroll", M, {
            capture: !0,
            passive: !0
        })))
    }
    const I = T => {
        !T || T === p.current.element || (D(),
        p.current.element = T,
        p.current.scrollContainers = Fc(T),
        w())
    }
    ;
    return Rp(M, !!s),
    wp(E),
    Q.useEffect( () => {
        D(),
        w()
    }
    , [s, M, E]),
    Q.useEffect( () => D, []),
    [I, c, B]
}
function wp(o) {
    Q.useEffect( () => {
        const r = o;
        return window.addEventListener("resize", r),
        () => void window.removeEventListener("resize", r)
    }
    , [o])
}
function Rp(o, r) {
    Q.useEffect( () => {
        if (r) {
            const s = o;
            return window.addEventListener("scroll", s, {
                capture: !0,
                passive: !0
            }),
            () => void window.removeEventListener("scroll", s, !0)
        }
    }
    , [o, r])
}
function Fc(o) {
    const r = [];
    if (!o || o === document.body)
        return r;
    const {overflow: s, overflowX: u, overflowY: l} = window.getComputedStyle(o);
    return [s, u, l].some(f => f === "auto" || f === "scroll") && r.push(o),
    [...r, ...Fc(o.parentElement)]
}
const Fp = ["x", "y", "top", "bottom", "left", "right", "width", "height"]
  , _p = (o, r) => Fp.every(s => o[s] === r[s]);
var Tp = Object.defineProperty, Dp = Object.defineProperties, Gp = Object.getOwnPropertyDescriptors, ku = Object.getOwnPropertySymbols, xp = Object.prototype.hasOwnProperty, Hp = Object.prototype.propertyIsEnumerable, Uu = (o, r, s) => r in o ? Tp(o, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: s
}) : o[r] = s, Ju = (o, r) => {
    for (var s in r || (r = {}))
        xp.call(r, s) && Uu(o, s, r[s]);
    if (ku)
        for (var s of ku(r))
            Hp.call(r, s) && Uu(o, s, r[s]);
    return o
}
, Lp = (o, r) => Dp(o, Gp(r)), Ku, Qu;
typeof window < "u" && ((Ku = window.document) != null && Ku.createElement || ((Qu = window.navigator) == null ? void 0 : Qu.product) === "ReactNative") ? Q.useLayoutEffect : Q.useEffect;
function _c(o, r, s) {
    if (!o)
        return;
    if (s(o) === !0)
        return o;
    let u = o.child;
    for (; u; ) {
        const l = _c(u, r, s);
        if (l)
            return l;
        u = u.sibling
    }
}
function Tc(o) {
    try {
        return Object.defineProperties(o, {
            _currentRenderer: {
                get() {
                    return null
                },
                set() {}
            },
            _currentRenderer2: {
                get() {
                    return null
                },
                set() {}
            }
        })
    } catch {
        return o
    }
}
const zu = console.error;
console.error = function() {
    const o = [...arguments].join("");
    if (o?.startsWith("Warning:") && o.includes("useContext")) {
        console.error = zu;
        return
    }
    return zu.apply(this, arguments)
}
;
const Ha = Tc(Q.createContext(null));
class Dc extends Q.Component {
    render() {
        return Q.createElement(Ha.Provider, {
            value: this._reactInternals
        }, this.props.children)
    }
}
function Pp() {
    const o = Q.useContext(Ha);
    if (o === null)
        throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");
    const r = Q.useId();
    return Q.useMemo( () => {
        for (const u of [o, o?.alternate]) {
            if (!u)
                continue;
            const l = _c(u, !1, f => {
                let c = f.memoizedState;
                for (; c; ) {
                    if (c.memoizedState === r)
                        return !0;
                    c = c.next
                }
            }
            );
            if (l)
                return l
        }
    }
    , [o, r])
}
function Op() {
    const o = Pp()
      , [r] = Q.useState( () => new Map);
    r.clear();
    let s = o;
    for (; s; ) {
        if (s.type && typeof s.type == "object") {
            const l = s.type._context === void 0 && s.type.Provider === s.type ? s.type : s.type._context;
            l && l !== Ha && !r.has(l) && r.set(l, Q.useContext(Tc(l)))
        }
        s = s.return
    }
    return r
}
function Np() {
    const o = Op();
    return Q.useMemo( () => Array.from(o.keys()).reduce( (r, s) => u => Q.createElement(r, null, Q.createElement(s.Provider, Lp(Ju({}, u), {
        value: o.get(s)
    }))), r => Q.createElement(Dc, Ju({}, r))), [o])
}
const la = {
    onClick: ["click", !1],
    onContextMenu: ["contextmenu", !1],
    onDoubleClick: ["dblclick", !1],
    onWheel: ["wheel", !0],
    onPointerDown: ["pointerdown", !0],
    onPointerUp: ["pointerup", !0],
    onPointerLeave: ["pointerleave", !0],
    onPointerMove: ["pointermove", !0],
    onPointerCancel: ["pointercancel", !0],
    onLostPointerCapture: ["lostpointercapture", !0]
};
function kp(o) {
    const {handlePointer: r} = cp(o);
    return {
        priority: 1,
        enabled: !0,
        compute(s, u, l) {
            u.pointer.set(s.offsetX / u.size.width * 2 - 1, -(s.offsetY / u.size.height) * 2 + 1),
            u.raycaster.setFromCamera(u.pointer, u.camera)
        },
        connected: void 0,
        handlers: Object.keys(la).reduce( (s, u) => ({
            ...s,
            [u]: r(u)
        }), {}),
        update: () => {
            var s;
            const {events: u, internal: l} = o.getState();
            (s = l.lastEvent) != null && s.current && u.handlers && u.handlers.onPointerMove(l.lastEvent.current)
        }
        ,
        connect: s => {
            var u;
            const {set: l, events: f} = o.getState();
            f.disconnect == null || f.disconnect(),
            l(c => ({
                events: {
                    ...c.events,
                    connected: s
                }
            })),
            Object.entries((u = f.handlers) != null ? u : []).forEach( ([c,g]) => {
                const [p,v] = la[c];
                s.addEventListener(p, g, {
                    passive: v
                })
            }
            )
        }
        ,
        disconnect: () => {
            const {set: s, events: u} = o.getState();
            if (u.connected) {
                var l;
                Object.entries((l = u.handlers) != null ? l : []).forEach( ([f,c]) => {
                    if (u && u.connected instanceof HTMLElement) {
                        const [g] = la[f];
                        u.connected.removeEventListener(g, c)
                    }
                }
                ),
                s(f => ({
                    events: {
                        ...f.events,
                        connected: void 0
                    }
                }))
            }
        }
    }
}
const Up = Q.forwardRef(function({children: r, fallback: s, resize: u, style: l, gl: f, events: c=kp, eventSource: g, eventPrefix: p, shadows: v, linear: h, flat: A, legacy: B, orthographic: E, frameloop: M, dpr: D, performance: w, raycaster: I, camera: T, scene: R, onPointerMissed: U, onCreated: b, ...k}, Y) {
    Q.useMemo( () => hc(bf), []);
    const X = Np()
      , [z,oe] = Ip({
        scroll: !0,
        debounce: {
            scroll: 50,
            resize: 0
        },
        ...u
    })
      , J = Q.useRef(null)
      , ue = Q.useRef(null);
    Q.useImperativeHandle(Y, () => J.current);
    const Ae = gc(U)
      , [_e,Re] = Q.useState(!1)
      , [He,ke] = Q.useState(!1);
    if (_e)
        throw _e;
    if (He)
        throw He;
    const G = Q.useRef(null);
    ei( () => {
        const K = J.current;
        oe.width > 0 && oe.height > 0 && K && (G.current || (G.current = Bp(K)),
        G.current.configure({
            gl: f,
            events: c,
            shadows: v,
            linear: h,
            flat: A,
            legacy: B,
            orthographic: E,
            frameloop: M,
            dpr: D,
            performance: w,
            raycaster: I,
            camera: T,
            scene: R,
            size: oe,
            onPointerMissed: (...re) => Ae.current == null ? void 0 : Ae.current(...re),
            onCreated: re => {
                re.events.connect == null || re.events.connect(g ? rp(g) ? g.current : g : ue.current),
                p && re.setEvents({
                    compute: (le, ye) => {
                        const Ue = le[p + "X"]
                          , qe = le[p + "Y"];
                        ye.pointer.set(Ue / ye.size.width * 2 - 1, -(qe / ye.size.height) * 2 + 1),
                        ye.raycaster.setFromCamera(ye.pointer, ye.camera)
                    }
                }),
                b?.(re)
            }
        }),
        G.current.render(Q.createElement(X, null, Q.createElement(vc, {
            set: ke
        }, Q.createElement(Q.Suspense, {
            fallback: Q.createElement(ip, {
                set: Re
            })
        }, r)))))
    }
    ),
    Q.useEffect( () => {
        const K = J.current;
        if (K)
            return () => Rc(K)
    }
    , []);
    const j = g ? "none" : "auto";
    return Q.createElement("div", Er({
        ref: ue,
        style: {
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            pointerEvents: j,
            ...l
        }
    }, k), Q.createElement("div", {
        ref: z,
        style: {
            width: "100%",
            height: "100%"
        }
    }, Q.createElement("canvas", {
        ref: J,
        style: {
            display: "block"
        }
    }, s)))
})
  , aA = Q.forwardRef(function(r, s) {
    return Q.createElement(Dc, null, Q.createElement(Up, Er({}, r, {
        ref: s
    })))
});
function lA(o) {
    const [r,s] = Q.useState(!1)
      , u = Q.useMemo( () => new IntersectionObserver( ([l]) => s(l.isIntersecting)), [o]);
    return Q.useEffect( () => {
        if (o.current)
            return u.observe(o.current),
            () => u.disconnect()
    }
    , []),
    r
}
function bu(o, r) {
    if (r === jf)
        return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),
        o;
    if (r === ga || r === ec) {
        let s = o.getIndex();
        if (s === null) {
            const c = []
              , g = o.getAttribute("position");
            if (g !== void 0) {
                for (let p = 0; p < g.count; p++)
                    c.push(p);
                o.setIndex(c),
                s = o.getIndex()
            } else
                return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),
                o
        }
        const u = s.count - 2
          , l = [];
        if (s)
            if (r === ga)
                for (let c = 1; c <= u; c++)
                    l.push(s.getX(0)),
                    l.push(s.getX(c)),
                    l.push(s.getX(c + 1));
            else
                for (let c = 0; c < u; c++)
                    c % 2 === 0 ? (l.push(s.getX(c)),
                    l.push(s.getX(c + 1)),
                    l.push(s.getX(c + 2))) : (l.push(s.getX(c + 2)),
                    l.push(s.getX(c + 1)),
                    l.push(s.getX(c)));
        l.length / 3 !== u && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
        const f = o.clone();
        return f.setIndex(l),
        f.clearGroups(),
        f
    } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", r),
        o
}
const Jp = parseInt(tc.replace(/\D+/g, ""));
var zt = Uint8Array
  , Tn = Uint16Array
  , Ea = Uint32Array
  , Gc = new zt([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0])
  , xc = new zt([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0])
  , Kp = new zt([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  , Hc = function(o, r) {
    for (var s = new Tn(31), u = 0; u < 31; ++u)
        s[u] = r += 1 << o[u - 1];
    for (var l = new Ea(s[30]), u = 1; u < 30; ++u)
        for (var f = s[u]; f < s[u + 1]; ++f)
            l[f] = f - s[u] << 5 | u;
    return [s, l]
}
  , Lc = Hc(Gc, 2)
  , Pc = Lc[0]
  , Qp = Lc[1];
Pc[28] = 258,
Qp[258] = 28;
var zp = Hc(xc, 0)
  , bp = zp[0]
  , Ma = new Tn(32768);
for (var We = 0; We < 32768; ++We) {
    var wn = (We & 43690) >>> 1 | (We & 21845) << 1;
    wn = (wn & 52428) >>> 2 | (wn & 13107) << 2,
    wn = (wn & 61680) >>> 4 | (wn & 3855) << 4,
    Ma[We] = ((wn & 65280) >>> 8 | (wn & 255) << 8) >>> 1
}
var qr = function(o, r, s) {
    for (var u = o.length, l = 0, f = new Tn(r); l < u; ++l)
        ++f[o[l] - 1];
    var c = new Tn(r);
    for (l = 0; l < r; ++l)
        c[l] = c[l - 1] + f[l - 1] << 1;
    var g;
    if (s) {
        g = new Tn(1 << r);
        var p = 15 - r;
        for (l = 0; l < u; ++l)
            if (o[l])
                for (var v = l << 4 | o[l], h = r - o[l], A = c[o[l] - 1]++ << h, B = A | (1 << h) - 1; A <= B; ++A)
                    g[Ma[A] >>> p] = v
    } else
        for (g = new Tn(u),
        l = 0; l < u; ++l)
            o[l] && (g[l] = Ma[c[o[l] - 1]++] >>> 15 - o[l]);
    return g
}
  , ti = new zt(288);
for (var We = 0; We < 144; ++We)
    ti[We] = 8;
for (var We = 144; We < 256; ++We)
    ti[We] = 9;
for (var We = 256; We < 280; ++We)
    ti[We] = 7;
for (var We = 280; We < 288; ++We)
    ti[We] = 8;
var Oc = new zt(32);
for (var We = 0; We < 32; ++We)
    Oc[We] = 5;
var jp = qr(ti, 9, 1)
  , Xp = qr(Oc, 5, 1)
  , ua = function(o) {
    for (var r = o[0], s = 1; s < o.length; ++s)
        o[s] > r && (r = o[s]);
    return r
}
  , Yt = function(o, r, s) {
    var u = r / 8 | 0;
    return (o[u] | o[u + 1] << 8) >> (r & 7) & s
}
  , ca = function(o, r) {
    var s = r / 8 | 0;
    return (o[s] | o[s + 1] << 8 | o[s + 2] << 16) >> (r & 7)
}
  , Wp = function(o) {
    return (o / 8 | 0) + (o & 7 && 1)
}
  , Yp = function(o, r, s) {
    (s == null || s > o.length) && (s = o.length);
    var u = new (o instanceof Tn ? Tn : o instanceof Ea ? Ea : zt)(s - r);
    return u.set(o.subarray(r, s)),
    u
}
  , Zp = function(o, r, s) {
    var u = o.length;
    if (!u || s && !s.l && u < 5)
        return r || new zt(0);
    var l = !r || s
      , f = !s || s.i;
    s || (s = {}),
    r || (r = new zt(u * 3));
    var c = function(me) {
        var $e = r.length;
        if (me > $e) {
            var bt = new zt(Math.max($e * 2, me));
            bt.set(r),
            r = bt
        }
    }
      , g = s.f || 0
      , p = s.p || 0
      , v = s.b || 0
      , h = s.l
      , A = s.d
      , B = s.m
      , E = s.n
      , M = u * 8;
    do {
        if (!h) {
            s.f = g = Yt(o, p, 1);
            var D = Yt(o, p + 1, 3);
            if (p += 3,
            D)
                if (D == 1)
                    h = jp,
                    A = Xp,
                    B = 9,
                    E = 5;
                else if (D == 2) {
                    var R = Yt(o, p, 31) + 257
                      , U = Yt(o, p + 10, 15) + 4
                      , b = R + Yt(o, p + 5, 31) + 1;
                    p += 14;
                    for (var k = new zt(b), Y = new zt(19), X = 0; X < U; ++X)
                        Y[Kp[X]] = Yt(o, p + X * 3, 7);
                    p += U * 3;
                    for (var z = ua(Y), oe = (1 << z) - 1, J = qr(Y, z, 1), X = 0; X < b; ) {
                        var ue = J[Yt(o, p, oe)];
                        p += ue & 15;
                        var w = ue >>> 4;
                        if (w < 16)
                            k[X++] = w;
                        else {
                            var Ae = 0
                              , _e = 0;
                            for (w == 16 ? (_e = 3 + Yt(o, p, 3),
                            p += 2,
                            Ae = k[X - 1]) : w == 17 ? (_e = 3 + Yt(o, p, 7),
                            p += 3) : w == 18 && (_e = 11 + Yt(o, p, 127),
                            p += 7); _e--; )
                                k[X++] = Ae
                        }
                    }
                    var Re = k.subarray(0, R)
                      , He = k.subarray(R);
                    B = ua(Re),
                    E = ua(He),
                    h = qr(Re, B, 1),
                    A = qr(He, E, 1)
                } else
                    throw "invalid block type";
            else {
                var w = Wp(p) + 4
                  , I = o[w - 4] | o[w - 3] << 8
                  , T = w + I;
                if (T > u) {
                    if (f)
                        throw "unexpected EOF";
                    break
                }
                l && c(v + I),
                r.set(o.subarray(w, T), v),
                s.b = v += I,
                s.p = p = T * 8;
                continue
            }
            if (p > M) {
                if (f)
                    throw "unexpected EOF";
                break
            }
        }
        l && c(v + 131072);
        for (var ke = (1 << B) - 1, G = (1 << E) - 1, j = p; ; j = p) {
            var Ae = h[ca(o, p) & ke]
              , K = Ae >>> 4;
            if (p += Ae & 15,
            p > M) {
                if (f)
                    throw "unexpected EOF";
                break
            }
            if (!Ae)
                throw "invalid length/literal";
            if (K < 256)
                r[v++] = K;
            else if (K == 256) {
                j = p,
                h = null;
                break
            } else {
                var re = K - 254;
                if (K > 264) {
                    var X = K - 257
                      , le = Gc[X];
                    re = Yt(o, p, (1 << le) - 1) + Pc[X],
                    p += le
                }
                var ye = A[ca(o, p) & G]
                  , Ue = ye >>> 4;
                if (!ye)
                    throw "invalid distance";
                p += ye & 15;
                var He = bp[Ue];
                if (Ue > 3) {
                    var le = xc[Ue];
                    He += ca(o, p) & (1 << le) - 1,
                    p += le
                }
                if (p > M) {
                    if (f)
                        throw "unexpected EOF";
                    break
                }
                l && c(v + 131072);
                for (var qe = v + re; v < qe; v += 4)
                    r[v] = r[v - He],
                    r[v + 1] = r[v + 1 - He],
                    r[v + 2] = r[v + 2 - He],
                    r[v + 3] = r[v + 3 - He];
                v = qe
            }
        }
        s.l = h,
        s.p = j,
        s.b = v,
        h && (g = 1,
        s.m = B,
        s.d = A,
        s.n = E)
    } while (!g);
    return v == r.length ? r : Yp(r, 0, v)
}
  , Vp = new zt(0)
  , qp = function(o) {
    if ((o[0] & 15) != 8 || o[0] >>> 4 > 7 || (o[0] << 8 | o[1]) % 31)
        throw "invalid zlib data";
    if (o[1] & 32)
        throw "invalid zlib data: preset dictionaries not supported"
};
function as(o, r) {
    return Zp((qp(o),
    o.subarray(2, -4)), r)
}
var $p = typeof TextDecoder < "u" && new TextDecoder
  , eh = 0;
try {
    $p.decode(Vp, {
        stream: !0
    }),
    eh = 1
} catch {}
const th = o => o && o.isCubeTexture;
class nh extends Bs {
    constructor(r, s) {
        var u, l;
        const f = th(r)
          , g = ((l = f ? (u = r.image[0]) == null ? void 0 : u.width : r.image.width) != null ? l : 1024) / 4
          , p = Math.floor(Math.log2(g))
          , v = Math.pow(2, p)
          , h = 3 * Math.max(v, 16 * 7)
          , A = 4 * v
          , B = [f ? "#define ENVMAP_TYPE_CUBE" : "", `#define CUBEUV_TEXEL_WIDTH ${1 / h}`, `#define CUBEUV_TEXEL_HEIGHT ${1 / A}`, `#define CUBEUV_MAX_MIP ${p}.0`]
          , E = `
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `
          , M = B.join(`
`) + `
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${parseInt(tc.replace(/\D+/g, "")) >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
        }
        `
          , D = {
            map: {
                value: r
            },
            height: {
                value: s?.height || 15
            },
            radius: {
                value: s?.radius || 100
            }
        }
          , w = new Xf(1,16)
          , I = new Fa({
            uniforms: D,
            fragmentShader: M,
            vertexShader: E,
            side: nc
        });
        super(w, I)
    }
    set radius(r) {
        this.material.uniforms.radius.value = r
    }
    get radius() {
        return this.material.uniforms.radius.value
    }
    set height(r) {
        this.material.uniforms.height.value = r
    }
    get height() {
        return this.material.uniforms.height.value
    }
}
class La extends _a {
    constructor(r) {
        super(r),
        this.dracoLoader = null,
        this.ktx2Loader = null,
        this.meshoptDecoder = null,
        this.pluginCallbacks = [],
        this.register(function(s) {
            return new ah(s)
        }),
        this.register(function(s) {
            return new Ah(s)
        }),
        this.register(function(s) {
            return new mh(s)
        }),
        this.register(function(s) {
            return new gh(s)
        }),
        this.register(function(s) {
            return new uh(s)
        }),
        this.register(function(s) {
            return new ch(s)
        }),
        this.register(function(s) {
            return new fh(s)
        }),
        this.register(function(s) {
            return new dh(s)
        }),
        this.register(function(s) {
            return new oh(s)
        }),
        this.register(function(s) {
            return new ph(s)
        }),
        this.register(function(s) {
            return new lh(s)
        }),
        this.register(function(s) {
            return new hh(s)
        }),
        this.register(function(s) {
            return new ih(s)
        }),
        this.register(function(s) {
            return new vh(s)
        }),
        this.register(function(s) {
            return new Bh(s)
        })
    }
    load(r, s, u, l) {
        const f = this;
        let c;
        this.resourcePath !== "" ? c = this.resourcePath : this.path !== "" ? c = this.path : c = Vn.extractUrlBase(r),
        this.manager.itemStart(r);
        const g = function(v) {
            l ? l(v) : console.error(v),
            f.manager.itemError(r),
            f.manager.itemEnd(r)
        }
          , p = new Dn(this.manager);
        p.setPath(this.path),
        p.setResponseType("arraybuffer"),
        p.setRequestHeader(this.requestHeader),
        p.setWithCredentials(this.withCredentials),
        p.load(r, function(v) {
            try {
                f.parse(v, c, function(h) {
                    s(h),
                    f.manager.itemEnd(r)
                }, g)
            } catch (h) {
                g(h)
            }
        }, u, g)
    }
    setDRACOLoader(r) {
        return this.dracoLoader = r,
        this
    }
    setDDSLoader() {
        throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')
    }
    setKTX2Loader(r) {
        return this.ktx2Loader = r,
        this
    }
    setMeshoptDecoder(r) {
        return this.meshoptDecoder = r,
        this
    }
    register(r) {
        return this.pluginCallbacks.indexOf(r) === -1 && this.pluginCallbacks.push(r),
        this
    }
    unregister(r) {
        return this.pluginCallbacks.indexOf(r) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(r), 1),
        this
    }
    parse(r, s, u, l) {
        let f;
        const c = {}
          , g = {};
        if (typeof r == "string")
            f = JSON.parse(r);
        else if (r instanceof ArrayBuffer)
            if (Vn.decodeText(new Uint8Array(r.slice(0, 4))) === Nc) {
                try {
                    c[Ge.KHR_BINARY_GLTF] = new Ch(r)
                } catch (h) {
                    l && l(h);
                    return
                }
                f = JSON.parse(c[Ge.KHR_BINARY_GLTF].content)
            } else
                f = JSON.parse(Vn.decodeText(new Uint8Array(r)));
        else
            f = r;
        if (f.asset === void 0 || f.asset.version[0] < 2) {
            l && l(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
            return
        }
        const p = new xh(f,{
            path: s || this.resourcePath || "",
            crossOrigin: this.crossOrigin,
            requestHeader: this.requestHeader,
            manager: this.manager,
            ktx2Loader: this.ktx2Loader,
            meshoptDecoder: this.meshoptDecoder
        });
        p.fileLoader.setRequestHeader(this.requestHeader);
        for (let v = 0; v < this.pluginCallbacks.length; v++) {
            const h = this.pluginCallbacks[v](p);
            g[h.name] = h,
            c[h.name] = !0
        }
        if (f.extensionsUsed)
            for (let v = 0; v < f.extensionsUsed.length; ++v) {
                const h = f.extensionsUsed[v]
                  , A = f.extensionsRequired || [];
                switch (h) {
                case Ge.KHR_MATERIALS_UNLIT:
                    c[h] = new sh;
                    break;
                case Ge.KHR_DRACO_MESH_COMPRESSION:
                    c[h] = new yh(f,this.dracoLoader);
                    break;
                case Ge.KHR_TEXTURE_TRANSFORM:
                    c[h] = new Eh;
                    break;
                case Ge.KHR_MESH_QUANTIZATION:
                    c[h] = new Mh;
                    break;
                default:
                    A.indexOf(h) >= 0 && g[h] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + h + '".')
                }
            }
        p.setExtensions(c),
        p.setPlugins(g),
        p.parse(u, l)
    }
    parseAsync(r, s) {
        const u = this;
        return new Promise(function(l, f) {
            u.parse(r, s, l, f)
        }
        )
    }
}
function rh() {
    let o = {};
    return {
        get: function(r) {
            return o[r]
        },
        add: function(r, s) {
            o[r] = s
        },
        remove: function(r) {
            delete o[r]
        },
        removeAll: function() {
            o = {}
        }
    }
}
const Ge = {
    KHR_BINARY_GLTF: "KHR_binary_glTF",
    KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
    KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
    KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
    KHR_MATERIALS_IOR: "KHR_materials_ior",
    KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
    KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
    KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
    KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
    KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
    KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
    KHR_MATERIALS_VOLUME: "KHR_materials_volume",
    KHR_TEXTURE_BASISU: "KHR_texture_basisu",
    KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
    KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
    KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
    EXT_TEXTURE_WEBP: "EXT_texture_webp",
    EXT_TEXTURE_AVIF: "EXT_texture_avif",
    EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
    EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class ih {
    constructor(r) {
        this.parser = r,
        this.name = Ge.KHR_LIGHTS_PUNCTUAL,
        this.cache = {
            refs: {},
            uses: {}
        }
    }
    _markDefs() {
        const r = this.parser
          , s = this.parser.json.nodes || [];
        for (let u = 0, l = s.length; u < l; u++) {
            const f = s[u];
            f.extensions && f.extensions[this.name] && f.extensions[this.name].light !== void 0 && r._addNodeRef(this.cache, f.extensions[this.name].light)
        }
    }
    _loadLight(r) {
        const s = this.parser
          , u = "light:" + r;
        let l = s.cache.get(u);
        if (l)
            return l;
        const f = s.json
          , p = ((f.extensions && f.extensions[this.name] || {}).lights || [])[r];
        let v;
        const h = new Gn(16777215);
        p.color !== void 0 && h.fromArray(p.color);
        const A = p.range !== void 0 ? p.range : 0;
        switch (p.type) {
        case "directional":
            v = new Zf(h),
            v.target.position.set(0, 0, -1),
            v.add(v.target);
            break;
        case "point":
            v = new Yf(h),
            v.distance = A;
            break;
        case "spot":
            v = new Wf(h),
            v.distance = A,
            p.spot = p.spot || {},
            p.spot.innerConeAngle = p.spot.innerConeAngle !== void 0 ? p.spot.innerConeAngle : 0,
            p.spot.outerConeAngle = p.spot.outerConeAngle !== void 0 ? p.spot.outerConeAngle : Math.PI / 4,
            v.angle = p.spot.outerConeAngle,
            v.penumbra = 1 - p.spot.innerConeAngle / p.spot.outerConeAngle,
            v.target.position.set(0, 0, -1),
            v.add(v.target);
            break;
        default:
            throw new Error("THREE.GLTFLoader: Unexpected light type: " + p.type)
        }
        return v.position.set(0, 0, 0),
        v.decay = 2,
        _n(v, p),
        p.intensity !== void 0 && (v.intensity = p.intensity),
        v.name = s.createUniqueName(p.name || "light_" + r),
        l = Promise.resolve(v),
        s.cache.add(u, l),
        l
    }
    getDependency(r, s) {
        if (r === "light")
            return this._loadLight(s)
    }
    createNodeAttachment(r) {
        const s = this
          , u = this.parser
          , f = u.json.nodes[r]
          , g = (f.extensions && f.extensions[this.name] || {}).light;
        return g === void 0 ? null : this._loadLight(g).then(function(p) {
            return u._getNodeRef(s.cache, g, p)
        })
    }
}
class sh {
    constructor() {
        this.name = Ge.KHR_MATERIALS_UNLIT
    }
    getMaterialType() {
        return mr
    }
    extendParams(r, s, u) {
        const l = [];
        r.color = new Gn(1,1,1),
        r.opacity = 1;
        const f = s.pbrMetallicRoughness;
        if (f) {
            if (Array.isArray(f.baseColorFactor)) {
                const c = f.baseColorFactor;
                r.color.fromArray(c),
                r.opacity = c[3]
            }
            f.baseColorTexture !== void 0 && l.push(u.assignTexture(r, "map", f.baseColorTexture, 3001))
        }
        return Promise.all(l)
    }
}
class oh {
    constructor(r) {
        this.parser = r,
        this.name = Ge.KHR_MATERIALS_EMISSIVE_STRENGTH
    }
    extendMaterialParams(r, s) {
        const l = this.parser.json.materials[r];
        if (!l.extensions || !l.extensions[this.name])
            return Promise.resolve();
        const f = l.extensions[this.name].emissiveStrength;
        return f !== void 0 && (s.emissiveIntensity = f),
        Promise.resolve()
    }
}
class ah {
    constructor(r) {
        this.parser = r,
        this.name = Ge.KHR_MATERIALS_CLEARCOAT
    }
    getMaterialType(r) {
        const u = this.parser.json.materials[r];
        return !u.extensions || !u.extensions[this.name] ? null : xn
    }
    extendMaterialParams(r, s) {
        const u = this.parser
          , l = u.json.materials[r];
        if (!l.extensions || !l.extensions[this.name])
            return Promise.resolve();
        const f = []
          , c = l.extensions[this.name];
        if (c.clearcoatFactor !== void 0 && (s.clearcoat = c.clearcoatFactor),
        c.clearcoatTexture !== void 0 && f.push(u.assignTexture(s, "clearcoatMap", c.clearcoatTexture)),
        c.clearcoatRoughnessFactor !== void 0 && (s.clearcoatRoughness = c.clearcoatRoughnessFactor),
        c.clearcoatRoughnessTexture !== void 0 && f.push(u.assignTexture(s, "clearcoatRoughnessMap", c.clearcoatRoughnessTexture)),
        c.clearcoatNormalTexture !== void 0 && (f.push(u.assignTexture(s, "clearcoatNormalMap", c.clearcoatNormalTexture)),
        c.clearcoatNormalTexture.scale !== void 0)) {
            const g = c.clearcoatNormalTexture.scale;
            s.clearcoatNormalScale = new vs(g,g)
        }
        return Promise.all(f)
    }
}
class lh {
    constructor(r) {
        this.parser = r,
        this.name = Ge.KHR_MATERIALS_IRIDESCENCE
    }
    getMaterialType(r) {
        const u = this.parser.json.materials[r];
        return !u.extensions || !u.extensions[this.name] ? null : xn
    }
    extendMaterialParams(r, s) {
        const u = this.parser
          , l = u.json.materials[r];
        if (!l.extensions || !l.extensions[this.name])
            return Promise.resolve();
        const f = []
          , c = l.extensions[this.name];
        return c.iridescenceFactor !== void 0 && (s.iridescence = c.iridescenceFactor),
        c.iridescenceTexture !== void 0 && f.push(u.assignTexture(s, "iridescenceMap", c.iridescenceTexture)),
        c.iridescenceIor !== void 0 && (s.iridescenceIOR = c.iridescenceIor),
        s.iridescenceThicknessRange === void 0 && (s.iridescenceThicknessRange = [100, 400]),
        c.iridescenceThicknessMinimum !== void 0 && (s.iridescenceThicknessRange[0] = c.iridescenceThicknessMinimum),
        c.iridescenceThicknessMaximum !== void 0 && (s.iridescenceThicknessRange[1] = c.iridescenceThicknessMaximum),
        c.iridescenceThicknessTexture !== void 0 && f.push(u.assignTexture(s, "iridescenceThicknessMap", c.iridescenceThicknessTexture)),
        Promise.all(f)
    }
}
class uh {
    constructor(r) {
        this.parser = r,
        this.name = Ge.KHR_MATERIALS_SHEEN
    }
    getMaterialType(r) {
        const u = this.parser.json.materials[r];
        return !u.extensions || !u.extensions[this.name] ? null : xn
    }
    extendMaterialParams(r, s) {
        const u = this.parser
          , l = u.json.materials[r];
        if (!l.extensions || !l.extensions[this.name])
            return Promise.resolve();
        const f = [];
        s.sheenColor = new Gn(0,0,0),
        s.sheenRoughness = 0,
        s.sheen = 1;
        const c = l.extensions[this.name];
        return c.sheenColorFactor !== void 0 && s.sheenColor.fromArray(c.sheenColorFactor),
        c.sheenRoughnessFactor !== void 0 && (s.sheenRoughness = c.sheenRoughnessFactor),
        c.sheenColorTexture !== void 0 && f.push(u.assignTexture(s, "sheenColorMap", c.sheenColorTexture, 3001)),
        c.sheenRoughnessTexture !== void 0 && f.push(u.assignTexture(s, "sheenRoughnessMap", c.sheenRoughnessTexture)),
        Promise.all(f)
    }
}
class ch {
    constructor(r) {
        this.parser = r,
        this.name = Ge.KHR_MATERIALS_TRANSMISSION
    }
    getMaterialType(r) {
        const u = this.parser.json.materials[r];
        return !u.extensions || !u.extensions[this.name] ? null : xn
    }
    extendMaterialParams(r, s) {
        const u = this.parser
          , l = u.json.materials[r];
        if (!l.extensions || !l.extensions[this.name])
            return Promise.resolve();
        const f = []
          , c = l.extensions[this.name];
        return c.transmissionFactor !== void 0 && (s.transmission = c.transmissionFactor),
        c.transmissionTexture !== void 0 && f.push(u.assignTexture(s, "transmissionMap", c.transmissionTexture)),
        Promise.all(f)
    }
}
class fh {
    constructor(r) {
        this.parser = r,
        this.name = Ge.KHR_MATERIALS_VOLUME
    }
    getMaterialType(r) {
        const u = this.parser.json.materials[r];
        return !u.extensions || !u.extensions[this.name] ? null : xn
    }
    extendMaterialParams(r, s) {
        const u = this.parser
          , l = u.json.materials[r];
        if (!l.extensions || !l.extensions[this.name])
            return Promise.resolve();
        const f = []
          , c = l.extensions[this.name];
        s.thickness = c.thicknessFactor !== void 0 ? c.thicknessFactor : 0,
        c.thicknessTexture !== void 0 && f.push(u.assignTexture(s, "thicknessMap", c.thicknessTexture)),
        s.attenuationDistance = c.attenuationDistance || 1 / 0;
        const g = c.attenuationColor || [1, 1, 1];
        return s.attenuationColor = new Gn(g[0],g[1],g[2]),
        Promise.all(f)
    }
}
class dh {
    constructor(r) {
        this.parser = r,
        this.name = Ge.KHR_MATERIALS_IOR
    }
    getMaterialType(r) {
        const u = this.parser.json.materials[r];
        return !u.extensions || !u.extensions[this.name] ? null : xn
    }
    extendMaterialParams(r, s) {
        const l = this.parser.json.materials[r];
        if (!l.extensions || !l.extensions[this.name])
            return Promise.resolve();
        const f = l.extensions[this.name];
        return s.ior = f.ior !== void 0 ? f.ior : 1.5,
        Promise.resolve()
    }
}
class ph {
    constructor(r) {
        this.parser = r,
        this.name = Ge.KHR_MATERIALS_SPECULAR
    }
    getMaterialType(r) {
        const u = this.parser.json.materials[r];
        return !u.extensions || !u.extensions[this.name] ? null : xn
    }
    extendMaterialParams(r, s) {
        const u = this.parser
          , l = u.json.materials[r];
        if (!l.extensions || !l.extensions[this.name])
            return Promise.resolve();
        const f = []
          , c = l.extensions[this.name];
        s.specularIntensity = c.specularFactor !== void 0 ? c.specularFactor : 1,
        c.specularTexture !== void 0 && f.push(u.assignTexture(s, "specularIntensityMap", c.specularTexture));
        const g = c.specularColorFactor || [1, 1, 1];
        return s.specularColor = new Gn(g[0],g[1],g[2]),
        c.specularColorTexture !== void 0 && f.push(u.assignTexture(s, "specularColorMap", c.specularColorTexture, 3001)),
        Promise.all(f)
    }
}
class hh {
    constructor(r) {
        this.parser = r,
        this.name = Ge.KHR_MATERIALS_ANISOTROPY
    }
    getMaterialType(r) {
        const u = this.parser.json.materials[r];
        return !u.extensions || !u.extensions[this.name] ? null : xn
    }
    extendMaterialParams(r, s) {
        const u = this.parser
          , l = u.json.materials[r];
        if (!l.extensions || !l.extensions[this.name])
            return Promise.resolve();
        const f = []
          , c = l.extensions[this.name];
        return c.anisotropyStrength !== void 0 && (s.anisotropy = c.anisotropyStrength),
        c.anisotropyRotation !== void 0 && (s.anisotropyRotation = c.anisotropyRotation),
        c.anisotropyTexture !== void 0 && f.push(u.assignTexture(s, "anisotropyMap", c.anisotropyTexture)),
        Promise.all(f)
    }
}
class Ah {
    constructor(r) {
        this.parser = r,
        this.name = Ge.KHR_TEXTURE_BASISU
    }
    loadTexture(r) {
        const s = this.parser
          , u = s.json
          , l = u.textures[r];
        if (!l.extensions || !l.extensions[this.name])
            return null;
        const f = l.extensions[this.name]
          , c = s.options.ktx2Loader;
        if (!c) {
            if (u.extensionsRequired && u.extensionsRequired.indexOf(this.name) >= 0)
                throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
            return null
        }
        return s.loadTextureImage(r, f.source, c)
    }
}
class mh {
    constructor(r) {
        this.parser = r,
        this.name = Ge.EXT_TEXTURE_WEBP,
        this.isSupported = null
    }
    loadTexture(r) {
        const s = this.name
          , u = this.parser
          , l = u.json
          , f = l.textures[r];
        if (!f.extensions || !f.extensions[s])
            return null;
        const c = f.extensions[s]
          , g = l.images[c.source];
        let p = u.textureLoader;
        if (g.uri) {
            const v = u.options.manager.getHandler(g.uri);
            v !== null && (p = v)
        }
        return this.detectSupport().then(function(v) {
            if (v)
                return u.loadTextureImage(r, c.source, p);
            if (l.extensionsRequired && l.extensionsRequired.indexOf(s) >= 0)
                throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
            return u.loadTexture(r)
        })
    }
    detectSupport() {
        return this.isSupported || (this.isSupported = new Promise(function(r) {
            const s = new Image;
            s.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
            s.onload = s.onerror = function() {
                r(s.height === 1)
            }
        }
        )),
        this.isSupported
    }
}
class gh {
    constructor(r) {
        this.parser = r,
        this.name = Ge.EXT_TEXTURE_AVIF,
        this.isSupported = null
    }
    loadTexture(r) {
        const s = this.name
          , u = this.parser
          , l = u.json
          , f = l.textures[r];
        if (!f.extensions || !f.extensions[s])
            return null;
        const c = f.extensions[s]
          , g = l.images[c.source];
        let p = u.textureLoader;
        if (g.uri) {
            const v = u.options.manager.getHandler(g.uri);
            v !== null && (p = v)
        }
        return this.detectSupport().then(function(v) {
            if (v)
                return u.loadTextureImage(r, c.source, p);
            if (l.extensionsRequired && l.extensionsRequired.indexOf(s) >= 0)
                throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
            return u.loadTexture(r)
        })
    }
    detectSupport() {
        return this.isSupported || (this.isSupported = new Promise(function(r) {
            const s = new Image;
            s.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",
            s.onload = s.onerror = function() {
                r(s.height === 1)
            }
        }
        )),
        this.isSupported
    }
}
class vh {
    constructor(r) {
        this.name = Ge.EXT_MESHOPT_COMPRESSION,
        this.parser = r
    }
    loadBufferView(r) {
        const s = this.parser.json
          , u = s.bufferViews[r];
        if (u.extensions && u.extensions[this.name]) {
            const l = u.extensions[this.name]
              , f = this.parser.getDependency("buffer", l.buffer)
              , c = this.parser.options.meshoptDecoder;
            if (!c || !c.supported) {
                if (s.extensionsRequired && s.extensionsRequired.indexOf(this.name) >= 0)
                    throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
                return null
            }
            return f.then(function(g) {
                const p = l.byteOffset || 0
                  , v = l.byteLength || 0
                  , h = l.count
                  , A = l.byteStride
                  , B = new Uint8Array(g,p,v);
                return c.decodeGltfBufferAsync ? c.decodeGltfBufferAsync(h, A, B, l.mode, l.filter).then(function(E) {
                    return E.buffer
                }) : c.ready.then(function() {
                    const E = new ArrayBuffer(h * A);
                    return c.decodeGltfBuffer(new Uint8Array(E), h, A, B, l.mode, l.filter),
                    E
                })
            })
        } else
            return null
    }
}
class Bh {
    constructor(r) {
        this.name = Ge.EXT_MESH_GPU_INSTANCING,
        this.parser = r
    }
    createNodeMesh(r) {
        const s = this.parser.json
          , u = s.nodes[r];
        if (!u.extensions || !u.extensions[this.name] || u.mesh === void 0)
            return null;
        const l = s.meshes[u.mesh];
        for (const v of l.primitives)
            if (v.mode !== Qt.TRIANGLES && v.mode !== Qt.TRIANGLE_STRIP && v.mode !== Qt.TRIANGLE_FAN && v.mode !== void 0)
                return null;
        const c = u.extensions[this.name].attributes
          , g = []
          , p = {};
        for (const v in c)
            g.push(this.parser.getDependency("accessor", c[v]).then(h => (p[v] = h,
            p[v])));
        return g.length < 1 ? null : (g.push(this.parser.createNodeMesh(r)),
        Promise.all(g).then(v => {
            const h = v.pop()
              , A = h.isGroup ? h.children : [h]
              , B = v[0].count
              , E = [];
            for (const M of A) {
                const D = new ms
                  , w = new pt
                  , I = new rc
                  , T = new pt(1,1,1)
                  , R = new Vf(M.geometry,M.material,B);
                for (let U = 0; U < B; U++)
                    p.TRANSLATION && w.fromBufferAttribute(p.TRANSLATION, U),
                    p.ROTATION && I.fromBufferAttribute(p.ROTATION, U),
                    p.SCALE && T.fromBufferAttribute(p.SCALE, U),
                    R.setMatrixAt(U, D.compose(w, I, T));
                for (const U in p)
                    U !== "TRANSLATION" && U !== "ROTATION" && U !== "SCALE" && M.geometry.setAttribute(U, p[U]);
                ic.prototype.copy.call(R, M),
                this.parser.assignFinalMaterial(R),
                E.push(R)
            }
            return h.isGroup ? (h.clear(),
            h.add(...E),
            h) : E[0]
        }
        ))
    }
}
const Nc = "glTF"
  , Wr = 12
  , ju = {
    JSON: 1313821514,
    BIN: 5130562
};
class Ch {
    constructor(r) {
        this.name = Ge.KHR_BINARY_GLTF,
        this.content = null,
        this.body = null;
        const s = new DataView(r,0,Wr);
        if (this.header = {
            magic: Vn.decodeText(new Uint8Array(r.slice(0, 4))),
            version: s.getUint32(4, !0),
            length: s.getUint32(8, !0)
        },
        this.header.magic !== Nc)
            throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
        if (this.header.version < 2)
            throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
        const u = this.header.length - Wr
          , l = new DataView(r,Wr);
        let f = 0;
        for (; f < u; ) {
            const c = l.getUint32(f, !0);
            f += 4;
            const g = l.getUint32(f, !0);
            if (f += 4,
            g === ju.JSON) {
                const p = new Uint8Array(r,Wr + f,c);
                this.content = Vn.decodeText(p)
            } else if (g === ju.BIN) {
                const p = Wr + f;
                this.body = r.slice(p, p + c)
            }
            f += c
        }
        if (this.content === null)
            throw new Error("THREE.GLTFLoader: JSON content not found.")
    }
}
class yh {
    constructor(r, s) {
        if (!s)
            throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
        this.name = Ge.KHR_DRACO_MESH_COMPRESSION,
        this.json = r,
        this.dracoLoader = s,
        this.dracoLoader.preload()
    }
    decodePrimitive(r, s) {
        const u = this.json
          , l = this.dracoLoader
          , f = r.extensions[this.name].bufferView
          , c = r.extensions[this.name].attributes
          , g = {}
          , p = {}
          , v = {};
        for (const h in c) {
            const A = Sa[h] || h.toLowerCase();
            g[A] = c[h]
        }
        for (const h in r.attributes) {
            const A = Sa[h] || h.toLowerCase();
            if (c[h] !== void 0) {
                const B = u.accessors[r.attributes[h]]
                  , E = Br[B.componentType];
                v[A] = E.name,
                p[A] = B.normalized === !0
            }
        }
        return s.getDependency("bufferView", f).then(function(h) {
            return new Promise(function(A) {
                l.decodeDracoFile(h, function(B) {
                    for (const E in B.attributes) {
                        const M = B.attributes[E]
                          , D = p[E];
                        D !== void 0 && (M.normalized = D)
                    }
                    A(B)
                }, g, v)
            }
            )
        })
    }
}
class Eh {
    constructor() {
        this.name = Ge.KHR_TEXTURE_TRANSFORM
    }
    extendTexture(r, s) {
        return (s.texCoord === void 0 || s.texCoord === r.channel) && s.offset === void 0 && s.rotation === void 0 && s.scale === void 0 || (r = r.clone(),
        s.texCoord !== void 0 && (r.channel = s.texCoord),
        s.offset !== void 0 && r.offset.fromArray(s.offset),
        s.rotation !== void 0 && (r.rotation = s.rotation),
        s.scale !== void 0 && r.repeat.fromArray(s.scale),
        r.needsUpdate = !0),
        r
    }
}
class Mh {
    constructor() {
        this.name = Ge.KHR_MESH_QUANTIZATION
    }
}
class kc extends Md {
    constructor(r, s, u, l) {
        super(r, s, u, l)
    }
    copySampleValue_(r) {
        const s = this.resultBuffer
          , u = this.sampleValues
          , l = this.valueSize
          , f = r * l * 3 + l;
        for (let c = 0; c !== l; c++)
            s[c] = u[f + c];
        return s
    }
    interpolate_(r, s, u, l) {
        const f = this.resultBuffer
          , c = this.sampleValues
          , g = this.valueSize
          , p = g * 2
          , v = g * 3
          , h = l - s
          , A = (u - s) / h
          , B = A * A
          , E = B * A
          , M = r * v
          , D = M - v
          , w = -2 * E + 3 * B
          , I = E - B
          , T = 1 - w
          , R = I - B + A;
        for (let U = 0; U !== g; U++) {
            const b = c[D + U + g]
              , k = c[D + U + p] * h
              , Y = c[M + U + g]
              , X = c[M + U] * h;
            f[U] = T * b + R * k + w * Y + I * X
        }
        return f
    }
}
const Sh = new rc;
class Ih extends kc {
    interpolate_(r, s, u, l) {
        const f = super.interpolate_(r, s, u, l);
        return Sh.fromArray(f).normalize().toArray(f),
        f
    }
}
const Qt = {
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6
}
  , Br = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array
}
  , Xu = {
    9728: id,
    9729: _t,
    9984: rd,
    9985: nd,
    9986: td,
    9987: sc
}
  , Wu = {
    33071: An,
    33648: sd,
    10497: va
}
  , fa = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
}
  , Sa = {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    ...Jp >= 152 ? {
        TEXCOORD_0: "uv",
        TEXCOORD_1: "uv1",
        TEXCOORD_2: "uv2",
        TEXCOORD_3: "uv3"
    } : {
        TEXCOORD_0: "uv",
        TEXCOORD_1: "uv2"
    },
    COLOR_0: "color",
    WEIGHTS_0: "skinWeight",
    JOINTS_0: "skinIndex"
}
  , Rn = {
    scale: "scale",
    translation: "position",
    rotation: "quaternion",
    weights: "morphTargetInfluences"
}
  , wh = {
    CUBICSPLINE: void 0,
    LINEAR: ac,
    STEP: md
}
  , da = {
    OPAQUE: "OPAQUE",
    MASK: "MASK",
    BLEND: "BLEND"
};
function Rh(o) {
    return o.DefaultMaterial === void 0 && (o.DefaultMaterial = new oc({
        color: 16777215,
        emissive: 0,
        metalness: 1,
        roughness: 1,
        transparent: !1,
        depthTest: !0,
        side: Ed
    })),
    o.DefaultMaterial
}
function Yn(o, r, s) {
    for (const u in s.extensions)
        o[u] === void 0 && (r.userData.gltfExtensions = r.userData.gltfExtensions || {},
        r.userData.gltfExtensions[u] = s.extensions[u])
}
function _n(o, r) {
    r.extras !== void 0 && (typeof r.extras == "object" ? Object.assign(o.userData, r.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + r.extras))
}
function Fh(o, r, s) {
    let u = !1
      , l = !1
      , f = !1;
    for (let v = 0, h = r.length; v < h; v++) {
        const A = r[v];
        if (A.POSITION !== void 0 && (u = !0),
        A.NORMAL !== void 0 && (l = !0),
        A.COLOR_0 !== void 0 && (f = !0),
        u && l && f)
            break
    }
    if (!u && !l && !f)
        return Promise.resolve(o);
    const c = []
      , g = []
      , p = [];
    for (let v = 0, h = r.length; v < h; v++) {
        const A = r[v];
        if (u) {
            const B = A.POSITION !== void 0 ? s.getDependency("accessor", A.POSITION) : o.attributes.position;
            c.push(B)
        }
        if (l) {
            const B = A.NORMAL !== void 0 ? s.getDependency("accessor", A.NORMAL) : o.attributes.normal;
            g.push(B)
        }
        if (f) {
            const B = A.COLOR_0 !== void 0 ? s.getDependency("accessor", A.COLOR_0) : o.attributes.color;
            p.push(B)
        }
    }
    return Promise.all([Promise.all(c), Promise.all(g), Promise.all(p)]).then(function(v) {
        const h = v[0]
          , A = v[1]
          , B = v[2];
        return u && (o.morphAttributes.position = h),
        l && (o.morphAttributes.normal = A),
        f && (o.morphAttributes.color = B),
        o.morphTargetsRelative = !0,
        o
    })
}
function _h(o, r) {
    if (o.updateMorphTargets(),
    r.weights !== void 0)
        for (let s = 0, u = r.weights.length; s < u; s++)
            o.morphTargetInfluences[s] = r.weights[s];
    if (r.extras && Array.isArray(r.extras.targetNames)) {
        const s = r.extras.targetNames;
        if (o.morphTargetInfluences.length === s.length) {
            o.morphTargetDictionary = {};
            for (let u = 0, l = s.length; u < l; u++)
                o.morphTargetDictionary[s[u]] = u
        } else
            console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")
    }
}
function Th(o) {
    let r;
    const s = o.extensions && o.extensions[Ge.KHR_DRACO_MESH_COMPRESSION];
    if (s ? r = "draco:" + s.bufferView + ":" + s.indices + ":" + pa(s.attributes) : r = o.indices + ":" + pa(o.attributes) + ":" + o.mode,
    o.targets !== void 0)
        for (let u = 0, l = o.targets.length; u < l; u++)
            r += ":" + pa(o.targets[u]);
    return r
}
function pa(o) {
    let r = "";
    const s = Object.keys(o).sort();
    for (let u = 0, l = s.length; u < l; u++)
        r += s[u] + ":" + o[s[u]] + ";";
    return r
}
function Ia(o) {
    switch (o) {
    case Int8Array:
        return 1 / 127;
    case Uint8Array:
        return 1 / 255;
    case Int16Array:
        return 1 / 32767;
    case Uint16Array:
        return 1 / 65535;
    default:
        throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")
    }
}
function Dh(o) {
    return o.search(/\.jpe?g($|\?)/i) > 0 || o.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : o.search(/\.webp($|\?)/i) > 0 || o.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png"
}
const Gh = new ms;
class xh {
    constructor(r={}, s={}) {
        this.json = r,
        this.extensions = {},
        this.plugins = {},
        this.options = s,
        this.cache = new rh,
        this.associations = new Map,
        this.primitiveCache = {},
        this.nodeCache = {},
        this.meshCache = {
            refs: {},
            uses: {}
        },
        this.cameraCache = {
            refs: {},
            uses: {}
        },
        this.lightCache = {
            refs: {},
            uses: {}
        },
        this.sourceCache = {},
        this.textureCache = {},
        this.nodeNamesUsed = {};
        let u = !1
          , l = !1
          , f = -1;
        typeof navigator < "u" && typeof navigator.userAgent < "u" && (u = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0,
        l = navigator.userAgent.indexOf("Firefox") > -1,
        f = l ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1),
        typeof createImageBitmap > "u" || u || l && f < 98 ? this.textureLoader = new qf(this.options.manager) : this.textureLoader = new $f(this.options.manager),
        this.textureLoader.setCrossOrigin(this.options.crossOrigin),
        this.textureLoader.setRequestHeader(this.options.requestHeader),
        this.fileLoader = new Dn(this.options.manager),
        this.fileLoader.setResponseType("arraybuffer"),
        this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0)
    }
    setExtensions(r) {
        this.extensions = r
    }
    setPlugins(r) {
        this.plugins = r
    }
    parse(r, s) {
        const u = this
          , l = this.json
          , f = this.extensions;
        this.cache.removeAll(),
        this.nodeCache = {},
        this._invokeAll(function(c) {
            return c._markDefs && c._markDefs()
        }),
        Promise.all(this._invokeAll(function(c) {
            return c.beforeRoot && c.beforeRoot()
        })).then(function() {
            return Promise.all([u.getDependencies("scene"), u.getDependencies("animation"), u.getDependencies("camera")])
        }).then(function(c) {
            const g = {
                scene: c[0][l.scene || 0],
                scenes: c[0],
                animations: c[1],
                cameras: c[2],
                asset: l.asset,
                parser: u,
                userData: {}
            };
            Yn(f, g, l),
            _n(g, l),
            Promise.all(u._invokeAll(function(p) {
                return p.afterRoot && p.afterRoot(g)
            })).then(function() {
                r(g)
            })
        }).catch(s)
    }
    _markDefs() {
        const r = this.json.nodes || []
          , s = this.json.skins || []
          , u = this.json.meshes || [];
        for (let l = 0, f = s.length; l < f; l++) {
            const c = s[l].joints;
            for (let g = 0, p = c.length; g < p; g++)
                r[c[g]].isBone = !0
        }
        for (let l = 0, f = r.length; l < f; l++) {
            const c = r[l];
            c.mesh !== void 0 && (this._addNodeRef(this.meshCache, c.mesh),
            c.skin !== void 0 && (u[c.mesh].isSkinnedMesh = !0)),
            c.camera !== void 0 && this._addNodeRef(this.cameraCache, c.camera)
        }
    }
    _addNodeRef(r, s) {
        s !== void 0 && (r.refs[s] === void 0 && (r.refs[s] = r.uses[s] = 0),
        r.refs[s]++)
    }
    _getNodeRef(r, s, u) {
        if (r.refs[s] <= 1)
            return u;
        const l = u.clone()
          , f = (c, g) => {
            const p = this.associations.get(c);
            p != null && this.associations.set(g, p);
            for (const [v,h] of c.children.entries())
                f(h, g.children[v])
        }
        ;
        return f(u, l),
        l.name += "_instance_" + r.uses[s]++,
        l
    }
    _invokeOne(r) {
        const s = Object.values(this.plugins);
        s.push(this);
        for (let u = 0; u < s.length; u++) {
            const l = r(s[u]);
            if (l)
                return l
        }
        return null
    }
    _invokeAll(r) {
        const s = Object.values(this.plugins);
        s.unshift(this);
        const u = [];
        for (let l = 0; l < s.length; l++) {
            const f = r(s[l]);
            f && u.push(f)
        }
        return u
    }
    getDependency(r, s) {
        const u = r + ":" + s;
        let l = this.cache.get(u);
        if (!l) {
            switch (r) {
            case "scene":
                l = this.loadScene(s);
                break;
            case "node":
                l = this._invokeOne(function(f) {
                    return f.loadNode && f.loadNode(s)
                });
                break;
            case "mesh":
                l = this._invokeOne(function(f) {
                    return f.loadMesh && f.loadMesh(s)
                });
                break;
            case "accessor":
                l = this.loadAccessor(s);
                break;
            case "bufferView":
                l = this._invokeOne(function(f) {
                    return f.loadBufferView && f.loadBufferView(s)
                });
                break;
            case "buffer":
                l = this.loadBuffer(s);
                break;
            case "material":
                l = this._invokeOne(function(f) {
                    return f.loadMaterial && f.loadMaterial(s)
                });
                break;
            case "texture":
                l = this._invokeOne(function(f) {
                    return f.loadTexture && f.loadTexture(s)
                });
                break;
            case "skin":
                l = this.loadSkin(s);
                break;
            case "animation":
                l = this._invokeOne(function(f) {
                    return f.loadAnimation && f.loadAnimation(s)
                });
                break;
            case "camera":
                l = this.loadCamera(s);
                break;
            default:
                if (l = this._invokeOne(function(f) {
                    return f != this && f.getDependency && f.getDependency(r, s)
                }),
                !l)
                    throw new Error("Unknown type: " + r);
                break
            }
            this.cache.add(u, l)
        }
        return l
    }
    getDependencies(r) {
        let s = this.cache.get(r);
        if (!s) {
            const u = this
              , l = this.json[r + (r === "mesh" ? "es" : "s")] || [];
            s = Promise.all(l.map(function(f, c) {
                return u.getDependency(r, c)
            })),
            this.cache.add(r, s)
        }
        return s
    }
    loadBuffer(r) {
        const s = this.json.buffers[r]
          , u = this.fileLoader;
        if (s.type && s.type !== "arraybuffer")
            throw new Error("THREE.GLTFLoader: " + s.type + " buffer type is not supported.");
        if (s.uri === void 0 && r === 0)
            return Promise.resolve(this.extensions[Ge.KHR_BINARY_GLTF].body);
        const l = this.options;
        return new Promise(function(f, c) {
            u.load(Vn.resolveURL(s.uri, l.path), f, void 0, function() {
                c(new Error('THREE.GLTFLoader: Failed to load buffer "' + s.uri + '".'))
            })
        }
        )
    }
    loadBufferView(r) {
        const s = this.json.bufferViews[r];
        return this.getDependency("buffer", s.buffer).then(function(u) {
            const l = s.byteLength || 0
              , f = s.byteOffset || 0;
            return u.slice(f, f + l)
        })
    }
    loadAccessor(r) {
        const s = this
          , u = this.json
          , l = this.json.accessors[r];
        if (l.bufferView === void 0 && l.sparse === void 0) {
            const c = fa[l.type]
              , g = Br[l.componentType]
              , p = l.normalized === !0
              , v = new g(l.count * c);
            return Promise.resolve(new Vr(v,c,p))
        }
        const f = [];
        return l.bufferView !== void 0 ? f.push(this.getDependency("bufferView", l.bufferView)) : f.push(null),
        l.sparse !== void 0 && (f.push(this.getDependency("bufferView", l.sparse.indices.bufferView)),
        f.push(this.getDependency("bufferView", l.sparse.values.bufferView))),
        Promise.all(f).then(function(c) {
            const g = c[0]
              , p = fa[l.type]
              , v = Br[l.componentType]
              , h = v.BYTES_PER_ELEMENT
              , A = h * p
              , B = l.byteOffset || 0
              , E = l.bufferView !== void 0 ? u.bufferViews[l.bufferView].byteStride : void 0
              , M = l.normalized === !0;
            let D, w;
            if (E && E !== A) {
                const I = Math.floor(B / E)
                  , T = "InterleavedBuffer:" + l.bufferView + ":" + l.componentType + ":" + I + ":" + l.count;
                let R = s.cache.get(T);
                R || (D = new v(g,I * E,l.count * E / h),
                R = new ed(D,E / h),
                s.cache.add(T, R)),
                w = new Bd(R,p,B % E / h,M)
            } else
                g === null ? D = new v(l.count * p) : D = new v(g,B,l.count * p),
                w = new Vr(D,p,M);
            if (l.sparse !== void 0) {
                const I = fa.SCALAR
                  , T = Br[l.sparse.indices.componentType]
                  , R = l.sparse.indices.byteOffset || 0
                  , U = l.sparse.values.byteOffset || 0
                  , b = new T(c[1],R,l.sparse.count * I)
                  , k = new v(c[2],U,l.sparse.count * p);
                g !== null && (w = new Vr(w.array.slice(),w.itemSize,w.normalized));
                for (let Y = 0, X = b.length; Y < X; Y++) {
                    const z = b[Y];
                    if (w.setX(z, k[Y * p]),
                    p >= 2 && w.setY(z, k[Y * p + 1]),
                    p >= 3 && w.setZ(z, k[Y * p + 2]),
                    p >= 4 && w.setW(z, k[Y * p + 3]),
                    p >= 5)
                        throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")
                }
            }
            return w
        })
    }
    loadTexture(r) {
        const s = this.json
          , u = this.options
          , f = s.textures[r].source
          , c = s.images[f];
        let g = this.textureLoader;
        if (c.uri) {
            const p = u.manager.getHandler(c.uri);
            p !== null && (g = p)
        }
        return this.loadTextureImage(r, f, g)
    }
    loadTextureImage(r, s, u) {
        const l = this
          , f = this.json
          , c = f.textures[r]
          , g = f.images[s]
          , p = (g.uri || g.bufferView) + ":" + c.sampler;
        if (this.textureCache[p])
            return this.textureCache[p];
        const v = this.loadImageSource(s, u).then(function(h) {
            h.flipY = !1,
            h.name = c.name || g.name || "",
            h.name === "" && typeof g.uri == "string" && g.uri.startsWith("data:image/") === !1 && (h.name = g.uri);
            const B = (f.samplers || {})[c.sampler] || {};
            return h.magFilter = Xu[B.magFilter] || _t,
            h.minFilter = Xu[B.minFilter] || sc,
            h.wrapS = Wu[B.wrapS] || va,
            h.wrapT = Wu[B.wrapT] || va,
            l.associations.set(h, {
                textures: r
            }),
            h
        }).catch(function() {
            return null
        });
        return this.textureCache[p] = v,
        v
    }
    loadImageSource(r, s) {
        const u = this
          , l = this.json
          , f = this.options;
        if (this.sourceCache[r] !== void 0)
            return this.sourceCache[r].then(A => A.clone());
        const c = l.images[r]
          , g = self.URL || self.webkitURL;
        let p = c.uri || ""
          , v = !1;
        if (c.bufferView !== void 0)
            p = u.getDependency("bufferView", c.bufferView).then(function(A) {
                v = !0;
                const B = new Blob([A],{
                    type: c.mimeType
                });
                return p = g.createObjectURL(B),
                p
            });
        else if (c.uri === void 0)
            throw new Error("THREE.GLTFLoader: Image " + r + " is missing URI and bufferView");
        const h = Promise.resolve(p).then(function(A) {
            return new Promise(function(B, E) {
                let M = B;
                s.isImageBitmapLoader === !0 && (M = function(D) {
                    const w = new sn(D);
                    w.needsUpdate = !0,
                    B(w)
                }
                ),
                s.load(Vn.resolveURL(A, f.path), M, void 0, E)
            }
            )
        }).then(function(A) {
            return v === !0 && g.revokeObjectURL(p),
            A.userData.mimeType = c.mimeType || Dh(c.uri),
            A
        }).catch(function(A) {
            throw console.error("THREE.GLTFLoader: Couldn't load texture", p),
            A
        });
        return this.sourceCache[r] = h,
        h
    }
    assignTexture(r, s, u, l) {
        const f = this;
        return this.getDependency("texture", u.index).then(function(c) {
            if (!c)
                return null;
            if (u.texCoord !== void 0 && u.texCoord > 0 && (c = c.clone(),
            c.channel = u.texCoord),
            f.extensions[Ge.KHR_TEXTURE_TRANSFORM]) {
                const g = u.extensions !== void 0 ? u.extensions[Ge.KHR_TEXTURE_TRANSFORM] : void 0;
                if (g) {
                    const p = f.associations.get(c);
                    c = f.extensions[Ge.KHR_TEXTURE_TRANSFORM].extendTexture(c, g),
                    f.associations.set(c, p)
                }
            }
            return l !== void 0 && ("colorSpace"in c ? c.colorSpace = l === 3001 ? "srgb" : "srgb-linear" : c.encoding = l),
            r[s] = c,
            c
        })
    }
    assignFinalMaterial(r) {
        const s = r.geometry;
        let u = r.material;
        const l = s.attributes.tangent === void 0
          , f = s.attributes.color !== void 0
          , c = s.attributes.normal === void 0;
        if (r.isPoints) {
            const g = "PointsMaterial:" + u.uuid;
            let p = this.cache.get(g);
            p || (p = new od,
            ds.prototype.copy.call(p, u),
            p.color.copy(u.color),
            p.map = u.map,
            p.sizeAttenuation = !1,
            this.cache.add(g, p)),
            u = p
        } else if (r.isLine) {
            const g = "LineBasicMaterial:" + u.uuid;
            let p = this.cache.get(g);
            p || (p = new ad,
            ds.prototype.copy.call(p, u),
            p.color.copy(u.color),
            p.map = u.map,
            this.cache.add(g, p)),
            u = p
        }
        if (l || f || c) {
            let g = "ClonedMaterial:" + u.uuid + ":";
            l && (g += "derivative-tangents:"),
            f && (g += "vertex-colors:"),
            c && (g += "flat-shading:");
            let p = this.cache.get(g);
            p || (p = u.clone(),
            f && (p.vertexColors = !0),
            c && (p.flatShading = !0),
            l && (p.normalScale && (p.normalScale.y *= -1),
            p.clearcoatNormalScale && (p.clearcoatNormalScale.y *= -1)),
            this.cache.add(g, p),
            this.associations.set(p, this.associations.get(u))),
            u = p
        }
        r.material = u
    }
    getMaterialType() {
        return oc
    }
    loadMaterial(r) {
        const s = this
          , u = this.json
          , l = this.extensions
          , f = u.materials[r];
        let c;
        const g = {}
          , p = f.extensions || {}
          , v = [];
        if (p[Ge.KHR_MATERIALS_UNLIT]) {
            const A = l[Ge.KHR_MATERIALS_UNLIT];
            c = A.getMaterialType(),
            v.push(A.extendParams(g, f, s))
        } else {
            const A = f.pbrMetallicRoughness || {};
            if (g.color = new Gn(1,1,1),
            g.opacity = 1,
            Array.isArray(A.baseColorFactor)) {
                const B = A.baseColorFactor;
                g.color.fromArray(B),
                g.opacity = B[3]
            }
            A.baseColorTexture !== void 0 && v.push(s.assignTexture(g, "map", A.baseColorTexture, 3001)),
            g.metalness = A.metallicFactor !== void 0 ? A.metallicFactor : 1,
            g.roughness = A.roughnessFactor !== void 0 ? A.roughnessFactor : 1,
            A.metallicRoughnessTexture !== void 0 && (v.push(s.assignTexture(g, "metalnessMap", A.metallicRoughnessTexture)),
            v.push(s.assignTexture(g, "roughnessMap", A.metallicRoughnessTexture))),
            c = this._invokeOne(function(B) {
                return B.getMaterialType && B.getMaterialType(r)
            }),
            v.push(Promise.all(this._invokeAll(function(B) {
                return B.extendMaterialParams && B.extendMaterialParams(r, g)
            })))
        }
        f.doubleSided === !0 && (g.side = nc);
        const h = f.alphaMode || da.OPAQUE;
        if (h === da.BLEND ? (g.transparent = !0,
        g.depthWrite = !1) : (g.transparent = !1,
        h === da.MASK && (g.alphaTest = f.alphaCutoff !== void 0 ? f.alphaCutoff : .5)),
        f.normalTexture !== void 0 && c !== mr && (v.push(s.assignTexture(g, "normalMap", f.normalTexture)),
        g.normalScale = new vs(1,1),
        f.normalTexture.scale !== void 0)) {
            const A = f.normalTexture.scale;
            g.normalScale.set(A, A)
        }
        return f.occlusionTexture !== void 0 && c !== mr && (v.push(s.assignTexture(g, "aoMap", f.occlusionTexture)),
        f.occlusionTexture.strength !== void 0 && (g.aoMapIntensity = f.occlusionTexture.strength)),
        f.emissiveFactor !== void 0 && c !== mr && (g.emissive = new Gn().fromArray(f.emissiveFactor)),
        f.emissiveTexture !== void 0 && c !== mr && v.push(s.assignTexture(g, "emissiveMap", f.emissiveTexture, 3001)),
        Promise.all(v).then(function() {
            const A = new c(g);
            return f.name && (A.name = f.name),
            _n(A, f),
            s.associations.set(A, {
                materials: r
            }),
            f.extensions && Yn(l, A, f),
            A
        })
    }
    createUniqueName(r) {
        const s = ld.sanitizeNodeName(r || "");
        return s in this.nodeNamesUsed ? s + "_" + ++this.nodeNamesUsed[s] : (this.nodeNamesUsed[s] = 0,
        s)
    }
    loadGeometries(r) {
        const s = this
          , u = this.extensions
          , l = this.primitiveCache;
        function f(g) {
            return u[Ge.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(g, s).then(function(p) {
                return Yu(p, g, s)
            })
        }
        const c = [];
        for (let g = 0, p = r.length; g < p; g++) {
            const v = r[g]
              , h = Th(v)
              , A = l[h];
            if (A)
                c.push(A.promise);
            else {
                let B;
                v.extensions && v.extensions[Ge.KHR_DRACO_MESH_COMPRESSION] ? B = f(v) : B = Yu(new Ra, v, s),
                l[h] = {
                    primitive: v,
                    promise: B
                },
                c.push(B)
            }
        }
        return Promise.all(c)
    }
    loadMesh(r) {
        const s = this
          , u = this.json
          , l = this.extensions
          , f = u.meshes[r]
          , c = f.primitives
          , g = [];
        for (let p = 0, v = c.length; p < v; p++) {
            const h = c[p].material === void 0 ? Rh(this.cache) : this.getDependency("material", c[p].material);
            g.push(h)
        }
        return g.push(s.loadGeometries(c)),
        Promise.all(g).then(function(p) {
            const v = p.slice(0, p.length - 1)
              , h = p[p.length - 1]
              , A = [];
            for (let E = 0, M = h.length; E < M; E++) {
                const D = h[E]
                  , w = c[E];
                let I;
                const T = v[E];
                if (w.mode === Qt.TRIANGLES || w.mode === Qt.TRIANGLE_STRIP || w.mode === Qt.TRIANGLE_FAN || w.mode === void 0)
                    I = f.isSkinnedMesh === !0 ? new ud(D,T) : new Bs(D,T),
                    I.isSkinnedMesh === !0 && I.normalizeSkinWeights(),
                    w.mode === Qt.TRIANGLE_STRIP ? I.geometry = bu(I.geometry, ec) : w.mode === Qt.TRIANGLE_FAN && (I.geometry = bu(I.geometry, ga));
                else if (w.mode === Qt.LINES)
                    I = new cd(D,T);
                else if (w.mode === Qt.LINE_STRIP)
                    I = new fd(D,T);
                else if (w.mode === Qt.LINE_LOOP)
                    I = new dd(D,T);
                else if (w.mode === Qt.POINTS)
                    I = new pd(D,T);
                else
                    throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + w.mode);
                Object.keys(I.geometry.morphAttributes).length > 0 && _h(I, f),
                I.name = s.createUniqueName(f.name || "mesh_" + r),
                _n(I, f),
                w.extensions && Yn(l, I, w),
                s.assignFinalMaterial(I),
                A.push(I)
            }
            for (let E = 0, M = A.length; E < M; E++)
                s.associations.set(A[E], {
                    meshes: r,
                    primitives: E
                });
            if (A.length === 1)
                return f.extensions && Yn(l, A[0], f),
                A[0];
            const B = new jo;
            f.extensions && Yn(l, B, f),
            s.associations.set(B, {
                meshes: r
            });
            for (let E = 0, M = A.length; E < M; E++)
                B.add(A[E]);
            return B
        })
    }
    loadCamera(r) {
        let s;
        const u = this.json.cameras[r]
          , l = u[u.type];
        if (!l) {
            console.warn("THREE.GLTFLoader: Missing camera parameters.");
            return
        }
        return u.type === "perspective" ? s = new qu(hd.radToDeg(l.yfov),l.aspectRatio || 1,l.znear || 1,l.zfar || 2e6) : u.type === "orthographic" && (s = new wa(-l.xmag,l.xmag,l.ymag,-l.ymag,l.znear,l.zfar)),
        u.name && (s.name = this.createUniqueName(u.name)),
        _n(s, u),
        Promise.resolve(s)
    }
    loadSkin(r) {
        const s = this.json.skins[r]
          , u = [];
        for (let l = 0, f = s.joints.length; l < f; l++)
            u.push(this._loadNodeShallow(s.joints[l]));
        return s.inverseBindMatrices !== void 0 ? u.push(this.getDependency("accessor", s.inverseBindMatrices)) : u.push(null),
        Promise.all(u).then(function(l) {
            const f = l.pop()
              , c = l
              , g = []
              , p = [];
            for (let v = 0, h = c.length; v < h; v++) {
                const A = c[v];
                if (A) {
                    g.push(A);
                    const B = new ms;
                    f !== null && B.fromArray(f.array, v * 16),
                    p.push(B)
                } else
                    console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', s.joints[v])
            }
            return new Ad(g,p)
        })
    }
    loadAnimation(r) {
        const u = this.json.animations[r]
          , l = u.name ? u.name : "animation_" + r
          , f = []
          , c = []
          , g = []
          , p = []
          , v = [];
        for (let h = 0, A = u.channels.length; h < A; h++) {
            const B = u.channels[h]
              , E = u.samplers[B.sampler]
              , M = B.target
              , D = M.node
              , w = u.parameters !== void 0 ? u.parameters[E.input] : E.input
              , I = u.parameters !== void 0 ? u.parameters[E.output] : E.output;
            M.node !== void 0 && (f.push(this.getDependency("node", D)),
            c.push(this.getDependency("accessor", w)),
            g.push(this.getDependency("accessor", I)),
            p.push(E),
            v.push(M))
        }
        return Promise.all([Promise.all(f), Promise.all(c), Promise.all(g), Promise.all(p), Promise.all(v)]).then(function(h) {
            const A = h[0]
              , B = h[1]
              , E = h[2]
              , M = h[3]
              , D = h[4]
              , w = [];
            for (let I = 0, T = A.length; I < T; I++) {
                const R = A[I]
                  , U = B[I]
                  , b = E[I]
                  , k = M[I]
                  , Y = D[I];
                if (R === void 0)
                    continue;
                R.updateMatrix();
                let X;
                switch (Rn[Y.path]) {
                case Rn.weights:
                    X = yd;
                    break;
                case Rn.rotation:
                    X = gu;
                    break;
                case Rn.position:
                case Rn.scale:
                default:
                    X = Cd;
                    break
                }
                const z = R.name ? R.name : R.uuid
                  , oe = k.interpolation !== void 0 ? wh[k.interpolation] : ac
                  , J = [];
                Rn[Y.path] === Rn.weights ? R.traverse(function(Ae) {
                    Ae.morphTargetInfluences && J.push(Ae.name ? Ae.name : Ae.uuid)
                }) : J.push(z);
                let ue = b.array;
                if (b.normalized) {
                    const Ae = Ia(ue.constructor)
                      , _e = new Float32Array(ue.length);
                    for (let Re = 0, He = ue.length; Re < He; Re++)
                        _e[Re] = ue[Re] * Ae;
                    ue = _e
                }
                for (let Ae = 0, _e = J.length; Ae < _e; Ae++) {
                    const Re = new X(J[Ae] + "." + Rn[Y.path],U.array,ue,oe);
                    k.interpolation === "CUBICSPLINE" && (Re.createInterpolant = function(ke) {
                        const G = this instanceof gu ? Ih : kc;
                        return new G(this.times,this.values,this.getValueSize() / 3,ke)
                    }
                    ,
                    Re.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0),
                    w.push(Re)
                }
            }
            return new gd(l,void 0,w)
        })
    }
    createNodeMesh(r) {
        const s = this.json
          , u = this
          , l = s.nodes[r];
        return l.mesh === void 0 ? null : u.getDependency("mesh", l.mesh).then(function(f) {
            const c = u._getNodeRef(u.meshCache, l.mesh, f);
            return l.weights !== void 0 && c.traverse(function(g) {
                if (g.isMesh)
                    for (let p = 0, v = l.weights.length; p < v; p++)
                        g.morphTargetInfluences[p] = l.weights[p]
            }),
            c
        })
    }
    loadNode(r) {
        const s = this.json
          , u = this
          , l = s.nodes[r]
          , f = u._loadNodeShallow(r)
          , c = []
          , g = l.children || [];
        for (let v = 0, h = g.length; v < h; v++)
            c.push(u.getDependency("node", g[v]));
        const p = l.skin === void 0 ? Promise.resolve(null) : u.getDependency("skin", l.skin);
        return Promise.all([f, Promise.all(c), p]).then(function(v) {
            const h = v[0]
              , A = v[1]
              , B = v[2];
            B !== null && h.traverse(function(E) {
                E.isSkinnedMesh && E.bind(B, Gh)
            });
            for (let E = 0, M = A.length; E < M; E++)
                h.add(A[E]);
            return h
        })
    }
    _loadNodeShallow(r) {
        const s = this.json
          , u = this.extensions
          , l = this;
        if (this.nodeCache[r] !== void 0)
            return this.nodeCache[r];
        const f = s.nodes[r]
          , c = f.name ? l.createUniqueName(f.name) : ""
          , g = []
          , p = l._invokeOne(function(v) {
            return v.createNodeMesh && v.createNodeMesh(r)
        });
        return p && g.push(p),
        f.camera !== void 0 && g.push(l.getDependency("camera", f.camera).then(function(v) {
            return l._getNodeRef(l.cameraCache, f.camera, v)
        })),
        l._invokeAll(function(v) {
            return v.createNodeAttachment && v.createNodeAttachment(r)
        }).forEach(function(v) {
            g.push(v)
        }),
        this.nodeCache[r] = Promise.all(g).then(function(v) {
            let h;
            if (f.isBone === !0 ? h = new vd : v.length > 1 ? h = new jo : v.length === 1 ? h = v[0] : h = new ic,
            h !== v[0])
                for (let A = 0, B = v.length; A < B; A++)
                    h.add(v[A]);
            if (f.name && (h.userData.name = f.name,
            h.name = c),
            _n(h, f),
            f.extensions && Yn(u, h, f),
            f.matrix !== void 0) {
                const A = new ms;
                A.fromArray(f.matrix),
                h.applyMatrix4(A)
            } else
                f.translation !== void 0 && h.position.fromArray(f.translation),
                f.rotation !== void 0 && h.quaternion.fromArray(f.rotation),
                f.scale !== void 0 && h.scale.fromArray(f.scale);
            return l.associations.has(h) || l.associations.set(h, {}),
            l.associations.get(h).nodes = r,
            h
        }),
        this.nodeCache[r]
    }
    loadScene(r) {
        const s = this.extensions
          , u = this.json.scenes[r]
          , l = this
          , f = new jo;
        u.name && (f.name = l.createUniqueName(u.name)),
        _n(f, u),
        u.extensions && Yn(s, f, u);
        const c = u.nodes || []
          , g = [];
        for (let p = 0, v = c.length; p < v; p++)
            g.push(l.getDependency("node", c[p]));
        return Promise.all(g).then(function(p) {
            for (let h = 0, A = p.length; h < A; h++)
                f.add(p[h]);
            const v = h => {
                const A = new Map;
                for (const [B,E] of l.associations)
                    (B instanceof ds || B instanceof sn) && A.set(B, E);
                return h.traverse(B => {
                    const E = l.associations.get(B);
                    E != null && A.set(B, E)
                }
                ),
                A
            }
            ;
            return l.associations = v(f),
            f
        })
    }
}
function Hh(o, r, s) {
    const u = r.attributes
      , l = new Sd;
    if (u.POSITION !== void 0) {
        const g = s.json.accessors[u.POSITION]
          , p = g.min
          , v = g.max;
        if (p !== void 0 && v !== void 0) {
            if (l.set(new pt(p[0],p[1],p[2]), new pt(v[0],v[1],v[2])),
            g.normalized) {
                const h = Ia(Br[g.componentType]);
                l.min.multiplyScalar(h),
                l.max.multiplyScalar(h)
            }
        } else {
            console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
            return
        }
    } else
        return;
    const f = r.targets;
    if (f !== void 0) {
        const g = new pt
          , p = new pt;
        for (let v = 0, h = f.length; v < h; v++) {
            const A = f[v];
            if (A.POSITION !== void 0) {
                const B = s.json.accessors[A.POSITION]
                  , E = B.min
                  , M = B.max;
                if (E !== void 0 && M !== void 0) {
                    if (p.setX(Math.max(Math.abs(E[0]), Math.abs(M[0]))),
                    p.setY(Math.max(Math.abs(E[1]), Math.abs(M[1]))),
                    p.setZ(Math.max(Math.abs(E[2]), Math.abs(M[2]))),
                    B.normalized) {
                        const D = Ia(Br[B.componentType]);
                        p.multiplyScalar(D)
                    }
                    g.max(p)
                } else
                    console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")
            }
        }
        l.expandByVector(g)
    }
    o.boundingBox = l;
    const c = new Id;
    l.getCenter(c.center),
    c.radius = l.min.distanceTo(l.max) / 2,
    o.boundingSphere = c
}
function Yu(o, r, s) {
    const u = r.attributes
      , l = [];
    function f(c, g) {
        return s.getDependency("accessor", c).then(function(p) {
            o.setAttribute(g, p)
        })
    }
    for (const c in u) {
        const g = Sa[c] || c.toLowerCase();
        g in o.attributes || l.push(f(u[c], g))
    }
    if (r.indices !== void 0 && !o.index) {
        const c = s.getDependency("accessor", r.indices).then(function(g) {
            o.setIndex(g)
        });
        l.push(c)
    }
    return _n(o, r),
    Hh(o, r, s),
    Promise.all(l).then(function() {
        return r.targets !== void 0 ? Fh(o, r.targets, s) : o
    })
}
class Lh extends lc {
    constructor(r) {
        super(r),
        this.type = Ht
    }
    parse(r) {
        const g = function(R, U) {
            switch (R) {
            case 1:
                console.error("THREE.RGBELoader Read Error: " + (U || ""));
                break;
            case 2:
                console.error("THREE.RGBELoader Write Error: " + (U || ""));
                break;
            case 3:
                console.error("THREE.RGBELoader Bad File Format: " + (U || ""));
                break;
            default:
            case 4:
                console.error("THREE.RGBELoader: Error: " + (U || ""))
            }
            return -1
        }
          , A = `
`
          , B = function(R, U, b) {
            U = U || 1024;
            let Y = R.pos
              , X = -1
              , z = 0
              , oe = ""
              , J = String.fromCharCode.apply(null, new Uint16Array(R.subarray(Y, Y + 128)));
            for (; 0 > (X = J.indexOf(A)) && z < U && Y < R.byteLength; )
                oe += J,
                z += J.length,
                Y += 128,
                J += String.fromCharCode.apply(null, new Uint16Array(R.subarray(Y, Y + 128)));
            return -1 < X ? (R.pos += z + X + 1,
            oe + J.slice(0, X)) : !1
        }
          , E = function(R) {
            const U = /^#\?(\S+)/
              , b = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/
              , k = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/
              , Y = /^\s*FORMAT=(\S+)\s*$/
              , X = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/
              , z = {
                valid: 0,
                string: "",
                comments: "",
                programtype: "RGBE",
                format: "",
                gamma: 1,
                exposure: 1,
                width: 0,
                height: 0
            };
            let oe, J;
            if (R.pos >= R.byteLength || !(oe = B(R)))
                return g(1, "no header found");
            if (!(J = oe.match(U)))
                return g(3, "bad initial token");
            for (z.valid |= 1,
            z.programtype = J[1],
            z.string += oe + `
`; oe = B(R),
            oe !== !1; ) {
                if (z.string += oe + `
`,
                oe.charAt(0) === "#") {
                    z.comments += oe + `
`;
                    continue
                }
                if ((J = oe.match(b)) && (z.gamma = parseFloat(J[1])),
                (J = oe.match(k)) && (z.exposure = parseFloat(J[1])),
                (J = oe.match(Y)) && (z.valid |= 2,
                z.format = J[1]),
                (J = oe.match(X)) && (z.valid |= 4,
                z.height = parseInt(J[1], 10),
                z.width = parseInt(J[2], 10)),
                z.valid & 2 && z.valid & 4)
                    break
            }
            return z.valid & 2 ? z.valid & 4 ? z : g(3, "missing image size specifier") : g(3, "missing format specifier")
        }
          , M = function(R, U, b) {
            const k = U;
            if (k < 8 || k > 32767 || R[0] !== 2 || R[1] !== 2 || R[2] & 128)
                return new Uint8Array(R);
            if (k !== (R[2] << 8 | R[3]))
                return g(3, "wrong scanline width");
            const Y = new Uint8Array(4 * U * b);
            if (!Y.length)
                return g(4, "unable to allocate buffer space");
            let X = 0
              , z = 0;
            const oe = 4 * k
              , J = new Uint8Array(4)
              , ue = new Uint8Array(oe);
            let Ae = b;
            for (; Ae > 0 && z < R.byteLength; ) {
                if (z + 4 > R.byteLength)
                    return g(1);
                if (J[0] = R[z++],
                J[1] = R[z++],
                J[2] = R[z++],
                J[3] = R[z++],
                J[0] != 2 || J[1] != 2 || (J[2] << 8 | J[3]) != k)
                    return g(3, "bad rgbe scanline format");
                let _e = 0, Re;
                for (; _e < oe && z < R.byteLength; ) {
                    Re = R[z++];
                    const ke = Re > 128;
                    if (ke && (Re -= 128),
                    Re === 0 || _e + Re > oe)
                        return g(3, "bad scanline data");
                    if (ke) {
                        const G = R[z++];
                        for (let j = 0; j < Re; j++)
                            ue[_e++] = G
                    } else
                        ue.set(R.subarray(z, z + Re), _e),
                        _e += Re,
                        z += Re
                }
                const He = k;
                for (let ke = 0; ke < He; ke++) {
                    let G = 0;
                    Y[X] = ue[ke + G],
                    G += k,
                    Y[X + 1] = ue[ke + G],
                    G += k,
                    Y[X + 2] = ue[ke + G],
                    G += k,
                    Y[X + 3] = ue[ke + G],
                    X += 4
                }
                Ae--
            }
            return Y
        }
          , D = function(R, U, b, k) {
            const Y = R[U + 3]
              , X = Math.pow(2, Y - 128) / 255;
            b[k + 0] = R[U + 0] * X,
            b[k + 1] = R[U + 1] * X,
            b[k + 2] = R[U + 2] * X,
            b[k + 3] = 1
        }
          , w = function(R, U, b, k) {
            const Y = R[U + 3]
              , X = Math.pow(2, Y - 128) / 255;
            b[k + 0] = gr.toHalfFloat(Math.min(R[U + 0] * X, 65504)),
            b[k + 1] = gr.toHalfFloat(Math.min(R[U + 1] * X, 65504)),
            b[k + 2] = gr.toHalfFloat(Math.min(R[U + 2] * X, 65504)),
            b[k + 3] = gr.toHalfFloat(1)
        }
          , I = new Uint8Array(r);
        I.pos = 0;
        const T = E(I);
        if (T !== -1) {
            const R = T.width
              , U = T.height
              , b = M(I.subarray(I.pos), R, U);
            if (b !== -1) {
                let k, Y, X;
                switch (this.type) {
                case on:
                    X = b.length / 4;
                    const z = new Float32Array(X * 4);
                    for (let J = 0; J < X; J++)
                        D(b, J * 4, z, J * 4);
                    k = z,
                    Y = on;
                    break;
                case Ht:
                    X = b.length / 4;
                    const oe = new Uint16Array(X * 4);
                    for (let J = 0; J < X; J++)
                        w(b, J * 4, oe, J * 4);
                    k = oe,
                    Y = Ht;
                    break;
                default:
                    console.error("THREE.RGBELoader: unsupported type: ", this.type);
                    break
                }
                return {
                    width: R,
                    height: U,
                    data: k,
                    header: T.string,
                    gamma: T.gamma,
                    exposure: T.exposure,
                    type: Y
                }
            }
        }
        return null
    }
    setDataType(r) {
        return this.type = r,
        this
    }
    load(r, s, u, l) {
        function f(c, g) {
            switch (c.type) {
            case on:
            case Ht:
                "colorSpace"in c ? c.colorSpace = "srgb-linear" : c.encoding = 3e3,
                c.minFilter = _t,
                c.magFilter = _t,
                c.generateMipmaps = !1,
                c.flipY = !0;
                break
            }
            s && s(c, g)
        }
        return super.load(r, f, u, l)
    }
}
const Yr = "colorSpace"in new sn;
class Ph extends lc {
    constructor(r) {
        super(r),
        this.type = Ht
    }
    parse(r) {
        const z = Math.pow(2.7182818, 2.2);
        function oe(m, C) {
            for (var S = 0, H = 0; H < 65536; ++H)
                (H == 0 || m[H >> 3] & 1 << (H & 7)) && (C[S++] = H);
            for (var P = S - 1; S < 65536; )
                C[S++] = 0;
            return P
        }
        function J(m) {
            for (var C = 0; C < 16384; C++)
                m[C] = {},
                m[C].len = 0,
                m[C].lit = 0,
                m[C].p = null
        }
        const ue = {
            l: 0,
            c: 0,
            lc: 0
        };
        function Ae(m, C, S, H, P) {
            for (; S < m; )
                C = C << 8 | oi(H, P),
                S += 8;
            S -= m,
            ue.l = C >> S & (1 << m) - 1,
            ue.c = C,
            ue.lc = S
        }
        const _e = new Array(59);
        function Re(m) {
            for (var C = 0; C <= 58; ++C)
                _e[C] = 0;
            for (var C = 0; C < 65537; ++C)
                _e[m[C]] += 1;
            for (var S = 0, C = 58; C > 0; --C) {
                var H = S + _e[C] >> 1;
                _e[C] = S,
                S = H
            }
            for (var C = 0; C < 65537; ++C) {
                var P = m[C];
                P > 0 && (m[C] = P | _e[P]++ << 6)
            }
        }
        function He(m, C, S, H, P, O, Z) {
            for (var W = S, ee = 0, $ = 0; P <= O; P++) {
                if (W.value - S.value > H)
                    return !1;
                Ae(6, ee, $, m, W);
                var te = ue.l;
                if (ee = ue.c,
                $ = ue.lc,
                Z[P] = te,
                te == 63) {
                    if (W.value - S.value > H)
                        throw "Something wrong with hufUnpackEncTable";
                    Ae(8, ee, $, m, W);
                    var q = ue.l + 6;
                    if (ee = ue.c,
                    $ = ue.lc,
                    P + q > O + 1)
                        throw "Something wrong with hufUnpackEncTable";
                    for (; q--; )
                        Z[P++] = 0;
                    P--
                } else if (te >= 59) {
                    var q = te - 59 + 2;
                    if (P + q > O + 1)
                        throw "Something wrong with hufUnpackEncTable";
                    for (; q--; )
                        Z[P++] = 0;
                    P--
                }
            }
            Re(Z)
        }
        function ke(m) {
            return m & 63
        }
        function G(m) {
            return m >> 6
        }
        function j(m, C, S, H) {
            for (; C <= S; C++) {
                var P = G(m[C])
                  , O = ke(m[C]);
                if (P >> O)
                    throw "Invalid table entry";
                if (O > 14) {
                    var Z = H[P >> O - 14];
                    if (Z.len)
                        throw "Invalid table entry";
                    if (Z.lit++,
                    Z.p) {
                        var W = Z.p;
                        Z.p = new Array(Z.lit);
                        for (var ee = 0; ee < Z.lit - 1; ++ee)
                            Z.p[ee] = W[ee]
                    } else
                        Z.p = new Array(1);
                    Z.p[Z.lit - 1] = C
                } else if (O)
                    for (var $ = 0, ee = 1 << 14 - O; ee > 0; ee--) {
                        var Z = H[(P << 14 - O) + $];
                        if (Z.len || Z.p)
                            throw "Invalid table entry";
                        Z.len = O,
                        Z.lit = C,
                        $++
                    }
            }
            return !0
        }
        const K = {
            c: 0,
            lc: 0
        };
        function re(m, C, S, H) {
            m = m << 8 | oi(S, H),
            C += 8,
            K.c = m,
            K.lc = C
        }
        const le = {
            c: 0,
            lc: 0
        };
        function ye(m, C, S, H, P, O, Z, W, ee, $) {
            if (m == C) {
                H < 8 && (re(S, H, P, Z),
                S = K.c,
                H = K.lc),
                H -= 8;
                var te = S >> H
                  , te = new Uint8Array([te])[0];
                if (ee.value + te > $)
                    return !1;
                for (var q = W[ee.value - 1]; te-- > 0; )
                    W[ee.value++] = q
            } else if (ee.value < $)
                W[ee.value++] = m;
            else
                return !1;
            le.c = S,
            le.lc = H
        }
        function Ue(m) {
            return m & 65535
        }
        function qe(m) {
            var C = Ue(m);
            return C > 32767 ? C - 65536 : C
        }
        const me = {
            a: 0,
            b: 0
        };
        function $e(m, C) {
            var S = qe(m)
              , H = qe(C)
              , P = H
              , O = S + (P & 1) + (P >> 1)
              , Z = O
              , W = O - P;
            me.a = Z,
            me.b = W
        }
        function bt(m, C) {
            var S = Ue(m)
              , H = Ue(C)
              , P = S - (H >> 1) & 65535
              , O = H + P - 32768 & 65535;
            me.a = O,
            me.b = P
        }
        function Sr(m, C, S, H, P, O, Z) {
            for (var W = Z < 16384, ee = S > P ? P : S, $ = 1, te; $ <= ee; )
                $ <<= 1;
            for ($ >>= 1,
            te = $,
            $ >>= 1; $ >= 1; ) {
                for (var q = 0, Ke = q + O * (P - te), ce = O * $, de = O * te, ve = H * $, Ee = H * te, xe, Te, ge, Me; q <= Ke; q += de) {
                    for (var De = q, ze = q + H * (S - te); De <= ze; De += Ee) {
                        var Se = De + ve
                          , je = De + ce
                          , mt = je + ve;
                        W ? ($e(m[De + C], m[je + C]),
                        xe = me.a,
                        ge = me.b,
                        $e(m[Se + C], m[mt + C]),
                        Te = me.a,
                        Me = me.b,
                        $e(xe, Te),
                        m[De + C] = me.a,
                        m[Se + C] = me.b,
                        $e(ge, Me),
                        m[je + C] = me.a,
                        m[mt + C] = me.b) : (bt(m[De + C], m[je + C]),
                        xe = me.a,
                        ge = me.b,
                        bt(m[Se + C], m[mt + C]),
                        Te = me.a,
                        Me = me.b,
                        bt(xe, Te),
                        m[De + C] = me.a,
                        m[Se + C] = me.b,
                        bt(ge, Me),
                        m[je + C] = me.a,
                        m[mt + C] = me.b)
                    }
                    if (S & $) {
                        var je = De + ce;
                        W ? $e(m[De + C], m[je + C]) : bt(m[De + C], m[je + C]),
                        xe = me.a,
                        m[je + C] = me.b,
                        m[De + C] = xe
                    }
                }
                if (P & $)
                    for (var De = q, ze = q + H * (S - te); De <= ze; De += Ee) {
                        var Se = De + ve;
                        W ? $e(m[De + C], m[Se + C]) : bt(m[De + C], m[Se + C]),
                        xe = me.a,
                        m[Se + C] = me.b,
                        m[De + C] = xe
                    }
                te = $,
                $ >>= 1
            }
            return q
        }
        function qn(m, C, S, H, P, O, Z, W, ee, $) {
            for (var te = 0, q = 0, Ke = W, ce = Math.trunc(P.value + (O + 7) / 8); P.value < ce; )
                for (re(te, q, S, P),
                te = K.c,
                q = K.lc; q >= 14; ) {
                    var de = te >> q - 14 & 16383
                      , ve = C[de];
                    if (ve.len)
                        q -= ve.len,
                        ye(ve.lit, Z, te, q, S, H, P, ee, $, Ke),
                        te = le.c,
                        q = le.lc;
                    else {
                        if (!ve.p)
                            throw "hufDecode issues";
                        var Ee;
                        for (Ee = 0; Ee < ve.lit; Ee++) {
                            for (var xe = ke(m[ve.p[Ee]]); q < xe && P.value < ce; )
                                re(te, q, S, P),
                                te = K.c,
                                q = K.lc;
                            if (q >= xe && G(m[ve.p[Ee]]) == (te >> q - xe & (1 << xe) - 1)) {
                                q -= xe,
                                ye(ve.p[Ee], Z, te, q, S, H, P, ee, $, Ke),
                                te = le.c,
                                q = le.lc;
                                break
                            }
                        }
                        if (Ee == ve.lit)
                            throw "hufDecode issues"
                    }
                }
            var Te = 8 - O & 7;
            for (te >>= Te,
            q -= Te; q > 0; ) {
                var ve = C[te << 14 - q & 16383];
                if (ve.len)
                    q -= ve.len,
                    ye(ve.lit, Z, te, q, S, H, P, ee, $, Ke),
                    te = le.c,
                    q = le.lc;
                else
                    throw "hufDecode issues"
            }
            return !0
        }
        function It(m, C, S, H, P, O) {
            var Z = {
                value: 0
            }
              , W = S.value
              , ee = At(C, S)
              , $ = At(C, S);
            S.value += 4;
            var te = At(C, S);
            if (S.value += 4,
            ee < 0 || ee >= 65537 || $ < 0 || $ >= 65537)
                throw "Something wrong with HUF_ENCSIZE";
            var q = new Array(65537)
              , Ke = new Array(16384);
            J(Ke);
            var ce = H - (S.value - W);
            if (He(m, C, S, ce, ee, $, q),
            te > 8 * (H - (S.value - W)))
                throw "Something wrong with hufUncompress";
            j(q, ee, $, Ke),
            qn(q, Ke, m, C, S, te, $, O, P, Z)
        }
        function $n(m, C, S) {
            for (var H = 0; H < S; ++H)
                C[H] = m[C[H]]
        }
        function ht(m) {
            for (var C = 1; C < m.length; C++) {
                var S = m[C - 1] + m[C] - 128;
                m[C] = S
            }
        }
        function ni(m, C) {
            for (var S = 0, H = Math.floor((m.length + 1) / 2), P = 0, O = m.length - 1; !(P > O || (C[P++] = m[S++],
            P > O)); )
                C[P++] = m[H++]
        }
        function ri(m) {
            for (var C = m.byteLength, S = new Array, H = 0, P = new DataView(m); C > 0; ) {
                var O = P.getInt8(H++);
                if (O < 0) {
                    var Z = -O;
                    C -= Z + 1;
                    for (var W = 0; W < Z; W++)
                        S.push(P.getUint8(H++))
                } else {
                    var Z = O;
                    C -= 2;
                    for (var ee = P.getUint8(H++), W = 0; W < Z + 1; W++)
                        S.push(ee)
                }
            }
            return S
        }
        function Cs(m, C, S, H, P, O) {
            var Se = new DataView(O.buffer)
              , Z = S[m.idx[0]].width
              , W = S[m.idx[0]].height
              , ee = 3
              , $ = Math.floor(Z / 8)
              , te = Math.ceil(Z / 8)
              , q = Math.ceil(W / 8)
              , Ke = Z - (te - 1) * 8
              , ce = W - (q - 1) * 8
              , de = {
                value: 0
            }
              , ve = new Array(ee)
              , Ee = new Array(ee)
              , xe = new Array(ee)
              , Te = new Array(ee)
              , ge = new Array(ee);
            for (let Je = 0; Je < ee; ++Je)
                ge[Je] = C[m.idx[Je]],
                ve[Je] = Je < 1 ? 0 : ve[Je - 1] + te * q,
                Ee[Je] = new Float32Array(64),
                xe[Je] = new Uint16Array(64),
                Te[Je] = new Uint16Array(te * 64);
            for (let Je = 0; Je < q; ++Je) {
                var Me = 8;
                Je == q - 1 && (Me = ce);
                var De = 8;
                for (let Qe = 0; Qe < te; ++Qe) {
                    Qe == te - 1 && (De = Ke);
                    for (let Le = 0; Le < ee; ++Le)
                        xe[Le].fill(0),
                        xe[Le][0] = P[ve[Le]++],
                        ys(de, H, xe[Le]),
                        Es(xe[Le], Ee[Le]),
                        Ms(Ee[Le]);
                    Hn(Ee);
                    for (let Le = 0; Le < ee; ++Le)
                        Ss(Ee[Le], Te[Le], Qe * 64)
                }
                let st = 0;
                for (let Qe = 0; Qe < ee; ++Qe) {
                    const Le = S[m.idx[Qe]].type;
                    for (let Ye = 8 * Je; Ye < 8 * Je + Me; ++Ye) {
                        st = ge[Qe][Ye];
                        for (let ln = 0; ln < $; ++ln) {
                            const Et = ln * 64 + (Ye & 7) * 8;
                            Se.setUint16(st + 0 * 2 * Le, Te[Qe][Et + 0], !0),
                            Se.setUint16(st + 1 * 2 * Le, Te[Qe][Et + 1], !0),
                            Se.setUint16(st + 2 * 2 * Le, Te[Qe][Et + 2], !0),
                            Se.setUint16(st + 3 * 2 * Le, Te[Qe][Et + 3], !0),
                            Se.setUint16(st + 4 * 2 * Le, Te[Qe][Et + 4], !0),
                            Se.setUint16(st + 5 * 2 * Le, Te[Qe][Et + 5], !0),
                            Se.setUint16(st + 6 * 2 * Le, Te[Qe][Et + 6], !0),
                            Se.setUint16(st + 7 * 2 * Le, Te[Qe][Et + 7], !0),
                            st += 8 * 2 * Le
                        }
                    }
                    if ($ != te)
                        for (let Ye = 8 * Je; Ye < 8 * Je + Me; ++Ye) {
                            const ln = ge[Qe][Ye] + 8 * $ * 2 * Le
                              , Et = $ * 64 + (Ye & 7) * 8;
                            for (let Zt = 0; Zt < De; ++Zt)
                                Se.setUint16(ln + Zt * 2 * Le, Te[Qe][Et + Zt], !0)
                        }
                }
            }
            for (var ze = new Uint16Array(Z), Se = new DataView(O.buffer), je = 0; je < ee; ++je) {
                S[m.idx[je]].decoded = !0;
                var mt = S[m.idx[je]].type;
                if (S[je].type == 2)
                    for (var nt = 0; nt < W; ++nt) {
                        const Je = ge[je][nt];
                        for (var ft = 0; ft < Z; ++ft)
                            ze[ft] = Se.getUint16(Je + ft * 2 * mt, !0);
                        for (var ft = 0; ft < Z; ++ft)
                            Se.setFloat32(Je + ft * 2 * mt, se(ze[ft]), !0)
                    }
            }
        }
        function ys(m, C, S) {
            for (var H, P = 1; P < 64; )
                H = C[m.value],
                H == 65280 ? P = 64 : H >> 8 == 255 ? P += H & 255 : (S[P] = H,
                P++),
                m.value++
        }
        function Es(m, C) {
            C[0] = se(m[0]),
            C[1] = se(m[1]),
            C[2] = se(m[5]),
            C[3] = se(m[6]),
            C[4] = se(m[14]),
            C[5] = se(m[15]),
            C[6] = se(m[27]),
            C[7] = se(m[28]),
            C[8] = se(m[2]),
            C[9] = se(m[4]),
            C[10] = se(m[7]),
            C[11] = se(m[13]),
            C[12] = se(m[16]),
            C[13] = se(m[26]),
            C[14] = se(m[29]),
            C[15] = se(m[42]),
            C[16] = se(m[3]),
            C[17] = se(m[8]),
            C[18] = se(m[12]),
            C[19] = se(m[17]),
            C[20] = se(m[25]),
            C[21] = se(m[30]),
            C[22] = se(m[41]),
            C[23] = se(m[43]),
            C[24] = se(m[9]),
            C[25] = se(m[11]),
            C[26] = se(m[18]),
            C[27] = se(m[24]),
            C[28] = se(m[31]),
            C[29] = se(m[40]),
            C[30] = se(m[44]),
            C[31] = se(m[53]),
            C[32] = se(m[10]),
            C[33] = se(m[19]),
            C[34] = se(m[23]),
            C[35] = se(m[32]),
            C[36] = se(m[39]),
            C[37] = se(m[45]),
            C[38] = se(m[52]),
            C[39] = se(m[54]),
            C[40] = se(m[20]),
            C[41] = se(m[22]),
            C[42] = se(m[33]),
            C[43] = se(m[38]),
            C[44] = se(m[46]),
            C[45] = se(m[51]),
            C[46] = se(m[55]),
            C[47] = se(m[60]),
            C[48] = se(m[21]),
            C[49] = se(m[34]),
            C[50] = se(m[37]),
            C[51] = se(m[47]),
            C[52] = se(m[50]),
            C[53] = se(m[56]),
            C[54] = se(m[59]),
            C[55] = se(m[61]),
            C[56] = se(m[35]),
            C[57] = se(m[36]),
            C[58] = se(m[48]),
            C[59] = se(m[49]),
            C[60] = se(m[57]),
            C[61] = se(m[58]),
            C[62] = se(m[62]),
            C[63] = se(m[63])
        }
        function Ms(m) {
            const C = .5 * Math.cos(.7853975)
              , S = .5 * Math.cos(3.14159 / 16)
              , H = .5 * Math.cos(3.14159 / 8)
              , P = .5 * Math.cos(3 * 3.14159 / 16)
              , O = .5 * Math.cos(5 * 3.14159 / 16)
              , Z = .5 * Math.cos(3 * 3.14159 / 8)
              , W = .5 * Math.cos(7 * 3.14159 / 16);
            for (var ee = new Array(4), $ = new Array(4), te = new Array(4), q = new Array(4), Ke = 0; Ke < 8; ++Ke) {
                var ce = Ke * 8;
                ee[0] = H * m[ce + 2],
                ee[1] = Z * m[ce + 2],
                ee[2] = H * m[ce + 6],
                ee[3] = Z * m[ce + 6],
                $[0] = S * m[ce + 1] + P * m[ce + 3] + O * m[ce + 5] + W * m[ce + 7],
                $[1] = P * m[ce + 1] - W * m[ce + 3] - S * m[ce + 5] - O * m[ce + 7],
                $[2] = O * m[ce + 1] - S * m[ce + 3] + W * m[ce + 5] + P * m[ce + 7],
                $[3] = W * m[ce + 1] - O * m[ce + 3] + P * m[ce + 5] - S * m[ce + 7],
                te[0] = C * (m[ce + 0] + m[ce + 4]),
                te[3] = C * (m[ce + 0] - m[ce + 4]),
                te[1] = ee[0] + ee[3],
                te[2] = ee[1] - ee[2],
                q[0] = te[0] + te[1],
                q[1] = te[3] + te[2],
                q[2] = te[3] - te[2],
                q[3] = te[0] - te[1],
                m[ce + 0] = q[0] + $[0],
                m[ce + 1] = q[1] + $[1],
                m[ce + 2] = q[2] + $[2],
                m[ce + 3] = q[3] + $[3],
                m[ce + 4] = q[3] - $[3],
                m[ce + 5] = q[2] - $[2],
                m[ce + 6] = q[1] - $[1],
                m[ce + 7] = q[0] - $[0]
            }
            for (var de = 0; de < 8; ++de)
                ee[0] = H * m[16 + de],
                ee[1] = Z * m[16 + de],
                ee[2] = H * m[48 + de],
                ee[3] = Z * m[48 + de],
                $[0] = S * m[8 + de] + P * m[24 + de] + O * m[40 + de] + W * m[56 + de],
                $[1] = P * m[8 + de] - W * m[24 + de] - S * m[40 + de] - O * m[56 + de],
                $[2] = O * m[8 + de] - S * m[24 + de] + W * m[40 + de] + P * m[56 + de],
                $[3] = W * m[8 + de] - O * m[24 + de] + P * m[40 + de] - S * m[56 + de],
                te[0] = C * (m[de] + m[32 + de]),
                te[3] = C * (m[de] - m[32 + de]),
                te[1] = ee[0] + ee[3],
                te[2] = ee[1] - ee[2],
                q[0] = te[0] + te[1],
                q[1] = te[3] + te[2],
                q[2] = te[3] - te[2],
                q[3] = te[0] - te[1],
                m[0 + de] = q[0] + $[0],
                m[8 + de] = q[1] + $[1],
                m[16 + de] = q[2] + $[2],
                m[24 + de] = q[3] + $[3],
                m[32 + de] = q[3] - $[3],
                m[40 + de] = q[2] - $[2],
                m[48 + de] = q[1] - $[1],
                m[56 + de] = q[0] - $[0]
        }
        function Hn(m) {
            for (var C = 0; C < 64; ++C) {
                var S = m[0][C]
                  , H = m[1][C]
                  , P = m[2][C];
                m[0][C] = S + 1.5747 * P,
                m[1][C] = S - .1873 * H - .4682 * P,
                m[2][C] = S + 1.8556 * H
            }
        }
        function Ss(m, C, S) {
            for (var H = 0; H < 64; ++H)
                C[S + H] = gr.toHalfFloat(Is(m[H]))
        }
        function Is(m) {
            return m <= 1 ? Math.sign(m) * Math.pow(Math.abs(m), 2.2) : Math.sign(m) * Math.pow(z, Math.abs(m) - 1)
        }
        function ii(m) {
            return new DataView(m.array.buffer,m.offset.value,m.size)
        }
        function Ln(m) {
            var C = m.viewer.buffer.slice(m.offset.value, m.offset.value + m.size)
              , S = new Uint8Array(ri(C))
              , H = new Uint8Array(S.length);
            return ht(S),
            ni(S, H),
            new DataView(H.buffer)
        }
        function Ir(m) {
            var C = m.array.slice(m.offset.value, m.offset.value + m.size)
              , S = as(C)
              , H = new Uint8Array(S.length);
            return ht(S),
            ni(S, H),
            new DataView(H.buffer)
        }
        function ws(m) {
            for (var C = m.viewer, S = {
                value: m.offset.value
            }, H = new Uint16Array(m.width * m.scanlineBlockSize * (m.channels * m.type)), P = new Uint8Array(8192), O = 0, Z = new Array(m.channels), W = 0; W < m.channels; W++)
                Z[W] = {},
                Z[W].start = O,
                Z[W].end = Z[W].start,
                Z[W].nx = m.width,
                Z[W].ny = m.lines,
                Z[W].size = m.type,
                O += Z[W].nx * Z[W].ny * Z[W].size;
            var ee = On(C, S)
              , $ = On(C, S);
            if ($ >= 8192)
                throw "Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";
            if (ee <= $)
                for (var W = 0; W < $ - ee + 1; W++)
                    P[W + ee] = mn(C, S);
            var te = new Uint16Array(65536)
              , q = oe(P, te)
              , Ke = At(C, S);
            It(m.array, C, S, Ke, H, O);
            for (var W = 0; W < m.channels; ++W)
                for (var ce = Z[W], de = 0; de < Z[W].size; ++de)
                    Sr(H, ce.start + de, ce.nx, ce.size, ce.ny, ce.nx * ce.size, q);
            $n(te, H, O);
            for (var ve = 0, Ee = new Uint8Array(H.buffer.byteLength), xe = 0; xe < m.lines; xe++)
                for (var Te = 0; Te < m.channels; Te++) {
                    var ce = Z[Te]
                      , ge = ce.nx * ce.size
                      , Me = new Uint8Array(H.buffer,ce.end * 2,ge * 2);
                    Ee.set(Me, ve),
                    ve += ge * 2,
                    ce.end += ge
                }
            return new DataView(Ee.buffer)
        }
        function Rs(m) {
            var C = m.array.slice(m.offset.value, m.offset.value + m.size)
              , S = as(C);
            const H = m.lines * m.channels * m.width
              , P = m.type == 1 ? new Uint16Array(H) : new Uint32Array(H);
            let O = 0
              , Z = 0;
            const W = new Array(4);
            for (let ee = 0; ee < m.lines; ee++)
                for (let $ = 0; $ < m.channels; $++) {
                    let te = 0;
                    switch (m.type) {
                    case 1:
                        W[0] = O,
                        W[1] = W[0] + m.width,
                        O = W[1] + m.width;
                        for (let q = 0; q < m.width; ++q) {
                            const Ke = S[W[0]++] << 8 | S[W[1]++];
                            te += Ke,
                            P[Z] = te,
                            Z++
                        }
                        break;
                    case 2:
                        W[0] = O,
                        W[1] = W[0] + m.width,
                        W[2] = W[1] + m.width,
                        O = W[2] + m.width;
                        for (let q = 0; q < m.width; ++q) {
                            const Ke = S[W[0]++] << 24 | S[W[1]++] << 16 | S[W[2]++] << 8;
                            te += Ke,
                            P[Z] = te,
                            Z++
                        }
                        break
                    }
                }
            return new DataView(P.buffer)
        }
        function si(m) {
            var C = m.viewer
              , S = {
                value: m.offset.value
            }
              , H = new Uint8Array(m.width * m.lines * (m.channels * m.type * 2))
              , P = {
                version: yt(C, S),
                unknownUncompressedSize: yt(C, S),
                unknownCompressedSize: yt(C, S),
                acCompressedSize: yt(C, S),
                dcCompressedSize: yt(C, S),
                rleCompressedSize: yt(C, S),
                rleUncompressedSize: yt(C, S),
                rleRawSize: yt(C, S),
                totalAcUncompressedCount: yt(C, S),
                totalDcUncompressedCount: yt(C, S),
                acCompression: yt(C, S)
            };
            if (P.version < 2)
                throw "EXRLoader.parse: " + jt.compression + " version " + P.version + " is unsupported";
            for (var O = new Array, Z = On(C, S) - 2; Z > 0; ) {
                var W = er(C.buffer, S)
                  , ee = mn(C, S)
                  , $ = ee >> 2 & 3
                  , te = (ee >> 4) - 1
                  , q = new Int8Array([te])[0]
                  , Ke = mn(C, S);
                O.push({
                    name: W,
                    index: q,
                    type: Ke,
                    compression: $
                }),
                Z -= W.length + 3
            }
            for (var ce = jt.channels, de = new Array(m.channels), ve = 0; ve < m.channels; ++ve) {
                var Ee = de[ve] = {}
                  , xe = ce[ve];
                Ee.name = xe.name,
                Ee.compression = 0,
                Ee.decoded = !1,
                Ee.type = xe.pixelType,
                Ee.pLinear = xe.pLinear,
                Ee.width = m.width,
                Ee.height = m.lines
            }
            for (var Te = {
                idx: new Array(3)
            }, ge = 0; ge < m.channels; ++ge)
                for (var Ee = de[ge], ve = 0; ve < O.length; ++ve) {
                    var Me = O[ve];
                    Ee.name == Me.name && (Ee.compression = Me.compression,
                    Me.index >= 0 && (Te.idx[Me.index] = ge),
                    Ee.offset = ge)
                }
            if (P.acCompressedSize > 0)
                switch (P.acCompression) {
                case 0:
                    var Se = new Uint16Array(P.totalAcUncompressedCount);
                    It(m.array, C, S, P.acCompressedSize, Se, P.totalAcUncompressedCount);
                    break;
                case 1:
                    var De = m.array.slice(S.value, S.value + P.totalAcUncompressedCount)
                      , ze = as(De)
                      , Se = new Uint16Array(ze.buffer);
                    S.value += P.totalAcUncompressedCount;
                    break
                }
            if (P.dcCompressedSize > 0) {
                var je = {
                    array: m.array,
                    offset: S,
                    size: P.dcCompressedSize
                }
                  , mt = new Uint16Array(Ir(je).buffer);
                S.value += P.dcCompressedSize
            }
            if (P.rleRawSize > 0) {
                var De = m.array.slice(S.value, S.value + P.rleCompressedSize)
                  , ze = as(De)
                  , nt = ri(ze.buffer);
                S.value += P.rleCompressedSize
            }
            for (var ft = 0, Je = new Array(de.length), ve = 0; ve < Je.length; ++ve)
                Je[ve] = new Array;
            for (var st = 0; st < m.lines; ++st)
                for (var Qe = 0; Qe < de.length; ++Qe)
                    Je[Qe].push(ft),
                    ft += de[Qe].width * m.type * 2;
            Cs(Te, Je, de, Se, mt, H);
            for (var ve = 0; ve < de.length; ++ve) {
                var Ee = de[ve];
                if (!Ee.decoded)
                    switch (Ee.compression) {
                    case 2:
                        for (var Le = 0, Ye = 0, st = 0; st < m.lines; ++st) {
                            for (var ln = Je[ve][Le], Et = 0; Et < Ee.width; ++Et) {
                                for (var Zt = 0; Zt < 2 * Ee.type; ++Zt)
                                    H[ln++] = nt[Ye + Zt * Ee.width * Ee.height];
                                Ye++
                            }
                            Le++
                        }
                        break;
                    case 1:
                    default:
                        throw "EXRLoader.parse: unsupported channel compression"
                    }
            }
            return new DataView(H.buffer)
        }
        function er(m, C) {
            for (var S = new Uint8Array(m), H = 0; S[C.value + H] != 0; )
                H += 1;
            var P = new TextDecoder().decode(S.slice(C.value, C.value + H));
            return C.value = C.value + H + 1,
            P
        }
        function Fs(m, C, S) {
            var H = new TextDecoder().decode(new Uint8Array(m).slice(C.value, C.value + S));
            return C.value = C.value + S,
            H
        }
        function _s(m, C) {
            var S = Pn(m, C)
              , H = At(m, C);
            return [S, H]
        }
        function Ts(m, C) {
            var S = At(m, C)
              , H = At(m, C);
            return [S, H]
        }
        function Pn(m, C) {
            var S = m.getInt32(C.value, !0);
            return C.value = C.value + 4,
            S
        }
        function At(m, C) {
            var S = m.getUint32(C.value, !0);
            return C.value = C.value + 4,
            S
        }
        function oi(m, C) {
            var S = m[C.value];
            return C.value = C.value + 1,
            S
        }
        function mn(m, C) {
            var S = m.getUint8(C.value);
            return C.value = C.value + 1,
            S
        }
        const yt = function(m, C) {
            let S;
            return "getBigInt64"in DataView.prototype ? S = Number(m.getBigInt64(C.value, !0)) : S = m.getUint32(C.value + 4, !0) + Number(m.getUint32(C.value, !0) << 32),
            C.value += 8,
            S
        };
        function at(m, C) {
            var S = m.getFloat32(C.value, !0);
            return C.value += 4,
            S
        }
        function Ds(m, C) {
            return gr.toHalfFloat(at(m, C))
        }
        function se(m) {
            var C = (m & 31744) >> 10
              , S = m & 1023;
            return (m >> 15 ? -1 : 1) * (C ? C === 31 ? S ? NaN : 1 / 0 : Math.pow(2, C - 15) * (1 + S / 1024) : 6103515625e-14 * (S / 1024))
        }
        function On(m, C) {
            var S = m.getUint16(C.value, !0);
            return C.value += 2,
            S
        }
        function Gs(m, C) {
            return se(On(m, C))
        }
        function xs(m, C, S, H) {
            for (var P = S.value, O = []; S.value < P + H - 1; ) {
                var Z = er(C, S)
                  , W = Pn(m, S)
                  , ee = mn(m, S);
                S.value += 3;
                var $ = Pn(m, S)
                  , te = Pn(m, S);
                O.push({
                    name: Z,
                    pixelType: W,
                    pLinear: ee,
                    xSampling: $,
                    ySampling: te
                })
            }
            return S.value += 1,
            O
        }
        function ai(m, C) {
            var S = at(m, C)
              , H = at(m, C)
              , P = at(m, C)
              , O = at(m, C)
              , Z = at(m, C)
              , W = at(m, C)
              , ee = at(m, C)
              , $ = at(m, C);
            return {
                redX: S,
                redY: H,
                greenX: P,
                greenY: O,
                blueX: Z,
                blueY: W,
                whiteX: ee,
                whiteY: $
            }
        }
        function li(m, C) {
            var S = ["NO_COMPRESSION", "RLE_COMPRESSION", "ZIPS_COMPRESSION", "ZIP_COMPRESSION", "PIZ_COMPRESSION", "PXR24_COMPRESSION", "B44_COMPRESSION", "B44A_COMPRESSION", "DWAA_COMPRESSION", "DWAB_COMPRESSION"]
              , H = mn(m, C);
            return S[H]
        }
        function Hs(m, C) {
            var S = At(m, C)
              , H = At(m, C)
              , P = At(m, C)
              , O = At(m, C);
            return {
                xMin: S,
                yMin: H,
                xMax: P,
                yMax: O
            }
        }
        function ui(m, C) {
            var S = ["INCREASING_Y"]
              , H = mn(m, C);
            return S[H]
        }
        function ci(m, C) {
            var S = at(m, C)
              , H = at(m, C);
            return [S, H]
        }
        function fi(m, C) {
            var S = at(m, C)
              , H = at(m, C)
              , P = at(m, C);
            return [S, H, P]
        }
        function Ls(m, C, S, H, P) {
            if (H === "string" || H === "stringvector" || H === "iccProfile")
                return Fs(C, S, P);
            if (H === "chlist")
                return xs(m, C, S, P);
            if (H === "chromaticities")
                return ai(m, S);
            if (H === "compression")
                return li(m, S);
            if (H === "box2i")
                return Hs(m, S);
            if (H === "lineOrder")
                return ui(m, S);
            if (H === "float")
                return at(m, S);
            if (H === "v2f")
                return ci(m, S);
            if (H === "v3f")
                return fi(m, S);
            if (H === "int")
                return Pn(m, S);
            if (H === "rational")
                return _s(m, S);
            if (H === "timecode")
                return Ts(m, S);
            if (H === "preview")
                return S.value += P,
                "skipped";
            S.value += P
        }
        function Ps(m, C, S) {
            const H = {};
            if (m.getUint32(0, !0) != 20000630)
                throw "THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";
            H.version = m.getUint8(4);
            const P = m.getUint8(5);
            H.spec = {
                singleTile: !!(P & 2),
                longName: !!(P & 4),
                deepFormat: !!(P & 8),
                multiPart: !!(P & 16)
            },
            S.value = 8;
            for (var O = !0; O; ) {
                var Z = er(C, S);
                if (Z == 0)
                    O = !1;
                else {
                    var W = er(C, S)
                      , ee = At(m, S)
                      , $ = Ls(m, C, S, W, ee);
                    $ === void 0 ? console.warn(`EXRLoader.parse: skipped unknown header attribute type '${W}'.`) : H[Z] = $
                }
            }
            if ((P & -5) != 0)
                throw console.error("EXRHeader:", H),
                "THREE.EXRLoader: provided file is currently unsupported.";
            return H
        }
        function Os(m, C, S, H, P) {
            const O = {
                size: 0,
                viewer: C,
                array: S,
                offset: H,
                width: m.dataWindow.xMax - m.dataWindow.xMin + 1,
                height: m.dataWindow.yMax - m.dataWindow.yMin + 1,
                channels: m.channels.length,
                bytesPerLine: null,
                lines: null,
                inputSize: null,
                type: m.channels[0].pixelType,
                uncompress: null,
                getter: null,
                format: null,
                [Yr ? "colorSpace" : "encoding"]: null
            };
            switch (m.compression) {
            case "NO_COMPRESSION":
                O.lines = 1,
                O.uncompress = ii;
                break;
            case "RLE_COMPRESSION":
                O.lines = 1,
                O.uncompress = Ln;
                break;
            case "ZIPS_COMPRESSION":
                O.lines = 1,
                O.uncompress = Ir;
                break;
            case "ZIP_COMPRESSION":
                O.lines = 16,
                O.uncompress = Ir;
                break;
            case "PIZ_COMPRESSION":
                O.lines = 32,
                O.uncompress = ws;
                break;
            case "PXR24_COMPRESSION":
                O.lines = 16,
                O.uncompress = Rs;
                break;
            case "DWAA_COMPRESSION":
                O.lines = 32,
                O.uncompress = si;
                break;
            case "DWAB_COMPRESSION":
                O.lines = 256,
                O.uncompress = si;
                break;
            default:
                throw "EXRLoader.parse: " + m.compression + " is unsupported"
            }
            if (O.scanlineBlockSize = O.lines,
            O.type == 1)
                switch (P) {
                case on:
                    O.getter = Gs,
                    O.inputSize = 2;
                    break;
                case Ht:
                    O.getter = On,
                    O.inputSize = 2;
                    break
                }
            else if (O.type == 2)
                switch (P) {
                case on:
                    O.getter = at,
                    O.inputSize = 4;
                    break;
                case Ht:
                    O.getter = Ds,
                    O.inputSize = 4
                }
            else
                throw "EXRLoader.parse: unsupported pixelType " + O.type + " for " + m.compression + ".";
            O.blockCount = (m.dataWindow.yMax + 1) / O.scanlineBlockSize;
            for (var Z = 0; Z < O.blockCount; Z++)
                yt(C, H);
            O.outputChannels = O.channels == 3 ? 4 : O.channels;
            const W = O.width * O.height * O.outputChannels;
            switch (P) {
            case on:
                O.byteArray = new Float32Array(W),
                O.channels < O.outputChannels && O.byteArray.fill(1, 0, W);
                break;
            case Ht:
                O.byteArray = new Uint16Array(W),
                O.channels < O.outputChannels && O.byteArray.fill(15360, 0, W);
                break;
            default:
                console.error("THREE.EXRLoader: unsupported type: ", P);
                break
            }
            return O.bytesPerLine = O.width * O.inputSize * O.channels,
            O.outputChannels == 4 ? O.format = Cr : O.format = wd,
            Yr ? O.colorSpace = "srgb-linear" : O.encoding = 3e3,
            O
        }
        const Nn = new DataView(r)
          , wr = new Uint8Array(r)
          , kn = {
            value: 0
        }
          , jt = Ps(Nn, r, kn)
          , Fe = Os(jt, Nn, wr, kn, this.type)
          , di = {
            value: 0
        }
          , Ns = {
            R: 0,
            G: 1,
            B: 2,
            A: 3,
            Y: 0
        };
        for (let m = 0; m < Fe.height / Fe.scanlineBlockSize; m++) {
            const C = At(Nn, kn);
            Fe.size = At(Nn, kn),
            Fe.lines = C + Fe.scanlineBlockSize > Fe.height ? Fe.height - C : Fe.scanlineBlockSize;
            const H = Fe.size < Fe.lines * Fe.bytesPerLine ? Fe.uncompress(Fe) : ii(Fe);
            kn.value += Fe.size;
            for (let P = 0; P < Fe.scanlineBlockSize; P++) {
                const O = P + m * Fe.scanlineBlockSize;
                if (O >= Fe.height)
                    break;
                for (let Z = 0; Z < Fe.channels; Z++) {
                    const W = Ns[jt.channels[Z].name];
                    for (let ee = 0; ee < Fe.width; ee++) {
                        di.value = (P * (Fe.channels * Fe.width) + Z * Fe.width + ee) * Fe.inputSize;
                        const $ = (Fe.height - 1 - O) * (Fe.width * Fe.outputChannels) + ee * Fe.outputChannels + W;
                        Fe.byteArray[$] = Fe.getter(H, di)
                    }
                }
            }
        }
        return {
            header: jt,
            width: Fe.width,
            height: Fe.height,
            data: Fe.byteArray,
            format: Fe.format,
            [Yr ? "colorSpace" : "encoding"]: Fe[Yr ? "colorSpace" : "encoding"],
            type: this.type
        }
    }
    setDataType(r) {
        return this.type = r,
        this
    }
    load(r, s, u, l) {
        function f(c, g) {
            Yr ? c.colorSpace = g.colorSpace : c.encoding = g.encoding,
            c.minFilter = _t,
            c.magFilter = _t,
            c.generateMipmaps = !1,
            c.flipY = !1,
            s && s(c, g)
        }
        return super.load(r, f, u, l)
    }
}
const ha = new WeakMap;
class Oh extends _a {
    constructor(r) {
        super(r),
        this.decoderPath = "",
        this.decoderConfig = {},
        this.decoderBinary = null,
        this.decoderPending = null,
        this.workerLimit = 4,
        this.workerPool = [],
        this.workerNextTaskID = 1,
        this.workerSourceURL = "",
        this.defaultAttributeIDs = {
            position: "POSITION",
            normal: "NORMAL",
            color: "COLOR",
            uv: "TEX_COORD"
        },
        this.defaultAttributeTypes = {
            position: "Float32Array",
            normal: "Float32Array",
            color: "Float32Array",
            uv: "Float32Array"
        }
    }
    setDecoderPath(r) {
        return this.decoderPath = r,
        this
    }
    setDecoderConfig(r) {
        return this.decoderConfig = r,
        this
    }
    setWorkerLimit(r) {
        return this.workerLimit = r,
        this
    }
    load(r, s, u, l) {
        const f = new Dn(this.manager);
        f.setPath(this.path),
        f.setResponseType("arraybuffer"),
        f.setRequestHeader(this.requestHeader),
        f.setWithCredentials(this.withCredentials),
        f.load(r, c => {
            const g = {
                attributeIDs: this.defaultAttributeIDs,
                attributeTypes: this.defaultAttributeTypes,
                useUniqueIDs: !1
            };
            this.decodeGeometry(c, g).then(s).catch(l)
        }
        , u, l)
    }
    decodeDracoFile(r, s, u, l) {
        const f = {
            attributeIDs: u || this.defaultAttributeIDs,
            attributeTypes: l || this.defaultAttributeTypes,
            useUniqueIDs: !!u
        };
        this.decodeGeometry(r, f).then(s)
    }
    decodeGeometry(r, s) {
        for (const p in s.attributeTypes) {
            const v = s.attributeTypes[p];
            v.BYTES_PER_ELEMENT !== void 0 && (s.attributeTypes[p] = v.name)
        }
        const u = JSON.stringify(s);
        if (ha.has(r)) {
            const p = ha.get(r);
            if (p.key === u)
                return p.promise;
            if (r.byteLength === 0)
                throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")
        }
        let l;
        const f = this.workerNextTaskID++
          , c = r.byteLength
          , g = this._getWorker(f, c).then(p => (l = p,
        new Promise( (v, h) => {
            l._callbacks[f] = {
                resolve: v,
                reject: h
            },
            l.postMessage({
                type: "decode",
                id: f,
                taskConfig: s,
                buffer: r
            }, [r])
        }
        ))).then(p => this._createGeometry(p.geometry));
        return g.catch( () => !0).then( () => {
            l && f && this._releaseTask(l, f)
        }
        ),
        ha.set(r, {
            key: u,
            promise: g
        }),
        g
    }
    _createGeometry(r) {
        const s = new Ra;
        r.index && s.setIndex(new Vr(r.index.array,1));
        for (let u = 0; u < r.attributes.length; u++) {
            const l = r.attributes[u]
              , f = l.name
              , c = l.array
              , g = l.itemSize;
            s.setAttribute(f, new Vr(c,g))
        }
        return s
    }
    _loadLibrary(r, s) {
        const u = new Dn(this.manager);
        return u.setPath(this.decoderPath),
        u.setResponseType(s),
        u.setWithCredentials(this.withCredentials),
        new Promise( (l, f) => {
            u.load(r, l, void 0, f)
        }
        )
    }
    preload() {
        return this._initDecoder(),
        this
    }
    _initDecoder() {
        if (this.decoderPending)
            return this.decoderPending;
        const r = typeof WebAssembly != "object" || this.decoderConfig.type === "js"
          , s = [];
        return r ? s.push(this._loadLibrary("draco_decoder.js", "text")) : (s.push(this._loadLibrary("draco_wasm_wrapper.js", "text")),
        s.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))),
        this.decoderPending = Promise.all(s).then(u => {
            const l = u[0];
            r || (this.decoderConfig.wasmBinary = u[1]);
            const f = Nh.toString()
              , c = ["/* draco decoder */", l, "", "/* worker */", f.substring(f.indexOf("{") + 1, f.lastIndexOf("}"))].join(`
`);
            this.workerSourceURL = URL.createObjectURL(new Blob([c]))
        }
        ),
        this.decoderPending
    }
    _getWorker(r, s) {
        return this._initDecoder().then( () => {
            if (this.workerPool.length < this.workerLimit) {
                const l = new Worker(this.workerSourceURL);
                l._callbacks = {},
                l._taskCosts = {},
                l._taskLoad = 0,
                l.postMessage({
                    type: "init",
                    decoderConfig: this.decoderConfig
                }),
                l.onmessage = function(f) {
                    const c = f.data;
                    switch (c.type) {
                    case "decode":
                        l._callbacks[c.id].resolve(c);
                        break;
                    case "error":
                        l._callbacks[c.id].reject(c);
                        break;
                    default:
                        console.error('THREE.DRACOLoader: Unexpected message, "' + c.type + '"')
                    }
                }
                ,
                this.workerPool.push(l)
            } else
                this.workerPool.sort(function(l, f) {
                    return l._taskLoad > f._taskLoad ? -1 : 1
                });
            const u = this.workerPool[this.workerPool.length - 1];
            return u._taskCosts[r] = s,
            u._taskLoad += s,
            u
        }
        )
    }
    _releaseTask(r, s) {
        r._taskLoad -= r._taskCosts[s],
        delete r._callbacks[s],
        delete r._taskCosts[s]
    }
    debug() {
        console.log("Task load: ", this.workerPool.map(r => r._taskLoad))
    }
    dispose() {
        for (let r = 0; r < this.workerPool.length; ++r)
            this.workerPool[r].terminate();
        return this.workerPool.length = 0,
        this
    }
}
function Nh() {
    let o, r;
    onmessage = function(c) {
        const g = c.data;
        switch (g.type) {
        case "init":
            o = g.decoderConfig,
            r = new Promise(function(h) {
                o.onModuleLoaded = function(A) {
                    h({
                        draco: A
                    })
                }
                ,
                DracoDecoderModule(o)
            }
            );
            break;
        case "decode":
            const p = g.buffer
              , v = g.taskConfig;
            r.then(h => {
                const A = h.draco
                  , B = new A.Decoder
                  , E = new A.DecoderBuffer;
                E.Init(new Int8Array(p), p.byteLength);
                try {
                    const M = s(A, B, E, v)
                      , D = M.attributes.map(w => w.array.buffer);
                    M.index && D.push(M.index.array.buffer),
                    self.postMessage({
                        type: "decode",
                        id: g.id,
                        geometry: M
                    }, D)
                } catch (M) {
                    console.error(M),
                    self.postMessage({
                        type: "error",
                        id: g.id,
                        error: M.message
                    })
                } finally {
                    A.destroy(E),
                    A.destroy(B)
                }
            }
            );
            break
        }
    }
    ;
    function s(c, g, p, v) {
        const h = v.attributeIDs
          , A = v.attributeTypes;
        let B, E;
        const M = g.GetEncodedGeometryType(p);
        if (M === c.TRIANGULAR_MESH)
            B = new c.Mesh,
            E = g.DecodeBufferToMesh(p, B);
        else if (M === c.POINT_CLOUD)
            B = new c.PointCloud,
            E = g.DecodeBufferToPointCloud(p, B);
        else
            throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
        if (!E.ok() || B.ptr === 0)
            throw new Error("THREE.DRACOLoader: Decoding failed: " + E.error_msg());
        const D = {
            index: null,
            attributes: []
        };
        for (const w in h) {
            const I = self[A[w]];
            let T, R;
            if (v.useUniqueIDs)
                R = h[w],
                T = g.GetAttributeByUniqueId(B, R);
            else {
                if (R = g.GetAttributeId(B, c[h[w]]),
                R === -1)
                    continue;
                T = g.GetAttribute(B, R)
            }
            D.attributes.push(l(c, g, B, w, I, T))
        }
        return M === c.TRIANGULAR_MESH && (D.index = u(c, g, B)),
        c.destroy(B),
        D
    }
    function u(c, g, p) {
        const h = p.num_faces() * 3
          , A = h * 4
          , B = c._malloc(A);
        g.GetTrianglesUInt32Array(p, A, B);
        const E = new Uint32Array(c.HEAPF32.buffer,B,h).slice();
        return c._free(B),
        {
            array: E,
            itemSize: 1
        }
    }
    function l(c, g, p, v, h, A) {
        const B = A.num_components()
          , M = p.num_points() * B
          , D = M * h.BYTES_PER_ELEMENT
          , w = f(c, h)
          , I = c._malloc(D);
        g.GetAttributeDataArrayForAllPoints(p, A, w, D, I);
        const T = new h(c.HEAPF32.buffer,I,M).slice();
        return c._free(I),
        {
            name: v,
            array: T,
            itemSize: B
        }
    }
    function f(c, g) {
        switch (g) {
        case Float32Array:
            return c.DT_FLOAT32;
        case Int8Array:
            return c.DT_INT8;
        case Int16Array:
            return c.DT_INT16;
        case Int32Array:
            return c.DT_INT32;
        case Uint8Array:
            return c.DT_UINT8;
        case Uint16Array:
            return c.DT_UINT16;
        case Uint32Array:
            return c.DT_UINT32
        }
    }
}
let ls;
const Aa = () => {
    if (ls)
        return ls;
    const o = "B9h9z9tFBBBF8fL9gBB9gLaaaaaFa9gEaaaB9gFaFa9gEaaaFaEMcBFFFGGGEIIILF9wFFFLEFBFKNFaFCx/IFMO/LFVK9tv9t9vq95GBt9f9f939h9z9t9f9j9h9s9s9f9jW9vq9zBBp9tv9z9o9v9wW9f9kv9j9v9kv9WvqWv94h919m9mvqBF8Z9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv94h919m9mvqBGy9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv949TvZ91v9u9jvBEn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9P9jWBIi9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9R919hWBLn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9F949wBKI9z9iqlBOc+x8ycGBM/qQFTa8jUUUUBCU/EBlHL8kUUUUBC9+RKGXAGCFJAI9LQBCaRKAE2BBC+gF9HQBALAEAIJHOAGlAGTkUUUBRNCUoBAG9uC/wgBZHKCUGAKCUG9JyRVAECFJRICBRcGXEXAcAF9PQFAVAFAclAcAVJAF9JyRMGXGXAG9FQBAMCbJHKC9wZRSAKCIrCEJCGrRQANCUGJRfCBRbAIRTEXGXAOATlAQ9PQBCBRISEMATAQJRIGXAS9FQBCBRtCBREEXGXAOAIlCi9PQBCBRISLMANCU/CBJAEJRKGXGXGXGXGXATAECKrJ2BBAtCKZrCEZfIBFGEBMAKhB83EBAKCNJhB83EBSEMAKAI2BIAI2BBHmCKrHYAYCE6HYy86BBAKCFJAICIJAYJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCGJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCEJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCIJAYAmJHY2BBAI2BFHmCKrHPAPCE6HPy86BBAKCLJAYAPJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCKJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCOJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCNJAYAmJHY2BBAI2BGHmCKrHPAPCE6HPy86BBAKCVJAYAPJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCcJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCMJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCSJAYAmJHm2BBAI2BEHICKrHYAYCE6HYy86BBAKCQJAmAYJHm2BBAICIrCEZHYAYCE6HYy86BBAKCfJAmAYJHm2BBAICGrCEZHYAYCE6HYy86BBAKCbJAmAYJHK2BBAICEZHIAICE6HIy86BBAKAIJRISGMAKAI2BNAI2BBHmCIrHYAYCb6HYy86BBAKCFJAICNJAYJHY2BBAmCbZHmAmCb6Hmy86BBAKCGJAYAmJHm2BBAI2BFHYCIrHPAPCb6HPy86BBAKCEJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCIJAmAYJHm2BBAI2BGHYCIrHPAPCb6HPy86BBAKCLJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCKJAmAYJHm2BBAI2BEHYCIrHPAPCb6HPy86BBAKCOJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCNJAmAYJHm2BBAI2BIHYCIrHPAPCb6HPy86BBAKCVJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCcJAmAYJHm2BBAI2BLHYCIrHPAPCb6HPy86BBAKCMJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCSJAmAYJHm2BBAI2BKHYCIrHPAPCb6HPy86BBAKCQJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCfJAmAYJHm2BBAI2BOHICIrHYAYCb6HYy86BBAKCbJAmAYJHK2BBAICbZHIAICb6HIy86BBAKAIJRISFMAKAI8pBB83BBAKCNJAICNJ8pBB83BBAICTJRIMAtCGJRtAECTJHEAS9JQBMMGXAIQBCBRISEMGXAM9FQBANAbJ2BBRtCBRKAfREEXAEANCU/CBJAKJ2BBHTCFrCBATCFZl9zAtJHt86BBAEAGJREAKCFJHKAM9HQBMMAfCFJRfAIRTAbCFJHbAG9HQBMMABAcAG9sJANCUGJAMAG9sTkUUUBpANANCUGJAMCaJAG9sJAGTkUUUBpMAMCBAIyAcJRcAIQBMC9+RKSFMCBC99AOAIlAGCAAGCA9Ly6yRKMALCU/EBJ8kUUUUBAKM+OmFTa8jUUUUBCoFlHL8kUUUUBC9+RKGXAFCE9uHOCtJAI9LQBCaRKAE2BBHNC/wFZC/gF9HQBANCbZHVCF9LQBALCoBJCgFCUFT+JUUUBpALC84Jha83EBALC8wJha83EBALC8oJha83EBALCAJha83EBALCiJha83EBALCTJha83EBALha83ENALha83EBAEAIJC9wJRcAECFJHNAOJRMGXAF9FQBCQCbAVCF6yRSABRECBRVCBRQCBRfCBRICBRKEXGXAMAcuQBC9+RKSEMGXGXAN2BBHOC/vF9LQBALCoBJAOCIrCa9zAKJCbZCEWJHb8oGIRTAb8oGBRtGXAOCbZHbAS9PQBALAOCa9zAIJCbZCGWJ8oGBAVAbyROAb9FRbGXGXAGCG9HQBABAt87FBABCIJAO87FBABCGJAT87FBSFMAEAtjGBAECNJAOjGBAECIJATjGBMAVAbJRVALCoBJAKCEWJHmAOjGBAmATjGIALAICGWJAOjGBALCoBJAKCFJCbZHKCEWJHTAtjGBATAOjGIAIAbJRIAKCFJRKSGMGXGXAbCb6QBAQAbJAbC989zJCFJRQSFMAM1BBHbCgFZROGXGXAbCa9MQBAMCFJRMSFMAM1BFHbCgBZCOWAOCgBZqROGXAbCa9MQBAMCGJRMSFMAM1BGHbCgBZCfWAOqROGXAbCa9MQBAMCEJRMSFMAM1BEHbCgBZCdWAOqROGXAbCa9MQBAMCIJRMSFMAM2BIC8cWAOqROAMCLJRMMAOCFrCBAOCFZl9zAQJRQMGXGXAGCG9HQBABAt87FBABCIJAQ87FBABCGJAT87FBSFMAEAtjGBAECNJAQjGBAECIJATjGBMALCoBJAKCEWJHOAQjGBAOATjGIALAICGWJAQjGBALCoBJAKCFJCbZHKCEWJHOAtjGBAOAQjGIAICFJRIAKCFJRKSFMGXAOCDF9LQBALAIAcAOCbZJ2BBHbCIrHTlCbZCGWJ8oGBAVCFJHtATyROALAIAblCbZCGWJ8oGBAtAT9FHmJHtAbCbZHTyRbAT9FRTGXGXAGCG9HQBABAV87FBABCIJAb87FBABCGJAO87FBSFMAEAVjGBAECNJAbjGBAECIJAOjGBMALAICGWJAVjGBALCoBJAKCEWJHYAOjGBAYAVjGIALAICFJHICbZCGWJAOjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAIAmJCbZHICGWJAbjGBALCoBJAKCGJCbZHKCEWJHOAVjGBAOAbjGIAKCFJRKAIATJRIAtATJRVSFMAVCBAM2BBHYyHTAOC/+F6HPJROAYCbZRtGXGXAYCIrHmQBAOCFJRbSFMAORbALAIAmlCbZCGWJ8oGBROMGXGXAtQBAbCFJRVSFMAbRVALAIAYlCbZCGWJ8oGBRbMGXGXAP9FQBAMCFJRYSFMAM1BFHYCgFZRTGXGXAYCa9MQBAMCGJRYSFMAM1BGHYCgBZCOWATCgBZqRTGXAYCa9MQBAMCEJRYSFMAM1BEHYCgBZCfWATqRTGXAYCa9MQBAMCIJRYSFMAM1BIHYCgBZCdWATqRTGXAYCa9MQBAMCLJRYSFMAMCKJRYAM2BLC8cWATqRTMATCFrCBATCFZl9zAQJHQRTMGXGXAmCb6QBAYRPSFMAY1BBHMCgFZROGXGXAMCa9MQBAYCFJRPSFMAY1BFHMCgBZCOWAOCgBZqROGXAMCa9MQBAYCGJRPSFMAY1BGHMCgBZCfWAOqROGXAMCa9MQBAYCEJRPSFMAY1BEHMCgBZCdWAOqROGXAMCa9MQBAYCIJRPSFMAYCLJRPAY2BIC8cWAOqROMAOCFrCBAOCFZl9zAQJHQROMGXGXAtCb6QBAPRMSFMAP1BBHMCgFZRbGXGXAMCa9MQBAPCFJRMSFMAP1BFHMCgBZCOWAbCgBZqRbGXAMCa9MQBAPCGJRMSFMAP1BGHMCgBZCfWAbqRbGXAMCa9MQBAPCEJRMSFMAP1BEHMCgBZCdWAbqRbGXAMCa9MQBAPCIJRMSFMAPCLJRMAP2BIC8cWAbqRbMAbCFrCBAbCFZl9zAQJHQRbMGXGXAGCG9HQBABAT87FBABCIJAb87FBABCGJAO87FBSFMAEATjGBAECNJAbjGBAECIJAOjGBMALCoBJAKCEWJHYAOjGBAYATjGIALAICGWJATjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAICFJHICbZCGWJAOjGBALCoBJAKCGJCbZCEWJHOATjGBAOAbjGIALAIAm9FAmCb6qJHICbZCGWJAbjGBAIAt9FAtCb6qJRIAKCEJRKMANCFJRNABCKJRBAECSJREAKCbZRKAICbZRIAfCEJHfAF9JQBMMCBC99AMAc6yRKMALCoFJ8kUUUUBAKM/tIFGa8jUUUUBCTlRLC9+RKGXAFCLJAI9LQBCaRKAE2BBC/+FZC/QF9HQBALhB83ENAECFJRKAEAIJC98JREGXAF9FQBGXAGCG6QBEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMALCNJAICFZCGWqHGAICGrCBAICFrCFZl9zAG8oGBJHIjGBABAIjGBABCIJRBAFCaJHFQBSGMMEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMABAICGrCBAICFrCFZl9zALCNJAICFZCGWqHI8oGBJHG87FBAIAGjGBABCGJRBAFCaJHFQBMMCBC99AKAE6yRKMAKM+lLKFaF99GaG99FaG99GXGXAGCI9HQBAF9FQFEXGXGX9DBBB8/9DBBB+/ABCGJHG1BB+yAB1BBHE+yHI+L+TABCFJHL1BBHK+yHO+L+THN9DBBBB9gHVyAN9DBB/+hANAN+U9DBBBBANAVyHcAc+MHMAECa3yAI+SHIAI+UAcAMAKCa3yAO+SHcAc+U+S+S+R+VHO+U+SHN+L9DBBB9P9d9FQBAN+oRESFMCUUUU94REMAGAE86BBGXGX9DBBB8/9DBBB+/Ac9DBBBB9gyAcAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMALAG86BBGXGX9DBBB8/9DBBB+/AI9DBBBB9gyAIAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMABAG86BBABCIJRBAFCaJHFQBSGMMAF9FQBEXGXGX9DBBB8/9DBBB+/ABCIJHG8uFB+yAB8uFBHE+yHI+L+TABCGJHL8uFBHK+yHO+L+THN9DBBBB9gHVyAN9DB/+g6ANAN+U9DBBBBANAVyHcAc+MHMAECa3yAI+SHIAI+UAcAMAKCa3yAO+SHcAc+U+S+S+R+VHO+U+SHN+L9DBBB9P9d9FQBAN+oRESFMCUUUU94REMAGAE87FBGXGX9DBBB8/9DBBB+/Ac9DBBBB9gyAcAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMALAG87FBGXGX9DBBB8/9DBBB+/AI9DBBBB9gyAIAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMABAG87FBABCNJRBAFCaJHFQBMMM/SEIEaE99EaF99GXAF9FQBCBREABRIEXGXGX9D/zI818/AICKJ8uFBHLCEq+y+VHKAI8uFB+y+UHO9DB/+g6+U9DBBB8/9DBBB+/AO9DBBBB9gy+SHN+L9DBBB9P9d9FQBAN+oRVSFMCUUUU94RVMAICIJ8uFBRcAICGJ8uFBRMABALCFJCEZAEqCFWJAV87FBGXGXAKAM+y+UHN9DB/+g6+U9DBBB8/9DBBB+/AN9DBBBB9gy+SHS+L9DBBB9P9d9FQBAS+oRMSFMCUUUU94RMMABALCGJCEZAEqCFWJAM87FBGXGXAKAc+y+UHK9DB/+g6+U9DBBB8/9DBBB+/AK9DBBBB9gy+SHS+L9DBBB9P9d9FQBAS+oRcSFMCUUUU94RcMABALCaJCEZAEqCFWJAc87FBGXGX9DBBU8/AOAO+U+TANAN+U+TAKAK+U+THO9DBBBBAO9DBBBB9gy+R9DB/+g6+U9DBBB8/+SHO+L9DBBB9P9d9FQBAO+oRcSFMCUUUU94RcMABALCEZAEqCFWJAc87FBAICNJRIAECIJREAFCaJHFQBMMM9JBGXAGCGrAF9sHF9FQBEXABAB8oGBHGCNWCN91+yAGCi91CnWCUUU/8EJ+++U84GBABCIJRBAFCaJHFQBMMM9TFEaCBCB8oGUkUUBHFABCEJC98ZJHBjGUkUUBGXGXAB8/BCTWHGuQBCaREABAGlCggEJCTrXBCa6QFMAFREMAEM/lFFFaGXGXAFABqCEZ9FQBABRESFMGXGXAGCT9PQBABRESFMABREEXAEAF8oGBjGBAECIJAFCIJ8oGBjGBAECNJAFCNJ8oGBjGBAECSJAFCSJ8oGBjGBAECTJREAFCTJRFAGC9wJHGCb9LQBMMAGCI9JQBEXAEAF8oGBjGBAFCIJRFAECIJREAGC98JHGCE9LQBMMGXAG9FQBEXAEAF2BB86BBAECFJREAFCFJRFAGCaJHGQBMMABMoFFGaGXGXABCEZ9FQBABRESFMAFCgFZC+BwsN9sRIGXGXAGCT9PQBABRESFMABREEXAEAIjGBAECSJAIjGBAECNJAIjGBAECIJAIjGBAECTJREAGC9wJHGCb9LQBMMAGCI9JQBEXAEAIjGBAECIJREAGC98JHGCE9LQBMMGXAG9FQBEXAEAF86BBAECFJREAGCaJHGQBMMABMMMFBCUNMIT9kBB"
      , r = "B9h9z9tFBBBFiI9gBB9gLaaaaaFa9gEaaaB9gFaFaEMcBBFBFFGGGEILF9wFFFLEFBFKNFaFCx/aFMO/LFVK9tv9t9vq95GBt9f9f939h9z9t9f9j9h9s9s9f9jW9vq9zBBp9tv9z9o9v9wW9f9kv9j9v9kv9WvqWv94h919m9mvqBG8Z9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv94h919m9mvqBIy9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv949TvZ91v9u9jvBLn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9P9jWBKi9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9R919hWBOn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9F949wBNI9z9iqlBVc+N9IcIBTEM9+FLa8jUUUUBCTlRBCBRFEXCBRGCBREEXABCNJAGJAECUaAFAGrCFZHIy86BBAEAIJREAGCFJHGCN9HQBMAFCx+YUUBJAE86BBAFCEWCxkUUBJAB8pEN83EBAFCFJHFCUG9HQBMMk8lLbaE97F9+FaL978jUUUUBCU/KBlHL8kUUUUBC9+RKGXAGCFJAI9LQBCaRKAE2BBC+gF9HQBALAEAIJHOAGlAG/8cBBCUoBAG9uC/wgBZHKCUGAKCUG9JyRNAECFJRKCBRVGXEXAVAF9PQFANAFAVlAVANJAF9JyRcGXGXAG9FQBAcCbJHIC9wZHMCE9sRSAMCFWRQAICIrCEJCGrRfCBRbEXAKRTCBRtGXEXGXAOATlAf9PQBCBRKSLMALCU/CBJAtAM9sJRmATAfJRKCBREGXAMCoB9JQBAOAKlC/gB9JQBCBRIEXAmAIJREGXGXGXGXGXATAICKrJ2BBHYCEZfIBFGEBMAECBDtDMIBSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAEAKDBBBDMIBAKCTJRKMGXGXGXGXGXAYCGrCEZfIBFGEBMAECBDtDMITSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMITAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMITAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAEAKDBBBDMITAKCTJRKMGXGXGXGXGXAYCIrCEZfIBFGEBMAECBDtDMIASEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIAAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIAAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAEAKDBBBDMIAAKCTJRKMGXGXGXGXGXAYCKrfIBFGEBMAECBDtDMI8wSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHYCEWCxkUUBJDBEBAYCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHYCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMI8wAKCIJAeDeBJAYCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHYCEWCxkUUBJDBEBAYCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHYCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMI8wAKCNJAeDeBJAYCx+YUUBJ2BBJRKSFMAEAKDBBBDMI8wAKCTJRKMAICoBJREAICUFJAM9LQFAERIAOAKlC/fB9LQBMMGXAEAM9PQBAECErRIEXGXAOAKlCi9PQBCBRKSOMAmAEJRYGXGXGXGXGXATAECKrJ2BBAICKZrCEZfIBFGEBMAYCBDtDMIBSEMAYAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAYAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAYAKDBBBDMIBAKCTJRKMAICGJRIAECTJHEAM9JQBMMGXAK9FQBAKRTAtCFJHtCI6QGSFMMCBRKSEMGXAM9FQBALCUGJAbJREALAbJDBGBReCBRYEXAEALCU/CBJAYJHIDBIBHdCFD9tAdCFDbHPD9OD9hD9RHdAIAMJDBIBH8ZCFD9tA8ZAPD9OD9hD9RH8ZDQBTFtGmEYIPLdKeOnHpAIAQJDBIBHyCFD9tAyAPD9OD9hD9RHyAIASJDBIBH8cCFD9tA8cAPD9OD9hD9RH8cDQBTFtGmEYIPLdKeOnH8dDQBFTtGEmYILPdKOenHPAPDQBFGEBFGEBFGEBFGEAeD9uHeDyBjGBAEAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJHIAeApA8dDQNVi8ZcMpySQ8c8dfb8e8fHPAPDQBFGEBFGEBFGEBFGED9uHeDyBjGBAIAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJHIAeAdA8ZDQNiV8ZcpMyS8cQ8df8eb8fHdAyA8cDQNiV8ZcpMyS8cQ8df8eb8fH8ZDQBFTtGEmYILPdKOenHPAPDQBFGEBFGEBFGEBFGED9uHeDyBjGBAIAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJHIAeAdA8ZDQNVi8ZcMpySQ8c8dfb8e8fHPAPDQBFGEBFGEBFGEBFGED9uHeDyBjGBAIAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJREAYCTJHYAM9JQBMMAbCIJHbAG9JQBMMABAVAG9sJALCUGJAcAG9s/8cBBALALCUGJAcCaJAG9sJAG/8cBBMAcCBAKyAVJRVAKQBMC9+RKSFMCBC99AOAKlAGCAAGCA9Ly6yRKMALCU/KBJ8kUUUUBAKMNBT+BUUUBM+KmFTa8jUUUUBCoFlHL8kUUUUBC9+RKGXAFCE9uHOCtJAI9LQBCaRKAE2BBHNC/wFZC/gF9HQBANCbZHVCF9LQBALCoBJCgFCUF/8MBALC84Jha83EBALC8wJha83EBALC8oJha83EBALCAJha83EBALCiJha83EBALCTJha83EBALha83ENALha83EBAEAIJC9wJRcAECFJHNAOJRMGXAF9FQBCQCbAVCF6yRSABRECBRVCBRQCBRfCBRICBRKEXGXAMAcuQBC9+RKSEMGXGXAN2BBHOC/vF9LQBALCoBJAOCIrCa9zAKJCbZCEWJHb8oGIRTAb8oGBRtGXAOCbZHbAS9PQBALAOCa9zAIJCbZCGWJ8oGBAVAbyROAb9FRbGXGXAGCG9HQBABAt87FBABCIJAO87FBABCGJAT87FBSFMAEAtjGBAECNJAOjGBAECIJATjGBMAVAbJRVALCoBJAKCEWJHmAOjGBAmATjGIALAICGWJAOjGBALCoBJAKCFJCbZHKCEWJHTAtjGBATAOjGIAIAbJRIAKCFJRKSGMGXGXAbCb6QBAQAbJAbC989zJCFJRQSFMAM1BBHbCgFZROGXGXAbCa9MQBAMCFJRMSFMAM1BFHbCgBZCOWAOCgBZqROGXAbCa9MQBAMCGJRMSFMAM1BGHbCgBZCfWAOqROGXAbCa9MQBAMCEJRMSFMAM1BEHbCgBZCdWAOqROGXAbCa9MQBAMCIJRMSFMAM2BIC8cWAOqROAMCLJRMMAOCFrCBAOCFZl9zAQJRQMGXGXAGCG9HQBABAt87FBABCIJAQ87FBABCGJAT87FBSFMAEAtjGBAECNJAQjGBAECIJATjGBMALCoBJAKCEWJHOAQjGBAOATjGIALAICGWJAQjGBALCoBJAKCFJCbZHKCEWJHOAtjGBAOAQjGIAICFJRIAKCFJRKSFMGXAOCDF9LQBALAIAcAOCbZJ2BBHbCIrHTlCbZCGWJ8oGBAVCFJHtATyROALAIAblCbZCGWJ8oGBAtAT9FHmJHtAbCbZHTyRbAT9FRTGXGXAGCG9HQBABAV87FBABCIJAb87FBABCGJAO87FBSFMAEAVjGBAECNJAbjGBAECIJAOjGBMALAICGWJAVjGBALCoBJAKCEWJHYAOjGBAYAVjGIALAICFJHICbZCGWJAOjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAIAmJCbZHICGWJAbjGBALCoBJAKCGJCbZHKCEWJHOAVjGBAOAbjGIAKCFJRKAIATJRIAtATJRVSFMAVCBAM2BBHYyHTAOC/+F6HPJROAYCbZRtGXGXAYCIrHmQBAOCFJRbSFMAORbALAIAmlCbZCGWJ8oGBROMGXGXAtQBAbCFJRVSFMAbRVALAIAYlCbZCGWJ8oGBRbMGXGXAP9FQBAMCFJRYSFMAM1BFHYCgFZRTGXGXAYCa9MQBAMCGJRYSFMAM1BGHYCgBZCOWATCgBZqRTGXAYCa9MQBAMCEJRYSFMAM1BEHYCgBZCfWATqRTGXAYCa9MQBAMCIJRYSFMAM1BIHYCgBZCdWATqRTGXAYCa9MQBAMCLJRYSFMAMCKJRYAM2BLC8cWATqRTMATCFrCBATCFZl9zAQJHQRTMGXGXAmCb6QBAYRPSFMAY1BBHMCgFZROGXGXAMCa9MQBAYCFJRPSFMAY1BFHMCgBZCOWAOCgBZqROGXAMCa9MQBAYCGJRPSFMAY1BGHMCgBZCfWAOqROGXAMCa9MQBAYCEJRPSFMAY1BEHMCgBZCdWAOqROGXAMCa9MQBAYCIJRPSFMAYCLJRPAY2BIC8cWAOqROMAOCFrCBAOCFZl9zAQJHQROMGXGXAtCb6QBAPRMSFMAP1BBHMCgFZRbGXGXAMCa9MQBAPCFJRMSFMAP1BFHMCgBZCOWAbCgBZqRbGXAMCa9MQBAPCGJRMSFMAP1BGHMCgBZCfWAbqRbGXAMCa9MQBAPCEJRMSFMAP1BEHMCgBZCdWAbqRbGXAMCa9MQBAPCIJRMSFMAPCLJRMAP2BIC8cWAbqRbMAbCFrCBAbCFZl9zAQJHQRbMGXGXAGCG9HQBABAT87FBABCIJAb87FBABCGJAO87FBSFMAEATjGBAECNJAbjGBAECIJAOjGBMALCoBJAKCEWJHYAOjGBAYATjGIALAICGWJATjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAICFJHICbZCGWJAOjGBALCoBJAKCGJCbZCEWJHOATjGBAOAbjGIALAIAm9FAmCb6qJHICbZCGWJAbjGBAIAt9FAtCb6qJRIAKCEJRKMANCFJRNABCKJRBAECSJREAKCbZRKAICbZRIAfCEJHfAF9JQBMMCBC99AMAc6yRKMALCoFJ8kUUUUBAKM/tIFGa8jUUUUBCTlRLC9+RKGXAFCLJAI9LQBCaRKAE2BBC/+FZC/QF9HQBALhB83ENAECFJRKAEAIJC98JREGXAF9FQBGXAGCG6QBEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMALCNJAICFZCGWqHGAICGrCBAICFrCFZl9zAG8oGBJHIjGBABAIjGBABCIJRBAFCaJHFQBSGMMEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMABAICGrCBAICFrCFZl9zALCNJAICFZCGWqHI8oGBJHG87FBAIAGjGBABCGJRBAFCaJHFQBMMCBC99AKAE6yRKMAKM/dLEK97FaF97GXGXAGCI9HQBAF9FQFCBRGEXABABDBBBHECiD+rFCiD+sFD/6FHIAECND+rFCiD+sFD/6FAID/gFAECTD+rFCiD+sFD/6FHLD/gFD/kFD/lFHKCBDtD+2FHOAICUUUU94DtHND9OD9RD/kFHI9DBB/+hDYAIAID/mFAKAKD/mFALAOALAND9OD9RD/kFHIAID/mFD/kFD/kFD/jFD/nFHLD/mF9DBBX9LDYHOD/kFCgFDtD9OAECUUU94DtD9OD9QAIALD/mFAOD/kFCND+rFCU/+EDtD9OD9QAKALD/mFAOD/kFCTD+rFCUU/8ODtD9OD9QDMBBABCTJRBAGCIJHGAF9JQBSGMMAF9FQBCBRGEXABCTJHVAVDBBBHECBDtHOCUU98D8cFCUU98D8cEHND9OABDBBBHKAEDQILKOSQfbPden8c8d8e8fCggFDtD9OD/6FAKAEDQBFGENVcMTtmYi8ZpyHECTD+sFD/6FHID/gFAECTD+rFCTD+sFD/6FHLD/gFD/kFD/lFHE9DB/+g6DYALAEAOD+2FHOALCUUUU94DtHcD9OD9RD/kFHLALD/mFAEAED/mFAIAOAIAcD9OD9RD/kFHEAED/mFD/kFD/kFD/jFD/nFHID/mF9DBBX9LDYHOD/kFCTD+rFALAID/mFAOD/kFCggEDtD9OD9QHLAEAID/mFAOD/kFCaDbCBDnGCBDnECBDnKCBDnOCBDncCBDnMCBDnfCBDnbD9OHEDQNVi8ZcMpySQ8c8dfb8e8fD9QDMBBABAKAND9OALAEDQBFTtGEmYILPdKOenD9QDMBBABCAJRBAGCIJHGAF9JQBMMM/hEIGaF97FaL978jUUUUBCTlREGXAF9FQBCBRIEXAEABDBBBHLABCTJHKDBBBHODQILKOSQfbPden8c8d8e8fHNCTD+sFHVCID+rFDMIBAB9DBBU8/DY9D/zI818/DYAVCEDtD9QD/6FD/nFHVALAODQBFGENVcMTtmYi8ZpyHLCTD+rFCTD+sFD/6FD/mFHOAOD/mFAVALCTD+sFD/6FD/mFHcAcD/mFAVANCTD+rFCTD+sFD/6FD/mFHNAND/mFD/kFD/kFD/lFCBDtD+4FD/jF9DB/+g6DYHVD/mF9DBBX9LDYHLD/kFCggEDtHMD9OAcAVD/mFALD/kFCTD+rFD9QHcANAVD/mFALD/kFCTD+rFAOAVD/mFALD/kFAMD9OD9QHVDQBFTtGEmYILPdKOenHLD8dBAEDBIBDyB+t+J83EBABCNJALD8dFAEDBIBDyF+t+J83EBAKAcAVDQNVi8ZcMpySQ8c8dfb8e8fHVD8dBAEDBIBDyG+t+J83EBABCiJAVD8dFAEDBIBDyE+t+J83EBABCAJRBAICIJHIAF9JQBMMM9jFF97GXAGCGrAF9sHG9FQBCBRFEXABABDBBBHECND+rFCND+sFD/6FAECiD+sFCnD+rFCUUU/8EDtD+uFD/mFDMBBABCTJRBAFCIJHFAG9JQBMMM9TFEaCBCB8oGUkUUBHFABCEJC98ZJHBjGUkUUBGXGXAB8/BCTWHGuQBCaREABAGlCggEJCTrXBCa6QFMAFREMAEMMMFBCUNMIT9tBB"
      , s = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0, 5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11])
      , u = new Uint8Array([32, 0, 65, 253, 3, 1, 2, 34, 4, 106, 6, 5, 11, 8, 7, 20, 13, 33, 12, 16, 128, 9, 116, 64, 19, 113, 127, 15, 10, 21, 22, 14, 255, 66, 24, 54, 136, 107, 18, 23, 192, 26, 114, 118, 132, 17, 77, 101, 130, 144, 27, 87, 131, 44, 45, 74, 156, 154, 70, 167]);
    if (typeof WebAssembly != "object")
        return {
            supported: !1
        };
    let l = o;
    WebAssembly.validate(s) && (l = r);
    let f;
    const c = WebAssembly.instantiate(g(l), {}).then(A => {
        f = A.instance,
        f.exports.__wasm_call_ctors()
    }
    );
    function g(A) {
        const B = new Uint8Array(A.length);
        for (let M = 0; M < A.length; ++M) {
            const D = A.charCodeAt(M);
            B[M] = D > 96 ? D - 71 : D > 64 ? D - 65 : D > 47 ? D + 4 : D > 46 ? 63 : 62
        }
        let E = 0;
        for (let M = 0; M < A.length; ++M)
            B[E++] = B[M] < 60 ? u[B[M]] : (B[M] - 60) * 64 + B[++M];
        return B.buffer.slice(0, E)
    }
    function p(A, B, E, M, D, w) {
        const I = f.exports.sbrk
          , T = E + 3 & -4
          , R = I(T * M)
          , U = I(D.length)
          , b = new Uint8Array(f.exports.memory.buffer);
        b.set(D, U);
        const k = A(R, E, M, U, D.length);
        if (k === 0 && w && w(R, T, M),
        B.set(b.subarray(R, R + E * M)),
        I(R - I(0)),
        k !== 0)
            throw new Error(`Malformed buffer data: ${k}`)
    }
    const v = {
        0: "",
        1: "meshopt_decodeFilterOct",
        2: "meshopt_decodeFilterQuat",
        3: "meshopt_decodeFilterExp",
        NONE: "",
        OCTAHEDRAL: "meshopt_decodeFilterOct",
        QUATERNION: "meshopt_decodeFilterQuat",
        EXPONENTIAL: "meshopt_decodeFilterExp"
    }
      , h = {
        0: "meshopt_decodeVertexBuffer",
        1: "meshopt_decodeIndexBuffer",
        2: "meshopt_decodeIndexSequence",
        ATTRIBUTES: "meshopt_decodeVertexBuffer",
        TRIANGLES: "meshopt_decodeIndexBuffer",
        INDICES: "meshopt_decodeIndexSequence"
    };
    return ls = {
        ready: c,
        supported: !0,
        decodeVertexBuffer(A, B, E, M, D) {
            p(f.exports.meshopt_decodeVertexBuffer, A, B, E, M, f.exports[v[D]])
        },
        decodeIndexBuffer(A, B, E, M) {
            p(f.exports.meshopt_decodeIndexBuffer, A, B, E, M)
        },
        decodeIndexSequence(A, B, E, M) {
            p(f.exports.meshopt_decodeIndexSequence, A, B, E, M)
        },
        decodeGltfBuffer(A, B, E, M, D, w) {
            p(f.exports[h[D]], A, B, E, M, f.exports[v[w]])
        }
    },
    ls
}
;
let us = null
  , Uc = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";
function Jc(o, r, s) {
    return u => {
        s && s(u),
        o && (us || (us = new Oh),
        us.setDecoderPath(typeof o == "string" ? o : Uc),
        u.setDRACOLoader(us)),
        r && u.setMeshoptDecoder(typeof Aa == "function" ? Aa() : Aa)
    }
}
function Pa(o, r=!0, s=!0, u) {
    return Mr(La, o, Jc(r, s, u))
}
Pa.preload = (o, r=!0, s=!0, u) => Mr.preload(La, o, Jc(r, s, u));
Pa.clear = o => Mr.clear(La, o);
Pa.setDecoderPath = o => {
    Uc = o
}
;
function kh(o, r, s) {
    const u = an(B => B.size)
      , l = an(B => B.viewport)
      , f = typeof o == "number" ? o : u.width * l.dpr
      , c = u.height * l.dpr
      , g = (typeof o == "number" ? s : o) || {}
      , {samples: p=0, depth: v, ...h} = g
      , A = Q.useMemo( () => {
        const B = new Ta(f,c,{
            minFilter: _t,
            magFilter: _t,
            type: Ht,
            ...h
        });
        return v && (B.depthTexture = new Rd(f,c,on)),
        B.samples = p,
        B
    }
    , []);
    return Q.useLayoutEffect( () => {
        A.setSize(f, c),
        p && (A.samples = p)
    }
    , [p, A, f, c]),
    Q.useEffect( () => () => A.dispose(), []),
    A
}
const Uh = o => typeof o == "function"
  , uA = Q.forwardRef( ({envMap: o, resolution: r=256, frames: s=1 / 0, makeDefault: u, children: l, ...f}, c) => {
    const g = an( ({set: w}) => w)
      , p = an( ({camera: w}) => w)
      , v = an( ({size: w}) => w)
      , h = Q.useRef(null);
    Q.useImperativeHandle(c, () => h.current, []);
    const A = Q.useRef(null)
      , B = kh(r);
    Q.useLayoutEffect( () => {
        f.manual || (h.current.aspect = v.width / v.height)
    }
    , [v, f]),
    Q.useLayoutEffect( () => {
        h.current.updateProjectionMatrix()
    }
    );
    let E = 0
      , M = null;
    const D = Uh(l);
    return Ic(w => {
        D && (s === 1 / 0 || E < s) && (A.current.visible = !1,
        w.gl.setRenderTarget(B),
        M = w.scene.background,
        o && (w.scene.background = o),
        w.gl.render(w.scene, h.current),
        w.scene.background = M,
        w.gl.setRenderTarget(null),
        A.current.visible = !0,
        E++)
    }
    ),
    Q.useLayoutEffect( () => {
        if (u) {
            const w = p;
            return g( () => ({
                camera: h.current
            })),
            () => g( () => ({
                camera: w
            }))
        }
    }
    , [h, u, g]),
    Q.createElement(Q.Fragment, null, Q.createElement("perspectiveCamera", Er({
        ref: h
    }, f), !D && l), Q.createElement("group", {
        ref: A
    }, D && l(B.texture)))
}
)
  , Jh = 3e3
  , Kh = 3001
  , Kc = (o, r, s) => {
    let u;
    switch (o) {
    case As:
        u = new Uint8ClampedArray(r * s * 4);
        break;
    case Ht:
        u = new Uint16Array(r * s * 4);
        break;
    case Gd:
        u = new Uint32Array(r * s * 4);
        break;
    case Dd:
        u = new Int8Array(r * s * 4);
        break;
    case Td:
        u = new Int16Array(r * s * 4);
        break;
    case _d:
        u = new Int32Array(r * s * 4);
        break;
    case on:
        u = new Float32Array(r * s * 4);
        break;
    default:
        throw new Error("Unsupported data type")
    }
    return u
}
;
let cs;
const Qh = (o, r, s, u) => {
    if (cs !== void 0)
        return cs;
    const l = new Ta(1,1,u);
    r.setRenderTarget(l);
    const f = new Bs(new uc,new mr({
        color: 16777215
    }));
    r.render(f, s),
    r.setRenderTarget(null);
    const c = Kc(o, l.width, l.height);
    return r.readRenderTargetPixels(l, 0, 0, l.width, l.height, c),
    l.dispose(),
    f.geometry.dispose(),
    f.material.dispose(),
    cs = c[0] !== 0,
    cs
}
;
class Oa {
    constructor(r) {
        var s, u, l, f, c, g, p, v, h, A, B, E, M, D, w, I;
        this._rendererIsDisposable = !1,
        this._supportsReadPixels = !0,
        this.render = () => {
            this._renderer.setRenderTarget(this._renderTarget);
            try {
                this._renderer.render(this._scene, this._camera)
            } catch (R) {
                throw this._renderer.setRenderTarget(null),
                R
            }
            this._renderer.setRenderTarget(null)
        }
        ,
        this._width = r.width,
        this._height = r.height,
        this._type = r.type,
        this._colorSpace = r.colorSpace;
        const T = {
            format: Cr,
            depthBuffer: !1,
            stencilBuffer: !1,
            type: this._type,
            colorSpace: this._colorSpace,
            anisotropy: ((s = r.renderTargetOptions) === null || s === void 0 ? void 0 : s.anisotropy) !== void 0 ? (u = r.renderTargetOptions) === null || u === void 0 ? void 0 : u.anisotropy : 1,
            generateMipmaps: ((l = r.renderTargetOptions) === null || l === void 0 ? void 0 : l.generateMipmaps) !== void 0 ? (f = r.renderTargetOptions) === null || f === void 0 ? void 0 : f.generateMipmaps : !1,
            magFilter: ((c = r.renderTargetOptions) === null || c === void 0 ? void 0 : c.magFilter) !== void 0 ? (g = r.renderTargetOptions) === null || g === void 0 ? void 0 : g.magFilter : _t,
            minFilter: ((p = r.renderTargetOptions) === null || p === void 0 ? void 0 : p.minFilter) !== void 0 ? (v = r.renderTargetOptions) === null || v === void 0 ? void 0 : v.minFilter : _t,
            samples: ((h = r.renderTargetOptions) === null || h === void 0 ? void 0 : h.samples) !== void 0 ? (A = r.renderTargetOptions) === null || A === void 0 ? void 0 : A.samples : void 0,
            wrapS: ((B = r.renderTargetOptions) === null || B === void 0 ? void 0 : B.wrapS) !== void 0 ? (E = r.renderTargetOptions) === null || E === void 0 ? void 0 : E.wrapS : An,
            wrapT: ((M = r.renderTargetOptions) === null || M === void 0 ? void 0 : M.wrapT) !== void 0 ? (D = r.renderTargetOptions) === null || D === void 0 ? void 0 : D.wrapT : An
        };
        if (this._material = r.material,
        r.renderer ? this._renderer = r.renderer : (this._renderer = Oa.instantiateRenderer(),
        this._rendererIsDisposable = !0),
        this._scene = new hs,
        this._camera = new wa,
        this._camera.position.set(0, 0, 10),
        this._camera.left = -.5,
        this._camera.right = .5,
        this._camera.top = .5,
        this._camera.bottom = -.5,
        this._camera.updateProjectionMatrix(),
        !Qh(this._type, this._renderer, this._camera, T)) {
            let R;
            switch (this._type) {
            case Ht:
                R = this._renderer.extensions.has("EXT_color_buffer_float") ? on : void 0;
                break
            }
            R !== void 0 ? (console.warn(`This browser does not support reading pixels from ${this._type} RenderTargets, switching to ${on}`),
            this._type = R) : (this._supportsReadPixels = !1,
            console.warn("This browser dos not support toArray or toDataTexture, calls to those methods will result in an error thrown"))
        }
        this._quad = new Bs(new uc,this._material),
        this._quad.geometry.computeBoundingBox(),
        this._scene.add(this._quad),
        this._renderTarget = new Ta(this.width,this.height,T),
        this._renderTarget.texture.mapping = ((w = r.renderTargetOptions) === null || w === void 0 ? void 0 : w.mapping) !== void 0 ? (I = r.renderTargetOptions) === null || I === void 0 ? void 0 : I.mapping : gs
    }
    static instantiateRenderer() {
        const r = new $u;
        return r.setSize(128, 128),
        r
    }
    toArray() {
        if (!this._supportsReadPixels)
            throw new Error("Can't read pixels in this browser");
        const r = Kc(this._type, this._width, this._height);
        return this._renderer.readRenderTargetPixels(this._renderTarget, 0, 0, this._width, this._height, r),
        r
    }
    toDataTexture(r) {
        const s = new Fd(this.toArray(),this.width,this.height,Cr,this._type,r?.mapping || gs,r?.wrapS || An,r?.wrapT || An,r?.magFilter || _t,r?.minFilter || _t,r?.anisotropy || 1,Ba);
        return s.generateMipmaps = r?.generateMipmaps !== void 0 ? r?.generateMipmaps : !1,
        s
    }
    disposeOnDemandRenderer() {
        this._renderer.setRenderTarget(null),
        this._rendererIsDisposable && (this._renderer.dispose(),
        this._renderer.forceContextLoss())
    }
    dispose(r) {
        this.disposeOnDemandRenderer(),
        r && this.renderTarget.dispose(),
        this.material instanceof Fa && Object.values(this.material.uniforms).forEach(s => {
            s.value instanceof sn && s.value.dispose()
        }
        ),
        Object.values(this.material).forEach(s => {
            s instanceof sn && s.dispose()
        }
        ),
        this.material.dispose(),
        this._quad.geometry.dispose()
    }
    get width() {
        return this._width
    }
    set width(r) {
        this._width = r,
        this._renderTarget.setSize(this._width, this._height)
    }
    get height() {
        return this._height
    }
    set height(r) {
        this._height = r,
        this._renderTarget.setSize(this._width, this._height)
    }
    get renderer() {
        return this._renderer
    }
    get renderTarget() {
        return this._renderTarget
    }
    set renderTarget(r) {
        this._renderTarget = r,
        this._width = r.width,
        this._height = r.height
    }
    get material() {
        return this._material
    }
    get type() {
        return this._type
    }
    get colorSpace() {
        return this._colorSpace
    }
}
const zh = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
  , bh = `
// min half float value
#define HALF_FLOAT_MIN vec3( -65504, -65504, -65504 )
// max half float value
#define HALF_FLOAT_MAX vec3( 65504, 65504, 65504 )

uniform sampler2D sdr;
uniform sampler2D gainMap;
uniform vec3 gamma;
uniform vec3 offsetHdr;
uniform vec3 offsetSdr;
uniform vec3 gainMapMin;
uniform vec3 gainMapMax;
uniform float weightFactor;

varying vec2 vUv;

void main() {
  vec3 rgb = texture2D( sdr, vUv ).rgb;
  vec3 recovery = texture2D( gainMap, vUv ).rgb;
  vec3 logRecovery = pow( recovery, gamma );
  vec3 logBoost = gainMapMin * ( 1.0 - logRecovery ) + gainMapMax * logRecovery;
  vec3 hdrColor = (rgb + offsetSdr) * exp2( logBoost * weightFactor ) - offsetHdr;
  vec3 clampedHdrColor = max( HALF_FLOAT_MIN, min( HALF_FLOAT_MAX, hdrColor ));
  gl_FragColor = vec4( clampedHdrColor , 1.0 );
}
`;
class jh extends Fa {
    constructor({gamma: r, offsetHdr: s, offsetSdr: u, gainMapMin: l, gainMapMax: f, maxDisplayBoost: c, hdrCapacityMin: g, hdrCapacityMax: p, sdr: v, gainMap: h}) {
        super({
            name: "GainMapDecoderMaterial",
            vertexShader: zh,
            fragmentShader: bh,
            uniforms: {
                sdr: {
                    value: v
                },
                gainMap: {
                    value: h
                },
                gamma: {
                    value: new pt(1 / r[0],1 / r[1],1 / r[2])
                },
                offsetHdr: {
                    value: new pt().fromArray(s)
                },
                offsetSdr: {
                    value: new pt().fromArray(u)
                },
                gainMapMin: {
                    value: new pt().fromArray(l)
                },
                gainMapMax: {
                    value: new pt().fromArray(f)
                },
                weightFactor: {
                    value: (Math.log2(c) - g) / (p - g)
                }
            },
            blending: Ld,
            depthTest: !1,
            depthWrite: !1
        }),
        this._maxDisplayBoost = c,
        this._hdrCapacityMin = g,
        this._hdrCapacityMax = p,
        this.needsUpdate = !0,
        this.uniformsNeedUpdate = !0
    }
    get sdr() {
        return this.uniforms.sdr.value
    }
    set sdr(r) {
        this.uniforms.sdr.value = r
    }
    get gainMap() {
        return this.uniforms.gainMap.value
    }
    set gainMap(r) {
        this.uniforms.gainMap.value = r
    }
    get offsetHdr() {
        return this.uniforms.offsetHdr.value.toArray()
    }
    set offsetHdr(r) {
        this.uniforms.offsetHdr.value.fromArray(r)
    }
    get offsetSdr() {
        return this.uniforms.offsetSdr.value.toArray()
    }
    set offsetSdr(r) {
        this.uniforms.offsetSdr.value.fromArray(r)
    }
    get gainMapMin() {
        return this.uniforms.gainMapMin.value.toArray()
    }
    set gainMapMin(r) {
        this.uniforms.gainMapMin.value.fromArray(r)
    }
    get gainMapMax() {
        return this.uniforms.gainMapMax.value.toArray()
    }
    set gainMapMax(r) {
        this.uniforms.gainMapMax.value.fromArray(r)
    }
    get gamma() {
        const r = this.uniforms.gamma.value;
        return [1 / r.x, 1 / r.y, 1 / r.z]
    }
    set gamma(r) {
        const s = this.uniforms.gamma.value;
        s.x = 1 / r[0],
        s.y = 1 / r[1],
        s.z = 1 / r[2]
    }
    get hdrCapacityMin() {
        return this._hdrCapacityMin
    }
    set hdrCapacityMin(r) {
        this._hdrCapacityMin = r,
        this.calculateWeight()
    }
    get hdrCapacityMax() {
        return this._hdrCapacityMax
    }
    set hdrCapacityMax(r) {
        this._hdrCapacityMax = r,
        this.calculateWeight()
    }
    get maxDisplayBoost() {
        return this._maxDisplayBoost
    }
    set maxDisplayBoost(r) {
        this._maxDisplayBoost = Math.max(1, Math.min(65504, r)),
        this.calculateWeight()
    }
    calculateWeight() {
        const r = (Math.log2(this._maxDisplayBoost) - this._hdrCapacityMin) / (this._hdrCapacityMax - this._hdrCapacityMin);
        this.uniforms.weightFactor.value = Math.max(0, Math.min(1, r))
    }
}
class Qc extends Error {
}
class zc extends Error {
}
const Zr = (o, r, s) => {
    var u;
    let l;
    const f = (u = o.attributes.getNamedItem(r)) === null || u === void 0 ? void 0 : u.nodeValue;
    if (f)
        l = f;
    else {
        const c = o.getElementsByTagName(r)[0];
        if (c) {
            const g = c.getElementsByTagName("rdf:li");
            if (g.length === 3)
                l = Array.from(g).map(p => p.innerHTML);
            else
                throw new Error(`Gainmap metadata contains an array of items for ${r} but its length is not 3`)
        } else {
            if (s)
                return s;
            throw new Error(`Can't find ${r} in gainmap metadata`)
        }
    }
    return l
}
  , Xh = o => {
    var r, s;
    let u;
    typeof TextDecoder < "u" ? u = new TextDecoder().decode(o) : u = o.toString();
    let l = u.indexOf("<x:xmpmeta");
    const f = new DOMParser;
    for (; l !== -1; ) {
        const c = u.indexOf("x:xmpmeta>", l);
        u.slice(l, c + 10);
        const g = u.slice(l, c + 10);
        try {
            const v = f.parseFromString(g, "text/xml").getElementsByTagName("rdf:Description")[0]
              , h = Zr(v, "hdrgm:GainMapMin", "0")
              , A = Zr(v, "hdrgm:GainMapMax")
              , B = Zr(v, "hdrgm:Gamma", "1")
              , E = Zr(v, "hdrgm:OffsetSDR", "0.015625")
              , M = Zr(v, "hdrgm:OffsetHDR", "0.015625");
            let D = (r = v.attributes.getNamedItem("hdrgm:HDRCapacityMin")) === null || r === void 0 ? void 0 : r.nodeValue;
            D || (D = "0");
            const w = (s = v.attributes.getNamedItem("hdrgm:HDRCapacityMax")) === null || s === void 0 ? void 0 : s.nodeValue;
            if (!w)
                throw new Error("Incomplete gainmap metadata");
            return {
                gainMapMin: Array.isArray(h) ? h.map(I => parseFloat(I)) : [parseFloat(h), parseFloat(h), parseFloat(h)],
                gainMapMax: Array.isArray(A) ? A.map(I => parseFloat(I)) : [parseFloat(A), parseFloat(A), parseFloat(A)],
                gamma: Array.isArray(B) ? B.map(I => parseFloat(I)) : [parseFloat(B), parseFloat(B), parseFloat(B)],
                offsetSdr: Array.isArray(E) ? E.map(I => parseFloat(I)) : [parseFloat(E), parseFloat(E), parseFloat(E)],
                offsetHdr: Array.isArray(M) ? M.map(I => parseFloat(I)) : [parseFloat(M), parseFloat(M), parseFloat(M)],
                hdrCapacityMin: parseFloat(D),
                hdrCapacityMax: parseFloat(w)
            }
        } catch {}
        l = u.indexOf("<x:xmpmeta", c)
    }
}
;
class Wh {
    constructor(r) {
        this.options = {
            debug: r && r.debug !== void 0 ? r.debug : !1,
            extractFII: r && r.extractFII !== void 0 ? r.extractFII : !0,
            extractNonFII: r && r.extractNonFII !== void 0 ? r.extractNonFII : !0
        }
    }
    extract(r) {
        return new Promise( (s, u) => {
            const l = this.options.debug
              , f = new DataView(r.buffer);
            if (f.getUint16(0) !== 65496) {
                u(new Error("Not a valid jpeg"));
                return
            }
            const c = f.byteLength;
            let g = 2, p = 0, v;
            for (; g < c; ) {
                if (++p > 250) {
                    u(new Error(`Found no marker after ${p} loops 😵`));
                    return
                }
                if (f.getUint8(g) !== 255) {
                    u(new Error(`Not a valid marker at offset 0x${g.toString(16)}, found: 0x${f.getUint8(g).toString(16)}`));
                    return
                }
                if (v = f.getUint8(g + 1),
                l && console.log(`Marker: ${v.toString(16)}`),
                v === 226) {
                    l && console.log("Found APP2 marker (0xffe2)");
                    const h = g + 4;
                    if (f.getUint32(h) === 1297106432) {
                        const A = h + 4;
                        let B;
                        if (f.getUint16(A) === 18761)
                            B = !1;
                        else if (f.getUint16(A) === 19789)
                            B = !0;
                        else {
                            u(new Error("No valid endianness marker found in TIFF header"));
                            return
                        }
                        if (f.getUint16(A + 2, !B) !== 42) {
                            u(new Error("Not valid TIFF data! (no 0x002A marker)"));
                            return
                        }
                        const E = f.getUint32(A + 4, !B);
                        if (E < 8) {
                            u(new Error("Not valid TIFF data! (First offset less than 8)"));
                            return
                        }
                        const M = A + E
                          , D = f.getUint16(M, !B)
                          , w = M + 2;
                        let I = 0;
                        for (let b = w; b < w + 12 * D; b += 12)
                            f.getUint16(b, !B) === 45057 && (I = f.getUint32(b + 8, !B));
                        const R = M + 2 + D * 12 + 4
                          , U = [];
                        for (let b = R; b < R + I * 16; b += 16) {
                            const k = {
                                MPType: f.getUint32(b, !B),
                                size: f.getUint32(b + 4, !B),
                                dataOffset: f.getUint32(b + 8, !B),
                                dependantImages: f.getUint32(b + 12, !B),
                                start: -1,
                                end: -1,
                                isFII: !1
                            };
                            k.dataOffset ? (k.start = A + k.dataOffset,
                            k.isFII = !1) : (k.start = 0,
                            k.isFII = !0),
                            k.end = k.start + k.size,
                            U.push(k)
                        }
                        if (this.options.extractNonFII && U.length) {
                            const b = new Blob([f])
                              , k = [];
                            for (const Y of U) {
                                if (Y.isFII && !this.options.extractFII)
                                    continue;
                                const X = b.slice(Y.start, Y.end + 1, "image/jpeg");
                                k.push(X)
                            }
                            s(k)
                        }
                    }
                }
                g += 2 + f.getUint16(g + 2)
            }
        }
        )
    }
}
const Yh = async o => {
    const r = Xh(o);
    if (!r)
        throw new zc("Gain map XMP metadata not found");
    const u = await new Wh({
        extractFII: !0,
        extractNonFII: !0
    }).extract(o);
    if (u.length !== 2)
        throw new Qc("Gain map recovery image not found");
    return {
        sdr: new Uint8Array(await u[0].arrayBuffer()),
        gainMap: new Uint8Array(await u[1].arrayBuffer()),
        metadata: r
    }
}
  , Zu = o => new Promise( (r, s) => {
    const u = document.createElement("img");
    u.onload = () => {
        r(u)
    }
    ,
    u.onerror = l => {
        s(l)
    }
    ,
    u.src = URL.createObjectURL(o)
}
);
class bc extends _a {
    constructor(r, s) {
        super(s),
        r && (this._renderer = r),
        this._internalLoadingManager = new xd
    }
    setRenderer(r) {
        return this._renderer = r,
        this
    }
    setRenderTargetOptions(r) {
        return this._renderTargetOptions = r,
        this
    }
    prepareQuadRenderer() {
        this._renderer || console.warn("WARNING: An existing WebGL Renderer was not passed to this Loader constructor or in setRenderer, the result of this Loader will need to be converted to a Data Texture with toDataTexture() before you can use it in your renderer.");
        const r = new jh({
            gainMapMax: [1, 1, 1],
            gainMapMin: [0, 0, 0],
            gamma: [1, 1, 1],
            offsetHdr: [1, 1, 1],
            offsetSdr: [1, 1, 1],
            hdrCapacityMax: 1,
            hdrCapacityMin: 0,
            maxDisplayBoost: 1,
            gainMap: new sn,
            sdr: new sn
        });
        return new Oa({
            width: 16,
            height: 16,
            type: Ht,
            colorSpace: Ba,
            material: r,
            renderer: this._renderer,
            renderTargetOptions: this._renderTargetOptions
        })
    }
    async render(r, s, u, l) {
        const f = l ? new Blob([l],{
            type: "image/jpeg"
        }) : void 0
          , c = new Blob([u],{
            type: "image/jpeg"
        });
        let g, p, v = !1;
        if (typeof createImageBitmap > "u") {
            const B = await Promise.all([f ? Zu(f) : Promise.resolve(void 0), Zu(c)]);
            p = B[0],
            g = B[1],
            v = !0
        } else {
            const B = await Promise.all([f ? createImageBitmap(f, {
                imageOrientation: "flipY"
            }) : Promise.resolve(void 0), createImageBitmap(c, {
                imageOrientation: "flipY"
            })]);
            p = B[0],
            g = B[1]
        }
        const h = new sn(p || new ImageData(2,2),gs,An,An,_t,vu,Cr,As,1,Ba);
        h.flipY = v,
        h.needsUpdate = !0;
        const A = new sn(g,gs,An,An,_t,vu,Cr,As,1,Hd);
        A.flipY = v,
        A.needsUpdate = !0,
        r.width = g.width,
        r.height = g.height,
        r.material.gainMap = h,
        r.material.sdr = A,
        r.material.gainMapMin = s.gainMapMin,
        r.material.gainMapMax = s.gainMapMax,
        r.material.offsetHdr = s.offsetHdr,
        r.material.offsetSdr = s.offsetSdr,
        r.material.gamma = s.gamma,
        r.material.hdrCapacityMin = s.hdrCapacityMin,
        r.material.hdrCapacityMax = s.hdrCapacityMax,
        r.material.maxDisplayBoost = Math.pow(2, s.hdrCapacityMax),
        r.material.needsUpdate = !0,
        r.render()
    }
}
class Zh extends bc {
    load([r,s,u], l, f, c) {
        const g = this.prepareQuadRenderer();
        let p, v, h;
        const A = async () => {
            if (p && v && h) {
                try {
                    await this.render(g, h, p, v)
                } catch (z) {
                    this.manager.itemError(r),
                    this.manager.itemError(s),
                    this.manager.itemError(u),
                    typeof c == "function" && c(z),
                    g.disposeOnDemandRenderer();
                    return
                }
                typeof l == "function" && l(g),
                this.manager.itemEnd(r),
                this.manager.itemEnd(s),
                this.manager.itemEnd(u),
                g.disposeOnDemandRenderer()
            }
        }
        ;
        let B = !0
          , E = 0
          , M = 0
          , D = !0
          , w = 0
          , I = 0
          , T = !0
          , R = 0
          , U = 0;
        const b = () => {
            if (typeof f == "function") {
                const z = E + w + R
                  , oe = M + I + U
                  , J = B && D && T;
                f(new ProgressEvent("progress",{
                    lengthComputable: J,
                    loaded: oe,
                    total: z
                }))
            }
        }
        ;
        this.manager.itemStart(r),
        this.manager.itemStart(s),
        this.manager.itemStart(u);
        const k = new Dn(this._internalLoadingManager);
        k.setResponseType("arraybuffer"),
        k.setRequestHeader(this.requestHeader),
        k.setPath(this.path),
        k.setWithCredentials(this.withCredentials),
        k.load(r, async z => {
            if (typeof z == "string")
                throw new Error("Invalid sdr buffer");
            p = z,
            await A()
        }
        , z => {
            B = z.lengthComputable,
            M = z.loaded,
            E = z.total,
            b()
        }
        , z => {
            this.manager.itemError(r),
            typeof c == "function" && c(z)
        }
        );
        const Y = new Dn(this._internalLoadingManager);
        Y.setResponseType("arraybuffer"),
        Y.setRequestHeader(this.requestHeader),
        Y.setPath(this.path),
        Y.setWithCredentials(this.withCredentials),
        Y.load(s, async z => {
            if (typeof z == "string")
                throw new Error("Invalid gainmap buffer");
            v = z,
            await A()
        }
        , z => {
            D = z.lengthComputable,
            I = z.loaded,
            w = z.total,
            b()
        }
        , z => {
            this.manager.itemError(s),
            typeof c == "function" && c(z)
        }
        );
        const X = new Dn(this._internalLoadingManager);
        return X.setRequestHeader(this.requestHeader),
        X.setPath(this.path),
        X.setWithCredentials(this.withCredentials),
        X.load(u, async z => {
            if (typeof z != "string")
                throw new Error("Invalid metadata string");
            h = JSON.parse(z),
            await A()
        }
        , z => {
            T = z.lengthComputable,
            U = z.loaded,
            R = z.total,
            b()
        }
        , z => {
            this.manager.itemError(u),
            typeof c == "function" && c(z)
        }
        ),
        g
    }
}
class Vh extends bc {
    load(r, s, u, l) {
        const f = this.prepareQuadRenderer()
          , c = new Dn(this._internalLoadingManager);
        return c.setResponseType("arraybuffer"),
        c.setRequestHeader(this.requestHeader),
        c.setPath(this.path),
        c.setWithCredentials(this.withCredentials),
        this.manager.itemStart(r),
        c.load(r, async g => {
            if (typeof g == "string")
                throw new Error("Invalid buffer, received [string], was expecting [ArrayBuffer]");
            const p = new Uint8Array(g);
            let v, h, A;
            try {
                const B = await Yh(p);
                v = B.sdr,
                h = B.gainMap,
                A = B.metadata
            } catch (B) {
                if (B instanceof zc || B instanceof Qc)
                    console.warn(`Failure to reconstruct an HDR image from ${r}: Gain map metadata not found in the file, HDRJPGLoader will render the SDR jpeg`),
                    A = {
                        gainMapMin: [0, 0, 0],
                        gainMapMax: [1, 1, 1],
                        gamma: [1, 1, 1],
                        hdrCapacityMin: 0,
                        hdrCapacityMax: 1,
                        offsetHdr: [0, 0, 0],
                        offsetSdr: [0, 0, 0]
                    },
                    v = p;
                else
                    throw B
            }
            try {
                await this.render(f, A, v, h)
            } catch (B) {
                this.manager.itemError(r),
                typeof l == "function" && l(B),
                f.disposeOnDemandRenderer();
                return
            }
            typeof s == "function" && s(f),
            this.manager.itemEnd(r),
            f.disposeOnDemandRenderer()
        }
        , u, g => {
            this.manager.itemError(r),
            typeof l == "function" && l(g)
        }
        ),
        f
    }
}
const ma = {
    apartment: "lebombo_1k.hdr",
    city: "potsdamer_platz_1k.hdr",
    dawn: "kiara_1_dawn_1k.hdr",
    forest: "forest_slope_1k.hdr",
    lobby: "st_fagans_interior_1k.hdr",
    night: "dikhololo_night_1k.hdr",
    park: "rooitou_park_1k.hdr",
    studio: "studio_small_03_1k.hdr",
    sunset: "venice_sunset_1k.hdr",
    warehouse: "empty_warehouse_01_1k.hdr"
}
  , qh = "https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/"
  , fs = o => Array.isArray(o);
function jc({files: o=["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"], path: r="", preset: s=void 0, encoding: u=void 0, extensions: l}={}) {
    var f;
    let c = null, g = !1, p;
    if (s) {
        if (!(s in ma))
            throw new Error("Preset must be one of: " + Object.keys(ma).join(", "));
        o = ma[s],
        r = qh
    }
    const v = fs(o) && o.length === 6
      , h = fs(o) && o.length === 3 && o.some(w => w.endsWith("json"))
      , A = fs(o) ? o[0] : o;
    if (g = fs(o),
    p = v ? "cube" : h ? "webp" : A.startsWith("data:application/exr") ? "exr" : A.startsWith("data:application/hdr") ? "hdr" : A.startsWith("data:image/jpeg") ? "jpg" : (f = A.split(".").pop()) == null || (f = f.split("?")) == null || (f = f.shift()) == null ? void 0 : f.toLowerCase(),
    c = p === "cube" ? Nd : p === "hdr" ? Lh : p === "exr" ? Ph : p === "jpg" || p === "jpeg" ? Vh : p === "webp" ? Zh : null,
    !c)
        throw new Error("useEnvironment: Unrecognized file extension: " + o);
    const B = an(w => w.gl)
      , E = Mr(c, g ? [o] : o, w => {
        (p === "webp" || p === "jpg" || p === "jpeg") && w.setRenderer(B),
        w.setPath == null || w.setPath(r),
        l && l(w)
    }
    );
    let M = g ? E[0] : E;
    if (p === "jpg" || p === "jpeg" || p === "webp") {
        var D;
        M = (D = M.renderTarget) == null ? void 0 : D.texture
    }
    return M.mapping = v ? Pd : Od,
    "colorSpace"in M ? M.colorSpace = u ?? v ? "srgb" : "srgb-linear" : M.encoding = u ?? v ? Kh : Jh,
    M
}
const $h = o => o.current && o.current.isScene
  , eA = o => $h(o) ? o.current : o;
function Na(o, r, s, u, l={}) {
    var f, c, g, p, v;
    l = {
        backgroundBlurriness: (f = l.blur) !== null && f !== void 0 ? f : 0,
        backgroundIntensity: 1,
        backgroundRotation: [0, 0, 0],
        environmentIntensity: 1,
        environmentRotation: [0, 0, 0],
        ...l
    };
    const h = eA(r || s)
      , A = h.background
      , B = h.environment
      , E = {
        backgroundBlurriness: h.backgroundBlurriness,
        backgroundIntensity: h.backgroundIntensity,
        backgroundRotation: (c = (g = h.backgroundRotation) == null || g.clone == null ? void 0 : g.clone()) !== null && c !== void 0 ? c : [0, 0, 0],
        environmentIntensity: h.environmentIntensity,
        environmentRotation: (p = (v = h.environmentRotation) == null || v.clone == null ? void 0 : v.clone()) !== null && p !== void 0 ? p : [0, 0, 0]
    };
    return o !== "only" && (h.environment = u),
    o && (h.background = u),
    Fn(h, l),
    () => {
        o !== "only" && (h.environment = B),
        o && (h.background = A),
        Fn(h, E)
    }
}
function ka({scene: o, background: r=!1, map: s, ...u}) {
    const l = an(f => f.scene);
    return Q.useLayoutEffect( () => {
        if (s)
            return Na(r, o, l, s, u)
    }
    ),
    null
}
function Xc({background: o=!1, scene: r, blur: s, backgroundBlurriness: u, backgroundIntensity: l, backgroundRotation: f, environmentIntensity: c, environmentRotation: g, ...p}) {
    const v = jc(p)
      , h = an(A => A.scene);
    return Q.useLayoutEffect( () => Na(o, r, h, v, {
        blur: s,
        backgroundBlurriness: u,
        backgroundIntensity: l,
        backgroundRotation: f,
        environmentIntensity: c,
        environmentRotation: g
    })),
    null
}
function tA({children: o, near: r=1, far: s=1e3, resolution: u=256, frames: l=1, map: f, background: c=!1, blur: g, backgroundBlurriness: p, backgroundIntensity: v, backgroundRotation: h, environmentIntensity: A, environmentRotation: B, scene: E, files: M, path: D, preset: w=void 0, extensions: I}) {
    const T = an(X => X.gl)
      , R = an(X => X.scene)
      , U = Q.useRef(null)
      , [b] = Q.useState( () => new hs)
      , k = Q.useMemo( () => {
        const X = new kd(u);
        return X.texture.type = Ht,
        X
    }
    , [u]);
    Q.useLayoutEffect( () => (l === 1 && U.current.update(T, b),
    Na(c, E, R, k.texture, {
        blur: g,
        backgroundBlurriness: p,
        backgroundIntensity: v,
        backgroundRotation: h,
        environmentIntensity: A,
        environmentRotation: B
    })), [o, b, k.texture, E, R, c, l, T]);
    let Y = 1;
    return Ic( () => {
        (l === 1 / 0 || Y < l) && (U.current.update(T, b),
        Y++)
    }
    ),
    Q.createElement(Q.Fragment, null, yp(Q.createElement(Q.Fragment, null, o, Q.createElement("cubeCamera", {
        ref: U,
        args: [r, s, k]
    }), M || w ? Q.createElement(Xc, {
        background: !0,
        files: M,
        preset: w,
        path: D,
        extensions: I
    }) : f ? Q.createElement(ka, {
        background: !0,
        map: f,
        extensions: I
    }) : null), b))
}
function nA(o) {
    var r, s, u, l;
    const f = jc(o)
      , c = o.map || f;
    Q.useMemo( () => hc({
        GroundProjectedEnvImpl: nh
    }), []);
    const g = Q.useMemo( () => [c], [c])
      , p = (r = o.ground) == null ? void 0 : r.height
      , v = (s = o.ground) == null ? void 0 : s.radius
      , h = (u = (l = o.ground) == null ? void 0 : l.scale) !== null && u !== void 0 ? u : 1e3;
    return Q.createElement(Q.Fragment, null, Q.createElement(ka, Er({}, o, {
        map: c
    })), Q.createElement("groundProjectedEnvImpl", {
        args: g,
        scale: h,
        height: p,
        radius: v
    }))
}
function cA(o) {
    return o.ground ? Q.createElement(nA, o) : o.map ? Q.createElement(ka, o) : o.children ? Q.createElement(tA, o) : Q.createElement(Xc, o)
}
export {aA as C, cA as E, uA as P, Ic as a, lA as b, an as c, Pa as u};
