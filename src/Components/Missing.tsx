import { Link } from "react-router-dom";

export default function Missing() {
  return (
    <>
      <p>Page not found</p>
      <div>
        <button>
          <Link to={"/"}>Go back to home page</Link>
        </button>
      </div>
    </>
  );
}
