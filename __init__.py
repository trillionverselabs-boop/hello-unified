"""Unified Hermes plugin — agent side.

One package, both SDKs: this directory is the agent plugin
(register(ctx)); desktop/plugin.js inside it is the desktop plugin
(HermesPlugin) that the desktop loader scans from this folder.
The desktop side reaches this backend via ctx.rest / ctx.socket on
the shared /api/plugins/<id> namespace.
"""

import json


def register(ctx):
    schema = {
        "name": "hello_unified",
        "description": "Returns a friendly greeting for the given name (unified plugin demo).",
        "parameters": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Name to greet",
                }
            },
            "required": ["name"],
        },
    }

    def handle_hello(params, **kwargs):
        del kwargs
        name = params.get("name", "World")
        return json.dumps({"success": True, "greeting": f"Hello, {name}!", "from": "unified"})

    ctx.register_tool(
        name="hello_unified",
        toolset="hello_unified",
        schema=schema,
        handler=handle_hello,
    )

    def on_tool_call(tool_name, args, result, **kwargs):
        print(f"[hello-unified] tool called: {tool_name}")

    ctx.register_hook("post_tool_call", on_tool_call)
