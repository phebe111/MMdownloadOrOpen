/**
 * mmwap - web page call for mm
 * @version v1.0.2
 * @link https://github.com/lilJay-lin/mmwap#readme
 * @license ISC
 */
!
function e(t, i, n) {
    function o(a, s) {
        if (!i[a]) {
            if (!t[a]) {
                var c = "function" == typeof require && require;
                if (!s && c) return c(a, !0);
                if (r) return r(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND",
                l
            }
            var p = i[a] = {
                exports: {}
            };
            t[a][0].call(p.exports,
            function(e) {
                var i = t[a][1][e];
                return o(i ? i: e)
            },
            p, p.exports, e, t, i, n)
        }
        return i[a].exports
    }
    for (var r = "function" == typeof require && require,
    a = 0; a < n.length; a++) o(n[a]);
    return o
} ({
    1 : [function(e, t, i) {
        var n = e("./js/main");
        n.init(window)
    },
    {
        "./js/main": 9
    }],
    2 : [function(e, t, i) {
        var n = e("./Event"),
        o = e("./Params"),
        r = e("./Util"),
        a = e("./Dialog"),
        s = e("./Config"),
        c = [].slice,
        l = {
            act: {
                b: "batchdownload",
                dl: "download",
                d: "detail"
            },
            ls: {},
            init: function() {
                var e = this;
                e.setVersionSupport("MM", [510, 501, 500]),
                e.setVersionSupport("MMLITE", [200, 200, 200]),
                e.setVersionSupport("MMOPEN", [100, 100, 100])
            },
            setVersionSupport: function(e, t) {
                var i = this,
                n = i.ls[e] || (i.ls[e] = {});
                n[i.act.b] = t[0],
                n[i.act.dl] = t[1],
                n[i.act.d] = t[2]
            },
            support: function(e) {
                var t = this,
                i = r.getCookie(o.version),
                n = r.getCookie(o.version_type),
                a = !1;
                if (e && r.s(i) && i.length > 0) {
                    i = parseInt(i, 10);
                    var s = t.ls[n][e];
                    s && i >= s && (a = !0)
                }
                return a
            },
            checkVersion: function(e) {
                var t = r.getCookie(o.version),
                i = !1;
                return r.s(t) && t.length > 0 && (t = parseInt(t, 10), t > e && (i = !0)),
                i
            }
        },
        p = {
            ua: navigator.userAgent.toLowerCase(),
            isChrome: function() {
                var e = this.ua;
                return ! e.match(/360 aphone /i) && "chrome" == e.match(/Chrome/i)
            },
            query: function(e) {
                var t = "";
                for (var i in e) t += encodeURIComponent(i) + "=" + encodeURIComponent(e[i]) + "&";
                return t
            },
            isWechat: function() {
                return "micromessenger" == this.ua.match(/MicroMessenger/i) ? 1 : 0
            },
            isIOS: function() {
                return /ios|ipad|iphone|ipod/i.test(this.ua)
            },
            isQq: function() {
                return this.ua.match(/MQQBrowser/i) ? 1 : 0
            },
            bs: function() {
                var e = "",
                t = this.ua,
                i = {
                    whatchar: t.match(/MicroMessenger/i) ? "微信": "",
                    uc: t.match(/(UCBrowser)|(UCWEB)/i) ? "UC浏览器": "",
                    qq: t.match(/MQQBrowser/i) ? "QQ浏览器": "",
                    op: t.match(/oupeng/i) ? "欧朋浏览器": "",
                    ay: t.match(/MxBrowser/i) ? "遨游浏览器": "",
                    lb: t.match(/LieBao/i) ? "猎豹浏览器": "",
                    xm: t.match(/MiuiBrowser/i) ? "小米浏览器": "",
                    bd: t.match(/baidubrowser/i) ? "百度浏览器": "",
                    b360: t.match(/360 aphone/i) ? "360浏览器": "",
                    sg: t.match(/sogoumobilebrowser/i) ? "搜狗浏览器": ""
                };
                for (var n in i) if ("" != i[n]) {
                    e = i[n];
                    break
                }
                return e
            },
            longFileNameAccept: function() {
                var e = !1,
                t = this.ua,
                i = {
                    qq: t.match(/MQQBrowser/i) ? "QQ浏览器": "",
                    ay: t.match(/MxBrowser/i) ? "遨游浏览器": "",
                    lb: t.match(/LieBao/i) ? "猎豹浏览器": "",
                    bd: t.match(/baidubrowser/i) ? "百度浏览器": ""
                };
                for (var n in i) if ("" != i[n]) {
                    e = !0;
                    break
                }
                return e
            },
            getCurrentBs: function() {
                var e = this.bs();
                return "" != e ? e: "浏览器"
            }
        },
        d = {
            reqUrl: {
                index: "mm://index",
                launch: "mm://launchbrowser?url=",
                appdetail: "mm://appdetail?requestid=app_info_forward&contentid=",
                downloadUri: "http://odp.mmarket.com/t.do?requestid=app_order&goodsid=999100008100930100001752138{contentid}&payMode=1&appsize={appsize}",
                mmrelaapp: "http://zjw.mmarket.com/mmapk/{channelid}/mmarket-999100008100930100001752138{contentid}-180.apk",
                batchmmrelaapp: "http://ota.mmarket.com:38080/rs/res1/mmclient/MM_online_channel_5210543603.apk",
                MM_CONTENT_ID: ""
            },
            reqMethod: {
                queryapp: "queryapp&appname=",
                querydownprogress: "querydownprogress&contentid=",
                download: "download&url=",
                jump: "jump&url=",
                batchdownload: "batchdownload&contentids="
            },
            run: function(e, t) {
                var i = this;
                t && i.isChrome() ? i.chrome(e) : i.iframe(e)
            },
            isChrome: function() {
                var e = navigator.userAgent.toLowerCase();
                return ! e.match(/360 aphone /i) && "chrome" == e.match(/Chrome/i)
            },
            downloadApp: function(e) {
                window.location.href = e
            },
            chrome: function(e) {
                var t = e.split("://"),
                i = t[0],
                e = t[1],
                n = "intent://" + e + "#Intent;scheme=" + i + ("mm" == i ? ";package=" + o.mmpkg: "") + ";end";
                window.location.href = n
            },
            iframe: function(e) {
                var t = document.createElement("iframe");
                t.style.display = "none",
                t.src = e,
                document.body.appendChild(t),
                setTimeout(function() {
                    document.body.removeChild(t)
                },
                2e3)
            },
            open: function(e, t) {
                var i = this,
                n = l,
                r = p,
                t = t || s.showtitle,
                a = i.reqUrl,
                c = i.reqMethod,
                d = a.launch + encodeURIComponent(e),
                m = o.getBaseUrl();
                n.support(n.act.d) ? (d = m + c.jump + encodeURIComponent(e) + (t ? "&appname=" + r.getCurrentBs() : ""), i.iframe(d)) : i.run(d, !0)
            },
            openDownload: function(e, t) {
                var i = this;
                var r=p;
                var t1 = t || s.showtitle;
                var m = o.getBaseUrl();
                var d = m + c.jump + encodeURIComponent(e) + (t1 ? "&appname=" + r.getCurrentBs() : "");
                i.iframe(d);
            },
            openCall: function(e, t) {
                var i = this,
                n = l,
                r = p,
                t = t || s.showtitle,
                a = i.reqUrl,
                c = i.reqMethod,
                d = a.launch + encodeURIComponent(e);
                i.run(d, !0)
            },
            openCall1: function(e, t) {
                var i = this,
                n = l,
                r = p,
                t = t || s.showtitle,
                a = i.reqUrl,
                c = i.reqMethod,
                d = a.launch + encodeURIComponent(e);
                i.iframe(d)
            },
            openCall2: function(e, t) {
                var i = this,
                n = l,
                r = p,
                t = t || s.showtitle,
                a = i.reqUrl,
                c = i.reqMethod,
                d = a.launch + encodeURIComponent(e);
                i.chrome(d)
            },
            batchDownload: function(e) {
                this.download(e, "", l.act.b)
            },
            download: function(e, t, i) {
                var n = this,
                r = l,
                i = i || r.act.dl,
                c = n.reqUrl,
                d = n.reqMethod,
                m = c.appdetail + encodeURIComponent(e),
                t = t || "";
                if (baseUrl = o.getBaseUrl(), r.support(i)) switch (i) {
                case r.act.dl:
                    m = baseUrl + d.download + encodeURIComponent(c.downloadUri.replace("{contentid}", e).replace("{appsize}", t)),
                    n.iframe(m);
                    break;
                case r.act.b:
                    m = baseUrl + d.batchdownload + e,
                    n.iframe(m)
                } else if (r.act.dl === i) n.run(m, !0);
                else if (r.act.b == i) {
                    var u = function() {
                        if (r.support(r.act.d)) {
                            var e = baseUrl + d.jump + encodeURIComponent(c.appdetail + c.MM_CONTENT_ID) + (s.showtitle ? "&appname=" + p.getCurrentBs() : "");
                            n.iframe(e)
                        } else {
                            var e = c.appdetail + encodeURIComponent(c.MM_CONTENT_ID);
                            n.run(e, !0)
                        }
                    };
                    a.one("dialog.after.show",
                    function() {
                        a.one("dialog.res.save", u)
                    }),
                    a.show({
                        type: "alert",
                        info: s.lowVersionAlert
                    })
                }
            },
            detail: function(e, t) {
                var i = this,
                n = l,
                r = p,
                a = i.reqUrl,
                t = t || s.showtitle,
                c = i.reqMethod,
                d = a.appdetail + encodeURIComponent(e),
                m = o.getBaseUrl();
                n.support(n.act.d) ? (d = m + c.jump + encodeURIComponent(a.appdetail + e) + (t ? "&appname=" + r.getCurrentBs() : ""), i.iframe(d)) : i.run(d, !0)
            },
            error: function() {
                var e = this,
                t = s.onIntent,
                i = e.reqUrl,
                o = p,
                r = o.ua.match(/(UCBrowser)|(UCWEB)/i),
                l = r || o.isQq() ? 1 : 0,
                d = r ? 2e3: 900,
                m = c.call(arguments),
                u = s.errorSilent,
                v = m[0];
                if (o.isWechat()) {
                    if (!u) {
                        var h = function() {
                            e.downloadApp(s.wetchartmm)
                        };
                        if (s.useGuide) {
                            a.one("dialog.after.show",
                            function() {
                                a.one("dialog.res.save", h)
                            });
                            var A = "detail" === m[0] || "open" === m[0] ? "detail": "download";
                            a.show({
                                type: "weixin",
                                flag: A
                            }),
                            n.trigger("server.over.error", v)
                        } else s.wxErrorCb ? n.trigger("server.over.error", v) : h()
                    }
                } else if (t) {
                    var g = Date.now(),
                    f = "open" != v && "detail" != v;
                    if ("open" === v) {
                        var w = m[1];
                        w && !l ? e.iframe(i.launch + encodeURIComponent(w)) : e.iframe(i.index)
                    } else if ("detail" === v) {
                        var b = m[1];
                        b && !l ? e.iframe(i.appdetail + b) : e.iframe(i.index)
                    } else e.iframe(i.index);
                    var M = function() {
                        m.unshift("downloadmm"),
                        m.unshift("server.check.start"),
                        n.trigger.apply(n, m)
                    };
                    setTimeout(function() {
                        var t = Date.now();
                        l ? M() : !g || t - g < d + 200 ? f ? M() : !u && e.downloadmm.apply(e, m) : f && M()
                    },
                    d)
                } else u ? n.trigger("server.over.error", v) : e.downloadmm.apply(e, m)
            },
            downloadmm: function(e) {
                var t = this,
                i = l,
                o = p,
                r = c.call(arguments, 1),
                d = r && r[0] || "",
                m = o.bs(),
                u = o.longFileNameAccept();
                if (n.trigger("server.over.error", e), s.downloadmm && e) {
                    var v = function() {
                        var t = "";
                        switch (e) {
                        case "download":
                            t = i.act.dl;
                            break;
                        case "batchDownload":
                            t = i.act.b;
                            break;
                        default:
                            t = i.act.d
                        }
                        return t
                    } (),
                    h = t.getMMUrl(v);
                    if ("" == m || !u && v == i.act.b || v == i.act.d ? t.downloadApp(h.replace("{contentid}", "")) : t.downloadApp(h.replace("{contentid}", d)), s.useGuide) {
                        var A = v == i.act.d || "open" == v ? "detail": "download",
                        g = c.call(arguments);
                        g.unshift("server.check.start");
                        var f = function() {
                            n.trigger.apply(n, g)
                        };
                        setTimeout(function() {
                            a.one("dialog.after.show",
                            function() {
                                a.one("dialog.res.save", f)
                            }),
                            a.show({
                                type: "guid",
                                flag: A
                            })
                        },
                        1e3)
                    }
                }
            },
            getMMUrl: function(e) {
                var t = this,
                i = t.reqUrl;
                return i.batchmmrelaapp.replace("{channelid}", s.channelid)
            },
            none: function() {}
        };
        l.init(),
        t.exports = {
            execute: function(e) {
                var t = d;
                return t[e] && t[e].apply(t, c.call(arguments, 1))
            },
            browserUtil: p
        }
    },
    {
        "./Config": 3,
        "./Dialog": 4,
        "./Event": 5,
        "./Params": 6,
        "./Util": 8
    }],
    3 : [function(e, t, i) {
        function n(e) {
            return {
                version_reg: new RegExp("^(" + e + ")[0-9]+(\\.[0-9]*|$)?(\\.[0-9]*|$)?", "i"),
                version_prefix: new RegExp("^(" + e + ")", "i")
            }
        }
        var o = "MMLite|MMOpen|MM",
        r = n(o),
        a = null;
        t.exports = {
            batchMaxApps: "15",
            maxAlert: "批量下载超过最大下载数15个,请重新选择",
            lowVersionAlert: "抱歉,您的MM版本过低无法支持该功能,请升级新版客户端",
            showtitle: !0,
            channelid: "5410093632",
            onIntent: !0,
            errorSilent: !1,
            useGuide: 1,
            wxErrorCb: !1,
            wetchartmm: "http://a.app.qq.com/o/simple.jsp?pkgname=com.aspire.mm",
            callOnlyVersion: function(e) {
                var t = this;
                t.onIntent = !1;
                var i = e.split("|");
                i.length;
                i.sort(function(e, t) {
                    return t.length - e.length
                }),
                e = i.length > 0 ? i.join("|") : i[0];
                var o = n(e);
                t.version_reg = o.version_reg,
                t.version_prefix = o.version_prefix
            },
            setVersionLimit: function(e) {
                if (!/^\d+$/g.test(e)) throw new Error("参数只能为数字");
                var t = this;
                t.onIntent = !1,
                a = e
            },
            versionCode: function() {
                return a
            },
            versionReg: function() {
                return r
            },
            downloadmm: 1
        }
    },
    {}],
    4 : [function(e, t, i) {
        var n = e("./Event"),
        o = e("./Util"),
        r = {
            cssloaded: 0,
            el: {},
            options: {
                type: "alert",
                info: "",
                base: "",
                flag: "download",
                css: "mmapp.css"
            },
            infos: {
                guid: {
                    detail: {
                        info: '安装并启动MM商城<span class="__mm-wap-hint-link" id="__mm-wap-success">请点这里</span>即可打开目标页面'
                    },
                    download: {
                        info: '安装并启动MM商场后将自动开始高速下载，如没开始高速下载，<span class="__mm-wap-hint-link" id="__mm-wap-success">请点这里</span>'
                    }
                },
                weixin: {
                    detail: {
                        tit: "操作指引",
                        tip: "请按以下步骤操作",
                        second: "回到微信再次点击"
                    },
                    download: {
                        tit: "高速下载指引",
                        tip: "请按以下步骤操作完成高速下载：",
                        second: "回到微信再次点击“高速下载”。"
                    }
                }
            },
            movePrevent: function(e) {
                this.preventDefault(e),
                this.stopPropagation(e)
            },
            set: function(e) {
                var t = this;
                for (var i in t.options)"undefined" != typeof e[i] && (t.options[i] = e[i])
            },
            view: function() {
                var e = this,
                t = "",
                i = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTVEODgwMTBBNjQwMTFFNkJBQTU5MDgzMDI5RUQ1RUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTVEODgwMTFBNjQwMTFFNkJBQTU5MDgzMDI5RUQ1RUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNUQ4ODAwRUE2NDAxMUU2QkFBNTkwODMwMjlFRDVFQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNUQ4ODAwRkE2NDAxMUU2QkFBNTkwODMwMjlFRDVFQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn2r2asAAAWPSURBVHja3Jp5bBVVFMZvh0exbFIEKQQUbSmNItEKCpUiYPCPBlEguETQuCRGiIIQxQVjAAkUMCFFjSwJqGGRQOOuGEEDGhRQC1oBW9sYkS1taEARpRa+E74LJ8PrdN5789p5fskvc2fem7lz5m7nnJm0uro6E5B6g0HgRpANeoLLQAZIA38DqewPUAXKwDdgbxCVRxI8vwe4B9wJbvV5zg2u/R3gQ7AWVMZ7I2lxtkgueAJMBJe6fpMnvB9UgKPgJDjDlukCrgZ9wfWu8+ppzGLwfbINuQTMAdOAo45/DD4Am2mAH/UCw8AdbNF09dvb4Dl2w8ANuR28BnK4L31+KVgWQD+X8fQQmAy68Zjc2BTwVpCGPA/mqv03wHzwmwlWmeBpMEO1+KvsxgkbsgI8wvIB8CjYZJKrAWC5GkfSZYvAv42d4DRxwXXKiM954WQbIdrF2W0V928DX7vGkW9DlnNqtYNvJKg1zSsZN/NUK22K1ZBn2IVEa8ADpuUk47OY5WGcXHyNkZu54oq+AoUmHJJeMYFl2a72MkRaqBpcAY7R7ThuwqNycA0HfRbvMWrXepFGiO4NmRGicdymcw2LOka6ghdY3gA+M+HTPnoWovHazdGGTAetQQOYasKr2fThjDLqvCHtweMsr4zFx2kB1dOrEI2yLpM1ZCzoyPLCBCtqFdB/vLSUvp6xC7Y1xC5839IFj0U59F7FF/sS1NBzbUyz+J8t4GV6v9kx1imhQSnLd9nASuKJ4TxY2sQFrgT9QT4YDG6io6d1QvXhaDrCsThc1WvoNUiQtZ3xyB7wu8d11oP7QR7oJ+vICDplooH0cwwrG8rwVW74FoauWqe4eG7neVL5rwykvOSwJfszNC7gQtzG9b8aLso72Fu2gdP8rTM4yHMmiyEzOHiOMC6oV25Kseumv+NNy0V/5nTYENAgbsWney0fXAFbXhv3JFii9nfSB1sWYSvYObpe/ekLUAJ284RfwD9JnI3+48pdzm5jI9JcGtaPLaK1m4bkRNgKJkqQtJO0pE6xu+5p5PcqbrOkr3bizmGTerJhRabD7Ibxir5CrJPcZjjmfyJHrZDpKXj/7WxGx2HaRdQ9BQ3pzO0xR62evVPQEJtjO+Rw1RT15WqeSrLxSIWj1orLzcUJ5jCrC70AUZlDt+MvHhiRQoYMVRPU1gi9VXEaRzMmnp9gBRl0BIWrQFs6erV0P+TBVQZgyN0qIbHXvh95h4YMYHOVx3HhfEaZE+gjeekn8CZTOofiqKuDjUNs6GHTQW3pEktsssqcy/D5lYytBeBB7v8JNtJLruJ+hMkNeUhFDA2spAfMizFjoz1zed9SrfNaEsjPVFOx30z7eHqrVayg1Ec8IteXl0Qv0X2Xt11bfdaXzocusdG7YIw7QZfJZhb//z3VdE2pI6PFLSroiaU18xky+A0RivnADF37crchIv0eROLw90M2U8mN/8jyanMhhRo191vJZMBx9r/aEBlSwdVc/MMsPa6cRvq87TKfhsiI9colmeieHKIZ8gN4imWZjjeEwIjF6gGXcFY0TRliTyxheZyKoVvKiCksf6LKvgwxPGGl6m7y6qtHMxoga88adeOSFhrlFVh56WHVMgXsdmOawYhCzk73cf8jrjUN8RpiW2aamvdLufrnJsEAmYle4eKYx2OL2BKe+bNYPhgYAl4H13FfcmDyPk9empYlaEAfc+6d5WPmwichh/kQfY3PeL5FkST0s64YfzObX7b7fGZk+jBsKKLDqiUfJMjbsxq/NxXvRzXink+io9jV9Vs1jRHf66hK2bRhMJRNI/KipHZktV6iVm+TbEOsxIixnKILfbjv0bSNzt9Gk8AnIWkBfniWxQV0IJ+2+8MzSX/KW9gDdDUkwNrFFkxYZwUYAFG8X10/VXN/AAAAAElFTkSuQmCC";
                if ("guid" === e.options.type) {
                    var n = e.infos.guid[e.options.flag];
                    t = '<div class="__mm-wap-hint"><div class="__mm-wap-hint-msg">' + n.info + '</div><div class="__mm-wap-hint-close" id="__mm-wap-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjIwMUY5NTEyQUJCMTFFNTg0MTQ5NzUyMzMyNDY2QjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjIwMUY5NTIyQUJCMTFFNTg0MTQ5NzUyMzMyNDY2QjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMjAxRjk0RjJBQkIxMUU1ODQxNDk3NTIzMzI0NjZCMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyMjAxRjk1MDJBQkIxMUU1ODQxNDk3NTIzMzI0NjZCMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpWGpx8AAAEwSURBVHjavJU9DoJAEEZh9Aja0FtZWHACDdaWFl7AwrvY6Q0sNF7AmHgDEwtbDyDUVib6bcImhPAz+zNs8goC4b0lMIRxHAdYa3AGadDhIrABe3ADww6cA3ABYyU/gqc66CBAia9gDrZK/gazDgK0eAIeYEX5CRUwFQwoi9XOUypckAoFVIr1CxcIBtSKq+Q+AxrFdXIfAa3iJrlLAEvcJrcJYIs5cpMAIzFXzgkoixPOf4IMXqK6gCpxxrlh3/Dz0QG3QsDXRmwjrwoIbMSmj724fvmOi5sIbf7nrpPLehKSozhxmYTkKM5cRjE5ip1GMXkQWweQJ7FVAHkUGweQZ7FRAAmI2QEkJGYFkKC4NYCExY0BWn4QFNcFLHtRFKkTdzACCyGxXh9wAi+w+wswAP5lpcbsuZqsAAAAAElFTkSuQmCC" /></div></div>'
                } else if ("weixin" === e.options.type) {
                    var n = e.infos.weixin[e.options.flag];
                    t = '<div class="__mm-wap-dialog-mask"></div><div class="__mm-wap-dialog" id="__mm-wap-dialog"><div class="__mm-wap-dialog-close " id="__mm-wap-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjIwMUY5NTEyQUJCMTFFNTg0MTQ5NzUyMzMyNDY2QjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjIwMUY5NTIyQUJCMTFFNTg0MTQ5NzUyMzMyNDY2QjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMjAxRjk0RjJBQkIxMUU1ODQxNDk3NTIzMzI0NjZCMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyMjAxRjk1MDJBQkIxMUU1ODQxNDk3NTIzMzI0NjZCMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpWGpx8AAAEwSURBVHjavJU9DoJAEEZh9Aja0FtZWHACDdaWFl7AwrvY6Q0sNF7AmHgDEwtbDyDUVib6bcImhPAz+zNs8goC4b0lMIRxHAdYa3AGadDhIrABe3ADww6cA3ABYyU/gqc66CBAia9gDrZK/gazDgK0eAIeYEX5CRUwFQwoi9XOUypckAoFVIr1CxcIBtSKq+Q+AxrFdXIfAa3iJrlLAEvcJrcJYIs5cpMAIzFXzgkoixPOf4IMXqK6gCpxxrlh3/Dz0QG3QsDXRmwjrwoIbMSmj724fvmOi5sIbf7nrpPLehKSozhxmYTkKM5cRjE5ip1GMXkQWweQJ7FVAHkUGweQZ7FRAAmI2QEkJGYFkKC4NYCExY0BWn4QFNcFLHtRFKkTdzACCyGxXh9wAi+w+wswAP5lpcbsuZqsAAAAAElFTkSuQmCC" /></div><div class="__mm-wap-hd">' + n.tit + '</div><div class="__mm-wap-bd"><p class="__mm-wap-guid-tit">' + n.tip + '</p><div class="__mm-wap-guid-step"><p>第<span class="__mm-wap-guid-step-num">1</span>步 </p><p>下载安装MM商场后<span class="__mm-wap-guid-step-hint">启动一次</span>或<span class="__mm-wap-guid-step-hint">打开一次</span></p></div><div class="__mm-wap-guid-step"><p>第<span class="__mm-wap-guid-step-num">2</span>步</p><p>' + n.second + '</p></div></div><div class="__mm-wap-ft"><div class="__mm-wap-btn  " id="__mm-wap-success">前往下载MM商场</div></div></div>'
                } else t = "ios-weixin" === e.options.type ? '<div class=__mm-wap-dialog-mask><div id="__mm-wap-dialog" class="__mm-wap-no-support-toast"><div id="toast-guide" class=__mm-wap-iso-no-support-guid><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAA1CAYAAAAztqkoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REYwNjY3MUVBNjQwMTFFNjk4QTFDQjExMzhENzdGMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REYwNjY3MUZBNjQwMTFFNjk4QTFDQjExMzhENzdGMjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERjA2NjcxQ0E2NDAxMUU2OThBMUNCMTEzOEQ3N0YyNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpERjA2NjcxREE2NDAxMUU2OThBMUNCMTEzOEQ3N0YyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhZTwDQAAANNSURBVHjazJl7aE9hGMffaYQJmSXCVmt/uDdC/fhDjWQuNaNFI6VWJHIpRcytKLeixB+EJPd/2Ihcov1GUcgltskolOQ3fyzm+n3se9rTcX7T77dzeZ/6dJ5z3nNO3/O85z3v8z4nI5FImIisC7gBYmAy/X+sk4nOtoIJIAOsT3ZSRkQRnARuuo6NAE9sieAej2MltnRxJSj0OD7Lhi4eB+610z4R1EQZwd3cfgffPNrnRNnFaxghsSvgOf1r4Bb9maBbFAKHg5306xjJQdy/Ds7SzwdFUQjcpfxl4API5v5TJVCsLGyBS8FU+lXgqtoXawYfQZz7M0DfsATmuwbGatXlYl9BI/0z3PamyFAE7gBd1SB5QX8ot/WggX41BYvNDkPgIvXZuA320c8Bo+g3qvPrOGCcbs4NUuAA1bViK5SfB3rQv+u6zulmSSBKgxS4HfShvw48VG0x5buTgyoOGBOkwJFgIf0HFOv+Jjqj97Gr7RPfRedBCoMQ+JLvUhOo8GiPqQHyyqP9nPLLMwMQKCNxGnvHPd/mqRFcm+T6y+A1z40F9Q4mSwamKD+e5NqfYDNoAccyTbg2Xj1AbTvnHSWhZjOd1RT3jN+9/1qYAkeDgWrWMLYJLFZ+jY0Cp3P7nkmqVQJlSTlGzRYttgnUS8rqVC4MS2Apt+/AJdsEFnF+FjvPb6BVAhco/1SqFwctcDCYq6a2uG0CF4Pu9I+kc4MgSx89mXr1Y3ZSAH7YFMEKihM7kI64ICPYi6WN/kzhC5jAGlsiuJziDFdzTeneKIgI5nKtIe/gGzCE6w9jSwQ3UpyzumvuyM38jmCpWvTcB2M7ekM/Iyg1lb1qf5UfN/VT4GHTVvPbAu7YJHCDKvjIYmiTX0/th8B5jJjYFyYHv20RKOuMk7oSYNrKaZELLGH67tgScNHvb1a6AleCC2pfipMHg5iSUq0sSLX0hErhnWltf1AZRyoC53NezVY1lDKm8SYqgfJPV8q4a9W6QuwRo9hgArZM9S5K2TWL5YlhpvUnswyEHNc1leqzYsIQKIml/B5NMGLZHoPnFzjOROBtiNWIvwKLGbksj3ZJOk+DQ6b171DoJgK3MWJSHvvMxbWUx+TXQb2J2P4IMADlBqwIsIY18QAAAABJRU5ErkJggg=="><p>点击分享</p></div><div class=__mm-wap-iso-no-support><img src="' + i + '"><p class=title>Sorry!</p><p class=text>我们只支持安卓设备</p><p class=text>但不影响你把好东西分享给</p><p class=text>使用安卓手机的朋友</p></div></div></div>': "ios" === e.options.type ? '<div class=__mm-wap-dialog-mask><div id="__mm-wap-dialog" class=__mm-wap-iso-no-support><img src="' + i + '"><p class=title>Sorry!</p><p class=text>我们只支持安卓设备</p></div></div>': '<div class="__mm-wap-dialog-mask"></div><div class="__mm-wap-dialog" id="__mm-wap-dialog"><div class="__mm-wap-dialog-close " id="__mm-wap-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjIwMUY5NTEyQUJCMTFFNTg0MTQ5NzUyMzMyNDY2QjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjIwMUY5NTIyQUJCMTFFNTg0MTQ5NzUyMzMyNDY2QjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMjAxRjk0RjJBQkIxMUU1ODQxNDk3NTIzMzI0NjZCMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyMjAxRjk1MDJBQkIxMUU1ODQxNDk3NTIzMzI0NjZCMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpWGpx8AAAEwSURBVHjavJU9DoJAEEZh9Aja0FtZWHACDdaWFl7AwrvY6Q0sNF7AmHgDEwtbDyDUVib6bcImhPAz+zNs8goC4b0lMIRxHAdYa3AGadDhIrABe3ADww6cA3ABYyU/gqc66CBAia9gDrZK/gazDgK0eAIeYEX5CRUwFQwoi9XOUypckAoFVIr1CxcIBtSKq+Q+AxrFdXIfAa3iJrlLAEvcJrcJYIs5cpMAIzFXzgkoixPOf4IMXqK6gCpxxrlh3/Dz0QG3QsDXRmwjrwoIbMSmj724fvmOi5sIbf7nrpPLehKSozhxmYTkKM5cRjE5ip1GMXkQWweQJ7FVAHkUGweQZ7FRAAmI2QEkJGYFkKC4NYCExY0BWn4QFNcFLHtRFKkTdzACCyGxXh9wAi+w+wswAP5lpcbsuZqsAAAAAElFTkSuQmCC" /></div><div class="__mm-wap-bd"><div class="__mm-wap-bd-info"><p>' + e.options.info + '</p></div></div><div class="__mm-wap-ft"><div class="__mm-wap-btn  " id="__mm-wap-success">确定</div></div></div>';
                return t
            },
            onload: function(e, t) {
                var i = this;
                e.attachEvent ? e.attachEvent("onload", t) : setTimeout(function() {
                    i.poll(e, t)
                },
                0)
            },
            poll: function(e, t) {
                var i = this;
                if (!t.isCalled) {
                    if (/webkit/i.test(navigator.userAgent)) e.sheet && (i.cssloaded = !0);
                    else if (e.sheet) try {
                        e.sheet.cssRules && (i.cssloaded = !0)
                    } catch(n) {
                        1e3 === n.code && (i.cssloaded = !0)
                    }
                    i.cssloaded ? setTimeout(function() {
                        t(),
                        t.isCalled = !0
                    },
                    1) : setTimeout(function() {
                        i.poll(e, t)
                    },
                    1)
                }
            },
            loadcss: function(e, t) {
                var i = this,
                n = document.createElement("link");
                n.setAttribute("rel", "stylesheet"),
                n.setAttribute("type", "text/css"),
                n.setAttribute("href", e),
                document.body.appendChild(n),
                i.onload(n, t)
            },
            show: function(e) {
                var t = this;
                t.destroy(),
                t.set(e),
                t.loaded(t.create.bind(t))
            },
            create: function() {
                var e = this,
                t = e.view(),
                i = document.createElement("div");
                i.setAttribute("id", "__mm-wap-toast"),
                i.style.display = "none",
                i.innerHTML = t,
                e.trigger("dialog.before.show"),
                document.body.appendChild(i),
                e.el["__mm-wap-toast"] = [i],
                e.refresh(),
                e.addHandle(),
                e.trigger("dialog.after.show")
            },
            refresh: function() {
                var e = this,
                t = e.query("__mm-wap-toast");
                if (null != t) {
                    t.style.display = "none";
                    var i = document.body.scrollTop || document.documentElement.scrollTop;
                    "guid" != e.options.type && (t.style.height = Math.max(document.body.scrollHeight, document.body.clientHeight) - 1 + "px", t.setAttribute("class", "__mm-wap-toast-cover"));
                    var n = (document.body.offsetHeight || document.documentElement.offsetHeight, e.query("__mm-wap-dialog")),
                    o = e.query("toast-guide"),
                    r = n ? (window.innerHeight - n.offsetHeight) / 2 : 0;
                    n && (n.style.top = parseInt(i + r, 10) + "px", 1),
                    o && (o.style.top = -(r - 10) + "px")
                }
            },
            addHandle: function() {
                var e = this,
                t = e.query("__mm-wap-toast"),
                i = [t];
                "ios-weixin" !== e.options.type && "ios" !== e.options.type || e.addEvent(t, "click",
                function(t) {
                    return e.trigger("dialog.res.cancle"),
                    e.destroy(),
                    !1
                }),
                i.push("touchmove"),
                i.push(e.movePrevent.bind(e)),
                e.addEvent.apply(e, i),
                e.resize = function(t) {
                    e.refresh()
                },
                e.addEvent(window, "resize", e.resize),
                e.addEvent(window, "scroll", e.resize);
                var n = [e.query("__mm-wap-success")],
                o = [e.query("__mm-wap-close")];
                null != n && n.length > 0 && (n.push("click"), n.push(function(t) {
                    return e.preventDefault(t),
                    e.stopPropagation(t),
                    e.trigger("dialog.res.save"),
                    e.destroy(),
                    !1
                }), e.addEvent.apply(e, n)),
                null != o && o.length > 0 && (o.push("click"), o.push(function(t) {
                    return e.preventDefault(t),
                    e.stopPropagation(t),
                    this.className += " active",
                    e.trigger("dialog.res.cancle"),
                    e.destroy(),
                    !1
                }), e.addEvent.apply(e, o))
            },
            loaded: function(e) {
                var t = this,
                i = t.options;
                if (t.cssloaded) o.f(e) && e();
                else {
                    var n = i.base + i.css;
                    t.loadcss(n, e)
                }
            },
            query: function(e) {
                return document.querySelector ? document.querySelector("#" + e) : document.getElementById(e)
            },
            destroy: function() {
                var e = this;
                for (var t in e.el) {
                    var i = e.el[t];
                    if (i) {
                        if (i[0]) continue;
                        "__mm-wap-toast" === t && (i[0].style.display = "none"),
                        e.removeEvent.apply(e, i)
                    }
                }
                if (e.removeEvent(window, "resize", e.resize), e.removeEvent(window, "scroll", e.resize), "undefined" != typeof e.el["__mm-wap-toast"]) {
                    var n = e.el["__mm-wap-toast"][0];
                    n && n.parentNode && n.parentNode.removeChild(n)
                }
                e.el = {},
                e.off("dialog.res")
            },
            init: function(e) {
                this.options.base = e
            },
            addEvent: function(e, t, i) {
                e && (e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent ? e.attachEvent("on" + t, i) : e["on" + t] = i)
            },
            removeEvent: function(e, t, i) {
                e.addEventListener ? e.removeEventListener(t, i, !1) : e.attachEvent ? e.detachEvent("on" + t, i) : e["on" + t] = null
            },
            getEvent: function(e) {
                return e ? e: window.event
            },
            getTarget: function(e) {
                return e.target || e.srcElement
            },
            stopPropagation: function(e) {
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            },
            preventDefault: function(e) {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1
            },
            on: function() {
                n.on.apply(n, arguments)
            },
            off: function() {
                n.off.apply(n, arguments)
            },
            trigger: function() {
                n.trigger.apply(n, arguments)
            },
            one: function() {
                n.one.apply(n, arguments)
            }
        };
        t.exports = r
    },
    {
        "./Event": 5,
        "./Util": 8
    }],
    5 : [function(e, t, i) {
        function n(e, t, i) { (e || "").split(l).forEach(function(e) {
                i(e, t)
            })
        }
        function o(e) {
            return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
        }
        function r(e) {
            var t = ("" + e).split(".");
            return {
                e: t[0],
                ns: t.slice(1).sort().join(" ")
            }
        }
        function a(e, t, i, n) {
            var a, s;
            return s = r(t),
            s.ns && (a = o(s.ns)),
            e.filter(function(e) {
                return e && (!s.e || e.e === s.e) && (!s.ns || a.test(e.ns)) && (!i || e.cb === i || e.cb._cb === i) && (!n || e.ctx === n)
            })
        }
        function s(e, t) {
            return this instanceof s ? (t && $.extend(this, t), this.type = e, this) : new s(e, t)
        }
        var c = [].slice,
        l = /\s+/,
        p = function() {
            return ! 1
        },
        d = function() {
            return ! 0
        };
        s.prototype = {
            isDefaultPrevented: p,
            isPropagationStopped: p,
            preventDefault: function() {
                this.isDefaultPrevented = d
            },
            stopPropagation: function() {
                this.isPropagationStopped = d
            }
        },
        t.exports = {
            on: function(e, t, i) {
                var o, a = this;
                return t ? (o = this._events || (this._events = []), n(e, t,
                function(e, t) {
                    var n = r(e);
                    n.cb = t,
                    n.ctx = i,
                    n.ctx2 = i || a,
                    n.id = o.length,
                    o.push(n)
                }), this) : this
            },
            one: function(e, t, i) {
                var o = this;
                return t ? (n(e, t,
                function(e, t) {
                    var n = function() {
                        return o.off(e, n),
                        t.apply(i || o, arguments)
                    };
                    n._cb = t,
                    o.on(e, n, i)
                }), this) : this
            },
            off: function(e, t, i) {
                var o = this._events;
                return o ? e || t || i ? (n(e, t,
                function(e, t) {
                    a(o, e, t, i).forEach(function(e) {
                        delete o[e.id]
                    })
                }), this) : (this._events = [], this) : this
            },
            trigger: function(e) {
                var t, i, n, o, r, l = -1;
                if (!this._events || !e) return this;
                if ("string" == typeof e && (e = new s(e)), t = c.call(arguments, 1), e.args = t, t.unshift(e), i = a(this._events, e.type)) for (o = i.length; ++l < o;) if ((n = e.isPropagationStopped()) || !1 === (r = i[l]).cb.apply(r.ctx2, t)) {
                    n || (e.stopPropagation(), e.preventDefault());
                    break
                }
                return this
            }
        }
    },
    {}],
    6 : [function(e, t, i) {
        var n = e("./Util"),
        o = "http://{adress}:{port}/moversion",
        r = "http://{adress}:{port}/action=",
        a = "localwap.mmarket.com",
        s = "127.0.0.1";
        navigator.userAgent.toLowerCase().match(/MicroMessenger|MQQBrowser/i) ? (o = o.replace("{adress}", a), r = r.replace("{adress}", a)) : (o = o.replace("{adress}", s), r = r.replace("{adress}", s)),
        t.exports = {
            versionUrl: o,
            baseUrl: r,
            DAEMON: "mmcd",
            mmpkg: "com.aspire.mm",
            version: "mmversion",
            version_type: "mmversiontype",
            port: "mmport",
            getBaseUrl: function() {
                var e = this,
                t = n.getCookie(e.port);
                return r.replace("{port}", t)
            }
        }
    },
    {
        "./Util": 8
    }],
    7 : [function(e, t, i) {
        function n(e) {
            a(),
            N = y.call(e.args, 1),
            A || (d.trigger("server.before.check"), o(r))
        }
        function o(e) {
            f.forEach(function(t) {
                var i = document.createElement("script");
                i.type = "text/javascript",
                i.setAttribute("port", t),
                i.setAttribute("class", "__js_load_mm"),
                i.onload = i.onerror = e,
                i.src = w.replace("{port}", t) + "?" + Date.now(),
                document.getElementsByTagName("head")[0].appendChild(i)
            })
        }
        function r(e) {
            if ("" === g) if ("load" == e.type) {
                var t = e.target;
                g = t.getAttribute("port"),
                d.trigger("server.after.check", "success", g)
            } else b++,
            b == f.length && d.trigger("server.after.check", "error")
        }
        function a() {
            "undefined" != typeof window.a && "undefined" == typeof window.a.appname && (G = window.a)
        }
        function s() {
            p(),
            A = !0,
            g = "",
            b = 0,
            u.setCookie(m.port, null),
            u.setCookie(m.version, null),
            u.setCookie(m.version_type, null)
        }
        function c(e) {
            var t = e.args.slice(1),
            i = function() {
                N.unshift("server.check.error"),
                d.trigger.apply(d, N)
            };
            if (p(), A = !1, g = "", b = 0, "success" === t[0] && (u.setCookie(m.port, t[1]), "undefined" != typeof window.a && "undefined" != typeof window.a.appname)) {
                var n = l(window.a);
                if (null === G ? delete window.a: window.a = G, n) return N.unshift("server.check.success"),
                void d.trigger.apply(d, N)
            }
            i()
        }
        function l(e) {
            var t = e.appname,
            i = 0;
            if (t && t.length > 0) {
                var n = t.match(M);
                if (n) {
                    var o = n[1] || "MM";
                    if (u.setCookie(m.version_type, o.toUpperCase()), n = n[0].replace(I, ""), n.length > 0) {
                        var r = n.replace(/\./g, ""),
                        a = v.versionCode(); (!a || a && parseInt(r, 10) >= parseInt(a, 10)) && (u.setCookie(m.version, r || 0), i = 1)
                    }
                }
            }
            return i
        }
        function p() {
            var e = document.getElementsByClassName("__js_load_mm");
            if (e.length) {
                var t = y.call(e);
                t.forEach(function(e) {
                    e.onload = e.onerror = null,
                    e.remove && (e.remove(), 1) || e.parentNode && (e.parentNode.removeChild(e), 1)
                })
            }
        }
        var d = e("./Event"),
        m = e("./Params"),
        u = e("./Util"),
        v = e("./Config"),
        h = v.versionReg(),
        A = !1,
        g = "",
        f = [9817, 19817, 29817, 39817, 49817, 59817],
        w = m.versionUrl,
        b = 0,
        M = h.version_reg,
        I = h.version_prefix,
        y = [].slice,
        N = [],
        G = null,
        k = function() {
            d.on("server.before.check", s.bind(this)),
            d.on("server.after.check", c.bind(this)),
            d.on("server.check.start", n.bind(this))
        };
        t.exports = {
            init: k
        }
    },
    {
        "./Config": 3,
        "./Event": 5,
        "./Params": 6,
        "./Util": 8
    }],
    8 : [function(e, t, i) {
        var n = {
            e: Object.prototype.toString,
            f: function(e) {
                return "[object Function]" == this.e.call(e)
            },
            o: function(e) {
                return "[object Object]" == this.e.call(e)
            },
            a: function(e) {
                return "[object Array]" == this.e.call(e)
            },
            s: function(e) {
                return "string" == typeof e
            },
            each: function(e, t) {
                var i = this;
                if (i.f(t)) if (i.o(e)) for (var n in e) t(n, e[n]);
                else if (e && e.length > 0) for (var o = 0; o < e.length; o++) t(e[o], o)
            },
            CHATSET: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
            encode: function(e) {
                var t = this,
                i = "";
                if (!isNaN(e)) for (var n = parseInt(e, 10), o = t.CHATSET, r = o.length; n > 0; n = parseInt(n / r, 10)) i += o.charAt(parseInt(n % r, 10));
                return i
            },
            decode: function(e) {
                if ("undefined" == typeof e || 0 == e.length) return 0;
                for (var t = this.CHATSET,
                i = t.length,
                n = 0,
                o = 0; o < e.length; o++) {
                    var r = e.charAt(o),
                    a = t.indexOf(r);
                    n += a * Math.pow(i, o)
                }
                return n
            },
            setCookie: function(e, t, i) {
                var n = e + "=" + encodeURIComponent(t) + ";path=/";
                if (null != i) {
                    var o = new Date;
                    o.setTime(o.getTime() + 24 * i * 60 * 60 * 1e3),
                    n += ";expires=" + o.toGMTString()
                }
                document.cookie = n
            },
            getCookie: function(e) {
                var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
                return null != t ? decodeURIComponent(t[2]) : null
            }
        };
        t.exports = n
    },
    {}],
    9 : [function(e, t, i) {
        function n(e) {
            return {
                f: "[object Function]" === m.call(e),
                o: "[object Object]" === m.call(e),
                a: "[object Array]" === m.call(e)
            }
        }
        function o(e) {
            e.mm = {
                download: function(e, t) {
                    r.trigger("server.check.start", "download", e, t)
                },
                detail: function(e) {
                    r.trigger("server.check.start", "detail", e)
                },
                open: function(e, t) {
                    void 0 === t && (t = !0),
                    r.trigger("server.check.start", "open", e, t)
                },
                openDownload: function(e, t) {
                    void 0 === t && (t = !0),
                    r.trigger("server.check.start", "openDownload", e, t)
                },
                openCall: function(e, t) {
                    void 0 === t && (t = !0),
                    r.trigger("server.check.start", "openCall", e, t)
                },
                openCall1: function(e, t) {
                    void 0 === t && (t = !0),
                    r.trigger("server.check.start", "openCall1", e, t)
                },
                batchDownload: function(e) {
                    var t = this;
                    if ("undefined" != typeof e && "" != e) {
                        var i = new Array;
                        if (a.s(e)) {
                            if (!/^[\d\/]*$/.test(e)) return;
                            i = e.split("/")
                        } else if (a.a(e)) {
                            if (0 == e.length) return;
                            i = e
                        }
                        if (i.length > 0) {
                            var n = "",
                            o = 0;
                            i.forEach(function(e) {
                                e && /^(\d)*$/.test(e) && ("" === n ? n = a.encode(e) : n += "-" + a.encode(e), o++)
                            }),
                            o > t.get("batchMaxApps") ? l.show({
                                type: "alert",
                                info: t.get("maxAlert")
                            }) : "" != n && r.trigger("server.check.start", "batchDownload", n)
                        }
                    }
                },
                set: function(e, t) {
                    var i, o = p;
                    return e in o && (i = o[e], n(i).f ? o[e](t) : o[e] = t),
                    this
                },
                get: function(e) {
                    var t, i = p;
                    if (e in i) return t = i[e],
                    n(t).f ? t() : t
                },
                init: function(e) {
                    if ("undefined" != typeof e && a.o(e)) {
                        var t = p;
                        for (var i in t) i in e && (t[i] = e[i])
                    }
                },
                error: function(e) {
                    if (n(e).f) {
                        var t = function(t) {
                            var i = d.call(t.args, 1);
                            i && i[0] || "";
                            console.log(i),
                            e.apply(this, arguments)
                        };
                        r.on("server.over.error", t)
                    }
                }
            },
            a.each(["download", "detail", "open", "batchDownload","openDownload","openCall","openCall1"],
            function(t) {
                var i = s.browserUtil,
                n = i.isIOS(),
                o = i.isWechat();
                e.mm[t] = e.mm[t].before(function() {
                    var i = o && n ? "ios-weixin": n ? "ios": "";
                    return "download" == t ? e.mm.set("errorSilent", void 0 !== arguments[2] && !arguments[2]) : e.mm.set("errorSilent", void 0 !== arguments[1] && !arguments[1]),
                    "" === i || "ios-weixin" === i || "ios" === i || (l.show({
                        type: i
                    }), !1)
                })
            })
        }
        var r = e("./Event"),
        a = e("./Util"),
        s = e("./Client"),
        c = e("./ServerManager"),
        l = e("./Dialog"),
        p = e("./Config"),
        d = [].slice,
        m = Object.prototype.toString;
        Function.prototype.bind || (Function.prototype.bind = function(e) {
            var t = [].slice,
            i = t.call(arguments, 1),
            n = this,
            o = function() {},
            r = function() {
                return n.apply(this instanceof o ? this: e || {},
                i.concat(t.call(arguments)))
            };
            return o.prototype = n.prototype,
            r.prototype = new o,
            r
        }),
        Function.prototype.before = function(e) {
            var t = this;
            return function() {
                return e.apply(this, arguments) !== !1 && t.apply(this, arguments)
            }
        },
        c.init(),
        r.on("server.check.success",
        function(e) {
            var t = e.args.slice(1),
            i = t && t[0] || "";
            "downloadmm" == i && t.shift(),
            s.execute.apply(s, t)
        }),
        r.on("server.check.error",
        function(e) {
            var t = d.call(e.args, 1),
            i = t && t[0] || "";
            "downloadmm" !== i && t.unshift("error"),
            s.execute.apply(s, t)
        }),
        a.each(document.querySelectorAll("script"),
        function(e) {
            var t = e.src;
            if (t) {
                var i = t.match(/^(.*)mmapp.js/);
                i && l.init(i[1])
            }
        }),
        t.exports = {
            init: o
        }
    },
    {
        "./Client": 2,
        "./Config": 3,
        "./Dialog": 4,
        "./Event": 5,
        "./ServerManager": 7,
        "./Util": 8
    }]
},
{},
[1]);