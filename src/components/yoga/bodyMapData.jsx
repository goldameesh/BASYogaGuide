export const BODY_REGIONS = [
  {
    id: "head",
    name: "Head",
    labelX: 310, labelY: 56, labelAnchor: "end",
    dotX: 200, dotY: 52,
    shape: "ellipse",
    cx: 200, cy: 52, rx: 36, ry: 42,
    asanas: [
      {
        name: "Sirsasana",
        english: "Headstand",
        level: "Advanced",
        description: "The king of asanas. Inversions increase blood flow to the brain, improving focus and calming the mind.",
        benefits: "Improves concentration, strengthens core, calms nervous system",
        precautions: "Avoid with neck injuries, high blood pressure, or during menstruation",
        source: "B.K.S. Iyengar – Light on Yoga (HarperCollins, 1966); Iyengar Yoga Institute, Pune",
        youtube: "https://www.youtube.com/embed/tcZNLFmFFUo"
      },
      {
        name: "Sarvangasana",
        english: "Shoulder Stand",
        level: "Intermediate",
        description: "A supported inversion that nourishes the thyroid and parathyroid glands while calming the brain.",
        benefits: "Stimulates thyroid, relieves stress, improves digestion",
        precautions: "Avoid with neck or shoulder injuries",
        source: "Swami Sivananda – The Science of Yoga; Sivananda Yoga Vedanta Centres",
        youtube: "https://www.youtube.com/embed/l4HxHxjhFo0"
      },
      {
        name: "Brahmari Pranayama",
        english: "Bee Breath",
        level: "Beginner",
        description: "A calming breathing technique that creates a humming sound, relieving tension in the head and mind.",
        benefits: "Relieves headache, reduces anxiety, improves concentration",
        precautions: "Practice on an empty stomach",
        source: "Patanjali – Yoga Sutras; Art of Living Foundation",
        youtube: "https://www.youtube.com/embed/V0IlT5JFbW4"
      }
    ]
  },
  {
    id: "ears",
    name: "Ears",
    labelX: 50, labelY: 44, labelAnchor: "start",
    dotX: 200, dotY: 40,
    shape: "path",
    d: "M160,45 Q150,45 150,55 Q150,65 160,65 M240,45 Q250,45 250,55 Q250,65 240,65",
    asanas: [
      {
        name: "Karnapidasana",
        english: "Ear Pressure Pose",
        level: "Intermediate",
        description: "A deep forward fold where the knees press against the ears, stimulating the auditory system.",
        benefits: "Stimulates ear health, calms the brain, stretches spine",
        precautions: "Avoid with neck injuries or ear infections",
        source: "B.K.S. Iyengar – Light on Yoga; Yoga Journal (yogajournal.com)",
        youtube: "https://www.youtube.com/embed/8X9KQJ-Bv5o"
      },
      {
        name: "Shanmukhi Mudra",
        english: "Six-Gate Seal",
        level: "Beginner",
        description: "A meditation technique where fingers gently close the sensory gates including the ears.",
        benefits: "Promotes inner awareness, reduces tinnitus, calms mind",
        precautions: "Keep pressure gentle on the ears",
        source: "Swami Satyananda Saraswati – Asana Pranayama Mudra Bandha; Bihar School of Yoga",
        youtube: "https://www.youtube.com/embed/5G9RBCjKuqo"
      },
      {
        name: "Simhasana",
        english: "Lion Pose",
        level: "Beginner",
        description: "A powerful pose with tongue extended and a roaring exhale that releases tension in the face and ears.",
        benefits: "Relieves tension in face, improves hearing, boosts confidence",
        precautions: "Avoid straining the jaw",
        source: "Yoga Journal – Pose Library; American Yoga Association",
        youtube: "https://www.youtube.com/embed/wtiwHbqosJw"
      }
    ]
  },
  {
    id: "neck",
    name: "Neck",
    labelX: 60, labelY: 110, labelAnchor: "start",
    dotX: 200, dotY: 106,
    shape: "rect",
    x: 186, y: 94, width: 28, height: 24, rx: 6,
    asanas: [
      {
        name: "Greeva Sanchalana",
        english: "Neck Movements",
        level: "Beginner",
        description: "Gentle neck rotations and stretches that release tension and improve range of motion.",
        benefits: "Relieves neck stiffness, improves mobility, reduces headaches",
        precautions: "Move slowly, avoid sudden jerks",
        source: "Swami Satyananda Saraswati – Asana Pranayama Mudra Bandha; Bihar School of Yoga",
        youtube: "https://www.youtube.com/embed/9L2b2khySLE"
      },
      {
        name: "Matsyasana",
        english: "Fish Pose",
        level: "Intermediate",
        description: "A backbend that opens the throat and stretches the front of the neck deeply.",
        benefits: "Stretches neck muscles, opens chest, stimulates throat chakra",
        precautions: "Use support under head if neck is sensitive",
        source: "B.K.S. Iyengar – Light on Yoga; Iyengar Yoga Institute, Pune",
        youtube: "https://www.youtube.com/embed/WZk0u-lEDuU"
      },
      {
        name: "Setu Bandhasana",
        english: "Bridge Pose",
        level: "Beginner",
        description: "A gentle backbend that strengthens the neck while opening the chest.",
        benefits: "Strengthens neck, calms brain, reduces anxiety",
        precautions: "Keep chin slightly tucked to protect cervical spine",
        source: "Yoga Journal – Pose Library; American College of Sports Medicine",
        youtube: "https://www.youtube.com/embed/jalL1yDl4gw"
      }
    ]
  },
  {
    id: "shoulders",
    name: "Shoulders",
    labelX: 340, labelY: 132, labelAnchor: "end",
    dotX: 200, dotY: 128,
    shape: "path",
    d: "M186,118 Q170,112 138,125 L138,140 Q170,130 186,134 Z M214,118 Q230,112 262,125 L262,140 Q230,130 214,134 Z",
    asanas: [
      {
        name: "Garudasana",
        english: "Eagle Pose",
        level: "Intermediate",
        description: "A balancing pose with arms wrapped that deeply stretches the shoulders and upper back.",
        benefits: "Opens shoulder joints, improves balance, strengthens legs",
        precautions: "Modify arm position if shoulder mobility is limited",
        source: "B.K.S. Iyengar – Light on Yoga; Yoga Journal (yogajournal.com/poses)",
        youtube: "https://www.youtube.com/embed/EpVSI97QPSY"
      },
      {
        name: "Gomukhasana",
        english: "Cow Face Pose",
        level: "Intermediate",
        description: "Arms are clasped behind the back, one reaching up and the other down.",
        benefits: "Deep shoulder stretch, opens chest, corrects posture",
        precautions: "Use a strap if hands don't meet behind back",
        source: "Yoga Journal – Pose Library; Iyengar Yoga Institute",
        youtube: "https://www.youtube.com/embed/V3_RA9fQEHE"
      },
      {
        name: "Paschim Namaskarasana",
        english: "Reverse Prayer",
        level: "Intermediate",
        description: "Hands are joined in prayer behind the back between the shoulder blades.",
        benefits: "Opens shoulders and chest, improves wrist flexibility",
        precautions: "Build up gradually; don't force the hands together",
        source: "Bihar School of Yoga – Asana Pranayama Mudra Bandha",
        youtube: "https://www.youtube.com/embed/7kgZnJqzNDU"
      }
    ]
  },
  {
    id: "chest",
    name: "Chest",
    labelX: 330, labelY: 166, labelAnchor: "end",
    dotX: 200, dotY: 162,
    shape: "path",
    d: "M186,134 L186,190 L214,190 L214,134 Q200,128 186,134 Z",
    asanas: [
      {
        name: "Bhujangasana",
        english: "Cobra Pose",
        level: "Beginner",
        description: "A gentle backbend that opens the chest and strengthens the spine.",
        benefits: "Opens chest, strengthens spine, improves breathing",
        precautions: "Don't overextend the lower back",
        source: "Yoga Journal – Pose Library; National Institutes of Health (PubMed: yoga chest openers)",
        youtube: "https://www.youtube.com/embed/JDcdhTuycOI"
      },
      {
        name: "Ustrasana",
        english: "Camel Pose",
        level: "Intermediate",
        description: "A deep backbend that powerfully opens the entire front body.",
        benefits: "Expands chest, stimulates heart chakra, improves posture",
        precautions: "Support lower back, avoid if you have back injuries",
        source: "B.K.S. Iyengar – Light on Yoga; Yoga Journal (yogajournal.com)",
        youtube: "https://www.youtube.com/embed/fHB3Fjkpqxs"
      },
      {
        name: "Dhanurasana",
        english: "Bow Pose",
        level: "Intermediate",
        description: "The body forms a bow shape, creating a deep chest opener.",
        benefits: "Opens chest and shoulders, strengthens back, improves posture",
        precautions: "Avoid with herniated discs or pregnancy",
        source: "Swami Sivananda – The Science of Yoga; Sivananda Yoga Vedanta Centres",
        youtube: "https://www.youtube.com/embed/tSBi7e-XOOA"
      }
    ]
  },
  {
    id: "upperback",
    name: "Upper Back",
    labelX: 40, labelY: 172, labelAnchor: "start",
    dotX: 200, dotY: 168,
    shape: "path",
    d: "M168,140 L186,134 L186,190 L168,190 Z M232,140 L214,134 L214,190 L232,190 Z",
    asanas: [
      {
        name: "Marjariasana",
        english: "Cat-Cow Pose",
        level: "Beginner",
        description: "Flowing between cat and cow stretches mobilizes the entire spine.",
        benefits: "Relieves upper back tension, improves spinal flexibility",
        precautions: "Move gently with spinal conditions",
        source: "Yoga Journal – Pose Library; American Yoga Association",
        youtube: "https://www.youtube.com/embed/kqnua4rHVVA"
      },
      {
        name: "Balasana",
        english: "Child's Pose",
        level: "Beginner",
        description: "A restorative pose that gently stretches the upper back and releases tension.",
        benefits: "Stretches back, calms mind, relieves fatigue",
        precautions: "Use a pillow under forehead for comfort",
        source: "Yoga Journal – Restorative Poses; Sivananda Yoga Vedanta Centres",
        youtube: "https://www.youtube.com/embed/2MJGg-dUKh0"
      },
      {
        name: "Sasangasana",
        english: "Rabbit Pose",
        level: "Intermediate",
        description: "A deep forward fold from kneeling that stretches the entire spine.",
        benefits: "Stretches upper back deeply, stimulates immune system",
        precautions: "Keep weight on knees, not on head",
        source: "Bikram Choudhury – Bikram Yoga; Yoga Journal (yogajournal.com)",
        youtube: "https://www.youtube.com/embed/Ev5AROkY_lM"
      }
    ]
  },
  {
    id: "arms",
    name: "Arms",
    labelX: 20, labelY: 204, labelAnchor: "start",
    dotX: 130, dotY: 200,
    shape: "path",
    d: "M138,140 L120,200 L108,260 L120,262 L132,204 L146,158 Z M262,140 L280,200 L292,260 L280,262 L268,204 L254,158 Z",
    asanas: [
      {
        name: "Adho Mukha Svanasana",
        english: "Downward Dog",
        level: "Beginner",
        description: "An inverted V-shape that strengthens the arms while stretching the whole body.",
        benefits: "Strengthens arms and shoulders, lengthens spine",
        precautions: "Bend knees if hamstrings are tight",
        source: "Yoga Journal – Pose Library; National Center for Complementary and Integrative Health (NCCIH)",
        youtube: "https://www.youtube.com/embed/EC7RGJ975iM"
      },
      {
        name: "Chaturanga Dandasana",
        english: "Four-Limbed Staff",
        level: "Intermediate",
        description: "A low plank that builds tremendous arm and core strength.",
        benefits: "Builds arm strength, tones core, improves endurance",
        precautions: "Keep elbows close to body, modify on knees if needed",
        source: "Iyengar Yoga Institute – Teacher Training Materials; Yoga Journal",
        youtube: "https://www.youtube.com/embed/pqbYurntRHU"
      },
      {
        name: "Vasisthasana",
        english: "Side Plank",
        level: "Intermediate",
        description: "A lateral balance on one arm that strengthens the entire arm and wrist.",
        benefits: "Strengthens arms and wrists, improves balance",
        precautions: "Stack or stagger feet for balance; avoid with wrist injuries",
        source: "Yoga Journal – Pose Library; American College of Sports Medicine",
        youtube: "https://www.youtube.com/embed/WFL8xDmcHqI"
      }
    ]
  },
  {
    id: "hands",
    name: "Hands",
    labelX: 360, labelY: 290, labelAnchor: "end",
    dotX: 270, dotY: 286,
    shape: "path",
    d: "M108,260 Q100,280 96,298 Q94,306 102,308 Q110,302 116,290 L120,262 Z M292,260 Q300,280 304,298 Q306,306 298,308 Q290,302 284,290 L280,262 Z",
    asanas: [
      {
        name: "Anjali Mudra",
        english: "Prayer Position",
        level: "Beginner",
        description: "Palms pressed together at heart center, activating the hand meridians.",
        benefits: "Calms mind, promotes hand flexibility, centers energy",
        precautions: "Keep wrists relaxed and aligned",
        source: "Bihar School of Yoga – Asana Pranayama Mudra Bandha; Art of Living Foundation",
        youtube: "https://www.youtube.com/embed/G_q7NcBLmNI"
      },
      {
        name: "Gyan Mudra",
        english: "Knowledge Seal",
        level: "Beginner",
        description: "Thumb and index finger touching, used in meditation for wisdom and clarity.",
        benefits: "Improves concentration, reduces anxiety, stimulates brain",
        precautions: "Keep hands relaxed during practice",
        source: "Swami Satyananda Saraswati – Mudra Vigyan; Bihar School of Yoga",
        youtube: "https://www.youtube.com/embed/j4_L5bOqfSM"
      },
      {
        name: "Tolasana",
        english: "Scale Pose",
        level: "Advanced",
        description: "Lifting the body off the ground using hand strength from lotus position.",
        benefits: "Strengthens hands and wrists, builds core strength",
        precautions: "Requires strong wrists and core; use blocks for support",
        source: "B.K.S. Iyengar – Light on Yoga; Iyengar Yoga Institute, Pune",
        youtube: "https://www.youtube.com/embed/yY3aTNGJCZk"
      }
    ]
  },
  {
    id: "abdomen",
    name: "Abdomen",
    labelX: 340, labelY: 229, labelAnchor: "end",
    dotX: 200, dotY: 225,
    shape: "path",
    d: "M172,190 L172,252 Q186,258 200,260 Q214,258 228,252 L228,190 Z",
    asanas: [
      {
        name: "Navasana",
        english: "Boat Pose",
        level: "Intermediate",
        description: "A seated V-shape balance that intensely engages the abdominal muscles.",
        benefits: "Strengthens core, improves digestion, tones abs",
        precautions: "Bend knees for modification; avoid with lower back pain",
        source: "Yoga Journal – Pose Library; National Institutes of Health (Yoga for Core Strength)",
        youtube: "https://www.youtube.com/embed/sxOCERb9uoI"
      },
      {
        name: "Ardha Matsyendrasana",
        english: "Half Lord of Fishes",
        level: "Intermediate",
        description: "A seated twist that massages the abdominal organs and improves digestion.",
        benefits: "Stimulates digestive organs, detoxifies, increases spinal mobility",
        precautions: "Twist from the waist, not the neck",
        source: "B.K.S. Iyengar – Light on Yoga; Yoga Journal (yogajournal.com)",
        youtube: "https://www.youtube.com/embed/cUqoNDBFpX0"
      },
      {
        name: "Pawanmuktasana",
        english: "Wind-Relieving Pose",
        level: "Beginner",
        description: "Knees drawn to chest while lying down, massaging the abdominal organs.",
        benefits: "Relieves gas, improves digestion, strengthens core",
        precautions: "Avoid during pregnancy; gentle pressure only",
        source: "Swami Satyananda Saraswati – Asana Pranayama Mudra Bandha; Bihar School of Yoga",
        youtube: "https://www.youtube.com/embed/kQ8FtV5WLPs"
      }
    ]
  },
  {
    id: "lowerback",
    name: "Lower Back",
    labelX: 30, labelY: 244, labelAnchor: "start",
    dotX: 200, dotY: 240,
    shape: "path",
    d: "M160,210 L172,210 L172,260 L160,255 Z M240,210 L228,210 L228,260 L240,255 Z",
    asanas: [
      {
        name: "Bhujangasana",
        english: "Cobra Pose",
        level: "Beginner",
        description: "Strengthens the lower back while gently stretching the front body.",
        benefits: "Strengthens lower back, opens chest, relieves sciatica",
        precautions: "Don't push too high; keep hips grounded",
        source: "National Institutes of Health – Yoga for Low-Back Pain (PubMed); Yoga Journal",
        youtube: "https://www.youtube.com/embed/JDcdhTuycOI"
      },
      {
        name: "Salabhasana",
        english: "Locust Pose",
        level: "Intermediate",
        description: "Lying on the belly and lifting legs and chest to strengthen the back.",
        benefits: "Strengthens entire back, improves posture, tones glutes",
        precautions: "Lift with back muscles, not momentum",
        source: "B.K.S. Iyengar – Light on Yoga; Iyengar Yoga Institute, Pune",
        youtube: "https://www.youtube.com/embed/GvvUgvLjR1I"
      },
      {
        name: "Supta Matsyendrasana",
        english: "Supine Twist",
        level: "Beginner",
        description: "A gentle reclining twist that releases tension in the lower back.",
        benefits: "Releases lower back tension, improves spinal mobility",
        precautions: "Keep both shoulders on the ground",
        source: "Yoga Journal – Restorative Poses; American Yoga Association",
        youtube: "https://www.youtube.com/embed/oMM6HMFCVDQ"
      }
    ]
  },
  {
    id: "hips",
    name: "Hips",
    labelX: 50, labelY: 279, labelAnchor: "start",
    dotX: 200, dotY: 275,
    shape: "path",
    d: "M155,255 L245,255 Q248,275 240,290 L200,295 L160,290 Q152,275 155,255 Z",
    asanas: [
      {
        name: "Eka Pada Rajakapotasana",
        english: "Pigeon Pose",
        level: "Intermediate",
        description: "A deep hip opener that targets the piriformis and hip flexors.",
        benefits: "Opens hip joints, relieves sciatica, releases stored emotions",
        precautions: "Use props under hip for support; avoid with knee injuries",
        source: "Yoga Journal – Pose Library; International Journal of Yoga Therapy",
        youtube: "https://www.youtube.com/embed/52ExLbNwsb0"
      },
      {
        name: "Baddha Konasana",
        english: "Butterfly Pose",
        level: "Beginner",
        description: "Seated with soles of feet together, gently opening the hips.",
        benefits: "Opens hips, improves circulation, eases menstrual discomfort",
        precautions: "Don't press knees down forcefully",
        source: "B.K.S. Iyengar – Light on Yoga; Iyengar Yoga Institute, Pune",
        youtube: "https://www.youtube.com/embed/QJi5-aQ7mKQ"
      },
      {
        name: "Malasana",
        english: "Garland Pose",
        level: "Beginner",
        description: "A deep squat that opens the hips and strengthens the lower body.",
        benefits: "Opens hips and groin, strengthens ankles, improves balance",
        precautions: "Place heels on a blanket if they lift off the floor",
        source: "Yoga Journal – Pose Library; American Yoga Association",
        youtube: "https://www.youtube.com/embed/a8Gkv_8pDCE"
      }
    ]
  },
  {
    id: "thighs",
    name: "Thighs",
    labelX: 340, labelY: 344, labelAnchor: "end",
    dotX: 200, dotY: 340,
    shape: "path",
    d: "M160,290 L175,380 L192,380 L200,295 Z M240,290 L225,380 L208,380 L200,295 Z",
    asanas: [
      {
        name: "Virabhadrasana II",
        english: "Warrior II",
        level: "Beginner",
        description: "A powerful standing pose that strengthens and stretches the thighs.",
        benefits: "Strengthens thighs, opens hips, builds stamina",
        precautions: "Keep front knee over ankle, not past toes",
        source: "Yoga Journal – Pose Library; National Center for Complementary and Integrative Health",
        youtube: "https://www.youtube.com/embed/4Ejz7IgODlU"
      },
      {
        name: "Utkatasana",
        english: "Chair Pose",
        level: "Beginner",
        description: "A powerful squat that ignites the quadriceps and builds leg endurance.",
        benefits: "Strengthens thighs and glutes, improves balance",
        precautions: "Keep weight in heels; don't let knees go past toes",
        source: "B.K.S. Iyengar – Light on Yoga; Yoga Journal (yogajournal.com)",
        youtube: "https://www.youtube.com/embed/paFzDM9LLWY"
      },
      {
        name: "Anjaneyasana",
        english: "Low Lunge",
        level: "Beginner",
        description: "A deep lunge that stretches the hip flexors and quadriceps.",
        benefits: "Stretches hip flexors, strengthens thighs, improves balance",
        precautions: "Pad the back knee; keep front knee aligned over ankle",
        source: "Yoga Journal – Pose Library; American Yoga Association",
        youtube: "https://www.youtube.com/embed/gADEiFbvGv4"
      }
    ]
  },
  {
    id: "knees",
    name: "Knees",
    labelX: 50, labelY: 399, labelAnchor: "start",
    dotX: 200, dotY: 395,
    shape: "path",
    d: "M175,380 Q172,395 175,410 L192,410 Q195,395 192,380 Z M225,380 Q228,395 225,410 L208,410 Q205,395 208,380 Z",
    asanas: [
      {
        name: "Virasana",
        english: "Hero Pose",
        level: "Intermediate",
        description: "A kneeling pose that stretches the thighs and improves knee flexibility.",
        benefits: "Improves knee flexibility, stretches thighs and ankles",
        precautions: "Sit on a block if knees are sensitive",
        source: "B.K.S. Iyengar – Light on Yoga; Iyengar Yoga Institute, Pune",
        youtube: "https://www.youtube.com/embed/HoN-gfSH0dY"
      },
      {
        name: "Trikonasana",
        english: "Triangle Pose",
        level: "Beginner",
        description: "A standing pose that strengthens the muscles around the knee joint.",
        benefits: "Strengthens knee-supporting muscles, improves alignment",
        precautions: "Micro-bend the front knee; don't hyperextend",
        source: "Yoga Journal – Pose Library; International Association of Yoga Therapists",
        youtube: "https://www.youtube.com/embed/S9mMV_M4oCs"
      },
      {
        name: "Sukhasana",
        english: "Easy Seated Pose",
        level: "Beginner",
        description: "A comfortable cross-legged position that gently mobilizes the knees.",
        benefits: "Gentle knee mobilization, calms mind, grounds energy",
        precautions: "Elevate hips on a cushion if knees are above hips",
        source: "Bihar School of Yoga – Asana Pranayama Mudra Bandha; Art of Living Foundation",
        youtube: "https://www.youtube.com/embed/pDJnfS9GKWQ"
      }
    ]
  },
  {
    id: "calves",
    name: "Calves",
    labelX: 330, labelY: 452, labelAnchor: "end",
    dotX: 200, dotY: 448,
    shape: "path",
    d: "M175,410 L178,480 L190,480 L192,410 Z M225,410 L222,480 L210,480 L208,410 Z",
    asanas: [
      {
        name: "Adho Mukha Svanasana",
        english: "Downward Dog",
        level: "Beginner",
        description: "Pedaling the feet in downward dog deeply stretches the calves.",
        benefits: "Stretches calves and hamstrings, strengthens arms",
        precautions: "Bend knees if calves are very tight",
        source: "Yoga Journal – Pose Library; National Center for Complementary and Integrative Health",
        youtube: "https://www.youtube.com/embed/EC7RGJ975iM"
      },
      {
        name: "Uttanasana",
        english: "Standing Forward Bend",
        level: "Beginner",
        description: "A deep forward fold that stretches the entire back of the legs.",
        benefits: "Stretches calves and hamstrings, calms the mind",
        precautions: "Bend knees to protect lower back",
        source: "B.K.S. Iyengar – Light on Yoga; Yoga Journal (yogajournal.com)",
        youtube: "https://www.youtube.com/embed/gXABrCPFMk4"
      },
      {
        name: "Parsvottanasana",
        english: "Pyramid Pose",
        level: "Intermediate",
        description: "An intense side stretch that deeply elongates the calf muscles.",
        benefits: "Deep calf stretch, improves balance, calms brain",
        precautions: "Use blocks if hands don't reach the floor",
        source: "B.K.S. Iyengar – Light on Yoga; Iyengar Yoga Institute, Pune",
        youtube: "https://www.youtube.com/embed/gGrfbzFKdUo"
      }
    ]
  },
  {
    id: "feet",
    name: "Feet",
    labelX: 60, labelY: 492, labelAnchor: "start",
    dotX: 200, dotY: 488,
    shape: "path",
    d: "M170,480 L190,480 L192,500 Q190,510 174,510 Q166,508 168,498 Z M210,480 L230,480 L228,498 Q230,508 226,510 Q210,510 208,500 Z",
    asanas: [
      {
        name: "Tadasana",
        english: "Mountain Pose",
        level: "Beginner",
        description: "The foundation of all standing poses, building awareness from the feet up.",
        benefits: "Strengthens feet and ankles, improves posture, grounds energy",
        precautions: "Distribute weight evenly across all four corners of feet",
        source: "Yoga Journal – Pose Library; American Yoga Association; B.K.S. Iyengar – Light on Yoga",
        youtube: "https://www.youtube.com/embed/2HTvZp5PTXI"
      },
      {
        name: "Vajrasana",
        english: "Thunderbolt Pose",
        level: "Beginner",
        description: "Sitting on the heels stretches the tops of the feet and ankles.",
        benefits: "Stretches feet and ankles, aids digestion, calms mind",
        precautions: "Place a cushion between calves and thighs if uncomfortable",
        source: "Bihar School of Yoga – Asana Pranayama Mudra Bandha; Art of Living Foundation",
        youtube: "https://www.youtube.com/embed/hE6xBbEE_8g"
      },
      {
        name: "Padahastasana",
        english: "Hand Under Foot Pose",
        level: "Intermediate",
        description: "Standing forward bend with hands under feet, stimulating foot reflexology points.",
        benefits: "Stretches feet, stimulates reflexology points, calms mind",
        precautions: "Bend knees if hamstrings are tight",
        source: "Swami Satyananda Saraswati – Asana Pranayama Mudra Bandha; Bihar School of Yoga",
        youtube: "https://www.youtube.com/embed/4mDzrMmjBiQ"
      }
    ]
  }
];