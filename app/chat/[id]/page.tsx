import Body from "./Body";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <div className="max-w-lg md:max-w-xl mx-auto my-6">
      <Header/>
      <Body convoId={id} />
    </div>
  );
}

function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="rounded-full w-[3rem] h-[3rem] flex items-center">{"<"}</div>
      <h1 className="text-3xl font-bold">Daniel</h1>
      <div className="rounded-full w-[3rem] h-[3rem] border-2 border-black"></div>
    </div>
  );
}
