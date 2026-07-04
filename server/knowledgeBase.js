// ============================================================
// KilimoSmart Knowledge Base
// ISS 3102 Expert Systems — Assignment 3 Implementation
// ============================================================

export const CROPS = [
  { id: 'maize',   en: 'Maize',        sw: 'Mahindi',      emoji: '🌽', regions: ['Uasin Gishu', 'Trans Nzoia', 'Kakamega', 'Bungoma', 'Nakuru'] },
  { id: 'beans',   en: 'Beans',        sw: 'Maharagwe',    emoji: '🫘', regions: ['Kakamega', 'Bungoma', 'Kisii', 'Nyamira'] },
  { id: 'tomato',  en: 'Tomatoes',     sw: 'Nyanya',       emoji: '🍅', regions: ['Nakuru', 'Kisii', 'Kirinyaga', 'Meru'] },
  { id: 'potato',  en: 'Irish Potato', sw: 'Viazi',        emoji: '🥔', regions: ['Nyandarua', 'Meru', 'Nyeri', 'Kericho'] },
  { id: 'kale',    en: 'Kale',         sw: 'Sukuma Wiki',  emoji: '🥬', regions: ['Nairobi', 'Kiambu', 'Nakuru', 'Kisumu'] },
  { id: 'coffee',  en: 'Coffee',       sw: 'Kahawa',       emoji: '☕', regions: ['Kirinyaga', 'Nyeri', 'Murang\'a', 'Kiambu'] },
  { id: 'tea',     en: 'Tea',          sw: 'Chai',         emoji: '🍵', regions: ['Kericho', 'Bomet', 'Nyamira', 'Kisii'] },
]

export const DISEASES = [
  // ── MAIZE ──────────────────────────────────────────────────
  {
    id: 'MSV', cropId: 'maize',
    en: 'Maize Streak Virus', sw: 'Ugonjwa wa Msonge wa Mahindi',
    causalAgent: 'Maize streak virus (Mastrevirus); vector: leafhopper (Cicadulina spp.)',
    riskLevel: 'HIGH',
    description: {
      en: 'A viral disease transmitted by leafhopper insects causing characteristic yellow-green streaks along the full length of maize leaves, stunted growth, and significant yield loss.',
      sw: 'Ugonjwa wa virusi unaosambazwa na wadudu wa aina ya ruka-jani, ukisababisha mistari ya njano-kijani kwenye majani ya mahindi, ukuaji mdogo, na hasara kubwa ya mavuno.'
    },
    treatment: {
      en: [
        'Remove and burn the most severely affected plants immediately to limit further spread',
        'Apply an approved insecticide (e.g. imidacloprid) to control leafhopper vectors on remaining plants',
        'Next season: use MSV-resistant varieties such as DUMA 43, H614D, or SEEDCO SC403',
        'Monitor the entire field daily for two weeks and remove any newly affected plants',
        'Report the outbreak to your local extension officer for district-level surveillance'
      ],
      sw: [
        'Ng\'oa na kuchoma mimea iliyoathirika zaidi mara moja ili kuzuia usambazaji',
        'Tumia dawa ya wadudu iliyoidhinishwa (k.m. imidacloprid) kudhibiti wadudu kwenye mimea iliyobaki',
        'Msimu ujao: panda aina zinazostahimili MSV kama DUMA 43, H614D, au SEEDCO SC403',
        'Fuatilia shamba lote kila siku kwa wiki mbili na ng\'oa mimea mipya iliyoathirika',
        'Ripoti mlipuko kwa afisa wako wa kilimo wa mtaa kwa ufuatiliaji wa wilaya'
      ]
    },
    prevention: {
      en: 'Plant resistant varieties. Control leafhopper populations with preventive insecticide applications at planting.',
      sw: 'Panda aina zinazostahimili. Dhibiti idadi ya wadudu kwa kutumia dawa za kuzuia wakati wa kupanda.'
    }
  },
  {
    id: 'MLN', cropId: 'maize',
    en: 'Maize Lethal Necrosis', sw: 'Ugonjwa wa Kufa kwa Mahindi',
    causalAgent: 'Mixed infection: Maize chlorotic mottle virus (MCMV) + Sugarcane mosaic virus (SCMV)',
    riskLevel: 'HIGH',
    description: {
      en: 'A devastating viral disease causing rapid death of maize plants. Characterised by mottling, leaf death from the tip, dead heart in young plants, and clustering of affected plants.',
      sw: 'Ugonjwa mbaya wa virusi unaosababisha kifo cha haraka cha mimea ya mahindi. Unaonyeshwa na madoa, kufa kwa jani kutoka ncha, moyo uliokufa kwenye mimea michanga.'
    },
    treatment: {
      en: [
        'Destroy ALL infected plants immediately — uproot and burn, do not compost',
        'Control vector insects (thrips, aphids) with approved insecticides across the whole field',
        'Plant only certified clean seed next season — do not save seed from affected fields',
        'Maintain strict field hygiene — remove all crop debris after harvest',
        'Report to county agriculture department immediately — MLN is a notifiable disease in Kenya'
      ],
      sw: [
        'Haribu mimea YOTE iliyoambukizwa mara moja — ng\'oa na kuchoma, usitengeneze mboji',
        'Dhibiti wadudu (thrips, vidukari) kwa dawa zilizoidhinishwa katika shamba lote',
        'Panda mbegu safi zilizoidhinishwa tu msimu ujao — usihifadhi mbegu kutoka mashamba yaliyoathirika',
        'Dumisha usafi mkali wa shamba — ondoa mabaki yote ya mazao baada ya mavuno',
        'Ripoti kwa idara ya kilimo ya kaunti mara moja — MLN ni ugonjwa wa kuripotiwa nchini Kenya'
      ]
    },
    prevention: {
      en: 'Use certified seed. Control insect vectors. Avoid overlapping planting seasons.',
      sw: 'Tumia mbegu zilizoidhinishwa. Dhibiti wadudu. Epuka misimu ya kupanda inayoingiliana.'
    }
  },
  {
    id: 'GLS', cropId: 'maize',
    en: 'Grey Leaf Spot', sw: 'Madoa ya Kijivu ya Majani',
    causalAgent: 'Cercospora zeae-maydis (fungal)',
    riskLevel: 'MODERATE',
    description: {
      en: 'A fungal disease producing rectangular grey-brown lesions running parallel between leaf veins, starting on lower older leaves and progressing upward in humid conditions.',
      sw: 'Ugonjwa wa ukungu unaozalisha madoa ya kijivu-kahawia ya mstatili yanayotembea sambamba kati ya mishipa ya majani, ukianza kwenye majani ya chini ya zamani.'
    },
    treatment: {
      en: [
        'Apply mancozeb (Dithane M-45) or propiconazole (Tilt) fungicide at first sign of disease',
        'Repeat fungicide application every 14 days during humid weather',
        'Improve field drainage and air circulation through proper spacing',
        'Rotate crops — avoid planting maize in the same field two seasons in a row',
        'Plant resistant varieties where available (e.g. H614D shows moderate resistance)'
      ],
      sw: [
        'Tumia dawa ya ukungu ya mancozeb (Dithane M-45) au propiconazole (Tilt) dalili zinapoanza',
        'Rudia matumizi ya dawa ya ukungu kila siku 14 wakati wa hali ya hewa yenye unyevu',
        'Boresha mifereji ya shamba na mzunguko wa hewa kupitia umbali sahihi',
        'Badilisha mazao — epuka kupanda mahindi kwenye shamba moja misimu miwili mfululizo',
        'Panda aina zinazostahimili zinapopatikana (k.m. H614D inaonyesha upinzani wa wastani)'
      ]
    },
    prevention: {
      en: 'Crop rotation, resistant varieties, and good field drainage prevent GLS.',
      sw: 'Mzunguko wa mazao, aina zinazostahimili, na mifereji mizuri ya shamba huzuia GLS.'
    }
  },
  {
    id: 'FAW', cropId: 'maize',
    en: 'Fall Armyworm', sw: 'Viwavi Jeshi',
    causalAgent: 'Spodoptera frugiperda (lepidopteran insect pest)',
    riskLevel: 'HIGH',
    description: {
      en: 'A highly destructive caterpillar pest that feeds inside maize leaf whorls, producing characteristic ragged holes and sawdust-like frass. Can destroy entire fields rapidly.',
      sw: 'Wadudu waharibifu sana wa baa ambao wanakula ndani ya viunzi vya majani ya mahindi, wakizalisha matundu na kinyesi kama vumbi la mbao. Wanaweza kuharibu mashamba yote haraka.'
    },
    treatment: {
      en: [
        'Apply emamectin benzoate (Escort) or spinosad (Tracer) insecticide directly into leaf whorls',
        'Scout fields in early morning when larvae are most active and visible',
        'For seedlings: apply sand or dry ash into the leaf whorl as a physical deterrent',
        'Use pheromone traps to monitor adult moth populations and predict outbreaks',
        'Report large outbreaks to county extension services for coordinated response'
      ],
      sw: [
        'Tumia dawa ya emamectin benzoate (Escort) au spinosad (Tracer) moja kwa moja kwenye viunzi vya majani',
        'Kagua mashamba asubuhi mapema wakati mabuu ni makini zaidi na yanaonekana',
        'Kwa miche: weka mchanga au majivu makavu kwenye viunzi vya majani kama kizuizi',
        'Tumia mitego ya kemikali ya asili kufuatilia idadi ya nondo za watu wazima',
        'Ripoti milipuko mikubwa kwa huduma za kilimo za kaunti kwa majibu ya pamoja'
      ]
    },
    prevention: {
      en: 'Early planting, field monitoring, and biological controls (Bacillus thuringiensis) help prevent severe outbreaks.',
      sw: 'Kupanda mapema, ufuatiliaji wa shamba, na udhibiti wa kibiolojia husaidia kuzuia milipuko mikubwa.'
    }
  },
  {
    id: 'NLB', cropId: 'maize',
    en: 'Northern Leaf Blight', sw: 'Ugonjwa wa Majani wa Kaskazini',
    causalAgent: 'Exserohilum turcicum (fungal)',
    riskLevel: 'MODERATE',
    description: {
      en: 'A fungal disease causing large cigar-shaped grey-green lesions on maize leaves, typically 2.5–15 cm long, that eventually turn tan/brown and can cause significant yield loss.',
      sw: 'Ugonjwa wa ukungu unaosababisha madoa makubwa ya umbo la sigara ya kijani-kijivu kwenye majani ya mahindi, hatimaye yageuke kahawia na kusababisha hasara kubwa ya mavuno.'
    },
    treatment: {
      en: [
        'Apply propiconazole or azoxystrobin fungicide at tasseling stage',
        'Remove and destroy heavily infected lower leaves',
        'Ensure proper plant spacing for good air circulation',
        'Plant resistant hybrid varieties in subsequent seasons'
      ],
      sw: [
        'Tumia dawa ya ukungu ya propiconazole au azoxystrobin wakati wa hatua ya tasseling',
        'Ondoa na haribu majani ya chini yaliyoathirika sana',
        'Hakikisha umbali sahihi wa mimea kwa mzunguko mzuri wa hewa',
        'Panda aina mseto zinazostahimili katika misimu ijayo'
      ]
    },
    prevention: {
      en: 'Use resistant hybrids and practice crop rotation.',
      sw: 'Tumia mseto zinazostahimili na fanya mzunguko wa mazao.'
    }
  },

  // ── BEANS ──────────────────────────────────────────────────
  {
    id: 'BR', cropId: 'beans',
    en: 'Bean Rust', sw: 'Kutu ya Maharagwe',
    causalAgent: 'Uromyces appendiculatus (fungal)',
    riskLevel: 'MODERATE',
    description: {
      en: 'A fungal disease producing orange-brown powdery pustules on the underside of bean leaves, surrounded by yellow halos. Spreads rapidly in humid cool conditions common in western Kenya.',
      sw: 'Ugonjwa wa ukungu unaozalisha matuta ya unga ya rangi ya machungwa-kahawia chini ya majani ya maharagwe, yaliyozungukwa na pete za njano. Inasambaa haraka katika hali ya unyevu baridi.'
    },
    treatment: {
      en: [
        'Apply mancozeb (Dithane M-45) fungicide, focusing on undersides of leaves',
        'Remove heavily infected leaves and dispose of them away from the field',
        'Improve air circulation through appropriate spacing — avoid overcrowding plants',
        'Avoid working in the field when plants are wet — this spreads spores',
        'Plant rust-resistant bean varieties next season (e.g. Lyamungu 85, Jesca)'
      ],
      sw: [
        'Tumia dawa ya ukungu ya mancozeb (Dithane M-45), ukilenga chini ya majani',
        'Ondoa majani yaliyoathirika sana na uyatupe mbali na shamba',
        'Boresha mzunguko wa hewa kupitia umbali sahihi — epuka kusongamana kwa mimea',
        'Epuka kufanya kazi shambani wakati mimea ni mvua — hii inasambaza spores',
        'Panda aina za maharagwe zinazostahimili kutu msimu ujao (k.m. Lyamungu 85, Jesca)'
      ]
    },
    prevention: {
      en: 'Plant resistant varieties and ensure proper spacing for air circulation.',
      sw: 'Panda aina zinazostahimili na uhakikishe umbali sahihi kwa mzunguko wa hewa.'
    }
  },
  {
    id: 'BCMV', cropId: 'beans',
    en: 'Bean Common Mosaic Virus', sw: 'Virusi ya Mosaic ya Maharagwe',
    causalAgent: 'Bean common mosaic virus (BCMV); transmitted by aphids',
    riskLevel: 'MODERATE',
    description: {
      en: 'A viral disease causing mosaic (light and dark green mottling), leaf distortion, blistering, and stunted plant growth. Transmitted by aphid insects and infected seed.',
      sw: 'Ugonjwa wa virusi unaosababisha mosaic (mchanganyiko wa kijani hafifu na giza), kupinda kwa majani, na ukuaji mdogo wa mmea. Husambazwa na vidukari na mbegu zilizoambukizwa.'
    },
    treatment: {
      en: [
        'Remove and destroy all visibly infected plants immediately',
        'Control aphid vectors using insecticidal soap spray or approved systemic insecticide',
        'Use BCMV-resistant bean varieties in subsequent planting seasons',
        'Source certified virus-free seed from reputable suppliers',
        'Avoid replanting seeds saved from infected crops'
      ],
      sw: [
        'Ng\'oa na haribu mimea yote iliyoathirika inayoonekana mara moja',
        'Dhibiti vidukari kwa kutumia sabuni ya kuua wadudu au dawa ya kimfumo iliyoidhinishwa',
        'Tumia aina za maharagwe zinazostahimili BCMV katika misimu ijayo ya kupanda',
        'Tafuta mbegu safi zilizo na cheti zisizo na virusi kutoka kwa wasambazaji wanaotambulika',
        'Epuka kupanda tena mbegu zilizohifadhiwa kutoka mazao yaliyoambukizwa'
      ]
    },
    prevention: {
      en: 'Use certified seed and resistant varieties. Control aphid populations.',
      sw: 'Tumia mbegu zilizoidhinishwa na aina zinazostahimili. Dhibiti idadi ya vidukari.'
    }
  },
  {
    id: 'ALS', cropId: 'beans',
    en: 'Angular Leaf Spot', sw: 'Madoa ya Pembe ya Majani',
    causalAgent: 'Pseudocercospora griseola (fungal)',
    riskLevel: 'MODERATE',
    description: {
      en: 'A fungal disease causing angular (straight-edged) grey-brown spots on leaves that are limited by the leaf veins, giving them a geometric appearance.',
      sw: 'Ugonjwa wa ukungu unaosababisha madoa ya kijivu-kahawia yenye pembe (makali ya mstari) kwenye majani yanayozuiwa na mishipa ya majani.'
    },
    treatment: {
      en: [
        'Apply mancozeb or copper-based fungicide at first sign of disease',
        'Remove and destroy infected plant debris after harvest',
        'Avoid overhead irrigation which promotes disease spread',
        'Plant resistant bean varieties'
      ],
      sw: [
        'Tumia dawa ya ukungu ya mancozeb au yenye shaba dalili zinapoanza',
        'Ondoa na haribu mabaki ya mimea iliyoathirika baada ya mavuno',
        'Epuka umwagiliaji wa juu ambao unakuza usambazaji wa ugonjwa',
        'Panda aina za maharagwe zinazostahimili'
      ]
    },
    prevention: {
      en: 'Crop rotation, resistant varieties, and avoiding wet foliage.',
      sw: 'Mzunguko wa mazao, aina zinazostahimili, na kuepuka majani yenye unyevu.'
    }
  },

  // ── TOMATO ──────────────────────────────────────────────────
  {
    id: 'TBW', cropId: 'tomato',
    en: 'Bacterial Wilt', sw: 'Kunyauka kwa Bakteria ya Nyanya',
    causalAgent: 'Ralstonia solanacearum (bacterial)',
    riskLevel: 'HIGH',
    description: {
      en: 'A devastating soil-borne bacterial disease causing sudden and complete wilting of tomato plants within 1–2 days, with characteristic brown discoloration of stem vascular tissue. No cure once infected.',
      sw: 'Ugonjwa mbaya wa bakteria unaobaki kwenye udongo, ukisababisha kunyauka kwa ghafla na kamili kwa mimea ya nyanya ndani ya siku 1-2, ukiwa na kahawia ya tishu za shina. Hakuna tiba baada ya kuambukizwa.'
    },
    treatment: {
      en: [
        'Remove and destroy ALL infected plants immediately — do not compost, burn them',
        'Do NOT replant tomatoes or other solanaceous crops (pepper, eggplant, potato) in the same soil for at least 3–4 years',
        'Improve field drainage — bacterial wilt thrives in waterlogged soils',
        'Disinfect all tools, stakes, and equipment with bleach solution (1:10) after use in affected areas',
        'Source seedlings only from certified nurseries with disease-free history next season'
      ],
      sw: [
        'Ng\'oa na haribu mimea YOTE iliyoambukizwa mara moja — usifanye mboji, ichome',
        'USIPANDE nyanya au mazao mengine ya solanaceous (pilipili, brinjal, viazi) kwenye udongo huo kwa miaka 3-4 angalau',
        'Boresha mifereji ya shamba — kunyauka kwa bakteria kunastawi kwenye udongo wenye maji',
        'Disinfect zana zote, nguzo, na vifaa kwa ufumbuzi wa bleach (1:10) baada ya matumizi katika maeneo yaliyoathirika',
        'Pata miche tu kutoka kwa vitalu vilivyoidhinishwa vyenye historia isiyo na ugonjwa msimu ujao'
      ]
    },
    prevention: {
      en: 'Use resistant rootstocks where available. Improve drainage. Practice long crop rotations.',
      sw: 'Tumia rootstocks zinazostahimili zinapopatikana. Boresha mifereji. Fanya mzunguko mrefu wa mazao.'
    }
  },
  {
    id: 'TEB', cropId: 'tomato',
    en: 'Early Blight', sw: 'Ugonjwa wa Mwanzo wa Ukungu wa Nyanya',
    causalAgent: 'Alternaria solani (fungal)',
    riskLevel: 'MODERATE',
    description: {
      en: 'A fungal disease causing dark brown spots with concentric rings (target-board pattern) on tomato leaves, starting on lower older leaves and progressing upward. Yellow halo surrounds each spot.',
      sw: 'Ugonjwa wa ukungu unaosababisha madoa ya kahawia nyeusi yenye pete za mviringo (mfumo wa ubao wa shabaha) kwenye majani ya nyanya, ukianza kwenye majani ya chini ya zamani.'
    },
    treatment: {
      en: [
        'Apply mancozeb or chlorothalonil (Daconil) fungicide every 7–10 days',
        'Remove and destroy heavily infected lower leaves to slow upward spread',
        'Water plants at the base — avoid wetting the foliage',
        'Stake and prune tomatoes to improve air circulation around plants',
        'Rotate tomatoes with non-solanaceous crops for at least 2 seasons'
      ],
      sw: [
        'Tumia dawa ya ukungu ya mancozeb au chlorothalonil (Daconil) kila siku 7-10',
        'Ondoa na haribu majani ya chini yaliyoathirika sana kupunguza usambazaji kwenda juu',
        'Mwagilia mimea chini — epuka kulainisha majani',
        'Weka nguzo na kata matawi ya nyanya kuboresha mzunguko wa hewa',
        'Badilisha nyanya na mazao yasio ya solanaceous kwa misimu angalau 2'
      ]
    },
    prevention: {
      en: 'Avoid overhead watering. Maintain plant vigour with good nutrition.',
      sw: 'Epuka umwagiliaji wa juu. Dumisha nguvu ya mmea kwa lishe nzuri.'
    }
  },

  // ── POTATO ──────────────────────────────────────────────────
  {
    id: 'PLB', cropId: 'potato',
    en: 'Late Blight', sw: 'Ugonjwa wa Ukungu wa Marehemu wa Viazi',
    causalAgent: 'Phytophthora infestans (oomycete/water mould)',
    riskLevel: 'HIGH',
    description: {
      en: 'One of the most devastating potato diseases worldwide. Water-soaked lesions on leaves expand rapidly with white fuzzy mould on undersides. Can destroy an entire crop within days in cool wet weather.',
      sw: 'Moja ya magonjwa mabaya zaidi ya viazi ulimwenguni. Madoa ya maji kwenye majani yanasambaa haraka na ukungu mweupe laini chini. Unaweza kuharibu zao zima ndani ya siku chache hali ya hewa baridi yenye unyevu.'
    },
    treatment: {
      en: [
        'Apply metalaxyl-based fungicide (e.g. Ridomil Gold) immediately at first sign',
        'Follow with chlorothalonil or mancozeb protective sprays every 7 days',
        'Remove and destroy all infected haulms (stems and leaves) — do not leave in field',
        'Improve field drainage to reduce humidity at soil level',
        'Use certified disease-free seed tubers in subsequent seasons'
      ],
      sw: [
        'Tumia dawa ya ukungu yenye metalaxyl (k.m. Ridomil Gold) mara moja dalili zinapoanza',
        'Fuata na kunyunyizia za kinga za chlorothalonil au mancozeb kila siku 7',
        'Ondoa na haribu mashina na majani yaliyoambukizwa — usiache shambani',
        'Boresha mifereji ya shamba kupunguza unyevu kwenye kiwango cha udongo',
        'Tumia mizizi ya mbegu safi zilizoidhinishwa zisizo na ugonjwa katika misimu ijayo'
      ]
    },
    prevention: {
      en: 'Plant resistant varieties. Apply preventive fungicide sprays before disease appears in wet seasons.',
      sw: 'Panda aina zinazostahimili. Tumia kunyunyizia za kinga za dawa ya ukungu kabla ugonjwa haujatokea katika misimu ya mvua.'
    }
  },
  {
    id: 'PBW', cropId: 'potato',
    en: 'Potato Bacterial Wilt', sw: 'Kunyauka kwa Bakteria ya Viazi',
    causalAgent: 'Ralstonia solanacearum (bacterial)',
    riskLevel: 'HIGH',
    description: {
      en: 'Soil-borne bacterial disease causing sudden wilting of potato plants with characteristic brown ring visible when stems or tubers are cut. Tubers show brown rot internally.',
      sw: 'Ugonjwa wa bakteria unaobaki kwenye udongo, ukisababisha kunyauka kwa ghafla kwa mimea ya viazi na pete ya kahawia inayoonekana mashina au boga zinapokatwa. Boga zinaonyesha uozo wa kahawia ndani.'
    },
    treatment: {
      en: [
        'Remove and destroy all infected plants immediately',
        'Do not plant potatoes or other solanaceous crops in affected soil for 3+ years',
        'Use only certified disease-free seed tubers',
        'Improve field drainage and avoid waterlogging',
        'Disinfect all tools and equipment between fields'
      ],
      sw: [
        'Ng\'oa na haribu mimea yote iliyoambukizwa mara moja',
        'Usipande viazi au mazao mengine ya solanaceous kwenye udongo ulioathirika kwa miaka 3+',
        'Tumia tu mizizi ya mbegu safi zilizoidhinishwa zisizo na ugonjwa',
        'Boresha mifereji ya shamba na uepuke mafuriko',
        'Disinfect zana na vifaa vyote kati ya mashamba'
      ]
    },
    prevention: {
      en: 'Use certified seed. Long crop rotation. Good drainage.',
      sw: 'Tumia mbegu zilizoidhinishwa. Mzunguko mrefu wa mazao. Mifereji mizuri.'
    }
  },

  // ── KALE ──────────────────────────────────────────────────
  {
    id: 'KAP', cropId: 'kale',
    en: 'Aphid Infestation', sw: 'Shambulio la Vidukari',
    causalAgent: 'Brevicoryne brassicae — cabbage aphid (insect pest)',
    riskLevel: 'MODERATE',
    description: {
      en: 'Dense colonies of grey-green aphids cluster on the underside of kale leaves and growing tips, excreting sticky honeydew and causing leaf curling, yellowing, and stunted growth.',
      sw: 'Makundi mazito ya vidukari vya kijivu-kijani yanakusanyika chini ya majani ya sukuma wiki na ncha za ukuaji, yakitoa ushupavu na kusababisha kupinda kwa majani, manjano, na ukuaji mdogo.'
    },
    treatment: {
      en: [
        'Spray with insecticidal soap solution (5ml soap per litre of water) targeting undersides of leaves',
        'Apply neem extract (azadirachtin) solution as an organic alternative',
        'For heavy infestations: apply approved systemic insecticide (e.g. dimethoate)',
        'Encourage natural predators — ladybirds and lacewings feed on aphids',
        'Remove heavily infested leaves by hand and dispose of them away from the field'
      ],
      sw: [
        'Nyunyizia ufumbuzi wa sabuni ya kuua wadudu (ml 5 za sabuni kwa lita ya maji) ukilenga chini ya majani',
        'Tumia ufumbuzi wa dondoo la mwarobaini (azadirachtin) kama mbadala wa kikaboni',
        'Kwa msambao mkubwa: tumia dawa ya wadudu ya kimfumo iliyoidhinishwa (k.m. dimethoate)',
        'Himiza wadudu wanaowinda kwa asili — kunguru wadudu na lacewings hula vidukari',
        'Ondoa majani yaliyoshambuliwa sana kwa mikono na uyatupe mbali na shamba'
      ]
    },
    prevention: {
      en: 'Encourage beneficial insects. Avoid excessive nitrogen fertilisation which produces soft lush growth attractive to aphids.',
      sw: 'Himiza wadudu wenye manufaa. Epuka mbolea nyingi za nitrojeni ambazo huzalisha ukuaji laini unaovutia vidukari.'
    }
  },
  {
    id: 'KCR', cropId: 'kale',
    en: 'Clubroot', sw: 'Ugonjwa wa Mguu wa Klabu',
    causalAgent: 'Plasmodiophora brassicae (soil-borne pathogen)',
    riskLevel: 'HIGH',
    description: {
      en: 'A soil-borne pathogen causing severe swelling and distortion of roots into club-shaped masses, preventing water and nutrient uptake. Causes midday wilting despite apparently adequate soil moisture.',
      sw: 'Pathojeni inayobaki kwenye udongo ikisababisha uvimbe mkubwa na kupotoka kwa mizizi kuwa misa zenye umbo la rungu, kuzuia unyakuzi wa maji na virutubisho. Husababisha kunyauka wakati wa adhuhuri.'
    },
    treatment: {
      en: [
        'Apply agricultural lime to raise soil pH to above 7.2 — clubroot cannot survive in alkaline soil',
        'Remove and destroy all infected plants — do not compost, spores survive years',
        'Avoid growing any brassica crops (kale, cabbage, broccoli, cauliflower) in affected soil for 5+ years',
        'Use clean transplants from nurseries not affected by clubroot',
        'Disinfect tools thoroughly to avoid spreading spores between plots'
      ],
      sw: [
        'Weka chokaa ya kilimo kuinua pH ya udongo zaidi ya 7.2 — clubroot haiwezi kuishi kwenye udongo wenye alkali',
        'Ng\'oa na haribu mimea yote iliyoambukizwa — usifanye mboji, spores zinaishi miaka',
        'Epuka kukuza mazao yoyote ya brassica (sukuma, kabichi, broccoli) kwenye udongo ulioathirika kwa miaka 5+',
        'Tumia miche safi kutoka kwa vitalu visivyoathirika na clubroot',
        'Disinfect zana kwa kina ili kuepuka kusambaza spores kati ya viwanja'
      ]
    },
    prevention: {
      en: 'Maintain soil pH above 7.0. Practice long brassica-free rotations.',
      sw: 'Dumisha pH ya udongo zaidi ya 7.0. Fanya mzunguko mrefu usio na brassica.'
    }
  },

  // ── COFFEE ──────────────────────────────────────────────────
  {
    id: 'CBD', cropId: 'coffee',
    en: 'Coffee Berry Disease', sw: 'Ugonjwa wa Beri ya Kahawa',
    causalAgent: 'Colletotrichum kahawae (fungal)',
    riskLevel: 'HIGH',
    description: {
      en: 'The most economically damaging coffee disease in Kenya. Dark sunken spots on green berries, which shrivel, mummify, and drop prematurely. Can cause 80–100% crop loss in severe outbreaks.',
      sw: 'Ugonjwa wa kahawa wenye athari kubwa zaidi ya kiuchumi nchini Kenya. Madoa meusi yaliyozama kwenye beri za kijani, ambazo hukunjamia, kukauka, na kuanguka mapema. Unaweza kusababisha hasara ya 80-100% ya mazao.'
    },
    treatment: {
      en: [
        'Apply copper-based fungicide (copper oxychloride) starting at berry formation stage',
        'Follow strict spray calendar: spray at 2-week intervals from pin-head to harvest',
        'Remove and destroy all mummified berries — they harbour spores for next season',
        'Prune coffee trees for good canopy ventilation to reduce humidity',
        'Plant CBD-resistant coffee varieties: Ruiru 11 or Batian are highly recommended in Kenya'
      ],
      sw: [
        'Tumia dawa ya ukungu yenye shaba (copper oxychloride) kuanzia hatua ya kuunda beri',
        'Fuata kalenda ya kunyunyizia kwa makini: nyunyizia kila wiki 2 kutoka pin-head hadi mavuno',
        'Ondoa na haribu beri zote zilizokauka — zinabeba spores kwa msimu ujao',
        'Kata matawi ya miti ya kahawa kwa uingizaji hewa mzuri wa taji kupunguza unyevu',
        'Panda aina za kahawa zinazostahimili CBD: Ruiru 11 au Batian zinapendekezwa sana nchini Kenya'
      ]
    },
    prevention: {
      en: 'Plant Ruiru 11 or Batian varieties. Maintain strict copper spray programme.',
      sw: 'Panda aina za Ruiru 11 au Batian. Dumisha programu kali ya kunyunyizia shaba.'
    }
  },
  {
    id: 'CLR', cropId: 'coffee',
    en: 'Coffee Leaf Rust', sw: 'Kutu ya Majani ya Kahawa',
    causalAgent: 'Hemileia vastatrix (fungal)',
    riskLevel: 'MODERATE',
    description: {
      en: 'A fungal disease producing orange powdery pustules on the underside of coffee leaves with corresponding yellow-orange patches on the upper surface. Causes defoliation and reduced yields.',
      sw: 'Ugonjwa wa ukungu unaozalisha matuta ya unga ya machungwa chini ya majani ya kahawa na madoa ya njano-machungwa sambamba juu. Husababisha kupoteza majani na kupungua kwa mavuno.'
    },
    treatment: {
      en: [
        'Apply copper oxychloride or triadimefon (Bayleton) fungicide at first sign of rust',
        'Remove heavily infected leaves to reduce spore load',
        'Improve canopy management through pruning to reduce humidity within the canopy',
        'Maintain good plant nutrition especially potassium which improves disease resistance',
        'Switch to rust-tolerant varieties (Ruiru 11, Batian) in heavily affected farms'
      ],
      sw: [
        'Tumia dawa ya ukungu ya copper oxychloride au triadimefon (Bayleton) kutu inapoonekana kwanza',
        'Ondoa majani yaliyoathirika sana kupunguza mzigo wa spores',
        'Boresha usimamizi wa taji kupitia kukata matawi kupunguza unyevu ndani ya taji',
        'Dumisha lishe nzuri ya mmea hasa potasiamu ambayo huboresha upinzani wa ugonjwa',
        'Badilisha kwenda aina zinazostahimili kutu (Ruiru 11, Batian) kwenye mashamba yaliyoathirika sana'
      ]
    },
    prevention: {
      en: 'Regular copper sprays and good canopy management prevent severe outbreaks.',
      sw: 'Kunyunyizia shaba mara kwa mara na usimamizi mzuri wa taji huzuia milipuko mikubwa.'
    }
  },

  // ── TEA ──────────────────────────────────────────────────
  {
    id: 'TBB', cropId: 'tea',
    en: 'Blister Blight', sw: 'Ugonjwa wa Malengelenge ya Chai',
    causalAgent: 'Exobasidium vexans (fungal)',
    riskLevel: 'HIGH',
    description: {
      en: 'The most important fungal disease of tea in Kenya\'s highlands. Affects young flush leaves, causing pale translucent spots that develop into blister-like swellings. Severely reduces plucking yield.',
      sw: 'Ugonjwa muhimu zaidi wa ukungu wa chai katika nyanda za juu za Kenya. Unaathiri majani machanga ya machipuo, ukisababisha madoa meupe ya uwazi ambayo yanakua kuwa malengelenge. Hupunguza sana mavuno.'
    },
    treatment: {
      en: [
        'Apply copper-based fungicide (copper oxychloride) at weekly intervals during wet weather',
        'Increase plucking frequency to remove infected flush before spores mature',
        'Improve shade management — blister blight favours wet shaded conditions',
        'Avoid excessive nitrogen fertilisation which produces soft growth vulnerable to disease',
        'Ensure good drainage in the tea field to reduce surface moisture'
      ],
      sw: [
        'Tumia dawa ya ukungu yenye shaba (copper oxychloride) kila wiki wakati wa hali ya hewa ya mvua',
        'Ongeza mara za kupanda ili kuondoa machipuo yaliyoambukizwa kabla spores hazijakomaa',
        'Boresha usimamizi wa kivuli — ugonjwa wa malengelenge unapenda hali ya unyevu yenye kivuli',
        'Epuka mbolea nyingi za nitrojeni ambazo huzalisha ukuaji laini unaoathirika na ugonjwa',
        'Hakikisha mifereji mizuri kwenye shamba la chai kupunguza unyevu wa uso'
      ]
    },
    prevention: {
      en: 'Preventive copper sprays during rainy seasons. Regular plucking of new flush.',
      sw: 'Kunyunyizia shaba za kinga wakati wa msimu wa mvua. Kupanda mara kwa mara kwa machipuo mapya.'
    }
  },
  {
    id: 'TMB', cropId: 'tea',
    en: 'Tea Mosquito Bug', sw: 'Mbu wa Chai',
    causalAgent: 'Helopeltis schoutedeni (hemipteran insect pest)',
    riskLevel: 'MODERATE',
    description: {
      en: 'An insect pest that pierces young tea shoots and leaves, causing brown angular lesions with a characteristic central puncture mark. Severe infestations cause shoot dieback and reduced yield.',
      sw: 'Wadudu wanaochomeka machipuo na majani machanga ya chai, wakisababisha madoa ya kahawia yenye pembe na alama ya kuchomeka katikati. Msambao mkubwa husababisha kufa kwa machipuo na kupungua kwa mavuno.'
    },
    treatment: {
      en: [
        'Apply approved contact insecticide (e.g. cypermethrin) targeting young shoots',
        'Increase plucking frequency to remove damaged shoots and reduce pest habitat',
        'Maintain good shade management — pest populations are higher in overly shaded conditions',
        'Scout fields regularly to detect infestations early'
      ],
      sw: [
        'Tumia dawa ya wadudu ya mawasiliano iliyoidhinishwa (k.m. cypermethrin) ukilenga machipuo machanga',
        'Ongeza mara za kupanda ili kuondoa machipuo yaliyoharibika na kupunguza makazi ya wadudu',
        'Dumisha usimamizi mzuri wa kivuli — idadi ya wadudu ni kubwa zaidi katika hali ya kivuli kingi',
        'Kagua mashamba mara kwa mara ili kugundua msambao mapema'
      ]
    },
    prevention: {
      en: 'Regular scouting and timely plucking keep populations manageable.',
      sw: 'Ukaguzi wa kawaida na kupanda kwa wakati hufanya idadi ya wadudu iweze kudhibitiwa.'
    }
  },
]

// ─────────────────────────────────────────────────────────────
// RULE BASE  — IF-THEN forward chaining rules (Assignment 3)
// ─────────────────────────────────────────────────────────────
export const RULES = [
  // MAIZE RULES
  { id: 'R-M-001', diseaseId: 'MSV',  cropId: 'maize',  confidence: 'HIGH',
    conditions: [
      { fact: 'leaf_colour',         value: 'yellow_green_streaks' },
      { fact: 'streaks_along_leaf',  value: 'yes' },
      { fact: 'stunted_growth',      value: 'yes' },
    ]
  },
  { id: 'R-M-002', diseaseId: 'MLN',  cropId: 'maize',  confidence: 'HIGH',
    conditions: [
      { fact: 'leaf_mottling',            value: 'yes' },
      { fact: 'leaf_death_from_tip',      value: 'yes' },
      { fact: 'dead_heart',               value: 'yes' },
      { fact: 'multiple_plants_clustered',value: 'yes' },
    ]
  },
  { id: 'R-M-003', diseaseId: 'GLS',  cropId: 'maize',  confidence: 'HIGH',
    conditions: [
      { fact: 'rectangular_grey_lesions', value: 'yes' },
      { fact: 'lesions_between_veins',    value: 'yes' },
      { fact: 'lower_leaves_first',       value: 'yes' },
    ]
  },
  { id: 'R-M-004', diseaseId: 'FAW',  cropId: 'maize',  confidence: 'HIGH',
    conditions: [
      { fact: 'leaf_holes_ragged',   value: 'yes' },
      { fact: 'frass_sawdust',       value: 'yes' },
      { fact: 'caterpillars_visible',value: 'yes' },
    ]
  },
  { id: 'R-M-005', diseaseId: 'NLB',  cropId: 'maize',  confidence: 'HIGH',
    conditions: [
      { fact: 'cigar_shaped_lesions',value: 'yes' },
      { fact: 'lesions_tan_grey',    value: 'yes' },
      { fact: 'lower_leaves_first',  value: 'yes' },
    ]
  },
  // BEAN RULES
  { id: 'R-B-001', diseaseId: 'BR',   cropId: 'beans',  confidence: 'HIGH',
    conditions: [
      { fact: 'rust_pustules_underside', value: 'yes' },
      { fact: 'pustule_colour_orange',   value: 'yes' },
      { fact: 'yellowing_around_pustules', value: 'yes' },
    ]
  },
  { id: 'R-B-002', diseaseId: 'BCMV', cropId: 'beans',  confidence: 'HIGH',
    conditions: [
      { fact: 'mosaic_mottling',   value: 'yes' },
      { fact: 'leaf_distortion',   value: 'yes' },
      { fact: 'stunted_growth',    value: 'yes' },
    ]
  },
  { id: 'R-B-003', diseaseId: 'ALS',  cropId: 'beans',  confidence: 'HIGH',
    conditions: [
      { fact: 'angular_spots',         value: 'yes' },
      { fact: 'spots_limited_by_veins',value: 'yes' },
      { fact: 'grey_brown_colour',     value: 'yes' },
    ]
  },
  // TOMATO RULES
  { id: 'R-T-001', diseaseId: 'TBW',  cropId: 'tomato', confidence: 'HIGH',
    conditions: [
      { fact: 'wilting_sudden',    value: 'yes' },
      { fact: 'wilting_complete',  value: 'yes' },
      { fact: 'vascular_brown',    value: 'yes' },
      { fact: 'root_rot',          value: 'no'  },
    ]
  },
  { id: 'R-T-002', diseaseId: 'TEB',  cropId: 'tomato', confidence: 'HIGH',
    conditions: [
      { fact: 'dark_spots_concentric', value: 'yes' },
      { fact: 'lower_leaves_first',    value: 'yes' },
      { fact: 'yellow_halo',           value: 'yes' },
    ]
  },
  // POTATO RULES
  { id: 'R-P-001', diseaseId: 'PLB',  cropId: 'potato', confidence: 'HIGH',
    conditions: [
      { fact: 'water_soaked_lesions',  value: 'yes' },
      { fact: 'white_mould_underside', value: 'yes' },
      { fact: 'rapid_expansion',       value: 'yes' },
    ]
  },
  { id: 'R-P-002', diseaseId: 'PBW',  cropId: 'potato', confidence: 'HIGH',
    conditions: [
      { fact: 'wilting_sudden',    value: 'yes' },
      { fact: 'vascular_brown',    value: 'yes' },
      { fact: 'tuber_discoloration', value: 'yes' },
    ]
  },
  // KALE RULES
  { id: 'R-K-001', diseaseId: 'KAP',  cropId: 'kale',   confidence: 'HIGH',
    conditions: [
      { fact: 'sticky_residue',        value: 'yes' },
      { fact: 'insect_clusters',       value: 'yes' },
      { fact: 'leaf_curl',             value: 'yes' },
    ]
  },
  { id: 'R-K-002', diseaseId: 'KCR',  cropId: 'kale',   confidence: 'HIGH',
    conditions: [
      { fact: 'midday_wilting',        value: 'yes' },
      { fact: 'swollen_roots',         value: 'yes' },
      { fact: 'club_shaped_roots',     value: 'yes' },
    ]
  },
  // COFFEE RULES
  { id: 'R-C-001', diseaseId: 'CBD',  cropId: 'coffee', confidence: 'HIGH',
    conditions: [
      { fact: 'dark_spots_berries',    value: 'yes' },
      { fact: 'berries_shrivelling',   value: 'yes' },
      { fact: 'premature_berry_drop',  value: 'yes' },
    ]
  },
  { id: 'R-C-002', diseaseId: 'CLR',  cropId: 'coffee', confidence: 'HIGH',
    conditions: [
      { fact: 'orange_powder_underside', value: 'yes' },
      { fact: 'yellow_patches_upper',    value: 'yes' },
      { fact: 'defoliation',             value: 'yes' },
    ]
  },
  // TEA RULES
  { id: 'R-Tea-001', diseaseId: 'TBB', cropId: 'tea',   confidence: 'HIGH',
    conditions: [
      { fact: 'pale_translucent_spots', value: 'yes' },
      { fact: 'blister_swellings',      value: 'yes' },
      { fact: 'affects_new_flush',      value: 'yes' },
    ]
  },
  { id: 'R-Tea-002', diseaseId: 'TMB', cropId: 'tea',   confidence: 'HIGH',
    conditions: [
      { fact: 'brown_angular_lesions',  value: 'yes' },
      { fact: 'central_puncture_mark',  value: 'yes' },
      { fact: 'shoot_dieback',          value: 'yes' },
    ]
  },
]

// ─────────────────────────────────────────────────────────────
// SYMPTOM QUESTION SETS  per crop
// ─────────────────────────────────────────────────────────────
export const SYMPTOM_QUESTIONS = {
  maize: [
    {
      fact: 'leaf_colour',
      en: 'How would you describe the colour change on the affected leaves?',
      sw: 'Mabadiliko ya rangi ya majani yaliyoathirika ni ipi?',
      options: [
        { value: 'yellow_green_streaks', en: 'Yellow/pale-green streaks running the length of the leaf', sw: 'Mistari ya njano/kijani hafifu inayotembea urefu wa jani', icon: '🟡' },
        { value: 'mottled',              en: 'Blotchy mixed yellow-green pattern (mottling)',            sw: 'Mchanganyiko wa madoa ya njano-kijani (mottling)',       icon: '🍂' },
        { value: 'grey_lesions',         en: 'Grey-brown rectangular patches between the leaf veins',   sw: 'Madoa ya mstatili ya kijivu-kahawia kati ya mishipa',    icon: '⬜' },
        { value: 'tan_lesions',          en: 'Large cigar-shaped grey-tan lesions on older leaves',     sw: 'Madoa makubwa ya umbo la sigara ya kijivu kwenye majani ya zamani', icon: '🟤' },
        { value: 'normal',               en: 'Normal green — the problem is elsewhere on the plant',    sw: 'Kijani kawaida — tatizo liko mahali pengine kwenye mmea', icon: '🟢' },
      ]
    },
    {
      fact: 'streaks_along_leaf',
      en: 'Do the pale or yellow markings run the full length of the leaf blade?',
      sw: 'Je, alama za njano au hafifu zinaendesha urefu wote wa jani?',
      options: [
        { value: 'yes', en: 'Yes, streaks run the full length of the leaf', sw: 'Ndiyo, mistari inakwenda urefu wote wa jani', icon: '✅' },
        { value: 'no',  en: 'No, the marks are irregular patches or spots',  sw: 'Hapana, alama ni madoa yasiyo ya kawaida',   icon: '❌' },
      ]
    },
    {
      fact: 'stunted_growth',
      en: 'Are the affected plants shorter or stunted compared to healthy plants nearby?',
      sw: 'Je, mimea iliyoathirika ni mifupi kuliko mimea yenye afya iliyo karibu?',
      options: [
        { value: 'yes', en: 'Yes, noticeably shorter than surrounding plants', sw: 'Ndiyo, mifupi zaidi kuliko mimea inayoizunguka', icon: '📉' },
        { value: 'no',  en: 'No, normal height',                               sw: 'Hapana, urefu wa kawaida',                     icon: '📏' },
      ]
    },
    {
      fact: 'leaf_mottling',
      en: 'Is there a mixed blotchy yellow-green pattern (mottling) across the leaves?',
      sw: 'Je, kuna mchanganyiko wa madoa ya njano-kijani (mottling) kwenye majani?',
      options: [
        { value: 'yes', en: 'Yes, blotchy mottled pattern across the leaf surface', sw: 'Ndiyo, mchanganyiko wa madoa kwenye uso wa jani', icon: '🔶' },
        { value: 'no',  en: 'No clear mottling',                                    sw: 'Hakuna mchanganyiko wazi',                      icon: '❌' },
      ]
    },
    {
      fact: 'leaf_death_from_tip',
      en: 'Are leaves dying progressively from the tip downward toward the base?',
      sw: 'Je, majani yanakufa polepole kutoka ncha chini kuelekea msingi?',
      options: [
        { value: 'yes', en: 'Yes, dying from the tip downward', sw: 'Ndiyo, yakikufa kutoka ncha chini', icon: '🍂' },
        { value: 'no',  en: 'No, different pattern of damage',  sw: 'Hapana, mfumo tofauti wa uharibifu', icon: '❌' },
      ]
    },
    {
      fact: 'dead_heart',
      en: 'Is the central growing point (heart) of affected young plants dead or rotting?',
      sw: 'Je, kituo cha ukuaji (moyo) wa mimea michanga iliyoathirika kimekufa au kuoza?',
      options: [
        { value: 'yes', en: 'Yes, dead heart visible — centre of plant is dead', sw: 'Ndiyo, moyo umekufa — katikati ya mmea imekufa', icon: '💀' },
        { value: 'no',  en: 'No, growing point appears alive',                   sw: 'Hapana, kituo cha ukuaji kinaonekana kuishi',    icon: '✅' },
      ]
    },
    {
      fact: 'multiple_plants_clustered',
      en: 'Are multiple affected plants grouped or clustered together in one area of the field?',
      sw: 'Je, mimea mingi iliyoathirika imekusanyika pamoja katika eneo moja la shamba?',
      options: [
        { value: 'yes', en: 'Yes, clustered together in a specific area', sw: 'Ndiyo, zimekusanyika pamoja katika eneo maalum', icon: '🫧' },
        { value: 'no',  en: 'No, scattered randomly across the field',    sw: 'Hapana, imetawanyika bila mpangilio shambani',  icon: '🌱' },
      ]
    },
    {
      fact: 'rectangular_grey_lesions',
      en: 'Are there rectangular grey-brown lesions that are limited by and run between the leaf veins?',
      sw: 'Je, kuna madoa ya mstatili ya kijivu-kahawia yanayozuiwa na mishipa ya majani?',
      options: [
        { value: 'yes', en: 'Yes, rectangular grey patches between the veins', sw: 'Ndiyo, madoa ya mstatili ya kijivu kati ya mishipa', icon: '▭' },
        { value: 'no',  en: 'No, different type of lesions',                   sw: 'Hapana, aina tofauti ya madoa',                     icon: '❌' },
      ]
    },
    {
      fact: 'lesions_between_veins',
      en: 'Are the lesions clearly bounded by the leaf veins — do they NOT cross over the veins?',
      sw: 'Je, madoa yanazuiwa wazi na mishipa ya majani — HAYAVUKI mishipa?',
      options: [
        { value: 'yes', en: 'Yes, lesions stay strictly between the veins', sw: 'Ndiyo, madoa yanabaki kati ya mishipa tu', icon: '✅' },
        { value: 'no',  en: 'No, they cross over the veins freely',          sw: 'Hapana, yanakupita mishipa bila kizuizi',  icon: '❌' },
      ]
    },
    {
      fact: 'lower_leaves_first',
      en: 'Did the symptoms first appear on the lower or older leaves, then spread upward?',
      sw: 'Je, dalili zilionekana kwanza kwenye majani ya chini au ya zamani, kisha kuenea juu?',
      options: [
        { value: 'yes', en: 'Yes, started on lower/older leaves and moved up', sw: 'Ndiyo, ilianza kwenye majani ya chini na kuenea juu', icon: '⬇️' },
        { value: 'no',  en: 'No, affecting upper young leaves equally or first', sw: 'Hapana, pia inaathiri majani ya juu ya vijana', icon: '⬆️' },
      ]
    },
    {
      fact: 'leaf_holes_ragged',
      en: 'Are there irregular ragged holes eaten through the leaves?',
      sw: 'Je, kuna matundu yasiyo ya kawaida yaliyoliwa kupitia majani?',
      options: [
        { value: 'yes', en: 'Yes, ragged holes through the leaf tissue', sw: 'Ndiyo, matundu yasiyo ya kawaida kwenye tishu ya jani', icon: '🕳️' },
        { value: 'no',  en: 'No holes visible',                          sw: 'Hapana matundu yanayoonekana',                          icon: '❌' },
      ]
    },
    {
      fact: 'frass_sawdust',
      en: 'Is there sawdust-like frass (caterpillar droppings) visible inside the leaf whorls?',
      sw: 'Je, kuna kinyesi kinachofanana na vumbi la mbao (kinyesi cha viwavi) ndani ya viunzi vya majani?',
      options: [
        { value: 'yes', en: 'Yes, sawdust-like material in the leaf whorls', sw: 'Ndiyo, kinyesi kinachofanana na vumbi la mbao kwenye viunzi', icon: '🔶' },
        { value: 'no',  en: 'No such material visible',                      sw: 'Hakuna kitu kama hicho kinachoonekana',                     icon: '❌' },
      ]
    },
    {
      fact: 'caterpillars_visible',
      en: 'Are caterpillars or larvae visible on or inside the plants?',
      sw: 'Je, viwavi au mabuu yanayoonekana juu au ndani ya mimea?',
      options: [
        { value: 'yes', en: 'Yes, caterpillars or larvae visible', sw: 'Ndiyo, viwavi au mabuu yanaonekana', icon: '🐛' },
        { value: 'no',  en: 'No insects or larvae visible',        sw: 'Hakuna wadudu au mabuu yanayoonekana', icon: '❌' },
      ]
    },
    {
      fact: 'cigar_shaped_lesions',
      en: 'Are there large elongated lesions shaped like a cigar (2–15 cm long) on the leaves?',
      sw: 'Je, kuna madoa makubwa ya umbo la sigara (sm 2-15 urefu) kwenye majani?',
      options: [
        { value: 'yes', en: 'Yes, large elongated cigar-shaped lesions', sw: 'Ndiyo, madoa makubwa ya muda mrefu ya umbo la sigara', icon: '🚬' },
        { value: 'no',  en: 'No, smaller or differently shaped spots',   sw: 'Hapana, madoa madogo au ya umbo tofauti',              icon: '❌' },
      ]
    },
    {
      fact: 'lesions_tan_grey',
      en: 'Are the elongated lesions tan, grey, or straw-coloured?',
      sw: 'Je, madoa ya muda mrefu ni ya rangi ya kahawia hafifu, kijivu, au majani ya ukame?',
      options: [
        { value: 'yes', en: 'Yes, tan/grey/straw coloured lesions', sw: 'Ndiyo, madoa ya kahawia hafifu/kijivu/majani ukame', icon: '🟫' },
        { value: 'no',  en: 'No, different colour',                  sw: 'Hapana, rangi tofauti',                             icon: '❌' },
      ]
    },
  ],

  beans: [
    {
      fact: 'rust_pustules_underside',
      en: 'Are there small raised pustules (powder-filled bumps) on the underside of the leaves?',
      sw: 'Je, kuna matuta madogo yaliyoinuka (yaliyojaa unga) chini ya majani?',
      options: [
        { value: 'yes', en: 'Yes, raised pustules visible on leaf undersides', sw: 'Ndiyo, matuta yaliyoinuka yanaonekana chini ya majani', icon: '🔴' },
        { value: 'no',  en: 'No pustules, different symptoms present',         sw: 'Hapana matuta, dalili tofauti zinaonekana',            icon: '❌' },
      ]
    },
    {
      fact: 'pustule_colour_orange',
      en: 'What colour are the pustules on the leaf underside?',
      sw: 'Rangi ya matuta chini ya majani ni ipi?',
      options: [
        { value: 'yes', en: 'Orange-brown (rust coloured)', sw: 'Rangi ya machungwa-kahawia (rangi ya kutu)', icon: '🟠' },
        { value: 'no',  en: 'Dark brown, black, or white',  sw: 'Kahawia nyeusi, nyeusi, au nyeupe',         icon: '⚫' },
      ]
    },
    {
      fact: 'yellowing_around_pustules',
      en: 'Is there yellowing of the leaf tissue around each pustule (yellow halo)?',
      sw: 'Je, kuna manjano ya tishu ya jani kuzunguka kila tuta (pete ya njano)?',
      options: [
        { value: 'yes', en: 'Yes, yellow halo surrounds the pustules', sw: 'Ndiyo, pete ya njano inazunguka matuta', icon: '🟡' },
        { value: 'no',  en: 'No yellowing around the pustules',        sw: 'Hakuna manjano kuzunguka matuta',       icon: '❌' },
      ]
    },
    {
      fact: 'mosaic_mottling',
      en: 'Are there light and dark green patches mixed together on the leaves (mosaic)?',
      sw: 'Je, kuna mchanganyiko wa vipande vya kijani hafifu na kijani giza kwenye majani (mosaic)?',
      options: [
        { value: 'yes', en: 'Yes, mosaic pattern of light and dark green', sw: 'Ndiyo, mfumo wa mosaic wa kijani hafifu na giza', icon: '🔶' },
        { value: 'no',  en: 'No mosaic, uniform colour',                   sw: 'Hakuna mosaic, rangi ya kawaida',                 icon: '✅' },
      ]
    },
    {
      fact: 'leaf_distortion',
      en: 'Are the leaves distorted, puckered, blistered, or deformed in shape?',
      sw: 'Je, majani yamepinda, yaliyozidi, malengelenge, au yamebadilika umbo?',
      options: [
        { value: 'yes', en: 'Yes, leaves are clearly distorted or deformed', sw: 'Ndiyo, majani yamepinda au yamebadilika wazi', icon: '🌀' },
        { value: 'no',  en: 'No, leaves have a normal shape',                sw: 'Hapana, majani yana umbo la kawaida',         icon: '✅' },
      ]
    },
    {
      fact: 'stunted_growth',
      en: 'Are affected plants significantly shorter or stunted?',
      sw: 'Je, mimea iliyoathirika ni mifupi sana au imezuiwa kukua?',
      options: [
        { value: 'yes', en: 'Yes, stunted — noticeably shorter than healthy plants', sw: 'Ndiyo, imezuiwa — mifupi zaidi kuliko mimea yenye afya', icon: '📉' },
        { value: 'no',  en: 'No, normal height',                                     sw: 'Hapana, urefu wa kawaida',                              icon: '📏' },
      ]
    },
    {
      fact: 'angular_spots',
      en: 'Are there angular (straight-edged, geometric) spots on the leaves?',
      sw: 'Je, kuna madoa yenye pembe (makali ya mstari, ya kijiometri) kwenye majani?',
      options: [
        { value: 'yes', en: 'Yes, angular geometric spots with straight edges', sw: 'Ndiyo, madoa yenye pembe za kijiometri na makali ya mstari', icon: '🔷' },
        { value: 'no',  en: 'No, round or irregular spots',                     sw: 'Hapana, madoa ya mviringo au yasiyo ya kawaida',             icon: '❌' },
      ]
    },
    {
      fact: 'spots_limited_by_veins',
      en: 'Are the spots clearly bounded and limited by the leaf veins?',
      sw: 'Je, madoa yanazuiwa wazi na mishipa ya majani?',
      options: [
        { value: 'yes', en: 'Yes, spots are bounded by the leaf veins', sw: 'Ndiyo, madoa yanazuiwa na mishipa ya majani', icon: '✅' },
        { value: 'no',  en: 'No, spots cross over the veins',           sw: 'Hapana, madoa yanakupita mishipa',            icon: '❌' },
      ]
    },
    {
      fact: 'grey_brown_colour',
      en: 'Are the angular spots grey-brown or ash coloured?',
      sw: 'Je, madoa yenye pembe ni ya kijivu-kahawia au rangi ya majivu?',
      options: [
        { value: 'yes', en: 'Yes, grey-brown or ash coloured spots', sw: 'Ndiyo, madoa ya kijivu-kahawia au majivu', icon: '🩶' },
        { value: 'no',  en: 'No, different colour',                   sw: 'Hapana, rangi tofauti',                    icon: '❌' },
      ]
    },
  ],

  tomato: [
    {
      fact: 'wilting_sudden',
      en: 'Have the plants wilted suddenly — within just 1 to 2 days?',
      sw: 'Je, mimea imekauka ghafla — ndani ya siku 1 hadi 2 tu?',
      options: [
        { value: 'yes', en: 'Yes, sudden rapid wilting within 1–2 days', sw: 'Ndiyo, kukauka kwa ghafla ndani ya siku 1-2', icon: '🥀' },
        { value: 'no',  en: 'No, gradual wilting over many days',         sw: 'Hapana, kukauka polepole kwa siku nyingi',   icon: '🌱' },
      ]
    },
    {
      fact: 'wilting_complete',
      en: 'Is the wilting affecting the WHOLE plant, not just one branch?',
      sw: 'Je, kukauka kunaathiri mmea MZIMA, sio tawi moja tu?',
      options: [
        { value: 'yes', en: 'Yes, the entire plant is wilting', sw: 'Ndiyo, mmea mzima unakauka', icon: '🌿' },
        { value: 'no',  en: 'No, only parts or branches',       sw: 'Hapana, sehemu au matawi tu', icon: '🌱' },
      ]
    },
    {
      fact: 'vascular_brown',
      en: 'If you cut the stem close to the ground, is there brown discoloration inside?',
      sw: 'Ukikata shina karibu na ardhi, je, kuna kahawia ndani ya tishu?',
      options: [
        { value: 'yes', en: 'Yes, brown discoloration inside the stem', sw: 'Ndiyo, kahawia ndani ya shina', icon: '🟤' },
        { value: 'no',  en: 'No, stem tissue looks normal inside',       sw: 'Hapana, tishu ya shina inaonekana kawaida ndani', icon: '✅' },
      ]
    },
    {
      fact: 'root_rot',
      en: 'Are the roots black, soft, mushy or clearly rotting?',
      sw: 'Je, mizizi ni nyeusi, laini, ya uji au inaoza wazi?',
      options: [
        { value: 'yes', en: 'Yes, roots are rotting or black', sw: 'Ndiyo, mizizi inaoza au ni nyeusi', icon: '🔴' },
        { value: 'no',  en: 'No, roots appear healthy',        sw: 'Hapana, mizizi inaonekana kuwa na afya', icon: '✅' },
      ]
    },
    {
      fact: 'dark_spots_concentric',
      en: 'Are there dark brown or black spots with concentric rings (like a target/bullseye)?',
      sw: 'Je, kuna madoa ya kahawia nyeusi au nyeusi yenye pete za mviringo (kama shabaha)?',
      options: [
        { value: 'yes', en: 'Yes, target-pattern spots with concentric rings', sw: 'Ndiyo, madoa ya shabaha yenye pete za mviringo', icon: '🎯' },
        { value: 'no',  en: 'No, different type of spots',                     sw: 'Hapana, aina tofauti ya madoa',                  icon: '❌' },
      ]
    },
    {
      fact: 'lower_leaves_first',
      en: 'Did the spots or disease start on the lower, older leaves first?',
      sw: 'Je, madoa au ugonjwa ulianza kwanza kwenye majani ya chini, ya zamani?',
      options: [
        { value: 'yes', en: 'Yes, started on lower older leaves first', sw: 'Ndiyo, ulianza kwanza kwenye majani ya chini ya zamani', icon: '⬇️' },
        { value: 'no',  en: 'No, affecting young upper leaves too',     sw: 'Hapana, pia inaathiri majani machanga ya juu',           icon: '⬆️' },
      ]
    },
    {
      fact: 'yellow_halo',
      en: 'Do the spots have a clear yellow halo (ring) around them?',
      sw: 'Je, madoa yana pete ya njano wazi (mviringo) kuyazunguka?',
      options: [
        { value: 'yes', en: 'Yes, clear yellow halo surrounds each spot', sw: 'Ndiyo, pete ya njano wazi inazunguka kila doa', icon: '🟡' },
        { value: 'no',  en: 'No yellow halo around the spots',            sw: 'Hakuna pete ya njano kuzunguka madoa',          icon: '❌' },
      ]
    },
  ],

  potato: [
    {
      fact: 'water_soaked_lesions',
      en: 'Are there water-soaked or greasy-looking lesions on the leaves?',
      sw: 'Je, kuna madoa yanayoonekana kama ya maji au ya mafuta kwenye majani?',
      options: [
        { value: 'yes', en: 'Yes, water-soaked greasy-looking lesions present', sw: 'Ndiyo, madoa yanayoonekana kama ya maji au mafuta yapo', icon: '💧' },
        { value: 'no',  en: 'No, different appearance',                          sw: 'Hapana, mwonekano tofauti',                             icon: '❌' },
      ]
    },
    {
      fact: 'white_mould_underside',
      en: 'Is there white fluffy or powdery mould visible on the underside of leaves?',
      sw: 'Je, kuna ukungu mweupe laini au wa unga unaoonekana chini ya majani?',
      options: [
        { value: 'yes', en: 'Yes, white fluffy mould on undersides of leaves', sw: 'Ndiyo, ukungu mweupe laini chini ya majani', icon: '⬜' },
        { value: 'no',  en: 'No mould visible on the undersides',              sw: 'Hakuna ukungu unaoonekana chini',            icon: '❌' },
      ]
    },
    {
      fact: 'rapid_expansion',
      en: 'Are the lesions spreading very quickly — growing noticeably within 1–2 days?',
      sw: 'Je, madoa yanasambaa haraka sana — yakikua kwa kasi ndani ya siku 1-2?',
      options: [
        { value: 'yes', en: 'Yes, spreading very rapidly',  sw: 'Ndiyo, yanasambaa haraka sana', icon: '⚡' },
        { value: 'no',  en: 'No, slow or not spreading',    sw: 'Hapana, polepole au hayasambai', icon: '🐢' },
      ]
    },
    {
      fact: 'wilting_sudden',
      en: 'Are any plants wilting suddenly without obvious leaf disease symptoms first?',
      sw: 'Je, mimea yoyote inakauka ghafla bila dalili za ugonjwa wa majani kwanza?',
      options: [
        { value: 'yes', en: 'Yes, sudden unexplained wilting of whole plants', sw: 'Ndiyo, kukauka ghafla bila maelezo kwa mimea mizima', icon: '🥀' },
        { value: 'no',  en: 'No sudden wilting',                               sw: 'Hapana kukauka ghafla',                               icon: '✅' },
      ]
    },
    {
      fact: 'vascular_brown',
      en: 'If you cut a stem or tuber, is there brown ring or brown discoloration inside?',
      sw: 'Ukikata shina au boga, je, kuna pete ya kahawia au kahawia ndani?',
      options: [
        { value: 'yes', en: 'Yes, brown ring or discoloration inside the tissue', sw: 'Ndiyo, pete ya kahawia au kahawia ndani ya tishu', icon: '🟤' },
        { value: 'no',  en: 'No, tissue looks healthy inside',                    sw: 'Hapana, tishu inaonekana kuwa na afya ndani',     icon: '✅' },
      ]
    },
    {
      fact: 'tuber_discoloration',
      en: 'Do the tubers show brown or rotting tissue inside when you cut them?',
      sw: 'Je, boga zinaonyesha tishu ya kahawia au inayooza ndani ukizikatakata?',
      options: [
        { value: 'yes', en: 'Yes, brown rot or discoloration inside the tubers', sw: 'Ndiyo, uozo wa kahawia au kahawia ndani ya boga', icon: '🔴' },
        { value: 'no',  en: 'No, tubers look healthy when cut',                  sw: 'Hapana, boga zinaonekana kuwa na afya zikikatwa', icon: '✅' },
      ]
    },
  ],

  kale: [
    {
      fact: 'sticky_residue',
      en: 'Is there a sticky, shiny residue (honeydew) on the upper surface of leaves?',
      sw: 'Je, kuna mabaki ya ushupavu, ya kung\'aa (ushupavu wa asali) kwenye uso wa juu wa majani?',
      options: [
        { value: 'yes', en: 'Yes, sticky shiny honeydew on the leaves', sw: 'Ndiyo, ushupavu wa asali wa kung\'aa kwenye majani', icon: '🍯' },
        { value: 'no',  en: 'No stickiness on the leaves',              sw: 'Hakuna ushupavu kwenye majani',                     icon: '❌' },
      ]
    },
    {
      fact: 'insect_clusters',
      en: 'Are there clusters of tiny insects on the undersides of leaves or on growing tips?',
      sw: 'Je, kuna makundi ya wadudu wadogo chini ya majani au kwenye ncha za ukuaji?',
      options: [
        { value: 'yes', en: 'Yes, clusters of small insects visible', sw: 'Ndiyo, makundi ya wadudu wadogo yanaonekana', icon: '🐜' },
        { value: 'no',  en: 'No insect clusters visible',             sw: 'Hakuna makundi ya wadudu yanayoonekana',      icon: '❌' },
      ]
    },
    {
      fact: 'leaf_curl',
      en: 'Are the younger leaves curling, cupping, or puckering?',
      sw: 'Je, majani machanga yanajipinda, yakijifunika, au yakijizidi?',
      options: [
        { value: 'yes', en: 'Yes, younger leaves curling or distorting', sw: 'Ndiyo, majani machanga yanajipinda au kupotoka', icon: '🌀' },
        { value: 'no',  en: 'No, leaves have normal shape',              sw: 'Hapana, majani yana umbo la kawaida',            icon: '✅' },
      ]
    },
    {
      fact: 'midday_wilting',
      en: 'Do the plants wilt severely during the hottest part of the day despite adequate watering?',
      sw: 'Je, mimea inakauka sana wakati wa joto zaidi la siku licha ya kumwagiliwa vizuri?',
      options: [
        { value: 'yes', en: 'Yes, severe midday wilting despite watering', sw: 'Ndiyo, kukauka sana adhuhuri licha ya kumwagilia', icon: '☀️' },
        { value: 'no',  en: 'No, plants respond normally to watering',     sw: 'Hapana, mimea inajibu kawaida kwa umwagiliaji',  icon: '✅' },
      ]
    },
    {
      fact: 'swollen_roots',
      en: 'Are the roots swollen, enlarged, or deformed when you pull up a wilting plant?',
      sw: 'Je, mizizi imevimba, imekua, au imebadilika ukivuta mmea unaokaa?',
      options: [
        { value: 'yes', en: 'Yes, swollen and deformed roots visible', sw: 'Ndiyo, mizizi iliyovimba na kubadilika inaonekana', icon: '🔴' },
        { value: 'no',  en: 'No, roots look normal or are thin',       sw: 'Hapana, mizizi inaonekana kawaida au ni nyembamba', icon: '✅' },
      ]
    },
    {
      fact: 'club_shaped_roots',
      en: 'Are the root swellings club-shaped, knobbly, or forming irregular lumps?',
      sw: 'Je, uvimbe wa mizizi una umbo la rungu, matuta, au unafanya vipande visivyo vya kawaida?',
      options: [
        { value: 'yes', en: 'Yes, club-shaped or knobbly root swellings', sw: 'Ndiyo, uvimbe wa mizizi wenye umbo la rungu au matuta', icon: '🏑' },
        { value: 'no',  en: 'No distinct club or knobble shape',           sw: 'Hapana umbo la rungu au matuta wazi',                  icon: '❌' },
      ]
    },
  ],

  coffee: [
    {
      fact: 'dark_spots_berries',
      en: 'Are there dark brown or black sunken spots on the green coffee berries?',
      sw: 'Je, kuna madoa ya kahawia nyeusi au nyeusi yaliyozama kwenye beri za kijani za kahawa?',
      options: [
        { value: 'yes', en: 'Yes, dark sunken spots on the berries', sw: 'Ndiyo, madoa meusi yaliyozama kwenye beri', icon: '⚫' },
        { value: 'no',  en: 'No spots on the berries',               sw: 'Hakuna madoa kwenye beri',                  icon: '✅' },
      ]
    },
    {
      fact: 'berries_shrivelling',
      en: 'Are the berries shrivelling, mummifying, or turning black prematurely?',
      sw: 'Je, beri zinakunjamia, kukauka, au kugeuka nyeusi kabla ya wakati?',
      options: [
        { value: 'yes', en: 'Yes, berries are shrivelling or mummifying', sw: 'Ndiyo, beri zinakunjamia au kukauka', icon: '🔴' },
        { value: 'no',  en: 'No, berries look plump and normal',          sw: 'Hapana, beri zinaonekana zenye afya na kawaida', icon: '✅' },
      ]
    },
    {
      fact: 'premature_berry_drop',
      en: 'Are berries falling from the tree before they are fully ripe?',
      sw: 'Je, beri zinaanguka kutoka kwa mti kabla ya kukomaa kabisa?',
      options: [
        { value: 'yes', en: 'Yes, berries dropping before fully ripe', sw: 'Ndiyo, beri zinaanguka kabla ya kukomaa', icon: '⬇️' },
        { value: 'no',  en: 'No premature dropping',                   sw: 'Hapana kuanguka mapema',                  icon: '✅' },
      ]
    },
    {
      fact: 'orange_powder_underside',
      en: 'Is there orange powdery substance visible on the underside of coffee leaves?',
      sw: 'Je, kuna unga wa rangi ya machungwa unaoonekana chini ya majani ya kahawa?',
      options: [
        { value: 'yes', en: 'Yes, orange powder on leaf undersides', sw: 'Ndiyo, unga wa machungwa chini ya majani', icon: '🟠' },
        { value: 'no',  en: 'No orange powder visible',              sw: 'Hakuna unga wa machungwa unaoonekana',     icon: '❌' },
      ]
    },
    {
      fact: 'yellow_patches_upper',
      en: 'Are there yellow or pale patches on the upper surface of leaves?',
      sw: 'Je, kuna vipande vya njano au hafifu kwenye uso wa juu wa majani?',
      options: [
        { value: 'yes', en: 'Yes, yellow patches on the upper leaf surface', sw: 'Ndiyo, vipande vya njano kwenye uso wa juu wa jani', icon: '🟡' },
        { value: 'no',  en: 'No yellow patches',                              sw: 'Hakuna vipande vya njano',                          icon: '❌' },
      ]
    },
    {
      fact: 'defoliation',
      en: 'Are leaves dropping prematurely from the coffee plant?',
      sw: 'Je, majani yanaanguka kabla ya wakati kutoka kwa mmea wa kahawa?',
      options: [
        { value: 'yes', en: 'Yes, leaves dropping early from the plant', sw: 'Ndiyo, majani yanaanguka mapema kutoka kwa mmea', icon: '🍂' },
        { value: 'no',  en: 'No premature leaf drop',                    sw: 'Hapana kuanguka kwa majani kabla ya wakati',     icon: '✅' },
      ]
    },
  ],

  tea: [
    {
      fact: 'pale_translucent_spots',
      en: 'Are there pale, translucent (semi-transparent) spots on the young tea leaves?',
      sw: 'Je, kuna madoa meupe, ya uwazi (nusu-wazi) kwenye majani machanga ya chai?',
      options: [
        { value: 'yes', en: 'Yes, pale translucent spots on young leaves', sw: 'Ndiyo, madoa meupe ya uwazi kwenye majani machanga', icon: '⬜' },
        { value: 'no',  en: 'No, different symptoms',                       sw: 'Hapana, dalili tofauti',                             icon: '❌' },
      ]
    },
    {
      fact: 'blister_swellings',
      en: 'Do the spots develop into blister-like swellings or raised bubbles on the leaf?',
      sw: 'Je, madoa yanakua kuwa malengelenge au maputo yaliyoinuka kwenye jani?',
      options: [
        { value: 'yes', en: 'Yes, blister-like swellings develop on the leaf', sw: 'Ndiyo, malengelenge yanakua kwenye jani', icon: '🫧' },
        { value: 'no',  en: 'No blisters, lesions remain flat',                sw: 'Hapana malengelenge, madoa yanabaki bapa', icon: '❌' },
      ]
    },
    {
      fact: 'affects_new_flush',
      en: 'Are the symptoms concentrated mainly on the new young growth (flush)?',
      sw: 'Je, dalili zimejilimbikizia hasa kwenye ukuaji mpya wa vijana (machipuo)?',
      options: [
        { value: 'yes', en: 'Yes, mainly on the new flush / young shoots', sw: 'Ndiyo, hasa kwenye machipuo mapya / vijana', icon: '🌱' },
        { value: 'no',  en: 'No, on older leaves too',                     sw: 'Hapana, pia kwenye majani ya zamani',         icon: '🍃' },
      ]
    },
    {
      fact: 'brown_angular_lesions',
      en: 'Are there brown angular lesions or corky patches on the young shoots and leaves?',
      sw: 'Je, kuna madoa ya kahawia yenye pembe au vipande vya cork kwenye machipuo machanga?',
      options: [
        { value: 'yes', en: 'Yes, brown angular lesions on young shoots', sw: 'Ndiyo, madoa ya kahawia yenye pembe kwenye machipuo machanga', icon: '🟫' },
        { value: 'no',  en: 'No such lesions',                            sw: 'Hakuna madoa kama hayo',                                      icon: '❌' },
      ]
    },
    {
      fact: 'central_puncture_mark',
      en: 'Do the lesions have a tiny dark central puncture mark (feeding hole from an insect)?',
      sw: 'Je, madoa yana alama ndogo ya kuchomeka nyeusi katikati (tundu la kulisha la wadudu)?',
      options: [
        { value: 'yes', en: 'Yes, tiny dark central puncture mark visible', sw: 'Ndiyo, alama ndogo ya kuchomeka nyeusi katikati inaonekana', icon: '🔵' },
        { value: 'no',  en: 'No central puncture mark',                      sw: 'Hakuna alama ya kuchomeka katikati',                         icon: '❌' },
      ]
    },
    {
      fact: 'shoot_dieback',
      en: 'Are young shoots dying back from the tip?',
      sw: 'Je, machipuo machanga yanakufa kutoka ncha?',
      options: [
        { value: 'yes', en: 'Yes, young shoots dying back from the tip', sw: 'Ndiyo, machipuo machanga yanakufa kutoka ncha', icon: '💀' },
        { value: 'no',  en: 'No shoot dieback',                          sw: 'Hakuna kufa kwa machipuo',                     icon: '✅' },
      ]
    },
  ],
}
