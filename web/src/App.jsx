import { useEffect, useMemo, useState } from 'react'
import { catalog, planning } from './data/catalog'
import './App.css'

const TABS = [
  'Accueil',
  'Catalogue',
  'Planning',
  'Favoris',
  'Historique',
  'Admin',
  'Conformité',
]

const LS_KEYS = {
  user: 'anistream.user',
  favorites: 'anistream.favorites',
  history: 'anistream.history',
  comments: 'anistream.comments',
}

const blockedWords = ['pirate', 'hack', 'illegal']

const readJSON = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('Accueil')
  const [query, setQuery] = useState('')
  const [userName, setUserName] = useState(() => readJSON(LS_KEYS.user, ''))
  const [activeAnimeId, setActiveAnimeId] = useState(catalog[0].id)
  const [activeEpisodeId, setActiveEpisodeId] = useState(catalog[0].episodes[0].id)
  const [favorites, setFavorites] = useState(() => readJSON(LS_KEYS.favorites, []))
  const [history, setHistory] = useState(() => readJSON(LS_KEYS.history, []))
  const [comments, setComments] = useState(() => readJSON(LS_KEYS.comments, []))
  const [commentInput, setCommentInput] = useState('')
  const [notice, setNotice] = useState('')
  const [adminDraft, setAdminDraft] = useState(catalog.map((anime) => ({ ...anime, published: true })))

  useEffect(() => {
    localStorage.setItem(LS_KEYS.user, JSON.stringify(userName))
  }, [userName])

  useEffect(() => {
    localStorage.setItem(LS_KEYS.favorites, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem(LS_KEYS.history, JSON.stringify(history))
  }, [history])

  useEffect(() => {
    localStorage.setItem(LS_KEYS.comments, JSON.stringify(comments))
  }, [comments])

  const filteredCatalog = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return catalog
    return catalog.filter((anime) => {
      const haystack = [anime.title, anime.genres.join(' '), anime.synopsis].join(' ').toLowerCase()
      return haystack.includes(term)
    })
  }, [query])

  const activeAnime = catalog.find((anime) => anime.id === activeAnimeId) ?? catalog[0]
  const activeEpisode =
    activeAnime.episodes.find((episode) => episode.id === activeEpisodeId) ?? activeAnime.episodes[0]

  const favoriteAnimes = catalog.filter((anime) => favorites.includes(anime.id))

  const historyRows = history
    .map((entry) => {
      const anime = catalog.find((item) => item.id === entry.animeId)
      const episode = anime?.episodes.find((item) => item.id === entry.episodeId)
      if (!anime || !episode) return null
      return { ...entry, animeTitle: anime.title, episodeTitle: episode.title }
    })
    .filter(Boolean)

  const recommendations = useMemo(() => {
    const lastAnimeId = history[0]?.animeId
    if (!lastAnimeId) return catalog.slice(0, 2)
    const lastAnime = catalog.find((anime) => anime.id === lastAnimeId)
    if (!lastAnime) return catalog.slice(0, 2)
    return catalog
      .filter(
        (anime) =>
          anime.id !== lastAnime.id &&
          anime.genres.some((genre) => lastAnime.genres.includes(genre)),
      )
      .slice(0, 2)
  }, [history])

  const animeComments = comments.filter((comment) => comment.animeId === activeAnime.id)

  const selectAnime = (animeId) => {
    const anime = catalog.find((item) => item.id === animeId)
    if (!anime) return
    setActiveAnimeId(animeId)
    setActiveEpisodeId(anime.episodes[0].id)
    setActiveTab('Catalogue')
  }

  const watchEpisode = (episodeId) => {
    setActiveEpisodeId(episodeId)
    setActiveTab('Catalogue')
    setHistory((prev) => [
      {
        watchedAt: new Date().toISOString(),
        animeId: activeAnime.id,
        episodeId,
      },
      ...prev.filter((item) => item.episodeId !== episodeId || item.animeId !== activeAnime.id),
    ].slice(0, 20))
  }

  const toggleFavorite = (animeId) => {
    setFavorites((prev) =>
      prev.includes(animeId) ? prev.filter((id) => id !== animeId) : [...prev, animeId],
    )
  }

  const submitComment = (event) => {
    event.preventDefault()
    const content = commentInput.trim()
    if (!content) return

    const lower = content.toLowerCase()
    const blocked = blockedWords.some((word) => lower.includes(word))

    if (blocked) {
      setNotice('Commentaire rejeté par la modération automatique.')
      return
    }

    setComments((prev) => [
      {
        id: `${activeAnime.id}-${Date.now()}`,
        animeId: activeAnime.id,
        author: userName || 'Visiteur',
        content,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])
    setCommentInput('')
    setNotice('Commentaire publié.')
  }

  return (
    <main className="layout">
      <header className="topbar">
        <div>
          <p className="eyebrow">Plateforme démo d&apos;anime légal</p>
          <h1>Stream Legal Anime</h1>
        </div>
        <div className="user-box">
          <label htmlFor="user-name">Profil</label>
          <input
            id="user-name"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="Pseudo"
          />
        </div>
      </header>

      <nav className="tabs" aria-label="Sections">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={tab === activeTab ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === 'Accueil' && (
        <section className="panel grid-2">
          <article className="card featured">
            <h2>Découverte</h2>
            <p>{activeAnime.title}</p>
            <p>{activeAnime.synopsis}</p>
            <button type="button" onClick={() => setActiveTab('Catalogue')}>
              Voir la fiche
            </button>
          </article>
          <article className="card">
            <h2>Recommandations</h2>
            <ul>
              {recommendations.map((anime) => (
                <li key={anime.id}>
                  <button type="button" onClick={() => selectAnime(anime.id)}>
                    {anime.title}
                  </button>
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}

      {activeTab === 'Catalogue' && (
        <section className="panel">
          <div className="search-row">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un anime, un genre..."
            />
          </div>

          <div className="grid-2">
            <aside className="card catalog-list">
              <h2>Catalogue</h2>
              {filteredCatalog.map((anime) => (
                <article key={anime.id} className={anime.id === activeAnime.id ? 'anime-item active' : 'anime-item'}>
                  <button type="button" onClick={() => selectAnime(anime.id)}>
                    {anime.title}
                  </button>
                  <p>{anime.genres.join(' • ')}</p>
                </article>
              ))}
            </aside>

            <article className="card detail-card">
              <h2>{activeAnime.title}</h2>
              <p>{activeAnime.synopsis}</p>
              <p className="meta">
                {activeAnime.year} • {activeAnime.studio} • Source: {activeAnime.legalSource}
              </p>
              <button type="button" onClick={() => toggleFavorite(activeAnime.id)}>
                {favorites.includes(activeAnime.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              </button>

              <h3>Épisodes</h3>
              <ul className="episodes">
                {activeAnime.episodes.map((episode) => (
                  <li key={episode.id}>
                    <button type="button" onClick={() => watchEpisode(episode.id)}>
                      EP {episode.number} - {episode.title} ({episode.language}, {episode.duration})
                    </button>
                  </li>
                ))}
              </ul>

              <div className="player-block">
                <h3>Lecture</h3>
                <video controls preload="metadata" src={activeEpisode.streamUrl}>
                  <track kind="subtitles" srcLang="fr" label="Français" src={activeEpisode.subtitles} default />
                </video>
                <p className="meta">Flux de démonstration sous licence ouverte pour prototypage.</p>
              </div>
            </article>
          </div>

          <article className="card">
            <h3>Commentaires modérés</h3>
            <form onSubmit={submitComment} className="comment-form">
              <textarea
                value={commentInput}
                onChange={(event) => setCommentInput(event.target.value)}
                placeholder="Ajouter un commentaire respectueux"
              />
              <button type="submit">Publier</button>
            </form>
            {notice && <p className="meta">{notice}</p>}
            <ul className="comments">
              {animeComments.map((comment) => (
                <li key={comment.id}>
                  <strong>{comment.author}</strong> — {new Date(comment.createdAt).toLocaleString('fr-FR')}
                  <p>{comment.content}</p>
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}

      {activeTab === 'Planning' && (
        <section className="panel card">
          <h2>Planning des sorties</h2>
          <ul>
            {planning.map((item) => (
              <li key={`${item.day}-${item.title}`}>
                <strong>{item.day}</strong> • {item.time} • {item.title}
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === 'Favoris' && (
        <section className="panel card">
          <h2>Mes favoris</h2>
          <ul>
            {favoriteAnimes.map((anime) => (
              <li key={anime.id}>
                <button type="button" onClick={() => selectAnime(anime.id)}>
                  {anime.title}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === 'Historique' && (
        <section className="panel card">
          <h2>Historique de visionnage</h2>
          <ul>
            {historyRows.map((row) => (
              <li key={`${row.animeId}-${row.episodeId}`}>
                {row.animeTitle} - {row.episodeTitle} ({new Date(row.watchedAt).toLocaleString('fr-FR')})
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === 'Admin' && (
        <section className="panel card">
          <h2>Back-office catalogue</h2>
          <p>Simulation de publication des fiches anime.</p>
          <ul>
            {adminDraft.map((anime) => (
              <li key={anime.id} className="admin-row">
                <span>{anime.title}</span>
                <button
                  type="button"
                  onClick={() =>
                    setAdminDraft((prev) =>
                      prev.map((item) =>
                        item.id === anime.id ? { ...item, published: !item.published } : item,
                      ),
                    )
                  }
                >
                  {anime.published ? 'Publié' : 'Brouillon'}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === 'Conformité' && (
        <section className="panel card">
          <h2>Conformité et légalité</h2>
          <ul>
            <li>Diffusion limitée aux contenus sous licence ou originaux.</li>
            <li>Application des règles géographiques via droits territoriaux.</li>
            <li>Formulaire de signalement DMCA: legal@stream-legal-anime.example</li>
            <li>Politique de confidentialité, CGU et modération disponible avant inscription.</li>
          </ul>
        </section>
      )}
    </main>
  )
}

export default App
