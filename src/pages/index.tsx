import { signIn } from "next-auth/react";

function Home() {
  return (
    <div>
      <div>hey</div>
      <button
        className="rounded-md bg-black text-white p-2"
        onClick={() => signIn()}
      >
        SignIn
      </button>
    </div>
  );
}

export default Home;
