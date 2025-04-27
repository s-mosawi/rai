import Applications from "./Applications";

export default async function Dashboard() {
  return (
    <>
      <h1 className="text-xl lg:text-2xl font-semibold">Welcome, Admin!</h1>

      <Applications />
    </>
  );
}
