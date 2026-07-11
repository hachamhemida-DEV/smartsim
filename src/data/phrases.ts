import type { PhraseEntry } from "../types/models";

/**
 * 40+ phrase entries across 6 situation packs.
 * Each entry has literal (machine translation), contextual (what people actually say),
 * and a cultural note. Written with Algerian Darja pragmatics, not MSA.
 *
 * Languages: en = English, fr = French, ar = Algerian Arabic (Darja)
 */
export const phrases: PhraseEntry[] = [
  // ============ ARRIVAL (7 entries) ============
  {
    id: "arr-1",
    situation: "arrival",
    source: { en: "Hello, I just arrived", fr: "Bonjour, je viens d'arriver", ar: "مرحباً، لقد وصلت للتو" },
    literal: { en: "Hello, I just arrived", fr: "Bonjour, je viens d'arriver", ar: "مرحباً، لقد وصلت للتو" },
    contextual: { en: "Salam! I just got here", fr: "Salam ! Je viens d'arriver", ar: "سلام! أنا جيت دروك" },
    note: {
      en: "Start with 'Salam' — it works across all registers in Algeria and signals respect. A handshake is standard with men; with women, wait for them to extend their hand first.",
      fr: "Commencez par « Salam » — ça marche dans tous les contextes en Algérie et montre du respect. La poignée de main est standard avec les hommes ; avec les femmes, attendez qu'elles tendent la main.",
      ar: "ابدأ بـ «سلام» — تمشي في كل المواقف في الجزائر وتبيّن الاحترام. المصافحة عادية مع الرجال، مع النساء استنّى هي تمد يدها."
    },
    tags: ["greeting", "first-contact"]
  },
  {
    id: "arr-2",
    situation: "arrival",
    source: { en: "Where is the baggage claim?", fr: "Où est la récupération des bagages ?", ar: "أين استلام الأمتعة؟" },
    literal: { en: "Where is the baggage claim?", fr: "Où est la récupération des bagages ?", ar: "أين استلام الأمتعة؟" },
    contextual: { en: "Where do I get my bags?", fr: "Les bagages, c'est par où ?", ar: "وين نلقى الباقاج؟" },
    note: {
      en: "'Bagage' (French loanword) is what everyone says in Algeria, not the MSA 'أمتعة'. Point and ask — airport staff will usually walk you there.",
      fr: "Tout le monde dit « bagage » en Algérie. Le personnel de l'aéroport vous accompagnera souvent.",
      ar: "الكل يقول «باقاج» في الجزائر، ماشي «أمتعة». أشر واسأل — عمّال المطار غالباً يوريوك الطريق."
    },
    tags: ["airport", "directions"]
  },
  {
    id: "arr-3",
    situation: "arrival",
    source: { en: "I need to exchange money", fr: "Je dois changer de l'argent", ar: "أحتاج لتبديل العملة" },
    literal: { en: "I need to exchange money", fr: "Je dois changer de l'argent", ar: "أحتاج لتبديل العملة" },
    contextual: { en: "Where can I change money?", fr: "Où je peux changer ?", ar: "وين نبدّل الصرف؟" },
    note: {
      en: "Official exchange is at banks and airport bureaux. The parallel market ('square') offers better rates but is informal. Never discuss amounts loudly in public.",
      fr: "Le change officiel est aux banques et bureaux de l'aéroport. Le marché parallèle (« le square ») offre de meilleurs taux mais est informel. Ne discutez jamais les montants à voix haute.",
      ar: "الصرف الرسمي في البنوك ومكاتب المطار. السوق الموازي («السكوار») فيه سعر خير بصح ماشي رسمي. ما تهدرش على المبالغ بصوت عالي."
    },
    tags: ["money", "exchange", "practical"]
  },
  {
    id: "arr-4",
    situation: "arrival",
    source: { en: "Is there Wi-Fi here?", fr: "Il y a du Wi-Fi ici ?", ar: "هل يوجد واي فاي هنا؟" },
    literal: { en: "Is there Wi-Fi here?", fr: "Il y a du Wi-Fi ici ?", ar: "هل يوجد واي فاي هنا؟" },
    contextual: { en: "Is there Wi-Fi?", fr: "Y a le Wi-Fi ?", ar: "كاين الويفي؟" },
    note: {
      en: "'Kayen' (كاين) means 'is there' in Darja — it's the most common way to ask about availability of anything. Wi-Fi at airports can be slow; your Smart Sim data may be more reliable.",
      fr: "« Kayen » (كاين) veut dire « il y a » en Darja — c'est la façon la plus courante de demander. Le Wi-Fi des aéroports peut être lent ; vos données Smart Sim seront plus fiables.",
      ar: "«كاين» هي أكثر كلمة تستعملها باش تسأل على أي حاجة. الويفي تاع المطار يقدر يكون بطيء، الشريحة تاعك تكون خير."
    },
    tags: ["connectivity", "practical"]
  },
  {
    id: "arr-5",
    situation: "arrival",
    source: { en: "How do I get to the city centre?", fr: "Comment aller au centre-ville ?", ar: "كيف أصل إلى وسط المدينة؟" },
    literal: { en: "How do I get to the city centre?", fr: "Comment aller au centre-ville ?", ar: "كيف أصل إلى وسط المدينة؟" },
    contextual: { en: "How do I get downtown?", fr: "Comment j'arrive au centre ?", ar: "كيفاش نروح للوسط؟" },
    note: {
      en: "In Constantine, 'el-west' (الوسط) means downtown. A taxi from the airport should cost around 500-800 DZD. Agree on the price before getting in — meters are not used.",
      fr: "À Constantine, « el-west » (الوسط) veut dire le centre. Un taxi depuis l'aéroport coûte environ 500-800 DZD. Convenez du prix avant de monter — les compteurs ne sont pas utilisés.",
      ar: "في قسنطينة، «الوسط» هو السونتر. التاكسي من المطار يكلّف 500-800 دج تقريباً. اتفق على السعر قبل ما تركب — ما كانش كونتور."
    },
    tags: ["transport", "taxi", "directions"]
  },
  {
    id: "arr-6",
    situation: "arrival",
    source: { en: "I have a reservation at this hotel", fr: "J'ai une réservation dans cet hôtel", ar: "لدي حجز في هذا الفندق" },
    literal: { en: "I have a reservation at this hotel", fr: "J'ai une réservation dans cet hôtel", ar: "لدي حجز في هذا الفندق" },
    contextual: { en: "I booked a room here", fr: "J'ai réservé une chambre ici", ar: "أنا حاجز هنا" },
    note: {
      en: "'Hajez' (حاجز) is universally understood. Have your booking reference ready — many hotels still use paper ledgers alongside digital systems.",
      fr: "« Hajez » (حاجز) est compris partout. Ayez votre référence de réservation — beaucoup d'hôtels utilisent encore des registres papier.",
      ar: "«حاجز» مفهومة في كل بلاصة. حضّر رقم الحجز — بزاف تاع الفنادق مازالهم يخدمو بالدفتر."
    },
    tags: ["hotel", "booking"]
  },
  {
    id: "arr-7",
    situation: "arrival",
    source: { en: "Thank you for your help", fr: "Merci pour votre aide", ar: "شكراً لمساعدتكم" },
    literal: { en: "Thank you for your help", fr: "Merci pour votre aide", ar: "شكراً لمساعدتكم" },
    contextual: { en: "Thank you, that's very kind", fr: "Merci, c'est gentil", ar: "يعطيك الصحة، بارك الله فيك" },
    note: {
      en: "'Ya'tik essaha' (يعطيك الصحة) literally means 'may God give you health' — it's THE Algerian thank-you. More heartfelt than 'merci' or 'shukran'. Use it generously.",
      fr: "« Ya'tik essaha » (يعطيك الصحة) veut dire littéralement « que Dieu te donne la santé » — c'est LE remerciement algérien. Plus sincère que « merci ». Utilisez-le sans modération.",
      ar: "«يعطيك الصحة» هي أحسن طريقة باش تشكر في الجزائر. أقوى من «شكراً» أو «ميرسي». استعملها بزاف."
    },
    tags: ["courtesy", "essential"]
  },

  // ============ TRANSPORT (7 entries) ============
  {
    id: "trn-1",
    situation: "transport",
    source: { en: "How much is the fare?", fr: "C'est combien le trajet ?", ar: "كم أجرة الرحلة؟" },
    literal: { en: "How much is the fare?", fr: "C'est combien le trajet ?", ar: "كم أجرة الرحلة؟" },
    contextual: { en: "How much to get there?", fr: "C'est combien pour y aller ?", ar: "بشحال لهيه؟" },
    note: {
      en: "'Besh'hal' (بشحال) is Darja for 'how much.' Always ask before getting in. Nodding means yes. Prices are usually non-negotiable for shared taxis (louage), negotiable for private.",
      fr: "« Besh'hal » (بشحال) veut dire « combien » en Darja. Demandez toujours avant de monter. Les prix sont généralement fixes pour les taxis collectifs (louage), négociables en privé.",
      ar: "«بشحال» هي كيفاش تسأل على السعر بالدارجة. دير سؤال قبل ما تركب. السعر ثابت في اللواج، ينتقاش في التاكسي الخاص."
    },
    tags: ["taxi", "price", "essential"]
  },
  {
    id: "trn-2",
    situation: "transport",
    source: { en: "Please take me to this address", fr: "Emmenez-moi à cette adresse s'il vous plaît", ar: "من فضلك خذني إلى هذا العنوان" },
    literal: { en: "Please take me to this address", fr: "Emmenez-moi à cette adresse s'il vous plaît", ar: "من فضلك خذني إلى هذا العنوان" },
    contextual: { en: "Take me here please", fr: "Amenez-moi là svp", ar: "وصّلني لهنا يرحم والديك" },
    note: {
      en: "'Yarham walidik' (يرحم والديك) — 'may God bless your parents' — is the polite way to ask for anything in Algeria. It softens any request and is expected, not obsequious.",
      fr: "« Yarham walidik » (يرحم والديك) — « que Dieu bénisse tes parents » — c'est la façon polie de demander quoi que ce soit en Algérie. Ça adoucit toute demande.",
      ar: "«يرحم والديك» هي الطريقة اللبقة باش تطلب أي حاجة في الجزائر. تليّن أي طلب وهي عادية، ماشي مبالغة."
    },
    tags: ["taxi", "directions", "courtesy"]
  },
  {
    id: "trn-3",
    situation: "transport",
    source: { en: "Stop here please", fr: "Arrêtez-vous ici s'il vous plaît", ar: "توقف هنا من فضلك" },
    literal: { en: "Stop here please", fr: "Arrêtez-vous ici s'il vous plaît", ar: "توقف هنا من فضلك" },
    contextual: { en: "Right here is fine", fr: "Ici c'est bon", ar: "هنا واقف" },
    note: {
      en: "'Hna waqef' (هنا واقف) — literally 'here, standing.' Short and universally understood. In a shared taxi, you can also knock on the dashboard to signal your stop.",
      fr: "« Hna waqef » (هنا واقف) — littéralement « ici, debout ». Court et compris partout. Dans un taxi collectif, vous pouvez aussi toquer sur le tableau de bord.",
      ar: "«هنا واقف» — قصيرة ومفهومة. في اللواج، تقدر تدق على التابلو باش توقّف."
    },
    tags: ["taxi", "essential"]
  },
  {
    id: "trn-4",
    situation: "transport",
    source: { en: "Where is the bus station?", fr: "Où est la gare routière ?", ar: "أين محطة الحافلات؟" },
    literal: { en: "Where is the bus station?", fr: "Où est la gare routière ?", ar: "أين محطة الحافلات؟" },
    contextual: { en: "Where's the bus station?", fr: "La gare routière, c'est où ?", ar: "وين المحطة؟" },
    note: {
      en: "In Constantine, ask for 'el-mahatta' (المحطة). The main bus station is at the east side of the city. Intercity buses are called 'car' (from French 'autocar').",
      fr: "À Constantine, demandez « el-mahatta » (المحطة). La gare routière principale est à l'est de la ville. Les bus interurbains s'appellent « car ».",
      ar: "في قسنطينة، اسأل على «المحطة». المحطة الرئيسية في الشرق تاع المدينة. الحافلات بين المدن يقولولها «كار»."
    },
    tags: ["bus", "directions"]
  },
  {
    id: "trn-5",
    situation: "transport",
    source: { en: "Can I sit here?", fr: "Je peux m'asseoir ici ?", ar: "هل يمكنني الجلوس هنا؟" },
    literal: { en: "Can I sit here?", fr: "Je peux m'asseoir ici ?", ar: "هل يمكنني الجلوس هنا؟" },
    contextual: { en: "Is this seat free?", fr: "C'est libre ici ?", ar: "هذي خالية؟" },
    note: {
      en: "In shared transport, men and women often sit separately. If you're a man, don't sit next to a woman if other seats are available — it's not a rule, but it's the norm.",
      fr: "Dans les transports en commun, hommes et femmes s'assoient souvent séparément. Si vous êtes un homme, ne vous asseyez pas à côté d'une femme si d'autres places sont libres.",
      ar: "في النقل المشترك، الرجال والنساء يقعدو منفصلين غالباً. إذا كنت راجل، ما تقعدش حدا مرا إذا كان كاين بلايص خاوية."
    },
    tags: ["etiquette", "transport"]
  },
  {
    id: "trn-6",
    situation: "transport",
    source: { en: "Is this the road to the bridge?", fr: "C'est la route du pont ?", ar: "هل هذا الطريق إلى الجسر؟" },
    literal: { en: "Is this the road to the bridge?", fr: "C'est la route du pont ?", ar: "هل هذا الطريق إلى الجسر؟" },
    contextual: { en: "Is this the way to the bridge?", fr: "C'est par là le pont ?", ar: "هذا الطريق للقنطرة؟" },
    note: {
      en: "Constantine has 8 bridges — specify which one! Sidi M'Cid is the famous suspension bridge. Locals say 'el-qantra' (القنطرة) for bridge. Pont Sidi Rached is the large stone viaduct.",
      fr: "Constantine a 8 ponts — précisez lequel ! Sidi M'Cid est le célèbre pont suspendu. Les locaux disent « el-qantra » (القنطرة). Pont Sidi Rached est le grand viaduc en pierre.",
      ar: "قسنطينة فيها 8 قناطر — حدد أيّ وحدة! سيدي مسيد هي القنطرة المعلّقة الشهيرة. الناس يقولو «القنطرة» للجسر."
    },
    tags: ["directions", "constantine", "landmarks"]
  },
  {
    id: "trn-7",
    situation: "transport",
    source: { en: "I'm lost", fr: "Je suis perdu", ar: "أنا ضائع" },
    literal: { en: "I'm lost", fr: "Je suis perdu", ar: "أنا ضائع" },
    contextual: { en: "I can't find my way", fr: "Je me suis perdu", ar: "تلفت، ما نعرفش الطريق" },
    note: {
      en: "'Tleft' (تلفت) means 'I got lost' in Darja. Don't worry — Algerians will go out of their way to help. Someone may physically walk you to your destination. Accept the kindness.",
      fr: "« Tleft » (تلفت) veut dire « je me suis perdu » en Darja. Ne vous inquiétez pas — les Algériens se mettront en quatre pour vous aider. Quelqu'un vous accompagnera peut-être à pied.",
      ar: "«تلفت» — ما تقلقش، الجزائريين يعاونوك حتى لو خصهم يمشو معاك للبلاصة. اقبل هاد اللطف."
    },
    tags: ["directions", "essential", "safety"]
  },

  // ============ HOTEL (7 entries) ============
  {
    id: "htl-1",
    situation: "hotel",
    source: { en: "I'd like to check in", fr: "Je voudrais faire le check-in", ar: "أريد تسجيل الدخول" },
    literal: { en: "I'd like to check in", fr: "Je voudrais faire le check-in", ar: "أريد تسجيل الدخول" },
    contextual: { en: "I have a booking, I'm checking in", fr: "J'ai une réservation, je fais le check-in", ar: "عندي حجز، جيت نسجّل" },
    note: {
      en: "Hotels in Algeria require your passport for registration — it's a legal requirement (fiche de police). Don't be alarmed if they keep it briefly. They'll return it.",
      fr: "Les hôtels en Algérie exigent votre passeport — c'est une obligation légale (fiche de police). Ne vous inquiétez pas s'ils le gardent brièvement.",
      ar: "الفنادق في الجزائر تطلب الباسبور — هذا واجب قانوني (فيش تاع البوليس). ما تقلقش إذا حبسوه شوية."
    },
    tags: ["hotel", "checkin", "legal"]
  },
  {
    id: "htl-2",
    situation: "hotel",
    source: { en: "Is breakfast included?", fr: "Le petit-déjeuner est inclus ?", ar: "هل الفطور مشمول؟" },
    literal: { en: "Is breakfast included?", fr: "Le petit-déjeuner est inclus ?", ar: "هل الفطور مشمول؟" },
    contextual: { en: "Does the room come with breakfast?", fr: "Y a le p'tit-déj avec ?", ar: "الفطور داخل مع الشومبرا؟" },
    note: {
      en: "'Choumbra' (شومبرا) from French 'chambre' is what Algerians say for hotel room. Breakfast usually includes fresh bread, butter, jam, coffee, and sometimes msemen (flatbread).",
      fr: "« Choumbra » (شومبرا) du français « chambre ». Le petit-déj comprend généralement du pain frais, beurre, confiture, café, et parfois du msemen.",
      ar: "«الشومبرا» هي الغرفة بالدارجة. الفطور عادة فيه خبز طري، زبدة، مربّى، قهوة، وساعات مسمن."
    },
    tags: ["hotel", "food", "practical"]
  },
  {
    id: "htl-3",
    situation: "hotel",
    source: { en: "The air conditioning isn't working", fr: "La climatisation ne marche pas", ar: "التكييف لا يعمل" },
    literal: { en: "The air conditioning isn't working", fr: "La climatisation ne marche pas", ar: "التكييف لا يعمل" },
    contextual: { en: "The AC is broken", fr: "La clim marche pas", ar: "الكليم ما تخدمش" },
    note: {
      en: "'Klim' (كليم) is the universal word for AC. 'Ma tekhedmesh' (ما تخدمش) = it doesn't work. Staff will usually respond quickly — hospitality pride is strong.",
      fr: "« Klim » (كليم) pour la climatisation. « Ma tekhedmesh » = ça ne marche pas. Le personnel réagira vite — la fierté de l'hospitalité est forte.",
      ar: "«الكليم ما تخدمش» — العمّال يجاوبو بسرعة عادة، لأن الضيافة حاجة مقدّسة."
    },
    tags: ["hotel", "complaint", "practical"]
  },
  {
    id: "htl-4",
    situation: "hotel",
    source: { en: "Can I have an extra towel?", fr: "Puis-je avoir une serviette supplémentaire ?", ar: "هل يمكنني الحصول على منشفة إضافية؟" },
    literal: { en: "Can I have an extra towel?", fr: "Puis-je avoir une serviette supplémentaire ?", ar: "هل يمكنني الحصول على منشفة إضافية؟" },
    contextual: { en: "Could I get another towel?", fr: "Je peux avoir une autre serviette ?", ar: "ممكن سيرفيات زايدة؟" },
    note: {
      en: "'Serviette' (French loanword) is used directly. 'Zayda' (زايدة) means 'extra/additional.' A smile goes further than formal language here.",
      fr: "« Zayda » (زايدة) veut dire « en plus ». Un sourire vaut mieux qu'un langage formel ici.",
      ar: "«ممكن» + الحاجة + «زايدة» هي الصيغة باش تطلب أي حاجة إضافية. ابتسم وخلاص."
    },
    tags: ["hotel", "request", "practical"]
  },
  {
    id: "htl-5",
    situation: "hotel",
    source: { en: "What time is checkout?", fr: "À quelle heure est le checkout ?", ar: "ما هو وقت تسجيل الخروج؟" },
    literal: { en: "What time is checkout?", fr: "À quelle heure est le checkout ?", ar: "ما هو وقت تسجيل الخروج؟" },
    contextual: { en: "When do I need to leave the room?", fr: "Je dois libérer la chambre à quelle heure ?", ar: "وقتاش نخلّي الشومبرا؟" },
    note: {
      en: "'Weqtash' (وقتاش) = 'when' in Darja. Checkout is usually 11am-12pm. Late checkout is often possible if you ask nicely — 'yarham walidik' works wonders.",
      fr: "« Weqtash » = « quand » en Darja. Le checkout est généralement 11h-12h. Le late checkout est souvent possible si vous demandez gentiment.",
      ar: "«وقتاش» = «وقتاش» بالدارجة. الخروج عادة 11-12. تقدر تطلب تأخير إذا طلبت بلطف."
    },
    tags: ["hotel", "checkout", "practical"]
  },
  {
    id: "htl-6",
    situation: "hotel",
    source: { en: "Is there a safe in the room?", fr: "Il y a un coffre-fort dans la chambre ?", ar: "هل يوجد خزنة في الغرفة؟" },
    literal: { en: "Is there a safe in the room?", fr: "Il y a un coffre-fort dans la chambre ?", ar: "هل يوجد خزنة في الغرفة؟" },
    contextual: { en: "Is there a safe for valuables?", fr: "Y a un coffre pour les affaires ?", ar: "كاين كوفر فور فالشومبرا؟" },
    note: {
      en: "Many Algerian hotels have safes at reception rather than in rooms. Ask at the front desk. Keep your passport on you — it's your key document.",
      fr: "Beaucoup d'hôtels algériens ont des coffres à la réception plutôt que dans les chambres. Demandez à l'accueil. Gardez votre passeport sur vous.",
      ar: "بزاف تاع الفنادق الكوفر فور يكون في لاكاي ماشي في الشومبرا. اسأل في لاريسيبسيون. خلّي الباسبور معاك."
    },
    tags: ["hotel", "security", "practical"]
  },
  {
    id: "htl-7",
    situation: "hotel",
    source: { en: "Can you call a taxi for me?", fr: "Pouvez-vous m'appeler un taxi ?", ar: "هل يمكنكم طلب سيارة أجرة لي؟" },
    literal: { en: "Can you call a taxi for me?", fr: "Pouvez-vous m'appeler un taxi ?", ar: "هل يمكنكم طلب سيارة أجرة لي؟" },
    contextual: { en: "Can you get me a taxi?", fr: "Vous pouvez m'appeler un taxi ?", ar: "تقدر تعيّطلي تاكسي؟" },
    note: {
      en: "'Ta'yetli' (تعيّطلي) = 'call for me.' Hotel staff will often negotiate the fare for you, which usually gets a better price. Ride-hailing apps like Yassir also work in major cities.",
      fr: "Le personnel négociera souvent le tarif pour vous, ce qui donne un meilleur prix. Les apps comme Yassir fonctionnent aussi dans les grandes villes.",
      ar: "عمّال الفندق يفاوضولك عادة ويجيبولك سعر خير. تطبيقات كيما ياسير تخدم في المدن الكبار."
    },
    tags: ["hotel", "taxi", "practical"]
  },

  // ============ RESTAURANT (7 entries) ============
  {
    id: "rst-1",
    situation: "restaurant",
    source: { en: "A table for two please", fr: "Une table pour deux s'il vous plaît", ar: "طاولة لشخصين من فضلك" },
    literal: { en: "A table for two please", fr: "Une table pour deux s'il vous plaît", ar: "طاولة لشخصين من فضلك" },
    contextual: { en: "Table for two?", fr: "Une table pour deux ?", ar: "طابلة لزوج يرحم والديك?" },
    note: {
      en: "'Tabla' (طابلة) from French 'table.' Most restaurants don't require reservations except high-end ones. Just walk in and ask. Lunch is the main meal (12-2pm).",
      fr: "La plupart des restaurants ne demandent pas de réservation sauf les haut de gamme. Entrez et demandez. Le déjeuner est le repas principal (12h-14h).",
      ar: "أغلب المطاعم ما يحتاجوش حجز. ادخل واسأل. الغداء هو الوجبة الرئيسية (12-14)."
    },
    tags: ["restaurant", "essential"]
  },
  {
    id: "rst-2",
    situation: "restaurant",
    source: { en: "What do you recommend?", fr: "Que recommandez-vous ?", ar: "ماذا تنصحون؟" },
    literal: { en: "What do you recommend?", fr: "Que recommandez-vous ?", ar: "ماذا تنصحون؟" },
    contextual: { en: "What's good today?", fr: "Qu'est-ce qui est bon aujourd'hui ?", ar: "واش كاين اليوم مليح؟" },
    note: {
      en: "Ask 'wash kayen el-youm' (واش كاين اليوم) — 'what's available today.' Many restaurants cook a daily menu. In Constantine, try Chakhchoukha (a torn flatbread stew) — the city's signature dish.",
      fr: "Demandez « wash kayen el-youm » — « qu'est-ce qu'il y a aujourd'hui ». Beaucoup cuisinent un menu du jour. À Constantine, essayez la Chakhchoukha — le plat signature.",
      ar: "اسأل «واش كاين اليوم» — بزاف تاع المطاعم يطيّبو بلا تاع اليوم. في قسنطينة، جرّب الشخشوخة — الطبق الخاص تاع المدينة."
    },
    tags: ["restaurant", "food", "constantine"]
  },
  {
    id: "rst-3",
    situation: "restaurant",
    source: { en: "I'm vegetarian", fr: "Je suis végétarien", ar: "أنا نباتي" },
    literal: { en: "I'm vegetarian", fr: "Je suis végétarien", ar: "أنا نباتي" },
    contextual: { en: "I don't eat meat", fr: "Je ne mange pas de viande", ar: "ما ناكلش اللحم" },
    note: {
      en: "Vegetarianism isn't common, so say 'ma nakelsh el-lahem' (I don't eat meat) — it's clearer than abstract labels. Salads, couscous with vegetables, and egg dishes are widely available.",
      fr: "Le végétarisme n'est pas courant, alors dites « je ne mange pas de viande » — c'est plus clair. Salades, couscous aux légumes et plats d'œufs sont disponibles.",
      ar: "«ما ناكلش اللحم» أوضح من «نباتي». السلاطة، كسكسي بالخضرة، والعجّة متوفرين."
    },
    tags: ["restaurant", "dietary", "essential"]
  },
  {
    id: "rst-4",
    situation: "restaurant",
    source: { en: "The bill please", fr: "L'addition s'il vous plaît", ar: "الحساب من فضلك" },
    literal: { en: "The bill please", fr: "L'addition s'il vous plaît", ar: "الحساب من فضلك" },
    contextual: { en: "Can I get the check?", fr: "L'addition svp", ar: "لاديسيون يرحم والديك" },
    note: {
      en: "'Ladission' (لاديسيون) from French 'l'addition.' Tipping isn't obligatory but 10% is appreciated. In casual places, round up to the nearest 100 DZD.",
      fr: "Le pourboire n'est pas obligatoire mais 10% est apprécié. Dans les endroits simples, arrondissez aux 100 DZD supérieurs.",
      ar: "البقشيش ماشي واجب بصح 10% مقدّرة. في البلايص البسيطة، كمّل للمية دينار اللي فوق."
    },
    tags: ["restaurant", "payment", "essential"]
  },
  {
    id: "rst-5",
    situation: "restaurant",
    source: { en: "This is delicious", fr: "C'est délicieux", ar: "هذا لذيذ" },
    literal: { en: "This is delicious", fr: "C'est délicieux", ar: "هذا لذيذ" },
    contextual: { en: "This is really good!", fr: "C'est trop bon !", ar: "بنين بزاف هذا!" },
    note: {
      en: "'Bnin bezzaf' (بنين بزاف) = 'very delicious' in Darja. Complimenting the food is important — the cook may come out to thank you personally. This is normal and a great honour.",
      fr: "« Bnin bezzaf » = « très bon » en Darja. Complimenter la cuisine est important — le cuisinier peut sortir pour vous remercier. C'est normal et un grand honneur.",
      ar: "«بنين بزاف» — امدح الماكلة، يقدر الطبّاخ يخرج يشكرك. هذا عادي وفخر كبير."
    },
    tags: ["restaurant", "courtesy", "essential"]
  },
  {
    id: "rst-6",
    situation: "restaurant",
    source: { en: "Can I have water?", fr: "Je peux avoir de l'eau ?", ar: "هل يمكنني الحصول على ماء؟" },
    literal: { en: "Can I have water?", fr: "Je peux avoir de l'eau ?", ar: "هل يمكنني الحصول على ماء؟" },
    contextual: { en: "Water please", fr: "De l'eau svp", ar: "لما يرحم والديك" },
    note: {
      en: "'Lma' (لما) = water. Always ask for 'eau minérale' (bottled) if you prefer — tap water is generally safe in cities but tourists often prefer bottled. Specify 'Ifri' or 'Saïda' (popular brands).",
      fr: "Demandez « eau minérale » si vous préférez de l'eau en bouteille — l'eau du robinet est sûre en ville mais les touristes préfèrent souvent les bouteilles. « Ifri » ou « Saïda » sont les marques courantes.",
      ar: "«لما» = الماء. اطلب «أو مينيرال» إذا تحب قارورة — ماء الروبيني مليح في المدن بصح السياح يفضّلو القارورة."
    },
    tags: ["restaurant", "drinks", "practical"]
  },
  {
    id: "rst-7",
    situation: "restaurant",
    source: { en: "Is this spicy?", fr: "C'est épicé ?", ar: "هل هذا حار؟" },
    literal: { en: "Is this spicy?", fr: "C'est épicé ?", ar: "هل هذا حار؟" },
    contextual: { en: "Is it hot/spicy?", fr: "C'est piquant ?", ar: "هذا حار ولا لا؟" },
    note: {
      en: "Algerian food uses harissa and chilli but usually moderately. If you can't handle spice, say 'bla felfel' (بلا فلفل) = without chilli. 'Har' (حار) means both 'hot' and 'spicy.'",
      fr: "La cuisine algérienne utilise la harissa et le piment mais modérément. Si vous ne supportez pas, dites « bla felfel » = sans piment.",
      ar: "الماكلة الجزائرية فيها هريسة وفلفل بصح ماشي بزاف. إذا ما تقدرش قول «بلا فلفل»."
    },
    tags: ["restaurant", "food", "dietary"]
  },

  // ============ SHOPPING (7 entries) ============
  {
    id: "shp-1",
    situation: "shopping",
    source: { en: "How much does this cost?", fr: "Combien ça coûte ?", ar: "كم ثمن هذا؟" },
    literal: { en: "How much does this cost?", fr: "Combien ça coûte ?", ar: "كم ثمن هذا؟" },
    contextual: { en: "How much?", fr: "C'est combien ?", ar: "بشحال هذي؟" },
    note: {
      en: "'Besh'hal hadi' (بشحال هذي) — point at the item. In souks, the first price is not the final price. In shops with price tags, the price is usually fixed. Know the difference.",
      fr: "« Besh'hal hadi » — montrez l'article. Dans les souks, le premier prix n'est pas le prix final. Dans les boutiques avec étiquettes, le prix est généralement fixe.",
      ar: "«بشحال هذي» — أشر على الحاجة. في السوق، السعر الأول ماشي النهائي. في الحوانيت اللي فيهم إتيكات، السعر ثابت."
    },
    tags: ["shopping", "price", "essential"]
  },
  {
    id: "shp-2",
    situation: "shopping",
    source: { en: "That's too expensive", fr: "C'est trop cher", ar: "هذا غالي جداً" },
    literal: { en: "That's too expensive", fr: "C'est trop cher", ar: "هذا غالي جداً" },
    contextual: { en: "That's a lot, can you do better?", fr: "C'est beaucoup, vous pouvez faire mieux ?", ar: "غالي بزاف، نقّصلي شوية" },
    note: {
      en: "'Ghaali bezzaf, naqqesli shwiya' — 'too expensive, lower it a bit.' Haggling is expected in souks but keep it friendly — it's a social exchange, not a confrontation. Smile.",
      fr: "« Ghaali bezzaf, naqqesli shwiya » — « trop cher, baissez un peu ». Le marchandage est normal dans les souks mais restez amical — c'est un échange social.",
      ar: "«غالي بزاف، نقّصلي شوية» — المساومة عادية في السوق بصح خلّيها ودّية. ابتسم."
    },
    tags: ["shopping", "haggling", "essential"]
  },
  {
    id: "shp-3",
    situation: "shopping",
    source: { en: "I'm just looking", fr: "Je regarde juste", ar: "أنا أتفرج فقط" },
    literal: { en: "I'm just looking", fr: "Je regarde juste", ar: "أنا أتفرج فقط" },
    contextual: { en: "Just browsing, thanks", fr: "Je regarde, merci", ar: "غير نشوف، يعطيك الصحة" },
    note: {
      en: "Shopkeepers in Algeria are persistent but friendly. 'Ghir nchouf' (غير نشوف) = 'just looking.' Add 'ya'tik essaha' to keep it warm. They may still offer you tea — accepting is polite.",
      fr: "Les commerçants algériens sont insistants mais amicaux. « Ghir nchouf » = « je regarde juste ». Ils peuvent vous offrir du thé — accepter est poli.",
      ar: "«غير نشوف، يعطيك الصحة» — المولات تاع الحوانيت يقترحو عليك أتاي — اقبل، هذي ضيافة."
    },
    tags: ["shopping", "browsing", "courtesy"]
  },
  {
    id: "shp-4",
    situation: "shopping",
    source: { en: "Do you have this in a different size?", fr: "Vous avez ça dans une autre taille ?", ar: "هل عندكم هذا بحجم آخر؟" },
    literal: { en: "Do you have this in a different size?", fr: "Vous avez ça dans une autre taille ?", ar: "هل عندكم هذا بحجم آخر؟" },
    contextual: { en: "Got this in another size?", fr: "Vous l'avez dans une autre taille ?", ar: "كاين تاي أخرى؟" },
    note: {
      en: "'Tay' (تاي) from French 'taille.' European sizing is used. In traditional markets, just describe what you need — they'll find it. Fitting rooms may not always be available.",
      fr: "Les tailles européennes sont utilisées. Dans les marchés traditionnels, décrivez ce qu'il vous faut. Les cabines d'essayage ne sont pas toujours disponibles.",
      ar: "«تاي» من الفرنسية «taille». القياسات الأوروبية مستعملة. في الأسواق التقليدية، وصف واش تحتاج — يلقاوهولك."
    },
    tags: ["shopping", "clothing"]
  },
  {
    id: "shp-5",
    situation: "shopping",
    source: { en: "I'll take it", fr: "Je le prends", ar: "سآخذه" },
    literal: { en: "I'll take it", fr: "Je le prends", ar: "سآخذه" },
    contextual: { en: "I'll take this one", fr: "Je prends celui-là", ar: "نديها هذي" },
    note: {
      en: "'Ndiha hadi' (نديها هذي) = 'I'll take this.' Cash is king in Algeria — most small shops don't accept cards. ATMs dispense DZD. Keep small bills for markets.",
      fr: "L'argent liquide est roi en Algérie — la plupart des petits commerces n'acceptent pas les cartes. Les distributeurs donnent des DZD. Gardez des petites coupures.",
      ar: "«نديها هذي» — الكاش هو الملك في الجزائر. أغلب الحوانيت الصغار ما يقبلوش الكارت. خلّي معاك بيي صغار."
    },
    tags: ["shopping", "payment"]
  },
  {
    id: "shp-6",
    situation: "shopping",
    source: { en: "Where can I find souvenirs?", fr: "Où trouver des souvenirs ?", ar: "أين أجد الهدايا التذكارية؟" },
    literal: { en: "Where can I find souvenirs?", fr: "Où trouver des souvenirs ?", ar: "أين أجد الهدايا التذكارية؟" },
    contextual: { en: "Where's the souvenir market?", fr: "Le marché des souvenirs, c'est où ?", ar: "وين نلقى الكادوات تاع السوفونير؟" },
    note: {
      en: "In Constantine, copperware is the traditional craft — look for engraved trays and pots in the old town (medina). Also seek out local pottery and traditional textiles (burnous, karakou).",
      fr: "À Constantine, la dinanderie est l'artisanat traditionnel — cherchez les plateaux et pots gravés dans la médina. Cherchez aussi la poterie et les textiles traditionnels.",
      ar: "في قسنطينة، النحاس هو الصنعة التقليدية — شوف الصواني والقدور المنقوشة في المدينة القديمة. فيه أيضا الفخار والبرنوس والكراكو."
    },
    tags: ["shopping", "souvenirs", "constantine"]
  },
  {
    id: "shp-7",
    situation: "shopping",
    source: { en: "Can you wrap this as a gift?", fr: "Vous pouvez emballer en cadeau ?", ar: "هل يمكنكم تغليفه كهدية؟" },
    literal: { en: "Can you wrap this as a gift?", fr: "Vous pouvez emballer en cadeau ?", ar: "هل يمكنكم تغليفه كهدية؟" },
    contextual: { en: "Can you gift-wrap this?", fr: "Vous pouvez l'emballer en cadeau ?", ar: "تقدر تلفّهالي كادو؟" },
    note: {
      en: "Gift wrapping isn't standard in most shops. In larger stores they may have it. In markets, items come in a plastic bag. Bring your own wrapping if presentation matters.",
      fr: "L'emballage cadeau n'est pas standard dans la plupart des boutiques. Dans les grands magasins, c'est possible. Au marché, les articles viennent en sac plastique.",
      ar: "تغليف الكادوات ماشي عادي في أغلب الحوانيت. في الماقازانات الكبار يقدر يكون. في السوق، الحوايج تجي في ساشي."
    },
    tags: ["shopping", "gifts"]
  },

  // ============ EMERGENCY (5 entries) ============
  {
    id: "emg-1",
    situation: "emergency",
    source: { en: "I need help!", fr: "J'ai besoin d'aide !", ar: "أحتاج مساعدة!" },
    literal: { en: "I need help!", fr: "J'ai besoin d'aide !", ar: "أحتاج مساعدة!" },
    contextual: { en: "Help me please!", fr: "Aidez-moi !", ar: "عاونوني يرحم والديكم!" },
    note: {
      en: "'Aawnouni' (عاونوني) = 'help me!' — shouting this will immediately draw attention. Algerians will rally to help. In Constantine, police stations are near major bridges.",
      fr: "« Aawnouni » = « aidez-moi ! » — crier cela attirera l'attention immédiatement. Les Algériens se mobiliseront. À Constantine, les commissariats sont près des grands ponts.",
      ar: "«عاونوني» — إذا صرختيها، الناس يجيو يعاونوك فورا. في قسنطينة، مراكز الشرطة قريبة من القناطر الكبار."
    },
    tags: ["emergency", "essential", "safety"]
  },
  {
    id: "emg-2",
    situation: "emergency",
    source: { en: "I need a doctor", fr: "J'ai besoin d'un médecin", ar: "أحتاج طبيب" },
    literal: { en: "I need a doctor", fr: "J'ai besoin d'un médecin", ar: "أحتاج طبيب" },
    contextual: { en: "I need to see a doctor", fr: "Il me faut un médecin", ar: "نحتاج طبيب يرحم والديك" },
    note: {
      en: "'Tobib' (طبيب) is understood by everyone. Most doctors in Algeria speak French. For urgent care, say 'les urgences' (الأورجونس) — emergency department. Private clinics are generally faster.",
      fr: "La plupart des médecins parlent français. Pour les urgences, dites « les urgences ». Les cliniques privées sont généralement plus rapides.",
      ar: "«نحتاج طبيب» — أغلب الأطباء يهدرو بالفرنسية. للحالات المستعجلة، قول «الأورجونس». الكلينيك الخاصة أسرع عادة."
    },
    tags: ["emergency", "medical", "essential"]
  },
  {
    id: "emg-3",
    situation: "emergency",
    source: { en: "Call the police", fr: "Appelez la police", ar: "اتصلوا بالشرطة" },
    literal: { en: "Call the police", fr: "Appelez la police", ar: "اتصلوا بالشرطة" },
    contextual: { en: "We need the police", fr: "Il faut appeler la police", ar: "عيّطو للبوليس" },
    note: {
      en: "'Ayyto lel-boulis' (عيّطو للبوليس). Tourist police in Algeria are trained to assist foreign visitors. In major cities, look for 'Sûreté Nationale' officers. Stay calm and present your passport.",
      fr: "La police touristique est formée pour aider les visiteurs étrangers. Cherchez les officiers de la « Sûreté Nationale ». Restez calme et présentez votre passeport.",
      ar: "«عيّطو للبوليس» — الشرطة السياحية مكوّنة باش تعاون الزوار. شوف ضبّاط «الأمن الوطني». ابقى هادي وبيّن الباسبور."
    },
    tags: ["emergency", "police", "essential"]
  },
  {
    id: "emg-4",
    situation: "emergency",
    source: { en: "I lost my passport", fr: "J'ai perdu mon passeport", ar: "فقدت جواز سفري" },
    literal: { en: "I lost my passport", fr: "J'ai perdu mon passeport", ar: "فقدت جواز سفري" },
    contextual: { en: "My passport is lost/stolen", fr: "Mon passeport est perdu/volé", ar: "ضيّعت الباسبور تاعي" },
    note: {
      en: "'Dayya't el-pasport' (ضيّعت الباسبور). Go to the nearest police station for a report (procès-verbal), then contact your embassy. Keep a photo of your passport on your phone.",
      fr: "Allez au commissariat le plus proche pour un procès-verbal, puis contactez votre ambassade. Gardez une photo de votre passeport sur votre téléphone.",
      ar: "«ضيّعت الباسبور» — روح لأقرب كوميسارية باش دير بروسي فيربال، وبعد عيّط للسفارة تاعك. خلّي تصويرة تاع الباسبور في تيليفونك."
    },
    tags: ["emergency", "documents", "essential"]
  },
  {
    id: "emg-5",
    situation: "emergency",
    source: { en: "Where is the nearest pharmacy?", fr: "Où est la pharmacie la plus proche ?", ar: "أين أقرب صيدلية؟" },
    literal: { en: "Where is the nearest pharmacy?", fr: "Où est la pharmacie la plus proche ?", ar: "أين أقرب صيدلية؟" },
    contextual: { en: "Is there a pharmacy nearby?", fr: "Y a une pharmacie pas loin ?", ar: "كاين فارماسيان قريبة؟" },
    note: {
      en: "'Farmasian' (فارماسيان) — pharmacies are well-stocked and pharmacists are highly trained. Many medications available over-the-counter that require prescriptions elsewhere. Night pharmacies rotate — ask any pharmacy for the current one.",
      fr: "Les pharmacies sont bien approvisionnées et les pharmaciens très compétents. De nombreux médicaments sont en vente libre. Les pharmacies de garde tournent — demandez.",
      ar: "«فارماسيان» — الصيدليات مليحة والفارماسيان متكوّنين. بزاف تاع الدوا يتباع بلا أوردونونس. صيدلية الحراسة تدور — اسأل أي صيدلية."
    },
    tags: ["emergency", "medical", "pharmacy"]
  },
];
