import React, { useState, useEffect, useMemo } from 'react';
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
  Coffee, 
  Bed,
  Sunrise, 
  Sunset,  
  Moon,
  Music, 
  Wine
} from 'lucide-react';

// ==========================================
//   資料庫區域 (行程已修正為正確格式)
// ==========================================

// --- 青少年遊學資料 (Classic Courses 2025/2026) ---
const TEEN_CAMPUSES = [
  {
    id: 'uk-bosworth', 
    name: "NORTHAMPTON 北安普頓 (Bosworth Independent School)",
    country: "UK",
    type: "STEM & Academic",
    location: "英國, 北安普頓 (Bosworth Independent School)",
    description: "【桑妮推薦：王子學校的美譽】位於英國心臟地帶的百年菁英學府。校園正對 118 英畝的廣闊綠地，擁有頂級的教學設施與舒適的單人/雙人套房。除了高品質的英語課程，這裡更是 STEM（科學/技術）與藝術課程的搖籃。",
    features: ["桑妮推薦", "118英畝綠地校園", "獨立衛浴套房", "STEM 科學實驗"],
    pricePerWeek: 1060, 
    currency: "£",
    startDate: "2026-06-28",
    endDate: "2026-08-16",
    age: "11-17",
    image: "https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&w=800&q=80",
    // 資料來源：northampton_classic_course_2025.pdf
    itinerary: [
      { day: "週日 (Sunday)", morning: "抵達校園 / 辦理入住", afternoon: "校園導覽與迎新介紹", evening: "破冰活動與歡迎晚會" },
      { day: "週一 (Monday)", morning: "英語分級測驗 & 第一堂課", afternoon: "北安普頓市區徒步導覽", evening: "歡迎迪斯可 (Welcome Disco) 或 戲劇遊戲" },
      { day: "週二 (Tuesday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】華威城堡 (Warwick Castle)", evening: "誰想成為百萬富翁？益智問答之夜" },
      { day: "週三 (Wednesday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】牛津大學城徒步導覽", evening: "國際之夜 (International Night)" },
      { day: "週四 (Thursday)", morning: "英語課程 (3小時)", afternoon: "賭場之夜 或 英語會話俱樂部", evening: "奪旗大賽 (Capture the Flag)" },
      { day: "週五 (Friday)", morning: "英語課程 (3小時)", afternoon: "擊鼓/魔術/舞蹈工作坊", evening: "海灘派對主題迪斯可" },
      { day: "週六 (Saturday)", morning: "【全日遊】倫敦市區觀光", afternoon: "倫敦徒步導覽與購物", evening: "電影之夜與爆米花" }
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
    description: "【桑妮推薦：親子與文學之旅】這是一座充滿故事的世界遺產城市。課程位於 Stafford House 校區，讓學生沉浸在中古世紀的童話氛圍中。行程包含參訪著名的坎特伯雷大教堂、乘船漫遊護城河。",
    features: ["世界遺產大教堂", "倫敦近郊安全首選", "里茲城堡參訪", "濱海小鎮之旅"],
    pricePerWeek: 1385,
    currency: "£",
    startDate: "2026-06-14",
    endDate: "2026-08-30",
    age: "11-18",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80", 
    // 資料來源：canterbury_classic_course_2025.pdf
    itinerary: [
      { day: "週日 (Sunday)", morning: "抵達校園 / 辦理入住", afternoon: "校園環境介紹", evening: "迎新晚會與破冰遊戲" },
      { day: "週一 (Monday)", morning: "分級測驗 & 英語課程", afternoon: "坎特伯雷城市徒步導覽", evening: "歡迎迪斯可 或 戲劇工作坊" },
      { day: "週二 (Tuesday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】里茲城堡 (Leeds Castle)", evening: "益智問答之夜" },
      { day: "週三 (Wednesday)", morning: "英語課程 (3小時)", afternoon: "參訪坎特伯雷大教堂 (Canterbury Cathedral)", evening: "國際之夜" },
      { day: "週四 (Thursday)", morning: "英語課程 (3小時)", afternoon: "聖奧古斯丁修道院遺址", evening: "賭場之夜 或 英語會話社團" },
      { day: "週五 (Friday)", morning: "英語課程 (3小時)", afternoon: "運動競賽 / 網球 / 足球", evening: "海灘主題派對" },
      { day: "週六 (Saturday)", morning: "【全日遊】倫敦、布萊頓或劍橋", afternoon: "城市觀光與自由時間", evening: "電影之夜與桌遊" }
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
    description: "【英式貴族寄宿體驗】Oakham School 創立於 1584 年，是一所歷史悠久的頂尖寄宿學校。校園建築優美，擁有極佳的體育設施（游泳池、球場）。位置鄰近 Rutland Water 自然保護區，環境優美安全。",
    features: ["傳統貴族寄宿學校", "哈利波特風格建築", "豐富體育設施", "歷史名城導覽"],
    pricePerWeek: 1420,
    currency: "£",
    startDate: "2026-07-05",
    endDate: "2026-08-09",
    age: "10-17",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    // 資料來源：oakham_classic_course_2025.pdf
    itinerary: [
      { day: "週日 (Sunday)", morning: "抵達校園", afternoon: "校園導覽", evening: "破冰活動" },
      { day: "週一 (Monday)", morning: "分級測驗 & 英語課程", afternoon: "奧克漢小鎮徒步導覽", evening: "歡迎迪斯可 或 珠寶製作" },
      { day: "週二 (Tuesday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】史丹佛 (Stamford) 導覽", evening: "百萬富翁問答之夜" },
      { day: "週三 (Wednesday)", morning: "英語課程 (3小時)", afternoon: "足球 / 網球 / 擊鼓工作坊", evening: "國際之夜" },
      { day: "週四 (Thursday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】拉特蘭湖 (Rutland Water) 造筏體驗", evening: "賭場之夜" },
      { day: "週五 (Friday)", morning: "英語課程 (3小時)", afternoon: "迷你奧運會 / 戲劇工作坊", evening: "海灘主題派對" },
      { day: "週六 (Saturday)", morning: "【全日遊】倫敦徒步導覽", afternoon: "倫敦眼與泰晤士河周邊", evening: "電影之夜" }
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
    description: "【學術之都】課程位於現代化的 CATS Cambridge 校區。這裡是你體驗英國學術傳統的最佳地點。除了英語課程，我們將帶你深入劍橋大學城，參訪宏偉的國王學院 (King's College)，並體驗傳統的康河撐篙。",
    features: ["參訪國王學院", "康河撐篙體驗", "現代化校園設施", "倫敦一日遊"],
    pricePerWeek: 2050,
    currency: "£",
    startDate: "2026-06-28",
    endDate: "2026-08-16",
    age: "12-17",
    image: "https://images.unsplash.com/photo-1565529712759-42b78bed03c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    // 資料來源：cambridge_classic_course_2025.pdf
    itinerary: [
      { day: "週日 (Sunday)", morning: "抵達與入住", afternoon: "校園導覽", evening: "迎新破冰活動" },
      { day: "週一 (Monday)", morning: "分級測驗", afternoon: "劍橋康河撐篙 (Punting) & 城市導覽", evening: "歡迎迪斯可" },
      { day: "週二 (Tuesday)", morning: "英語課程 (3小時)", afternoon: "足球 / 網球 / 擊鼓工作坊", evening: "益智問答之夜" },
      { day: "週三 (Wednesday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】伊利大教堂 (Ely Cathedral)", evening: "國際之夜" },
      { day: "週四 (Thursday)", morning: "英語課程 (3小時)", afternoon: "排球 / 羽球 / 珠寶製作", evening: "賭場之夜" },
      { day: "週五 (Friday)", morning: "英語課程 (3小時)", afternoon: "迷你奧運會 / 馬戲團技巧工作坊", evening: "海灘主題派對" },
      { day: "週六 (Saturday)", morning: "【全日遊】倫敦觀光與泰晤士河遊船", afternoon: "倫敦自由購物", evening: "電影之夜" }
    ],
    transferOptions: [
      { code: "LHR", name: "倫敦希斯洛 (Heathrow)", price: 560 },
      { code: "LGW", name: "倫敦蓋威克 (Gatwick)", price: 590 },
      { code: "STN", name: "倫敦史坦斯特 (Stansted)", price: 310 }
    ]
  },
  {
    id: 'usa-ny-columbia', 
    name: "NEW YORK 紐約 (Columbia University)",
    country: "USA",
    type: "Ivy League & City",
    location: "美國, 紐約 (Columbia University - Barnard College)",
    description: "【常春藤名校體驗】入住曼哈頓上西區的哥倫比亞大學（巴納德學院）宿舍，體驗真正的常春藤盟校生活！搭乘地鐵即可抵達時代廣場與中央公園。",
    features: ["常春藤盟校住宿", "時代廣場與百老匯", "自由女神像", "曼哈頓深度遊"],
    pricePerWeek: 2840,
    currency: "$",
    startDate: "2026-06-29",
    endDate: "2026-08-15",
    age: "14-17",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    // 資料來源：New York Columbia Summer Centre 2025.pdf
    itinerary: [
      { day: "週日 (Sunday)", morning: "抵達與入住", afternoon: "校園導覽", evening: "迎新破冰活動" },
      { day: "週一 (Monday)", morning: "課程介紹與英語課", afternoon: "【半日遊】中央公園 / 林肯中心", evening: "歡迎晚會" },
      { day: "週二 (Tuesday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】MoMA 現代藝術博物館", evening: "國際之夜" },
      { day: "週三 (Wednesday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】世貿中心遺址 / 華爾街 / 證交所", evening: "才藝表演秀 (Talent Show)" },
      { day: "週四 (Thursday)", morning: "英語課程 (3小時)", afternoon: "校園運動與休閒活動", evening: "迪斯可舞會" },
      { day: "週五 (Friday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】布魯克林大橋徒步 / 市政廳", evening: "漫步高架公園 (Highline) 至時代廣場" },
      { day: "週六 (Saturday)", morning: "【全日遊】康尼島 (Coney Island)", afternoon: "海濱遊樂園體驗", evening: "遊戲之夜" }
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
    pricePerWeek: 2075,
    currency: "$",
    startDate: "2026-06-28",
    endDate: "2026-08-09",
    age: "12-17",
    image: "https://images.unsplash.com/photo-1528695076122-38d0114979e8?auto=format&fit=crop&w=800&q=80",
    // 資料來源：boston_classic_course_2025.pdf
    itinerary: [
      { day: "週日 (Sunday)", morning: "抵達與入住", afternoon: "當地環境介紹", evening: "迎新活動" },
      { day: "週一 (Monday)", morning: "分級測驗", afternoon: "【半日遊】波恩水族館 (Boston Aquarium)", evening: "歡迎派對" },
      { day: "週二 (Tuesday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】Wrentham Outlets 購物", evening: "萬聖節主題派對 (Halloween Party)" },
      { day: "週三 (Wednesday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】MIT 麻省理工學院導覽", evening: "運動之夜或桌遊" },
      { day: "週四 (Thursday)", morning: "英語課程 (3小時)", afternoon: "校園藝術與工藝活動 / 美國大學講座", evening: "國際之夜" },
      { day: "週五 (Friday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】普利茅斯 (Plymouth) 歷史導覽", evening: "電影之夜" },
      { day: "週六 (Saturday)", morning: "【全日遊】Canobie Lake 遊樂園", afternoon: "體驗美式遊樂設施", evening: "與朋友自由放鬆" }
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
    pricePerWeek: 2470,
    currency: "$",
    startDate: "2026-06-28",
    endDate: "2026-08-09",
    age: "10-17",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
    // 資料來源：san_francisco_classic_course_2025.pdf
    itinerary: [
      { day: "週日 (Sunday)", morning: "抵達與入住", afternoon: "校園導覽", evening: "迎新介紹" },
      { day: "週一 (Monday)", morning: "分級測驗", afternoon: "聯合廣場與舊金山市區", evening: "校園活動" },
      { day: "週二 (Tuesday)", morning: "英語課程 (3小時)", afternoon: "Exploratorium 科學博物館", evening: "自由時間" },
      { day: "週三 (Wednesday)", morning: "英語課程 (3小時)", afternoon: "金門大橋單車騎行 & 索薩利托 (Sausalito)", evening: "電影之夜" },
      { day: "週四 (Thursday)", morning: "英語課程 (3小時)", afternoon: "下午工作坊", evening: "校園社交" },
      { day: "週五 (Friday)", morning: "英語課程 (3小時)", afternoon: "UC Berkeley 校園導覽 & 鐘塔", evening: "安扎湖 (Lake Anza) 游泳與健行" },
      { day: "週六 (Saturday)", morning: "【全日遊】Great America 遊樂園", afternoon: "體驗雲霄飛車", evening: "自由活動" }
    ],
    transferOptions: [
      { code: "SFO", name: "舊金山國際 (SFO)", price: 400 }
    ]
  },
  {
    id: 'my-jb',
    name: "JOHOR BAHRU 新山 (Forest City International School)",
    country: "Malaysia",
    type: "Tropical & High CP",
    location: "馬來西亞, 森林城市 (Forest City Intl School)",
    description: "【高CP值・鄰近新加坡】校區位於 Forest City International School，距離新加坡車程約 1 小時。結合熱帶度假與英語學習。",
    features: ["雙國遊學(馬來西亞+新加坡)", "樂高樂園與環球影城", "頂級校園設施", "高CP值"],
    pricePerWeek: 775, // 2026 Gross
    currency: "£",
    startDate: "2026-07-05",
    endDate: "2026-08-09",
    age: "12-18",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    // 資料來源：Malaysia Summer Centre 2025.pdf
    itinerary: [
      { day: "週日 (Sunday)", morning: "抵達與入住", afternoon: "校園導覽", evening: "迎新介紹" },
      { day: "週一 (Monday)", morning: "分級測驗", afternoon: "海灘尋寶遊戲 (Scavenger Hunt)", evening: "歡迎晚會" },
      { day: "週二 (Tuesday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】新加坡濱海灣金沙與花園", evening: "藝術與工藝活動" },
      { day: "週三 (Wednesday)", morning: "英語課程 (3小時)", afternoon: "泳池活動", evening: "桌遊之夜" },
      { day: "週四 (Thursday)", morning: "英語課程 (3小時)", afternoon: "【半日遊】柔佛古廟與遊船", evening: "體育活動" },
      { day: "週五 (Friday)", morning: "英語課程 (3小時)", afternoon: "迷你奧運會 或 珠寶製作", evening: "夕陽冰淇淋派對" },
      { day: "週六 (Saturday)", morning: "【全日遊】新加坡徒步導覽與遊船", afternoon: "探索獅城", evening: "放鬆之夜" }
    ],
    transferOptions: [
      { code: "SIN", name: "新加坡樟宜 (Changi)", price: 180 },
    ]
  }
];

// --- 樂齡遊學資料 (根據 2026 手冊精準更新) ---
const SENIOR_CAMPUSES = [
  {
    id: 'senior-canterbury',
    name: "CANTERBURY 坎特伯雷 (Explore Canterbury - Spring 2026)",
    country: "UK",
    type: "Explore Canterbury",
    location: "英國, 坎特伯雷 (Stafford House International)",
    description: "【50+ 熟齡專屬：英格蘭花園之旅】坎特伯雷是世界遺產城市，也是英國聖公會發源地。課程結合歷史、文化與美食。您將探索「英格蘭花園」肯特郡的鄉村風光，品嚐當地葡萄園美酒與惠特斯特布爾生蠔，享受優雅慢活的學習時光。",
    features: ["50+專屬課程", "肯特郡花園之旅", "葡萄園與釀酒廠參訪", "世界遺產巡禮"],
    pricePerWeek: 730,
    currency: "£",
    startDate: "2026-03-30",
    endDate: "2026-05-08",
    age: "50+",
    courseDates: [
      { label: "春季梯次 (2週)", date: "2026/03/30 - 2026/04/10" },
      { label: "春季梯次 (1週)", date: "2026/04/06 - 2026/04/10" },
      { label: "春季梯次 (2週)", date: "2026/04/27 - 2026/05/08" },
      { label: "春季梯次 (1週)", date: "2026/05/04 - 2026/05/08" }
    ],
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    // 依據 CanterburySC.jpg
    itinerary: [
      { day: "週日 (Week 1 Sunday)", morning: "抵達英國", afternoon: "入住寄宿家庭或宿舍", evening: "自由休息" },
      { day: "週一 (Week 1 Monday)", morning: "英語課程", afternoon: "城市歷史徒步導覽", evening: "歡迎酒會 (Welcome Drinks)" },
      { day: "週二 (Week 1 Tuesday)", morning: "英語課程", afternoon: "坎特伯雷大教堂深度導覽", evening: "自由活動" },
      { day: "週三 (Week 1 Wednesday)", morning: "英語課程", afternoon: "拜訪當地葡萄園 (Local Vineyard)", evening: "晚餐聚會 (選購)" },
      { day: "週四 (Week 1 Thursday)", morning: "英語課程", afternoon: "Tiny Tim's 傳統英式奶油茶", evening: "坎特伯雷幽靈之旅" },
      { day: "週五 (Week 1 Friday)", morning: "英語課程", afternoon: "護城河遊船與河畔散步", evening: "自由活動" },
      { day: "週六 (Week 1 Saturday)", morning: "【全日遊】多佛城堡 (Dover Castle)", afternoon: "多佛白堊斷崖健行", evening: "自由活動" },
      { day: "週日 (Week 2 Sunday)", morning: "【選購行程】倫敦與皇家公園", afternoon: "自由探索倫敦", evening: "自由活動" },
      { day: "週一 (Week 2 Monday)", morning: "英語課程", afternoon: "Margate 濱海小鎮與 Turner 美術館", evening: "Corkk 英格蘭酒莊品酒" },
      { day: "週二 (Week 2 Tuesday)", morning: "英語課程", afternoon: "Whitstable 小鎮漫步與生蠔品嚐", evening: "自由活動" },
      { day: "週三 (Week 2 Wednesday)", morning: "英語課程", afternoon: "參訪里茲城堡 (Leeds Castle)", evening: "晚餐聚會 (選購)" },
      { day: "週四 (Week 2 Thursday)", morning: "英語課程", afternoon: "參訪 Shepherd Neame (英國最古老釀酒廠)", evening: "電影之夜" },
      { day: "週五 (Week 2 Friday)", morning: "英語課程", afternoon: "肯特郡鄉村酒吧午餐與健行", evening: "自由活動" },
      { day: "週六 (Week 2 Saturday)", morning: "收拾行李", afternoon: "前往機場", evening: "返家" }
    ],
    accommodationOptions: [
      { name: "Homestay (Shared Bath, Single, HB)", price: 240 },
      { name: "Residence (Single En-suite, Self-catered)", price: 240 }
    ],
    transferOptions: [
      { code: "LHR", name: "倫敦希斯洛 (Heathrow)", price: 500 },
      { code: "LGW", name: "倫敦蓋威克 (Gatwick)", price: 400 },
      { code: "STN", name: "倫敦史坦斯特 (Stansted)", price: 500 }
    ]
  },
  {
    id: 'senior-london',
    name: "LONDON 倫敦 (Explore London - Christmas 2026)",
    country: "UK",
    type: "Explore London",
    location: "英國, 倫敦 (Holborn)",
    description: "【50+ 熟齡專屬：倫敦聖誕特別企劃】感受倫敦最魔幻的季節！課程期間恰逢聖誕節慶，街道閃爍著燈光，空氣中飄著烤栗子香氣。行程包含探索聖誕市集、欣賞西區劇院表演、造訪皇家阿爾伯特音樂廳，讓您體驗最道地的英式聖誕。",
    features: ["50+專屬課程", "聖誕市集巡禮", "西區劇院與音樂廳", "節慶燈光巴士"],
    pricePerWeek: 730,
    currency: "£",
    startDate: "2026-11-30",
    endDate: "2026-12-11",
    age: "50+",
    courseDates: [
      { label: "冬季梯次 (2週)", date: "2026/11/30 - 2026/12/11" },
      { label: "冬季梯次 (1週)", date: "2026/12/07 - 2026/12/11" }
    ],
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80",
    // 依據 LondonSC.jpg
    itinerary: [
      { day: "週日 (Week 1 Sunday)", morning: "抵達英國", afternoon: "入住寄宿家庭或宿舍", evening: "自由休息" },
      { day: "週一 (Week 1 Monday)", morning: "英語課程", afternoon: "柯芬園 & Seven Dials 徒步導覽", evening: "歡迎酒會 (Welcome Drinks)" },
      { day: "週二 (Week 1 Tuesday)", morning: "英語課程", afternoon: "皇家阿爾伯特音樂廳導覽 (Royal Albert Hall)", evening: "自由活動" },
      { day: "週三 (Week 1 Wednesday)", morning: "英語課程", afternoon: "皇家交易所 Fortnum's 午餐", evening: "劇院欣賞 (選購)" },
      { day: "週四 (Week 1 Thursday)", morning: "英語課程", afternoon: "泰晤士河南岸 (South Bank) 漫步", evening: "倫敦聖誕燈光觀光巴士" },
      { day: "週五 (Week 1 Friday)", morning: "英語課程", afternoon: "參訪約翰·索恩爵士博物館", evening: "自由活動" },
      { day: "週六 (Week 1 Saturday)", morning: "【全日遊】溫徹斯特 (Winchester)", afternoon: "溫徹斯特聖誕市集採購", evening: "自由活動" },
      { day: "週日 (Week 2 Sunday)", morning: "【選購行程】聖誕童話劇 (Pantomime)", afternoon: "日場演出欣賞", evening: "自由活動" },
      { day: "週一 (Week 2 Monday)", morning: "英語課程", afternoon: "Carnaby Street 與 Soho 區徒步導覽", evening: "傳統英式酒吧社交 (Pub Social)" },
      { day: "週二 (Week 2 Tuesday)", morning: "英語課程", afternoon: "V&A 博物館參訪與午餐", evening: "自由活動" },
      { day: "週三 (Week 2 Wednesday)", morning: "英語課程", afternoon: "騎士橋 (Knightsbridge) 聖誕購物", evening: "劇院欣賞" },
      { day: "週四 (Week 2 Thursday)", morning: "英語課程", afternoon: "Browns 英式下午茶體驗", evening: "自由活動" },
      { day: "週五 (Week 2 Friday)", morning: "英語課程", afternoon: "聖誕午餐聚會", evening: "英式酒吧劇場 (Pub Theatre)" },
      { day: "週六 (Week 2 Saturday)", morning: "收拾行李", afternoon: "前往機場", evening: "返家" }
    ],
    accommodationOptions: [
      { name: "Homestay (Single, Breakfast only)", price: 250 },
      { name: "Homestay (Single, Half Board)", price: 270 },
      { name: "Residence (Standard , Single En-suite)", price: 380 }
    ],
    transferOptions: [
      { code: "LHR", name: "倫敦希斯洛 (Heathrow)", price: 340 },
      { code: "LGW", name: "倫敦蓋威克 (Gatwick)", price: 380 },
      { code: "STN", name: "倫敦史坦斯特 (Stansted)", price: 380 }
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
  const [selectedAccom, setSelectedAccom] = useState(null);

  // 當開啟不同校區時，重置選項與週數
  useEffect(() => {
    setWeeks(2);
    setSelectedTransfer(null);
    setSelectedAccom(null);
    setActiveTab('overview');
  }, [campus]);

  if (!campus) return null;

  // --- 關鍵修改：直接在 Render 中計算總金額，不使用 useEffect，確保 0 延遲 ---
  const tuitionTotal = weeks * campus.pricePerWeek;
  const accomTotal = selectedAccom ? weeks * selectedAccom.price : 0;
  const transferPrice = selectedTransfer ? selectedTransfer.price : 0;
  const grandTotal = tuitionTotal + accomTotal + transferPrice;
  // ------------------------------------------------------------

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative animate-scale-in">
        
        {/* === 固定懸浮關閉按鈕 === */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] p-2 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors shadow-lg hover:rotate-90 duration-300"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

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

        <div className="w-full md:w-3/5 flex flex-col max-h-[60vh] md:max-h-full overflow-y-auto bg-stone-50">
          
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

            {/* === 修正重點：全新的行程顯示方式 (早/午/晚) === */}
            {activeTab === 'itinerary' && (
              <div className="space-y-6">
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
                      <strong>行程說明：</strong>以下為經典範例行程，實際安排將依學校當週公告與天氣狀況調整。
                    </div>
                  </div>
               
                {campus.itinerary.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                     <div className="bg-stone-100 px-4 py-3 border-b border-stone-200 flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                        <h4 className="font-bold text-stone-800">{item.day}</h4>
                     </div>
                     <div className="p-4 space-y-4">
                        {/* 早上 */}
                        <div className="flex gap-3 items-start">
                           <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg flex-shrink-0 mt-1">
                             <Sunrise size={18} />
                           </div>
                           <div>
                             <span className="text-xs font-bold text-stone-400 uppercase">Morning (上午)</span>
                             <p className="text-stone-700 text-sm">{item.morning}</p>
                           </div>
                        </div>
                        {/* 下午 */}
                        <div className="flex gap-3 items-start border-t border-dashed border-stone-100 pt-3">
                           <div className="p-2 bg-orange-50 text-orange-600 rounded-lg flex-shrink-0 mt-1">
                             <Sun size={18} />
                           </div>
                           <div>
                             <span className="text-xs font-bold text-stone-400 uppercase">Afternoon (下午)</span>
                             <p className="text-stone-700 text-sm">{item.afternoon}</p>
                           </div>
                        </div>
                        {/* 晚上 */}
                        <div className="flex gap-3 items-start border-t border-dashed border-stone-100 pt-3">
                           <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg flex-shrink-0 mt-1">
                             <Moon size={18} />
                           </div>
                           <div>
                             <span className="text-xs font-bold text-stone-400 uppercase">Evening (晚上)</span>
                             <p className="text-stone-700 text-sm">{item.evening}</p>
                           </div>
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
                  
                  {/* 週數選擇器 (按下去總金額會即時變動) */}
                  <div className="mb-6 select-none">
                    <label className="block text-sm font-medium text-stone-500 mb-2">
                      選擇參加週數
                    </label>
                    <div className="flex items-center justify-center gap-4">
                      <button 
                        onClick={() => setWeeks(Math.max(1, weeks - 1))}
                        className="w-12 h-12 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 active:bg-stone-300 flex items-center justify-center text-2xl font-bold transition-all"
                      >
                        -
                      </button>
                      <div className="text-center w-24">
                        <span className="text-4xl font-bold text-stone-800 block">{weeks}</span>
                        <span className="text-xs text-stone-500 block">週 ({weeks * 7} 天)</span>
                      </div>
                      <button 
                        onClick={() => setWeeks(Math.min(8, weeks + 1))}
                        className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 active:bg-orange-300 flex items-center justify-center text-2xl font-bold transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

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
                   
                    {/* === 總金額顯示區塊：放大並確保即時更新 === */}
                    <div className="flex justify-between items-center text-3xl font-bold text-orange-600 mt-4 pt-4 border-t border-stone-100 bg-orange-50 p-6 rounded-xl shadow-inner">
                      <span className="text-lg text-stone-500 font-normal self-end mb-1">總金額</span>
                      <span>{campus.currency}{grandTotal.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-stone-400 mt-2 text-right">
                      * 此為個人報名 2026 預估價
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => window.open("https://lin.ee/KNXjszz", "_blank")}
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
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