document.addEventListener("DOMContentLoaded", () => {

    // ======================== إعدادات تليجرام ========================
    // حط التوكن بتاع البوت بتاعك هنا
    const TELEGRAM_BOT_TOKEN = "8676413495:AAF-7OdLxB3kwptClXi6_Qn-Gm4s8Lo44VQ"; 
    // حط الـ Chat ID بتاعك هنا (رقم حسابك عشان الرسايل تجيلك أنت)
    const TELEGRAM_CHAT_ID = "6170332145";   

    // دالة إرسال الرسائل لتليجرام
    // دالة إرسال الرسائل لتليجرام
    function sendToTelegram(message) {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const data = {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML' 
        };

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(err => console.log("خطأ في الإرسال لتليجرام: ", err));
    }
    // ================================================================

    // ======================== 0. جسيمات الخلفية (النجوم والقلوب) ========================
    function createParticles() {
        const container = document.getElementById('particles-bg');
        if (!container) return;
        const symbols = ['💖','🌸','✨','💫','🦋','🌺','💕','⭐','🌷','💝'];
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            p.style.left = Math.random() * 100 + 'vw';
            p.style.animationDuration = (8 + Math.random() * 12) + 's';
            p.style.animationDelay = (Math.random() * 12) + 's';
            p.style.fontSize = (14 + Math.random() * 16) + 'px';
            container.appendChild(p);
        }
    }
    createParticles();

    // ======================== 1. تعريف العناصر الأساسية ========================
    const lockScreen   = document.getElementById('lock-screen');
    const introScreen  = document.getElementById('intro-screen');
    const mainContent  = document.getElementById('main-content');
    const introText    = document.getElementById('intro-text');
    const unlockBtn    = document.getElementById('unlock-btn');
    const bgMusic      = document.getElementById('bg-music');

    // ======================== 2. شاشة الدخول والتأثير السينمائي والموسيقى ========================
    if(unlockBtn) {
        unlockBtn.addEventListener('click', () => {
            if(bgMusic) {
                bgMusic.volume = 0; 
                bgMusic.play().then(() => {
                    let fadeAudio = setInterval(function () {
                        if (bgMusic.volume < 0.4) {
                            bgMusic.volume += 0.05;
                        } else {
                            clearInterval(fadeAudio);
                        }
                    }, 250); 
                }).catch(e => console.log("تحذير: المتصفح يمنع التشغيل التلقائي"));
            }

            if (typeof confetti === "function") {
                confetti({
                    particleCount: 250, spread: 120, origin: { y: 0.6 },
                    colors: ['#ffb6c1', '#ff69b4', '#ffd700', '#ffffff', '#c71585']
                });
            }

            lockScreen.style.opacity = '0';
            lockScreen.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                lockScreen.classList.add('hidden');
                introScreen.classList.remove('hidden');
                introScreen.style.opacity = '1';
                
                typeWriter(" إلى اختي، وأقرب شخص لقلوب الجميع.. 💖", 0, () => {
                    setTimeout(() => {
                        introScreen.style.opacity = '0';
                        setTimeout(() => {
                            introScreen.classList.add('hidden');
                            mainContent.classList.remove('hidden');
                            
                            initScratchCard('scratch-1');
                            initScratchCard('scratch-2');
                            initScratchCard('scratch-3');
                            initScratchCard('scratch-4');
                            initScratchCard('scratch-5');
                            
                            // إشعار إنها فتحت الموقع
                            sendToTelegram("🚀 <b>مريم فتحت الموقع دلوقتي وبدأت التصفح!</b>");
                        }, 1000);
                    }, 2000); 
                });
            }, 800);
        });
    }

    function typeWriter(text, i, fnCallback) {
        if (i < text.length) {
            introText.innerHTML = text.substring(0, i + 1) + '<span class="cursor" aria-hidden="true">|</span>';
            setTimeout(() => typeWriter(text, i + 1, fnCallback), 80); 
        } else if (typeof fnCallback == 'function') {
            document.querySelector('.cursor').style.display = 'none';
            setTimeout(fnCallback, 700);
        }
    }

    // ======================== 3. الماوس السحري (قلوب متطايرة) ========================
    let lastHeartTime = 0;
    function createHeart(x, y) {
        if (Date.now() - lastHeartTime < 60) return; 
        lastHeartTime = Date.now();

        const heart = document.createElement('div');
        const emojis = ['💖','💕','💗','✨','🌸'];
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.position = 'absolute';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = Math.random() * 15 + 12 + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'floatUpHeart 1.5s ease-out forwards';
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
    }
    document.addEventListener('mousemove', (e) => createHeart(e.pageX, e.pageY));
    document.addEventListener('touchmove', (e) => createHeart(e.touches[0].pageX, e.touches[0].pageY), { passive: true });
    
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes floatUpHeart {
            0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100px) scale(1.5) rotate(20deg); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);


    // ======================== 4. عداد الصداقة ========================
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");

    if(daysEl && hoursEl && minutesEl) {
        const startDate = new Date("2025-12-28T09:03:00"); 
        function updateCounter(){
            const now = new Date();
            const diff = now - startDate;
            if(diff > 0) {
                const days = Math.floor(diff / (1000*60*60*24));
                const hours = Math.floor((diff / (1000*60*60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                
                daysEl.innerText = days;
                hoursEl.innerText = hours;
                minutesEl.innerText = minutes;
            }
        }
        updateCounter();
        setInterval(updateCounter, 1000);
    }

    // ======================== 5. زر الإعجاب (القلوب) ========================
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid'); 
                this.classList.add('liked');    
                
                if (typeof confetti === "function") {
                    const rect = this.getBoundingClientRect();
                    const x = (rect.left + rect.width / 2) / window.innerWidth;
                    const y = (rect.top + rect.height / 2) / window.innerHeight;
                    confetti({
                        particleCount: 15, spread: 40, origin: { x: x, y: y },
                        colors: ['#d81b60', '#f8bbd0', '#ffd700'],
                        disableForReducedMotion: true
                    });
                }
            } else {
                icon.classList.add('fa-regular');
                icon.classList.remove('fa-solid');
                this.classList.remove('liked');
            }
        });
    });

    // ======================== 6. شمعة الأمنيات ========================
    const candleBtn = document.getElementById('candleBtn');
    const flameWrap = document.getElementById('flameWrap');
    const smokeWrap = document.getElementById('smokeWrap');
    const candleGlow = document.getElementById('candleGlow');
    const wishForm = document.getElementById('wishForm');
    const saveWishBtn = document.getElementById('saveWish');
    const wishText = document.getElementById('wishText');
    const wishSaved = document.getElementById('wishSaved');
    const savedWishDisplay = document.getElementById('savedWishDisplay');

    if (candleBtn && flameWrap) {
        candleBtn.addEventListener('click', () => {
            flameWrap.style.transform = 'translateX(-50%) scale(0)';
            flameWrap.style.opacity = '0';
            if(candleGlow) candleGlow.style.opacity = '0'; 
            
            smokeWrap.style.opacity = '1';
            const smokes = smokeWrap.querySelectorAll('.smoke');
            smokes.forEach(s => s.classList.add('active'));

            candleBtn.style.display = 'none';
            
            setTimeout(() => {
                wishForm.classList.remove('hidden');
                wishText.focus();
            }, 800);
        });
    }

    if (saveWishBtn) {
        saveWishBtn.addEventListener('click', () => {
            const text = wishText.value.trim();
            if (text === "") {
                alert("اكتبي أمنيتك الأول يا مريم عشان تتحقق! ✨");
                return;
            }
            wishForm.style.display = 'none';
            wishSaved.classList.remove('hidden');
            savedWishDisplay.innerText = `"${text}"`;

            // إرسال الأمنية إلى تليجرام
            sendToTelegram(`🕯️ <b>أمنية مريم الجديدة:</b>\n\n"${text}"\n\n<i>يلا جهز نفسك عشان تحققها! 😉</i>`);

            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150, spread: 90, origin: { y: 0.6 },
                    colors: ['#ffd700', '#ffffff', '#ffb6c1'], shapes: ['star', 'circle']
                });
            }
        });
    }

    // ======================== 7. يوميات الصداقة و 8. الشجرة ========================
    // (تم اختصارها هنا لعدم تغييرها - الأكواد الخاصة باليوميات وشجرة العائلة كما هي تماماً)
    const diaryPrev = document.getElementById('diaryPrev');
    const diaryNext = document.getElementById('diaryNext');
    const diaryPageNum = document.getElementById('diaryPageNum');
    const diarySpreads = document.querySelectorAll('.diary-spread');
    const diaryCover = document.getElementById('diaryCover');
    let currentSpread = 0;

    if (diaryCover) {
        diaryCover.addEventListener('click', () => { diaryCover.classList.add('open'); });
    }

    function updateDiary() {
        diarySpreads.forEach((spread, index) => { spread.classList.toggle('active', index === currentSpread); });
        if(diaryPageNum) diaryPageNum.innerText = `${currentSpread + 1} / ${diarySpreads.length}`;
    }

    if (diaryPrev && diaryNext && diarySpreads.length > 0) {
        diaryPrev.addEventListener('click', () => { if (currentSpread < diarySpreads.length - 1) { currentSpread++; updateDiary(); } });
        diaryNext.addEventListener('click', () => { if (currentSpread > 0) { currentSpread--; updateDiary(); } });
    }

    const familyCards = document.querySelectorAll('.family-card');
    const fcPopup = document.getElementById('fcPopup');
    const fcClose = document.getElementById('fcClose');
    const fcPopupName = document.getElementById('fcPopupName');
    const fcPopupMsg = document.getElementById('fcPopupMsg');
    const fcPopupEmoji = document.getElementById('fcPopupEmoji');

    if (fcPopup) {
        document.body.appendChild(fcPopup); 
        const fcOverlay = document.createElement('div');
        fcOverlay.className = 'fc-overlay';
        document.body.appendChild(fcOverlay);

        function closeFamilyPopup() {
            fcPopup.classList.remove('show');
            fcOverlay.classList.remove('show');
        }

        familyCards.forEach(card => {
            card.addEventListener('click', function() {
                fcPopupName.textContent = this.getAttribute('data-name');
                fcPopupMsg.textContent = this.getAttribute('data-msg');
                fcPopupEmoji.textContent = this.getAttribute('data-emoji');
                fcPopup.classList.remove('hidden');
                fcPopup.classList.add('show');
                fcOverlay.classList.add('show');
                if (typeof confetti === 'function') {
                    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 }, colors: ['#d81b60', '#f8bbd0', '#d4af37'] });
                }
            });
        });

        if (fcClose) fcClose.addEventListener('click', closeFamilyPopup);
        fcOverlay.addEventListener('click', closeFamilyPopup);
    }

    // ======================== قائمة الهدايا ========================
    let gifts = [
        "شوكولاتة بالفسدق 🍫", 
        "روج 💄",   
        "لب جلاس 🖊️",    
        "عرووسة 👰🏼",     
        "هدية مفاجأة 🎁",    // تتغير لاحقاً
        "ولا شي 🤣🤷‍♀️"        
    ];

    // ======================== 9. اختبار الـ BFF (مع إرسال الإجابات) ========================
    const unlockPhotoBtns = document.querySelectorAll('.unlock-photo-btn');
    unlockPhotoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const container = this.closest('.quiz-overlay');
            const imageBox = this.closest('.secret-image-box');
            const input = container.querySelector('.answer-input');
            const questionText = container.querySelector('p').innerText; // جلب نص السؤال
            const userAnswer = input.value.trim(); 

            let isCorrect = userAnswer.length > 0;

            if (isCorrect) {
                // إرسال الإجابة لتليجرام
                sendToTelegram(`📝 <b>مريم جاوبت على سؤال:</b>\n\n<b>السؤال:</b> ${questionText}\n<b>إجابتها:</b> ${userAnswer}`);

                // ربط سؤال الهدية بالعجلة
                if (this.id === 'fav-gift-btn') {
                    gifts[4] = userAnswer + " 🎁"; 
                    
                    const wheelText = document.getElementById('dynamic-gift-text');
                    if (wheelText) wheelText.innerText = userAnswer; 
                }

                this.innerHTML = " تمام 👑";
                this.style.backgroundColor = "#4CAF50"; 
                this.style.color = "white";
                
                if (typeof confetti === "function") {
                    confetti({ particleCount: 50, spread: 60, colors: ['#ffb6c1', '#ffd700'] });
                }

                setTimeout(() => {
                    container.style.opacity = '0';
                    setTimeout(() => {
                        container.style.display = 'none';
                        imageBox.querySelector('.blurred-photo').style.filter = 'blur(0)'; 
                    }, 500);
                }, 1000);

            } else {
                const originalText = this.innerHTML;
                this.innerHTML = "اكتبي حاجة الأول يا جربوعه 😂";
                this.style.backgroundColor = "#ff4d4d"; 
                this.style.color = "white";
                
                container.style.transform = "translateX(-10px)";
                setTimeout(() => container.style.transform = "translateX(10px)", 100);
                setTimeout(() => container.style.transform = "translateX(-10px)", 200);
                setTimeout(() => container.style.transform = "translateX(0)", 300);

                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.backgroundColor = ""; 
                    this.style.color = "";
                }, 2000);
            }
        });
    });


    // ======================== 10. بطاقات المسح ========================
    function initScratchCard(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        let width = canvas.parentElement.offsetWidth;
        let height = canvas.parentElement.offsetHeight;
        canvas.width = width; canvas.height = height;

        ctx.fillStyle = '#e8d3df'; ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#dcb9cb';
        for(let i=0; i<width; i+=25) {
            for(let j=0; j<height; j+=25) {
                ctx.beginPath(); ctx.arc(i, j, 3, 0, Math.PI*2); ctx.fill();
            }
        }
        ctx.font = 'bold 20px Cairo'; ctx.fillStyle = '#7a3b5c'; 
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('🎁 امسحي هنا يا مريم! ✨', width / 2, height / 2);

        let isDrawing = false;
        function getCoordinates(e) {
            const rect = canvas.getBoundingClientRect();
            let x, y;
            if (e.type.includes('touch')) {
                x = e.touches[0].clientX - rect.left; y = e.touches[0].clientY - rect.top;
            } else {
                x = e.clientX - rect.left; y = e.clientY - rect.top;
            }
            return { x, y };
        }
        function scratch(e) {
            if (!isDrawing) return;
            e.preventDefault();
            const { x, y } = getCoordinates(e);
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath(); ctx.arc(x, y, 35, 0, Math.PI * 2); ctx.fill();
        }
        canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
        canvas.addEventListener('mousemove', scratch);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseleave', () => isDrawing = false);
        canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
        canvas.addEventListener('touchmove', scratch, { passive: false });
        canvas.addEventListener('touchend', () => isDrawing = false);
    }


    // ======================== 11. عجلة الحظ (وإرسال النتيجة) ========================
    const openGiftBtn = document.getElementById('openGift');
    const wheelContainer = document.getElementById('wheel-container');
    const wheel = document.getElementById('wheel');
    const giftMessage = document.getElementById('giftMessage');
    const wonGiftText = document.getElementById('won-gift');
    const wheelInstruction = document.getElementById('wheel-instruction');
 
    let currentRotation = 0;

    if (openGiftBtn && wheel) {
        openGiftBtn.addEventListener('click', () => {
            wheelContainer.classList.remove('hidden');
            openGiftBtn.style.display = 'none';
            if(wheelInstruction) wheelInstruction.innerText = "العجلة بتدور.. يا ترى حظك إيه؟ 😉";

            const winIndex = Math.floor(Math.random() * gifts.length);
            const segDeg = 360 / gifts.length; 
            const winMid = winIndex * segDeg + segDeg / 2; 
            
            const stopOffset = (360 - winMid % 360) % 360;
            const spins = 6; 
            const finalAngle = currentRotation + spins * 360 + stopOffset;
            
            currentRotation = finalAngle;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    wheel.style.transition = 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
                    wheel.style.transform = `rotate(${currentRotation}deg)`;
                });
            });

            // بعد 5 ثواني العجلة بتقف والنتيجة بتظهر
            setTimeout(() => {
                wheel.style.transition = 'none'; 

                if (typeof confetti === "function") {
                    confetti({ particleCount: 150, spread: 80, colors: ['#d81b60', '#f8bbd0', '#d4af37'] });
                }
                
                if(wheelInstruction) wheelInstruction.style.display = 'none';
                giftMessage.classList.remove('hidden');
                wonGiftText.innerHTML = `مبروك! كسبتي: <strong>${gifts[winIndex]}</strong> 🎉`;

                // إرسال نتيجة العجلة لتليجرام
                sendToTelegram(`🎡 <b>مريم لفت عجلة الحظ!</b>\n\nوالنتيجة طلعت: <b>${gifts[winIndex]}</b>\n\n<i>جهز الهدية فوراً! 🏃‍♂️</i>`);

            }, 5000); 
        });
    }

    // ======================== 12. التحكم بالرسالة الصوتية والموسيقى ========================
    const voiceNote = document.getElementById('my-voice');
    const playVoiceBtn = document.getElementById('play-voice');
    let isVoicePlaying = false;

    if (playVoiceBtn && voiceNote) {
        playVoiceBtn.addEventListener('click', () => {
            if (isVoicePlaying) {
                voiceNote.pause();
                playVoiceBtn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i> اسمعي رسالتي ليكِ';
                playVoiceBtn.classList.remove('playing');
                if(bgMusic) bgMusic.play();
            } else {
                if(bgMusic) bgMusic.pause(); 
                voiceNote.play();
                playVoiceBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i> إيقاف مؤقت';
                playVoiceBtn.classList.add('playing');
            }
            isVoicePlaying = !isVoicePlaying;
        });

        voiceNote.addEventListener('ended', () => {
            isVoicePlaying = false;
            playVoiceBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> اسمعيها تاني';
            playVoiceBtn.classList.remove('playing');
            if(bgMusic) bgMusic.play(); 
        });
    }

    // ======================== 13. أنيميشن الظهور ========================
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section-padding');
    sections.forEach(section => {
        section.classList.add('hidden-reveal'); 
        observer.observe(section);
    });

    // ======================== 14. مشغل الأغاني ========================
    const playIcons = document.querySelectorAll('.mock-spotify-container .play-icon');
    let currentAudio = null;
    let currentPlayingIcon = null;

    playIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const audioSrc = this.getAttribute('data-audio');
            
            if (!audioSrc || audioSrc.includes('رابط_الاغنية')) {
                alert("نسيت تضيف رابط الأغنية في الكود! 🎶"); return;
            }

            if (currentPlayingIcon === this) {
                if (currentAudio.paused) {
                    if(bgMusic) bgMusic.pause();
                    currentAudio.play();
                    this.classList.replace('fa-circle-play', 'fa-circle-pause');
                } else {
                    currentAudio.pause();
                    this.classList.replace('fa-circle-pause', 'fa-circle-play');
                    if(bgMusic) bgMusic.play();
                }
                return;
            }

            if (currentAudio) {
                currentAudio.pause();
                currentPlayingIcon.classList.replace('fa-circle-pause', 'fa-circle-play');
            }

            if(bgMusic) bgMusic.pause();

            currentAudio = new Audio(audioSrc);
            currentAudio.play();
            
            this.classList.replace('fa-circle-play', 'fa-circle-pause');
            currentPlayingIcon = this;

            currentAudio.addEventListener('ended', () => {
                this.classList.replace('fa-circle-pause', 'fa-circle-play');
                currentAudio = null;
                currentPlayingIcon = null;
                if(bgMusic) bgMusic.play();
            });
        });
    });
});
