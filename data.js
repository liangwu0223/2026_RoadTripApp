// ============================================================
//  TRIP DATA — edit this file to update the itinerary
//  Photos: drop images into  photos/<stop-id>/filename.jpg
//          then add the filename to the stop's photos array
// ============================================================

const TRIP_DATA = {
  title: "2026 家庭公路旅行",
  titleEn: "2026 Family Road Trip",
  subtitle: "科羅拉多 · 南達科他 · 堪薩斯城",
  subtitleEn: "Colorado · South Dakota · Kansas City",
  dates: "2026年 7月2日 — 7月10日+",
  datesEn: "July 2 – July 10+, 2026",

  days: [
    // ── DAY 1 ─────────────────────────────────────────────
    {
      date: "7月2日",
      dateEn: "July 2",
      weekday: "週四",
      weekdayEn: "Thu",
      theme: "出發日",
      themeEn: "Departure Day",
      color: "#E8734A",
      accommodation: {
        name: "Best Western Brighton Inn",
        address: "Brighton, CO",
        coords: [39.9703, -104.8120]
      },
      stops: [
        {
          id: "brighton-inn",
          name: "Best Western Brighton Inn",
          nameEn: "Best Western Brighton Inn",
          coords: [39.9703, -104.8120],
          time: "晚上 · 入住",
          timeEn: "Evening · Check-in",
          intro: "科羅拉多州布萊頓市的旅館，作為旅程啟程第一晚的落腳處。布萊頓位於丹佛北郊，距市中心約半小時車程，交通便利。周邊有便利的餐廳和加油站，可為明日的行程做好準備。",
          introEn: "Our first night's rest in Brighton, CO — a convenient suburb north of Denver, about 30 minutes from downtown. Great access to highways heading toward Rocky Mountain National Park. Settle in and prepare for the adventures ahead.",
          photos: []
        }
      ]
    },

    // ── DAY 2 ─────────────────────────────────────────────
    {
      date: "7月3日",
      dateEn: "July 3",
      weekday: "週五",
      weekdayEn: "Fri",
      theme: "前往埃斯蒂斯公園",
      themeEn: "To Estes Park",
      color: "#4A90D9",
      accommodation: {
        name: "Estes Park Airbnb",
        address: "2760 Old Fall River Road, Estes Park, CO 80517",
        coords: [40.3982, -105.5431]
      },
      stops: [
        {
          id: "motel-breakfast",
          name: "旅館早餐",
          nameEn: "Motel Breakfast",
          coords: [39.9703, -104.8120],
          time: "早上 8:00",
          timeEn: "8:00 AM",
          intro: "利用旅館附贈早餐補充體力，為今天的長途行程做準備。",
          introEn: "Fuel up with the complimentary motel breakfast before hitting the road.",
          photos: []
        },
        {
          id: "rocky-mtn-arsenal",
          name: "洛磯山兵工廠國家野生動物保護區",
          nameEn: "Rocky Mountain Arsenal National Wildlife Refuge",
          coords: [39.8225, -104.7919],
          time: "上午",
          timeEn: "Morning",
          intro: "這座保護區有著獨特的歷史：二戰期間曾是化學武器製造廠，冷戰時期甚至被稱為「地球上最毒的地方」。如今，經過數十年的生態復育，搖身一變成為丹佛近郊最大的城市野生動物天堂。園區內棲息著美洲野牛群、白尾鹿、禿鷹和草原土撥鼠，入場完全免費，非常適合親子出遊。若時間有限，快速繞行觀景路線即可。",
          introEn: "One of the most remarkable ecological comeback stories in America. Once dubbed 'the most toxic place on Earth' for its chemical weapons production history, this refuge has been transformed into a thriving wildlife sanctuary. Home to free-roaming bison herds, white-tailed deer, bald eagles, and prairie dogs — all free to enter, just minutes from Denver.",
          photos: []
        },
        {
          id: "asian-grocery",
          name: "大中華超市 · 採購亞洲食材",
          nameEn: "Asian Grocery Shopping",
          coords: [39.7280, -104.8329],
          time: "上午 / 中午",
          timeEn: "Morning / Noon",
          intro: "在前往埃斯蒂斯公園前，在丹佛地區的亞洲超市補充食材和零食。可購買冷凍食品、調味料和各式亞洲零食，為接下來幾天的自炊做充分準備，既省錢又吃得順口。",
          introEn: "Stock up on Asian groceries and frozen foods in the Denver area before heading into the mountains. A great chance to grab familiar snacks, sauces, and ingredients — more economical than eating out every meal.",
          photos: []
        },
        {
          id: "estes-park-town",
          name: "埃斯蒂斯公園小鎮",
          nameEn: "Estes Park Town",
          coords: [40.3772, -105.5217],
          time: "下午 4:00 入住，晚上逛鎮",
          timeEn: "4 PM Check-in, Explore Town",
          intro: "埃斯蒂斯公園是洛磯山國家公園的門戶小鎮，海拔約7,522英尺（2,293公尺）。這裡氣候涼爽宜人，主街上商店、餐廳和冰淇淋店林立，充滿度假氣氛。夕陽時分，麋鹿常常悠閒地在街頭漫步，與遊客近距離共處，是絕佳的野生動物觀察機會。晚餐後在鎮上散步，欣賞高山夕照。",
          introEn: "The charming gateway town to Rocky Mountain National Park, perched at 7,522 feet. The main street is lined with shops, restaurants, and ice cream parlors. At dusk, elk frequently wander right through downtown — keep your eyes open! A perfect place to relax after the drive and prepare for tomorrow's hike.",
          photos: []
        }
      ]
    },

    // ── DAY 3 ─────────────────────────────────────────────
    {
      date: "7月4日",
      dateEn: "July 4",
      weekday: "週六",
      weekdayEn: "Sat",
      theme: "洛磯山 · 高山湖泊健行",
      themeEn: "RMNP · Alpine Lakes Hike",
      color: "#27AE60",
      accommodation: {
        name: "Estes Park Airbnb",
        address: "2760 Old Fall River Road, Estes Park, CO 80517",
        coords: [40.3982, -105.5431]
      },
      note: "注意：7月4日（健行）和7月5日（公路）可依體力和天氣狀況對調。最好早上完成行程，下午容易下雨。",
      noteEn: "Note: July 4 (hiking) and July 5 (scenic drive) can be swapped depending on weather and energy. Best to finish activities by early afternoon — thunderstorms are common in the afternoon at altitude.",
      stops: [
        {
          id: "bear-lake",
          name: "熊湖 Bear Lake",
          nameEn: "Bear Lake",
          coords: [40.3116, -105.6448],
          time: "清晨 5–7 AM 出發",
          timeEn: "Early Start 5–7 AM",
          intro: "洛磯山國家公園最受歡迎的起點。湖面如鏡，倒映著四周的高山峰巒，清晨人少景美，是觀賞倒影的最佳時機。環湖步道約0.6英里（1公里），平坦易走，老少皆宜。停車場需提前預訂入園時間許可證（Timed Entry Permit），建議在公園官網提前申請。",
          introEn: "The most beloved trailhead in RMNP. The calm lake perfectly mirrors the surrounding peaks — absolutely stunning at dawn before the crowds arrive. The easy 0.6-mile loop is accessible to everyone. Requires Timed Entry Permit for Bear Lake Road; book online at recreation.gov well in advance.",
          photos: []
        },
        {
          id: "nymph-lake",
          name: "仙女湖 Nymph Lake",
          nameEn: "Nymph Lake",
          coords: [40.3155, -105.6486],
          time: "上午",
          timeEn: "Morning",
          intro: "從熊湖步行約0.5英里（0.8公里）即可抵達，爬升約225英尺（69公尺）。仙女湖夏末湖面漂滿黃色睡蓮，在陽光下閃閃發光，畫面如詩如畫。四周被高山松林環繞，空氣中瀰漫著松香。這是三湖健行的第一站，也是照片最好拍的湖之一。",
          introEn: "Just 0.5 miles from Bear Lake with 225 feet of elevation gain. In late summer, yellow water lilies blanket the lake surface — a dreamy, painterly scene. Surrounded by lodgepole pines with the scent of mountain air. The first of three lakes on this classic hike.",
          photos: []
        },
        {
          id: "dream-lake",
          name: "夢湖 Dream Lake",
          nameEn: "Dream Lake",
          coords: [40.3097, -105.6575],
          time: "上午",
          timeEn: "Morning",
          intro: "三湖健行的明星景點，也是洛磯山國家公園最多人拍照的地點。湖的正後方是壯觀的哈利特峰（Hallett Peak，海拔12,713英尺）和飛刀嶺（Flattop Mountain），在無風的清晨，峰影完整倒映在湖面上，美不勝收。距熊湖約1.1英里（1.8公里），爬升400英尺（122公尺）。",
          introEn: "The crown jewel of the three-lake hike and the most photographed spot in all of RMNP. On a calm morning, Hallett Peak (12,713 ft) and Flattop Mountain create a perfect mirror reflection on the lake. 1.1 miles from Bear Lake with 400 feet of elevation gain. Truly magical.",
          photos: []
        },
        {
          id: "emerald-lake",
          name: "翡翠湖 Emerald Lake",
          nameEn: "Emerald Lake",
          coords: [40.3050, -105.6645],
          time: "上午",
          timeEn: "Morning",
          intro: "三湖健行的終點站，湖水在陽光下呈現迷人的翡翠綠色，四周被近乎垂直的岩壁環抱，形成壯麗的冰斗地形。海拔10,110英尺（3,082公尺），距熊湖約1.8英里（2.9公里），爬升608英尺（185公尺）。湖邊可找到大石頭坐下休息，欣賞高山靜謐，是絕佳的午餐地點。",
          introEn: "The emerald-colored gem at the end of the three-lake trail. Nestled in a dramatic glacial cirque at 10,110 feet, with near-vertical cliffs on three sides. 1.8 miles from Bear Lake with 608 feet of gain. Find a boulder by the water and soak it all in — this is the Rockies at their finest.",
          photos: []
        },
        {
          id: "lake-haiyaha",
          name: "海耶哈湖 Lake Haiyaha",
          nameEn: "Lake Haiyaha",
          coords: [40.3022, -105.6551],
          time: "上午（約5小時全程）",
          timeEn: "Morning (Full hike ~5 hrs)",
          intro: "「海耶哈」在阿拉帕霍印第安語中意為「岩石」，名副其實。這座湖的氣質與前三湖截然不同：湖邊巨石嶙峋，水色深沉幽藍，四周荒野感更強，遊客也相對較少。從夢湖叉路口過去約0.6英里，全程來回約4.6英里（7.4公里），爬升約700英尺（213公尺），屬中等難度。",
          introEn: "'Haiyaha' means 'rocks' in Arapaho — and this lake delivers exactly that. Massive boulders line the shore and a deep, dark blue fills the basin. Wilder and less crowded than the other three lakes. Branch off from Dream Lake junction for 0.6 more miles. Full round-trip: 4.6 miles, 700 ft gain.",
          photos: []
        }
      ]
    },

    // ── DAY 4 ─────────────────────────────────────────────
    {
      date: "7月5日",
      dateEn: "July 5",
      weekday: "週日",
      weekdayEn: "Sun",
      theme: "洛磯山 · 山脊公路駕車遊",
      themeEn: "RMNP · Trail Ridge Road Drive",
      color: "#8E44AD",
      accommodation: {
        name: "Estes Park Airbnb",
        address: "2760 Old Fall River Road, Estes Park, CO 80517",
        coords: [40.3982, -105.5431]
      },
      stops: [
        {
          id: "many-parks-curve",
          name: "萬園曲線觀景台",
          nameEn: "Many Parks Curve Overlook",
          coords: [40.3906, -105.6392],
          time: "上午",
          timeEn: "Morning",
          intro: "山脊公路（Trail Ridge Road）的第一個重要觀景台，海拔9,640英尺（2,938公尺）。「Parks」是指高山草地盆地，從這裡可同時俯瞰多個草地盆地在山谷中展開，遠山層疊，氣勢磅礴。秋天還可見麋鹿在草地上覓食。",
          introEn: "The first major viewpoint on Trail Ridge Road at 9,640 feet. 'Parks' here means mountain meadow basins — and from here you can see multiple sweeping meadows spread across the valley below. Dramatic layered peaks frame the view. Elk often graze in the meadows below in morning light.",
          photos: []
        },
        {
          id: "rainbow-curve",
          name: "彩虹曲線觀景台",
          nameEn: "Rainbow Curve Overlook",
          coords: [40.4027, -105.6617],
          time: "上午",
          timeEn: "Morning",
          intro: "海拔10,829英尺（3,300公尺），以常見彩虹而聞名——尤其是午後陣雨過後，彩虹常橫跨山谷。從這個角度可清楚俯瞰整個埃斯蒂斯公園小鎮和東麓山谷，鳥瞰感極強。停車後沿小步道走幾分鐘可到更好的拍攝位置。",
          introEn: "At 10,829 feet, this overlook is famous for rainbow sightings after the afternoon mountain showers. Offers a sweeping bird's-eye view of Estes Park valley far below. A short walk from the parking area leads to even better vantage points.",
          photos: []
        },
        {
          id: "forest-canyon",
          name: "森林峽谷觀景台",
          nameEn: "Forest Canyon Overlook",
          coords: [40.4142, -105.6904],
          time: "上午",
          timeEn: "Morning",
          intro: "山脊公路上最令人屏息的觀景台之一。從護欄邊俯瞰，深達2,000英尺的峽谷突然出現在腳下，谷底有科羅拉多大河的支流奔流其中。深邃的視覺落差感令人震撼。觀景台設有解說牌，介紹這片地區的地質歷史。",
          introEn: "One of the most dramatic stops on Trail Ridge Road. The canyon drops 2,000 feet below — seemingly out of nowhere — with headwaters of the Colorado River threading through the forest far below. The sheer vertical scale is breathtaking. Interpretive signs explain the geology.",
          photos: []
        },
        {
          id: "tundra-communities",
          name: "苔原社區步道",
          nameEn: "Tundra Communities Trailhead",
          coords: [40.4260, -105.7200],
          time: "上午",
          timeEn: "Morning",
          intro: "海拔12,000英尺以上的高山苔原地帶，是北極圈以南少數能見到真正苔原生態系的地方。步道沿途的植物雖然矮小（有些樹木生長了100年卻只有幾英寸高），但生命力極為頑強。夏季盛開各色高山野花，地毯般鋪展開來。步道約1.5英里（2.4公里），平緩易行。注意高海拔容易喘氣，慢步即可。",
          introEn: "Walk through a true alpine tundra ecosystem above 12,000 feet — one of the few places outside the Arctic where this fragile biome exists. The 'trees' here are centuries old but only inches tall, battered by relentless wind. In summer, a carpet of wildflowers blooms across the open tundra. Easy 1.5-mile trail but pace yourself at this altitude.",
          photos: []
        },
        {
          id: "alpine-visitor-center",
          name: "高山遊客中心",
          nameEn: "Alpine Visitor Center",
          coords: [40.4579, -105.7055],
          time: "中午",
          timeEn: "Midday",
          intro: "北美海拔最高的國家公園遊客中心，坐落在11,796英尺（3,595公尺）的山脊上。設有展覽介紹高山生態和地質，也有紀念品商店和提供簡餐的咖啡廳——在如此高海拔品嚐熱湯或咖啡，別有一番滋味。從停車場出發有條短步道可達山頂，360度全景視野絕佳。",
          introEn: "The highest visitor center in the entire US National Park system, perched at 11,796 feet along the Continental Divide. Features exhibits on alpine ecology, a gift shop, and a snack bar — hot soup at this altitude hits different. A short trail from the parking lot leads to a 360-degree summit panorama.",
          photos: []
        }
      ]
    },

    // ── DAY 5 ─────────────────────────────────────────────
    {
      date: "7月6日",
      dateEn: "July 6",
      weekday: "週一",
      weekdayEn: "Mon",
      theme: "前往基斯通 · 7.5小時路程",
      themeEn: "Drive to Keystone, SD · 7.5 hrs",
      color: "#E67E22",
      accommodation: {
        name: "Keystone Airbnb",
        address: "901 Echo Valley Road, Keystone, SD 57751",
        coords: [43.8958, -103.4293]
      },
      stops: [
        {
          id: "chimney-rock",
          name: "煙囪岩國家歷史遺址",
          nameEn: "Chimney Rock National Historic Site",
          coords: [41.7080, -103.3517],
          time: "途中停留",
          timeEn: "En Route Stop",
          intro: "聳立在內布拉斯加州平原上的天然奇岩，高達325英尺（99公尺），形如巨型煙囪。19世紀美國西部拓荒時代，奧勒岡小道（Oregon Trail）、摩門小道（Mormon Trail）和加州小道上的移民隊伍，視此岩為重要的路程里程碑。「看到煙囪岩，代表最艱難的旅程段落即將開始。」現為國家歷史遺址，設有小型遊客中心和瞭望步道。",
          introEn: "A dramatic 325-foot spire rising above the Nebraska plains — one of the most recognizable landmarks on the Oregon Trail. 19th-century pioneers crossing westward used it as a critical waypoint. 'When you see Chimney Rock, the hardest part of the journey is ahead.' Now a National Historic Site with a visitor center and viewpoint trail.",
          photos: []
        },
        {
          id: "jewel-cave",
          name: "珠寶洞國家紀念地",
          nameEn: "Jewel Cave National Monument",
          coords: [43.7294, -103.8285],
          time: "下午 3:55–4:15 洞穴導覽",
          timeEn: "3:55–4:15 PM Cave Tour",
          intro: "世界已探明的第三長洞穴系統，已標繪超過212英里（341公里）的地下通道，且至今仍在持續發現新洞室。「珠寶洞」之名來自洞壁密布的方解石晶體，在導覽燈光下閃爍如珠寶，晶瑩剔透。必須參加公園局導覽（Scenic Tour 最受歡迎）才能入內，強烈建議提前在recreation.gov訂票，旺季票位搶手。",
          introEn: "The third-longest known cave in the world with over 212 miles of mapped passages — and explorers keep finding more. Named for the calcite crystite crystals lining the walls, which sparkle like jewels under tour lighting. Entry by guided tour only (Scenic Tour recommended). Book tickets well in advance at recreation.gov — sold out quickly in peak season.",
          photos: []
        },
        {
          id: "custer-state-park",
          name: "卡斯特州立公園 · 野生動物環路",
          nameEn: "Custer State Park — Wildlife Loop Road",
          coords: [43.7285, -103.5027],
          time: "傍晚 5:30–7:00 PM",
          timeEn: "Evening 5:30–7:00 PM",
          intro: "傍晚黃昏時分是野生動物最活躍的時刻，開車慢慢穿越這條18英里的環形公路，常常可以遇到大批野牛群直接橫過馬路——不誇張，牠們完全不怕車！除了野牛，還有白尾鹿、叉角羚羊（Pronghorn）和草原土撥鼠。建議車速放慢，窗戶搖下，好好感受這段難忘的黃昏野生動物之旅。全程不需下車。",
          introEn: "Golden hour on this 18-mile loop road is pure magic. Bison herds frequently block the road entirely — they have absolute right of way! White-tailed deer, pronghorn antelope, and prairie dogs add to the show. Roll down the windows and drive slowly — this is one of the best free wildlife experiences in America. No need to get out of the car.",
          photos: []
        },
        {
          id: "keystone-arrival",
          name: "基斯通住宿",
          nameEn: "Arrive Keystone",
          coords: [43.8958, -103.4293],
          time: "晚上約 8:00 抵達",
          timeEn: "~8:00 PM Arrival",
          intro: "南達科他州布拉克山（Black Hills）地區的小鎮，距離拉什莫爾山（Mount Rushmore）僅幾分鐘車程。入住休息，養精蓄銳備戰明日的荒地之旅。鎮上有幾家小餐廳，可解決晚餐。",
          introEn: "A small town nestled in the Black Hills, just minutes from Mount Rushmore. Tonight is all about resting up for tomorrow's long day in the Badlands. A few local restaurants can handle a late dinner.",
          photos: []
        }
      ]
    },

    // ── DAY 6 ─────────────────────────────────────────────
    {
      date: "7月7日",
      dateEn: "July 7",
      weekday: "週二",
      weekdayEn: "Tue",
      theme: "死木 · 荒地國家公園西段",
      themeEn: "Deadwood · Badlands West",
      color: "#C0392B",
      accommodation: {
        name: "Keystone Airbnb",
        address: "901 Echo Valley Road, Keystone, SD 57751",
        coords: [43.8958, -103.4293]
      },
      stops: [
        {
          id: "deadwood",
          name: "死木歷史小鎮",
          nameEn: "Deadwood Historic Site",
          coords: [44.3767, -103.7296],
          time: "上午",
          timeEn: "Morning",
          intro: "1876年黃金熱潮中崛起的傳奇西部小鎮，被稱為「狂野西部」的縮影。傳奇槍手「野蠻比爾」希科克（Wild Bill Hickok）在此被射殺，「火災珍」（Calamity Jane）也在此留下足跡。整個鎮幾乎是歷史遺址，保留了當年淘金時代的建築和氛圍。街道兩旁是復古的沙龍、賭場和博物館。強烈建議入手自助導覽地圖，沿途聆聽這段充滿血腥與傳奇的歷史。",
          introEn: "The most famous Wild West town in America, booming with gold in 1876. Wild Bill Hickok was shot dead here; Calamity Jane called it home. The entire town is essentially a historic site — original 1870s buildings line the main street, now housing saloons, casinos, and museums. Pick up a self-guided tour map at the visitor center.",
          photos: []
        },
        {
          id: "saloon-no10",
          name: "第十號沙龍 · Wild Bill 槍擊重演（可選）",
          nameEn: "Saloon No. 10 — Wild Bill Show (Optional)",
          coords: [44.3762, -103.7301],
          time: "週一至六 下午 1:00（可選）",
          timeEn: "Mon–Sat 1 PM (Optional)",
          intro: "1876年8月2日，「野蠻比爾」希科克在這家沙龍打撲克牌時，被杰克·麥考爾從背後開槍射殺。據說他手中拿著一副黑桃A、梅花A、黑桃8、梅花8，後世稱之為「死亡之手（Dead Man's Hand）」。每天下午1時（週一至六），沙龍都會舉行免費的槍擊案重演戲劇表演，臨場感十足，老少咸宜，值得一看。",
          introEn: "On August 2, 1876, Wild Bill Hickok was shot in the back at this very saloon while playing poker, holding what became known as the 'Dead Man's Hand' (AA88). Free dramatic reenactments daily Mon–Sat at 1 PM. Surprisingly well-produced and entertaining — a genuine slice of frontier history.",
          photos: []
        },
        {
          id: "ancient-hunter",
          name: "古獵人觀景台",
          nameEn: "Ancient Hunter Overlook",
          coords: [43.7540, -102.5793],
          time: "下午（西段）",
          timeEn: "Afternoon (West Area)",
          intro: "荒地國家公園西段較少人造訪的觀景台，因此更加寧靜。此地的考古發現顯示，一萬多年前的古代印第安獵人曾在這片荒地邊緣追蹤猛獁象和古代野牛。從觀景台可俯瞰層層相疊的紅黃岩層向遠方延伸，蒼涼壯闊。是荒地西段的好起點。",
          introEn: "A quieter, less-visited overlook in the western unit of Badlands. Archaeological evidence shows ancient hunters pursued mammoths and ancient bison here over 10,000 years ago. The view stretches across layered red and yellow rock formations into a vast, primal landscape. A peaceful start to the western Badlands loop.",
          photos: []
        },
        {
          id: "yellow-mound",
          name: "黃丘觀景台",
          nameEn: "Yellow Mound Overlook",
          coords: [43.7628, -102.4738],
          time: "下午",
          timeEn: "Afternoon",
          intro: "荒地最具色彩衝擊力的觀景點！紅、黃、橙、紫、灰多色岩層交疊，色彩之豐富宛如大自然的調色盤。不同時間和光線下，顏色的飽和度截然不同——午後陽光斜射時，黃色和橙色格外鮮豔。「黃丘」絕對是Badlands最上相的一個停留點。",
          introEn: "The most colorful viewpoint in Badlands — a riot of red, yellow, orange, purple, and grey layered rock bands. The saturated colors shift dramatically throughout the day; afternoon light makes the yellows and oranges absolutely glow. This is Badlands at its most photogenic — don't skip it.",
          photos: []
        },
        {
          id: "pinnacles-overlook",
          name: "尖塔觀景台 · 看日落",
          nameEn: "Pinnacles Overlook — Sunset",
          coords: [43.7876, -102.2736],
          time: "傍晚 · 日落",
          timeEn: "Evening · Sunset",
          intro: "荒地最受歡迎的觀景台，也是最適合看日落的地點。當夕陽西沉，金紅色的光芒將無數尖銳岩石塔柱染成火焰色，整個天際線彷彿在燃燒，景象震撼人心。建議日落前20–30分鐘到達，搶占最佳位置。這是整個荒地之旅最美麗的句點。",
          introEn: "The most popular viewpoint in Badlands, and for good reason — it's the perfect sunset stage. As the sun drops, the jagged pinnacles ignite in shades of gold, orange, and crimson. The whole horizon seems to catch fire. Arrive 20–30 minutes before sunset to claim the best spot. An unforgettable finale to the day.",
          photos: []
        },
        {
          id: "prairie-dog-town",
          name: "羅伯茨草原土撥鼠小鎮",
          nameEn: "Roberts Prairie Dog Town",
          coords: [43.8193, -102.3431],
          time: "傍晚回程",
          timeEn: "Evening Return",
          intro: "北美最大的草原土撥鼠聚居地之一，數千隻土撥鼠在此生活。牠們會用尖銳的口哨聲互相傳遞警報，遊客一接近，整個群落立刻此起彼落地吱吱叫，然後集體鑽入地洞，過一下又探頭出來好奇張望——行為舉止超級可愛逗趣，是老人小孩都喜愛的必看景點。",
          introEn: "One of the largest prairie dog colonies in North America. Thousands of prairie dogs bark alarm calls, pop out of burrows, and dive back in — then peer out again curiously. The whole colony communicates in a chorus of chirps. An absolutely delightful stop that brings out the kid in everyone. Budget more time than you think!",
          photos: []
        }
      ]
    },

    // ── DAY 7 ─────────────────────────────────────────────
    {
      date: "7月8日",
      dateEn: "July 8",
      weekday: "週三",
      weekdayEn: "Wed",
      theme: "荒地東區 → 米切爾",
      themeEn: "Badlands East → Mitchell",
      color: "#16A085",
      accommodation: {
        name: "Hotel Highland Way",
        address: "2020 Highland Way, Mitchell, SD 57301",
        coords: [43.7094, -98.0297]
      },
      stops: [
        {
          id: "notch-trail",
          name: "缺口步道",
          nameEn: "Notch Trail",
          coords: [43.7335, -102.4962],
          time: "上午（荒地東區）",
          timeEn: "Morning (East Badlands)",
          intro: "荒地最有趣、最具挑戰性的步道之一。步道中段需要攀爬一段木製梯架，穿越岩壁上的天然缺口（Notch），登上高處之後，豁然開朗，眼前展現出白河谷（White River Valley）的壯闊全景。全程約1.5英里（2.4公里），有部分攀爬動作，不適合懼高者，但景色絕佳，強力推薦。",
          introEn: "Badlands' most adventurous trail. A wooden log ladder midway through takes you up through a narrow rock notch — and suddenly the entire White River Valley panorama bursts into view. 1.5 miles round-trip with some climbing. Not recommended for those with a fear of heights, but the payoff view is spectacular.",
          photos: []
        },
        {
          id: "door-trail",
          name: "門廊步道",
          nameEn: "Door Trail",
          coords: [43.7389, -102.4916],
          time: "上午",
          timeEn: "Morning",
          intro: "穿越一個天然岩石「門廊」，進入荒地地形的內部。步道以繩索做引導標誌，走入其中，周圍全是嶙峋怪石，彷彿置身另一星球。全程約0.75英里（1.2公里），地形稍有起伏，是沉浸感最強的荒地步道之一。",
          introEn: "Walk through a natural 'door' in the rock and into the raw interior of the Badlands. Rope markers guide you through the open terrain, surrounded on all sides by jagged formations. 0.75 miles round-trip with some uneven ground — deeply immersive and otherworldly.",
          photos: []
        },
        {
          id: "window-trail",
          name: "窗戶步道",
          nameEn: "Window Trail",
          coords: [43.7390, -102.4950],
          time: "上午",
          timeEn: "Morning",
          intro: "三條步道中最短也最易行的一條，全程僅約0.25英里（0.4公里）。步道盡頭是一個天然岩石「窗口」，透過這個窗框，可以欣賞到荒地峽谷的獨特構圖——像一幅鑲嵌在岩石中的風景畫。老人小孩都適合，幾乎零難度。",
          introEn: "The shortest and easiest of the three trails at just 0.25 miles. At the end, a natural rock 'window' perfectly frames a dramatic view into the canyon — like a landscape painting set in stone. Suitable for all ages and fitness levels.",
          photos: []
        },
        {
          id: "big-badlands-overlook",
          name: "大荒地觀景台",
          nameEn: "Big Badlands Overlook",
          coords: [43.7378, -102.4799],
          time: "上午",
          timeEn: "Morning",
          intro: "荒地國家公園的標誌性全景觀景台，也是許多遊客從東側入口進入公園後的第一個停留點。從這裡可以一次看盡荒地的典型地貌：無數參差不齊的岩石塔柱、層層堆疊的地層、深邃的侵蝕溝壑，宛如外星球的景觀。是拍攝荒地全景的最佳地點之一。",
          introEn: "The signature panoramic viewpoint at the eastern entrance to Badlands, and often the first stop for visitors. From here, the full Badlands landscape sprawls before you: thousands of jagged spires, layered geological strata, and eroded gullies stretching to the horizon. The quintessential Badlands view.",
          photos: []
        },
        {
          id: "mitchell-hotel",
          name: "米切爾住宿 · 玉米宮小鎮",
          nameEn: "Mitchell, SD · Corn Palace Town",
          coords: [43.7094, -98.0297],
          time: "傍晚抵達（約3小時車程）",
          timeEn: "~3 hrs drive, Evening Arrival",
          intro: "南達科他州米切爾市，以「玉米宮」（Corn Palace）著稱。這座始建於1892年的獨特建築，每年用真實的玉米穗和彩色穀物重新裝飾外牆，圖案每年更換，非常奇特有趣。晚上抵達後可在附近餐廳用晚餐，明日繼續前往堪薩斯城。",
          introEn: "Mitchell is home to the quirky, one-of-a-kind Corn Palace — a building whose exterior is re-decorated each year entirely with real corn cobs and colored grain in elaborate mosaic patterns. Worth a quick look if you arrive while it's still open. Dinner nearby, then rest up for the drive to Kansas City tomorrow.",
          photos: []
        }
      ]
    },

    // ── DAY 8 ─────────────────────────────────────────────
    {
      date: "7月9日",
      dateEn: "July 9",
      weekday: "週四",
      weekdayEn: "Thu",
      theme: "前往堪薩斯城 · 烤肉晚餐",
      themeEn: "Drive to Kansas City · BBQ Night",
      color: "#2980B9",
      accommodation: {
        name: "Kansas City Hotel (TBD)",
        address: "Kansas City, MO",
        coords: [39.0997, -94.5786]
      },
      stops: [
        {
          id: "kc-drive",
          name: "堪薩斯城 · 抵達",
          nameEn: "Kansas City · Arrival",
          coords: [39.0997, -94.5786],
          time: "約6小時車程",
          timeEn: "~6 hr drive",
          intro: "從米切爾出發，約6小時後抵達堪薩斯城（Kansas City），橫跨南達科他和堪薩斯/密蘇里州界。堪薩斯城以其獨特的烤肉風格、爵士樂文化和藝術博物館聞名，是美國中西部最有個性的城市之一。",
          introEn: "A ~6-hour drive from Mitchell through the Great Plains, crossing into Missouri. Kansas City is famous for its distinctive BBQ style, Jazz heritage, and world-class art museum. A surprisingly vibrant city in the American heartland.",
          photos: []
        },
        {
          id: "kc-bbq",
          name: "堪薩斯城烤肉晚餐",
          nameEn: "Kansas City BBQ Dinner",
          coords: [39.0947, -94.5892],
          time: "晚上",
          timeEn: "Evening",
          intro: "堪薩斯城烤肉（KC BBQ）是美國四大烤肉流派之一，以慢燻豬肉肋排和甜辣醬料聞名全國。必吃推薦：Joe's Kansas City（本地人排隊必去）、Arthur Bryant's（創立於1908年的傳奇老店）、Gates Bar-B-Q（KC最具標誌性的連鎖）。如果要去Joe's，建議提前查好時間，週末中午排隊可能超過一小時。",
          introEn: "Kansas City BBQ is a national institution. The style emphasizes slow-smoked beef and pork with a sweet, thick tomato-molasses sauce. Top picks: Joe's Kansas City (locals' favorite, expect a line), Arthur Bryant's (legendary since 1908), or Gates Bar-B-Q (iconic KC chain). Go hungry — the portions are massive.",
          photos: []
        }
      ]
    },

    // ── DAY 9 ─────────────────────────────────────────────
    {
      date: "7月10日",
      dateEn: "July 10",
      weekday: "週五",
      weekdayEn: "Fri",
      theme: "尼爾遜藝術博物館 · 待續…",
      themeEn: "Nelson-Atkins Museum · To Be Continued…",
      color: "#6C3483",
      accommodation: {
        name: "TBD",
        address: "Kansas City, MO",
        coords: [39.0997, -94.5786]
      },
      stops: [
        {
          id: "nelson-atkins",
          name: "尼爾遜・阿特金斯藝術博物館",
          nameEn: "Nelson-Atkins Museum of Art",
          coords: [39.0462, -94.5801],
          time: "上午",
          timeEn: "Morning",
          intro: "堪薩斯城最重要的文化地標，也是全美最優秀的綜合藝術博物館之一。館藏超過42,000件，尤以亞洲藝術收藏著稱——包括大量中國青銅器、陶瓷、書法和繪畫，是了解中國藝術史的絕佳場所。博物館正門前的草坪上矗立著四個巨型羽毛球雕塑（Shuttlecocks），由藝術家Claes Oldenburg創作，已成為KC最標誌性的打卡地標。最棒的是：入場完全免費！",
          introEn: "One of America's finest art museums, with a collection of over 42,000 works spanning 5,000 years. Its Asian art collection is particularly renowned — Chinese bronzes, ceramics, and paintings of the highest order. The iconic giant Shuttlecocks on the front lawn (by Claes Oldenburg) are a must-photograph. Best of all: completely free admission.",
          photos: []
        },
        {
          id: "kc-tbd",
          name: "待規劃 · 敬請期待",
          nameEn: "To Be Continued…",
          coords: [39.1000, -94.5800],
          time: "待定",
          timeEn: "TBD",
          intro: "行程持續更新中！7月10日之後的安排尚未確定，請關注後續更新。",
          introEn: "Itinerary is still evolving! Plans for July 10 and beyond are TBD — check back for updates.",
          photos: []
        }
      ]
    }
  ]
};
