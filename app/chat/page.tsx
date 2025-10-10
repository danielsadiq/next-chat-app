export default function page() {
  return (
    <div className="px-20 py-12 h-screen">
      <Header />
      <Body />
    </div>
  );
}

function Header() {
  return (
    <div className="flex justify-between">
      <div className="rounded-full w-[3rem] h-[3rem] border-2 border-black"></div>
      <h1 className="text-3xl font-bold">Chat App</h1>
      <div className="rounded-full w-[3rem] h-[3rem] border-2 border-black"></div>
    </div>
  );
}

function Body() {
  return (
    <main className="mt-12 p-6">
      <div className="flex items-center gap-4">
        <div className="rounded-full w-[3rem] h-[3rem] border-2 border-black"></div>
        <div>
          <h2 className="font-bold">Daniel Sadiq</h2>
          <p>The weather will be perfect</p>
        </div>
      </div>
    </main>
  );
}
