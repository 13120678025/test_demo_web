// 易经六十四卦数据
const HEXAGRAM_DATA = {
    1: { name: "乾为天", trigrams: [1,1,1,1,1,1], description: "乾：元亨利贞。", interpretation: "乾卦象征天，代表刚健、进取之意。此卦预示着事业可成，但需自强不息，持之以恒。" },
    2: { name: "坤为地", trigrams: [0,0,0,0,0,0], description: "坤：元亨，利牝马之贞。", interpretation: "坤卦象征地，代表柔顺、包容。应以柔克刚，顺势而为，厚德载物。" },
    3: { name: "水雷屯", trigrams: [0,1,0,0,0,1], description: "屯：元亨利贞。勿用有攸往，利建侯。", interpretation: "屯卦象征万物初生，艰难险阻。需谨慎行事，稳扎稳打，不可冒进。" },
    4: { name: "山水蒙", trigrams: [1,0,0,0,1,0], description: "蒙：亨。匪我求童蒙，童蒙求我。", interpretation: "蒙卦代表启蒙、教育。当前处于迷茫状态，需虚心求教，积累经验。" },
    5: { name: "水天需", trigrams: [0,1,0,1,1,1], description: "需：有孚，光亨，贞吉。利涉大川。", interpretation: "需卦象征等待，时机未到。需要耐心等待，积蓄力量，时机成熟自然顺利。" },
    6: { name: "天水讼", trigrams: [1,1,1,0,1,0], description: "讼：有孚，窒惕，中吉，终凶。利见大人，不利涉大川。", interpretation: "讼卦代表争讼、纷争。应避免正面冲突，通过和解方式解决问题。" },
    7: { name: "地水师", trigrams: [0,0,0,0,1,0], description: "师：贞，丈人吉，无咎。", interpretation: "师卦象征军队、纪律。需要严明纪律，统一行动，方能取得成功。" },
    8: { name: "水地比", trigrams: [0,1,0,0,0,0], description: "比：吉。原筮，元永贞，无咎。", interpretation: "比卦代表亲近、团结。应主动寻求合作，建立良好关系，互助共赢。" },
    9: { name: "风天小畜", trigrams: [0,1,1,1,1,1], description: "小畜：亨。密云不雨，自我西郊。", interpretation: "小畜卦象征小有积蓄。当前力量有限，应积小成多，循序渐进。" },
    10: { name: "天泽履", trigrams: [1,1,1,1,1,0], description: "履：履虎尾，不咥人，亨。", interpretation: "履卦代表行走、礼节。行事需谨慎小心，遵守规则，方能平安。" },
    11: { name: "地天泰", trigrams: [0,0,0,1,1,1], description: "泰：小往大来，吉亨。", interpretation: "泰卦象征通泰、和谐。天地交泰，万事亨通，是吉祥之卦。" },
    12: { name: "天地否", trigrams: [1,1,1,0,0,0], description: "否：否之匪人，不利君子贞，大往小来。", interpretation: "否卦代表闭塞、不通。当前运势不佳，应韬光养晦，等待时机。" },
    13: { name: "天火同人", trigrams: [1,1,1,1,0,1], description: "同人：同人于野，亨。利涉大川，利君子贞。", interpretation: "同人卦象征团结、同心。应团结志同道合之人，共同奋斗。" },
    14: { name: "火天大有", trigrams: [1,0,1,1,1,1], description: "大有：元亨。", interpretation: "大有卦代表丰收、富有。当前形势大好，但需居安思危，谦虚谨慎。" },
    15: { name: "地山谦", trigrams: [0,0,0,1,0,0], description: "谦：亨，君子有终。", interpretation: "谦卦象征谦虚、谦逊。谦虚使人进步，应保持谦卑态度，必有善果。" },
    16: { name: "雷地豫", trigrams: [0,0,1,0,0,0], description: "豫：利建侯行师。", interpretation: "豫卦代表愉悦、安乐。心情舒畅，但不可过度享乐，应适度而为。" },
    17: { name: "泽雷随", trigrams: [1,1,0,0,0,1], description: "随：元亨利贞，无咎。", interpretation: "随卦象征跟随、顺从。应审时度势，顺应形势，随机应变。" },
    18: { name: "山风蛊", trigrams: [1,0,0,0,1,1], description: "蛊：元亨，利涉大川。先甲三日，后甲三日。", interpretation: "蛊卦代表腐败、整治。需要改革创新，破除陈规，重新出发。" },
    19: { name: "地泽临", trigrams: [0,0,0,1,1,0], description: "临：元亨利贞。至于八月有凶。", interpretation: "临卦象征临近、督导。当前形势有利，应把握时机，积极作为。" },
    20: { name: "风地观", trigrams: [0,1,1,0,0,0], description: "观：盥而不荐，有孚颙若。", interpretation: "观卦代表观察、观望。应仔细观察形势，深入思考，再做决定。" },
    21: { name: "火雷噬嗑", trigrams: [1,0,1,0,0,1], description: "噬嗑：亨。利用狱。", interpretation: "噬嗑卦象征咬合、整治。应果断处理问题，清除障碍，恢复秩序。" },
    22: { name: "山火贲", trigrams: [1,0,0,1,0,1], description: "贲：亨。小利有攸往。", interpretation: "贲卦代表装饰、文饰。外表华美，但应注重内在修养，内外兼修。" },
    23: { name: "山地剥", trigrams: [1,0,0,0,0,0], description: "剥：不利有攸往。", interpretation: "剥卦象征剥落、衰败。当前不宜行动，应保存实力，等待转机。" },
    24: { name: "地雷复", trigrams: [0,0,0,0,0,1], description: "复：亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往。", interpretation: "复卦代表复返、恢复。否极泰来，运势开始好转，可适当行动。" },
    25: { name: "天雷无妄", trigrams: [1,1,1,0,0,1], description: "无妄：元亨利贞。其匪正有眚，不利有攸往。", interpretation: "无妄卦象征无妄之灾。行事应循正道，不可投机取巧，以免招灾。" },
    26: { name: "山天大畜", trigrams: [1,0,0,1,1,1], description: "大畜：利贞，不家食吉，利涉大川。", interpretation: "大畜卦代表大量积蓄。应不断学习积累，厚积薄发，方能成就大业。" },
    27: { name: "山雷颐", trigrams: [1,0,0,0,0,1], description: "颐：贞吉。观颐，自求口实。", interpretation: "颐卦象征颐养、修养。应注重身心调养，谨言慎行，自求多福。" },
    28: { name: "泽风大过", trigrams: [1,1,0,0,1,1], description: "大过：栋桡。利有攸往，亨。", interpretation: "大过卦代表过度、危机。当前负担过重，应减轻负担，寻求支持。" },
    29: { name: "坎为水", trigrams: [0,1,0,0,1,0], description: "坎：习坎，有孚，维心亨，行有尚。", interpretation: "坎卦象征险难、困境。当前险象环生，应保持信心，坚持不懈。" },
    30: { name: "离为火", trigrams: [1,0,1,1,0,1], description: "离：利贞，亨。畜牝牛，吉。", interpretation: "离卦代表光明、依附。应明辨是非，依附正道，方能光明磊落。" },
    31: { name: "泽山咸", trigrams: [1,1,0,1,0,0], description: "咸：亨，利贞，取女吉。", interpretation: "咸卦象征感应、相互吸引。男女相合，事物感应，和谐共处。" },
    32: { name: "雷风恒", trigrams: [0,0,1,0,1,1], description: "恒：亨，无咎，利贞，利有攸往。", interpretation: "恒卦代表恒久、持久。应保持恒心，持之以恒，方能成就事业。" },
    33: { name: "天山遁", trigrams: [1,1,1,1,0,0], description: "遁：亨，小利贞。", interpretation: "遁卦象征退避、隐退。识时务者为俊杰，适时退让，保全实力。" },
    34: { name: "雷天大壮", trigrams: [0,0,1,1,1,1], description: "大壮：利贞。", interpretation: "大壮卦代表强壮、强盛。当前实力雄厚，但应谨防刚愎自用。" },
    35: { name: "火地晋", trigrams: [1,0,1,0,0,0], description: "晋：康侯用锡马蕃庶，昼日三接。", interpretation: "晋卦象征晋升、进步。运势上升，事业顺利，应把握机会，积极进取。" },
    36: { name: "地火明夷", trigrams: [0,0,0,1,0,1], description: "明夷：利艰贞。", interpretation: "明夷卦代表光明受损。当前处境艰难，应韬光养晦，保护自己。" },
    37: { name: "风火家人", trigrams: [0,1,1,1,0,1], description: "家人：利女贞。", interpretation: "家人卦象征家庭、家族。应注重家庭和睦，各司其职，家和万事兴。" },
    38: { name: "火泽睽", trigrams: [1,0,1,1,1,0], description: "睽：小事吉。", interpretation: "睽卦代表背离、乖违。意见不合，应求同存异，和而不同。" },
    39: { name: "水山蹇", trigrams: [0,1,0,1,0,0], description: "蹇：利西南，不利东北；利见大人，贞吉。", interpretation: "蹇卦象征艰难、困顿。当前困难重重，应寻求帮助，共度难关。" },
    40: { name: "雷水解", trigrams: [0,0,1,0,1,0], description: "解：利西南，无所往，其来复吉。有攸往，夙吉。", interpretation: "解卦代表解除、化解。困难开始解除，应把握时机，果断行动。" },
    41: { name: "山泽损", trigrams: [1,0,0,1,1,0], description: "损：有孚，元吉，无咎，可贞，利有攸往。曷之用，二簋可用享。", interpretation: "损卦象征减损、节制。应减少欲望，节俭度日，损己利人。" },
    42: { name: "风雷益", trigrams: [0,1,1,0,0,1], description: "益：利有攸往，利涉大川。", interpretation: "益卦代表增益、获益。当前形势有利，应把握机会，努力进取。" },
    43: { name: "泽天夬", trigrams: [1,1,0,1,1,1], description: "夬：扬于王庭，孚号，有厉，告自邑，不利即戎，利有攸往。", interpretation: "夬卦象征决断、决裂。应果断决策，但需慎重考虑，避免冲动。" },
    44: { name: "天风姤", trigrams: [1,1,1,0,1,1], description: "姤：女壮，勿用取女。", interpretation: "姤卦代表相遇、邂逅。意外相遇，应谨慎对待，明辨是非。" },
    45: { name: "泽地萃", trigrams: [1,1,0,0,0,0], description: "萃：亨。王假有庙，利见大人，亨，利贞。用大牲吉，利有攸往。", interpretation: "萃卦象征聚集、团聚。人心凝聚，应团结众人，共谋大事。" },
    46: { name: "地风升", trigrams: [0,0,0,0,1,1], description: "升：元亨，用见大人，勿恤，南征吉。", interpretation: "升卦代表上升、晋升。运势上升，事业顺利，应积极进取。" },
    47: { name: "泽水困", trigrams: [1,1,0,0,1,0], description: "困：亨，贞，大人吉，无咎，有言不信。", interpretation: "困卦象征困境、穷困。当前处境困难，应保持信心，坚持原则。" },
    48: { name: "水风井", trigrams: [0,1,0,0,1,1], description: "井：改邑不改井，无丧无得，往来井井。汔至亦未繘井，羸其瓶，凶。", interpretation: "井卦代表水井、供养。应默默奉献，服务他人，方能长久。" },
    49: { name: "泽火革", trigrams: [1,1,0,1,0,1], description: "革：己日乃孚，元亨利贞，悔亡。", interpretation: "革卦象征变革、革新。时机成熟，应勇于变革，推陈出新。" },
    50: { name: "火风鼎", trigrams: [1,0,1,0,1,1], description: "鼎：元吉，亨。", interpretation: "鼎卦代表鼎器、稳定。根基稳固，应继往开来，创造辉煌。" },
    51: { name: "震为雷", trigrams: [0,0,1,0,0,1], description: "震：亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。", interpretation: "震卦象征震动、警醒。突发事件，应保持镇定，从容应对。" },
    52: { name: "艮为山", trigrams: [1,0,0,1,0,0], description: "艮：艮其背，不获其身，行其庭，不见其人，无咎。", interpretation: "艮卦代表停止、静止。应适时止步，反思总结，积蓄力量。" },
    53: { name: "风山渐", trigrams: [0,1,1,1,0,0], description: "渐：女归吉，利贞。", interpretation: "渐卦象征渐进、循序渐进。应按部就班，稳扎稳打，不可急功近利。" },
    54: { name: "雷泽归妹", trigrams: [0,0,1,1,1,0], description: "归妹：征凶，无攸利。", interpretation: "归妹卦代表少女出嫁。应谨慎行事，不宜冒进，三思而后行。" },
    55: { name: "雷火丰", trigrams: [0,0,1,1,0,1], description: "丰：亨。王假之，勿忧，宜日中。", interpretation: "丰卦象征丰盛、丰收。当前形势大好，应把握机会，但需居安思危。" },
    56: { name: "火山旅", trigrams: [1,0,1,1,0,0], description: "旅：小亨，旅贞吉。", interpretation: "旅卦代表旅行、漂泊。在外奔波，应谨慎小心，谦虚待人。" },
    57: { name: "巽为风", trigrams: [0,1,1,0,1,1], description: "巽：小亨，利有攸往，利见大人。", interpretation: "巽卦象征风、顺从。应顺势而为，灵活应变，柔顺处事。" },
    58: { name: "兑为泽", trigrams: [1,1,0,1,1,0], description: "兑：亨，利贞。", interpretation: "兑卦代表喜悦、交流。心情愉悦，但应保持中正，不可过度。" },
    59: { name: "风水涣", trigrams: [0,1,1,0,1,0], description: "涣：亨。王假有庙，利涉大川，利贞。", interpretation: "涣卦象征涣散、离散。应团结人心，凝聚力量，化解分歧。" },
    60: { name: "水泽节", trigrams: [0,1,0,1,1,0], description: "节：亨。苦节不可贞。", interpretation: "节卦代表节制、节俭。应适度节制，把握分寸，过犹不及。" },
    61: { name: "风泽中孚", trigrams: [0,1,1,1,1,0], description: "中孚：豚鱼吉，利涉大川，利贞。", interpretation: "中孚卦象征诚信、真诚。应以诚待人，真诚交往，建立信任。" },
    62: { name: "雷山小过", trigrams: [0,0,1,1,0,0], description: "小过：亨，利贞，可小事，不可大事。飞鸟遗之音，不宜上宜下，大吉。", interpretation: "小过卦代表小有过失。应谨慎行事，做好小事，不宜冒险。" },
    63: { name: "水火既济", trigrams: [0,1,0,1,0,1], description: "既济：亨，小利贞，初吉终乱。", interpretation: "既济卦象征完成、成功。事业有成，但应居安思危，保持警惕。" },
    64: { name: "火水未济", trigrams: [1,0,1,0,1,0], description: "未济：亨，小狐汔济，濡其尾，无攸利。", interpretation: "未济卦代表未完成。事业尚未完成，应继续努力，善始善终。" }
};

// 爻辞数据（简化版）
const LINE_TEXTS = {
    1: ["初九：潜龙勿用。", "九二：见龙在田，利见大人。", "九三：君子终日乾乾，夕惕若厉，无咎。", 
        "九四：或跃在渊，无咎。", "九五：飞龙在天，利见大人。", "上九：亢龙有悔。"],
    2: ["初六：履霜，坚冰至。", "六二：直方大，不习无不利。", "六三：含章可贞，或从王事，无成有终。",
        "六四：括囊，无咎无誉。", "六五：黄裳，元吉。", "上六：龙战于野，其血玄黄。"]
    // 其他卦的爻辞可以继续补充
};

// 获取卦象信息
function getHexagramInfo(lines) {
    // 将爻数组转换为二进制数（从下往上）
    let binary = '';
    for (let i = 0; i < 6; i++) {
        binary += lines[i] % 2 === 1 ? '1' : '0';
    }
    
    // 根据二进制查找对应的卦
    for (let id in HEXAGRAM_DATA) {
        const hexagram = HEXAGRAM_DATA[id];
        let hexBinary = '';
        for (let i = 0; i < 6; i++) {
            hexBinary += hexagram.trigrams[i];
        }
        if (binary === hexBinary) {
            return { id: parseInt(id), ...hexagram };
        }
    }
    
    // 如果没找到，返回默认卦
    return { id: 1, ...HEXAGRAM_DATA[1] };
}

// 获取变卦
function getChangedHexagram(originalLines, changingLines) {
    const changedLines = [...originalLines];
    changingLines.forEach(index => {
        // 老阳(9)变阴，老阴(6)变阳
        if (changedLines[index] === 9) {
            changedLines[index] = 8; // 变为少阴
        } else if (changedLines[index] === 6) {
            changedLines[index] = 7; // 变为少阳
        }
    });
    return changedLines;
}
