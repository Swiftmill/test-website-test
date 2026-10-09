export const catalog = [
  {
    id: 'hikari-chronicles',
    title: 'Hikari Chronicles',
    genres: ['Action', 'Sci-Fi'],
    studio: 'Aster Studio',
    year: 2025,
    synopsis:
      'Une équipe de pilotes protège une colonie orbitale et découvre un complot énergétique.',
    legalSource: 'Licence partenaire - Aster Distribution',
    episodes: [
      {
        id: 'hc-s1-e1',
        number: 1,
        title: 'Aube Orbitale',
        duration: '24 min',
        language: 'VOSTFR',
        streamUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        subtitles: '/subtitles/demo-fr.vtt',
      },
      {
        id: 'hc-s1-e2',
        number: 2,
        title: 'Fracture',
        duration: '24 min',
        language: 'VOSTFR',
        streamUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        subtitles: '/subtitles/demo-fr.vtt',
      },
    ],
  },
  {
    id: 'koi-no-harbor',
    title: 'Koi no Harbor',
    genres: ['Romance', 'Slice of Life'],
    studio: 'Blue Pier',
    year: 2024,
    synopsis:
      'Deux lycéens relancent le festival du port de leur ville et découvrent leur vocation.',
    legalSource: 'Catalogue sous licence régionale - Blue Pier Rights',
    episodes: [
      {
        id: 'kh-s1-e1',
        number: 1,
        title: 'Marée du Matin',
        duration: '22 min',
        language: 'VF',
        streamUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        subtitles: '/subtitles/demo-fr.vtt',
      },
      {
        id: 'kh-s1-e2',
        number: 2,
        title: 'Promesse au Quai',
        duration: '22 min',
        language: 'VF',
        streamUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        subtitles: '/subtitles/demo-fr.vtt',
      },
    ],
  },
  {
    id: 'mythic-kitchen-guild',
    title: 'Mythic Kitchen Guild',
    genres: ['Comedy', 'Fantasy'],
    studio: 'Nori Works',
    year: 2026,
    synopsis:
      'Des apprentis cuisiniers traversent un continent fantastique pour gagner le Grand Banquet.',
    legalSource: 'Contenu original co-produit',
    episodes: [
      {
        id: 'mk-s1-e1',
        number: 1,
        title: 'Soupe de Dragon',
        duration: '23 min',
        language: 'VOSTFR',
        streamUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        subtitles: '/subtitles/demo-fr.vtt',
      },
      {
        id: 'mk-s1-e2',
        number: 2,
        title: 'Marché des Nuages',
        duration: '23 min',
        language: 'VOSTFR',
        streamUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        subtitles: '/subtitles/demo-fr.vtt',
      },
    ],
  },
]

export const planning = [
  { day: 'Lundi', title: 'Hikari Chronicles', time: '19:00' },
  { day: 'Mercredi', title: 'Koi no Harbor', time: '18:30' },
  { day: 'Vendredi', title: 'Mythic Kitchen Guild', time: '20:00' },
]
