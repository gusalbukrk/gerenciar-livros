"use client";

interface Props {
  error: Error;
  reset: () => void;
}

function ErrorPage({ error, reset }: Props) {
  console.warn(error);
  return (
    <div>
      <p>An error occurred.</p>
      <button className="btn" onClick={reset}>
        Retry
      </button>
    </div>
  );
}

export default ErrorPage;
