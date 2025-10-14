import Image from "next/image";

interface imgType {
  imgUrl? : string;
  backUpText?: string
}

export default function AvatarImage({imgUrl, backUpText}: imgType) {
  return (
    <div className="rounded-full w-12 h-12 border-1 border-black relative">
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt="User avatar"
          fill
          className="object-cover rounded-full"
        />
      ) : (
        <div className="w-full h-full rounded-full flex items-center justify-center text-xl font-bold">
          {backUpText ?? "?"}
        </div>
      )}
    </div>
  );
}
