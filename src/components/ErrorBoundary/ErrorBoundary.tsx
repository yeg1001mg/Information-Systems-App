import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)

        this.state = { hasError: false }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.log('Error, info: ', error, info)
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ margin: 30 }}>
                    <p style={{ fontSize: 24 }}>Something went wrong...</p>
                    <p style={{ fontSize: 12 }}>
                        It seems something was broken in the React application.
                    </p>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
