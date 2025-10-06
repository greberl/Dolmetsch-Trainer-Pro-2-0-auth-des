# Autorisierungssystem - Dolmetsch-Trainer Pro 2.0

## Übersicht

Das Autorisierungssystem schützt Ihre Dolmetsch-Trainer-App vor unbefugtem Zugriff durch ein einfaches, aber effektives Token-basiertes System.

## Funktionsweise

### Für Nutzer:
1. **Zugangscode eingeben**: Nutzer müssen beim ersten Besuch einen gültigen Zugangscode eingeben
2. **Automatische Speicherung**: Der Code wird für 30 Tage im Browser gespeichert
3. **Nahtlose Nutzung**: Nach erfolgreicher Anmeldung normale App-Nutzung
4. **Abmelden**: Optional können sich Nutzer jederzeit abmelden

### Für Sie als Administrator:
- **Einfache Verwaltung**: Codes sind direkt im Code hinterlegt
- **Sichere Verschleierung**: Codes sind Base64-kodiert gespeichert
- **Flexible Erweiterung**: Neue Codes können einfach hinzugefügt werden

## Aktuelle Zugangsscodes

Die folgenden Codes sind derzeit aktiv:

1. **FACHAKADEMIE2024** - Hauptcode für Ihre Fachakademie
2. **DOLMETSCHTRAINER** - Alternativer Code
3. **SPECIALACCESS2024** - Für besondere Zugänge
4. **PREMIUMACCESS** - Für Premium-Nutzer

## Codes verwalten

### Neue Codes hinzufügen:
1. Öffnen Sie die Datei `AuthGuard.tsx`
2. Finden Sie das Array `ENCODED_TOKENS`
3. Kodieren Sie Ihren neuen Code mit Base64 (z.B. auf base64encode.org)
4. Fügen Sie den kodierten Code zum Array hinzu

**Beispiel:**
```typescript
const ENCODED_TOKENS = [
  'RkFDSEFLQURFTUlFMjAyNA==', // FACHAKADEMIE2024
  'SWhyTmV1ZXJDb2Rl',         // IhrNeuerCode (neu hinzugefügt)
];
```

### Codes deaktivieren:
- Entfernen Sie einfach die entsprechende Zeile aus dem `ENCODED_TOKENS` Array

## Sicherheitsfeatures

- **Session-Management**: Codes werden sicher im LocalStorage gespeichert
- **Automatische Ablaufzeit**: Tokens sind 30 Tage gültig
- **Verschleierung**: Codes sind nicht im Klartext sichtbar
- **Eingabevalidierung**: Schutz vor ungültigen Eingaben
- **Responsive Design**: Funktioniert auf allen Geräten

## Vercel-Optimierung

Das System ist vollständig für Vercel optimiert:
- ✅ **Keine Backend-Kosten**: Reine Frontend-Lösung
- ✅ **Statische Bereitstellung**: Funktioniert mit Vercel's kostenlosem Plan
- ✅ **Schnelle Ladezeiten**: Minimaler Overhead
- ✅ **Skalierbar**: Unterstützt beliebig viele Nutzer

## Zukünftige Erweiterungen

Für die kommerzielle Nutzung können folgende Features hinzugefügt werden:

1. **Institutionsspezifische Codes**: Jede Bildungseinrichtung erhält eigene Codes
2. **Nutzungsstatistiken**: Tracking welche Codes wie oft verwendet werden
3. **Admin-Dashboard**: Web-Interface zur Code-Verwaltung
4. **Zeitlich begrenzte Codes**: Codes mit Ablaufdatum
5. **Nutzerlimits**: Maximale Anzahl gleichzeitiger Nutzer pro Code

## Support

Bei Fragen oder Problemen:
1. Überprüfen Sie die Browser-Konsole auf Fehlermeldungen
2. Stellen Sie sicher, dass JavaScript aktiviert ist
3. Testen Sie mit einem anderen Browser
4. Löschen Sie den Browser-Cache bei Problemen

## Technische Details

- **Framework**: React + TypeScript
- **Speicherung**: LocalStorage (clientseitig)
- **Verschlüsselung**: Base64-Kodierung
- **Kompatibilität**: Alle modernen Browser
- **Performance**: < 1KB zusätzlicher Code
