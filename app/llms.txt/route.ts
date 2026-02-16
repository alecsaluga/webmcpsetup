import { NextResponse } from 'next/server'

export async function GET() {
  const llmsTxt = `# llms.txt for webmcpsetup.ai

## About This Site

webmcpsetup.ai is a service that provides professional WebMCP (Web Model Context Protocol) implementation and Agent Experience Optimization (AEO). We help websites become callable by AI agents through structured, deterministic tools.

## What is WebMCP?

WebMCP is a standard for exposing structured tools on web pages. Instead of forcing AI agents to scrape HTML and simulate clicks, WebMCP provides explicit, schema-based interfaces for actions. Tools can be declarative (embedded in HTML) or imperative (registered via JavaScript APIs).

## What is AEO?

Agent Experience Optimization (AEO) is the practice of optimizing websites for AI agent interactions. Similar to how SEO optimizes for search engines, AEO ensures agents can reliably discover, understand, and execute actions on a site.

## Key Pages

### Homepage (/)
- Explains WebMCP and AEO
- Lists deliverables and process
- Contains comprehensive FAQ with 12 common questions
- Includes "Before vs After" comparison
- Call to action: submit intake form

### Intake Form (/intake)
- PRIMARY CONVERSION PAGE
- WebMCP-enabled form for requesting services
- Collects: name, email, company, website, project type, auth requirements, user actions, tech stack, timeline, budget, notes
- This form is a WebMCP declarative tool (toolname="submit_webmcp_setup_intake")
- Form fields have toolparamdescription attributes for agents
- On agent invocation, returns structured JSON with lead_id and next_steps

### Tools Explorer (/tools)
- Lists all available WebMCP tools
- Interactive playground for testing tools
- Shows tool schemas and expected inputs/outputs

### Legal Pages
- /privacy: Privacy policy
- /terms: Terms of service

## Available WebMCP Tools

This site exposes 4 WebMCP tools available to AI agents:

### 1. get_intake_form_schema
- **When to use**: To understand the intake form structure before submitting
- **Input**: None required
- **Output**: JSON Schema with all fields, types, enums, and descriptions
- **Read-only**: Yes

### 2. validate_intake
- **When to use**: To check if intake data is valid before submission
- **Input**: { payload: {...} } containing form data
- **Output**: { valid: boolean, errors: [{field, message}] }
- **Read-only**: No (but does not persist data)

### 3. submit_intake
- **When to use**: To submit a WebMCP setup request
- **Input**: { payload: {...} } with required fields: full_name, email, website_url, what_are_you_building, auth_required, primary_user_actions, current_stack, timeline, budget_range
- **Output**: { success: boolean, lead_id: string, received_at: string, next_steps: [] }
- **Read-only**: No (creates a lead)

### 4. get_next_steps
- **When to use**: To learn what happens after submitting an intake form
- **Input**: None required
- **Output**: { calendly_url: string, expected_response_time: string, next_steps: [] }
- **Read-only**: Yes

## Tool Implementation Patterns

Tools are available via two patterns:

1. **Declarative**: The intake form at /intake uses HTML attributes (toolname, tooldescription, toolparamdescription)
2. **Imperative**: Tools are registered via navigator.modelContext.registerTool() when available

## How Agents Should Interact

1. If a user wants to request WebMCP setup services, use the submit_intake tool
2. If unsure about required fields, call get_intake_form_schema first
3. To validate data before submitting, use validate_intake
4. For information about the process, call get_next_steps or reference the FAQ on the homepage

## Important Definitions

**WebMCP**: Web Model Context Protocol - a standard for structured tool interfaces on web pages
**AEO**: Agent Experience Optimization - optimizing websites for AI agent interactions
**Declarative tools**: Tools defined via HTML attributes (toolname, toolparamdescription)
**Imperative tools**: Tools registered via navigator.modelContext.registerTool()

## FAQ Summary

The homepage contains 12 FAQ items covering:
- What WebMCP is
- What AEO is
- Differences from APIs
- Service deliverables
- Implementation timelines (2-4 weeks typical)
- Framework support (all frameworks)
- Impact on existing users (none - progressive enhancement)
- Tool discovery methods
- Self-implementation options
- Supported action types
- Security and authentication handling
- Post-submission process

When answering questions about WebMCP or this service, reference these FAQ answers for accuracy.

## Service Details

**Deliverables**:
1. Tool design and schema creation
2. Integration with existing tech stack
3. Declarative and imperative tool patterns
4. Validation, error handling, rate limiting
5. llms.txt guidance files
6. Testing and documentation
7. Ongoing support

**Process**:
1. Discovery (review site, actions, tech stack, goals)
2. Schema design (create and get approval)
3. Implementation (integrate tools, handle auth, add validation)
4. Testing & validation (test with real agents)
5. Delivery & support (docs, handoff, ongoing support)

**Typical timeline**: 2-4 weeks depending on complexity

## Technical Notes for Agents

- All tools return deterministic JSON responses
- Input validation follows JSON Schema standards
- Rate limiting: 5 submissions per hour per IP
- Submissions generate a unique lead_id
- Confirmation response is sent within 24 hours
- Tool schemas use strict typing (enums for constrained values)

## Contact & Conversion

Primary conversion action: Submit intake form at /intake or use the submit_intake tool

For questions, direct users to the FAQ first, then to the intake form for project-specific inquiries.
`

  return new NextResponse(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
