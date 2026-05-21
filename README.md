# 🎬 Movie Recommendation System
https://movierecommendation-sand.vercel.app

A movie discovery application that combines TMDB search with a local TF-IDF recommendation engine. This repository includes:

- `main.py`: FastAPI backend serving TMDB search, movie details, genre recommendations, and TF-IDF similarity recommendations.
- `app.py`: Streamlit frontend for a quick interactive UI.
- `frontend/`: Next.js frontend with search, movie cards, and detail pages.
- `regenerate_pickles.py`: preprocessing script to rebuild recommendation artifacts from `movies_metadata.csv`.

## ✨ Key Features

- TMDB keyword search with autocomplete-style results
- Movie detail pages with posters, overview, and genres
- Genre-based movie recommendations
- Local TF-IDF similarity recommendations from movie metadata
- Two frontend options: Streamlit UI and Next.js web app
- Supports local development and deployment workflows

## 🧩 What’s Included

- `main.py` – FastAPI backend
- `app.py` – Streamlit UI client
- `frontend/` – Next.js frontend app
- `movies_metadata.csv` – raw dataset used to build TF-IDF artifacts
- `regenerate_pickles.py` – dataset preprocessing and pickle generation
- `requirements.txt` – Python dependencies

## 🚀 Quick Start

### 1. Backend (FastAPI)

1. Install Python dependencies:

```bash
pip install -r requirements.txt
```

2. Create a `.env` file with your TMDB key:

```ini
TMDB_API_KEY=your_tmdb_api_key_here
```

3. Run the backend:

```bash
py -m uvicorn main:app --reload
```

The API should be available at `http://127.0.0.1:8000`.

### 2. Streamlit Frontend

1. Install Python dependencies from `requirements.txt`.
2. Run Streamlit:

```bash
py -m streamlit run app.py
```

This opens the Streamlit UI for searching and browsing movies.

### 3. Next.js Frontend

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

2. Start the app:

```bash
npm run dev
```

3. Open `http://localhost:3000` in your browser.

> The Next.js app uses `NEXT_PUBLIC_API_BASE` if defined. Otherwise it falls back to the remote API base in `frontend/lib/api.js`.

## 📦 Dataset and Recommendation Artifacts

To regenerate local TF-IDF artifacts from the raw CSV dataset:

```bash
py regenerate_pickles.py
```

This creates:

- `df.pkl`
- `indices.pkl`
- `tfidf_matrix.pkl`
- `tfidf.pkl`

## 🔧 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/health` | GET | Health check |
| `/` | GET | Root endpoint |
| `/home` | GET | TMDB home feed by category |
| `/tmdb/search` | GET | Search TMDB movies by query |
| `/movie/id/{tmdb_id}` | GET | Fetch movie details by TMDB ID |
| `/recommend/genre` | GET | Genre-based recommendations |
| `/recommend/tfidf` | GET | TF-IDF similarity recommendations |
| `/movie/search` | GET | Combined bundle response for details and recommendations |

## 🛠 Tech Stack

- Backend: Python, FastAPI, HTTPX, pandas, NumPy, scikit-learn, pydantic
- Frontend: Streamlit, Next.js, React, Tailwind CSS
- Data: TMDB API, local movie metadata CSV, TF-IDF similarity

## 💡 Notes

- `main.py` is the backend service.
- `app.py` is the Streamlit frontend.
- `frontend/` contains the Next.js frontend.
- Add `TMDB_API_KEY` to `.env` before starting the backend.

## 📁 Project Structure

```text
movierecommendation/
├── app.py
├── main.py
├── movies_metadata.csv
├── regenerate_pickles.py
├── requirements.txt
├── runtime.txt
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
└── README.md
```

