const fs = require('fs');
const path = require('path');
const fontmap = require('./fontmap');
const mkdirp = require('mkdirp');
const PLI = require('@superflycss/pli');

const sizes = [100, 200, 300, 400, 500, 600, 700, 800, 900, 'xs', 'sm', 'lg'];

const sizeMap = {
    100: '0.750rem',
    200: '0.875rem',
    300: '1.000rem',
  
    400: '1.250rem',
    500: '1.500rem',
    600: '1.750rem',
    700: '2.000rem',
    800: '2.500rem',
    900: '3.000rem',
  
    xs: '0.750rem',
    sm: '0.875rem',
    lg: '1.250rem'
  }


const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const fonts = ['abeezee', 'abel', 'abhaya-libre', 'abril-fatface', 'aclonica', 'acme', 'actor', 'adamina', 'advent-pro', 'aguafina-script', 'akronim', 'aladin', 'aldrich', 'alef', 'alegreya', 'alegreya-sc', 'alegreya-sans', 'alegreya-sans-sc', 'alex-brush',
'alfa-slab-one', 'alice', 'alike', 'alike-angular', 'allan', 'allerta', 'allerta-stencil', 'allura', 'almendra', 'almendra-display', 'almendra-sc', 'amarante', 'amaranth', 'amatic-sc', 'amatica-sc', 'amethysta', 'amiko', 'amiri', 'amita', 'anaheim',
'andada', 'andika', 'angkor', 'annie-use-your-telescope', 'anonymous-pro', 'antic', 'antic-didone', 'antic-slab', 'anton', 'arapey', 'arbutus', 'arbutus-slab', 'architects-daughter', 'archivo-black', 'archivo-narrow', 'aref-ruqaa', 'arima-madurai',
'arimo', 'arizonia', 'armata', 'arsenal', 'artifika', 'arvo', 'arya', 'asap', 'asar', 'asset', 'assistant', 'astloch', 'asul', 'athiti', 'atma', 'atomic-age', 'aubrey', 'audiowide', 'autour-one', 'average', 'average-sans', 'averia-gruesa-libre', 'averia-libre',
'averia-sans-libre', 'averia-serif-libre', 'bad-script', 'bahiana', 'baloo', 'baloo-bhai', 'baloo-bhaina', 'baloo-chettan', 'baloo-da', 'baloo-paaji', 'baloo-tamma', 'baloo-thambi', 'balthazar', 'bangers', 'barrio', 'basic', 'battambang', 'baumans',
'bayon', 'belgrano', 'belleza', 'benchnine', 'bentham', 'berkshire-swash', 'bevan', 'bigelow-rules', 'bigshot-one', 'bilbo', 'bilbo-swash-caps', 'biorhyme', 'biorhyme-expanded', 'biryani', 'bitter', 'black-ops-one', 'bokor', 'bonbon', 'boogaloo', 'bowlby-one',
'bowlby-one-sc', 'brawler', 'bree-serif', 'bubblegum-sans', 'bubbler-one', 'buda', 'buenard', 'bungee', 'bungee-hairline', 'bungee-inline', 'bungee-outline', 'bungee-shade', 'butcherman', 'butterfly-kids', 'cabin', 'cabin-condensed', 'cabin-sketch',
'caesar-dressing', 'cagliostro', 'cairo', 'calligraffitti', 'cambay', 'cambo', 'candal', 'cantarell', 'cantata-one', 'cantora-one', 'capriola', 'cardo', 'carme', 'carrois-gothic', 'carrois-gothic-sc', 'carter-one', 'catamaran', 'caudex', 'caveat', 'caveat-brush',
'cedarville-cursive', 'ceviche-one', 'changa', 'changa-one', 'chango', 'chathura', 'chau-philomene-one', 'chela-one', 'chelsea-market', 'chenla', 'cherry-cream-soda', 'cherry-swash', 'chewy', 'chicle', 'chivo', 'chonburi', 'cinzel', 'cinzel-decorative',
'clicker-script', 'coda', 'coda-caption', 'codystar', 'coiny', 'combo', 'comfortaa', 'coming-soon', 'concert-one', 'condiment', 'content', 'contrail-one', 'convergence', 'cookie', 'copse', 'corben', 'cormorant', 'cormorant-garamond', 'cormorant-infant',
'cormorant-sc', 'cormorant-unicase', 'cormorant-upright', 'courgette', 'cousine', 'coustard', 'covered-by-your-grace', 'crafty-girls', 'creepster', 'crete-round', 'crimson-text', 'croissant-one', 'crushed', 'cuprum', 'cutive', 'cutive-mono', 'damion',
'dancing-script', 'dangrek', 'david-libre', 'dawning-of-a-new-day', 'days-one', 'dekko', 'delius', 'delius-swash-caps', 'delius-unicase', 'della-respira', 'denk-one', 'devonshire', 'dhurjati', 'didact-gothic', 'diplomata', 'diplomata-sc', 'domine',
'donegal-one', 'doppio-one', 'dorsa', 'dosis', 'dr-sugiyama', 'droid-sans', 'droid-sans-mono', 'droid-serif', 'duru-sans', 'dynalight', 'eb-garamond', 'eagle-lake', 'eater', 'economica', 'eczar', 'ek-mukta', 'el-messiri', 'electrolize', 'elsie', 'elsie-swash-caps',
'emblema-one', 'emilys-candy', 'engagement', 'englebert', 'enriqueta', 'erica-one', 'esteban', 'euphoria-script', 'ewert', 'exo', 'exo-2', 'expletus-sans', 'fanwood-text', 'farsan', 'fascinate', 'fascinate-inline', 'faster-one', 'fasthand', 'fauna-one',
'federant', 'federo', 'felipa', 'fenix', 'finger-paint', 'fira-mono', 'fira-sans', 'fira-sans-condensed', 'fira-sans-extra-condensed', 'fjalla-one', 'fjord-one', 'flamenco', 'flavors', 'fondamento', 'fontdiner-swanky', 'forum', 'francois-one', 'frank-ruhl-libre',
'freckle-face', 'fredericka-the-great', 'fredoka-one', 'freehand', 'fresca', 'frijole', 'fruktur', 'fugaz-one', 'gfs-didot', 'gfs-neohellenic', 'gabriela', 'gafata', 'galada', 'galdeano', 'galindo', 'gentium-basic', 'gentium-book-basic', 'geo', 'geostar',
'geostar-fill', 'germania-one', 'gidugu', 'gilda-display', 'give-you-glory', 'glass-antiqua', 'glegoo', 'gloria-hallelujah', 'goblin-one', 'gochi-hand', 'gorditas', 'goudy-bookletter-1911', 'graduate', 'grand-hotel', 'gravitas-one', 'great-vibes', 'griffy',
'gruppo', 'gudea', 'gurajada', 'habibi', 'halant', 'hammersmith-one', 'hanalei', 'hanalei-fill', 'handlee', 'hanuman', 'happy-monkey', 'harmattan', 'headland-one', 'heebo', 'henny-penny', 'herr-von-muellerhoff', 'hind', 'hind-guntur', 'hind-madurai',
'hind-siliguri', 'hind-vadodara', 'holtwood-one-sc', 'homemade-apple', 'homenaje', 'im-fell-dw-pica', 'im-fell-dw-pica-sc', 'im-fell-double-pica', 'im-fell-double-pica-sc', 'im-fell-english', 'im-fell-english-sc', 'im-fell-french-canon', 'im-fell-french-canon-sc',
'im-fell-great-primer', 'im-fell-great-primer-sc', 'iceberg', 'iceland', 'imprima', 'inconsolata', 'inder', 'indie-flower', 'inika', 'inknut-antiqua', 'irish-grover', 'istok-web', 'italiana', 'italianno', 'itim', 'jacques-francois', 'jacques-francois-shadow',
'jaldi', 'jim-nightshade', 'jockey-one', 'jolly-lodger', 'jomhuria', 'josefin-sans', 'josefin-slab', 'joti-one', 'judson', 'julee', 'julius-sans-one', 'junge', 'jura', 'just-another-hand', 'just-me-again-down-here', 'kadwa', 'kalam', 'kameron', 'kanit',
'kantumruy', 'karla', 'karma', 'katibeh', 'kaushan-script', 'kavivanar', 'kavoon', 'kdam-thmor', 'keania-one', 'kelly-slab', 'kenia', 'khand', 'khmer', 'khula', 'kite-one', 'knewave', 'kotta-one', 'koulen', 'kranky', 'kreon', 'kristi', 'krona-one',
'kumar-one', 'kumar-one-outline', 'kurale', 'la-belle-aurore', 'laila', 'lakki-reddy', 'lalezar', 'lancelot', 'lateef', 'lato', 'league-script', 'leckerli-one', 'ledger', 'lekton', 'lemon', 'lemonada', 'libre-baskerville', 'libre-franklin', 'life-savers',
'lilita-one', 'lily-script-one', 'limelight', 'linden-hill', 'lobster', 'lobster-two', 'londrina-outline', 'londrina-shadow', 'londrina-sketch', 'londrina-solid', 'lora', 'love-ya-like-a-sister', 'loved-by-the-king', 'lovers-quarrel', 'luckiest-guy',
'lusitana', 'lustria', 'macondo', 'macondo-swash-caps', 'mada', 'magra', 'maiden-orange', 'maitree', 'mako', 'mallanna', 'mandali', 'marcellus', 'marcellus-sc', 'marck-script', 'margarine', 'marko-one', 'marmelad', 'martel', 'martel-sans', 'marvel',
'mate', 'mate-sc', 'maven-pro', 'mclaren', 'meddon', 'medievalsharp', 'medula-one', 'meera-inimai', 'megrim', 'meie-script', 'merienda', 'merienda-one', 'merriweather', 'merriweather-sans', 'metal', 'metal-mania', 'metamorphous', 'metrophobic', 'michroma',
'milonga', 'miltonian', 'miltonian-tattoo', 'miniver', 'miriam-libre', 'mirza', 'miss-fajardose', 'mitr', 'modak', 'modern-antiqua', 'mogra', 'molengo', 'molle', 'monda', 'monofett', 'monoton', 'monsieur-la-doulaise', 'montaga', 'montez', 'montserrat',
'montserrat-alternates', 'mon-tserrat-subrayada', 'moul', 'moulpali', 'mountains-of-christmas', 'mouse-memoirs', 'mr-bedfort', 'mr-dafoe', 'mr-de-haviland', 'mrs-saint-delafield', 'mrs-sheppards', 'mukta-vaani', 'muli', 'mystery-quest', 'ntr', 'neucha',
'neuton', 'new-rocker', 'news-cycle', 'niconne', 'nixie-one', 'nobile', 'nokora', 'norican', 'nosifer', 'nothing-you-could-do', 'noticia-text', 'noto-sans', 'noto-serif', 'nova-cut', 'nova-flat', 'nova-mono', 'nova-oval', 'nova-round', 'nova-script',
'nova-slim', 'nova-square', 'numans', 'nunito', 'nunito-sans', 'odor-mean-chey', 'offside', 'old-standard-tt', 'oldenburg', 'oleo-script', 'oleo-script-swash-caps', 'open-sans', 'open-sans-condensed', 'oranienbaum', 'orbitron', 'oregano', 'orienta',
'original-surfer', 'oswald', 'over-the-rainbow', 'overlock', 'overlock-sc', 'overpass', 'overpass-mono', 'ovo', 'oxygen', 'oxygen-mono', 'pt-mono', 'pt-sans', 'pt-sans-caption', 'pt-sans-narrow', 'pt-serif', 'pt-serif-caption', 'pacifico', 'padauk',
'palanquin', 'palanquin-dark', 'pangolin', 'paprika', 'parisienne', 'passero-one', 'passion-one', 'pathway-gothic-one', 'patrick-hand', 'patrick-hand-sc', 'pattaya', 'patua-one', 'pavanam', 'paytone-one', 'peddana', 'peralta', 'permanent-marker', 'petit-formal-script',
'petrona', 'philosopher', 'piedra', 'pinyon-script', 'pirata-one', 'plaster', 'play', 'playball', 'playfair-display', 'playfair-display-sc', 'podkova', 'poiret-one', 'poller-one', 'poly', 'pompiere', 'pontano-sans', 'poppins', 'port-lligat-sans', 'port-lligat-slab',
'pragati-narrow', 'prata', 'preahvihear', 'press-start-2p', 'pridi', 'princess-sofia', 'prociono', 'prompt', 'prosto-one', 'proza-libre', 'puritan', 'purple-purse', 'quando', 'quantico', 'quattrocento', 'quattrocento-sans', 'questrial', 'quicksand',
'quintessential', 'qwigley', 'racing-sans-one', 'radley', 'rajdhani', 'rakkas', 'raleway', 'raleway-dots', 'ramabhadra', 'ramaraja', 'rambla', 'rammetto-one', 'ranchers', 'rancho', 'ranga', 'rasa', 'rationale', 'ravi-prakash', 'redressed', 'reem-kufi',
'reenie-beanie', 'revalia', 'rhodium-libre', 'ribeye', 'ribeye-marrow', 'righteous', 'risque', 'roboto', 'roboto-condensed', 'roboto-mono', 'roboto-slab', 'rochester', 'rock-salt', 'rokkitt', 'romanesco', 'ropa-sans', 'rosario', 'rosarivo', 'rouge-script',
'rozha-one', 'rubik', 'rubik-mono-one', 'ruda', 'rufina', 'ruge-boogie', 'ruluko', 'rum-raisin', 'ruslan-display', 'russo-one', 'ruthie', 'rye', 'sacramento', 'sahitya', 'sail', 'salsa', 'sanchez', 'sancreek', 'sansita', 'sarala', 'sarina', 'sarpanch',
'satisfy', 'scada', 'scheherazade', 'schoolbell', 'scope-one', 'seaweed-script', 'secular-one', 'sevillana', 'seymour-one', 'shadows-into-light', 'shadows-into-light-two', 'shanti', 'share', 'share-tech', 'share-tech-mono', 'shojumaru', 'short-stack',
'shrikhand', 'siemreap', 'sigmar-one', 'signika', 'signika-negative', 'simonetta', 'sintony', 'sirin-stencil', 'six-caps', 'skranji', 'slabo-13px', 'slabo-27px', 'slackey', 'smokum', 'smythe', 'sniglet', 'snippet', 'snowburst-one', 'sofadi-one', 'sofia',
'sonsie-one', 'sorts-mill-goudy', 'source-code-pro', 'source-sans-pro', 'source-serif-pro', 'space-mono', 'special-elite', 'spicy-rice', 'spinnaker', 'spirax', 'squada-one', 'sree-krushnadevaraya', 'sriracha', 'stalemate', 'stalinist-one', 'stardos-stencil',
'stint-ultra-condensed', 'stint-ultra-expanded', 'stoke', 'strait', 'sue-ellen-francisco', 'suez-one', 'sumana', 'sunshiney', 'supermercado-one', 'sura', 'suranna', 'suravaram', 'suwannaphum', 'swanky-and-moo-moo', 'syncopate', 'tangerine', 'taprom',
'tauri', 'taviraj', 'teko', 'telex', 'tenali-ramakrishna', 'tenor-sans', 'text-me-one', 'the-girl-next-door', 'tienne', 'tillana', 'timmana', 'tinos', 'titan-one', 'titillium-web', 'trade-winds', 'trirong', 'trocchi', 'trochut', 'trykker', 'tulpen-one',
'ubuntu', 'ubuntu-condensed', 'ubuntu-mono', 'ultra', 'uncial-antiqua', 'underdog', 'unica-one', 'unifrakturcook', 'unifrakturmaguntia', 'unkempt', 'unlock', 'unna', 'vt323', 'vampiro-one', 'varela', 'varela-round', 'vast-shadow', 'vesper-libre', 'vibur',
'vidaloka', 'viga', 'voces', 'volkhov', 'vollkorn', 'voltaire', 'waiting-for-the-sunrise', 'wallpoet', 'walter-turncoat', 'warnes', 'wellfleet', 'wendy-one', 'wire-one', 'work-sans', 'yanone-kaffeesatz', 'yantramanav', 'yatra-one', 'yellowtail', 'yeseva-one',
'yesteryear', 'yrsa', 'zeyada'];


fonts.forEach(font => {
    
    let css = '';

    weights.forEach(w=> {
        sizes.forEach(s=>{
            css += 
`.u-font-${font}-fs${s}-fw${w} {
     font-family: ${fontmap[font]} !important;
     font-size: ${sizeMap[s]} !important;
     font-weight: ${w} !important;
}
\n`;
        });
    });
    const subdir = `/${font}`;
    const destdir = path.join(PLI.DIST, subdir);
    const file = path.join(destdir, '/index.css');
    mkdirp.sync(destdir);
    fs.writeFileSync(file, css);
});
