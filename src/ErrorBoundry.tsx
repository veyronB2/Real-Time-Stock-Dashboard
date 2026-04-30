import React, { JSX } from "react";

interface ErrorBoundaryProps {
    children: JSX.Element;
}

interface ErrorBoundaryState {
    error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = {
            error: null,
        };
    }

    render() {
        if (this.state.error) {
            return <div>
                <p>
                    Please <a href="/">refresh</a> to <a href="/">reload the application</a> and try again.
                </p>
                <small>If you continue to experience problems please contact support.</small>
            </div>
        }

        return this.props.children;
    }

    public componentDidCatch(error: Error, info: unknown) {
        console.error(error);
        console.error(info);
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            error,
        };
    }
}

export default ErrorBoundary;
