import { Component } from 'react'

/** If WebGL fails, the page still works — just without the 3D layer. */
export default class ErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err) {
    console.warn('3D scene disabled:', err)
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}
