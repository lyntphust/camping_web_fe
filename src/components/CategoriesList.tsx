import Image from "next/image";

export default async function CategoryiesList() {
  return (
    <div className=" m-2 ml-0 px-2 rounded-lg flex py-2 transition-all shadow shadow-lg gap-4">
      <div className="h-24 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          alt="logo"
          src="/logo.svg"
          className="h-3/4 w-full object-cover object-center rounded-lg object-cover object-center hover:scale-110 transition-all hover:cursor-pointer"
        />
        <div style={{ fontSize: 14, textAlign: "center" }}>Leu da ngoai</div>
      </div>
      <div className="h-24 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          alt="logo"
          src="/logo.svg"
          className="h-3/4 w-full object-cover object-center rounded-lg object-cover object-center hover:scale-110 transition-all hover:cursor-pointer"
        />
        <div style={{ fontSize: 14, textAlign: "center" }}>
          Ban ghe da ngoai
        </div>
      </div>
    </div>
  );
}
