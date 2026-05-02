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
            return (
            <div>
                <p style={{fontSize: "2rem"}}>
                    Please <a href="/">refresh</a> to reload the application and try again.
                </p>
                <small style={{fontSize: "1rem"}}>If you continue to experience problems please contact support.</small>
            </div>
            )
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
