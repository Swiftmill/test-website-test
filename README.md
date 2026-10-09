# test-website-test

Prototype MVP d'une plateforme **originale de streaming d'anime légal**.

## Structure
- `/web`: application React (Vite) du MVP
- `MVP_SCOPE.md`: périmètre fonctionnel
- `LEGAL_STRATEGY.md`: stratégie de diffusion légale
- `ARCHITECTURE.md`: architecture cible

## Démarrage
```bash
cd /home/runner/work/test-website-test/test-website-test/web
npm install
npm run dev
```

## Validation
```bash
cd /home/runner/work/test-website-test/test-website-test/web
npm run build
npm run lint
```

## Déploiement GitHub Pages
- Le workflow `/home/runner/work/test-website-test/test-website-test/.github/workflows/deploy-pages.yml` déploie automatiquement le site à chaque push sur `main`.
- Pour activer l’hébergement, allez dans **Settings > Pages** et vérifiez que la source est **GitHub Actions**.
- L’URL publique sera de la forme `https://swiftmill.github.io/test-website-test/`.
