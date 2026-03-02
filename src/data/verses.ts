export interface BibleVerse {
  book: string;
  chapter: number;
  verse: string;
  reference: string;
  text: string;
  themes: string[];
}

export const BIBLE_VERSES: BibleVerse[] = [
  // ── LOVE ──
  { book: "John", chapter: 3, verse: "16", reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", themes: ["love", "salvation", "faith", "grace"] },
  { book: "1 Corinthians", chapter: 13, verse: "4-7", reference: "1 Corinthians 13:4-7", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.", themes: ["love", "patience", "kindness", "relationships"] },
  { book: "1 John", chapter: 4, verse: "18", reference: "1 John 4:18", text: "There is no fear in love. But perfect love drives out fear, because fear has to do with punishment. The one who fears is not made perfect in love.", themes: ["love", "fear", "courage", "freedom"] },
  { book: "1 John", chapter: 4, verse: "19", reference: "1 John 4:19", text: "We love because he first loved us.", themes: ["love", "grace", "gratitude"] },
  { book: "Romans", chapter: 8, verse: "38-39", reference: "Romans 8:38-39", text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.", themes: ["love", "assurance", "security", "hope"] },
  { book: "John", chapter: 13, verse: "34-35", reference: "John 13:34-35", text: "A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another.", themes: ["love", "community", "discipleship", "relationships"] },
  { book: "1 Peter", chapter: 4, verse: "8", reference: "1 Peter 4:8", text: "Above all, love each other deeply, because love covers over a multitude of sins.", themes: ["love", "forgiveness", "community", "grace"] },

  // ── FAITH ──
  { book: "Hebrews", chapter: 11, verse: "1", reference: "Hebrews 11:1", text: "Now faith is confidence in what we hope for and assurance about what we do not see.", themes: ["faith", "hope", "trust", "confidence"] },
  { book: "Romans", chapter: 10, verse: "17", reference: "Romans 10:17", text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.", themes: ["faith", "scripture", "word of God"] },
  { book: "James", chapter: 2, verse: "26", reference: "James 2:26", text: "As the body without the spirit is dead, so faith without deeds is dead.", themes: ["faith", "works", "action", "obedience"] },
  { book: "Mark", chapter: 11, verse: "22-24", reference: "Mark 11:22-24", text: "Have faith in God. Truly I tell you, if anyone says to this mountain, 'Go, throw yourself into the sea,' and does not doubt in their heart but believes that what they say will happen, it will be done for them. Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.", themes: ["faith", "prayer", "doubt", "belief"] },
  { book: "2 Corinthians", chapter: 5, verse: "7", reference: "2 Corinthians 5:7", text: "For we live by faith, not by sight.", themes: ["faith", "trust", "walking with God"] },
  { book: "Ephesians", chapter: 2, verse: "8-9", reference: "Ephesians 2:8-9", text: "For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast.", themes: ["faith", "grace", "salvation", "gift"] },

  // ── HOPE ──
  { book: "Jeremiah", chapter: 29, verse: "11", reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", themes: ["hope", "purpose", "trust", "future", "plans"] },
  { book: "Romans", chapter: 15, verse: "13", reference: "Romans 15:13", text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.", themes: ["hope", "joy", "peace", "trust", "Holy Spirit"] },
  { book: "Romans", chapter: 8, verse: "28", reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", themes: ["hope", "purpose", "trust", "sovereignty"] },
  { book: "Lamentations", chapter: 3, verse: "22-23", reference: "Lamentations 3:22-23", text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.", themes: ["hope", "faithfulness", "mercy", "love", "new beginnings"] },
  { book: "Isaiah", chapter: 40, verse: "31", reference: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", themes: ["hope", "strength", "endurance", "renewal", "waiting"] },
  { book: "Psalm", chapter: 42, verse: "11", reference: "Psalm 42:11", text: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God.", themes: ["hope", "depression", "encouragement", "praise"] },

  // ── PEACE ──
  { book: "John", chapter: 14, verse: "27", reference: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", themes: ["peace", "fear", "comfort", "Jesus"] },
  { book: "Philippians", chapter: 4, verse: "6-7", reference: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", themes: ["peace", "anxiety", "prayer", "thankfulness"] },
  { book: "Isaiah", chapter: 26, verse: "3", reference: "Isaiah 26:3", text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.", themes: ["peace", "trust", "mind", "steadfastness"] },
  { book: "Psalm", chapter: 46, verse: "10", reference: "Psalm 46:10", text: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.", themes: ["peace", "stillness", "sovereignty", "rest"] },
  { book: "Colossians", chapter: 3, verse: "15", reference: "Colossians 3:15", text: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.", themes: ["peace", "thankfulness", "community", "heart"] },
  { book: "Psalm", chapter: 29, verse: "11", reference: "Psalm 29:11", text: "The Lord gives strength to his people; the Lord blesses his people with peace.", themes: ["peace", "strength", "blessing"] },

  // ── STRENGTH & COURAGE ──
  { book: "Philippians", chapter: 4, verse: "13", reference: "Philippians 4:13", text: "I can do all this through him who gives me strength.", themes: ["strength", "perseverance", "Christ", "ability"] },
  { book: "Isaiah", chapter: 41, verse: "10", reference: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.", themes: ["strength", "courage", "fear", "God's presence"] },
  { book: "Joshua", chapter: 1, verse: "9", reference: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", themes: ["courage", "strength", "fear", "God's presence"] },
  { book: "2 Timothy", chapter: 1, verse: "7", reference: "2 Timothy 1:7", text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", themes: ["courage", "power", "love", "self-discipline", "Holy Spirit"] },
  { book: "Deuteronomy", chapter: 31, verse: "6", reference: "Deuteronomy 31:6", text: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.", themes: ["courage", "strength", "fear", "faithfulness"] },
  { book: "Psalm", chapter: 27, verse: "1", reference: "Psalm 27:1", text: "The Lord is my light and my salvation — whom shall I fear? The Lord is the stronghold of my life — of whom shall I be afraid?", themes: ["courage", "confidence", "fear", "salvation", "light"] },
  { book: "Psalm", chapter: 18, verse: "2", reference: "Psalm 18:2", text: "The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge, my shield and the horn of my salvation, my stronghold.", themes: ["strength", "protection", "refuge", "deliverance"] },

  // ── TRUST ──
  { book: "Proverbs", chapter: 3, verse: "5-6", reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", themes: ["trust", "guidance", "wisdom", "surrender"] },
  { book: "Psalm", chapter: 37, verse: "4", reference: "Psalm 37:4", text: "Take delight in the Lord, and he will give you the desires of your heart.", themes: ["trust", "delight", "desires", "heart"] },
  { book: "Psalm", chapter: 56, verse: "3", reference: "Psalm 56:3", text: "When I am afraid, I put my trust in you.", themes: ["trust", "fear", "faith"] },
  { book: "Proverbs", chapter: 16, verse: "3", reference: "Proverbs 16:3", text: "Commit to the Lord whatever you do, and he will establish your plans.", themes: ["trust", "plans", "commitment", "work"] },
  { book: "Psalm", chapter: 9, verse: "10", reference: "Psalm 9:10", text: "Those who know your name trust in you, for you, Lord, have never forsaken those who seek you.", themes: ["trust", "seeking God", "faithfulness"] },

  // ── FORGIVENESS & GRACE ──
  { book: "Ephesians", chapter: 4, verse: "32", reference: "Ephesians 4:32", text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.", themes: ["forgiveness", "kindness", "compassion", "grace"] },
  { book: "1 John", chapter: 1, verse: "9", reference: "1 John 1:9", text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.", themes: ["forgiveness", "confession", "faithfulness", "purification"] },
  { book: "Colossians", chapter: 3, verse: "13", reference: "Colossians 3:13", text: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.", themes: ["forgiveness", "relationships", "grace", "patience"] },
  { book: "Psalm", chapter: 103, verse: "12", reference: "Psalm 103:12", text: "As far as the east is from the west, so far has he removed our transgressions from us.", themes: ["forgiveness", "grace", "mercy", "freedom"] },
  { book: "Romans", chapter: 3, verse: "23-24", reference: "Romans 3:23-24", text: "For all have sinned and fall short of the glory of God, and all are justified freely by his grace through the redemption that came by Christ Jesus.", themes: ["grace", "salvation", "redemption", "forgiveness"] },
  { book: "2 Corinthians", chapter: 12, verse: "9", reference: "2 Corinthians 12:9", text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me.", themes: ["grace", "weakness", "power", "sufficiency"] },

  // ── WISDOM ──
  { book: "Proverbs", chapter: 2, verse: "6", reference: "Proverbs 2:6", text: "For the Lord gives wisdom; from his mouth come knowledge and understanding.", themes: ["wisdom", "knowledge", "understanding"] },
  { book: "James", chapter: 1, verse: "5", reference: "James 1:5", text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.", themes: ["wisdom", "prayer", "generosity", "asking"] },
  { book: "Proverbs", chapter: 4, verse: "7", reference: "Proverbs 4:7", text: "The beginning of wisdom is this: Get wisdom. Though it cost all you have, get understanding.", themes: ["wisdom", "understanding", "priorities"] },
  { book: "Psalm", chapter: 119, verse: "105", reference: "Psalm 119:105", text: "Your word is a lamp for my feet, a light on my path.", themes: ["wisdom", "guidance", "scripture", "light", "direction"] },
  { book: "Proverbs", chapter: 9, verse: "10", reference: "Proverbs 9:10", text: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.", themes: ["wisdom", "fear of the Lord", "understanding", "knowledge"] },
  { book: "Colossians", chapter: 3, verse: "16", reference: "Colossians 3:16", text: "Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom through psalms, hymns, and songs from the Spirit, singing to God with gratitude in your hearts.", themes: ["wisdom", "community", "worship", "gratitude", "scripture"] },

  // ── JOY ──
  { book: "Nehemiah", chapter: 8, verse: "10", reference: "Nehemiah 8:10", text: "Do not grieve, for the joy of the Lord is your strength.", themes: ["joy", "strength", "grief", "encouragement"] },
  { book: "Psalm", chapter: 16, verse: "11", reference: "Psalm 16:11", text: "You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand.", themes: ["joy", "God's presence", "life", "eternity"] },
  { book: "James", chapter: 1, verse: "2-3", reference: "James 1:2-3", text: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.", themes: ["joy", "trials", "perseverance", "faith"] },
  { book: "Galatians", chapter: 5, verse: "22-23", reference: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.", themes: ["joy", "fruit of the Spirit", "love", "peace", "kindness", "faithfulness"] },
  { book: "Romans", chapter: 12, verse: "12", reference: "Romans 12:12", text: "Be joyful in hope, patient in affliction, faithful in prayer.", themes: ["joy", "hope", "patience", "prayer", "faithfulness"] },

  // ── COMFORT & HEALING ──
  { book: "Psalm", chapter: 34, verse: "18", reference: "Psalm 34:18", text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", themes: ["comfort", "healing", "brokenness", "God's presence"] },
  { book: "Psalm", chapter: 23, verse: "1-4", reference: "Psalm 23:1-4", text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. He guides me along the right paths for his name's sake. Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.", themes: ["comfort", "guidance", "provision", "peace", "protection"] },
  { book: "Matthew", chapter: 11, verse: "28-30", reference: "Matthew 11:28-30", text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.", themes: ["comfort", "rest", "weariness", "burden", "Jesus"] },
  { book: "2 Corinthians", chapter: 1, verse: "3-4", reference: "2 Corinthians 1:3-4", text: "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort others in any trouble with the comfort we ourselves receive from God.", themes: ["comfort", "compassion", "trouble", "community"] },
  { book: "Psalm", chapter: 147, verse: "3", reference: "Psalm 147:3", text: "He heals the brokenhearted and binds up their wounds.", themes: ["healing", "comfort", "brokenness"] },
  { book: "Isaiah", chapter: 53, verse: "5", reference: "Isaiah 53:5", text: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.", themes: ["healing", "salvation", "peace", "sacrifice"] },
  { book: "Revelation", chapter: 21, verse: "4", reference: "Revelation 21:4", text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.", themes: ["comfort", "healing", "eternity", "hope", "heaven"] },

  // ── GUIDANCE & DIRECTION ──
  { book: "Psalm", chapter: 32, verse: "8", reference: "Psalm 32:8", text: "I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you.", themes: ["guidance", "teaching", "wisdom", "love"] },
  { book: "Isaiah", chapter: 30, verse: "21", reference: "Isaiah 30:21", text: "Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, 'This is the way; walk in it.'", themes: ["guidance", "direction", "obedience", "hearing God"] },
  { book: "Jeremiah", chapter: 33, verse: "3", reference: "Jeremiah 33:3", text: "Call to me and I will answer you and tell you great and unsearchable things you do not know.", themes: ["guidance", "prayer", "revelation", "knowledge"] },
  { book: "Psalm", chapter: 25, verse: "4-5", reference: "Psalm 25:4-5", text: "Show me your ways, Lord, teach me your paths. Guide me in your truth and teach me, for you are God my Savior, and my hope is in you all day long.", themes: ["guidance", "truth", "teaching", "hope"] },

  // ── PRAYER ──
  { book: "Matthew", chapter: 7, verse: "7-8", reference: "Matthew 7:7-8", text: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you. For everyone who asks receives; the one who seeks finds; and to the one who knocks, the door will be opened.", themes: ["prayer", "asking", "seeking", "persistence", "faith"] },
  { book: "1 Thessalonians", chapter: 5, verse: "16-18", reference: "1 Thessalonians 5:16-18", text: "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus.", themes: ["prayer", "joy", "gratitude", "God's will", "thankfulness"] },
  { book: "Philippians", chapter: 4, verse: "19", reference: "Philippians 4:19", text: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.", themes: ["prayer", "provision", "needs", "trust", "glory"] },
  { book: "Matthew", chapter: 6, verse: "6", reference: "Matthew 6:6", text: "But when you pray, go into your room, close the door and pray to your Father, who is unseen. Then your Father, who sees what is done in secret, will reward you.", themes: ["prayer", "intimacy", "devotion", "reward"] },
  { book: "Psalm", chapter: 145, verse: "18", reference: "Psalm 145:18", text: "The Lord is near to all who call on him, to all who call on him in truth.", themes: ["prayer", "God's presence", "truth", "nearness"] },

  // ── IDENTITY & PURPOSE ──
  { book: "Psalm", chapter: 139, verse: "14", reference: "Psalm 139:14", text: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.", themes: ["identity", "creation", "praise", "self-worth"] },
  { book: "Ephesians", chapter: 2, verse: "10", reference: "Ephesians 2:10", text: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.", themes: ["identity", "purpose", "creation", "good works"] },
  { book: "Romans", chapter: 12, verse: "2", reference: "Romans 12:2", text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is — his good, pleasing and perfect will.", themes: ["identity", "transformation", "mind", "God's will", "renewal"] },
  { book: "2 Corinthians", chapter: 5, verse: "17", reference: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!", themes: ["identity", "new creation", "transformation", "Christ"] },
  { book: "1 Peter", chapter: 2, verse: "9", reference: "1 Peter 2:9", text: "But you are a chosen people, a royal priesthood, a holy nation, God's special possession, that you may declare the praises of him who called you out of darkness into his wonderful light.", themes: ["identity", "chosen", "purpose", "light", "praise"] },
  { book: "Micah", chapter: 6, verse: "8", reference: "Micah 6:8", text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.", themes: ["purpose", "justice", "mercy", "humility"] },
  { book: "Matthew", chapter: 6, verse: "33", reference: "Matthew 6:33", text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.", themes: ["purpose", "priorities", "trust", "kingdom", "provision"] },
  { book: "Colossians", chapter: 3, verse: "23", reference: "Colossians 3:23", text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", themes: ["purpose", "work", "diligence", "heart"] },

  // ── ANXIETY & WORRY ──
  { book: "Matthew", chapter: 6, verse: "34", reference: "Matthew 6:34", text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.", themes: ["anxiety", "worry", "present", "trust"] },
  { book: "1 Peter", chapter: 5, verse: "7", reference: "1 Peter 5:7", text: "Cast all your anxiety on him because he cares for you.", themes: ["anxiety", "care", "trust", "burden"] },
  { book: "Matthew", chapter: 6, verse: "25-26", reference: "Matthew 6:25-26", text: "Therefore I tell you, do not worry about your life, what you will eat or drink; or about your body, what you will wear. Is not life more than food, and the body more than clothes? Look at the birds of the air; they do not sow or reap or store away in barns, and yet your heavenly Father feeds them. Are you not much more valuable than they?", themes: ["anxiety", "provision", "trust", "value", "worry"] },
  { book: "Psalm", chapter: 94, verse: "19", reference: "Psalm 94:19", text: "When anxiety was great within me, your consolation brought me joy.", themes: ["anxiety", "joy", "comfort", "consolation"] },

  // ── PATIENCE & PERSEVERANCE ──
  { book: "Romans", chapter: 5, verse: "3-4", reference: "Romans 5:3-4", text: "Not only so, but we also glory in our sufferings, because we know that suffering produces perseverance; perseverance, character; and character, hope.", themes: ["perseverance", "suffering", "character", "hope"] },
  { book: "Hebrews", chapter: 12, verse: "1-2", reference: "Hebrews 12:1-2", text: "Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us, fixing our eyes on Jesus, the pioneer and perfecter of faith.", themes: ["perseverance", "faith", "Jesus", "endurance", "running"] },
  { book: "Galatians", chapter: 6, verse: "9", reference: "Galatians 6:9", text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.", themes: ["perseverance", "good works", "patience", "harvest"] },
  { book: "Isaiah", chapter: 40, verse: "29", reference: "Isaiah 40:29", text: "He gives strength to the weary and increases the power of the weak.", themes: ["perseverance", "strength", "weariness", "weakness"] },
  { book: "Psalm", chapter: 27, verse: "14", reference: "Psalm 27:14", text: "Wait for the Lord; be strong and take heart and wait for the Lord.", themes: ["patience", "waiting", "strength", "heart"] },

  // ── PROTECTION & SAFETY ──
  { book: "Psalm", chapter: 91, verse: "1-2", reference: "Psalm 91:1-2", text: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge and my fortress, my God, in whom I trust.'", themes: ["protection", "shelter", "trust", "rest", "safety"] },
  { book: "Psalm", chapter: 121, verse: "7-8", reference: "Psalm 121:7-8", text: "The Lord will keep you from all harm — he will watch over your life; the Lord will watch over your coming and going both now and forevermore.", themes: ["protection", "safety", "watchfulness", "eternity"] },
  { book: "Isaiah", chapter: 54, verse: "17", reference: "Isaiah 54:17", text: "No weapon forged against you will prevail, and you will refute every tongue that accuses you. This is the heritage of the servants of the Lord, and this is their vindication from me, declares the Lord.", themes: ["protection", "victory", "heritage", "vindication"] },
  { book: "2 Thessalonians", chapter: 3, verse: "3", reference: "2 Thessalonians 3:3", text: "But the Lord is faithful, and he will strengthen you and protect you from the evil one.", themes: ["protection", "faithfulness", "strength", "evil"] },
  { book: "Nahum", chapter: 1, verse: "7", reference: "Nahum 1:7", text: "The Lord is good, a refuge in times of trouble. He cares for those who trust in him.", themes: ["protection", "refuge", "trouble", "trust", "goodness"] },

  // ── SALVATION ──
  { book: "Romans", chapter: 6, verse: "23", reference: "Romans 6:23", text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.", themes: ["salvation", "grace", "eternal life", "gift"] },
  { book: "Acts", chapter: 16, verse: "31", reference: "Acts 16:31", text: "Believe in the Lord Jesus, and you will be saved — you and your household.", themes: ["salvation", "belief", "faith", "family"] },
  { book: "John", chapter: 14, verse: "6", reference: "John 14:6", text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'", themes: ["salvation", "truth", "life", "Jesus", "way"] },
  { book: "Romans", chapter: 10, verse: "9", reference: "Romans 10:9", text: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved.", themes: ["salvation", "confession", "belief", "resurrection"] },
  { book: "Titus", chapter: 3, verse: "5", reference: "Titus 3:5", text: "He saved us, not because of righteous things we had done, but because of his mercy. He saved us through the washing of rebirth and renewal by the Holy Spirit.", themes: ["salvation", "mercy", "renewal", "Holy Spirit"] },

  // ── GOD'S FAITHFULNESS ──
  { book: "Deuteronomy", chapter: 7, verse: "9", reference: "Deuteronomy 7:9", text: "Know therefore that the Lord your God is God; he is the faithful God, keeping his covenant of love to a thousand generations of those who love him and keep his commandments.", themes: ["faithfulness", "love", "covenant", "obedience"] },
  { book: "Psalm", chapter: 100, verse: "5", reference: "Psalm 100:5", text: "For the Lord is good and his love endures forever; his faithfulness continues through all generations.", themes: ["faithfulness", "love", "goodness", "eternity"] },
  { book: "Numbers", chapter: 23, verse: "19", reference: "Numbers 23:19", text: "God is not human, that he should lie, not a human being, that he should change his mind. Does he speak and then not act? Does he promise and not fulfill?", themes: ["faithfulness", "truth", "promises", "reliability"] },
  { book: "1 Corinthians", chapter: 1, verse: "9", reference: "1 Corinthians 1:9", text: "God is faithful, who has called you into fellowship with his Son, Jesus Christ our Lord.", themes: ["faithfulness", "fellowship", "calling", "Jesus"] },

  // ── GRATITUDE & WORSHIP ──
  { book: "Psalm", chapter: 107, verse: "1", reference: "Psalm 107:1", text: "Give thanks to the Lord, for he is good; his love endures forever.", themes: ["gratitude", "worship", "goodness", "love"] },
  { book: "Psalm", chapter: 100, verse: "4", reference: "Psalm 100:4", text: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.", themes: ["gratitude", "worship", "praise", "thanksgiving"] },
  { book: "Psalm", chapter: 95, verse: "1-2", reference: "Psalm 95:1-2", text: "Come, let us sing for joy to the Lord; let us shout aloud to the Rock of our salvation. Let us come before him with thanksgiving and extol him with music and song.", themes: ["worship", "joy", "gratitude", "music", "salvation"] },
  { book: "Hebrews", chapter: 13, verse: "15", reference: "Hebrews 13:15", text: "Through Jesus, therefore, let us continually offer to God a sacrifice of praise — the fruit of lips that openly profess his name.", themes: ["worship", "praise", "confession", "Jesus"] },

  // ── COMMUNITY & RELATIONSHIPS ──
  { book: "Ecclesiastes", chapter: 4, verse: "9-10", reference: "Ecclesiastes 4:9-10", text: "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up. But pity anyone who falls and has no one to help them up.", themes: ["community", "friendship", "support", "relationships"] },
  { book: "Hebrews", chapter: 10, verse: "24-25", reference: "Hebrews 10:24-25", text: "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another — and all the more as you see the Day approaching.", themes: ["community", "encouragement", "love", "fellowship"] },
  { book: "Proverbs", chapter: 27, verse: "17", reference: "Proverbs 27:17", text: "As iron sharpens iron, so one person sharpens another.", themes: ["community", "friendship", "growth", "accountability"] },
  { book: "Galatians", chapter: 6, verse: "2", reference: "Galatians 6:2", text: "Carry each other's burdens, and in this way you will fulfill the law of Christ.", themes: ["community", "burden", "love", "service"] },
  { book: "Romans", chapter: 12, verse: "10", reference: "Romans 12:10", text: "Be devoted to one another in love. Honor one another above yourselves.", themes: ["community", "love", "honor", "devotion"] },

  // ── OBEDIENCE & DISCIPLINE ──
  { book: "John", chapter: 14, verse: "15", reference: "John 14:15", text: "If you love me, keep my commands.", themes: ["obedience", "love", "commandments", "discipleship"] },
  { book: "Psalm", chapter: 1, verse: "1-2", reference: "Psalm 1:1-2", text: "Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers, but whose delight is in the law of the Lord, and who meditates on his law day and night.", themes: ["obedience", "blessing", "scripture", "meditation", "wisdom"] },
  { book: "Hebrews", chapter: 12, verse: "11", reference: "Hebrews 12:11", text: "No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it.", themes: ["discipline", "righteousness", "peace", "growth"] },
  { book: "James", chapter: 1, verse: "22", reference: "James 1:22", text: "Do not merely listen to the word, and so deceive yourselves. Do what it says.", themes: ["obedience", "scripture", "action", "integrity"] },

  // ── GENEROSITY & SERVICE ──
  { book: "Proverbs", chapter: 11, verse: "25", reference: "Proverbs 11:25", text: "A generous person will prosper; whoever refreshes others will be refreshed.", themes: ["generosity", "blessing", "service", "refreshment"] },
  { book: "Acts", chapter: 20, verse: "35", reference: "Acts 20:35", text: "In everything I did, I showed you that by this kind of hard work we must help the weak, remembering the words the Lord Jesus himself said: 'It is more blessed to give than to receive.'", themes: ["generosity", "service", "blessing", "giving"] },
  { book: "Matthew", chapter: 5, verse: "16", reference: "Matthew 5:16", text: "In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.", themes: ["service", "light", "good works", "witness", "glory"] },
  { book: "Mark", chapter: 10, verse: "45", reference: "Mark 10:45", text: "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.", themes: ["service", "sacrifice", "Jesus", "humility"] },

  // ── HEAVEN & ETERNITY ──
  { book: "John", chapter: 11, verse: "25-26", reference: "John 11:25-26", text: "Jesus said to her, 'I am the resurrection and the life. The one who believes in me will live, even though they die; and whoever lives by believing in me will never die. Do you believe this?'", themes: ["eternal life", "resurrection", "faith", "Jesus"] },
  { book: "Philippians", chapter: 3, verse: "20", reference: "Philippians 3:20", text: "But our citizenship is in heaven. And we eagerly await a Savior from there, the Lord Jesus Christ.", themes: ["heaven", "citizenship", "hope", "Jesus", "eternity"] },
  { book: "John", chapter: 14, verse: "2-3", reference: "John 14:2-3", text: "My Father's house has many rooms; if that were not so, would I have told you that I am going there to prepare a place for you? And if I go and prepare a place for you, I will come back and take you to be with me that you also may be where I am.", themes: ["heaven", "hope", "Jesus", "eternity", "promise"] },

  // ── WORD OF GOD ──
  { book: "2 Timothy", chapter: 3, verse: "16-17", reference: "2 Timothy 3:16-17", text: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.", themes: ["scripture", "teaching", "righteousness", "equipping"] },
  { book: "Hebrews", chapter: 4, verse: "12", reference: "Hebrews 4:12", text: "For the word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart.", themes: ["scripture", "word of God", "power", "heart"] },
  { book: "Isaiah", chapter: 55, verse: "11", reference: "Isaiah 55:11", text: "So is my word that goes out from my mouth: It will not return to me empty, but will accomplish what I desire and achieve the purpose for which I sent it.", themes: ["word of God", "purpose", "power", "faithfulness"] },
  { book: "Matthew", chapter: 24, verse: "35", reference: "Matthew 24:35", text: "Heaven and earth will pass away, but my words will never pass away.", themes: ["word of God", "eternity", "truth", "reliability"] },
  { book: "Joshua", chapter: 1, verse: "8", reference: "Joshua 1:8", text: "Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful.", themes: ["scripture", "meditation", "obedience", "prosperity", "success"] },
];

// All unique themes extracted from the verses
export const ALL_THEMES = Array.from(
  new Set(BIBLE_VERSES.flatMap((v) => v.themes))
).sort();

// Search function that filters verses by text, reference, book, or theme
export function searchVerses(query: string): BibleVerse[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return BIBLE_VERSES.filter(
    (v) =>
      v.text.toLowerCase().includes(q) ||
      v.reference.toLowerCase().includes(q) ||
      v.book.toLowerCase().includes(q) ||
      v.themes.some((t) => t.toLowerCase().includes(q))
  );
}

// Get verses by theme
export function getVersesByTheme(theme: string): BibleVerse[] {
  const t = theme.toLowerCase().trim();
  return BIBLE_VERSES.filter((v) => v.themes.some((vt) => vt.toLowerCase() === t));
}

// Get a random verse
export function getRandomVerse(): BibleVerse {
  return BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)];
}

// Get verse of the day based on date (deterministic rotation through all verses)
export function getVerseOfTheDay(): BibleVerse {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return BIBLE_VERSES[dayOfYear % BIBLE_VERSES.length];
}
