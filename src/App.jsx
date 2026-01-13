import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Search, 
  X, 
  MessageCircle, 
  Sun,
  BookOpen, 
  Globe,
  Users,
  Star,
  CheckCircle,
  Plane,
  Plus,
  ChevronDown,
  ArrowRight,
  Coffee, // 新增圖標：咖啡 (適合樂齡)
  Landmark, // 新增圖標：地標/博物館
  Bed // 新增圖標：住宿
} from 'lucide-react';

// ==========================================
//   資料庫區域
// ==========================================

// --- 青少年遊學資料 ---
const TEEN_CAMPUSES = [
  // --- UK CENTRES ---
  {
    id: 'uk-bosworth', 
    name: "NORTHAMPTON 北安普頓 (Bosworth Independent School)",
    country: "UK",
    type: "STEM & Academic",
    location: "英國, 北安普頓 (Bosworth Independent School)",
    description: "【桑妮推薦：王子學校的美譽】位於英國心臟地帶的百年菁英學府。這裡完美結合了繁忙的城市生活與寧靜的鄉村風光。校園正對 118 英畝的廣闊綠地（The Racecourse），擁有頂級的教學設施與舒適的單人/雙人套房。除了高品質的英語課程，這裡更是 STEM（科學/技術）與藝術課程的搖籃，非常適合初次遊學、尋求安全感與學術啟發的孩子。",
    features: ["桑妮推薦", "118英畝綠地校園", "獨立衛浴套房", "STEM 科學實驗"],
    pricePerWeek: 1060, // 2026 Gross
    currency: "£",
    startDate: "2026-06-28",
    endDate: "2026-08-16",
    age: "11-17",
    // 替換圖片：英國傳統紅磚建築/校園風格
    image: "https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&w=800&q=80",
    itinerary: [
      { day: "Week 1", activity: "【英式生活初體驗】抵達與歡迎晚宴 / 華威城堡 (Warwick Castle) 探索 / 科學實驗工作坊 / 英式下午茶禮儀 / 劍橋大學城全日遊" },
      { day: "Week 2", activity: "【文化與學術巡禮】牛津大學城導覽 / 藝術創作 (T-shirt 彩繪) / 倫敦大笨鐘與白金漢宮 / 惜別舞會與證書頒發" }
    ],
    transferOptions: [
      { code: "LHR", name: "倫敦希斯洛 (Heathrow)", price: 560 },
      { code: "LGW", name: "倫敦蓋威克 (Gatwick)", price: 590 },
      { code: "STN", name: "倫敦史坦斯特 (Stansted)", price: 310 }
    ]
  },
  {
    id: 'uk-canterbury', 
    name: "CANTERBURY 坎特伯雷 (The Worthgate School)",
    country: "UK",
    type: "History & Culture",
    location: "英國, 坎特伯雷 (Stafford House / Worthgate School)",
    description: "【桑妮推薦：親子與文學之旅】這是一座充滿故事的世界遺產城市，也是英國最古老、最安全的城市之一。課程位於 Stafford House 校區，讓學生沉浸在中古世紀的童話氛圍中。行程包含參訪著名的坎特伯雷大教堂、乘船漫遊護城河。因距離倫敦僅 50 分鐘車程，既能享受古城的寧靜，又能輕鬆造訪大都會。",
    features: ["世界遺產大教堂", "倫敦近郊安全首選", "里茲城堡參訪", "濱海小鎮之旅"],
    pricePerWeek: 1385, // 2026 Gross
    currency: "£",
    startDate: "2026-06-14”,
    endDate: "2026-08-30”,
    age: "11-18",
    //替換圖片：英國古城/街道風格
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80", 
    itinerary: [
      { day: "Week 1", activity: "【古城與海岸】坎特伯雷大教堂導覽 / 肯特郡鄉村漫步 / 濱海小鎮 Whitstable 吃生蠔 / 倫敦泰晤士河遊船" },
      { day: "Week 2", activity: "【城堡與歷史】「城堡中的皇后」里茲城堡 (Leeds Castle) / 多佛白堊斷崖健行 / 傳統英式烘焙課 / 盛大惜別晚會" }
    ],
    transferOptions: [
      { code: "LHR", name: "倫敦希斯洛 (Heathrow)", price: 580 },
      { code: "LGW", name: "倫敦蓋威克 (Gatwick)", price: 490 },
      { code: "STN", name: "倫敦史坦斯特 (Stansted)", price: 580 }
    ]
  },
  {
    id: 'uk-oakham',
    name: "OAKHAM 奧克漢 (Oakham School)",
    country: "UK",
    type: "Classic Boarding",
    location: "英國, 奧克漢 (Oakham School)",
    description: "【英式貴族寄宿體驗】Oakham School 創立於 1584 年，是一所歷史悠久的頂尖寄宿學校。校園建築優美，宛如哈利波特電影場景。這裡擁有極佳的體育設施（游泳池、球場），非常適合熱愛運動的學生。位置鄰近 Rutland Water 自然保護區，環境優美安全。",
    features: ["傳統貴族寄宿學校", "哈利波特風格建築", "豐富體育設施", "歷史名城導覽"],
    pricePerWeek: 1420, // 2026 Gross
    currency: "£",
    startDate: "2026-07-05”,
    endDate: "2026-08-09,
    age: "10-17",
    // 替換圖片：英式貴族/綠地校園風格
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    itinerary: [
      { day: "Week 1", activity: "【英式傳統】校園導覽與迎新 / 奧克漢小鎮尋寶 / 諾丁漢 (Nottingham) 羅賓漢之旅 / 倫敦全日觀光" },
      { day: "Week 2", activity: "【運動與探索】劍橋大學城撐篙 / 校園迷你奧運會 / 藝術工作坊 / 惜別化妝舞會" }
    ],
    transferOptions: [
      { code: "LHR", name: "倫敦希斯洛 (Heathrow)", price: 830 },
      { code: "LGW", name: "倫敦蓋威克 (Gatwick)", price: 930 },
      { code: "STN", name: "倫敦史坦斯特 (Stansted)", price: 680 }
    ]
  },
  {
    id: 'uk-cambridge',
    name: "CAMBRIDGE 劍橋 (CATS Cambridge)",
    country: "UK",
    type: "Classic Course",
    location: "英國, 劍橋 (CATS Cambridge)",
    description: "【學術之都】課程位於現代化的 CATS Cambridge 校區，擁有先進的教學設施。這裡是你體驗英國學術傳統的最佳地點。除了英語課程，我們將帶你深入劍橋大學城，參訪宏偉的國王學院 (King's College)，並體驗傳統的康河撐篙 (Punting)。",
    features: ["參訪國王學院", "康河撐篙體驗", "現代化校園設施", "倫敦一日遊"],
    pricePerWeek: 2050, // 2026 Gross
    currency: "£",
    startDate: "2026-06-28”,
    endDate: "2026-08-16”,
    age: "12-17",
    // 替換圖片：劍橋國王學院/康河 (更新連結)
    image: "https://images.unsplash.com/photo-1565529712759-42b78bed03c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    itinerary: [
      { day: "Week 1", activity: "【學術氛圍】英語分級測驗 / 康河撐篙 (Punting) / 劍橋市集廣場購物 / 倫敦一日遊 (大英博物館)" },
      { day: "Week 2", activity: "【歷史足跡】國王學院禮拜堂參訪 / 伊利大教堂 (Ely Cathedral) / 華威城堡 / 傳統英式運動日" }
    ],
    transferOptions: [
      { code: "LHR", name: "倫敦希斯洛 (Heathrow)", price: 560 },
      { code: "LGW", name: "倫敦蓋威克 (Gatwick)", price: 590 },
      { code: "STN", name: "倫敦史坦斯特 (Stansted)", price: 310 }
    ]
  },
  {
    id: 'uk-london',
    name: "LONDON 倫敦 (Guildhouse School)",
    country: "UK",
    type: "City Experience",
    location: "英國, 倫敦 (Guildhouse School)",
    description: "【大都會體驗】位於倫敦市中心 Bloomsbury 區的 Guildhouse School，步行即可抵達大英博物館與牛津街。適合喜愛城市探索與文化的學生。課程結合了倫敦地標巡禮，讓學生親身感受世界級城市的脈動。",
    features: ["倫敦市中心住宿", "大英博物館為鄰", "西區劇院欣賞", "牛津街購物"],
    pricePerWeek: 1505, // 2026 Estimated
    currency: "£",
    startDate: "2026-06-28",
    endDate: "2026-08-30”,
    age: "12-17",
    // 替換圖片：倫敦街景/大笨鐘
    image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=800&q=80",
    itinerary: [
      { day: "Week 1", activity: "【倫敦之心】倫敦眼與大笨鐘 / 柯芬園街頭藝人 / 西區音樂劇 / 布萊頓海濱一日遊" },
      { day: "Week 2", activity: "【文化與時尚】泰特現代美術館 / 格林威治天文台 / 肯頓市集 / 牛津街與攝政街購物" }
    ],
    transferOptions: [
      { code: "LHR", name: "倫敦希斯洛 (Heathrow)", price: 350 },
      { code: "LGW", name: "倫敦蓋威克 (Gatwick)", price: 450 },
      { code: "STN", name: "倫敦史坦斯特 (Stansted)", price: 450 }
    ]
  },
  {
    id: 'uk-bournemouth',
    name: "BOURNEMOUTH 波恩茅斯 (Arts University Bournemouth)",
    country: "UK",
    type: "Art & Seaside",
    location: "英國, 波恩茅斯 (Arts University Bournemouth)",
    description: "【海濱與藝術】位於英國著名的海濱度假勝地，校園設於波恩茅斯藝術大學 (AUB)。這裡氣候宜人，擁有美麗的沙灘。課程特別適合喜愛創意與藝術的學生，結合了海濱休閒與豐富的藝術氛圍。",
    features: ["海濱度假勝地", "藝術大學校園", "沙灘活動", "氣候溫暖宜人"],
    pricePerWeek: 1385, // 2026 Estimated
    currency: "£",
    startDate: "2026-07-05",
    endDate: "2026-08-09”,
    age: “8-17",
    // 替換圖片：英式古典建築 (替代原海濱圖片)
    image: "https://images.unsplash.com/photo-1449452198679-05c7fd30f416?auto=format&fit=crop&w=800&q=80",
    itinerary: [
      { day: "Week 1", activity: "【陽光海岸】波恩茅斯海灘日 / 侏羅紀海岸 (Jurassic Coast) / 倫敦一日遊" },
      { day: "Week 2", activity: "【創意生活】藝術工作坊體驗 / 溫徹斯特古城 / 海洋水族館 / 惜別營火晚會" }
    ],
    transferOptions: [
      { code: "LHR", name: "倫敦希斯洛 (Heathrow)", price: 540 },
      { code: "STN", name: "倫敦史坦斯特 (Stansted)", price: 640 },
      { code: "BHX", name: "伯明罕 (Birmingham)", price: 780 }
    ]
  },
  {
    id: 'uk-york',
    name: "YORK 約克 (Queen Ethelburga's)",
    country: "UK",
    type: "History & Countryside",
    location: "英國, 約克 (Queen Ethelburga's)",
    description: "【哈利波特與歷史】位於著名的 Queen Ethelburga's 寄宿學校，擁有頂級的現代化設施與廣闊的鄉村校園。鄰近歷史名城約克（York），學生可以漫步在「斜角巷」原型的肉舖街，參訪宏偉的約克大教堂，感受濃厚的英式歷史底蘊。",
    features: ["頂級寄宿學校設施", "約克大教堂", "肉舖街(斜角巷)", "安全鄉村環境"],
    pricePerWeek: 1460, // 2026 Estimated
    currency: "£",
    startDate: "2026-06-28,
    endDate: "2026-08-02”,
    age: “8-17",
    // 替換圖片：約克大教堂/歷史建築 (更新連結)
    image: "https://images.unsplash.com/photo-1582299710920-d336338d6728?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    itinerary: [
      { day: "Week 1", activity: "【中世紀探險】約克古城牆漫步 / 維京博物館 / 曼徹斯特一日遊" },
      { day: "Week 2", activity: "【魔法與自然】哈利波特主題遊 / 霍華德城堡 / 傳統英式運動日 / 鬼屋導覽" }
    ],
     transferOptions: [
      { code: "LHR", name: "倫敦希斯洛 (Heathrow)", price: 910 },
      { code: "LGW", name: "倫敦蓋威克 (Gatwick)", price: 1030 },
      { code: "STN", name: "倫敦史坦斯特 (Stansted)", price: 850 }
    ]
  },

  // --- USA CENTRES ---
  {
    id: 'usa-ny-columbia', 
    name: "NEW YORK 紐約 (Columbia University)",
    country: "USA",
    type: "Ivy League & City",
    location: "美國, 紐約 (Columbia University - Barnard College)",
    description: "【常春藤名校體驗】入住曼哈頓上西區的哥倫比亞大學（巴納德學院）宿舍，體驗真正的常春藤盟校生活！搭乘地鐵即可抵達時代廣場與中央公園。這不僅是英語課程，更是一場紐約大蘋果的深度探索。學生將登上自由女神像、漫步布魯克林大橋。",
    features: ["常春藤盟校住宿", "時代廣場與百老匯", "自由女神像", "曼哈頓深度遊"],
    pricePerWeek: 2840, // 2026 Gross
    currency: "$",
    startDate: "2026-06-29",
    endDate: "2026-08-15”,
    age: "14-17”,
    // 替換圖片：紐約街景/建築
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    itinerary: [
      { day: "Week 1", activity: "【大蘋果魅力】中央公園野餐 / MoMA 現代藝術博物館 / 時代廣場漫步 / 自由女神像遊船" },
      { day: "Week 2", activity: "【金融與時尚】華爾街與金融區 / SOHO 區購物 / 布魯克林大橋徒步 / 康尼島海濱遊樂" }
    ],
    transferOptions: [
      { code: "JFK", name: "甘迺迪 (JFK) / 紐華克 (EWR)", price: 750 },
    ]
  },
  {
    id: 'usa-ny-wagner',
    name: "NEW YORK 紐約 (Wagner College)",
    country: "USA",
    type: "Campus & City",
    location: "美國, 紐約 (Wagner College, Staten Island)",
    description: "【校園與城市全景】位於史泰登島的 Wagner College，擁有美麗的綠地校園，並能眺望曼哈頓天際線。搭乘免費的史泰登島渡輪 (Staten Island Ferry) 即可輕鬆前往曼哈頓市中心，享受安全舒適的住宿環境與紐約的便利。",
    features: ["綠地校園環境", "眺望曼哈頓天際線", "史泰登島渡輪", "安全且便利"],
    pricePerWeek: 3635, // 2026 Estimated
    currency: "$",
    startDate: "2026-06-28,
    endDate: "2026-08-08”,
    age: "12-18”,
    // 替換圖片：紅磚學院風格建築 (符合使用者要求的英國建築風格)
    image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=800&q=80",
    itinerary: [
      { day: "Week 1", activity: "【島嶼與城市】史泰登島渡輪體驗 / 華爾街銅牛 / 911 紀念博物館 / 帝國大廈觀景" },
      { day: "Week 2", activity: "【文化探索】大都會博物館 / 中央公園 / 時代廣場 / 自由女神像" }
    ],
    transferOptions: [
      { code: "JFK", name: "甘迺迪 (JFK) / 紐華克 (EWR)", price: 750 },
    ]
  },
  {
    id: 'usa-boston',
    name: "BOSTON 波士頓 (CATS Academy)",
    country: "USA",
    type: "Ivy League Experience",
    location: "美國, 波士頓 (CATS Academy)",
    description: "【美國學術心臟】位於 CATS Academy Boston 的優美校園，提供單人衛浴套房。波士頓是美國的學術之都，鄰近哈佛與 MIT。行程包含走訪自由之路 (Freedom Trail)、昆西市場，以及精彩的紐約市一日遊。",
    features: ["單人衛浴套房", "哈利波特餐廳體驗(哈佛)", "紐約市一日遊", "昆西市場龍蝦堡"],
    pricePerWeek: 2075, // 2026 Gross
    currency: "$",
    startDate: "2026-06-28,
    endDate: "2026-08-09”,
    age: "12-17",
    // 替換圖片：經典建築/學院 (替代原波士頓圖片)
    image: "https://images.unsplash.com/photo-1528695076122-38d0114979e8?auto=format&fit=crop&w=800&q=80",
    itinerary: [
      { day: "Week 1", activity: "【歷史與現代】波士頓自由之路 / 昆西市場美食 / 哈佛大學校園巡禮 / 紐約市全日遊" },
      { day: "Week 2", activity: "【海洋與學術】波士頓港賞鯨遊船 / MIT 博物館 / 紐伯里街購物 / 六旗遊樂園" }
    ],
    transferOptions: [
      { code: "BOS", name: "波士頓洛根 (Logan)", price: 620 }
    ]
  },
  {
    id: 'usa-sf',
    name: "SAN FRANCISCO 舊金山 (UC Berkeley)",
    country: "USA",
    type: "Tech & Nature",
    location: "美國, 柏克萊 (UC Berkeley)",
    description: "【加州陽光與名校】課程位於世界頂尖公立大學 UC Berkeley 校園內！感受矽谷創新氛圍。行程包括搭乘叮叮車、騎單車橫越金門大橋、參訪神秘的惡魔島 (Alcatraz)，以及前往矽谷科技重鎮朝聖。",
    features: ["入住 UC Berkeley", "金門大橋單車行", "惡魔島探險", "矽谷科技參訪"],
    pricePerWeek: 2470, // 2026 Gross
    currency: "$",
    startDate: "2026-06-28”,
    endDate: "2026-08-09”,
    age: "10-17",
    // 替換圖片：舊金山
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
    itinerary: [
      { day: "Week 1", activity: "【灣區風情】聯合廣場 / 叮叮車體驗 / 金門大橋公園 / 漁人碼頭 / 惡魔島監獄導覽" },
      { day: "Week 2", activity: "【科技與自然】矽谷科技公司參訪 / 史丹佛大學 / 聖塔克魯茲海灘 / NBA 勇士隊主場" }
    ],
    transferOptions: [
      { code: "SFO", name: "舊金山國際 (SFO)", price: 400 }
    ]
  },
  {
    id: 'usa-la',
    name: "LOS ANGELES 洛杉磯 (California State University)",
    country: "USA",
    type: "Film & Beach",
    location: "美國, 洛杉磯 (California State University)",
    description: "【好萊塢與海灘】位於加州州立大學海峽群島分校 (CSU Channel Islands)，校園建築優美，充滿西班牙風格。距離洛杉磯市中心與著名的馬里布海灘不遠。行程包含好萊塢星光大道、環球影城以及美麗的 Santa Monica 海灘。",
    features: ["加州大學校園", "好萊塢星光大道", "環球影城", "Santa Monica 海灘"],
    pricePerWeek: 3625, // 2026 Estimated
    currency: "$",
    startDate: "2026-07-05”,
    endDate: "2026-07-25”,
    age: "12-17",
    // 替換圖片：洛杉磯棕櫚樹
    image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=800&q=80",
    itinerary: [
      { day: "Week 1", activity: "【星光熠熠】好萊塢星光大道 / 格里斐斯天文台 / 比佛利山莊 / Santa Monica 海灘" },
      { day: "Week 2", activity: "【電影夢工廠】洛杉磯環球影城 (Universal Studios) / 蓋提中心 (Getty Center) / 購物中心" }
    ],
    transferOptions: [
      { code: "LAX", name: "洛杉磯國際 (LAX)", price: 750 }
    ]
  },
  {
    id: 'usa-miami',
    name: "MIAMI 邁阿密 (Barry University)",
    country: "USA",
    type: "Sun & Fun",
    location: "美國, 邁阿密 (Barry University)",
    description: "【佛羅里達陽光】位於邁阿密海岸的 Barry University，擁有熱帶風情的校園與游泳池。這裡是享受陽光、沙灘與美式文化的最佳地點。行程包含邁阿密著名的南海灘 (South Beach)、大沼澤地國家公園 (Everglades) 體驗氣墊船。",
    features: ["佛州陽光海灘", "大沼澤地國家公園", "大學校園設施", "多元文化體驗"],
    pricePerWeek: 3625, // 2026 Estimated
    currency: "$",
    startDate: "2026-07-05”,
    endDate: "2026-08-08”,
    age: "12-18”,
    // 替換圖片：邁阿密
    image: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=800&q=80",
    itinerary: [
      { day: "Week 1", activity: "【熱帶風情】南海灘 (South Beach) / 邁阿密市區導覽 / 購物中心 / 校園泳池派對" },
      { day: "Week 2", activity: "【自然與冒險】大沼澤地國家公園氣墊船 / 勞德岱堡 (Fort Lauderdale) 遊船 / 科學博物館" }
    ],
    transferOptions: [
      { code: "MIA", name: "邁阿密國際 (MIA)", price: 500 },
    ]
  },

  // --- MALAYSIA CENTRES ---
  {
    id: 'my-jb',
    name: "JOHOR BAHRU 新山 (Forest City International School)",
    country: "Malaysia",
    type: "Tropical & High CP",
    location: "馬來西亞, 森林城市 (Forest City Intl School)",
    description: "【高CP值・鄰近新加坡】校區位於 Forest City International School，距離新加坡車程約 1 小時。結合熱帶度假與英語學習。學生入住獨立衛浴雙人房，享受頂級校園設施。行程包含新加坡環球影城、馬來西亞樂高樂園。",
    features: ["雙國遊學(馬來西亞+新加坡)", "樂高樂園與環球影城", "頂級校園設施", "高CP值"],
    pricePerWeek: 775, // 2026 Gross
    currency: "£",
    startDate: "2026-07-05",
    endDate: "2026-08-09”,
    age: "12-18",
    // 替換圖片：宏偉校舍/建築 (替代原熱帶圖片，符合英國建築要求)
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    itinerary: [
      { day: "Week 1", activity: "【熱帶冒險】海灘尋寶遊戲 / 新加坡濱海灣金沙 / 蠟染藝術 / 馬來西亞樂高樂園" },
      { day: "Week 2", activity: "【文化雙城】紅樹林生態導覽 / 柔佛古廟 / 新加坡環球影城或市區 / 冰淇淋派對" }
    ],
    transferOptions: [
      { code: "SIN", name: "新加坡樟宜 (Changi)", price: 180 },
    ]
  }
];

// --- 樂齡遊學資料 (2026 Explore Programme) ---
const SENIOR_CAMPUSES = [
  {
    id: 'senior-canterbury',
    name: "CANTERBURY 坎特伯雷 (Explore Canterbury Programme)",
    country: "UK",
    type: "Explore Canterbury",
    location: "英國, 坎特伯雷 (Stafford House International)",
    description: "【英式優雅慢活】Explore Canterbury 專案。坎特伯雷不僅是世界遺產城市，更是英國聖公會的發源地，充滿歷史與文學氣息。課程包含每週 20 堂英語課，以及專屬的社交活動與旅遊，如傳統下午茶、大教堂導覽、肯特郡花園漫步等，讓您以舒適的步調品味英國生活。",
    features: ["熟齡專屬課程", "深度文化體驗", "肯特郡花園之旅", "步調舒適"],
    pricePerWeek: 730, // 2026 Explore Programme (Course only)
    currency: "£",
    startDate: "2026-03-30", // First start date
    endDate: "2026-05-08",
    age: "50+",
    courseDates: [
      { label: "春季梯次 (2週)", date: "2026/03/30 - 2026/04/10" },
      { label: "春季梯次 (1週)", date: "2026/04/06 - 2026/04/10" },
      { label: "春季梯次 (2週)", date: "2026/04/27 - 2026/05/08" },
      { label: "春季梯次 (1週)", date: "2026/05/04 - 2026/05/08" }
    ],
    // 替換圖片：英式花園/寧靜氛圍
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    itinerary: [
      { day: "Week 1", activity: "【歷史與文學】坎特伯雷大教堂導覽 / 漫步古城牆 / 傳統英式酒吧之夜 / 倫敦一日遊" },
      { day: "Week 2", activity: "【花園與城堡】西辛赫斯特城堡花園 (Sissinghurst) / 漫步多佛白堊斷崖 / 奶油茶 (Cream Tea) 體驗 / 惜別晚宴" }
    ],
    accommodationOptions: [
      { name: "Homestay (Standard, Single, Half Board)", price: 205 }, // +205 per week
      { name: "Homestay (Private Bath, Single, HB)", price: 285 },
      { name: "Residence (Single En-suite, Self-catered)", price: 310 } // 範例
    ],
    transferOptions: [
      { code: "LHR", name: "倫敦希斯洛 (Heathrow)", price: 360 },
      { code: "STN", name: "倫敦史坦斯特 (Stansted)", price: 280 },
      { code: "BHX", name: "伯明罕 (Birmingham)", price: 240 }
    ]
  },
  {
    id: 'senior-london',
    name: "LONDON 倫敦 (Explore London Programme)",
    country: "UK",
    type: "Explore London",
    location: "英國, 倫敦 (Holborn)",
    description: "【大都會文化巡禮】Explore London 專案位於倫敦市中心 Holborn。課程結合英語學習與倫敦豐富的藝文資源。上午學習實用英語，下午則有專人帶領造訪國家美術館、泰特現代美術館，或在泰晤士河畔享受午後時光。適合熱愛藝術、歷史與城市探索的熟齡學員。",
    features: ["倫敦市中心校區", "博物館深度遊", "西區劇院欣賞", "國際社交圈"],
    pricePerWeek: 730, // 2026 Explore Programme (Course only)
    currency: "£",
    startDate: "2026-11-30",
    endDate: "2026-12-11",
    age: "50+",
    courseDates: [
      { label: "冬季梯次 (2週)", date: "2026/11/30 - 2026/12/11" },
      { label: "冬季梯次 (1週)", date: "2026/12/07 - 2026/12/11" }
    ],
    // 替換圖片：博物館/藝術風格
    image: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=800&q=80",
    itinerary: [
      { day: "Week 1", activity: "【皇室與藝術】白金漢宮 / 國家美術館導覽 / 泰晤士河遊船 / 柯芬園與西區劇院" },
      { day: "Week 2", activity: "【歷史與現代】大英博物館深度遊 / 碎片塔 (The Shard) 觀景 / 波羅市集美食 / 格林威治天文台" }
    ],
    accommodationOptions: [
      { name: "Homestay (Single, Breakfast only)", price: 220 },
      { name: "Homestay (Single, Half Board)", price: 270 },
      { name: "Residence (Piccadilly Court, Single En-suite)", price: 470 }
    ],
    transferOptions: [
      { code: "LHR", name: "倫敦希斯洛 (Heathrow)", price: 360 },
      { code: "STN", name: "倫敦史坦斯特 (Stansted)", price: 280 },
      { code: "BHX", name: "伯明罕 (Birmingham)", price: 240 }
    ]
  }
];

// --- 輔助組件 ---

const CampusCard = ({ campus, onClick }) => (
  <div 
    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-orange-100 flex flex-col h-full"
    onClick={() => onClick(campus)}
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={campus.image} 
        alt={campus.name} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-orange-600 shadow-sm flex items-center gap-1">
        <Globe size={12} />
        {campus.country}
      </div>
      {/* 標籤邏輯 */}
      {['uk-bosworth', 'uk-canterbury', 'my-jb'].includes(campus.id) && (
        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
          <Star size={10} fill="currentColor" /> 桑妮推薦
        </div>
      )}
      {['usa-ny-columbia', 'uk-oakham'].includes(campus.id) && (
        <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
          NEW!
        </div>
      )}
      {campus.age === "50+" && (
        <div className="absolute top-3 left-3 bg-purple-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
          <Coffee size={10} /> 樂齡首選
        </div>
      )}
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-stone-800 group-hover:text-orange-500 transition-colors line-clamp-2">
          {campus.name}
        </h3>
      </div>
      <p className="text-sm text-stone-500 flex items-center gap-1 mb-3">
        <MapPin size={14} className="text-orange-500" />
        {campus.location.split(' (')[0]}
      </p>
      <p className="text-stone-600 text-sm line-clamp-2 mb-4 flex-1">
        {campus.description}
      </p>
      <div className="mt-auto pt-4 border-t border-orange-100 flex justify-between items-center">
        <div className="text-orange-600 font-bold">
          {campus.currency}{campus.pricePerWeek} <span className="text-xs text-stone-400 font-normal">/ 週起</span>
        </div>
        <span className="text-xs text-stone-500 bg-orange-50 px-2 py-1 rounded-full flex items-center gap-1 hover:bg-orange-100 transition-colors">
          詳情 <ArrowRight size={12}/>
        </span>
      </div>
    </div>
  </div>
);

const DetailModal = ({ campus, onClose }) => {
  const [weeks, setWeeks] = useState(2);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [selectedAccom, setSelectedAccom] = useState(null); // 新增：住宿選擇狀態

  if (!campus) return null;

  const tuitionTotal = weeks * campus.pricePerWeek;
  // 住宿費 = 週數 * 單週住宿費 (如果有選的話)
  const accomTotal = selectedAccom ? weeks * selectedAccom.price : 0;
  const transferPrice = selectedTransfer ? selectedTransfer.price : 0;
  const grandTotal = tuitionTotal + accomTotal + transferPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative animate-scale-in">
        
        {/* 關閉按鈕 */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X size={20} className="text-stone-600"/>
        </button>

        {/* 左側：圖片與基本資訊 */}
        <div className="w-full md:w-2/5 relative h-48 md:h-auto group">
          <img 
            src={campus.image} 
            alt={campus.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-transparent p-6 text-white">
            <h2 className="text-2xl font-bold mb-1">{campus.name}</h2>
            <p className="text-sm opacity-90 flex items-center gap-1">
              <MapPin size={14} /> {campus.location}
            </p>
          </div>
        </div>

        {/* 右側：內容區 */}
        <div className="w-full md:w-3/5 flex flex-col max-h-[60vh] md:max-h-full overflow-y-auto bg-stone-50">
          
          {/* Tabs */}
          <div className="flex bg-white border-b border-orange-100 sticky top-0 z-10 shadow-sm">
            {['overview', 'itinerary', 'calculator'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab 
                    ? 'border-orange-500 text-orange-600 bg-orange-50/50' 
                    : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50'
                }`}
              >
                {tab === 'overview' && '校區介紹'}
                {tab === 'itinerary' && '每日行程'}
                {tab === 'calculator' && '費用試算'}
              </button>
            ))}
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            {/* 內容切換 */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
                  <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                    <BookOpen size={20} className="text-orange-500"/> 關於此校區
                  </h3>
                  <p className="text-stone-600 leading-relaxed text-sm text-justify">
                    {campus.description}
                  </p>
                </div>
               
                <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
                  <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                    <Sun size={20} className="text-amber-500"/> 特色亮點
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {campus.features.map((feature, idx) => (
                      <span key={idx} className="bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-sm border border-orange-100 font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <h3 className="font-bold text-orange-800 mb-2 text-sm">開課日期</h3>
                    <p className="text-orange-700 text-sm flex items-center gap-2">
                      <Calendar size={16} />
                      {campus.startDate} 起
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <h3 className="font-bold text-green-800 mb-2 text-sm">適合年齡</h3>
                    <p className="text-green-700 text-sm flex items-center gap-2">
                      <Users size={16} />
                      {campus.age} 歲
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-4">
                 {/* 樂齡遊學專屬：開課梯次顯示 */}
                 {campus.courseDates && (
                   <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-4">
                      <h4 className="text-sm font-bold text-purple-800 mb-2 flex items-center gap-2">
                        <Calendar size={16} /> 2026 指定開課日期
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {campus.courseDates.map((date, idx) => (
                          <div key={idx} className="bg-white p-2 rounded border border-purple-100 text-sm text-purple-700">
                            <span className="font-bold">{date.label}:</span> {date.date}
                          </div>
                        ))}
                      </div>
                   </div>
                 )}

                 <div className="bg-orange-50 p-3 rounded-lg text-xs text-orange-800 mb-2 flex items-start gap-2 border border-orange-100">
                    <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>行程說明：</strong><br/>
                      此為精選範例行程。每週會安排 1 次全日旅行與數次半日旅行，實際安排將依學校當週公告為準。
                      {campus.age === "50+" && <br/>}
                      {campus.age === "50+" && <span>(樂齡方案包含：每週20堂課、7項活動、教材、活動交通、2週課程含1次全日旅遊)</span>}
                    </div>
                  </div>
               
                {campus.itinerary.map((item, idx) => (
                  <div key={idx} className="mb-4">
                     <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">
                        <span className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                        {item.day}
                        <span className="flex-1 h-px bg-stone-200"></span>
                      </div>
                    <div className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-stone-700 text-sm leading-relaxed">
                        {item.activity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'calculator' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 text-center">
                  <h3 className="text-lg font-bold text-stone-800 mb-6">預估您的遊學費用 (個人報名)</h3>
                  
                  {/* 週數選擇器 */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-stone-500 mb-2">
                      選擇參加週數
                    </label>
                    <div className="flex items-center justify-center gap-4">
                      <button 
                        onClick={() => setWeeks(Math.max(1, weeks - 1))}
                        className="w-10 h-10 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 flex items-center justify-center text-xl font-bold transition-colors"
                      >
                        -
                      </button>
                      <div className="text-center w-24">
                        <span className="text-3xl font-bold text-stone-800">{weeks}</span>
                        <span className="text-sm text-stone-500 block">週 ({weeks * 7} 天)</span>
                      </div>
                      <button 
                        onClick={() => setWeeks(Math.min(8, weeks + 1))}
                        className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 flex items-center justify-center text-xl font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 住宿選擇區 (僅針對樂齡校區或有提供不同住宿的校區) */}
                  {campus.accommodationOptions && (
                    <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-left mb-6">
                      <h4 className="text-sm font-bold text-stone-700 mb-3 flex items-center gap-2">
                         <Bed size={16} className="text-orange-500"/> 住宿選擇
                      </h4>
                      <div className="relative">
                        <select 
                          className="w-full p-3 pl-4 pr-10 border border-stone-300 rounded-lg appearance-none bg-white text-stone-700 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "none") {
                              setSelectedAccom(null);
                            } else {
                              const option = campus.accommodationOptions.find(opt => opt.name === val);
                              setSelectedAccom(option);
                            }
                          }}
                          value={selectedAccom ? selectedAccom.name : "none"}
                        >
                          <option value="none">不含住宿 (課程 only)</option>
                          {campus.accommodationOptions.map((opt, idx) => (
                            <option key={idx} value={opt.name}>
                              {opt.name} (+{campus.currency}{opt.price}/週)
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 pointer-events-none" />
                      </div>
                    </div>
                  )}

                  {/* 機場接送選擇區 */}
                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-left mb-6">
                    <h4 className="text-sm font-bold text-stone-700 mb-3 flex items-center gap-2">
                       <Plane size={16} className="text-orange-500"/> 機場來回接送 (選購)
                    </h4>
                   
                    <div className="relative">
                      <select 
                        className="w-full p-3 pl-4 pr-10 border border-stone-300 rounded-lg appearance-none bg-white text-stone-700 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "none") {
                            setSelectedTransfer(null);
                          } else {
                            const option = (campus.transferOptions || []).find(opt => opt.code === val);
                            setSelectedTransfer(option);
                          }
                        }}
                        value={selectedTransfer ? selectedTransfer.code : "none"}
                      >
                        <option value="none">自行前往 / 不需要接送</option>
                        {(campus.transferOptions || []).map(opt => (
                          <option key={opt.code} value={opt.code}>
                            {opt.name} (+{campus.currency}{opt.price} 來回)
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 pointer-events-none" />
                    </div>
                    <div className="text-xs text-stone-400 mt-2 px-1">
                      * 顯示價格已包含來回接送 (單程價格 x 2)
                    </div>
                  </div>

                  {/* 費用加總明細 */}
                  <div className="border-t border-dashed border-stone-200 py-6 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-stone-500">學費 (個人價 x {weeks} 週)</span>
                      <span className="text-stone-700 font-medium">{campus.currency}{tuitionTotal.toLocaleString()}</span>
                    </div>
                    {selectedAccom && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-stone-500">住宿費 ({selectedAccom.name})</span>
                        <span className="text-stone-700 font-medium">{campus.currency}{accomTotal.toLocaleString()}</span>
                      </div>
                    )}
                    {selectedTransfer && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-stone-500">接送費 ({selectedTransfer.code})</span>
                        <span className="text-stone-700 font-medium">{campus.currency}{transferPrice}</span>
                      </div>
                    )}
                   
                    <div className="flex justify-between items-center text-2xl font-bold text-orange-600 mt-4 pt-4 border-t border-stone-100">
                      <span>總金額</span>
                      <span>{campus.currency}{grandTotal.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-stone-400 mt-2 text-right">
                      * 此為個人報名 2026 預估價
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => window.open("https://lin.ee/KNXjszz", "_blank")}
                    className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95"
                  >
                    預約諮詢此方案
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 主應用程式 ---

export default function App() {
  const [selectedDate, setSelectedDate] = useState("");
  const [activeCategory, setActiveCategory] = useState('teen'); // 'teen' or 'senior'
  const [filteredCampuses, setFilteredCampuses] = useState(TEEN_CAMPUSES);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // 根據日期與類別篩選
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      // 1. 先決定要用哪個資料庫
      const sourceData = activeCategory === 'teen' ? TEEN_CAMPUSES : SENIOR_CAMPUSES;

      // 2. 如果有選日期，就過濾日期
      let results = sourceData;
      if (selectedDate) {
        const searchTime = new Date(selectedDate).getTime();
        results = sourceData.filter(campus => {
          const start = new Date(campus.startDate).getTime();
          const end = new Date(campus.endDate).getTime();
          return searchTime >= start && searchTime <= end;
        });
      }

      setFilteredCampuses(results);
      setIsSearching(false);
    }, 300); // 縮短延遲感

    return () => clearTimeout(timer);
  }, [selectedDate, activeCategory]);

  // Line 客服連結
  const handleLineClick = () => {
    window.open("https://lin.ee/KNXjszz", "_blank");
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 pb-20">
      
      {/* 注入自定義動畫樣式 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>

      {/* 頂部導航 */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white p-2 rounded-lg">
              <Globe size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-stone-800 leading-tight">跟著桑妮去遊學</h1>
              <p className="text-xs text-orange-600 font-medium">Stafford House 2026</p>
            </div>
          </div>
          <button className="md:hidden text-stone-500">
            <span className="sr-only">Menu</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </header>

      {/* Hero 區域與搜尋 */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white pb-20 pt-12 px-4 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
           <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
           <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>

        <div className="container mx-auto text-center max-w-3xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            跟著桑妮去遊學<br />
            開啟您的 2026 遊學冒險
          </h2>
          <p className="text-orange-50 text-lg mb-8">
            英國、美國、馬來西亞多國校區任選，體驗沉浸式英語學習
          </p>

          {/* 搜尋框 */}
          <div className="bg-white p-2 rounded-full shadow-2xl flex items-center max-w-xl mx-auto pl-6 pr-2 transform translate-y-8">
            <div className="flex-1 flex flex-col items-start mr-4">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">
                預計出發日期
              </label>
              <input 
                type="date" 
                className="w-full text-stone-700 font-bold outline-none bg-transparent"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full transition-colors shadow-lg">
              <Search size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* 搜尋結果/列表區 */}
      <main className="container mx-auto px-4 mt-16">
        
        {/* 客群切換 Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-full shadow-md border border-stone-200 inline-flex">
            <button 
              onClick={() => setActiveCategory('teen')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === 'teen' 
                  ? 'bg-orange-500 text-white shadow-sm' 
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              青少年遊學
            </button>
            <button 
              onClick={() => setActiveCategory('senior')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                activeCategory === 'senior' 
                  ? 'bg-purple-500 text-white shadow-sm' 
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <Coffee size={16} /> 樂齡遊學
            </button>
          </div>
        </div>

        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
              {activeCategory === 'senior' && <Coffee className="text-purple-500"/>}
              {selectedDate ? `搜尋結果 (${filteredCampuses.length})` : 
                activeCategory === 'teen' ? '青少年熱門校區 (10-18歲)' : '樂齡精選行程 (50歲+)'}
            </h3>
            {selectedDate && (
              <p className="text-sm text-stone-500 mt-1">
                顯示於 {selectedDate} 開放的校區
              </p>
            )}
          </div>
          {selectedDate && (
            <button 
              onClick={() => setSelectedDate("")}
              className="text-sm text-orange-600 hover:text-orange-800 font-medium underline"
            >
              清除篩選
            </button>
          )}
        </div>

        {isSearching ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : filteredCampuses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampuses.map(campus => (
              <CampusCard 
                key={campus.id} 
                campus={campus} 
                onClick={setSelectedCampus}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-stone-300">
            <div className="inline-block p-4 bg-stone-100 rounded-full mb-4 text-stone-400">
              <Calendar size={32} />
            </div>
            <h3 className="text-lg font-bold text-stone-600">此日期無開放校區</h3>
            <p className="text-stone-400">請嘗試選擇 6月至8月 之間的日期</p>
            <button 
              onClick={() => setSelectedDate("")}
              className="mt-4 text-orange-600 font-medium hover:underline"
            >
              查看所有校區
            </button>
          </div>
        )}
      </main>

      {/* 底部 Footer */}
      <footer className="bg-stone-800 text-stone-400 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-white font-bold text-lg mb-4">跟著桑妮去遊學</h4>
          <p className="text-sm opacity-60">
            © 2026 Adventures in English. All rights reserved.<br/>
            Prices and dates are for demonstration purposes based on 2026 brochure.
          </p>
        </div>
      </footer>

      {/* 懸浮 Line 客服按鈕 */}
      <button 
        onClick={handleLineClick}
        className="fixed bottom-6 right-6 z-40 bg-[#00B900] hover:bg-[#009e00] text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Contact Customer Service"
      >
        <MessageCircle size={28} className="fill-current" />
        <span className="absolute right-full mr-3 bg-white text-stone-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          線上客服諮詢
        </span>
      </button>

      {/* 詳情彈窗 */}
      {selectedCampus && (
        <DetailModal 
          campus={selectedCampus} 
          onClose={() => setSelectedCampus(null)} 
        />
      )}
    </div>
  );
}
