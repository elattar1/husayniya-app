/**
 * أرياف - ARYAF — قاعدة بيانات المطاعم والمتاجر المشتركة
 */
window.STORES_DATABASE = {
  // ── 1. مشويات الباز ──
  'baz': {
    id: 'baz',
    name: 'مشويات الباز الريفية — كباب وكفتة بلدي',
    tagline: 'أشهى المشويات المصرية، كباب وكفتة حاتي، طرب، حمام محشي، وطواجن فرن بلدي',
    category: 'مشويات وأكلات بلدية',
    statusBadge: '● مفتوح الآن',
    featureBadge: 'خيار أرياف الأول',
    rating: '4.9',
    reviewsCount: '(+1,420 تقييم)',
    deliveryTime: '25 - 35 دقيقة',
    address: 'شارع المركز أمام بنك مصر، أرياف',
    deliveryFee: '15 ج.م',
    minOrder: '50 ج.م',
    paymentMethods: 'كاش • فودافون كاش • إنستاباي',
    avatar: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=80',
    cover: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    themeGradient: 'linear-gradient(135deg, #0d3826 0%, #154d37 50%, #092419 100%)',
    categories: [
      { id: 'all', name: '<i class="fa-solid fa-utensils ml-1.5"></i> الكل' },
      { id: 'grills', name: '<i class="fa-solid fa-drumstick-bite ml-1.5"></i> المشاوي والكباب' },
      { id: 'rice', name: '<i class="fa-solid fa-bowl-rice ml-1.5"></i> القوزي والأرز' },
      { id: 'fastfood', name: '<i class="fa-solid fa-burger ml-1.5"></i> الوجبات السريعة' },
      { id: 'appetizers', name: '<i class="fa-solid fa-leaf ml-1.5"></i> المقبلات والسلطات' },
      { id: 'drinks', name: '<i class="fa-solid fa-bottle-water ml-1.5"></i> المشروبات والعصائر' },
      { id: 'reviews', name: '<i class="fa-solid fa-star text-amber-400 ml-1.5"></i> آراء العملاء (4.9)' }
    ],
    items: [
      {
        id: 'baz-1',
        title: 'كيلو مشكل كباب وكفتة حاتي بلدي',
        price: 380,
        desc: 'كباب ضاني وكفتة بلدي مشوية على الفحم مع طحينة، سلطة خضراء، عيش بلدي ساخن، ومخلل.',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
        badge: 'الأكثر طلباً ',
        badgeColor: 'bg-emerald-500 text-black',
        cat: 'grills',
        icon: 'fa-drumstick-bite'
      },
      {
        id: 'baz-2',
        title: 'طاجن لحمة بلدي بالبصل والأرز البسمتي',
        price: 240,
        desc: 'قطع لحم بلدي طازجة مع أرز بسمتي بالمكسرات وشوربة لسان عصفور وطحينة.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        badge: 'وجبة فاخرة ',
        badgeColor: 'bg-amber-400 text-black',
        cat: 'rice',
        icon: 'fa-drumstick-bite'
      },
      {
        id: 'baz-3',
        title: 'وجبة فرخة مشوية على الفحم مع أرز وبطاطس',
        price: 190,
        desc: 'فرخة متبلة بالخلطة السرية مشوية على الفحم مع أرز بسمتي، تومية، سلطة، وبطاطس.',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=600&q=80',
        badge: 'عرض خاص ',
        badgeColor: 'bg-rose-500 text-white',
        cat: 'grills',
        icon: 'fa-drumstick-bite'
      },
      {
        id: 'baz-4',
        title: 'وجبة طرب وكفتة بلدي مخصوص',
        price: 260,
        desc: 'طرب ضاني وكفتة مشوية على الفحم مع سلطة بلدي، سلطة طحينة، وعيش بلدي.',
        image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
        badge: 'طرب حاتي',
        badgeColor: 'bg-emerald-500 text-black',
        cat: 'grills',
        icon: 'fa-drumstick-bite'
      },
      {
        id: 'baz-5',
        title: 'ساندوتش كريب زنجر سوبر كرانشي',
        price: 85,
        desc: 'قطع دجاج زنجر مقرمشة مع جبنة موزاريلا سايحة، صوص شيدر، ومايونيز في عيش كريب مقرمش.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        badge: 'سريع',
        badgeColor: 'bg-blue-500 text-white',
        cat: 'fastfood',
        icon: 'fa-burger'
      },
      {
        id: 'baz-6',
        title: 'طبق مقبلات وطحينة بلدي وسلطات',
        price: 40,
        desc: 'طحينة بيضاء بالخل، بابا غنوج، سلطة خضراء بلدي، ومخلل مشكل بلدي.',
        image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80',
        badge: 'مقبلات',
        badgeColor: 'bg-amber-500 text-black',
        cat: 'appetizers',
        icon: 'fa-leaf'
      },
      {
        id: 'baz-7',
        title: 'عصير قصب / برتقال فريش من مزارع أرياف',
        price: 25,
        desc: 'عصير طبيعي فريش بارد ينعشك بعد الأكل في علبة محكمة الإغلاق.',
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
        badge: 'عصائر فريش',
        badgeColor: 'bg-emerald-500 text-black',
        cat: 'drinks',
        icon: 'fa-bottle-water'
      }
    ],
    reviews: [
      { author: 'أحمد الشرقاوي (شارع المركز)', text: 'أفضل كباب وكفتة في أرياف، اللحمة بلدي طازة والتوصيل وصل في نص ساعة سخن ملهلب!', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'منذ يومين' },
      { author: 'د. محمود سليم (سعود)', text: 'الطرب والكفتة المشوية ريحتهم تجنن والتغليف محترم جداً.. استمروا على هذا المستوى الممتاز.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'منذ 4 أيام' },
      { author: 'الحاج إبراهيم منصور', text: 'طاجن اللحمة بالبصل حكاية، تسلم إيدكم وتوصيل سريع ومحترم.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'منذ أسبوع' }
    ]
  },

  // ── 2. كشري الزعيم ──
  'koshary': {
    id: 'koshary',
    name: 'كشري الزعيم والتحرير — شارع المركز',
    tagline: 'أفضل كشري مصري مخصوص، طواجن فرن فخار باللحمة والفراخ، دقة وشطة كمون وصلصة مميزة',
    category: 'كشري وطواجن فرن',
    statusBadge: '● مفتوح الآن',
    featureBadge: 'كشري أصلي',
    rating: '4.8',
    reviewsCount: '(+980 تقييم)',
    deliveryTime: '15 - 25 دقيقة',
    address: 'شارع المركز أمام مجمع المحاكم، أرياف',
    deliveryFee: '10 ج.م',
    minOrder: '30 ج.م',
    paymentMethods: 'كاش • محافظ إلكترونية • إنستاباي',
    avatar: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
    cover: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
    themeGradient: 'linear-gradient(135deg, #3d1c06 0%, #572909 50%, #291102 100%)',
    categories: [
      { id: 'all', name: '<i class="fa-solid fa-layer-group ml-1.5"></i> كامل المنيو' },
      { id: 'koshary', name: '<i class="fa-solid fa-bowl-rice ml-1.5"></i> علب الكشري' },
      { id: 'tajin', name: '<i class="fa-solid fa-fire ml-1.5"></i> طواجن الفرن الساخنة' },
      { id: 'extras', name: '<i class="fa-solid fa-mortar-pestle ml-1.5"></i> إضافات ودقات' },
      { id: 'dessert', name: '<i class="fa-solid fa-ice-cream ml-1.5"></i> حلويات ومشروبات' },
      { id: 'reviews', name: '<i class="fa-solid fa-star text-amber-400 ml-1.5"></i> آراء الزبائن' }
    ],
    items: [
      {
        id: 'kosh-1',
        title: 'علبة كشري وسط — مخصوص الزعيم',
        price: 35,
        desc: 'أرز مصري مفلفل، شعرية محمرة، مكرونة مقصوصة وإسباجيتي، عدس بجبة، حمص شامي، بصل مقرمش ذهبي، مع كيس دقة وصلصة حارة.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        badge: ' الأكثر طلباً',
        badgeColor: 'bg-amber-500 text-black',
        cat: 'koshary',
        icon: 'fa-bowl-rice'
      },
      {
        id: 'kosh-2',
        title: 'علبة كشري ميجا سوبر جامبو',
        price: 50,
        desc: 'حجم كبير جداً يكفي شخصين، مع دبل حمص وتقلية وعدس زيادة، وعبوتين صلصة كبيرة ودقة ثوم بالخل.',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        badge: 'حجم عائلي',
        badgeColor: 'bg-emerald-500 text-black',
        cat: 'koshary',
        icon: 'fa-bowl-rice'
      },
      {
        id: 'kosh-3',
        title: 'كشري توبينج كبدة إسكندراني',
        price: 55,
        desc: 'علبة كشري مع طبقة كبدة إسكندراني بتتبيلة الثوم والفلفل الأخضر الحار والليمون والكمون.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        badge: 'سبايسي ️',
        badgeColor: 'bg-rose-500 text-white',
        cat: 'koshary',
        icon: 'fa-drumstick-bite'
      },
      {
        id: 'kosh-4',
        title: 'طاجن فرن لحمة مفرومة بلدي',
        price: 45,
        desc: 'طاجن مكرونة قلم مخبوز بالفرن مع صلصة الطماطم الغنية بالبهارات ولحمة مفرومة بلدي على الوجه.',
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
        badge: 'فرن فخار',
        badgeColor: 'bg-red-600 text-white',
        cat: 'tajin',
        icon: 'fa-bowl-rice'
      },
      {
        id: 'kosh-5',
        title: 'طاجن مكرونة فراخ بالموزاريلا',
        price: 50,
        desc: 'قطع صدور فراخ متبلة مع مكرونة فرن وطبقة موزاريلا غنية ذائبة ومحمرة في الفرن.',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=600&q=80',
        badge: 'جبنة سايحة',
        badgeColor: 'bg-amber-400 text-black',
        cat: 'tajin',
        icon: 'fa-drumstick-bite'
      },
      {
        id: 'kosh-6',
        title: 'طاجن سجق بلدي شرقي مشطشط',
        price: 50,
        desc: 'سجق بلدي إسكندراني بقطع الطماطم والفلفل الحار والصلصة المتبكة في الفرن.',
        image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80',
        badge: 'حار ونار',
        badgeColor: 'bg-red-500 text-white',
        cat: 'tajin',
        icon: 'fa-utensils'
      },
      {
        id: 'kosh-7',
        title: 'طاجن أرز باللبن فرن بالقشطة',
        price: 25,
        desc: 'أرز باللبن الطبيعي مع وش قشطة بلدي محمر في الفرن ومكسرات خفيفة.',
        image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80',
        badge: 'قشطة بلدي',
        badgeColor: 'bg-blue-500 text-white',
        cat: 'dessert',
        icon: 'fa-cake-candles'
      },
      {
        id: 'kosh-8',
        title: 'طاجن أم علي ساخن بالمكسرات',
        price: 30,
        desc: 'عجينة الميلفاي الهشة مع الحليب المكثف والقشطة والزبيب وجوز الهند والبندق.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
        badge: 'مكسرات مشكلة',
        badgeColor: 'bg-amber-500 text-black',
        cat: 'dessert',
        icon: 'fa-cake-candles'
      }
    ],
    reviews: [
      { author: 'محمد يوسف (بحر البقر)', text: 'طاجن اللحمة المفرومة والكشري سخنين جداً والتقلية مقرمشة وزيت نقي!', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'منذ يوم' },
      { author: 'كريم عبد الله (شارع المركز)', text: 'أحلى طاجن مكرونة فراخ بالموزاريلا في أرياف، وسرعة في التوصيل ما شاء الله.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'منذ 3 أيام' }
    ]
  },

  // ── 3. بيتزا وكريب الرواد ──
  'pizza': {
    id: 'pizza',
    name: 'بيتزا وكريب الرواد — شارع المدارس',
    tagline: 'أقوى كريب كرانشي حار، شاورما سوري، بيتزا شرقي وإيطالي بالموزاريلا الطبيعية، وبرجر دوبل',
    category: 'كريب وبيتزا وفاست فود',
    statusBadge: '● مفتوح الآن',
    featureBadge: 'كريب وبيتزا إيطالي',
    rating: '4.7',
    reviewsCount: '(+840 تقييم)',
    deliveryTime: '20 - 30 دقيقة',
    address: 'شارع المدارس أمام مدرسة التجارة، أرياف',
    deliveryFee: '12 ج.م',
    minOrder: '40 ج.م',
    paymentMethods: 'كاش • محافظ إلكترونية • إنستاباي',
    avatar: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80',
    cover: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    themeGradient: 'linear-gradient(135deg, #3d0e12 0%, #54191d 50%, #24070a 100%)',
    categories: [
      { id: 'all', name: '<i class="fa-solid fa-layer-group ml-1.5"></i> كامل المنيو' },
      { id: 'crepe', name: '<i class="fa-solid fa-pizza-slice ml-1.5"></i> كريب مالح مقرمش' },
      { id: 'pizza', name: '<i class="fa-solid fa-pizza-slice ml-1.5"></i> بيتزا إيطالي وشرقي' },
      { id: 'burger', name: '<i class="fa-solid fa-burger ml-1.5"></i> برجر وسندوتشات' },
      { id: 'sweet', name: '<i class="fa-solid fa-cake-candles ml-1.5"></i> كريب حلو ومشروبات' },
      { id: 'reviews', name: '<i class="fa-solid fa-star text-amber-400 ml-1.5"></i> آراء الزبائن' }
    ],
    items: [
      {
        id: 'piz-1',
        title: 'كريب زنجر سوبر كرانشي حار',
        price: 65,
        desc: 'قطع صدور فراخ كرانشي متبلة حارة، بطاطس فارم فريتس، ميكس جبن موزاريلا وشيدر، صوص رانش ومايونيز.',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80',
        badge: ' الأكثر طلباً',
        badgeColor: 'bg-red-600 text-white',
        cat: 'crepe',
        icon: 'fa-pizza-slice'
      },
      {
        id: 'piz-2',
        title: 'كريب شاورما فراخ سوري ميكس جبن',
        price: 60,
        desc: 'شاورما فراخ سوري على السيخ، ثومية مخصوصة، خيار مخلل، وبطاطس وموزاريلا سايحة على الجريل.',
        image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80',
        badge: 'شاورما سوري',
        badgeColor: 'bg-amber-500 text-black',
        cat: 'crepe',
        icon: 'fa-pizza-slice'
      },
      {
        id: 'piz-3',
        title: 'كريب ميكس جبن (كيري + موزاريلا + رومي)',
        price: 50,
        desc: 'أربع أنواع جبن غنية تذوب معاً مع الزيتون الأخضر والفلفل الألوان وصوص الجبنة الشيدر.',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
        badge: '4 جبن',
        badgeColor: 'bg-emerald-500 text-black',
        cat: 'crepe',
        icon: 'fa-cheese'
      },
      {
        id: 'piz-4',
        title: 'بيتزا سوبر سوبريم إيطالي (L)',
        price: 140,
        desc: 'لحم مفروم بلدي، سجق شرقي، مشروم فريش، زيتون أسود، فلفل أخضر، صوص طماطم إيطالي وموزاريلا دوبل.',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
        badge: 'حجم كبير L',
        badgeColor: 'bg-amber-400 text-black',
        cat: 'pizza',
        icon: 'fa-pizza-slice'
      },
      {
        id: 'piz-5',
        title: 'بيتزا فراخ صوص الباربكيو المدخن',
        price: 125,
        desc: 'قطع دجاج متبلة مشوية مع صوص الباربكيو الأمريكي المدخن، بصل أحمر شرائح وموزاريلا طبيعية.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
        badge: 'باربكيو مدخن',
        badgeColor: 'bg-red-600 text-white',
        cat: 'pizza',
        icon: 'fa-drumstick-bite'
      },
      {
        id: 'piz-6',
        title: 'ساندوتش برجر دوبل بالجبنة الشيدر',
        price: 75,
        desc: 'قطعتين برجر لحمة مفرومة بلدي مشوية على الجريل مع جبنة شيدر، خس، طماطم، صوص بيج تيستي وبطاطس.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        badge: 'دوبل بيف ',
        badgeColor: 'bg-amber-500 text-black',
        cat: 'burger',
        icon: 'fa-burger'
      },
      {
        id: 'piz-7',
        title: 'كريب شوكولاتة نوتيلا بالموز والمكسرات',
        price: 45,
        desc: 'كريب حلو محشو شوكولاتة نوتيلا أصلية غنية مع شرائح الموز الطازجة والمكسرات وصوص شوكولاتة.',
        image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=600&q=80',
        badge: 'نوتيلا وموز',
        badgeColor: 'bg-pink-500 text-white',
        cat: 'sweet',
        icon: 'fa-cookie-bite'
      },
      {
        id: 'piz-8',
        title: 'كريب زبدة اللوتس والكراميل',
        price: 50,
        desc: 'كريب حلو غني بزبدة بسكويت اللوتس المقرمشة مع صوص كراميل ومكسرات بندق مجروش.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
        badge: 'لوتس كراميل',
        badgeColor: 'bg-amber-600 text-white',
        cat: 'sweet',
        icon: 'fa-cake-candles'
      }
    ],
    reviews: [
      { author: 'عمر الخالد (شارع المدارس)', text: 'كريب الزنجر الكرانشي مقرمش وساخن جداً وجبنة بتمط لحد السقف!', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'أمس' },
      { author: 'سارة إبراهيم', text: 'البيتزا عجينتها هشة وخفيفة ومش تقيلة، أفضل مطعم بيتزا في أرياف بلا منازع.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'منذ يومين' }
    ]
  },

  // ── 4. حلواني شندل ──
  'shendel': {
    id: 'shendel',
    name: 'حلواني شندل والبارون — شارع المركز',
    tagline: 'تورتات أعياد ميلاد، بسبوسة بالسمن البلدي، كنافة نابلسية، وجاتوهات شرقية وغربية',
    category: 'حلويات شرقية وغربية وتورتات',
    statusBadge: '● مفتوح الآن',
    featureBadge: 'حلويات فاخرة',
    rating: '4.9',
    reviewsCount: '(+1,150 تقييم)',
    deliveryTime: '15 - 25 دقيقة',
    address: 'شارع المركز بجوار بنك مصر، أرياف',
    deliveryFee: '10 ج.م',
    minOrder: '50 ج.م',
    paymentMethods: 'كاش • محافظ إلكترونية • إنستاباي',
    avatar: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80',
    cover: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    themeGradient: 'linear-gradient(135deg, #2c0e3a 0%, #46165c 50%, #190524 100%)',
    categories: [
      { id: 'all', name: '<i class="fa-solid fa-layer-group ml-1.5"></i> كامل المعروضات' },
      { id: 'eastern', name: '<i class="fa-solid fa-cake-candles ml-1.5"></i> حلويات شرقية بالسمن البلدي' },
      { id: 'cakes', name: '<i class="fa-solid fa-cake-candles ml-1.5"></i> تورتات ومناسبات' },
      { id: 'gateau', name: '<i class="fa-solid fa-cake-candles ml-1.5"></i> جاتوهات فاخرة' },
      { id: 'cookies', name: '<i class="fa-solid fa-cookie-bite ml-1.5"></i> نواشف وسابليه' },
      { id: 'reviews', name: '<i class="fa-solid fa-star text-amber-400 ml-1.5"></i> آراء الزبائن' }
    ],
    items: [
      {
        id: 'shn-1',
        title: 'كيلو بسبوسة مرملة بالسمن البلدي واللوز',
        price: 140,
        desc: 'بسبوسة شندل الشهيرة بالسمن الفلاحي الطبيعي مرملة ودايبة مع اللوز المحمص وشربات العسل الخفيف.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
        badge: ' سمن بلدي',
        badgeColor: 'bg-amber-500 text-black',
        cat: 'eastern',
        icon: 'fa-jar'
      },
      {
        id: 'shn-2',
        title: 'صينية كنافة نابلسية بالجبنة العكاوي',
        price: 160,
        desc: 'كنافة شعر برتقالية مقرمشة محشوة جبنة عكاوي مطاطية تذوب في الفم مع الفستق الحلبي والشربات.',
        image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80',
        badge: 'ساخنة وطازجة',
        badgeColor: 'bg-emerald-500 text-black',
        cat: 'eastern',
        icon: 'fa-cheese'
      },
      {
        id: 'shn-3',
        title: 'طبق مشكل شرقي سوبر لوكس (كيلو)',
        price: 180,
        desc: 'تشكيلة ملكية من بقلاوة تركية، أصابع كنافة بالمكسرات، بورمة فستق، وبسبوسة قشطة وبلح الشام.',
        image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
        badge: 'ملوكي',
        badgeColor: 'bg-amber-500 text-black',
        cat: 'eastern',
        icon: 'fa-cake-candles'
      },
      {
        id: 'shn-4',
        title: 'تورتة شوكولاتة فادج نوتيلا كينج',
        price: 220,
        desc: 'كيك فادج شوكولاتة طري غني بطبقات كريمة النوتيلا، ومزينة بقطع فيريرو روشيه وشوكولاتة كيت كات.',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
        badge: 'وسط مقاس 24',
        badgeColor: 'bg-pink-500 text-white',
        cat: 'cakes',
        icon: 'fa-cake-candles'
      },
      {
        id: 'shn-5',
        title: 'تورتة فواكه طبيعية فريش',
        price: 240,
        desc: 'كيك فانيليا إسفنجي هش مع طبقات كريمة خفق فرنسية ومغطاة بفراولة وكيوي ومانجو وكمبوت خوخ.',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
        badge: 'طازجة اليوم',
        badgeColor: 'bg-amber-500 text-black',
        cat: 'cakes',
        icon: 'fa-apple-whole'
      },
      {
        id: 'shn-6',
        title: 'دستة جاتوه مشكل سوبر لوكس (12 قطعة)',
        price: 150,
        desc: '12 قطعة جاتوه منوعة (بلاك فورست، ميلفاي سكر ومربى، اكلير شوكولاتة، تارت فواكه، وتشيز كيك توت).',
        image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
        badge: '12 قطعة',
        badgeColor: 'bg-purple-500 text-white',
        cat: 'gateau',
        icon: 'fa-cake-candles'
      },
      {
        id: 'shn-7',
        title: 'علبة بتي فور وسابليه بالمربى والمكسرات',
        price: 130,
        desc: 'بتي فور ناعم يذوب بالسمن النيوزيلندي مع صوص الشوكولاتة والفستق والمربى الطبيعية.',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
        badge: 'فاخر',
        badgeColor: 'bg-amber-500 text-black',
        cat: 'cookies',
        icon: 'fa-cookie-bite'
      },
      {
        id: 'shn-8',
        title: '4 قطع اكلير شوكولاتة بلجيكي فرنسي',
        price: 60,
        desc: 'عجينة شو فرنسية هشة محشوة كريمة كاسترد غنية ومغطاة بشوكولاتة بلجيكية داكنة.',
        image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=600&q=80',
        badge: 'بلجيكي',
        badgeColor: 'bg-pink-500 text-white',
        cat: 'gateau',
        icon: 'fa-cookie-bite'
      }
    ],
    reviews: [
      { author: 'مدام نادية العوضي', text: 'بسبوسة شندل ملهاش حل، ريحة السمن البلدي طاغية وتذوب في البق.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'منذ يومين' },
      { author: 'المهندس تامر سمير', text: 'أخدت تورتة الفادج لعيد ميلاد بنتي وكانت تحفة وأبهرت كل المعازيم.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'منذ 5 أيام' }
    ]
  },

  // ── 5. فول وفلافل البرنس ──
  'falafel': {
    id: 'falafel',
    name: 'فول وفلافل البرنس — شارع ترعة سراج',
    tagline: 'أشهى فلافل مقرمشة محشية، فول مدمس فلاحي بالزيت الحار والطحينة، مسقعة بلدي، وباذنجان مخلل',
    category: 'فطور شعبي ومأكولات صباحية',
    statusBadge: '● مفتوح الآن',
    featureBadge: 'فطار أرياف الأصيل',
    rating: '4.9',
    reviewsCount: '(+1,320 تقييم)',
    deliveryTime: '10 - 20 دقيقة',
    address: 'شارع ترعة سراج أمام المعهد الديني، أرياف',
    deliveryFee: '10 ج.م',
    minOrder: '25 ج.م',
    paymentMethods: 'كاش • محافظ إلكترونية • إنستاباي',
    avatar: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=300&q=80',
    cover: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=80',
    themeGradient: 'linear-gradient(135deg, #1b3820 0%, #28542f 50%, #112415 100%)',
    categories: [
      { id: 'all', name: '<i class="fa-solid fa-layer-group ml-1.5"></i> كامل المنيو' },
      { id: 'sandwiches', name: '<i class="fa-solid fa-bread-slice ml-1.5"></i> ساندوتشات شعبية' },
      { id: 'plates', name: '<i class="fa-solid fa-utensils ml-1.5"></i> علب وأطباق عائلية' },
      { id: 'falafel', name: '<i class="fa-solid fa-bread-slice ml-1.5"></i> طعمية سخنة وعجينة' },
      { id: 'pickles', name: '<i class="fa-solid fa-leaf ml-1.5"></i> مقبلات ومخللات' },
      { id: 'reviews', name: '<i class="fa-solid fa-star text-amber-400 ml-1.5"></i> آراء الزبائن' }
    ],
    items: [
      {
        id: 'fal-1',
        title: 'ساندوتش فلافل محشية كيري وشطة',
        price: 8,
        desc: 'قرص فلافل مقرمش بالسمسم محشو جبنة كيري سايحة ودقة بصل وشطة مع سلطة خضراء وطحينة سمسم.',
        image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80',
        badge: ' الأكثر طلباً',
        badgeColor: 'bg-emerald-500 text-black',
        cat: 'sandwiches',
        icon: 'fa-bread-slice'
      },
      {
        id: 'fal-2',
        title: 'ساندوتش فول بلدي بالزيت الحار والليمون',
        price: 8,
        desc: 'فول مدمس فلاحي زبدة مع زيت حار بذر كتان أصلي، طحينة بيضاء، كمون، وليمون في عيش بلدي سخن.',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80',
        badge: 'فول زبدة',
        badgeColor: 'bg-amber-500 text-black',
        cat: 'sandwiches',
        icon: 'fa-bread-slice'
      },
      {
        id: 'fal-3',
        title: 'ساندوتش بطاطس بانيه بالكاتشب والمايونيز',
        price: 10,
        desc: 'أصابع بطاطس بانيه مقرمشة مع خلطة البرنس الخاصة وصوص كاتشب ومايونيز وسلطة كول سلو.',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
        badge: 'مقرمش',
        badgeColor: 'bg-yellow-500 text-black',
        cat: 'sandwiches',
        icon: 'fa-drumstick-bite'
      },
      {
        id: 'fal-4',
        title: 'علبة فول مدمس فلاحي متبل كبير',
        price: 20,
        desc: 'علبة فول كاملة متبلة بالطحينة والزيت والكمون والليمون والطماطم، تأتي مع 5 أرغفة عيش بلدي ساخن.',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
        badge: 'تكفي 3 أفراد',
        badgeColor: 'bg-amber-500 text-black',
        cat: 'plates',
        icon: 'fa-bowl-rice'
      },
      {
        id: 'fal-5',
        title: 'طبق مسقعة بلدي بالصلصة المسبكة',
        price: 25,
        desc: 'باذنجان رومي مقلي مع فلفل رومي وحار في صلصة طماطم مسبكة بالثوم والخل والبهارات الشرقية.',
        image: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=600&q=80',
        badge: 'طاجن بلدي',
        badgeColor: 'bg-red-500 text-white',
        cat: 'plates',
        icon: 'fa-bowl-rice'
      },
      {
        id: 'fal-6',
        title: 'طبق باذنجان مخلل بالدقة والليمون',
        price: 15,
        desc: 'باذنجان عروس مسلوق ومخلل بتتبيلة الثوم المفروم، الفلفل الأحمر الحار، الكمون، وعصير الليمون والخل.',
        image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=600&q=80',
        badge: 'مخلل مخصوص',
        badgeColor: 'bg-purple-500 text-white',
        cat: 'pickles',
        icon: 'fa-leaf'
      },
      {
        id: 'fal-7',
        title: '10 أقراص فلافل سخنة مقرمشة بالسمسم',
        price: 15,
        desc: 'طعمية مقلية طازجة في زيت نظيف مع رشة كزبرة ناشفة وسمسم محمص ذهبي.',
        image: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=600&q=80',
        badge: '10 أقراص',
        badgeColor: 'bg-emerald-500 text-black',
        cat: 'falafel',
        icon: 'fa-circle'
      },
      {
        id: 'fal-8',
        title: 'كيس عجينة فلافل متبلة (نصف كيلو)',
        price: 20,
        desc: 'عجينة طعمية فريش مفرومة ناعم مع الخضرة والبهارات والسمسم للقلي السريع في المنزل.',
        image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=600&q=80',
        badge: 'نصف كيلو',
        badgeColor: 'bg-teal-500 text-black',
        cat: 'falafel',
        icon: 'fa-box'
      }
    ],
    reviews: [
      { author: 'الحاج عاطف عبد الحميد (سراج)', text: 'أحسن فلافل بالجبنة الكيري ممكن تاكلها في حياتك، فول البرنس رقم واحد في أرياف.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'اليوم' },
      { author: 'أحمد بدوي', text: 'سرعة توصيل الفطار في الصبح ممتازة، الأكل بيوصل سخن والعيش طازة.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'منذ يومين' }
    ]
  },

  // ── 6. بروستد وشاورما أرياف ──
  'broast': {
    id: 'broast',
    name: 'بروستد وشاورما أرياف — كريسبي ووجبات عائلية',
    tagline: 'دجاج مقرمش بخلطة الأعشاب السرية، فتة شاورما سوري، برجر ع الفحم، كول سلو وتومية بيضاء أصلية',
    category: 'بروستد وشاورما فاست فود',
    statusBadge: '● مفتوح الآن',
    featureBadge: 'قرمشة سوبر كرانشي',
    rating: '4.8',
    reviewsCount: '(+1,580 تقييم)',
    deliveryTime: '20 - 35 دقيقة',
    address: 'شارع المركز بجوار بنك الإسكندرية، أرياف',
    deliveryFee: '12 ج.م',
    minOrder: '50 ج.م',
    paymentMethods: 'كاش • فودافون كاش • إنستاباي',
    avatar: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80',
    cover: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1200&q=80',
    themeGradient: 'linear-gradient(135deg, #3d1b06 0%, #5e2808 50%, #2b1103 100%)',
    categories: [
      { id: 'all', name: '<i class="fa-solid fa-drumstick-bite ml-1.5"></i> كامل الوجبات' },
      { id: 'broast', name: '<i class="fa-solid fa-drumstick-bite ml-1.5"></i> وجبات البروستد' },
      { id: 'shawarma', name: '<i class="fa-solid fa-bowl-rice ml-1.5"></i> الشاورما والفتات' },
      { id: 'strips', name: '<i class="fa-solid fa-drumstick-bite ml-1.5"></i> الستريبس والكرانشي' },
      { id: 'sides', name: '<i class="fa-solid fa-leaf ml-1.5"></i> المقبلات والبطاطس' },
      { id: 'reviews', name: '<i class="fa-solid fa-star text-amber-400 ml-1.5"></i> تجارب الزبائن' }
    ],
    items: [
      {
        id: 'br-1',
        title: 'وجبة بروستد 4 قطع مقرمشة (عادي أو حار)',
        price: 160,
        desc: '4 قطع دجاج ذهبي مقرمش مع بطاطس فارم فريتس، سلطة كول سلو، صوص تومية، و2 عيش كيزر.',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
        badge: 'الأكثر مبيعاً ',
        badgeColor: 'bg-emerald-500 text-black',
        cat: 'broast',
        icon: 'fa-drumstick-bite'
      },
      {
        id: 'br-2',
        title: 'وجبة بروستد عائلية 8 قطع + لتر كوكاكولا وبطاطس لارج',
        price: 295,
        desc: '8 قطع دجاج مقرمش مع طبق بطاطس عائلي، 2 كول سلو، 2 تومية، 4 عيش، وزجاجة كوكاكولا لتر.',
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
        badge: 'توفير العيلة ',
        badgeColor: 'bg-amber-400 text-black',
        cat: 'broast',
        icon: 'fa-drumstick-bite'
      },
      {
        id: 'br-3',
        title: 'فتة شاورما فراخ سوري ملوكي بالموزاريلا',
        price: 110,
        desc: 'أرز بسمتي أصفر مع قطع شاورما دجاج متبلة، عيش سوري مقرمش، صوص تومية كريمي، ورشة موزاريلا.',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
        badge: 'شاورما سوري',
        badgeColor: 'bg-rose-500 text-white',
        cat: 'shawarma',
        icon: 'fa-pizza-slice'
      },
      {
        id: 'br-4',
        title: 'ساندوتش شاورما فراخ سوري سوبر دبل مع جبنة',
        price: 65,
        desc: 'رول عيش صاج محمص على الجريل مليان شاورما فراخ، خيار مخلل مقرمش، وتومية بيضاء غنية.',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
        badge: 'ساندوتش صاروخ',
        badgeColor: 'bg-blue-500 text-white',
        cat: 'shawarma',
        icon: 'fa-pizza-slice'
      },
      {
        id: 'br-5',
        title: 'وجبة ستريبس دجاج مقرمش 5 قطع مع صوص الباربيكيو',
        price: 125,
        desc: 'أصابع صدور دجاج فيليه مقرمشة خالية من العظم مع بطاطس فارم، كول سلو، وصوص باربيكيو وتومية.',
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
        badge: 'ستريبس كرانشي',
        badgeColor: 'bg-amber-500 text-black',
        cat: 'strips',
        icon: 'fa-drumstick-bite'
      },
      {
        id: 'br-6',
        title: 'طبق بطاطس فارم فريتس لارج بصوص الشيدر السايح',
        price: 45,
        desc: 'أصابع بطاطس مقلية ذهبية مقرمشة غرقانة بصوص جبنة شيدر أمريكي أصلي ورشة بهارات خاصة.',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
        badge: 'شيدر لافرز',
        badgeColor: 'bg-teal-400 text-black',
        cat: 'sides',
        icon: 'fa-drumstick-bite'
      }
    ],
    reviews: [
      { author: 'طارق صلاح الدين', text: 'البروستد طعمه خطير ومقرمش من برة وطري جداً من جوة، والتومية مظبوطة 10/10.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'اليوم' },
      { author: 'حسام خليل', text: 'أحلى فتة شاورما فراخ في أرياف، كمية محترمة وطعم سوري أصيل.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'منذ يومين' }
    ]
  },

  // ── 7. أسماك وسيفود أرياف ──
  'fish': {
    id: 'fish',
    name: 'أسماك وسيفود أرياف — القنال والبردويل',
    tagline: 'أطازج أسماك البحر والبحيرات، جمبري مشوي ومقلي، بوري مشوي زيت وليمون، وطواجن سيفود بالموتزاريلا',
    category: 'مأكولات بحرية وسيفود',
    statusBadge: '● مفتوح الآن',
    featureBadge: 'طازج من البحر يومياً',
    rating: '4.9',
    reviewsCount: '(+1,240 تقييم)',
    deliveryTime: '25 - 40 دقيقة',
    address: 'شارع جمال عبد الناصر أمام مجمع المصالح، أرياف',
    deliveryFee: '15 ج.م',
    minOrder: '60 ج.م',
    paymentMethods: 'كاش • فودافون كاش • إنستاباي',
    avatar: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=80',
    cover: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    themeGradient: 'linear-gradient(135deg, #082133 0%, #0d3c5e 50%, #071927 100%)',
    categories: [
      { id: 'all', name: '<i class="fa-solid fa-fish ml-1.5"></i> كامل المنيو' },
      { id: 'grills', name: '<i class="fa-solid fa-fire ml-1.5"></i> مشويات وجمبري' },
      { id: 'tajin', name: '<i class="fa-solid fa-bowl-rice ml-1.5"></i> طواجن وسي فود' },
      { id: 'fried', name: '<i class="fa-solid fa-fish ml-1.5"></i> مقليات مقرمشة' },
      { id: 'soup', name: '<i class="fa-solid fa-bowl-rice ml-1.5"></i> شوربات ومقبلات' },
      { id: 'reviews', name: '<i class="fa-solid fa-star text-amber-400 ml-1.5"></i> آراء عشاق الأسماك' }
    ],
    items: [
      {
        id: 'fish-1',
        title: 'وجبة سمك بوري سنجاري فاخر بالأرز والسلطات',
        price: 135,
        desc: 'سمك بوري مبطرخ مشوي بالخلطة السنجاري الإسكندراني مع أرز صيادية بني، سلطة خضراء وطحينة.',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
        badge: 'الأكثر طلباً ',
        badgeColor: 'bg-emerald-500 text-black',
        cat: 'grills',
        icon: 'fa-fish'
      },
      {
        id: 'fish-2',
        title: 'طاجن سي فود ميكس بالوايت صوص والموزاريلا',
        price: 195,
        desc: 'جمبري، سبيط مقطع، سمك فيليه، وكابوريا في صوص كريمة غني مع جبنة موزاريلا محمرة في الفرن.',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
        badge: 'طاجن مميز ',
        badgeColor: 'bg-amber-400 text-black',
        cat: 'tajin',
        icon: 'fa-bowl-rice'
      },
      {
        id: 'fish-3',
        title: 'نصف كيلو جمبري جامبو مشوي ع الفحم بالتتبيلة',
        price: 260,
        desc: 'جمبري بحري جامبو مشوي على الفحم بخلطة الليمون والكمون والزعتر مع صوص تارتار.',
        image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80',
        badge: 'جمبري جامبو',
        badgeColor: 'bg-rose-500 text-white',
        cat: 'grills',
        icon: 'fa-fish'
      },
      {
        id: 'fish-4',
        title: 'شوربة سي فود مخلية بالكريمة الغنية',
        price: 95,
        desc: 'شوربة فواكه بحر مخلية تماماً بقطع الجمبري والكلماري والفيليه مع كريمة طهي طازجة ولمسة شبت.',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
        badge: 'شوربة ملوكي',
        badgeColor: 'bg-teal-400 text-black',
        cat: 'soup',
        icon: 'fa-bowl-rice'
      },
      {
        id: 'fish-5',
        title: 'وجبة سمك بلطي بلدي مقلي مقرمش مع أرز وسلطات',
        price: 90,
        desc: 'سمك بلطي طازج مقلي ذهبي مقرمش بتتبيلة ثوم وكمون مع أرز صيادية وسلطة بلدي وعيش ساخن.',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80',
        badge: 'وجبة توفير',
        badgeColor: 'bg-blue-500 text-white',
        cat: 'fried',
        icon: 'fa-fish'
      },
      {
        id: 'fish-6',
        title: 'ميكس مقليات سيفود (جمبري + سبيط مقرمش + فيليه)',
        price: 220,
        desc: 'تشكيلة مقليات ذهبية مقرمشة تكفي شخصين مع بطاطس فارم فريتس وصوصات وليمون مخلل.',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
        badge: 'ميكس القنال',
        badgeColor: 'bg-amber-500 text-black',
        cat: 'fried',
        icon: 'fa-fish'
      }
    ],
    reviews: [
      { author: 'الدكتور عصام النجار', text: 'طاجن السيفود بالوايت صوص حكاية لا تفوت، السمك طازة جداً ورائحته تفتح النفس.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'أمس' },
      { author: 'محمود عبد السلام', text: 'الجمبري المشوي مستوي صح والشوربة غنية جداً، أحسن مطعم سمك في أرياف.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'منذ 3 أيام' }
    ]
  },

  // ── 8. هايبر وسوبر ماركت الفرسان ──
  'forsan': {
    id: 'forsan',
    name: 'سوبر ماركت وهايبر الفرسان — شارع بورسعيد',
    tagline: 'أكبر تشكيلة بقالة، منتجات ألبان طازجة، أجبان، تموين منزلي، ومجمدات وعصائر بأفضل الأسعار',
    category: 'سوبر ماركت وبقالة تموينية',
    statusBadge: '● متاح للتسوق والتوصيل',
    featureBadge: 'الهايبر الأكثر شمولاً',
    rating: '4.8',
    reviewsCount: '(+910 تقييم)',
    deliveryTime: '15 - 25 دقيقة',
    address: 'شارع بورسعيد أمام مدرسة الصنايع، أرياف',
    deliveryFee: '10 ج.م',
    minOrder: '40 ج.م',
    paymentMethods: 'كاش • فودافون كاش • إنستاباي',
    avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80',
    cover: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    themeGradient: 'linear-gradient(135deg, #062b1e 0%, #0d4a36 50%, #061c14 100%)',
    categories: [
      { id: 'all', name: '<i class="fa-solid fa-basket-shopping ml-1.5"></i> جميع الأقسام' },
      { id: 'dairy', name: '<i class="fa-solid fa-cheese ml-1.5"></i> الأجبان والألبان' },
      { id: 'pantry', name: '<i class="fa-solid fa-basket-shopping ml-1.5"></i> البقالة والتموين' },
      { id: 'frozen', name: '<i class="fa-solid fa-snowflake ml-1.5"></i> المجمدات واللحوم' },
      { id: 'drinks', name: '<i class="fa-solid fa-bottle-water ml-1.5"></i> المشروبات والعصائر' },
      { id: 'reviews', name: '<i class="fa-solid fa-star text-amber-400 ml-1.5"></i> تقييمات العملاء' }
    ],
    items: [
      {
        id: 'for-1',
        title: 'جبنة رومي قديمة بطارخ فاخرة (ربع كيلو)',
        price: 70,
        desc: 'جبنة رومي بلدي معتقة وطازجة مقطعة شرائح رفيعة في طبق مفرغ الهواء.',
        image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
        badge: 'الأكثر مبيعاً ⭐',
        badgeColor: 'bg-amber-400 text-black',
        cat: 'dairy',
        icon: 'fa-cheese'
      },
      {
        id: 'for-2',
        title: 'جبنة موزاريلا طبيعية مبشورة 500 جم',
        price: 85,
        desc: 'موزاريلا مطاطية عالية الجودة مثالية للبيتزا والمكرونة البشاميل والطواجن.',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
        badge: 'مطاطية فاخرة',
        badgeColor: 'bg-emerald-500 text-black',
        cat: 'dairy',
        icon: 'fa-cheese'
      },
      {
        id: 'for-3',
        title: 'كرتونة بيض أبيض مزارع طازج (30 بيضة)',
        price: 160,
        desc: 'بيض مزارع طازج يوم بيوم مفحوص ونظيف في طبق كرتون محكم.',
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
        badge: 'طازج يومياً',
        badgeColor: 'bg-emerald-500 text-black',
        cat: 'dairy',
        icon: 'fa-egg'
      },
      {
        id: 'for-4',
        title: 'كيس أرز مصري فاخر عريض الحبة (5 كجم)',
        price: 175,
        desc: 'أرز أبيض مصري نمرة واحد مغسول ومنقى آلياً 100% بدون شوائب.',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
        badge: 'تموين البيت',
        badgeColor: 'bg-blue-500 text-white',
        cat: 'pantry',
        icon: 'fa-wheat-awn'
      },
      {
        id: 'for-5',
        title: 'زجاجة زيت ذرة عافية نقي 1.6 لتر',
        price: 135,
        desc: 'زيت ذرة خفيف نقي للطبخ والقلي الخفيف خالي من الكوليسترول.',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
        badge: 'عافية الأصلي',
        badgeColor: 'bg-amber-400 text-black',
        cat: 'pantry',
        icon: 'fa-bottle-water'
      },
      {
        id: 'for-6',
        title: 'لبن جهينة كامل الدسم عبوة 1 لتر',
        price: 42,
        desc: 'حليب طبيعي معقم 100% مغذي وصحي للعائلة وللشاي والقهوة.',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
        badge: 'جهينة',
        badgeColor: 'bg-blue-400 text-black',
        cat: 'dairy',
        icon: 'fa-bottle-water'
      },
      {
        id: 'for-7',
        title: 'علبة برجر لحمة بقري جامبو متبل (8 قطع)',
        price: 120,
        desc: 'برجر لحم بلدي متبل سريع التحضير في 5 دقائق مع سمسم وصوص.',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
        badge: 'مجمدات جاهزة',
        badgeColor: 'bg-rose-500 text-white',
        cat: 'frozen',
        icon: 'fa-drumstick-bite'
      },
      {
        id: 'for-8',
        title: 'كرتونة مياه معدنية طبيعية 12 زجاجة (1.5 لتر)',
        price: 75,
        desc: 'مياه شرب نقية معقمة من أنقى الآبار الطبيعية لترطيب يومي.',
        image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=600&q=80',
        badge: 'عرض كرتونة',
        badgeColor: 'bg-teal-500 text-black',
        cat: 'drinks',
        icon: 'fa-droplet'
      }
    ],
    reviews: [
      { author: 'المهندس كريم شريف', text: 'أفضل سوبر ماركت في أرياف، الطلب وصلني خلال ربع ساعة وكل الحاجات طازة وتاريخ صلاحيتها جديد.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'اليوم' },
      { author: 'أم زياد (شارع بورسعيد)', text: 'الأجبان والبيض عندهم دايماً طازة ومغلفة بشكل ممتاز، وتوصيل الدليفري محترم جداً.', rating: '<span class="flex items-center gap-0.5 text-amber-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>', time: 'منذ يومين' }
    ]
  }
};