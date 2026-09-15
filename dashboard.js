
    // --- INSTANT APP ICON OVERRIDE (Must be outside document.ready) ---
(function forceCustomAppIcon() {
const lidFromUrl = window.location.href.match(/\/home\/(\d+)/)?.[1] || window.location.href.match(/[?&]L=(\d+)/)?.[1] || "63085";
const yearFromUrl = new Date().getFullYear().toString();
const myAppIconUrl = `https://www45.myfantasyleague.com/fflnetdynamic${yearFromUrl}/${lidFromUrl}_league_logo.png`;
    function injectIcons() {
        document.querySelectorAll('link[rel="shortcut icon"], link[rel="icon"], link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]').forEach(e => e.remove());
        
        ['apple-touch-icon', 'apple-touch-icon-precomposed'].forEach(rel => {
            const el = document.createElement('link');
            el.rel = rel;
            el.sizes = '180x180';
            el.href = myAppIconUrl;
            document.head.appendChild(el);
        });

        const favIcon = document.createElement('link');
        favIcon.rel = 'icon';
        favIcon.type = 'image/png';
        favIcon.href = myAppIconUrl;
        document.head.appendChild(favIcon);
    }

    injectIcons();
    // Run again after DOM is ready in case MFL re-injects
    document.addEventListener('DOMContentLoaded', injectIcons);
})();

$(document).ready(function() {

const TEAM_JOIN_YEARS = {
    '0001': 2017, '0002': 2017, '0003': 2017, '0004': 2017, '0005': 2017,
    '0006': 2017, '0007': 2017, '0008': 2017, '0009': 2017, '0010': 2017
};
const TEAM_THEMES = {
    '0001': {
        '--accent-blue': '#e8345a',
        '--accent-teal': '#0d6732',
        '--page-bg': '#110608',
        '--card-bg': '#2a1015',
        '--card-border': '#4a1a22',
        '--card-hover': '#351520',
    },
    '0002': {
        '--accent-blue': '#00b4d8',
        '--accent-teal': '#0077b6',
        '--page-bg': '#020d14',
        '--card-bg': '#051f2e',
        '--card-border': '#0a3a52',
        '--card-hover': '#072840',
    },
    '0003': {
        '--accent-blue': '#4cc9f0',
        '--accent-teal': '#7209b7',
        '--page-bg': '#05060f',
        '--card-bg': '#0d0f1f',
        '--card-border': '#1a1c3a',
        '--card-hover': '#141628',
    },
    '0004': {
        '--accent-blue': '#c1440e',
        '--accent-teal': '#8b0000',
        '--page-bg': '#0f0603',
        '--card-bg': '#1f0e08',
        '--card-border': '#3a1a0e',
        '--card-hover': '#2a1208',
    },
    '0005': {
        '--accent-blue': '#52b788',
        '--accent-teal': '#2d6a4f',
        '--page-bg': '#030f08',
        '--card-bg': '#071a10',
        '--card-border': '#0f3020',
        '--card-hover': '#0a2318',
    },
    '0006': {
        '--accent-blue': '#f4a261',
        '--accent-teal': '#e76f51',
        '--page-bg': '#100804',
        '--card-bg': '#1f1008',
        '--card-border': '#3a200e',
        '--card-hover': '#2a1508',
    },
    '0007': {
        '--accent-blue': '#c9a96e',
        '--accent-teal': '#8b5e3c',
        '--page-bg': '#0a0804',
        '--card-bg': '#1a1208',
        '--card-border': '#332208',
        '--card-hover': '#241a08',
    },
    '0008': {
        '--accent-blue': '#94a3b8',
        '--accent-teal': '#64748b',
        '--page-bg': '#080a0d',
        '--card-bg': '#10141a',
        '--card-border': '#1e2530',
        '--card-hover': '#161c26',
    },
    '0009': {
        '--accent-blue': '#ff6b9d',
        '--accent-teal': '#c9184a',
        '--page-bg': '#100508',
        '--card-bg': '#200a12',
        '--card-border': '#3a1020',
        '--card-hover': '#2a0e1a',
    },
    '0010': {
        '--accent-blue': '#3a86ff',
        '--accent-teal': '#8338ec',
        '--page-bg': '#04060f',
        '--card-bg': '#0a0e1f',
        '--card-border': '#141c3a',
        '--card-hover': '#0e1428',
    },
};

const CHAMPIONSHIPS = {
    '0001': [2017, 2020, 2023, 2025],
    '0002': [2018, 2021, 2022],
    '0005': [2024]
};

const lid = window.location.href.match(/\/home\/(\d+)/)?.[1] || "63085";

const year = window.location.href.match(/\/(\d{4})\//)?.[1] || new Date().getFullYear().toString();
const salaryCap = window.leagueSalaryCap || 823;
const IR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="height:16px; width:auto; vertical-align:middle; fill:#ef4444;"><path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM288 312C288 303.2 295.2 296 304 296L336 296C344.8 296 352 303.2 352 312L352 352L392 352C400.8 352 408 359.2 408 368L408 400C408 408.8 400.8 416 392 416L352 416L352 456C352 464.8 344.8 472 336 472L304 472C295.2 472 288 464.8 288 456L288 416L248 416C239.2 416 232 408.8 232 400L232 368C232 359.2 239.2 352 248 352L288 352L288 312z"/></svg>`;

const TS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="height:16px; width:auto; vertical-align:middle; fill:#f59e0b;"><path d="M256 64C238.3 64 224 78.3 224 96L224 128L215.1 128C173.1 128 136 155.3 123.5 195.4L100.5 268.9C78.5 283.1 64 307.9 64 336L64 512C64 529.7 78.3 544 96 544L128 544C145.7 544 160 529.7 160 512L160 480L480 480L480 512C480 529.7 494.3 544 512 544L544 544C561.7 544 576 529.7 576 512L576 336C576 307.9 561.5 283.1 539.6 268.9L516.6 195.4C504.1 155.3 466.9 128 424.9 128L416 128L416 96C416 78.3 401.7 64 384 64L256 64zM215.1 192L425 192C439 192 451.4 201.1 455.5 214.5L468.5 256L171.6 256L184.6 214.5C188.8 201.1 201.1 192 215.1 192zM160 336C177.7 336 192 350.3 192 368C192 385.7 177.7 400 160 400C142.3 400 128 385.7 128 368C128 350.3 142.3 336 160 336zM448 368C448 350.3 462.3 336 480 336C497.7 336 512 350.3 512 368C512 385.7 497.7 400 480 400C462.3 400 448 385.7 448 368z"/></svg>`;
const BLOCK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="height:12px; width:auto; fill:#3b82f6;"><path d="M0 192C0 174.3 14.3 160 32 160L480 160L480 112C480 98.7 487.5 86.5 499.3 80.3C511.1 74.2 525.3 75.2 536.1 82.8L632.1 146.8C641.4 152.9 647 163.1 647 174C647 184.9 641.4 195.1 632.1 201.2L536.1 265.2C525.3 272.8 511.1 273.8 499.3 267.7C487.5 261.5 480 249.3 480 236L480 192L32 192C14.3 192 0 177.7 0 160zM640 416C640 433.7 625.7 448 608 448L160 448L160 496C160 509.3 152.5 521.5 140.7 527.7C128.9 533.8 114.7 532.8 103.9 525.2L7.9 461.2C-1.4 455.1 -7 444.9 -7 434C-7 423.1 -1.4 412.9 7.9 406.8L103.9 342.8C114.7 335.2 128.9 334.2 140.7 340.3C152.5 346.5 160 358.7 160 372L160 416L608 416C625.7 416 640 430.3 640 448z"/></svg>`;
    const DEFENDING_CHAMP_FID = '0001';

function buildLogoWithTrophy(fid, size = 32, style = '') {
    const logoUrl = getFranchiseLogoUrl(fid);
    const isChamp = String(fid).padStart(4,'0') === DEFENDING_CHAMP_FID;
    const badgeSize = Math.max(10, Math.round(size * 0.38));
    const offset = Math.round(badgeSize * 0.3);

    return `
        <div style="position:relative; width:${size}px; height:${size}px; flex-shrink:0; ${style}">
            <img src="${logoUrl}" onerror="this.src='https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/NFL.svg'" style="width:${size}px; height:${size}px; object-fit:contain; border-radius:50%; background:#000;">
            ${isChamp ? `
            <div style="position:absolute; bottom:-${offset}px; right:-${offset}px; background:rgba(245,158,11,0.2); border:1px solid rgba(245,158,11,0.6); border-radius:50%; width:${badgeSize}px; height:${badgeSize}px; display:flex; align-items:center; justify-content:center; z-index:5;">
                <svg width="${Math.round(badgeSize*0.6)}" height="${Math.round(badgeSize*0.6)}" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2h12v6c0 3.31-2.69 6-6 6S6 11.31 6 8V2z" fill="#f59e0b"/>
                    <path d="M4 2h2v5C6 7 5 8 4 8 2.9 8 2 7.1 2 6V4c0-1.1.9-2 2-2z" fill="#f59e0b" opacity="0.6"/>
                    <path d="M18 2h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2-1 0-2-1-2-1V2z" fill="#f59e0b" opacity="0.6"/>
                    <path d="M10 14h4l1 3H9l1-3z" fill="#f59e0b"/>
                    <path d="M7 17h10v2H7v-2z" fill="#f59e0b"/>
                </svg>
            </div>` : ''}
        </div>`;
}
    // --- STATE VARIABLES FOR SORTING & UI MEMORY ---
let playerSortDir = 'desc';
let playerFilters = { years: [1, 5], salary: [0, 200], guar: [0, 100], capHit: [0, 500] };
let playerFiltersActive = false;
let playerFilterPanelOpen = false;
    let lineupSortBy = 'proj';  
window.offseasonMode = true;  
let playerSortBy = 'own'; // Default to "Own Percentage"
let playerPosFilter = '*'; // Default to "All Positions"
    let contractSortBy = 'capHit'; 
    let isGrouped = true;            
    let minimizedGroups = new Set(); 

let rookiePids = new Set();
    let tradeBlockGiveUp = [];
    window._pendingWaivers = window._pendingWaivers || {};
    let auctionSortBy = 'time';   // 'time' or 'bid'
    let auctionSortDir = 'asc';   // asc = soonest expiring / lowest bid first
    let auctionPosFilter = 'ALL';

    // --- FRANCHISE ID LOCATOR ---
    const urlParams = new URLSearchParams(window.location.search);
    let rawFid = urlParams.get('F') || urlParams.get('f') || 
                 $('select[name="F"]').val() || $('input[name="F"]').val() || 
                 (typeof franchise_id !== 'undefined' ? franchise_id : null);

    let fid = rawFid ? String(rawFid).trim().padStart(4, '0') : null;
    if (!fid || parseInt(fid, 10) === 0) {
        fid = "0001";
    }
// NEW: Save your actual franchise ID and prepare a dictionary for the league
    const myFid = (typeof franchise_id !== 'undefined' && franchise_id !== '') ? String(franchise_id).trim().padStart(4, '0') : fid;
    let leagueFranchises = {};
    const rosterURL = `https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=${fid}`;
    const lineupURL = `https://www45.myfantasyleague.com/${year}/lineup?L=${lid}&F=${fid}`;

    const LINEUP_RULES = {
        total: { min: 8, max: 17 },
        rosterLimit: 39, 
        positions: {
            'QB': { min: 1, max: 2 }, 'RB': { min: 2, max: 5 },
            'WR': { min: 2, max: 6 }, 'TE': { min: 1, max: 3 },
            'DE': { group: 'DL', min: 1, max: 4 }, 'DT': { group: 'DL', min: 1, max: 4 },
            'LB': { min: 1, max: 4 },
            'CB': { group: 'DB', min: 1, max: 4 }, 'S':  { group: 'DB', min: 1, max: 4 }
        },
        groups: {
'OFFENSE_MAX': { pos: ['QB', 'RB', 'WR', 'TE'], max: 10 },            'IDP_MAX': { pos: ['DE', 'DT', 'LB', 'CB', 'S'], max: 6 },
'OFFENSE': ['QB', 'RB', 'WR', 'TE'],            'IDP': ['DE', 'DT', 'LB', 'CB', 'S'],
            'FLEX': ['RB', 'WR', 'TE'],
            'SFLEX': ['QB', 'RB', 'WR', 'TE']
        }
    };

let pointsAllowedMap = {};
let pointsAllowedRankMap = {}; 
    let playerAverages = {}; // Stores player averages
    let playerRanks = {};    // NEW: Stores player positional ranks
    
    // Helper to format numbers like '1' into '1ST', '2' into '2ND'
    function getOrdinalRank(n) {
        const s = ["TH", "ST", "ND", "RD"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }
    let activePlayerRow = null;
    let currentDoc = null; 
    let originalStarterIds = new Set();
    let selectedYear = parseInt(year) || 2026;
    let tradeBlockPids = new Set();
    let irPids = new Set();
    let taxiPids = new Set();
let contractsStatsData = {};
    let irPlayers = [];
    let taxiPlayers = [];
    let injuryMap = {}; 
const NFL_THROWBACK_LOGOS = {};
['ARI','ATL','BAL','BUF','CAR','CHI','CIN','CLE','DAL','DEN','DET','GBP',
 'HOU','IND','JAC','KCC','LVR','LAC','LAR','MIA','MIN','NEP','NOS','NYG',
 'NYJ','PHI','PIT','SFO','SEA','TBB','TEN','WAS'].forEach(t => {
    NFL_THROWBACK_LOGOS[t] = `https://raw.githubusercontent.com/zewolff1/llddynasty/main/content/team/throwback/${t}.png`;
});

function getNFLLogoUrl(teamAbbr) {
    const style = localStorage.getItem('nfl_logo_style') || 'modern';
    const abbr = (teamAbbr || 'NFL').toUpperCase();
    if (style === 'throwback' && NFL_THROWBACK_LOGOS[abbr]) {
        return NFL_THROWBACK_LOGOS[abbr];
    }
    return `https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/${abbr}.svg`;
}
    // --- DYNAMIC CONTROL BAR ---
function getFranchiseLogoUrl(franchiseId) {
    return window._franchiseLogos?.[franchiseId] || 
        `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${franchiseId}.png`;
}
// --- DYNAMIC CONTROL BAR ---
  function getToggleBarHtml(viewType) {
        let sortButtons = '';
        let contractFilterPanel = '';
        
        // Abstracting the button styles so they are perfectly uniform
        const baseBtn = "padding: 6px 10px; border-radius: 6px; font-size: 10px; font-weight: 800; text-transform: uppercase; cursor: pointer; transition: 0.2s; white-space: nowrap; flex-shrink: 0;";
        const offBtn = `background: rgba(255,255,255,0.05); color: var(--text-dim); border: 1px solid var(--card-border); ${baseBtn}`;
        const onBtn = `background: var(--accent-blue); color: #fff; border: 1px solid var(--accent-blue); ${baseBtn}`;

if (viewType === 'contracts') {
            const contractSorts = [
                { id: 'capHit', label: 'Cap Hit' },
                { id: 'total', label: 'Total' },
                { id: 'years', label: 'Years' },
                { id: 'guar', label: 'Guar %' },
            ];
            const activeFilterCount = playerFiltersActive ? (
                (playerFilters.years[0] > 1 || playerFilters.years[1] < 5 ? 1 : 0) +
                (playerFilters.salary[0] > 0 || playerFilters.salary[1] < 200 ? 1 : 0) +
                (playerFilters.guar[0] > 0 || playerFilters.guar[1] < 100 ? 1 : 0) +
                (playerFilters.capHit[0] > 0 || playerFilters.capHit[1] < 500 ? 1 : 0)
            ) : 0;
            const filterBadge = activeFilterCount > 0
                ? `<span style="background:var(--accent-blue); color:#fff; border-radius:50%; width:14px; height:14px; font-size:8px; font-weight:900; display:inline-flex; align-items:center; justify-content:center; margin-left:4px;">${activeFilterCount}</span>`
                : '';
            contractFilterPanel = playerFilterPanelOpen ? `
                <div id="player-filter-panel" style="padding:10px 0; border-top:1px solid rgba(255,255,255,0.05); display:flex; flex-direction:column; gap:12px; margin-top:6px;">
                    ${buildRangeFilter('years', 'Years', playerFilters.years, 1, 5, 1, '', 'yr')}
                    ${buildRangeFilter('salary', 'Salary', playerFilters.salary, 0, 200, 5, '$', 'm')}
                    ${buildRangeFilter('guar', 'Guarantee %', playerFilters.guar, 0, 100, 5, '', '%')}
                    ${buildRangeFilter('capHit', 'Cap Hit', playerFilters.capHit, 0, 500, 10, '$', 'm')}
                    <div style="display:flex; gap:6px;">
                        <button id="filter-reset-btn" style="flex:1; padding:6px; background:rgba(255,255,255,0.05); color:var(--text-dim); border:1px solid var(--card-border); border-radius:6px; font-size:10px; font-weight:900; cursor:pointer; text-transform:uppercase;">Reset Filters</button>
                        <button id="filter-apply-btn" style="flex:2; padding:6px; background:var(--accent-blue); color:#fff; border:none; border-radius:6px; font-size:10px; font-weight:900; cursor:pointer; text-transform:uppercase;">Apply</button>
                    </div>
                </div>` : '';
            sortButtons = `
                ${contractSorts.map(s => {
                    const isActive = contractSortBy === s.id;
                    const arrow = isActive ? (playerSortDir === 'desc' ? ' ↓' : ' ↑') : '';
                    return `<button class="sort-btn contracts-sort-btn${isActive ? ' active' : ''}" data-type="contracts" data-val="${s.id}" style="background:transparent; border:none; border-bottom:2px solid ${isActive ? 'var(--accent-blue)' : 'transparent'}; color:${isActive ? '#fff' : 'var(--text-dim)'}; font-size:10px; font-weight:800; text-transform:uppercase; cursor:pointer; padding:6px 4px; white-space:nowrap;">${s.label}${arrow}</button>`;
                }).join('')}
                <button id="contracts-filter-toggle" style="display:flex; align-items:center; gap:4px; padding:4px 10px; border-radius:6px; border:1px solid ${activeFilterCount > 0 ? 'var(--accent-blue)' : 'var(--card-border)'}; background:${activeFilterCount > 0 ? 'rgba(59,130,246,0.1)' : 'transparent'}; color:${activeFilterCount > 0 ? 'var(--accent-blue)' : 'var(--text-dim)'}; font-size:10px; font-weight:900; cursor:pointer; text-transform:uppercase; flex-shrink:0; margin-left:auto;">
                    ⊘ Filter${filterBadge}
                </button>
            `;
        } else {
            sortButtons = `
                <button class="sort-btn" data-type="lineup" data-val="proj" style="${lineupSortBy === 'proj' ? onBtn : offBtn}">Proj</button>
                ${viewType === 'lineup' ? `<button class="sort-btn" data-type="lineup" data-val="opp" style="${lineupSortBy === 'opp' ? onBtn : offBtn}">Matchup</button>` : ''}
                <button class="sort-btn" data-type="lineup" data-val="alpha" style="${lineupSortBy === 'alpha' ? onBtn : offBtn}">A-Z</button>
            `;
        }

        let displayOptions = '';
        if (viewType !== 'lineup') {
            // Group buttons now use the exact same base styling as Sort buttons
            const groupBtnHtml = `<button id="toggle-group-btn" style="${offBtn}">${isGrouped ? 'Ungroup' : 'Group By Pos'}</button>`;
            const minBtnHtml = isGrouped ? `<button id="toggle-all-groups-btn" data-minimized="false" style="${offBtn}">Minimize All</button>` : '';
            
            // Added a tiny vertical divider line to separate Sort from Group actions
            displayOptions = `
                <div style="width: 1px; height: 16px; background: var(--card-border); margin: 0 2px; flex-shrink: 0;"></div>
                ${groupBtnHtml}
                ${minBtnHtml}
            `;
        }

let prefixHtml = '';
        if (viewType === 'lineup') {
            prefixHtml = `
                <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0; margin-right: 4px;">
                    <span class="header-icon-svg header-icon-bench"></span>
                    <span style="font-size: 13px; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 1px;">Bench</span>
                </div>
                <div style="width: 1px; height: 16px; background: var(--card-border); margin: 0 4px; flex-shrink: 0;"></div>
            `;
        } else {
            prefixHtml = `<span style="font-size: 9px; font-weight: 900; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; flex-shrink: 0;">View:</span>`;
        }

        // Return the unified scrolling strip
    return `
            <div style="display: flex; flex-direction: column; width: 100%; padding: 10px 5px 5px; margin-bottom: 5px; gap: 6px;">
                <div style="display: flex; align-items: center; width: 100%; gap: 6px;">
                    ${prefixHtml}
                    <div class="hide-scroll" style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 2px; width: 100%; align-items: center;">
                        ${sortButtons}
                        ${displayOptions}
                    </div>
                </div>
                ${viewType === 'contracts' ? (typeof contractFilterPanel !== 'undefined' ? contractFilterPanel : '') : ''}
            </div>
        `;
    }
function buildTeamInfoPanel(targetFid) {
    targetFid = String(targetFid).padStart(4,'0');
    const isOffseason = localStorage.getItem(`fa_mode_${lid}`) !== 'false';
    const record = isOffseason
        ? (window._allPrevRecords?.[targetFid] || window._allRecords?.[targetFid] || '')
        : (window._allRecords?.[targetFid] || '');
    const recordLabel = isOffseason ? `2025: ${record}` : record;

    const championships = CHAMPIONSHIPS[targetFid] || [];
    const currentYear2 = parseInt(year);

    let awardsHtml = '';
    if (championships.length > 0) {
awardsHtml = championships.map((y, index) => {
    const isDefending = y === currentYear2 - 1;
    const isFirst = index === 0;

    if (isDefending) {
        return `
            <div style="display:flex; flex-direction:column; align-items:center; gap:3px; padding:8px 10px; background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.5); border-radius:8px; white-space:nowrap; order:-1;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2h12v6c0 3.31-2.69 6-6 6S6 11.31 6 8V2z" fill="#f59e0b"/>
                    <path d="M4 2h2v5C6 7 5 8 4 8 2.9 8 2 7.1 2 6V4c0-1.1.9-2 2-2z" fill="#f59e0b" opacity="0.6"/>
                    <path d="M18 2h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2-1 0-2-1-2-1V2z" fill="#f59e0b" opacity="0.6"/>
                    <path d="M10 14h4l1 3H9l1-3z" fill="#f59e0b"/>
                    <path d="M7 17h10v2H7v-2z" fill="#f59e0b"/>
                </svg>
                <span style="font-size:11px; font-weight:900; color:#f59e0b; line-height:1.2; text-align:center;">${y}<br><span style="font-size:8px; font-weight:800; opacity:0.85;">Champions</span></span>
            </div>`;
    }

    return `
        <div style="display:flex; flex-direction:column; align-items:center; gap:2px; padding:5px 6px; background:rgba(245,158,11,0.07); border:1px solid rgba(245,158,11,0.2); border-radius:6px; white-space:nowrap;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M6 2h12v6c0 3.31-2.69 6-6 6S6 11.31 6 8V2z" fill="#f59e0b" opacity="0.8"/>
                <path d="M4 2h2v5C6 7 5 8 4 8 2.9 8 2 7.1 2 6V4c0-1.1.9-2 2-2z" fill="#f59e0b" opacity="0.5"/>
                <path d="M18 2h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2-1 0-2-1-2-1V2z" fill="#f59e0b" opacity="0.5"/>
                <path d="M10 14h4l1 3H9l1-3z" fill="#f59e0b" opacity="0.8"/>
                <path d="M7 17h10v2H7v-2z" fill="#f59e0b" opacity="0.8"/>
            </svg>
            <span style="font-size:8px; font-weight:900; color:#f59e0b; opacity:0.8; line-height:1;">'${String(y).slice(-2)}</span>
        </div>`;
}).join('');
    }

    return `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; margin-top:3px;">
            <div style="font-size:10px; font-weight:800; color:var(--text-dim);">${recordLabel}</div>
            ${awardsHtml ? `<div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; align-items:flex-start;">${awardsHtml}</div>` : ''}
        </div>`;
}
function getPlayerFilterBarHtml(isFAView) {
    const faSorts = [
        { id: 'own', label: 'Own %' }, { id: 'add', label: 'Add %' }, { id: 'proj', label: 'Proj' }
    ];
    const rosterSorts = [
        { id: 'salary', label: 'Salary' }, { id: 'caphit', label: 'Cap Hit' },
        { id: 'guar', label: 'Guar %' }, { id: 'years', label: 'Years' }
    ];
    const sorts = isFAView ? faSorts : rosterSorts;

    if (isFAView && !['own','add','proj'].includes(playerSortBy)) playerSortBy = 'own';
    if (!isFAView && !['salary','caphit','guar','years'].includes(playerSortBy)) playerSortBy = 'salary';

    const activeFilterCount = playerFiltersActive ? (
        (playerFilters.years[0] > 1 || playerFilters.years[1] < 5 ? 1 : 0) +
        (playerFilters.salary[0] > 0 || playerFilters.salary[1] < 200 ? 1 : 0) +
        (playerFilters.guar[0] > 0 || playerFilters.guar[1] < 100 ? 1 : 0) +
        (playerFilters.capHit[0] > 0 || playerFilters.capHit[1] < 500 ? 1 : 0)
    ) : 0;

    const buildSortBtn = (item) => {
        const isActive = item.id === playerSortBy;
        const arrow = isActive ? (playerSortDir === 'desc' ? ' ↓' : ' ↑') : '';
        return `<button class="player-sort-btn${isActive ? ' active' : ''}" data-sort="${item.id}">${item.label}${arrow}</button>`;
    };

    const filterBadge = activeFilterCount > 0
        ? `<span style="background:var(--accent-blue); color:#fff; border-radius:50%; width:14px; height:14px; font-size:8px; font-weight:900; display:inline-flex; align-items:center; justify-content:center; margin-left:4px;">${activeFilterCount}</span>`
        : '';

    const filterPanel = playerFilterPanelOpen && !isFAView ? `
        <div id="player-filter-panel" style="padding:10px 0; border-top:1px solid rgba(255,255,255,0.05); display:flex; flex-direction:column; gap:12px;">
            ${buildRangeFilter('years', 'Years', playerFilters.years, 1, 5, 1, 'yr')}
            ${buildRangeFilter('salary', 'Salary', playerFilters.salary, 0, 200, 5, '$', 'm')}
            ${buildRangeFilter('guar', 'Guarantee %', playerFilters.guar, 0, 100, 5, '', '%')}
            ${buildRangeFilter('capHit', 'Cap Hit', playerFilters.capHit, 0, 500, 10, '$', 'm')}
            <div style="display:flex; gap:6px;">
                <button id="filter-reset-btn" style="flex:1; padding:6px; background:rgba(255,255,255,0.05); color:var(--text-dim); border:1px solid var(--card-border); border-radius:6px; font-size:10px; font-weight:900; cursor:pointer; text-transform:uppercase;">Reset Filters</button>
                <button id="filter-apply-btn" style="flex:2; padding:6px; background:var(--accent-blue); color:#fff; border:none; border-radius:6px; font-size:10px; font-weight:900; cursor:pointer; text-transform:uppercase;">Apply</button>
            </div>
        </div>` : '';

    return `
        <div class="player-filter-wrapper" style="padding:12px 10px; background:var(--page-bg); border-bottom:1px solid var(--card-border); display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; flex-wrap:wrap; gap:14px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:8px; justify-content:center;">
                <button class="player-pos-filter-btn${playerPosFilter === '*' ? ' active' : ''}" data-pos="*">All Players</button>
                <button class="player-pos-filter-btn${playerPosFilter === 'QB+RB+WR+TE' ? ' active' : ''}" data-pos="QB+RB+WR+TE">Offense (SFlex)</button>
                <button class="player-pos-filter-btn${playerPosFilter === 'RB+WR+TE' ? ' active' : ''}" data-pos="RB+WR+TE">Flex Only</button>
                <button class="player-pos-filter-btn${playerPosFilter === 'DT+DE+LB+CB+S' ? ' active' : ''}" data-pos="DT+DE+LB+CB+S">All Defense (IDP)</button>
            </div>
            <div class="hide-scroll" style="display:flex; gap:14px; overflow-x:auto; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:8px; justify-content:center;">
                <button class="player-pos-filter-btn${playerPosFilter === 'QB' ? ' active' : ''}" data-pos="QB">QB</button>
                <button class="player-pos-filter-btn${playerPosFilter === 'RB' ? ' active' : ''}" data-pos="RB">RB</button>
                <button class="player-pos-filter-btn${playerPosFilter === 'WR' ? ' active' : ''}" data-pos="WR">WR</button>
                <button class="player-pos-filter-btn${playerPosFilter === 'TE' ? ' active' : ''}" data-pos="TE">TE</button>
                <button class="player-pos-filter-btn${playerPosFilter === 'PK' ? ' active' : ''}" data-pos="PK">PK</button>
                <button class="player-pos-filter-btn${playerPosFilter === 'DT+DE' ? ' active' : ''}" data-pos="DT+DE">DL</button>
                <button class="player-pos-filter-btn${playerPosFilter === 'LB' ? ' active' : ''}" data-pos="LB">LB</button>
                <button class="player-pos-filter-btn${playerPosFilter === 'CB+S' ? ' active' : ''}" data-pos="CB+S">DB</button>
            </div>
           <div style="display:flex; align-items:center; gap:12px; justify-content:center;">
                <span style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">Sort:</span>
                <div style="display:flex; gap:12px;">
                    ${sorts.map(buildSortBtn).join('')}
                </div>
                ${!isFAView ? `
                <button id="player-filter-toggle" style="display:flex; align-items:center; gap:4px; padding:4px 10px; border-radius:6px; border:1px solid ${activeFilterCount > 0 ? 'var(--accent-blue)' : 'var(--card-border)'}; background:${activeFilterCount > 0 ? 'rgba(59,130,246,0.1)' : 'transparent'}; color:${activeFilterCount > 0 ? 'var(--accent-blue)' : 'var(--text-dim)'}; font-size:10px; font-weight:900; cursor:pointer; text-transform:uppercase; flex-shrink:0;">
                    ⊘ Filter${filterBadge}
                </button>` : ''}
            </div>
            ${filterPanel}
            <div style="position:relative;">
                <input id="player-search-input" type="text" placeholder="Search players..."
                    style="width:100%; padding:8px 12px 8px 32px; background:rgba(255,255,255,0.05); border:1px solid var(--card-border); border-radius:8px; color:#fff; font-size:11px; font-weight:700; box-sizing:border-box; outline:none;">
                <span style="position:absolute; left:10px; top:50%; transform:translateY(-50%); font-size:13px; color:var(--text-dim);">🔍</span>
            </div>
        </div>`;
}

function buildRangeFilter(id, label, values, min, max, step, prefix = '', suffix = '') {
    const pct1 = ((values[0] - min) / (max - min)) * 100;
    const pct2 = ((values[1] - min) / (max - min)) * 100;
    return `
        <div style="display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:10px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">${label}</span>
                <span style="font-size:10px; font-weight:900; color:#fff;" id="filter-label-${id}">${prefix}${values[0]}${suffix} – ${prefix}${values[1]}${suffix}</span>
            </div>
            <div style="position:relative; height:20px; display:flex; align-items:center;">
                <div style="position:absolute; left:0; right:0; height:4px; background:rgba(255,255,255,0.1); border-radius:4px;"></div>
                <div id="filter-track-${id}" style="position:absolute; height:4px; background:var(--accent-blue); border-radius:4px; left:${pct1}%; right:${100-pct2}%;"></div>
                <input type="range" class="filter-range-min dual-range" data-filter="${id}" data-prefix="${prefix}" data-suffix="${suffix}"
                    min="${min}" max="${max}" step="${step}" value="${values[0]}"
                    style="position:absolute; width:100%; appearance:none; -webkit-appearance:none; background:transparent; pointer-events:none; z-index:2; height:4px;">
                <input type="range" class="filter-range-max dual-range" data-filter="${id}" data-prefix="${prefix}" data-suffix="${suffix}"
                    min="${min}" max="${max}" step="${step}" value="${values[1]}"
                    style="position:absolute; width:100%; appearance:none; -webkit-appearance:none; background:transparent; pointer-events:none; z-index:2; height:4px;">
            </div>
        </div>`;
}




// Routes a write through the Cloudflare Worker's commissioner-authenticated proxy.


// Routes a write through the Cloudflare Worker's commissioner-authenticated proxy.
// Needed for any MFL write (TYPE=salaries, TYPE=salaryAdj) that MFL restricts to
// the commissioner's own login session, regardless of who is using the app.
async function commishWrite(type, data, options = {}) {
    const payload = { year, type, data };
    if (options.franchiseId) payload.franchiseId = options.franchiseId;
    if (options.append) payload.append = true;

    const res = await fetch('https://bold-grass-3b02.zewolff1.workers.dev/mfl-commish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const json = await res.json();
    console.log('commishWrite full response:', json);
    if (json.error) {
        throw new Error(json.error + (json.detail ? ': ' + json.detail : ''));
    }
    return json.response;
}
window.commishWrite = commishWrite;



    // --- UTILITIES ---
function getRookieHtml(pid) {
        if (rookiePids.has(String(pid))) {
            return `<span class="injury-badge" style="background: rgba(168,85,247,0.2); color: #a855f7; border: 1px solid rgba(168,85,247,0.4); font-size: 9px; font-weight: 900; padding: 1px 5px; border-radius: 4px; margin-left: 3px;">R</span>`;
        }
        return '';
    }
function getTradeBlockHtml(pid) {
    if (tradeBlockPids.has(String(pid))) {
        return `<span style="display:inline-flex; align-items:center; justify-content:center; margin-left:3px; flex-shrink:0;">${BLOCK_ICON}</span>`;
    }
    return '';
}
    function getInjuryHtml(pid) {        if (injuryMap[pid]) {
            const { text, title } = injuryMap[pid];
            return `<span class="injury-badge injury-${text.toLowerCase()}" title="${title}">${text}</span>`;
        }
        return '';
    }


    // --- RULES START ---//

function loadRulesContent() {
    const container = $('#rules-content-container');

    const ruleSections = {
        basics: {
            label: 'Basics',
            content: `
                <div style="display:flex; flex-direction:column; gap:12px;">
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                        <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">Roster Size</div>
                        <div style="font-size:12px; color:#fff; line-height:1.6;">39 players total — 30 active, 4 IR, 5 Taxi Squad</div>
                    </div>
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
                            <span style="display:inline-flex; align-items:center; justify-content:center;">${TS_ICON}</span>
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase;">Taxi Squad</div>
                        </div>
                        <div style="font-size:12px; color:#fff; line-height:1.6;">5 spots for rookies only. Players must be promoted or cut after their second season.</div>
                    </div>
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
                            <span style="display:inline-flex; align-items:center; justify-content:center;">${IR_ICON}</span>
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase;">IR</div>
                        </div>
                        <div style="font-size:12px; color:#fff; line-height:1.6;">4 spots. Player must have an official injury designation to be placed on IR.</div>
                    </div>
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                        <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:8px;">Starting Lineup</div>
                        ${[
                            ['QB', '1 starter', 'qb'],
                            ['RB', '2 starters', 'rb'],
                            ['WR', '2 starters', 'wr'],
                            ['TE', '1 starter', 'te'],
                            ['SFLEX', 'QB/RB/WR/TE', 'wr'],
                            ['FLEX', '2 starters — RB/WR/TE', 'rb'],
                            ['DL', '1 starter — DE/DT', 'dl'],
                            ['LB', '1 starter', 'lb'],
                            ['DB', '1 starter — CB/S', 'db'],
                            ['IDP FLEX', '3 starters — any IDP', 'lb'],
                        ].map(([pos, desc, cls]) => `
                            <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                                <span style="font-size:12px; font-weight:900; color:var(--pos-${cls});">${pos}</span>
                                <span style="font-size:11px; color:var(--text-dim);">${desc}</span>
                            </div>`).join('')}
                    </div>
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                        <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:8px;">Offense Scoring</div>
                        ${[
                            ['Passing TD', '4 pts'],
                            ['Passing Yard', '0.04 pts'],
                            ['Interception', '-2 pts'],
                            ['Rushing TD', '6 pts'],
                            ['Rushing Yard', '0.1 pts'],
                            ['Receiving TD', '6 pts'],
                            ['Receiving Yard', '0.1 pts'],
                            ['Reception', '0.5 pts'],
                        ].map(([label, val]) => `
                            <div style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                                <span style="font-size:11px; color:var(--text-dim);">${label}</span>
                                <span style="font-size:11px; font-weight:900; color:#fff;">${val}</span>
                            </div>`).join('')}
                    </div>
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                        <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:8px;">IDP Scoring</div>
                        ${[
                            ['Sack', '3 pts'],
                            ['INT', '3 pts'],
                            ['Fumble Recovery', '3 pts'],
                            ['Defensive TD', '6 pts'],
                            ['Solo Tackle', '1 pt'],
                            ['Assist Tackle', '0.5 pts'],
                            ['TFL', '1 pt'],
                            ['Pass Deflection', '1 pt'],
                        ].map(([label, val]) => `
                            <div style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                                <span style="font-size:11px; color:var(--text-dim);">${label}</span>
                                <span style="font-size:11px; font-weight:900; color:#fff;">${val}</span>
                            </div>`).join('')}
                    </div>
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                        <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">League Format</div>
                        <div style="font-size:12px; color:#fff; line-height:1.6;">10-team league · Head-to-head · 14 regular season weeks (Weeks 1–14)</div>
                    </div>
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                        <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">Tiebreaker</div>
                        <div style="font-size:12px; color:#fff; line-height:1.6;">Total points scored (PF) is used as the primary tiebreaker for playoff seeding.</div>
                    </div>
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                        <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">Playoffs</div>
                        <div style="font-size:12px; color:#fff; line-height:1.6;">Top 4 teams qualify · Weeks 15–18 · Single elimination</div>
                        <div style="margin-top:8px; display:flex; flex-direction:column; gap:4px;">
                            <div style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                                <span style="font-size:11px; color:var(--text-dim);">Semifinals</span>
                                <span style="font-size:11px; font-weight:900; color:#fff;">Weeks 15–16</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                                <span style="font-size:11px; color:var(--text-dim);">Championship</span>
                                <span style="font-size:11px; font-weight:900; color:#fff;">Weeks 17–18</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; padding:5px 0;">
                                <span style="font-size:11px; color:var(--text-dim);">Seeding</span>
                                <span style="font-size:11px; font-weight:900; color:#fff;">#1 vs #4 · #2 vs #3</span>
                            </div>
                        </div>
                    </div>
                </div>`
        },
        contracts: {
            label: 'Contracts',
            content: `
                <div style="display:flex; gap:0; border-bottom:1px solid var(--card-border); margin-bottom:16px;" class="hide-scroll" id="contract-rules-tabs">
                    <button class="contract-rules-tab active" data-tab="basics" style="flex:1; padding:10px 8px; background:transparent; color:#fff; border:none; border-bottom:2px solid var(--accent-blue); font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; white-space:nowrap;">Basics</button>
                    <button class="contract-rules-tab" data-tab="caphits" style="flex:1; padding:10px 8px; background:transparent; color:var(--text-dim); border:none; border-bottom:2px solid transparent; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; white-space:nowrap;">Cap Hits</button>
                </div>

                <div id="contract-rules-basics" class="contract-rules-panel">
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:10px;">What Each Field Means</div>
                            ${[
                                ['Salary', '#22c55e', 'The annual amount paid to the player. This counts against your cap every year they are on your roster.'],
                                ['Years', 'var(--accent-blue)', 'How many seasons the contract runs. A 3-year deal signed in 2026 expires after the 2028 season.'],
                                ['Guarantee %', '#f59e0b', 'The percentage of the salary that is protected. Higher guarantee = more dead cap risk if you cut them.'],
                                ['Cap Hit', '#ef4444', 'What you owe if you cut the player right now. Calculated as: Salary × Guarantee% × Years Remaining.'],
                                ['Total Value', 'var(--text-dim)', 'Salary × Years. The full face value of the deal — does not reflect dead cap.'],
                            ].map(([label, color, desc]) => `
                                <div style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <div style="font-size:11px; font-weight:900; color:${color}; margin-bottom:3px;">${label}</div>
                                    <div style="font-size:11px; color:var(--text-dim); line-height:1.5;">${desc}</div>
                                </div>`).join('')}
                        </div>
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">Re-Sign Formula</div>
                            <div style="font-size:12px; color:#fff; line-height:1.6; margin-bottom:10px;">The salary floor is based on the player's dynasty rank. Final salary adjusts based on years and guarantee chosen relative to a 3yr/50% baseline.</div>
                            <div style="display:flex; flex-direction:column; gap:4px;">
                                ${[
                                    ['More years vs 3yr baseline', '↓ Lower salary', '#22c55e'],
                                    ['Fewer years vs 3yr baseline', '↑ Higher salary', '#ef4444'],
                                    ['Higher guarantee vs 50%', '↓ Lower salary', '#22c55e'],
                                    ['Lower guarantee vs 50%', '↑ Higher salary', '#ef4444'],
                                ].map(([label, val, color]) => `
                                    <div style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                                        <span style="font-size:11px; color:var(--text-dim);">${label}</span>
                                        <span style="font-size:11px; font-weight:900; color:${color};">${val}</span>
                                    </div>`).join('')}
                            </div>
                        </div>
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">Rookie Contracts</div>
                            <div style="font-size:12px; color:#fff; line-height:1.6;">All drafted rookies receive a 3-year rookie contract at minimum salary. Eligible for the Taxi Squad for up to 2 seasons before they must be promoted or cut.</div>
                        </div>
                    </div>
                </div>

                <div id="contract-rules-caphits" class="contract-rules-panel" style="display:none;">
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">How Cap Hits Work</div>
                            <div style="font-size:12px; color:#fff; line-height:1.6; margin-bottom:6px;">When you cut a player, the dead cap hit is charged immediately. It equals the guaranteed portion of their remaining contract.</div>
                            <div style="font-size:11px; color:#ef4444; font-weight:900; background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); border-radius:6px; padding:8px 10px;">
                                Dead Cap = Salary × Guarantee% × Years Remaining
                            </div>
                        </div>
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">Cap Hits Decrease Each Year</div>
                            <div style="font-size:11px; color:var(--text-dim); margin-bottom:10px;">As each season passes, years remaining drops — and so does your dead cap exposure.</div>
                            <div style="display:flex; flex-direction:column; gap:4px;">
                                ${[
                                    ['Cut in Year 1 of 3', '$18m × 60% × 3', '$32.4m', '#ef4444'],
                                    ['Cut in Year 2 of 3', '$18m × 60% × 2', '$21.6m', '#f59e0b'],
                                    ['Cut in Year 3 of 3', '$18m × 60% × 1', '$10.8m', '#22c55e'],
                                    ['After contract ends', '—', '$0', '#22c55e'],
                                ].map(([when, formula, result, color]) => `
                                    <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                                        <div>
                                            <div style="font-size:11px; color:#fff; font-weight:800;">${when}</div>
                                            <div style="font-size:9px; color:var(--text-dim); margin-top:2px;">${formula}</div>
                                        </div>
                                        <span style="font-size:13px; font-weight:900; color:${color};">${result}</span>
                                    </div>`).join('')}
                            </div>
                        </div>
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:4px;">Cap Hit Simulator</div>
                            <div style="font-size:9px; color:var(--text-dim); margin-bottom:12px;">Adjust the sliders and hit Cut to see the dead cap hit.</div>
                            <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:14px;">
                                <div>
                                    <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
                                        <span style="font-size:10px; font-weight:800; color:var(--text-dim); text-transform:uppercase;">Salary</span>
                                        <span style="font-size:10px; font-weight:900; color:#fff;" id="sim-sal-lbl">$18m</span>
                                    </div>
                                    <input type="range" id="sim-salary" min="1" max="60" step="1" value="18" style="width:100%;">
                                </div>
                                <div>
                                    <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
                                        <span style="font-size:10px; font-weight:800; color:var(--text-dim); text-transform:uppercase;">Years Remaining</span>
                                        <span style="font-size:10px; font-weight:900; color:#fff;" id="sim-yrs-lbl">3</span>
                                    </div>
                                    <input type="range" id="sim-years" min="1" max="5" step="1" value="3" style="width:100%;">
                                </div>
                                <div>
                                    <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
                                        <span style="font-size:10px; font-weight:800; color:var(--text-dim); text-transform:uppercase;">Guarantee %</span>
                                        <span style="font-size:10px; font-weight:900; color:#fff;" id="sim-guar-lbl">60%</span>
                                    </div>
                                    <input type="range" id="sim-guar" min="0" max="100" step="5" value="60" style="width:100%;">
                                </div>
                            </div>
                            <div style="margin-bottom:14px; background:rgba(0,0,0,0.3); border-radius:8px; padding:10px;">
                                <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                                    <span style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">Cap Space</span>
                                    <span style="font-size:11px; font-weight:900; color:#22c55e;" id="sim-cap-label">$823m / $823m</span>
                                </div>
                                <div style="height:8px; background:rgba(255,255,255,0.08); border-radius:6px; overflow:hidden;">
                                    <div id="sim-cap-bar" style="height:100%; width:0%; background:#22c55e; border-radius:6px; transition:width 0.3s ease, background 0.3s ease;"></div>
                                </div>
                                <div id="sim-dead-cap-note" style="display:none; margin-top:8px; font-size:10px; font-weight:800; color:#ef4444; text-align:center;"></div>
                            </div>
                            <button id="sim-cut-btn" style="width:100%; padding:12px; background:rgba(239,68,68,0.15); color:#ef4444; border:1px solid rgba(239,68,68,0.4); border-radius:8px; font-size:12px; font-weight:900; text-transform:uppercase; cursor:pointer;">Cut Player</button>
                            <button id="sim-reset-btn" style="display:none; width:100%; padding:12px; background:rgba(255,255,255,0.05); color:var(--text-dim); border:1px solid var(--card-border); border-radius:8px; font-size:12px; font-weight:900; text-transform:uppercase; cursor:pointer; margin-top:8px;">Reset</button>
                        </div>
                    </div>
                </div>`
        },
        freeAgency: {
            label: 'Free Agency',
            content: `
                <div style="display:flex; gap:0; border-bottom:1px solid var(--card-border); margin-bottom:16px;" class="hide-scroll">
                    <button class="fa-rules-tab active" data-tab="how" style="flex:1; padding:10px 8px; background:transparent; color:#fff; border:none; border-bottom:2px solid var(--accent-blue); font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; white-space:nowrap;">How It Works</button>
                    <button class="fa-rules-tab" data-tab="offers" style="flex:1; padding:10px 8px; background:transparent; color:var(--text-dim); border:none; border-bottom:2px solid transparent; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; white-space:nowrap;">Making Offers</button>
                </div>
                <div id="fa-rules-how" class="fa-rules-panel">
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">Blind Auction Format</div>
                            <div style="font-size:12px; color:#fff; line-height:1.6;">Any owner can nominate a free agent at any time. Once nominated, all managers can place competing bids. The highest bidder wins and sets contract terms.</div>
                        </div>
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:8px;">Auction Timer</div>
                            <div style="font-size:12px; color:#fff; line-height:1.6; margin-bottom:8px;">The auction clock runs for <span style="color:#f59e0b; font-weight:900;">12 hours from when the high bidder last changed</span>. Every time someone takes the lead, the window resets.</div>
                            <div style="display:flex; flex-direction:column; gap:4px;">
                                ${[
                                    ['Player nominated', 'Auction opens — 12hr clock starts', '#22c55e'],
                                    ['Someone outbids you', 'Clock resets to 12 hours', '#f59e0b'],
                                    ['No new high bid for 12hrs', 'Auction closes — high bidder wins', 'var(--accent-blue)'],
                                ].map(([event, result, color]) => `
                                    <div style="display:flex; justify-content:space-between; align-items:flex-start; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.05); gap:10px;">
                                        <span style="font-size:11px; color:var(--text-dim); flex:1;">${event}</span>
                                        <span style="font-size:11px; font-weight:900; color:${color}; text-align:right; flex:1;">${result}</span>
                                    </div>`).join('')}
                            </div>
                        </div>
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:8px;">Available Funds</div>
                            <div style="font-size:12px; color:#fff; line-height:1.6; margin-bottom:8px;">Your auction budget comes directly from your <span style="color:#22c55e; font-weight:900;">remaining cap space</span>. There is no separate wallet — you can only spend what you have left under the $823m cap.</div>
                            <div style="font-size:11px; color:#ef4444; font-weight:900; background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); border-radius:6px; padding:8px 10px;">You cannot bid more than your remaining cap space allows.</div>
                        </div>
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">Re-Sign Limit</div>
                            <div style="font-size:12px; color:#fff; line-height:1.6;"><span style="color:#ef4444; font-weight:900;">A player cannot be re-signed more than once per season.</span> If a player's contract expires and they enter free agency, they are available to all teams but only one new deal can be signed.</div>
                        </div>
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">Minimum Bid</div>
                            <div style="font-size:12px; color:#fff; line-height:1.6;">The minimum opening bid is <span style="color:#f59e0b; font-weight:900;">$1m</span>. Each subsequent bid must be higher than the current high bid.</div>
                        </div>
                    </div>
                </div>
                <div id="fa-rules-offers" class="fa-rules-panel" style="display:none;">
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">How Offers Work</div>
                            <div style="font-size:12px; color:#fff; line-height:1.6;">Making an offer works like re-signing — you set salary, years, and guarantee. The difference is you're competing against other managers, so your bid amount also determines who wins.</div>
                        </div>
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:10px;">Offer Fields</div>
                            <div style="display:flex; flex-direction:column; gap:8px;">
                                ${[
                                    ['Years', 'var(--accent-blue)', '1–5 years. More years = lower annual salary.'],
                                    ['Guarantee %', '#f59e0b', 'Higher guarantee lowers salary but raises dead cap risk if cut.'],
                                    ['Salary', '#22c55e', 'Auto-calculated from rank, years, and guarantee. Cannot go below the floor.'],
                                    ['MFL Bid', '#ef4444', 'The amount you submit to win the auction. Must be higher than the current high bid. Separate from the contract salary.'],
                                ].map(([label, color, desc]) => `
                                    <div style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                                        <div style="font-size:11px; font-weight:900; color:${color}; margin-bottom:3px;">${label}</div>
                                        <div style="font-size:11px; color:var(--text-dim); line-height:1.5;">${desc}</div>
                                    </div>`).join('')}
                            </div>
                        </div>
                        <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:8px;">Bid vs Contract Salary</div>
                            <div style="font-size:12px; color:#fff; line-height:1.6; margin-bottom:8px;">These are two different numbers.</div>
                            <div style="display:flex; flex-direction:column; gap:4px;">
                                ${[
                                    ['MFL Bid', 'One-time auction cost to win the player', '#ef4444'],
                                    ['Contract Salary', 'Annual cap charge for the length of the deal', '#22c55e'],
                                ].map(([label, desc, color]) => `
                                    <div style="display:flex; justify-content:space-between; align-items:flex-start; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.05); gap:10px;">
                                        <span style="font-size:11px; font-weight:900; color:${color}; flex-shrink:0;">${label}</span>
                                        <span style="font-size:11px; color:var(--text-dim); text-align:right;">${desc}</span>
                                    </div>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>`
        },
        rookieDraft: {
            label: 'Rookie Draft',
            content: `
                <div style="display:flex; flex-direction:column; gap:12px;">
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                        <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">Format</div>
                        <div style="font-size:12px; color:#fff; line-height:1.6;">5 rounds · Linear (not snake) · Held annually in August. Lowest Max PF picks first (picks 1–9). Defending champion always gets pick 10.</div>
                    </div>
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                        <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:6px;">Pick Trading</div>
                        <div style="font-size:12px; color:#fff; line-height:1.6;">Picks can be traded up to 5 years in advance and also during the draft itself. Picks show the original owner when traded.</div>
                    </div>
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
                            <span style="display:inline-flex; align-items:center; justify-content:center;">${TS_ICON}</span>
                            <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase;">Taxi Squad Eligibility</div>
                        </div>
                        <div style="font-size:12px; color:#fff; line-height:1.6;">Drafted rookies may be placed on the Taxi Squad for up to 2 seasons. They must be promoted or cut before their 3rd season begins.</div>
                    </div>
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:12px;">
                        <div style="font-size:10px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:8px;">Rookie Contract Salaries</div>
                        <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px;">5-year contract · 30% guaranteed · Salary by pick slot:</div>
                        <div style="display:flex; flex-direction:column; gap:4px;">
                            ${[
                                ['1.01', '$5.0m'], ['1.02', '$4.875m'], ['1.03', '$4.75m'],
                                ['1.04', '$4.625m'], ['1.05', '$4.5m'], ['...decreasing ~$125k per pick', ''],
                                ['Floor', '$1.0m minimum'],
                            ].map(([pick, sal]) => sal ? `
                                <div style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <span style="font-size:11px; color:var(--text-dim);">${pick}</span>
                                    <span style="font-size:11px; font-weight:900; color:#22c55e;">${sal}</span>
                                </div>` : `
                                <div style="padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <span style="font-size:10px; color:var(--text-dim); font-style:italic;">${pick}</span>
                                </div>`).join('')}
                        </div>
                    </div>
                </div>`
        }
    };

    let activeRulesTab = 'basics';

    const tabsHtml = Object.entries(ruleSections).map(([key, section]) => `
        <button class="rules-tab-btn" data-tab="${key}" style="flex-shrink:0; padding:10px 14px; background:transparent; color:${key === activeRulesTab ? '#fff' : 'var(--text-dim)'}; border:none; border-bottom:2px solid ${key === activeRulesTab ? 'var(--accent-blue)' : 'transparent'}; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; white-space:nowrap; transition:0.2s;">
            ${section.label}
        </button>
    `).join('');

    container.html(`
        <div style="display:flex; overflow-x:auto; border-bottom:1px solid var(--card-border); margin-bottom:16px;" class="hide-scroll">
            ${tabsHtml}
        </div>
        <div id="rules-tab-content" style="padding:0 10px 20px;">
            ${ruleSections[activeRulesTab].content}
        </div>
    `);

    $(document).off('click', '.rules-tab-btn').on('click', '.rules-tab-btn', function() {
        activeRulesTab = $(this).data('tab');
        $('.rules-tab-btn').css({ color: 'var(--text-dim)', borderBottomColor: 'transparent' });
        $(this).css({ color: '#fff', borderBottomColor: 'var(--accent-blue)' });
        $('#rules-tab-content').html(ruleSections[activeRulesTab].content);
    });

    $(document).off('click', '.contract-rules-tab').on('click', '.contract-rules-tab', function() {
        $('.contract-rules-tab').css({ color: 'var(--text-dim)', borderBottomColor: 'transparent' });
        $(this).css({ color: '#fff', borderBottomColor: 'var(--accent-blue)' });
        $('.contract-rules-panel').hide();
        $('#contract-rules-' + $(this).data('tab')).show();
        if ($(this).data('tab') === 'caphits') initCapSimulator();
    });

    $(document).off('click', '.fa-rules-tab').on('click', '.fa-rules-tab', function() {
        $('.fa-rules-tab').css({ color: 'var(--text-dim)', borderBottomColor: 'transparent' });
        $(this).css({ color: '#fff', borderBottomColor: 'var(--accent-blue)' });
        $('.fa-rules-panel').hide();
        $('#fa-rules-' + $(this).data('tab')).show();
    });

    function initCapSimulator() {
        const CAP = 823;
        let isCut = false;

        function update() {
            if (isCut) return;
            const sal = parseInt($('#sim-salary').val());
            const yrs = parseInt($('#sim-years').val());
            const guar = parseInt($('#sim-guar').val());
            const hit = parseFloat((sal * (guar / 100) * yrs).toFixed(1));
            $('#sim-sal-lbl').text('$' + sal + 'm');
            $('#sim-yrs-lbl').text(yrs);
            $('#sim-guar-lbl').text(guar + '%');
            $('#sim-cap-label').text('$' + CAP + 'm / $' + CAP + 'm').css('color', '#22c55e');
            $('#sim-cap-bar').css({ width: '0%', background: '#22c55e' });
            $('#sim-dead-cap-note').hide();
        }

        $(document).off('input', '#sim-salary, #sim-years, #sim-guar').on('input', '#sim-salary, #sim-years, #sim-guar', update);

        $(document).off('click', '#sim-cut-btn').on('click', '#sim-cut-btn', function() {
            isCut = true;
            const sal = parseInt($('#sim-salary').val());
            const yrs = parseInt($('#sim-years').val());
            const guar = parseInt($('#sim-guar').val());
            const hit = parseFloat((sal * (guar / 100) * yrs).toFixed(1));
            const remaining = parseFloat((CAP - hit).toFixed(1));
            const pct = Math.min(100, (hit / CAP) * 100).toFixed(1);
            const barColor = pct > 20 ? '#ef4444' : pct > 10 ? '#f59e0b' : '#22c55e';
            $('#sim-cap-bar').css({ width: pct + '%', background: barColor });
            $('#sim-cap-label').text('$' + remaining + 'm / $' + CAP + 'm').css('color', barColor);
            $('#sim-dead-cap-note').text('$' + hit + 'm dead cap charged — $' + remaining + 'm remaining').show();
            $('#sim-cut-btn').hide();
            $('#sim-reset-btn').show();
        });

        $(document).off('click', '#sim-reset-btn').on('click', '#sim-reset-btn', function() {
            isCut = false;
            $('#sim-salary').val(18);
            $('#sim-years').val(3);
            $('#sim-guar').val(60);
            $('#sim-cut-btn').show();
            $('#sim-reset-btn').hide();
            update();
        });

        update();
    }
}

    // --- RULES END ---//

function parseMFLName(raw) {
        const parts = raw.trim().split(' '); 
        const rawPos = parts.pop(); 
        const team = parts.pop(); 
        const namePart = parts.join(' ');
        
        // NEW: Strip out non-letters (like the "-" in "RB-") from the position
        const realPos = rawPos.replace(/[^A-Z]/gi, '');

        let lastName = "";
        if (namePart.includes(',')) {
            lastName = namePart.split(',')[0].trim();
        } else {
            let nParts = namePart.trim().split(' ');
            lastName = nParts.length > 1 ? nParts.pop() : namePart.trim();
        }

        const name = namePart.includes(',') ? namePart.split(', ').reverse().join(' ').trim() : namePart.trim();
        const nParts = name.split(' ');
        const shortName = nParts.length > 1 ? nParts[0].charAt(0) + '. ' + nParts[nParts.length - 1] : name;
        
        // Handle UI labeling
        let pos = realPos;
        if (realPos === 'DE' || realPos === 'DT') pos = 'DL';
        if (realPos === 'CB' || realPos === 'S') pos = 'DB';

        return { name, shortName, lastName, pos, realPos, team };
    }
function buildGroupedHTML(playersArray, viewType) {
        if (!playersArray || playersArray.length === 0) return '';

        if (!isGrouped) {
            playersArray.sort((a, b) => {
                if (viewType === 'contracts') {
                    if (contractSortBy === 'alpha') return a.lastName.localeCompare(b.lastName) || a.name.localeCompare(b.name);
                    if (contractSortBy === 'total') return b.totalVal - a.totalVal;
                    if (contractSortBy === 'years') return b.years - a.years;
                    if (contractSortBy === 'guar') return b.guar - a.guar;
                    return b.capHit - a.capHit;
                } else {
                    if (lineupSortBy === 'alpha') return a.lastName.localeCompare(b.lastName) || a.name.localeCompare(b.name);
                    if (lineupSortBy === 'opp') return b.opp - a.opp;
                    return b.proj - a.proj;
                }
            });
            const sortedHtml = playersArray.map(p => p.html).join('');
            return `<div class="roster-grid" style="padding: 12px 5px;">${sortedHtml}</div>`;
        }
        
        let POS_ORDER = ['QB', 'RB', 'WR', 'TE', 'PK', 'DL', 'LB', 'DB'];
        let groups = {};
        POS_ORDER.forEach(p => groups[p] = []);
        
        playersArray.forEach(p => {
            let norm = (p.pos || 'UNK').toUpperCase();
            if (['DE','DT'].includes(norm)) norm = 'DL';
            if (['CB','S'].includes(norm)) norm = 'DB';
            
            if (!groups[norm]) {
                groups[norm] = [];
                POS_ORDER.push(norm);
            }
            groups[norm].push(p); 
        });

        let html = '';
        POS_ORDER.forEach(pos => {
            if (groups[pos] && groups[pos].length > 0) {
                
                groups[pos].sort((a, b) => {
                    if (viewType === 'contracts') {
                        if (contractSortBy === 'alpha') return a.lastName.localeCompare(b.lastName) || a.name.localeCompare(b.name);
                        if (contractSortBy === 'total') return b.totalVal - a.totalVal;
                        if (contractSortBy === 'years') return b.years - a.years;
                        if (contractSortBy === 'guar') return b.guar - a.guar;
                        return b.capHit - a.capHit;
                    } else {
                        if (lineupSortBy === 'alpha') return a.lastName.localeCompare(b.lastName) || a.name.localeCompare(b.name);
                        if (lineupSortBy === 'opp') return b.opp - a.opp;
                        return b.proj - a.proj;
                    }
                });

                const sortedHtml = groups[pos].map(p => p.html).join('');
                const isMin = minimizedGroups.has(pos);
                const minClass = isMin ? 'is-minimized' : '';
                const rotClass = isMin ? '' : 'rotated';

                // THE FIX: Dynamically generate the URL using your GitHub path and the position name
html += `
                    <div class="pos-group-wrapper ${minClass}" data-pos="${pos}" style="margin-bottom: 12px; background: rgba(0,0,0,0.2); border: 1px solid var(--card-border); border-radius: 8px; overflow: hidden;">
                       <div class="pos-group-header header-${pos.toLowerCase()}" style="padding: 10px 14px; border-bottom: 1px solid var(--card-border); display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-weight: 900; font-size: 11px; color: var(--pos-${pos.toLowerCase()}); text-transform: uppercase;">${{'QB':'Quarterback','RB':'Running Back','WR':'Wide Receiver','TE':'Tight End','PK':'Kicker','DL':'Defensive Line','LB':'Linebacker','DB':'Defensive Back','DE':'Defensive End','DT':'Defensive Tackle','CB':'Cornerback','S':'Safety','PICKS':'Draft Capital'}[pos] || pos}</span>
                                <span style="background: rgba(0,0,0,0.3); color: #fff; padding: 2px 6px; border-radius: 10px; font-size: 9px; font-weight: 800;">${groups[pos].length}</span>
                            </div>
                            <span class="toggle-icon ${rotClass}" style="font-size: 10px; color: rgba(255,255,255,0.7);">▼</span>
                        </div>
                        <div class="pos-group-content roster-grid" style="padding: 8px;">
                            ${sortedHtml}
                        </div>
                    </div>
                `;
            }
        });
        return html;
    }
async function loadResignState() {
    try {
        // Check page HTML first — works for everyone since IN_HEADER:Yes injects it
        const pageText = document.documentElement.innerHTML;
const pageMatch = pageText.match(/RESIGNSTATE:(true|false)/);
if (pageMatch) {
    const isOpen = pageMatch[1] === 'true';
    window._resignOpen = isOpen;
    localStorage.setItem(`resign_open_${lid}`, isOpen);
    console.log('Resign state from page HTML:', isOpen ? 'Open' : 'Locked');

    const faModeMatch = pageText.match(/<!--FAMODE:(true|false)-->/);
    if (faModeMatch) {
        window.offseasonMode = faModeMatch[1] === 'true';
        localStorage.setItem(`fa_mode_${lid}`, window.offseasonMode);
    }

    return;
}

        // Commissioner fallback — read from csetup directly
        if (myFid === '0000') {
            const res = await fetch(`https://www45.myfantasyleague.com/${year}/csetup?L=${lid}&C=HMPGMSG&SEQNO=8`, { credentials: 'include' });
            const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
            const content = doc.querySelector('textarea[name="MSG"]')?.value || '';
            const match = content.match(/RESIGNSTATE:(true|false)/);
            if (match) {
                const isOpen = match[1] === 'true';
                window._resignOpen = isOpen;
                localStorage.setItem(`resign_open_${lid}`, isOpen);
                console.log('Resign state from csetup:', isOpen ? 'Open' : 'Locked');
                return;
            }
        }

        // Final fallback — localStorage cache
        const cached = localStorage.getItem(`resign_open_${lid}`);
        if (cached !== null) {
            window._resignOpen = cached === 'true';
            console.log('Resign state from cache:', window._resignOpen ? 'Open' : 'Locked');
            return;
        }

        window._resignOpen = true;
        console.log('No resign state found, defaulting to open');
    } catch(e) {
        console.warn('Could not load resign state', e);
        window._resignOpen = true;
    }
}
function applyResignState(isOpen) {
    window._resignOpen = isOpen === true || isOpen === 'true';
    console.log('_resignOpen set to:', window._resignOpen);
}
function buildDraftPicksHtml(picks) {
    if (!picks || picks.length === 0) return '';
    
    const picksByYear = {};
    picks.forEach(pick => {
        if (!picksByYear[pick.year]) picksByYear[pick.year] = [];
        picksByYear[pick.year].push(pick);
    });

    const isMin = minimizedGroups.has('PICKS');
    const minClass = isMin ? 'is-minimized' : '';
    const rotClass = isMin ? '' : 'rotated';

    let html = `
        <div class="pos-group-wrapper ${minClass}" data-pos="PICKS" style="margin-bottom: 12px; background: rgba(0,0,0,0.2); border: 1px solid var(--card-border); border-radius: 8px; overflow: hidden;">
            <div class="pos-group-header" style="background: rgba(245, 158, 11, 0.15); padding: 10px 14px; border-bottom: 1px solid var(--card-border); display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-weight: 900; font-size: 11px; color: #f59e0b; text-transform: uppercase;">Draft Capital</span>
                    <span style="background: rgba(0,0,0,0.3); color: #f59e0b; padding: 2px 6px; border-radius: 10px; font-size: 9px; font-weight: 800;">${picks.length}</span>
                </div>
                <span class="toggle-icon ${rotClass}" style="font-size: 10px; color: rgba(255,255,255,0.7);">▼</span>
            </div>
            <div class="pos-group-content" style="padding: 10px;">
    `;

    const sortedYears = Object.keys(picksByYear).sort((a, b) => parseInt(a) - parseInt(b));

sortedYears.forEach((year, index) => {
        const yearPicks = picksByYear[year];
        const marginTop = index === 0 ? '0' : '12px';

        html += `
            <div style="margin-top: ${marginTop};">
                <div style="font-size: 10px; font-weight: 900; color: #f59e0b; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px dashed rgba(245,158,11,0.3); padding-bottom: 4px; margin-bottom: 8px;">${year}</div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        `;

yearPicks.forEach(pick => {
            const label = pick.pickStr ? pick.pickStr : `R${pick.round}`;
            // Parse "via TEAM NAME" from desc, stripping any extra text after periods
            const viaMatch = pick.desc?.match(/via ([^.)]+)/);
            const viaText = viaMatch ? viaMatch[1].trim() : null;
            
            // Look up original owner fid from franchise name
            let originalLogoUrl = pick.originalLogoUrl || null;
            if (!originalLogoUrl && viaText) {
                const origFid = Object.keys(leagueFranchises).find(id =>
                    leagueFranchises[id].toLowerCase().trim() === viaText.toLowerCase().trim()
                );
                if (origFid) {
                    originalLogoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${origFid}.png`;
                }
            }

const pickId = pick.pickStr ? `${pick.year}_${pick.pickStr.replace('.','_')}` : `${pick.year}_${pick.round}`;
            // Try all possible MFL ID formats for this pick
            const targetFid= (myFid === '0000' ? fid : myFid).padStart(4, '0');
            const fpKey = `FP_${targetFid}_${pick.year}_${pick.round}`;
            const mflPickId = window._pickIdMap?.[pickId] || window._pickIdMap?.[`${pick.year}_${pick.round}`] || fpKey;
            const isOnBlock = tradeBlockPids.has(mflPickId) || tradeBlockPids.has(pickId) || tradeBlockPids.has(fpKey);
            html += `
                <div class="draft-pick-chip" data-pickid="${pickId}" data-label="${label}" data-year="${pick.year}" data-round="${pick.round}" data-pickstr="${pick.pickStr || ''}"
                    style="display:flex; flex-direction:column; align-items:center; gap:4px; background:rgba(0,0,0,0.25); border:1px solid ${isOnBlock ? 'rgba(168,85,247,0.4)' : 'rgba(245,158,11,0.2)'}; border-radius:8px; padding:8px 10px; min-width:54px; cursor:pointer;">
                    <span style="font-size:12px; font-weight:900; color:#f59e0b;">${label}</span>
                    ${isOnBlock ? `<span style="font-size:7px; font-weight:900; color:#a855f7;">${BLOCK_ICON}</span>` : ''}
                    ${viaText || originalLogoUrl ? `
                        <div style="display:flex; align-items:center; gap:3px;">
                            ${originalLogoUrl ? `<img src="${originalLogoUrl}" style="width:14px; height:14px; border-radius:50%; object-fit:cover; background:var(--card-bg);">` : ''}
                            ${viaText && !originalLogoUrl ? `<span style="font-size:8px; color:var(--text-dim); font-weight:800; text-align:center; max-width:60px; line-height:1.2;">${viaText.split(' ').slice(-1)[0]}</span>` : ''}
                        </div>
                    ` : ''}
                </div>`;
        });

        html += `</div></div>`;
    });

    html += `</div></div>`;
    return html;
}
    // --- 10. MASTER DATA SYNC ---
    function syncAllBranding() {
        const constructedUrl = `https://www45.myfantasyleague.com/fflnetdynamic2026/${lid}_franchise_logo${fid}.png`;
        $('#settings-team-logo').attr('src', constructedUrl);

const leagueLogoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_league_logo.png`;
$('#custom-header-logo').off('error').attr('src', leagueLogoUrl).on('error', function() {
    $(this).off('error').attr('src', `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_league_logo.jpg`);
});
$('#custom-header-logo').attr('src', leagueLogoUrl);
$('link[rel="shortcut icon"], link[rel="icon"], link[rel="apple-touch-icon"]').remove();
$('head').append(`<link rel="icon" type="image/png" href="${leagueLogoUrl}">`);
$('head').append(`<link rel="shortcut icon" type="image/png" href="${leagueLogoUrl}">`);
$('head').append(`<link rel="apple-touch-icon" sizes="180x180" href="${leagueLogoUrl}">`);

        // Find the franchise name
        const teamIconElement = $(`#franchiseicon_${fid}`);
        if (teamIconElement.length) {
            const teamName = teamIconElement.attr('alt');
            if (teamName) $('#settings-team-name').text(teamName);
        } else {
            const teamLink = $(`.franchise_${fid}`).first();
            if (teamLink.length) {
                const linkText = teamLink.text().trim();
                if (linkText) $('#settings-team-name').text(linkText);
            }
        }
    }
    
    // Run it
    syncAllBranding();

// --- ADMIN & DEV TOOLS (DOM Sniffer) ---
    function buildAdminTools() {
        // Read directly from the native MFL welcome table
        const becomeLink = $('.welcome a[href*="BECOME="]').first();
        
        // If this link does not exist, the user is a normal owner. Exit immediately.
        if (becomeLink.length === 0) return;

        // Wrap the settings gear in a container if it hasn't been done yet
        if ($('.header-right-controls').length === 0) {
            $('.open-settings-btn').wrap('<div class="header-right-controls" style="display:flex; align-items:center;"></div>');
        }

        // --- 1. BUILD THE ROLE TOGGLE ---
        const url = becomeLink.attr('href');
        const isCurrentlyOwner = url.includes('BECOME=0000');
        
        const icon = isCurrentlyOwner ? '👤' : '👑';
        const titleText = isCurrentlyOwner ? 'Switch to Commissioner Mode' : 'Switch to Owner Mode';
        
$('.role-toggle').remove();
// Store the URL for use in settings
window._commishToggleUrl = url;
window._commishToggleIcon = icon;
window._commishToggleTitle = titleText;
        // --- 2. BUILD THE DEV TOOLS ---
if ($('#open-dev-tools-btn').length === 0) {

            const baseUrl = `https://www45.myfantasyleague.com/${year}/csetup?L=${lid}&C=HMPGMSG`;
            const devModal = `
                <div id="dev-tools-modal" class="player-modal-backdrop" style="z-index: 99999; display: none;">
                    <div class="settings-modal-box" style="max-width: 400px; background: var(--card-bg);">
                        <button class="player-modal-close" id="close-dev-tools">✕</button>
                        
                        <div class="settings-header" style="background: linear-gradient(to bottom, rgba(16, 185, 129, 0.15), transparent); padding: 25px 20px;">
                            <div style="font-size: 32px; margin-bottom: 8px;">🛠️</div>
                            <h2 style="margin: 0; color: #fff; font-size: 18px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Admin & Dev Tools</h2>
                        </div>
                        
<div class="settings-content-area" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 20px; overflow-y: auto; max-height: 60vh;">
                            <a href="${baseUrl}" target="_blank" class="dev-link-btn">Main HTML</a>
                            <a href="${baseUrl}&SEQNO=2" target="_blank" class="dev-link-btn">Main Style</a>
                            <a href="${baseUrl}&SEQNO=3" target="_blank" class="dev-link-btn">Tabs Script</a>
                            <a href="${baseUrl}&SEQNO=4" target="_blank" class="dev-link-btn">Fetch Roster</a>
                            <a href="${baseUrl}&SEQNO=5" target="_blank" class="dev-link-btn">Tabs Styling</a>
                            <a href="${baseUrl}&SEQNO=6" target="_blank" class="dev-link-btn">Mobile Styling</a>
                            <a href="${baseUrl}&SEQNO=10" target="_blank" class="dev-link-btn">Popup HTML</a>
                            <a href="${baseUrl}&SEQNO=11" target="_blank" class="dev-link-btn">Hide Native UI</a>
                            <a href="https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=66" target="_blank" class="dev-link-btn" style="grid-column: span 2; border-color: rgba(59, 130, 246, 0.4); color: #fff;">📝 Edit Weekly Newsletter</a>
                        </div>
                    </div>
                </div>
            `;
            $('body').append(devModal);
        }
    }
$(document).off('click', '.logo-input-tab').on('click', '.logo-input-tab', function() {
    $('.logo-input-tab').css({ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', borderColor: 'var(--card-border)' });
    $(this).css({ background: 'var(--accent-blue)', color: '#fff', borderColor: 'var(--accent-blue)' });
    $('#logo-tab-url, #logo-tab-file').hide();
    $('#logo-tab-' + $(this).data('tab')).show();
});

$(document).off('click', '#logo-url-save').on('click', '#logo-url-save', async function() {
    $(this).text('Saving...').prop('disabled', true);
    try {
        // Fetch the page to get UPLOAD_KEY and input_expires
        const pageRes = await fetch(`https://www45.myfantasyleague.com/${year}/csetup?L=${lid}&FRANCHISES=${myFid}&C=FCUSTOM`, { credentials: 'include' });
        const pageDoc = new DOMParser().parseFromString(await pageRes.text(), 'text/html');
        const uploadKey = pageDoc.querySelector('#UPLOAD_KEY')?.value || '';
        const inputExpires = pageDoc.querySelector('input[name="input_expires"]')?.value || '';

        const isFileTab = $('#logo-tab-file').is(':visible');
        let resultUrl = null;

        if (isFileTab) {
            const file = $('#logo-file-input')[0].files[0];
            if (!file) { alert('Please select a file.'); return; }
            if (file.size > 400000) { alert('File must be under 400kB.'); return; }

            const formData = new FormData();
            formData.append('form_name', 'customize');
            formData.append('LEAGUE_ID', lid);
            formData.append('C', 'FCUSTOM');
            formData.append('FRANCHISES', myFid);
            formData.append('input_expires', inputExpires);
            formData.append('UPLOAD_KEY', uploadKey);
            formData.append(`FRANCHISE_ABBREV${myFid}`, pageDoc.querySelector(`#FRANCHISE_ABBREV${myFid}`)?.value || '');
            formData.append(`FRANCHISE_STADIUM${myFid}`, pageDoc.querySelector(`#FRANCHISE_STADIUM${myFid}`)?.value || '');
            formData.append(`FRANCHISE_ICON${myFid}`, pageDoc.querySelector(`#FRANCHISE_ICON${myFid}`)?.value || '');
            formData.append(`FRANCHISE_LOGO${myFid}`, pageDoc.querySelector(`#FRANCHISE_LOGO${myFid}`)?.value || '');
            formData.append(`FRANCHISE_ICON_FILE${myFid}`, file);
            formData.append(`FRANCHISE_LOGO_FILE${myFid}`, file);
            formData.append('SUBMIT', 'Save Franchise Customization');

            const res = await fetch(`https://www45.myfantasyleague.com/${year}/csetup`, {
                method: 'POST', credentials: 'include', body: formData
            });
            const resDoc = new DOMParser().parseFromString(await res.text(), 'text/html');
            // MFL re-renders the page with updated URL after upload
            resultUrl = resDoc.querySelector(`#FRANCHISE_ICON${myFid}`)?.value || null;

        } else {
            const newUrl = $('#logo-url-input').val().trim();
            if (!newUrl) { alert('Please enter a URL.'); return; }

            const params = new URLSearchParams();
            params.set('form_name', 'customize');
            params.set('LEAGUE_ID', lid);
            params.set('C', 'FCUSTOM');
            params.set('FRANCHISES', myFid);
            params.set('input_expires', inputExpires);
            params.set('UPLOAD_KEY', uploadKey);
            params.set(`FRANCHISE_ABBREV${myFid}`, pageDoc.querySelector(`#FRANCHISE_ABBREV${myFid}`)?.value || '');
            params.set(`FRANCHISE_STADIUM${myFid}`, pageDoc.querySelector(`#FRANCHISE_STADIUM${myFid}`)?.value || '');
            params.set(`FRANCHISE_ICON${myFid}`, newUrl);
            params.set(`FRANCHISE_LOGO${myFid}`, newUrl);
            params.set('SUBMIT', 'Save Franchise Customization');

            await fetch(`https://www45.myfantasyleague.com/${year}/csetup`, {
                method: 'POST', credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params.toString()
            });
            resultUrl = newUrl;
        }

        if (resultUrl) {
            $('#settings-team-logo').attr('src', resultUrl + '?t=' + Date.now());
            $('#active-team-switcher-btn img').first().attr('src', resultUrl + '?t=' + Date.now());
        }
        $('#logo-url-editor').hide();
        alert('Logo saved!');
    } catch(e) { alert('Save failed: ' + e.message); }
    $(this).text('Save').prop('disabled', false);
});
    // --- 3. THE MISSING DEV TOOL LISTENERS ---
    $(document).off('click', '#open-dev-tools-btn').on('click', '#open-dev-tools-btn', function(e) {
        e.preventDefault();
        $('#dev-tools-modal').css('display', 'flex').hide().fadeIn(200);
        $('body').css('overflow', 'hidden');
    });

    $(document).off('click', '#close-dev-tools, #dev-tools-modal').on('click', '#close-dev-tools, #dev-tools-modal', function(e) {
        if ($(e.target).closest('.settings-modal-box').length && !$(e.target).is('#close-dev-tools')) return;
        $('#dev-tools-modal').fadeOut(200);
        $('body').css('overflow', '');
    });
$(document).off('click', '.proposal-action-btn').on('click', '.proposal-action-btn', async function() {
    const tradeId = $(this).data('tradeid');
    const action = $(this).data('action');
    console.log('proposal action:', action, 'tradeId:', tradeId);
    if (!tradeId || !confirm(`${action.charAt(0).toUpperCase() + action.slice(1)} this trade?`)) return;
    const btn = $(this);
    btn.text('Processing...').css({'opacity': '0.5', 'pointer-events': 'none'});
    try {
        const params = new URLSearchParams();
        params.set('LEAGUE_ID', lid);
        params.set('TRADE_ID', tradeId);
        params.set('ACTION', action);
        params.set('COMMENTS', '');
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/trade_response`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });
        const txt = await res.text();
        if (txt.match(/<error[^>]*>.*?<\/error>/i)) {
            const m = txt.match(/<error[^>]*>(.*?)<\/error>/i);
            alert('MFL Error: ' + (m ? m[1] : 'Unknown'));
            btn.text(action).css({'opacity': '1', 'pointer-events': 'auto'});
            return;
        }
        await loadPendingProposals();
    } catch(e) {
        console.error('Trade response error', e);
        await loadPendingProposals();
    }
});
// --- FONT LIBRARY & STYLE SYSTEM ---
const FONT_LIBRARY = {
    athletic: [
        { name: 'Bebas Neue', css: "'Bebas Neue', sans-serif", sample: 'TEAM NAME' },
        { name: 'Oswald', css: "'Oswald', sans-serif", sample: 'Team Name' },
        { name: 'Anton', css: "'Anton', sans-serif", sample: 'TEAM NAME' },
        { name: 'Rajdhani', css: "'Rajdhani', sans-serif", sample: 'Team Name' },
        { name: 'Barlow Condensed', css: "'Barlow Condensed', sans-serif", sample: 'Team Name' },
        { name: 'Saira Condensed', css: "'Saira Condensed', sans-serif", sample: 'TEAM NAME' },
        { name: 'Big Shoulders Display', css: "'Big Shoulders Display', sans-serif", sample: 'TEAM NAME' },
        { name: 'Teko', css: "'Teko', sans-serif", sample: 'Team Name' },
    ],
    serif: [
        { name: 'Playfair Display', css: "'Playfair Display', serif", sample: 'Team Name' },
        { name: 'Merriweather', css: "'Merriweather', serif", sample: 'Team Name' },
        { name: 'Libre Baskerville', css: "'Libre Baskerville', serif", sample: 'Team Name' },
        { name: 'Cinzel', css: "'Cinzel', serif", sample: 'TEAM NAME' },
        { name: 'Cormorant Garamond', css: "'Cormorant Garamond', serif", sample: 'Team Name' },
        { name: 'IM Fell English', css: "'IM Fell English', serif", sample: 'Team Name' },
        { name: 'Yeseva One', css: "'Yeseva One', serif", sample: 'Team Name' },
        { name: 'Ultra', css: "'Ultra', serif", sample: 'Team Name' },
    ],
    modern: [
        { name: 'Inter', css: "'Inter', sans-serif", sample: 'Team Name' },
        { name: 'Outfit', css: "'Outfit', sans-serif", sample: 'Team Name' },
        { name: 'Space Grotesk', css: "'Space Grotesk', sans-serif", sample: 'Team Name' },
        { name: 'DM Sans', css: "'DM Sans', sans-serif", sample: 'Team Name' },
        { name: 'Syne', css: "'Syne', sans-serif", sample: 'Team Name' },
        { name: 'Urbanist', css: "'Urbanist', sans-serif", sample: 'Team Name' },
        { name: 'Manrope', css: "'Manrope', sans-serif", sample: 'Team Name' },
        { name: 'Plus Jakarta Sans', css: "'Plus Jakarta Sans', sans-serif", sample: 'Team Name' },
    ],
    display: [
        { name: 'Black Han Sans', css: "'Black Han Sans', sans-serif", sample: 'Team Name' },
        { name: 'Boogaloo', css: "'Boogaloo', sans-serif", sample: 'Team Name' },
        { name: 'Righteous', css: "'Righteous', sans-serif", sample: 'Team Name' },
        { name: 'Russo One', css: "'Russo One', sans-serif", sample: 'TEAM NAME' },
        { name: 'Exo 2', css: "'Exo 2', sans-serif", sample: 'Team Name' },
        { name: 'Audiowide', css: "'Audiowide', sans-serif", sample: 'Team Name' },
        { name: 'Orbitron', css: "'Orbitron', sans-serif", sample: 'TEAM' },
        { name: 'Chakra Petch', css: "'Chakra Petch', sans-serif", sample: 'Team Name' },
    ],
    retro: [
        { name: 'Abril Fatface', css: "'Abril Fatface', serif", sample: 'Team Name' },
        { name: 'Alfa Slab One', css: "'Alfa Slab One', serif", sample: 'Team Name' },
        { name: 'Bangers', css: "'Bangers', sans-serif", sample: 'Team Name' },
        { name: 'Fredoka One', css: "'Fredoka One', sans-serif", sample: 'Team Name' },
        { name: 'Pacifico', css: "'Pacifico', cursive", sample: 'Team Name' },
        { name: 'Permanent Marker', css: "'Permanent Marker', cursive", sample: 'Team Name' },
        { name: 'Rye', css: "'Rye', serif", sample: 'Team Name' },
        { name: 'Uncial Antiqua', css: "'Uncial Antiqua', serif", sample: 'Team Name' },
    ]
};

let currentFontCategory = 'athletic';
let selectedFont = 'system-ui';
let selectedTransform = 'none';
let selectedGradientDir = 'to right';

function loadGoogleFont(fontCss) {
    if (!fontCss || !fontCss.includes("'")) return;
    const name = fontCss.match(/'([^']+)'/)?.[1];
    if (!name || document.querySelector(`link[data-font="${name}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-font', name);
    link.href = `https://fonts.googleapis.com/css2?family=${name.replace(/ /g, '+')}:wght@400;700;900&display=swap`;
    document.head.appendChild(link);
}

function renderFontGrid(category) {
    const fonts = FONT_LIBRARY[category] || [];
    const grid = $('#font-grid').empty();
    fonts.forEach(font => {
        loadGoogleFont(font.css);
        const isSelected = selectedFont === font.css;
grid.append(`
    <div class="font-choice-btn" data-css="${font.css}" data-name="${font.name}"
        style="padding:12px 8px; border-radius:8px; cursor:pointer; text-align:center;
        border:2px solid ${isSelected ? 'var(--accent-blue)' : 'var(--card-border)'};
        background:${isSelected ? 'rgba(59,130,246,0.15)' : 'rgba(0,0,0,0.2)'};
        min-height:60px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px;">
        <div style="font-family:${font.css}; font-size:14px; font-weight:900; color:${isSelected ? '#fff' : 'var(--text-dim)'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;">${font.sample}</div>
        <div style="font-size:8px; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.5px;">${font.name}</div>
    </div>`);
    });
}

function buildTextShadow() {
    const parts = [];
    const glow = parseInt($('#style-glow').val()) || 0;
    const primary = $('#style-primary-color').val();
    if (glow > 0) {
        parts.push(`0 0 ${glow}px ${primary}`);
        parts.push(`0 0 ${glow * 2}px ${primary}80`);
    }
    const sx = $('#style-shadow-x').val() || 0;
    const sy = $('#style-shadow-y').val() || 0;
    const sblur = $('#style-shadow-blur').val() || 0;
    const scolor = $('#style-shadow-color').val() || '#000000';
    if (parseInt(sx) !== 0 || parseInt(sy) !== 0 || parseInt(sblur) !== 0) {
        parts.push(`${sx}px ${sy}px ${sblur}px ${scolor}`);
    }
    return parts.join(', ') || 'none';
}

function applyTeamStyleToElement(el, saved) {
    if (!el) return;
    el.style.fontFamily = saved.fontFamily || 'inherit';
    el.style.fontWeight = '900';
    el.style.webkitTextStroke = parseFloat(saved.outlineWidth) > 0 ? `${saved.outlineWidth}px ${saved.outlineColor || '#000'}` : '';

    const shadowParts = [];
    const glow = parseInt(saved.glow) || 0;
    if (glow > 0) {
        shadowParts.push(`0 0 ${glow}px ${saved.primaryColor}`);
        shadowParts.push(`0 0 ${glow * 2}px ${saved.primaryColor}80`);
    }
    if (parseInt(saved.shadowX||0) !== 0 || parseInt(saved.shadowY||0) !== 0 || parseInt(saved.shadowBlur||0) !== 0) {
        shadowParts.push(`${saved.shadowX||0}px ${saved.shadowY||0}px ${saved.shadowBlur||0}px ${saved.shadowColor||'#000'}`);
    }
    el.style.textShadow = shadowParts.join(', ') || '';

    if (saved.gradient && saved.gradientColor2) {
        el.style.background = `linear-gradient(${saved.gradientDir||'to right'}, ${saved.primaryColor}, ${saved.gradientColor2})`;
        el.style.webkitBackgroundClip = 'text';
        el.style.webkitTextFillColor = 'transparent';
        el.style.backgroundClip = 'text';
    } else {
        el.style.color = saved.primaryColor || '#fff';
        el.style.background = '';
        el.style.webkitBackgroundClip = '';
        el.style.webkitTextFillColor = '';
    }
}
async function loadTeamStyleFromMFL(fidToLoad) {
    try {
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/csetup?L=${lid}&FRANCHISES=${fidToLoad}&C=FCUSTOM`, { credentials: 'include' });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        
        // Debug — log ALL textarea values found
        doc.querySelectorAll('textarea').forEach(ta => {
            console.log('TEXTAREA:', ta.name, ta.id, '|', ta.value.substring(0, 100));
        });

        const notes = doc.querySelector(`#NOTES${fidToLoad}`)?.value || 
                      doc.querySelector(`[name="NOTES${fidToLoad}"]`)?.value || '';
        console.log('Notes for', fidToLoad, ':', notes.substring(0, 200));
        
        const match = notes.match(/\[\[STYLE:(.*?)\]\]/s);
        if (match) {
            console.log('Found style for', fidToLoad);
            return JSON.parse(match[1]);
        } else {
            console.log('No style block found for', fidToLoad);
        }
    } catch(e) { console.warn('Could not load team style', e); }
    return null;
}

async function saveTeamStyleToMFL(styleObj, fidOverride) {
    const realFid = fidOverride || (myFid === '0000' ? fid : myFid).padStart(4,'0');
    try {
        const pageRes = await fetch(`https://www45.myfantasyleague.com/${year}/csetup?L=${lid}&FRANCHISES=${myFid}&C=FCUSTOM`, { credentials: 'include' });
        const pageDoc = new DOMParser().parseFromString(await pageRes.text(), 'text/html');
        const inputExpires = pageDoc.querySelector('input[name="input_expires"]')?.value || '';
        const uploadKey = pageDoc.querySelector('#UPLOAD_KEY')?.value || '';

        // Preserve any existing notes content outside our block, then append/replace our block
        const existingNotes = pageDoc.querySelector(`#NOTES${myFid}`)?.value || '';
        const stripped = existingNotes.replace(/\[\[STYLE:.*?\]\]/s, '').trim();
        const newNotes = (stripped ? stripped + '\n' : '') + `[[STYLE:${JSON.stringify(styleObj)}]]`;

        const params = new URLSearchParams();
        params.set('form_name', 'customize');
        params.set('LEAGUE_ID', lid);
        params.set('C', 'FCUSTOM');
        params.set('FRANCHISES', myFid);
        params.set('input_expires', inputExpires);
        params.set('UPLOAD_KEY', uploadKey);
        params.set(`FRANCHISE_ABBREV${myFid}`, pageDoc.querySelector(`#FRANCHISE_ABBREV${myFid}`)?.value || '');
        params.set(`FRANCHISE_STADIUM${myFid}`, pageDoc.querySelector(`#FRANCHISE_STADIUM${myFid}`)?.value || '');
        params.set(`FRANCHISE_ICON${myFid}`, pageDoc.querySelector(`#FRANCHISE_ICON${myFid}`)?.value || '');
        params.set(`FRANCHISE_LOGO${myFid}`, pageDoc.querySelector(`#FRANCHISE_LOGO${myFid}`)?.value || '');
        params.set(`NOTES${myFid}`, newNotes);
        params.set('SUBMIT', 'Save Franchise Customization');

        await fetch(`https://www45.myfantasyleague.com/${year}/csetup`, {
            method: 'POST', credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });
        return true;
    } catch(e) {
        console.warn('Could not save team style', e);
        return false;
    }
}
function applyTeamStyle(saved, fidToApply) {
    if (!fidToApply) fidToApply = myFid;
    if (!saved) saved = JSON.parse(localStorage.getItem(`franchise_style_${fidToApply}`) || '{}');
    if (!saved.primaryColor && !saved.fontFamily) return;
    loadGoogleFont(saved.fontFamily || '');

    const shadowParts = [];
    const glow = parseInt(saved.glow) || 0;
    if (glow > 0) {
        shadowParts.push(`0 0 ${glow}px ${saved.primaryColor}`);
        shadowParts.push(`0 0 ${glow * 2}px ${saved.primaryColor}80`);
    }
    if (parseInt(saved.shadowX||0) !== 0 || parseInt(saved.shadowY||0) !== 0 || parseInt(saved.shadowBlur||0) !== 0) {
        shadowParts.push(`${saved.shadowX||0}px ${saved.shadowY||0}px ${saved.shadowBlur||0}px ${saved.shadowColor||'#000'}`);
    }
    const shadow = shadowParts.join(', ') || 'none';
    const outline = parseFloat(saved.outlineWidth) > 0
        ? `-webkit-text-stroke: ${saved.outlineWidth}px ${saved.outlineColor||'#000'};`
        : '';

    let colorCss = '';
    if (saved.gradient && saved.gradientColor2) {
        colorCss = `
            background: linear-gradient(${saved.gradientDir||'to right'}, ${saved.primaryColor}, ${saved.gradientColor2}) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
        `;
    } else {
        colorCss = `color: ${saved.primaryColor} !important;`;
    }

    const css = `
        [data-team-style="${fidToApply}"] {
            font-family: ${saved.fontFamily || 'inherit'} !important;
            font-weight: 900 !important;
            text-shadow: ${shadow} !important;
            ${outline}
            ${colorCss}
        }
    `;

    // One style tag per franchise
    let styleTag = document.getElementById(`team-style-${fidToApply}`);
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = `team-style-${fidToApply}`;
        document.head.appendChild(styleTag);
    }
    styleTag.textContent = css;
}


async function saveAllTeamStylesToHomepage() {
    try {
        const stylesJson = JSON.stringify(window._teamStyles || {});
        const params = new URLSearchParams();
        params.set('LEAGUE_ID', lid);
        params.set('NAME', 'message9');
        params.set('MSG', `<!--TEAMSTYLES:${stylesJson}-->`);
        params.set('LABEL', '');
        params.set('IN_HEADER', 'Yes');
        params.set('IN_FOOTER', 'Yes');

        const res = await fetch(`https://www45.myfantasyleague.com/${year}/message`, {
            method: 'POST', credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });
        console.log('Saved styles, status:', res.status);
    } catch(e) {
        console.warn('Could not save team styles', e);
    }
}

async function loadAllTeamStylesFromHomepage() {
    window._teamStyles = {};
    try {
        // First try reading directly from csetup (works for all logged-in users)
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/csetup?L=${lid}&C=HMPGMSG&SEQNO=9`, { credentials: 'include' });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        const content = doc.querySelector('textarea[name="MSG"]')?.value || '';
        console.log('SEQNO 9 content length:', content.length);
        
        const match = content.match(/<!--TEAMSTYLES:(.*?)-->/s);
        if (match) {
            window._teamStyles = JSON.parse(match[1]);
            console.log('Loaded styles for:', Object.keys(window._teamStyles));
            Object.keys(window._teamStyles).forEach(paddedFid => {
                loadGoogleFont(window._teamStyles[paddedFid].fontFamily || '');
                applyTeamStyle(window._teamStyles[paddedFid], paddedFid);
            });
            return;
        }

        // Fallback — try reading from the rendered page HTML
        // MFL injects SEQNO messages into the page if IN_HEADER is Yes
        const pageText = document.documentElement.innerHTML;
        const pageMatch = pageText.match(/<!--TEAMSTYLES:(.*?)-->/s);
        if (pageMatch) {
            window._teamStyles = JSON.parse(pageMatch[1]);
            console.log('Loaded styles from page HTML for:', Object.keys(window._teamStyles));
            Object.keys(window._teamStyles).forEach(paddedFid => {
                loadGoogleFont(window._teamStyles[paddedFid].fontFamily || '');
                applyTeamStyle(window._teamStyles[paddedFid], paddedFid);
            });
            return;
        }

        console.log('No TEAMSTYLES found in either source');
    } catch(e) {
        console.warn('Could not load team styles', e);
    }
}

function reapplyAllTeamStyles() {
    if (!window._teamStyles) return;
    Object.keys(window._teamStyles).forEach(paddedFid => {
        applyTeamStyle(window._teamStyles[paddedFid], paddedFid);
console.log('CSS injected for', paddedFid, '| elements with that attr:', document.querySelectorAll(`[data-team-style="${paddedFid}"]`).length);

    });
}

function applyStylePreview() {
    const isCommishEditing = (myFid === '0000' && fid !== '0000');
    const targetFid = isCommishEditing ? fid.padStart(4,'0') : (myFid === '0000' ? fid : myFid).padStart(4,'0');
    
    // Update name and logo to show correct team
    const teamName = leagueFranchises[targetFid] || $('#settings-team-name').text();
    $('#settings-team-name').text(teamName);
    $('#settings-team-logo').attr('src', `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${targetFid}.png`);

    const primary = $('#style-primary-color').val();
    const glow = parseInt($('#style-glow').val()) || 0;
    const outlineW = parseFloat($('#style-outline-width').val()) || 0;
    const outlineColor = $('#style-outline-color').val() || '#000000';
    const sx = $('#style-shadow-x').val() || 0;
    const sy = $('#style-shadow-y').val() || 0;
    const sblur = $('#style-shadow-blur').val() || 0;
    const scolor = $('#style-shadow-color').val() || '#000000';
    const gradient = $('#style-gradient-toggle').is(':checked');
    const color2 = $('#style-gradient-color2').val();

    const shadowParts = [];
    if (glow > 0) {
        shadowParts.push(`0 0 ${glow}px ${primary}`);
        shadowParts.push(`0 0 ${glow * 2}px ${primary}80`);
    }
    if (parseInt(sx) !== 0 || parseInt(sy) !== 0 || parseInt(sblur) !== 0) {
        shadowParts.push(`${sx}px ${sy}px ${sblur}px ${scolor}`);
    }

    // Apply directly as inline styles — bypasses CSS specificity issues
    const el = document.getElementById('settings-team-name');
    if (!el) return;

    el.style.fontFamily = selectedFont;
    el.style.fontWeight = '900';
    el.style.textShadow = shadowParts.join(', ') || 'none';
    el.style.webkitTextStroke = outlineW > 0 ? `${outlineW}px ${outlineColor}` : '';

    if (gradient && color2) {
        el.style.background = `linear-gradient(${selectedGradientDir}, ${primary}, ${color2})`;
        el.style.webkitBackgroundClip = 'text';
        el.style.webkitTextFillColor = 'transparent';
        el.style.backgroundClip = 'text';
        el.style.color = '';
    } else {
        el.style.color = primary;
        el.style.background = '';
        el.style.webkitBackgroundClip = '';
        el.style.webkitTextFillColor = '';
        el.style.backgroundClip = '';
    }
}

function applyTeamTheme(targetFid, onTeamTab = false) {
    targetFid = String(targetFid).padStart(4,'0');
    const savedThemeId = localStorage.getItem('lld_theme') || 'midnight';
    const savedTheme = THEMES[savedThemeId];
    const root = document.documentElement;

    // Always restore saved theme fully first
    if (savedTheme) {
        Object.entries(savedTheme.vars).forEach(([key, val]) => root.style.setProperty(key, val));
    }

    // Only overlay team vars when on team tab
    if (onTeamTab) {
        const teamTheme = TEAM_THEMES[targetFid];
        if (teamTheme) {
            Object.entries(teamTheme).forEach(([key, val]) => root.style.setProperty(key, val));
        }
    }
}








$(document).on('click', '.contracts-sort-btn', function() {
    const newSort = $(this).data('val');
    if (newSort === contractSortBy) {
        playerSortDir = playerSortDir === 'desc' ? 'asc' : 'desc';
    } else {
        contractSortBy = newSort;
        playerSortDir = 'desc';
    }
    window._teamDataDirty = true;
    loadTeamData();
});

$(document).on('click', '#contracts-filter-toggle', function() {
    playerFilterPanelOpen = !playerFilterPanelOpen;
    window._teamDataDirty = true;
    loadTeamData();
});
$(document).on('click', '#auth-guest-btn', function() {
    $('#auth-overlay').fadeOut(200);
    $('body').css('overflow', '');
});
// Sort direction toggle
$(document).on('click', '.player-sort-btn', function() {
    const newSort = $(this).data('sort');
    if (newSort === playerSortBy) {
        playerSortDir = playerSortDir === 'desc' ? 'asc' : 'desc';
    } else {
        playerSortBy = newSort;
        playerSortDir = 'desc';
    }
    const activeSubBtn = $('#subtabs-players .sub-tab-btn.active');
    const subId = activeSubBtn.length ? activeSubBtn.text().trim().toLowerCase().replace(' ', '-') : 'free-agents';
    const isFAView = subId === 'free-agents';
    const cacheKey = `${subId}_${playerPosFilter}`;
    const container = $('#players-content-container');
    container.html(getPlayerFilterBarHtml(isFAView));
    if (window._playerRowsCache?.[cacheKey]) {
        renderPlayersFromRows(window._playerRowsCache[cacheKey], isFAView, container, subId);
    } else {
        loadPlayersData(subId);
    }
});
// Filter panel toggle
$(document).on('click', '#player-filter-toggle', function() {
    playerFilterPanelOpen = !playerFilterPanelOpen;
    const activeSubBtn = $('#subtabs-players .sub-tab-btn.active');
    const subId = activeSubBtn.length ? activeSubBtn.text().trim().toLowerCase().replace(' ', '-') : 'all-players';
    loadPlayersData(subId);
});

// Range slider live label update
$(document).on('input', '.filter-range-min, .filter-range-max', function() {
    const filterId = $(this).data('filter');
    const prefix = $(this).data('prefix') || '';
    const suffix = $(this).data('suffix') || '';
    const minEl = $(`.filter-range-min[data-filter="${filterId}"]`);
    const maxEl = $(`.filter-range-max[data-filter="${filterId}"]`);
    let minVal = parseInt(minEl.val());
    let maxVal = parseInt(maxEl.val());

    // Prevent crossing
    if (minVal > maxVal) {
        if ($(this).hasClass('filter-range-min')) { minVal = maxVal; minEl.val(minVal); }
        else { maxVal = minVal; maxEl.val(maxVal); }
    }

    playerFilters[filterId] = [minVal, maxVal];
    $(`#filter-label-${filterId}`).text(`${prefix}${minVal}${suffix} – ${prefix}${maxVal}${suffix}`);

    // Update track fill
    const min = parseInt(minEl.attr('min'));
    const max = parseInt(minEl.attr('max'));
    const pct1 = ((minVal - min) / (max - min)) * 100;
    const pct2 = ((maxVal - min) / (max - min)) * 100;
    $(`#filter-track-${filterId}`).css({ left: pct1 + '%', right: (100 - pct2) + '%' });
});

$(document).on('click', '#filter-apply-btn', function() {
    playerFiltersActive = true;
    const onContracts = $('#subtabs-team .sub-tab-btn.active').text().trim().toLowerCase() === 'contracts';
    if (onContracts) { window._teamDataDirty = true; loadTeamData(); }
    else { const subId = $('#subtabs-players .sub-tab-btn.active').text().trim().toLowerCase().replace(' ', '-') || 'all-players'; loadPlayersData(subId); }
});

$(document).on('click', '#filter-reset-btn', function() {
    playerFilters = { years: [1, 5], salary: [0, 200], guar: [0, 100], capHit: [0, 500] };
    playerFiltersActive = false;
    const onContracts = $('#subtabs-team .sub-tab-btn.active').text().trim().toLowerCase() === 'contracts';
    if (onContracts) { window._teamDataDirty = true; loadTeamData(); }
    else { const subId = $('#subtabs-players .sub-tab-btn.active').text().trim().toLowerCase().replace(' ', '-') || 'all-players'; loadPlayersData(subId); }
});
$(document).on('click', '.font-cat-btn', function(e) {
    e.stopPropagation();
    currentFontCategory = $(this).data('cat');
    $('.font-cat-btn').css({ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', borderColor: 'var(--card-border)' });
    $(this).css({ background: 'var(--accent-blue)', color: '#fff', borderColor: 'var(--accent-blue)' });
    renderFontGrid(currentFontCategory);
});

$(document).on('click touchend', '.font-choice-btn', function(e) {
    e.stopPropagation();
    if (e.type === 'touchend') e.preventDefault();
    selectedFont = $(this).data('css');
    loadGoogleFont(selectedFont);
    renderFontGrid(currentFontCategory);
    applyStylePreview();
});
$(document).on('click', '.theme-option-btn', function() {
    applyTheme($(this).data('theme'));
});

$(document).on('click', '.transform-btn', function(e) {
    e.stopPropagation();
    selectedTransform = $(this).data('val');
    $('.transform-btn').css({ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', borderColor: 'var(--card-border)' });
    $(this).css({ background: 'var(--accent-blue)', color: '#fff', borderColor: 'var(--accent-blue)' });
    applyStylePreview();
});

$(document).on('click', '.gradient-dir-btn', function(e) {
    e.stopPropagation();
    selectedGradientDir = $(this).data('dir');
    $('.gradient-dir-btn').css({ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', borderColor: 'var(--card-border)' });
    $(this).css({ background: 'var(--accent-blue)', color: '#fff', borderColor: 'var(--accent-blue)' });
    applyStylePreview();
});

$(document).on('input', '#style-primary-color, #style-font-size, #style-glow, #style-outline-width, #style-outline-color, #style-shadow-x, #style-shadow-y, #style-shadow-blur, #style-shadow-color, #style-letter-spacing, #style-gradient-color2', function() {
    const id = $(this).attr('id');
    if (id === 'style-primary-color') $('#style-primary-hex').text($(this).val());
    if (id === 'style-font-size') $('#style-size-lbl').text($(this).val() + 'px');
    if (id === 'style-glow') $('#style-glow-lbl').text($(this).val() + 'px');
    if (id === 'style-outline-width') $('#style-outline-lbl').text($(this).val() + 'px');
    if (id === 'style-letter-spacing') $('#style-spacing-lbl').text($(this).val() + 'px');
    if (id === 'style-gradient-color2') $('#style-gradient-hex2').text($(this).val());
    applyStylePreview();
});

$(document).on('change', '#style-gradient-toggle', function() {
    $('#style-gradient-controls').css('display', $(this).is(':checked') ? 'flex' : 'none');
    applyStylePreview();
});
$(document).on('click', '#settings-commish-toggle', function() {
    if (window._commishToggleUrl) {
        window.location.href = window._commishToggleUrl;
    }
});

// Open settings
$(document).on('click touchend', '.open-settings-btn', function(e) {
    if (e.type === 'touchend') e.preventDefault();
    syncAllBranding();
    const currentScale = parseFloat(localStorage.getItem('lld_text_scale')) || 1;
    $('.text-scale-btn').css({ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', borderColor: 'var(--card-border)' });
    $(`.text-scale-btn[data-scale="${currentScale}"]`).css({ background: 'var(--accent-blue)', color: '#fff', borderColor: 'var(--accent-blue)' });
    $('.settings-tab-content').hide();
    $('#tab-team-set').show();
    $('.settings-tab-btn').removeClass('active');
    $('.settings-tab-btn[data-target="tab-team-set"]').addClass('active');
    $('#team-settings-modal').css('display', 'flex').hide().fadeIn(200, function() {
        updateLogoStyleButtons();
    });
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
});

// Close settings
$(document).on('click touchend', '#team-settings-modal', function(e) {
    if ($(e.target).closest('.settings-modal-box').length) return;
    $('#team-settings-modal').fadeOut(200);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
});

// Tab switching
$(document).on('click', '.settings-tab-btn', function() {
    $('.settings-tab-btn').removeClass('active');
    $(this).addClass('active');
    $('.settings-tab-content').hide();
    $('#' + $(this).data('target')).show();
    if ($(this).data('target') === 'tab-style') {
        renderFontGrid(currentFontCategory);
        setTimeout(applyStylePreview, 100);
    }
});

// Display sub-tabs
$(document).on('click', '.display-sub-tab', function() {
    $('.display-sub-tab').css({ background: 'transparent', color: 'var(--text-dim)' });
    $(this).css({ background: 'var(--accent-blue)', color: '#fff' });
    $('.display-sub-content').hide();
    $(`.display-sub-content[data-sub="${$(this).data('sub')}"]`).show();
});

// Style sub-tabs
$(document).on('click', '.style-sub-tab', function() {
    $('.style-sub-tab').css({ background: 'transparent', color: 'var(--text-dim)' });
    $(this).css({ background: 'var(--accent-blue)', color: '#fff' });
    $('.style-sub-content').hide();
    $(`.style-sub-content[data-sub="${$(this).data('sub')}"]`).show();
    if ($(this).data('sub') === 'font') renderFontGrid(currentFontCategory);
});

// Background buttons
$(document).off('click', '.text-scale-btn').on('click', '.text-scale-btn', function() {
    applyTextScale(parseFloat($(this).data('scale')));
});

$(document).on('click', '.bg-style-btn', function() {
    document.documentElement.style.setProperty('--page-bg-image', 'none');
    localStorage.removeItem('lld_bg_url');
    $('.bg-thumb-btn').css('borderColor', 'transparent');
    $(this).css({ background: 'var(--accent-blue)', color: '#fff' });
    localStorage.setItem('lld_bg_style', 'solid');
});

$(document).on('click', '.bg-thumb-btn', function() {
    const url = $(this).data('url');
    document.documentElement.style.setProperty('--page-bg-image', `url(${url})`);
    localStorage.setItem('lld_bg_url', url);
    $('.bg-thumb-btn').css('borderColor', 'transparent');
    $(this).css('borderColor', 'var(--accent-blue)');
    $('.bg-style-btn').css({ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)' });
});


$(document).on('click', '#style-save-btn', async function() {
    $(this).text('Saving...').prop('disabled', true);
    const isCommishEditing = (myFid === '0000' && fid !== '0000');
    const targetFid = isCommishEditing ? fid.padStart(4,'0') : (myFid === '0000' ? fid : myFid).padStart(4,'0');
    const style = {
        primaryColor: $('#style-primary-color').val(),
        fontFamily: selectedFont,
        glow: $('#style-glow').val(),
        outlineWidth: $('#style-outline-width').val(),
        outlineColor: $('#style-outline-color').val(),
        shadowX: $('#style-shadow-x').val(),
        shadowY: $('#style-shadow-y').val(),
        shadowBlur: $('#style-shadow-blur').val(),
        shadowColor: $('#style-shadow-color').val(),
        gradient: $('#style-gradient-toggle').is(':checked'),
        gradientColor2: $('#style-gradient-color2').val(),
        gradientDir: selectedGradientDir
    };
    if (!window._teamStyles) window._teamStyles = {};
    window._teamStyles[targetFid] = style;
    localStorage.setItem(`franchise_style_${targetFid}`, JSON.stringify(style));
await saveTeamStyleToMFL(style, targetFid);    await saveAllTeamStylesToHomepage();
    applyTeamStyle(style, targetFid);
    $('#style-save-status').text('✓ Saved').css('color', 'var(--accent-blue)');
    setTimeout(() => $('#style-save-status').text(''), 2000);
    $(this).text('Save Style').prop('disabled', false);
});

$(document).on('click', '#style-reset-btn', function() {
    localStorage.removeItem(`franchise_style_${myFid}`);
    selectedFont = 'system-ui';
    selectedTransform = 'none';
    selectedGradientDir = 'to right';
    $('#style-primary-color').val('#3b82f6');
    $('#style-primary-hex').text('#3b82f6');
    $('#style-font-size').val(18); $('#style-size-lbl').text('18px');
    $('#style-glow').val(0); $('#style-glow-lbl').text('0px');
    $('#style-outline-width').val(0); $('#style-outline-lbl').text('0px');
    $('#style-shadow-x, #style-shadow-y, #style-shadow-blur').val(0);
    $('#style-letter-spacing').val(0); $('#style-spacing-lbl').text('0px');
    $('#style-gradient-toggle').prop('checked', false);
    $('#style-gradient-controls').hide();
    renderFontGrid(currentFontCategory);
    applyStylePreview();
    applyTeamStyle();
    $('#style-save-status').text('✓ Reset').css('color', '#f59e0b');
    setTimeout(() => $('#style-save-status').text(''), 2000);
});

$(document).on('click touchend', '.open-settings-btn', function() {
    // Remove any existing banner first
    $('#style-commish-banner').remove();

    // Hide commish controls for non-commish users
    if (myFid !== '0000' && myFid !== '0001') {
        $('#toggle-resign-btn, #toggle-fa-mode-btn').closest('div[style*="border-top"]').hide();
    }

    // Sync commish toggle states for commish users
    if (myFid === '0000') {
        const resignOpen = localStorage.getItem(`resign_open_${lid}`) !== 'false';
        updateResignToggleUI(resignOpen);
        const faMode = localStorage.getItem(`fa_mode_${lid}`) !== 'false';
        updateFaModeToggleUI(faMode);
    }
    
    const isCommishEditing = (myFid === '0000' && fid !== '0000');
    const targetFid = isCommishEditing ? fid.padStart(4,'0') : (myFid === '0000' ? fid : myFid).padStart(4,'0');
    
    if (isCommishEditing) {
        $('#tab-style').find('div:first').prepend(`
            <div id="style-commish-banner" style="padding:8px 12px; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); border-radius:8px; margin-bottom:8px; font-size:10px; font-weight:900; color:#f59e0b;">
                👑 Editing style for: ${leagueFranchises[targetFid] || targetFid}
            </div>
        `);
    }

    const saved = window._teamStyles?.[targetFid] || 
                  JSON.parse(localStorage.getItem(`franchise_style_${targetFid}`) || '{}');
    
    selectedFont = saved.fontFamily || 'system-ui';
    selectedTransform = saved.textTransform || 'none';
    selectedGradientDir = saved.gradientDir || 'to right';
    if (saved.primaryColor) { $('#style-primary-color').val(saved.primaryColor); $('#style-primary-hex').text(saved.primaryColor); }
    if (saved.glow) { $('#style-glow').val(saved.glow); $('#style-glow-lbl').text(saved.glow + 'px'); }
    if (saved.outlineWidth) { $('#style-outline-width').val(saved.outlineWidth); $('#style-outline-lbl').text(saved.outlineWidth + 'px'); }
    if (saved.outlineColor) $('#style-outline-color').val(saved.outlineColor);
    if (saved.shadowX) $('#style-shadow-x').val(saved.shadowX);
    if (saved.shadowY) $('#style-shadow-y').val(saved.shadowY);
    if (saved.shadowBlur) $('#style-shadow-blur').val(saved.shadowBlur);
    if (saved.shadowColor) $('#style-shadow-color').val(saved.shadowColor);
    if (saved.gradient) { $('#style-gradient-toggle').prop('checked', true); $('#style-gradient-controls').show(); }
    if (saved.gradientColor2) { $('#style-gradient-color2').val(saved.gradientColor2); $('#style-gradient-hex2').text(saved.gradientColor2); }
    renderFontGrid(currentFontCategory);
    setTimeout(applyStylePreview, 100);
});
// --- FETCH PLAYER AVERAGES & RANKS ---
    async function fetchPlayerAverages() {
        try {
            const targetYear = parseInt(year) - 1; 
            const positions = ['QB', 'RB', 'WR', 'TE', 'PK', 'DE', 'DT', 'LB', 'CB', 'S'];
            
            const fetchPromises = positions.map(pos => {
                const isIDP = ['DE', 'DT', 'LB', 'CB', 'S'].includes(pos);
                const searchType = isIDP ? 'ADVANCED' : 'BASIC';
                const display = isIDP ? 'Defenders' : 'points';

                // Added &COUNT=300 and &SORT=AVG
                const url = `https://www45.myfantasyleague.com/${year}/top?L=${lid}&SEARCHTYPE=${searchType}&COUNT=300&YEAR=${targetYear}&START_WEEK=1&END_WEEK=18&CATEGORY=overall&POSITION=${pos}&DISPLAY=${display}&TEAM=*&SORT=AVG`;
                
                return fetch(url, { credentials: 'include', cache: 'no-store' })
                    .then(res => res.text())
                    .then(html => ({ pos, html })); // Pass the position string along with the HTML!
            });

            const results = await Promise.all(fetchPromises);

            results.forEach(({ pos, html }) => {
                const doc = new DOMParser().parseFromString(html, 'text/html');
                let posPlayers = []; // Temp array to hold players for this specific position

                doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
                    const pLink = row.querySelector('td.player a[class*="position_"]');
                    const avgTd = row.querySelector('td.avg') || row.querySelector('td.points.avg') || row.querySelectorAll('td')[3];
                    
                    if (pLink && avgTd) {
                        const pid = pLink.getAttribute('href').match(/\d+/g)?.pop();
                        if (pid) {
                            const avg = parseFloat(avgTd.textContent) || 0;
                            playerAverages[pid] = avg;
                            posPlayers.push({ pid: pid, avg: avg });
                        }
                    }
                });

                // Sort descending by average to guarantee accuracy
                posPlayers.sort((a, b) => b.avg - a.avg);

                // Assign the 1-through-300 Rank!
                posPlayers.forEach((p, index) => {
                    playerRanks[p.pid] = index + 1;
                });
            });
        } catch (err) {
            console.error("Failed to fetch player averages & ranks", err);
        }
    }
// --- FETCH POINTS ALLOWED (DEFENSIVE MATCHUPS & RANKS) ---
    async function fetchPointsAllowed() {
        try {
            const paRes = await fetch(`https://www45.myfantasyleague.com/2025/options?L=${lid}&O=81`, { credentials: 'include', cache: 'no-store' });
            const paText = await paRes.text();
            const paDoc = new DOMParser().parseFromString(paText, 'text/html');

            paDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
                const teamLink = row.querySelector('td.player a');
                if (!teamLink) return;

                const teamMatch = teamLink.getAttribute('href').match(/TEAM=([A-Z]+)/i);
                if (!teamMatch) return;
                const teamAbbr = teamMatch[1].toUpperCase();

                const cells = row.querySelectorAll('td.points');
                if (cells.length >= 20) {
                    pointsAllowedMap[teamAbbr] = {
                        "QB": cells[1].textContent.trim(), "RB": cells[3].textContent.trim(),
                        "WR": cells[5].textContent.trim(), "TE": cells[7].textContent.trim(),
                        "PK": cells[9].textContent.trim(), "DT": cells[11].textContent.trim(),
                        "DE": cells[13].textContent.trim(), "LB": cells[15].textContent.trim(),
                        "CB": cells[17].textContent.trim(), "S":  cells[19].textContent.trim()
                    };
                }
            });

            // --- CALCULATE THE 1-32 RANKS FOR EVERY POSITION ---
            const positions = ["QB", "RB", "WR", "TE", "PK", "DT", "DE", "LB", "CB", "S"];
            positions.forEach(pos => {
                let teamsList = [];
                for (let team in pointsAllowedMap) {
                    teamsList.push({ team: team, pts: parseFloat(pointsAllowedMap[team][pos]) || 0 });
                }
                
                // Sort from lowest points allowed (Rank 1 / Tough) to highest (Rank 32 / Easy)
                teamsList.sort((a, b) => a.pts - b.pts);
                
                pointsAllowedRankMap[pos] = {};
                teamsList.forEach((item, index) => {
                    pointsAllowedRankMap[pos][item.team] = index + 1;
                });
            });

        } catch (err) {
            console.error("Failed to fetch points allowed data", err);
        }
    }
// --- FETCH PENDING WAIVER CLAIMS (NOT YET PROCESSED) ---
async function fetchPendingWaivers() {
    window._pendingWaivers = {};
    try {
        const targetFid = (fid === '0000' ? myFid : fid);
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=93&F=${targetFid}&rnd=${Date.now()}`, { credentials: 'include', cache: 'no-store' });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');

        doc.querySelectorAll('table.report').forEach(table => {
            table.querySelectorAll('tr.oddtablerow, tr.eventablerow').forEach(row => {
                const playerLinks = Array.from(row.querySelectorAll('a[class*="position_"]'));
                if (playerLinks.length === 0) return;

                // First player link = the claim (add), second (if present) = the drop
                const addLink = playerLinks[0];
                const dropLink = playerLinks[1] || null;

                const addPidMatch = addLink.getAttribute('href').match(/\d+/g);
                const addPid = addPidMatch ? addPidMatch.pop() : null;
                if (!addPid) return;

                let dropName = null;
                if (dropLink) {
                    const dParsed = parseMFLName(dropLink.textContent);
                    dropName = dParsed.shortName || dParsed.name;
                }

                const cells = Array.from(row.querySelectorAll('td'));
                const priorityCell = cells.find(td => /^\d+$/.test(td.textContent.trim()));
                const priority = priorityCell ? priorityCell.textContent.trim() : null;
                const dateCell = cells[cells.length - 1];
                const dateText = dateCell ? dateCell.textContent.trim() : '';

                window._pendingWaivers[addPid] = { dropName, priority, dateText };
            });
        });

        console.log('Pending waivers loaded:', Object.keys(window._pendingWaivers).length);
    } catch (err) {
        console.error("Failed to fetch pending waiver claims", err);
    }
}
 // --- 1. DATA FETCHING ---
// --- 1. DATA FETCHING ---
async function fetchMasterStatus() {
    irPlayers = []; taxiPlayers = []; injuryMap = {};
    const nflMap = { "Cardinals":"ARI", "Falcons":"ATL", "Ravens":"BAL", "Bills":"BUF", "Panthers":"CAR", "Bears":"CHI", "Bengals":"CIN", "Browns":"CLE", "Cowboys":"DAL", "Broncos":"DEN", "Lions":"DET", "Packers":"GBP", "Texans":"HOU", "Colts":"IND", "Jaguars":"JAC", "Chiefs":"KCC", "Raiders":"LVR", "Chargers":"LAC", "Rams":"LAR", "Dolphins":"MIA", "Vikings":"MIN", "Patriots":"NEP", "Saints":"NOS", "Giants":"NYG", "Jets":"NYJ", "Eagles":"PHI", "Steelers":"PIT", "49ers":"SFO", "Seahawks":"SEA", "Buccaneers":"TBB", "Titans":"TEN", "Commanders":"WAS" };

    try {
        const irRes = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=18&F=${fid}&rnd=${Date.now()}`, { credentials: 'include' });
        const irDoc = new DOMParser().parseFromString(await irRes.text(), 'text/html');
        
        const taxiRes = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=98&F=${fid}&rnd=${Date.now()}`, { credentials: 'include' });
        const taxiDoc = new DOMParser().parseFromString(await taxiRes.text(), 'text/html');

        const rosRes = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=${fid}&rnd=${Date.now()}`, { credentials: 'include' });
        const rosDoc = new DOMParser().parseFromString(await rosRes.text(), 'text/html');

// Populate Rookie Set
        rosDoc.querySelectorAll('td.player').forEach(td => {
            if (td.textContent.includes('(R)')) {
                const pid = td.querySelector('a')?.getAttribute('href').match(/\d+/g)?.pop();
                if (pid) rookiePids.add(pid);
            }
        });

        // Populate Injury Map
        [irDoc, taxiDoc, rosDoc].forEach(doc => {
            doc.querySelectorAll('td a[class*="position_"]').forEach(a => {
                const pid = a.getAttribute('href').match(/\d+/g)?.pop();
                const row = a.closest('tr');
                if (pid && row) {
                    const injSpan = row.querySelector('.injurystatus') || row.querySelector('span.warning[title]');
                    if (injSpan && injSpan.textContent.trim().length <= 3) {
                        injuryMap[pid] = { text: injSpan.textContent.trim(), title: injSpan.getAttribute('title') || '' };
                    }
                }
            });
        });

        // NEW: ROBUST IR PARSING (Filters for the correct table)
        irDoc.querySelectorAll('table.report').forEach(table => {
            const firstTh = table.querySelector('th');
            // THE FIX: Check specifically for "activate from" so "deactivate" doesn't trigger it
            if (firstTh && firstTh.textContent.toLowerCase().includes('activate from')) {
                table.querySelectorAll('tr.oddtablerow, tr.eventablerow').forEach(row => {
                    const nameLink = row.querySelector('td.player a, td a[class*="position_"]');
                    if (!nameLink) return;

                    const pid = nameLink.getAttribute('href').match(/\d+/g)?.pop();
                    if (!pid) return;

                    irPids.add(pid);
                    const p = parseMFLName(nameLink.textContent);
                    let sec = "BYE";
                    let titleMatch = (nameLink.getAttribute('title') || "").match(/Week \d+:\s*(.*)/);
                    if (titleMatch) {
                        sec = titleMatch[1].replace(' ET', '').trim();
                        Object.keys(nflMap).forEach(t => { sec = sec.replace(t, nflMap[t]); });
                    }

                    const firstTd = row.querySelector('td');
                    let isLocked = false;
                    let lockMsg = "";
                    const warningSpan = firstTd?.querySelector('span.warning');
                    
                    if (warningSpan && warningSpan.textContent.toLowerCase().includes('cannot')) {
                        isLocked = true;
                        lockMsg = warningSpan.textContent.trim();
                    } else if (firstTd && !firstTd.querySelector('input[type="checkbox"]')) {
                        isLocked = true;
                        lockMsg = "Locked on IR";
                    }

                    irPlayers.push({ pid: pid, name: p.name, shortName: p.shortName, lastName: p.lastName, pos: p.pos, team: p.team, status: 'IR', sec: sec, locked: isLocked, lockMsg: lockMsg });
                });
            }
        });

        // NEW: ROBUST TAXI PARSING (Filters for the correct table)
        taxiDoc.querySelectorAll('table.report').forEach(table => {
            const firstTh = table.querySelector('th');
            if (firstTh && firstTh.textContent.toLowerCase().includes('promote')) {
                table.querySelectorAll('tr.oddtablerow, tr.eventablerow').forEach(row => {
                    const nameLink = row.querySelector('td.player a, td a[class*="position_"]');
                    if (!nameLink) return;

                    const pid = nameLink.getAttribute('href').match(/\d+/g)?.pop();
                    if (!pid) return;

                    taxiPids.add(pid);
                    const p = parseMFLName(nameLink.textContent);
                    let sec = "BYE";
                    let titleMatch = (nameLink.getAttribute('title') || "").match(/Week \d+:\s*(.*)/);
                    if (titleMatch) {
                        sec = titleMatch[1].replace(' ET', '').trim();
                        Object.keys(nflMap).forEach(t => { sec = sec.replace(t, nflMap[t]); });
                    }

                    const firstTd = row.querySelector('td');
                    let isLocked = false;
                    let lockMsg = "";
                    const warningSpan = firstTd?.querySelector('span.warning');
                    
                    if (warningSpan && warningSpan.textContent.toLowerCase().includes('cannot')) {
                        isLocked = true;
                        lockMsg = warningSpan.textContent.trim();
                    } else if (firstTd && !firstTd.querySelector('input[type="checkbox"]')) {
                        isLocked = true;
                        lockMsg = "Locked on Taxi";
                    }

                    taxiPlayers.push({ pid: pid, name: p.name, shortName: p.shortName, lastName: p.lastName, pos: p.pos, team: p.team, status: 'TS', sec: sec, locked: isLocked, lockMsg: lockMsg });
                });
            }
        });
    } catch (err) { console.error("Master Status Error", err); }
}

// --- LOAD TEAM DATA & DRAFT PICKS ---
async function loadTeamData() {
    try {
        applyTeamTheme(fid, true);
const activeSub = $('#subtabs-team .sub-tab-btn.active').text().trim().toLowerCase() || 'lineup';

        // Use cache if available and same fid/sub
        const cacheKey = `${fid}_${activeSub}`;
if (window._teamDataCache && window._teamDataCacheKey === cacheKey && !window._teamDataDirty) {
    currentDoc = window._teamDataCache;
    window.currentTeamPicks = window._teamPicksCache || [];
    console.log('Using cache, picks:', window.currentTeamPicks?.length);
    renderActiveTab();
    return;
}
        window._teamDataDirty = false;
        const isCommish = true; 
        
        let targetURL = (activeSub.includes('lineup')) ? `https://www45.myfantasyleague.com/${year}/lineup?L=${lid}&F=${fid}&rnd=${Date.now()}` : `https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=${fid}&rnd=${Date.now()}`;
        
        // 1. Future Picks Grid (For 2027+)
const picksFutureURL = `https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=100&SORT=YRF&rnd=${Date.now()}`;        
        // 2. THE FIX: Current Year Draft Order pulled directly from the Draft Results page (O=17)
        const picksCurrentURL = `https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=17&rnd=${Date.now()}`;
        
        let commishURL = (isCommish && activeSub.includes('lineup') && fid !== myFid) ? `https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=02&FRANCHISE_ID=${fid}&F=0000&rnd=${Date.now()}` : null;

        // Fetch HTML, Future Grid, and Current Order simultaneously
        let fetches = [
            fetch(targetURL, { credentials: 'include', cache: 'no-store' }),
            fetch(picksFutureURL, { credentials: 'include', cache: 'no-store' }),
            fetch(picksCurrentURL, { credentials: 'include', cache: 'no-store' }) 
        ];
        if (commishURL) fetches.push(fetch(commishURL, { credentials: 'include', cache: 'no-store' }));

const responses = await Promise.all(fetches);
        
        const html = await responses[0].text();
        currentDoc = new DOMParser().parseFromString(html, 'text/html');

if (currentDoc.title && currentDoc.title.toLowerCase().includes('error')) {
            const bodyText = (currentDoc.body?.innerText || '').replace(/\s+/g, ' ').trim();
            const match = bodyText.match(/You may not[\s\S]*?(?=Go Back|$)/i);
            const errMsg = match ? match[0].trim() : 'This action is currently unavailable.';
            $('#player-rows-container').html(`
                <div style="text-align:center; padding:50px 24px;">
                    <div style="font-size:32px; margin-bottom:14px;">⚠️</div>
                    <div style="font-size:14px; font-weight:800; color:#ef4444; line-height:1.6; max-width:340px; margin:0 auto;">${errMsg}</div>
                </div>`);
            window._teamDataDirty = true;
            return;
        }

        let draftPicks = [];
        // --- 1. FUTURE GRID PARSER (2027+) ---
// --- 1. FUTURE GRID PARSER (2027+) ---
        if (responses[1]) {
            try {
                const picksHtml = await responses[1].text();
                const pDoc = new DOMParser().parseFromString(picksHtml, 'text/html');
                
                const nameToFid2 = {};
                Object.entries(leagueFranchises).forEach(([fid2, name]) => {
                    nameToFid2[name.trim().toLowerCase()] = fid2;
                });

                pDoc.querySelectorAll('table.report').forEach(table => {
                    const caption = table.querySelector('caption span')?.textContent || '';
                    const yearMatch = caption.match(/Year (\d{4})/);
                    if (!yearMatch) return;
                    const pickYear = yearMatch[1];
                    if (pickYear === year) return;

                    let currentRound = '';
                    table.querySelectorAll('tr').forEach(row => {
                        const tds = row.querySelectorAll('td');
                        if (tds.length < 3) return;
                        const roundText = tds[0].textContent.trim().replace(/\u00a0/g, '');
                        if (roundText && /^\d+$/.test(roundText)) currentRound = roundText;
                        if (!currentRound) return;

                        const ownerName = tds[1].textContent.trim().replace(/\*/g, '').trim().toLowerCase();
                        const origName = tds[2].textContent.trim().replace(/\*/g, '').trim().toLowerCase();
                        const ownerFid2 = nameToFid2[ownerName];
                        const origFid2 = nameToFid2[origName];

                        if (!ownerFid2 || ownerFid2 !== fid) return;

                        let desc = `Round ${currentRound}`;
                        if (origFid2 && origFid2 !== fid) {
                            desc += ` (via ${leagueFranchises[origFid2]})`;
                        }
                        draftPicks.push({ year: pickYear, round: currentRound, desc });
                    });
                });
            } catch (err) { console.warn("Could not parse future grid.", err); }
        }

        // --- 2. EXACT PICK PARSER (Current Year from O=17) ---
        if (responses[2]) {
            try {
                const curHtml = await responses[2].text();
                const cDoc = new DOMParser().parseFromString(curHtml, 'text/html');
                
                cDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
                    const tds = row.querySelectorAll('td');
                    
                    // The O=17 table has at least 7 columns
                    if (tds.length >= 3) {
                        const pickStr = tds[0].textContent.trim(); 
                        const alreadyDrafted = !!row.querySelector('td.player a[class*="position_"]');
                        
                        // Looks for the exact decimal format like "1.01" or "10.12"
                        if (/^\d+\.\d+$/.test(pickStr) && !alreadyDrafted) { 
                            const fLink = tds[2].querySelector('a[class*="franchise_"]'); // td[2] is the Franchise column
                            if (fLink) {
                                const match = fLink.getAttribute('class').match(/franchise_(\d+)/);
                                const ownerFid = match ? match[1].padStart(4, '0') : null;
                                
                                // If the team we are viewing owns this specific pick
                                if (ownerFid === fid) {
                                    const roundNum = pickStr.split('.')[0];
                                    let desc = `Pick ${pickStr}`;

                                    // Parse the Comments column (td[6]) for trade info
                                    const commentsCell = tds[6];
                                    if (commentsCell) {
                                        const comments = commentsCell.textContent.trim();
                                        if (comments.includes('[Pick traded from')) {
                                            const origName = comments.replace('[Pick traded from ', '').replace('.]', '').trim();
                                            desc += ` (via ${origName})`;
                                        }
                                    }

                                    draftPicks.push({
                                        year: year,
                                        round: roundNum,
                                        pickStr: pickStr, // Store exact pick string for sorting
                                        desc: desc 
                                    });
                                }
                            }
                        }
                    }
                });
            } catch (err) { console.warn("Could not parse current year picks from O=17.", err); }
        }

        // Sort chronologically, then by round, then by exact pick
        draftPicks.sort((a, b) => {
            if (parseInt(a.year) !== parseInt(b.year)) return parseInt(a.year) - parseInt(b.year);
            if (parseInt(a.round) !== parseInt(b.round)) return parseInt(a.round) - parseInt(b.round);
            // If the exact pick string exists, sort by that (e.g. 1.01 vs 1.05)
            if (a.pickStr && b.pickStr) return parseFloat(a.pickStr) - parseFloat(b.pickStr);
            return 0;
        });
        
window._teamDataCache = currentDoc;
window._teamDataCacheKey = cacheKey;
window._teamPicksCache = draftPicks;
window.currentTeamPicks = draftPicks;
console.log('currentTeamPicks set:', draftPicks.length);
        // --- COMMISH LINEUP HANDLING ---
        window.commishDoc = null;
        if (commishURL && responses[3]) {
            const commishHtml = await responses[3].text();
            window.commishDoc = new DOMParser().parseFromString(commishHtml, 'text/html');
            
            let currentStarters = new Set();
            window.commishDoc.querySelectorAll('select').forEach(sel => {
                if (sel.name === 'FRANCHISE_ID' || sel.name === 'F') return; 
                const val = sel.value || (sel.querySelector('option[selected]') ? sel.querySelector('option[selected]').value : null);
                if (val && val !== '') currentStarters.add(val);
            });

            currentDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
                const pLink = row.querySelector('td.player a[class*="position_"]');
                if (pLink) {
                    const pid = pLink.getAttribute('href').match(/\d+/g).pop();
                    if (!row.querySelector('input[type="checkbox"]')) {
                        const cb = currentDoc.createElement('input');
                        cb.type = 'checkbox'; cb.value = pid; cb.checked = currentStarters.has(pid);
                        row.appendChild(cb); 
                    }
                }
            });
        }

        originalStarterIds.clear();
        currentDoc.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => originalStarterIds.add(cb.value));

renderActiveTab();
        setTimeout(applyTeamStyle, 100);
    } catch (err) { console.error("Load Data Error:", err); }
}
    // --- 2. UI ROUTING ---
function renderActiveTab() {
        // FIX: Target #subtabs-team in the header
const activeSub = $('#subtabs-team .sub-tab-btn.active').text().trim().toLowerCase() || 'lineup';
        const container = $('#player-rows-container').empty();
        const tableElement = currentDoc ? currentDoc.querySelector('table.report') : null;
        if (!tableElement) return;

        const rows = Array.from(tableElement.querySelectorAll('tr.oddtablerow, tr.eventablerow'));

if (activeSub === 'contracts') {
            Promise.all([
                fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=${fid}`, { credentials: 'include' }).then(r => r.text()),
                fetch(`https://www45.myfantasyleague.com/${year}/reports?L=${lid}&R=FSUMMARY`, { credentials: 'include' }).then(r => r.text())
            ]).then(([contractsHtml, summaryHtml]) => {
                const contractsDoc = new DOMParser().parseFromString(contractsHtml, 'text/html');
                const summaryDoc = new DOMParser().parseFromString(summaryHtml, 'text/html');
                const contractRows = Array.from(contractsDoc.querySelectorAll('tr.oddtablerow, tr.eventablerow'));
const lookupFid = fid === '0000' ? myFid : fid;
                const myRow = summaryDoc.querySelector(`a.franchise_${lookupFid}`)?.closest('tr');                const salaryCells = myRow?.querySelectorAll('td.salary');
                console.log('myRow found:', !!myRow, 'myFid:', myFid, 'salaryCells:', salaryCells?.length, 'val:', salaryCells?.[1]?.textContent);
                const mflTotal = parseFloat(salaryCells?.[1]?.textContent.replace(/[^0-9.]/g, '')) || 0;
                buildContractsUI(contractRows, container, mflTotal);
            });
        }      else { renderLegacyLineupOrRoster(activeSub, rows, container); updateSectionCounts(activeSub); }
        updateLineupNotifications(); updateSubmitButton();
        setTimeout(applyTeamStyle, 50);
    }
    // --- 3. LINEUP & ROSTER BUILDER ---
// --- 3. LINEUP & ROSTER BUILDER ---
    function renderLegacyLineupOrRoster(activeSub, rows, container) {
        let starterPlayers = [], benchPlayers = [], rosterPlayers = [];
        let draftPicks = []; // NEW: Array to hold picks
        const isL = activeSub === 'lineup';

        rows.forEach(row => {
            const playerLink = row.querySelector('td a[class*="position_"]');
            if (!playerLink) {

                return;
            }
            
// 1. Destructure realPos
            const pid = playerLink.getAttribute('href').match(/\d+/g).pop();
            const { name, shortName, lastName, pos, realPos, team } = parseMFLName(playerLink.textContent);
            const isStarter = row.querySelector('input[type="checkbox"]')?.checked;
            const cells = row.querySelectorAll('td');
            
            const injHtml = getInjuryHtml(pid); 
            let rStat = irPids.has(pid) ? "IR" : taxiPids.has(pid) ? "TS" : "";
let sBadge = rStat === 'IR' ? IR_ICON : rStat === 'TS' ? TS_ICON : "";
            const secondaryText = isL ? (cells[1]?.textContent.split('(')[0].trim() || '') : (cells[2]?.textContent || '');
            let matchupHtml = `<div class="player-secondary-slot">${secondaryText}</div>`;
            
            let projNum = parseFloat(cells[4]?.textContent) || 0;
            let oppPtsNum = 0;

            if (isL) {
                let teamMatch = secondaryText.match(/(?:vs|@)\s*([A-Z]{2,3})/i);
                let opp = teamMatch ? teamMatch[1].toUpperCase() : null;
                let badge = '';
                
                // 2. CRITICAL: Use realPos to look up the Points Allowed
                if (opp && pointsAllowedMap[opp]?.[realPos]) {
                    oppPtsNum = parseFloat(pointsAllowedMap[opp][realPos]);
                    let rankNum = pointsAllowedRankMap[realPos] ? pointsAllowedRankMap[realPos][opp] : 0;
                    let displayPts = Math.round(oppPtsNum); 
                    let cls = (rankNum >= 24) ? 'matchup-easy' : (rankNum <= 9) ? 'matchup-tough' : 'matchup-neutral';
                    
                    badge = `<div class="matchup-pts ${cls} pa-breakdown-trigger" data-team="${opp}" data-pos="${realPos}" style="cursor: pointer; position: relative; z-index: 5;" title="View game log">${displayPts} PA (#${rankNum})</div>`;
                }
                matchupHtml = `<div class="matchup-stack"><div class="matchup-opp-text">${secondaryText}</div>${badge}</div>`;            
            }
// 1. MFL NFL Team Color Dictionary (Primary & Secondary Colors)
            const nflColors = {
                'ARI': ['#97233F', '#000000'], 'ATL': ['#A71930', '#000000'], 'BAL': ['#241773', '#9E7C0C'],
                'BUF': ['#00338D', '#C60C30'], 'CAR': ['#0085CA', '#101820'], 'CHI': ['#0B162A', '#C83803'],
                'CIN': ['#FB4F14', '#000000'], 'CLE': ['#311D00', '#FF3C00'], 'DAL': ['#003594', '#041E42'],
                'DEN': ['#FB4F14', '#002244'], 'DET': ['#0076B6', '#B0B7BC'], 'GBP': ['#203731', '#FFB612'],
                'HOU': ['#03202F', '#A71930'], 'IND': ['#002C5F', '#A2AAAD'], 'JAC': ['#006778', '#D7A22A'],
                'KCC': ['#E31837', '#FFB81C'], 'LVR': ['#000000', '#A5ACAF'], 'LAC': ['#0080C6', '#FFC20E'],
                'LAR': ['#003594', '#FFA300'], 'MIA': ['#008E97', '#FC4C02'], 'MIN': ['#4F2683', '#FFC62F'],
                'NEP': ['#002244', '#C60C30'], 'NOS': ['#D3BC8D', '#101820'], 'NYG': ['#0B2265', '#A71930'],
                'NYJ': ['#125740', '#000000'], 'PHI': ['#004C54', '#A5ACAF'], 'PIT': ['#FFB612', '#101820'],
                'SFO': ['#AA0000', '#B3995D'], 'SEA': ['#002244', '#69BE28'], 'TBB': ['#D50A0A', '#34302B'],
                'TEN': ['#0C2340', '#4B92DB'], 'WAS': ['#5A1414', '#FFB612']
            };
const NFL_THROWBACK_LOGOS = {};
['ARI','ATL','BAL','BUF','CAR','CHI','CIN','CLE','DAL','DEN','DET','GBP',
 'HOU','IND','JAC','KCC','LVR','LAC','LAR','MIA','MIN','NEP','NOS','NYG',
 'NYJ','PHI','PIT','SFO','SEA','TBB','TEN','WAS'].forEach(t => {
    NFL_THROWBACK_LOGOS[t] = `https://raw.githubusercontent.com/zewolff1/llddynasty/main/content/team/throwback/${t}.png`;
});
function getNFLLogoUrl(teamAbbr) {
    const style = localStorage.getItem('nfl_logo_style') || 'modern';
    const abbr = (teamAbbr || 'NFL').toUpperCase();
    if (style === 'throwback' && NFL_THROWBACK_LOGOS[abbr]) {
        return NFL_THROWBACK_LOGOS[abbr];
    }
    return `https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/${abbr}.svg`;
}
            const buildRow = (label = "") => {
                const btnHtml = isL ? `<div class="move-btn-wrapper"><button class="move-handle-btn">${label}</button></div>` : '';
                const isChanged = originalStarterIds.has(pid) !== isStarter;
                
                // Stack Projection and Average

let rightDataHtml = '';
if (!isL) {
    const yrs = row.querySelector('td.contractyear')?.textContent.trim() || "0";
    rightDataHtml = `<span class="data-badge">${yrs} YRS</span>`;
}

let swapIndicator = '';

let rStat = irPids.has(pid) ? "IR" : taxiPids.has(pid) ? "TS" : "";
const inlineStatusBadge = rStat === 'IR' ? IR_ICON : rStat === 'TS' ? TS_ICON : "";
                const inlinePosBadge = `<span class="pos-text-${pos.toLowerCase()}" style="font-size: 11px; font-weight: 900; margin-left: 5px; flex-shrink: 0;">${pos}</span>`;
                
                // Core Matchup UI Variables
                let teamMatch = secondaryText.match(/(?:vs|@)\s*([A-Z]{2,3})/i);
                let opp = teamMatch ? teamMatch[1].toUpperCase() : null;
                
                // FIXED: Always use the Player's Actual Team for both the Logo and the Background Gradient!
                let playerTeam = team.toUpperCase();
                let colors = nflColors[playerTeam] || ['#3b82f6', '#1e293b']; // Default fallback to blue/dark-slate
                let c1 = colors[0];
                let c2 = colors[1];
                
                const inlineTeamLogo = `<img src="${getNFLLogoUrl(playerTeam)}"
 onerror="this.style.display='none'" style="width: 24px; height: 24px; object-fit: contain; flex-shrink: 0; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">`;

                let matchupHtml = '';
if (isL) {
    let badge = '';
    if (opp && pointsAllowedMap[opp]?.[realPos]) {
        let oppPtsNum = parseFloat(pointsAllowedMap[opp][realPos]);
        let rankNum = pointsAllowedRankMap[realPos] ? pointsAllowedRankMap[realPos][opp] : 0;
        let displayPts = Math.round(oppPtsNum); 
        let cls = (rankNum >= 24) ? 'matchup-easy' : (rankNum <= 9) ? 'matchup-tough' : 'matchup-neutral';
        badge = `<div class="matchup-pts ${cls} pa-breakdown-trigger" data-team="${opp}" data-pos="${realPos}" style="cursor: pointer; margin-top: 4px; display: inline-block; font-size: 9px; padding: 2px 6px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.3);" title="View game log">${displayPts} PA (#${rankNum})</div>`;
    }

    const dayMatch = secondaryText.match(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/i);
    const timeMatch = secondaryText.match(/(\d+)(?::\d+)?\s*(a\.m\.|p\.m\.)/i);
    const gameDay = dayMatch ? dayMatch[1] : '';
    const gameTime = timeMatch ? `${timeMatch[1]} ${timeMatch[2].toLowerCase().includes('p') ? 'PM' : 'AM'}` : '';

        const oppLogo = opp ? `<img src="${getNFLLogoUrl(opp)}"
onerror="this.style.display='none'" style="width: 16px; height: 16px; object-fit: contain; flex-shrink: 0; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4));">` : '';

    matchupHtml = `
        <div class="matchup-stack" style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start; gap: 10px; margin-top: 6px; padding: 6px 12px; border-radius: 8px; background: linear-gradient(135deg, ${c1}35, ${c2}15); border: 1px solid ${c1}50; width: fit-content; box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);">
            ${inlineTeamLogo}
            <div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">
                <div style="display: flex; align-items: center; gap: 4px;">
                    ${oppLogo}
                    <div class="matchup-opp-text" style="font-size: 11px; color: #fff; font-weight: 800; line-height: 1.2;">${gameDay} ${gameTime}</div>
                </div>
                ${badge}
            </div>
        </div>`;

} else {
                    matchupHtml = `
                        <div class="player-secondary-slot" style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start; gap: 10px; margin-top: 6px; padding: 6px 12px; border-radius: 8px; background: linear-gradient(135deg, ${c1}35, ${c2}15); border: 1px solid ${c1}50; width: fit-content; box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);">
                            ${inlineTeamLogo}
                            <span style="font-size: 11px; color: #fff; font-weight: 800; letter-spacing: 0.3px;">${secondaryText || '-'}</span>
                        </div>`;
                }

return `<div class="player-row pos-border-${pos.toLowerCase()} ${isChanged ? 'status-changed' : ''}" 
             data-pid="${pid}" data-pname="${name}" data-pteam="${team}" data-ppos="${pos}">
    ${btnHtml}
    <div class="player-img-wrapper" style="width: 46px; height: 46px; flex-shrink: 0; margin-right: 10px;">
        <div class="player-circle" style="width: 100%; height: 100%; position: relative; overflow: hidden;">
            <img src="${getNFLLogoUrl(team)}" onerror="this.style.display='none'" style="position:absolute; width:70%; height:70%; object-fit:contain; top:50%; left:50%; transform:translate(-50%,-50%); opacity:0.15; z-index:1;">
            <img class="player-img" src="https://www.mflscripts.com/playerImages_80x107/mfl_${pid}.png" onerror="this.style.opacity='0'" style="width:100%; height:100%; object-fit:cover; position:relative; z-index:2;">
        </div>
    </div>
    <div class="mini-arc-overlay" style="display:none; flex-direction:column; align-items:center; width:72px; margin-top:4px;">
        <div style="font-size:9px; font-weight:800; color:#fff; text-align:center; line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:70px;">${shortName || name}</div>
        <div style="display:flex; align-items:center; justify-content:center; margin-top:3px;">
        <img src="${getNFLLogoUrl(team)}" onerror="this.style.display='none'" style="width:18px; height:18px; object-fit:contain;">
    </div>
    </div>
    <div class="player-info" style="flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: center; gap: 6px;">
        <div style="display: flex; align-items: center; gap: 6px;">
            <span class="full-name" style="font-size: 13px; font-weight: 800; color: #fff;">${name}</span>
            <span class="short-name" style="display:none; font-size: 13px; font-weight: 800; color: #fff;">${shortName}</span>
${inlinePosBadge}
            ${inlineStatusBadge}
            ${injHtml}
            ${getRookieHtml(pid)}
            ${getTradeBlockHtml(pid)}
        </div>

<div style="display: flex; align-items: stretch; gap: 8px; flex-wrap: nowrap;">
    ${matchupHtml}
    ${isL ? `
    <div style="padding: 6px 12px; border-radius: 8px; background: rgba(0,206,184,0.08); border: 1px solid rgba(0,206,184,0.2); box-shadow: inset 0 1px 0 rgba(255,255,255,0.05); display: flex; flex-direction: column; align-items: flex-end; justify-content: center; gap: 3px; flex-shrink: 0; align-self: stretch;">
        <span style="font-size: 13px; font-weight: 900; color: var(--accent-teal); letter-spacing: 0.3px; white-space: nowrap;">${projNum.toFixed(1)} PROJ</span>
        <div style="display: flex; gap: 6px; align-items: center;">
            <span style="font-size: 9px; font-weight: 900; color: var(--accent-blue); white-space: nowrap;">${pos}${playerRanks[pid] ? '#' + playerRanks[pid] : 'NR'}</span>
            <span style="font-size: 9px; font-weight: 800; color: var(--text-dim); white-space: nowrap;">${playerAverages[pid] ? playerAverages[pid].toFixed(1) : '0.0'} AVG</span>
        </div>
    </div>` : ''}
</div>

        ${swapIndicator}
    </div>
    <div class="player-right-slot" style="display: none;"></div>
</div>`;

            };
const pData = { pid: pid, pos: pos, realPos: realPos, name: name, lastName: lastName, proj: projNum, opp: oppPtsNum };
            if (isL) {
                if (isStarter) starterPlayers.push({ ...pData, build: buildRow });
                else benchPlayers.push({ ...pData, html: buildRow("BN") });
            } else { 
                rosterPlayers.push({ ...pData, html: buildRow() }); 
            }
        });

        if (isL) {
            // (Leaving all your Lineup/IR/Taxi logic exactly as it is here...)
function buildInactiveRow(p) {
    const btnHtml = p.locked ? `<button class="move-handle-btn" style="border-style:dashed; cursor:not-allowed; opacity:0.5;" title="${p.lockMsg}">🔒</button>` : `<button class="move-handle-btn" style="border-style:dashed;">${p.status}</button>`;
    
    return buildUniversalRow(
        { pid: p.pid, name: p.name, shortName: p.shortName, pos: p.pos, team: p.team },
        {
            forcedStatus: p.status,
            isLocked: p.locked,
            lockMsg: p.lockMsg,
            leftContent: `<div class="move-btn-wrapper">${btnHtml}</div>`,
            subText: p.locked && p.lockMsg ? p.lockMsg : p.sec,
            subTextColor: p.locked ? '#ef4444' : 'var(--text-dim)',
            rightContent: `<span style="font-size: 11px; font-weight: 800; color: var(--text-main);">0.0 PROJ</span>`,
            badgeContainerStyle: 'background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 6px;',
            extraAttributes: `data-locked="${p.locked ? 'true' : 'false'}" data-lockmsg="${p.lockMsg}"`
        }
    );
}

            let irBuffer = irPlayers.map(p => buildInactiveRow(p)).join('');
            let taxiBuffer = taxiPlayers.map(p => buildInactiveRow(p)).join('');

            benchPlayers.sort((a, b) => {
                if (lineupSortBy === 'alpha') return a.lastName.localeCompare(b.lastName) || a.name.localeCompare(b.name);
                if (lineupSortBy === 'opp') return b.opp - a.opp;
                return b.proj - a.proj; 
            });
            let benchBuffer = benchPlayers.map(p => p.html).join('');

            let starterHtml = ''; const assigned = new Set();
            const coreSlots = [{l:'QB',p:['QB']},{l:'RB',p:['RB']},{l:'RB',p:['RB']},{l:'WR',p:['WR']},{l:'WR',p:['WR']},{l:'TE',p:['TE']},{l:'DL',p:['DL']},{l:'LB',p:['LB']},{l:'DB',p:['DB']}];
            
            coreSlots.forEach(s => {
                const idx = starterPlayers.findIndex(p => s.p.includes(p.pos) && !assigned.has(p.pid));
                if (idx !== -1) { starterHtml += starterPlayers[idx].build(s.l); assigned.add(starterPlayers[idx].pid); }
                else { starterHtml += renderEmptySlot(s.l); }
            });
            for (let i = 0; i < 3; i++) {
                let l = (i === 0) ? "SFLEX" : "FLEX"; let elig = (i === 0) ? ['QB','RB','WR','TE'] : ['RB','WR','TE'];
                const idx = starterPlayers.findIndex(p => elig.includes(p.pos) && !assigned.has(p.pid));
                if (idx !== -1) { starterHtml += starterPlayers[idx].build(l); assigned.add(starterPlayers[idx].pid); }
                else { starterHtml += renderEmptySlot(l); }
            }
for (let i = 0; i < 3; i++) {
                const idx = starterPlayers.findIndex(p => LINEUP_RULES.groups.IDP.includes(p.realPos) && !assigned.has(p.pid));
                if (idx !== -1) { starterHtml += starterPlayers[idx].build("IDP"); assigned.add(starterPlayers[idx].pid); }
                else { starterHtml += renderEmptySlot('IDP'); }
            }

container.append(`<div id="lineup-notifications"></div>
                <div id="lineup-dashboard-inject"></div>
                <div class="lineup-section" data-section="starters">
                    <div class="roster-grid" id="slots-starters">${starterHtml}</div>
                </div>
                ${getToggleBarHtml('lineup')}
                <div class="lineup-section" data-section="bench">
                    <div class="roster-grid" id="slots-bench">${benchBuffer}</div>
                </div>
                <div class="lineup-section" data-section="ir">
                    <h3 class="section-header">
                        <span class="header-icon-svg header-icon-ir"></span> 
                        Injured Reserve
                    </h3>
                    <div class="roster-grid">${irBuffer || '<div class="empty-inactive-text">No players on IR</div>'}</div>
                </div>
                <div class="lineup-section" data-section="taxi">
                    <h3 class="section-header">
                        <span class="header-icon-svg header-icon-taxi"></span> 
                        Taxi Squad
                    </h3>
                    <div class="roster-grid">${taxiBuffer || '<div class="empty-inactive-text">No players on Taxi Squad</div>'}</div>
                </div>`);
        } else {
            // NEW: Append Picks to Roster view
            let rosterBuffer = buildGroupedHTML(rosterPlayers, activeSub);
let picksBuffer = buildDraftPicksHtml(window.currentTeamPicks || []);            container.append(`
                ${getToggleBarHtml('roster')}
<div class="lineup-section" data-section="roster"><div id="roster-dashboard-inject"></div>${rosterBuffer}</div>                ${picksBuffer}
            `);
        }
    }

    // --- 4. CONTRACTS BUILDER ---
// --- 4. CONTRACTS BUILDER ---
function buildContractsUI(rows, container, mflTotalOverride) {
        console.log('mflTotalOverride received:', mflTotalOverride);
      let contractPlayers = []; 
let draftPicks = window.currentTeamPicks || [];
        let capByYear = {}; 
        let posCounts = { QB: 0, RB: 0, WR: 0, TE: 0, PK: 0, DL: 0, LB: 0, DB: 0 };
        let totalPlayers = 0, totalIR = 0, totalTaxi = 0; 
        
const salaryCap = window.leagueSalaryCap || 823;
        const startYear = parseInt(year) || 2026; 

capByYear[startYear] = mflTotalOverride;
for (let y = startYear + 1; y <= startYear + 4; y++) {
            let deductions = 0;
            rows.forEach(row => {
                const playerLink = row.querySelector('td.player a[class*="position_"]');
                if (!playerLink) return;
                const salNum = parseFloat(row.querySelector('td.salary')?.textContent.replace(/[^0-9.]/g, '')) || 0;
                const yrsNum = parseInt(row.querySelector('td.contractyear')?.textContent) || 0;
                const expiresAfter = startYear + yrsNum - 1;
                if (y > expiresAfter) deductions += salNum;
            });
            capByYear[y] = parseFloat((mflTotalOverride - deductions).toFixed(1));
        }

        rows.forEach(row => {
            const playerLink = row.querySelector('td.player a[class*="position_"]');
            if (!playerLink) {

                return;
            }

            const pid = playerLink.getAttribute('href').match(/\d+/g).pop();
            const { name, shortName, lastName, pos, team } = parseMFLName(playerLink.textContent);
            
            const salary = row.querySelector('td.salary')?.textContent.trim() || "$0";
            const yrsStr = row.querySelector('td.contractyear')?.textContent.trim() || "0";
            const totalVal = row.querySelector('td.contractstatus')?.textContent.trim() || "$0";
            const guar = row.querySelector('td.contractinfo')?.textContent.trim() || "0%";
            
const salNum = parseFloat(salary.replace(/[^0-9.]/g, '')) || 0;
            const yrsNum = parseInt(yrsStr, 10);
            const yrsNumSafe = isNaN(yrsNum) ? 0 : yrsNum;
            const gPct = parseFloat(guar.replace(/[^0-9.]/g, '')) / 100 || 0;
            const totalValNum = parseFloat(totalVal.replace(/[^0-9.]/g, '')) || 0;

const expirationYear = startYear + yrsNumSafe - 1;
            const isUnderContract = yrsNumSafe > 0 && selectedYear <= expirationYear;

            const relativeYrsLeft = Math.max(0, (expirationYear - selectedYear) + 1);
const currentCapHit = parseFloat(row.querySelector('td.contractstatus')?.textContent.replace(/[^0-9.]/g, '')) || 0;
            if (isUnderContract) {
                let dPos = pos; 
                if (['DE','DT'].includes(dPos)) dPos = 'DL'; 
                if (['CB','S'].includes(dPos)) dPos = 'DB';
                
                if (irPids.has(pid)) totalIR++;
                else if (taxiPids.has(pid)) totalTaxi++;
                else { posCounts[dPos] = (posCounts[dPos] || 0) + 1; totalPlayers++; }
            }

            const injHtml = getInjuryHtml(pid); 
            let rStat = irPids.has(pid) ? "IR" : taxiPids.has(pid) ? "TS" : "";
let sBadge = rStat === 'IR' ? IR_ICON : rStat === 'TS' ? TS_ICON : "";
const yearCols = [];
const maxYearsToShow = Math.min(relativeYrsLeft, 3);
for (let i = 0; i < maxYearsToShow; i++) {
    const y = selectedYear + i;
    const remainingYears = relativeYrsLeft - i;
    const yearHit = (salNum * gPct * remainingYears).toFixed(1);
yearCols.push(`
        <div style="display: flex; flex-direction: column; width: 36px; flex-shrink:0;">
            <span style="font-size: 7px; color: var(--text-dim); text-transform: uppercase;">${y}</span>
            <span style="font-size: 10px; font-weight: 800; color: #f59e0b;">$${yearHit}m</span>
        </div>`);
}

const currentCapHitDisplay = (salNum * gPct * relativeYrsLeft).toFixed(1);
const innerRowHtml = buildUniversalRow(
    { pid, name, shortName, pos, team },
    {
        subText: `${salary} · ${relativeYrsLeft}yr · ${guar} · <span style="color:#f59e0b;">$${currentCapHitDisplay}m hit</span>`,
        subTextColor: '#22c55e',
        rightContent: '',
        nameSuffix: !isUnderContract ? '<span style="font-size:9px; color:#ef4444; margin-left:6px;">(Expired)</span>' : '',
        rowStyle: 'margin-bottom: 0 !important; cursor: pointer;'
    }
);
            const rowHtml = `
                <div class="contract-row-wrapper" style="margin-bottom: 6px; opacity: ${isUnderContract ? '1' : '0.4'}; filter: ${isUnderContract ? 'none' : 'grayscale(1)'};">
                    ${innerRowHtml}
                </div>`;

                
          contractPlayers.push({ 
                pos: pos, name: name, lastName: lastName, years: relativeYrsLeft, 
                capHit: parseFloat(currentCapHit), totalVal: totalValNum, guar: gPct, 
                salary: salNum, html: rowHtml 
            });
        });


const activeYearTotal = selectedYear === startYear && mflTotalOverride > 0 
            ? mflTotalOverride 
            : parseFloat((capByYear[selectedYear] || 0).toFixed(1));
        const capRemaining = parseFloat((salaryCap - activeYearTotal).toFixed(1));
        window.currentTeamCapUsed = activeYearTotal;
        const capPct = Math.min(100, (activeYearTotal / salaryCap) * 100).toFixed(1);
        const barColor = activeYearTotal > salaryCap ? '#ef4444' : capPct > 90 ? '#f59e0b' : '#22c55e';

        const capHeaderHtml = `
            <div class="dashboard-header-row" style="margin-bottom: 12px;">
                <div class="dashboard-pill" style="border-bottom-color:#22c55e;">
                    <span class="pill-label">USED (${selectedYear})</span>
                    <span class="pill-value">$${activeYearTotal}m</span>
                </div>
                <div class="dashboard-pill" style="border-bottom-color:${capRemaining < 0 ? '#ef4444' : '#3b82f6'};">
                    <span class="pill-label">REMAINING</span>
                    <span class="pill-value">$${capRemaining}m</span>
                </div>
                <div class="dashboard-pill" style="border-bottom-color:#94a3b8;">
                    <span class="pill-label">CAP LIMIT</span>
                    <span class="pill-value">$${salaryCap}m</span>
                </div>
            </div>`;

        let posPillsHtml = `
            <div class="dashboard-pill stacked-pill" style="min-width: 45px; border-bottom-color: #3b82f6;">
                <span class="pill-label">ROSTER</span>
                <span class="pill-value">${totalPlayers}/${LINEUP_RULES.rosterLimit}</span>
            </div>
            <div class="dashboard-pill stacked-pill" style="min-width: 45px; border-bottom-color: #ef4444;">
                <span class="pill-label">IR</span>
                <span class="pill-value">${totalIR}/4</span>
            </div>
            <div class="dashboard-pill stacked-pill" style="min-width: 45px; border-bottom-color: #f59e0b;">
                <span class="pill-label">TAXI</span>
                <span class="pill-value">${totalTaxi}/5</span>
            </div>` + 
            [{l:'QB',min:1}, {l:'RB',min:2}, {l:'WR',min:2}, {l:'TE',min:1},  {l:'DL',min:1}, {l:'LB',min:1}, {l:'DB',min:1}]
            .map(p => `<div class="dashboard-pill stacked-pill stat-${p.l.toLowerCase()} ${posCounts[p.l] < p.min ? 'status-empty' : ''}"><span class="pill-label">${p.l}</span><span class="pill-value">${posCounts[p.l]||0}/${p.min}</span></div>`).join('');

window._capYears = Object.keys(capByYear).sort();

        
        contractsStatsData = { totalPlayers, totalIR, totalTaxi, posCounts: {...posCounts} };
console.log('Sample contract player:', contractPlayers[0]);
console.log('Active filters:', JSON.stringify(playerFilters));
        console.log('Sample player values - sal:', contractPlayers[0]?.salary, 'yrs:', contractPlayers[0]?.years, 'guar:', contractPlayers[0]?.guar, 'capHit:', contractPlayers[0]?.capHit);        if (playerFiltersActive) {
            contractPlayers = contractPlayers.filter(p => {
                const yrs = p.years || 0;
                const gPct = (p.guar || 0) * 100;
                const hit = p.capHit || 0;
                // Get salary from capHit and guar back-calculation, or from totalVal
const sal = p.salary || 0;
                if (yrs < playerFilters.years[0] || yrs > playerFilters.years[1]) return false;
                if (sal < playerFilters.salary[0] || sal > playerFilters.salary[1]) return false;
                if (gPct < playerFilters.guar[0] || gPct > playerFilters.guar[1]) return false;
                if (hit < playerFilters.capHit[0] || hit > playerFilters.capHit[1]) return false;
                return true;
            });
        }
        // Apply sort direction
        if (playerSortDir === 'asc') contractPlayers.reverse();
        let contractsBuffer = buildGroupedHTML(contractPlayers, 'contracts');
        let picksBuffer = buildDraftPicksHtml(draftPicks); // NEW: Build the picks UI
        
        container.append(`<div class="roster-dashboard" style="background:transparent; border:none; padding:8px 0;">
            ${capHeaderHtml}
            <div style="width: 100%; margin-bottom: 15px; padding: 0 5px;">
                <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 4px;">
                    <span style="font-size: 10px; font-weight: 800; color: var(--text-dim); text-transform: uppercase;">Cap Usage (${selectedYear})</span>
                    <span style="font-size: 10px; font-weight: 800; color: ${barColor};">${capPct}%</span>
                </div>
                <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05);">
                    <div style="width: ${capPct}%; height: 100%; background: ${barColor}; border-radius: 10px; transition: width 0.4s ease;"></div>
                </div>
            </div>
<div style="display:flex; flex-direction:column; gap:6px; width:100%;">
    <div class="dashboard-row overflow-row" style="padding-bottom:10px; overflow-y:visible;">
        <div class="dashboard-pill stacked-pill" id="year-selector-pill"
            style="cursor:pointer; min-width:64px; border-bottom-color:var(--accent-blue);">
            <span class="pill-label">YEAR ${window._yearSelectorOpen ? '▲' : '▼'}</span>
            <span class="pill-value" style="font-size:13px; font-weight:900; color:var(--accent-blue);">${selectedYear}</span>
        </div>
        <div class="dashboard-pill stacked-pill" style="min-width:45px; border-bottom-color:#3b82f6;"><span class="pill-label">ROSTER</span><span class="pill-value">${totalPlayers}/${LINEUP_RULES.rosterLimit}</span></div>
        <div class="dashboard-pill stacked-pill" style="min-width:45px; border-bottom-color:#ef4444;"><span class="pill-label">IR</span><span class="pill-value">${totalIR}/4</span></div>
        <div class="dashboard-pill stacked-pill" style="min-width:45px; border-bottom-color:#f59e0b;"><span class="pill-label">TAXI</span><span class="pill-value">${totalTaxi}/5</span></div>
        ${[{l:'QB',min:1},{l:'RB',min:2},{l:'WR',min:2},{l:'TE',min:1},{l:'DL',min:1},{l:'LB',min:1},{l:'DB',min:1}]
            .map(p => `<div class="dashboard-pill stacked-pill stat-${p.l.toLowerCase()} ${(posCounts[p.l]||0) < p.min ? 'status-empty' : ''}"><span class="pill-label">${p.l}</span><span class="pill-value">${posCounts[p.l]||0}/${p.min}</span></div>`).join('')}
    </div>
    ${window._yearSelectorOpen ? `<div class="dashboard-row overflow-row" style="padding-bottom:10px;">
        ${(window._capYears || []).map(y => {
            const isActive = parseInt(y) === selectedYear;
            return `<div class="dashboard-pill stacked-pill year-selector-item" data-year="${y}"
                style="cursor:pointer; min-width:52px; border-bottom-color:${isActive ? 'var(--accent-blue)' : 'var(--card-border)'}; opacity:${isActive ? '1' : '0.6'};">
                <span class="pill-value" style="font-size:13px; font-weight:900; color:${isActive ? 'var(--accent-blue)' : '#fff'};">${y}</span>
            </div>`;
        }).join('')}
    </div>` : ''}
</div>
${(() => {
            if (!window._resignOpen && window._calendarEvents) {
                const resignEvent = window._calendarEvents.find(ev => 
                    ev.text.toLowerCase().includes('resign') || 
                    ev.text.toLowerCase().includes('re-sign') ||
                    ev.cls.includes('resign')
                );
                if (resignEvent) {
                    const diffMs = resignEvent.date - new Date();
                    if (diffMs > 0) {
                        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                        const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const countdownStr = diffDays > 0 ? `${diffDays}d ${diffHrs}h` : `${diffHrs}h`;
                       return `<div style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; margin-bottom:10px; background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.25); border-radius:8px; width:100%; box-sizing:border-box;">
                            <div>
                                <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">Re-Signing Opens In</div>
                                <div style="font-size:16px; font-weight:900; color:#ef4444;">${countdownStr}</div>
                            </div>
                            <div style="text-align:right;">
                                <div style="font-size:12px; font-weight:900; color:#fff;">${resignEvent.date.toLocaleDateString([], { month:'long', day:'numeric' })}</div>
                            </div>
                        </div>`;
                    }
                }
            }
            return '';
        })()}
        ${getToggleBarHtml('contracts')}
        <div class="lineup-section">${contractsBuffer}</div>
        ${picksBuffer}`); // NEW: Append to the very bottom
    }

    // --- 5. DASHBOARD STATS & PROJECTIONS ---

function updateSectionCounts(activeSub) {

    const sRows = $('#slots-starters .player-row:not(.empty-slot)');
    
    const counts = {};
    sRows.each(function() {
        // Read from data-ppos attribute which stores the display pos (DL, DB, etc.)
        const p = $(this).data('ppos') || '';
        if (p) counts[p] = (counts[p] || 0) + 1;
    });

    // Use display pos keys directly — no need to split DL/DB
    const qb = counts['QB'] || 0;
    const rb = counts['RB'] || 0;
    const wr = counts['WR'] || 0;
    const te = counts['TE'] || 0;
    const dl = counts['DL'] || 0;
    const lb = counts['LB'] || 0;
    const db = counts['DB'] || 0;


        const coreOff = Math.min(qb, 1) + Math.min(rb, 2) + Math.min(wr, 2) + Math.min(te, 1);
const totalOff = qb + rb + wr + te;
        const sflex = (totalOff > coreOff && qb > 1) ? 1 : Math.max(0, Math.min(1, totalOff - coreOff));
        const flex = Math.max(0, totalOff - coreOff - sflex);
        const idpFlex = Math.max(0, (dl + lb + db) - (Math.min(dl,1)+Math.min(lb,1)+Math.min(db,1)));

       const stats = [{l:'QB',c:qb,r:1}, {l:'RB',c:rb,r:2}, {l:'WR',c:wr,r:2}, {l:'TE',c:te,r:1}, {l:'SFLEX',c:sflex,r:1}, {l:'FLEX',c:flex,r:2}, {l:'DL',c:dl,r:1}, {l:'LB',c:lb,r:1}, {l:'DB',c:db,r:1}, {l:'IDP',c:idpFlex,r:3}];
        let dashboardHtml = "";

if (activeSub === 'roster') {
    const rRows = $('.roster-grid .player-row, .pos-group-content .player-row');
    const rCounts = {}; 
    let totalPlayers = 0, totalIR = 0, totalTaxi = 0;

    rRows.each(function() { 

                let p = $(this).find('.pos-badge-overlay:not(.status-badge-overlay)').text().trim(); 
                if (['DE','DT'].includes(p)) p = 'DL'; if (['CB','S'].includes(p)) p = 'DB'; 
                
                const pid = $(this).data('pid').toString();
                if (irPids.has(pid)) totalIR++;
                else if (taxiPids.has(pid)) totalTaxi++;
                else { rCounts[p] = (rCounts[p] || 0) + 1; totalPlayers++; }
            });
window.currentRosterSize = totalPlayers;
            
            dashboardHtml = `<div class="roster-dashboard">
                <div class="dashboard-row overflow-row">
                    <div class="dashboard-pill stacked-pill" style="min-width: 45px; border-bottom-color: #3b82f6;"><span class="pill-label">ROSTER</span><span class="pill-value">${totalPlayers}/${LINEUP_RULES.rosterLimit}</span></div>
                    <div class="dashboard-pill stacked-pill" style="min-width: 45px; border-bottom-color: #ef4444;"><span class="pill-label">IR</span><span class="pill-value">${totalIR}/4</span></div>
                    <div class="dashboard-pill stacked-pill" style="min-width: 45px; border-bottom-color: #f59e0b;"><span class="pill-label">TAXI</span><span class="pill-value">${totalTaxi}/5</span></div>
                    ` + ['QB','RB','WR','TE','PK','DL','LB','DB'].map(p => `<div class="dashboard-pill stacked-pill stat-${p.toLowerCase()}"><span class="pill-label">${p}</span><span class="pill-value">${rCounts[p]||0}</span></div>`).join('') + `
                </div>
            </div>`;
$('#roster-dashboard-inject').html(dashboardHtml);        } else {
            const currentProj = calculateTotalProjections();
            const optimalProj = calculateSuggestedProjections();
            const needsOptimization = parseFloat(optimalProj) > parseFloat(currentProj) || $('.player-row.empty-slot').length > 0;

            const isCommish = true; // 🔑 YOUR MASTER KEY
            const isMyTeam = (typeof myFid !== 'undefined') ? (fid === myFid) : true;
            const canEdit = isMyTeam || isCommish; // Unlocks if it's your team OR you are commish
            let optimizeBtnHtml = '';
            
            if (canEdit) {
optimizeBtnHtml = needsOptimization 
                   ? `<button class="accept-optimal-btn" onclick="openOptimizeModal()" style="background:var(--accent-blue);color:#fff;border:none;padding:6px 12px;border-radius:4px;font-weight:800;font-size:11px;cursor:pointer;">OPTIMIZE</button>`
                    : `<button disabled style="background:rgba(255,255,255,0.1);color:var(--text-dim);border:none;padding:6px 12px;border-radius:4px;font-weight:800;font-size:11px;cursor:not-allowed;">OPTIMIZED</button>`;
            } else {
                optimizeBtnHtml = `<div style="background:rgba(255,255,255,0.05);color:var(--text-dim);padding:6px 12px;border-radius:4px;font-weight:800;font-size:11px;text-transform:uppercase;border:1px dashed rgba(255,255,255,0.2);">VIEW ONLY</div>`;
            }

dashboardHtml = `<div class="roster-dashboard">
                <div class="dashboard-header-row" style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="header-icon-svg header-icon-starters"></span>
                        <span style="font-weight: 900; color: #fff; text-transform: uppercase; font-size: 13px; letter-spacing: 1px;">Starters</span>
                    </div>                    <div style="display: flex; align-items: center; gap: 12px;">
                        ${activeSub === 'roster' ? '<span class="dashboard-title" style="font-weight:800; color:#fff; text-transform:uppercase;">Total Roster</span>' : ''}
                        <div style="display: flex; background: rgba(0,0,0,0.25); border-radius: 6px; border: 1px solid var(--card-border); overflow: hidden;">
                            <div style="padding: 4px 10px; border-right: 1px solid var(--card-border); text-align: center;">
                                <span style="display: block; font-size: 8px; color: var(--text-dim); text-transform: uppercase; line-height: 1.2;">Current</span>
                                <span style="display: block; font-size: 13px; font-weight: 800; color: #fff;">${currentProj}</span>
                            </div>
                            <div style="padding: 4px 10px; text-align: center; background: rgba(0, 206, 184, 0.05);">
                                <span style="display: block; font-size: 8px; color: #00ceb8; text-transform: uppercase; line-height: 1.2;">Optimal</span>
                                <span style="display: block; font-size: 13px; font-weight: 800; color: #00ceb8;">${optimalProj}</span>
                            </div>
                        </div>
                    </div>
                    ${optimizeBtnHtml}
                </div>

                <div style="display:flex; flex-direction:column; gap:4px; margin-bottom:4px;">
                    ${stats.filter(s => s.c < s.r).length === 0
                        ? '<span style="font-size:10px; color:#22c55e; font-weight:800;">✓ Lineup Valid</span>'
                        : `<div style="display:flex; align-items:center; gap:6px; padding:8px 12px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.3); border-radius:8px;">
                            <span style="font-size:14px;">⚠️</span>
                            <div style="display:flex; flex-direction:column; gap:2px;">
                                ${stats.filter(s => s.c < s.r).map(s => {
                                    const need = s.r - s.c;
                                    const posName = s.l === 'QB' ? 'QB' : s.l === 'RB' ? 'RB' : s.l === 'WR' ? 'WR' : s.l === 'TE' ? 'TE' : s.l === 'PK' ? 'Kicker' : s.l === 'SFLEX' ? 'Superflex' : s.l === 'FLEX' ? 'Flex' : s.l === 'DL' ? 'DL' : s.l === 'LB' ? 'LB' : s.l === 'DB' ? 'DB' : s.l === 'IDP' ? 'IDP Flex' : s.l;
                                    return `<span style="font-size:10px; font-weight:800; color:#f59e0b;">Needs ${need} more ${posName}${need > 1 ? 's' : ''}</span>`;
                                }).join('')}
                            </div>
                           </div>`
                    }
                </div>

            </div>`;
            
$('#lineup-dashboard-inject').html(dashboardHtml);  

     }
    }

    // --- 6. OPTIMIZER ---

window.acceptAllOptimal = function() {
    if (!currentDoc) return;
    let allPlayers = [];
    
    Array.from(currentDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow')).forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const playerLink = row.querySelector('td a[class*="position_"]');
        if (!checkbox || !playerLink) return;
        if (irPids.has(checkbox.value) || taxiPids.has(checkbox.value)) { 
            checkbox.checked = false; return; 
        }
        const { pos, realPos } = parseMFLName(playerLink.textContent);
        allPlayers.push({ 
            pid: checkbox.value, 
            pos,       // display pos (DL, DB, etc.)
            realPos,   // actual pos (DE, DT, CB, S, etc.)
            proj: parseFloat(row.querySelectorAll('td')[4]?.textContent) || 0 
        });
    });

    allPlayers.sort((a, b) => b.proj - a.proj);

    const coreSlots = [
        { label: 'QB',    eligible: ['QB'] },
        { label: 'RB',    eligible: ['RB'] },
        { label: 'RB',    eligible: ['RB'] },
        { label: 'WR',    eligible: ['WR'] },
        { label: 'WR',    eligible: ['WR'] },
        { label: 'TE',    eligible: ['TE'] },
        { label: 'PK',    eligible: ['PK'] },
        { label: 'DL',    eligible: ['DE', 'DT'] },
        { label: 'LB',    eligible: ['LB'] },
        { label: 'DB',    eligible: ['CB', 'S'] },
    ];

    const flexSlots = [
        { label: 'SFLEX', eligible: ['QB', 'RB', 'WR', 'TE'] },
        { label: 'FLEX',  eligible: ['RB', 'WR', 'TE'] },
        { label: 'FLEX',  eligible: ['RB', 'WR', 'TE'] },
        { label: 'IDP',   eligible: ['DE', 'DT', 'LB', 'CB', 'S'] },
        { label: 'IDP',   eligible: ['DE', 'DT', 'LB', 'CB', 'S'] },
        { label: 'IDP',   eligible: ['DE', 'DT', 'LB', 'CB', 'S'] },
    ];

    let targetStarters = new Set();
    let remaining = [...allPlayers];

    // Fill core slots first using realPos
    coreSlots.forEach(slot => {
        const idx = remaining.findIndex(p => slot.eligible.includes(p.realPos));
        if (idx !== -1) {
            targetStarters.add(remaining[idx].pid);
            remaining.splice(idx, 1);
        }
    });

    // Find optimal flex assignment using permutations
    const flexPerms = permutations(flexSlots);
    let bestFlexTotal = -1;
    let bestFlexPids = [];

    flexPerms.forEach(perm => {
        let flexRemaining = [...remaining];
        let flexTotal = 0;
        let flexPids = [];
        perm.forEach(slot => {
            const idx = flexRemaining.findIndex(p => slot.eligible.includes(p.realPos));
            if (idx !== -1) {
                flexTotal += flexRemaining[idx].proj;
                flexPids.push(flexRemaining[idx].pid);
                flexRemaining.splice(idx, 1);
            }
        });
        if (flexTotal > bestFlexTotal) {
            bestFlexTotal = flexTotal;
            bestFlexPids = flexPids;
        }
    });

    bestFlexPids.forEach(pid => targetStarters.add(pid));

    // Apply to checkboxes
    currentDoc.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (!irPids.has(cb.value) && !taxiPids.has(cb.value)) {
            cb.checked = targetStarters.has(cb.value);
        }
    });

    renderActiveTab();
};

window.openOptimizeModal = function() {
    if (!currentDoc) return;

    // Calculate optimal lineup
    let allPlayers = [];
    Array.from(currentDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow')).forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const playerLink = row.querySelector('td a[class*="position_"]');
        if (!checkbox || !playerLink) return;
        if (irPids.has(checkbox.value) || taxiPids.has(checkbox.value)) return;
        const { name, shortName, pos, realPos } = parseMFLName(playerLink.textContent);
        allPlayers.push({
            pid: checkbox.value,
            name, shortName, pos, realPos,
            proj: parseFloat(row.querySelectorAll('td')[4]?.textContent) || 0,
            isCurrentStarter: checkbox.checked
        });
    });

    allPlayers.sort((a, b) => b.proj - a.proj);

    const coreSlots = [
        { label: 'QB', eligible: ['QB'] }, { label: 'RB', eligible: ['RB'] },
        { label: 'RB', eligible: ['RB'] }, { label: 'WR', eligible: ['WR'] },
        { label: 'WR', eligible: ['WR'] }, { label: 'TE', eligible: ['TE'] },
         { label: 'DL', eligible: ['DE','DT'] },
        { label: 'LB', eligible: ['LB'] }, { label: 'DB', eligible: ['CB','S'] }
    ];
    const flexSlots = [
        { label: 'SFLEX', eligible: ['QB','RB','WR','TE'] },
        { label: 'FLEX', eligible: ['RB','WR','TE'] },
        { label: 'FLEX', eligible: ['RB','WR','TE'] },
        { label: 'IDP', eligible: ['DE','DT','LB','CB','S'] },
        { label: 'IDP', eligible: ['DE','DT','LB','CB','S'] },
        { label: 'IDP', eligible: ['DE','DT','LB','CB','S'] }
    ];

    let targetStarters = new Set();
    let remaining = [...allPlayers];

    coreSlots.forEach(slot => {
        const idx = remaining.findIndex(p => slot.eligible.includes(p.realPos));
        if (idx !== -1) { targetStarters.add(remaining[idx].pid); remaining.splice(idx, 1); }
    });

    const flexPerms = permutations(flexSlots);
    let bestFlexTotal = -1, bestFlexPids = [];
    flexPerms.forEach(perm => {
        let flexRemaining = [...remaining], flexTotal = 0, flexPids = [];
        perm.forEach(slot => {
            const idx = flexRemaining.findIndex(p => slot.eligible.includes(p.realPos));
            if (idx !== -1) { flexTotal += flexRemaining[idx].proj; flexPids.push(flexRemaining[idx].pid); flexRemaining.splice(idx, 1); }
        });
        if (flexTotal > bestFlexTotal) { bestFlexTotal = flexTotal; bestFlexPids = flexPids; }
    });
    bestFlexPids.forEach(pid => targetStarters.add(pid));

    // Find changes
    const toStart = allPlayers.filter(p => targetStarters.has(p.pid) && !p.isCurrentStarter);
    const toBench = allPlayers.filter(p => !targetStarters.has(p.pid) && p.isCurrentStarter);

    if (toStart.length === 0 && toBench.length === 0) {
        alert('Your lineup is already optimal!');
        return;
    }

    const makeRow = (p, action, color) => `
        <div style="display:flex; align-items:center; gap:10px; padding:8px; background:rgba(0,0,0,0.2); border-radius:8px; margin-bottom:6px; border-left:3px solid ${color};">
            <input type="checkbox" class="optimize-change-cb" data-pid="${p.pid}" data-action="${action}" checked
                style="width:16px; height:16px; cursor:pointer; flex-shrink:0;">
            <div style="width:36px; height:36px; border-radius:50%; overflow:hidden; background:var(--card-bg); flex-shrink:0;">
                <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${p.pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div style="flex:1;">
                <div style="display:flex; align-items:center; gap:6px;">
                    <span style="font-size:12px; font-weight:900; color:#fff;">${p.shortName || p.name}</span>
                    <span class="pos-text-${p.pos.toLowerCase()}" style="font-size:8px; font-weight:900;">${p.pos}</span>
                </div>
                <div style="font-size:10px; color:${color}; font-weight:800; margin-top:2px; text-transform:uppercase;">${action === 'start' ? '▲ Move to Starters' : '▼ Move to Bench'}</div>
            </div>
            <span style="font-size:12px; font-weight:900; color:var(--accent-teal);">${p.proj.toFixed(1)}</span>
        </div>`;

    const modalHtml = `
        <div id="optimize-modal" class="player-modal-backdrop" style="z-index:99999; display:flex;">
            <div class="player-modal-box" style="padding:0; overflow:hidden; max-width:400px;">
                <button class="player-modal-close" onclick="$('#optimize-modal').fadeOut(200); $('body').css('overflow','');">✕</button>
                <div style="padding:16px 20px; border-bottom:1px solid var(--card-border); background:rgba(0,206,184,0.08);">
                    <div style="font-size:14px; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:1px;">Suggested Changes</div>
                    <div style="font-size:10px; color:var(--text-dim); margin-top:3px;">${toStart.length + toBench.length} change${toStart.length + toBench.length !== 1 ? 's' : ''} recommended</div>
                </div>
                <div style="padding:16px; max-height:60vh; overflow-y:auto;">
                    ${toStart.length ? `<div style="font-size:9px; font-weight:900; color:#22c55e; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Start</div>${toStart.map(p => makeRow(p, 'start', '#22c55e')).join('')}` : ''}
                    ${toBench.length ? `<div style="font-size:9px; font-weight:900; color:#f59e0b; text-transform:uppercase; letter-spacing:1px; margin:12px 0 8px;">Bench</div>${toBench.map(p => makeRow(p, 'bench', '#f59e0b')).join('')}` : ''}
                </div>
                <div style="padding:12px 16px; border-top:1px solid var(--card-border); display:flex; gap:8px;">
                    <button onclick="applyOptimizeChanges()" style="flex:1; padding:10px; background:#00ceb8; color:var(--card-bg); border:none; border-radius:8px; font-size:12px; font-weight:900; text-transform:uppercase; cursor:pointer;">Apply Selected</button>
                    <button onclick="$('#optimize-modal').fadeOut(200); $('body').css('overflow','');" style="padding:10px 16px; background:rgba(255,255,255,0.05); color:var(--text-dim); border:1px solid var(--card-border); border-radius:8px; font-size:12px; font-weight:900; cursor:pointer;">Cancel</button>
                </div>
            </div>
        </div>`;

    $('#optimize-modal').remove();
    $('body').append(modalHtml).css('overflow', 'hidden');
};

window.applyOptimizeChanges = function() {
    $('.optimize-change-cb:checked').each(function() {
        const pid = $(this).data('pid');
        const action = $(this).data('action');
        const cb = currentDoc.querySelector(`input[value="${pid}"]`);
        if (cb) cb.checked = (action === 'start');
    });
    $('#optimize-modal').fadeOut(200);
    $('body').css('overflow', '');
    renderActiveTab();
};
function calculateTotalProjections() { 
    let t = 0; 
    $('#slots-starters .player-row:not(.empty-slot)').each(function() { 
        const projText = $(this).find('[style*="accent-teal"]').first().text().replace(' PROJ', '').trim();
        if (projText) t += parseFloat(projText) || 0;
    }); 
    return t.toFixed(1); 
}



function calculateSuggestedProjections() {
    if (!currentDoc) return calculateTotalProjections();
    
    let all = [];
    Array.from(currentDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow')).forEach(row => {
        const pL = row.querySelector('td a[class*="position_"]');
        if (!pL) return;
        const pid = pL.getAttribute('href').match(/\d+/g).pop();
        if (irPids.has(pid) || taxiPids.has(pid)) return;
        const { pos, realPos } = parseMFLName(pL.textContent);
        const proj = parseFloat(row.querySelectorAll('td')[4]?.textContent) || 0;
        all.push({ pos, realPos, proj });
    });

    // Core slots must be filled first by exact position
    const coreSlots = [
        { pos: 'QB',  eligible: ['QB'] },
        { pos: 'RB',  eligible: ['RB'] },
        { pos: 'RB',  eligible: ['RB'] },
        { pos: 'WR',  eligible: ['WR'] },
        { pos: 'WR',  eligible: ['WR'] },
        { pos: 'TE',  eligible: ['TE'] },
        { pos: 'PK',  eligible: ['PK'] },
        { pos: 'DL',  eligible: ['DE','DT'] },
        { pos: 'LB',  eligible: ['LB'] },
        { pos: 'DB',  eligible: ['CB','S'] },
    ];
    const flexSlots = [
        { pos: 'SFLEX', eligible: ['QB','RB','WR','TE'] },
        { pos: 'FLEX',  eligible: ['RB','WR','TE'] },
        { pos: 'FLEX',  eligible: ['RB','WR','TE'] },
        { pos: 'IDP',   eligible: ['DE','DT','LB','CB','S'] },
        { pos: 'IDP',   eligible: ['DE','DT','LB','CB','S'] },
        { pos: 'IDP',   eligible: ['DE','DT','LB','CB','S'] },
    ];

    // Try every permutation order of flex slots to find the true optimal
    // For each combination, greedily fill core slots first, then flex
    let bestTotal = 0;
    
    // Fill core slots greedily (no ambiguity here)
    let remaining = [...all].sort((a, b) => b.proj - a.proj);
    let coreTotal = 0;
    let afterCore = [...remaining];
    
    coreSlots.forEach(slot => {
        const idx = afterCore.findIndex(p => slot.eligible.includes(p.realPos));
        if (idx !== -1) {
            coreTotal += afterCore[idx].proj;
            afterCore.splice(idx, 1);
        }
    });

    // For flex slots, try all orderings to maximize — brute force is fine for 6 slots
    const flexPerms = permutations(flexSlots);
    flexPerms.forEach(perm => {
        let flexRemaining = [...afterCore];
        let flexTotal = 0;
        perm.forEach(slot => {
            const idx = flexRemaining.findIndex(p => slot.eligible.includes(p.realPos));
            if (idx !== -1) {
                flexTotal += flexRemaining[idx].proj;
                flexRemaining.splice(idx, 1);
            }
        });
        if (coreTotal + flexTotal > bestTotal) bestTotal = coreTotal + flexTotal;
    });

    return bestTotal.toFixed(1);
}

function permutations(arr) {
    if (arr.length <= 1) return [arr];
    const result = [];
    arr.forEach((item, i) => {
        const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
        permutations(rest).forEach(perm => result.push([item, ...perm]));
    });
    return result;
}

    // --- 7. QUICK SWAP & FILL LOGIC ---
function buildSwapRow(p) {
        let teamMatch = p.sec.match(/(?:vs|@)\s*([A-Z]{2,3})/i);
        let opp = teamMatch ? teamMatch[1].toUpperCase() : null;
        let badge = '';
        if (opp && pointsAllowedMap[opp]?.[p.realPos]) {
            const pts = parseFloat(pointsAllowedMap[opp][p.realPos]);
            let rankNum = pointsAllowedRankMap[p.realPos] ? pointsAllowedRankMap[p.realPos][opp] : 0;
            let displayPts = Math.round(pts);
            let cls = (rankNum >= 24) ? 'matchup-easy' : (rankNum <= 9) ? 'matchup-tough' : 'matchup-neutral';
            badge = `<div class="matchup-pts ${cls} pa-breakdown-trigger" data-team="${opp}" data-pos="${p.realPos}" style="cursor: pointer; margin-top: 3px; display: inline-block; font-size: 9px; padding: 2px 6px; border-radius: 4px;" title="View game log">${displayPts} PA (#${rankNum})</div>`;
        }
        
        const avgNum = playerAverages[p.pid] ? playerAverages[p.pid].toFixed(1) : "0.0";
        const rankStr = playerRanks[p.pid] ? `#${playerRanks[p.pid]}` : "NR";

        let rightDataHtml = `
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
                <span style="font-size: 12px; font-weight: 900; color: var(--text-main);">${p.proj.toFixed(1)} PROJ</span>
                <div style="display: flex; gap: 6px; align-items: center;">
                    <span style="font-size: 9px; font-weight: 900; color: var(--accent-blue);">${p.pos}${rankStr}</span>
                    <span style="font-size: 9px; font-weight: 800; color: var(--text-dim); letter-spacing: 0.5px;">${avgNum} AVG</span>
                </div>
            </div>`;

        return buildUniversalRow(
            { pid: p.pid, name: p.name, shortName: p.shortName, pos: p.pos, team: p.team },
            {
                isSwapView: true,
                subText: p.sec,
                subBadge: badge,
                rightContent: rightDataHtml,
                badgeContainerStyle: 'background: rgba(255,255,255,0.05); padding: 6px 10px; border-radius: 8px;'
            }
        );
    }
function populateQuickSwap(targetPos, findBench, targetContainer = '#quick-swap-list') {
        const list = $(targetContainer).empty(); let eligible = [targetPos];
        if (['FLEX', 'WR', 'RB', 'TE'].includes(targetPos)) eligible = ['WR', 'RB', 'TE'];
        if (['SFLEX', 'QB', 'WR', 'RB', 'TE'].includes(targetPos)) eligible = ['QB', 'WR', 'RB', 'TE'];
        if (['DL', 'DE', 'DT'].includes(targetPos)) eligible = ['DE', 'DT'];
        if (['DB', 'S', 'CB'].includes(targetPos)) eligible = ['S', 'CB'];
        if (['IDP', 'DE', 'DT', 'LB', 'S', 'CB'].includes(targetPos)) eligible = ['DE', 'DT', 'LB', 'S', 'CB'];

        let players = Array.from(currentDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow')).map(row => {
            const cb = row.querySelector('input[type="checkbox"]'); const pL = row.querySelector('td a[class*="position_"]');
            if (!cb || !pL || irPids.has(cb.value) || taxiPids.has(cb.value)) return null;
            
            // WE GRAB REALPOS HERE
            const { name, shortName, pos, realPos, team } = parseMFLName(pL.textContent);
            
            // WE ADD REALPOS TO THE RETURN OBJECT
            return { pid: cb.value, name, shortName, pos, realPos, team, proj: parseFloat(row.querySelectorAll('td')[4]?.textContent) || 0, sec: row.querySelectorAll('td')[1]?.textContent.split('(')[0].trim() || "BYE", isChecked: cb.checked };
            
        // WE FILTER BY REALPOS HERE
        }).filter(p => p && (p.isChecked === !findBench) && eligible.includes(p.realPos));
        
        players.sort((a, b) => b.proj - a.proj).forEach(p => list.append(buildSwapRow(p)));
    }

function populateFillMenu(slot) {
        const list = $('#quick-swap-list').empty(); let allowed = LINEUP_RULES.groups[slot] || [slot];
        if(slot === "DL") allowed = ['DE', 'DT']; if(slot === "DB") allowed = ['CB', 'S'];
        
        let players = Array.from(currentDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow')).map(row => {
            const cb = row.querySelector('input[type="checkbox"]'); const pL = row.querySelector('td a[class*="position_"]');
            if (!cb || cb.checked || !pL || irPids.has(cb.value) || taxiPids.has(cb.value)) return null;
            
            // WE GRAB REALPOS HERE
            const { name, shortName, pos, realPos, team } = parseMFLName(pL.textContent);
            
            // WE ADD REALPOS TO THE RETURN OBJECT
            return { pid: cb.value, name, shortName, pos, realPos, team, proj: parseFloat(row.querySelectorAll('td')[4]?.textContent) || 0, sec: row.querySelectorAll('td')[1]?.textContent.split('(')[0].trim() || "BYE" };
            
        // WE FILTER BY REALPOS HERE
        }).filter(p => p && allowed.includes(p.realPos));
        
        players.sort((a,b)=>b.proj-a.proj).forEach(p => list.append(buildSwapRow(p)));
    }

    // --- 8. UTILITIES ---
function buildUniversalRow(data, opts = {}) {
        let playerTeam = (data.team || 'NFL').toUpperCase();
        let rStat = opts.forcedStatus || (irPids.has(data.pid.toString()) ? "IR" : taxiPids.has(data.pid.toString()) ? "TS" : "");
        const injHtml = getInjuryHtml(data.pid);
        
const inlineStatusBadge = rStat === 'IR' ? IR_ICON : rStat === 'TS' ? TS_ICON : "";
const inlinePosBadge = `<span class="pos-text-${(data.pos||'').toLowerCase()}" style="font-size: 10px; font-weight: 900; flex-shrink: 0;">${data.pos || ''}</span>`;



const inlineTeamLogo = `<img src="${getNFLLogoUrl(playerTeam)}" onerror="this.style.display='none'" style="width: 30px; height: 30px; object-fit: contain; flex-shrink: 0;">`;  
        const lockIcon = opts.isLocked ? `<span style="position:absolute; top:-6px; right:-6px; background:#ef4444; border-radius:50%; width:16px; height:16px; display:flex; align-items:center; justify-content:center; font-size:8px; border:1px solid var(--card-bg); z-index:20;" title="${opts.lockMsg || ''}">🔒</span>` : '';
        const opacityStyle = opts.isLocked ? 'opacity: 0.6; filter: grayscale(0.5);' : (opts.opacityStyle || '');

        const rowClass = opts.isSwapView ? 'swap-item' : 'player-row';
        const imgClass = opts.isSwapView ? 'swap-img' : 'player-img';
        const infoClass = opts.isSwapView ? 'swap-info' : 'player-info';
        const nameClass = opts.isSwapView ? 'swap-name' : 'player-name-slot';

let subHtml = `
    <div class="player-secondary-slot" style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start; gap: 6px; margin-top: 5px;">
        <div style="display: inline-flex; align-items: center; gap: 5px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 3px 7px;">
            ${inlineTeamLogo}
            <span style="font-size: 10px; font-weight: 800; line-height: 1; ${opts.subTextColor ? `color:${opts.subTextColor};` : 'color: var(--text-dim);'}">${opts.subText || '-'}</span>
        </div>
        ${opts.subBadge ? `<div style="margin-top: 0;">${opts.subBadge}</div>` : ''}
    </div>`;
        let imgHtml = opts.isSwapView 
            ? `<img class="${imgClass}" src="https://www.mflscripts.com/playerImages_80x107/mfl_${data.pid}.png" onerror="this.style.display='none'" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`
            : `<div class="player-circle" style="width: 100%; height: 100%;"><img class="${imgClass}" src="https://www.mflscripts.com/playerImages_80x107/mfl_${data.pid}.png" onerror="this.style.display='none'" style="width: 100%; height: 100%; object-fit: cover;"></div>`;

        return `
            <div class="${rowClass} pos-border-${(data.pos||'').toLowerCase()} ${opts.extraClasses || ''}" 
                 data-pid="${data.pid}" data-pname="${data.name}" data-pteam="${data.team}" data-ppos="${data.pos}"
                 style="${opacityStyle} ${opts.rowStyle || ''}" ${opts.extraAttributes || ''}>
                ${opts.leftContent || ''}
                
                <div class="player-img-wrapper" style="width: 42px; height: 42px; flex-shrink: 0; margin-right: 12px; border: none; background: transparent; position: relative;">
                    ${imgHtml}
                    ${lockIcon}
                </div>

                <div class="${infoClass}" style="flex: 1; min-width: 0; padding-left: 0; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; text-align: left;">
                    <div class="${nameClass}" style="display: flex; align-items: center; flex-wrap: wrap;">
                        <span class="full-name" style="font-size: 13px; font-weight: 800; color: #fff;">${data.name}</span>
                        <span class="short-name" style="display: none;">${data.shortName || data.name}</span> 
${inlinePosBadge}
                        ${inlineStatusBadge}
${injHtml}
                        ${getRookieHtml(data.pid)}
                        ${getTradeBlockHtml(data.pid)}
                        ${opts.nameSuffix || ''}
                    </div>
${subHtml}
                    ${opts.bottomContent || ''}
                </div>

                <div class="mini-arc-overlay" style="display:none; flex-direction:column; align-items:center; width:72px; margin-top:4px;">
                    <div style="font-size:9px; font-weight:800; color:#fff; text-align:center; line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:70px;">${data.shortName || data.name}</div>
                    <div style="display:flex; align-items:center; gap:4px; margin-top:3px;">
                        <img src="${getNFLLogoUrl(playerTeam)}" style="width:10px; height:10px; object-fit:contain;">
                        <span class="pos-text-${(data.pos||'').toLowerCase()}" style="font-size:7px; font-weight:900;">${data.pos || ''}</span>
                    </div>
                </div>

                <div class="player-right-slot" style="${opts.rightSlotStyle || ''}">
                    ${opts.rightContent ? `<span class="data-badge" style="background:transparent; padding:0; border:none; ${opts.badgeContainerStyle||''}">${opts.rightContent}</span>` : ''}
                </div>
            </div>`;
    }
    function renderEmptySlot(label) {
        const sug = getBestBenchOption(label);
        let info = sug ? `<div class="player-info"><div class="player-name-slot suggestion-ghost"><span class="full-name">${sug.name}</span><span class="short-name">${sug.shortName}</span></div><div class="player-secondary-slot suggestion-ghost">Best: ${sug.pos} (${sug.proj} Proj)</div><div class="suggestion-action-container"><button class="swap-upgrade-btn suggest-fill-btn" data-pid="${sug.pid}">Start ${sug.name}</button></div></div>` : `<div class="player-info"><div class="player-name-slot empty-text">Empty ${label}</div><div class="player-secondary-slot">Tap to fill slot</div></div>`;
        return `<div class="player-row empty-slot" data-slot-type="${label}"><div class="move-btn-wrapper"><button class="move-handle-btn">${label}</button></div><div class="player-img-wrapper"><div class="player-circle empty"><span class="empty-icon">?</span></div></div>${info}</div>`;
    }
    
function getBestBenchOption(slot) {
        if (!currentDoc) return null; let allowed = LINEUP_RULES.groups[slot] || [slot];
        if(slot === "DL") allowed = ['DE', 'DT']; if(slot === "DB") allowed = ['CB', 'S'];
        let bench = Array.from(currentDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow')).map(row => {
            const cb = row.querySelector('input[type="checkbox"]'); const pL = row.querySelector('td a[class*="position_"]');
            if (!cb || cb.checked || !pL || irPids.has(cb.value) || taxiPids.has(cb.value)) return null;
            const { name, shortName, pos, realPos } = parseMFLName(pL.textContent);
            return { pid: cb.value, name, shortName, pos, realPos, proj: parseFloat(row.querySelectorAll('td')[4]?.textContent) || 0 };
        }).filter(p => p && allowed.includes(p.realPos));
        return bench.length === 0 ? null : bench.sort((a,b)=>b.proj-a.proj)[0];
    }
    function updateLineupNotifications() {
        const container = document.getElementById('lineup-notifications'); if (!container) return;
        container.innerHTML = ''; const empty = document.querySelectorAll('.player-row.empty-slot').length;
        if (empty > 0) $(container).append(`<div class="lineup-alert alert-error">⚠️ Incomplete: ${empty} Remaining</div>`);
    }

    function updateSubmitButton() {
        const changes = getLineupChanges(); const total = changes.added.length + changes.removed.length;
        if (total > 0 && $('.sub-tab-btn.active').text().toLowerCase().includes('lineup')) { $('#lineup-submit-float').addClass('visible').find('.change-count').text(total); }
        else { $('#lineup-submit-float').removeClass('visible'); }
    }

    function getLineupChanges() {
        if (!currentDoc) return { added: [], removed: [] };
        const current = new Set(Array.from(currentDoc.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value));
        const added = [...current].filter(id => !originalStarterIds.has(id));
        const removed = [...originalStarterIds].filter(id => !current.has(id));
        return { added, removed };
    }

    window.hideMenu = function() { $('#player-context-menu').removeClass('active'); $('body').css('overflow', ''); activePlayerRow = null; };

    // --- 9. EVENT LISTENERS ---
$(document).on('click', '#edit-team-name-btn', function() {
    const current = $('#settings-team-name').text();
    const parts = current.split(' ');
    // Try to split location from team name using saved location
    const savedLoc = localStorage.getItem(`franchise_location_${myFid}`) || '';
    $('#edit-location').val(savedLoc);
    $('#edit-teamname').val(savedLoc ? current.replace(savedLoc, '').trim() : current);
    $('#edit-team-name-form').css('display', 'flex');
    $('#edit-team-name-btn').hide();
});

$(document).on('click', '#edit-team-name-cancel', function() {
    $('#edit-team-name-form').hide();
    $('#edit-team-name-btn').show();
});

$(document).on('click', '#edit-team-name-save', async function() {
    const location = $('#edit-location').val().trim();
    const teamName = $('#edit-teamname').val().trim();
    const fullName = location ? `${location} ${teamName}` : teamName;
    localStorage.setItem(`franchise_location_${myFid}`, location);

    $(this).text('Saving...').prop('disabled', true);
    try {
        const pageRes = await fetch(`https://www45.myfantasyleague.com/${year}/csetup?L=${lid}&FRANCHISES=${Object.keys(leagueFranchises).join(',')}&C=FRANCHISE`, { credentials: 'include' });
        const pageDoc = new DOMParser().parseFromString(await pageRes.text(), 'text/html');
        const inputExpires = pageDoc.querySelector('input[name="input_expires"]')?.value || '';

        const params = new URLSearchParams();
        params.set('form_name', 'franchise');
        params.set('LEAGUE_ID', lid);
        params.set('C', 'FRANCHISE');
        params.set('input_expires', inputExpires);
        params.set('FRANCHISES', Object.keys(leagueFranchises).join(','));

        Object.keys(leagueFranchises).forEach(fid2 => {
            params.set(`FRANCHISE_NAME${fid2}`, pageDoc.querySelector(`#FRANCHISE_NAME${fid2}`)?.value || '');
            params.set(`FRANCHISE_OWNER_NAME${fid2}`, pageDoc.querySelector(`#FRANCHISE_OWNER_NAME${fid2}`)?.value || '');
            params.set(`FRANCHISE_EMAIL${fid2}`, pageDoc.querySelector(`#FRANCHISE_EMAIL${fid2}`)?.value || '');
        });

        params.set(`FRANCHISE_NAME${myFid}`, fullName);
        params.set(`FRANCHISE_OWNER_NAME${myFid}`, $('#ts-owner-name').val().trim());
        params.set(`FRANCHISE_EMAIL${myFid}`, $('#ts-email').val().trim());
        params.set('SUBMIT', 'Save Franchise Information');
        console.log('Posting params:', params.toString());

        const saveRes = await fetch(`https://www45.myfantasyleague.com/${year}/csetup`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });

        if (saveRes.ok) {
            leagueFranchises[myFid] = fullName;
            $('#settings-team-name').text(fullName);
            $('#switcher-team-name').text(fullName);
            $('#edit-team-name-form').hide();
            $('#edit-team-name-btn').show();
        } else {
            throw new Error('Save failed');
        }
    } catch(e) {
        console.error('Name save error:', e);
        alert('Save failed: ' + e.message);
    }
    $(this).text('Save').prop('disabled', false);
});
$(document).on('click', '#toggle-fa-mode-btn', async function() {
    if (myFid !== '0000' && myFid !== '0001') return;
    const current = localStorage.getItem(`fa_mode_${lid}`) !== 'false';
    const newState = !current;
    try {
        const params = new URLSearchParams();
        params.set('LEAGUE_ID', lid);
        params.set('NAME', 'message7');
        params.set('MSG', `<!--FAMODE:${newState}-->`);
        params.set('LABEL', '');
        params.set('IN_HEADER', 'Yes');
        params.set('IN_FOOTER', 'Yes');
        await fetch(`https://www45.myfantasyleague.com/${year}/message`, {
            method: 'POST', credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });
    } catch(e) { console.warn('Could not save FA mode', e); }
    localStorage.setItem(`fa_mode_${lid}`, newState);
    updateFaModeToggleUI(newState);
    window.offseasonMode = newState;
});
$(document).on('click', '#toggle-contracts-stats-btn', function() {
    const full = $('#contracts-stats-row-full');
    const summary = $('#contracts-stats-row');
    const isVisible = full.is(':visible');
    if (!isVisible) {
        const d = contractsStatsData;
        const pc = d.posCounts || {};
        full.html(`
            <div class="dashboard-pill stacked-pill" style="min-width:45px; border-bottom-color:#3b82f6;"><span class="pill-label">ROSTER</span><span class="pill-value">${d.totalPlayers}/${LINEUP_RULES.rosterLimit}</span></div>
            <div class="dashboard-pill stacked-pill" style="min-width:45px; border-bottom-color:#ef4444;"><span class="pill-label">IR</span><span class="pill-value">${d.totalIR}/4</span></div>
            <div class="dashboard-pill stacked-pill" style="min-width:45px; border-bottom-color:#f59e0b;"><span class="pill-label">TAXI</span><span class="pill-value">${d.totalTaxi}/5</span></div>
            ${[{l:'QB',min:1},{l:'RB',min:2},{l:'WR',min:2},{l:'TE',min:1},{l:'DL',min:1},{l:'LB',min:1},{l:'DB',min:1}]
                .map(p => `<div class="dashboard-pill stacked-pill stat-${p.l.toLowerCase()} ${(pc[p.l]||0) < p.min ? 'status-empty' : ''}"><span class="pill-label">${p.l}</span><span class="pill-value">${pc[p.l]||0}/${p.min}</span></div>`).join('')}
        `);
    }
    full.toggle(!isVisible);
    summary.toggle(isVisible);
    $(this).text(isVisible ? 'All' : 'Less');
});



$(document).on('click', '#toggle-all-stats-btn', function() {
    const full = $('#lineup-stats-row-full');
    const summary = $('#lineup-stats-row');
    const isVisible = full.is(':visible');
    full.toggle(!isVisible);
    summary.toggle(isVisible);
    $(this).text(isVisible ? 'All' : 'Less');
});


$(document).on('click', '.player-sort-btn', function() {
    playerSortBy = $(this).data('sort');
    const activeSubBtn = $('#subtabs-players .sub-tab-btn.active');
    const subId = activeSubBtn.length ? activeSubBtn.text().trim().toLowerCase().replace(' ', '-') : 'free-agents';
    loadPlayersData(subId);
});
$(document).on('click', '.player-pos-filter-btn', function() {
    const newPos = $(this).data('pos');
    playerPosFilter = newPos;
    // Clear cache for current tab so it re-fetches with new position
    const activeSubBtn = $('#subtabs-players .sub-tab-btn.active');
    const subId = activeSubBtn.length ? activeSubBtn.text().trim().toLowerCase().replace(' ', '-') : 'free-agents';
    const cacheKey = `${subId}_${playerPosFilter}`;
    if (window._playerRowsCache) delete window._playerRowsCache[cacheKey];
    loadPlayersData(subId);
});

$(document).on('click', '.player-sort-btn', function() {
    // 1. Set the global sort
    playerSortBy = $(this).data('sort');
    
    // 2. Identify active sub-tab
    const activeSubBtn = $('#subtabs-players .sub-tab-btn.active');
    const subId = activeSubBtn.length ? activeSubBtn.text().trim().toLowerCase().replace(' ', '-') : 'free-agents';
    
    // 3. Refresh data
    loadPlayersData(subId);
});
// --- SCOREBOARD LINEUP DRAWER TOGGLE ---
    $(document).off('click touchend', '.matchup-drawer-trigger').on('click touchend', '.matchup-drawer-trigger', function(e) {
        if (e.type === 'touchend') e.preventDefault();
        
        const wrapper = $(this).closest('.matchup-card-wrapper');
        const drawer = wrapper.find('.matchup-lineup-drawer');
        const icon = $(this).find('.drawer-icon');

        drawer.slideToggle(200);
        
        if (icon.css('transform') !== 'none' && icon.css('transform') !== 'matrix(1, 0, 0, 1, 0, 0)') {
            icon.css('transform', 'rotate(0deg)');
        } else {
            icon.css('transform', 'rotate(-180deg)');
        }
    });
    $(document).on('click touchend', '.sort-btn', function(e) {
        if (e.type === 'touchend') e.preventDefault();
        const type = $(this).data('type');
        const val = $(this).data('val');
        if (type === 'contracts') { contractSortBy = val; } 
        else { lineupSortBy = val; }
        renderActiveTab();
    });

    $(document).on('click touchend', '#toggle-group-btn', function(e) {
        if (e.type === 'touchend') e.preventDefault();
        isGrouped = !isGrouped;
        renderActiveTab();
    });

     $(document).on('click touchend', '.pos-group-header .toggle-icon', function(e) {
        if (e.type === 'touchend') e.preventDefault();
        e.stopPropagation();
        const wrapper = $(this).closest('.pos-group-wrapper');
        const pos = wrapper.data('pos');
        wrapper.toggleClass('is-minimized');
        $(this).toggleClass('rotated');
        if (wrapper.hasClass('is-minimized')) { minimizedGroups.add(pos); } 
        else { minimizedGroups.delete(pos); }
    });


    $(document).on('click touchend', '#toggle-all-groups-btn', function(e) {
        if (e.type === 'touchend') e.preventDefault();
        let isMin = $(this).data('minimized');
        if (!isMin) {
            $('.pos-group-wrapper').addClass('is-minimized');
            $('.pos-group-header .toggle-icon').removeClass('rotated');
            $(this).data('minimized', true).text('SHOW ALL');
            $('.pos-group-wrapper').each(function() { minimizedGroups.add($(this).data('pos')); });
        } else {
            $('.pos-group-wrapper').removeClass('is-minimized');
            $('.pos-group-header .toggle-icon').addClass('rotated');
            $(this).data('minimized', false).text('MINIMIZE ALL');
            minimizedGroups.clear();
        }
    });

$(document).on('click touchend', '.move-handle-btn', function(e) {
        if (e.type === 'touchend' && touchMoved) return;
        if (!$('.sub-tab-btn.active').text().toLowerCase().includes('lineup')) return;
        
        const isCommish = true; // 🔑 MASTER KEY
        // THE FIX: Unblock this button if you are the Commissioner!
        if (typeof myFid !== 'undefined' && fid !== myFid && !isCommish) return;
        
        activePlayerRow = $(this).closest('.player-row');
        $('#menu-move-action').hide();

        if (activePlayerRow.hasClass('empty-slot')) {
            const slot = activePlayerRow.data('slot-type');
            $('#menu-player-info-container').html(`<div class="empty-slot-header">Fill ${slot} Slot</div>`);
            populateFillMenu(slot); $('#player-context-menu').addClass('active'); return;
        }

        const pid = activePlayerRow.data('pid');
        const pos = activePlayerRow.find('.pos-badge-overlay:not(.status-badge-overlay)').text().trim();
        const teamImg = activePlayerRow.find('.team-logo-overlay').attr('src'); 
        const team = teamImg ? teamImg.split('/').pop().split('.')[0] : 'nfl';
        const isStarter = activePlayerRow.closest('#slots-starters').length > 0;
        
        const playerName = activePlayerRow.find('.full-name').length ? activePlayerRow.find('.full-name').text() : activePlayerRow.find('.player-name-slot, .swap-name').text().trim();
        const isIR = irPids.has(pid.toString());
        const isTS = taxiPids.has(pid.toString());
        
        let rStat = isIR ? "IR" : isTS ? "TS" : "";
        let sb = rStat ? `<span class="status-badge-overlay status-${rStat.toLowerCase()}">${rStat}</span>` : "";
        const sec = activePlayerRow.find('.matchup-opp-text').text() || "";
        const badge = activePlayerRow.find('.matchup-pts').parent().html() || "";
const proj = row.find('.data-badge').first().text() || "0.0 PROJ";
        const hasInjury = activePlayerRow.find('.injury-badge').length > 0;

        $('#menu-player-info-container').html(`<div class="swap-item active-player-preview preview-action-btn" data-action-pid="${pid}"><div class="player-img-wrapper"><img src="https://www.mflscripts.com/playerImages_80x107/mfl_${pid}.png" class="swap-img"><img class="team-logo-overlay" src="${getNFLLogoUrl(team)}"><span class="pos-badge-overlay pos-${pos.toLowerCase()}">${pos}</span>${sb}</div><div class="swap-info"><div class="swap-name">${playerName}</div><div class="matchup-stack"><div class="matchup-opp-text">${sec}</div>${badge}</div></div><div class="header-right-meta"><span class="data-badge projection-style">${proj}</span><div class="action-tag">${isStarter ? "Tap to Bench" : (isIR || isTS) ? "Deactivated" : "Tap to Start"}</div></div></div>`);

        if (isIR || isTS) {
            const action = isIR ? 'activate' : 'promote';
            const actionText = isIR ? 'Activate from IR' : 'Promote from Taxi';
            $('#quick-swap-list').html(`
                <div style="padding: 20px 15px; text-align: center;">
                    <p style="color: var(--text-dim); font-size: 12px; margin-bottom: 15px;">This player is deactivated. You must move them to your active roster to start them.</p>
                    <button class="roster-tx-btn" data-tx-type="${action}" data-tx-pid="${pid}" style="width: 100%; padding: 14px; border-radius: 8px; background: var(--accent-blue); color: #fff; font-weight: 800; border: none; cursor: pointer; text-transform: uppercase;">${actionText}</button>
                </div>
            `);
        } else {
            populateQuickSwap(pos, isStarter); 
            if (!isStarter) {
                let irBtnHtml = hasInjury 
                    ? `<button class="roster-tx-btn" data-tx-type="deactivate" data-tx-pid="${pid}" style="flex: 1; padding: 10px; border-radius: 6px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); font-weight: 800; font-size: 10px; cursor: pointer; text-transform: uppercase;">Move to IR</button>`
                    : `<button disabled style="flex: 1; padding: 10px; border-radius: 6px; background: rgba(255, 255, 255, 0.05); color: var(--text-dim); border: 1px dashed rgba(255, 255, 255, 0.15); font-weight: 800; font-size: 10px; cursor: not-allowed; text-transform: uppercase;" title="Player must have an injury designation to be placed on IR">IR (Not Injured)</button>`;

                $('#quick-swap-list').prepend(`
                    <div style="display: flex; gap: 10px; padding: 10px 15px; border-bottom: 1px solid var(--card-border); background: rgba(0,0,0,0.2);">
                        ${irBtnHtml}
                        <button class="roster-tx-btn" data-tx-type="demote" data-tx-pid="${pid}" style="flex: 1; padding: 10px; border-radius: 6px; background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); font-weight: 800; font-size: 10px; cursor: pointer; text-transform: uppercase;">Move to Taxi</button>
                    </div>
                `);
            }
        }
        $('#player-context-menu').addClass('active');
    });

    $(document).on('click', '.roster-tx-btn', function() {
        const type = $(this).data('tx-type');
        const pid = $(this).data('tx-pid');
        if (type === 'deactivate' && irPids.size >= 4) { renderTxSwapMenu('IR', pid); return; }
        if (type === 'demote' && taxiPids.size >= 5) { renderTxSwapMenu('TS', pid); return; }
        executeTransaction(type, pid, null, $(this));
    });
$(document).on('click', '.management-trigger', function(e) {
    e.stopPropagation();
    const pid = $(this).closest('.player-row').data('pid');
    openPlayerManagement(pid);
});
    $(document).on('click', '.roster-tx-execute-btn', function() {
        executeTransaction($(this).data('tx-type'), $(this).data('source-pid'), $(this).data('target-pid'), $(this));
    });

    function renderTxSwapMenu(group, sourcePid) {
        const list = $('#quick-swap-list').empty();
        const isIR = group === 'IR';
        const players = isIR ? irPlayers : taxiPlayers;
        const actionText = isIR ? "Activate" : "Promote";
        const txType = isIR ? "swap-ir" : "swap-ts";
        
        list.append(`<div style="padding: 15px; text-align: center; color: #ef4444; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid var(--card-border); background: rgba(239,68,68,0.05);">⚠️ ${group} is Full. Select player to ${actionText}</div>`);
        
        players.forEach(p => {
            const pInjHtml = getInjuryHtml(p.pid);
            list.append(`
                <div class="swap-item pos-border-${p.pos.toLowerCase()}" style="cursor:default; display:flex; justify-content:space-between;">
                    <div style="display:flex; align-items:center;">
                        <div class="player-img-wrapper">
                            <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${p.pid}.png" class="swap-img">
                            <span class="pos-badge-overlay pos-${p.pos.toLowerCase()}">${p.pos}</span>
                        </div>
                        <div class="swap-info">
                            <div class="swap-name"><span class="full-name">${p.name}</span><span class="short-name">${p.shortName}</span> ${pInjHtml}</div>
                            <div class="matchup-stack"><div class="matchup-opp-text">${p.sec}</div></div>
                        </div>
                    </div>
                    <div class="player-right-slot">
                        <button class="roster-tx-execute-btn" data-tx-type="${txType}" data-source-pid="${sourcePid}" data-target-pid="${p.pid}" style="padding: 8px 12px; border-radius: 6px; background: var(--accent-blue); color: #fff; border: none; font-weight: 800; font-size: 10px; cursor: pointer; text-transform: uppercase;">Swap</button>
                    </div>
                </div>
            `);
        });
    }
function renderDropMenu(addPid) {
        const list = $('#quick-swap-list').empty();
        const pToAdd = Array.from(currentDoc.querySelectorAll('td.player a')).find(a => a.href.includes(addPid));
        const addName = pToAdd ? pToAdd.textContent.split(' ')[0] : "Player";

        list.append(`<div style="padding: 15px; text-align: center; color: #ef4444; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid var(--card-border); background: rgba(239,68,68,0.05);">⚠️ Roster Full. Select player to DROP to add ${addName}</div>`);
        
        // Scrape your current roster from the cached document
        currentDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
            const pLink = row.querySelector('td.player a[class*="position_"]');
            const cb = row.querySelector('input[type="checkbox"]');
            if (!pLink || !cb) return;

            // Don't show players already on IR or Taxi as drop candidates here (MFL rules vary)
            const pid = cb.value;
            if (irPids.has(pid) || taxiPids.has(pid)) return;

            const { name, pos, team } = parseMFLName(pLink.textContent);

            list.append(`
                <div class="swap-item pos-border-${pos.toLowerCase()}" onclick="executeTransaction('add-drop', '${addPid}', '${pid}', $(this))" style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center;">
                        <div class="player-img-wrapper" style="width:32px; height:32px;">
                            <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${pid}.png" class="swap-img" style="width:100%; height:100%; border-radius:50%;">
                        </div>
                        <div class="swap-info" style="margin-left:10px;">
                            <div class="swap-name" style="font-size:12px;">${name}</div>
                            <div style="font-size:9px; color:var(--text-dim); text-transform:uppercase;">${team} • ${pos}</div>
                        </div>
                    </div>
                    <div style="font-size:10px; font-weight:900; color:#ef4444; text-transform:uppercase; padding-right:5px;">Drop</div>
                </div>
            `);
        });
        
        $('#player-context-menu').addClass('active');
    }
async function executeTransaction(type, sourcePid, targetPid, btn) {
        // Handle Roster Full logic for simple adds
        if (type === 'add' && window.currentRosterSize >= LINEUP_RULES.rosterLimit) {
            renderDropMenu(sourcePid);
            return;
        }

        btn.text('Processing...').css({'opacity': '0.5', 'pointer-events': 'none'});
        
        const apiData = new URLSearchParams();
        apiData.append('L', lid);
        apiData.append('TYPE', 'fcfsWaiver'); // MFL standard for Add/Drops

        if (type === 'add') {
            apiData.append('ADD', sourcePid);
        } else if (type === 'add-drop') {
            apiData.append('ADD', sourcePid);
            apiData.append('DROP', targetPid);
        }

        // Handle the existing IR/Taxi logic
        let url = 'import'; // Add/Drops go to the import endpoint
        if (['activate', 'deactivate', 'swap-ir'].includes(type)) {
            url = 'ir';
if (type === 'activate') apiData.append('ACTIVATE', sourcePid);
if (type === 'deactivate') apiData.append('DEACTIVATE', sourcePid);
if (type === 'swap-ir') { apiData.append('DEACTIVATE', sourcePid); apiData.append('ACTIVATE', targetPid); }
        }
if (['promote', 'demote', 'swap-ts'].includes(type)) {
    url = 'taxi_squad';
    apiData.delete('TYPE');
    if (type === 'promote') apiData.append('PROMOTE', sourcePid);
    if (type === 'demote') apiData.append('DEMOTE', sourcePid);
    if (type === 'swap-ts') { apiData.append('DEMOTE', sourcePid); apiData.append('PROMOTE', targetPid); }
}
        if (fid !== myFid) apiData.append('FRANCHISE_ID', fid);

        try {
            const res = await fetch(`https://www45.myfantasyleague.com/${year}/${url}`, { 
                method: 'POST', body: apiData, credentials: 'include' 
            });
            let responseText = await res.text();
            let wasWaiverClaim = false;

            if (responseText.toLowerCase().includes('error') && (type === 'add' || type === 'add-drop')) {
                const waiverData = new URLSearchParams();
                waiverData.append('L', lid);
                waiverData.append('TYPE', 'waiverRequest');
                waiverData.append('ROUND', '1');
                waiverData.append('PICKS', `${sourcePid}_${type === 'add-drop' ? targetPid : '0000'}`);
                if (fid !== myFid) waiverData.append('FRANCHISE_ID', fid);

                const waiverRes = await fetch(`https://www45.myfantasyleague.com/${year}/import`, {
                    method: 'POST', body: waiverData, credentials: 'include'
                });
                responseText = await waiverRes.text();
                wasWaiverClaim = true;
            }

            if (responseText.toLowerCase().includes('error')) {
                const errorMatch = responseText.match(/<error[^>]*>(.*?)<\/error>/i);
                alert("MFL Rejected: " + (errorMatch ? errorMatch[1] : "Check league rules."));
                btn.text('Error').css({'opacity': '1', 'pointer-events': 'auto', 'background': '#ef4444'});
} else {
    alert(wasWaiverClaim ? "Player is locked — submitted as a waiver claim (Round 1) instead." : "Transaction successful!");
    hideMenu();
    await fetchMasterStatus(); 
window._teamDataDirty = true;
    await loadTeamData();
}
        } catch (e) { 
            console.error("Transaction Error", e); 
            btn.text('Error').css({'opacity': '1', 'pointer-events': 'auto', 'background': '#ef4444'}); 
        }
    }
$(document).off('click', '#year-selector-pill').on('click', '#year-selector-pill', function(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('year pill clicked, _yearSelectorOpen before:', window._yearSelectorOpen);
    window._yearSelectorOpen = !window._yearSelectorOpen;
    console.log('year pill clicked, _yearSelectorOpen after:', window._yearSelectorOpen);
    window._teamDataDirty = true;
    loadTeamData();
});

$(document).off('click', '.year-selector-item').on('click', '.year-selector-item', function(e) {
    e.stopPropagation();
    selectedYear = parseInt($(this).data('year'));
    window._yearSelectorOpen = false;
    window._teamDataDirty = true;
    loadTeamData();
});

let isConfirming = false; 
    window.confirmAndSubmit = function() {
        if (isConfirming) return; isConfirming = true;        
        const { added, removed } = getLineupChanges();
        let message = "Are you sure you want to save these changes?\n\n";
        if (added.length > 0) message += `✅ Starting ${added.length} player(s)\n`;
        if (removed.length > 0) message += `🪑 Benching ${removed.length} player(s)\n`;

        if (confirm(message)) {
            const isCommish = true; // 🔑 YOUR MASTER KEY
            const isOverride = (fid !== myFid && isCommish && window.commishDoc);
            
            let submitTargetURL;
            let payloadData = "";

            if (isOverride) {
                submitTargetURL = `https://www45.myfantasyleague.com/${year}/options`;
                let params = new URLSearchParams();
                
                // CRITICAL FIX 1: Grab ALL hidden inputs from the Commish page (This includes 'W' for Week!)
                window.commishDoc.querySelectorAll('input[type="hidden"]').forEach(inp => {
                    params.append(inp.name, inp.value);
                });
                
                // Ensure the core routing parameters are explicitly set
                params.set('L', lid);
                params.set('O', '02');
                params.set('FRANCHISE_ID', fid);
                params.set('F', '0000'); // Force God-Mode
                
                let validStarters = Array.from(currentDoc.querySelectorAll('input[type="checkbox"]:checked'))
                    .map(cb => cb.value)
                    .filter(val => !irPids.has(val) && !taxiPids.has(val));
                
                // CRITICAL FIX 2: Map our checked players back into MFL's exact dropdown names
                let allDropdowns = Array.from(window.commishDoc.querySelectorAll('select')).filter(s => s.name.startsWith('starter'));
                
                allDropdowns.forEach((d, index) => {
                    let pidToStart = validStarters[index] || ""; // Leaves it blank if we run out of starters
                    params.append(d.name, pidToStart);
                });
                
                params.append('submit', 'Save Lineup'); 
                payloadData = params.toString();
                
            } else {
                submitTargetURL = `https://www45.myfantasyleague.com/${year}/lineup?L=${lid}&F=${fid}`;
                const normalForm = currentDoc.querySelector('form[name="lineupForm"]') || currentDoc.querySelector('form');
                payloadData = $(normalForm).serialize() + '&submit=Submit%20Lineup'; 
            }

            $.ajax({
                type: "POST", 
                url: submitTargetURL, 
                data: payloadData, 
                success: function() {
                    alert("Lineup saved successfully!");
                    originalStarterIds.clear();
                    currentDoc.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => { originalStarterIds.add(cb.value); });
                    renderActiveTab(); 
                },
                error: function() { alert("Error saving lineup. Please try again."); },
                complete: function() { setTimeout(() => { isConfirming = false; }, 300); }
            });
        } else { setTimeout(() => { isConfirming = false; }, 300); }
    };


    $(document).on('click touchend', '#lineup-submit-float', function(e) { e.preventDefault(); window.confirmAndSubmit(); });
    $(document).on('click touchend', '.preview-action-btn', function(e) { if (e.type === 'touchend' && touchMoved) return; const checkbox = currentDoc.querySelector(`input[value="${$(this).data('action-pid')}"]`); if (checkbox) { checkbox.checked = !checkbox.checked; hideMenu(); setTimeout(renderActiveTab, 50); } });
        $(document).on('click touchend', '.swap-item:not(.active-player-preview)', function(e) {
        if (e.type === 'touchend' && touchMoved) return;
        if (e.type === 'touchend') e.preventDefault();
        const tPid = $(this).data('pid');
        const tCb = currentDoc.querySelector(`input[value="${tPid}"]`);
        const sPid = (activePlayerRow && activePlayerRow.data('pid')) || window._modalCurrentPid;
        const sCb = sPid ? currentDoc.querySelector(`input[value="${sPid}"]`) : null;
        if (tCb) { tCb.checked = !tCb.checked; if (sCb) sCb.checked = !sCb.checked; }
        hideMenu();
        $('#smart-player-modal').fadeOut(200);
        $('body').css('overflow', '');
        setTimeout(renderActiveTab, 50);
    });
    $(document).on('click touchend', '.swap-upgrade-btn', function(e) { if (e.type === 'touchend' && touchMoved) return; e.stopPropagation(); const sCb = currentDoc.querySelector(`input[value="${$(this).data('starter-pid')}"]`); const bCb = currentDoc.querySelector(`input[value="${$(this).data('bench-pid')}"]`); if (sCb && bCb) { sCb.checked = false; bCb.checked = true; renderActiveTab(); } });       $(document).on('click touchend', '.suggest-fill-btn', function(e) { if (e.type === 'touchend' && touchMoved) return; e.stopPropagation(); const cb = currentDoc.querySelector(`input[value="${$(this).data('pid')}"]`); if (cb) { cb.checked = true; renderActiveTab(); } });
$('body').append(`
<div id="chat-modal" class="player-modal-backdrop" style="z-index:99999; display:none;">
    <div class="player-modal-box" style="padding:0; overflow:hidden; background:var(--card-bg); max-width:420px; height:70vh; display:flex; flex-direction:column;">
        <button class="player-modal-close" id="close-chat-modal" style="z-index:10;">✕</button>

        <div style="padding:14px 16px; border-bottom:1px solid var(--card-border); display:flex; align-items:center; justify-content:space-between; flex-shrink:0;">
            <div>
                <div style="font-size:14px; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:1px;">League Chat</div>
                <div id="chat-online-count" style="font-size:10px; color:var(--accent-teal); margin-top:2px;">Loading...</div>
            </div>
            <a href="https://www45.myfantasyleague.com/${year}/chat?L=${lid}&COUNT=40" target="_blank"
               style="font-size:9px; font-weight:900; color:var(--text-dim); text-decoration:none; text-transform:uppercase; border:1px solid var(--card-border); border-radius:6px; padding:4px 8px;">
                Open Full ↗
            </a>
        </div>

        <div id="chat-messages" style="flex:1; overflow-y:auto; padding:12px; display:flex; flex-direction:column; gap:8px;">
            <div style="text-align:center; padding:20px; color:var(--accent-blue); font-weight:800; font-size:11px; text-transform:uppercase; animation:pulse-blue 1.5s infinite;">Loading...</div>
        </div>

        <div style="padding:10px 12px; border-top:1px solid var(--card-border); flex-shrink:0;">
            <div style="display:flex; gap:6px; margin-bottom:8px; align-items:center;">
<select id="chat-to-fid" style="flex:1; background:rgba(255,255,255,0.05); border:1px solid var(--card-border); border-radius:8px; padding:6px 8px; color:#fff; font-size:10px; font-weight:800; outline:none;">
    <option value="">Everyone</option>
</select>
            </div>
            <div style="display:flex; gap:6px;">
                <input id="chat-input" type="text" maxlength="200" placeholder="Type a message..."
                    style="flex:1; background:rgba(255,255,255,0.05); border:1px solid var(--card-border); border-radius:8px; padding:8px 12px; color:#fff; font-size:12px; font-weight:700; outline:none; box-sizing:border-box;">
                <button id="chat-send-btn" style="padding:8px 16px; background:var(--accent-blue); color:#fff; border:none; border-radius:8px; font-size:11px; font-weight:900; cursor:pointer; text-transform:uppercase; flex-shrink:0;">Send</button>
            </div>
        </div>
    </div>
</div>
`);
// --- UNIFIED SMART HUB MODAL ---
    if ($('#smart-player-modal').length === 0) {
        $('body').append(`
            <div id="smart-player-modal" class="player-modal-backdrop" style="z-index: 99999;">
<div class="player-modal-box" style="padding:0; overflow:hidden; background: var(--card-bg);">
    <button class="player-modal-close" style="z-index: 10;">✕</button>
    
    <div class="player-modal-header" id="modal-dynamic-header" style="padding: 20px; border-bottom: none; margin-bottom: 0; display: flex; align-items: center;">
        <div class="player-img-wrapper" style="width: 60px; height: 60px; flex-shrink: 0; margin-right: 15px; border: none; background: transparent;">
            <img id="modal-img" class="player-img" src="" style="width:100%; height:100%; object-fit: cover; border-radius: 50%;">
        </div>
        <div style="display:flex; flex-direction:column; justify-content:center; flex: 1; text-align: left;">
            <div style="display: flex; align-items: center; flex-wrap: wrap; margin-bottom: 6px;">
                <span id="modal-name" style="font-size: 18px; font-weight: 800; color: #fff; margin-right: 8px;"></span>
                <span id="modal-pos" class="inline-pos-badge" style="font-size: 11px; font-weight: 900; padding: 2px 6px; border-radius: 4px; color: #fff; margin-right: 6px;"></span>
                <span id="modal-inj"></span>
            </div>
<div style="display:flex; align-items:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
                <img id="modal-team-logo" src="" style="width: 18px; height: 18px; object-fit: contain; flex-shrink:0;">
                <span id="modal-pid-text" style="font-size: 10px; color: var(--text-dim); font-weight: 700;"></span>
            </div>
            <div id="modal-bio-pills" style="display:flex; flex-wrap:wrap; gap:4px; margin-top:6px;"></div>
<button id="modal-trade-offer-btn" onclick="txAction('propose', window._modalCurrentPid, event)"
    style="display:none; margin-top:8px; padding:5px 12px; background:rgba(59,130,246,0.15); color:var(--accent-blue); border:1px solid rgba(59,130,246,0.4); border-radius:8px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer;">
    Offer Trade
</button>
<div id="modal-owner-actions" style="display:none; margin-top:8px; display:flex; flex-wrap:nowrap; gap:4px; overflow-x:auto;" class="hide-scroll">
<button id="header-btn-taxi" style="flex-shrink:0; padding:4px 8px; background:rgba(245,158,11,0.1); color:#f59e0b; border:1px solid rgba(245,158,11,0.3); border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; gap:4px;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="height:12px; width:auto; fill:#f59e0b;"><path d="M256 64C238.3 64 224 78.3 224 96L224 128L215.1 128C173.1 128 136 155.3 123.5 195.4L100.5 268.9C78.5 283.1 64 307.9 64 336L64 512C64 529.7 78.3 544 96 544L128 544C145.7 544 160 529.7 160 512L160 480L480 480L480 512C480 529.7 494.3 544 512 544L544 544C561.7 544 576 529.7 576 512L576 336C576 307.9 561.5 283.1 539.6 268.9L516.6 195.4C504.1 155.3 466.9 128 424.9 128L416 128L416 96C416 78.3 401.7 64 384 64L256 64zM215.1 192L425 192C439 192 451.4 201.1 455.5 214.5L468.5 256L171.6 256L184.6 214.5C188.8 201.1 201.1 192 215.1 192zM160 336C177.7 336 192 350.3 192 368C192 385.7 177.7 400 160 400C142.3 400 128 385.7 128 368C128 350.3 142.3 336 160 336zM448 368C448 350.3 462.3 336 480 336C497.7 336 512 350.3 512 368C512 385.7 497.7 400 480 400C462.3 400 448 385.7 448 368z"/></svg>
    Taxi
</button>
<button id="header-btn-ir" style="flex-shrink:0; padding:4px 8px; background:rgba(239,68,68,0.1); color:#ef4444; border:1px solid rgba(239,68,68,0.3); border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; gap:4px;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="height:12px; width:auto; fill:#ef4444;"><path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM288 312C288 303.2 295.2 296 304 296L336 296C344.8 296 352 303.2 352 312L352 352L392 352C400.8 352 408 359.2 408 368L408 400C408 408.8 400.8 416 392 416L352 416L352 456C352 464.8 344.8 472 336 472L304 472C295.2 472 288 464.8 288 456L288 416L248 416C239.2 416 232 408.8 232 400L232 368C232 359.2 239.2 352 248 352L288 352L288 312z"/></svg>
    IR
</button>
<button id="header-btn-block" style="flex-shrink:0; padding:4px 8px; background:rgba(59,130,246,0.1); color:var(--accent-blue); border:1px solid rgba(59,130,246,0.3); border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; gap:4px;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="height:12px; width:auto; fill:#3b82f6;"><path d="M0 192C0 174.3 14.3 160 32 160L480 160L480 112C480 98.7 487.5 86.5 499.3 80.3C511.1 74.2 525.3 75.2 536.1 82.8L632.1 146.8C641.4 152.9 647 163.1 647 174C647 184.9 641.4 195.1 632.1 201.2L536.1 265.2C525.3 272.8 511.1 273.8 499.3 267.7C487.5 261.5 480 249.3 480 236L480 192L32 192C14.3 192 0 177.7 0 160zM640 416C640 433.7 625.7 448 608 448L160 448L160 496C160 509.3 152.5 521.5 140.7 527.7C128.9 533.8 114.7 532.8 103.9 525.2L7.9 461.2C-1.4 455.1 -7 444.9 -7 434C-7 423.1 -1.4 412.9 7.9 406.8L103.9 342.8C114.7 335.2 128.9 334.2 140.7 340.3C152.5 346.5 160 358.7 160 372L160 416L608 416C625.7 416 640 430.3 640 448z"/></svg>
    Block
</button>
<button id="header-btn-resign" style="flex-shrink:0; padding:4px 8px; background:rgba(34,197,94,0.1); color:#22c55e; border:1px solid rgba(34,197,94,0.3); border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; gap:4px;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="height:12px; width:auto; fill:#22c55e;"><path d="M368.4 18.3L312.7 74.1L383.9 145.3L439.7 89.6C456.2 73.1 456.2 46.6 439.7 30.1L441.7 32.1C425.2 15.6 398.7 1.8 368.4 18.3zM44.9 353.4L299.1 99.2L370.3 170.4L116.2 424.6C111.3 429.5 105.1 433 98.3 434.8L18.5 455.5C13.5 456.8 8.2 455.4 4.6 451.8C1 448.2 -0.4 442.9 0.9 437.9L21.6 358.1C23.4 351.3 26.9 345.1 31.8 340.2L44.9 353.4zM432 416C415.4 416 400.5 424.8 392 438.4C383.5 424.8 368.6 416 352 416C326.5 416 306 436.5 306 462C306 478.3 314.4 509.4 325.5 534.5C331.1 547.1 337.4 558 343.5 565.6C349.4 573 354.7 576 352 576C343.2 576 336 583.2 336 592C336 600.8 343.2 608 352 608C378.5 608 393.4 587.5 400 571.7C406.6 587.5 421.5 608 448 608C474.5 608 489.4 587.5 496 571.7C502.6 587.5 517.5 608 544 608C552.8 608 560 600.8 560 592C560 583.2 552.8 576 544 576C541.3 576 546.6 573 552.5 565.6C558.6 558 564.9 547.1 570.5 534.5C581.6 509.4 590 478.3 590 462C590 436.5 569.5 416 544 416C527.4 416 512.5 424.8 504 438.4C495.5 424.8 480.6 416 464 416z"/></svg>
    Resign
</button>
<button id="header-btn-cut" style="flex-shrink:0; padding:4px 8px; background:rgba(239,68,68,0.15); color:#ef4444; border:1px solid rgba(239,68,68,0.5); border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; gap:4px;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="height:12px; width:auto; fill:#ef4444;"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM232 296L408 296C421.3 296 432 306.7 432 320C432 333.3 421.3 344 408 344L232 344C218.7 344 208 333.3 208 320C208 306.7 218.7 296 232 296z"/></svg>
    Cut
</button>
</div>
    </div>

    </div>

<div class="modal-tabs hide-scroll" id="modal-tabs-row" style="display:flex; overflow-x:auto; flex-wrap:nowrap; border-bottom:1px solid var(--card-border);">
    <div id="tab-btn-lineup" class="modal-tab-btn" style="flex-shrink:0;" data-target="tab-lineup">Set Lineup</div>
    <div id="tab-btn-tx" class="modal-tab-btn" style="flex-shrink:0;" data-target="tab-tx">Contract</div>
    <div id="tab-btn-gamelog" class="modal-tab-btn" style="flex-shrink:0;" data-target="tab-gamelog">Game Log</div>
<div id="tab-btn-history" class="modal-tab-btn" style="flex-shrink:0;" data-target="tab-history">History</div>
</div>

<div class="player-modal-body" style="padding: 0;">
    <div id="tab-lineup" class="modal-tab-content">
        <div id="modal-swap-list" class="hide-scroll" style="max-height: 350px; overflow-y: auto;"></div>
    </div>
    <div id="tab-tx" class="modal-tab-content">
        <div id="modal-actions-container" style="padding: 15px;"></div>
    </div>
    <div id="tab-gamelog" class="modal-tab-content">
        <div id="modal-gamelog-container" style="padding: 15px; max-height: 400px; overflow-y: auto;"></div>
    </div>
    <div id="tab-history" class="modal-tab-content">
        <div id="modal-history-container" style="padding: 15px; max-height: 400px; overflow-y: auto;"></div>
    </div>
</div>
    </div>
</div>
        `);
    }
$('body').append(`
<div id="team-popup-modal" class="player-modal-backdrop" style="z-index:99999; display:none;">
    <div class="player-modal-box" style="padding:0; overflow:hidden; background:var(--card-bg);">
        <button class="player-modal-close" id="close-team-popup" style="z-index:10;">✕</button>

        <div id="team-popup-header" style="padding:16px; border-bottom:1px solid rgba(255,255,255,0.08); display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; align-items:center; gap:14px;">
                <img id="team-popup-logo" src="" style="width:56px; height:56px; border-radius:50%; object-fit:cover; background:var(--card-bg); border:2px solid rgba(255,255,255,0.1); flex-shrink:0;">
                <div style="flex:1; min-width:0;">
                    <div id="team-popup-name" style="font-size:18px; font-weight:900; color:#fff; white-space:normal; line-height:1.2;"></div>
                    <div style="display:flex; align-items:center; gap:8px; margin-top:4px; flex-wrap:wrap;">
                        <span id="team-popup-record" style="font-size:10px; font-weight:900; color:var(--accent-blue); background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.3); border-radius:6px; padding:2px 8px;"></span>
                        <span id="team-popup-owner" style="font-size:10px; font-weight:800; color:var(--text-dim);"></span>
                    </div>
                </div>
                <button id="team-popup-view-btn" style="flex-shrink:0; padding:6px 12px; background:rgba(59,130,246,0.15); color:var(--accent-blue); border:1px solid rgba(59,130,246,0.4); border-radius:8px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; white-space:nowrap;">View Team</button>
            </div>
            <div style="display:flex; gap:8px;">
                <div id="team-popup-cap-bar-wrap" style="flex:1; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:8px 10px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                        <span style="font-size:8px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">Cap Used</span>
                        <span id="team-popup-cap-label" style="font-size:9px; font-weight:900; color:#22c55e;"></span>
                    </div>
                    <div style="height:4px; background:rgba(255,255,255,0.08); border-radius:4px; overflow:hidden;">
                        <div id="team-popup-cap-bar" style="height:100%; width:0%; background:#22c55e; border-radius:4px; transition:width 0.3s;"></div>
                    </div>
                </div>
                <div id="team-popup-block-count" style="background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.3); border-radius:8px; padding:8px 12px; display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0;">
                    <span style="font-size:16px; font-weight:900; color:#a855f7;" id="team-popup-block-num">0</span>
                    <span style="font-size:8px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">On Block</span>
                </div>
            </div>
        </div>

        <div class="modal-tabs hide-scroll" style="display:flex; overflow-x:auto; flex-wrap:nowrap; border-bottom:1px solid var(--card-border);">
            <div class="team-popup-tab active" data-tab="tp-roster" style="flex-shrink:0; padding:10px 16px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; color:#fff; border-bottom:2px solid var(--accent-blue); white-space:nowrap;">Roster</div>
            <div class="team-popup-tab" data-tab="tp-schedule" style="flex-shrink:0; padding:10px 16px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; color:var(--text-dim); border-bottom:2px solid transparent; white-space:nowrap;">Schedule</div>
            <div class="team-popup-tab" data-tab="tp-stats" style="flex-shrink:0; padding:10px 16px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; color:var(--text-dim); border-bottom:2px solid transparent; white-space:nowrap;">Stats</div>
<div class="team-popup-tab" data-tab="tp-block" style="flex-shrink:0; padding:10px 16px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; color:var(--text-dim); border-bottom:2px solid transparent; white-space:nowrap;">Trade Block</div>
        </div>

        <div class="player-modal-body" style="padding:0; max-height:55vh; overflow-y:auto;">
            <div id="tp-roster" class="team-popup-content active" style="padding:12px;"></div>
            <div id="tp-schedule" class="team-popup-content" style="display:none; padding:12px;"></div>
<div id="tp-stats" class="team-popup-content" style="display:none; padding:12px;"></div>
<div id="tp-block" class="team-popup-content" style="display:none; padding:12px;"></div>        </div>
    </div>
</div>
`);





async function openTeamPopup(targetFid) {
    targetFid = String(targetFid).padStart(4, '0');
    const teamName = leagueFranchises[targetFid] || targetFid;
    const logoUrl = getFranchiseLogoUrl(targetFid);
    const record = window._allRecords?.[targetFid] || '';
   const owner = (window._allOwners?.[targetFid] || '').split(',')[0].trim();

    // Reset tabs
    $('.team-popup-tab').css({ color: 'var(--text-dim)', borderBottomColor: 'transparent' });
    $('.team-popup-tab[data-tab="tp-roster"]').css({ color: '#fff', borderBottomColor: 'var(--accent-blue)' });
    $('.team-popup-content').hide();
    $('#tp-roster').show();

    // Header
    $('#team-popup-logo').attr('src', logoUrl);
$('#team-popup-name').html(teamName);
$('#team-popup-name').attr('data-team-style', targetFid);
setTimeout(() => applyTeamStyle(window._teamStyles?.[targetFid], targetFid), 50);    $('#team-popup-record').text(record || 'Offseason');
$('#team-popup-owner').text(owner || '');
    // View Team button
    $('#team-popup-view-btn').off('click').on('click', function() {
        $('#team-popup-modal').fadeOut(200);
        $('body').css('overflow', '');
        // Switch to team tab and select this franchise
        fid = targetFid;
        $('#active-team-switcher-btn img').first().attr('src', logoUrl);
        $('#switcher-team-name').text(teamName);
        $('.tab-btn').removeClass('active');
        $('.tab-btn').filter(function() { return $(this).attr('onclick')?.includes('tab-team'); }).addClass('active');
        $('.tab-content').hide().removeClass('active');
        $('#tab-team').show().addClass('active');
        $('.sub-tabs-group').removeClass('active');
        $('#subtabs-team').addClass('active');
        $('.sub-tabs-container').show();
        $('#subtabs-team .sub-tab-btn').removeClass('active');
        $('#subtabs-team .sub-tab-btn').filter(function() { return $(this).text().trim().toLowerCase().includes('contract'); }).addClass('active');
        window._teamDataDirty = true;
        loadTeamData();
    });

    $('#team-popup-cap-label').text('Loading...');
    $('#team-popup-cap-bar').css('width', '0%');
    $('#team-popup-block-num').text('0');
    $('#tp-roster').html('<div style="text-align:center; padding:30px; color:var(--accent-blue); font-weight:800; font-size:11px; text-transform:uppercase; animation:pulse-blue 1.5s infinite;">Loading...</div>');

    $('#team-popup-modal').css('display', 'flex').hide().fadeIn(200);
    $('body').css('overflow', 'hidden');

    // Load cap + roster
    try {
        const [rosterRes, tbRes] = await Promise.all([
            fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=${targetFid}`, { credentials: 'include' }),
            fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=tradeBait&L=${lid}&INCLUDE_DRAFT_PICKS=1&JSON=1`, { credentials: 'include' })
        ]);

        const rosterDoc = new DOMParser().parseFromString(await rosterRes.text(), 'text/html');
        const tbData = await tbRes.json();

        // Trade block pids for this team
        let theirBlockPids = new Set();
        let blockCount = 0;
        let baits = tbData?.tradeBaits?.tradeBait || [];
        if (!Array.isArray(baits)) baits = [baits];
        const myBait = baits.find(b => (b.franchise_id || b.franchise || '').padStart(4,'0') === targetFid);
        if (myBait) {
            (myBait.willGiveUp || '').split(',').filter(Boolean).forEach(id => theirBlockPids.add(id));
            blockCount = theirBlockPids.size;
        }
        $('#team-popup-block-num').text(blockCount);

        // Cap
        const salaryCap = window.leagueSalaryCap || 823;
        let capUsed = 0;
        const rows = Array.from(rosterDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow'));
        rows.forEach(row => {
            capUsed += parseFloat(row.querySelector('td.salary')?.textContent.replace(/[^0-9.]/g, '')) || 0;
        });
        capUsed = parseFloat(capUsed.toFixed(1));
        const capRemaining = parseFloat((salaryCap - capUsed).toFixed(1));
        const capPct = Math.min(100, (capUsed / salaryCap) * 100).toFixed(1);
        const barColor = capUsed > salaryCap ? '#ef4444' : capPct > 90 ? '#f59e0b' : '#22c55e';
        $('#team-popup-cap-label').text(`$${capUsed}m / $${salaryCap}m`).css('color', barColor);
        $('#team-popup-cap-bar').css({ width: capPct + '%', background: barColor });

// Score each player for ranking (use playerAverages if available, else salary as proxy)
        const allPlayers = [];
        rows.forEach(row => {
            const pLink = row.querySelector('td.player a[class*="position_"]');
            if (!pLink) return;
            const pid = pLink.getAttribute('href').match(/\d+/g)?.pop();
            const { name, shortName, pos, team } = parseMFLName(pLink.textContent);
            const salary = row.querySelector('td.salary')?.textContent.trim() || '';
            const years = row.querySelector('td.contractyear')?.textContent.trim() || '';
            const salNum = parseFloat(salary.replace(/[^0-9.]/g, '')) || 0;
            const isOnBlock = theirBlockPids.has(String(pid));
            const injHtml = getInjuryHtml(pid);
            let normPos = pos;
            if (['DE','DT'].includes(normPos)) normPos = 'DL';
            if (['CB','S'].includes(normPos)) normPos = 'DB';
            const avgScore = playerAverages[pid] || 0;
            allPlayers.push({ pid, name, shortName, pos: normPos, team, salary, salNum, years, isOnBlock, injHtml, avgScore });
        });

        // Top 5 by average score (fall back to salary)
        const ranked = [...allPlayers].sort((a, b) => (b.avgScore || b.salNum) - (a.avgScore || a.salNum));
        const top5 = ranked.slice(0, 5);
        const top5Pids = new Set(top5.map(p => p.pid));

        // Trade block players not already in top 5
        const blockPlayers = allPlayers.filter(p => p.isOnBlock && !top5Pids.has(p.pid));

        function buildPlayerChipRow(p) {
            return `
                <div class="player-modal-trigger" data-pid="${p.pid}" data-ppos="${p.pos}" data-pteam="${p.team}" data-pname="${p.name}"
                    style="display:flex; align-items:center; gap:10px; padding:7px 8px; border-radius:8px;
                    background:${p.isOnBlock ? 'rgba(168,85,247,0.08)' : 'rgba(0,0,0,0.2)'};
                    border:1px solid ${p.isOnBlock ? 'rgba(168,85,247,0.35)' : 'var(--card-border)'}; cursor:pointer; margin-bottom:4px;">
                    <div style="width:34px; height:34px; border-radius:50%; overflow:hidden; flex-shrink:0; background:var(--card-bg); border:1px solid rgba(255,255,255,0.08);">
                        <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${p.pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div style="flex:1; min-width:0;">
                        <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
                            <span style="font-size:13px; font-weight:800; color:#fff;">${p.shortName || p.name}</span>
                            <span class="pos-text-${p.pos.toLowerCase()}" style="font-size:10px; font-weight:900;">${p.pos}</span>
                            ${p.isOnBlock ? '<span style="font-size:9px; color:#a855f7; font-weight:900;">${BLOCK_ICON}</span>' : ''}
                            ${p.injHtml}
                        </div>
                        ${p.salary ? `<div style="display:flex; gap:5px; margin-top:2px; align-items:center;">
                            <img src="${getNFLLogoUrl(p.team)}" onerror="this.style.display='none'" style="width:12px; height:12px; object-fit:contain; opacity:0.7;">
                            <span style="font-size:10px; font-weight:900; color:#22c55e;">${p.salary}</span>
                            ${p.years ? `<span style="font-size:9px; color:var(--accent-blue); font-weight:800;">${p.years}yr</span>` : ''}
                            ${p.avgScore ? `<span style="font-size:9px; color:var(--text-dim); font-weight:800;">${p.avgScore.toFixed(1)} avg</span>` : ''}
                        </div>` : ''}
                    </div>
                </div>`;
        }

        let rosterHtml = '';

        // Top 5
        rosterHtml += `<div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:8px; padding-bottom:4px; border-bottom:1px solid rgba(255,255,255,0.05);">Top Players</div>`;
        rosterHtml += top5.map(buildPlayerChipRow).join('');



        $('#tp-roster').html(rosterHtml || '<div style="text-align:center; padding:20px; color:var(--text-dim);">No roster data.</div>');

    } catch(e) {
        console.error('Team popup error:', e);
        $('#tp-roster').html('<div style="text-align:center; color:#ef4444; padding:20px;">Failed to load roster.</div>');
    }
}

async function loadTeamPopupSchedule(targetFid) {
    const container = $('#tp-schedule').html('<div style="text-align:center; padding:30px; color:var(--accent-blue); font-weight:800; font-size:11px; text-transform:uppercase; animation:pulse-blue 1.5s infinite;">Loading...</div>');
    try {
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/weekly?L=${lid}`, { credentials: 'include' });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        const rows = Array.from(doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow'));
        // Find all matchups involving this team
        let html = '';
        let inMatchup = false, matchupPair = [];
        const allMatchups = [];
        let cur = [];
        rows.forEach(row => {
            if (row.textContent.includes('Median Score')) return;
            const fLink = row.querySelector('a[class*="franchise_"]');
            if (!fLink) return;
            const fIdMatch = fLink.getAttribute('class').match(/franchise_(\d+)/);
            const rowFid = fIdMatch ? fIdMatch[1].padStart(4,'0') : null;
            const teamName2 = leagueFranchises[rowFid] || rowFid;
            const logo2 = getFranchiseLogoUrl(rowFid);
            const score = row.querySelector('td.points')?.textContent.trim() || '—';
            cur.push({ fid: rowFid, teamName: teamName2, logo: logo2, score });
            if (cur.length === 2) { allMatchups.push([...cur]); cur = []; }
        });
        const myMatchups = allMatchups.filter(m => m[0].fid === targetFid || m[1].fid === targetFid);
        if (!myMatchups.length) {
            container.html('<div style="text-align:center; padding:20px; color:var(--text-dim);">No schedule data available.</div>');
            return;
        }
        myMatchups.forEach(m => {
            const me = m[0].fid === targetFid ? m[0] : m[1];
            const opp = m[0].fid === targetFid ? m[1] : m[0];
            const meScore = parseFloat(me.score) || 0;
            const oppScore = parseFloat(opp.score) || 0;
            const meColor = meScore > oppScore ? '#22c55e' : meScore < oppScore ? '#ef4444' : '#fff';
            html += `
                <div style="display:flex; align-items:center; gap:12px; padding:10px; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; margin-bottom:8px;">
                    <img src="${opp.logo}" onerror="this.src=''" style="width:36px; height:36px; border-radius:50%; object-fit:cover; background:var(--card-bg); border:1px solid rgba(255,255,255,0.1);">
                    <div style="flex:1;">
                        <div style="font-size:12px; font-weight:800; color:#fff;">${opp.teamName}</div>
                        <div style="font-size:10px; color:var(--text-dim); margin-top:2px;">${leagueFranchises[opp.fid] || opp.fid}</div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-size:16px; font-weight:900; color:${meColor};">${me.score}</div>
                        <div style="font-size:11px; color:var(--text-dim);">${opp.score}</div>
                    </div>
                </div>`;
        });
        container.html(html);
    } catch(e) {
        container.html('<div style="text-align:center; color:#ef4444; padding:20px;">Failed to load schedule.</div>');
    }
}
async function loadTeamPopupBlock(targetFid) {
    const container = $('#tp-block').html('<div style="text-align:center; padding:30px; color:var(--accent-blue); font-weight:800; font-size:11px; text-transform:uppercase; animation:pulse-blue 1.5s infinite;">Loading...</div>');
    try {
        const tbRes = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=tradeBait&L=${lid}&INCLUDE_DRAFT_PICKS=1&JSON=1`, { credentials: 'include' });
        const tbData = await tbRes.json();
        let baits = tbData?.tradeBaits?.tradeBait || [];
        if (!Array.isArray(baits)) baits = [baits];
        const myBait = baits.find(b => (b.franchise_id || b.franchise || '').padStart(4,'0') === targetFid);

        if (!myBait || !myBait.willGiveUp) {
            container.html('<div style="text-align:center; padding:30px; color:var(--text-dim); font-size:11px;">Nothing on the trade block.</div>');
            return;
        }

        const wantText = myBait.inExchangeFor || '';
        const pidList = (myBait.willGiveUp || '').split(',').filter(Boolean);

        let html = '';

        // What they want
        if (wantText) {
            html += `
                <div style="padding:10px 12px; background:rgba(59,130,246,0.08); border:1px solid rgba(59,130,246,0.2); border-radius:8px; margin-bottom:14px;">
                    <div style="font-size:8px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; margin-bottom:4px;">Looking For</div>
                    <div style="font-size:12px; color:#fff; font-weight:800;">${wantText}</div>
                </div>`;
        }

        html += `<div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:8px; padding-bottom:4px; border-bottom:1px solid rgba(255,255,255,0.05);">Available to Trade</div>`;

        // Resolve each pid
        const playerFetches = pidList.map(async pid => {
            pid = pid.trim();
            const isPick = pid.startsWith('FP_') || pid.startsWith('DP_');
            if (isPick) {
                const parts = pid.split('_');
                const pickYear = pid.startsWith('FP_') ? parts[2] : year;
                const round = pid.startsWith('FP_') ? parts[3] : (parseInt(parts[1]) + 1);
                return `
                    <div style="display:flex; align-items:center; gap:10px; padding:8px; background:rgba(0,0,0,0.2); border:1px solid rgba(245,158,11,0.25); border-radius:8px; margin-bottom:6px;">
                        <div style="width:34px; height:34px; border-radius:50%; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                            <span style="font-size:13px; font-weight:900; color:#f59e0b;">${round}</span>
                        </div>
                        <div>
                            <div style="font-size:12px; font-weight:900; color:#f59e0b;">${pickYear} Round ${round} Pick</div>
                            <div style="font-size:9px; color:var(--text-dim); margin-top:1px;">Draft Pick</div>
                        </div>
                    </div>`;
            }
            // Player — fetch name
            try {
                const res = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=players&L=${lid}&PLAYERS=${pid}&JSON=1`, { credentials: 'include' });
                const data = await res.json();
                const player = data?.players?.player;
                const name = player?.name ? player.name.split(', ').reverse().join(' ') : pid;
                const pos = player?.position || '';
                const team = player?.team || 'NFL';
                const injHtml = getInjuryHtml(pid);
                return `
                    <div class="player-modal-trigger" data-pid="${pid}" data-ppos="${pos}" data-pteam="${team}" data-pname="${name}"
                        style="display:flex; align-items:center; gap:10px; padding:8px; background:rgba(0,0,0,0.2); border:1px solid rgba(168,85,247,0.25); border-radius:8px; margin-bottom:6px; cursor:pointer;">
                        <div style="width:34px; height:34px; border-radius:50%; overflow:hidden; flex-shrink:0; background:var(--card-bg); border:1px solid rgba(168,85,247,0.3);">
                            <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <div style="flex:1; min-width:0;">
                            <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
                                <span style="font-size:13px; font-weight:800; color:#fff;">${name.split(' ').slice(-1)[0]}, ${name.split(' ')[0]}</span>
                                ${pos ? `<span class="pos-text-${pos.toLowerCase()}" style="font-size:10px; font-weight:900;">${pos}</span>` : ''}
                                ${injHtml}
                            </div>
                            <div style="display:flex; align-items:center; gap:4px; margin-top:2px;">
                                <img src="${getNFLLogoUrl(team)}" onerror="this.style.display='none'" style="width:12px; height:12px; object-fit:contain; opacity:0.7;">
                                <span style="font-size:9px; color:var(--text-dim); font-weight:800;">${team}</span>
                            </div>
                        </div>
                        <span style="font-size:9px; color:#a855f7; font-weight:900; flex-shrink:0;">${BLOCK_ICON}</span>
                    </div>`;
            } catch(e) {
                return `<div style="padding:8px; color:var(--text-dim); font-size:10px;">pid: ${pid}</div>`;
            }
        });

        const playerHtmls = await Promise.all(playerFetches);
        html += playerHtmls.join('');

        // Propose trade button at bottom
        html += `
            <button onclick="
                $('#team-popup-modal').fadeOut(200);
                $('body').css('overflow','');
                $('.tab-btn').filter(function(){ return $(this).attr('onclick')?.includes('tab-league'); }).trigger('click');
                setTimeout(() => {
                    $('#subtabs-league .sub-tab-btn').filter(function(){ return $(this).text().trim() === 'Trades'; }).trigger('click');
                    setTimeout(() => loadTradeHub('${targetFid}'), 300);
                }, 200);
            " style="width:100%; margin-top:14px; padding:12px; background:var(--accent-blue); color:#fff; border:none; border-radius:8px; font-size:12px; font-weight:900; text-transform:uppercase; cursor:pointer;">
                Propose Trade
            </button>`;

        container.html(html);
    } catch(e) {
        console.error('Trade block tab error:', e);
        container.html('<div style="text-align:center; color:#ef4444; padding:20px;">Failed to load trade block.</div>');
    }
}
async function loadTeamPopupStats(targetFid) {
    const container = $('#tp-stats').html('<div style="text-align:center; padding:30px; color:var(--accent-blue); font-weight:800; font-size:11px; text-transform:uppercase; animation:pulse-blue 1.5s infinite;">Loading...</div>');
    try {
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/standings?L=${lid}`, { credentials: 'include' });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        let teamRow = null;
        doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
            const link = row.querySelector('td.fname a');
            const m = link?.getAttribute('href')?.match(/F=(\d+)/i);
            if (m && m[1].padStart(4,'0') === targetFid) teamRow = row;
        });
        if (!teamRow) { container.html('<div style="text-align:center; padding:20px; color:var(--text-dim);">No stats found.</div>'); return; }
        const get = sel => teamRow.querySelector(sel)?.textContent.trim() || '—';
        const stats = [
            ['Record', get('td.h2hwlt')],
            ['Win %', get('td.h2hpct')],
            ['Points For', get('td.pf')],
            ['Points Against', get('td.pa')],
            ['Streak', get('td.strk')],
        ];
        container.html(`<div style="display:flex; flex-direction:column; gap:6px;">
            ${stats.map(([label, val]) => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px;">
                    <span style="font-size:11px; color:var(--text-dim); font-weight:800;">${label}</span>
                    <span style="font-size:13px; font-weight:900; color:#fff;">${val}</span>
                </div>`).join('')}
        </div>`);
    } catch(e) {
        container.html('<div style="text-align:center; color:#ef4444; padding:20px;">Failed to load stats.</div>');
    }
}
$(document).off('click', '.team-popup-tab').on('click', '.team-popup-tab', function() {
    $('.team-popup-tab').css({ color: 'var(--text-dim)', borderBottomColor: 'transparent' });
    $(this).css({ color: '#fff', borderBottomColor: 'var(--accent-blue)' });
    $('.team-popup-content').hide();
    const tab = $(this).data('tab');
    $('#' + tab).show();
    const fid2 = $('#team-popup-modal').data('fid');
    if (tab === 'tp-schedule' && fid2) loadTeamPopupSchedule(fid2);
if (tab === 'tp-stats' && fid2) loadTeamPopupStats(fid2);
    if (tab === 'tp-block' && fid2) loadTeamPopupBlock(fid2);
});

$(document).off('click', '#close-team-popup, #team-popup-modal').on('click', '#close-team-popup, #team-popup-modal', function(e) {
    if ($(e.target).closest('.player-modal-box').length && !$(e.target).is('#close-team-popup')) return;
    $('#team-popup-modal').fadeOut(200);
    $('body').css('overflow', '');
});
$(document).off('click', '.team-popup-trigger').on('click', '.team-popup-trigger', function(e) {
    e.stopPropagation();
    const targetFid = String($(this).data('fid')).padStart(4, '0');
    $('#team-popup-modal').data('fid', targetFid);
    openTeamPopup(targetFid);
});
// --- MASTER CLICK LISTENER ---
let touchStartY = 0;
    let touchStartX = 0;
    let touchMoved = false;
    $(document).on('touchstart', function(e) {
        if (!e.originalEvent.touches || !e.originalEvent.touches[0]) return;
        touchStartY = e.originalEvent.touches[0].clientY;
        touchStartX = e.originalEvent.touches[0].clientX;
        touchMoved = false;
    });

$(document).on('touchmove', '.settings-content-area', function(e) {
    e.stopPropagation();
});

 $(document).on('touchmove', function(e) {
    if (!e.originalEvent.touches || !e.originalEvent.touches[0]) return;
    if (Math.abs(e.originalEvent.touches[0].clientY - touchStartY) > 10) touchMoved = true;
    if (Math.abs(e.originalEvent.touches[0].clientX - touchStartX) > 10) touchMoved = true;
    
    // Allow scrolling inside settings modal
    if ($(e.target).closest('.settings-content-area').length) {
        e.stopPropagation();
        return;
    }
});

    $(document).off('click touchend', '.player-row .player-name-slot, .player-row .player-img-wrapper, .player-modal-trigger').on('click touchend', '.player-row .player-name-slot, .player-row .player-img-wrapper, .player-modal-trigger', function(e) {
        if (e.type === 'touchend') { if (touchMoved) return; e.preventDefault(); } // Stops the phone from firing a ghost 'click'
        e.stopPropagation(); // Stops the tap from reaching the contract accordion
        const row = $(this).closest('.player-row');
// Handle direct trigger (transaction chips)
if ($(this).hasClass('player-modal-trigger') && !row.length) {
    const pid = $(this).data('pid');
    if (!pid) return;
    // Build a minimal synthetic row context
    const name = $(this).find('div:not(:has(img))').first().text().trim() || pid;
const pos = $(this).find('span[class*="pos-"]').text().trim() || 'UNK';
    const team = $(this).data('team') || $(this).closest('[data-pteam]').data('pteam') || 'NFL';
    const teamImg = getNFLLogoUrl(team);


$('#modal-img').attr('src', `https://www.mflscripts.com/playerImages_80x107/mfl_${pid}.png`);
$('#modal-team-logo').attr('src', teamImg);
const posColors = { QB: 'var(--pos-qb)', RB: 'var(--pos-rb)', WR: 'var(--pos-wr)', TE: 'var(--pos-te)', PK: 'var(--pos-pk)', DL: 'var(--pos-dl)', LB: 'var(--pos-lb)', DB: 'var(--pos-db)', DE: 'var(--pos-dl)', DT: 'var(--pos-dl)', CB: 'var(--pos-db)', S: 'var(--pos-db)' };
$('#modal-pos').text(pos).removeClass().css({ fontSize: '13px', fontWeight: '900', marginLeft: '5px', marginRight: '4px', background: 'none', padding: '0', borderRadius: '0', color: posColors[pos.toUpperCase()] || '#fff' });
$('#modal-name').html(playerName);
$('#modal-inj').html(injHtml);
$('#modal-pid-text').text('');
        $('#modal-bio-pills').html('');
        // Load bio pills async
        fetch(`https://www45.myfantasyleague.com/${year}/player?L=${lid}&P=${pid}&YEAR=${year}&DISPLAY_TYPE=projections&PROJSRC=mfl`, { credentials: 'include' })
            .then(r => r.text())
            .then(html => {
                const bioDoc = new DOMParser().parseFromString(html, 'text/html');
                const bioMap = {};
                bioDoc.querySelectorAll('table.biography tr').forEach(row => {
                    const th = row.querySelector('th')?.textContent.trim().replace(':','');
                    const td = row.querySelector('td')?.textContent.trim();
                    if (th && td) bioMap[th] = td;
                });
const hw = bioMap['Height/Weight'] || '';
                const age = bioMap['DOB/Age'] || '';
                const drafted = bioMap['Drafted'] || '';
                const exp = bioMap['Experience'] || '';
                const bye = bioMap['Bye Week'] || '';
                const ageMatch = age.match(/Age:\s*(\d+)/i) || age.match(/\((\d+)\)/);
                const ageDisplay = ageMatch ? ageMatch[1] : age.split('/').pop()?.trim();
                let bioHtml = '';
                if (hw) bioHtml += `<div style="font-size:11px; font-weight:900; color:#fff;">${hw}</div>`;
                const details = [];
                if (ageDisplay) details.push(`<span><span style="color:var(--text-dim);">Age:</span> ${ageDisplay}</span>`);
                if (drafted) details.push(`<span><span style="color:var(--text-dim);">Drafted:</span> ${drafted}</span>`);
                if (exp) details.push(`<span><span style="color:var(--text-dim);">Exp:</span> ${exp}</span>`);
                if (bye) details.push(`<span><span style="color:var(--text-dim);">Bye:</span> ${bye}</span>`);
                if (details.length) bioHtml += `<div style="font-size:10px; font-weight:800; color:#fff; margin-top:3px; display:flex; flex-wrap:wrap; gap:6px;">${details.join('')}</div>`;
                $('#modal-bio-pills').html(bioHtml);
            }).catch(() => {});
    $('#modal-dynamic-header').css({ background: 'rgba(59,130,246,0.2)', 'border-bottom': '1px solid rgba(59,130,246,0.3)' });
$('.modal-tab-btn').removeClass('active').show();
$('.modal-tab-content').removeClass('active');
$('#modal-trade-offer-btn').hide();
$('#modal-owner-actions').hide();
    $('#tab-btn-tx').addClass('active');
    $('#tab-tx').addClass('active');
    const isMyTeamCheck = leagueFranchises[myFid] !== undefined;
    $('#modal-actions-container').html(`<div class="modal-mgmt-grid"><div class="modal-mgmt-btn" style="grid-column:span 2; border-color:var(--accent-blue);" onclick="txAction('propose','${pid}',event)"><span>Propose Trade</span></div></div>`);
    $('#smart-player-modal').css('display', 'flex').hide().fadeIn(200);
    $('body').css('overflow', 'hidden');
    return;
}
        if (row.hasClass('empty-slot')) return;

        // 1. Get PID (Fallback to scraping the player image URL if data-pid is missing)
        let pid = row.data('pid');
        if (!pid) {
            const imgSrc = row.find('.player-img').attr('src') || "";
            const pidMatch = imgSrc.match(/mfl_(\d+)/);
            if (pidMatch) pid = pidMatch[1];
        }

        // 2. Get Position (Fallback to the badge text)
        const pos = row.data('ppos') || row.find('.pos-badge-overlay:not(.status-badge-overlay)').text().trim() || 'UNK';

        // 3. Get Team Name (Fallback to scraping the team logo URL if data-pteam is missing)
        let teamName = row.data('pteam');
        if (!teamName) {
            const teamImgSrc = row.find('.team-logo-overlay').attr('src') || "NFL.svg";
            teamName = teamImgSrc.split('/').pop().split('.')[0];
        }

        // 4. Get Player Name & Injury Badge
        const playerName = row.data('pname') || row.find('.full-name').text() || row.find('.player-name-slot').text().trim();
        const injHtml = row.find('.injury-badge').length ? row.find('.injury-badge')[0].outerHTML : '';
        
        // 5. Construct the final High-Res Team Image
        const teamImg = getNFLLogoUrl(teamName);

        const activeSub = $('#subtabs-team .sub-tab-btn.active').text().trim().toLowerCase();
        const isLineupMode = activeSub.includes('lineup');
        const isMyTeam = (fid === myFid);
        const isStarter = row.closest('#slots-starters').length > 0;

window._modalCurrentPid = pid;
        window._modalCurrentName = playerName;
        $('#header-btn-taxi').off('click').on('click', function(e) { txAction('taxi', pid, e); });
        $('#header-btn-ir').off('click').on('click', function(e) { txAction('ir', pid, e); });
        $('#header-btn-block').off('click').on('click', function(e) { txAction('block', pid, e); });
        $('#header-btn-resign').off('click').on('click', function(e) { txAction('resign', pid, e); });
        $('#header-btn-cut').off('click').on('click', function(e) { txAction('cut', pid, e); });
        console.log('bindings set, pid:', pid);
        $('.modal-tab-btn').removeClass('active').show();
        $('.modal-tab-content').removeClass('active');
        $('#modal-trade-offer-btn').hide();
        $('#modal-owner-actions').hide();

        // Logic: Route tabs based on context
$('#modal-tabs-row').show();
$('#modal-trade-offer-btn').hide();
if (isMyTeam) {
    $('#modal-trade-offer-btn').hide();
console.log('isMyTeam:', isMyTeam, 'owner actions el:', $('#modal-owner-actions').length);
$('#modal-owner-actions').show();    $('#tab-btn-lineup').show();
    $('#tab-btn-tx').show();
    $('#tab-btn-gamelog').show();
    $('#tab-btn-contract').show();
    $('#tab-btn-history').show();

    if (isLineupMode) {
        $('#tab-btn-lineup').addClass('active');
        $('#tab-lineup').addClass('active');

        if (irPids.has(pid.toString()) || taxiPids.has(pid.toString())) {
            const action = irPids.has(pid.toString()) ? 'activate' : 'promote';
            const actionText = irPids.has(pid.toString()) ? 'Activate from IR' : 'Promote from Taxi';
            const isLocked = row.data('locked') === true;
            if (isLocked) {
                const lockMsg = row.data('lockmsg') || 'Player is locked.';
                $('#modal-swap-list').html(`
                    <div style="padding: 30px 15px; text-align: center;">
                        <div style="font-size: 28px; margin-bottom: 10px;">🔒</div>
                        <p style="color: #ef4444; font-size: 14px; font-weight: 900; margin-bottom: 8px; text-transform: uppercase;">Action Locked</p>
                        <p style="color: var(--text-dim); font-size: 11px;">${lockMsg}</p>
                    </div>
                `);
            } else {
                $('#modal-swap-list').html(`
                    <div style="padding: 20px 15px; text-align: center;">
                        <p style="color: var(--text-dim); font-size: 12px; margin-bottom: 15px;">This player is deactivated.</p>
                        <button class="roster-tx-btn" data-tx-type="${action}" data-tx-pid="${pid}" style="width: 100%; padding: 14px; border-radius: 8px; background: var(--accent-blue); color: #fff; font-weight: 800; border: none; cursor: pointer; text-transform: uppercase;">${actionText}</button>
                    </div>
                `);
            }
        } else {
            populateQuickSwap(pos, isStarter, '#modal-swap-list');
            if (!isStarter) {
                const hasInjury = row.find('.injury-badge').length > 0;
                let irBtnHtml = hasInjury
                    ? `<button class="roster-tx-btn" data-tx-type="deactivate" data-tx-pid="${pid}" style="flex: 1; padding: 10px; border-radius: 6px; background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); font-weight: 800; font-size: 10px; cursor: pointer; text-transform: uppercase;">Move to IR</button>`
                    : `<button disabled style="flex: 1; padding: 10px; border-radius: 6px; background: rgba(255,255,255,0.05); color: var(--text-dim); border: 1px dashed rgba(255,255,255,0.15); font-weight: 800; font-size: 10px; cursor: not-allowed; text-transform: uppercase;">IR (Not Injured)</button>`;
                $('#modal-swap-list').prepend(`
                    <div style="display: flex; gap: 10px; padding: 10px 15px; border-bottom: 1px solid var(--card-border); background: rgba(0,0,0,0.2);">
                        ${irBtnHtml}
                        <button class="roster-tx-btn" data-tx-type="demote" data-tx-pid="${pid}" style="flex: 1; padding: 10px; border-radius: 6px; background: rgba(245,158,11,0.1); color: #f59e0b; border: 1px solid rgba(245,158,11,0.3); font-weight: 800; font-size: 10px; cursor: pointer; text-transform: uppercase;">Move to Taxi</button>
                    </div>
                `);
            }
        }
} else {
    $('#tab-btn-lineup').hide();
    $('#tab-btn-tx').addClass('active');
    $('#tab-tx').addClass('active');
}
} else {
    $('#tab-btn-lineup').hide();
    $('#tab-btn-tx').show();
    $('#modal-owner-actions').hide();
    $('#modal-trade-offer-btn').show();
    $('#tab-btn-gamelog').show();
    $('#tab-btn-history').show();
    $('#tab-btn-tx').addClass('active');
    $('#tab-tx').addClass('active');
    loadModalContract(pid);
}
// Header Data & Dynamic Background
        const nflColors = {
            'ARI': ['#97233F', '#000000'], 'ATL': ['#A71930', '#000000'], 'BAL': ['#241773', '#9E7C0C'],
            'BUF': ['#00338D', '#C60C30'], 'CAR': ['#0085CA', '#101820'], 'CHI': ['#0B162A', '#C83803'],
            'CIN': ['#FB4F14', '#000000'], 'CLE': ['#311D00', '#FF3C00'], 'DAL': ['#003594', '#041E42'],
            'DEN': ['#FB4F14', '#002244'], 'DET': ['#0076B6', '#B0B7BC'], 'GBP': ['#203731', '#FFB612'],
            'HOU': ['#03202F', '#A71930'], 'IND': ['#002C5F', '#A2AAAD'], 'JAC': ['#006778', '#D7A22A'],
            'KCC': ['#E31837', '#FFB81C'], 'LVR': ['#000000', '#A5ACAF'], 'LAC': ['#0080C6', '#FFC20E'],
            'LAR': ['#003594', '#FFA300'], 'MIA': ['#008E97', '#FC4C02'], 'MIN': ['#4F2683', '#FFC62F'],
            'NEP': ['#002244', '#C60C30'], 'NOS': ['#D3BC8D', '#101820'], 'NYG': ['#0B2265', '#A71930'],
            'NYJ': ['#125740', '#000000'], 'PHI': ['#004C54', '#A5ACAF'], 'PIT': ['#FFB612', '#101820'],
            'SFO': ['#AA0000', '#B3995D'], 'SEA': ['#002244', '#69BE28'], 'TBB': ['#D50A0A', '#34302B'],
            'TEN': ['#0C2340', '#4B92DB'], 'WAS': ['#5A1414', '#FFB612']
        };
        let colors = nflColors[teamName.toUpperCase()] || ['#3b82f6', '#1e293b']; 
        
        $('#modal-dynamic-header').css({
            'background': `linear-gradient(135deg, ${colors[0]}60, ${colors[1]}30)`,
            'border-bottom': `1px solid ${colors[0]}50`
        });

        $('#modal-img').attr('src', `https://www.mflscripts.com/playerImages_80x107/mfl_${pid}.png`);
        $('#modal-team-logo').attr('src', teamImg);
const posColors = { QB: 'var(--pos-qb)', RB: 'var(--pos-rb)', WR: 'var(--pos-wr)', TE: 'var(--pos-te)', PK: 'var(--pos-pk)', DL: 'var(--pos-dl)', LB: 'var(--pos-lb)', DB: 'var(--pos-db)', DE: 'var(--pos-dl)', DT: 'var(--pos-dl)', CB: 'var(--pos-db)', S: 'var(--pos-db)' };
$('#modal-pos').text(pos).removeClass().css({ fontSize: '13px', fontWeight: '900', marginLeft: '5px', marginRight: '4px', background: 'none', padding: '0', borderRadius: '0', color: posColors[pos.toUpperCase()] || '#fff' });
        $('#modal-name').html(playerName);
        $('#modal-inj').html(injHtml);
$('#modal-pid-text').text('');
        $('#modal-bio-pills').html('');
        // Load bio pills async
        fetch(`https://www45.myfantasyleague.com/${year}/player?L=${lid}&P=${pid}&YEAR=${year}&DISPLAY_TYPE=projections&PROJSRC=mfl`, { credentials: 'include' })
            .then(r => r.text())
            .then(html => {
                const bioDoc = new DOMParser().parseFromString(html, 'text/html');
                const bioMap = {};
                bioDoc.querySelectorAll('table.biography tr').forEach(row => {
                    const th = row.querySelector('th')?.textContent.trim().replace(':','');
                    const td = row.querySelector('td')?.textContent.trim();
                    if (th && td) bioMap[th] = td;
                });
const hw = bioMap['Height/Weight'] || '';
                const age = bioMap['DOB/Age'] || '';
                const drafted = bioMap['Drafted'] || '';
                const exp = bioMap['Experience'] || '';
                const bye = bioMap['Bye Week'] || '';
                const ageMatch = age.match(/Age:\s*(\d+)/i) || age.match(/\((\d+)\)/);
                const ageDisplay = ageMatch ? ageMatch[1] : age.split('/').pop()?.trim();
                let bioHtml = '';
                if (hw) bioHtml += `<div style="font-size:11px; font-weight:900; color:#fff;">${hw}</div>`;
                const details = [];
                if (ageDisplay) details.push(`<span><span style="color:var(--text-dim);">Age:</span> ${ageDisplay}</span>`);
                if (drafted) details.push(`<span><span style="color:var(--text-dim);">Drafted:</span> ${drafted}</span>`);
                if (exp) details.push(`<span><span style="color:var(--text-dim);">Exp:</span> ${exp}</span>`);
                if (bye) details.push(`<span><span style="color:var(--text-dim);">Bye:</span> ${bye}</span>`);
                if (details.length) bioHtml += `<div style="font-size:10px; font-weight:800; color:#fff; margin-top:3px; display:flex; flex-wrap:wrap; gap:6px;">${details.join('')}</div>`;
                $('#modal-bio-pills').html(bioHtml);
            }).catch(() => {});
// Pre-load default tab
if (!isMyTeam) {
    loadModalGameLog(pid);
} else if (!isLineupMode) {
    loadModalContract(pid);
}

$('#smart-player-modal').css('display', 'flex').hide().fadeIn(200);
$('body').css('overflow', 'hidden');
    });
$(document).off('click', '.modal-tab-btn').on('click', '.modal-tab-btn', function() {
    console.log('tab clicked:', $(this).data('target'));

    $('.modal-tab-btn').removeClass('active');
    $('.modal-tab-content').removeClass('active');
    $(this).addClass('active');
    const target = $(this).data('target');
    $('#' + target).addClass('active');
    const pid = window._modalCurrentPid;
    if (!pid) return;
    if (target === 'tab-gamelog') loadModalGameLog(pid);
    else if (target === 'tab-tx') loadModalContract(pid);
    else if (target === 'tab-history') loadModalHistory(pid);
});
    $(document).off('click', '.player-modal-close, .player-modal-backdrop').on('click', '.player-modal-close, .player-modal-backdrop', function(e) {
        if ($(e.target).closest('.player-modal-box').length && !$(e.target).hasClass('player-modal-close')) { return; }
        $('#smart-player-modal').fadeOut(200); 
        $('body').css('overflow', ''); 
    });

// --- MASTER TRANSACTION ROUTER ---
    window.txAction = async function(type, pid, evt) {
const fullHeaderName = $('#modal-name').text().trim();
const playerName = window._modalCurrentName || fullHeaderName;
if (!pid) pid = window._modalCurrentPid;
    if (!pid) { console.warn('txAction: no pid'); return; }
    pid = String(pid);
const btn = $(evt && evt.currentTarget ? evt.currentTarget : evt && evt.target ? evt.target : document.body);
        const originalText = btn.html();

        if (type === 'cut') {
// Get player's dead cap from contract data
            const contractRow = Array.from(currentDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow')).find(row => {
                const pLink = row.querySelector('td a[class*="position_"]');
                return pLink && pLink.getAttribute('href').includes(pid);
            });
            let deadCapMsg = '';
            if (contractRow) {
                const salNum = parseFloat(contractRow.querySelector('td.salary')?.textContent.replace(/[^0-9.]/g, '')) || 0;
                const yrsNum = parseInt(contractRow.querySelector('td.contractyear')?.textContent) || 0;
                const gPct = parseFloat(contractRow.querySelector('td.contractinfo')?.textContent.replace(/[^0-9.]/g, '')) / 100 || 0;
                const deadCap = (salNum * gPct * yrsNum).toFixed(1);
                if (parseFloat(deadCap) > 0) {
                    deadCapMsg = `\n\nDead Cap Hit: $${deadCap}m will be charged to your cap.`;
                }
            }
            const confirmCut = confirm(`Are you sure you want to CUT ${playerName}?${deadCapMsg}\n\nThis action is final and cannot be undone.`);
            if (!confirmCut) return;

            btn.html('<span>PROCESSING...</span>').css({'opacity': '0.5', 'pointer-events': 'none'});

            try {
const apiData = new URLSearchParams();
apiData.append('TYPE', 'fcfsWaiver');
apiData.append('L', lid);
apiData.append('DROP', pid);
if (fid !== myFid) apiData.append('FRANCHISE_ID', fid);

                const res = await fetch(`https://www45.myfantasyleague.com/${year}/import`, { 
                    method: 'POST', body: apiData, credentials: 'include', cache: 'no-store'
                });
                const responseText = await res.text();
                
               if (responseText.toLowerCase().includes('error')) {
                    const errorMatch = responseText.match(/<error[^>]*>(.*?)<\/error>/i);
                    alert("MFL Rejected the Cut:\n\n" + (errorMatch ? errorMatch[1] : "Unknown MFL Error."));
                    btn.html(originalText).css({'opacity': '1', 'pointer-events': 'auto'});
                    return; 
                }

                // Import dead cap salary adjustment for cut player
                try {
                    // Find player's contract from currentDoc
                    const contractRow = Array.from(currentDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow')).find(row => {
                        const pLink = row.querySelector('td.player a[class*="position_"]');
                        return pLink && pLink.getAttribute('href').includes(pid);
                    });

                    if (contractRow) {
                        const salNum = parseFloat(contractRow.querySelector('td.salary')?.textContent.replace(/[^0-9.]/g, '')) || 0;
                        const yrsNum = parseInt(contractRow.querySelector('td.contractyear')?.textContent) || 1;
                        const guarStr = contractRow.querySelector('td.contractinfo')?.textContent.trim() || '0%';
                        const gPct = parseFloat(guarStr.replace(/[^0-9.]/g, '')) / 100 || 0;
                        const deadCap = (salNum * gPct * yrsNum * 1000000).toFixed(0);

                        if (deadCap > 0) {
const adjXml = `<salary_adjustments><salary_adjustment franchise_id="${fid.padStart(4,'0')}" amount="${deadCap}" explanation="Dead cap: ${playerName} cut" /></salary_adjustments>`;
const adjParams = new URLSearchParams();
adjParams.set('TYPE', 'salaryAdj');
adjParams.set('L', lid);
adjParams.set('DATA', adjXml);
const adjRes = await fetch(`https://www45.myfantasyleague.com/${year}/import`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: adjParams.toString()
});
const adjText = await adjRes.text();
console.log(`Dead cap response:`, adjText);
                            console.log(`Dead cap applied: ${deadCap} for ${playerName}`);
                        }
                    }
                } catch(capErr) {
                    console.warn('Dead cap import failed:', capErr);
                }

$('#smart-player-modal').fadeOut(200);
$('body').css('overflow', '');
$('#player-rows-container').html('<div style="text-align:center; padding: 40px; color: #ef4444; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; animation: pulse-blue 1.5s infinite;">Processing Cut...</div>');

await fetchMasterStatus();
window._teamDataDirty = true;
await loadTeamData();

            } catch (err) {
                console.error("Cut Error:", err);
                alert("Network error. Failed to communicate with MFL.");
                btn.html(originalText).css({'opacity': '1', 'pointer-events': 'auto'});
            }

        } else if (type === 'ir' || type === 'taxi') {
    console.log('IR/Taxi triggered:', type, pid, playerName, 'fid:', fid, 'btn:', btn?.length);

            const isIR = irPids.has(pid.toString());
            const isTaxi = taxiPids.has(pid.toString());
            
            let actionText = "";
            let apiType = "";
            let actionParam = "";

            if (type === 'ir') {
                actionText = isIR ? "ACTIVATE from IR" : "DEACTIVATE to IR";
                apiType = 'ir';
                actionParam = isIR ? 'ACTIVATE' : 'DEACTIVATE';
            } else {
                actionText = isTaxi ? "PROMOTE from Taxi" : "DEMOTE to Taxi";
                apiType = 'taxi_squad';
                actionParam = isTaxi ? 'PROMOTE' : 'DEMOTE';
            }

            const confirmMove = confirm(`Are you sure you want to ${actionText} ${playerName}?`);
            if (!confirmMove) return;

            btn.html('<span>PROCESSING...</span>').css({'opacity': '0.5', 'pointer-events': 'none'});

            try {
const apiData = new URLSearchParams();
apiData.append('LEAGUE_ID', lid);
apiData.append('FRANCHISE_ID', fid.padStart(4,'0'));
apiData.append(actionParam.toLowerCase() + fid.padStart(4,'0'), pid);
const res = await fetch(`https://www45.myfantasyleague.com/${year}/${apiType === 'ir' ? 'ir' : 'taxi_squad'}`, { 
                    method: 'POST', body: apiData, credentials: 'include', cache: 'no-store'
                });
                
                const responseText = await res.text();
if (responseText.match(/<error[^>]*>.*?<\/error>/i)) {
    const errorMatch = responseText.match(/<error[^>]*>(.*?)<\/error>/i);
    alert(`MFL Rejected the move:\n\n` + (errorMatch ? errorMatch[1] : "Check league rules for this transaction."));
    btn.html(originalText).css({'opacity': '1', 'pointer-events': 'auto'});
    return; 
}
                
                $('#smart-player-modal').fadeOut(200);
                $('body').css('overflow', '');
                $('#player-rows-container').html('<div style="text-align:center; padding: 40px; color: var(--accent-blue); font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; animation: pulse-blue 1.5s infinite;">Processing Move...</div>');
                
                await fetchMasterStatus();
window._teamDataDirty = true;
                await loadTeamData();

            } catch (err) {
                console.error("Move Error:", err);
                alert("Network error. Failed to communicate with MFL.");
                btn.html(originalText).css({'opacity': '1', 'pointer-events': 'auto'});
            }

        } else if (type === 'block') {
            
btn.html('<span>LOADING...</span>').css({'opacity': '0.5', 'pointer-events': 'none'});

            let existingGiveUp = [];
            let existingExchange = ""; 
            try {
                const tbRes = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=tradeBait&L=${lid}&JSON=1`, { credentials: 'include', cache: 'no-store' });
                const tbData = await tbRes.json();
                console.log('tradeBait response:', tbData);
                
                if (tbData && tbData.tradeBaits && tbData.tradeBaits.tradeBait) {
                    let baits = tbData.tradeBaits.tradeBait;
                    if (!Array.isArray(baits)) baits = [baits];
                    
                    const myBait = baits.find(b => b.franchise_id === fid || b.franchise === fid);
                    if (myBait) {
                        if (myBait.willGiveUp) existingGiveUp = myBait.willGiveUp.split(',');
                        if (myBait.inExchangeFor) existingExchange = myBait.inExchangeFor;
                    }
                }
            } catch (err) { console.warn("Could not fetch existing trade bait.", err); }

const isAlreadyOnBlock = existingGiveUp.includes(pid.toString());
            if (isAlreadyOnBlock) {
                const confirmRemove = confirm(`${playerName} is already on your Trade Block. Remove them?`);
                if (!confirmRemove) {
                    btn.html(originalText).css({'opacity': '1', 'pointer-events': 'auto'});
                    return;
                }
                existingGiveUp = existingGiveUp.filter(id => id !== pid.toString());
            } else {
                existingGiveUp.push(pid.toString());
            }



// Build my picks chips
            const myPicks = window.currentTeamPicks || [];
            const picksChipsHtml = myPicks.length ? `
                <div style="font-size:9px; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; font-weight:800;">Include My Picks</div>
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px;">
                    ${myPicks.map(pick => {
                        const pickId = pick.pickStr ? `${pick.year}_${pick.pickStr.replace('.','_')}` : `${pick.year}_${pick.round}`;
                        const label = pick.pickStr ? pick.pickStr : `${pick.year} R${pick.round}`;
                        return `<div class="trade-pick-tag-btn" data-pickid="${pickId}" 
                            style="padding:6px 10px; border-radius:6px; font-size:10px; font-weight:900; cursor:pointer; border:1px solid rgba(245,158,11,0.3); background:rgba(245,158,11,0.08); color:#f59e0b;">
                            ${label}
                        </div>`;
                    }).join('')}
                </div>
            ` : '';

            $('#modal-actions-container').html(`
                <div class="trade-block-form" style="animation: fadeIn 0.3s ease;">
                    <div style="font-size:13px; font-weight:900; color:#fff; text-transform:uppercase; margin-bottom:15px; text-align:center;">Trading ${playerName}</div>
                    
                    <div style="font-size:9px; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; font-weight:800;">Target Positions</div>
                    <div class="trade-tag-group">
                        <div class="trade-tag-btn" data-val="QB">QB</div>
                        <div class="trade-tag-btn" data-val="RB">RB</div>
                        <div class="trade-tag-btn" data-val="WR">WR</div>
                        <div class="trade-tag-btn" data-val="TE">TE</div>
                    </div>

                    <div style="font-size:9px; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; font-weight:800;">Target Picks</div>
                    <div class="trade-tag-group">
                        <div class="trade-tag-btn" data-val="1st Rd">1st Rd</div>
                        <div class="trade-tag-btn" data-val="2nd Rd">2nd Rd</div>
                        <div class="trade-tag-btn" data-val="3rd Rd">3rd Rd</div>
                        <div class="trade-tag-btn" data-val="Future">Future</div>
                    </div>

                    ${picksChipsHtml}

           <button class="trade-submit-btn" id="confirm-trade-block" data-pid="${pid}" data-giveup="${existingGiveUp.join(',')}" data-removing="${isAlreadyOnBlock}">${isAlreadyOnBlock ? 'Remove from Trade Block' : 'Add to Trade Block'}</button>
                    <button style="width: 100%; background: transparent; color: var(--text-dim); border: none; padding: 12px; margin-top: 10px; font-weight: 700; font-size: 12px; text-transform: uppercase; cursor: pointer;" onclick="$('.player-modal-close').click()">Cancel</button>
                </div>
            `);

} else if (type === 'propose') {
    $('#smart-player-modal').fadeOut(200);
    $('body').css('overflow', '');
    $('.tab-btn').removeClass('active');
    $('.tab-btn').filter(function() { return $(this).text().trim().toUpperCase() === 'LEAGUE'; }).addClass('active');
    $('.tab-content').hide().removeClass('active');
    $('#tab-league').show().addClass('active');
    $('.sub-tabs-group').removeClass('active');
    $('#subtabs-league').addClass('active');
    $('.sub-tabs-container').show();
    $('#subtabs-league .sub-tab-btn').removeClass('active');
    $('#subtabs-league .sub-tab-btn').filter(function() { return $(this).text().trim() === 'Trades'; }).addClass('active');
    loadTradeHub(fid !== myFid ? fid : null, pid);
$('.modal-tab-btn').removeClass('active');
$('.modal-tab-content').removeClass('active');
$('#tab-btn-tx').addClass('active');
$('#tab-tx').addClass('active');
} else if (type === 'resign') {

    btn.html('<span>LOADING...</span>').css({'opacity': '0.5', 'pointer-events': 'none'});

    window._alreadyResigned = false;
    try {
        const adjRes = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=142`, { credentials: 'include' });
        const adjDoc = new DOMParser().parseFromString(await adjRes.text(), 'text/html');
        adjDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
            const explanation = row.querySelector('td:nth-child(3)')?.textContent.trim() || '';
            const resignMatch = explanation.replace(/[\u2018\u2019\u02bc]/g, "'").match(/^(.+?) re-signed:.*pid:(\d+)/);
            if (resignMatch && resignMatch[2] === String(pid)) {
                window._alreadyResigned = true;
            }
        });
    } catch(e) { console.warn('Could not check resign history', e); }

            const playerPos = $('#modal-pos').text().trim();
            let posGroup = playerPos;
            if (['DE','DT'].includes(posGroup)) posGroup = 'DL';
            if (['CB','S'].includes(posGroup)) posGroup = 'DB';

            const adpPosMap = { QB:'QB', RB:'RB', WR:'WR', TE:'TE', PK:'PK', DL:'DL', LB:'LB', DB:'DB' };
            const adpPos = adpPosMap[posGroup] || posGroup;

            try {
                const adpRes = await fetch(`https://www45.myfantasyleague.com/${year}/reports?R=RANKS&L=${lid}&STATUS=*&POS=${adpPos}&ROOKIES=0&INJURED=0&SOURCE=sharks`, { credentials: 'include', cache: 'no-store' });
                const adpHtml = await adpRes.text();
                const adpDoc = new DOMParser().parseFromString(adpHtml, 'text/html');

                let dynastyRank = null;
                adpDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach((row, idx) => {
                    if (dynastyRank) return;
                    const pLink = row.querySelector('td.player a');
                    if (!pLink) return;
                    const pidMatch = pLink.getAttribute('href').match(/\d+/g);
                    if (pidMatch && pidMatch.pop() === pid.toString()) dynastyRank = idx + 1;
                });
                if (!dynastyRank) dynastyRank = 99;

                const targetRank = Math.max(1, dynastyRank - 5);
                const salaries = (window.leagueSalaryData && window.leagueSalaryData[posGroup]) || [];
                const baseFloor = targetRank <= salaries.length ? Math.max(5, salaries[targetRank - 1].sal) : 5;
// Store current player salary and team cap for live bar
                let currentPlayerSal = 0;
                if (window.leagueSalaryData && window.leagueSalaryData[posGroup]) {
                    const match = window.leagueSalaryData[posGroup].find(s => {
                        // Match by checking if the modal player name appears in the salary name
                        return s.name && playerName && s.name.toLowerCase().includes(playerName.split(' ').pop().toLowerCase());
                    });
                    if (match) currentPlayerSal = match.sal;
                }
                window.currentResignPlayerSal = currentPlayerSal;
console.log('currentResignPlayerSal:', window.currentResignPlayerSal, 'yearsLeft:', window.currentResignYearsLeft, 'playerName:', playerName);

const contractYearsLeft = (() => {
    if (!currentDoc) return 0;
    const lastName = playerName.split(' ').pop();
    const rows = Array.from(currentDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow'));
    for (const row of rows) {
if (row.textContent.includes(lastName)) {
            const yrsCell = row.querySelector('td.contractyear');
            return parseInt(yrsCell?.textContent.trim()) || 0;
        }
    }
    return 0;
})();
window.currentResignYearsLeft = contractYearsLeft;

                // Calculate current team cap total from leagueSalaryData (all positions)
                let teamCapTotal = 0;
                if (window.leagueSalaryData) {
                    // Sum all salaries for players on THIS team's roster from contractPlayers
                    // Use the capByYear value we already calculated
                    teamCapTotal = parseFloat(($('#resign-cap-used').text() || '0').replace(/[^0-9.]/g, '')) || 0;
                }
                // Better: read directly from the contracts dashboard pill if visible
// Calculate team cap by parsing the roster directly
                window.currentTeamCapUsed = 0;
                if (currentDoc) {
                    currentDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
                        const salCell = row.querySelector('td.salary');
                        if (!salCell) return;
                        const sal = parseFloat(salCell.textContent.replace(/[^0-9.]/g, '')) || 0;
                        window.currentTeamCapUsed += sal;
                    });
                    window.currentTeamCapUsed = parseFloat(window.currentTeamCapUsed.toFixed(1));
                }
                const YR_UP = 0.12, YR_DN = 0.06, G_UP = 0.06, G_DN = 0.03;
                function calcSalary(yrs, guar) {
                    const yrDelta = yrs - 3;
                    const gDelta = guar - 50;
                    const yrMult = 1 - yrDelta * (yrDelta < 0 ? YR_UP : YR_DN);
                    const gMult = 1 - (gDelta / 10) * (gDelta < 0 ? G_UP : G_DN);
                    return Math.round(baseFloor * yrMult * gMult * 10) / 10;
                }
const baseSalary = calcSalary(3, 50);  // ← add this line here


                btn.html(originalText).css({'opacity': '1', 'pointer-events': 'auto'});

                const start = Math.max(0, targetRank - 4);
                const end = Math.min(salaries.length, targetRank + 3);
                const drawerRows = salaries.slice(start, end).map((entry, i) => {
                    const idx = start + i;
                    const isTarget = idx === targetRank - 1;
                    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 10px;border-bottom:1px solid rgba(255,255,255,0.04);background:${isTarget?'rgba(245,158,11,0.12)':'transparent'};"><div style="display:flex;align-items:center;gap:8px;"><span style="font-size:9px;font-weight:900;color:${isTarget?'#f59e0b':'var(--text-dim)'};min-width:20px;">#${idx+1}</span><span style="font-size:11px;font-weight:${isTarget?'900':'700'};color:${isTarget?'#f59e0b':'#fff'};">${entry.name}</span></div><span style="font-size:11px;font-weight:900;color:${isTarget?'#f59e0b':'#fff'};white-space:nowrap;">$${entry.sal}m${isTarget?' ← floor':''}</span></div>`;
                }).join('');

$('#modal-actions-container').html(`
    <div style="animation:fadeIn 0.3s ease;">
${window._resignOpen !== true ? `
        <div style="padding:8px 12px; background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.3); border-radius:8px; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
            <span style="font-size:16px;">🔒</span>
            <div>
                <div style="font-size:10px; font-weight:900; color:#ef4444; text-transform:uppercase;">Re-Signing Locked</div>
                <div style="font-size:9px; color:var(--text-dim); margin-top:2px;">You can review terms but cannot submit until the commissioner opens re-signing.</div>
            </div>
        </div>` : ''}
        ${window._alreadyResigned ? `
        <div style="padding:8px 12px; background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.3); border-radius:8px; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
            <span style="font-size:16px;">🔒</span>
            <div>
                <div style="font-size:10px; font-weight:900; color:#ef4444; text-transform:uppercase;">Already Resigned This Season</div>
                <div style="font-size:9px; color:var(--text-dim); margin-top:2px;">A player can only be re-signed once per year.</div>
            </div>
        </div>` : ''}
        <div style="font-size:11px;font-weight:900;color:#fff;text-transform:uppercase;margin-bottom:10px;text-align:center;">Resign ${playerName}</div>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;">
                            <div style="background:rgba(0,0,0,0.3);border-radius:6px;padding:7px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;" id="resign-floor-toggle">
                                <div>
                                    <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;margin-bottom:2px;">Dynasty Rank</div>
                                    <div style="font-size:13px;font-weight:900;color:var(--accent-blue);">#${dynastyRank}</div>
                                </div>
                                <div style="text-align:right;">
                                    <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;margin-bottom:2px;">Floor</div>
                                    <div style="font-size:13px;font-weight:900;color:#f59e0b;">$${baseFloor}m</div>
                                </div>
                            </div>
                            <div style="background:rgba(0,0,0,0.3);border-radius:6px;padding:7px;">
                                <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;margin-bottom:4px;text-align:center;">Proposal</div>
                                <div id="resign-salary-warning" style="display:none; font-size:9px; font-weight:800; color:#ef4444; text-align:center; padding:4px 6px; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:6px; margin-bottom:4px;">⚠️ Cannot resign below current salary while years remain</div>
<div style="font-size:13px;font-weight:900;color:#22c55e;text-align:center;" id="resign-final-sal">$${calcSalary(3,50).toFixed(1)}m/yr</div>
                                <div style="font-size:9px;color:var(--text-dim);text-align:center;margin-top:3px;" id="resign-proposal-summary">3 yrs · 50% guar</div>
                                <button id="resign-show-yearly" style="width:100%;margin-top:6px;padding:4px;border-radius:4px;background:rgba(255,255,255,0.08);color:var(--text-dim);border:1px solid rgba(255,255,255,0.1);font-size:9px;font-weight:800;text-transform:uppercase;cursor:pointer;">Show Yearly ▼</button>
                            </div>
                        </div>

                        <div id="resign-floor-drawer" style="display:none;background:rgba(0,0,0,0.2);border-radius:6px;overflow:hidden;margin-bottom:10px;">
                            <div style="font-size:9px;font-weight:900;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px;padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.05);">${posGroup} salaries — floor at rank #${targetRank}</div>
                            ${drawerRows}
                        </div>

<div id="resign-yearly-drawer" style="display:none;background:rgba(0,0,0,0.2);border-radius:6px;overflow:hidden;margin-bottom:10px;">
                            <div style="font-size:9px;font-weight:900;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px;padding:7px 8px;border-bottom:1px solid rgba(255,255,255,0.05);">Cap Hit if Cut Each Year</div>
                            <div id="resign-cap-hit-table"></div>
                        </div>

                        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px;">
                            <div>
                                <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                                    <span style="font-size:10px;font-weight:800;color:var(--text-dim);text-transform:uppercase;">Years</span>
                                    <span style="font-size:10px;font-weight:900;color:#fff;" id="resign-yrs-lbl">3 yrs</span>
                                </div>
                                <input type="range" id="resign-years" min="1" max="5" step="1" value="3" style="width:100%;">
                            </div>
                            <div>
                                <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                                    <span style="font-size:10px;font-weight:800;color:var(--text-dim);text-transform:uppercase;">Guaranteed %</span>
                                    <span style="font-size:10px;font-weight:900;color:#fff;" id="resign-guar-lbl">50%</span>
                                </div>
                                <input type="range" id="resign-guar" min="10" max="100" step="5" value="50" style="width:100%;">
                            </div>
                            <div style="background:rgba(0,0,0,0.2);border-radius:6px;padding:7px 10px;">
                                <div style="display:flex;align-items:center;gap:8px;">
                                    <span style="font-size:9px;font-weight:900;color:var(--text-dim);text-transform:uppercase;white-space:nowrap;">Cap</span>
                                    <div style="flex:1;height:5px;background:rgba(255,255,255,0.1);border-radius:10px;overflow:hidden;">
                                        <div id="resign-cap-bar-fill" style="height:100%;width:0%;border-radius:10px;transition:width 0.2s ease,background 0.2s ease;"></div>
                                    </div>
                                </div>
                                <div style="display:flex;justify-content:space-between;margin-top:5px;">
                                    <div>
                                        <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;">Used</div>
                                        <div style="font-size:11px;font-weight:900;" id="resign-cap-used">—</div>
                                    </div>
                                    <div style="text-align:right;">
                                        <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;">Remaining</div>
                                        <div style="font-size:11px;font-weight:900;" id="resign-cap-remaining">—</div>
                                    </div>
                                </div>
                            </div>
                        </div>

<button id="confirm-resign" style="width:100%; padding:14px; border-radius:10px; font-size:13px; font-weight:900; text-transform:uppercase; cursor:${window._resignOpen && !window._alreadyResigned ? 'pointer' : 'not-allowed'}; border:none; background:${window._resignOpen && !window._alreadyResigned ? '#22c55e' : 'rgba(255,255,255,0.08)'}; color:${window._resignOpen && !window._alreadyResigned ? '#000' : 'var(--text-dim)'}; opacity:${window._resignOpen && !window._alreadyResigned ? '1' : '0.4'}; pointer-events:${window._resignOpen && !window._alreadyResigned ? 'auto' : 'none'};">
    ${!window._resignOpen ? '🔒 Re-Signing Locked' : window._alreadyResigned ? '🔒 Already Resigned This Season' : 'Confirm Resign'}
</button>
                        <button style="width:100%;background:transparent;color:var(--text-dim);border:none;padding:8px;font-weight:700;font-size:11px;text-transform:uppercase;cursor:pointer;" onclick="$('.player-modal-close').click()">Cancel</button>
                    </div>
                `);

                function updateResign() {
                    const yrs = parseInt($('#resign-years').val());
                    const guar = parseInt($('#resign-guar').val());
                    const sal = calcSalary(yrs, guar);
                    $('#resign-yrs-lbl').text(yrs + ' yr' + (yrs !== 1 ? 's' : ''));
                    $('#resign-guar-lbl').text(guar + '%');
                    $('#resign-final-sal').text('$' + sal.toFixed(1) + 'm');
let capHitRows = '<div style="display:flex;gap:6px;padding:8px;overflow-x:auto;">';
                    for (let i = 0; i < yrs; i++) {
const yearLabel = parseInt(year) + i;
                        const remainingYears = yrs - i;                        const capHit = Math.round(sal * (guar / 100) * remainingYears * 10) / 10;
const isFirst = i === 0;
                        const guarYears = Math.round(yrs * (guar / 100));
                        const remainingGuarYears = Math.max(0, guarYears - i);
                        capHitRows += `<div style="flex:1;min-width:70px;background:${isFirst?'rgba(59,130,246,0.08)':'rgba(0,0,0,0.2)'};border:1px solid ${isFirst?'rgba(59,130,246,0.3)':'rgba(255,255,255,0.05)'};border-radius:6px;padding:7px;text-align:center;">
                            <div style="font-size:10px;font-weight:900;color:${isFirst?'var(--accent-blue)':'var(--text-dim)'};margin-bottom:5px;">${yearLabel}</div>
                            <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;">Salary</div>
                            <div style="font-size:11px;font-weight:900;color:#22c55e;margin-bottom:4px;">$${sal.toFixed(1)}m</div>
                            <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;">Cap Hit</div>
                            <div style="font-size:11px;font-weight:900;color:#ef4444;">$${capHit.toFixed(1)}m</div>
                            <div style="font-size:8px;color:var(--text-dim);margin-top:3px;">${remainingYears} yr${remainingYears!==1?'s':''} remaining</div>
                        </div>`;
                    }
                    capHitRows += '</div>';
                    $('#resign-cap-hit-table').html(capHitRows);
$('#resign-proposal-summary').text(yrs + ' yr' + (yrs !== 1 ? 's' : '') + ' · ' + guar + '% guar');
                    $('#resign-summary').text(`${yrs} yr${yrs !== 1 ? 's' : ''} / ${guar}% guaranteed → $${sal.toFixed(1)}m/yr`);
// Block if new salary is less than current salary and years remain
const currentSal = window.currentResignPlayerSal || 0;
const yearsLeft = parseInt(window.currentResignYearsLeft || 0);
const salTooLow = yearsLeft > 0 && sal < currentSal;
$('#confirm-resign').prop('disabled', salTooLow).css({
    'opacity': salTooLow ? '0.4' : '1',
    'pointer-events': salTooLow ? 'none' : 'auto',
    'background': salTooLow ? 'rgba(255,255,255,0.1)' : '',
    'color': salTooLow ? 'var(--text-dim)' : ''
});
if (salTooLow) {
    $('#resign-salary-warning').show().text(`⚠️ Cannot resign below current salary ($${currentSal.toFixed(1)}m/yr) while years remain`);
} else {
    $('#resign-salary-warning').hide();
}
    // Live cap bar update
const salaryCap = window.leagueSalaryCap || 823;
    const currentPlayerSal = window.currentResignPlayerSal || 0;
    const baseCap = window.currentTeamCapUsed || 0;
    const newCapUsed = parseFloat((baseCap - currentPlayerSal + sal).toFixed(1));
    const capRemaining = parseFloat((salaryCap - newCapUsed).toFixed(1));
    const capPct = Math.min(100, (newCapUsed / salaryCap) * 100).toFixed(1);
    const barColor = newCapUsed > salaryCap ? '#ef4444' : capPct > 90 ? '#f59e0b' : '#22c55e';
    $('#resign-cap-bar-fill').css({'width': capPct + '%', 'background': barColor});
$('#resign-cap-used').text('$' + newCapUsed.toFixed(1) + 'm').css('color', barColor);
    $('#resign-cap-remaining').text('$' + capRemaining.toFixed(1) + 'm').css('color', capRemaining < 0 ? '#ef4444' : 'var(--text-dim)');           }
                updateResign();
                $(document).off('input', '#resign-years, #resign-guar').on('input', '#resign-years, #resign-guar', updateResign);
                $(document).off('click', '#resign-floor-toggle').on('click', '#resign-floor-toggle', function() { $('#resign-floor-drawer').slideToggle(200); });
$(document).off('click', '#resign-show-yearly').on('click', '#resign-show-yearly', function() {
                    const isOpen = $('#resign-yearly-drawer').is(':visible');
                    $('#resign-yearly-drawer').slideToggle(200);
                    $(this).text(isOpen ? 'Show Yearly ▼' : 'Hide Yearly ▲');
                });
$(document).off('click', '#confirm-resign').on('click', '#confirm-resign', async function() {
    const currentSal = window.currentResignPlayerSal || 0;
    const yearsLeft = parseInt(window.currentResignYearsLeft || 0);
    const salM = parseFloat($('#resign-final-sal').text().replace(/[^0-9.]/g,'')) || 0;
    if (yearsLeft > 0 && salM < currentSal) {
        alert(`Cannot resign below current salary ($${currentSal.toFixed(1)}m/yr) while ${yearsLeft} year${yearsLeft !== 1 ? 's' : ''} remain on contract.`);
        return;
    }
if (window._resignOpen !== true) {
    return;
}
    const yrs = parseInt($('#resign-years').val());
    const guar = parseInt($('#resign-guar').val());
const salMVal = parseFloat($('#resign-final-sal').text().replace(/[^0-9.]/g, ''));
const sal = Math.round(salMVal * 1000000).toString();                    const btn = $(this);
                    btn.text('Submitting...').prop('disabled', true);
                    let resignSucceeded = false;
                    try {
const totalVal = Math.round(salM * yrs * 1000000);
const totalValM = (salMVal * yrs).toFixed(0);
const xml = `<salaries><leagueUnit unit="LEAGUE"><player id="${pid}" salary="${sal}" contractYear="${yrs}" contractInfo="${guar}%" contractStatus="$${totalValM}M" /></leagueUnit></salaries>`;
                        console.log('Resign XML:', xml);
                        // Routed through the commissioner proxy — MFL requires commissioner access
                        // for TYPE=salaries writes, so a regular owner's own session can't do this directly.
                        const resText = await commishWrite('salaries', xml, { append: true, franchiseId: '0000' });
                        console.log('Resign response:', resText);
// Log resign as salary adjustment so it shows in transactions
try {
const yrsVal = $('#resign-years').val();
                                const guarVal = $('#resign-guar').val();
                                const salVal = parseFloat($('#resign-final-sal').text().replace(/[^0-9.]/g, '')) || 0;
                                const playerNameVal = $('#modal-name').text().trim();
const playerPosVal = $('#modal-pos').text().trim();
                                const playerTeamVal = ($('#modal-team-logo').attr('src') || '').match(/([A-Za-z]{2,3})\.(?:svg|png)(?:\?.*)?$/i)?.[1]?.toUpperCase() || '';
                               const targetFid = (fid || myFid).padStart(4, '0');
                                const adjXml = `<salary_adjustments><salary_adjustment franchise_id="${targetFid}" amount="0" explanation="${playerNameVal} re-signed: $${salVal}m/yr - ${yrsVal}yrs - ${guarVal}%guar - pid:${pid} - team:${playerTeamVal} pos:${playerPosVal}" /></salary_adjustments>`;
                                const adjResText = await commishWrite('salaryAdj', adjXml, { franchiseId: '0000' });
                                console.log('Resign log response:', adjResText);
                            } catch(adjErr) { console.error('Resign log failed:', adjErr); }

if (!resText.toLowerCase().includes('error')) {
            resignSucceeded = true;

   $('#smart-player-modal').fadeOut(200);
                            $('body').css('overflow', '');
                            // Re-fetch contracts page so updated salary is reflected
                            const freshRes = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=${myFid}`, { credentials: 'include' });
                            currentDoc = new DOMParser().parseFromString(await freshRes.text(), 'text/html');
                            renderActiveTab();
                        } else {
                            throw new Error(resText || 'Server error');
                        }
} catch(err) {
        console.error('Resign error:', err);
        alert('Resign failed: ' + err.message);
        btn.text('Confirm').prop('disabled', false);
    }
                });

            } catch (err) {
                console.error("Resign Error:", err);
                btn.html(originalText).css({'opacity': '1', 'pointer-events': 'auto'});
                alert("Failed to load resign data.");
            }

        } else {
            alert(`Executive Action: ${type} for player ${pid}. Logic coming next!`);
            $('#smart-player-modal').fadeOut(200);
            $('body').css('overflow', '');
        }
    };
function goToStep(step) {
                if (step === 'mine') {
                    $('#my-roster-list').show();
                    $('#their-roster-list').hide();
                    $('#trade-tab-mine').css({ border: '2px solid rgba(59,130,246,0.6)', background: 'rgba(59,130,246,0.15)' });
                    $('#trade-tab-theirs').css({ border: '2px solid var(--card-border)', background: 'rgba(0,0,0,0.2)' });
                    $('#trade-next-btn').show();
                    $('#trade-back-btn').hide();
                    $('#trade-hub-submit').hide();
                } else {
                    $('#my-roster-list').hide();
                    $('#their-roster-list').show();
                    $('#trade-tab-mine').css({ border: '2px solid var(--card-border)', background: 'rgba(0,0,0,0.2)' });
                    $('#trade-tab-theirs').css({ border: '2px solid rgba(59,130,246,0.6)', background: 'rgba(59,130,246,0.15)' });
                    $('#trade-next-btn').hide();
                    $('#trade-back-btn').show();
                    $('#trade-hub-submit').show();
                }
            }

            $(document).off('click', '#trade-next-btn').on('click', '#trade-next-btn', function() {
                goToStep('theirs');
            });

            $(document).off('click', '#trade-back-btn').on('click', '#trade-back-btn', function() {
                goToStep('mine');
            });

            // Clicking the team headers still switches view
            $(document).off('click', '.trade-roster-tab').on('click', '.trade-roster-tab', function(e) {
                if ($(e.target).closest('.trade-add-btn').length) return;
                const tab = $(this).closest('.trade-roster-tab').data('tab');
                goToStep(tab);
            });
    // --- TRADE BLOCK EVENT LISTENERS ---
    $(document).off('click', '.trade-tag-btn').on('click', '.trade-tag-btn', function() {
        $(this).toggleClass('selected');
    });
$(document).off('click', '.draft-pick-chip').on('click', '.draft-pick-chip', async function(e) {
        e.stopPropagation();
const label = $(this).data('label');
        const pickYear = String($(this).data('year'));
        const round = String($(this).data('round'));
        const pickStr = String($(this).data('pickstr') || '');
        const displayName = pickStr ? `${pickYear} Pick ${pickStr}` : `${pickYear} Round ${round} Pick`;
        // Fetch real pick IDs from MFL trade bait page
        let pickOptions = [];
        try {
            const res = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=133`, { credentials: 'include' });
            const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
            doc.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                const val = cb.value;
                const label = cb.closest('tr')?.querySelector('td:last-child')?.textContent.trim() || val;
                if (val && (val.startsWith('DP_') || val.startsWith('FP_'))) {
                    pickOptions.push({ id: val, label: label });
                }
            });
        } catch(e) { console.warn('Could not fetch pick IDs', e); }

        $('#modal-img').attr('src', '').hide();
        $('#modal-team-logo').attr('src', '').hide();
        $('#modal-pos').text('PICK').removeClass().addClass('inline-pos-badge').css({'background':'rgba(245,158,11,0.2)', 'color':'#f59e0b', 'border':'1px solid rgba(245,158,11,0.4)'});
        $('#modal-name').html(displayName);
        $('#modal-inj').html('');
$('#modal-pid-text').text(`Draft Pick · ${pickYear}`);        $('#modal-dynamic-header').css({
            'background': 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(0,0,0,0.3))',
            'border-bottom': '1px solid rgba(245,158,11,0.3)'
        });

        $('.modal-tab-btn').removeClass('active');
        $('.modal-tab-content').removeClass('active');
        $('#tab-btn-tx').addClass('active');
        $('#tab-btn-lineup').hide();
        $('#tab-tx').addClass('active');

        // Find the best matching pick ID from the fetched list
const matchingPick = pickOptions.find(p => {
            const lbl = p.label.toLowerCase();
            if (pickStr && lbl.includes(pickStr.toLowerCase())) return true;
            if (lbl.includes(`year ${pickYear}`) && lbl.includes(`round ${round}`)) return true;
            if (lbl.includes(String(pickYear)) && lbl.includes(`round ${round}`)) return true;
            return false;
        });
        console.log('pickOptions:', pickOptions.map(p => p.id + ' | ' + p.label));
        console.log('looking for year:', pickYear, 'round:', round, 'pickStr:', pickStr);
        console.log('matchingPick:', matchingPick);
// Group picks by year like the contracts page
        const picksByYear = {};
        pickOptions.forEach(p => {
            const yearMatch = p.label.match(/Year (\d{4})/i);
            const yr = yearMatch ? yearMatch[1] : 'Other';
            if (!picksByYear[yr]) picksByYear[yr] = [];
            picksByYear[yr].push(p);
        });

        const picksSelectHtml = pickOptions.length ? `
            <div style="font-size:9px; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; font-weight:800;">Select Pick</div>
            <div style="max-height:200px; overflow-y:auto; margin-bottom:12px;">
                ${Object.keys(picksByYear).sort().map(yr => `
                    <div style="font-size:9px; font-weight:900; color:#f59e0b; text-transform:uppercase; letter-spacing:2px; border-bottom:1px dashed rgba(245,158,11,0.3); padding-bottom:4px; margin:8px 4px 6px;">${yr}</div>
                    <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:4px;">
                        ${picksByYear[yr].map(p => {
                            const roundMatch = p.label.match(/Round (\d+)/i);
                            const pickNumMatch = p.label.match(/Pick ([\d.]+)/i);
                            const chipLabel = pickNumMatch ? pickNumMatch[1] : (roundMatch ? `R${roundMatch[1]}` : p.id);
                            const isSelected = p.id === matchingPick?.id;
                            return `
                                <div class="trade-pick-select-btn" data-pickid="${p.id}" title="${p.label}"
                                    style="display:flex; flex-direction:column; align-items:center; gap:2px; 
                                    background:${isSelected ? 'rgba(245,158,11,0.2)' : 'rgba(0,0,0,0.25)'}; 
                                    border:1px solid ${isSelected ? 'rgba(245,158,11,0.7)' : 'rgba(245,158,11,0.2)'}; 
                                    border-radius:8px; padding:6px 10px; min-width:44px; cursor:pointer;">
                                    <span style="font-size:11px; font-weight:900; color:#f59e0b;">${chipLabel}</span>
                                </div>`;
                        }).join('')}
                    </div>
                `).join('')}
            </div>
        ` : '<div style="color:var(--text-dim); font-size:10px; margin-bottom:12px;">No picks found</div>';
const selectedId = matchingPick?.id || '';
        const hasAutoMatch = !!matchingPick;
        const isPickOnBlock = selectedId && tradeBlockPids.has(selectedId);

        $('#modal-actions-container').html(`
            <div class="trade-block-form" style="animation: fadeIn 0.3s ease;">
                <div style="font-size:13px; font-weight:900; color:#fff; text-transform:uppercase; margin-bottom:15px; text-align:center;">${displayName}</div>

               ${hasAutoMatch ? `
                    <div style="display:flex; align-items:center; gap:8px; padding:8px 12px; background:${isPickOnBlock ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)'}; border:1px solid ${isPickOnBlock ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}; border-radius:8px; margin-bottom:12px;">
                        <span style="font-size:11px; font-weight:900; color:${isPickOnBlock ? '#ef4444' : '#f59e0b'}">${isPickOnBlock ? '✕ On Trade Block' : '✓'} ${matchingPick.label}</span>
                    </div>
                ` : picksSelectHtml}

                <div style="font-size:9px; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; font-weight:800;">Target Positions</div>
                <div class="trade-tag-group">
                    <div class="trade-tag-btn" data-val="QB">QB</div>
                    <div class="trade-tag-btn" data-val="RB">RB</div>
                    <div class="trade-tag-btn" data-val="WR">WR</div>
                    <div class="trade-tag-btn" data-val="TE">TE</div>
                </div>

                <div style="font-size:9px; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; font-weight:800;">Target Picks</div>
                <div class="trade-tag-group">
                    <div class="trade-tag-btn" data-val="1st Rd">1st Rd</div>
                    <div class="trade-tag-btn" data-val="2nd Rd">2nd Rd</div>
                    <div class="trade-tag-btn" data-val="3rd Rd">3rd Rd</div>
                    <div class="trade-tag-btn" data-val="Future">Future</div>
                </div>

               <button class="trade-submit-btn" id="confirm-trade-block" data-pid="" data-giveup="${selectedId}" data-removing="${isPickOnBlock}">${isPickOnBlock ? 'Remove from Trade Block' : 'Add to Trade Block'}</button>
                <button style="width:100%; background:transparent; color:var(--text-dim); border:none; padding:12px; margin-top:10px; font-weight:700; font-size:12px; text-transform:uppercase; cursor:pointer;" onclick="$('.player-modal-close').click()">Cancel</button>
            </div>
        `);


        // Pick selection toggle
        $(document).off('click', '.trade-pick-select-btn').on('click', '.trade-pick-select-btn', function() {
            $('.trade-pick-select-btn').css({ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.2)' });
            $(this).css({ background: 'rgba(245,158,11,0.2)', borderColor: 'rgba(245,158,11,0.7)' });
            const newId = $(this).data('pickid');
            $('#confirm-trade-block').data('giveup', newId);
        });

        $('#smart-player-modal').css('display', 'flex').hide().fadeIn(200);
        $('body').css('overflow', 'hidden');
    });
$(document).off('click', '.trade-pick-tag-btn').on('click', '.trade-pick-tag-btn', function() {
        const isSelected = $(this).hasClass('selected');
        $(this).toggleClass('selected');
        $(this).css({
            background: isSelected ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.25)',
            borderColor: isSelected ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.7)',
            color: '#f59e0b'
        });
    });
$(document).off('click', '#confirm-trade-block').on('click', '#confirm-trade-block', async function() {
        const btn = $(this);
        const originalText = btn.text();
        btn.text('PROCESSING...').css({'opacity': '0.5', 'pointer-events': 'none'});

        const pid = btn.data('pid');
        let newGiveUp = btn.data('giveup') ? String(btn.data('giveup')) : '';

        // Add any selected pick tags
        const selectedPickIds = [];
        $('.trade-pick-tag-btn.selected').each(function() {
            selectedPickIds.push(String($(this).data('pickid')));
        });
        if (selectedPickIds.length) {
            newGiveUp = newGiveUp ? newGiveUp + ',' + selectedPickIds.join(',') : selectedPickIds.join(',');
        }

// Use local running list, seeded from MFL on first load
if (tradeBlockGiveUp.length === 0) {
            try {
                const tbRes = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=tradeBait&L=${lid}&JSON=1`, { credentials: 'include', cache: 'no-store' });
                const tbData = await tbRes.json();
                if (tbData?.tradeBaits?.tradeBait) {
                    let baits = tbData.tradeBaits.tradeBait;
                    if (!Array.isArray(baits)) baits = [baits];
const myBait = baits.find(b => (b.franchise_id || b.franchise) === myFid);
                    // Store ALL teams' trade blocks
                    if (!Array.isArray(baits)) baits = [baits];
                    baits.forEach(bait => {
                        const bFid = bait.franchise_id || bait.franchise;
                        (bait.willGiveUp || '').split(',').filter(Boolean).forEach(id => tradeBlockPids.add(String(id)));
                    });                    if (myBait) {
                        tradeBlockGiveUp = (myBait.willGiveUp || '').split(',').filter(Boolean);
                        tradeBlockGiveUp.forEach(id => tradeBlockPids.add(String(id)));
                    }
                }
            } catch(e) { console.warn('Could not fetch existing trade bait', e); }
        }

        let existingGiveUp = [...tradeBlockGiveUp];
        let existingExchange = '';

const isRemoving = btn.data('removing') === true || btn.data('removing') === 'true';
        const newItems = newGiveUp.split(',').filter(Boolean);
        if (isRemoving) {
            newItems.forEach(item => {
                existingGiveUp = existingGiveUp.filter(id => id !== item);
            });
        } else {
            newItems.forEach(item => {
                if (!existingGiveUp.includes(item)) existingGiveUp.push(item);
            });
        }
if (pid && String(pid).trim() !== '') {
            const pidStr = String(pid);
            if (!existingGiveUp.includes(pidStr)) existingGiveUp.push(pidStr);
        }

        // Don't submit if nothing new was added
        if (existingGiveUp.length === 0) {
            alert('Please select at least one asset to add to the trade block.');
            btn.text(originalText).css({'opacity': '1', 'pointer-events': 'auto'});
            return;
        }

        let giveUpString = existingGiveUp.join(',');
        let tags = [];
        $('.trade-tag-btn.selected').each(function() {
            tags.push($(this).data('val'));
        });
        
let customMsg = ($('#trade-block-msg').val() || '').trim();        let finalExchange = "";
        
        if (tags.length > 0) {
            finalExchange = "Needs: " + tags.join(', ');
            if (customMsg) finalExchange += " | " + customMsg;
        } else {
            finalExchange = customMsg;
        }
        
        finalExchange = finalExchange.substring(0, 256);

        try {
            const apiData = new URLSearchParams();
            apiData.append('TYPE', 'tradeBait');
            apiData.append('L', lid);
apiData.append('WILL_GIVE_UP', giveUpString);
            console.log('Submitting trade block - WILL_GIVE_UP:', giveUpString);            if (finalExchange !== "") apiData.append('IN_EXCHANGE_FOR', finalExchange);
            if (fid !== myFid) apiData.append('FRANCHISE_ID', fid);

            const res = await fetch(`https://www45.myfantasyleague.com/${year}/import`, { 
                method: 'POST', body: apiData, credentials: 'include', cache: 'no-store'
            });
            
            const responseText = await res.text();
            
            if (responseText.toLowerCase().includes('error')) {
                const errorMatch = responseText.match(/<error[^>]*>(.*?)<\/error>/i);
                alert("MFL Rejected the Trade Block Update:\n\n" + (errorMatch ? errorMatch[1] : "Unknown Error."));
                btn.text(originalText).css({'opacity': '1', 'pointer-events': 'auto'});
                return; 
            }
            
tradeBlockGiveUp = giveUpString.split(',').filter(Boolean);
            tradeBlockPids = new Set(tradeBlockGiveUp);
            const wasRemoving = btn.data('removing');
            alert(wasRemoving ? `Removed from Trade Block!` : `Added to Trade Block!`);
            $('#smart-player-modal').fadeOut(200);
            $('body').css('overflow', '');

        } catch (err) {
            console.error("Trade Block Error:", err);
            alert("Network error. Failed to communicate with MFL.");
            btn.text(originalText).css({'opacity': '1', 'pointer-events': 'auto'});
        }
    });

  

    // --- TRADE PROPOSAL EVENT LISTENERS ---
    $(document).off('click', '.trade-asset-select').on('click', '.trade-asset-select', function() {
        $(this).toggleClass('selected');
    });

    $(document).off('click', '#confirm-trade-proposal').on('click', '#confirm-trade-proposal', async function() {
        const btn = $(this);
        const originalText = btn.text();
        const giveUpArray = [];
        
        $('.trade-asset-select.selected').each(function() {
            giveUpArray.push($(this).data('pid'));
        });

        if (giveUpArray.length === 0) {
            alert("You must select at least one asset to offer in the trade.");
            return;
        }

        btn.text('SENDING PROPOSAL...').css({'opacity': '0.5', 'pointer-events': 'none'});

        const targetPid = btn.data('target-pid'); 
        const targetFid = btn.data('target-fid'); 
        const comments = $('#trade-comments').val().trim();

        try {
            const apiData = new URLSearchParams();
            apiData.append('TYPE', 'tradeProposal');
            apiData.append('L', lid);
            apiData.append('FRANCHISE_ID', myFid);     
            apiData.append('OFFEREDTO', targetFid);    
            apiData.append('WILL_RECEIVE', targetPid); 
            apiData.append('WILL_GIVE_UP', giveUpArray.join(',')); 
            if (comments) { apiData.append('COMMENTS', comments); }

const res = await fetch(`https://www45.myfantasyleague.com/${year}/import`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
});
            
            const responseText = await res.text();
            
            if (responseText.toLowerCase().includes('error')) {
                const errorMatch = responseText.match(/<error[^>]*>(.*?)<\/error>/i);
                alert("MFL Rejected the Trade Proposal:\n\n" + (errorMatch ? errorMatch[1] : "Unknown Error."));
                btn.text(originalText).css({'opacity': '1', 'pointer-events': 'auto'});
                return; 
            }
            
            $('#smart-player-modal').fadeOut(200);
            $('body').css('overflow', '');
            alert(`Trade proposal successfully sent!`);

        } catch (err) {
            console.error("Trade Proposal Error:", err);
            alert("Network error. Failed to communicate with MFL.");
            btn.text(originalText).css({'opacity': '1', 'pointer-events': 'auto'});
        }
    });
// --- POINTS ALLOWED DRILL-DOWN MODAL ---
    $('body').append(`
        <div id="pa-breakdown-modal" class="player-modal-backdrop" style="z-index: 100000; display: none;">
            <div class="settings-modal-box" style="max-width: 380px; background: var(--card-bg);">
                <button class="player-modal-close" id="close-pa-modal">✕</button>
                <div class="settings-header" style="background: linear-gradient(to bottom, rgba(59, 130, 246, 0.15), transparent); padding: 25px 20px 15px;">
                    <h2 id="pa-modal-title" style="margin: 0; color: #fff; font-size: 16px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; text-align: center;">Points Allowed</h2>
                </div>
                <div id="pa-modal-content" class="settings-content-area hide-scroll" style="max-height: 65vh; overflow-y: auto; padding: 15px; background: rgba(0,0,0,0.2);">
                </div>
            </div>
        </div>
    `);

    // --- TEAM SETTINGS MODAL LOGIC ---
$('body').append(`
<div id="team-settings-modal" class="player-modal-backdrop" style="display:none;">
    <div class="settings-modal-box">

        <!-- HEADER -->
        <div class="settings-header">
            <div style="position:absolute; top:8px; right:8px; display:flex; gap:6px; align-items:center;">
                ${(myFid === '0000') ? `
                    <button id="settings-commish-toggle" style="padding:4px 8px; background:rgba(245,158,11,0.1); color:#f59e0b; border:1px solid rgba(245,158,11,0.3); border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer;">👑 Commish</button>
                    <button id="settings-dev-tools" style="padding:4px 8px; background:rgba(59,130,246,0.1); color:var(--accent-blue); border:1px solid rgba(59,130,246,0.3); border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer;">🛠️ Dev</button>
                ` : ''}
                <a href="https://www45.myfantasyleague.com/${year}/logout?L=${lid}" style="padding:4px 10px; background:rgba(239,68,68,0.1); color:#ef4444; border:1px solid rgba(239,68,68,0.3); border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; text-decoration:none;">Sign Out</a>
            </div>

            <div style="position:relative; width:56px; height:56px; background:#222; border-radius:50%; border:2px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; box-shadow:0 4px 15px rgba(0,0,0,0.5);">
                <img id="settings-team-logo" src="" style="width:100%; height:100%; object-fit:contain; cursor:pointer;" onclick="$('#logo-url-editor').toggle();">
                <button id="edit-logo-btn" onclick="$('#logo-url-editor').toggle()" style="position:absolute; bottom:-2px; right:-2px; width:18px; height:18px; border-radius:50%; background:var(--accent-blue); border:none; cursor:pointer; font-size:9px; z-index:10;">✏️</button>
            </div>

            <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
                <h2 id="settings-team-name" data-team-style="${myFid}" style="margin:0; color:#fff; font-size:17px; font-weight:900;"></h2>
                <button id="edit-team-name-btn" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:3px 7px; cursor:pointer; font-size:11px; color:var(--text-dim);">✏️</button>
            </div>

            <div id="edit-team-name-form" style="display:none; flex-direction:column; gap:6px; margin-top:6px; width:100%;">
                <input id="edit-location" type="text" placeholder="Location" style="background:rgba(255,255,255,0.05); border:1px solid var(--card-border); border-radius:6px; padding:6px 10px; color:#fff; font-size:12px; font-weight:800; width:100%; box-sizing:border-box;">
                <input id="edit-teamname" type="text" placeholder="Team Name" style="background:rgba(255,255,255,0.05); border:1px solid var(--card-border); border-radius:6px; padding:6px 10px; color:#fff; font-size:12px; font-weight:800; width:100%; box-sizing:border-box;">
                <div style="display:flex; gap:6px;">
                    <button id="edit-team-name-save" style="flex:1; padding:6px; background:var(--accent-blue); color:#fff; border:none; border-radius:6px; font-size:10px; font-weight:900; cursor:pointer;">Save</button>
                    <button id="edit-team-name-cancel" style="flex:1; padding:6px; background:rgba(255,255,255,0.05); color:var(--text-dim); border:1px solid var(--card-border); border-radius:6px; font-size:10px; font-weight:900; cursor:pointer;">Cancel</button>
                </div>
            </div>

            <div id="logo-url-editor" style="display:none; width:100%; margin-top:8px; padding:12px; background:rgba(0,0,0,0.3); border-radius:8px; box-sizing:border-box;">
                <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px;">Update Team Logo</div>
                <input id="logo-url-input" type="text" placeholder="https://i.imgur.com/yourlogo.png" style="width:100%; background:rgba(255,255,255,0.05); border:1px solid var(--card-border); border-radius:6px; padding:7px 10px; color:#fff; font-size:11px; box-sizing:border-box; outline:none; margin-bottom:8px;">
                <div style="display:flex; gap:6px;">
                    <button id="logo-url-save" style="flex:1; padding:8px; background:var(--accent-blue); color:#fff; border:none; border-radius:6px; font-size:10px; font-weight:900; cursor:pointer; text-transform:uppercase;">Save</button>
                    <button onclick="$('#logo-url-editor').hide()" style="flex:1; padding:8px; background:rgba(255,255,255,0.05); color:var(--text-dim); border:1px solid var(--card-border); border-radius:6px; font-size:10px; font-weight:900; cursor:pointer; text-transform:uppercase;">Cancel</button>
                </div>
            </div>
        </div>

        <!-- TABS -->
        <div class="settings-tabs">
            <button class="settings-tab-btn active" data-target="tab-team-set">Team Settings</button>
            <button class="settings-tab-btn" data-target="tab-display">Display</button>
            <button class="settings-tab-btn" data-target="tab-style">Style</button>
            ${(myFid === '0000') ? `<button class="settings-tab-btn" data-target="tab-dev">Dev Tools</button>` : ''}
        </div>

        <!-- CONTENT -->
        <div class="settings-content-area">

            <!-- TEAM SETTINGS TAB -->
            <div id="tab-team-set" class="settings-tab-content">
                <div style="display:flex; flex-direction:column; gap:12px;">
                    <div style="display:flex; flex-direction:column; gap:4px;">
                        <label style="font-size:10px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">Owner Name(s)</label>
                        <input id="ts-owner-name" type="text" style="background:rgba(255,255,255,0.05); border:1px solid var(--card-border); border-radius:8px; padding:8px 12px; color:#fff; font-size:13px; font-weight:800; width:100%; box-sizing:border-box;">
                    </div>
                    <div style="display:flex; flex-direction:column; gap:4px;">
                        <label style="font-size:10px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">Email</label>
                        <input id="ts-email" type="text" style="background:rgba(255,255,255,0.05); border:1px solid var(--card-border); border-radius:8px; padding:8px 12px; color:#fff; font-size:13px; font-weight:800; width:100%; box-sizing:border-box;">
                    </div>
                    <div style="display:flex; flex-direction:column; gap:4px;">
                        <label style="font-size:10px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">Stadium</label>
                        <input id="ts-stadium" type="text" style="background:rgba(255,255,255,0.05); border:1px solid var(--card-border); border-radius:8px; padding:8px 12px; color:#fff; font-size:13px; font-weight:800; width:100%; box-sizing:border-box;">
                    </div>
                   <button id="ts-save-btn" style="width:100%; padding:12px; background:var(--accent-blue); color:#fff; border:none; border-radius:8px; font-size:12px; font-weight:900; text-transform:uppercase; cursor:pointer; letter-spacing:1px;">Save Changes</button>
<div id="ts-save-status" style="font-size:10px; font-weight:800; color:var(--accent-teal); text-align:center; min-height:16px;"></div>

${(myFid === '0000') ? `
<div style="margin-top:8px; padding-top:14px; border-top:1px solid var(--card-border); display:flex; flex-direction:column; gap:8px;">
    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px;">League Controls</div>

    <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px;">
        <div>
            <div style="font-size:12px; font-weight:900; color:#fff;">Player Re-Signing</div>
            <div id="resign-status-text" style="font-size:10px; color:var(--accent-teal); margin-top:2px;">Currently: Open</div>
        </div>
        <button id="toggle-resign-btn" style="padding:8px 16px; border-radius:8px; font-size:11px; font-weight:900; cursor:pointer; border:none; background:#22c55e; color:#000; text-transform:uppercase;">Open</button>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px;">
        <div>
            <div style="font-size:12px; font-weight:900; color:#fff;">Free Agency Mode</div>
            <div id="fa-mode-status-text" style="font-size:10px; color:var(--accent-teal); margin-top:2px;">Currently: Offseason</div>
        </div>
        <button id="toggle-fa-mode-btn" style="padding:8px 16px; border-radius:8px; font-size:11px; font-weight:900; cursor:pointer; border:none; background:#22c55e; color:#000; text-transform:uppercase;">Offseason</button>
    </div>
</div>` : ''}
                </div>
            </div>

            <!-- DISPLAY TAB -->
            <div id="tab-display" class="settings-tab-content" style="display:none;">

                <!-- Display sub-tabs -->
              <div style="display:flex; gap:6px; background:rgba(0,0,0,0.2); border-radius:8px; padding:4px; margin-bottom:14px;">
                    <button class="display-sub-tab active" data-sub="theme" style="flex:1; padding:6px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:none; background:var(--accent-blue); color:#fff;">Theme</button>
                    <button class="display-sub-tab" data-sub="logos" style="flex:1; padding:6px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:none; background:transparent; color:var(--text-dim);">Logos</button>
                    <button class="display-sub-tab" data-sub="textsize" style="flex:1; padding:6px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:none; background:transparent; color:var(--text-dim);">Text</button>
                    <button class="display-sub-tab" data-sub="background" style="flex:1; padding:6px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:none; background:transparent; color:var(--text-dim);">Background</button>
                </div>

                <!-- Theme sub-content -->
                <div class="display-sub-content" data-sub="theme">
                    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Theme</div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        ${['midnight','carbon','navy','charcoal','slate'].map(t => `
                            <button class="theme-option-btn" data-theme="${t}" style="display:flex; align-items:center; gap:12px; padding:10px 12px; border-radius:10px; border:1px solid var(--card-border); background:rgba(255,255,255,0.03); cursor:pointer; width:100%; text-align:left;">
                                <span style="font-size:12px; font-weight:900; color:#fff; text-transform:capitalize;">${t}</span>
                                <span class="theme-active-label" style="display:none; font-size:9px; font-weight:900; color:var(--accent-blue); margin-left:auto; text-transform:uppercase;">Active</span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Logos sub-content -->
                <div class="display-sub-content" data-sub="logos" style="display:none;">
                    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">NFL Team Logos</div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <div style="font-size:12px; font-weight:800; color:#fff;">Modern or Throwback</div>
                        <div style="display:flex; gap:6px;">
                            <button class="logo-style-btn" data-style="modern" style="padding:6px 12px; border-radius:6px; font-size:10px; font-weight:900; cursor:pointer; border:1px solid var(--accent-blue); background:var(--accent-blue); color:#fff;">Modern</button>
                            <button class="logo-style-btn" data-style="throwback" style="padding:6px 12px; border-radius:6px; font-size:10px; font-weight:900; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">Throwback</button>
                        </div>
                    </div>
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        <img id="logo-preview-ARI" style="width:32px; height:32px; object-fit:contain;">
                        <img id="logo-preview-DEN" style="width:32px; height:32px; object-fit:contain;">
                        <img id="logo-preview-GBP" style="width:32px; height:32px; object-fit:contain;">
                        <img id="logo-preview-TEN" style="width:32px; height:32px; object-fit:contain;">
                        <img id="logo-preview-PHI" style="width:32px; height:32px; object-fit:contain;">
                        <img id="logo-preview-NEP" style="width:32px; height:32px; object-fit:contain;">
                    </div>
                    <div id="display-save-status" style="font-size:10px; font-weight:800; color:var(--accent-teal); text-align:center; min-height:16px; margin-top:10px;"></div>
                </div>

               <!-- Text Size sub-content -->
                <div class="display-sub-content" data-sub="textsize" style="display:none;">
                    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Text Size</div>
                    <div style="display:flex; gap:8px;">
                        <button class="text-scale-btn" data-scale="1" style="flex:1; padding:14px 8px; border-radius:8px; font-size:11px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">Normal</button>
                        <button class="text-scale-btn" data-scale="1.15" style="flex:1; padding:14px 8px; border-radius:8px; font-size:13px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">Large</button>
                        <button class="text-scale-btn" data-scale="1.3" style="flex:1; padding:14px 8px; border-radius:8px; font-size:15px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">X-Large</button>
                    </div>
                    <div style="font-size:10px; color:var(--text-dim); margin-top:10px; line-height:1.5;">Scales everything on the page — text, buttons, and spacing.</div>
                </div>

                <!-- Background sub-content -->
                <div class="display-sub-content" data-sub="background" style="display:none;">
                    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Page Background</div>
                    <button class="bg-style-btn" data-style="solid" style="padding:6px 12px; border-radius:6px; font-size:10px; font-weight:900; cursor:pointer; border:1px solid var(--accent-blue); background:var(--accent-blue); color:#fff; margin-bottom:14px;">Solid Color</button>
                    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Dark</div>
                    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px;">
                        ${['bgblack2.jpg','bgblack3.png','bgblack4.png','bgblack5.jpg','blackbg1.png'].map(f => {
                            const url = `https://github.com/zewolff1/llddynasty/blob/main/bgimages/black/${f}?raw=true`;
                            const isActive = localStorage.getItem('lld_bg_url') === url;
                            return `<div class="bg-thumb-btn" data-url="${url}" style="width:64px; height:40px; border-radius:6px; overflow:hidden; cursor:pointer; border:2px solid ${isActive ? 'var(--accent-blue)' : 'transparent'}; flex-shrink:0;"><img src="${url}" style="width:100%; height:100%; object-fit:cover;"></div>`;
                        }).join('')}
                    </div>
                    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Color</div>
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        ${['colorblue1.png','colorbrown1.jpg','colorbrown2.jpg'].map(f => {
                            const url = `https://github.com/zewolff1/llddynasty/blob/main/bgimages/color/${f}?raw=true`;
                            const isActive = localStorage.getItem('lld_bg_url') === url;
                            return `<div class="bg-thumb-btn" data-url="${url}" style="width:64px; height:40px; border-radius:6px; overflow:hidden; cursor:pointer; border:2px solid ${isActive ? 'var(--accent-blue)' : 'transparent'}; flex-shrink:0;"><img src="${url}" style="width:100%; height:100%; object-fit:cover;"></div>`;
                        }).join('')}
                    </div>
                </div>
            </div>

            <!-- STYLE TAB -->
            <div id="tab-style" class="settings-tab-content" style="display:none;">
                <div style="display:flex; gap:6px; background:rgba(0,0,0,0.2); border-radius:8px; padding:4px; margin-bottom:14px;">
                    <button class="style-sub-tab active" data-sub="color" style="flex:1; padding:6px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:none; background:var(--accent-blue); color:#fff;">Color</button>
                    <button class="style-sub-tab" data-sub="font" style="flex:1; padding:6px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:none; background:transparent; color:var(--text-dim);">Font</button>
                    <button class="style-sub-tab" data-sub="effects" style="flex:1; padding:6px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:none; background:transparent; color:var(--text-dim);">Effects</button>
                </div>

                <div class="style-sub-content" data-sub="color">
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        <div style="display:flex; flex-direction:column; gap:4px;">
                            <label style="font-size:10px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">Primary Color</label>
                            <div style="display:flex; gap:8px; align-items:center;">
                                <input id="style-primary-color" type="color" value="#3b82f6" style="width:44px; height:36px; border:1px solid var(--card-border); border-radius:6px; background:transparent; cursor:pointer; padding:2px;">
                                <span id="style-primary-hex" style="font-size:12px; font-weight:800; color:#fff;">#3b82f6</span>
                            </div>
                        </div>
                        <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 10px; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:6px;">
                            <label style="font-size:10px; font-weight:900; color:#fff;">Gradient</label>
                            <input type="checkbox" id="style-gradient-toggle" style="width:16px; height:16px; cursor:pointer;">
                        </div>
                        <div id="style-gradient-controls" style="display:none; flex-direction:column; gap:8px;">
                            <div style="display:flex; gap:8px; align-items:center;">
                                <span style="font-size:10px; color:var(--text-dim); min-width:50px;">Color 2</span>
                                <input id="style-gradient-color2" type="color" value="#a855f7" style="width:36px; height:28px; border:1px solid var(--card-border); border-radius:6px; background:transparent; cursor:pointer; padding:2px;">
                                <span id="style-gradient-hex2" style="font-size:11px; font-weight:800; color:#fff;">#a855f7</span>
                            </div>
                            <div style="display:flex; gap:6px;">
                                <button class="gradient-dir-btn active" data-dir="to right" style="flex:1; padding:5px; border-radius:6px; font-size:9px; font-weight:900; cursor:pointer; border:1px solid var(--accent-blue); background:var(--accent-blue); color:#fff;">→</button>
                                <button class="gradient-dir-btn" data-dir="to bottom right" style="flex:1; padding:5px; border-radius:6px; font-size:9px; font-weight:900; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">↘</button>
                                <button class="gradient-dir-btn" data-dir="to bottom" style="flex:1; padding:5px; border-radius:6px; font-size:9px; font-weight:900; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">↓</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="style-sub-content" data-sub="font" style="display:none;">
                    <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px;" id="font-category-tabs">
                        <button class="font-cat-btn active" data-cat="athletic" style="padding:4px 10px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--accent-blue); background:var(--accent-blue); color:#fff;">Athletic</button>
                        <button class="font-cat-btn" data-cat="serif" style="padding:4px 10px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">Serif</button>
                        <button class="font-cat-btn" data-cat="modern" style="padding:4px 10px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">Modern</button>
                        <button class="font-cat-btn" data-cat="display" style="padding:4px 10px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">Display</button>
                        <button class="font-cat-btn" data-cat="retro" style="padding:4px 10px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">Retro</button>
                    </div>
                    <div id="font-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:8px;"></div>
                </div>

                <div class="style-sub-content" data-sub="effects" style="display:none;">
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        <div>
                            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
                                <label style="font-size:10px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">Glow</label>
                                <span id="style-glow-lbl" style="font-size:10px; font-weight:900; color:#fff;">0px</span>
                            </div>
                            <input type="range" id="style-glow" min="0" max="30" step="1" value="0" style="width:100%;">
                        </div>
                        <div>
                            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
                                <label style="font-size:10px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">Outline</label>
                                <span id="style-outline-lbl" style="font-size:10px; font-weight:900; color:#fff;">0px</span>
                            </div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <input type="range" id="style-outline-width" min="0" max="4" step="0.5" value="0" style="flex:1;">
                                <input id="style-outline-color" type="color" value="#000000" style="width:32px; height:28px; border:1px solid var(--card-border); border-radius:6px; background:transparent; cursor:pointer; padding:2px;">
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display:flex; gap:8px; margin-top:14px; padding-top:10px; border-top:1px solid var(--card-border);">
                    <button id="style-reset-btn" style="flex:1; padding:8px; background:rgba(255,255,255,0.05); color:var(--text-dim); border:1px solid var(--card-border); border-radius:8px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer;">Reset</button>
                    <button id="style-save-btn" style="flex:2; padding:8px; background:var(--accent-blue); color:#fff; border:none; border-radius:8px; font-size:11px; font-weight:900; text-transform:uppercase; cursor:pointer;">Save Style</button>
                </div>
                <div id="style-save-status" style="font-size:10px; font-weight:800; color:var(--accent-teal); text-align:center; min-height:14px; margin-top:6px;"></div>
            </div>

            <!-- DEV TAB -->
            <div id="tab-dev" class="settings-tab-content" style="display:none;">
                <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Developer Tools</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                    <a href="https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=0000" target="_blank" class="dev-link-btn">Roster Mgmt</a>
                    <a href="https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=17" target="_blank" class="dev-link-btn">Draft Order</a>
                    <a href="https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=43" target="_blank" class="dev-link-btn">Auctions</a>
                    <a href="https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=05" target="_blank" class="dev-link-btn">Pending Trades</a>
                    <a href="https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=142" target="_blank" class="dev-link-btn">Salary Adj</a>
                    <a href="https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=44" target="_blank" class="dev-link-btn">Auction Results</a>
                </div>
            </div>

        </div>
    </div>
</div>
`);
// Load resign state on settings open
$(document).on('click touchend', '.open-settings-btn', function() {
    const resignOpen = localStorage.getItem(`resign_open_${lid}`) !== 'false';
    updateResignToggleUI(resignOpen);
    const faMode = localStorage.getItem(`fa_mode_${lid}`) !== 'false';
    updateFaModeToggleUI(faMode);
});
function updateFaModeToggleUI(isOffseason) {
    if (isOffseason) {
        $('#toggle-fa-mode-btn').text('Offseason').css({ background: '#22c55e', color: '#000' });
        $('#fa-mode-status-text').text('Currently: Offseason').css('color', '#22c55e');
    } else {
        $('#toggle-fa-mode-btn').text('In Season').css({ background: '#3b82f6', color: '#fff' });
        $('#fa-mode-status-text').text('Currently: In Season').css('color', '#3b82f6');
    }
}
function updateResignToggleUI(isOpen) {
    if (isOpen) {
        $('#toggle-resign-btn').text('Open').css({ background: '#22c55e', color: '#000' });
        $('#resign-status-text').text('Currently: Open').css('color', '#22c55e');
    } else {
        $('#toggle-resign-btn').text('Locked').css({ background: '#ef4444', color: '#fff' });
        $('#resign-status-text').text('Currently: Locked').css('color', '#ef4444');
    }
}



$(document).on('click', '#toggle-resign-btn', async function() {
    if (myFid !== '0000' && myFid !== '0001') return;
    const current = localStorage.getItem(`resign_open_${lid}`) !== 'false';
    const newState = !current;
    
    // Save to MFL message slot 8 so all users see the same state
    try {
        const params = new URLSearchParams();
        params.set('LEAGUE_ID', lid);
        params.set('NAME', 'message8');
        params.set('MSG', `<!--RESIGNSTATE:${newState}-->`);
        params.set('LABEL', '');
        params.set('IN_HEADER', 'Yes');
        params.set('IN_FOOTER', 'Yes');
        await fetch(`https://www45.myfantasyleague.com/${year}/message`, {
            method: 'POST', credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });
    } catch(e) { console.warn('Could not save resign state', e); }
    localStorage.setItem(`resign_open_${lid}`, newState);
    updateResignToggleUI(newState);
    applyResignState(newState);
});


const THEMES = {
midnight: {
        label: 'Midnight',
        preview: ['#1e293b', '#3b82f6', '#00ceb8'],
        vars: {
            '--page-bg': '#0f172a',
            '--card-bg': '#1e293b',
            '--card-border': '#334155',
            '--card-hover': '#2d3748',
            '--accent-blue': '#3b82f6',
            '--accent-teal': '#00ceb8',
            '--text-main': '#f8fafc',
            '--text-dim': '#94a3b8',
        }
    },
carbon: {
        label: 'Carbon',
        preview: ['#1a1a1a', '#9ca3af', '#6b7280'],
        vars: {
            '--page-bg': '#111111',
            '--card-bg': '#1a1a1a',
            '--card-border': '#2a2a2a',
            '--card-hover': '#222222',
            '--accent-blue': '#9ca3af',
            '--accent-teal': '#6b7280',
            '--text-main': '#f9fafb',
            '--text-dim': '#9ca3af',
        }
    },
    navy: {
        label: 'Navy',
        preview: ['#0a0f1e', '#f59e0b', '#fbbf24'],
        vars: {
            '--page-bg': '#060912',
            '--card-bg': '#0a0f1e',
            '--card-border': '#151d35',
            '--card-hover': '#0e1428',
            '--accent-blue': '#f59e0b',
            '--accent-teal': '#fbbf24',
            '--text-main': '#f8fafc',
            '--text-dim': '#94a3b8',
        }
    },
    charcoal: {
        label: 'Charcoal',
        preview: ['#1c1c1e', '#60a5fa', '#93c5fd'],
        vars: {
            '--page-bg': '#111113',
            '--card-bg': '#1c1c1e',
            '--card-border': '#2c2c2e',
            '--card-hover': '#242426',
            '--accent-blue': '#60a5fa',
            '--accent-teal': '#93c5fd',
            '--text-main': '#f5f5f7',
            '--text-dim': '#98989f',
        }
    },
    slate: {
        label: 'Slate',
        preview: ['#0f172a', '#64748b', '#94a3b8'],
        vars: {
            '--page-bg': '#080d18',
            '--card-bg': '#0f172a',
            '--card-border': '#1e293b',
            '--card-hover': '#162032',
            '--accent-blue': '#64748b',
            '--accent-teal': '#94a3b8',
            '--text-main': '#f8fafc',
            '--text-dim': '#64748b',
        }
    }
};

function applyTheme(themeId) {
    const theme = THEMES[themeId];
    if (!theme) return;
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, val]) => {
        root.style.setProperty(key, val);
    });
    localStorage.setItem('lld_theme', themeId);
    $('.theme-option-btn').css({ borderColor: 'var(--card-border)', background: 'rgba(255,255,255,0.03)' });
    $('.theme-active-label').hide();
    $(`.theme-option-btn[data-theme="${themeId}"]`).css({ borderColor: 'var(--accent-blue)', background: 'rgba(59,130,246,0.08)' });
    $(`.theme-option-btn[data-theme="${themeId}"] .theme-active-label`).show();
}

function loadSavedTheme() {
    const saved = localStorage.getItem('lld_theme') || 'midnight';
    applyTheme(saved);
}

function loadSavedBgStyle() {
    const savedUrl = localStorage.getItem('lld_bg_url');
    if (savedUrl) {
        document.documentElement.style.setProperty('--page-bg-image', `url(${savedUrl})`);
    }
}
loadSavedBgStyle();

function applyTextScale(scale) {
    if (!window._baseViewportWidth) {
        window._baseViewportWidth = window.innerWidth;
    }
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
        const desiredContent = scale === 1
            ? 'width=device-width, initial-scale=1'
            : `width=${(window._baseViewportWidth / scale).toFixed(2)}, initial-scale=1`;

        // iOS Safari often ignores a runtime viewport change unless it's reset to
        // the default first and re-applied after a layout flush + frame tick.
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1');
        void document.body.offsetHeight; // force reflow
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                metaViewport.setAttribute('content', desiredContent);
            });
        });
    }
    document.documentElement.style.zoom = scale;
    localStorage.setItem('lld_text_scale', scale);
    $('.text-scale-btn').css({ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', borderColor: 'var(--card-border)' });
    $(`.text-scale-btn[data-scale="${scale}"]`).css({ background: 'var(--accent-blue)', color: '#fff', borderColor: 'var(--accent-blue)' });
}
function loadSavedTextScale() {
    window._baseViewportWidth = window.innerWidth;
    const saved = parseFloat(localStorage.getItem('lld_text_scale')) || 1;
    applyTextScale(saved);
}
loadSavedTextScale();





 

// Load current values into Team Settings tab when modal opens
$(document).on('click touchend', '.open-settings-btn', async function() {
    try {
        const r1 = await fetch(`https://www45.myfantasyleague.com/${year}/csetup?L=${lid}&C=FRANCHISE`, { credentials: 'include' });
        const doc1 = new DOMParser().parseFromString(await r1.text(), 'text/html');
const fullName = doc1.querySelector(`#FRANCHISE_NAME${myFid}`)?.value || '';
const savedLocation = localStorage.getItem(`franchise_location_${myFid}`) || '';
$('#ts-owner-name').val(doc1.querySelector(`#FRANCHISE_OWNER_NAME${myFid}`)?.value || '');
$('#ts-email').val(doc1.querySelector(`#FRANCHISE_EMAIL${myFid}`)?.value || '');
$('#edit-location').val(savedLocation);
$('#edit-teamname').val(savedLocation ? fullName.replace(savedLocation, '').trim() : fullName);

        const r2 = await fetch(`https://www45.myfantasyleague.com/${year}/csetup?L=${lid}&FRANCHISES=${myFid}&C=FCUSTOM`, { credentials: 'include' });
        const doc2 = new DOMParser().parseFromString(await r2.text(), 'text/html');
        const iconUrl = doc2.querySelector('#FRANCHISE_ICON' + myFid)?.value || '';
        const logoUrl = doc2.querySelector('#FRANCHISE_LOGO' + myFid)?.value || '';
        $('#ts-abbrev').val(doc2.querySelector('#FRANCHISE_ABBREV' + myFid)?.value || '');
        $('#ts-stadium').val(doc2.querySelector('#FRANCHISE_STADIUM' + myFid)?.value || '');
        $('#ts-icon-url').val(iconUrl);
        $('#ts-logo-url').val(logoUrl);
        $('#ts-icon-preview').attr('src', iconUrl);
        $('#ts-logo-preview').attr('src', logoUrl);
    } catch(e) { console.warn('Settings load failed', e); }
});

// Preview on URL change
$(document).on('input', '#ts-icon-url', function() { $('#ts-icon-preview').attr('src', $(this).val()); });
$(document).on('input', '#ts-logo-url', function() { $('#ts-logo-preview').attr('src', $(this).val()); });

// Save on blur — post to MFL
async function saveTeamSetting(fieldName, value, endpoint, extraParams) {
    const params = new URLSearchParams({ L: lid, C: endpoint, FRANCHISES: myFid, [fieldName]: value, ...extraParams });
    try {
        await fetch(`https://www45.myfantasyleague.com/${year}/csetup`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() });
        $('#ts-save-status').text('✓ Saved').css('color', 'var(--accent-blue)');
        setTimeout(() => $('#ts-save-status').text(''), 2000);
    } catch(e) {
        $('#ts-save-status').text('✗ Save failed').css('color', '#ef4444');
    }
}

$(document).on('click', '#ts-save-btn', async function() {
    $(this).text('Saving...').prop('disabled', true);
    try {
        // Step 1: Fetch the page to get input_expires and all current field values
        const pageRes = await fetch(`https://www45.myfantasyleague.com/${year}/csetup?L=${lid}&FRANCHISES=${Object.keys(leagueFranchises).join(',')}&C=FRANCHISE`, { credentials: 'include' });
        const pageDoc = new DOMParser().parseFromString(await pageRes.text(), 'text/html');
        const inputExpires = pageDoc.querySelector('input[name="input_expires"]')?.value || '';

        // Step 2: Build params with ALL franchise fields from the page, overriding just yours
        const params = new URLSearchParams();
        params.set('form_name', 'franchise');
params.set('L', lid);
        params.set('LEAGUE_ID', lid);        params.set('C', 'FRANCHISE');
        params.set('input_expires', inputExpires);
        params.set('FRANCHISES', Object.keys(leagueFranchises).join(','));

        // Copy all existing values from the fetched page
        Object.keys(leagueFranchises).forEach(fid2 => {
            params.set(`FRANCHISE_NAME${fid2}`, pageDoc.querySelector(`#FRANCHISE_NAME${fid2}`)?.value || '');
            params.set(`FRANCHISE_OWNER_NAME${fid2}`, pageDoc.querySelector(`#FRANCHISE_OWNER_NAME${fid2}`)?.value || '');
            params.set(`FRANCHISE_EMAIL${fid2}`, pageDoc.querySelector(`#FRANCHISE_EMAIL${fid2}`)?.value || '');
        });

        // Override just your franchise with the new values
const location = $('#edit-location').val().trim() || localStorage.getItem(`franchise_location_${myFid}`) || '';
        const teamName = $('#edit-teamname').val().trim() || $('#settings-team-name').text().replace(location, '').trim();
        const fullName = location ? `${location} ${teamName}` : teamName;
        localStorage.setItem(`franchise_location_${myFid}`, location);

        params.set(`FRANCHISE_NAME${myFid}`, fullName);
        params.set(`FRANCHISE_OWNER_NAME${myFid}`, $('#ts-owner-name').val().trim());
        params.set(`FRANCHISE_EMAIL${myFid}`, $('#ts-email').val().trim());
        params.set('SUBMIT', 'Save Franchise Information');

        // Step 3: POST
        const saveRes = await fetch(`https://www45.myfantasyleague.com/${year}/csetup`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });

        if (saveRes.ok) {
            $('#ts-save-status').text('✓ Saved successfully').css('color', 'var(--accent-blue)');
            // Update the switcher header with new name
            leagueFranchises[myFid] = fullName;
            $('#switcher-team-name').text(fullName);
            setTimeout(() => $('#ts-save-status').text(''), 3000);
        } else {
            throw new Error('Save failed');
        }
    } catch(e) {
        console.error('Save error:', e);
        $('#ts-save-status').text('✗ Save failed').css('color', '#ef4444');
    }
    $('#ts-save-btn').text('Save Changes').prop('disabled', false);
});
async function loadPlayersData(subTabId, containerId) {
    const container = $(containerId || '#players-content-container');
    const isFAView = (subTabId === 'free-agents');
    const cacheKey = `${subTabId}_${playerPosFilter}`;

    // If we have cached rows, skip fetch and just re-render
    if (window._playerRowsCache?.[cacheKey]) {
        container.html(getPlayerFilterBarHtml(isFAView));
        renderPlayersFromRows(window._playerRowsCache[cacheKey], isFAView, container, subTabId);
        return;
    }

    // Show loader while fetching
    container.html(getPlayerFilterBarHtml(isFAView) + '<div id="players-loader" style="text-align:center; padding: 40px; color: var(--accent-blue); font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; animation: pulse-blue 1.5s infinite;">Processing Rankings...</div>');

    try {
        const posParam = encodeURIComponent(playerPosFilter);
        let fetchUrl = isFAView 
            ? `https://www45.myfantasyleague.com/${year}/reports?L=${lid}&R=FULLFA&PROJSRC=mfl&SORT=${playerSortBy}&POS=${posParam}&TEAM=*&COUNT=500` 
            : `https://www45.myfantasyleague.com/${year}/reports?L=${lid}&R=SALARIES&POS=${posParam}&ROOKIES=0&INJURED=0&PAGE=ALL`;
        const res = await fetch(fetchUrl, { credentials: 'include', cache: 'no-store' });
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const rows = Array.from(doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow'));

        // Populate rookiePids
        doc.querySelectorAll('td.player').forEach(td => {
            if (td.textContent.includes('(R)')) {
                const pid = td.querySelector('a')?.getAttribute('href').match(/\d+/g)?.pop();
                if (pid) rookiePids.add(pid);
            }
        });

        // Cache raw rows
        window._playerRowsCache = window._playerRowsCache || {};
        window._playerRowsCache[cacheKey] = rows;

        container.html(getPlayerFilterBarHtml(isFAView));
        renderPlayersFromRows(rows, isFAView, container, subTabId);

    } catch (err) {
        console.error("Players Fetch Error:", err);
        $('#players-loader').html('<div style="text-align:center; color:#ef4444; margin-top:20px; font-weight: 800;">Sync Error. Try Refreshing.</div>');
    }
}

async function renderPlayersFromRows(rows, isFAView, container, subTabId) {
    if (isFAView) {
        await fetchPendingWaivers();
    }
    let players = rows.map(row => {
        const pLink = row.querySelector('td.player a');
        if (!pLink) return null;

        const playerTd = row.querySelector('td.player');
        if (offseasonMode && playerTd && playerTd.textContent.includes('(R)')) return null;

        const pidMatch = pLink.getAttribute('href').match(/\d+/g);
        const pid = pidMatch ? pidMatch.pop() : "0000";
        const { name, shortName, pos, realPos, team } = parseMFLName(pLink.textContent);
        const tds = row.querySelectorAll('td');

        let addVal = 0, ownVal = 0, projVal = 0, statusText = "Free Agent", ownerFid = null;
        let salary = '', years = '', guar = '';
        let salNum = 0, yrsNum = 0, guarNum = 0, capHitNum = 0;

        if (isFAView) {
            addVal = parseFloat(tds[4]?.textContent) || 0;
            ownVal = parseFloat(tds[5]?.textContent) || 0;
            projVal = parseFloat(tds[6]?.textContent) || 0;
        } else {
            const rosterText = tds[2]?.textContent.trim() || "";
            if (rosterText !== "" && rosterText !== "---") {
                const cleanName = rosterText.split(' - ')[0].trim();
                ownerFid = Object.keys(leagueFranchises).find(key => leagueFranchises[key].trim() === cleanName.trim());
                statusText = `On ${cleanName}`;
            }
            salary = tds[4]?.textContent.trim() || '';
            years = tds[5]?.textContent.trim() || '';
            guar = tds[7]?.textContent.trim() || '';
            salNum = parseFloat(salary.replace(/[^0-9.]/g,'')) || 0;
            yrsNum = parseInt(years) || 0;
            guarNum = parseFloat(guar.replace(/[^0-9.]/g,'')) || 0;
            capHitNum = salNum * (guarNum/100) * yrsNum;
        }

        return { pid, name, shortName, pos, realPos, team, addVal, ownVal, projVal,
            statusText, ownerFid, salary, years, guar, salNum, yrsNum, guarNum, capHitNum };
    }).filter(p => p !== null);

    // Sort
    players.sort((a, b) => {
        let comparison = 0;
        if (playerSortBy === 'proj') comparison = b.projVal - a.projVal;
        else if (playerSortBy === 'add') comparison = b.addVal - a.addVal;
        else if (playerSortBy === 'salary') comparison = b.salNum - a.salNum;
        else if (playerSortBy === 'caphit') comparison = b.capHitNum - a.capHitNum;
        else if (playerSortBy === 'guar') comparison = b.guarNum - a.guarNum;
        else if (playerSortBy === 'years') comparison = b.yrsNum - a.yrsNum;
        else comparison = b.ownVal - a.ownVal;
        return playerSortDir === 'asc' ? -comparison : comparison;
    });

    // Filter
    if (playerFiltersActive && !isFAView) {
        players = players.filter(p => {
            if (p.yrsNum < playerFilters.years[0] || p.yrsNum > playerFilters.years[1]) return false;
            if (p.salNum < playerFilters.salary[0] || p.salNum > playerFilters.salary[1]) return false;
            if (p.guarNum < playerFilters.guar[0] || p.guarNum > playerFilters.guar[1]) return false;
            if (p.capHitNum < playerFilters.capHit[0] || p.capHitNum > playerFilters.capHit[1]) return false;
            return true;
        });
    }
// --- OFFSEASON: Active Auctions Section ---
let auctionHtml = '';
if (isFAView && offseasonMode) {
    try {
const aRes = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=43`, { credentials: 'include', cache: 'no-store' });        const aDoc = new DOMParser().parseFromString(await aRes.text(), 'text/html');
               const auctionRows = Array.from(aDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow'));
        const aCardsData = [];
        let myWinningTotal = 0;
        let myWinningCount = 0;


console.log('checkCompletedAuctions running, rows found:', rows.length);
rows.forEach((row, i) => {
    const pLink = row.querySelector('a[class*="position_"]');
    console.log(`Row ${i}: pLink=${!!pLink}, html=${row.innerHTML.substring(0, 100)}`);
});

        auctionRows.forEach(row => {
            const pLink = row.querySelector('td a[class*="position_"]');
            if (!pLink) return;
            const pidMatch = pLink.getAttribute('href').match(/\d+/g);
            const pid = pidMatch ? pidMatch.pop() : null;
            if (!pid) return;

            const { name, pos } = parseMFLName(pLink.textContent);

            const bid = row.querySelector('td.salary')?.textContent.trim() || '$1m';
            const bidderFid = row.querySelector('a[class*="franchise_"]')?.getAttribute('class')?.match(/franchise_(\d+)/)?.[1]?.padStart(4,'0') || '';
            const isWinning = bidderFid === myFid;
            const timeLeft = row.querySelector('td span')?.textContent.trim() || '';
const nextRow = row.nextElementSibling;
const commentText = nextRow?.querySelector('i')?.textContent.trim() || '';
const contractMatch = commentText.match(/([\d.]+)m\/yr · (\d+)yrs · (\d+)%guar/);
const displayBid = contractMatch ? `$${contractMatch[1]}m/yr` : bid;
const contractLine = contractMatch ? `${contractMatch[2]} yrs · ${contractMatch[3]}% guar` : '';
            const isUrgent = row.querySelector('td span')?.classList.contains('warning') || false;
            const urgency = isUrgent ? '#ef4444' : 'var(--text-dim)';
              const minBid = (parseInt(bid.replace(/[^0-9]/g,'')) + 1) * 1000000;

            if (isWinning) {
                myWinningCount++;
                myWinningTotal += contractMatch ? parseFloat(contractMatch[1]) : (parseFloat(bid.replace(/[^0-9.]/g,'')) || 0);
            }

            const hrMatch = timeLeft.match(/(\d+)\s*hour/i);
            const minMatch = timeLeft.match(/(\d+)\s*min/i);
            const timeMins = (hrMatch || minMatch) ? ((parseInt(hrMatch?.[1]) || 0) * 60 + (parseInt(minMatch?.[1]) || 0)) : 999999;
            const bidNum = parseFloat(bid.replace(/[^0-9.]/g, '')) || 0;

            aCardsData.push({ pid, pos, name, displayBid, contractLine, timeLeft, urgency, minBid, isWinning, timeMins, bidNum });
        });

        function buildAuctionCard(item) {
            return `
                <div style="flex:0 0 150px; background:rgba(0,0,0,0.3); border:1px solid ${item.isWinning ? 'rgba(34,197,94,0.4)' : 'var(--card-border)'}; border-radius:12px; overflow:hidden; display:flex; flex-direction:column; scroll-snap-align:start;">
                    <div style="position:relative; height:80px; background:linear-gradient(to bottom,rgba(59,130,246,0.15),rgba(0,0,0,0.4));">
                        <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${item.pid}.png" onerror="this.style.display='none'" style="width:60px; height:80px; object-fit:cover; object-position:top; display:block; margin:0 auto;">
                        <span class="pos-text-${item.pos.toLowerCase()}" style="position:absolute; bottom:4px; left:4px; font-size:8px; font-weight:900;">${item.pos}</span>
                        ${item.isWinning ? '<span style="position:absolute;top:4px;left:4px;background:rgba(34,197,94,0.2);border:1px solid rgba(34,197,94,0.4);border-radius:4px;padding:2px 5px;font-size:8px;font-weight:900;color:#22c55e;">WINNING</span>' : ''}
                    </div>
                    <div style="padding:8px; flex:1; display:flex; flex-direction:column; gap:5px;">
                        <div style="font-size:11px; font-weight:900; color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.name}</div>
                        <div style="font-size:11px; font-weight:900; color:#22c55e;">${item.displayBid}</div>
${item.contractLine ? `<div style="font-size:9px; color:var(--text-dim);">${item.contractLine}</div>` : ''}
                        <div style="font-size:9px; color:${item.urgency};">⏱ ${item.timeLeft}</div>
                        <button class="fa-bid-btn" data-pid="${item.pid}" data-name="${item.name}" data-minbid="${item.minBid}" style="width:100%; padding:6px 0; background:var(--accent-blue); color:#fff; border:none; border-radius:8px; font-size:10px; font-weight:900; cursor:pointer; text-transform:uppercase; margin-top:auto;">Bid</button>
                    </div>
                </div>`;
        }

        function getSortedFilteredAuctionItems() {
            let items = window._auctionItems || [];
            if (auctionPosFilter !== 'ALL') items = items.filter(i => i.pos === auctionPosFilter);
            items = [...items].sort((a, b) => {
                let cmp = auctionSortBy === 'bid' ? (b.bidNum - a.bidNum) : (a.timeMins - b.timeMins);
                return auctionSortDir === 'asc' ? cmp : -cmp;
            });
            return items;
        }

        function auctionSortBtnHtml(id, label) {
            const isActive = auctionSortBy === id;
            const arrow = isActive ? (auctionSortDir === 'asc' ? ' ↑' : ' ↓') : '';
            return `<button class="auction-sort-btn" data-sort="${id}" style="padding:4px 10px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid ${isActive ? 'var(--accent-blue)' : 'var(--card-border)'}; background:${isActive ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)'}; color:${isActive ? '#fff' : 'var(--text-dim)'}; flex-shrink:0;">${label}${arrow}</button>`;
        }
        function auctionPosBtnHtml(id, label) {
            const isActive = auctionPosFilter === id;
            return `<button class="auction-pos-filter-btn" data-pos="${id}" style="padding:4px 10px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid ${isActive ? 'var(--accent-blue)' : 'var(--card-border)'}; background:${isActive ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)'}; color:${isActive ? '#fff' : 'var(--text-dim)'}; flex-shrink:0;">${label}</button>`;
        }
        function auctionControlsBarHtml() {
            const positions = window._auctionPositions || [];
            return `
                <span style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; align-self:center; flex-shrink:0;">Sort:</span>
                ${auctionSortBtnHtml('time', 'Time Left')}
                ${auctionSortBtnHtml('bid', 'Highest Bid')}
                <span style="width:1px; height:16px; background:var(--card-border); flex-shrink:0; margin:0 2px;"></span>
                ${auctionPosBtnHtml('ALL', 'All')}
                ${positions.map(p => auctionPosBtnHtml(p, p)).join('')}
            `;
        }

        window._auctionPositions = [...new Set(aCardsData.map(i => i.pos))];
        window._auctionItems = aCardsData;
        window.buildAuctionCard = buildAuctionCard;
        window.getSortedFilteredAuctionItems = getSortedFilteredAuctionItems;
        window.auctionControlsBarHtml = auctionControlsBarHtml;


let myRosterCapUsed = 0;
        let myPosCounts = { QB: 0, RB: 0, WR: 0, TE: 0, DL: 0, LB: 0, DB: 0 };
        let myRosterTotal = 0;
        try {
            const rosRes2 = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=${myFid}`, { credentials: 'include', cache: 'no-store' });
            const rosDoc2 = new DOMParser().parseFromString(await rosRes2.text(), 'text/html');
            rosDoc2.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(r => {
                myRosterCapUsed += parseFloat(r.querySelector('td.salary')?.textContent.replace(/[^0-9.]/g, '')) || 0;
                const pLink2 = r.querySelector('td.player a[class*="position_"]');
                if (!pLink2) return;
                const rPid = pLink2.getAttribute('href').match(/\d+/g)?.pop();
                if (!rPid) return;
                if (irPids.has(rPid) || taxiPids.has(rPid)) return;
                let dPos = parseMFLName(pLink2.textContent).pos;
                if (myPosCounts[dPos] !== undefined) myPosCounts[dPos]++;
                myRosterTotal++;
            });
        } catch(capErr) { console.warn('Could not fetch roster cap for FA cap bar', capErr); }

        const faSalaryCap = window.leagueSalaryCap || 823;
        const faProjectedUsed = parseFloat((myRosterCapUsed + myWinningTotal).toFixed(1));
        const faCapRemaining = parseFloat((faSalaryCap - faProjectedUsed).toFixed(1));
        const faRosterPct = Math.min(100, (myRosterCapUsed / faSalaryCap) * 100);
        const faCapPct = Math.min(100, (faProjectedUsed / faSalaryCap) * 100);
        const faBarColor = faProjectedUsed > faSalaryCap ? '#ef4444' : faCapPct > 90 ? '#f59e0b' : '#22c55e';

        const capBarHtml = `
            <div style="padding:10px 10px 0;">
                <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:10px; padding:12px;">
                    <div class="dashboard-header-row" style="margin-bottom:10px;">
                        <div class="dashboard-pill" style="border-bottom-color:#22c55e;">
                            <span class="pill-label">ON ROSTER</span>
                            <span class="pill-value">$${myRosterCapUsed.toFixed(1)}m</span>
                        </div>
                        <div class="dashboard-pill" style="border-bottom-color:#f59e0b;">
                            <span class="pill-label">WINNING${myWinningCount ? ` (${myWinningCount})` : ''}</span>
                            <span class="pill-value">${myWinningTotal > 0 ? '+$' + myWinningTotal.toFixed(1) + 'm' : '$0m'}</span>
                        </div>
                        <div class="dashboard-pill" style="border-bottom-color:${faCapRemaining < 0 ? '#ef4444' : '#3b82f6'};">
                            <span class="pill-label">REMAINING</span>
                            <span class="pill-value">$${faCapRemaining}m</span>
                        </div>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span style="font-size:10px; font-weight:800; color:var(--text-dim); text-transform:uppercase;">Projected Cap Usage</span>
                        <span style="font-size:10px; font-weight:800; color:${faBarColor};">${faCapPct.toFixed(1)}% of $${faSalaryCap}m</span>
                    </div>
<div style="position:relative; width:100%; height:8px; background:rgba(255,255,255,0.1); border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,0.05);">
                        <div style="position:absolute; left:0; top:0; width:${faRosterPct.toFixed(1)}%; height:100%; background:#22c55e;"></div>
                        <div style="position:absolute; left:${faRosterPct.toFixed(1)}%; top:0; width:${(faCapPct - faRosterPct).toFixed(1)}%; height:100%; background:#f59e0b;"></div>
                    </div>
                    ${(() => {
                        const posMins = [{l:'QB',min:1},{l:'RB',min:2},{l:'WR',min:2},{l:'TE',min:1},{l:'DL',min:1},{l:'LB',min:1},{l:'DB',min:1}];
                        const deficient = posMins.filter(p => (myPosCounts[p.l]||0) < p.min);
                        const rosterPills = `<div class="dashboard-pill stacked-pill" style="min-width:52px; border-bottom-color:#3b82f6;"><span class="pill-label">ROSTER</span><span class="pill-value">${myRosterTotal}/${LINEUP_RULES.rosterLimit}</span></div>`
                            + deficient.map(p => `<div class="dashboard-pill stacked-pill stat-${p.l.toLowerCase()} status-empty"><span class="pill-label">${p.l}</span><span class="pill-value">${myPosCounts[p.l]||0}/${p.min}</span></div>`).join('');
                        return `<div class="dashboard-row overflow-row" style="margin-top:10px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.05);">${rosterPills}</div>`;
                    })()}
                </div>
            </div>`;

        if (aCardsData.length > 0) {
            const visibleItems = getSortedFilteredAuctionItems();
            auctionHtml = `
                <div style="padding:10px 10px 0;">
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                        <div>
                            <div style="font-size:13px; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:1px;">Contract Negotiations</div>
                            <div id="auction-count-label" style="font-size:10px; color:var(--text-dim); margin-top:2px;">${visibleItems.length} of ${aCardsData.length} active · Swipe or scroll to see all</div>
                        </div>
                        <span style="font-size:9px; font-weight:900; color:#ef4444; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:6px; padding:3px 8px;">● Live</span>
                    </div>
                    <div id="auction-controls-bar" class="hide-scroll" style="display:flex; gap:6px; overflow-x:auto; padding-bottom:8px; margin-bottom:6px;">
                        ${auctionControlsBarHtml()}
                    </div>
                    <div style="position:relative;">
                        <button class="auction-scroll-btn" data-dir="-1" style="position:absolute; left:0; top:50%; transform:translateY(-50%); z-index:5; width:28px; height:28px; border-radius:50%; background:rgba(0,0,0,0.6); border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:14px; font-weight:900; cursor:pointer; display:flex; align-items:center; justify-content:center;">‹</button>
                        <div id="auction-scroll-row" class="hide-scroll" style="display:flex; gap:8px; overflow-x:auto; padding-bottom:12px; scroll-snap-type:x mandatory; scroll-behavior:smooth;">
                            ${visibleItems.map(buildAuctionCard).join('')}
                        </div>
                        <button class="auction-scroll-btn" data-dir="1" style="position:absolute; right:0; top:50%; transform:translateY(-50%); z-index:5; width:28px; height:28px; border-radius:50%; background:rgba(0,0,0,0.6); border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:14px; font-weight:900; cursor:pointer; display:flex; align-items:center; justify-content:center;">›</button>
                    </div>
                </div>` + capBarHtml;
        } else {
            auctionHtml = capBarHtml;
        }

    } catch(e) { console.warn('Auction fetch failed', e); }
}

// Specific position clicked = group, otherwise flat
        const specificPosList = ['QB','RB','WR','TE','PK','DT+DE','LB','CB+S'];
        const isSpecificPos = specificPosList.includes(playerPosFilter);

        let outputHtml = '';

outputHtml = '<div class="roster-grid" style="padding: 0 5px;">';
        players.forEach(p => {
            outputHtml += buildUniversalRow(
                { pid: p.pid, name: p.name, shortName: p.shortName, pos: p.pos, team: p.team },
                {
                    subText: p.salary ? `${p.salary} · ${p.years}yr · ${p.guar} · <span style="color:#ef4444;">$${p.capHitNum.toFixed(1)}m hit</span>` : 'Free Agent',
                    subTextColor: '#22c55e',
                    rightContent: buildPlayerRightHtml(p, isFAView),
                    rightSlotStyle: 'margin-left: auto; display: flex; align-items: center;',
                }
            );
        });
        outputHtml += '</div>';

container.find('#players-loader').remove();
        container.prepend(auctionHtml);
        container.append(outputHtml);
}
function buildPlayerRightHtml(p, isFAView) {
    if (p.ownerFid) {
        const logoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${p.ownerFid}.png`;
        const salNum = parseFloat((p.salary || '').replace(/[^0-9.]/g, '')) || 0;
        const yrsNum = parseInt(p.years) || 1;
        const gPct = parseFloat((p.guar || '').replace(/[^0-9.]/g, '')) / 100 || 0;
        const capHit = (salNum * gPct * yrsNum).toFixed(1);
        return `
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
                <img src="${logoUrl}" class="team-popup-trigger" data-fid="${p.ownerFid}" style="width:28px; height:28px; border-radius:50%; border:1px solid var(--card-border); background:#000; object-fit:cover; cursor:pointer;">

            </div>`;
     } else {
        const activeAuction = offseasonMode ? (window._auctionItems || []).find(a => String(a.pid) === String(p.pid)) : null;
        const pendingClaim = (window._pendingWaivers || {})[p.pid] || null;

        const auctionBadgeHtml = pendingClaim ? `
                <div style="background: rgba(234,179,8,0.08); border: 1px solid rgba(234,179,8,0.3); border-radius: 8px; padding: 5px 10px; text-align: right;">
                    <div style="font-size: 10px; font-weight: 900; color: #eab308; line-height: 1;">⏳ CLAIM PENDING</div>
                    ${pendingClaim.priority ? `<div style="font-size: 8px; font-weight: 800; color: var(--text-dim); margin-top: 3px;">Priority ${pendingClaim.priority}</div>` : ''}
                    ${pendingClaim.dropName ? `<div style="font-size: 8px; font-weight: 800; color: var(--text-dim); margin-top: 2px;">Drop: ${pendingClaim.dropName}</div>` : ''}
                    ${pendingClaim.dateText ? `<div style="font-size: 7px; font-weight: 700; color: var(--text-dim); margin-top: 2px;">${pendingClaim.dateText}</div>` : ''}
                </div>` : activeAuction ? `
                <div style="background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.25); border-radius: 8px; padding: 5px 10px; text-align: right;">
                    <div style="font-size: 11px; font-weight: 900; color: #22c55e; line-height: 1;">${activeAuction.displayBid}</div>
                    <div style="font-size: 8px; font-weight: 900; color: ${activeAuction.urgency}; margin-top: 3px;">⏱ ${activeAuction.timeLeft}</div>
                    ${activeAuction.isWinning ? '<div style="font-size:7px; font-weight:900; color:#22c55e; margin-top:2px; text-transform:uppercase;">Winning</div>' : ''}
                </div>` : '';

        const actionBtn = pendingClaim
            ? `<button disabled style="padding: 6px 12px; border-radius: 4px; background: rgba(234,179,8,0.1); color: #eab308; border: 1px solid rgba(234,179,8,0.3); font-weight: 900; font-size: 9px; cursor: not-allowed; text-transform: uppercase;">Pending</button>`
            : activeAuction
            ? `<button class="fa-bid-btn" data-pid="${p.pid}" data-name="${p.name}" data-minbid="${activeAuction.minBid}"
                   style="padding: 6px 12px; border-radius: 4px; background: var(--accent-blue); color: #fff; border: none; font-weight: 900; font-size: 9px; cursor: pointer; text-transform: uppercase;">Bid</button>`
            : (offseasonMode
                ? `<button class="fa-nominate-btn" data-pid="${p.pid}" data-name="${p.name}"
                       style="padding: 6px 12px; border-radius: 4px; background: rgba(0,206,184,0.15); color: var(--accent-teal); border: 1px solid rgba(0,206,184,0.3); font-weight: 900; font-size: 9px; cursor: pointer; text-transform: uppercase;">Offer</button>`
                : `<button class="roster-tx-btn" data-tx-type="add" data-tx-pid="${p.pid}"
                       style="padding: 6px 12px; border-radius: 4px; background: var(--accent-blue); color: #000; border: none; font-weight: 900; font-size: 9px; cursor: pointer; text-transform: uppercase;">Add</button>`);

        return `
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
                ${auctionBadgeHtml}
                <div style="background: rgba(0,206,184,0.08); border: 1px solid rgba(0,206,184,0.15); border-radius: 8px; padding: 5px 10px; text-align: right;">
                    <div style="font-size: 13px; font-weight: 900; color: var(--accent-teal); line-height: 1;">${p.projVal.toFixed(1)} <span style="font-size: 9px;">PROJ</span></div>
                    <div style="display: flex; gap: 6px; margin-top: 3px; justify-content: flex-end;">
                        <span style="font-size: 8px; font-weight: 900; color: #f59e0b;">${p.addVal}% ADD</span>
                        <span style="font-size: 8px; font-weight: 800; color: var(--text-dim);">${p.ownVal}% OWN</span>
                    </div>
                </div>
                ${actionBtn}
            </div>`;
    }
}

function buildLeagueContractsView(rows, container, posParam) {
    const startYear = parseInt(year) || 2026;
    let contractPlayers = [];

    rows.forEach(row => {
        // Skip footer rows
        if (row.classList.contains('reportfooter')) return;

        const playerLink = row.querySelector('td.player a[class*="position_"]');
        if (!playerLink) return;

        const pid = playerLink.getAttribute('href').match(/\d+/g)?.pop();
        const { name, shortName, lastName, pos, team } = parseMFLName(playerLink.textContent);

        const tds = row.querySelectorAll('td');
        const rosterText = tds[2]?.textContent.trim() || '';
        const cleanName = rosterText.split(' - ')[0].trim();
        const ownerFid = cleanName && cleanName !== 'FA'
            ? Object.keys(leagueFranchises).find(key => leagueFranchises[key].trim().toLowerCase() === cleanName.toLowerCase())
            : null;

        const salary = tds[4]?.textContent.trim() || '';
        const years = tds[5]?.textContent.trim() || '';
        const capHit = tds[6]?.textContent.trim() || '';
        const guar = tds[7]?.textContent.trim() || '';
        const salNum = parseFloat(salary.replace(/[^0-9.]/g, '')) || 0;
        const yrsNum = parseInt(years) || 0;

        const injHtml = getInjuryHtml(pid);
        const rookieHtml = getRookieHtml(pid);
        let rStat = irPids.has(pid) ? "IR" : taxiPids.has(pid) ? "TS" : "";

        const logoUrl = ownerFid
            ? `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${ownerFid}.png`
            : null;

// Build yearly cap hit columns like the team contracts tab
        const yearCols = [];
        for (let i = 0; i < yrsNum; i++) {
            const y = startYear + i;
            const remainingYears = yrsNum - i;
            const gPct = parseFloat(guar.replace(/[^0-9.]/g, '')) / 100 || 0;
            const yearHit = (salNum * gPct * remainingYears).toFixed(1);
   yearCols.push(`
    <div style="display:flex; flex-direction:column; align-items:center; gap:1px;">
        <span style="font-size:7px; color:var(--text-dim); text-transform:uppercase;">${y}</span>
        <span style="font-size:11px; font-weight:900; color:#f59e0b; white-space:nowrap;">$${yearHit}m</span>
    </div>`);
        }

const gPct = parseFloat(guar.replace(/[^0-9.]/g, '')) / 100 || 0;
const capHitDisplay = (salNum * gPct * yrsNum).toFixed(1);

const rightDataHtml = logoUrl 
    ? `<img src="${logoUrl}" style="width:28px; height:28px; border-radius:50%; border:1px solid var(--card-border); background:#000; object-fit:cover; flex-shrink:0;">`
    : `<span style="font-size:9px; color:var(--accent-teal); font-weight:900;">FA</span>`;

const rowHtml = buildUniversalRow(
    { pid, name, shortName, pos, team },
    {
        subText: salNum > 0 
            ? `${salary} · ${yrsNum}yr · ${guar} · <span style="color:#f59e0b;">$${capHitDisplay}m hit</span>` 
            : (ownerFid ? `On ${leagueFranchises[ownerFid]}` : 'Free Agent'),
        subTextColor: salNum > 0 ? '#22c55e' : (ownerFid ? 'var(--accent-blue)' : 'var(--accent-blue)'),
        rightContent: rightDataHtml,
        rightSlotStyle: 'margin-left: auto; display: flex; align-items: center;',
        nameSuffix: rookieHtml,
        rowStyle: 'cursor: pointer;'
    }
);

        contractPlayers.push({ pos, lastName, name, years: yrsNum, capHit: salNum, html: rowHtml });
    });

    container.find('#players-loader').remove();
    const grouped = buildGroupedHTML(contractPlayers, 'contracts');
    container.append(grouped);
}
// --- LEAGUE TRANSACTIONS FETCHER ---
async function loadLeagueTransactions() {
    const container = $('#league-content-container');
    if (window._txCache) {
        container.html(window._txCache);
        reapplyAllTeamStyles();
        return;
    }
container.html('<div class="loading-text" style="text-align:center; margin-top:20px; color:var(--text-dim);">Loading Transactions...</div>');

    function parseMflTimestamp(text) {
        if (!text) return null;
        let t = text.replace(/\u00a0/g, ' ').trim();
        t = t.replace(/a\.m\./i, 'AM').replace(/p\.m\./i, 'PM').replace(/\bET\b/i, '').trim();
        const d = new Date(t);
        return isNaN(d.getTime()) ? null : d;
    }
    function extractTimestampText(cells) {
        for (const c of cells) {
            const t = c.textContent.trim();
            if (/\d{1,2}:\d{2}\s*(a\.m\.|p\.m\.)/i.test(t) || /^[A-Za-z]{3}\s+[A-Za-z]{3}\s+\d{1,2}/.test(t)) return t;
        }
        return '';
    }

try {
        // Fetch transactions and salary adjustments in parallel
const [res, adjRes] = await Promise.all([
            fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=03&TYPE=DEFAULT&FRANCHISE=0000&DAYS=200`, { cache: 'no-store' }),
            fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=142`, { credentials: 'include' })
        ]);
        const adjHtml = await adjRes.text();
        const adjDoc = new DOMParser().parseFromString(adjHtml, 'text/html');
        const deadCapMap = {};
const resignEvents = [];
        adjDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
            const explanation = row.querySelector('td:nth-child(3)')?.textContent.trim() || '';
            const amountText = row.querySelector('td.salary')?.textContent.trim() || '';
            const amount = parseFloat(amountText.replace(/[^0-9.]/g, '')) || 0;
            const fLink = row.querySelector('a[class*="franchise_"]');
            const fIdMatch = fLink?.getAttribute('href')?.match(/F=(\d+)/);
            const fId = fIdMatch ? fIdMatch[1].padStart(4, '0') : null;
const dateText = row.querySelector('td:last-child')?.textContent.trim() || '';
const deadCapMatch = explanation.match(/Dead cap: (.+) cut/i);
            if (deadCapMatch && fId) {
                deadCapMap[`${fId}|${deadCapMatch[1].toLowerCase()}`] = amount;
            }
            const droppedMatch = explanation.match(/^Dropped (.+)$/i);
            if (droppedMatch && fId) {
                deadCapMap[`${fId}|${droppedMatch[1].toLowerCase().trim()}`] = amount;
            }
// Only capture resigns — entries with our specific format
const resignMatch = explanation.match(/^(.+?) re-signed: \$(.+?)\/yr - (\d+)yrs - (\d+)%guar - pid:(\d+)/);            if (fId && resignMatch) {
                resignEvents.push({ fId, explanation, amount, dateText, dateObj: parseMflTimestamp(dateText) });
            }
        });

const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');

const rows = doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow');
        if (rows.length === 0 && !auctionEntries.length) {
            container.html('<div style="text-align:center; padding: 20px; color: var(--text-dim);">No recent transactions found.</div>');
            return;
        }
let txCardsHtml = '';
let uniqueTxTypes = new Set();
let txEntries = [];
let resignEntries = [];
let auctionEntries = [];

// Fetch completed auctions (won contracts) for the transactions feed
try {
    const auctionRes = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=102`, { credentials: 'include' });
    const auctionDoc = new DOMParser().parseFromString(await auctionRes.text(), 'text/html');
    const auctionRows = Array.from(auctionDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow'));
    auctionRows.forEach(row => {
        const pLink = row.querySelector('a[class*="position_"]');
        if (!pLink) return;
        const pidMatch = pLink.getAttribute('href').match(/\d+/g);
        const pid = pidMatch ? pidMatch.pop() : null;
        if (!pid) return;
        const winnerFid = row.querySelector('a[class*="franchise_"]')?.getAttribute('class')?.match(/franchise_(\d+)/)?.[1]?.padStart(4,'0') || '';
        if (!winnerFid) return;
const { name, shortName, pos, team } = parseMFLName(pLink.textContent);
        const cells = Array.from(row.querySelectorAll('td'));
        const commentText = cells[cells.length - 1]?.textContent.trim() || '';
        const contractMatch = commentText.match(/\$?([\d.]+)m\/yr\s*·\s*(\d+)yrs\s*·\s*(\d+)%guar/);
        const bidCell = row.querySelector('td.salary')?.textContent.trim() || '';
        const logoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${winnerFid}.png`;
        const teamName2 = leagueFranchises[winnerFid] || winnerFid;
        const injHtml2 = getInjuryHtml(pid);
        const auctionTimestamp = row.querySelector('td.timestamp')?.textContent.trim() || extractTimestampText(cells);
        auctionEntries.push({ dateObj: parseMflTimestamp(auctionTimestamp), html: `
            <div class="tx-card" data-tx-type="adddrop" style="margin-bottom:12px; background:rgba(255,255,255,0.02); border:1px solid var(--card-border); border-radius:8px; padding:12px; box-shadow:0 4px 6px rgba(0,0,0,0.2);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:8px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img src="${logoUrl}" onerror="this.src='https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/NFL.svg'" class="team-popup-trigger" data-fid="${winnerFid}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border:1.5px solid rgba(255,255,255,0.1); background:#000; cursor:pointer;">
                        <div style="display:flex; flex-direction:column;">
                            <span style="font-size:13px; font-weight:800; color:#fff;" data-team-style="${winnerFid}">${teamName2}</span>
<span style="font-size:9px; font-weight:900; color:#f59e0b; text-transform:uppercase; margin-top:2px;">Add/Drop</span>                        </div>
                    </div>
                    <span style="font-size:9px; font-weight:800; color:var(--text-dim); text-align:right; max-width:80px; line-height:1.3;">${auctionTimestamp || ''}</span>
                </div>
                <div style="display:flex; gap:8px; margin-top:10px; align-items:center;">
<div class="player-modal-trigger" data-pid="${pid}" data-team="${team}" style="width:44px; height:44px; border-radius:50%; overflow:hidden; border:2px solid rgba(245,158,11,0.3); background:var(--card-bg); flex-shrink:0; cursor:pointer;">
                        <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${pid}.png" onerror="this.style.opacity='0'" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div style="flex:1; min-width:0;">
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px; flex-wrap:wrap;">
                            <span style="font-size:13px; font-weight:900; color:#fff;">${shortName || name}</span>
                            <span class="pos-text-${pos.toLowerCase()}" style="font-size:9px; font-weight:900;">${pos}</span>
                            ${injHtml2}
                        </div>
                        <div style="display:flex; align-items:center; gap:4px; margin-bottom:4px;">
                            <img src="${getNFLLogoUrl(team)}" onerror="this.src='https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/NFL.svg'" style="width:14px; height:14px; object-fit:contain;">
                        </div>
                        <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap;">
                            ${contractMatch ? `
                                <span style="font-size:11px; font-weight:900; color:#22c55e;">$${contractMatch[1]}m/yr</span>
                                <span style="font-size:10px; color:var(--accent-blue); font-weight:800;">${contractMatch[2]} yrs</span>
                                <span style="font-size:10px; color:var(--text-dim); font-weight:800;">${contractMatch[3]}% guar</span>
                            ` : bidCell ? `<span style="font-size:11px; font-weight:900; color:#22c55e;">${bidCell}</span>` : ''}
                        </div>
                    </div>
</div>
            </div>` });
    });
} catch(auctionErr) { console.warn('Auction results fetch failed', auctionErr); }

// Fetch trade block and inject as transactions
let tradeBlockHtml = '';
try {
    const tbRes = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=tradeBait&L=${lid}&INCLUDE_DRAFT_PICKS=1&JSON=1`, { credentials: 'include' });
    const tbData = await tbRes.json();
    let baits = tbData?.tradeBaits?.tradeBait || [];
    if (!Array.isArray(baits)) baits = [baits];
    baits = baits.filter(b => b.willGiveUp);
// Cache block counts by fid
    window._tradeBlockCounts = window._tradeBlockCounts || {};
    baits.forEach(b => {
        const bFid = (b.franchise_id || b.franchise || '').padStart(4,'0');
        window._tradeBlockCounts[bFid] = (b.willGiveUp || '').split(',').filter(Boolean).length;
    });

    if (baits.length > 0) {
        uniqueTxTypes.add('Trade Block');
        for (const bait of baits) {
            const bFid = (bait.franchise_id || bait.franchise || '').padStart(4,'0');
            const teamName = leagueFranchises[bFid] || bFid;
            const logoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${bFid}.png`;
            const pidList = (bait.willGiveUp || '').split(',').filter(Boolean);
            
            const chipsHtml = pidList.map(pid => {
                pid = pid.trim();
                const isPick = pid.startsWith('FP_') || pid.startsWith('DP_');
                if (isPick) {
const parts = pid.split('_');
let pickYear, round;
if (pid.startsWith('FP_')) {
    // FP_{fid}_{year}_{round}
    pickYear = parts[2] || year;
    round = parts[3] || '?';
} else {
    // DP_{round} or similar
    pickYear = year;
    round = parts[1] || '?';
}
console.log('Pick pid:', pid, 'parts:', parts);

                    return `<div style="display:flex; flex-direction:column; align-items:center; gap:4px; width:56px;">
                        <div style="width:44px; height:44px; border-radius:50%; overflow:hidden; border:2px solid rgba(245,158,11,0.4); background:rgba(245,158,11,0.1); display:flex; align-items:center; justify-content:center;">
                            <span style="font-size:13px; font-weight:900; color:#f59e0b;">${round}</span>
                        </div>
                        <div style="font-size:8px; font-weight:800; color:#f59e0b; text-align:center;">${pickYear} R${round}</div>
                    </div>`;
                }
                return `<div style="display:flex; flex-direction:column; align-items:center; gap:4px; width:56px; cursor:pointer;" class="player-modal-trigger" data-pid="${pid}">
                    <div style="width:44px; height:44px; border-radius:50%; overflow:hidden; border:2px solid rgba(168,85,247,0.4);">
                        <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div id="tb-player-name-${pid}" style="font-size:8px; font-weight:800; color:#fff; text-align:center; line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:54px;">...</div>
                </div>`;
            }).join('');

            tradeBlockHtml += `
                <div class="tx-card" data-tx-type="tradeblock" style="margin-bottom:12px; background:rgba(255,255,255,0.02); border:1px solid var(--card-border); border-radius:8px; padding:12px; box-shadow:0 4px 6px rgba(0,0,0,0.2);">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:8px; margin-bottom:8px;">
                        <div style="display:flex; align-items:center; gap:10px;">
<img src="${logoUrl}" onerror="this.src='https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/NFL.svg'" class="team-popup-trigger" data-fid="${bFid}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; background:var(--card-bg); border:1.5px solid rgba(255,255,255,0.1); flex-shrink:0; cursor:pointer;">
                        <div>
                                <span style="font-size:13px; font-weight:800; color:#fff;" data-team-style="${bFid}">${teamName}</span>
                                <div style="font-size:9px; font-weight:900; color:#a855f7; text-transform:uppercase; margin-top:2px;">Trade Block ${bait.inExchangeFor ? '· ' + bait.inExchangeFor : ''}</div>
                            </div>
                        </div>
                        <span style="font-size:9px; font-weight:900; color:#a855f7; background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.3); border-radius:6px; padding:3px 8px;">${BLOCK_ICON} Available</span>
                    </div>
                    <div style="display:flex; flex-wrap:wrap; gap:8px;">${chipsHtml}</div>
                </div>`;

            // Resolve player names async
            pidList.filter(p => !p.startsWith('FP_') && !p.startsWith('DP_')).forEach(async pid => {
                try {
                    const res = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=players&L=${lid}&PLAYERS=${pid}&JSON=1`, { credentials: 'include' });
                    const data = await res.json();
                    const player = data?.players?.player;
                    if (player) {
                        const name = player.name ? player.name.split(', ').reverse().join(' ') : pid;
                        $(`#tb-player-name-${pid}`).text(name.split(' ').pop());
                    }
                } catch(e) {}
            });
        }
    }
} catch(e) { console.warn('Trade block tx fetch failed', e); }
// First pass — parse all rows into structured objects
const txEvents = [];
rows.forEach(row => {
    try {
        if (row.classList.contains('reportfooter')) return;
const fLink = row.querySelector('td:nth-child(2) a');
        if (!fLink) return;

        const href = fLink.getAttribute('href') || '';
        const fIdMatch = href.match(/F=(\d+)/);
        const fId = fIdMatch ? fIdMatch[1].padStart(4, '0') : '0000';
        const imgNode = fLink.querySelector('img');
        const teamLogo = imgNode?.getAttribute('src') || `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${fId}.png`;
        const teamName = imgNode?.getAttribute('alt') || fLink.textContent.trim() || 'NFL';
        const td2 = row.querySelector('td:nth-child(2)');
        const isCommish = td2 ? td2.textContent.includes('(C)') : false;
        const txTypeNode = row.querySelector('td.transactiontype');
const txType = txTypeNode ? txTypeNode.textContent.trim() : 'System';
        if (txType === 'RESIGN' || txType.toLowerCase().includes('resign')) console.log('Found resign tx:', txType, row.innerHTML);        uniqueTxTypes.add(txType);
        const rowFranchises = td2 ? Array.from(td2.querySelectorAll('a[class*="franchise_"]')).map(a => {
            const m = (a.getAttribute('href') || '').match(/F=(\d+)/);
            const rFid = m ? m[1].padStart(4, '0') : '0000';
            const rImg = a.querySelector('img');
            return {
                fId: rFid,
                teamName: rImg?.getAttribute('alt') || a.textContent.trim() || 'NFL',
                teamLogo: rImg?.getAttribute('src') || `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${rFid}.png`
            };
        }) : [];
        const timeNode = row.querySelector('td.timestamp');
        const rawTimestamp = timeNode ? timeNode.textContent.trim() : '';
        let timestamp = rawTimestamp;
        timestamp = timestamp.replace(/:\d{2}\s+(a\.m\.|p\.m\.)\s+ET\s+\d{4}/i, ' $1').trim();
        const dateKey = timestamp.replace(/\d+:\d+\s*(a\.m\.|p\.m\.)/i, '').trim();
        const players = [];
        const picks = [];
        const actions = row.querySelectorAll('td ul li');

        actions.forEach((li, liIndex) => {
            const fullText = li.textContent.toLowerCase();
            const isTrade = txType.toLowerCase().includes('trade');
            let actionText = 'Moved';
            let targetCol = 'generic';
            let actionColor = '#fff';
            let actionBg = 'rgba(255,255,255,0.05)';

            if (isTrade) {
                actionColor = '#a855f7'; actionBg = 'rgba(168,85,247,0.1)';
                actionText = 'Traded';
                targetCol = liIndex % 2 === 0 ? 'add' : 'drop';
            } else if (fullText.includes('deactivated') || fullText.includes('demoted') || fullText.includes('dropped') || fullText.includes('gave up')) {
                actionColor = '#ef4444'; actionBg = 'rgba(239,68,68,0.1)';
                actionText = fullText.includes('gave up') ? 'Gave Up' : fullText.includes('deactivated') ? 'Deactivated' : fullText.includes('demoted') ? 'Demoted' : 'Dropped';
                targetCol = 'drop';
            } else if (fullText.includes('activated') || fullText.includes('promoted') || fullText.includes('acquired')) {
                actionColor = '#22c55e'; actionBg = 'rgba(34,197,94,0.1)';
                actionText = fullText.includes('activated') ? 'Activated' : fullText.includes('promoted') ? 'Promoted' : 'Acquired';
                targetCol = 'add';
            }

             li.querySelectorAll('a[href*="P="], a[class*="position_"]').forEach(pLink => {
                const parsed = parseMFLName(pLink.textContent);
                const pidMatch = pLink.getAttribute('href').match(/\d+/g);
                const pid = pidMatch ? pidMatch.pop() : '0000';
                const titleAttr = pLink.getAttribute('title') || '';
                const contractMatch = titleAttr.match(/Salary:\s*\$([\d.]+)m.*?Years Left:\s*(\d+).*?Guaranteed Percentage:\s*(\d+)%/i);
                const contract = contractMatch ? { sal: contractMatch[1], yrs: contractMatch[2], guar: contractMatch[3] } : null;
                players.push({ pid, parsed, actionText, actionColor, actionBg, targetCol, contract });
            });

                       const pickMatches = li.textContent.match(/Year\s+20\d{2}\s+(?:Round\s+\d+\s+Draft\s+Pick|Draft\s+Pick\s+[\d.]+)/gi) || [];
            pickMatches.forEach(pickText => {
                const yearMatch = pickText.match(/20\d{2}/);
                const yearStr = yearMatch ? yearMatch[0] : year;
                const roundMatch = pickText.match(/Round\s+(\d+)/i);
                const pickNumMatch = pickText.match(/Draft\s+Pick\s+([\d.]+)/i);
                let details;
                if (roundMatch) {
                    details = `Round ${roundMatch[1]}`;
                } else if (pickNumMatch) {
                    details = `Round ${pickNumMatch[1].split('.')[0]} (Pick ${pickNumMatch[1]})`;
                } else {
                    details = pickText.trim();
                }
                picks.push({ yearStr, details, actionText, actionColor, actionBg, targetCol });
            });

            if (players.length === 0 && picks.length === 0) {
                players.push({ pid: null, fallback: li.textContent.trim(), actionText, actionColor, actionBg, targetCol });
            }
        });

        txEvents.push({ fId, teamLogo, teamName, isCommish, txType, timestamp, dateKey, rawTimestamp, rowFranchises, players, picks });
    } catch(e) { console.warn('Row parse error', e); }
});

// Second pass — group by fId + txType + dateKey (trades are already fully self-contained per row, so key them uniquely instead of merging by day)
const groups = [];
const groupMap = {};
txEvents.forEach(ev => {
    const isTrade = ev.txType.toLowerCase().includes('trade');
    const key = isTrade ? `TRADE|${ev.rawTimestamp}|${ev.rowFranchises.map(f => f.fId).sort().join(',')}` : `${ev.fId}|${ev.txType}|${ev.dateKey}`;
    if (groupMap[key] === undefined) {
        groupMap[key] = groups.length;
        groups.push({ 
            ...ev, 
            allPlayers: [...ev.players], 
            allPicks: [...ev.picks], 
            timestamps: [ev.timestamp],
            tradeFids: isTrade ? ev.rowFranchises.slice() : []
        });
    } else {
        const g = groups[groupMap[key]];
        g.allPlayers.push(...ev.players);
        g.allPicks.push(...ev.picks);
        g.timestamps.push(ev.timestamp);
        if (isTrade) {
            ev.rowFranchises.forEach(f => {
                if (!g.tradeFids.find(existing => existing.fId === f.fId)) g.tradeFids.push(f);
            });
        }
    }
});

// Third pass — render grouped cards
groups.forEach(g => {
    const safeTypeAttr = g.txType.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let typeColor = 'var(--accent-blue)';
    const typeLower = g.txType.toLowerCase();
    if (typeLower.includes('injured reserve')) typeColor = '#ef4444';
    if (typeLower.includes('taxi')) typeColor = '#f59e0b';
    if (typeLower.includes('add/drop') || typeLower.includes('waiver')) typeColor = '#22c55e';
    if (typeLower.includes('trade')) typeColor = '#a855f7';

const isGrouped = true;
    const latestTimestamp = g.timestamps[0];

    let addedHtml = '', droppedHtml = '', genericHtml = '';

   if (isGrouped) {
        const isTradeCard = g.txType.toLowerCase().includes('trade');

        // Minimized chip view
        const addPlayers = g.allPlayers.filter(p => p.targetCol === 'add' && p.pid);
        const dropPlayers = g.allPlayers.filter(p => p.targetCol === 'drop' && p.pid);
        const genericPlayers = g.allPlayers.filter(p => p.targetCol === 'generic' && p.pid);

        const makeChips = (players, color) => players.map(p => {
            const teamAbbr = (p.parsed.team || 'NFL').trim().toUpperCase();
            const contractHtml = p.contract ? `<div style="font-size:7px; font-weight:800; color:#22c55e; margin-top:3px; text-align:center; line-height:1.4;">$${p.contract.sal}m/yr<br><span style="color:var(--text-dim); font-weight:700;">${p.contract.yrs}yr · ${p.contract.guar}%</span></div>` : '';
            return `
<div style="display:flex; flex-direction:column; align-items:center; gap:4px; width:66px; cursor:pointer;" class="player-modal-trigger" data-pid="${p.pid}" data-team="${teamAbbr}">
                <div style="width:44px; height:44px; border-radius:50%; overflow:hidden; border:2px solid ${color}40; flex-shrink:0;">
                    <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${p.pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div style="font-size:8px; font-weight:800; color:#fff; text-align:center; line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:64px;">${p.parsed.shortName || p.parsed.name}</div>
                <div style="display:flex; align-items:center; gap:3px;">
                    <img src="${getNFLLogoUrl(teamAbbr)}" onerror="this.src='https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/NFL.svg'" style="width:10px; height:10px; object-fit:contain;">
<span class="pos-text-${(p.parsed.pos||'').toLowerCase()}" style="font-size:6px; font-weight:900;">${p.parsed.pos}</span>
                </div>
                ${contractHtml}
            </div>`;
        }).join('');

        const makePickChips = (picks, color) => picks.map(p => `
            <div style="display:flex; flex-direction:column; align-items:center; gap:4px; width:66px;">
                <div style="width:44px; height:44px; border-radius:50%; background:${color}15; border:2px solid ${color}40; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                    <span style="font-size:14px; font-weight:900; color:${color};">${(p.details.match(/\d+/)?.[0]) || '?'}</span>
                </div>
                <div style="font-size:8px; font-weight:800; color:#fff; text-align:center; line-height:1.2;">${p.yearStr}</div>
                <div style="font-size:7px; font-weight:900; color:${color}; text-transform:uppercase;">${p.details}</div>
            </div>`).join('');

        const addPicks = g.allPicks.filter(p => p.targetCol === 'add');
        const dropPicks = g.allPicks.filter(p => p.targetCol === 'drop');
        const genericPicks = g.allPicks.filter(p => p.targetCol === 'generic');

        const addSideName = isTradeCard && g.tradeFids && g.tradeFids[0] ? g.tradeFids[0].teamName : '';
        const dropSideName = isTradeCard && g.tradeFids && g.tradeFids[1] ? g.tradeFids[1].teamName : '';

        if (addPlayers.length || addPicks.length) {
            const headerLabel = isTradeCard ? `Traded by ${addSideName}` : (addPlayers[0]?.actionText || 'Added');
            addedHtml = `
            <div style="flex:1; min-width:0;">
                <div style="font-size:8px; font-weight:900; color:#22c55e; text-transform:uppercase; margin-bottom:6px;">${headerLabel}</div>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">${makeChips(addPlayers, '#22c55e')}${makePickChips(addPicks, '#22c55e')}</div>
            </div>`;
        }
        if (dropPlayers.length || dropPicks.length) {
            const deadCapInfo = dropPlayers.map(p => {
                const key = `${g.fId}|${(p.parsed.name || '').toLowerCase()}`;
                const cap = deadCapMap[key];
                return cap ? `<span style="font-size:9px; color:#ef4444; font-weight:800;"> $${cap.toFixed(1)}m dead cap</span>` : '';
            }).filter(Boolean).join('');
            const headerLabel = isTradeCard ? `Traded by ${dropSideName}` : (dropPlayers[0]?.actionText || 'Dropped');
            droppedHtml = `
            <div style="flex:1; min-width:0;">
                <div style="font-size:8px; font-weight:900; color:#ef4444; text-transform:uppercase; margin-bottom:6px;">${headerLabel}</div>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">${makeChips(dropPlayers, '#ef4444')}${makePickChips(dropPicks, '#ef4444')}</div>
                ${deadCapInfo ? `<div style="margin-top:6px;">${deadCapInfo}</div>` : ''}
            </div>`;
        }
        if (genericPlayers.length || genericPicks.length) genericHtml = `
            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:8px;">${makeChips(genericPlayers, '#fff')}${makePickChips(genericPicks, '#f59e0b')}</div>`;
    } else {
        // Normal full row view
        g.allPlayers.forEach(p => {
            if (!p.pid) {
                const fallbackHtml = `<div style="font-size:11px; font-weight:800; color:#fff; padding:8px 12px; background:rgba(0,0,0,0.25); border-radius:8px; border:1px solid rgba(255,255,255,0.05); text-align:center; margin-bottom:4px;">${p.fallback}</div>`;
                if (p.targetCol === 'add') addedHtml += fallbackHtml;
                else if (p.targetCol === 'drop') droppedHtml += fallbackHtml;
                else genericHtml += fallbackHtml;
                return;
            }
            const rowHtml = buildUniversalRow(
                { pid: p.pid, name: p.parsed.name, shortName: p.parsed.shortName, pos: p.parsed.pos, team: p.parsed.team, rank: playerRanks[p.pid] },
                {
                    subText: p.parsed.team || '-',
                    rightContent: `<span style="font-size:9px; font-weight:900; color:${p.actionColor}; background:${p.actionBg}; border:1px solid ${p.actionColor}40; text-transform:uppercase; padding:4px 6px; border-radius:4px; white-space:nowrap;">${p.actionText}</span>`,
                    rowStyle: 'margin-bottom:4px; background:rgba(0,0,0,0.25); padding:6px 10px;',
                    badgeContainerStyle: 'padding:0;'
                }
            );
            if (p.targetCol === 'add') addedHtml += rowHtml;
            else if (p.targetCol === 'drop') droppedHtml += rowHtml;
            else genericHtml += rowHtml;
        });

        g.allPicks.forEach(p => {
            const pickHtml = `
                <div class="player-row" style="display:flex; align-items:center; justify-content:space-between; gap:8px; background:rgba(0,0,0,0.25); border-radius:8px; padding:6px 10px; margin-bottom:4px; border:1px solid #f59e0b50; border-left:3px solid #f59e0b;">
                    <div style="display:flex; align-items:center; gap:12px; flex:1; min-width:0;">
                        <div style="width:42px; height:42px; flex-shrink:0; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); border-radius:50%; display:flex; align-items:center; justify-content:center;">
                            <span style="font-weight:900; font-size:13px; color:#f59e0b;">${p.yearStr.slice(-2)}</span>
                        </div>
                        <div style="flex:1; min-width:0;">
                            <div style="font-size:13px; font-weight:800; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.details}</div>
                            <span style="font-size:10px; font-weight:900; color:#f59e0b; text-transform:uppercase; margin-top:4px; display:block;">Draft Pick</span>
                        </div>
                    </div>
                    <span style="font-size:9px; font-weight:900; color:${p.actionColor}; background:${p.actionBg}; border:1px solid ${p.actionColor}40; text-transform:uppercase; padding:4px 6px; border-radius:4px; white-space:nowrap;">${p.actionText}</span>
                </div>`;
            if (p.targetCol === 'add') addedHtml += pickHtml;
            else if (p.targetCol === 'drop') droppedHtml += pickHtml;
            else genericHtml += pickHtml;
        });
    }

txEntries.push({ dateObj: parseMflTimestamp(latestTimestamp), html: `
        <div class="tx-card" data-tx-type="${safeTypeAttr}" style="margin-bottom:12px; background:rgba(255,255,255,0.02); border:1px solid var(--card-border); border-radius:8px; padding:12px; box-shadow:0 4px 6px rgba(0,0,0,0.2);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:8px;">
                <div style="display:flex; align-items:center; gap:10px;">
${g.tradeFids && g.tradeFids.length > 1 ? `
    <div style="display:flex; flex-direction:column; gap:6px;">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            ${g.tradeFids.map((f, i) => `
                <div style="display:flex; align-items:center; gap:6px;">
                    <img src="${f.teamLogo}" onerror="this.src='https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/NFL.svg'" class="team-popup-trigger" data-fid="${f.fId}" style="width:28px; height:28px; border-radius:50%; object-fit:cover; background:var(--card-bg); border:1px solid rgba(255,255,255,0.1); cursor:pointer;">
                    <span style="font-size:12px; font-weight:800; color:#fff;" data-team-style="${f.fId}">${f.teamName}</span>
                </div>
                ${i < g.tradeFids.length - 1 ? '<span style="font-size:10px; color:var(--text-dim);">⇄</span>' : ''}
            `).join('')}
        </div>
        <span style="font-size:9px; font-weight:900; color:${typeColor}; text-transform:uppercase;">${g.txType}</span>
    </div>
` : `
    <div class="team-popup-trigger" data-fid="${g.fId}" style="cursor:pointer;">${buildLogoWithTrophy(g.fId, 32)}</div>
    <div style="display:flex; flex-direction:column;">
        <span style="font-size:13px; font-weight:800; color:#fff;" data-team-style="${g.fId}">${g.teamName}</span>
        <span style="font-size:9px; font-weight:900; color:${typeColor}; text-transform:uppercase; margin-top:2px;">${g.txType} ${g.isCommish ? '<span style="color:var(--text-dim);">(Commish)</span>' : ''}</span>
    </div>
`}
                </div>
                <span style="font-size:9px; font-weight:800; color:var(--text-dim); text-align:right; max-width:80px; line-height:1.3;">${latestTimestamp}</span>
            </div>
           <div style="display:flex; gap:8px; margin-top:8px; align-items:stretch;">
                ${addedHtml ? `<div style="flex:1; display:flex; flex-direction:column; gap:4px; min-width:0;">${addedHtml}</div>` : ''}
                ${addedHtml && droppedHtml ? '<div style="width:1px; background:rgba(255,255,255,0.08); flex-shrink:0;"></div>' : ''}
                ${droppedHtml ? `<div style="flex:1; display:flex; flex-direction:column; gap:4px; min-width:0;">${droppedHtml}</div>` : ''}
            </div>
            ${genericHtml ? `<div style="margin-top:8px;">${genericHtml}</div>` : ''}
        </div>` });

});
if (resignEvents.length > 0) {
            resignEvents.forEach(r => {
                const logoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${r.fId}.png`;
                const teamName = leagueFranchises[r.fId] || r.fId;
                const salM = (r.amount / 1000000).toFixed(1);

                // Try to parse "LastName, FirstName TEAM POS" format
                let playerName = r.explanation;
                let playerPos = '';
                let playerTeam = 'NFL';
                let playerPid = null;


const resignMatch = r.explanation.replace(/[\u2018\u2019\u02bc]/g, "'").match(/^(.+?) re-signed: \$(.+?)\/yr - (\d+)yrs - (\d+)%guar - pid:(\d+)/);
console.log('resignMatch:', resignMatch, 'explanation:', r.explanation);                // Format: "LastName, FirstName TEAM POS"
                const mflNameMatch = r.explanation.match(/^(.+),\s*(.+?)\s+([A-Z]{2,3})\s+([A-Z]{1,3})$/);
                if (resignMatch) {
                    playerName = resignMatch[1];
                } else if (mflNameMatch) {
                    playerName = `${mflNameMatch[2]} ${mflNameMatch[1]}`;
                    playerTeam = mflNameMatch[3];
                    playerPos = mflNameMatch[4];
                }
                const teamMatch = r.explanation.match(/team:([A-Z]+)/i);
                const posMatch = r.explanation.match(/pos:([A-Z]+)/i);
                if (teamMatch) playerTeam = teamMatch[1];
                if (posMatch) playerPos = posMatch[1];

const dateShort = (r.dateText || '').replace(/:\d{2}\s+ET\s+\d{4}/i, '').trim() || 'Recent';const contractMatch = r.explanation.match(/re-signed: \$(.+?)\/yr - (\d+)yrs - (\d+)%guar/);
 const contractSal = contractMatch ? contractMatch[1] : salM;
                const contractYrs = contractMatch ? contractMatch[2] : '?';
                const contractGuar = contractMatch ? contractMatch[3] : '?';
const resignPid = resignMatch ? resignMatch[5] : null;
resignEntries.push({ dateObj: r.dateObj, html: `
                    <div class="tx-card" data-tx-type="resign" style="margin-bottom:12px;background:rgba(255,255,255,0.02); border:1px solid var(--card-border); border-radius:8px; padding:12px; box-shadow:0 4px 6px rgba(0,0,0,0.2);">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:8px;">
                            <div style="display:flex; align-items:center; gap:10px;">
<img src="${logoUrl}" onerror="this.src='https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/NFL.svg'" class="team-popup-trigger" data-fid="${r.fId}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border:1.5px solid rgba(255,255,255,0.1); background:#000; cursor:pointer;">
                                <div style="display:flex; flex-direction:column;">
                                    <span style="font-size:13px; font-weight:800; color:#fff;">${teamName}</span>
                                    <span style="font-size:9px; font-weight:900; color:#22c55e; text-transform:uppercase; margin-top:2px;">Re-Signed</span>
                                </div>
                            </div>
                            <span style="font-size:9px; font-weight:800; color:var(--text-dim); text-align:right; max-width:80px; line-height:1.3;">${dateShort}</span>
                        </div>
<div style="display:flex; gap:8px; margin-top:10px; align-items:center;">
                            <div style="display:flex; flex-direction:column; align-items:center; gap:4px; width:56px; flex-shrink:0;">
                                <div class="player-modal-trigger" data-pid="${resignPid}" data-team="${playerTeam}" style="width:44px; height:44px; border-radius:50%; overflow:hidden; border:2px solid rgba(34,197,94,0.3); background:var(--card-bg); cursor:pointer;">
<img src="${resignPid ? `https://www.mflscripts.com/playerImages_80x107/mfl_${resignPid}.png` : ''}" onerror="this.style.opacity='0'" style="width:100%; height:100%; object-fit:cover;">                                </div>
                                <div style="display:flex; align-items:center; gap:3px;">
                                    <img src="${getNFLLogoUrl(playerTeam)}" style="width:10px; height:10px; object-fit:contain;">
                                   ${playerPos ? `<span class="pos-text-${playerPos.toLowerCase()}" style="font-size:6px; font-weight:900;">${playerPos}</span>` : ''}
                                </div>
                            </div>
                            <div style="flex:1; min-width:0;">
                                <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px; flex-wrap:wrap;">
                                    <span style="font-size:13px; font-weight:900; color:#fff;">${playerName}</span>
                                    ${playerPos ? `<span class="pos-text-${playerPos.toLowerCase()}" style="font-size:9px; font-weight:900;">${playerPos}</span>` : ''}
                                </div>
                                <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap;">
                                    <span style="font-size:11px; font-weight:900; color:#22c55e;">$${contractSal}/yr</span>
                                    <span style="font-size:10px; color:var(--accent-blue); font-weight:800;">${contractYrs} yrs</span>
                                    <span style="font-size:10px; color:var(--text-dim); font-weight:800;">${contractGuar}% guar</span>
                                </div>
                            </div>
                        </div>
</div>` });
            });
            uniqueTxTypes.add('Resign');
        }
const allDatedEntries = [...auctionEntries, ...resignEntries, ...txEntries];
allDatedEntries.sort((a, b) => (b.dateObj ? b.dateObj.getTime() : 0) - (a.dateObj ? a.dateObj.getTime() : 0));
txCardsHtml = allDatedEntries.map(e => e.html).join('');
txCardsHtml = tradeBlockHtml + txCardsHtml;
let filterHtml = `
            <div style="position: relative; margin-bottom: 15px;">
                <div id="tx-filter-scroll" class="tx-filter-bar hide-scroll" style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 10px; padding-right: 24px; border-bottom: 1px solid rgba(255,255,255,0.05); touch-action: pan-x; -webkit-overflow-scrolling: touch;">
                    <button class="tx-filter-btn active" data-filter="all" style="padding: 6px 12px; border-radius: 6px; font-size: 10px; font-weight: 900; text-transform: uppercase; border: 1px solid var(--accent-blue); background: var(--accent-blue); color: #fff; cursor: pointer; flex-shrink: 0; transition: 0.2s;">All</button>
        `;

        Array.from(uniqueTxTypes).sort().forEach(type => {
            const safeTypeAttr = type.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            filterHtml += `<button class="tx-filter-btn" data-filter="${safeTypeAttr}" style="padding: 6px 12px; border-radius: 6px; font-size: 10px; font-weight: 900; text-transform: uppercase; border: 1px solid var(--card-border); background: rgba(255,255,255,0.05); color: var(--text-dim); cursor: pointer; flex-shrink: 0; transition: 0.2s;">${type}</button>`;
        });
        filterHtml += `</div>
                <div style="position: absolute; top: 0; right: 0; bottom: 10px; width: 24px; background: linear-gradient(to right, transparent, var(--page-bg)); pointer-events: none;"></div>
            </div>`;
        
const finalTxHtml = `
            <div class="transactions-dashboard" style="padding: 10px;">
                ${filterHtml}
                <div id="tx-cards-container">
                    ${txCardsHtml}
                </div>
            </div>
        `;
window._txCache = finalTxHtml;
container.html(finalTxHtml);
reapplyAllTeamStyles();


        // Resolve resign player headshots by name lookup
$('.resign-player-img').each(async function() {
            const name = $(this).data('name');
            if (!name) return;
            const img = this;
            try {
                // Use last name only for better search results
const nameParts = name.split(' ');
                const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : name;
                const searchName = lastName.replace(/[^a-zA-Z]/g, ''); // strip special chars like apostrophes
                const res = await fetch(`https://www45.myfantasyleague.com/${year}/player_search?L=${lid}&NAME=${encodeURIComponent(searchName)}`, { credentials: 'include' });
                const html = await res.text();
                const doc = new DOMParser().parseFromString(html, 'text/html');
                // Find the row whose player name most closely matches
                let bestPid = null;
                doc.querySelectorAll('table.report tr.oddtablerow a, table.report tr.eventablerow a').forEach(a => {
                    if (bestPid) return;
                    const rowName = a.textContent.trim().toLowerCase();
                    if (rowName.includes(lastName.toLowerCase())) {
                        const pidMatch = a.getAttribute('href').match(/\d+/g);
                        if (pidMatch) bestPid = pidMatch.pop();
                    }
                });
                if (bestPid) img.src = `https://www.mflscripts.com/playerImages_80x107/mfl_${bestPid}.png`;
            } catch(e) {}
        });

    } catch (err) {
        console.error("Transactions Fetch Error:", err);
        container.html('<div class="error" style="text-align:center; color:#ef4444; margin-top:20px;">Failed to load transactions.</div>');
    }
}
async function loadLeagueSchedule(targetWeek = null) {
        const container = $('#league-content-container');

        if (window._scheduleCache && !targetWeek) {
            container.html(window._scheduleCache.html);
            return;
        }
        
        if ($('.schedule-dashboard').length === 0) {
            container.html('<div style="text-align:center; padding: 40px; color: var(--accent-blue); font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; animation: pulse-blue 1.5s infinite;">Loading Matchups...</div>');
        } else {
            $('#matchups-list-container').html('<div style="text-align:center; padding: 40px; color: var(--text-dim); font-weight: 800; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; animation: pulse-blue 1.5s infinite;">Fetching Week...</div>');
        }
        
        try {
            let fetchUrl = `https://www45.myfantasyleague.com/${year}/weekly?L=${lid}`;
            if (targetWeek) fetchUrl += `&W=${targetWeek}`;

            const res = await fetch(fetchUrl, { cache: 'no-store' });
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');

            const summaryTable = doc.querySelector('table.h2hmatchups.scoresummary');
            if (!summaryTable) {
                container.html('<div style="text-align:center; padding: 20px; color: var(--text-dim);">Matchups not available.</div>');
                return;
            }

            const caption = summaryTable.querySelector('caption span')?.textContent || "Current Week Matchups";
            const weekMatch = caption.match(/Week\s+(\d+)/i);
            const activeWeek = weekMatch ? parseInt(weekMatch[1], 10) : (targetWeek || 1);

            // --- 1. PARSE THE SCORE SUMMARY ---
            const rows = summaryTable.querySelectorAll('tr.oddtablerow, tr.eventablerow');
            let matchups = [];
            let currentMatchup = [];

            rows.forEach(row => {
                const firstTd = row.querySelector('td');
                if (!firstTd || firstTd.textContent.includes('Median Score')) return; 

                const fLink = row.querySelector('a[class*="franchise_"]');
                if (!fLink) return;

                const fIdMatch = fLink.getAttribute('class').match(/franchise_(\d+)/);
                const fId = fIdMatch ? fIdMatch[1] : null;
                
                const img = fLink.querySelector('img.franchiseicon');
                const teamName = img ? img.getAttribute('alt') : fLink.textContent.trim();
                const teamLogo = img ? img.getAttribute('src') : `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${fId}.png`;
                
                const scoreCell = row.querySelector('td.points');
                const score = scoreCell ? scoreCell.textContent.trim() : "0.00";

                currentMatchup.push({ fId, teamName, teamLogo, score });

                if (currentMatchup.length === 2) {
                    matchups.push([...currentMatchup]);
                    currentMatchup = [];
                }
            });

// --- 2. PARSE THE LINEUP TABLES ---
            let lineupsByFid = {};
            try {
                // Find all the individual team layout blocks
                const teamBlocks = doc.querySelectorAll('td.two_column_layout');
                
teamBlocks.forEach(block => {
                    // Find the franchise ID for this specific block
                    const fLink = block.querySelector('caption a[class*="franchise_"]');
                    if (!fLink) return;
                    
                    const fIdMatch = fLink.getAttribute('class').match(/franchise_(\d+)/);
                    if (!fIdMatch) return;
                    const fidStr = fIdMatch[1];
                    
                    // NEW: Prevent Double-Parsing during Double Headers
                    if (lineupsByFid[fidStr]) return;
                    
                    lineupsByFid[fidStr] = [];
                    
                    // Parse the rows inside this team's block
                    let isBench = false;
                    const blockRows = block.querySelectorAll('tr');
                    
blockRows.forEach(row => {
                        if (row.textContent.includes('Non-Starters') || row.textContent.includes('Bench')) {
                            isBench = true;
                        }
                        if (isBench) return;
                        
                        const pLink = row.querySelector('td.player a[class*="position_"]');
                        const ptsCell = row.querySelector('td.points');
                        
                        if (pLink && ptsCell && ptsCell.textContent.trim() !== '') {
                            const parsed = parseMFLName(pLink.textContent);
                            let pts = ptsCell.textContent.trim();
                            if (pts === '-') pts = '0.00'; 
                            
                            // NEW: Extract PID for the headshot
                            const pidMatch = pLink.getAttribute('href').match(/\d+/g);
                            const pid = pidMatch ? pidMatch.pop() : "0000";
                            
                            lineupsByFid[fidStr].push({ 
                                pid: pid,
                                name: parsed.shortName, 
                                pos: parsed.pos, 
                                team: parsed.team,
                                pts: pts 
                            });
                        }
                    });
                });
            } catch (err) {
                console.warn("Could not parse detailed lineups.", err);
            }

// --- 3. BUILD THE UI ---
            let weekPills = '';
            for (let i = 1; i <= 18; i++) {
                const isActive = (i === activeWeek);
                const bg = isActive ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)';
                const color = isActive ? '#fff' : 'var(--text-dim)';
                const border = isActive ? '1px solid var(--accent-blue)' : '1px solid var(--card-border)';
                // Tightened up padding, added line-height: 1 to prevent global font stretching
                weekPills += `<div class="schedule-week-pill" data-week="${i}" style="flex: 0 0 auto; padding: 4px 10px; text-align: center; background: ${bg}; color: ${color}; border: ${border}; border-radius: 6px; font-size: 10px; font-weight: 900; line-height: 1; cursor: pointer; transition: all 0.2s ease; box-sizing: border-box;">W${i}</div>`;
            }

            const numTeams = Object.keys(leagueFranchises).length || 10;
            const expectedMatchups = Math.floor(numTeams / 2);
            const isDoubleHeader = matchups.length > expectedMatchups && matchups.length > 0;
            let doubleHeaderBadge = '';
            
            if (isDoubleHeader) {
                doubleHeaderBadge = `
                    <div style="margin-bottom: 8px;">
                        <span style="background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); color: #fff; padding: 3px 8px; border-radius: 4px; font-weight: 900; font-size: 9px; text-transform: uppercase; letter-spacing: 1px;">🔥 Double Header Week</span>
                    </div>
                `;
            }

            // Shrink overall container paddings to reclaim vertical space
            let scheduleHtml = `<div class="schedule-dashboard" style="padding: 5px;">`;
            scheduleHtml += `
                <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--card-border); border-radius: 8px; padding: 8px 10px; margin-bottom: 10px; text-align: center;">
                    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; margin-bottom: ${doubleHeaderBadge ? '6px' : '8px'}; letter-spacing: 1px;">League Scoreboard</div>
                    ${doubleHeaderBadge}
                    <div class="hide-scroll" style="display: flex; gap: 6px; width: 100%; overflow-x: auto; align-items: center;">
                        ${weekPills}
                    </div>
                </div>
                <div id="matchups-list-container">
            `;

            // Setup buckets to catch Game 1 and Game 2
            let game1Html = '';
            let game2Html = '';
            let teamGameTracker = {};

            matchups.forEach((m, index) => {
                const t1 = m[0];
                const t2 = m[1];
                
                const s1 = parseFloat(t1.score);
                const s2 = parseFloat(t2.score);

                const isMe = (t1.fId === fid || t2.fId === fid);
                const highlightBorder = isMe ? 'border: 1px solid var(--accent-blue); box-shadow: 0 0 8px rgba(59,130,246,0.3);' : 'border: 1px solid var(--card-border); box-shadow: 0 4px 6px rgba(0,0,0,0.2);';

                const t1Weight = s1 > s2 ? '900' : '700';
                const t1Color = s1 > s2 ? '#22c55e' : (s1 < s2 ? 'var(--text-dim)' : '#fff');
                
                const t2Weight = s2 > s1 ? '900' : '700';
                const t2Color = s2 > s1 ? '#22c55e' : (s2 < s1 ? 'var(--text-dim)' : '#fff');

                let l1Html = '', l2Html = '';
                const l1 = lineupsByFid[t1.fId] || [];
                const l2 = lineupsByFid[t2.fId] || [];
                
                const maxStarters = Math.max(l1.length, l2.length);
                for (let i = 0; i < maxStarters; i++) {
                    const p1 = l1[i];
                    const p2 = l2[i];
                    
                    if (p1) {
                        l1Html += `
                            <div class="player-row pos-border-${p1.pos.toLowerCase()}" style="padding: 6px 4px; gap: 6px; margin-bottom: 4px; background: rgba(0,0,0,0.2); border-radius: 6px;">
                                <div class="player-img-wrapper" style="width: 28px !important; height: 28px !important; margin-right: 0 !important; border-width: 1.5px !important;">
                                    <div class="player-circle" style="width: 20px !important; height: 20px !important;"><img class="player-img" src="https://www.mflscripts.com/playerImages_80x107/mfl_${p1.pid}.png" onerror="this.style.display='none'"></div>
                                    <img class="team-logo-overlay" src="${getNFLLogoUrl(p1.team)}" onerror="this.style.display='none'" style="width: 12px !important; height: 12px !important; bottom: 0 !important; left: 0 !important;">
                                </div>
                                <div class="player-info" style="padding-left: 2px !important; flex: 1 1 0px !important; min-width: 0;">
                                    <div class="player-name-slot" style="font-size: 10px !important; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p1.name}</div>
                                    <div style="font-size: 8px; color: var(--accent-blue); font-weight: 900;">${p1.pos}</div>
                                </div>
                                <div class="player-right-slot" style="flex-shrink: 0; margin-left: auto;">
                                    <span style="font-size: 11px; font-weight: 900; color: ${p1.pts === '0.00' ? 'var(--text-dim)' : '#fff'};">${p1.pts}</span>
                                </div>
                            </div>`;
                    } else { l1Html += `<div style="height: 44px; margin-bottom: 4px;"></div>`; }
                    
                    if (p2) {
                        l2Html += `
                            <div class="player-row pos-border-${p2.pos.toLowerCase()}" style="padding: 6px 4px; gap: 6px; margin-bottom: 4px; background: rgba(0,0,0,0.2); border-radius: 6px; flex-direction: row-reverse; text-align: right;">
                                <div class="player-img-wrapper" style="width: 28px !important; height: 28px !important; margin-right: 0 !important; margin-left: 0 !important; border-width: 1.5px !important;">
                                    <div class="player-circle" style="width: 20px !important; height: 20px !important;"><img class="player-img" src="https://www.mflscripts.com/playerImages_80x107/mfl_${p2.pid}.png" onerror="this.style.display='none'"></div>
                                    <img class="team-logo-overlay" src="${getNFLLogoUrl(p2.team)}" onerror="this.style.display='none'" style="width: 12px !important; height: 12px !important; bottom: 0 !important; left: 0 !important;">
                                </div>
                                <div class="player-info" style="padding-right: 2px !important; padding-left: 0 !important; flex: 1 1 0px !important; min-width: 0;">
                                    <div class="player-name-slot" style="font-size: 10px !important; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p2.name}</div>
                                    <div style="font-size: 8px; color: var(--accent-blue); font-weight: 900;">${p2.pos}</div>
                                </div>
                                <div class="player-right-slot" style="flex-shrink: 0; margin-right: auto; margin-left: 0;">
                                    <span style="font-size: 11px; font-weight: 900; color: ${p2.pts === '0.00' ? 'var(--text-dim)' : '#fff'};">${p2.pts}</span>
                                </div>
                            </div>`;
                    } else { l2Html += `<div style="height: 44px; margin-bottom: 4px;"></div>`; }
                }

                const noLineupMsg = maxStarters === 0 ? '<div style="text-align:center; padding:10px; color:var(--text-dim); width:100%; font-size:10px;">Lineups not available</div>' : '';

                // Build the individual card HTML
                let cardHtml = `
                    <div class="matchup-card-wrapper" style="margin-bottom: 12px; background: rgba(255,255,255,0.02); ${highlightBorder} border-radius: 8px; overflow: hidden;">
                        <div style="display: flex; justify-content: space-between; align-items: stretch; padding: 12px 10px;">
                            <div style="display: flex; flex-direction: column; align-items: center; width: 35%; text-align: center;">
<div class="team-popup-trigger" data-fid="${t1.fId}" style="cursor:pointer;">${buildLogoWithTrophy(t1.fId, 36)}</div>
                                <span style="font-size: 10px; font-weight: 800; color: #fff; line-height: 1.2;">${t1.teamName}</span>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 30%;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 16px; font-weight: ${t1Weight}; color: ${t1Color};">${t1.score}</span>
                                    <span style="font-size: 12px; color: var(--text-dim);">—</span>
                                    <span style="font-size: 16px; font-weight: ${t2Weight}; color: ${t2Color};">${t2.score}</span>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; width: 35%; text-align: center;">
                                <img src="${t2.teamLogo}" onerror="this.src='https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/NFL.svg'" class="team-popup-trigger" data-fid="${t2.fId}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; background: var(--card-bg); border: 1.5px solid rgba(255,255,255,0.1); margin-bottom: 6px; cursor:pointer;">
                                <span style="font-size: 10px; font-weight: 800; color: #fff; line-height: 1.2;">${t2.teamName}</span>
                            </div>
                        </div>
                        <div class="matchup-drawer-trigger" style="text-align: center; padding: 6px; background: rgba(0,0,0,0.15); border-top: 1px solid var(--card-border); cursor: pointer;">
                            <span class="drawer-icon" style="font-size: 10px; color: var(--text-dim); transition: transform 0.2s; display: inline-block;">▼</span>
                        </div>
                        <div class="matchup-lineup-drawer" style="display: none; padding: 10px; background: rgba(0,0,0,0.3); border-top: 1px solid var(--card-border);">
                            <div style="display: flex; justify-content: space-between; gap: 15px;">
                                <div style="width: 50%;">${l1Html}</div>
                                <div style="width: 50%;">${l2Html}</div>
                                ${noLineupMsg}
                            </div>
                        </div>
                    </div>
                `;

// Tally the games for BOTH teams and sort into the correct bucket
                const t1Games = teamGameTracker[t1.fId] || 0;
                const t2Games = teamGameTracker[t2.fId] || 0;

                // If EITHER team has already played a game, this matchup belongs in Game 2
                if (isDoubleHeader && (t1Games >= 1 || t2Games >= 1)) {
                    game2Html += cardHtml;
                    teamGameTracker[t1.fId] = 2;
                    teamGameTracker[t2.fId] = 2;
                } else {
                    game1Html += cardHtml;
                    teamGameTracker[t1.fId] = 1;
                    teamGameTracker[t2.fId] = 1;
                }
            });

            // Inject dividers if it's a Double Header
            if (isDoubleHeader) {
                scheduleHtml += `
                    <div style="font-size: 11px; font-weight: 900; color: var(--text-dim); text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--card-border); padding-bottom: 6px; margin: 5px 0 15px; text-align: center;">Game 1</div>
                    ${game1Html}
                    <div style="font-size: 11px; font-weight: 900; color: var(--text-dim); text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--card-border); padding-bottom: 6px; margin: 25px 0 15px; text-align: center;">Game 2</div>
                    ${game2Html}
                `;
            } else {
                scheduleHtml += game1Html;
            }

scheduleHtml += `</div></div>`;
window._scheduleCache = { html: scheduleHtml, week: activeWeek };
container.html(scheduleHtml);
            
        } catch (err) {
            console.error("Matchup Fetch Error:", err);
            container.html('<div class="error" style="text-align:center; color:#ef4444; margin-top:20px;">Failed to load scoreboard.</div>');
        }
    }
    // --- LEAGUE STANDINGS FETCHER ---
async function loadLeagueStandings() {
    const container = $('#league-content-container');
    if (window._standingsCache) {
        container.html(window._standingsCache);
        reapplyAllTeamStyles();
        return;
    }
    container.html('<div class="loading-text" style="text-align:center; margin-top:20px; color:var(--text-dim);">Loading Leaderboard...</div>');
        try {
            const res = await fetch(`https://www45.myfantasyleague.com/${year}/standings?L=${lid}`, { credentials: 'include' });
            const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
const rows = Array.from(doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow'));
        
        // Populate rookiePids from FA page
        doc.querySelectorAll('td.player').forEach(td => {
            if (td.textContent.includes('(R)')) {
                const pid = td.querySelector('a')?.getAttribute('href').match(/\d+/g)?.pop();
                if (pid) rookiePids.add(pid);
            }
        });
            let standingsHtml = `<div class="standings-dashboard"><div class="standings-header-row"><span>#</span><span>Team</span><span class="align-center">Record</span><span class="align-center">Points</span></div><div class="standings-list">`;

            if (rows.length === 0) standingsHtml += `<div style="text-align:center; padding: 20px; color: var(--text-dim);">No standings data found.</div>`;

            rows.forEach((row, index) => {
                const teamLink = row.querySelector('td.fname a');
                if (!teamLink) return; 

const teamImg = row.querySelector('img.franchiseicon');
const teamName = teamImg ? teamImg.getAttribute('alt') : teamLink.textContent.trim();
const teamIdMatch2 = teamLink.getAttribute('href').match(/F=(\d+)/i);
const teamFid2 = teamIdMatch2 ? teamIdMatch2[1].padStart(4,'0') : null;
const teamIcon = teamFid2 ? getFranchiseLogoUrl(teamFid2) : 'https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/NFL.svg';
                
                const recordTd = row.querySelector('td.h2hwlt');
                const pctTd = row.querySelector('td.h2hpct');
                const streakTd = row.querySelector('td.strk');
                const pfTd = row.querySelector('td.pf');
                const paTd = row.querySelector('td.pa');
                
                const record = recordTd ? recordTd.textContent.trim() : '0-0-0';
                const pct = pctTd ? pctTd.textContent.trim() : '.000';
                const streak = streakTd ? streakTd.textContent.trim() : '-';
                const pf = pfTd ? pfTd.textContent.trim() : '0';
                const pa = paTd ? paTd.textContent.trim() : '0';

                const teamIdMatch = teamLink.getAttribute('href').match(/F=(\d+)/i);
                const teamId = teamIdMatch ? teamIdMatch[1] : null;
const isMyTeam = (teamId === fid) ? 'my-team-row' : '';
if (teamId === fid) window._myRecord = record;                const streakClass = streak.includes('W') ? 'streak-w' : streak.includes('L') ? 'streak-l' : 'streak-t';

                standingsHtml += `
                    <div class="standings-card ${isMyTeam}">
                        <div class="sc-seed">${index + 1}</div>
                        <div class="sc-team">
                           <div class="team-popup-trigger" data-fid="${teamId}" style="cursor:pointer;">${buildLogoWithTrophy(teamFid2, 34)}</div>
                            <div class="sc-team-info">
<span class="sc-name" data-team-style="${teamId?.padStart(4,'0') || ''}" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;  display:block;">${teamName}</span>
                                <span class="sc-streak ${streakClass}">Streak: ${streak}</span>
                            </div>
                        </div>
                        <div class="sc-stacked-data">
                            <span class="sc-primary-stat">${record}</span>
                            <span class="sc-secondary-stat">${pct.replace('0.', '.')} %</span>
                        </div>
                        <div class="sc-stacked-data">
                            <span class="sc-primary-stat pf-text">${pf}</span>
                            <span class="sc-secondary-stat pa-text">${pa}</span>
                        </div>
                    </div>
                `;
            });
const finalHtml = standingsHtml + '</div></div>';
window._standingsCache = finalHtml;
container.html(finalHtml);
reapplyAllTeamStyles();

        } catch (err) {
            console.error("Standings Error:", err);
            container.html('<div class="error" style="text-align:center; color:#ef4444; margin-top:20px;">Failed to load standings.</div>');
        }
    }
// Fetch previous year standings for offseason record display
fetch(`https://www45.myfantasyleague.com/${parseInt(year) - 1}/standings?L=${lid}`, { credentials: 'include' })
    .then(r => r.text())
    .then(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        window._allPrevRecords = {};
        doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
            const teamLink = row.querySelector('td.fname a');
            if (!teamLink) return;
            const fidMatch = teamLink.getAttribute('href')?.match(/F=(\d+)/i);
            if (!fidMatch) return;
            const rowFid = fidMatch[1].padStart(4,'0');
            window._allPrevRecords[rowFid] = row.querySelector('td.h2hwlt')?.textContent.trim() || '';
        });
    }).catch(e => console.warn('Prev year standings fetch failed', e));
window.openMainTab = function(evt, tabId) {
        // Clear draft poll and clock when leaving draft tab
        if (tabId !== 'tab-draft') {
            if (window._draftPollInterval) { clearInterval(window._draftPollInterval); window._draftPollInterval = null; }
            if (window._draftClockTick) { clearInterval(window._draftClockTick); window._draftClockTick = null; }
        }
        // Clear live-score polling when leaving the scores tab
        if (tabId !== 'tab-scores' && tabId !== 'tab-scoreboard') {
            if (window._liveScoreInterval) { clearInterval(window._liveScoreInterval); window._liveScoreInterval = null; }
        }
        // Switch button states
        $('.tab-btn').removeClass('active');
        $(evt.currentTarget).addClass('active');

        // Switch visibility immediately (No Opacity Fade)
        $('.tab-content').hide().removeClass('active');
        $('#' + tabId).show().addClass('active');

        // Handle Sub-Tab logic
        $('.sub-tabs-group').removeClass('active');
        const subgroupId = tabId.replace('tab-', 'subtabs-');
        
        if ($('#' + subgroupId).length) {
            $('#' + subgroupId).addClass('active');
            $('.sub-tabs-container').show();
        } else {
            $('.sub-tabs-container').hide();
        }

        // Load data immediately
        if (tabId === 'tab-team') { 
window._teamDataDirty = true;
            loadTeamData(); 
        } else if (tabId === 'tab-league') { 
            loadLeagueStandings(); 
} else if (tabId === 'tab-players') {
            const activeBtn = $('#subtabs-players .sub-tab-btn.active');
            let subId = activeBtn.length ? activeBtn.text().trim().toLowerCase().replace(' ', '-') : 'free-agents';
            loadPlayersData(subId);
} else if (tabId === 'tab-draft') {
            loadDraftData();
} else if (tabId === 'tab-rules') {
    loadRulesContent();
} else if (tabId === 'tab-scoreboard') {
    loadLiveScores();
}
        // Reset scroll position instantly

        // Update header area based on tab
        const headerArea = $('#tab-header-area');
        if (tabId === 'tab-team') {
            headerArea.show();
applyTeamTheme(fid, true);
            $('#active-team-switcher-btn').show();
            $('#tab-header-custom').remove();
} else {
            applyTeamTheme(fid, false);
            $('#active-team-switcher-btn').hide();
            $('#tab-header-custom').remove();
if (tabId === 'tab-players') {
                let faCountdownHtml = '';
                if (window._calendarEvents) {
                    const auctionEvent = window._calendarEvents.find(ev => ev.cls.includes('auction') || ev.cls.includes('free') || ev.cls.includes('waiver'));
                    if (auctionEvent) {
                        const diffMs = auctionEvent.date - new Date();
                        if (diffMs > 0) {
                            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                            const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            faCountdownHtml = diffDays > 0 ? `Auctions open in ${diffDays}d ${diffHrs}h` : `Auctions open in ${diffHrs}h`;
                        }
                    }
                }
                customHtml = faCountdownHtml ? `<div id="tab-header-custom" style="padding:10px 15px; background:rgba(255,255,255,0.03); border:1px solid var(--card-border); border-bottom:none; border-radius:12px 12px 0 0; display:flex; align-items:center; justify-content:space-between;"><div><div style="font-size:11px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px;">Free Agency</div><div style="font-size:13px; font-weight:900; color:#fff; margin-top:2px;">${faCountdownHtml}</div></div><i class="fas fa-clipboard-list" style="font-size:18px; color:var(--accent-blue);"></i></div>` : '';
            } else if (tabId === 'tab-league') {
                customHtml = '';
 } else if (tabId === 'tab-draft') {
                const clockPick = localStorage.getItem(`draft_clock_${lid}`);

                let countdownHtml = '';
                if (!clockPick && window._calendarEvents) {
                    const draftEvent = window._calendarEvents.find(ev => ev.cls.includes('draft'));
                    if (draftEvent) {
                        const now = new Date();
                        const draftDate = draftEvent.date;
                        const diffMs = draftDate - now;
                        if (diffMs > 0) {
                            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                            const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            countdownHtml = diffDays > 0
                                ? `${diffDays}d ${diffHrs}h until draft`
                                : `${diffHrs}h until draft`;
                        } else {
                            countdownHtml = draftEvent.text;
                        }
                    }
                }

                customHtml = `<div id="tab-header-custom" style="padding:12px 15px; background:rgba(255,255,255,0.03); border:1px solid var(--card-border); border-bottom:none; border-radius:12px 12px 0 0; display:flex; align-items:center; justify-content:space-between;"><div><div style="font-size:11px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px;">Rookie Draft</div><div style="font-size:13px; font-weight:900; color:#fff; margin-top:2px;">${clockPick ? `Pick ${clockPick} On The Clock` : countdownHtml || 'Draft Board'}</div></div><i class="fas fa-football" style="font-size:20px; color:var(--accent-blue);"></i></div>`;
} else if (tabId === 'tab-scores') {
    loadLiveScores();

} else if (tabId === 'tab-fa') {
                let faCountdownHtml = 'Offseason Mode';
                if (window._calendarEvents) {
                    const auctionEvent = window._calendarEvents.find(ev => ev.cls.includes('auction') || ev.cls.includes('free') || ev.cls.includes('waiver'));
                    if (auctionEvent) {
                        const diffMs = auctionEvent.date - new Date();
                        if (diffMs > 0) {
                            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                            const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            faCountdownHtml = diffDays > 0 ? `Auctions open in ${diffDays}d ${diffHrs}h` : `Auctions open in ${diffHrs}h`;
                        } else {
                            faCountdownHtml = auctionEvent.text;
                        }
                    }
                }
                customHtml = `<div id="tab-header-custom" style="padding:12px 15px; background:rgba(255,255,255,0.03); border:1px solid var(--card-border); border-bottom:none; border-radius:12px 12px 0 0; display:flex; align-items:center; justify-content:space-between;"><div><div style="font-size:11px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px;">Free Agency</div><div style="font-size:13px; font-weight:900; color:#fff; margin-top:2px;">${faCountdownHtml}</div></div><i class="fas fa-clipboard-list" style="font-size:20px; color:var(--accent-blue);"></i></div>`;
            }
            if (customHtml) headerArea.prepend(customHtml);
        }

        // Reset scroll position instantly
        window.scrollTo(0, 0);
    };


window.openPlayersSubTab = function(evt, subTabId) {
        $('#subtabs-players .sub-tab-btn').removeClass('active');
        $(evt.currentTarget).addClass('active');
        loadPlayersData(subTabId);
    };

window.openSubTab = function(evt, subTabId) { 
        $('#subtabs-team .sub-tab-btn').removeClass('active'); 
        $(evt.currentTarget).addClass('active'); 
        
        // Remove the 0.4 opacity/gray-out logic
        // Just inject a clean, static loader
        const tabName = $(evt.currentTarget).text().trim();
        $('#player-rows-container').html(`<div class="loading-indicator">Loading ${tabName}...</div>`);

        if (subTabId === 'stats' || subTabId === 'schedule') {
            $('#player-rows-container').html(`<div style="text-align:center; padding:60px 20px; color:var(--text-dim); font-weight:800; text-transform:uppercase;">${tabName} module coming soon...</div>`);
            return;
        }
window._teamDataDirty = true;
        loadTeamData(); 
    };
    window.openLeagueSubTab = function(evt, subTabId) {
        $('#subtabs-league .sub-tab-btn').removeClass('active');
        $(evt.currentTarget).addClass('active');
        switch(subTabId) {
            case 'standings': loadLeagueStandings(); break;
case 'league-schedule': loadLeagueSchedule(); break;
case 'transactions': loadLeagueTransactions(); break;            case 'league-stats': $('#league-content-container').html('<div class="loading-text" style="text-align:center; margin-top:20px; color:var(--text-dim);">League Stats coming soon...</div>'); break;case 'trades': loadTradeHub(); break;
        }
    };
async function loadTradeHub(targetFid = null, targetPid = null) {
    const container = $('#league-content-container').html('<div style="text-align:center; padding: 40px; color: var(--accent-blue); font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; animation: pulse-blue 1.5s infinite;">Loading Trade Hub...</div>');

    try {
        // Fetch pending proposals
        const propRes = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=pendingTrades&L=${lid}&JSON=1`, { credentials: 'include' });
        const propData = await propRes.json();
        const pendingTrades = propData?.pendingTrades?.pendingTrade || [];
        const pendingList = Array.isArray(pendingTrades) ? pendingTrades : [pendingTrades];

        // Fetch trade block
const tbRes = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=tradeBait&L=${lid}&INCLUDE_DRAFT_PICKS=1&JSON=1`, { credentials: 'include' });        const tbData = await tbRes.json();
        const tradeBaits = tbData?.tradeBaits?.tradeBait || [];
        const baitList = Array.isArray(tradeBaits) ? tradeBaits : [tradeBaits];

        // Fetch my roster for the propose section
const rosterRes = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=${myFid}`, { credentials: 'include' });
        const rosterDoc = new DOMParser().parseFromString(await rosterRes.text(), 'text/html');
        const myPlayers = [];
        rosterDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
            const pLink = row.querySelector('td.player a[class*="position_"]');
            if (!pLink) return;
            const pid = pLink.getAttribute('href').match(/\d+/g)?.pop();
            const { name, shortName, pos, team } = parseMFLName(pLink.textContent);
            const salary = row.querySelector('td.salary')?.textContent.trim() || '';
            const years = row.querySelector('td.contractyear')?.textContent.trim() || '';
            const guar = row.querySelector('td.contractinfo')?.textContent.trim() || '';
            myPlayers.push({ pid, name, shortName, pos, team, salary, years, guar });
        });
// Add my draft picks as tradeable assets
if (window.currentTeamPicks) {
            window.currentTeamPicks.forEach(pick => {
                myPlayers.push({
                    pid: `pick_${pick.year}_${pick.round}`,
                    name: pick.desc || `${pick.year} Round ${pick.round}`,
                    shortName: `${pick.year} R${pick.round}`,
                    pos: 'PK',
                    team: 'PICK',
                    salary: '',
                    years: '',
                    guar: '',
                    isPick: true,
                    pickYear: pick.year,
                    pickRound: pick.round,
                    pickStr: pick.pickStr || '',
                    desc: pick.desc || ''
                });
            });
        }

        // Default target franchise
        let activeFid = targetFid || Object.keys(leagueFranchises).find(id => id !== myFid) || '';

        // Fetch target roster
async function fetchTargetRoster(tFid) {
    const res = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=${tFid}`, { credentials: 'include' });
    const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
    const players = [];
    doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
        const pLink = row.querySelector('td.player a[class*="position_"]');
        if (!pLink) return;
        const pid = pLink.getAttribute('href').match(/\d+/g)?.pop();
        const { name, shortName, pos, team } = parseMFLName(pLink.textContent);
        const salary = row.querySelector('td.salary')?.textContent.trim() || '';
        const years = row.querySelector('td.contractyear')?.textContent.trim() || '';
        const guar = row.querySelector('td.contractinfo')?.textContent.trim() || '';
        players.push({ pid, name, shortName, pos, team, salary, years, guar });
    });
    return players;
}

let theirPlayers = await fetchTargetRoster(activeFid);
        const theirPicks = await fetchTargetPicks(activeFid);
        theirPicks.forEach(pick => {
            theirPlayers.push({
                pid: `pick_${pick.year}_${pick.round}_${activeFid}`,
                name: pick.desc || `${pick.year} Round ${pick.round}`,
                shortName: `${pick.year} R${pick.round}`,
                pos: 'PK',
                team: 'PICK',
                salary: '',
                years: '',
                guar: '',
                isPick: true,
                pickYear: pick.year,
                pickRound: pick.round,
                pickStr: pick.pickStr || ''
            });
        });
let theirCapUsed = 0;
try {
    const theirCapDoc = new DOMParser().parseFromString(await (await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=${activeFid}`, { credentials: 'include' })).text(), 'text/html');
    theirCapDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
        theirCapUsed += parseFloat(row.querySelector('td.salary')?.textContent.replace(/[^0-9.]/g, '')) || 0;
    });
    theirCapUsed = parseFloat(theirCapUsed.toFixed(1));
} catch(e) {}

        // Track selected assets
        let mySelected = targetPid ? new Set([targetPid]) : new Set();
        let theirSelected = new Set();

function buildPlayerChip(p, selected, side) {
    const isSelected = selected.has(String(p.pid));
    const injHtml = p.isPick ? '' : getInjuryHtml(p.pid);
    const rStat = p.isPick ? '' : (irPids.has(String(p.pid)) ? "IR" : taxiPids.has(String(p.pid)) ? "TS" : "");
    const displayName = p.isPick ? (p.pickStr ? `Pick ${p.pickStr}` : `${p.pickYear} R${p.pickRound}`) : (p.shortName || p.name);

    const row1 = p.isPick ? `
        <span style="font-size:12px; font-weight:${isSelected?'900':'800'}; color:${isSelected?'#22c55e':'#fff'};">${displayName}</span>
        <span class="pos-pk" style="font-size:8px; font-weight:900; padding:1px 5px; border-radius:3px; color:#fff;">PK</span>
        ${p.desc && p.desc.includes('via') ? `<span style="font-size:8px; color:#f59e0b; font-weight:800;">via ${p.desc.match(/via (.+)\)/)?.[1] || ''}</span>` : ''}
        ${rStat ? `<span style="font-size:8px; font-weight:900; padding:1px 4px; border-radius:3px; color:#fff; background:rgba(0,0,0,0.3);">${rStat}</span>` : ''}
        ${injHtml}
    ` : `
        <span style="font-size:12px; font-weight:${isSelected?'900':'800'}; color:${isSelected?'#22c55e':'#fff'};">${displayName}</span>
       <span class="pos-text-${p.pos.toLowerCase()}" style="font-size:8px; font-weight:900;">${p.pos}</span>
        <div style="display:inline-flex; align-items:center; gap:4px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:1px 5px;">
            <img src="${getNFLLogoUrl(p.team)}" style="width:11px; height:11px; object-fit:contain;">
        </div>
        ${rStat ? `<span style="font-size:8px; font-weight:900; padding:1px 4px; border-radius:3px; color:#fff; background:rgba(0,0,0,0.3);">${rStat}</span>` : ''}
        ${injHtml}
    `;

    const row2 = !p.isPick && p.salary ? (() => {
        const sal = parseFloat(p.salary.replace(/[^0-9.]/g, '')) || 0;
        const yrs = parseInt(p.years) || 1;
        const gPct = parseFloat((p.guar || '0').replace(/[^0-9.]/g, '')) / 100 || 0;
        const capHit = (sal * gPct * yrs).toFixed(1);
        return `<div style="display:flex; align-items:center; gap:5px; margin-top:2px;">
            <span style="font-size:9px; font-weight:900; color:#22c55e;">${p.salary}</span>
            ${p.years ? `<span style="font-size:9px; color:var(--accent-blue); font-weight:800;">${p.years}yr</span>` : ''}
            ${p.guar ? `<span style="font-size:9px; color:var(--text-dim); font-weight:800;">${p.guar}</span>` : ''}
            <span style="font-size:9px; color:#ef4444; font-weight:800;">$${capHit}m hit</span>
        </div>`;
    })() : '';

    return `
        <div class="trade-chip player-modal-trigger" data-pid="${p.pid}" data-side="${side}"
            style="display:flex; align-items:center; gap:8px; padding:6px 8px; border-radius:8px; cursor:pointer; margin-bottom:3px;
            background:${isSelected ? 'rgba(16,185,129,0.12)' : 'rgba(0,0,0,0.2)'};
            border:1px solid ${isSelected ? 'rgba(16,185,129,0.4)' : 'var(--card-border)'};
            border-left:3px solid var(--pos-${p.isPick ? 'pk' : p.pos.toLowerCase()}, #3b82f6);
            transition:0.2s;">
            <div style="width:32px; height:32px; border-radius:50%; overflow:hidden; flex-shrink:0; background:${p.isPick ? 'rgba(245,158,11,0.1)' : 'var(--card-bg)'}; border:1px solid ${p.isPick ? 'rgba(245,158,11,0.3)' : 'transparent'}; display:flex; align-items:center; justify-content:center;">
                ${p.isPick 
                    ? `<span style="font-size:11px; font-weight:900; color:#f59e0b;">${p.pickRound}</span>`
                    : `<img src="https://www.mflscripts.com/playerImages_80x107/mfl_${p.pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">`
                }
            </div>
            <div style="flex:1; min-width:0;">
                <div style="display:flex; align-items:center; gap:4px; flex-wrap:wrap;">${row1}</div>
                ${row2}
            </div>
            <button class="trade-add-btn" data-pid="${p.pid}" data-side="${side}" 
                style="flex-shrink:0; width:26px; height:26px; border-radius:50%; border:1px solid ${isSelected ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.15)'}; background:${isSelected ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)'}; color:${isSelected ? '#22c55e' : 'var(--text-dim)'}; font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:0.2s;">
                ${isSelected ? '✓' : '+'}
            </button>
        </div>`;
}
async function fetchTargetPicks(tFid) {
    const picks = [];
    try {
        const [futureRes, currentRes] = await Promise.all([
            fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=100&SORT=YRF`, { credentials: 'include' }),
            fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=17`, { credentials: 'include' })
        ]);

// Future picks from O=100
// Future picks from O=100 — multiple tables, one per year
        const futureDoc = new DOMParser().parseFromString(await futureRes.text(), 'text/html');
        
        // Build reverse map: team name → fid
        const nameToFid = {};
        Object.entries(leagueFranchises).forEach(([fid, name]) => {
            nameToFid[name.trim().toLowerCase()] = fid;
        });

        // Each table has a caption like "Year 2027 Draft Picks"
        futureDoc.querySelectorAll('table.report').forEach(table => {
            const caption = table.querySelector('caption span')?.textContent || '';
            const yearMatch = caption.match(/Year (\d{4})/);
            if (!yearMatch) return;
            const pickYear = yearMatch[1];
            if (pickYear === year) return; // current year handled by O=17

            let currentRound = '';
            table.querySelectorAll('tr').forEach(row => {
                const tds = row.querySelectorAll('td');
                if (tds.length < 3) return;
                const roundText = tds[0].textContent.trim().replace(/\u00a0/g, '');
                if (roundText && /^\d+$/.test(roundText)) currentRound = roundText;
                if (!currentRound) return;

                const ownerName = tds[1].textContent.trim().replace(/\*/g, '').trim().toLowerCase();
                const origName = tds[2].textContent.trim().replace(/\*/g, '').trim().toLowerCase();
                const ownerFid = nameToFid[ownerName];
                const origFid = nameToFid[origName];

                if (!ownerFid || ownerFid !== tFid) return;

                let desc = `Round ${currentRound}`;
                if (origFid && origFid !== tFid) {
                    desc += ` (via ${leagueFranchises[origFid]})`;
                }
                picks.push({ year: pickYear, round: currentRound, desc });
            });
        });
        // Current year picks
        const currentDoc2 = new DOMParser().parseFromString(await currentRes.text(), 'text/html');
        currentDoc2.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
            const tds = row.querySelectorAll('td');
            if (tds.length >= 3) {
                const pickStr = tds[0].textContent.trim();
                if (/^\d+\.\d+$/.test(pickStr)) {
                    const fLink = tds[2].querySelector('a[class*="franchise_"]');
                    if (fLink) {
                        const match = fLink.getAttribute('class').match(/franchise_(\d+)/);
                        const ownerFid = match ? match[1].padStart(4, '0') : null;
                        if (ownerFid === tFid) {
                            const roundNum = pickStr.split('.')[0];
                            picks.push({ year: year, round: roundNum, pickStr, desc: `Pick ${pickStr}` });
                        }
                    }
                }
            }
        });
    } catch(e) { console.warn('Could not fetch target picks', e); }
    return picks;
}
function buildProposeSection(theirCapUsed = 0) {
    const teamOptions = Object.keys(leagueFranchises).filter(id => id !== myFid).map(id =>
        `<option value="${id}" ${id === activeFid ? 'selected' : ''}>${leagueFranchises[id]}</option>`
    ).join('');

    const myLogoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${myFid}.png`;
    const theirLogoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${activeFid}.png`;
    const myTeamName = leagueFranchises[myFid] || 'My Team';
    const theirTeamName = leagueFranchises[activeFid] || 'Their Team';

    const myCapUsed = (() => {
        if (!currentDoc) return 0;
        let total = 0;
        currentDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
            total += parseFloat(row.querySelector('td.salary')?.textContent.replace(/[^0-9.]/g, '')) || 0;
        });
        return parseFloat(total.toFixed(1));
    })();

const salaryCap = window.leagueSalaryCap || 823;
    const myCapPct = Math.min(100, (myCapUsed / salaryCap) * 100).toFixed(1);
    const myCapColor = myCapUsed > salaryCap ? '#ef4444' : myCapPct > 90 ? '#f59e0b' : '#22c55e';
    const theirCapPct = Math.min(100, (theirCapUsed / salaryCap) * 100).toFixed(1);
    const theirCapColor = theirCapUsed > salaryCap ? '#ef4444' : theirCapPct > 90 ? '#f59e0b' : '#22c55e';

    return `
        <div style="margin-bottom:16px;">
            

            <select id="trade-target-select" style="display:none;">${teamOptions}</select>

            <div id="trade-summary-bar" style="display:flex; gap:8px; margin-bottom:10px; padding:10px; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; min-height:44px; align-items:center;">
<div style="flex:1;">
                    <div style="font-size:8px; font-weight:900; color:#ef4444; text-transform:uppercase; margin-bottom:4px;">✓ Selected to Give</div>
                    <div id="trade-summary-mine" style="font-size:10px; color:var(--text-dim);">Tap + on your players</div>
                </div>
                <div style="font-size:16px; color:var(--text-dim);">⇄</div>
                <div style="flex:1; text-align:right;">
                    <div style="font-size:8px; font-weight:900; color:#22c55e; text-transform:uppercase; margin-bottom:4px;">✓ Selected to Get</div>
                    <div id="trade-summary-theirs" style="font-size:10px; color:var(--text-dim);">Tap + on their players</div>
                </div>
            </div>

            <div style="display:flex; gap:6px; margin-bottom:10px;">
<div id="trade-tab-mine" class="trade-roster-tab" data-tab="mine"
                    style="flex:1; padding:8px 10px; background:rgba(59,130,246,0.15); border:2px solid rgba(59,130,246,0.6); border-radius:8px; cursor:pointer; display:flex; flex-direction:column; gap:4px;">
                    <div style="font-size:7px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:2px;">You give ▾</div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        ${buildLogoWithTrophy(myFid, 24)}
                        <div style="flex:1; min-width:0;">
                            <div style="font-size:10px; font-weight:900; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${myTeamName}</div>
                        </div>
                        ${mySelected.size > 0 ? `<span style="font-size:9px; font-weight:900; color:#22c55e; background:rgba(34,197,94,0.15); border:1px solid rgba(34,197,94,0.3); border-radius:10px; padding:2px 6px;">${mySelected.size}</span>` : ''}
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span id="my-cap-label" data-base="${myCapUsed}" style="font-size:8px; font-weight:900; color:${myCapColor};">$${myCapUsed.toFixed(1)}m / $${salaryCap}m</span>
                    </div>
                    <div style="height:3px; border-radius:2px; background:rgba(255,255,255,0.08); overflow:hidden;">
                        <div id="my-cap-bar" style="height:100%; width:${myCapPct}%; background:${myCapColor}; border-radius:2px; transition:width 0.3s;"></div>
                    </div>
                </div>
<div id="trade-tab-theirs" class="trade-roster-tab" data-tab="theirs"
                    style="flex:1; padding:8px 10px; background:rgba(0,0,0,0.2); border:2px solid var(--card-border); border-radius:8px; cursor:pointer; display:flex; flex-direction:column; gap:4px;">
                    <div style="font-size:7px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; letter-spacing:1px; margin-bottom:2px;">Tap to switch team ▾</div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <div id="trade-their-switcher" style="display:flex; align-items:center; gap:8px; flex:1; min-width:0; cursor:pointer;">
                            <div id="their-team-logo-wrapper">${buildLogoWithTrophy(activeFid, 24)}</div>
                            <div style="flex:1; min-width:0;">
                                <div id="their-team-name" style="font-size:10px; font-weight:900; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${theirTeamName}</div>
                            </div>
                        </div>
                        ${theirSelected.size > 0 ? `<span style="font-size:9px; font-weight:900; color:#22c55e; background:rgba(34,197,94,0.15); border:1px solid rgba(34,197,94,0.3); border-radius:10px; padding:2px 6px;">${theirSelected.size}</span>` : ''}
                        <button id="trade-switch-team-btn" style="flex-shrink:0; width:26px; height:26px; border-radius:50%; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:var(--text-dim); font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="Switch opponent">⇄</button>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span id="their-cap-bar-label" data-base="${theirCapUsed}" style="font-size:8px; font-weight:900; color:${theirCapColor};">$${theirCapUsed.toFixed(1)}m / $${salaryCap}m</span>
                    </div>
                    <div style="height:3px; border-radius:2px; background:rgba(255,255,255,0.08); overflow:hidden;">
                        <div id="their-cap-bar" style="height:100%; width:${theirCapPct}%; background:${theirCapColor}; border-radius:2px; transition:width 0.3s;"></div>
                    </div>
                </div>          </div>



<div id="trade-roster-panel" style="max-height:420px; overflow-y:auto;">
                <div id="my-roster-list">
                    ${myPlayers.map(p => buildPlayerChip(p, mySelected, 'mine')).join('')}
                </div>
                <div id="their-roster-list" style="display:none;">
                    ${theirPlayers.map(p => buildPlayerChip(p, theirSelected, 'theirs')).join('')}
                </div>
            </div>

            <div id="trade-action-bar" style="display:flex; gap:8px; margin-top:10px;">
                <button id="trade-back-btn" style="display:none; flex:1; padding:12px; background:rgba(255,255,255,0.05); color:var(--text-dim); border:1px solid var(--card-border); border-radius:8px; font-size:12px; font-weight:900; text-transform:uppercase; cursor:pointer;">← Back</button>
                <button id="trade-next-btn" style="flex:1; padding:12px; background:var(--accent-blue); color:#fff; border:none; border-radius:8px; font-size:12px; font-weight:900; text-transform:uppercase; cursor:pointer;">Next →</button>
                <button id="trade-hub-submit" style="display:none; flex:1; padding:12px; background:#22c55e; color:#000; border:none; border-radius:8px; font-size:12px; font-weight:900; text-transform:uppercase; cursor:pointer;">Send Proposal</button>
            </div>
        </div>
`;
}

function buildTradeBlockSection() {
    if (baitList.length === 0 || !baitList[0].franchise_id) {
        return `<div style="text-align:center; padding:20px; color:var(--text-dim); font-size:11px;">No players on the trade block.</div>`;
    }
    return baitList.map(bait => {
        const bFid = bait.franchise_id || bait.franchise;
        const teamName = leagueFranchises[bFid] || bFid;
        const logoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${bFid}.png`;
        const isMe = bFid === myFid;

        // Resolve player IDs to names
        const pidList = (bait.willGiveUp || '').split(',').filter(Boolean);
const playerChipsHtml = pidList.map(pid => {
    pid = pid.trim();
    const isPick = pid.startsWith('FP_') || pid.startsWith('DP_');
    if (isPick) {
        const parts = pid.split('_');
        const pickYear = pid.startsWith('FP_') ? parts[2] : year;
        const round = pid.startsWith('FP_') ? parts[3] : (parseInt(parts[1]) + 1);
        return `
            <div style="display:flex; align-items:center; gap:8px; padding:6px 8px; background:rgba(0,0,0,0.2); border-radius:6px; margin-bottom:4px; border:1px solid rgba(245,158,11,0.3);">
                <div style="width:32px; height:32px; border-radius:50%; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                    <span style="font-size:13px; font-weight:900; color:#f59e0b;">${round}</span>
                </div>
                <div style="font-size:11px; font-weight:800; color:#f59e0b;">${pickYear} Round ${round} Pick</div>
            </div>`;
    }
    return `
        <div style="display:flex; align-items:center; gap:8px; padding:6px 8px; background:rgba(0,0,0,0.2); border-radius:6px; margin-bottom:4px; border:1px solid var(--card-border);">
            <div style="width:32px; height:32px; border-radius:50%; overflow:hidden; flex-shrink:0; background:var(--card-bg);">
                <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div id="trade-block-player-${pid}" style="font-size:11px; font-weight:800; color:#fff;">Loading...</div>
        </div>`;
}).join('');

        return `
            <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:10px; margin-bottom:8px;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                    <img src="${logoUrl}" style="width:28px; height:28px; border-radius:50%; object-fit:cover; background:var(--card-bg);">
                    <span style="font-size:12px; font-weight:900; color:#fff; flex:1;">${teamName}</span>
                    ${isMe ? `<button class="remove-bait-btn" style="font-size:9px; font-weight:900; color:#ef4444; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:6px; padding:3px 8px; cursor:pointer;">Remove</button>` : ''}
                </div>
                ${bait.inExchangeFor ? `<div style="font-size:10px; color:var(--accent-blue); margin-bottom:8px;">${bait.inExchangeFor}</div>` : ''}
                ${playerChipsHtml}
            </div>`;
    }).join('');
}

        function buildPendingSection() {
            if (pendingList.length === 0 || !pendingList[0].offeredTo) {
                return `<div style="text-align:center; padding:20px; color:var(--text-dim); font-size:11px;">No pending proposals.</div>`;
            }
            return pendingList.map(trade => {
                const isIncoming = trade.offeredTo === myFid;
                const otherFid = isIncoming ? trade.franchise_id : trade.offeredTo;
                const teamName = leagueFranchises[otherFid] || otherFid;
                const logoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${otherFid}.png`;
                const label = isIncoming ? 'Incoming' : 'Outgoing';
                const labelColor = isIncoming ? '#22c55e' : '#f59e0b';
                return `
                    <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:10px; margin-bottom:8px;">
                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                            <img src="${logoUrl}" style="width:28px; height:28px; border-radius:50%; object-fit:cover; background:var(--card-bg);">
                            <span style="font-size:12px; font-weight:900; color:#fff; flex:1;">${teamName}</span>
                            <span style="font-size:9px; font-weight:900; color:${labelColor}; text-transform:uppercase;">${label}</span>
                        </div>
                        <div style="display:flex; gap:8px;">
                            <div style="flex:1;">
                                <div style="font-size:8px; color:#ef4444; font-weight:900; text-transform:uppercase; margin-bottom:3px;">Gives Up</div>
                                <div style="font-size:10px; color:var(--text-dim);">${trade.willGiveUp || '—'}</div>
                            </div>
                            <div style="flex:1;">
                                <div style="font-size:8px; color:#22c55e; font-weight:900; text-transform:uppercase; margin-bottom:3px;">Receives</div>
                                <div style="font-size:10px; color:var(--text-dim);">${trade.willReceive || '—'}</div>
                            </div>
                        </div>
                    </div>`;
            }).join('');
        }
window._contractMapCache = window._contractMapCache || {};
async function fetchTeamContractMap(tFid) {
    if (window._contractMapCache[tFid]) return window._contractMapCache[tFid];
    const map = {};
    let totalSalary = 0;
    try {
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=${tFid}`, { credentials: 'include' });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
            const pLink = row.querySelector('td.player a[class*="position_"]');
            if (!pLink) return;
            const pid = pLink.getAttribute('href').match(/\d+/g)?.pop();
            if (!pid) return;
            const salNum = parseFloat(row.querySelector('td.salary')?.textContent.replace(/[^0-9.]/g, '')) || 0;
            const yrsNum = parseInt(row.querySelector('td.contractyear')?.textContent) || 0;
            const gPct = parseFloat(row.querySelector('td.contractinfo')?.textContent.replace(/[^0-9.]/g, '')) / 100 || 0;
            const capHit = parseFloat((salNum * gPct * yrsNum).toFixed(1));
            map[pid] = { salNum, yrsNum, gPct, capHit };
            totalSalary += salNum;
        });
    } catch(e) { console.warn('Contract map fetch failed for', tFid, e); }
    map.__totalSalary = parseFloat(totalSalary.toFixed(1));
    window._contractMapCache[tFid] = map;
    return map;
}
async function loadPendingProposals() {
    try {
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=05`, { credentials: 'include' });
        const txt = await res.text();
        const doc = new DOMParser().parseFromString(txt, 'text/html');
const rows = [...doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow')].filter(row => {
    return row.querySelector('td a[href*="F="]') !== null;
});
        if (!rows.length) {
            $('#pending-proposals-list').html('<div style="text-align:center; color:var(--text-dim); font-size:10px; padding:12px;">No pending proposals.</div>');
            return;
        }

const html = (await Promise.all(rows.map(async row => {
            const cells = row.querySelectorAll('td');
            if (cells.length < 6) return '';
            const date = cells[0]?.textContent.trim();
const fromImg = cells[1]?.querySelector('img');
const fromName = fromImg?.alt || cells[1]?.querySelector('a')?.textContent.trim() || '';
const fromFid = cells[1]?.querySelector('a')?.href.match(/F=(\d+)/)?.[1] || '';
            const fromLogo = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_icon${fromFid}.png`;

const toImg = cells[3]?.querySelector('img');
const toName = toImg?.alt || cells[3]?.querySelector('a')?.textContent.trim() || '';
const toFid = cells[3]?.querySelector('a')?.href.match(/F=(\d+)/)?.[1] || '';
            const toLogo = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_icon${toFid}.png`;

// Build a chip row (avatar + text) for each asset in a cell — one chip per player link,
            // and one chip per leftover plain-text pick description — instead of one flat text blob.
function buildAssetChips(cell, contractMap) {
                let salaryTotal = 0;
                if (!cell) return { html: '<span style="color:var(--text-dim); font-size:10px;">—</span>', salaryTotal };
                const chips = [];
                const seenText = new Set();

                cell.querySelectorAll('a').forEach(a => {
                    const label = a.textContent.trim();
                    if (!label) return;
                    seenText.add(label);
                    const pidMatch = (a.getAttribute('href') || '').match(/\d+/g);
                    const pid = pidMatch ? pidMatch.pop() : null;
                    const contract = pid ? contractMap[pid] : null;
                    if (contract) salaryTotal += contract.salNum;
                    const contractLine = contract
                        ? `<div style="font-size:8px; color:#22c55e; font-weight:800; margin-top:1px;">$${contract.salNum.toFixed(1)}m/yr · ${contract.yrsNum}yr · ${Math.round(contract.gPct*100)}% guar · <span style="color:#f59e0b;">$${contract.capHit.toFixed(1)}m hit if cut</span></div>`
                        : '';
                    chips.push(`
                        <div style="display:flex; align-items:center; gap:6px; padding:4px 8px; background:rgba(0,0,0,0.25); border-radius:6px; margin-bottom:4px;">
                            <div style="width:24px; height:24px; border-radius:50%; overflow:hidden; flex-shrink:0; background:var(--card-bg);">
                                ${pid ? `<img src="https://www.mflscripts.com/playerImages_80x107/mfl_${pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">` : ''}
                            </div>
                            <div style="flex:1; min-width:0;">
                                <span style="font-size:10px; font-weight:800; color:#fff;">${label}</span>
                                ${contractLine}
                            </div>
                        </div>`);
                });

                // Whatever's left over (not inside an <a>) is plain text — pick descriptions
                let leftoverText = cell.textContent.replace(/\s+/g, ' ').trim();
                seenText.forEach(t => { leftoverText = leftoverText.replace(t, ''); });
                leftoverText.split(/(?=Year \d{4})/).forEach(chunk => {
                    let text = chunk.replace(/\s*from\s+.+$/i, '').trim();
                    if (!text) return;
                    chips.push(`
                        <div style="display:flex; align-items:center; gap:6px; padding:4px 8px; background:rgba(0,0,0,0.25); border-radius:6px; margin-bottom:4px;">
                            <div style="width:24px; height:24px; border-radius:50%; background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.3); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:9px; font-weight:900; color:#f59e0b;">PK</div>
                            <span style="font-size:10px; font-weight:800; color:#f59e0b;">${text}</span>
                        </div>`);
                });

const html = chips.join('') || '<span style="color:var(--text-dim); font-size:10px;">—</span>';
                return { html, salaryTotal };
            }

            const fromMap = await fetchTeamContractMap(fromFid);
            const toMap = await fetchTeamContractMap(toFid);
            const giveResult = buildAssetChips(cells[2], fromMap);
            const getResult = buildAssetChips(cells[4], toMap);
            const givePlayers = giveResult.html;
            const getPlayers = getResult.html;

            const salaryCap = window.leagueSalaryCap || 823;
            const fromCurrentUsed = fromMap.__totalSalary || 0;
            const toCurrentUsed = toMap.__totalSalary || 0;
            const fromNewUsed = parseFloat((fromCurrentUsed - giveResult.salaryTotal + getResult.salaryTotal).toFixed(1));
            const toNewUsed = parseFloat((toCurrentUsed - getResult.salaryTotal + giveResult.salaryTotal).toFixed(1));
            const fromRemaining = parseFloat((salaryCap - fromNewUsed).toFixed(1));
            const toRemaining = parseFloat((salaryCap - toNewUsed).toFixed(1));
            const fromPct = Math.min(100, (fromNewUsed / salaryCap) * 100).toFixed(1);
            const toPct = Math.min(100, (toNewUsed / salaryCap) * 100).toFixed(1);
            const expires = cells[5]?.textContent.trim();
const actionCell = cells[6] || row.querySelector('td:last-child');
const allLinks = Array.from(row.querySelectorAll('a[href]'));
const revokeHref = allLinks.find(a => a.href.includes('revoke') || a.textContent.toLowerCase().includes('revoke'))?.getAttribute('href') || '';
const acceptHref = allLinks.find(a => a.href.includes('accept') || a.textContent.toLowerCase().includes('accept'))?.getAttribute('href') || '';
const rejectHref = allLinks.find(a => a.href.includes('reject') || a.textContent.toLowerCase().includes('reject'))?.getAttribute('href') || '';
const tradeIdInput = row.nextElementSibling?.querySelector('input[name="TRADE_ID"]');
const tradeIdFromLink = revokeHref.match(/TRADE_ID=(\d+)/)?.[1] || '';
const tradeId = tradeIdInput?.value || tradeIdFromLink || '';
console.log('tradeId parsed:', tradeId, 'revokeHref:', revokeHref);

// MFL sometimes uses full URLs, sometimes relative
const makeLink = (href) => {
    if (!href) return '';
    if (href.startsWith('http')) return href;
    if (href.startsWith('/')) return `https://www45.myfantasyleague.com${href}`;
    return `https://www45.myfantasyleague.com/${year}/${href}`;
};

const revokeLink = makeLink(revokeHref);
const acceptLink = makeLink(acceptHref);
const rejectLink = makeLink(rejectHref);

            const isOutgoing = fromFid === myFid;

            return `
                <div style="padding:10px; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; border-left:3px solid ${isOutgoing ? 'var(--accent-blue)' : '#22c55e'};">
                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
                        <span style="font-size:8px; font-weight:900; text-transform:uppercase; padding:2px 6px; border-radius:4px; color:#fff; background:${isOutgoing ? 'var(--accent-blue)' : 'rgba(34,197,94,0.3)'};">${isOutgoing ? 'Sent' : 'Received'}</span>
                        <span style="font-size:8px; color:var(--text-dim);">${date}</span>
                        <span style="font-size:8px; color:var(--text-dim); margin-left:auto;">Expires: ${expires}</span>
                    </div>
                    <div style="display:flex; gap:8px; align-items:flex-start;">
                        <div style="flex:1; min-width:0;">
                            <div style="display:flex; align-items:center; gap:5px; margin-bottom:4px;">
                                <img src="${fromLogo}" class="team-popup-trigger" data-fid="${fromFid}" style="width:18px; height:18px; border-radius:50%; object-fit:cover; cursor:pointer;">
                                <span style="font-size:9px; font-weight:900; color:#fff;">${fromName}</span>
                                <span style="font-size:8px; color:#ef4444; font-weight:800;">gives</span>
                            </div>
<div>${givePlayers}</div>
                            <div style="font-size:9px; font-weight:900; color:${fromRemaining < 0 ? '#ef4444' : fromPct > 90 ? '#f59e0b' : '#22c55e'}; margin-top:4px;">If Accepted: $${fromNewUsed.toFixed(1)}m used (${fromPct}%) · $${fromRemaining.toFixed(1)}m left</div>
                        </div>
                        <div style="font-size:14px; color:var(--text-dim); align-self:center;">⇄</div>
                        <div style="flex:1; min-width:0;">
                            <div style="display:flex; align-items:center; gap:5px; margin-bottom:4px;">
                                <img src="${toLogo}" class="team-popup-trigger" data-fid="${toFid}" style="width:18px; height:18px; border-radius:50%; object-fit:cover; cursor:pointer;">
                                <span style="font-size:9px; font-weight:900; color:#fff;">${toName}</span>
                                <span style="font-size:8px; color:#22c55e; font-weight:800;">gives</span>
                            </div>
                            <div>${getPlayers}</div>
                            <div style="font-size:9px; font-weight:900; color:${toRemaining < 0 ? '#ef4444' : toPct > 90 ? '#f59e0b' : '#22c55e'}; margin-top:4px;">If Accepted: $${toNewUsed.toFixed(1)}m used (${toPct}%) · $${toRemaining.toFixed(1)}m left</div>
                        </div>
                    </div>
<div style="display:flex; gap:6px; margin-top:8px;">
    ${isOutgoing 
        ? `<button class="proposal-action-btn" data-tradeid="${tradeId}" data-action="revoke" style="flex:1; padding:5px; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:6px; color:#ef4444; font-size:9px; font-weight:900; cursor:pointer; text-transform:uppercase;">Revoke</button>`
        : `<button class="proposal-action-btn" data-tradeid="${tradeId}" data-action="accept" style="flex:1; padding:5px; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); border-radius:6px; color:#22c55e; font-size:9px; font-weight:900; cursor:pointer; text-transform:uppercase;">Accept</button>
           <button class="proposal-action-btn" data-tradeid="${tradeId}" data-action="reject" style="flex:1; padding:5px; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:6px; color:#ef4444; font-size:9px; font-weight:900; cursor:pointer; text-transform:uppercase;">Reject</button>`
    }
</div>
                </div>`;
}))).filter(Boolean).join('');

        $('#pending-proposals-list').html(html || '<div style="text-align:center; color:var(--text-dim); font-size:10px; padding:12px;">No pending proposals.</div>');

    } catch(e) {
        console.error('loadPendingProposals error:', e);
        $('#pending-proposals-list').html('<div style="text-align:center; color:#ef4444; font-size:10px; padding:12px;">Failed to load proposals.</div>');
    }
}
        function render() {
           container.html(`
                <div style="padding:10px;">
                    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:10px; padding-bottom:6px; border-bottom:1px solid var(--card-border);">Pending Proposals</div>
                    <div id="pending-proposals-list"><div style="text-align:center; color:var(--text-dim); font-size:10px; padding:12px;">Loading...</div></div>
                    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin:16px 0 10px; padding-bottom:6px; border-bottom:1px solid var(--card-border);">Trade Block</div>
                    ${buildTradeBlockSection()}
                    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin:16px 0 10px; padding-bottom:6px; border-bottom:1px solid var(--card-border);">Propose Trade</div>
                    ${buildProposeSection(theirCapUsed)}
                </div>
            `);
            // Team switcher
$(document).off('change', '#trade-target-select').on('change', '#trade-target-select', async function() {
    activeFid = $(this).val();
    theirSelected.clear();
theirPlayers = await fetchTargetRoster(activeFid);
                    const newPicks = await fetchTargetPicks(activeFid);
                    newPicks.forEach(pick => {
                        theirPlayers.push({
                            pid: `pick_${pick.year}_${pick.round}_${activeFid}`,
                            name: pick.desc || `${pick.year} Round ${pick.round}`,
                            shortName: `${pick.year} R${pick.round}`,
                            pos: 'PK',
                            team: 'PICK',
                            salary: '',
                            years: '',
                            guar: '',
                            isPick: true,
                            pickYear: pick.year,
                            pickRound: pick.round,
                            pickStr: pick.pickStr || ''
                        });
                    });    
    // Update the their-side header
    const theirLogoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${activeFid}.png`;
    const theirTeamName = leagueFranchises[activeFid] || 'Their Team';
    
    // Fetch their cap data
    const theirRosterRes = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=${activeFid}`, { credentials: 'include' });
    const theirRosterDoc = new DOMParser().parseFromString(await theirRosterRes.text(), 'text/html');
    let theirCapUsed = 0;
    theirRosterDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
        const salCell = row.querySelector('td.salary');
        if (!salCell) return;
        theirCapUsed += parseFloat(salCell.textContent.replace(/[^0-9.]/g, '')) || 0;
    });
    theirCapUsed = parseFloat(theirCapUsed.toFixed(1));
const salaryCap = window.leagueSalaryCap || 823;
const theirCapPct = Math.min(100, (theirCapUsed / salaryCap) * 100).toFixed(1);
const theirCapColor = theirCapUsed > salaryCap ? '#ef4444' : theirCapPct > 90 ? '#f59e0b' : '#22c55e';

    // Update header DOM directly without full re-render
    $('#their-team-logo').attr('src', theirLogoUrl);
    $('#their-team-name').text(theirTeamName);
    $('#their-cap-bar').css('width', theirCapPct + '%').css('background', theirCapColor);
    $('#their-cap-label').text(`$${theirCapUsed.toFixed(1)}m / $${salaryCap}m`).css('color', theirCapColor);
    $('#their-roster-list').html(theirPlayers.map(p => buildPlayerChip(p, theirSelected, 'theirs')).join(''));
});
function openTradeTeamPicker() {
    $('#trade-team-picker').remove();
    const picker = $(`<div id="trade-team-picker" style="position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:99999; background:#1e293b; border:1px solid var(--card-border); border-radius:10px; padding:8px; max-height:300px; overflow-y:auto; width:220px; box-shadow:0 8px 30px rgba(0,0,0,0.7);">
        <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; padding:6px 8px; margin-bottom:4px;">Select Team</div>
        ${Object.keys(leagueFranchises).filter(id => id !== myFid).map(id => `
            <div class="trade-team-pick-item" data-fid="${id}" style="display:flex; align-items:center; gap:8px; padding:8px; border-radius:6px; cursor:pointer; background:${id === activeFid ? 'rgba(59,130,246,0.15)' : 'transparent'};">
                <img src="https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${id}.png" style="width:24px; height:24px; border-radius:50%; object-fit:cover; background:var(--card-bg);">
                <span style="font-size:11px; font-weight:800; color:${id === activeFid ? 'var(--accent-blue)' : '#fff'};">${leagueFranchises[id]}</span>
            </div>`).join('')}
    </div>`);
    $('body').append(picker);
    $(document).off('click', '.trade-team-pick-item').on('click', '.trade-team-pick-item', function(e) {
        e.stopPropagation();
        $('#trade-team-picker').remove();
        $('#trade-target-select').val($(this).data('fid')).trigger('change');
    });
    setTimeout(() => {
        $(document).one('click', function() { $('#trade-team-picker').remove(); });
    }, 0);
}

$(document).off('click', '#trade-their-switcher').on('click', '#trade-their-switcher', function(e) {
    e.stopPropagation();
    openTradeTeamPicker();
});

            // Add button click → toggle selection
            $(document).off('click touchend', '.trade-add-btn').on('click touchend', '.trade-add-btn', function(e) {
                if (e.type === 'touchend') e.preventDefault();
                e.stopPropagation();
                const pid = String($(this).data('pid'));
                const side = $(this).data('side');
                const set = side === 'mine' ? mySelected : theirSelected;
                if (set.has(pid)) set.delete(pid); else set.add(pid);
                const listId = side === 'mine' ? '#my-roster-list' : '#their-roster-list';
                const chipPlayers = side === 'mine' ? myPlayers : theirPlayers;
                $(listId).html(chipPlayers.map(p => buildPlayerChip(p, set, side)).join(''));
                updateCapBars();
const playerChipHtml = (p) => {
                    if (!p) return '';
                    const name = p.isPick ? (p.pickStr ? `Pick ${p.pickStr}` : `${p.pickYear} R${p.pickRound}`) : (p.shortName || p.name);
                    const pos = p.isPick ? 'PK' : p.pos;
                    return `<span style="display:inline-flex; align-items:center; gap:3px; margin-right:4px;">
                       <span class="pos-text-${pos.toLowerCase()} minimized-pos-badge" style="font-size:7px; font-weight:900;">${pos}</span>
                        <span style="font-size:10px; font-weight:800; color:#fff;">${name}</span>
                    </span>`;
                };
                const mineHtml = [...mySelected].map(pid => playerChipHtml(myPlayers.find(p => String(p.pid) === pid))).join('');
                const theirHtml = [...theirSelected].map(pid => playerChipHtml(theirPlayers.find(p => String(p.pid) === pid))).join('');
                const mineNames = [...mySelected].map(pid => { const p = myPlayers.find(p => String(p.pid) === pid); if (!p) return pid; return p.isPick ? (p.pickStr ? `Pick ${p.pickStr}` : `${p.pickYear} R${p.pickRound}`) : (p.shortName || p.name); });
                const theirNames = [...theirSelected].map(pid => { const p = theirPlayers.find(p => String(p.pid) === pid); if (!p) return pid; return p.isPick ? (p.pickStr ? `Pick ${p.pickStr}` : `${p.pickYear} R${p.pickRound}`) : (p.shortName || p.name); });
console.log('mineNames:', mineNames, 'theirNames:', theirNames);
// Calculate salary totals for selected players
                let mineSalTotal = 0, theirSalTotal = 0;
                [...mySelected].forEach(pid => {
                    const p = myPlayers.find(p => String(p.pid) === pid);
                    if (p && p.salary) mineSalTotal += parseFloat(p.salary.replace(/[^0-9.]/g, '')) || 0;
                });
                [...theirSelected].forEach(pid => {
                    const p = theirPlayers.find(p => String(p.pid) === pid);
                    if (p && p.salary) theirSalTotal += parseFloat(p.salary.replace(/[^0-9.]/g, '')) || 0;
                });

$('#trade-summary-mine')
                    .html(mineNames.length 
                        ? `<div style="line-height:1.6;">${mineHtml}</div>${mineSalTotal > 0 ? `<div style="font-size:9px; color:#ef4444; font-weight:800; margin-top:2px;">-$${mineSalTotal.toFixed(1)}m</div>` : ''}` 
                        : '<span style="color:var(--text-dim);">None selected</span>')
                    .css('color', '');

                $('#trade-summary-theirs')
                    .html(theirNames.length 
                        ? `<div style="line-height:1.6;">${theirHtml}</div>${theirSalTotal > 0 ? `<div style="font-size:9px; color:#22c55e; font-weight:800; margin-top:2px;">+$${theirSalTotal.toFixed(1)}m</div>` : ''}` 
                        : '<span style="color:var(--text-dim);">None selected</span>')
                    .css('color', '');
            });

            // Submit
$(document).off('click', '#trade-hub-submit').on('click', '#trade-hub-submit', async function() {
                if (mySelected.size === 0 && theirSelected.size === 0) {
                    alert('Select at least one player or pick from each side.');
                    return;
                }
                $(this).text('Sending...').prop('disabled', true);
try {
                    const myPlayerIds = [...mySelected].filter(id => !id.startsWith('pick_'));
                    const theirPlayerIds = [...theirSelected].filter(id => !id.startsWith('pick_'));

                    // Build pick objects from selected pick entries
                    const myPickObjs = [...mySelected].filter(id => id.startsWith('pick_')).map(id => myPlayers.find(p => String(p.pid) === id)).filter(Boolean);
                    const theirPickObjs = [...theirSelected].filter(id => id.startsWith('pick_')).map(id => theirPlayers.find(p => String(p.pid) === id)).filter(Boolean);

                    // MFL's real pick-ID scheme (same convention the Trade Block feature already uses):
                    // current-year picks -> DP_{round-1}_{pickInRound-1}, future picks -> FP_{ownerFid}_{year}_{round}
                    function formatPickForMfl(p, ownerFid) {
                        if (String(p.pickYear) === String(year)) {
                            if (p.pickStr) {
                                const [r, pk] = p.pickStr.split('.').map(n => parseInt(n, 10));
                                return `DP_${r - 1}_${pk - 1}`;
                            }
                            return `DP_${p.pickRound - 1}_0`;
                        }
                        return `FP_${ownerFid}_${p.pickYear}_${p.pickRound}`;
                    }

                    const myPickIds = myPickObjs.map(p => formatPickForMfl(p, myFid));
                    const theirPickIds = theirPickObjs.map(p => formatPickForMfl(p, activeFid));

                    // Merge picks into the SAME give-up/receive lists as players — MFL has no separate pick params
                    const giveUpAll = [...myPlayerIds, ...myPickIds];
                    const receiveAll = [...theirPlayerIds, ...theirPickIds];

                    const params = new URLSearchParams();
                    params.append('TYPE', 'tradeProposal');
                    params.append('L', lid);
                    params.append('FRANCHISE_ID', myFid);
                    params.append('OFFEREDTO', activeFid);
                    params.append('WILL_GIVE_UP', giveUpAll.join(','));
                    params.append('WILL_RECEIVE', receiveAll.join(','));

                    const comments = $('#trade-hub-comments').val()?.trim();
                    if (comments) params.append('COMMENTS', comments);

                    console.log('Trade proposal params:', Object.fromEntries(params));

                    const res = await fetch(`https://www45.myfantasyleague.com/${year}/import`, {
                        method: 'POST', credentials: 'include', body: params
                    });
                    const txt = await res.text();
                    console.log('Trade response:', txt);
                    if (txt.toLowerCase().includes('error')) {
                        const m = txt.match(/<error[^>]*>(.*?)<\/error>/i);
                        alert('MFL Error: ' + (m ? m[1] : 'Unknown error — check console'));
} else {
                        alert('Proposal sent!');
                        mySelected.clear(); theirSelected.clear();
                        loadTradeHub(activeFid);
                    }
                } catch(e) {
                    console.error('Trade submit error:', e);
                    alert('Network error.');
                }
                $(this).text('Send Proposal').prop('disabled', false);
            });
        }
function updateCapBars() {
const salaryCap = window.leagueSalaryCap || 823;
    
    // Calculate salary delta from selected players
    let myDelta = 0;
    let theirDelta = 0;
    
    mySelected.forEach(pid => {
        const p = myPlayers.find(p => String(p.pid) === String(pid));
        if (p && p.salary) myDelta += parseFloat(p.salary.replace(/[^0-9.]/g, '')) || 0;
    });
    
    theirSelected.forEach(pid => {
        const p = theirPlayers.find(p => String(p.pid) === String(pid));
        if (p && p.salary) theirDelta += parseFloat(p.salary.replace(/[^0-9.]/g, '')) || 0;
    });

    // My cap: lose myDelta, gain theirDelta
    const myBase = parseFloat($('#my-cap-label').data('base')) || 0;
    const myNew = Math.max(0, myBase - myDelta + theirDelta);
    const myPct = Math.min(100, (myNew / salaryCap) * 100).toFixed(1);
    const myColor = myNew > salaryCap ? '#ef4444' : myPct > 90 ? '#f59e0b' : '#22c55e';
$('#my-cap-bar').css({ width: myPct + '%', background: myColor });
    $('#my-cap-label').css('color', myColor).text(`$${myNew.toFixed(1)}m / $${salaryCap}m`);
    // Their cap: lose theirDelta, gain myDelta
const theirBase = parseFloat($('#their-cap-bar-label').data('base')) || 0;    const theirNew = Math.max(0, theirBase - theirDelta + myDelta);
    const theirPct = Math.min(100, (theirNew / salaryCap) * 100).toFixed(1);
    const theirColor = theirNew > salaryCap ? '#ef4444' : theirPct > 90 ? '#f59e0b' : '#22c55e';
$('#their-cap-bar').css({ width: theirPct + '%', background: theirColor });
    $('#their-cap-bar-label').css('color', theirColor).text(`$${theirNew.toFixed(1)}m / $${salaryCap}m`);}
render();
        loadPendingProposals();
        // Resolve trade block player names
        baitList.forEach(bait => {
            const pidList = (bait.willGiveUp || '').split(',').filter(Boolean);
            pidList.forEach(async pid => {
                pid = pid.trim();
                try {
                    const res = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=players&L=${lid}&PLAYERS=${pid}&JSON=1`, { credentials: 'include' });
                    const data = await res.json();
                    const player = data?.players?.player;
                    if (player) {
                        const name = player.name ? player.name.split(', ').reverse().join(' ') : pid;
                        const pos = player.position || '';
                        const team = player.team || 'NFL';
                        $(`#trade-block-player-${pid}`).html(`
                            <span style="font-size:11px; font-weight:800; color:#fff;">${name}</span>
                           <span class="pos-text-${pos.toLowerCase()}" style="font-size:8px; font-weight:900; margin-left:5px;">${pos}</span>
                            <span style="font-size:9px; color:var(--text-dim); margin-left:4px;">${team}</span>
                        `);
                    }
                } catch(e) {}
            });
        });
    } catch(err) {
        console.error('Trade Hub error:', err);
        container.html('<div style="text-align:center; color:#ef4444; padding:20px; font-weight:800;">Failed to load Trade Hub.</div>');
    }
}
window.loadTradeHub = loadTradeHub;
window._liveScoreIndex = window._liveScoreIndex ?? 0;
window._liveScoreCaption = window._liveScoreCaption || 'Live Scores';

async function fetchWeeklyPlayerInfoMap(weekParam) {
    const map = {};
    try {
        const url = `https://www45.myfantasyleague.com/${year}/weekly?L=${lid}${weekParam ? `&W=${weekParam}` : ''}`;
        const res = await fetch(url, { credentials: 'include', cache: 'no-store' });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        doc.querySelectorAll('td.two_column_layout').forEach(block => {
            let isBench = false;
            let slotIndex = 0;
            block.querySelectorAll('tr').forEach(row => {
                if (row.textContent.includes('Non-Starters') || row.textContent.includes('Bench')) {
                    isBench = true;
                }
                const pLink = row.querySelector('td.player a[class*="position_"]');
                if (!pLink) return;
                const pidMatch = pLink.getAttribute('href').match(/\d+/g);
                const pid = pidMatch ? pidMatch.pop() : null;
                if (!pid || map[pid]) return;
                const parsed = parseMFLName(pLink.textContent);
                const oppText = row.querySelectorAll('td')[1]?.textContent.split('(')[0].trim() || '';
                map[pid] = {
                    name: parsed.shortName || parsed.name,
                    pos: parsed.pos,
                    realPos: parsed.realPos,
                    team: parsed.team,
                    isStarter: !isBench,
                    slotIndex: slotIndex++,
                    opp: oppText
                };
            });
        });
    } catch(e) { console.warn('Could not build weekly player info map', e); }
    return map;
}

function formatGameClock(gsr) {
    if (gsr === null || isNaN(gsr) || gsr > 3600) return null; // pregame, no clock yet
    if (gsr <= 0) return null; // final, handled elsewhere
    const elapsed = 3600 - gsr;
    const quarter = Math.min(4, Math.floor(elapsed / 900) + 1);
    const secsLeftInQuarter = 900 - (elapsed - (quarter - 1) * 900);
    const mins = Math.floor(secsLeftInQuarter / 60);
    const secs = secsLeftInQuarter % 60;
    const clock = `${mins}:${String(secs).padStart(2, '0')}`;
    return elapsed >= 3600 ? `OT ${clock}` : `Q${quarter} ${clock}`;
}

function deriveLiveStatus(p) {
    if (p.rawStatus) {
        const s = String(p.rawStatus).toLowerCase();
        if (s.includes('final') || s.includes('post') || s.includes('bye')) return { label: 'Final', color: '#94a3b8', playing: false, done: true };
        if (s.includes('progress') || s.includes('live') || s.includes('active') || s.includes('in_game')) {
            const clock = formatGameClock(p.gsr);
            return { label: clock || 'Live', color: '#ef4444', playing: true, done: false };
        }
        if (s.includes('pre') || s.includes('not') || s.includes('sched') || s.includes('upcoming')) return { label: 'Upcoming', color: '#f59e0b', playing: false, done: false };
    }
    if (p.gsr !== null && !isNaN(p.gsr)) {
        if (p.gsr <= 0) return { label: 'Final', color: '#94a3b8', playing: false, done: true };
        if (p.gsr >= 3600) return { label: 'Upcoming', color: '#f59e0b', playing: false, done: false };
        const clock = formatGameClock(p.gsr);
        return { label: clock || 'Live', color: '#ef4444', playing: true, done: false };
    }
    // Fallback heuristic when no status/timer field is present
    if (p.score > 0) return { label: 'Final', color: '#94a3b8', playing: false, done: true };
    return { label: 'Upcoming', color: '#f59e0b', playing: false, done: false };
}


const LIVE_SCORE_POS_ORDER = ['QB', 'RB', 'WR', 'TE', 'PK', 'DL', 'LB', 'DB'];

function sortLiveScoreRoster(roster) {
    const list = [...(roster || [])];
    list.sort((a, b) => {
        // Preserve MFL's own lineup slot order (starters follow QB/RB/WR/.../FLEX/IDP sequence)
        if (a.slotIndex !== b.slotIndex) return a.slotIndex - b.slotIndex;
        const ai = LIVE_SCORE_POS_ORDER.indexOf(a.pos);
        const bi = LIVE_SCORE_POS_ORDER.indexOf(b.pos);
        if (ai !== bi) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
        return a.name.localeCompare(b.name);
    });
    const starters = list.filter(p => p.isStarter);
    const bench = list.filter(p => !p.isStarter);
    return { starters, bench };
}

function buildLiveScoreSectionHeader(label) {
    return `<div style="font-size:8px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; padding:6px 4px 4px;">${label}</div>`;
}

window._liveScoreProjCache = window._liveScoreProjCache || {};async function fetchTeamProjectionsMap(fid2) {
    if (window._liveScoreProjCache[fid2]) return window._liveScoreProjCache[fid2];
    const map = {};
    try {
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/lineup?L=${lid}&F=${fid2}`, { credentials: 'include', cache: 'no-store' });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
            const pLink = row.querySelector('td a[class*="position_"]');
            if (!pLink) return;
            const pidMatch = pLink.getAttribute('href').match(/\d+/g);
            const pid = pidMatch ? pidMatch.pop() : null;
            if (!pid) return;
            const projVal = parseFloat(row.querySelectorAll('td')[4]?.textContent) || 0;
            map[pid] = projVal;
        });
    } catch(e) { console.warn('Could not fetch projections for', fid2, e); }
    window._liveScoreProjCache[fid2] = map;
    return map;
}

function buildLiveScorePlayerRow(p, projMap, liveDetails) {
    const pos = (p.pos || 'UNK');
    const team = (p.team || 'NFL').toUpperCase();
    const detail = liveDetails && liveDetails.gameInfo ? liveDetails.gameInfo[p.pid] : null;
    const statLine = liveDetails && liveDetails.stats ? liveDetails.stats[p.pid] : '';

    const status = deriveLiveStatus(p);
    const proj = (projMap && projMap[p.pid] != null) ? projMap[p.pid] : null;
    const showProj = !status.playing && !status.done && p.score === 0 && proj !== null;
    const valueText = showProj ? proj.toFixed(1) : p.score.toFixed(1);
    const valueColor = showProj ? '#f59e0b' : (status.done ? '#fff' : (status.playing ? '#22c55e' : 'var(--text-dim)'));
    const dotAnim = status.playing ? 'animation: pulse-blue 1.2s infinite;' : '';

    const oppMatch = (p.opp || '').match(/(?:vs|@)\s*([A-Z]{2,3})/i);
    const oppAbbr = oppMatch ? oppMatch[1].toUpperCase() : null;
    const oppLabel = p.opp || '';

    // Real score/status from the live scoring page, falling back to fantasy-derived status
    const scoreDisplay = detail && detail.scoreText ? detail.scoreText : oppLabel;
    const statusDisplay = detail && detail.statusText ? detail.statusText : status.label;

    const nflColors = {
        'ARI': ['#97233F', '#000000'], 'ATL': ['#A71930', '#000000'], 'BAL': ['#241773', '#9E7C0C'],
        'BUF': ['#00338D', '#C60C30'], 'CAR': ['#0085CA', '#101820'], 'CHI': ['#0B162A', '#C83803'],
        'CIN': ['#FB4F14', '#000000'], 'CLE': ['#311D00', '#FF3C00'], 'DAL': ['#003594', '#041E42'],
        'DEN': ['#FB4F14', '#002244'], 'DET': ['#0076B6', '#B0B7BC'], 'GBP': ['#203731', '#FFB612'],
        'HOU': ['#03202F', '#A71930'], 'IND': ['#002C5F', '#A2AAAD'], 'JAC': ['#006778', '#D7A22A'],
        'KCC': ['#E31837', '#FFB81C'], 'LVR': ['#000000', '#A5ACAF'], 'LAC': ['#0080C6', '#FFC20E'],
        'LAR': ['#003594', '#FFA300'], 'MIA': ['#008E97', '#FC4C02'], 'MIN': ['#4F2683', '#FFC62F'],
        'NEP': ['#002244', '#C60C30'], 'NOS': ['#D3BC8D', '#101820'], 'NYG': ['#0B2265', '#A71930'],
        'NYJ': ['#125740', '#000000'], 'PHI': ['#004C54', '#A5ACAF'], 'PIT': ['#FFB612', '#101820'],
        'SFO': ['#AA0000', '#B3995D'], 'SEA': ['#002244', '#69BE28'], 'TBB': ['#D50A0A', '#34302B'],
        'TEN': ['#0C2340', '#4B92DB'], 'WAS': ['#5A1414', '#FFB612']
    };
    const colors = nflColors[team] || ['#3b82f6', '#1e293b'];
    const c1 = colors[0], c2 = colors[1];

    return `
        <div class="player-modal-trigger" data-pid="${p.pid}" data-team="${team}"
            style="display:flex; align-items:flex-start; gap:8px; padding:6px; border-radius:8px; margin-bottom:4px; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); cursor:pointer;">
            <div style="width:32px; height:32px; border-radius:50%; overflow:hidden; flex-shrink:0; background:var(--card-bg); border:1px solid rgba(255,255,255,0.08); position:relative;">
                <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${p.pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">
                <span style="position:absolute; bottom:-1px; right:-1px; width:8px; height:8px; border-radius:50%; background:${status.color}; border:1px solid var(--card-bg); ${dotAnim}"></span>
            </div>
            <div style="flex:1; min-width:0;">
                <div style="display:flex; align-items:center; gap:4px; flex-wrap:wrap;">
                    <span style="font-size:10px; font-weight:800; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.name}</span>
                    <span class="pos-text-${pos.toLowerCase()}" style="font-size:7px; font-weight:900; flex-shrink:0;">${pos}</span>
                </div>
                <div style="display:inline-flex; align-items:center; gap:4px; margin-top:3px; background:linear-gradient(135deg, ${c1}30, ${c2}15); border:1px solid ${c1}40; border-radius:5px; padding:2px 6px;">
                    <img src="${getNFLLogoUrl(team)}" onerror="this.style.display='none'" style="width:12px; height:12px; object-fit:contain; flex-shrink:0;">
                    ${oppAbbr ? `<img src="${getNFLLogoUrl(oppAbbr)}" onerror="this.style.display='none'" style="width:10px; height:10px; object-fit:contain; flex-shrink:0; opacity:0.85;">` : ''}
                    <span style="font-size:8px; font-weight:800; color:#fff; white-space:nowrap;">${scoreDisplay || '—'}</span>
                </div>
                ${statLine ? `<div style="font-size:8px; color:var(--text-dim); margin-top:3px; line-height:1.4;">${statLine}</div>` : ''}
            </div>
            <div style="text-align:right; flex-shrink:0;">
                <div style="font-size:12px; font-weight:900; color:${valueColor};">${valueText}</div>
                <div style="font-size:6px; font-weight:900; color:${status.color}; text-transform:uppercase; letter-spacing:0.5px; margin-top:1px;">${showProj ? 'PROJ' : statusDisplay}</div>
            </div>
        </div>`;
}

window._liveScoringDetailsCache = window._liveScoringDetailsCache || {};
async function fetchLiveScoringDetails(fid2) {
    if (window._liveScoringDetailsCache[fid2]) return window._liveScoringDetailsCache[fid2];
    const details = { gameInfo: {}, stats: {} };
    try {
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/ajax_ls?L=${lid}&FRANCHISE_ID=${fid2}`, { credentials: 'include', cache: 'no-store' });
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        ['#roster_away', '#roster_home'].forEach(sel => {
            const table = doc.querySelector(sel);
            if (!table) return;
            table.querySelectorAll('tr').forEach(row => {
                const pLink = row.querySelector('td a[href*="P="]');
                if (!pLink) return;
                const pidMatch = pLink.getAttribute('href').match(/P=(\d+)/);
                const pid = pidMatch ? pidMatch[1] : null;
                if (!pid) return;
                const gameInfoDiv = row.querySelector('td.ls_game_info div');
                const statsDiv = row.querySelector('td.ls_player_stats div');
                if (gameInfoDiv) {
                    const linkEl = gameInfoDiv.querySelector('a');
                    const scoreText = linkEl ? linkEl.textContent.trim() : '';
                    const fullText = gameInfoDiv.textContent.trim();
                    const statusText = scoreText ? fullText.replace(scoreText, '').trim() : fullText;
                    details.gameInfo[pid] = { scoreText, statusText };
                }
                if (statsDiv) {
                    const statsText = statsDiv.textContent.trim();
                    if (statsText) details.stats[pid] = statsText;
                }
            });
        });
    } catch(e) { console.warn('Could not fetch live scoring details for', fid2, e); }
    window._liveScoringDetailsCache[fid2] = details;
    return details;
}

function buildLiveScoreTabsHtml(matchups, activeIdx) {
    return `
      <div id="live-score-tabs" class="hide-scroll" style="display:flex; gap:6px; overflow-x:auto; padding:2px 2px 12px; scroll-snap-type:x proximity;">
        ${matchups.map((m, i) => {
            const isActive = i === activeIdx;
            return `
            <div class="live-score-tab" data-idx="${i}" style="flex-shrink:0; scroll-snap-align:center; display:flex; align-items:center; gap:5px; padding:6px 10px; border-radius:8px; cursor:pointer; background:${isActive ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)'}; border:1px solid ${isActive ? 'var(--accent-blue)' : 'var(--card-border)'};">
                <img src="${m.t1.logo}" onerror="this.style.display='none'" style="width:20px; height:20px; border-radius:50%; object-fit:cover; background:var(--card-bg);">
                <span style="font-size:9px; font-weight:900; color:${isActive ? '#fff' : 'var(--text-dim)'}; white-space:nowrap;">${m.t1.score.toFixed(0)}–${m.t2.score.toFixed(0)}</span>
                <img src="${m.t2.logo}" onerror="this.style.display='none'" style="width:20px; height:20px; border-radius:50%; object-fit:cover; background:var(--card-bg);">
                ${m.isMe ? `<span style="width:5px;height:5px;border-radius:50%;background:var(--accent-blue);flex-shrink:0;"></span>` : ''}
            </div>`;
        }).join('')}
      </div>`;
}

async function renderLiveScoreCard() {    const container = $('#scores-content-container');    const matchups = window._liveScoreMatchups || [];
    if (matchups.length === 0) {
        container.html('<div style="text-align:center; padding: 20px; color: var(--text-dim);">No matchup data found.</div>');
        return;
    }

    if (window._liveScoreIndex < 0) window._liveScoreIndex = matchups.length - 1;
    if (window._liveScoreIndex >= matchups.length) window._liveScoreIndex = 0;
    const idx = window._liveScoreIndex;
    const { t1, t2, isMe } = matchups[idx];

      const c1 = t1.score > t2.score ? '#22c55e' : t1.score < t2.score ? '#ef4444' : '#fff';
    const c2 = t2.score > t1.score ? '#22c55e' : t2.score < t1.score ? '#ef4444' : '#fff';
    const yts1 = t1.yetToPlay > 0 ? `${t1.yetToPlay} yet to play` : 'Done';
    const yts2 = t2.yetToPlay > 0 ? `${t2.yetToPlay} yet to play` : 'Done';

       const tabsHtml = buildLiveScoreTabsHtml(matchups, idx);

      // Fetch projections for both teams, plus real game score/status/stat lines
    const [projMap1, projMap2, liveDetails] = await Promise.all([
        fetchTeamProjectionsMap(t1.fid),
        fetchTeamProjectionsMap(t2.fid),
        fetchLiveScoringDetails(t1.fid)
    ]);

    // Re-check index/matchup in case the user navigated away while awaiting
    if (window._liveScoreIndex !== idx) return;

    function computeProjectedTotal(roster, projMap) {
        let total = 0;
        (roster || []).forEach(p => {
            if (!p.isStarter) return;
            const status = deriveLiveStatus(p);
            if (status.done) {
                total += p.score;
            } else {
                const proj = (projMap && projMap[p.pid] != null) ? projMap[p.pid] : p.score;
                total += proj;
            }
        });
        return total;
    }

    const t1Proj = computeProjectedTotal(t1.roster, projMap1);
    const t2Proj = computeProjectedTotal(t2.roster, projMap2);

     function buildTeamRosterHtml(roster, projMap) {
        const { starters, bench } = sortLiveScoreRoster(roster);
        if (starters.length === 0 && bench.length === 0) {
            return '<div style="text-align:center; padding:10px; color:var(--text-dim); font-size:9px;">No lineup data</div>';
        }
        let html = '';
        if (starters.length) {
            html += buildLiveScoreSectionHeader('Starters');
            html += starters.map(p => buildLiveScorePlayerRow(p, projMap, liveDetails)).join('');
        }
        if (bench.length) {
            html += buildLiveScoreSectionHeader('Bench');
            html += bench.map(p => buildLiveScorePlayerRow(p, projMap, liveDetails)).join('');
        }
        return html;
    }

    const t1Rows = buildTeamRosterHtml(t1.roster, projMap1);
    const t2Rows = buildTeamRosterHtml(t2.roster, projMap2);

    const trophySvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" style="flex-shrink:0;"><path d="M6 2h12v6c0 3.31-2.69 6-6 6S6 11.31 6 8V2z" fill="#f59e0b"/><path d="M4 2h2v5C6 7 5 8 4 8 2.9 8 2 7.1 2 6V4c0-1.1.9-2 2-2z" fill="#f59e0b" opacity="0.6"/><path d="M18 2h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2-1 0-2-1-2-1V2z" fill="#f59e0b" opacity="0.6"/><path d="M10 14h4l1 3H9l1-3z" fill="#f59e0b"/><path d="M7 17h10v2H7v-2z" fill="#f59e0b"/></svg>`;
    const medianBadge = `<span title="Above league median" style="display:inline-flex; align-items:center; justify-content:center; width:13px; height:13px; border-radius:50%; background:rgba(0,206,184,0.15); border:1px solid rgba(0,206,184,0.5); font-size:8px; font-weight:900; color:var(--accent-teal); flex-shrink:0;">M</span>`;

    const leagueMedian = typeof window._liveScoreMedian === 'number' ? window._liveScoreMedian : null;
    const t1Wins = t1.score > t2.score;
    const t2Wins = t2.score > t1.score;
    const t1BeatsMedian = leagueMedian !== null && t1.score > leagueMedian;
    const t2BeatsMedian = leagueMedian !== null && t2.score > leagueMedian;

    const t1NameHtml = `<span data-team-style="${t1.fid}" style="font-size:10px; font-weight:800; color:#fff; line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;">${t1.name}</span>`;
    const t2NameHtml = `<span data-team-style="${t2.fid}" style="font-size:10px; font-weight:800; color:#fff; line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;">${t2.name}</span>`;

    const html = `
               <div style="padding:10px;">
            <div class="live-score-refresh-wrap" style="display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:6px;">
                <div style="font-size:11px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:2px;">${window._liveScoreCaption}</div>
                <span style="font-size:9px; font-weight:900; color:#ef4444; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:6px; padding:3px 8px;">● Live</span>
            </div>

            ${tabsHtml}

            <div id="live-score-card-inner" style="background:rgba(255,255,255,0.02); border:1px solid ${isMe ? 'rgba(59,130,246,0.4)' : 'var(--card-border)'}; border-radius:10px; padding:14px; ${isMe ? 'box-shadow:0 0 10px rgba(59,130,246,0.15);' : ''}">
                <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; margin-bottom:12px;">
                    <button class="live-score-prev" style="flex-shrink:0; width:28px; height:28px; border-radius:50%; background:rgba(255,255,255,0.05); border:1px solid var(--card-border); color:#fff; font-size:14px; font-weight:900; cursor:pointer; display:flex; align-items:center; justify-content:center;">‹</button>

                    <div style="flex:1; display:flex; align-items:center; justify-content:space-around; gap:6px;">
                                               <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:5px; text-align:center; min-width:0;">
                            <img src="${t1.logo}" onerror="this.src='https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/NFL.svg'" style="width:44px; height:44px; border-radius:50%; object-fit:cover; background:var(--card-bg); border:1px solid rgba(255,255,255,0.1);">
                            <div style="display:flex; align-items:center; gap:3px; max-width:100%;">
                                ${t1Wins ? trophySvg : ''}
                                ${t1NameHtml}
                                ${t1BeatsMedian ? medianBadge : ''}
                            </div>
                            <span style="font-size:22px; font-weight:900; color:${c1}; font-variant-numeric:tabular-nums;">${t1.score.toFixed(2)}</span>
                            <span style="font-size:8px; font-weight:800; color:var(--text-dim); text-transform:uppercase;">${yts1}</span>
                            <span style="font-size:9px; font-weight:900; color:#f59e0b;">Proj: ${t1Proj.toFixed(1)}</span>
                        </div>
                        <div style="font-size:11px; font-weight:900; color:var(--text-dim); flex-shrink:0;">vs</div>
                        <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:5px; text-align:center; min-width:0;">
                            <img src="${t2.logo}" onerror="this.src='https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/NFL.svg'" style="width:44px; height:44px; border-radius:50%; object-fit:cover; background:var(--card-bg); border:1px solid rgba(255,255,255,0.1);">
                            <div style="display:flex; align-items:center; gap:3px; max-width:100%;">
                                ${t2Wins ? trophySvg : ''}
                                ${t2NameHtml}
                                ${t2BeatsMedian ? medianBadge : ''}
                            </div>
                            <span style="font-size:22px; font-weight:900; color:${c2}; font-variant-numeric:tabular-nums;">${t2.score.toFixed(2)}</span>
                            <span style="font-size:8px; font-weight:800; color:var(--text-dim); text-transform:uppercase;">${yts2}</span>
                            <span style="font-size:9px; font-weight:900; color:#f59e0b;">Proj: ${t2Proj.toFixed(1)}</span>
                        </div>
                    </div>

                    <button class="live-score-next" style="flex-shrink:0; width:28px; height:28px; border-radius:50%; background:rgba(255,255,255,0.05); border:1px solid var(--card-border); color:#fff; font-size:14px; font-weight:900; cursor:pointer; display:flex; align-items:center; justify-content:center;">›</button>
                </div>

                <div style="display:flex; gap:10px;">
                    <div style="flex:1; min-width:0;">${t1Rows}</div>
                    <div style="flex:1; min-width:0;">${t2Rows}</div>
                </div>
            </div>

        </div>`;

    $('#scores-content-container').html(html);
    document.querySelector(`.live-score-tab[data-idx="${idx}"]`)?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
}
async function loadLiveScores() {
    const container = $('#scores-content-container');
    window._liveScoringDetailsCache = {};
    if (!window._liveScoreMatchups) {
        container.html('<div style="text-align:center; padding: 40px; color: var(--accent-blue); font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; animation: pulse-blue 1.5s infinite;">Loading Live Scores...</div>');
    }

    try {
        // Figure out the active week from the weekly summary caption
        const pairRes = await fetch(`https://www45.myfantasyleague.com/${year}/weekly?L=${lid}`, { credentials: 'include', cache: 'no-store' });
        const pairDoc = new DOMParser().parseFromString(await pairRes.text(), 'text/html');
        const summaryTable = pairDoc.querySelector('table.h2hmatchups.scoresummary');
        const caption = summaryTable?.querySelector('caption span')?.textContent || 'Live Scores';
        window._liveScoreCaption = caption;
        const weekMatch = caption.match(/Week\s+(\d+)/i);
        const activeWeek = weekMatch ? parseInt(weekMatch[1], 10) : null;

         const liveUrl = `https://www45.myfantasyleague.com/${year}/export?TYPE=liveScoring&L=${lid}${activeWeek ? `&W=${activeWeek}` : ''}&DETAILS=1&JSON=1`;
        const liveRes = await fetch(liveUrl, { credentials: 'include', cache: 'no-store' });
        const liveRawText = await liveRes.text();

        let liveData;
        try {
            liveData = JSON.parse(liveRawText);
        } catch (parseErr) {
            console.error('liveScoring did not return JSON. Raw response:', liveRawText.slice(0, 300));
            container.html('<div style="text-align:center; padding: 20px; color: var(--text-dim);">Not logged in or live scoring unavailable right now.</div>');
            return;
        }
        console.log('liveScoring raw response:', liveData);
        if (liveData?.liveScoring?.matchup?.[0]) {
            console.log('First matchup sample:', JSON.stringify(liveData.liveScoring.matchup[0], null, 2));
        }

        // MFL groups live scoring by matchup, each containing exactly 2 franchises.
        // Try every shape we've seen: {liveScoring:{matchup}}, {matchup} at top level, or a flat franchise list.
        let liveMatchupsRaw = liveData?.liveScoring?.matchup || liveData?.matchup;
        if (!liveMatchupsRaw) {
            let flatFranchises = liveData?.liveScoring?.franchise || liveData?.franchise || [];
            if (!Array.isArray(flatFranchises)) flatFranchises = [flatFranchises];
            if (flatFranchises.length > 0) {
                liveMatchupsRaw = [];
                for (let i = 0; i < flatFranchises.length; i += 2) {
                    if (flatFranchises[i + 1]) liveMatchupsRaw.push({ franchise: [flatFranchises[i], flatFranchises[i + 1]] });
                }
            }
        }
        if (!Array.isArray(liveMatchupsRaw)) liveMatchupsRaw = liveMatchupsRaw ? [liveMatchupsRaw] : [];

        if (liveMatchupsRaw.length === 0) {
            container.html('<div style="text-align:center; padding: 20px; color: var(--text-dim);">Live scoring is not available right now.</div>');
            return;
        }

        // Build a pid -> {name,pos,team} lookup from this week's rosters
        const playerInfoMap = await fetchWeeklyPlayerInfoMap(activeWeek);

        const matchups = liveMatchupsRaw.map(m => {
            let franchises = m.franchise;
            if (!Array.isArray(franchises)) franchises = [franchises];
            const [f1, f2] = franchises;

            const buildTeam = (f) => {
                if (!f) return { fid: '0000', name: '—', logo: '', score: 0, yetToPlay: 0, roster: [] };
                const fid2 = (f.id || '').toString().padStart(4, '0');

                // Try several possible container names/shapes for the player list
                let players = f.player ?? f.players ?? f.player_score ?? f.playerScore ?? [];
                if (players && !Array.isArray(players) && typeof players === 'object' && players.player) {
                    players = players.player;
                }
                if (!Array.isArray(players)) players = players ? [players] : [];

                const roster = players.map(p => {
                    const pid = p.id ?? p.player_id ?? p.pid ?? '';
                    const pScore = parseFloat(p.score ?? p.points ?? p.pts ?? 0) || 0;
                    const gsrRaw = p.gameSecondsRemaining ?? p.game_seconds_remaining ?? p.secondsRemaining ?? null;
                    const rawStatus = p.status ?? p.gameStatus ?? p.game_status ?? null;
                    const info = playerInfoMap[pid] || {};
                    return {
                        pid: pid,
                        name: info.name || pid,
                        pos: info.pos || '',
                        realPos: info.realPos || info.pos || '',
                        team: info.team || 'NFL',
                        score: pScore,
                        gsr: gsrRaw !== null ? parseInt(gsrRaw) : null,
                        rawStatus: rawStatus,
                        isStarter: info.isStarter !== undefined ? info.isStarter : true,
                        slotIndex: info.slotIndex !== undefined ? info.slotIndex : 999,
                        opp: info.opp || ''
                    };
                }).filter(p => p.pid);

                return {
                    fid: fid2,
                    name: leagueFranchises[fid2] || fid2,
                    logo: getFranchiseLogoUrl(fid2),
                    score: parseFloat(f.score) || 0,
                    yetToPlay: parseInt(f.playersYetToPlay ?? f.players_yet_to_play ?? f.playersYtp ?? 0) || 0,
                    roster
                };
            };

            const t1 = buildTeam(f1);
            const t2 = buildTeam(f2);
            return { t1, t2, isMe: (t1.fid === fid || t2.fid === fid) };
        });

        window._liveScoreMatchups = matchups;

        const allTeamScoresForMedian = [];
        matchups.forEach(m => { allTeamScoresForMedian.push(m.t1.score, m.t2.score); });
        allTeamScoresForMedian.sort((a, b) => a - b);
        const midIdx = Math.floor(allTeamScoresForMedian.length / 2);
        window._liveScoreMedian = allTeamScoresForMedian.length === 0 ? null
            : (allTeamScoresForMedian.length % 2 !== 0
                ? allTeamScoresForMedian[midIdx]
                : (allTeamScoresForMedian[midIdx - 1] + allTeamScoresForMedian[midIdx]) / 2);

        if (window._liveScoreFirstLoad !== false) {
            const myIdx = matchups.findIndex(m => m.isMe);
            window._liveScoreIndex = myIdx !== -1 ? myIdx : 0;
            window._liveScoreFirstLoad = false;
        }

        await renderLiveScoreCard();

        if (window._liveScoreInterval) clearInterval(window._liveScoreInterval);
        window._liveScoreInterval = setInterval(() => {
            const tab = document.getElementById('tab-scores') || document.getElementById('tab-scoreboard');
            if (tab && tab.offsetParent !== null) loadLiveScores();
            else { clearInterval(window._liveScoreInterval); window._liveScoreInterval = null; }
        }, 30000);

    } catch(e) {
        console.error('Live scores error:', e);
        container.html('<div style="text-align:center; color:#ef4444; padding:20px; font-weight:800;">Failed to load live scores.</div>');
    }
}
async function loadDraftData() {
    const container = $('#draft-content-container');
    container.html('<div style="text-align:center; padding: 40px; color: var(--accent-blue); font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; animation: pulse-blue 1.5s infinite;">Loading Draft Board...</div>');
    try {
        const [res, picksRes] = await Promise.all([
            fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=17&DISPLAY=LEAGUE&CMD=LIST`, { credentials: 'include', cache: 'no-store' }),
            fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=draftPicks&L=${lid}&JSON=1`, { credentials: 'include' })
        ]);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');

        // Build traded pick map from export API
        const tradedPickMap = {};
        try {
 const picksData = await picksRes.json();
            const allPicks = picksData?.draftPicks?.draftUnit?.draftPick || [];
            const pickList = Array.isArray(allPicks) ? allPicks : [allPicks];
            pickList.forEach(p => {
                if (p.originalPickFor && p.originalPickFor !== p.franchise) {
                    const key = `${p.round}.${String(p.pick).padStart(2,'0')}`;
                    tradedPickMap[key] = p.originalPickFor.padStart(4,'0');
                }
            });
        } catch(e) { console.warn('Draft picks export failed', e); }

const picks = {};
        const slotOriginalOwner = {}; // Maps slot number → original fid for header

        doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
            const pickTd = row.querySelector('td:first-child');
            const fLink = row.querySelector('td.franchisename a[class*="franchise_"]');
            if (!pickTd || !fLink) return;
            const pickStr = pickTd.textContent.trim();
            const parts = pickStr.split('.');
            if (parts.length !== 2) return;
            const round = parseInt(parts[0]);
            const slot = parseInt(parts[1]);
            const localFidMatch = fLink.getAttribute('class').match(/franchise_(\d+)/);
            const localFid = localFidMatch ? localFidMatch[1].padStart(4, '0') : '0000';
const teamName = fLink.querySelector('img')?.getAttribute('alt')?.trim() || leagueFranchises[localFid] || localFid;
const logoUrl = getFranchiseLogoUrl(localFid);
const commentTd = row.querySelector('td:last-child');
            const commentText = commentTd?.textContent || '';


            // Parse drafted player if pick has been made
            const playerTd = row.querySelector('td.player a');
            let draftedPlayer = null;
            if (playerTd) {
                const pidMatch = playerTd.getAttribute('href').match(/\d+/g);
                const draftedPid = pidMatch ? pidMatch.pop() : null;
                const { name, shortName, pos, team } = parseMFLName(playerTd.textContent);
                if (draftedPid) draftedPlayer = { pid: draftedPid, name, shortName, pos, team };
            }
            const isMyPick = localFid === myFid;

let originalLogoUrl = null;
            let originalFid = tradedPickMap[pickStr] || null;
            const traded = !!originalFid || commentText.includes('traded');
            if (originalFid) {
                originalLogoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${originalFid}.png`;
            }

            // For round 1, track who originally owned each slot for the header
            if (round === 1) {
                const headerFid = traded ? (originalFid || localFid) : localFid;
slotOriginalOwner[slot] = {
    logoUrl: getFranchiseLogoUrl(headerFid),
    isMyPick: headerFid === myFid
};
            }

picks[pickStr] = { round, slot, fid: localFid, teamName, logoUrl, traded, isMyPick, originalLogoUrl, draftedPlayer };  
// Enrich traded picks using window.currentTeamPicks which has via data from O=17 team view
        if (window.currentTeamPicks) {
            window.currentTeamPicks.forEach(tp => {
                if (tp.year !== year || !tp.pickStr) return;
                const pick = picks[tp.pickStr];
                if (!pick) return;
                const viaMatch = tp.desc?.match(/via ([^.)]+)/);
                if (!viaMatch) return;
                const viaName = viaMatch[1].trim();
                const origFid = Object.keys(leagueFranchises).find(id =>
                    leagueFranchises[id].toLowerCase().trim() === viaName.toLowerCase().trim()
                );
                if (origFid) {
                    pick.traded = true;
                    pick.originalLogoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${origFid}.png`;
                }
            });
        }
      });

        const round1Order = Array.from({length: 10}, (_, i) => {
            return slotOriginalOwner[i+1] || null;
        });

// Build tradeBlockPickIds from global tradeBlockPids using pickIdMap
// Build tradeBlockPickIds using direct FP_ format construction
        const tradeBlockPickIds = new Set();
        const targetFid = (myFid === '0000' ? fid : myFid).padStart(4, '0');
        tradeBlockPids.forEach(id => {
            if (id.startsWith('DP_')) {
                const parts = id.split('_');
                const round = parseInt(parts[1]) + 1;
                const pick = parseInt(parts[2]) + 1;
                tradeBlockPickIds.add(`${round}.${String(pick).padStart(2,'0')}`);
            }
            if (id.startsWith('FP_')) {
                const parts = id.split('_');
                const pickYear = parts[2];
                const round = parts[3];
                tradeBlockPickIds.add(`${pickYear}_${round}`);
            }
        });
// On the clock — reads from localStorage, updated manually for now
const onClockKey = `draft_clock_${lid}`;
let onClockPick = null;
// Auto-detect the current pick on the clock by finding the first undrafted pick
onClockPick = null;
for (let r = 1; r <= 5; r++) {
    for (let p = 1; p <= 10; p++) {
        const key = `${r}.${String(p).padStart(2,'0')}`;
        if (picks[key] && !picks[key].draftedPlayer) {
            onClockPick = key;
            break;
        }
    }
    if (onClockPick) break;
}
localStorage.setItem(onClockKey, onClockPick);
        // Fetch ADP data
        const adpPlayers = [];
        try {
            const adpRes = await fetch(`https://www45.myfantasyleague.com/${year}/reports?R=ADP&L=${lid}&POS=*&ROOKIES=1&INJURED=0&CUTOFF=5&FCOUNT=10&IS_PPR=2&IS_KEEPER=R&IS_MOCK=1&PERIOD=RECENT&PAGE=ALL`, { credentials: 'include', cache: 'no-store' });
            const adpDoc = new DOMParser().parseFromString(await adpRes.text(), 'text/html');
            adpDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
                const pLink = row.querySelector('td.player a');
                if (!pLink) return;
                const pidMatch = pLink.getAttribute('href').match(/\d+/g);
                const pid = pidMatch ? pidMatch.pop() : '0000';
                const { name, pos, team } = parseMFLName(pLink.textContent);
                const tds = row.querySelectorAll('td');
                const rank = parseInt(tds[0]?.textContent) || 999;
                const avgPick = tds[4]?.textContent.trim() || '—';
                const status = tds[2]?.textContent.trim() || 'FA';
                adpPlayers.push({ pid, name, pos, team, rank, avgPick, status });
            });
} catch(e) { console.warn('ADP fetch failed', e); }
// Auto-detect on the clock pick — first undrafted slot
        onClockPick = null;
        for (let r = 1; r <= 5; r++) {
            for (let p = 1; p <= 10; p++) {
                const key = `${r}.${String(p).padStart(2,'0')}`;
                if (picks[key] && !picks[key].draftedPlayer) {
                    onClockPick = key;
                    break;
                }
            }
            if (onClockPick) break;
        }
        localStorage.setItem(onClockKey, onClockPick);
// Deduplicate by pid, keeping the first occurrence (lowest rank)
        const seenPids = new Set();
        const dedupedPlayers = [];
        adpPlayers.forEach(p => {
            if (!seenPids.has(p.pid)) {
                seenPids.add(p.pid);
                dedupedPlayers.push(p);
            }
        });
        adpPlayers.length = 0;
        dedupedPlayers.forEach(p => adpPlayers.push(p));

        // Remove drafted players from adpPlayers so they don't appear as projections
        const draftedPids = new Set();
        Object.values(picks).forEach(p => {
            if (p.draftedPlayer) draftedPids.add(p.draftedPlayer.pid);
        });
 
        const filteredAdpPlayers = adpPlayers.filter(p => !draftedPids.has(p.pid));
        adpPlayers.length = 0;
        filteredAdpPlayers.forEach(p => adpPlayers.push(p));

        // Inject slide-up sheet once
        if (!$('#draft-pick-sheet').length) {
            $('body').append(`
              <div id="draft-pick-sheet" style="position:fixed; bottom:0; left:0; right:0; height:65vh; background:#0f1117; border-top:1px solid var(--card-border); border-radius:16px 16px 0 0; z-index:9999; transform:translateY(100%); transition:transform 0.3s ease; display:flex; flex-direction:column;">
                    <div style="padding:12px 16px; border-bottom:1px solid var(--card-border); display:flex; align-items:center; justify-content:space-between; flex-shrink:0;">
                        <div>
                            <div id="pick-sheet-title" style="font-size:13px; font-weight:900; color:#fff; text-transform:uppercase;"></div>
                            <div id="pick-sheet-subtitle" style="font-size:10px; color:var(--text-dim); margin-top:2px;"></div>
                        </div>
                        <button id="pick-sheet-close" style="background:rgba(255,255,255,0.08); border:none; color:#fff; border-radius:8px; padding:6px 12px; font-size:11px; font-weight:900; cursor:pointer;">✕ Close</button>
                    </div>
                    <div style="padding:8px 12px; border-bottom:1px solid var(--card-border); flex-shrink:0;">
                        <div style="display:flex; gap:6px; flex-wrap:wrap;" id="pick-sheet-pos-filters">
                            <button class="pick-pos-btn active" data-pos="ALL" style="padding:4px 10px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--accent-blue); background:var(--accent-blue); color:#fff;">All</button>
                            <button class="pick-pos-btn" data-pos="QB" style="padding:4px 10px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">QB</button>
                            <button class="pick-pos-btn" data-pos="RB" style="padding:4px 10px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">RB</button>
                            <button class="pick-pos-btn" data-pos="WR" style="padding:4px 10px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">WR</button>
                            <button class="pick-pos-btn" data-pos="TE" style="padding:4px 10px; border-radius:6px; font-size:9px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">TE</button>
                        </div>
                    </div>
                    <div id="pick-sheet-list" style="overflow-y:auto; flex:1; padding:8px 12px;"></div>
                </div>
                <div id="draft-sheet-overlay" style="position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:9998; display:none;"></div>
            `);

            $('#pick-sheet-close, #draft-sheet-overlay').on('click', () => {
                $('#draft-pick-sheet').css('transform', 'translateY(100%)');
                $('#draft-sheet-overlay').hide();
            });

            $(document).on('click', '.pick-pos-btn', function() {
                $('.pick-pos-btn').css({ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', borderColor: 'var(--card-border)' });
                $(this).css({ background: 'var(--accent-blue)', color: '#fff', borderColor: 'var(--accent-blue)' });
                const pos = $(this).data('pos');
                $('#pick-sheet-list .adp-row').each(function() {
                    $(this).toggle(pos === 'ALL' || $(this).data('pos') === pos);
                });
            });
$(document).on('click', '.draft-player-btn', async function() {
const pid = String($(this).data('pid'));
    const pickKey = String($(this).data('pick'));
    const btn = $(this);

    if (!confirm(`Draft this player with pick ${pickKey}?`)) return;

    btn.text('Drafting...').prop('disabled', true).css('opacity', '0.5');

    try {
const parts = pickKey.split('.');
        const round = parseInt(parts[0]);
        const pick = parseInt(parts[1]);

        const params = new URLSearchParams();
        params.set('L', lid);
        params.set('CMD', 'DRAFT');
        params.set('PLAYER_PICK', pid);
        params.set('FRANCHISE_PICK', myFid);
        params.set('ROUND', round);
        params.set('PICK', pick);
        params.set('JSON', '1');

const url = `https://www45.myfantasyleague.com/${year}/live_draft?${params.toString()}`;
        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });
const txt = await res.text();
        console.log('Draft response:', txt);
        
        let parsed = {};
        try { parsed = JSON.parse(txt); } catch(e) {}

        if (!res.ok || parsed.error || txt.toLowerCase().includes('error')) {
            const errMsg = parsed.error || txt.match(/<error[^>]*>(.*?)<\/error>/i)?.[1] || 'Unknown — check console';
            alert('MFL Error: ' + errMsg);
            btn.text('Draft').prop('disabled', false).css('opacity', '1');
} else {
            $('#draft-pick-sheet').css('transform', 'translateY(100%)');
            $('#draft-sheet-overlay').hide();
            // Update clock to next pick
            const parts = pickKey.split('.');
            const round = parseInt(parts[0]);
            const slot = parseInt(parts[1]);
            const nextSlot = slot < 10 ? `${round}.${String(slot+1).padStart(2,'0')}` : `${round+1}.01`;
            localStorage.setItem(`draft_clock_${lid}`, nextSlot);
            loadDraftData();
        }
    } catch(e) {
        console.error('Draft error:', e);
        alert('Network error.');
        btn.text('Draft').prop('disabled', false).css('opacity', '1');
    }
});
$(document).on('click', '.target-btn', async function() {
                const pid = String($(this).data('pid'));
                const pickKey = $(this).data('pick');
                const storageKey = `draft_targets_${lid}`;
                let targets = JSON.parse(localStorage.getItem(storageKey) || '{}');
                if (!targets[pickKey]) targets[pickKey] = [];
                const idx = targets[pickKey].indexOf(pid);
                if (idx === -1) {
                    targets[pickKey].push(pid);
                    $(this).text('★ Targeted').css({ background: 'rgba(234,179,8,0.2)', color: '#eab308', borderColor: 'rgba(234,179,8,0.4)' });
                } else {
                    targets[pickKey].splice(idx, 1);
                    $(this).text('☆ Target').css({ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', borderColor: 'var(--card-border)' });
                }
                localStorage.setItem(storageKey, JSON.stringify(targets));

                // Sync to MFL — collect all targeted pids in order across all picks
                const allPids = [];
                const seen = new Set();
                Object.keys(targets).sort().forEach(key => {
                    targets[key].forEach(p => {
                        if (!seen.has(p)) { seen.add(p); allPids.push(p); }
                    });
                });

                try {
                    const url = `https://www45.myfantasyleague.com/${year}/live_draft?L=${lid}&CMD=MYLIST&PLAYERS=${allPids.join(',')}&JSON=1`;
                    const res = await fetch(url, { credentials: 'include' });
                    const txt = await res.text();
                    console.log('Draft list sync:', txt);
                } catch(e) {
                    console.warn('Draft list sync failed:', e);
                }

                renderBoard();
            });
        }

function openPickSheet(pickKey) {
    const storageKey = `draft_targets_${lid}`;
    const targets = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const pickTargets = targets['list'] || [];

    $('#pick-sheet-title').text('Draft Target List');
    $('#pick-sheet-subtitle').text('Star players you want to target in the rookie draft');

            $('.pick-pos-btn').css({ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', borderColor: 'var(--card-border)' });
            $('.pick-pos-btn[data-pos="ALL"]').css({ background: 'var(--accent-blue)', color: '#fff', borderColor: 'var(--accent-blue)' });

const listHtml = adpPlayers.map(player => {
                const isTargeted = pickTargets.includes(player.pid);
const isTaken = player.ownerFid !== null && player.ownerFid !== undefined;                const nameParts = player.name.split(' ');
                const shortName = nameParts.length > 1 ? nameParts[0].charAt(0) + '. ' + nameParts.slice(1).join(' ') : player.name;
                return `
                    <div class="adp-row" data-pos="${player.pos}" style="display:flex; align-items:center; gap:10px; padding:8px; margin-bottom:4px; border-radius:8px; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-left:3px solid var(--pos-${player.pos.toLowerCase()}, #3b82f6); opacity:${isTaken ? '0.4' : '1'};">
                        
                        <span style="font-size:9px; font-weight:900; color:var(--text-dim); min-width:20px; text-align:center; flex-shrink:0;">${player.rank}</span>

                        <div class="player-modal-trigger" data-pid="${player.pid}" data-ppos="${player.pos}" data-pteam="${player.team}" data-pname="${player.name}" style="width:38px; height:38px; border-radius:50%; overflow:hidden; flex-shrink:0; background:var(--card-bg); border:1px solid rgba(255,255,255,0.1); cursor:pointer;">
                            <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${player.pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <div style="flex:1; min-width:0;">
                            <div style="display:flex; align-items:center; gap:5px; margin-bottom:3px;">
                                <span style="font-size:12px; font-weight:900; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${shortName}</span>
                               <span class="pos-text-${player.pos.toLowerCase()}" style="font-size:8px; font-weight:900; flex-shrink:0;">${player.pos}</span>
                            </div>
                           <div style="display:flex; align-items:center; gap:5px;">
                                <img src="${getNFLLogoUrl(player.team)}" onerror="this.style.display='none'" style="width:14px; height:14px; object-fit:contain; flex-shrink:0;">
                                <span style="font-size:9px; color:var(--text-dim);">Avg: ${player.avgPick}</span>
                            </div>
                        </div>

                        ${isTaken ? `<span style="font-size:9px; color:var(--accent-blue); font-weight:800; flex-shrink:0;">Rostered</span>` : `
                        <button class="target-btn" data-pid="${player.pid}" data-pick="${pickKey}"
                            style="padding:6px 10px; border-radius:6px; font-size:9px; font-weight:900; cursor:pointer; flex-shrink:0;
                            background:${isTargeted ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.05)'};
                            color:${isTargeted ? '#eab308' : 'var(--text-dim)'};
                            border:1px solid ${isTargeted ? 'rgba(234,179,8,0.4)' : 'var(--card-border)'};">
                            ${isTargeted ? '★' : '☆'}
                        </button>`}
                    </div>`;
            }).join('');

            $('#pick-sheet-list').html(listHtml);
            $('#draft-pick-sheet').css('transform', 'translateY(0)');
            $('#draft-sheet-overlay').show();
        }

        let viewMode = 'grid';
const projectedPids = new Set();
function openDraftSheet(pickKey) {
    $('#pick-sheet-title').text(`Pick ${pickKey} — You're On The Clock`);
    $('#pick-sheet-subtitle').text('Select a player to draft');

    // Override the pos filter bar with tabs
    $('#pick-sheet-pos-filters').html(`
        <button class="draft-sheet-tab active" data-tab="adp" style="padding:6px 14px; border-radius:6px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--accent-blue); background:var(--accent-blue); color:#fff;">ADP Board</button>
        <button class="draft-sheet-tab" data-tab="mylist" style="padding:6px 14px; border-radius:6px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid var(--card-border); background:rgba(255,255,255,0.05); color:var(--text-dim);">⭐ My List</button>
    `);

    function buildDraftRows(players) {
        if (!players.length) return `<div style="text-align:center; padding:30px; color:var(--text-dim); font-size:11px;">No players available.</div>`;
        return players.map(player => {
            const nameParts = player.name.split(' ');
            const shortName = nameParts.length > 1 ? nameParts[0].charAt(0) + '. ' + nameParts.slice(1).join(' ') : player.name;
            return `
                <div class="adp-row" data-pos="${player.pos}" style="display:flex; align-items:center; gap:10px; padding:8px; margin-bottom:4px; border-radius:8px; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-left:3px solid var(--pos-${player.pos.toLowerCase()}, #3b82f6);">
                    <div style="width:38px; height:38px; border-radius:50%; overflow:hidden; flex-shrink:0; background:var(--card-bg); border:1px solid rgba(255,255,255,0.1);">
                        <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${player.pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div style="flex:1; min-width:0;">
                        <div style="display:flex; align-items:center; gap:5px; margin-bottom:3px;">
                            <span style="font-size:12px; font-weight:900; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${shortName}</span>
                         <span class="pos-text-${player.pos.toLowerCase()}" style="font-size:8px; font-weight:900; flex-shrink:0;">${player.pos}</span>
                        </div>
                        <div style="display:flex; align-items:center; gap:5px;">
                            <img src="${getNFLLogoUrl(player.team)}" onerror="this.style.display='none'" style="width:14px; height:14px; object-fit:contain; flex-shrink:0;">
                            <span style="font-size:9px; color:var(--text-dim);">Avg: ${player.avgPick}</span>
                        </div>
                    </div>
                    <button class="draft-player-btn" data-pid="${player.pid}" data-pick="${pickKey}"
                        style="padding:8px 14px; border-radius:6px; font-size:10px; font-weight:900; cursor:pointer; flex-shrink:0;
                        background:rgba(34,197,94,0.15); color:#22c55e; border:1px solid rgba(34,197,94,0.4);">
                        Draft
                    </button>
                </div>`;
        }).join('');
    }

    function showAdpTab() {
        $('#pick-sheet-list').html(buildDraftRows(adpPlayers));
    }

    function showMyListTab() {
        const storageKey = `draft_targets_${lid}`;
        const targets = JSON.parse(localStorage.getItem(storageKey) || '{}');
        const allPids = [];
        const seen = new Set();
        Object.keys(targets).sort().forEach(key => {
            targets[key].forEach(p => {
                if (!seen.has(p)) { seen.add(p); allPids.push(p); }
            });
        });
        const myListPlayers = allPids.map(pid => adpPlayers.find(p => String(p.pid) === String(pid))).filter(Boolean);
        $('#pick-sheet-list').html(buildDraftRows(myListPlayers));
    }

    // Tab switching
    $(document).off('click', '.draft-sheet-tab').on('click', '.draft-sheet-tab', function() {
        $('.draft-sheet-tab').css({ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', borderColor: 'var(--card-border)' });
        $(this).css({ background: 'var(--accent-blue)', color: '#fff', borderColor: 'var(--accent-blue)' });
        if ($(this).data('tab') === 'mylist') showMyListTab();
        else showAdpTab();
    });

    showAdpTab();
    $('#draft-pick-sheet').css('transform', 'translateY(0)');
    $('#draft-sheet-overlay').show();
}
function getProjectedPlayer(slotIndex) {
    // slotIndex is 0-based position among undrafted picks
    const available = adpPlayers.filter(p => !projectedPids.has(p.pid));
    if (slotIndex >= available.length) return null;
    const player = available[slotIndex];
    projectedPids.add(player.pid);
    return player;
}

function getNextProjectedPlayer(overallPick) {
    if (!adpPlayers.length) return null;
    // Simply return the next available player by rank order, offset by pick number
    const available = adpPlayers.filter(p => !projectedPids.has(p.pid));
    if (!available.length) return null;
    // Sort by rank and return the one at index matching remaining picks
    const sorted = [...available].sort((a, b) => (parseFloat(a.avgPick) || 999) - (parseFloat(b.avgPick) || 999));
    return sorted[0] || null;
}
        async function renderBoard() {
            projectedPids.clear();
const myPickIsOnClock = onClockPick && picks[onClockPick]?.isMyPick && !picks[onClockPick]?.draftedPlayer;
            // Pre-assign projections in ADP order to undrafted slots only
            const projectionMap = {};
            let slotIndex = 0;
            for (let r = 1; r <= 5; r++) {
                for (let p = 1; p <= 10; p++) {
                    const key = `${r}.${String(p).padStart(2,'0')}`;
                    const pick = picks[key];
                    if (!pick?.draftedPlayer) {
                        const available = adpPlayers.filter(pl => !projectedPids.has(pl.pid));
                        if (available.length > 0) {
                            projectionMap[key] = available[0];
                            projectedPids.add(available[0].pid);
                        }
                    }
                }
            }


            const storageKey = `draft_targets_${lid}`;
            const allTargets = JSON.parse(localStorage.getItem(storageKey) || '{}');
// Fetch live draft status for clock
let clockHtml = '';
            try {
                const statusRes = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=52`, { credentials: 'include', cache: 'no-store' });
                const statusDoc = new DOMParser().parseFromString(await statusRes.text(), 'text/html');
                const bodyText = statusDoc.body?.textContent || '';

console.log('O=52 bodyText:', bodyText.substring(0, 600));

                // Parse "on the clock" franchise
                const clockMatch = bodyText.match(/Draft Pick [\d.]+:\s*(.+?)\s+is on the clock/i);
                const isMyTurn = bodyText.includes("It's Your Turn To Draft");
let onClockName = clockMatch ? clockMatch[1].trim() : (isMyTurn ? (leagueFranchises[myFid] || 'Your Team') : null);

                // Parse time remaining — try multiple formats
                const timeMatch = bodyText.match(/Timer expires in about\s+([^<\n]+)/i);
                const timeText = timeMatch ? timeMatch[1].trim() : null;
                console.log('timeMatch:', timeMatch);
                console.log('timeText:', timeText);

                // Convert "X hours, Y minutes" to seconds
                let secondsLeft = 0;
                if (timeText) {
                    const hoursMatch = timeText.match(/(\d+)\s+hour/i);
                    const minsMatch = timeText.match(/(\d+)\s+min/i);
                    secondsLeft = ((parseInt(hoursMatch?.[1]) || 0) * 3600) + ((parseInt(minsMatch?.[1]) || 0) * 60);
                }
                // Force show if it's my turn even with no time parsed
                if (isMyTurn && secondsLeft === 0) secondsLeft = 1;
                console.log('onClockName:', onClockName, 'secondsLeft:', secondsLeft, 'isMyTurn:', isMyTurn);
const anyPicksMade = Object.values(picks).some(p => p.draftedPlayer);
if (secondsLeft > 0 && anyPicksMade) {
                    let onClockFid = Object.keys(leagueFranchises).find(id =>
                        leagueFranchises[id].toLowerCase().trim() === (onClockName || '').toLowerCase().trim()
                    );
                    if (!onClockFid && onClockPick && picks[onClockPick]) {
                        onClockFid = picks[onClockPick].fid;
                        if (!onClockName) onClockName = leagueFranchises[onClockFid] || 'Unknown';
                    }
                    const isMyTurn = onClockFid === myFid;
const hours = Math.floor(secondsLeft / 3600);
                    const mins = Math.floor((secondsLeft % 3600) / 60);
                    const timeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
                    const urgentColor = secondsLeft < 3600 ? '#ef4444' : secondsLeft < 7200 ? '#f59e0b' : '#22c55e';

                    clockHtml = `
                        <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; margin-bottom:10px; background:rgba(0,0,0,0.3); border:1px solid ${isMyTurn ? 'rgba(34,197,94,0.4)' : 'var(--card-border)'}; border-radius:8px;">
                            <div style="display:flex; align-items:center; gap:10px;">
                                ${onClockFid ? `<img src="https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${onClockFid}.png" style="width:28px; height:28px; border-radius:50%; object-fit:cover; background:var(--card-bg);">` : ''}
                                <div>
                                    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">On The Clock</div>
                                    <div style="font-size:12px; font-weight:900; color:${isMyTurn ? '#22c55e' : '#fff'};">${isMyTurn ? '🏈 Your Pick!' : (onClockName || 'Unknown')}</div>
                                </div>
                            </div>
                            <div style="text-align:right;">
                                <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">Time Left</div>
                                <div id="draft-clock-display" data-seconds="${secondsLeft}" style="font-size:18px; font-weight:900; color:${urgentColor}; font-variant-numeric:tabular-nums;">${timeStr}</div>
                            </div>
                        </div>`;
                }
} catch(e) { console.warn('Draft status fetch failed', e); }

            if (!clockHtml && window._calendarEvents) {
                const draftEvent = window._calendarEvents.find(ev => ev.cls.includes('draft'));
                if (draftEvent) {
                    const diffMs = draftEvent.date - new Date();
                    if (diffMs > 0) {
                        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                        const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const countdownStr = diffDays > 0 ? `${diffDays}d ${diffHrs}h` : `${diffHrs}h`;
                        clockHtml = `
                            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; margin-bottom:10px; background:rgba(0,0,0,0.3); border:1px solid var(--card-border); border-radius:8px;">
                                <div>
                                    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">Draft Starts In</div>
                                    <div style="font-size:16px; font-weight:900; color:var(--accent-blue);">${countdownStr}</div>
                                </div>
                                <div style="text-align:right;">
                                    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">Draft Date</div>
                                    <div style="font-size:12px; font-weight:900; color:#fff;">${draftEvent.date.toLocaleDateString([], { month:'short', day:'numeric' })}</div>
                                </div>
                            </div>`;
                    }
                }
            }

const toggleHtml = `
    <div style="display:flex; gap:6px; margin-bottom:14px; padding: 0 5px; align-items:center;">
        <button class="draft-view-btn" data-view="grid" style="padding:6px 14px; border-radius:8px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid ${viewMode==='grid' ? 'var(--accent-blue)' : 'var(--card-border)'}; background:${viewMode==='grid' ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)'}; color:${viewMode==='grid' ? '#fff' : 'var(--text-dim)'};">⊞ Grid</button>
        <button class="draft-view-btn" data-view="list" style="padding:6px 14px; border-radius:8px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid ${viewMode==='list' ? 'var(--accent-blue)' : 'var(--card-border)'}; background:${viewMode==='list' ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)'}; color:${viewMode==='list' ? '#fff' : 'var(--text-dim)'};">☰ List</button>
        ${myPickIsOnClock ? `
            <button id="open-draft-btn" style="margin-left:auto; padding:6px 14px; border-radius:8px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid rgba(34,197,94,0.5); background:rgba(34,197,94,0.15); color:#22c55e; animation:pulse-blue 1.5s infinite;">🏈 Draft Now</button>
            <button id="open-draft-list-btn" style="padding:6px 14px; border-radius:8px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid rgba(234,179,8,0.4); background:rgba(234,179,8,0.1); color:#eab308;">⭐ List</button>
        ` : `
            <button id="open-draft-list-btn" style="margin-left:auto; padding:6px 14px; border-radius:8px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; border:1px solid rgba(234,179,8,0.4); background:rgba(234,179,8,0.1); color:#eab308;">⭐ Draft List</button>
        `}
    </div>`;

            let boardHtml = '';

            if (viewMode === 'grid') {
let headerCells = `<div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; padding:6px 2px; text-align:center;">RD</div>`;
            round1Order.forEach((p, i) => {
                headerCells += `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:2px; padding:4px 2px;">
                        ${p ? `<img src="${p.logoUrl}" onerror="this.style.opacity='0'" style="width:22px; height:22px; border-radius:50%; object-fit:cover; background:var(--card-bg); border:1px solid ${p.isMyPick ? 'rgba(34,197,94,0.5)' : 'rgba(255,255,255,0.1)'};">` : '<div style="width:22px;height:22px;"></div>'}
                    </div>`;
            });
                boardHtml += `<div style="overflow-x:auto; overflow-y:visible; -webkit-overflow-scrolling:touch; padding: 0 0 8px; margin: 0 -5px;">
                    <div style="display:inline-grid; grid-template-columns: 20px repeat(10, 52px); gap:2px; min-width:max-content;">
                        ${headerCells}`;

                for (let r = 1; r <= 5; r++) {
                    boardHtml += `<div style="display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:900; color:var(--accent-blue);">${r}</div>`;
                    for (let p = 1; p <= 10; p++) {
                        const key = `${r}.${String(p).padStart(2,'0')}`;
                        const pick = picks[key];
                        const isMyPick = pick?.isMyPick || false;
                        const traded = pick?.traded || false;
                        const hasTargets = (allTargets[key] || []).length > 0;
const proj = projectionMap[key];
const projParts = proj ? proj.name.split(' ') : [];
const projShort = proj ? (projParts[0].charAt(0) + '. ' + projParts.slice(1).join(' ')) : '';

boardHtml += `
    <div class="pick-cell" data-pick="${key}" style="background:rgba(255,255,255,0.03); border:1px solid ${isMyPick ? 'rgba(34,197,94,0.3)' : 'var(--card-border)'}; border-radius:6px; min-height:58px; display:flex; flex-direction:column; padding:4px; gap:2px; position:relative; cursor:pointer; box-sizing:border-box;">
        
        ${onClockPick === key ? `<div style="position:absolute;inset:0;border-radius:6px;border:2px solid #f59e0b;pointer-events:none;"></div>` : ''}
${(() => { const realFid2 = (myFid === '0000' ? fid : myFid).padStart(4,'0'); const fpKey2 = `FP_${realFid2}_${year}_${r}`; const dpParts = key.split('.'); const dpKey2 = `DP_${parseInt(dpParts[0])-1}_${parseInt(dpParts[1])-1}`; return (tradeBlockPids.has(fpKey2) || tradeBlockPids.has(dpKey2)) ? `<div style="position:absolute;top:2px;right:3px;font-size:9px;">${BLOCK_ICON}</div>` : ''; })()}        ${hasTargets ? `<div style="position:absolute;bottom:2px;right:3px;font-size:9px;">⭐</div>` : ''}

<div style="display:flex; align-items:center; gap:3px;">
            <span style="font-size:8px; font-weight:900; color:${isMyPick ? '#22c55e' : 'var(--text-dim)'}; line-height:1;">${key}</span>
            ${traded ? `
                <span style="font-size:7px; font-weight:800; color:#f59e0b;">to</span>
                <img src="${pick?.logoUrl}" onerror="this.style.display='none'" style="width:14px;height:14px;border-radius:50%;object-fit:cover;background:var(--card-bg);">
            ` : ''}
        </div>

${pick?.draftedPlayer ? `
            <div style="display:flex; flex-direction:column; align-items:center; gap:1px; margin-top:auto;">
                <div style="width:28px; height:28px; border-radius:50%; overflow:hidden; background:var(--card-bg); border:1px solid rgba(34,197,94,0.4); flex-shrink:0;">
                    <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${pick.draftedPlayer.pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <span style="font-size:7px; font-weight:800; color:#22c55e; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:46px; line-height:1.2; text-align:center;">${pick.draftedPlayer.shortName}</span>
                <div style="display:flex; align-items:center; gap:2px;">
                    <span class="pos-text-${pick.draftedPlayer.pos.toLowerCase()}" style="font-size:6px; font-weight:900; flex-shrink:0;">${pick.draftedPlayer.pos}</span>
                    <img src="${getNFLLogoUrl(pick.draftedPlayer.team)}" onerror="this.style.display='none'" style="width:10px; height:10px; object-fit:contain; flex-shrink:0;">
                </div>
            </div>
        ` : proj ? `
            <div style="display:flex; flex-direction:column; align-items:center; gap:1px; margin-top:auto; opacity:0.4; filter:grayscale(1);">
                <div style="width:28px; height:28px; border-radius:50%; overflow:hidden; background:var(--card-bg); border:1px solid rgba(255,255,255,0.1); flex-shrink:0;">
                    <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${proj.pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <span style="font-size:7px; font-weight:700; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:46px; line-height:1.2; text-align:center;">${projShort}</span>
                <div style="display:flex; align-items:center; gap:2px;">
                   <span class="pos-text-${proj.pos.toLowerCase()}" style="font-size:6px; font-weight:900; flex-shrink:0;">${proj.pos}</span>
                    <img src="${getNFLLogoUrl(proj.team)}" onerror="this.style.display='none'" style="width:10px; height:10px; object-fit:contain; flex-shrink:0;">
                </div>
            </div>
        ` : ''}
    </div>`;
                    }
                }
                boardHtml += `</div></div>`;

            } else {
                boardHtml = `<div style="padding: 0 5px;">`;
                for (let r = 1; r <= 5; r++) {
                    boardHtml += `
                        <div style="margin-bottom:12px; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; overflow:hidden;">
                            <div style="padding:10px 14px; background:rgba(59,130,246,0.08); border-bottom:1px solid var(--card-border); font-size:11px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; letter-spacing:1px;">Round ${r}</div>`;
                    for (let p = 1; p <= 10; p++) {
                        const key = `${r}.${String(p).padStart(2,'0')}`;
                        const pick = picks[key];
                        const isMyPick = pick?.isMyPick || false;
                        const hasTargets = (allTargets[key] || []).length > 0;
                        boardHtml += `
                            <div class="pick-cell" data-pick="${key}" style="display:flex; align-items:center; gap:10px; padding:8px 14px; border-bottom:1px solid rgba(255,255,255,0.04); background:${isMyPick ? 'rgba(34,197,94,0.04)' : 'transparent'}; cursor:pointer;">
                                <span style="font-size:10px; font-weight:900; color:${isMyPick ? '#22c55e' : 'var(--accent-blue)'}; min-width:32px;">${key}</span>
                               ${pick ? `<img src="${pick.logoUrl}" onerror="this.style.opacity='0'" style="width:24px;height:24px;border-radius:50%;object-fit:cover;background:var(--card-bg);flex-shrink:0;">` : ''}
                                <span style="font-size:11px; font-weight:800; color:#fff; flex:1;">${pick?.teamName || leagueFranchises[pick?.fid] || '—'}</span>
${pick?.draftedPlayer ? `
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <div style="width:36px; height:36px; border-radius:50%; overflow:hidden; background:var(--card-bg); border:1px solid rgba(34,197,94,0.4); flex-shrink:0;">
                                            <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${pick.draftedPlayer.pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">
                                        </div>
                                        <div style="display:flex; flex-direction:column;">
                                            <span style="font-size:11px; font-weight:900; color:#22c55e;">${pick.draftedPlayer.shortName}</span>
                                            <div style="display:flex; align-items:center; gap:3px;">
                                                <span class="pos-text-${pick.draftedPlayer.pos.toLowerCase()}" style="font-size:7px; font-weight:900;">${pick.draftedPlayer.pos}</span>
                                                <img src="${getNFLLogoUrl(pick.draftedPlayer.team)}" style="width:12px; height:12px; object-fit:contain;">
                                            </div>
                                        </div>
                                    </div>
                                ` : projectionMap[key] ? `
                                    <div style="display:flex; align-items:center; gap:8px; opacity:0.35; filter:grayscale(1);">
                                        <div style="width:36px; height:36px; border-radius:50%; overflow:hidden; background:var(--card-bg); border:1px solid rgba(255,255,255,0.1); flex-shrink:0;">
                                            <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${projectionMap[key].pid}.png" onerror="this.style.display='none'" style="width:100%; height:100%; object-fit:cover;">
                                        </div>
                                        <div style="display:flex; flex-direction:column;">
                                            <span style="font-size:11px; font-weight:700; color:#fff;">${(() => { const n = projectionMap[key].name.split(' '); return n.length > 1 ? n[0].charAt(0) + '. ' + n.slice(1).join(' ') : projectionMap[key].name; })()}</span>
                                            <div style="display:flex; align-items:center; gap:3px;">
                                              <span class="pos-text-${projectionMap[key].pos.toLowerCase()}" style="font-size:7px; font-weight:900;">${projectionMap[key].pos}</span>
                                                <img src="${getNFLLogoUrl(projectionMap[key].team)}" style="width:12px; height:12px; object-fit:contain;">
                                            </div>
                                        </div>
                                    </div>
                                ` : ''}
                                <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                                    ${pick?.traded ? `
                                        <span style="font-size:9px; color:#f59e0b; font-weight:800;">from</span>
                                        <img src="${pick?.originalLogoUrl}" onerror="this.style.display='none'" style="width:18px;height:18px;border-radius:50%;object-fit:cover;background:var(--card-bg);">
                                    ` : ''}
${(() => { const realFid2 = (myFid === '0000' ? fid : myFid).padStart(4,'0'); const fpKey2 = `FP_${realFid2}_${year}_${r}`; const dpParts = key.split('.'); const dpKey2 = `DP_${parseInt(dpParts[0])-1}_${parseInt(dpParts[1])-1}`; return (tradeBlockPids.has(fpKey2) || tradeBlockPids.has(dpKey2)) ? `<span style="font-size:9px; color:#a855f7; font-weight:800;">${BLOCK_ICON} Block</span>` : ''; })()}                                </div>
                                ${hasTargets ? `<span style="font-size:9px; color:#eab308; font-weight:800;">⭐ ${allTargets[key].length}</span>` : ''}

                            </div>`;
                    }
                    boardHtml += `</div>`;
                }
                boardHtml += `</div>`;
            }

container.html(`<div style="padding:10px 0;">${clockHtml}${toggleHtml}${boardHtml}</div>`);

            // Start live countdown ticker
            if (window._draftClockTick) clearInterval(window._draftClockTick);
window._draftClockTick = setInterval(() => {
                const el = document.getElementById('draft-clock-display');
                if (!el) { clearInterval(window._draftClockTick); return; }
                let secs = parseInt(el.dataset.seconds) - 1;
                if (secs < 0) secs = 0;
                el.dataset.seconds = secs;
                const h = Math.floor(secs / 3600);
                const m = Math.floor((secs % 3600) / 60);
                if (h > 0) {
                    el.textContent = `${h}h ${m}m`;
                    el.style.color = h < 1 ? '#ef4444' : h < 2 ? '#f59e0b' : '#22c55e';
                } else if (m > 0) {
                    el.textContent = `${m}m`;
                    el.style.color = m < 10 ? '#ef4444' : m < 30 ? '#f59e0b' : '#22c55e';
                } else {
                    el.textContent = `0m`;
                    el.style.color = '#ef4444';
                }
                if (secs === 0) clearInterval(window._draftClockTick);
            }, 1000);          $(document).off('click', '.draft-view-btn').on('click', '.draft-view-btn', function() {
                viewMode = $(this).data('view');
                renderBoard();
            });

$(document).off('click', '#open-draft-list-btn').on('click', '#open-draft-list-btn', function() {
    openPickSheet('list');
});

$(document).off('click', '#open-draft-btn').on('click', '#open-draft-btn', function() {
    openDraftSheet(onClockPick);
});
        }

        renderBoard();

    } catch(err) {
        console.error('Draft load error:', err);
        container.html('<div style="text-align:center; color:#ef4444; padding:20px; font-weight:800;">Failed to load draft board.</div>');
    }
}
async function checkNotifBadge() {
    try {
        const tradeRes = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=pendingTrades&L=${lid}&JSON=1`, { credentials: 'include' });
        const tradeData = await tradeRes.json();
        let trades = tradeData?.pendingTrades?.pendingTrade || [];
        if (!Array.isArray(trades)) trades = [trades];
        const hasIncoming = trades.some(t => t.offeredTo === myFid);
        if (hasIncoming) $('#notif-badge').show();
    } catch(e) {}
}

    // --- LIVE SCORES PAGER ---
    $(document).off('click touchend', '.live-score-prev').on('click touchend', '.live-score-prev', async function(e) {
        if (e.type === 'touchend' && touchMoved) return;
        if (e.type === 'touchend') e.preventDefault();
        window._liveScoreIndex--;
        await renderLiveScoreCard();
    });
    $(document).off('click touchend', '.live-score-next').on('click touchend', '.live-score-next', async function(e) {
        if (e.type === 'touchend' && touchMoved) return;
        if (e.type === 'touchend') e.preventDefault();
        window._liveScoreIndex++;
        await renderLiveScoreCard();
    });
    $(document).off('click touchend', '.live-score-tab').on('click touchend', '.live-score-tab', async function(e) {
        if (e.type === 'touchend' && touchMoved) return;
        if (e.type === 'touchend') e.preventDefault();
        e.stopPropagation();
        window._liveScoreIndex = parseInt($(this).data('idx'));
        await renderLiveScoreCard();
    });
    $(document).off('touchstart.liveswipe').on('touchstart.liveswipe', '#live-score-card-inner', function(e) {
        window._lsTouchStartX = e.originalEvent.touches[0].clientX;
    });
    $(document).off('touchend.liveswipe').on('touchend.liveswipe', '#live-score-card-inner', async function(e) {
        if (window._lsTouchStartX == null) return;
        const dx = e.originalEvent.changedTouches[0].clientX - window._lsTouchStartX;
        window._lsTouchStartX = null;
        if (Math.abs(dx) < 40) return;
        window._liveScoreIndex += (dx < 0 ? 1 : -1);
        await renderLiveScoreCard();
    });

// --- LEAGUE MATCHUP WEEK SWITCHER ---
    $(document).off('click touchend', '.schedule-week-pill').on('click touchend', '.schedule-week-pill', function(e) {
        if (e.type === 'touchend') e.preventDefault();
        
        // Don't fetch if they click the week they are already on
        if ($(this).css('background-color') === 'rgb(59, 130, 246)' || $(this).css('background-color') === 'var(--accent-blue)') return;
        
        const targetWeek = $(this).data('week');
        loadLeagueSchedule(targetWeek);
    });
async function fetchLeagueSalaryData() {
    try {
        window.leagueSalaryData = {};
        const positions = [
            { param: 'QB', grp: 'QB' }, { param: 'RB', grp: 'RB' }, { param: 'WR', grp: 'WR' },
            { param: 'TE', grp: 'TE' }, { param: 'PK', grp: 'PK' }, { param: 'DE', grp: 'DL' },
            { param: 'DT', grp: 'DL' }, { param: 'LB', grp: 'LB' }, { param: 'CB', grp: 'DB' },
            { param: 'S',  grp: 'DB' }
        ];
        await Promise.all(positions.map(async ({ param, grp }) => {
            const res = await fetch(`https://www45.myfantasyleague.com/${year}/reports?L=${lid}&R=SALARIES&POS=${param}&ROOKIES=0`, { credentials: 'include', cache: 'no-store' });
            const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
            doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
                const pLink = row.querySelector('td.player a');
                const salCell = row.querySelector('td.salary');
                if (!pLink || !salCell) return;
                const sal = parseFloat(salCell.textContent.replace(/[^0-9.]/g, '')) || 0;
                if (sal === 0) return;
                if (!window.leagueSalaryData[grp]) window.leagueSalaryData[grp] = [];
                window.leagueSalaryData[grp].push({ sal, name: pLink.textContent.trim() });
            });
        }));
        Object.keys(window.leagueSalaryData).forEach(grp => {
            window.leagueSalaryData[grp].sort((a, b) => b.sal - a.sal);
        });
    } catch (err) { console.error("Failed to fetch league salary data", err); }
}
async function fetchFranchises() {
        try {
            const res = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=league&L=${lid}&JSON=1`);
            const data = await res.json();
data.league.franchises.franchise.forEach(f => {
    leagueFranchises[f.id] = f.name;
    if (f.id === myFid) window._myOwnerName = (f.owner_name || '').split(',')[0].trim();
});
buildInlineTeamSwitcher();
applyTeamTheme(myFid, true);
setTimeout(() => {
    $('#team-info-panel-wrapper').html(buildTeamInfoPanel(fid));
}, 1500);
await loadAllTeamStylesFromHomepage();
reapplyAllTeamStyles();

            // Fetch trade block on startup
try {
                const tbRes = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=tradeBait&L=${lid}&INCLUDE_DRAFT_PICKS=1&JSON=1`, { credentials: 'include' });
                const tbData = await tbRes.json();
                if (tbData?.tradeBaits?.tradeBait) {
                    let baits = tbData.tradeBaits.tradeBait;
                    if (!Array.isArray(baits)) baits = [baits];
                    const targetFid= myFid === '0000' ? fid : myFid;
                    baits.forEach(bait => {
                        const bFid = (bait.franchise_id || bait.franchise || '').padStart(4,'0');
                        (bait.willGiveUp || '').split(',').filter(Boolean).forEach(id => {
                            tradeBlockPids.add(String(id));
                        });
                        if (bFid === targetFid) {
                            tradeBlockGiveUp = (bait.willGiveUp || '').split(',').filter(Boolean);
                        }
                    });

// Build pickIdMap for ALL picks from ALL teams' trade blocks
                    window._pickIdMap = {};
                    baits.forEach(bait => {
                        (bait.willGiveUp || '').split(',').filter(Boolean).forEach(id => {
                            if (id.startsWith('DP_')) {
                                const parts = id.split('_');
                                const round = parseInt(parts[1]) + 1;
                                const pick = parseInt(parts[2]) + 1;
                                const pickStr = `${round}.${String(pick).padStart(2,'0')}`;
                                window._pickIdMap[`${year}_${pickStr.replace('.','_')}`] = id;
                            }
                            if (id.startsWith('FP_')) {
                                const parts = id.split('_');
                                const pickYear = parts[2];
                                const origFid = parts[1];
                                const round = parts[3];
                                // Map both with and without origFid so we match regardless of who originally owned it
                                window._pickIdMap[`${pickYear}_${round}_${origFid}`] = id;
                                window._pickIdMap[`${pickYear}_${round}`] = id;
                            }
                        });
                    });
       
                }
            } catch(e) { console.warn('Trade block fetch failed at startup', e); }          // Silent standings prefetch to get record for header
            fetch(`https://www45.myfantasyleague.com/${year}/standings?L=${lid}`, { credentials: 'include' })
                .then(r => r.text())
                .then(html => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
                        const teamLink = row.querySelector('td.fname a');
                        const teamIdMatch = teamLink?.getAttribute('href').match(/F=(\d+)/i);
                       const rowFid = teamIdMatch?.[1];
if (rowFid) {
    window._allRecords = window._allRecords || {};
    window._allOwners = window._allOwners || {};
    window._allRecords[rowFid] = row.querySelector('td.h2hwlt')?.textContent.trim() || '';
window._allPF = window._allPF || {};
window._allPF[rowFid] = row.querySelector('td.pf')?.textContent.trim() || '';
if (rowFid === myFid) window._myPF = window._allPF[rowFid];
const titleAttr = teamLink?.getAttribute('title') || '';
    const ownerMatch = titleAttr.match(/Owner:\s*([^,]+)/i);
    window._allOwners[rowFid] = ownerMatch ? ownerMatch[1].trim() : '';
    if (rowFid === myFid) {
        $('#switcher-subtitle').html(window._allOwners[rowFid] ? `<span style="font-size:10px; font-weight:800; color:var(--text-dim);">${window._allOwners[rowFid]}</span>` : '');
    }
}
                    });
                }).catch(() => {});
        } catch (err) { console.error("Error fetching franchises", err); }
    }
// Cache schedule per team for info panel
fetch(`https://www45.myfantasyleague.com/${year}/schedule?L=${lid}&W=YTD`, { credentials: 'include' })
    .then(r => r.text())
    .then(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        window._allSchedule = window._allSchedule || {};
        doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length < 4) return;
            const week = cells[0]?.textContent.trim();
            const f1Link = cells[1]?.querySelector('a[class*="franchise_"]');
            const f2Link = cells[3]?.querySelector('a[class*="franchise_"]');
            if (!f1Link || !f2Link) return;
            const f1Fid = f1Link.getAttribute('class').match(/franchise_(\d+)/)?.[1]?.padStart(4,'0');
            const f2Fid = f2Link.getAttribute('class').match(/franchise_(\d+)/)?.[1]?.padStart(4,'0');
            const f1Score = parseFloat(cells[2]?.textContent) || 0;
            const f2Score = parseFloat(cells[4]?.textContent) || 0;
            const completed = f1Score > 0 || f2Score > 0;
            if (!f1Fid || !f2Fid) return;
            [f1Fid, f2Fid].forEach(fid2 => {
                window._allSchedule[fid2] = window._allSchedule[fid2] || {};
                const isF1 = fid2 === f1Fid;
                const myScore = isF1 ? f1Score : f2Score;
                const oppScore = isF1 ? f2Score : f1Score;
                const oppFid = isF1 ? f2Fid : f1Fid;
                const oppName = leagueFranchises[oppFid] || oppFid;
                if (completed) {
                    window._allSchedule[fid2].last = {
                        week, opp: oppName, score: `${myScore}-${oppScore}`,
                        won: myScore > oppScore
                    };
                } else if (!window._allSchedule[fid2].next) {
                    window._allSchedule[fid2].next = { week, opp: oppName };
                }
            });
        });
    }).catch(e => console.warn('Schedule prefetch failed', e));
// Prefetch calendar events for draft countdown
fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=123&MONTH=${new Date().getMonth()}&YEAR=${new Date().getFullYear()}`, { credentials: 'include' })
    .then(r => r.text())
    .then(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const events = [];
        doc.querySelectorAll('td[valign="top"]').forEach(cell => {
            const dayEl = cell.querySelector('.calendarday');
            if (!dayEl) return;
            const dayNum = parseInt(dayEl.textContent.trim());
            if (isNaN(dayNum)) return;
            cell.querySelectorAll('li').forEach(li => {
                const cls = li.className || '';
                const text = li.textContent.trim();
                if (!text) return;
                const eventDate = new Date(new Date().getFullYear(), new Date().getMonth(), dayNum);
                events.push({ date: eventDate, text, cls });
            });
        });
        // Also fetch next month
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=123&MONTH=${nextMonth.getMonth()}&YEAR=${nextMonth.getFullYear()}`, { credentials: 'include' })
            .then(r => r.text())
            .then(html2 => {
                const doc2 = new DOMParser().parseFromString(html2, 'text/html');
                doc2.querySelectorAll('td[valign="top"]').forEach(cell => {
                    const dayEl = cell.querySelector('.calendarday');
                    if (!dayEl) return;
                    const dayNum = parseInt(dayEl.textContent.trim());
                    if (isNaN(dayNum)) return;
                    cell.querySelectorAll('li').forEach(li => {
                        const cls = li.className || '';
                        const text = li.textContent.trim();
                        if (!text) return;
                        const eventDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), dayNum);
                        events.push({ date: eventDate, text, cls });
                    });
                });
                window._calendarEvents = events;
                console.log('Calendar prefetched:', events.length, 'events');
            });
    })
.catch(e => console.warn('Calendar prefetch failed', e));

async function loadModalGameLog(pid) {
    const container = $('#modal-gamelog-container');
    container.html('<div style="text-align:center; padding:20px; color:var(--accent-blue); font-weight:800; font-size:11px; text-transform:uppercase; animation:pulse-blue 1.5s infinite;">Loading...</div>');
    
    let activeYear = parseInt(year);
    let activeLogTab = 'stats';

    async function fetchAndRender() {
    console.log('fetchAndRender called, pid:', pid, 'activeYear:', activeYear);

        container.html('<div style="text-align:center; padding:20px; color:var(--accent-blue); font-weight:800; font-size:11px; text-transform:uppercase; animation:pulse-blue 1.5s infinite;">Loading...</div>');
        try {
            const [statsRes, projRes] = await Promise.all([
                fetch(`https://www45.myfantasyleague.com/${year}/player?L=${lid}&P=${pid}&YEAR=${activeYear}&DISPLAY_TYPE=stats&PROJSRC=mfl`, { credentials: 'include' }),
                fetch(`https://www45.myfantasyleague.com/${year}/player?L=${lid}&P=${pid}&YEAR=${activeYear}&DISPLAY_TYPE=projections&PROJSRC=mfl`, { credentials: 'include' })
            ]);
            const [statsDoc, projDoc] = [
                new DOMParser().parseFromString(await statsRes.text(), 'text/html'),
                new DOMParser().parseFromString(await projRes.text(), 'text/html')
            ];

            const headerCells = Array.from(projDoc.querySelectorAll('#player_stats_table th[title]')).map(th => th.getAttribute('title'));

            function parseRows(doc) {
                const map = {};
                doc.querySelectorAll('#player_stats_table tr.oddtablerow, #player_stats_table tr.eventablerow').forEach(row => {
                    const weekTd = row.querySelector('td.week');
                    if (!weekTd) return;
                    const weekText = weekTd.textContent.trim();
                    if (weekText.toLowerCase().includes('total')) return;
                    const week = parseInt(weekText);
                    if (isNaN(week)) return;
                    const pts = row.querySelector('td.points')?.textContent.trim() || '';
                    const opp = row.querySelectorAll('td')[2]?.textContent.trim() || '';
                    const statCells = Array.from(row.querySelectorAll('td.points')).map(td => td.textContent.trim());
                    map[week] = { pts, opp, stats: statCells };
                });
                return map;
            }

            const statsMap = parseRows(statsDoc);
            const projMap = parseRows(projDoc);
console.log('statsMap keys:', Object.keys(statsMap), 'projMap keys:', Object.keys(projMap));
            const hasStats = Object.keys(statsMap).length > 0;
            const hasProj = Object.keys(projDoc.querySelectorAll('#player_stats_table tr.oddtablerow, #player_stats_table tr.eventablerow')).length > 0 && Object.keys(projMap).length > 0;

            // Only show stats tab for prior years, proj only for current year
            const isPriorYear = activeYear < parseInt(year);
if (activeLogTab === 'proj') activeLogTab = 'stats';

            const careerRows = [];
            projDoc.querySelectorAll('table.biohistory tr.oddtablerow, table.biohistory tr.eventablerow').forEach(row => {
                const yearTd = row.querySelector('td.year');
                if (!yearTd) return;
                const yr = yearTd.textContent.trim().replace('*', '');
                const cells = Array.from(row.querySelectorAll('td.points')).map(td => td.textContent.trim());
                if (cells.length) careerRows.push({ yr, cells, isProjected: yearTd.textContent.includes('*') });
            });

            const bioRows = {};
            projDoc.querySelectorAll('table.biography tr').forEach(row => {
                const th = row.querySelector('th')?.textContent.trim().replace(':','');
                const td = row.querySelector('td')?.textContent.trim();
                if (th && td) bioRows[th] = td;
            });

            const allWeeks = Array.from({length: 18}, (_, i) => i + 1);

function buildWeekRows() {
    const mergedMap = {};
    allWeeks.forEach(w => {
        const hasRealStats = statsMap[w] && statsMap[w].pts && statsMap[w].pts.trim() !== '';
        mergedMap[w] = hasRealStats ? statsMap[w] : (projMap[w] || null);
    });

    if (!Object.values(mergedMap).some(v => v && (v.pts || v.opp))) {
        return `<div style="text-align:center; padding:20px; color:var(--text-dim); font-size:11px;">No data available.</div>`;
    }

    // Build column headers from headerCells
    const shortLabels = headerCells.map(c => 
        c.replace('Number of ','').replace('Pass Completions','Comp').replace('Pass Attempts','Att')
         .replace('Passing Yards','Yds').replace('Passing ','').replace('Rushing Yards','Yds')
         .replace('Rushing ','').replace('Receiving Yards','Yds').replace('Receiving ','')
         .replace('Fumbles Lost (to Opponent)','Fum').substring(0,4).toUpperCase()
    );

let html = `
        <table style="width:100%; border-collapse:collapse; font-size:10px;">
            <thead>
                <tr style="border-bottom:1px solid var(--card-border);">
                    <th style="padding:6px 8px; text-align:left; font-size:8px; font-weight:900; color:var(--text-dim); text-transform:uppercase; white-space:nowrap; position:sticky; left:0; background:var(--page-bg); z-index:2;">Wk</th>
<th style="padding:6px 8px; text-align:left; font-size:8px; font-weight:900; color:var(--text-dim); text-transform:uppercase; white-space:nowrap; position:sticky; left:28px; background:var(--page-bg); z-index:2;">vs</th>                    <th style="padding:6px 8px; text-align:center; font-size:8px; font-weight:900; color:var(--text-dim); text-transform:uppercase; white-space:nowrap;">Pts</th>
                    <th style="padding:6px 8px; text-align:center; font-size:8px; font-weight:900; color:var(--text-dim); text-transform:uppercase; white-space:nowrap;">PA Rank</th>
                    ${shortLabels.map(l => `<th style="padding:6px 4px; text-align:center; font-size:8px; font-weight:900; color:var(--text-dim); text-transform:uppercase; white-space:nowrap;">${l}</th>`).join('')}
                </tr>
            </thead>
            <tbody>`;

    allWeeks.forEach(w => {
        const d = mergedMap[w];
        const hasRealStats = statsMap[w] && statsMap[w].pts && statsMap[w].pts.trim() !== '';
        const isProj = !hasRealStats && !!projMap[w];
        const isBye = d?.opp?.toLowerCase() === 'bye';
        const opp = d?.opp || '—';
        const pts = d?.pts || '';
        const ptsNum = parseFloat(pts) || 0;
        const ptsColor = isProj ? '#f59e0b' : ptsNum >= 20 ? '#22c55e' : ptsNum >= 10 ? '#fff' : ptsNum > 0 ? '#ef4444' : 'var(--text-dim)';
        const statCells = d?.stats || [];
        const rowOpacity = isBye ? '0.35' : !d ? '0.2' : '1';

        if (isBye) {
            html += `
<tr style="border-bottom:1px solid rgba(255,255,255,0.04); opacity:${rowOpacity};">
                    <td style="padding:7px 8px; font-size:10px; font-weight:900; color:var(--text-dim); position:sticky; left:0; background:var(--page-bg); z-index:1;">${w}</td>
                    <td style="padding:7px 8px; font-size:10px; color:var(--text-dim); position:sticky; left:28px; background:var(--page-bg); z-index:1; font-weight:900;" colspan="${3 + shortLabels.length - 1}">BYE</td>
                </tr>`;
            return;
        }

        if (!d) {
            html += `
<tr style="border-bottom:1px solid rgba(255,255,255,0.04); opacity:${rowOpacity};">
                    <td style="padding:7px 8px; font-size:10px; font-weight:900; color:var(--text-dim); position:sticky; left:0; background:var(--page-bg); z-index:1;">${w}</td>
                    <td style="padding:7px 8px; font-size:10px; color:var(--text-dim); position:sticky; left:28px; background:var(--page-bg); z-index:1;">—</td>
                    <td style="padding:7px 8px; font-size:10px; color:var(--text-dim); text-align:right;">—</td>
                    ${shortLabels.map(() => `<td style="padding:7px 4px; text-align:right; color:var(--text-dim);">—</td>`).join('')}
                </tr>`;
            return;
        }

html += `
            <tr style="border-bottom:1px solid rgba(255,255,255,0.04); ${isProj ? 'opacity:0.7;' : ''}">
                <td style="padding:7px 8px; font-size:10px; font-weight:900; color:var(--text-dim); white-space:nowrap; position:sticky; left:0; background:var(--page-bg); z-index:1;">${w}${isProj ? '<span style="font-size:7px; color:#f59e0b; margin-left:2px;">P</span>' : ''}</td>
<td style="padding:7px 8px; position:sticky; left:28px; background:var(--page-bg); z-index:1; white-space:nowrap;">${(() => {
    const isHome = !opp.startsWith('at');
    const teamMatch = opp.match(/([A-Za-z]+)$/);
    const nflMap = { Cardinals:'ARI', Falcons:'ATL', Ravens:'BAL', Bills:'BUF', Panthers:'CAR', Bears:'CHI', Bengals:'CIN', Browns:'CLE', Cowboys:'DAL', Broncos:'DEN', Lions:'DET', Packers:'GBP', Texans:'HOU', Colts:'IND', Jaguars:'JAC', Chiefs:'KCC', Raiders:'LVR', Chargers:'LAC', Rams:'LAR', Dolphins:'MIA', Vikings:'MIN', Patriots:'NEP', Saints:'NOS', Giants:'NYG', Jets:'NYJ', Eagles:'PHI', Steelers:'PIT', '49ers':'SFO', Seahawks:'SEA', Buccaneers:'TBB', Titans:'TEN', Commanders:'WAS' };
    const abbr = teamMatch ? (nflMap[teamMatch[1]] || teamMatch[1].toUpperCase()) : 'NFL';
    return `<div style="display:flex; align-items:center; gap:4px;">
        <span style="font-size:8px; font-weight:900; color:var(--text-dim);">${isHome ? 'vs' : '@'}</span>
        <img src="${getNFLLogoUrl(abbr)}" onerror="this.style.display='none'" style="width:20px; height:20px; object-fit:contain;">
    </div>`;
})()}</td>               <td style="padding:7px 8px; font-size:13px; font-weight:900; color:${ptsColor}; text-align:center; white-space:nowrap;">${pts || '—'}</td>
                ${(() => {
                    const nflMap = { Cardinals:'ARI', Falcons:'ATL', Ravens:'BAL', Bills:'BUF', Panthers:'CAR', Bears:'CHI', Bengals:'CIN', Browns:'CLE', Cowboys:'DAL', Broncos:'DEN', Lions:'DET', Packers:'GBP', Texans:'HOU', Colts:'IND', Jaguars:'JAC', Chiefs:'KCC', Raiders:'LVR', Chargers:'LAC', Rams:'LAR', Dolphins:'MIA', Vikings:'MIN', Patriots:'NEP', Saints:'NOS', Giants:'NYG', Jets:'NYJ', Eagles:'PHI', Steelers:'PIT', '49ers':'SFO', Seahawks:'SEA', Buccaneers:'TBB', Titans:'TEN', Commanders:'WAS' };
                    const teamMatch = opp.match(/([A-Za-z]+)$/);
                    const abbr = teamMatch ? (nflMap[teamMatch[1]] || teamMatch[1].toUpperCase()) : null;
                    const pos = $('#modal-pos').text().trim();
                    const rankNum = abbr && pointsAllowedRankMap[pos] ? pointsAllowedRankMap[pos][abbr] : null;
                    const rankColor = rankNum >= 24 ? '#22c55e' : rankNum <= 9 ? '#ef4444' : 'var(--text-dim)';
                    const rankDisplay = rankNum ? `<span style="font-size:10px; font-weight:900; color:${rankColor};">#${rankNum}</span>` : `<span style="color:var(--text-dim);">—</span>`;
                    return `<td style="padding:7px 8px; text-align:center; white-space:nowrap;">${rankDisplay}</td>`;
                })()}
                ${shortLabels.map((_, i) => {
                    const val = statCells[i + 1];
                    const clean = val && val.trim() && val.trim() !== '\u00a0' ? (parseFloat(val) % 1 === 0 ? val : parseFloat(val).toFixed(1)) : '—';
                    return `<td style="padding:7px 4px; font-size:10px; font-weight:800; color:${isProj ? '#f59e0b' : 'var(--text-dim)'}; text-align:center; white-space:nowrap;">${clean}</td>`;
                }).join('')}
            </tr>`;
    });

    html += `</tbody></table>`;
    return html;
}

            function buildCareerTable() {
                if (!careerRows.length) return `<div style="text-align:center; padding:20px; color:var(--text-dim);">No career data.</div>`;
                const colHeaders = Array.from(projDoc.querySelectorAll('table.biohistory th')).map(th => th.textContent.trim()).filter(t => t && t !== '\u00a0');
                return `
                    <div style="overflow-x:auto;" class="hide-scroll">
                        <table style="width:100%; border-collapse:collapse; font-size:10px;">
                            <thead>
                                <tr>${colHeaders.map(h => `<th style="padding:5px 8px; text-align:center; font-size:8px; font-weight:900; color:var(--text-dim); text-transform:uppercase; white-space:nowrap; border-bottom:1px solid var(--card-border);">${h}</th>`).join('')}</tr>
                            </thead>
                            <tbody>
                                ${careerRows.map(r => `
                                    <tr style="border-bottom:1px solid rgba(255,255,255,0.04); ${r.isProjected ? 'opacity:0.7;' : ''}">
                                        <td style="padding:6px 8px; font-weight:900; color:${r.isProjected ? '#f59e0b' : 'var(--accent-blue)'}; white-space:nowrap;">${r.yr}${r.isProjected ? '*' : ''}</td>
                                        ${r.cells.map(c => `<td style="padding:6px 8px; text-align:center; color:#fff; font-weight:800;">${c}</td>`).join('')}
                                    </tr>`).join('')}
                            </tbody>
                        </table>
                        ${careerRows.some(r => r.isProjected) ? `<div style="font-size:9px; color:var(--text-dim); padding:8px; text-align:center;">* Projected</div>` : ''}
                    </div>`;
            }

            function buildBioSection() {
                const fields = [
                    { key: 'Height/Weight', label: 'Height/Weight' },
                    { key: 'DOB/Age', label: 'Age' },
                    { key: 'College', label: 'College' },
                    { key: 'Drafted', label: 'Drafted' },
                    { key: 'Experience', label: 'Experience' },
                    { key: 'Bye Week', label: 'Bye Week' },
                ].filter(f => bioRows[f.key]);
                return fields.length ? `
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; padding:10px;">
                        ${fields.map(f => `
                            <div style="background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; padding:8px 10px;">
                                <div style="font-size:8px; font-weight:900; color:var(--text-dim); text-transform:uppercase; margin-bottom:3px;">${f.label}</div>
                                <div style="font-size:11px; font-weight:800; color:#fff; line-height:1.3;">${bioRows[f.key]}</div>
                            </div>`).join('')}
                    </div>` : '<div style="text-align:center; padding:20px; color:var(--text-dim);">No bio data.</div>';
            }

function getTabContent() {
    if (activeLogTab === 'stats') return buildWeekRows();
    if (activeLogTab === 'career') return buildCareerTable();
    if (activeLogTab === 'bio') return buildBioSection();
    return '';
}

            const currentYearInt = parseInt(year);
            const priorYear = currentYearInt - 1;

            container.html(`
                <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 10px; border-bottom:1px solid var(--card-border); background:rgba(0,0,0,0.2);">
                    <div style="display:flex; gap:4px;">
                        <button class="gl-year-btn" data-yr="${currentYearInt}" style="padding:4px 10px; border-radius:6px; font-size:10px; font-weight:900; cursor:pointer; border:1px solid ${activeYear===currentYearInt?'var(--accent-blue)':'var(--card-border)'}; background:${activeYear===currentYearInt?'var(--accent-blue)':'rgba(255,255,255,0.05)'}; color:${activeYear===currentYearInt?'#fff':'var(--text-dim)'};">${currentYearInt}</button>
                        <button class="gl-year-btn" data-yr="${priorYear}" style="padding:4px 10px; border-radius:6px; font-size:10px; font-weight:900; cursor:pointer; border:1px solid ${activeYear===priorYear?'var(--accent-blue)':'var(--card-border)'}; background:${activeYear===priorYear?'var(--accent-blue)':'rgba(255,255,255,0.05)'}; color:${activeYear===priorYear?'#fff':'var(--text-dim)'};">${priorYear}</button>
                    </div>
                    <div style="display:flex; gap:0; overflow-x:auto;" class="hide-scroll" id="gamelog-tabs">
${'<div class="gl-tab" data-tab="stats" style="flex-shrink:0; padding:8px 12px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; color:' + (activeLogTab==='stats'?'#fff':'var(--text-dim)') + '; border-bottom:2px solid ' + (activeLogTab==='stats'?'var(--accent-blue)':'transparent') + ';">Stats</div>'}
<div class="gl-tab" data-tab="career" style="flex-shrink:0; padding:8px 12px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; color:${activeLogTab==='career'?'#fff':'var(--text-dim)'}; border-bottom:2px solid ${activeLogTab==='career'?'var(--accent-blue)':'transparent'};">Career</div>
<div class="gl-tab" data-tab="bio" style="flex-shrink:0; padding:8px 12px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; color:${activeLogTab==='bio'?'#fff':'var(--text-dim)'}; border-bottom:2px solid ${activeLogTab==='bio'?'var(--accent-blue)':'transparent'};">Bio</div>                    </div>
                </div>
                <div id="gamelog-content" style="max-height:350px; overflow-y:auto;">
                    ${getTabContent()}
                </div>
            `);

$(document).off('click', '.gl-year-btn').on('click', '.gl-year-btn', function(e) {
    e.stopPropagation();
    activeYear = parseInt($(this).data('yr'));
    fetchAndRender();
});

$(document).off('click', '.gl-tab').on('click', '.gl-tab', function(e) {
    e.stopPropagation();
    activeLogTab = $(this).data('tab');
    $('.gl-tab').css({ color: 'var(--text-dim)', borderBottomColor: 'transparent' });
    $(this).css({ color: '#fff', borderBottomColor: 'var(--accent-blue)' });
    $('#gamelog-content').html(getTabContent());
});

        } catch(e) {
            console.error('loadModalGameLog error:', e);
            container.html('<div style="text-align:center; color:#ef4444; padding:20px;">Failed to load game log.</div>');
        }
    }

    fetchAndRender();
}

async function loadModalContract(pid) {
    console.log('loadModalContract called, pid:', pid, 'fid:', fid);
    const container = $('#modal-actions-container');
    console.log('container found:', container.length);
    container.html('<div style="text-align:center; padding:20px; color:var(--accent-blue); font-weight:800; font-size:11px; text-transform:uppercase; animation:pulse-blue 1.5s infinite;">Loading...</div>');
    try {
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=07&F=${fid}`, { credentials: 'include' });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        const rows = Array.from(doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow'));
        console.log('rows found:', rows.length);
        const startYear = parseInt(year) || 2026;

        let found = null;
        rows.forEach(row => {
            const playerLink = row.querySelector('td.player a[class*="position_"]');
            if (!playerLink) return;
            const rowPid = playerLink.getAttribute('href').match(/\d+/g)?.pop();
            if (rowPid === String(pid)) found = row;
        });

        if (!found) {
            container.html('<div style="text-align:center; padding:20px; color:var(--text-dim);">No contract data found.</div>');
            return;
        }

        const salary = found.querySelector('td.salary')?.textContent.trim() || '$0';
        const yrsStr = found.querySelector('td.contractyear')?.textContent.trim() || '0';
        const guar = found.querySelector('td.contractinfo')?.textContent.trim() || '0%';
        const salNum = parseFloat(salary.replace(/[^0-9.]/g, '')) || 0;
        const yrsNum = parseInt(yrsStr) || 0;
        const gPct = parseFloat(guar.replace(/[^0-9.]/g, '')) / 100 || 0;
        const expirationYear = startYear + yrsNum - 1;
        const capHit = (salNum * gPct * yrsNum).toFixed(1);

        // Fetch dynasty rank
        const playerPos = $('#modal-pos').text().trim();
        let posGroup = playerPos;
        if (['DE','DT'].includes(posGroup)) posGroup = 'DL';
        if (['CB','S'].includes(posGroup)) posGroup = 'DB';
        const adpPosMap = { QB:'QB', RB:'RB', WR:'WR', TE:'TE', PK:'PK', DL:'DL', LB:'LB', DB:'DB' };
        const adpPos = adpPosMap[posGroup] || posGroup;

        let dynastyRank = null;
        let baseFloor = null;
        let drawerRows = '';
        try {
            const adpRes = await fetch(`https://www45.myfantasyleague.com/${year}/reports?R=RANKS&L=${lid}&STATUS=*&POS=${adpPos}&ROOKIES=0&INJURED=0&SOURCE=sharks`, { credentials: 'include', cache: 'no-store' });
            const adpDoc = new DOMParser().parseFromString(await adpRes.text(), 'text/html');
            adpDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach((row, idx) => {
                if (dynastyRank) return;
                const pLink = row.querySelector('td.player a');
                if (!pLink) return;
                const pidMatch = pLink.getAttribute('href').match(/\d+/g);
                if (pidMatch && pidMatch.pop() === String(pid)) dynastyRank = idx + 1;
            });
            if (!dynastyRank) dynastyRank = 99;
            const targetRank = Math.max(1, dynastyRank - 5);
            const salaries = (window.leagueSalaryData && window.leagueSalaryData[posGroup]) || [];
            baseFloor = targetRank <= salaries.length ? Math.max(5, salaries[targetRank - 1].sal) : 5;
            const start = Math.max(0, targetRank - 4);
            const end = Math.min(salaries.length, targetRank + 3);
            drawerRows = salaries.slice(start, end).map((entry, i) => {
                const idx = start + i;
                const isTarget = idx === targetRank - 1;
                return `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 10px;border-bottom:1px solid rgba(255,255,255,0.04);background:${isTarget?'rgba(245,158,11,0.12)':'transparent'};"><div style="display:flex;align-items:center;gap:8px;"><span style="font-size:9px;font-weight:900;color:${isTarget?'#f59e0b':'var(--text-dim)'};min-width:20px;">#${idx+1}</span><span style="font-size:11px;font-weight:${isTarget?'900':'700'};color:${isTarget?'#f59e0b':'#fff'};">${entry.name}</span></div><span style="font-size:11px;font-weight:900;color:${isTarget?'#f59e0b':'#fff'};white-space:nowrap;">$${entry.sal}m${isTarget?' ← floor':''}</span></div>`;
            }).join('');
        } catch(e) { console.warn('Could not fetch dynasty rank', e); }

        // Build yearly cap hit columns
        let capHitRows = '<div style="display:flex;gap:6px;padding:8px;overflow-x:auto;" class="hide-scroll">';
        for (let i = 0; i < yrsNum; i++) {
            const yearLabel = startYear + i;
            const remainingYears = yrsNum - i;
            const capHitAmt = Math.round(salNum * gPct * remainingYears * 10) / 10;
            const isFirst = i === 0;
            capHitRows += `
                <div style="flex:1;min-width:70px;background:${isFirst?'rgba(59,130,246,0.08)':'rgba(0,0,0,0.2)'};border:1px solid ${isFirst?'rgba(59,130,246,0.3)':'rgba(255,255,255,0.05)'};border-radius:6px;padding:7px;text-align:center;">
                    <div style="font-size:10px;font-weight:900;color:${isFirst?'var(--accent-blue)':'var(--text-dim)'};margin-bottom:5px;">${yearLabel}</div>
                    <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;">Salary</div>
                    <div style="font-size:11px;font-weight:900;color:#22c55e;margin-bottom:4px;">${salary}</div>
                    <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;">Dead Cap</div>
                    <div style="font-size:11px;font-weight:900;color:#ef4444;">$${capHitAmt.toFixed(1)}m</div>
                    <div style="font-size:8px;color:var(--text-dim);margin-top:3px;">${remainingYears} yr${remainingYears!==1?'s':''} left</div>
                </div>`;
        }
        capHitRows += '</div>';

        const salaryCap = window.leagueSalaryCap || 823;
        const capUsed = window.currentTeamCapUsed || 0;
        const capPct = Math.min(100, (capUsed / salaryCap) * 100).toFixed(1);
        const barColor = capUsed > salaryCap ? '#ef4444' : capPct > 90 ? '#f59e0b' : '#22c55e';
        const capRemaining = (salaryCap - capUsed).toFixed(1);

        container.html(`
            <div style="animation:fadeIn 0.3s ease;">
                <div style="font-size:11px;font-weight:900;color:#fff;text-transform:uppercase;margin-bottom:10px;text-align:center;">${$('#modal-name').text().trim()}</div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;">
                    ${dynastyRank ? `
                    <div style="background:rgba(0,0,0,0.3);border-radius:6px;padding:7px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;" id="contract-floor-toggle">
                        <div>
                            <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;margin-bottom:2px;">Dynasty Rank</div>
                            <div style="font-size:13px;font-weight:900;color:var(--accent-blue);">#${dynastyRank}</div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;margin-bottom:2px;">Floor</div>
                            <div style="font-size:13px;font-weight:900;color:#f59e0b;">${baseFloor ? '$'+baseFloor+'m' : '—'}</div>
                        </div>
                    </div>` : '<div></div>'}
                    <div style="background:rgba(0,0,0,0.3);border-radius:6px;padding:7px;">
                        <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;margin-bottom:4px;text-align:center;">Contract</div>
                        <div style="font-size:13px;font-weight:900;color:#22c55e;text-align:center;">${salary}/yr</div>
                        <div style="font-size:9px;color:var(--text-dim);text-align:center;margin-top:3px;">${yrsNum} yr${yrsNum!==1?'s':''} · ${guar} · expires ${expirationYear}</div>
                    </div>
                </div>

                ${drawerRows ? `
                <div id="contract-floor-drawer" style="display:none;background:rgba(0,0,0,0.2);border-radius:6px;overflow:hidden;margin-bottom:10px;">
                    <div style="font-size:9px;font-weight:900;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px;padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.05);">${posGroup} salaries — floor reference</div>
                    ${drawerRows}
                </div>` : ''}

                <div id="contract-yearly-drawer" style="margin-bottom:10px;">
                    <div style="font-size:9px;font-weight:900;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px;padding:7px 0 6px;border-bottom:1px solid rgba(255,255,255,0.05);margin-bottom:4px;">Dead Cap by Year</div>
                    ${capHitRows}
                </div>

                <div style="background:rgba(0,0,0,0.2);border-radius:6px;padding:7px 10px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span style="font-size:9px;font-weight:900;color:var(--text-dim);text-transform:uppercase;white-space:nowrap;">Cap</span>
                        <div style="flex:1;height:5px;background:rgba(255,255,255,0.1);border-radius:10px;overflow:hidden;">
                            <div style="height:100%;width:${capPct}%;background:${barColor};border-radius:10px;"></div>
                        </div>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:5px;">
                        <div>
                            <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;">Used</div>
                            <div style="font-size:11px;font-weight:900;color:${barColor};">$${capUsed.toFixed(1)}m</div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;">Remaining</div>
                            <div style="font-size:11px;font-weight:900;color:${parseFloat(capRemaining) < 0 ? '#ef4444' : 'var(--text-dim)'};">$${capRemaining}m</div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        // Floor drawer toggle
        $(document).off('click', '#contract-floor-toggle').on('click', '#contract-floor-toggle', function() {
            $('#contract-floor-drawer').slideToggle(200);
        });

    } catch(e) {
        console.error('loadModalContract error:', e);
        container.html('<div style="text-align:center; color:#ef4444; padding:20px;">Failed to load contract.</div>');
    }
}
// --- LEAGUE CALENDAR ---
async function loadLeagueCalendar() {
    const modal = $('#calendar-modal');
    const content = $('#calendar-modal-content');
    content.html('<div style="text-align:center; padding:30px; color:var(--accent-blue); font-weight:800; font-size:11px; text-transform:uppercase; animation:pulse-blue 1.5s infinite;">Loading Calendar...</div>');
    modal.css('display','flex').hide().fadeIn(200);
    $('body').css('overflow','hidden');

    try {
        const today = new Date();
        // Build list of months to fetch: current + next 4
        const monthsToFetch = [];
        for (let i = 0; i < 5; i++) {
            const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
            // MFL uses 0-based month index internally but their URL uses offset from Feb
            // Their MONTH param: Jan=0,Feb=1,Mar=2,Apr=3,May=4,Jun=5,Jul=6,Aug=7,Sep=8,Oct=9,Nov=10,Dec=11
            const mflMonth = d.getMonth(); // JS month is already 0-based matching MFL
            monthsToFetch.push({ mflMonth, year: d.getFullYear(), label: d.toLocaleString('default', { month: 'long', year: 'numeric' }) });
        }

        const fetchPromises = monthsToFetch.map(m =>
            fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=123&MONTH=${m.mflMonth}&YEAR=${m.year}`, { credentials: 'include', cache: 'no-store' })
                .then(r => r.text())
                .then(html => ({ ...m, html }))
        );
        const results = await Promise.all(fetchPromises);

        // Parse events from each month
        const allEvents = [];
        results.forEach(({ mflMonth, year: yr, html }) => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            doc.querySelectorAll('td[valign="top"]').forEach(cell => {
                const dayEl = cell.querySelector('.calendarday');
                if (!dayEl) return;
                const dayNum = parseInt(dayEl.textContent.trim());
                if (isNaN(dayNum)) return;
                cell.querySelectorAll('li').forEach(li => {
                    const cls = li.className || '';
                    const text = li.textContent.trim();
                    if (!text) return;
                    // Build a proper date: MFL MONTH param is 0=Jan offset from their Feb start
                    // Actually MFL MONTH=5 = June (confirmed from your data), so it matches JS Date month
                    const eventDate = new Date(yr, mflMonth, dayNum);
                    allEvents.push({ date: eventDate, text, cls, yr, mflMonth, dayNum });
                });
            });
        });

        // Sort by date
       // Sort by date
        allEvents.sort((a, b) => a.date - b.date);
        window._calendarEvents = allEvents;

        if (allEvents.length === 0) {
            content.html('<div style="text-align:center; padding:30px; color:var(--text-dim); font-size:12px;">No upcoming events found.</div>');
            return;
        }

        // Color/icon map by event class
function getEventStyle(cls) {
            if (cls.includes('auction')) return { icon: '<i class="fas fa-tag" style="font-size:13px;"></i>', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' };
            if (cls.includes('draft')) return { icon: '<i class="fas fa-football" style="font-size:13px;"></i>', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)' };
            if (cls.includes('trade')) return { icon: '<i class="fas fa-right-left" style="font-size:13px;"></i>', color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.3)' };
            if (cls.includes('waiver') || cls.includes('free')) return { icon: '<i class="fas fa-clipboard-list" style="font-size:13px;"></i>', color: '#00ceb8', bg: 'rgba(0,206,184,0.1)', border: 'rgba(0,206,184,0.3)' };
            if (cls.includes('playoff') || cls.includes('champion')) return { icon: '<i class="fas fa-trophy" style="font-size:13px;"></i>', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)' };
            if (cls.includes('season')) return { icon: '<i class="fas fa-bolt" style="font-size:13px;"></i>', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)' };
            return { icon: '<i class="fas fa-calendar-day" style="font-size:13px;"></i>', color: '#94a3b8', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' };
        }

        // Group by month
        const grouped = {};
        allEvents.forEach(ev => {
            const key = ev.date.toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(ev);
        });

        const todayMs = new Date().setHours(0,0,0,0);

        let html = '';
        Object.entries(grouped).forEach(([monthLabel, events]) => {
            html += `<div style="font-size:9px; font-weight:900; color:var(--accent-blue); text-transform:uppercase; letter-spacing:2px; padding:10px 0 6px; border-bottom:1px solid var(--card-border); margin-bottom:10px;">${monthLabel}</div>`;
            events.forEach(ev => {
                const style = getEventStyle(ev.cls);
                const evMs = ev.date.setHours(0,0,0,0);
                const isPast = evMs < todayMs;
                const isToday = evMs === todayMs;
                const dayName = ev.date.toLocaleString('default', { weekday: 'short' });
                const dayNum = ev.dayNum;
                const opacity = isPast ? '0.4' : '1';
                const todayBadge = isToday ? `<span style="font-size:8px; font-weight:900; color:#ef4444; background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); border-radius:4px; padding:1px 5px; margin-left:6px;">TODAY</span>` : '';

                html += `
                    <div style="display:flex; align-items:center; gap:10px; padding:10px 12px; background:${style.bg}; border:1px solid ${style.border}; border-radius:8px; margin-bottom:6px; opacity:${opacity};">
                        <div style="flex-shrink:0; width:38px; text-align:center;">
                            <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase;">${dayName}</div>
                            <div style="font-size:20px; font-weight:900; color:${style.color}; line-height:1.1;">${dayNum}</div>
                        </div>
                        <div style="width:1px; height:36px; background:${style.border}; flex-shrink:0;"></div>
                        <div style="flex:1; min-width:0;">
                            <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
<span style="color:${style.color};">${style.icon}</span>
                                <span style="font-size:12px; font-weight:800; color:#fff;">${ev.text}</span>
                                ${todayBadge}
                            </div>
                        </div>
                        ${isPast ? `<span style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; flex-shrink:0;">Done</span>` : ''}
                    </div>`;
            });
            html += `<div style="margin-bottom:14px;"></div>`;
        });

        content.html(html);

    } catch(e) {
        console.error('Calendar load error:', e);
        content.html('<div style="text-align:center; color:#ef4444; padding:30px; font-weight:800;">Failed to load calendar.</div>');
    }
}

// Calendar modal injection
if ($('#calendar-modal').length === 0) {
    $('body').append(`
        <div id="calendar-modal" class="player-modal-backdrop" style="display:none; z-index:99999;">
            <div class="settings-modal-box" style="max-width:420px;">
                <button class="player-modal-close" id="close-calendar-modal">✕</button>
                <div class="settings-header" style="background:linear-gradient(to bottom, rgba(96,165,250,0.15), transparent); padding:20px 20px 14px;">
<div style="display:flex; align-items:center; gap:10px;">
                        <i class="fas fa-calendar-days" style="font-size:20px; color:#60a5fa;"></i>
                        <h2 style="margin:0; color:#fff; font-size:16px; font-weight:900; text-transform:uppercase; letter-spacing:1px;">League Calendar</h2>
                    </div>
                </div>
                <div id="calendar-modal-content" class="settings-content-area hide-scroll" style="max-height:65vh; overflow-y:auto; padding:14px 16px;"></div>
            </div>
        </div>
    `);
}

// Calendar button listener
$(document).off('click', '#open-calendar-btn').on('click', '#open-calendar-btn', function() {
    loadLeagueCalendar();
});

// Calendar close listener
$(document).off('click', '#close-calendar-modal, #calendar-modal').on('click', '#close-calendar-modal, #calendar-modal', function(e) {
    if ($(e.target).closest('.settings-modal-box').length && !$(e.target).is('#close-calendar-modal')) return;
    $('#calendar-modal').fadeOut(200);
    $('body').css('overflow','');
});
async function loadModalHistory(pid) {
    const container = $('#modal-history-container');
    container.html('<div style="text-align:center; padding:20px; color:var(--accent-blue); font-weight:800; font-size:11px; text-transform:uppercase; animation:pulse-blue 1.5s infinite;">Loading...</div>');
    try {
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/player_history?L=${lid}&PLAYERS=${pid}&PROJSRC=mfl`, { credentials: 'include' });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        const rows = Array.from(doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow'));
        if (!rows.length) {
            container.html('<div style="text-align:center; padding:20px; color:var(--text-dim);">No transaction history found.</div>');
            return;
        }
        let html = '';
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length < 4) return;
            const yr = cells[0]?.textContent.trim();
            const franchise = cells[1]?.textContent.trim();
            const tx = cells[2]?.textContent.trim();
            const date = cells[3]?.textContent.trim();
            const fLink = cells[1]?.querySelector('a');
            const fidMatch = fLink?.getAttribute('href')?.match(/F=(\d+)/);
            const rowFid = fidMatch ? fidMatch[1].padStart(4,'0') : null;
            const logoUrl = rowFid ? `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${rowFid}.png` : null;
            const isTrade = tx.toLowerCase().includes('trade');
            const typeColor = isTrade ? '#a855f7' : tx.toLowerCase().includes('acquired') ? '#22c55e' : tx.toLowerCase().includes('cut') || tx.toLowerCase().includes('dropped') ? '#ef4444' : 'var(--accent-blue)';
            const typeLabel = isTrade ? '⇄ Trade' : tx.toLowerCase().includes('auction') ? '🏷️ Auction' : tx.toLowerCase().includes('acquired') ? '✅ Acquired' : tx.toLowerCase().includes('cut') ? '✂️ Cut' : tx.toLowerCase().includes('dropped') ? '❌ Dropped' : '📋 Transaction';
            html += `
                <div style="padding:10px 12px; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-left:3px solid ${typeColor}; border-radius:8px; margin-bottom:8px;">
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
                        <span style="font-size:9px; font-weight:900; color:${typeColor}; text-transform:uppercase;">${typeLabel}</span>
                        <span style="font-size:9px; color:var(--text-dim);">${yr} · ${date.replace(/:\d{2}\s+[ap]\.m\.\s+ET\s+\d{4}/i,'').trim()}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        ${logoUrl ? `<img src="${logoUrl}" style="width:24px; height:24px; border-radius:50%; object-fit:cover; background:var(--card-bg); border:1px solid rgba(255,255,255,0.1); flex-shrink:0;">` : ''}
                        <span style="font-size:11px; font-weight:900; color:#fff;">${franchise}</span>
                    </div>
                    ${tx ? `<div style="font-size:10px; color:var(--text-dim); margin-top:5px; line-height:1.4;">${tx}</div>` : ''}
                </div>`;
        });
        container.html(html);
    } catch(e) {
        console.error('loadModalHistory error:', e);
        container.html('<div style="text-align:center; color:#ef4444; padding:20px;">Failed to load history.</div>');
    }
}
function buildInlineTeamSwitcher() {
        const activeLogoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${fid}.png`;
        const activeTeamName = leagueFranchises[fid] || "My Franchise";

        if ($('#active-team-switcher-btn').length === 0) {
            const switcherBtn = `
                <div id="tab-header-area">
                <div id="active-team-switcher-btn" style="display: flex; align-items: center; gap: 15px; padding: 15px; cursor: pointer; width: 100%; box-sizing: border-box;">
                    <div style="position: relative; flex-shrink: 0;">
                       <img src="${activeLogoUrl}" onerror="this.src='https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/NFL.svg'" style="width: 55px; height: 55px; object-fit: contain; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">
${fid === '0001' ? `<div style="position:absolute; bottom:-4px; right:-8px; background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.5); border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center;">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2h12v6c0 3.31-2.69 6-6 6S6 11.31 6 8V2z" fill="#f59e0b"/>
        <path d="M4 2h2v5C6 7 5 8 4 8 2.9 8 2 7.1 2 6V4c0-1.1.9-2 2-2z" fill="#f59e0b" opacity="0.6"/>
        <path d="M18 2h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2-1 0-2-1-2-1V2z" fill="#f59e0b" opacity="0.6"/>
        <path d="M10 14h4l1 3H9l1-3z" fill="#f59e0b"/>
        <path d="M7 17h10v2H7v-2z" fill="#f59e0b"/>
    </svg>
</div>` : ''}
${myFid === '0000' ? `<div style="position:absolute; top:-4px; right:-8px; background:#f59e0b; color:#000; width:16px; height:16px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:900; border:1px solid #000; z-index:10;">C</div>` : ''}
                        
                        <div style="position: absolute; bottom: -6px; right: -8px; background: var(--card-bg); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.4);">
                            <span id="switcher-arrow" style="font-size: 9px; color: var(--text-dim); transition: transform 0.2s;">▼</span>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; flex: 1; overflow: hidden; justify-content: center;">
                        <span id="switcher-team-name" data-team-style="${fid}"  style="font-size: 18px; font-weight: 900; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: 0.5px;">${activeTeamName}</span>
<div id="switcher-subtitle" style="display:flex; flex-direction:column; gap:1px; margin-top:4px;">
    ${window._myOwnerName ? `<span style="font-size:10px; font-weight:800; color:var(--text-dim);">${window._myOwnerName}</span>` : ''}
</div>
                        <div id="team-info-panel-wrapper"></div>
                    </div>
                </div>
                </div>
            `;
            
            $('#subtabs-team').find('#active-team-switcher-btn').remove();
            $('#subtabs-team').before(switcherBtn);
            
            $('#subtabs-team').css({
                'border': '1px solid var(--card-border)',
                'border-top': '1px solid rgba(255,255,255,0.05)',
                'border-radius': '0 0 12px 12px',
                'background': 'rgba(0,0,0,0.2)',
                'margin-bottom': '15px',
                'justify-content': 'center'
            });
        } else {
            $('#active-team-switcher-btn img').first().attr('src', activeLogoUrl);
            $('#switcher-team-name').text(activeTeamName);
        }

        if ($('#team-selector-drawer').length === 0) {
            let listHtml = '';
            let sortedIds = Object.keys(leagueFranchises).sort((a,b) => {
                if (a === myFid) return -1;
                if (b === myFid) return 1;
                return leagueFranchises[a].localeCompare(leagueFranchises[b]);
            });

            sortedIds.forEach(id => {
                const isMe = (id === myFid);
                const isActive = (id === fid);
                const opacity = isActive ? '1' : '0.6';
                
                // CHANGED: Use glowing drop-shadows to indicate the active team instead of boxy borders
                const activeFilter = isActive 
                    ? 'drop-shadow(0 0 8px var(--accent-blue))' 
                    : isMe 
                        ? 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))' 
                        : 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))';

                const textColor = isActive ? '#fff' : 'var(--text-dim)';
                const logoUrl = `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${id}.png`;
                
                listHtml += `
                    <div class="team-selector-item" data-fid="${id}" style="display: flex; flex-direction: column; align-items: center; width: 18%; min-width: 60px; cursor: pointer; opacity: ${opacity}; transition: 0.2s; margin-bottom: 10px;">
                        <div style="position:relative; width:40px; height:40px;">
    <img class="team-selector-img" src="${logoUrl}" onerror="this.src='https://www.mflscripts.com/ImageDirectory/script-images/nflTeamsvg_2/NFL.svg'" style="width:40px; height:40px; object-fit:contain; filter:${activeFilter}; transition:filter 0.2s;">
    ${id === '0001' ? `<div style="position:absolute; bottom:-3px; right:-6px; background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.5); border-radius:50%; width:14px; height:14px; display:flex; align-items:center; justify-content:center;">
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
            <path d="M6 2h12v6c0 3.31-2.69 6-6 6S6 11.31 6 8V2z" fill="#f59e0b"/>
            <path d="M4 2h2v5C6 7 5 8 4 8 2.9 8 2 7.1 2 6V4c0-1.1.9-2 2-2z" fill="#f59e0b" opacity="0.6"/>
            <path d="M18 2h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2-1 0-2-1-2-1V2z" fill="#f59e0b" opacity="0.6"/>
            <path d="M10 14h4l1 3H9l1-3z" fill="#f59e0b"/>
            <path d="M7 17h10v2H7v-2z" fill="#f59e0b"/>
        </svg>
    </div>` : ''}
</div>
                        <span class="team-selector-text" data-team-style="${id.padStart(4,'0')}"  style="color: ${textColor}; font-weight: 800; font-size: 8px; text-align: center; margin-top: 6px; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-transform: uppercase;">${leagueFranchises[id]}</span>
                        ${isMe ? '<div style="background:var(--accent-blue); width:4px; height:4px; border-radius:50%; margin-top:2px;"></div>' : ''}
                    </div>
                `;
            });

            const drawerHtml = `
                <div id="team-selector-drawer" style="display: none; background: var(--page-bg); border-bottom: 2px solid var(--accent-blue); box-shadow: inset 0 10px 20px rgba(0,0,0,0.5); width: 100%; padding: 15px 5px 5px; box-sizing: border-box; margin-bottom: 15px; border-radius: 0 0 12px 12px; margin-top: -15px; position: relative; z-index: 10;">
                    <div style="display: flex; flex-wrap: wrap; gap: 2%; justify-content: center; align-items: flex-start;">
                        ${listHtml}
                    </div>
                </div>
            `;
            
            $('#subtabs-team').after(drawerHtml);

            $('#active-team-switcher-btn').off('click').on('click', function() {
                $('#team-selector-drawer').slideToggle(200);
                const arrow = $('#switcher-arrow');
                const isRotated = arrow.css('transform') !== 'none' && arrow.css('transform') !== 'matrix(1, 0, 0, 1, 0, 0)';
                arrow.css('transform', isRotated ? 'rotate(0deg)' : 'rotate(180deg)');
            });

            $('.team-selector-item').off('click').on('click', async function() {
                const newFid = $(this).data('fid').toString().padStart(4, '0');
                if (newFid === fid) {
                    $('#team-selector-drawer').slideUp(200);
                    $('#switcher-arrow').css('transform', 'rotate(0deg)');
                    return; 
                }
                
                fid = newFid;
applyTeamTheme(newFid, true);
                $('#team-selector-drawer').slideUp(200);
                $('#switcher-arrow').css('transform', 'rotate(0deg)');
                $('#active-team-switcher-btn img').first().attr('src', `https://www45.myfantasyleague.com/fflnetdynamic${year}/${lid}_franchise_logo${fid}.png`);
                $('#switcher-team-name').text(leagueFranchises[fid] || "My Franchise");
$('#switcher-team-name').text(leagueFranchises[fid] || "My Franchise");
$('#switcher-team-name').attr('data-team-style', fid);
const newOwner = window._allOwners?.[newFid] || '';
$('#switcher-subtitle').html(`
    ${newOwner ? `<span style="font-size:10px; font-weight:800; color:var(--text-dim);">${newOwner}</span>` : ''}
`);
$('#team-info-panel-wrapper').html(buildTeamInfoPanel(newFid));
                
                // Reset previously selected icons
                $('.team-selector-item').css('opacity', '0.6');
                $('.team-selector-img').css('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))');
                $('.team-selector-text').css('color', 'var(--text-dim)');
                
                // Highlight newly selected icon with a glowing drop-shadow
                $(this).css('opacity', '1');
                $(this).find('.team-selector-img').css('filter', 'drop-shadow(0 0 8px var(--accent-blue))');
                $(this).find('.team-selector-text').css('color', '#fff');

                $('#player-rows-container').html('<div class="loading-indicator">Loading Franchise...</div>');
                
                await fetchMasterStatus();
window._teamDataDirty = true;
                await loadTeamData();
            });
        }
    applyTeamStyle();
    reapplyAllTeamStyles();


    }
$(document).on('click', '.player-mode-btn', function() {
    offseasonMode = $(this).data('mode') === 'offseason';
    loadPlayersData('free-agents');
});
// --- POINTS ALLOWED CLICK LISTENER (GROUPED VERSION) ---
    $(document).off('click touchend', '.pa-breakdown-trigger').on('click touchend', '.pa-breakdown-trigger', async function(e) {
        if (e.type === 'touchend') e.preventDefault();
        e.stopPropagation(); // Stops the main player modal from opening

        const team = $(this).data('team');
        const pos = $(this).data('pos');
        
// Ensure pos is a string so it doesn't error out if data is missing
        const safePos = String(pos || 'UNK').toUpperCase();

        const teamLogoHtml = `<img src="${getNFLLogoUrl(team)}" onerror="this.style.display='none'" style="width: 26px; height: 26px; border-radius: 50%; background: var(--card-bg); border: 1px solid rgba(255,255,255,0.1); object-fit: contain; padding: 2px;">`;
        
        // THE FIX: Removed 'pos-badge-overlay' class to prevent CSS conflicts, but kept the color class
       const posBadgeHtml = `<span class="pos-text-${safePos.toLowerCase()}" style="display: inline-flex; align-items: center; justify-content: center; height: 22px; font-size: 11px; font-weight: 900; border-radius: 4px; padding: 0 8px; text-transform: uppercase;">${safePos}</span>`;
        
        $('#pa-modal-title').html(`
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                ${teamLogoHtml}
                <span style="color: var(--text-dim); font-size: 12px; font-weight: 800; text-transform: lowercase;">vs</span>
                ${posBadgeHtml}
            </div>
        `);
        
        $('#pa-breakdown-modal').css('display', 'flex').hide().fadeIn(200);

        try {
            const res = await fetch(`https://www45.myfantasyleague.com/2025/options?L=${lid}&O=243&TEAM=${team}&POS=${pos}`, { cache: 'no-store' });
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            
            const rows = doc.querySelectorAll('table.report tr');
            
            let weeksMap = {}; 
            let summaryRows = []; 
            
            rows.forEach(row => {
                const tds = row.querySelectorAll('td');
                if (tds.length >= 3 && !row.querySelector('th')) {
                    const week = tds[0].textContent.replace(/[^0-9]/g, '').trim(); 
                    const playerRaw = tds[1].textContent.trim();
                    const pts = tds[2].textContent.trim();
                    
                    if (!week) {
                        summaryRows.push({ label: playerRaw, pts: pts });
                        return;
                    }
                    
                    if (!weeksMap[week]) weeksMap[week] = { players: [], total: "0.00" };

                    if (playerRaw.toLowerCase().includes('total')) {
                        weeksMap[week].total = pts;
                    } else {
                        let playerDisplay = playerRaw;
                        let pid = "0000";
                        let teamAbbr = "NFL";
                        
                        const pLink = row.querySelector('td.player a');
                        if (pLink) {
                            // Scrape the PID
                            const pidMatch = pLink.getAttribute('href').match(/P=(\d+)/i) || pLink.getAttribute('href').match(/\d+/g);
                            if (pidMatch) pid = pidMatch.pop();
                            
                            // Scrape Team & Clean Name
                            let n = pLink.textContent.trim().split(' ');
                            n.pop(); // Remove Pos
                            teamAbbr = n.pop(); // Remove Team
                            let cleanName = n.join(' ');
                            if (cleanName.includes(',')) cleanName = cleanName.split(',').reverse().join(' ').trim(); 
                            playerDisplay = cleanName;
                        }
                        weeksMap[week].players.push({ name: playerDisplay, pts: pts, pid: pid, team: teamAbbr });
                    }
                }
            });
            
            let listHtml = '<div style="display:flex; flex-direction:column; gap:8px;">';
            let rowCount = 0;

            // 1. Build the expandable Week Groups
// 1. Build the expandable Week Groups
            Object.keys(weeksMap).forEach(w => {
                const weekData = weeksMap[w];
                
                if (weekData.total === "0.00" && weekData.players.length > 0) {
                    let sum = 0;
                    weekData.players.forEach(p => { sum += parseFloat(p.pts) || 0; });
                    weekData.total = sum.toFixed(2);
                }

                if (weekData.players.length === 0 && parseFloat(weekData.total) === 0) return;
                rowCount++;

                let playersHtml = '';
                weekData.players.forEach(p => {
                    playersHtml += `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: rgba(0,0,0,0.2); border-radius: 4px; margin-bottom: 3px;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <div style="position: relative; width: 26px; height: 26px; border-radius: 50%; background: var(--card-bg); border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;">
                                    <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${p.pid}.png" onerror="this.style.display='none'" style="width: 100%; height: 100%; object-fit: cover; object-position: top; border-radius: 50%;">
                                    <img src="${getNFLLogoUrl(p.team)}" onerror="this.style.display='none'" style="position: absolute; bottom: -2px; right: -4px; width: 12px; height: 12px; border-radius: 50%; background: #000; border: 1px solid var(--card-bg);">
                                </div>
                                <span style="font-size: 11px; font-weight: 700; color: #fff;">${p.name}</span>
                            </div>
                            <span style="font-size: 12px; font-weight: 900; color: var(--text-dim);">${p.pts}</span>
                        </div>
                    `;
                });

                let pointerEvent = 'cursor: pointer;';
                let arrowHtml = `<span class="pa-toggle-icon" style="font-size: 10px; color: rgba(255,255,255,0.4); transition: transform 0.2s; display: inline-block; transform: rotate(-90deg); margin-left: 4px;">▼</span>`;
                let contentHtml = `<div class="pa-week-content" style="display: none; padding: 8px 8px 5px;">${playersHtml}</div>`;
                let nameTag = '';
                
                // Identify the opposing team for this week
                let oppTeamAbbr = weekData.players.length > 0 ? weekData.players[0].team : 'NFL';

                if (weekData.players.length === 1) {
                    let singlePlayer = weekData.players[0];
                    pointerEvent = 'cursor: default;';
                    arrowHtml = '';
                    contentHtml = ''; 
                    // UI: 1 Player -> Show Player Photo, Name, and mini Team Badge
                    nameTag = `
                        <div style="display: flex; align-items: center; gap: 8px; margin-left: 4px;">
                            <div style="position: relative; width: 22px; height: 22px; border-radius: 50%; background: var(--card-bg); border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;">
                                <img src="https://www.mflscripts.com/playerImages_80x107/mfl_${singlePlayer.pid}.png" onerror="this.style.display='none'" style="width: 100%; height: 100%; object-fit: cover; object-position: top; border-radius: 50%;">
                                <img src="${getNFLLogoUrl(singlePlayer.team)}" onerror="this.style.display='none'" style="position: absolute; bottom: -2px; right: -4px; width: 10px; height: 10px; border-radius: 50%; background: #000; border: 1px solid var(--card-bg);">
                            </div>
                            <span style="font-size: 11px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${singlePlayer.name}</span>
                        </div>
                    `;
                } else if (weekData.players.length > 1) {
                    // UI: Multiple Players -> Show Opponent Team Logo and Accordion Arrow
                    nameTag = `
                        <div style="display: flex; align-items: center; margin-left: 4px;">
                            <img src="${getNFLLogoUrl(oppTeamAbbr)}" onerror="this.style.display='none'" style="width: 22px; height: 22px; border-radius: 50%; background: var(--card-bg); border: 1px solid rgba(255,255,255,0.1); object-fit: contain; padding: 2px;">
                        </div>
                    `;
                }

                listHtml += `
                    <div class="pa-week-group" style="background: rgba(255,255,255,0.03); border: 1px solid var(--card-border); border-radius: 6px; overflow: hidden; margin-bottom: 6px;">
                        <div class="pa-week-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px; ${pointerEvent} background: rgba(0,0,0,0.15);">
                            <div style="display: flex; align-items: center; gap: 4px; overflow: hidden; flex: 1;">
                                <div style="width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border-radius: 4px; font-size: 9px; font-weight: 900; color: var(--text-dim); text-transform: uppercase; flex-shrink: 0;">
                                    W${w}
                                </div>
                                ${nameTag}
                                ${arrowHtml}
                            </div>
                            <span style="font-size: 13px; font-weight: 900; color: var(--accent-blue); flex-shrink: 0; margin-left: 10px;">${weekData.total}</span>
                        </div>
                        ${contentHtml}
                    </div>
                `;
            });

            // 2. Attach the Overall Summary Rows at the bottom
            if (summaryRows.length > 0) {
                listHtml += '<div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.1);">';
                summaryRows.forEach(sr => {
                    const isAvg = sr.label.toLowerCase().includes('average');
                    const bg = isAvg ? 'rgba(0, 206, 184, 0.1)' : 'rgba(255,255,255,0.03)';
                    const border = isAvg ? 'border: 1px solid rgba(0, 206, 184, 0.3);' : 'border: 1px solid var(--card-border);';
                    const textColor = isAvg ? '#00ceb8' : '#fff';
                    
                    listHtml += `
                        <div style="display: flex; justify-content: space-between; padding: 10px 12px; background: ${bg}; ${border} border-radius: 6px; margin-bottom: 6px;">
                            <span style="font-size: 11px; font-weight: 800; color: var(--text-dim); text-transform: uppercase;">${sr.label}</span>
                            <span style="font-size: 13px; font-weight: 900; color: ${textColor};">${sr.pts}</span>
                        </div>
                    `;
                });
                listHtml += '</div>';
            }

            listHtml += '</div>';
            
            if (rowCount === 0) listHtml = '<div style="text-align:center; padding:30px; color:var(--text-dim);">No game logs available.</div>';
            
            $('#pa-modal-content').html(listHtml);

        } catch (err) {
            console.error("Error fetching PA Breakdown", err);
            $('#pa-modal-content').html('<div style="text-align:center; padding:30px; color:#ef4444;">Network error loading log.</div>');
        }
    });
$(document).off('click', '#trade-switch-team-btn').on('click', '#trade-switch-team-btn', function(e) {
                e.stopPropagation();
                openTradeTeamPicker();
            });
    // --- ACCORDION TOGGLE LISTENER ---
    $(document).off('click touchend', '.pa-week-header').on('click touchend', '.pa-week-header', function(e) {
        if (e.type === 'touchend') e.preventDefault();
        const icon = $(this).find('.pa-toggle-icon');
        const content = $(this).next('.pa-week-content');
        
        if (icon.css('transform') !== 'none' && icon.css('transform') !== 'matrix(1, 0, 0, 1, 0, 0)') {
            icon.css('transform', 'rotate(0deg)');
        } else {
            icon.css('transform', 'rotate(-90deg)');
        }
        
        content.slideToggle(200);
    });

$(document).off('click', '.auction-scroll-btn').on('click', '.auction-scroll-btn', function() {
    const row = document.getElementById('auction-scroll-row');
    if (!row) return;
    const dir = parseInt($(this).data('dir'));
    row.scrollBy({ left: dir * 240, behavior: 'smooth' });
});

$(document).off('wheel', '#auction-scroll-row').on('wheel', '#auction-scroll-row', function(e) {
    if (e.originalEvent.deltaY === 0) return;
    e.preventDefault();
    this.scrollLeft += e.originalEvent.deltaY;
});

function rerenderAuctionSection() {
    if (!window.getSortedFilteredAuctionItems || !window.buildAuctionCard) return;
    const items = window.getSortedFilteredAuctionItems();
    $('#auction-scroll-row').html(items.map(window.buildAuctionCard).join(''));
    $('#auction-count-label').text(`${items.length} of ${(window._auctionItems||[]).length} active · Swipe or scroll to see all`);
    if (window.auctionControlsBarHtml) $('#auction-controls-bar').html(window.auctionControlsBarHtml());
}

$(document).off('click', '.auction-sort-btn').on('click', '.auction-sort-btn', function() {
    const id = $(this).data('sort');
    if (auctionSortBy === id) {
        auctionSortDir = auctionSortDir === 'asc' ? 'desc' : 'asc';
    } else {
        auctionSortBy = id;
        auctionSortDir = id === 'bid' ? 'desc' : 'asc';
    }
    rerenderAuctionSection();
});

$(document).off('click', '.auction-pos-filter-btn').on('click', '.auction-pos-filter-btn', function() {
    auctionPosFilter = $(this).data('pos');
    rerenderAuctionSection();
});

$(document).on('click', '.fa-bid-btn, .fa-nominate-btn', async function(e) {
    e.stopPropagation();
    const pid = $(this).data('pid');
    const name = $(this).data('name') || pid;
    const minBid = parseInt($(this).data('minbid')) || 1000000;

    // Open a slide-up sheet with the resign UI
    $('#fa-bid-modal').remove();
    $('body').append(`
        <div id="fa-bid-modal" style="position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:9999; display:flex; align-items:flex-end; justify-content:center;">
            <div style="background:var(--card-bg); border:1px solid var(--card-border); border-radius:16px 16px 0 0; padding:20px 20px 36px; width:100%; max-width:480px; max-height:85vh; overflow-y:auto;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div>
                        <div style="font-size:11px; font-weight:900; color:var(--text-dim); text-transform:uppercase; margin-bottom:2px;">Contract Offer</div>
                        <div style="font-size:16px; font-weight:900; color:#fff;">${name}</div>
                    </div>
                    <button id="fa-modal-cancel" style="background:rgba(255,255,255,0.08); border:none; color:#fff; border-radius:8px; padding:6px 12px; font-weight:900; font-size:11px; cursor:pointer;">✕</button>
                </div>
                <div id="fa-resign-container">
                    <div style="text-align:center; padding:20px; color:var(--accent-blue); font-weight:800; font-size:11px; text-transform:uppercase; animation:pulse-blue 1.5s infinite;">Loading contract data...</div>
                </div>
            </div>
        </div>`);

    $('#fa-modal-cancel').on('click', () => $('#fa-bid-modal').remove());

    // Fetch dynasty rank for this player
try {
    console.log('Fetching player info for pid:', pid);
    const posRes = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=players&L=${lid}&PLAYERS=${pid}&JSON=1`, { credentials: 'include' });
    const posData = await posRes.json();
    console.log('Player data:', posData);
        const playerInfo = posData?.players?.player;
        const playerPos = playerInfo?.position || '';
        let posGroup = playerPos;
        if (['DE','DT'].includes(posGroup)) posGroup = 'DL';
        if (['CB','S'].includes(posGroup)) posGroup = 'DB';

        const adpRes = await fetch(`https://www45.myfantasyleague.com/${year}/reports?R=RANKS&L=${lid}&STATUS=*&POS=${posGroup}&ROOKIES=0&INJURED=0&SOURCE=sharks`, { credentials: 'include' });
        const adpDoc = new DOMParser().parseFromString(await adpRes.text(), 'text/html');

        let dynastyRank = 99;
        adpDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow').forEach((row, idx) => {
            if (dynastyRank !== 99) return;
            const pLink = row.querySelector('td.player a');
            if (!pLink) return;
            const pidMatch = pLink.getAttribute('href').match(/\d+/g);
            if (pidMatch && pidMatch.pop() === pid.toString()) dynastyRank = idx + 1;
        });

        const targetRank = Math.max(1, dynastyRank - 5);
        const salaries = (window.leagueSalaryData && window.leagueSalaryData[posGroup]) || [];
        const baseFloor = targetRank <= salaries.length ? Math.max(5, salaries[targetRank - 1].sal) : 5;

        const YR_UP = 0.12, YR_DN = 0.06, G_UP = 0.06, G_DN = 0.03;
        function calcSalary(yrs, guar) {
            const yrDelta = yrs - 3;
            const gDelta = guar - 50;
            const yrMult = 1 - yrDelta * (yrDelta < 0 ? YR_UP : YR_DN);
            const gMult = 1 - (gDelta / 10) * (gDelta < 0 ? G_UP : G_DN);
            return Math.round(baseFloor * yrMult * gMult * 10) / 10;
        }

        const start = Math.max(0, targetRank - 4);
        const end = Math.min(salaries.length, targetRank + 3);
        const drawerRows = salaries.slice(start, end).map((entry, i) => {
            const idx = start + i;
            const isTarget = idx === targetRank - 1;
            return `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 10px;border-bottom:1px solid rgba(255,255,255,0.04);background:${isTarget?'rgba(245,158,11,0.12)':'transparent'};"><span style="font-size:9px;font-weight:900;color:${isTarget?'#f59e0b':'var(--text-dim)'};min-width:20px;">#${idx+1}</span><span style="font-size:11px;font-weight:${isTarget?'900':'700'};color:${isTarget?'#f59e0b':'#fff'};flex:1;padding:0 8px;">${entry.name}</span><span style="font-size:11px;font-weight:900;color:${isTarget?'#f59e0b':'#fff'};">$${entry.sal}m${isTarget?' ←':''}</span></div>`;
        }).join('');

        $('#fa-resign-container').html(`
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;">
                <div style="background:rgba(0,0,0,0.3);border-radius:6px;padding:7px;cursor:pointer;" id="fa-floor-toggle">
                    <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;margin-bottom:2px;">Dynasty Rank</div>
                    <div style="font-size:13px;font-weight:900;color:var(--accent-blue);">#${dynastyRank}</div>
                    <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;margin-top:4px;">Floor</div>
                    <div style="font-size:13px;font-weight:900;color:#f59e0b;">$${baseFloor}m</div>
                </div>
                <div style="background:rgba(0,0,0,0.3);border-radius:6px;padding:7px;">
                    <div style="font-size:8px;color:var(--text-dim);text-transform:uppercase;margin-bottom:4px;text-align:center;">Offer</div>
                    <div style="font-size:13px;font-weight:900;color:#22c55e;text-align:center;" id="fa-final-sal">$${calcSalary(3,50).toFixed(1)}m/yr</div>
                    <div style="font-size:9px;color:var(--text-dim);text-align:center;margin-top:3px;" id="fa-proposal-summary">3 yrs · 50% guar</div>
                </div>
            </div>

            <div id="fa-floor-drawer" style="display:none;background:rgba(0,0,0,0.2);border-radius:6px;overflow:hidden;margin-bottom:10px;">
                <div style="font-size:9px;font-weight:900;color:var(--text-dim);text-transform:uppercase;padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.05);">${posGroup} salaries — floor at #${targetRank}</div>
                ${drawerRows}
            </div>

            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;">
                <div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                        <span style="font-size:10px;font-weight:800;color:var(--text-dim);text-transform:uppercase;">Years</span>
                        <span style="font-size:10px;font-weight:900;color:#fff;" id="fa-yrs-lbl">3 yrs</span>
                    </div>
                    <input type="range" id="fa-years" min="1" max="5" step="1" value="3" style="width:100%;">
                </div>
                <div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                        <span style="font-size:10px;font-weight:800;color:var(--text-dim);text-transform:uppercase;">Guaranteed %</span>
                        <span style="font-size:10px;font-weight:900;color:#fff;" id="fa-guar-lbl">50%</span>
                    </div>
                    <input type="range" id="fa-guar" min="10" max="100" step="5" value="50" style="width:100%;">
</div>
</div>

<div>
    <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
        <span style="font-size:10px;font-weight:800;color:var(--accent-blue);text-transform:uppercase;">MFL Bid</span>
        <span style="font-size:10px;font-weight:900;color:var(--accent-blue);" id="fa-bid-lbl">$${Math.max(Math.round(calcSalary(3,50))+1, Math.round(minBid/1000000)+1)}m</span>
    </div>
    <input type="range" id="fa-bid-amount" min="${Math.max(Math.round(calcSalary(3,50))+1, Math.round(minBid/1000000)+1)}" max="50" step="1" value="${Math.max(Math.round(calcSalary(3,50))+1, Math.round(minBid/1000000)+1)}" style="width:100%;">
    <div style="font-size:9px;color:var(--text-dim);margin-top:3px;">This is the winning bid submitted to MFL — must be ≥ $${Math.max(Math.round(calcSalary(3,50))+1, Math.round(minBid/1000000)+1)}m</div>
</div>

<div style="margin-bottom:10px;">
    <div style="font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; margin-bottom:5px;">Contract Note (optional)</div>
    <input id="fa-contract-comment" type="text" value="$${Math.round(calcSalary(3,50))+1}m bid · $${calcSalary(3,50).toFixed(1)}m/yr · 3yrs · 50%guar"
        style="width:100%; background:rgba(255,255,255,0.05); border:1px solid var(--card-border); border-radius:8px; padding:8px 10px; color:#fff; font-size:11px; font-weight:700; box-sizing:border-box; outline:none; margin-bottom:10px;">
</div>
<button id="fa-confirm-offer" data-basesalary="${calcSalary(3,50)}" style="width:100%;padding:14px;border-radius:10px;background:#22c55e;color:#000;font-weight:900;font-size:13px;text-transform:uppercase;border:none;cursor:pointer;margin-bottom:8px;">Submit Offer · $${(Math.round(calcSalary(3,50))+1)}m bid</button>
        `);

        // Floor drawer toggle
        $('#fa-floor-toggle').on('click', () => $('#fa-floor-drawer').slideToggle(200));

        // Sliders
function updateOffer() {
    const yrs = parseInt($('#fa-years').val());
    const guar = parseInt($('#fa-guar').val());
    const bid = parseInt($('#fa-bid-amount').val());

    // Apply year/guarantee multipliers to the bid amount
    const YR_UP = 0.12, YR_DN = 0.06, G_UP = 0.06, G_DN = 0.03;
    const yrDelta = yrs - 3;
    const gDelta = guar - 50;
    const yrMult = 1 - yrDelta * (yrDelta < 0 ? YR_UP : YR_DN);
    const gMult = 1 - (gDelta / 10) * (gDelta < 0 ? G_UP : G_DN);
    const displaySal = Math.round(bid * yrMult * gMult * 10) / 10;

    $('#fa-yrs-lbl').text(`${yrs} yr${yrs>1?'s':''}`);
    $('#fa-guar-lbl').text(`${guar}%`);
    $('#fa-bid-lbl').text(`$${bid}m`);
    $('#fa-final-sal').text(`$${displaySal.toFixed(1)}m/yr`);
    $('#fa-proposal-summary').text(`${yrs} yrs · ${guar}% guar`);
    $('#fa-confirm-offer').text(`Submit Offer · $${bid}m bid`);
$('#fa-contract-comment').val(`$${bid}m bid · $${displaySal.toFixed(1)}m/yr · ${yrs}yrs · ${guar}%guar`);
}
$(document).off('input', '#fa-years, #fa-guar, #fa-bid-amount').on('input', '#fa-years, #fa-guar, #fa-bid-amount', updateOffer);

        // Submit
        $(document).off('click', '#fa-confirm-offer').on('click', '#fa-confirm-offer', async function() {
    console.log('CONFIRM OFFER CLICKED');

            const yrs = parseInt($('#fa-years').val());
            const guar = parseInt($('#fa-guar').val());
            console.log('fa-bid-amount value:', $('#fa-bid-amount').val());
            const bidRaw = parseInt($('#fa-bid-amount').val()) * 1000000;
            console.log('bidRaw:', bidRaw);

// Store contract terms locally for reference
const contractKey = `contract_offer_${lid}_${pid}`;
const baseSalary = parseFloat($('#fa-confirm-offer').data('basesalary')) || 1;
localStorage.setItem(contractKey, JSON.stringify({ yrs, guar, sal: calcSalary(yrs, guar), baseSalary, name }));

            $(this).text('Submitting...').prop('disabled', true);
            try {

const displaySal = parseFloat($('#fa-final-sal').text().replace(/[^0-9.]/g,'')) || 0;
const comment = $('#fa-contract-comment').val().trim();
const params = new URLSearchParams();
params.append('LEAGUE_ID', lid);
params.append('FRANCHISE_ID', myFid);
const isExistingAuction = $('.fa-bid-btn[data-pid="' + pid + '"]').length > 0;
if (isExistingAuction) {
    params.append(pid, bidRaw);
    params.append(`CMT_${pid}`, comment);
} else {
    params.append('PLAYER_PICK', pid);
    params.append('OPENING_BID', bidRaw);
    params.append('MSG', comment);
}
params.append('SUBMIT', 'Submit Bid');
const res = await fetch(`https://www45.myfantasyleague.com/${year}/auction_bid`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
    credentials: 'include'
});
console.log('POST status:', res.status);
const auctionResText = await res.text();
console.log('POST response full:', auctionResText.substring(0, 1000));
const bidName = $('#fa-modal-name').text().trim() || name;
const bidAmt = parseInt(bidRaw) / 1000000;
const contractComment = $('#fa-contract-comment').val().trim();
sendSlackNotification(`*Auction Bid* — *${leagueFranchises[myFid]}* bid on *${bidName}*\n ${contractComment}`, 'freeAgency');
$('#fa-bid-modal').remove();
if (auctionResText.includes('Auction Bid') || auctionResText.includes('auction_bid') || res.ok) {
    $('#fa-bid-modal').remove();
    loadPlayersData('free-agents');
} else {
    const errMatch = auctionResText.match(/<error[^>]*>(.*?)<\/error>/i);
    alert('Offer failed: ' + (errMatch ? errMatch[1] : 'Check console for details'));
}
} catch(err) {
    alert('Network error.');
    console.error(err);
}
});
} catch(err) {
    console.error('FA offer error:', err);
    $('#fa-resign-container').html('<div style="text-align:center;color:#ef4444;padding:20px;font-weight:800;">Failed to load contract data.</div>');
}
});

let playerSearchTimeout = null;
$(document).on('input', '#player-search-input', function() {
    const q = $(this).val().trim().toLowerCase();
    clearTimeout(playerSearchTimeout);

    const container = $('#players-content-container');
    const rows = container.find('.player-row, .roster-grid > div');

    function resetView() {
        rows.show();
        container.find('.pos-group-wrapper').show();
        container.find('#player-search-no-results').remove();
        container.find('#player-search-remote-results').remove();
    }

    if (!q) {
        resetView();
        return;
    }

       playerSearchTimeout = setTimeout(async () => {
        container.find('#player-search-remote-results').remove();
        let anyVisible = false;
        rows.each(function() {
            const $row = $(this);
            const name = ($row.data('pname') || $row.find('.full-name').first().text() || '').toString().toLowerCase();
            const matches = name.includes(q);
            $row.toggle(matches);
            if (matches) anyVisible = true;
        });
        container.find('.pos-group-wrapper').each(function() {
            $(this).toggle($(this).find('.player-row:visible').length > 0);
        });
        container.find('#player-search-no-results').remove();

        if (anyVisible) return;

        // Nothing in the already-loaded list matched — fall back to a live search
        container.find('.roster-grid').last().append('<div id="player-search-no-results" style="text-align:center; padding: 20px; color: var(--accent-blue); font-weight: 800; font-size: 11px; text-transform: uppercase;">Searching more players...</div>');

        try {
            const res = await fetch(`https://www45.myfantasyleague.com/${year}/player_search?L=${lid}&NAME=${encodeURIComponent(q)}`, { credentials: 'include' });
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const searchRows = Array.from(doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow'));

            doc.querySelectorAll('td.player').forEach(td => {
                if (td.textContent.includes('(R)')) {
                    const rpid = td.querySelector('a')?.getAttribute('href').match(/\d+/g)?.pop();
                    if (rpid) rookiePids.add(rpid);
                }
            });

            if ($('#player-search-input').val().trim().toLowerCase() !== q) return; // user kept typing, stale response

            if (searchRows.length === 0) {
                container.find('#player-search-no-results').text('No players found');
                return;
            }

            let listHtml = '';
            searchRows.forEach(row => {
                const pLink = row.querySelector('td.player a');
                if (!pLink) return;
                const pidMatch = pLink.getAttribute('href').match(/\d+/g);
                const pid = pidMatch ? pidMatch.pop() : '0000';
                const { name, shortName, pos, team } = parseMFLName(pLink.textContent);
                const statusTd = row.querySelector('td:nth-child(2)');
                const statusText = statusTd ? statusTd.textContent.trim() : '';
                const ownerFid = Object.keys(leagueFranchises).find(key => leagueFranchises[key] === statusText.split(' - ')[0].trim());

                const fakePlayerObj = {
                    pid, name, shortName, pos, realPos: pos, team,
                    addVal: 0, ownVal: 0, projVal: 0,
                    ownerFid: ownerFid || null,
                    salary: '', years: '', guar: '', salNum: 0, yrsNum: 0, guarNum: 0, capHitNum: 0
                };

                listHtml += buildUniversalRow(
                    { pid, name, shortName, pos, team },
                    {
                        subText: ownerFid ? `On ${leagueFranchises[ownerFid]}` : 'Free Agent',
                        subTextColor: 'var(--accent-blue)',
                        rightContent: buildPlayerRightHtml(fakePlayerObj, true),
                        rightSlotStyle: 'margin-left: auto; display: flex; align-items: center;',
                    }
                );
            });

                       container.find('#player-search-no-results').remove();
            container.find('.player-row:visible').hide();
            container.find('.pos-group-wrapper').hide();
            container.find('.roster-grid').first().prepend(`<div id="player-search-remote-results">${listHtml}</div>`);
        } catch(e) {
            console.error('Player search fallback error:', e);
            container.find('#player-search-no-results').text('Search failed');
        }
    }, 150);
});

    // --- PA MODAL CLOSE LISTENER ---
    $(document).off('click touchend', '#close-pa-modal, #pa-breakdown-modal').on('click touchend', '#close-pa-modal, #pa-breakdown-modal', function(e) {
        if (e.type === 'touchend') e.preventDefault();
        if ($(e.target).closest('.settings-modal-box').length && !$(e.target).is('#close-pa-modal')) return;
        $('#pa-breakdown-modal').fadeOut(200);
    });
// --- MASTER TRANSACTION FILTER OVERRIDE ---
(function enableDragScroll(id) {
    let el = null, isDown = false, startX = 0, startScroll = 0, moved = false;
    $(document).off('pointerdown.dragscroll-' + id).on('pointerdown.dragscroll-' + id, '#' + id, function(e) {
        el = this; isDown = true; moved = false;
        startX = e.originalEvent.clientX;
        startScroll = el.scrollLeft;
    });
    $(document).off('pointermove.dragscroll-' + id).on('pointermove.dragscroll-' + id, function(e) {
        if (!isDown || !el) return;
        const dx = e.originalEvent.clientX - startX;
        if (Math.abs(dx) > 5) moved = true;
        el.scrollLeft = startScroll - dx;
    });
    $(document).off('pointerup.dragscroll-' + id + ' pointercancel.dragscroll-' + id)
        .on('pointerup.dragscroll-' + id + ' pointercancel.dragscroll-' + id, function() {
            isDown = false; el = null;
        });
})('tx-filter-scroll');

$(document).off('click touchend', '.tx-filter-btn').on('click', '.tx-filter-btn', function(e) {        e.preventDefault();
        
        // 1. Reset all buttons to the unselected state
        $('.tx-filter-btn').css({
            'background': 'rgba(255,255,255,0.05)',
            'color': 'var(--text-dim)',
            'border-color': 'var(--card-border)'
        }).removeClass('active');
        
        // 2. Highlight the button that was just clicked
        $(this).css({
            'background': 'var(--accent-blue)',
            'color': '#fff',
            'border-color': 'var(--accent-blue)'
        }).addClass('active');

        // 3. Show/Hide the cards instantly (Fixes mobile animation bugs)
        const targetFilter = $(this).attr('data-filter');
        
        $('.tx-card').hide(); // Instantly hide all cards
        
        if (targetFilter === 'all') {
            $('.tx-card').show(); // Show all if 'All' is clicked
        } else {
            $(`.tx-card[data-tx-type="${targetFilter}"]`).show(); // Show only matches
        }
    });
function updateLogoStyleButtons() {
    const current = localStorage.getItem('nfl_logo_style') || 'modern';
    $('.logo-style-btn').each(function() {
        const isActive = $(this).data('style') === current;
        $(this).css({
            background: isActive ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)',
            color: isActive ? '#fff' : 'var(--text-dim)',
            borderColor: isActive ? 'var(--accent-blue)' : 'var(--card-border)'
        });
    });
const previewTeams = ['ARI', 'DEN', 'GBP', 'TEN', 'PHI', 'NEP'];    previewTeams.forEach(t => {
        $(`#logo-preview-${t}`).attr('src', getNFLLogoUrl(t));
    });
}
// Load notification prefs
$(document).on('click touchend', '.open-settings-btn', function() {
    const prefs = JSON.parse(localStorage.getItem(`notif_prefs_${lid}`) || '{}');
    Object.keys(prefs).forEach(id => {
        if (prefs[id]) $(`#${id}`).prop('checked', true);
    });
    const webhook = localStorage.getItem(`notif_discord_${lid}`) || '';
    $('#notif-discord-webhook').val(webhook);
});

$(document).on('click', '#notif-save-btn', function() {
    const prefs = {};
    ['notif-trade-offer','notif-trade-accepted','notif-auction-outbid','notif-auction-won','notif-lineup-lock','notif-waiver'].forEach(id => {
        prefs[id] = $(`#${id}`).is(':checked');
    });
    localStorage.setItem(`notif_prefs_${lid}`, JSON.stringify(prefs));
    $('#notif-save-status').text('Saved!').fadeOut(2000, function() { $(this).show().text(''); });
});

$(document).on('click', '#notif-discord-save', function() {
    const webhook = $('#notif-discord-webhook').val().trim();
    localStorage.setItem(`notif_discord_${lid}`, webhook);
    $('#notif-discord-status').text('Webhook saved!').fadeOut(2000, function() { $(this).show().text(''); });
});
$(document).on('click', '#notif-bell-btn', async function(e) {
    e.stopPropagation();
    $('#notif-panel').remove();

const panel = $(`
    <div id="notif-backdrop" style="position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:99997;"></div>
    <div id="notif-panel" style="position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:99998; width:90%; max-width:400px; max-height:80vh; background:var(--card-bg); border:1px solid var(--card-border); border-radius:12px; box-shadow:0 15px 35px rgba(0,0,0,0.7); display:flex; flex-direction:column; overflow:hidden;">
        <div style="padding:16px 20px; border-bottom:1px solid var(--card-border); display:flex; align-items:center; justify-content:space-between; flex-shrink:0;">
            <div style="font-size:14px; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:1px;">🔔 Notifications</div>
            <button id="notif-panel-close" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:var(--text-dim); width:28px; height:28px; border-radius:50%; font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>
        </div>
        <div style="display:flex; border-bottom:1px solid var(--card-border); flex-shrink:0;">
            <button class="notif-tab-btn active" data-tab="notifs" style="flex:1; padding:10px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; border:none; background:transparent; color:var(--accent-blue); border-bottom:2px solid var(--accent-blue);">Notifications</button>
            <button class="notif-tab-btn" data-tab="activity" style="flex:1; padding:10px; font-size:10px; font-weight:900; text-transform:uppercase; cursor:pointer; border:none; background:transparent; color:var(--text-dim); border-bottom:2px solid transparent;">League Activity</button>
        </div>
        <div id="notif-panel-content" style="display:flex; flex-direction:column; gap:8px; overflow-y:auto; padding:16px; flex:1;">
            <div style="text-align:center; color:var(--text-dim); font-size:11px; padding:20px;">Loading...</div>
        </div>
        <div id="notif-activity-content" style="display:none; overflow-y:auto; flex:1;">
            <div style="text-align:center; color:var(--text-dim); font-size:11px; padding:20px;">Loading activity...</div>
        </div>
    </div>
`);
    $('body').append(panel);

    // Fetch notifications
    const items = [];

    try {
        // Check pending trades
        const tradeRes = await fetch(`https://www45.myfantasyleague.com/${year}/export?TYPE=pendingTrades&L=${lid}&JSON=1`, { credentials: 'include' });
        const tradeData = await tradeRes.json();
        let trades = tradeData?.pendingTrades?.pendingTrade || [];
        if (!Array.isArray(trades)) trades = [trades];
console.log('notif bell myFid:', myFid, 'all trades:', trades.map(t => ({offeredTo: t.offeredto, from: t.offeringteam})));
if (trades.length > 0) console.log('First trade object:', JSON.stringify(trades[0]));
trades.filter(t => t.offeredto === myFid).forEach(t => {
    const fromName = leagueFranchises[t.offeringteam] || t.offeringteam;
    items.push({ icon: '⇄', color: '#22c55e', title: 'Trade Offer Received', desc: `From ${fromName}`, action: () => { $('#notif-panel').remove(); document.querySelector('.tab-btn[onclick*="tab-league"]').click(); setTimeout(() => { $('#subtabs-league .sub-tab-btn').filter(function(){ return $(this).text().trim() === 'Trades'; }).trigger('click'); }, 200); } });
});


        // Check active auctions
        const aRes = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=43`, { credentials: 'include' });
        const aDoc = new DOMParser().parseFromString(await aRes.text(), 'text/html');
        const aRows = Array.from(aDoc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow'));
        aRows.forEach(row => {
            const pLink = row.querySelector('td a[class*="position_"]');
            const bidInput = row.querySelector('input[type="text"]');
            if (!pLink || !bidInput) return;
            const pid = bidInput.getAttribute('name');
            if (!pid || pid.startsWith('CMT_')) return;
            const { name } = parseMFLName(pLink.textContent);
            const timeLeft = row.querySelector('td span')?.textContent.trim() || '';
            const bidderFid = row.querySelector('a[class*="franchise_"]')?.getAttribute('class')?.match(/franchise_(\d+)/)?.[1]?.padStart(4,'0') || '';
            const isWinning = bidderFid === myFid;
            items.push({ icon: '🏷️', color: isWinning ? '#22c55e' : '#f59e0b', title: isWinning ? 'Winning Bid' : 'Active Auction', desc: `${name} · ${timeLeft} left`, action: () => { $('#notif-panel').remove(); document.querySelector('.tab-btn[onclick*="tab-players"]').click(); } });
        });

    } catch(e) { console.warn('Notif fetch failed', e); }

const html = (items.length ? items.map(item => `
    <div class="notif-item" style="display:flex; align-items:flex-start; gap:10px; padding:10px; background:rgba(0,0,0,0.2); border:1px solid var(--card-border); border-radius:8px; cursor:pointer; border-left:3px solid ${item.color};">
        <span style="font-size:16px; flex-shrink:0;">${item.icon}</span>
        <div style="flex:1; min-width:0;">
            <div style="font-size:11px; font-weight:900; color:#fff;">${item.title}</div>
            <div style="font-size:10px; color:var(--text-dim); margin-top:2px;">${item.desc}</div>
        </div>
    </div>
`).join('') : '<div style="text-align:center; color:var(--text-dim); font-size:11px; padding:20px;">No new notifications</div>');

$('#notif-panel-content').html(html);
$('#notif-badge').toggle(items.length > 0);
items.forEach((item, i) => {
    $('#notif-panel-content .notif-item').eq(i).on('click', item.action);
});
// Notif tab switching
$(document).on('click', '.notif-tab-btn', function() {
    $('.notif-tab-btn').css({ color: 'var(--text-dim)', borderBottomColor: 'transparent' });
    $(this).css({ color: 'var(--accent-blue)', borderBottomColor: 'var(--accent-blue)' });
    const tab = $(this).data('tab');
    if (tab === 'notifs') {
        $('#notif-panel-content').show();
        $('#notif-activity-content').hide();
    } else {
        $('#notif-panel-content').hide();
        $('#notif-activity-content').show();
        loadFranchiseActivity();
    }
});

async function loadFranchiseActivity() {
    const container = $('#notif-activity-content');
    container.html('<div style="text-align:center; padding:30px; color:var(--accent-blue); font-size:11px; font-weight:800; text-transform:uppercase; animation:pulse-blue 1.5s infinite;">Loading...</div>');
    try {
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/reports?L=${lid}&R=FSUMMARY`, { credentials: 'include' });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        const rows = Array.from(doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow'));

        function parseLastAccess(text) {
            text = (text || '').trim().toLowerCase();
            if (text.includes('minute') || text.includes('hour') || text === 'just now') return { label: text, color: '#22c55e', dot: 'green' };
            if (text.includes('day')) {
                const days = parseInt(text);
                if (days <= 3) return { label: text, color: '#22c55e', dot: 'green' };
                if (days <= 7) return { label: text, color: '#f59e0b', dot: 'yellow' };
                if (days <= 30) return { label: text, color: '#ef4444', dot: 'red' };
                return { label: text, color: '#64748b', dot: 'gray' };
            }
            return { label: text || 'Unknown', color: '#64748b', dot: 'gray' };
        }

        const entries = rows.map(row => {
            const cells = row.querySelectorAll('td');
            const nameLink = cells[0]?.querySelector('a');
            const fidMatch = nameLink?.getAttribute('href')?.match(/F=(\d+)/i);
            const fid2 = fidMatch ? fidMatch[1].padStart(4,'0') : null;
            const teamName = nameLink?.textContent.trim() || cells[0]?.textContent.trim() || '—';
            const lastAccess = cells[1]?.textContent.trim() || '';
            return { fid: fid2, teamName, lastAccess };
        }).filter(e => e.fid);

        // Sort: most recently active first
        entries.sort((a, b) => {
            const score = (text) => {
                text = text.toLowerCase();
                if (text.includes('minute') || text.includes('hour')) return 0;
                if (text.includes('day')) return parseInt(text) || 999;
                return 9999;
            };
            return score(a.lastAccess) - score(b.lastAccess);
        });

        const html = entries.map(e => {
            const status = parseLastAccess(e.lastAccess);
            const logo = buildLogoWithTrophy(e.fid, 32);
            const isMe = e.fid === myFid;
            return `
                <div style="display:flex; align-items:center; gap:10px; padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.04); background:${isMe ? 'rgba(59,130,246,0.06)' : 'transparent'};">
                    <div style="position:relative; flex-shrink:0;">
                        ${logo}
                        <div style="position:absolute; bottom:0; right:0; width:9px; height:9px; border-radius:50%; background:${status.color}; border:1.5px solid var(--card-bg);"></div>
                    </div>
                    <div style="flex:1; min-width:0;">
                        <div style="font-size:12px; font-weight:${isMe ? '900' : '800'}; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${e.teamName}${isMe ? ' <span style="font-size:8px; color:var(--accent-blue);">(you)</span>' : ''}</div>
                        <div style="font-size:10px; color:${status.color}; font-weight:800; margin-top:2px;">⏱ ${e.lastAccess}</div>
                    </div>
                </div>`;
        }).join('');

        container.html(`
            <div style="padding:10px 14px; font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid var(--card-border);">
                🟢 Today �🟡 This week �🔴 This month �⚫ Inactive
            </div>
            ${html}
        `);

    } catch(e) {
        console.error('FSUMMARY fetch failed', e);
        container.html('<div style="text-align:center; color:#ef4444; padding:20px; font-weight:800;">Failed to load activity.</div>');
    }
}
$(document).on('click', '#notif-panel-close, #notif-backdrop', function() {
    $('#notif-panel, #notif-backdrop').remove();
});
});
$(document).on('click', '.logo-style-btn', function() {
    localStorage.setItem('nfl_logo_style', $(this).data('style'));
    updateLogoStyleButtons();
    $('#display-save-status').text('✓ Saved').css('color', 'var(--accent-blue)');
    setTimeout(() => $('#display-save-status').text(''), 2000);
    // Re-render current view to apply new logos
    const activeTab = $('.tab-btn.active').attr('onclick') || '';
    if (activeTab.includes('tab-team')) renderActiveTab();
    else if (activeTab.includes('tab-players')) {
        const subId = $('#subtabs-players .sub-tab-btn.active').text().trim().toLowerCase().replace(' ', '-');
        loadPlayersData(subId);
    }
});
    // --- AUTHENTICATION CHECK ---
function checkLoginStatus() {
    const isLoggedOut = $('a[href*="login?L="], a[href$="/login"]').length > 0;
    if (isLoggedOut) {
        const leagueLogoUrl = 'https://raw.githubusercontent.com/zewolff1/llddynasty/4f81a6a726ce6e42253b9be29c9c8ab1c3b9e576/content/Dark%20Blue%20and%20Orange%20Illustrative%20Football%20League%20Badge%20Logo%20(1).svg';
        const loginHtml = `
<div id="auth-overlay" style="position:fixed; inset:0; z-index:999999; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.95);">
    <div class="auth-box">
        <img id="auth-logo" src="${leagueLogoUrl}" style="width:100px; height:100px; object-fit:contain; margin-bottom:18px;">
        <h2 style="color:#fff; font-size:22px; font-weight:900; margin:0 0 6px;">Welcome Back</h2>
        <p style="color:var(--text-dim,#94a3b8); font-size:13px; margin-bottom:28px;">Please log in to manage your team.</p>
        <form method="POST" action="https://www45.myfantasyleague.com/${year}/login">
            <input type="hidden" name="L" value="${lid}">
            <input type="text" name="USERNAME" class="auth-input" placeholder="MFL Username or Email" required style="font-size:16px; padding:14px 16px; margin-bottom:12px;">
            <input type="password" name="PASSWORD" class="auth-input" placeholder="Password" required style="font-size:16px; padding:14px 16px; margin-bottom:20px;">
<button type="submit" class="auth-btn" style="font-size:16px; padding:14px;">Sign In</button>
<button type="button" id="auth-guest-btn" style="width:100%; margin-top:10px; padding:12px; background:transparent; color:var(--text-dim); border:1px solid rgba(255,255,255,0.1); border-radius:10px; font-size:13px; font-weight:800; cursor:pointer;">Browse as Guest →</button>        </form>
    </div>
</div>`;
        $('body').append(loginHtml);
        $('#auth-overlay').css('display', 'flex');
        $('body').css('overflow', 'hidden');
    }
}
    async function applyAuctionContract(pid, commentText) {
    const match = commentText.match(/\$([\d.]+)m\/yr · (\d+)yrs · (\d+)%guar/);
    if (!match) { console.warn('Could not parse contract from comment:', commentText); return; }
    const salM = parseFloat(match[1]);
    const yrs = parseInt(match[2]);
    const guar = parseInt(match[3]);
const sal = Math.round(salM * 1000000).toString();
const totalValM = (salM * yrs).toFixed(0);
    const xml = `<salaries><leagueUnit unit="LEAGUE"><player id="${pid}" salary="${sal}" contractYear="${yrs}" contractInfo="${guar}%" contractStatus="$${totalValM}M" /></leagueUnit></salaries>`;
    const params = new URLSearchParams();
    params.set('L', lid);
    params.set('DATA', xml);
    params.set('APPEND', '1');
    const res = await fetch(`https://www45.myfantasyleague.com/${year}/import?TYPE=salaries`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
    });
    const txt = await res.text();
console.log(`Auction contract applied for pid ${pid}:`, txt);

    return txt;
}

async function checkCompletedAuctions() {
    console.log('checkCompletedAuctions started, myFid:', myFid);

    try {
        const appliedKey = `applied_contracts_${lid}_${year}`;
        const alreadyApplied = new Set(JSON.parse(localStorage.getItem(appliedKey) || '[]'));
        const res = await fetch(`https://www45.myfantasyleague.com/${year}/options?L=${lid}&O=102`, { credentials: 'include' });
        const txt = await res.text();
        console.log('O=44 response title:', new DOMParser().parseFromString(txt, 'text/html').title);
        const doc = new DOMParser().parseFromString(txt, 'text/html');
const rows = Array.from(doc.querySelectorAll('table.report tr.oddtablerow, table.report tr.eventablerow'));
console.log('Completed auction rows:', rows.length);
rows.forEach((row, i) => {
    if (i < 4) console.log(`Row ${i}:`, row.innerHTML.substring(0, 400));
});
rows.forEach((row, i) => {
    if (i < 6) console.log(`Row ${i}:`, row.innerHTML.substring(0, 200));
});
console.log('checkCompletedAuctions running, rows found:', rows.length);
rows.forEach((row, i) => {
    if (i < 6) console.log(`Row ${i}:`, row.innerHTML.substring(0, 300));
});
for (const row of rows) {
    const pLink = row.querySelector('a[class*="position_"]');
    if (!pLink) continue;
    const pidMatch = pLink.getAttribute('href').match(/\d+/g);
    const pid = pidMatch ? pidMatch.pop() : null;
if (!pid || alreadyApplied.has(pid)) continue;
const cells = row.querySelectorAll('td');
const commentText = cells[cells.length - 1]?.textContent.trim() || '';
console.log('pid:', pid, 'comment:', commentText);
const result = await applyAuctionContract(pid, commentText);
            if (result && !result.match(/<error[^>]*>/i)) {
                alreadyApplied.add(pid);
                localStorage.setItem(appliedKey, JSON.stringify([...alreadyApplied]));
            }
        }
    } catch(e) {
        console.warn('Auction contract check failed:', e);
    }
}
checkLoginStatus();
    buildAdminTools(); 
loadSavedTheme();
fetchFranchises()
    .then(() => Promise.all([fetchMasterStatus(), fetchPointsAllowed(), fetchPlayerAverages(), fetchLeagueSalaryData(), loadResignState()]))
    .then(() => checkCompletedAuctions())
    .then(() => checkNotifBadge())
    .then(() => {
        applyTeamTheme(myFid, true);
        return loadTeamData();
    });
});
