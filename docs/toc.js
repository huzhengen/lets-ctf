// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="ctfbook/preface/intro.html"><strong aria-hidden="true">1.</strong> 前言</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ctfbook/preface/goals.html"><strong aria-hidden="true">1.1.</strong> 课程目标与概述</a></li><li class="chapter-item expanded "><a href="ctfbook/preface/prerequisites.html"><strong aria-hidden="true">1.2.</strong> 预备知识与工具安装</a></li></ol></li><li class="chapter-item expanded "><a href="ctfbook/chapter_1/intro.html"><strong aria-hidden="true">2.</strong> 第1节：CTF简介与Move应用</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ctfbook/chapter_1/move_applications.html"><strong aria-hidden="true">2.1.</strong> CTF比赛类型与Move应用场景</a></li><li class="chapter-item expanded "><a href="ctfbook/chapter_1/practice.html"><strong aria-hidden="true">2.2.</strong> 实践：签到挑战</a></li></ol></li><li class="chapter-item expanded "><a href="ctfbook/chapter_2/intro.html"><strong aria-hidden="true">3.</strong> 第2节：基础代码审计</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ctfbook/chapter_2/code_reading.html"><strong aria-hidden="true">3.1.</strong> 阅读Move代码与常见问题</a></li><li class="chapter-item expanded "><a href="ctfbook/chapter_2/practice.html"><strong aria-hidden="true">3.2.</strong> 实践：识别简单漏洞</a></li></ol></li><li class="chapter-item expanded "><a href="ctfbook/chapter_3/intro.html"><strong aria-hidden="true">4.</strong> 第3节：泛型类型安全</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ctfbook/chapter_3/type_safety.html"><strong aria-hidden="true">4.1.</strong> 了解泛型类型安全</a></li><li class="chapter-item expanded "><a href="ctfbook/chapter_3/practice.html"><strong aria-hidden="true">4.2.</strong> 实践：利用泛型漏洞伪造投票凭证</a></li></ol></li><li class="chapter-item expanded "><a href="ctfbook/chapter_4/intro.html"><strong aria-hidden="true">5.</strong> 第4节：资源管理与所有权</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ctfbook/chapter_4/global_storage.html"><strong aria-hidden="true">5.1.</strong> 了解资源管理问题</a></li><li class="chapter-item expanded "><a href="ctfbook/chapter_4/practice.html"><strong aria-hidden="true">5.2.</strong> 实践：资源管理不当分析</a></li></ol></li><li class="chapter-item expanded "><a href="ctfbook/chapter_5/intro.html"><strong aria-hidden="true">6.</strong> 第5节：权限与访问控制</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ctfbook/chapter_5/access_control.html"><strong aria-hidden="true">6.1.</strong> 权限控制与 TxContext 验证</a></li><li class="chapter-item expanded "><a href="ctfbook/chapter_5/practice.html"><strong aria-hidden="true">6.2.</strong> 实践：分析权限控制漏洞</a></li></ol></li><li class="chapter-item expanded "><a href="ctfbook/chapter_6/intro.html"><strong aria-hidden="true">7.</strong> 第6节：逻辑漏洞与状态管理</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ctfbook/chapter_6/state_management.html"><strong aria-hidden="true">7.1.</strong> 了解逻辑漏洞与状态管理</a></li><li class="chapter-item expanded "><a href="ctfbook/chapter_6/practice.html"><strong aria-hidden="true">7.2.</strong> 实践：分析状态管理逻辑漏洞</a></li></ol></li><li class="chapter-item expanded "><a href="ctfbook/chapter_7/intro.html"><strong aria-hidden="true">8.</strong> 第7节：跨合约交互安全</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ctfbook/chapter_7/cross_module.html"><strong aria-hidden="true">8.1.</strong> 跨合约安全与溢出漏洞</a></li><li class="chapter-item expanded "><a href="ctfbook/chapter_7/practice.html"><strong aria-hidden="true">8.2.</strong> 实践：利用漏洞造成溢出实现攻击</a></li></ol></li><li class="chapter-item expanded "><a href="ctfbook/chapter_8/intro.html"><strong aria-hidden="true">9.</strong> 第8节：综合CTF挑战</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ctfbook/chapter_8/vulnerability_analysis.html"><strong aria-hidden="true">9.1.</strong> 综合漏洞分析与解题策略</a></li><li class="chapter-item expanded "><a href="ctfbook/chapter_8/practice.html"><strong aria-hidden="true">9.2.</strong> 实践：攻破综合漏洞</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
