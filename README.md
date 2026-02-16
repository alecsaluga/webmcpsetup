# webmcpsetup.ai

Production-ready marketing site for WebMCP Setup as a Service. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Overview

This site demonstrates WebMCP (Web Model Context Protocol) implementation using both **declarative** and **imperative** patterns, allowing AI agents to interact with the site through structured, deterministic tools.

**Live site**: https://webmcpsetup.ai (when deployed)

## Features

- Black-and-white editorial design with Playfair Display serif headlines
- WebMCP-enabled intake form (declarative pattern)
- 4 imperative WebMCP tools via `navigator.modelContext.registerTool()`
- Interactive tools playground at `/tools`
- SEO optimized with JSON-LD structured data
- Rate-limited API with server-side validation
- `llms.txt` for AI agent guidance
- Fully responsive and accessible

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

### Build and Deploy

```bash
# Build for production
pnpm build

# Start production server locally
pnpm start

# Deploy to Vercel (recommended)
vercel deploy
```

## Project Structure

```
webmcpsetup/
├── app/
│   ├── layout.tsx              # Root layout with SEO metadata
│   ├── page.tsx                # Homepage with hero, FAQ, JSON-LD
│   ├── intake/
│   │   ├── page.tsx            # Intake form page
│   │   └── IntakeForm.tsx      # WebMCP declarative form component
│   ├── tools/
│   │   ├── page.tsx            # Tools explorer page
│   │   └── ToolsExplorer.tsx   # Interactive playground
│   ├── privacy/page.tsx        # Privacy policy
│   ├── terms/page.tsx          # Terms of service
│   ├── api/
│   │   └── intake/route.ts     # POST /api/intake endpoint
│   ├── sitemap.xml/route.ts    # XML sitemap
│   ├── llms.txt/route.ts       # AI agent guidance
│   └── globals.css             # Tailwind base + custom styles
├── components/
│   ├── Navigation.tsx          # Top nav bar
│   ├── Footer.tsx              # Site footer
│   ├── AgentLog.tsx            # WebMCP event listener UI
│   └── WebMCPTools.tsx         # Imperative tool registration
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── validation.ts           # Zod schemas
│   └── tool-schemas.ts         # WebMCP tool definitions
├── public/
│   └── robots.txt              # Robots.txt
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## Pages

### `/` - Homepage
- Hero section with large serif headline
- "Before vs After" WebMCP comparison
- What WebMCP is
- What we deliver (7 items)
- Process (5 steps)
- FAQ (12 items)
- JSON-LD: Organization, WebSite, Service, FAQPage

### `/intake` - Intake Form
- **Primary conversion page**
- WebMCP declarative form with `toolname="submit_webmcp_setup_intake"`
- All inputs have `toolparamdescription` attributes
- Detects agent invocation via `e.agentInvoked`
- Returns structured JSON to agents via `e.respondWith()`
- Regular browser users see success UI with lead_id and next steps

### `/tools` - Tools Explorer
- Lists 4 available WebMCP tools
- Interactive playground to test tools with JSON input
- Displays tool schemas and outputs

### `/privacy` and `/terms`
- Placeholder legal pages
- Can be customized with real policies

## WebMCP Implementation

### Declarative Pattern (HTML-based)

Located in `app/intake/IntakeForm.tsx`:

```tsx
<form
  toolname="submit_webmcp_setup_intake"
  tooldescription="Submit a WebMCP setup intake form..."
  onSubmit={handleSubmit}
>
  <input
    name="full_name"
    toolparamdescription="The full name of the person submitting"
  />
  <!-- more fields -->
</form>
```

**How it works:**
- Agents parse HTML for `toolname` and `tooldescription` attributes
- Field descriptions via `toolparamdescription`
- Submit handler detects `e.agentInvoked`
- Returns structured JSON via `e.respondWith()`

### Imperative Pattern (JavaScript API)

Located in `components/WebMCPTools.tsx`:

```tsx
if (navigator.modelContext?.registerTool) {
  navigator.modelContext.registerTool({
    name: 'submit_intake',
    description: 'Submit a WebMCP setup intake form...',
    inputSchema: { /* JSON Schema */ },
    execute: async (input) => { /* implementation */ }
  })
}
```

**Available Tools:**

1. **get_intake_form_schema** - Returns JSON Schema for the intake form (read-only)
2. **validate_intake** - Validates payload without submitting
3. **submit_intake** - Submits the intake form and returns lead_id
4. **get_next_steps** - Returns next steps after submission (read-only)

All tools are defined in `lib/tool-schemas.ts`.

### Event Listeners

Located in `components/AgentLog.tsx`:

```tsx
window.addEventListener('toolactivated', (e) => {
  // Log tool activation
})

window.addEventListener('toolcancel', (e) => {
  // Log tool cancellation
})
```

Displays a fixed bottom bar showing the last agent action.

## API Endpoints

### `POST /api/intake`

Accepts intake form submissions.

**Request body:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "website_url": "https://example.com",
  "what_are_you_building": "saas",
  "auth_required": "login_required",
  "primary_user_actions": ["book", "buy"],
  "current_stack": "Next.js, React",
  "timeline": "2-4_weeks",
  "budget_range": "10k-25k",
  "notes": "Optional notes"
}
```

**Response:**
```json
{
  "ok": true,
  "lead_id": "LEAD-1234567890-ABC123XYZ",
  "received_at": "2026-02-16T12:00:00.000Z"
}
```

**Features:**
- Server-side validation with Zod
- Rate limiting: 5 requests/hour per IP (in-memory)
- In-memory storage (dev) - see TODOs for production
- Console logging for development

**TODOs for production:**
- Replace in-memory storage with database (Postgres, MongoDB, Supabase, etc.)
- Add webhook to n8n/HubSpot/Airtable
- Send confirmation email via SendGrid/Resend/Postmark
- Add proper persistent rate limiting (Redis or database)

### `GET /api/intake`

Returns list of submissions (for debugging).

## SEO & Structured Data

All pages include:
- Title and meta description
- OpenGraph tags
- Twitter Card tags
- Canonical URLs

Homepage includes JSON-LD for:
- Organization
- WebSite
- Service
- FAQPage (all 12 FAQ items)

## Content Editing

### Edit Homepage Copy

Edit `app/page.tsx`:
- Hero headline and subhead (lines ~75-82)
- FAQ data (lines ~5-65)
- Section content (inline JSX)

### Edit Intake Form Fields

Edit `app/intake/IntakeForm.tsx`:
- Add/remove form fields
- Update enums in selects
- Modify field labels and descriptions

Also update:
- `lib/types.ts` - TypeScript interfaces
- `lib/validation.ts` - Zod schema
- `lib/tool-schemas.ts` - WebMCP tool schemas
- `components/WebMCPTools.tsx` - Imperative tool implementation

### Edit Tool Schemas

All tool schemas are centralized in `lib/tool-schemas.ts`.

Changes here automatically propagate to:
- `/tools` playground
- Imperative tool registration
- `llms.txt` guidance (update manually if needed)

## Design System

### Colors
- Background: `#fafafa` (off-white)
- Text: `#111111` (near-black)
- Borders: `#e5e5e5` (light gray)

### Typography
- Headlines: Playfair Display (serif)
- Body: Inter (sans-serif)

### Components
- `.btn-primary` - Black button with white hover
- `.btn-secondary` - White button with black hover
- `.input-field` - Form input with focus states
- `.section-container` - Page section wrapper

Customize in `app/globals.css`.

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub/GitLab/Bitbucket
2. Import project in Vercel dashboard
3. Set environment variables (if needed)
4. Deploy

```bash
# Or use Vercel CLI
vercel deploy --prod
```

### Environment Variables

No environment variables required for basic deployment.

For production enhancements, add:
- `DATABASE_URL` - Database connection string
- `WEBHOOK_URL` - n8n/Zapier webhook for intake submissions
- `EMAIL_API_KEY` - SendGrid/Resend API key
- `REDIS_URL` - Redis for rate limiting (optional)

### Custom Domain

In Vercel dashboard:
- Go to project settings > Domains
- Add `webmcpsetup.ai`
- Update DNS records as instructed
- Update `metadataBase` in `app/layout.tsx`

## Testing WebMCP Tools

### Test Declarative Form

1. Navigate to `/intake`
2. Open browser DevTools
3. Fill out form and submit
4. Check Network tab for POST to `/api/intake`
5. Verify success response and UI

### Test Imperative Tools

1. Navigate to `/tools`
2. Select a tool from the list
3. Enter JSON input (or leave empty for read-only tools)
4. Click "Run Tool"
5. Verify structured JSON output

### Test with AI Agents

If you have access to a WebMCP-compatible AI agent:

1. Point agent to `http://localhost:3000` (or live URL)
2. Ask agent to "submit an intake form for webmcpsetup.ai"
3. Agent should discover tools and invoke `submit_intake`
4. Verify lead_id is returned

## Development Notes

### Tool Registration

Tools are registered on page load via `useEffect` in `components/WebMCPTools.tsx`.

Check browser console for:
```
[WebMCP] Registered 4 imperative tools via navigator.modelContext
```

If `navigator.modelContext` is not available (most browsers), tools are still exposed globally as `window.webmcpTools` for the playground.

### Rate Limiting

Current implementation uses in-memory Map:
- 5 submissions per hour per IP
- Cleared on server restart
- Not suitable for production (use Redis or database)

### Validation

Server-side validation uses Zod schemas in `lib/validation.ts`.

Client-side validation uses native HTML5 (required, email, url types).

Tool validation uses JSON Schema patterns.

## Troubleshooting

### Styles not loading
```bash
# Clear .next cache
rm -rf .next
pnpm dev
```

### TypeScript errors
```bash
# Regenerate types
pnpm build
```

### Tools not registering
- Check browser console for `[WebMCP]` logs
- Verify `navigator.modelContext` is available (requires WebMCP-compatible browser)
- Tools are still available via `window.webmcpTools` for playground

## License

Proprietary. All rights reserved.

## Support

For questions or issues, contact: support@webmcpsetup.ai

---

## WebMCP Implementation Summary

This site implements WebMCP in two ways:

1. **Declarative** (HTML attributes):
   - Location: `app/intake/IntakeForm.tsx`
   - Pattern: `<form toolname="..." tooldescription="...">`
   - Fields: `toolparamdescription` on each input
   - Agent detection: `e.agentInvoked`
   - Response: `e.respondWith(Promise.resolve({...}))`

2. **Imperative** (JavaScript API):
   - Location: `components/WebMCPTools.tsx`
   - Pattern: `navigator.modelContext.registerTool({...})`
   - Tools: 4 registered (get_intake_form_schema, validate_intake, submit_intake, get_next_steps)
   - Schemas: Defined in `lib/tool-schemas.ts`

3. **Event Handling**:
   - Location: `components/AgentLog.tsx`
   - Events: `toolactivated`, `toolcancel`
   - UI: Fixed bottom bar showing last action

All tools return deterministic, structured JSON. Schemas follow JSON Schema standards. Tool names are snake_case and explicit.

---

Built with Next.js 14, TypeScript, and Tailwind CSS.
