export default function page() {
  return (
    <div>
      <Header/>
    </div>
  )
}

function Header() {
  return (
    <div className="flex justify-between">
      <div className="rounded-full w-[3rem] h-[3rem]">{"<"}</div>
      <h1 className="text-3xl font-bold">Daniel</h1>
      <div className="rounded-full w-[3rem] h-[3rem] border-2 border-black"></div>
    </div>
  );
}