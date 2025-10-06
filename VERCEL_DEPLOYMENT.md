# Vercel Deployment Anleitung - Dolmetsch-Trainer Pro 2.0 mit Autorisierung

## Schnelle Bereitstellung

### Option 1: Direkte Vercel-Bereitstellung (Empfohlen)
1. Gehen Sie zu [vercel.com](https://vercel.com)
2. Klicken Sie auf "New Project"
3. Importieren Sie das Repository: `greberl/Dolmetsch-Trainer-Pro-2.0-Auth`
4. Vercel erkennt automatisch die Vite-Konfiguration
5. Klicken Sie auf "Deploy"

### Option 2: Vercel CLI
```bash
# Vercel CLI installieren (falls nicht vorhanden)
npm i -g vercel

# In Ihr Projektverzeichnis wechseln
cd your-project-directory

# Bei Vercel anmelden
vercel login

# Projekt bereitstellen
vercel --prod
```

## Umgebungsvariablen

Da Ihre App Google AI und Text-to-Speech verwendet, müssen Sie diese Umgebungsvariablen in Vercel setzen:

1. Gehen Sie zu Ihrem Vercel-Projekt-Dashboard
2. Klicken Sie auf "Settings" → "Environment Variables"
3. Fügen Sie hinzu:
   - `API_KEY`: Ihr Google AI API-Schlüssel

## Build-Einstellungen

Vercel sollte diese automatisch erkennen, aber zur Sicherheit:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Nach der Bereitstellung

### 1. Testen Sie die Autorisierung
- Besuchen Sie Ihre neue Vercel-URL
- Testen Sie die Anmeldung mit einem der Codes:
  - `FACHAKADEMIE2024`
  - `DOLMETSCHTRAINER`
  - `SPECIALACCESS2024`
  - `PREMIUMACCESS`

### 2. Eigene Domain (Optional)
1. Gehen Sie zu "Settings" → "Domains"
2. Fügen Sie Ihre eigene Domain hinzu
3. Folgen Sie den DNS-Anweisungen

### 3. SSL/HTTPS
- Wird automatisch von Vercel bereitgestellt
- Keine weitere Konfiguration erforderlich

## Wartung und Updates

### Neue Zugangsscodes hinzufügen:
1. Bearbeiten Sie `auth.js` in Ihrem Repository
2. Fügen Sie neue Base64-kodierte Tokens zum `TOKENS`-Array hinzu
3. Committen und pushen Sie die Änderungen
4. Vercel wird automatisch neu bereitstellen

### Code-Generierung:
```javascript
// Neuen Code Base64-kodieren
btoa("IHRNEUERCODE") // Ergebnis in TOKENS-Array einfügen
```

## Troubleshooting

### App lädt nicht:
- Überprüfen Sie die Browser-Konsole auf Fehler
- Stellen Sie sicher, dass `API_KEY` korrekt gesetzt ist

### Autorisierung funktioniert nicht:
- Löschen Sie den Browser-Cache
- Überprüfen Sie, ob `auth.js` korrekt geladen wird

### Build-Fehler:
- Überprüfen Sie die Vercel-Build-Logs
- Stellen Sie sicher, dass alle Abhängigkeiten in `package.json` stehen

## Kosten

- **Vercel Hobby Plan**: Kostenlos
- **Bandbreite**: 100GB/Monat kostenlos
- **Build-Zeit**: 6000 Minuten/Monat kostenlos
- **Funktionen**: Unbegrenzt kostenlos

Für Ihre Anwendung sollte der kostenlose Plan mehr als ausreichend sein.

## Support

Bei Problemen:
1. Überprüfen Sie die Vercel-Dokumentation
2. Schauen Sie in die Browser-Entwicklertools
3. Überprüfen Sie die Vercel-Build-Logs
