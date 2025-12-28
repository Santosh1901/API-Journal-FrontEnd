import React from 'react'

type Props = { children: React.ReactNode }
type State = { error: Error | null }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props){
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error){
    return { error }
  }

  componentDidCatch(error: Error, info: any){
    console.error('Unhandled render error:', error, info)
  }

  render(){
    if(this.state.error){
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-2xl bg-white border p-6 rounded-md shadow">
            <h2 className="text-lg font-semibold text-red-700">Something went wrong</h2>
            <pre className="mt-4 text-sm text-slate-700 whitespace-pre-wrap">{this.state.error.message}</pre>
            <div className="mt-4 text-xs text-slate-500">Check the browser console for more details.</div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
