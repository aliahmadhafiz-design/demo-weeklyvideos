let favourites = JSON.parse(localStorage.getItem('faizan_favourites') || '[]');

function init() {
    loadProfile();
    updateFavouriteButtons();

    // Use event delegation for favorites button in navbar
    document.addEventListener('click', (e) => {
        if (e.target.closest('#favouritesBtn')) {
            toggleFavouritesModal();
        }
    });

    // Initial update for any existing favourite buttons on the page
    setTimeout(updateFavouriteButtons, 500);
}

function toggleProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.toggle('modal-hide');
}

function saveProfile() {
    const data = {
        name: document.getElementById('inputName').value || "Teacher",
        age: document.getElementById('inputAge').value || "25",
        status: document.getElementById('inputStatus').value
    };
    localStorage.setItem('faizan_user', JSON.stringify(data));
    loadProfile();
    toggleProfileModal();
}

function loadProfile() {
    const saved = localStorage.getItem('faizan_user');
    if (saved) {
        const user = JSON.parse(saved);
        const welcomeText = document.getElementById('welcomeText');
        const navNameDisplay = document.getElementById('navNameDisplay');
        const statusText = document.getElementById('statusText');
        const navAvatar = document.getElementById('navAvatar');

        if (welcomeText) welcomeText.innerText = `Welcome, ${user.name}`;
        if (navNameDisplay) navNameDisplay.innerText = user.name;
        if (statusText) statusText.innerText = `${user.status} Mode • Age: ${user.age}`;
        if (navAvatar) navAvatar.src = `https://ui-avatars.com/api/?name=${user.name}&background=065f46&color=fff`;
    }
}

function toggleFavouritesModal() {
    const modal = document.getElementById('favouritesModal');
    if (modal) {
        modal.classList.toggle('modal-hide');
        if (!modal.classList.contains('modal-hide')) {
            renderFavourites();
        }
    }
}

function toggleFavourite(item) {
    // item can be a string (month id) or an object (video data)
    let itemId = typeof item === 'string' ? item : item.id;

    const index = favourites.findIndex(f => (typeof f === 'string' ? f : f.id) === itemId);

    if (index > -1) {
        favourites.splice(index, 1);
    } else {
        favourites.push(item);
    }

    localStorage.setItem('faizan_favourites', JSON.stringify(favourites));
    updateFavouriteButtons();
}

function updateFavouriteButtons() {
    document.querySelectorAll('.favourite-btn').forEach(btn => {
        const id = btn.dataset.month || btn.dataset.videoId;
        const icon = btn.querySelector('i');
        const isFav = favourites.some(f => (typeof f === 'string' ? f : f.id) === id);

        if (isFav) {
            icon.classList.add('text-red-600');
            icon.classList.remove('text-red-400', 'text-slate-400');
        } else {
            icon.classList.remove('text-red-600');
            icon.classList.add('text-red-400');
        }
    });
}

function renderFavourites() {
    const list = document.getElementById('favouritesList');
    if (!list) return;

    list.innerHTML = '';
    if (favourites.length === 0) {
        list.innerHTML = '<div class="text-center py-10"><i class="fas fa-heart-broken text-slate-200 text-5xl mb-4 block"></i><p class="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No favourites yet</p></div>';
        return;
    }

    const monthNames = {
        'muharram': 'Muharram', 'safar': 'Safar', 'rabi-al-awwal': "Rabi' al-Awwal",
        'rabi-al-thani': "Rabi' al-Thani", 'jumada-al-ula': 'Jumada al-Ula',
        'jumada-al-thaniya': 'Jumada al-Thaniya', 'rajab': 'Rajab', 'shaban': "Sha'ban",
        'ramadan': 'Ramadan', 'shawwal': 'Shawwal', 'dhul-qaadah': "Dhul Qa'dah",
        'dhul-hijjah': 'Dhul Hijjah'
    };

    favourites.forEach(item => {
        const isVideo = typeof item === 'object';
        const id = isVideo ? item.id : item;
        const displayName = isVideo ? item.title : (monthNames[id] || id);

        const div = document.createElement('div');
        div.className = 'bg-slate-50 p-4 rounded-[1.5rem] flex items-center justify-between group hover:bg-white transition-all border border-transparent hover:border-slate-100 mb-3';

        if (isVideo) {
            div.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center overflow-hidden border border-emerald-50">
                        ${item.image ? `<img src="${item.image}" class="w-full h-full object-cover">` : `<i class="fas fa-video text-emerald-600"></i>`}
                    </div>
                    <div class="max-w-[180px]">
                        <h4 class="font-black text-slate-800 text-xs line-clamp-1">${displayName}</h4>
                        <p class="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">Video Lesson</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="window.location.href='${item.link}'" class="bg-white shadow-sm text-slate-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                        <i class="fas fa-play text-[9px]"></i>
                    </button>
                    <button onclick="removeFavourite('${id}')" class="text-slate-300 hover:text-red-500 transition-all">
                        <i class="fas fa-trash-alt text-xs"></i>
                    </button>
                </div>
            `;
        } else {
            div.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-50">
                        <i class="fas fa-calendar text-slate-400"></i>
                    </div>
                    <div>
                        <h4 class="font-black text-slate-800 text-xs">${displayName}</h4>
                        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Islamic Month</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="window.location.href='${id}-kids.html'" class="bg-emerald-50 text-emerald-700 px-3 py-2 rounded-full text-[10px] font-black hover:bg-emerald-600 hover:text-white transition-all">KIDS</button>
                    <button onclick="removeFavourite('${id}')" class="text-slate-300 hover:text-red-500 transition-all px-1">
                        <i class="fas fa-trash-alt text-xs"></i>
                    </button>
                </div>
            `;
        }
        list.appendChild(div);
    });
}

function removeFavourite(id) {
    const index = favourites.findIndex(f => (typeof f === 'string' ? f : f.id) === id);
    if (index > -1) {
        favourites.splice(index, 1);
        localStorage.setItem('faizan_favourites', JSON.stringify(favourites));
        renderFavourites();
        updateFavouriteButtons();
    }
}

document.addEventListener('DOMContentLoaded', init);
// Run init immediately in case DOM is already loaded (common with dynamic injection)
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    init();
}
