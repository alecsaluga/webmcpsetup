'use client'

import { useState } from 'react'
import { toolSchemas, ToolName } from '@/lib/tool-schemas'

export default function ToolsExplorer() {
  const [selectedTool, setSelectedTool] = useState<ToolName | null>(null)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<any>(null)
  const [isExecuting, setIsExecuting] = useState(false)

  const executeTool = async () => {
    if (!selectedTool) return

    setIsExecuting(true)
    setOutput(null)

    try {
      let parsedInput = {}
      if (input.trim()) {
        parsedInput = JSON.parse(input)
      }

      // Execute the tool via the global webmcp object (set by the imperative tools script)
      if (typeof window !== 'undefined' && (window as any).webmcpTools) {
        const result = await (window as any).webmcpTools[selectedTool](parsedInput)
        setOutput(result)
      } else {
        setOutput({
          error: 'WebMCP tools not loaded. Make sure the imperative tools script is running.'
        })
      }
    } catch (error: any) {
      setOutput({
        error: error.message || 'Invalid JSON or execution error'
      })
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <div className="space-y-16">
      {/* Tool List */}
      <div>
        <h2 className="text-4xl font-black text-white mb-8">Available Tools</h2>
        <div className="grid gap-6">
          {Object.entries(toolSchemas).map(([name, schema]) => (
            <div
              key={name}
              className={`border ${selectedTool === name ? 'border-[#ff5a00]' : 'border-white/10'} bg-black/40 p-8 hover:border-[#ff5a00]/50 transition-all cursor-pointer rounded`}
              onClick={() => {
                setSelectedTool(name as ToolName)
                setInput('')
                setOutput(null)
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <h3 className="font-mono font-bold text-xl mb-3 text-[#ff5a00]">{schema.name}</h3>
                  <p className="text-white/80 text-lg mb-4 leading-relaxed">{schema.description}</p>
                  {schema.readOnlyHint && (
                    <span className="text-xs bg-[#ff5a00]/10 text-[#ff5a00] px-3 py-1 rounded uppercase tracking-wider">Read-only</span>
                  )}
                </div>
                {selectedTool === name && (
                  <span className="ml-4 text-sm font-bold text-[#ff5a00] uppercase tracking-wider">Selected</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Playground */}
      {selectedTool && (
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-4xl font-black text-white mb-8">Tool Playground</h2>

          {/* Schema Display */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Input Schema</h3>
            <pre className="bg-near-black text-white/90 p-6 text-sm overflow-x-auto font-mono border border-white/10 rounded">
              {JSON.stringify(toolSchemas[selectedTool].inputSchema, null, 2)}
            </pre>
          </div>

          {/* Input */}
          <div className="mb-6">
            <label className="block text-xl font-bold text-white mb-4">Input JSON</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              className="w-full bg-black/60 border border-white/10 text-white p-6 font-mono text-sm rounded focus:outline-none focus:border-[#ff5a00] transition-colors"
              placeholder='{"payload": {...}}'
            />
            <p className="text-sm text-white/60 mt-3">
              Enter JSON input matching the schema above, or leave empty for tools with no required input.
            </p>
          </div>

          {/* Execute Button */}
          <button
            onClick={executeTool}
            disabled={isExecuting}
            className="bg-[#ff5a00] text-black font-bold uppercase tracking-wider px-12 py-4 rounded hover:bg-[#ff6a10] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExecuting ? 'Executing...' : 'Run Tool'}
          </button>

          {/* Output */}
          {output && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Output</h3>
              <pre className="bg-near-black text-white/90 p-6 text-sm overflow-x-auto font-mono border border-white/10 rounded">
                {JSON.stringify(output, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Documentation */}
      <div className="border-t border-white/10 pt-16">
        <h2 className="text-4xl font-black text-white mb-8">How to Use</h2>
        <div className="space-y-6 text-lg text-white/80 leading-relaxed">
          <p>
            These tools are available to AI agents in two ways:
          </p>
          <ol className="space-y-6 pl-6">
            <li className="pl-4">
              <strong className="text-white text-xl">1. Declarative (HTML-based):</strong><br/>
              <span className="text-white/70">
                The intake form at <code className="bg-black/60 text-[#ff5a00] px-2 py-1 rounded font-mono">/intake</code> has{' '}
                <code className="bg-black/60 text-[#ff5a00] px-2 py-1 rounded font-mono">toolname</code> and{' '}
                <code className="bg-black/60 text-[#ff5a00] px-2 py-1 rounded font-mono">toolparamdescription</code> attributes
                that agents can discover and invoke.
              </span>
            </li>
            <li className="pl-4">
              <strong className="text-white text-xl">2. Imperative (JavaScript API):</strong><br/>
              <span className="text-white/70">
                Tools are registered via{' '}
                <code className="bg-black/60 text-[#ff5a00] px-2 py-1 rounded font-mono">navigator.modelContext.registerTool()</code> when
                an agent browses this site with a compatible browser.
              </span>
            </li>
          </ol>
          <p className="text-white/70 mt-8">
            The playground above allows you to test these tools directly by providing JSON input
            and viewing the structured output.
          </p>
        </div>
      </div>
    </div>
  )
}
