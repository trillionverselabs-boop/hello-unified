// Unified plugin — desktop side.
// Load: the desktop loader scans this file inside an agent plugin at
// $HERMES_HOME/plugins/<id>/desktop/plugin.js
// (a unified package is the disk door scanning inside your agent folder).
// Same HermesPlugin contract as a disk plugin.
//
// No JSX, no build — loaded uncompiled. Only '@hermes/plugin-sdk',
// 'react', and 'react/jsx-runtime' are importable.

import { host, haptic, useValue } from '@hermes/plugin-sdk'
import { jsx, jsxs } from 'react/jsx-runtime'

function UnifiedPane() {
  const gateway = useValue(host.state.gateway)
  const session = useValue(host.state.session)

  return jsxs('div', {
    className: 'flex h-full flex-col gap-2 p-3 text-sm',
    children: [
      jsx('div', { className: 'font-medium', children: 'Unified plugin' }),
      jsx('div', {
        className: 'text-(--ui-text-tertiary)',
        children: `gateway: ${gateway}  ·  session: ${session ?? 'none'}`,
      }),
      jsx('div', {
        className: 'text-(--ui-text-tertiary)',
        children: 'Agent side: hello_unified tool + post_tool_call hook.',
      }),
    ],
  })
}

export default {
  id: 'hello-unified', // must match the plugin folder name
  name: 'Unified Hello',
  register(ctx) {
    ctx.register({
      id: 'pane',
      area: 'panes',
      title: 'unified hello',
      data: { placement: 'right', width: '280px' },
      render: () => jsx(UnifiedPane, {}),
    })

    ctx.register({
      id: 'chip',
      area: 'statusBar.right',
      order: 130,
      render: () =>
        jsx('button', {
          type: 'button',
          className: 'px-1.5 text-[0.6875rem] text-(--ui-text-tertiary)',
          onClick: () => {
            haptic('tap')
            host.notify({ kind: 'info', message: 'Unified plugin — both SDKs live.' })
          },
          children: 'unified',
        }),
    })
  },
}
