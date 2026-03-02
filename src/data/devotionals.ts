export interface DailyDevotional {
  day: number;
  verse: {
    reference: string;
    text: string;
  };
  title: string;
  reflection: string;
  prayerPrompt: string;
  discussionQuestions: [string, string, string];
}

export const DAILY_DEVOTIONALS: DailyDevotional[] = [
  {
    day: 1,
    verse: { reference: "Psalm 23:1-3", text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul." },
    title: "The Shepherd's Rest",
    reflection: "In a world that demands we keep moving, producing, and performing, God invites us to lie down. The shepherd does not drive the sheep to exhaustion. He leads them to still waters and green pastures. Rest is not laziness; it is trust. When we allow ourselves to be led beside quiet waters, we are declaring that the Shepherd knows what we need better than we do. Today, consider that your soul's deepest refreshment comes not from accomplishment, but from presence -- being present with the One who calls you by name.",
    prayerPrompt: "Good Shepherd, lead me today to the quiet places where my soul can be restored. Help me release the need to control my path and trust that You know the way. Where I feel driven, let me feel led instead.",
    discussionQuestions: [
      "What does 'lying down in green pastures' look like practically in your daily life?",
      "Where in your life do you feel driven rather than led? How might you surrender that area to God?",
      "How does viewing God as your shepherd change the way you approach today's challenges?"
    ],
  },
  {
    day: 2,
    verse: { reference: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
    title: "The Antidote to Anxiety",
    reflection: "Paul writes these words not from a comfortable study, but from a Roman prison cell. The man who tells us not to be anxious is himself in chains. This matters because it means his peace is not circumstantial -- it is supernatural. The antidote Paul prescribes has three ingredients: prayer (talking to God), petition (being specific about our needs), and thanksgiving (remembering what He has already done). When we combine these three, something extraordinary happens: a peace that makes no logical sense begins to guard our hearts like a sentinel at the gate.",
    prayerPrompt: "Father, I bring my anxieties to You now -- not because I have the faith to let go of them, but because You are faithful enough to receive them. Thank You for every answered prayer, every provision, every moment of grace. Guard my heart and mind today.",
    discussionQuestions: [
      "What is one specific anxiety you can transform into a prayer request right now?",
      "Why do you think Paul includes thanksgiving alongside prayer and petition?",
      "Have you ever experienced a peace that 'transcended all understanding'? What was that like?"
    ],
  },
  {
    day: 3,
    verse: { reference: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." },
    title: "Strength for the Journey",
    reflection: "There is a beautiful progression hidden in this verse. We might expect it to build from walking to running to soaring. But Isaiah reverses it: soar, run, walk. Why? Because the hardest part of the faith journey is not the mountaintop moments when we feel carried on eagle's wings. It is the daily, ordinary, one-foot-in-front-of-the-other walking. Most of our lives are spent walking, not soaring. And it is in the walking that we most need renewed strength. God promises to meet us there -- in the mundane, in the routine, in the unglamorous faithfulness of another Tuesday morning.",
    prayerPrompt: "Lord, renew my strength today. Not for the dramatic moments, but for the ordinary ones. Give me the grace to walk faithfully -- one step, one hour, one decision at a time. I hope in You.",
    discussionQuestions: [
      "Are you currently in a soaring, running, or walking season of life? How can you sense God's presence in it?",
      "What does it mean to 'hope in the Lord' during seasons of waiting?",
      "How does the reversal of soar-run-walk change your understanding of spiritual strength?"
    ],
  },
  {
    day: 4,
    verse: { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." },
    title: "Plans You Cannot See",
    reflection: "These words were spoken to an entire nation in exile. The Israelites were not on vacation in Babylon -- they were captives, homesick, confused, and questioning whether God had abandoned them. Into that darkness, God speaks a promise that spans decades. He does not promise immediate rescue. He promises a future. Sometimes the most radical act of faith is believing that God is working in seasons when we cannot see any evidence of it. The promise is not that we will understand His plans. The promise is that He has them -- and that they point toward hope.",
    prayerPrompt: "God, when I cannot trace Your hand, help me to trust Your heart. I confess that I often want to see the blueprint, but today I choose to believe that Your plans for me are good, even the ones I do not yet understand.",
    discussionQuestions: [
      "How does knowing this verse was written to exiles change how you receive its promise?",
      "What 'exile' season have you experienced where God's plans were not visible but proved faithful?",
      "How can you hold onto hope when your current circumstances feel far from God's promise?"
    ],
  },
  {
    day: 5,
    verse: { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
    title: "Beyond Understanding",
    reflection: "The human mind is a magnificent gift, but it makes a terrible god. Solomon's wisdom here is paradoxical: the wisest path forward is to stop relying on your own wisdom. 'Lean not on your own understanding' does not mean we abandon reason. It means we acknowledge that our understanding has borders, blind spots, and biases. God sees around corners we cannot. Trusting with all your heart means leaving no reservation held back, no backup plan kept secret, no area declared off-limits. It is total surrender to a totally trustworthy God.",
    prayerPrompt: "Lord, I want to trust You with ALL my heart, not just the parts that feel safe. Show me where I am still leaning on my own understanding, and give me the courage to release my grip. Make my paths straight.",
    discussionQuestions: [
      "What is one area of your life where you are tempted to lean on your own understanding rather than God's wisdom?",
      "What does it look like practically to 'submit to Him in all your ways'?",
      "How has God 'made your paths straight' in a past situation where you chose to trust Him?"
    ],
  },
  {
    day: 6,
    verse: { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
    title: "All Things",
    reflection: "This verse does not say all things are good. It says God works in all things for good. There is a vast difference. The loss, the heartbreak, the illness, the betrayal -- these are not good. But God is so sovereign and so creative that He weaves even the darkest threads into a tapestry of purpose. Notice also the present tense: God works. Not worked, past tense. Not will work, future tense. Right now, in this very moment, in the situation that feels most hopeless, God is actively working. The promise is not that we will always see the good. It is that the good is always being worked.",
    prayerPrompt: "Father, I believe that You are working in all things -- even the things that do not feel good. Give me eyes to see Your hand at work and faith to trust the process when I cannot. I love You, and I am called according to Your purpose.",
    discussionQuestions: [
      "What is the difference between saying 'all things are good' and 'God works all things for good'?",
      "Can you identify a past difficulty that God eventually used for good in your life?",
      "How does the present tense of 'God works' encourage you in your current situation?"
    ],
  },
  {
    day: 7,
    verse: { reference: "Psalm 139:14", text: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well." },
    title: "Wonderfully Made",
    reflection: "In a world that profits from our insecurity, David declares an ancient truth: you are not an accident, not a mistake, not a rough draft. You are fearfully and wonderfully made. The Hebrew word for 'wonderfully' carries the sense of being set apart, distinct, and remarkable. God did not mass-produce you. He knit you together with intention. Your personality, your laugh, your curiosity, your capacity for compassion -- all of it is by design. The final phrase is striking: 'I know that full well.' David is not just acknowledging a theological fact. He is declaring a personal conviction. To live well, we must move this truth from our heads to our hearts.",
    prayerPrompt: "Creator God, help me to see myself the way You see me -- not through the lens of comparison or criticism, but through the lens of Your love. Today I choose to believe that I am fearfully and wonderfully made.",
    discussionQuestions: [
      "What is one aspect of how God made you that you find difficult to celebrate?",
      "How does comparison steal the truth that you are 'fearfully and wonderfully made'?",
      "What would change in your daily life if you truly knew 'full well' that you are God's masterpiece?"
    ],
  },
  {
    day: 8,
    verse: { reference: "Matthew 11:28-30", text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light." },
    title: "The Invitation to Rest",
    reflection: "Jesus does not say 'come to me when you have it all together.' He says 'come to me when you are weary and burdened.' The invitation is for the exhausted, the overwhelmed, the ones carrying too much. And He does not just offer rest from labor. He offers rest for the soul -- that deep, inner stillness that remains even when life is busy. Notice also that He invites us to take His yoke. A yoke is not freedom from work. It is a partnership. We are not meant to carry the weight alone. When we are yoked to Jesus, the load becomes bearable because we are no longer pulling by ourselves.",
    prayerPrompt: "Jesus, I come to You weary. I come carrying burdens I was never meant to carry alone. Today, I exchange my heavy yoke for Yours. Teach me gentleness. Teach me humility. Give rest to my soul.",
    discussionQuestions: [
      "What burden are you carrying right now that you need to bring to Jesus?",
      "What does it mean to you that Jesus describes Himself as 'gentle and humble in heart'?",
      "How is being yoked to Christ different from carrying your burdens alone?"
    ],
  },
  {
    day: 9,
    verse: { reference: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!" },
    title: "Made New",
    reflection: "Christianity is not a self-improvement plan. It is a new creation event. Paul does not say we are renovated or upgraded. He says we are made entirely new. The old -- old patterns, old shame, old identities -- has gone. Past tense. Done. The new has come. Present tense. Here. Now. This is not about trying harder to be better. It is about receiving the radical reality that in Christ, you are already a different person. Your past does not define you. Your failures do not name you. Your worst moment is not your truest moment. In Christ, you are new. Live from that truth today.",
    prayerPrompt: "Lord, thank You that in You, I am a new creation. Help me to live from that reality instead of the old narratives. Where the enemy reminds me of my past, remind me of my future in You.",
    discussionQuestions: [
      "What 'old things' do you struggle to let go of, even though Christ has made you new?",
      "How does the idea of being a 'new creation' differ from self-improvement?",
      "What would it look like to live as though the old has truly gone and the new has truly come?"
    ],
  },
  {
    day: 10,
    verse: { reference: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." },
    title: "Courage for What Comes Next",
    reflection: "God speaks these words to Joshua at a terrifying transition. Moses is dead. The wilderness years are over. An entire nation is looking to Joshua to lead them into unknown territory. And God's response is not a detailed battle plan. It is a promise of presence. Be strong and courageous -- not because you are capable, but because I am with you. Fear and discouragement are not indicators that we are in the wrong place. They are often indicators that we are exactly where God is calling us to grow. Courage is not the absence of fear. It is the decision to move forward because God goes with you.",
    prayerPrompt: "God, I face unknowns today. I do not know what is coming, but I know You are with me. Replace my fear with courage and my discouragement with faith. Lead me forward.",
    discussionQuestions: [
      "What 'new territory' is God calling you into that requires courage?",
      "How does knowing God is with you change the way you approach fear?",
      "What is the difference between being fearless and being courageous?"
    ],
  },
  {
    day: 11,
    verse: { reference: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law." },
    title: "The Fruit of Surrender",
    reflection: "Notice that Paul calls these the fruit of the Spirit, not the fruit of effort. A tree does not strain to produce fruit. It simply abides in its nature, draws from its roots, and fruit appears naturally. The same is true in our spiritual lives. Love, joy, peace, and the rest are not achievements we earn through discipline alone. They are the natural overflow of a life connected to God. When we struggle to produce these qualities on our own, it is often a sign that we are striving rather than abiding. The question is not 'how do I become more patient?' but 'how do I stay more connected to the Source?'",
    prayerPrompt: "Holy Spirit, I cannot produce Your fruit through my own effort. Today, I choose to abide rather than strive. Flow through me. Let love, joy, peace, and gentleness be the evidence of Your work in my life.",
    discussionQuestions: [
      "Which fruit of the Spirit feels most natural to you? Which one is most challenging?",
      "How does the difference between 'striving' and 'abiding' change your approach to spiritual growth?",
      "What does it mean practically to stay connected to the Source throughout your day?"
    ],
  },
  {
    day: 12,
    verse: { reference: "Lamentations 3:22-23", text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness." },
    title: "Mercies New This Morning",
    reflection: "Lamentations is a book of grief. The city lies in ruins. Hope seems foolish. And yet, from the rubble, Jeremiah finds one truth that cannot be destroyed: God's compassions never fail. They are new every morning. Not recycled, not leftover, not grudging -- new. Fresh. Abundant. Whatever happened yesterday does not deplete today's supply of mercy. Whatever you did last night does not exhaust this morning's grace. Every sunrise is God's declaration that He is starting fresh with you. You do not have to earn a new beginning. It is already given.",
    prayerPrompt: "Lord, thank You for mercies that are new this morning. I receive them with gratitude. Where I have failed, Your compassion does not. Help me extend the same fresh grace to myself and to others today.",
    discussionQuestions: [
      "Why is it significant that God's mercies are described as 'new every morning'?",
      "How does this verse speak to someone carrying guilt from yesterday's failures?",
      "In what area of your life do you most need to experience God's fresh compassion today?"
    ],
  },
  {
    day: 13,
    verse: { reference: "Ephesians 2:10", text: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do." },
    title: "Created on Purpose, for a Purpose",
    reflection: "The Greek word for 'handiwork' is poiema -- the root of our English word 'poem.' You are God's poem. Not a rough draft. Not an outline. A finished work of art. And this masterpiece was not created to sit in a gallery. You were created for good works that God prepared before you were born. Think about that: before you took your first breath, God was already arranging opportunities for your gifts, your personality, your story to make a difference. Your purpose is not something you need to invent. It is something you need to discover. And God has been planting clues your entire life.",
    prayerPrompt: "Father, I am Your handiwork -- Your poem. Open my eyes today to the good works You have already prepared for me. Help me walk into my purpose with confidence, knowing that You designed me for this.",
    discussionQuestions: [
      "What does it mean to you that the word for 'handiwork' literally means 'poem'?",
      "What good works do you feel God may have prepared in advance for your life?",
      "How does knowing your purpose is pre-prepared change the pressure you feel to 'figure out your life'?"
    ],
  },
  {
    day: 14,
    verse: { reference: "Psalm 46:1-3", text: "God is our refuge and strength, an ever-present help in trouble. Therefore we will not fear, though the earth give way and the mountains fall into the heart of the sea, though its waters roar and foam and the mountains quake with their surging." },
    title: "When the Ground Shakes",
    reflection: "The psalmist paints a picture of total catastrophe: earth crumbling, mountains falling, oceans raging. And yet the response is not fear. It is trust. Not because the danger is not real, but because the refuge is. The phrase 'ever-present help' is profound. Not sometimes-present. Not there-if-you-earn-it. Ever-present. In the earthquake of a diagnosis. In the flood of a failed relationship. In the trembling of uncertain finances. God does not offer help from a distance. He is the help, present in the midst of the trouble itself.",
    prayerPrompt: "God, You are my refuge when the ground beneath me shakes. I choose not to fear, not because the trouble is not real, but because You are more real. Be my ever-present help today.",
    discussionQuestions: [
      "What 'earthquake' in your life is currently testing your trust in God?",
      "How does the phrase 'ever-present help' differ from help that comes only when we ask for it?",
      "What does it look like to make God your refuge instead of your own plans or strength?"
    ],
  },
  {
    day: 15,
    verse: { reference: "John 15:5", text: "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing." },
    title: "Abiding, Not Striving",
    reflection: "Jesus uses an image His listeners would have understood immediately: the vineyard. A branch does not bear fruit through effort. It bears fruit through connection. Cut off from the vine, even the strongest branch withers. This is an invitation to dependency. In a culture that celebrates self-sufficiency, Jesus says the opposite: apart from me you can do nothing. This is not a threat. It is a relief. The pressure to produce is off. Your job is not to manufacture fruit. Your job is to stay connected. Remain. Abide. Draw life from the Vine. And the fruit will come naturally.",
    prayerPrompt: "Jesus, You are the vine. I am a branch. Today I choose to abide in You rather than strive in my own strength. Teach me what it means to remain, to rest, and to let You produce fruit through my life.",
    discussionQuestions: [
      "What does abiding in Christ look like in your daily routine?",
      "How does our culture make it hard to embrace the idea that apart from Christ we can do nothing?",
      "What fruit has appeared in your life during seasons when you were most connected to God?"
    ],
  },
  {
    day: 16,
    verse: { reference: "1 Peter 5:7", text: "Cast all your anxiety on him because he cares for you." },
    title: "The Weight You Were Never Meant to Carry",
    reflection: "The word 'cast' in Greek is a forceful word. It means to throw, to hurl, to fling with intention. Peter is not suggesting we gently place our worries at God's feet. He is urging us to throw them with all our might. Why? Because anxiety was never meant to be carried. It is a weight that bends our backs, clouds our vision, and steals our breath. And God is not annoyed by the weight we bring Him. The reason we can cast our burdens is stunningly simple: He cares for you. Not 'He cares about the situation.' He cares for you. Personally. Tenderly. Deeply.",
    prayerPrompt: "Lord, I cast my anxieties on You today. I do not gently set them down -- I throw them, because they are crushing me and You are strong enough to carry them. Thank You for caring for me.",
    discussionQuestions: [
      "What anxieties are you carrying today that God is inviting you to cast on Him?",
      "Why do you think Peter uses the forceful word 'cast' instead of a gentler term?",
      "How does knowing that God 'cares for you' personally change the way you bring your worries to Him?"
    ],
  },
  {
    day: 17,
    verse: { reference: "Micah 6:8", text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God." },
    title: "What God Really Wants",
    reflection: "In a world of complicated theology and competing religious demands, Micah distills God's requirements into three simple, breathtaking phrases. Act justly -- fight for what is right, even when it costs you. Love mercy -- do not just practice forgiveness; fall in love with it. Walk humbly -- stay close to God with an honest awareness of who you are and who He is. This is not a checklist. It is a portrait of a life that looks like God. Justice without mercy becomes harsh. Mercy without justice enables wrong. And both without humility become performance. Together, they form the rhythm of a life that honors God.",
    prayerPrompt: "Lord, simplify my faith today. Help me act justly in my decisions, love mercy in my relationships, and walk humbly in Your presence. Let my life reflect what You truly desire.",
    discussionQuestions: [
      "Which of the three -- justice, mercy, or humility -- is most natural for you? Which is most challenging?",
      "How does acting justly look in your everyday decisions and relationships?",
      "What does it mean to 'love' mercy rather than just practice it?"
    ],
  },
  {
    day: 18,
    verse: { reference: "Romans 12:2", text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is -- his good, pleasing and perfect will." },
    title: "Renewing the Mind",
    reflection: "Paul presents two options: conform or transform. To conform is to let the world press you into its mold. To transform is to let God reshape you from the inside out. And the battleground is the mind. What we think about shapes who we become. The word 'renewing' implies an ongoing process, not a one-time event. Every day we are being shaped -- by the media we consume, the conversations we have, the thoughts we dwell on. Transformation happens when we intentionally fill our minds with truth. And the result is remarkable: clarity about God's will. Not confusion. Not anxiety about the future. Clarity.",
    prayerPrompt: "God, renew my mind today. Where the world has pressed me into its mold, reshape me by Your truth. Replace the lies I have believed with what You say is real. Give me clarity about Your good, pleasing, and perfect will.",
    discussionQuestions: [
      "What 'patterns of this world' most tempt you to conform?",
      "What practical steps can you take to actively renew your mind on a daily basis?",
      "How has a renewed mind helped you understand God's will in a past situation?"
    ],
  },
  {
    day: 19,
    verse: { reference: "Psalm 34:18", text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit." },
    title: "Close in the Breaking",
    reflection: "There is a tender mystery in this verse. God does not come closest in our strength. He comes closest in our breaking. When the heart shatters -- through loss, rejection, failure, or grief -- God draws near. Not to lecture. Not to fix. To be close. The brokenhearted are not at a disadvantage in the kingdom of God. They are in a privileged position of intimacy. If you are crushed in spirit today, you are not far from God. You are exactly where He is. Brokenness is not the end of the story. It is the place where God begins His most tender work.",
    prayerPrompt: "Lord, I come to You brokenhearted. I do not need answers today. I need Your nearness. Draw close to me in this pain. Save my crushed spirit with Your gentle presence.",
    discussionQuestions: [
      "Why do you think God draws closest to the brokenhearted rather than the strong?",
      "How have you experienced God's nearness during a season of pain or loss?",
      "What does it change about your view of suffering to know that brokenness invites God's closeness?"
    ],
  },
  {
    day: 20,
    verse: { reference: "Hebrews 12:1-2", text: "Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us, fixing our eyes on Jesus, the pioneer and perfecter of faith." },
    title: "Running Your Race",
    reflection: "The Christian life is compared to a race -- but not a sprint. It is a marathon that requires perseverance. We are surrounded by a cloud of witnesses: generations of believers who ran before us, who stumbled and got back up, who finished well. Their presence is not a source of pressure but of encouragement. The key to running well is twofold: throw off what hinders, and fix your eyes on Jesus. Not on the other runners. Not on the scoreboard. Not on the finish line. On Jesus. He is both the one who started our faith and the one who will complete it.",
    prayerPrompt: "Jesus, You are the pioneer and perfecter of my faith. Help me throw off everything that hinders my run. Fix my eyes on You, not on my circumstances, my failures, or other people. I want to finish this race well.",
    discussionQuestions: [
      "What is currently hindering your race -- what do you need to throw off?",
      "What does it mean to fix your eyes on Jesus in practical, daily terms?",
      "How does the image of a cloud of witnesses encourage you in your faith journey?"
    ],
  },
  {
    day: 21,
    verse: { reference: "Isaiah 43:18-19", text: "Forget the former things; do not dwell on the past. See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the desert." },
    title: "The God of New Things",
    reflection: "God tells His people to forget the former things. This is radical because the former things include the Exodus -- their greatest miracle. Yet God says: stop living in the memory of what I did. Pay attention to what I am doing now. God is not a God of reruns. He does not repeat Himself. He does new things. And often those new things emerge in the most unlikely places: a way in the wilderness, streams in the desert. If your life feels like a wilderness, it may be the exact place God is about to do something unprecedented. The question is not 'where is God?' but 'do you perceive it?'",
    prayerPrompt: "God of new things, open my eyes to what You are doing right now. Where I see wilderness, show me the way You are making. Where I feel desert, reveal the streams You are creating. I choose to look forward, not backward.",
    discussionQuestions: [
      "What past experience do you keep dwelling on that God might be inviting you to release?",
      "Where in your life might God be doing a 'new thing' that you have not yet perceived?",
      "How does the image of streams in the desert encourage you about an area that feels dry right now?"
    ],
  },
  {
    day: 22,
    verse: { reference: "Colossians 3:23-24", text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters, since you know that you will receive an inheritance from the Lord as a reward. It is the Lord Christ you are serving." },
    title: "Sacred Work",
    reflection: "Paul writes this to slaves -- people doing the most menial, invisible work imaginable. And he tells them their work matters to God. This transforms everything. Your commute is sacred. Your spreadsheet is ministry. Your laundry is worship. When we work 'as for the Lord,' no task is beneath us and no effort is wasted. The approval of human masters is fickle, but the inheritance from the Lord is eternal. Today, whatever you do, remember who your true audience is. The coworker may not notice your faithfulness. The Lord does.",
    prayerPrompt: "Lord, transform my perspective on work today. Whether my tasks feel important or invisible, help me do them wholeheartedly as an offering to You. You are my true employer, my true audience, my true reward.",
    discussionQuestions: [
      "How would your attitude toward your daily work change if you truly believed you were working for God?",
      "What mundane task in your life could become sacred if you offered it to the Lord?",
      "How does knowing your reward comes from God free you from needing human approval?"
    ],
  },
  {
    day: 23,
    verse: { reference: "Psalm 91:1-2", text: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge and my fortress, my God, in whom I trust.'" },
    title: "Sheltered",
    reflection: "Dwelling implies permanence. This is not a visit to God's shelter. It is a lifestyle of remaining under His protection. The psalmist stacks four images: shelter, shadow, refuge, fortress. Each one adds a dimension of safety. Shelter from the storm. Shadow from the heat. Refuge from the enemy. Fortress from the siege. No matter what form danger takes, God has a corresponding form of protection. But notice the shift from third person to first person: 'Whoever dwells...' becomes 'I will say of the Lord.' Theology becomes testimony. Head knowledge becomes heart declaration. Today, make God's protection personal.",
    prayerPrompt: "Lord, I declare today that You are my refuge and my fortress. I choose to dwell in Your shelter, not to visit occasionally but to make Your presence my permanent address. I trust in You.",
    discussionQuestions: [
      "What is the difference between visiting God's shelter occasionally and dwelling in it?",
      "Which of the four images -- shelter, shadow, refuge, fortress -- resonates most with what you need today?",
      "How can you move from knowing about God's protection to declaring it personally?"
    ],
  },
  {
    day: 24,
    verse: { reference: "James 1:2-4", text: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything." },
    title: "The Gift Inside the Trial",
    reflection: "James does not say 'consider it pure joy when trials go away.' He says consider it joy when you face them. This is not masochism. It is a radical reframe. Trials are not punishments. They are workshops where faith is forged into something stronger. The testing of faith produces perseverance. Perseverance produces maturity. And maturity leads to completeness -- lacking nothing. There is a gift hidden inside every trial: the person you become on the other side. The goal is not to enjoy suffering. It is to trust the process. God wastes nothing.",
    prayerPrompt: "Lord, I do not enjoy this trial, but I trust Your purpose in it. Produce perseverance in me. Let this testing finish its work so I can become mature and complete. I believe You waste nothing.",
    discussionQuestions: [
      "How does reframing trials as opportunities for growth change the way you experience them?",
      "What trial in your past produced perseverance or maturity that you are grateful for now?",
      "What does it mean to let perseverance 'finish its work' rather than rushing through the process?"
    ],
  },
  {
    day: 25,
    verse: { reference: "2 Corinthians 12:9", text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me." },
    title: "Power in Weakness",
    reflection: "Paul asked God three times to remove his thorn in the flesh. God said no. But He did not leave Paul without an answer. He gave something better than removal: 'My grace is sufficient for you.' God's power does not bypass weakness. It is perfected in it. This is the upside-down economy of the kingdom. When we are strong, we rely on ourselves. When we are weak, we rely on God. And God's power, channeled through our weakness, accomplishes more than our strength ever could. Your weakness is not a liability. It is an invitation for God's power to rest on you.",
    prayerPrompt: "God, I have been asking You to remove my weakness. Today, I ask instead for Your grace to be sufficient in it. Make Your power perfect in the places where I am most fragile. I boast in my weakness so that Your power may rest on me.",
    discussionQuestions: [
      "What 'thorn' have you asked God to remove that He may instead want to use?",
      "How does the idea that God's power is perfected in weakness challenge your understanding of strength?",
      "What would it look like to 'boast in your weakness' rather than hide it?"
    ],
  },
  {
    day: 26,
    verse: { reference: "Ephesians 3:20", text: "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us." },
    title: "Beyond Imagination",
    reflection: "Consider the most extraordinary thing you could ask God for. Now multiply it by infinity. That is still less than what God is able to do. Paul says God is able to do 'immeasurably more' than all we ask or imagine. Our biggest dreams are too small for God. Our boldest prayers are conservative estimates. The limiting factor is never God's power. It is our willingness to believe. And notice where this power is at work: within us. Not 'out there somewhere.' Within. The same power that raised Christ from the dead is at work inside you right now. What would you attempt if you truly believed that?",
    prayerPrompt: "God, expand my imagination. I have been dreaming too small and praying too cautiously. You are able to do immeasurably more. Awaken me to the power already at work within me and give me the faith to trust it.",
    discussionQuestions: [
      "What bold request have you been afraid to bring to God? What if He wants to exceed even that?",
      "How does knowing God's power is at work WITHIN you change the way you approach your day?",
      "What would you attempt for God if you truly believed nothing was impossible?"
    ],
  },
  {
    day: 27,
    verse: { reference: "Ecclesiastes 3:1,11", text: "There is a time for everything, and a season for every activity under the heavens... He has made everything beautiful in its time." },
    title: "Beautiful in Its Time",
    reflection: "Solomon observes that life moves in seasons. There is a time to plant and a time to harvest. A time to weep and a time to laugh. We cannot rush seasons any more than we can rush spring. The verse that brings it all together is stunning: He has made everything beautiful in its time. Not immediately. Not on our schedule. In its time. The season you are in right now -- whether it feels like planting or harvesting, weeping or laughing -- is part of God's timing. And in retrospect, you will see that even the hard seasons had a beauty that could not be rushed.",
    prayerPrompt: "Lord, I trust Your timing. Where I want to rush, teach me to wait. Where I want to wait, give me courage to act. Make everything beautiful in its time, and give me the patience to let the season unfold.",
    discussionQuestions: [
      "What season are you currently in? How do you feel about God's timing in this season?",
      "Can you look back at a difficult season that eventually revealed beauty in God's timing?",
      "How does trusting God's timing free you from the pressure to control outcomes?"
    ],
  },
  {
    day: 28,
    verse: { reference: "Psalm 103:1-5", text: "Praise the Lord, my soul; all my inmost being, praise his holy name. Praise the Lord, my soul, and forget not all his benefits -- who forgives all your sins and heals all your diseases, who redeems your life from the pit and crowns you with love and compassion, who satisfies your desires with good things so that your youth is renewed like the eagle's." },
    title: "Do Not Forget",
    reflection: "David commands his own soul to praise. This tells us something important: worship is not always spontaneous. Sometimes we must remind ourselves of the truth. And the truth is a long list of benefits: forgiveness, healing, redemption, love, compassion, satisfaction, renewal. When life feels hard, we tend to forget what God has done. David fights amnesia with a deliberate act of remembrance. Today, before you focus on what you lack, count what you have been given. The God who forgives all, heals all, and redeems all is the same God who is with you right now.",
    prayerPrompt: "Lord, I command my soul to praise You. I will not forget Your benefits. You have forgiven me, healed me, redeemed me, crowned me with love, and satisfied me with good things. I praise Your holy name.",
    discussionQuestions: [
      "Which of the benefits David lists do you most need to remember today?",
      "Why is it important to actively remind ourselves of what God has done rather than wait to feel grateful?",
      "How does praising God in difficult seasons change your perspective on your circumstances?"
    ],
  },
  {
    day: 29,
    verse: { reference: "Matthew 5:14-16", text: "You are the light of the world. A town built on a hill cannot be hidden. Neither do people light a lamp and put it under a bowl. Instead they put it on its stand, and it gives light to everyone in the house. In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven." },
    title: "Let Your Light Shine",
    reflection: "Jesus does not say 'try to be a light.' He says 'you are the light.' It is not an aspiration. It is an identity. And light has one purpose: to be seen. Not for our own glory, but so that others see our good deeds and glorify God. You are not meant to hide. You are not meant to dim yourself for the comfort of others. Your kindness, your integrity, your compassion, your joy -- these are the light Jesus is talking about. Every act of love is a beam of light in someone's darkness. Today, do not hide your lamp under the bowl of insecurity, fear, or false humility. Shine.",
    prayerPrompt: "Jesus, You call me the light of the world. Give me the courage to shine, not for my own recognition, but so others can see You through me. Remove the bowls of fear and doubt that hide my light.",
    discussionQuestions: [
      "What 'bowl' tends to hide your light -- fear, insecurity, busyness, or something else?",
      "How can you let your light shine in a practical way today without seeking personal attention?",
      "What does it mean that your good deeds should cause others to glorify God rather than you?"
    ],
  },
  {
    day: 30,
    verse: { reference: "Revelation 21:5", text: "He who was seated on the throne said, 'I am making all things new.' Then he said, 'Write this down, for these words are trustworthy and true.'" },
    title: "All Things New",
    reflection: "The final book of the Bible ends not with destruction but with renewal. God does not say 'I am making all new things.' He says 'I am making all things new.' The difference matters. God does not discard and replace. He redeems and renews. Your broken story, your failed attempts, your deepest wounds -- God is not throwing them away. He is making them new. And notice the present tense: 'I am making.' It is happening now. Not just in some distant future. Right now, in this very moment, God is at work making all things new. These words are trustworthy and true. You can rest your entire weight on them.",
    prayerPrompt: "God, You are making all things new -- including me. Thank You that You do not discard what is broken but renew it. I trust these words because they are trustworthy and true. Finish Your work in me.",
    discussionQuestions: [
      "What is the difference between God making 'all new things' versus making 'all things new'?",
      "What broken area of your life do you long for God to make new?",
      "As you finish these 30 days of devotionals, what is one truth that has transformed your perspective?"
    ],
  },
];

export function getDailyDevotional(): DailyDevotional {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % DAILY_DEVOTIONALS.length;
  return DAILY_DEVOTIONALS[index];
}
