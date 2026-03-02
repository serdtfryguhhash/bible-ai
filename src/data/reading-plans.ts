export interface ReadingPlanDay {
  day: number;
  title: string;
  passages: string[];
  description: string;
}

export interface ReadingPlanData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  totalDays: number;
  estimatedMinutes: number;
  category: string;
  color: string;
  icon: "book" | "scroll" | "bible";
  days: ReadingPlanDay[];
}

export const READING_PLANS_DATA: ReadingPlanData[] = [
  {
    id: "psalms-30",
    title: "30 Days of Psalms",
    subtitle: "The Prayer Book of the Bible",
    description: "Journey through the Psalms over 30 days. From praise to lament, discover the full range of prayer and worship in the Bible's most beloved poetry.",
    totalDays: 30,
    estimatedMinutes: 10,
    category: "Wisdom & Poetry",
    color: "emerald",
    icon: "scroll",
    days: [
      { day: 1, title: "The Two Paths", passages: ["Psalm 1", "Psalm 2"], description: "The gateway to the Psalter: two paths, two destinies, and the coronation of God's chosen King." },
      { day: 2, title: "Morning & Evening Prayer", passages: ["Psalm 3", "Psalm 4"], description: "David's prayers for morning protection and evening rest, written during his flight from Absalom." },
      { day: 3, title: "God's Majestic Name", passages: ["Psalm 8", "Psalm 19"], description: "Two psalms that celebrate God's glory revealed in creation and in His Word." },
      { day: 4, title: "The Good Shepherd", passages: ["Psalm 23"], description: "The most beloved psalm in Scripture, painting God as the tender Shepherd who guides through every valley." },
      { day: 5, title: "Seeking God's Face", passages: ["Psalm 24", "Psalm 27"], description: "Who may ascend to God's presence? The one who seeks Him with a pure heart." },
      { day: 6, title: "Confession & Forgiveness", passages: ["Psalm 32", "Psalm 51"], description: "David's greatest prayers of repentance, revealing how God restores the contrite heart." },
      { day: 7, title: "Trust in Trouble", passages: ["Psalm 34", "Psalm 37"], description: "Finding security in God when life feels unfair and the wicked seem to prosper." },
      { day: 8, title: "Thirst for God", passages: ["Psalm 42", "Psalm 43"], description: "Twin psalms of spiritual longing, the soul crying out for God like a deer pants for water." },
      { day: 9, title: "God Our Refuge", passages: ["Psalm 46", "Psalm 91"], description: "When the earth gives way, when danger surrounds, God remains our shelter and fortress." },
      { day: 10, title: "A Clean Heart", passages: ["Psalm 51"], description: "David's deep prayer after his sin, asking God to create a clean heart and renew a right spirit." },
      { day: 11, title: "The Heavens Declare", passages: ["Psalm 19", "Psalm 29"], description: "God speaks through creation and through storms; His voice is powerful and majestic." },
      { day: 12, title: "Waiting on God", passages: ["Psalm 62", "Psalm 130"], description: "Learning to be still and wait, trusting that God's timing and redemption are sure." },
      { day: 13, title: "God's Faithful Love", passages: ["Psalm 103"], description: "A celebration of God's forgiveness, healing, compassion, and steadfast love." },
      { day: 14, title: "Songs of Ascent I", passages: ["Psalm 120", "Psalm 121", "Psalm 122"], description: "Pilgrimage songs sung on the way to Jerusalem; finding help, peace, and joy in worship." },
      { day: 15, title: "Songs of Ascent II", passages: ["Psalm 123", "Psalm 124", "Psalm 125", "Psalm 126"], description: "More pilgrimage psalms celebrating God's protection, deliverance, and restoration." },
      { day: 16, title: "Songs of Ascent III", passages: ["Psalm 127", "Psalm 128", "Psalm 129", "Psalm 130", "Psalm 131"], description: "Finding meaning in family, work, and humble trust in the Lord." },
      { day: 17, title: "Songs of Ascent IV", passages: ["Psalm 132", "Psalm 133", "Psalm 134"], description: "The beauty of unity, the joy of worship, and God's chosen dwelling place." },
      { day: 18, title: "Fearfully Made", passages: ["Psalm 139"], description: "God's intimate knowledge of every detail of your life, from womb to eternity." },
      { day: 19, title: "The Lord Reigns", passages: ["Psalm 93", "Psalm 95", "Psalm 96"], description: "Psalms celebrating God's eternal kingship over all creation and all nations." },
      { day: 20, title: "Give Thanks", passages: ["Psalm 100", "Psalm 107"], description: "Enter His gates with thanksgiving. Give thanks for His steadfast love endures forever." },
      { day: 21, title: "The Word of God", passages: ["Psalm 119:1-48"], description: "The longest psalm, a love letter to God's Word (first six stanzas: Aleph through Vav)." },
      { day: 22, title: "Delight in the Word", passages: ["Psalm 119:49-96"], description: "Continuing the meditation on God's Word (stanzas Zayin through Lamedh)." },
      { day: 23, title: "Lamp for My Feet", passages: ["Psalm 119:97-144"], description: "God's Word as guidance and light (stanzas Mem through Samekh, Ayin, Pe)." },
      { day: 24, title: "Your Word is Truth", passages: ["Psalm 119:145-176"], description: "Concluding the great psalm with cries for deliverance and declarations of love (Qoph through Tav)." },
      { day: 25, title: "Praise the Lord", passages: ["Psalm 145", "Psalm 146"], description: "David's final praise psalm and the beginning of the Hallelujah psalms." },
      { day: 26, title: "Songs of Praise", passages: ["Psalm 147", "Psalm 148"], description: "Calling all creation to praise the Lord who heals, builds, and sustains." },
      { day: 27, title: "The Final Hallelujah", passages: ["Psalm 149", "Psalm 150"], description: "The Psalter ends with an explosion of praise: let everything that has breath praise the Lord!" },
      { day: 28, title: "Prayers of Lament", passages: ["Psalm 13", "Psalm 22", "Psalm 88"], description: "Honest prayers from the depths of suffering and the feeling of divine absence." },
      { day: 29, title: "Royal Psalms", passages: ["Psalm 2", "Psalm 45", "Psalm 110"], description: "Messianic psalms that point forward to the coming King and eternal High Priest." },
      { day: 30, title: "History of Grace", passages: ["Psalm 78", "Psalm 136"], description: "Looking back at God's faithfulness through all of Israel's history: His love endures forever." },
    ],
  },
  {
    id: "nt-90",
    title: "New Testament in 90 Days",
    subtitle: "Walk with Jesus & the Early Church",
    description: "Read through the entire New Testament in 90 days. From the birth of Jesus to the vision of Revelation, experience the story that changed the world.",
    totalDays: 90,
    estimatedMinutes: 15,
    category: "New Testament",
    color: "blue",
    icon: "book",
    days: [
      { day: 1, title: "The Genealogy of Jesus", passages: ["Matthew 1-2"], description: "Matthew opens with the royal lineage of Jesus and His miraculous birth." },
      { day: 2, title: "The Baptism & Temptation", passages: ["Matthew 3-4"], description: "John the Baptist prepares the way, and Jesus is tested in the wilderness." },
      { day: 3, title: "Sermon on the Mount I", passages: ["Matthew 5-6"], description: "The Beatitudes, salt and light, and Jesus's teaching on prayer and trust." },
      { day: 4, title: "Sermon on the Mount II", passages: ["Matthew 7-8"], description: "Building on rock, the narrow gate, and Jesus's authority demonstrated in miracles." },
      { day: 5, title: "Authority & Calling", passages: ["Matthew 9-10"], description: "Jesus heals, calls Matthew, and sends out the twelve disciples." },
      { day: 6, title: "Parables of the Kingdom", passages: ["Matthew 11-13"], description: "John's question, rest for the weary, and parables about the kingdom of heaven." },
      { day: 7, title: "Miracles & Faith", passages: ["Matthew 14-16"], description: "Feeding five thousand, walking on water, and Peter's confession of Christ." },
      { day: 8, title: "The Transfiguration", passages: ["Matthew 17-18"], description: "Jesus is transfigured on the mountain, and teaches about humility and forgiveness." },
      { day: 9, title: "Teachings on the Way", passages: ["Matthew 19-20"], description: "Marriage, riches, the laborers in the vineyard, and the path to Jerusalem." },
      { day: 10, title: "Triumphal Entry", passages: ["Matthew 21-22"], description: "Jesus enters Jerusalem, cleanses the temple, and faces religious challenges." },
      { day: 11, title: "Warnings & Prophecy", passages: ["Matthew 23-25"], description: "Woes to the Pharisees, the Olivet discourse, and parables of readiness." },
      { day: 12, title: "The Passion", passages: ["Matthew 26-28"], description: "The Last Supper, Gethsemane, the cross, and the glorious resurrection." },
      { day: 13, title: "The Beginning of the Gospel", passages: ["Mark 1-3"], description: "Mark's fast-paced account opens with Jesus's baptism, healing, and calling disciples." },
      { day: 14, title: "Parables & Power", passages: ["Mark 4-6"], description: "The parable of the sower, calming the storm, and sending out the twelve." },
      { day: 15, title: "Who Is This Man?", passages: ["Mark 7-9"], description: "Traditions challenged, the Gentile woman's faith, Peter's confession, and the Transfiguration." },
      { day: 16, title: "The Road to the Cross", passages: ["Mark 10-13"], description: "The rich young ruler, Bartimaeus healed, the triumphal entry, and the Olivet discourse." },
      { day: 17, title: "Cross & Resurrection", passages: ["Mark 14-16"], description: "Anointing, betrayal, trial, crucifixion, and the empty tomb." },
      { day: 18, title: "The Nativity Story", passages: ["Luke 1-2"], description: "The announcements to Zechariah and Mary, and the birth of Jesus in Bethlehem." },
      { day: 19, title: "Jesus's Ministry Begins", passages: ["Luke 3-5"], description: "Baptism, temptation, rejection at Nazareth, and calling the first disciples." },
      { day: 20, title: "Sermon on the Plain", passages: ["Luke 6-7"], description: "Blessings and woes, loving enemies, and the faith of a centurion." },
      { day: 21, title: "Parables of Jesus", passages: ["Luke 8-9"], description: "The sower, calming the storm, feeding five thousand, and the Transfiguration." },
      { day: 22, title: "The Good Samaritan", passages: ["Luke 10-11"], description: "The seventy-two sent out, the Good Samaritan, Mary and Martha, and teaching on prayer." },
      { day: 23, title: "Warnings & Grace", passages: ["Luke 12-14"], description: "Do not worry, the narrow door, lament over Jerusalem, and the cost of discipleship." },
      { day: 24, title: "Lost & Found", passages: ["Luke 15-17"], description: "The lost sheep, the lost coin, the prodigal son, and teaching on faith." },
      { day: 25, title: "Prayer & Humility", passages: ["Luke 18-19"], description: "The persistent widow, the Pharisee and tax collector, Zacchaeus, and the triumphal entry." },
      { day: 26, title: "The Passion of Luke", passages: ["Luke 20-22"], description: "Temple controversies, the Last Supper, and the agony in the garden." },
      { day: 27, title: "Cross to Emmaus", passages: ["Luke 23-24"], description: "The crucifixion, the road to Emmaus, and the ascension of Jesus." },
      { day: 28, title: "The Word Made Flesh", passages: ["John 1-3"], description: "The prologue, calling of disciples, water to wine, and Nicodemus." },
      { day: 29, title: "Living Water", passages: ["John 4-6"], description: "The woman at the well, healing at the pool, feeding five thousand, and the bread of life." },
      { day: 30, title: "Light of the World", passages: ["John 7-9"], description: "Festival of Tabernacles, the woman caught in adultery, and healing the blind man." },
      { day: 31, title: "The Good Shepherd", passages: ["John 10-12"], description: "The shepherd's voice, Lazarus raised, and Mary anoints Jesus." },
      { day: 32, title: "The Upper Room", passages: ["John 13-15"], description: "Foot washing, the new commandment, the vine and branches, and the promise of the Spirit." },
      { day: 33, title: "The Promise & the Prayer", passages: ["John 16-18"], description: "The Spirit of truth, Jesus's high priestly prayer, and His arrest." },
      { day: 34, title: "The Cross & the Garden", passages: ["John 19-21"], description: "The crucifixion, the empty tomb, Thomas's confession, and breakfast by the sea." },
      { day: 35, title: "Pentecost", passages: ["Acts 1-3"], description: "The ascension, the coming of the Holy Spirit, and Peter's bold sermon." },
      { day: 36, title: "The Early Church", passages: ["Acts 4-6"], description: "Boldness before the Sanhedrin, Ananias and Sapphira, and the choosing of the Seven." },
      { day: 37, title: "Stephen & Philip", passages: ["Acts 7-8"], description: "Stephen's speech and martyrdom, and Philip's ministry in Samaria and to the Ethiopian." },
      { day: 38, title: "The Conversion of Saul", passages: ["Acts 9-10"], description: "Saul meets Jesus on the Damascus road, and Peter's vision of the clean and unclean." },
      { day: 39, title: "The Gospel Spreads", passages: ["Acts 11-13"], description: "The church at Antioch, James martyred, Peter freed, and Paul's first missionary journey begins." },
      { day: 40, title: "The Jerusalem Council", passages: ["Acts 14-16"], description: "The debate over Gentile believers, the council's decision, and Paul's second journey begins." },
      { day: 41, title: "Athens & Corinth", passages: ["Acts 17-19"], description: "Paul at the Areopagus, ministry in Corinth, and the riot in Ephesus." },
      { day: 42, title: "Journey to Jerusalem", passages: ["Acts 20-22"], description: "Paul's farewell to the Ephesian elders, arrival in Jerusalem, and his arrest." },
      { day: 43, title: "Trials & Defense", passages: ["Acts 23-25"], description: "Paul before the Sanhedrin, Felix, and Festus." },
      { day: 44, title: "Appeal to Caesar", passages: ["Acts 26-28"], description: "Paul before Agrippa, shipwreck on Malta, and arrival in Rome." },
      { day: 45, title: "The Gospel of Grace", passages: ["Romans 1-3"], description: "The human condition, the universality of sin, and justification by faith." },
      { day: 46, title: "Life in the Spirit", passages: ["Romans 4-6"], description: "Abraham's faith, peace with God, and freedom from sin." },
      { day: 47, title: "More Than Conquerors", passages: ["Romans 7-8"], description: "The struggle with sin, life in the Spirit, and nothing can separate us from God's love." },
      { day: 48, title: "God's Sovereign Plan", passages: ["Romans 9-11"], description: "Israel's place in God's plan, and the mystery of God's mercy to all." },
      { day: 49, title: "Living Sacrifices", passages: ["Romans 12-16"], description: "Transformed living, submission to authorities, love as fulfillment of the law, and final greetings." },
      { day: 50, title: "Unity in Corinth", passages: ["1 Corinthians 1-4"], description: "Divisions in the church, the wisdom of the cross, and the role of apostles." },
      { day: 51, title: "Holiness & Freedom", passages: ["1 Corinthians 5-8"], description: "Church discipline, lawsuits, sexual ethics, and food offered to idols." },
      { day: 52, title: "Worship & Gifts", passages: ["1 Corinthians 9-12"], description: "Paul's rights, the Lord's Supper, and spiritual gifts in the body of Christ." },
      { day: 53, title: "Love & Resurrection", passages: ["1 Corinthians 13-16"], description: "The love chapter, the reality of resurrection, and final instructions." },
      { day: 54, title: "Comfort & New Covenant", passages: ["2 Corinthians 1-5"], description: "The God of all comfort, the new covenant's glory, and the ministry of reconciliation." },
      { day: 55, title: "Generosity & Weakness", passages: ["2 Corinthians 6-10"], description: "Paul's hardships, cheerful giving, and the thorn in the flesh." },
      { day: 56, title: "Paul's Defense", passages: ["2 Corinthians 11-13"], description: "Paul's sufferings for Christ, visions, and final warnings." },
      { day: 57, title: "Freedom in Christ", passages: ["Galatians 1-3"], description: "Paul's authority, justification by faith, and the purpose of the law." },
      { day: 58, title: "Life by the Spirit", passages: ["Galatians 4-6"], description: "Sons of God, freedom from the law, the fruit of the Spirit, and bearing burdens." },
      { day: 59, title: "Spiritual Blessings", passages: ["Ephesians 1-3"], description: "Every spiritual blessing, saved by grace, and the mystery of Christ revealed." },
      { day: 60, title: "Walk Worthy", passages: ["Ephesians 4-6"], description: "Unity in the body, new life in Christ, household codes, and the armor of God." },
      { day: 61, title: "Joy in All Things", passages: ["Philippians 1-4"], description: "Paul's joy from prison, the humility of Christ, pressing toward the goal, and contentment." },
      { day: 62, title: "Christ Supreme", passages: ["Colossians 1-4"], description: "Christ as head of all creation, dying to the old self, and practical Christian living." },
      { day: 63, title: "The Lord's Return", passages: ["1 Thessalonians 1-5"], description: "Thanksgiving for faith, Paul's ministry, the coming of the Lord, and holy living." },
      { day: 64, title: "Stand Firm", passages: ["2 Thessalonians 1-3"], description: "Encouragement in persecution, the man of lawlessness, and a call to work." },
      { day: 65, title: "Instructions for Ministry", passages: ["1 Timothy 1-6"], description: "Sound doctrine, qualifications for leaders, godliness with contentment." },
      { day: 66, title: "Guard the Gospel", passages: ["2 Timothy 1-4"], description: "Paul's final letter: fan into flame, endure hardship, preach the word." },
      { day: 67, title: "Grace That Teaches", passages: ["Titus 1-3", "Philemon 1"], description: "Godly living on Crete and Paul's plea for a runaway slave turned brother." },
      { day: 68, title: "Superior to Angels", passages: ["Hebrews 1-4"], description: "Jesus is greater than the angels, greater than Moses, and offers Sabbath rest." },
      { day: 69, title: "The Great High Priest", passages: ["Hebrews 5-7"], description: "Jesus as high priest in the order of Melchizedek, superior to the Levitical system." },
      { day: 70, title: "The New Covenant", passages: ["Hebrews 8-10"], description: "A better covenant, the perfect sacrifice, and drawing near with confidence." },
      { day: 71, title: "Faith Hall of Fame", passages: ["Hebrews 11-13"], description: "Heroes of faith, running the race, and closing exhortations." },
      { day: 72, title: "Faith & Works", passages: ["James 1-3"], description: "Trials produce maturity, be doers of the word, and taming the tongue." },
      { day: 73, title: "Wisdom from Above", passages: ["James 4-5"], description: "Submit to God, patience in suffering, and the prayer of faith." },
      { day: 74, title: "Living Hope", passages: ["1 Peter 1-3"], description: "Born again to living hope, a holy people, and suffering for doing good." },
      { day: 75, title: "Suffering & Glory", passages: ["1 Peter 4-5", "2 Peter 1"], description: "Sharing Christ's sufferings, shepherding the flock, and growing in godliness." },
      { day: 76, title: "Truth & Warning", passages: ["2 Peter 2-3"], description: "False teachers, the Day of the Lord, and growing in grace." },
      { day: 77, title: "Walking in the Light", passages: ["1 John 1-3"], description: "God is light, the test of love, and children of God." },
      { day: 78, title: "God Is Love", passages: ["1 John 4-5", "2 John", "3 John"], description: "Testing the spirits, God's love perfected in us, and truth in practice." },
      { day: 79, title: "Contending for Faith", passages: ["Jude"], description: "A warning against false teachers and a glorious doxology." },
      { day: 80, title: "Letters to the Churches I", passages: ["Revelation 1-3"], description: "John's vision of the risen Christ and letters to the seven churches." },
      { day: 81, title: "The Throne Room", passages: ["Revelation 4-7"], description: "The heavenly throne, the Lamb, and the opening of the seals." },
      { day: 82, title: "Trumpets of Judgment", passages: ["Revelation 8-11"], description: "The seventh seal, the trumpets, and the two witnesses." },
      { day: 83, title: "The Dragon & the Lamb", passages: ["Revelation 12-14"], description: "The woman, the dragon, the beasts, and the Lamb on Mount Zion." },
      { day: 84, title: "Bowls of Wrath", passages: ["Revelation 15-17"], description: "The seven bowls poured out and the fall of Babylon." },
      { day: 85, title: "Babylon Falls", passages: ["Revelation 18-19"], description: "The lament over Babylon and the wedding supper of the Lamb." },
      { day: 86, title: "All Things New", passages: ["Revelation 20-22"], description: "The final judgment, the new heaven and earth, and the river of life." },
      { day: 87, title: "Review: The Gospels", passages: ["John 1:1-18", "John 20:30-31"], description: "Revisit the purpose of the Gospels: that you may believe." },
      { day: 88, title: "Review: Acts & Epistles", passages: ["Acts 2:42-47", "Romans 8:28-39"], description: "The heart of the early church and the unshakeable love of God." },
      { day: 89, title: "Review: The Life We Are Called To", passages: ["Ephesians 4:1-6", "Philippians 2:1-11"], description: "Walking worthy and the humility of Christ." },
      { day: 90, title: "Review: The Promise", passages: ["Revelation 21:1-7", "Revelation 22:20-21"], description: "He is making all things new. Amen. Come, Lord Jesus." },
    ],
  },
  {
    id: "bible-365",
    title: "Bible in a Year",
    subtitle: "Genesis to Revelation",
    description: "Read through the entire Bible in 365 days. A balanced mix of Old Testament, New Testament, and Psalms or Proverbs each day to keep you engaged.",
    totalDays: 365,
    estimatedMinutes: 20,
    category: "Whole Bible",
    color: "amber",
    icon: "bible",
    days: Array.from({ length: 365 }, (_, i) => {
      const day = i + 1;
      // Generate structured reading plan
      const otBooks = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"];
      const ntBooks = ["Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"];

      const otBook = otBooks[day % otBooks.length];
      const ntBook = ntBooks[day % ntBooks.length];
      const psalmNum = ((day - 1) % 150) + 1;
      const chapterNum = ((day - 1) % 30) + 1;

      return {
        day,
        title: `Day ${day}`,
        passages: [`${otBook} ${chapterNum}`, `${ntBook} ${chapterNum}`, `Psalm ${psalmNum}`],
        description: `Old Testament: ${otBook}, New Testament: ${ntBook}, and Psalm ${psalmNum}.`,
      };
    }),
  },
];

// LocalStorage keys
const STORAGE_KEY_PREFIX = "bible-ai-reading-plan-";

export interface ReadingPlanProgress {
  planId: string;
  completedDays: number[];
  startedAt: string;
  lastCompletedAt: string | null;
}

export function getProgress(planId: string): ReadingPlanProgress {
  if (typeof window === "undefined") {
    return { planId, completedDays: [], startedAt: new Date().toISOString(), lastCompletedAt: null };
  }
  const stored = localStorage.getItem(STORAGE_KEY_PREFIX + planId);
  if (stored) {
    return JSON.parse(stored);
  }
  return { planId, completedDays: [], startedAt: new Date().toISOString(), lastCompletedAt: null };
}

export function saveProgress(progress: ReadingPlanProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_PREFIX + progress.planId, JSON.stringify(progress));
}

export function toggleDay(planId: string, day: number): ReadingPlanProgress {
  const progress = getProgress(planId);
  const idx = progress.completedDays.indexOf(day);
  if (idx >= 0) {
    progress.completedDays.splice(idx, 1);
  } else {
    progress.completedDays.push(day);
    progress.lastCompletedAt = new Date().toISOString();
  }
  progress.completedDays.sort((a, b) => a - b);
  saveProgress(progress);
  return { ...progress };
}

export function calculateStreak(completedDays: number[]): number {
  if (completedDays.length === 0) return 0;
  const sorted = [...completedDays].sort((a, b) => b - a);
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i - 1] - sorted[i] === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export function getEstimatedCompletion(planId: string, totalDays: number): string | null {
  const progress = getProgress(planId);
  const completed = progress.completedDays.length;
  if (completed === 0) return null;

  const startDate = new Date(progress.startedAt);
  const now = new Date();
  const daysSinceStart = Math.max(1, Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  const dailyRate = completed / daysSinceStart;
  if (dailyRate === 0) return null;

  const remainingDays = totalDays - completed;
  const daysToCompletion = Math.ceil(remainingDays / dailyRate);
  const completionDate = new Date(now.getTime() + daysToCompletion * 24 * 60 * 60 * 1000);

  return completionDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
