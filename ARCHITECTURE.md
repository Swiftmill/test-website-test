# MVP Architecture

## Frontend
- Application React (Vite) dans `/web`.
- État local pour navigation, catalogue, lecture, favoris, historique.
- Persistance locale (localStorage) pour prototype.

## Backend cible (phase suivante)
- API REST/GraphQL pour catalogue, comptes, interactions.
- Service d'authentification utilisateur.
- Service de droits (région, fenêtre de diffusion).
- Service de modération et commentaires.

## Données
- Entités: Anime, Saison, Épisode, Licence, Utilisateur, Favori, Historique, Commentaire.
- Champs de conformité: source de droit, territoire, date de début/fin de licence, statut publication.

## Sécurité & performance
- CDN vidéo, cache edge, monitoring QoS.
- Protection anti-abus et limitation de débit API.
- Journalisation sécurité et alerting.
