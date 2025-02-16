import Image from "next/image";

export default function Banner() {
  return (
    <div className="w-full bg-gray-700 h-60 relative mt-8 rounded-2xl overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://plus.unsplash.com/premium_photo-1661627326771-e21e2e493fd1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Medical Care Picture banner"
          fill
          objectFit="cover"
          className="opacity-70"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 opacity-80"></div>

      {/* Text in Front */}
      <div className="absolute inset-0 flex items-center justify-center">

        <h2 className="text-white lg:text-4xl md:text-3xl sm:text-3xl text-2xl font-bold font-monstserrat">
          Recent Blogs
        </h2>
      </div>
    </div>
  );
}
