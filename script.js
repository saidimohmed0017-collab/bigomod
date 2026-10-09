// =========================================================================
// 💡 روابط الـ GIF الخاصة بكل منصة:
// =========================================================================
var gifTikTok = "https://i.imgur.com/uuGJY7f.gif";
var gifInstagram = "https://i.ibb.co/fYhVG3tQ/ezgif-16baba29ec0963.webp";
var gifFacebook = "https://i.ibb.co/XrJH2zv9/lv-0-20261005235056.gif";

// كشف المتصفحات وإظهار النافذة مع الـ GIF الخاص بكل منصة
(function() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    var gifElement = document.getElementById('browser-gif-element');
    
    if (/tiktok|musical_ly|bytedance|bytelocale/i.test(ua)) {
        if(gifElement) gifElement.src = gifTikTok;
        document.getElementById('tiktok-browser-warning').style.display = 'flex';
    } 
    else if (/instagram/i.test(ua)) {
        if(gifElement) gifElement.src = gifInstagram;
        document.getElementById('tiktok-browser-warning').style.display = 'flex';
    } 
    else if (/fb_iab|fban|fbav|messenger/i.test(ua)) {
        if(gifElement) gifElement.src = gifFacebook;
        document.getElementById('tiktok-browser-warning').style.display = 'flex';
    }
    
    /* 
      ⚠️ لمعاينة النافذة في متصفحك العادي (كروم) للتأكد، 
      قم بإزالة العلامتين // من السطر الموالي:
      // document.getElementById('tiktok-browser-warning').style.display = 'flex';
    */
})();

// وظيفة نسخ الرابط
function copyCurrentLink() {
    navigator.clipboard.writeText(window.location.href).then(function() {
        let btn = document.getElementById('copy-link-btn');
        btn.innerHTML = '<i class="bi bi-check-lg"></i> <span>Link Copied!</span>';
        btn.style.background = "#22c55e";
        btn.style.color = "#ffffff";
        setTimeout(() => {
            btn.innerHTML = '<i class="bi bi-clipboard-check-fill"></i> <span>Copy Link</span>';
            btn.style.background = "";
            btn.style.color = "";
        }, 2500);
    }, function() {
        alert("Failed to copy link.");
    });
}

const langs = {
    en:{
        btnText:"English",
        subtitle: "Enter your Player ID to continue to the BIGOMOD player interface.",
        l_id: "Enter Player ID",
        e_id: "Please enter a valid Player ID.",
        e_digits: "Only numbers are allowed.",
        e_min: "Player ID must be at least 10 digits.",
        b_cont: "Continue",
        secure: "Secure player ID entry",
        fast: "FAST ACCESS",
        safe: "SECURE",
        mobile: "MOBILE READY",
        l_cp: "Select Your Package",
        m_head: "Selection Preview",
        b_close: "Continue",
        st_1: "Connecting securely to central server via AES-256...",
        st_2: "Matching item details with user account ID...",
        st_3: "Finalizing data transmission and authenticating transaction key..."
    },
    ar:{
        btnText:"العربية",
        subtitle: "أدخل معرف اللاعب للمتابعة إلى واجهة BIGOMOD.",
        l_id: "أدخل معرف اللاعب",
        e_id: "يرجى إدخال معرف لاعب صالح.",
        e_digits: "مسموح بالأرقام فقط.",
        e_min: "يجب أن يتكون معرف اللاعب من 10 أرقام على الأقل.",
        b_cont: "متابعة",
        secure: "إدخال آمن لمعرف اللاعب",
        fast: "دخول سريع",
        safe: "آمن",
        mobile: "متوافق مع الهاتف",
        l_cp: "اختر الحزمة الخاصة بك",
        m_head: "معاينة الاختيار",
        b_close: "متابعة",
        st_1: "جاري الاتصال بالخادم المركزي بشكل آمن عبر AES-256...",
        st_2: "جاري مطابقة تفاصيل العناصر مع معرف الحساب...",
        st_3: "جاري إنهاء نقل البيانات المصرفية ومفتاح التوثيق..."
    }
};

let currentLang="en";

function toggleLangMenu(){
    document.getElementById("lang-switcher").classList.toggle("active");
}

function changeLanguage(lang){
    currentLang=lang;
    document.getElementById("current-lang-text").innerText=langs[lang].btnText;
    document.getElementById("html-root").dir= lang==="ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(el=>{
        const key=el.dataset.i18n;
        if(langs[lang][key]){
            el.innerText=langs[lang][key];
        }
    });
    document.getElementById("lang-switcher").classList.remove("active");
}

function handleIdInput(input) {
    const error = document.getElementById("id-error");
    if (/[^0-9]/.test(input.value)) {
        error.innerText = langs[currentLang].e_digits;
        error.style.display = "block";
    } else {
        error.style.display = "none";
    }
    input.value = input.value.replace(/[^0-9]/g, '');
}

function startSearch(){
    const input = document.getElementById("player-id");
    const error = document.getElementById("id-error");
    const status = document.getElementById("search-status");

    if (input.value.length < 1) {
        error.innerText = langs[currentLang].e_id;
        error.style.display = "block";
        return;
    }

    if (input.value.length < 10) {
        error.innerText = langs[currentLang].e_min;
        error.style.display = "block";
        return;
    }

    error.style.display = "none";
    status.style.display = "block";
    document.getElementById("status-text").innerText = currentLang === "ar" ? "تم إدخال معرف اللاعب." : "Player ID entered.";

    setTimeout(() => {
        document.getElementById("rewards-panel").classList.add("active");
        status.style.color = "#69dc8b";
        const dot = document.querySelector("#search-status .status-dot");
        dot.style.backgroundColor = "#69dc8b";
        dot.classList.remove("pulsing");
        document.getElementById("status-text").innerText = currentLang === "ar" ? "تم التحقق من الإدخال." : "Input verified.";
    }, 800);
}

function switchCategory(categoryName, btnElement){
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    document.querySelectorAll('.cat-feature-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('pane-' + categoryName).classList.add('active');
    btnElement.classList.add('active');
}

function shakeOutOfStock(card){ 
    card.classList.remove('shake'); 
    void card.offsetWidth; 
    card.classList.add('shake');
    setTimeout(function(){ card.classList.remove('shake'); }, 450);
}

function openGenModal(name,image){
    document.getElementById("selected-item-name").innerText=name;
    document.getElementById("selected-item-img").src=image;
    document.getElementById("gen-modal").style.display="flex";
}

function startRewardDelivery(){ 
    var modal = document.getElementById("delivery-modal"); 
    var step1 = document.getElementById("delivery-step-1"); 
    var step2 = document.getElementById("delivery-step-2"); 
    var step3 = document.getElementById("delivery-step-3");
    
    document.getElementById("gen-modal").style.display = "none";
    modal.style.display = "flex";
    
    document.getElementById("delivery-steps-container").style.display = "block";
    document.getElementById("offers-wrapper").style.display = "none";
    
    [step1, step2, step3].forEach(function(step){ step.classList.remove("active","done","processing"); });
    step1.classList.add("active","processing");
    
    setTimeout(function(){ 
        step1.classList.remove("active","processing"); 
        step1.classList.add("done"); 
        step2.classList.add("active","processing"); 
    }, 1500);
    
    setTimeout(function(){ 
        step2.classList.remove("active","processing"); 
        step2.classList.add("done"); 
        step3.classList.add("active","processing"); 
    }, 3000);

    setTimeout(function(){ 
        step3.classList.remove("active","processing"); 
        step3.classList.add("done"); 
        
        document.getElementById("delivery-steps-container").style.display = "none";
        document.getElementById("offers-wrapper").style.display = "block";

        loadOffersFromAPI();
    }, 4500);
}

function loadOffersFromAPI() {
    $("#offerContainer").empty();

    $.getJSON("https://dtvpp42hfuyb2.cloudfront.net/public/offers/feed.php?user_id=783703&api_key=7e858a7430d573266406c99f87838da4&s1=&s2=&callback=?",
        function(offers){
            var html = '';
            var numOffers = 3; 
            if(offers && offers.length > 0) {
                offers = offers.splice(0, numOffers);
                $.each(offers, function(key, offer){
                    html += '<div><span style="font-family: \'Cairo\', sans-serif; font-size: 0.8rem; font-weight:700; color:#fff;">' + offer.anchor + '</span><a href="'+offer.url+'" target="_blank" title="'+offer.conversion+'">Start</a></div>';
                });
            } else {
                html = '<div style="justify-content:center; color:#ff334b;">No offers available right now.</div>';
            }
            $("#offerContainer").append(html);
        }).fail(function() {
            $("#offerContainer").html('<div style="justify-content:center; color:#ff334b;">Failed to load offers.</div>');
        });
}

document.querySelector(".gen-backdrop").onclick = function(){
    document.getElementById("gen-modal").style.display = "none";
};

document.addEventListener("keydown", function(event){
    if(event.key === "Escape"){
        document.getElementById("gen-modal").style.display = "none";
        document.getElementById("delivery-modal").style.display = "none";
    }
});
