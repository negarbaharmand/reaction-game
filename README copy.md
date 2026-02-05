# Workshop: "React" ⚡

**Mål:** Bygg ett reaktionstidsspel där spelaren väntar på att en ruta blir grön och klickar så snabbt som möjligt. Syftet är att lära sig använda `useState` och `useEffect`.

## Steg 1: Typdefinitioner
Definiera en `type` för spelets olika tillstånd (idle/waiting/ready/result/tooEarly).

## Steg 2: Grundläggande struktur
Skapa komponenten för spelplanen (en klickbar ruta med meddelande).

## Steg 3: useState med TypeScript
Lägg till states med följande typning:
- Spelets tillstånd (din egen type)
- Starttid (`number | null`)
- Reaktionstid (`number | null`)
- Highscore (`number | null`)

## 👆 Steg 4: Klickhantering
Implementera `handleClick` som hanterar olika beteenden beroende på vilket state spelet är i.

## ⏱️ Steg 5: useEffect för timern
Skapa en effect som:
- Lyssnar på när spelaren väntar
- Startar en timer med slumpmässig fördröjning
- **Cleanup:** Rensar timern vid för tidig klick eller unmount

## 🎨 Steg 6: Visuell feedback
Ändra bakgrundsfärg och meddelande baserat på spelets state.

## 🥸 Tekniska koncept
- `useState<Type>()` = typat state
- `type` = definierar tillåtna värden
- `useEffect` = gör något när state ändras
- Cleanup-funktionen = städa upp efter dig (viktigt med timers!)

## 👥 Diskutera
- Hur skiljer sig useState från en vanlig variabel?
- När körs useEffect-funktionen? Vad styr det?
