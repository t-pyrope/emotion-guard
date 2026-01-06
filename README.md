# Daily Signal — Technical Demo
The application is available on [www.daily-signal.com](https://www.daily-signal.com/)

## 1. Problem
A system for detecting pre-visible overload via state transitions and directive day modes.
Not conversational well-being tool, but an engine of limits.

## 2. Data Model
### users
- `user_id` — UUID, PK
- `timezone`
- `strictness_level` — gentle | standard | strict
- `main_context` — study | work | both
- `typical_daily_load` — light | moderate | heavy
- `overload_sources` — TEXT[]
- `action_on_overload` — push_through | shut_down | lose_focus
- `active_hours` — morning | day | evening | irregular
- `created_at`

### day_sessions (ex morning_checkins)
- `id` — UUID, PK
- `user_id` → FK users
- `day_date` — UNIQUE per user
- `sleep_level` 1–3
- `body_state` 1–3
- `mental_state` 1–3
- `contacts_expected` 1–3
- `resource_level` 1–3
- `state` — open | closed
- `closed_at`
- `created_at`

### signals
- `id` — UUID, PK
- `user_id` → FK users
- `signal_type`
- `created_at`

## Serverless Routes
- `POST /api/onboarding` - user creation
- `POST /api/morning-check-in` - morning check-in
- `POST /api/signal` - log signal
- `PUT /api/close-the-day` - open → closed

## Timezone
- Current usage: day_sessions.day_date is calculated with the user timezone, so sessions refer to the user day rather than the server day.
- Limitations: time-based UI logic, such as when to hide Morning Check-in or show Daily Summary, has not yet been implemented.

## Getting started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
