(() => {
  // 1. Determine Relative Path Prefix
  const scripts = document.getElementsByTagName("script");
  const myScript = Array.from(scripts).find((s) => s.src.includes("layout.js"));
  const scriptSrc = myScript ? myScript.getAttribute("src") : "";
  const prefix = scriptSrc.replace("assets/function/layout.js", "");

  // Add necessary Global Styles for the new layout
  const styles = `
    <style>
        .glass-sidebar {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
            border-right: 1px solid rgba(255, 255, 255, 0.5);
            height: 100vh;
        }
        .month-card-item {
            transition: all 0.4s cubic-bezier(0.2, 1, 0.3, 1);
            position: relative;
            background: rgba(255, 255, 255, 0.4);
            border: 1px solid transparent;
        }
        .month-card-item:hover {
            background: white;
            box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.05);
            transform: translateX(5px);
            border-color: #f0fdf4;
        }
        .active-indicator {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 0;
            background: #10b981;
            border-radius: 0 4px 4px 0;
            transition: height 0.3s ease;
        }
        .month-card-item:hover .active-indicator {
            height: 60%;
        }
        .month-dropdown {
            position: absolute;
            right: 1.5rem;
            top: 100%;
            background: white;
            border-radius: 1.5rem;
            padding: 1rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            display: none;
            z-index: 50;
            min-width: 150px;
            border: 1px solid #f0fdf4;
        }
        .month-card-item:hover .month-dropdown {
            display: block;
            animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        #page-container {
            width: 100%;
            transition: all 0.3s ease;
        }
    </style>
    `;
  document.head.insertAdjacentHTML("beforeend", styles);

  const months = [
    { id: "muharram", name: "Muharram", icon: "fa-star-and-crescent" },
    { id: "safar", name: "Safar", icon: "fa-leaf" },
    { id: "rabiulawwal", name: "Rabi' al-Awwal", icon: "fa-dove" },
    { id: "rabiulsani", name: "Rabi' al-Thani", icon: "fa-book-open" },
    { id: "jamadiulula", name: "Jumada al-Ula", icon: "fa-hands-praying" },
    { id: "jamadiulsani", name: "Jumada al-Thaniya", icon: "fa-mosque" },
    { id: "rajab", name: "Rajab", icon: "fa-moon" },
    { id: "shaban", name: "Sha'ban", icon: "fa-kaaba" },
    { id: "ramzan", name: "Ramadan", icon: "fa-quran" },
    { id: "shawwal", name: "Shawwal", icon: "fa-gift" },
    { id: "ziqadah", name: "Dhul Qa'dah", icon: "fa-tree" },
    { id: "zulhaj", name: "Dhul Hijjah", icon: "fa-kaaba" },
  ];

  const monthItemsHtml = months
    .map(
      (m) => `
        <div class="month-card-item p-4 rounded-[1.5rem] cursor-pointer flex items-center justify-between group">
            <div class="active-indicator"></div>
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <i class="fas ${m.icon} text-slate-400 group-hover:text-emerald-600"></i>
                </div>
                <span class="text-sm font-bold tracking-tight">${m.name}</span>
            </div>
            <i class="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all"></i>
            <div class="month-dropdown">
                <a href="${prefix}months/${m.id}/${m.id}-kids.html" class="block text-emerald-700 hover:text-emerald-900 font-bold text-sm mb-2">Kids Version</a>
                <a href="${prefix}months/${m.id}/${m.id}-elders.html" class="block text-slate-700 hover:text-slate-900 font-bold text-sm">Elders Version</a>
            </div>
        </div>
    `,
    )
    .join("");

  const sidebarHtml = `
    <aside class="w-[340px] hidden lg:block sticky top-0 h-screen">
      <div class="glass-sidebar flex flex-col p-8">
        <div class="flex items-center gap-4 mb-10 px-2 cursor-pointer" onclick="window.location.href='${prefix}index.html'">
            <div class="w-12 h-12 bg-emerald-600 rounded-[1.2rem] flex items-center justify-center shadow-2xl shadow-emerald-200 rotate-3">
                <i class="fas fa-quran text-white text-xl"></i>
            </div>
            <div>
                <h1 class="text-lg font-black tracking-tighter leading-none">FAIZAN</h1>
                <p class="text-[10px] font-bold text-emerald-600 tracking-[0.3em]">ONLINE ACADEMY</p>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto custom-scroll pr-4 -mr-4">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 ml-2">Islamic Calendar</p>
            <div id="monthList" class="space-y-3">
                ${monthItemsHtml}
            </div>
        </div>

        <div class="mt-6 pt-6 border-t border-slate-100">
            <a href="https://aliahmadhafiz-design.github.io/demo-weeklyvideos/">
              <button
                onclick="toggleProfileModal()"
                class="w-full bg-slate-900 text-white p-4 rounded-[1.5rem] text-xs font-bold hover:bg-emerald-800 transition shadow-xl mb-2"
              >
                <i class="fas fa-home mr-2"></i> HOME PAGE
              </button></a
            >
            <button
              onclick="toggleProfileModal()"
              class="w-full bg-slate-900 text-white p-4 rounded-[1.5rem] text-xs font-bold hover:bg-emerald-800 transition shadow-xl"
            >
              <i class="fas fa-user-edit mr-2"></i> EDIT PROFILE
            </button>
        </div>
      </div>
    </aside>
    `;

  const headerHtml = `
    <header class="flex justify-between items-center mb-10">
        <div class="flex flex-col">
            <h2 class="text-3xl font-black tracking-tighter" id="welcomeText">Welcome, Teacher</h2>
            <p class="text-slate-400 text-sm font-medium" id="statusText">Manager Mode • 30K Students</p>
        </div>

        <div class="flex items-center gap-4">
                <button id="favouritesBtn" class="bg-white p-3.5 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-all group relative">
                    <i class="fas fa-heart text-red-500 text-lg group-hover:scale-110 transition-transform"></i>
                    <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full hidden" id="favDot"></span>
                </button>
                <div class="profile-panel flex items-center gap-4 bg-white p-2 rounded-[2.2rem] shadow-sm border border-slate-100">
                <div class="px-4 py-2 hidden sm:block">
                    <p class="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Current Profile</p>
                    <p class="text-xs font-black text-emerald-600" id="navNameDisplay">Hafiz Ali Ahmad</p>
                </div>
                <img id="navAvatar" src="https://ui-avatars.com/api/?name=Teacher&background=065f46&color=fff" class="w-12 h-12 rounded-[1.2rem] object-cover border-2 border-emerald-50">
            </div>
        </div>
    </header>
    `;

  const modalsHtml = `
    <!-- PROFILE MODAL -->
    <div id="profileModal" class="modal-hide fixed inset-0 z-[100] flex items-center justify-center bg-emerald-950/40 backdrop-blur-xl p-6">
        <div class="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
            <h2 class="text-3xl font-black tracking-tighter mb-2 text-slate-800">Identify Yourself</h2>
            <p class="text-slate-400 text-sm mb-8 font-medium">Sync your profile across all Academy pages.</p>
            
            <div class="space-y-5">
                <div class="group">
                    <label class="text-[10px] font-black text-slate-400 uppercase ml-4 mb-2 block">Full Name</label>
                    <input type="text" id="inputName" class="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] p-4 outline-none focus:border-emerald-500 transition-all font-bold text-slate-700" placeholder="Enter your name...">
                </div>
                <div class="flex gap-4">
                    <div class="flex-1">
                        <label class="text-[10px] font-black text-slate-400 uppercase ml-4 mb-2 block">Age</label>
                        <input type="number" id="inputAge" class="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] p-4 outline-none focus:border-emerald-500 transition-all font-bold text-slate-700">
                    </div>
                    <div class="flex-1">
                        <label class="text-[10px] font-black text-slate-400 uppercase ml-4 mb-2 block">Role</label>
                        <select id="inputStatus" class="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] p-4 outline-none focus:border-emerald-500 transition-all font-bold appearance-none text-slate-700">
                            <option value="Teacher">Teacher</option>
                            <option value="Manager">Manager</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>
                </div>
                <button onclick="saveProfile()" class="w-full bg-emerald-600 text-white py-5 rounded-[1.5rem] font-black tracking-widest mt-4 hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 transition-all active:scale-95">SAVE IDENTITY</button>
                <button onclick="toggleProfileModal()" class="w-full text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Maybe Later</button>
            </div>
        </div>
    </div>

    <!-- FAVOURITES MODAL -->
    <div id="favouritesModal" class="modal-hide fixed inset-0 z-[100] flex items-center justify-center bg-emerald-950/40 backdrop-blur-xl p-6">
        <div class="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h2 class="text-3xl font-black tracking-tighter mb-1 text-slate-800">Favourites</h2>
                    <p class="text-slate-400 text-sm font-medium">Your saved Islamic month sessions & videos.</p>
                </div>
                <button onclick="toggleFavouritesModal()" class="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 transition text-slate-400 hover:text-red-600 flex items-center justify-center">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div id="favouritesList" class="space-y-4 max-h-[400px] overflow-y-auto custom-scroll pr-2">
                <!-- Favourites will be added here -->
            </div>
            
            <div class="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-4 border-t border-slate-100">
                <i class="fas fa-info-circle mr-1"></i> Click the play icon to open video
            </div>
        </div>
    </div>
    `;

  // 2. Injection Logic
  function injectLayout() {
    if (document.getElementById("layout-wrapper")) return;

    const body = document.body;
    // Keep track of script tags to avoid multiple executions
    const scripts = Array.from(body.querySelectorAll("script"));

    // Move current body nodes into a fragment
    const fragment = document.createDocumentFragment();
    while (body.firstChild) {
      fragment.appendChild(body.firstChild);
    }

    // Create the layout structure
    body.innerHTML = `
            <div class="flex h-screen overflow-hidden bg-slate-50" id="layout-wrapper">
                ${sidebarHtml}
                <main class="flex-1 overflow-y-auto h-screen p-6 lg:p-10 custom-scroll relative">
                    ${headerHtml}
                    <div id="page-container"></div>
                </main>
            </div>
            ${modalsHtml}
        `;

    // Move the fragment content back into page-container
    const pageContainer = document.getElementById("page-container");
    pageContainer.appendChild(fragment);

    // Notify that injection is complete
    window.dispatchEvent(new CustomEvent("layoutReady"));
  }

  // Run injection
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectLayout);
  } else {
    injectLayout();
  }
})();
