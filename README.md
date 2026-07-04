# KilimoSmart — Expert System for Crop Disease Diagnosis
## ISS 3102 Expert Systems · Assignment 3 Implementation

---

## What this is
A full web application implementing the Expert System designed in Assignment 3.
- 7 crops · 18 diseases · 18 forward-chaining diagnostic rules
- English / Swahili language toggle
- Farmer diagnosis flow, history, officer dashboard, knowledge base viewer
- Data persists in `server/db.json`

---

## How to run on your Mac

You need two terminal windows open at the same time.

### Terminal 1 — Start the backend API server
```bash
cd kilimosmart/server
npm start
```
You should see:
```
🌱 KilimoSmart API running at http://localhost:3001
📚 Knowledge base: 7 crops | 18 diseases | 18 rules
```

### Terminal 2 — Start the frontend
```bash
cd kilimosmart/client
npm run dev
```
You should see:
```
➜  Local:   http://localhost:5173/
```

### Open the app
Go to: **http://localhost:5173**

---

## How to use the system

### Farmer diagnosis (Home tab)
1. Select a crop
2. Enter farmer name and county (optional)
3. Answer symptom questions one at a time
4. Get a diagnosis with confidence level and treatment steps
5. Share via WhatsApp or start a new diagnosis

### History tab
- View all past diagnoses
- Filter by crop or confidence level
- Click any record for details

### Officer View tab
- See analytics: total diagnoses, confidence breakdown, top diseases
- Daily trend chart, diagnoses by crop (pie chart), by county

### Knowledge Base tab
- Browse all 18 diseases with full treatment protocols
- View all 18 rules with their conditions
- Explore all 7 crops and their regions

---

## System architecture (Assignment 3 layers)
| Layer | Implementation |
|---|---|
| User Layer | React + Vite frontend (4 pages) |
| Application Layer | React Router, Language context |
| Knowledge Layer | `server/knowledgeBase.js` |
| Inference Layer | `server/inferenceEngine.js` (forward chaining) |
| Data Storage | `server/db.json` (lowdb JSON database) |
| Administration | Knowledge Base page + server API |

---

## Stopping the system
Press `Ctrl+C` in both terminal windows.
